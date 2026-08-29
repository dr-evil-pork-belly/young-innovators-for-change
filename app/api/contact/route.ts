import { NextRequest, NextResponse } from 'next/server';

/**
 * Contact endpoint for every form on the site.
 *
 * Setup — three environment variables, then it works:
 *
 *   RESEND_API_KEY=re_...                 from resend.com (free tier is ample)
 *   CONTACT_TO=hello@innovateyouth.org    the monitored inbox
 *   CONTACT_FROM=site@innovateyouth.org   a verified sender on your domain
 *
 * If the key is missing the route returns 503 and the form shows a real error.
 * It never pretends to have sent something it did not send — the previous
 * implementation faked success and silently dropped every enquiry.
 */

export const runtime = 'nodejs';

type Payload = {
  formName?: string;
  page?: string;
  fields?: Record<string, string>;
  /** honeypot — real users never fill this */
  company_website?: string;
};

const MAX_FIELD = 4000;
const REQUIRED = ['email'];

/** Best-effort throttle. Serverless instances are short-lived, so this stops
 *  casual flooding rather than a determined attacker; pair with a WAF if needed. */
const seen = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (seen.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  seen.set(ip, hits);
  if (seen.size > 500) seen.clear();
  return hits.length > MAX_PER_WINDOW;
}

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);
}

export async function POST(req: NextRequest) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Malformed request.' }, { status: 400 });
  }

  // Silently accept and discard bot submissions.
  if (body.company_website) return NextResponse.json({ ok: true });

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many messages from this connection. Please try again in a minute.' },
      { status: 429 },
    );
  }

  const fields = body.fields ?? {};
  const clean: Record<string, string> = {};
  for (const [k, v] of Object.entries(fields)) {
    if (typeof v !== 'string') continue;
    const trimmed = v.trim();
    if (trimmed) clean[k] = trimmed.slice(0, MAX_FIELD);
  }

  for (const key of REQUIRED) {
    if (!clean[key]) {
      return NextResponse.json({ error: 'Please include an email address.' }, { status: 400 });
    }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email)) {
    return NextResponse.json({ error: 'That email address does not look right.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to     = process.env.CONTACT_TO;
  const from   = process.env.CONTACT_FROM;

  if (!apiKey || !to || !from) {
    console.error(
      '[contact] Not configured. Set RESEND_API_KEY, CONTACT_TO and CONTACT_FROM. ' +
      'Submission was NOT delivered:',
      { formName: body.formName, page: body.page, fields: clean },
    );
    return NextResponse.json(
      { error: 'Our contact system is not available right now. Please email us directly.' },
      { status: 503 },
    );
  }

  const label = body.formName ?? 'Website enquiry';
  const rows = Object.entries(clean)
    .map(([k, v]) =>
      `<tr><td style="padding:6px 14px 6px 0;color:#6B7280;font:600 12px system-ui;` +
      `text-transform:uppercase;letter-spacing:.08em;vertical-align:top">${esc(k)}</td>` +
      `<td style="padding:6px 0;font:14px/1.6 system-ui;color:#111">${esc(v).replace(/\n/g, '<br>')}</td></tr>`)
    .join('');

  const html =
    `<div style="font:14px/1.6 system-ui;color:#111;max-width:640px">` +
    `<p style="font:600 12px system-ui;letter-spacing:.14em;text-transform:uppercase;color:#6B7280">` +
    `${esc(label)}</p>` +
    `<h2 style="font:700 20px system-ui;margin:4px 0 16px">New enquiry from ${esc(body.page ?? 'the site')}</h2>` +
    `<table style="border-collapse:collapse">${rows}</table>` +
    `<p style="margin-top:22px;color:#6B7280;font-size:12px">Sent from innovateyouth.org</p></div>`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: clean.email,
        subject: `${label}${clean.name ? ` — ${clean.name}` : ''}`,
        html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      console.error('[contact] Provider rejected the message:', res.status, detail);
      return NextResponse.json(
        { error: 'We could not send that just now. Please email us directly.' },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error('[contact] Delivery failed:', err);
    return NextResponse.json(
      { error: 'We could not send that just now. Please email us directly.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
