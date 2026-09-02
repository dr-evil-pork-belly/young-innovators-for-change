import { NextRequest, NextResponse } from 'next/server';
import { ORG } from '@/content/org';

/**
 * Contact endpoint for every form on the site.
 *
 * Setup, three environment variables, then it works:
 *
 *   RESEND_API_KEY=re_...                 from resend.com (free tier is ample)
 *   CONTACT_TO=hello@innovateyouth.org    the monitored inbox
 *   CONTACT_FROM=site@send.innovateyouth.org   a verified sender on your domain
 *
 * If the key is missing the route returns 503 and the form shows a real error
 * naming the address to write to instead. It never pretends to have sent
 * something it did not send: the implementation before this one faked success
 * and silently dropped every inquiry.
 *
 * The full setup sequence, including the DNS records and why CONTACT_FROM sits
 * on a `send.` subdomain, is in `claude/19-contact-and-email.md` in the project.
 */

export const runtime = 'nodejs';

type Payload = {
  formName?: string;
  page?: string;
  fields?: Record<string, string>;
  /** honeypot, real users never fill this */
  company_website?: string;
};

const MAX_FIELD = 4000;
const REQUIRED = ['email'];

/**
 * The subject line of the mail that lands in the inbox is built from
 * `formName`, which arrives from the browser. Anything the client controls that
 * ends up in a mail header is worth pinning down, so a form has to be one this
 * route knows about. An unrecognised name is not an error, the message still
 * gets delivered, it just arrives under a generic subject rather than one the
 * sender chose. Add a form here when you add a form to the site.
 */
const FORMS: Record<string, string> = {
  'Partner inquiry': 'Partner inquiry',
  'School inquiry': 'School inquiry',
  'Curriculum question': 'Curriculum question',
};
const FALLBACK_LABEL = 'Website inquiry';

/**
 * Overridable so the route can be tested end to end without sending mail and
 * without a live key. Nothing in production sets it; the default is the real
 * endpoint. A test points it at a local recorder and asserts what would have
 * been sent, which is the only way to check the request body without a
 * deliverability experiment against somebody's inbox.
 */
const PROVIDER_URL = process.env.RESEND_API_URL ?? 'https://api.resend.com/emails';

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

/** No control characters in anything that becomes a mail header. */
function header(s: string): string {
  return s.replace(/[\r\n\t]+/g, ' ').trim().slice(0, 200);
}

/** The address a person can write to when the form cannot deliver. Empty is
 *  survivable: the sentence just drops the clause rather than printing a gap. */
function fallbackLine(): string {
  return ORG.contactEmail
    ? ` Please email us directly at ${ORG.contactEmail}.`
    : ' Please try again shortly.';
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
      { error: `Our contact form is not working right now.${fallbackLine()}` },
      { status: 503 },
    );
  }

  /* CONTACT_TO lives in Vercel and ORG.contactEmail lives in the repository, and
   * they are the same address written twice. Change one and either the site
   * prints an address that receives nothing, or the form delivers somewhere the
   * site does not name. Neither failure is visible from a page. This does not
   * block the send, because a delivered message to the wrong-but-real inbox
   * beats a refused one, but it puts the disagreement in the Vercel logs. */
  if (ORG.contactEmail && to.toLowerCase() !== ORG.contactEmail.toLowerCase()) {
    console.warn(
      `[contact] CONTACT_TO (${to}) and ORG.contactEmail (${ORG.contactEmail}) ` +
      'disagree. The site is printing one address and delivering to another.',
    );
  }

  const label = FORMS[header(body.formName ?? '')] ?? FALLBACK_LABEL;
  const page  = header(body.page ?? 'the site');
  const entries = Object.entries(clean);

  const rows = entries
    .map(([k, v]) =>
      `<tr><td style="padding:6px 14px 6px 0;color:#6B7280;font:600 12px system-ui;` +
      `text-transform:uppercase;letter-spacing:.08em;vertical-align:top">${esc(k)}</td>` +
      `<td style="padding:6px 0;font:14px/1.6 system-ui;color:#111">${esc(v).replace(/\n/g, '<br>')}</td></tr>`)
    .join('');

  const html =
    `<div style="font:14px/1.6 system-ui;color:#111;max-width:640px">` +
    `<p style="font:600 12px system-ui;letter-spacing:.14em;text-transform:uppercase;color:#6B7280">` +
    `${esc(label)}</p>` +
    `<h2 style="font:700 20px system-ui;margin:4px 0 16px">New inquiry from ${esc(page)}</h2>` +
    `<table style="border-collapse:collapse">${rows}</table>` +
    `<p style="margin-top:22px;color:#6B7280;font-size:12px">Sent from innovateyouth.org</p></div>`;

  /* A plain-text alternative, for two reasons. Spam filters score HTML-only
   * mail worse, and this is a small unknown domain sending to an inbox that has
   * never heard from it, which is the exact profile that lands in a junk folder.
   * And a person reading on a watch or in a text-only client gets the inquiry
   * rather than a blank message. */
  const text =
    `${label}\nNew inquiry from ${page}\n\n` +
    entries.map(([k, v]) => `${k.toUpperCase()}\n${v}\n`).join('\n') +
    `\n-- \nSent from innovateyouth.org`;

  try {
    const res = await fetch(PROVIDER_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: clean.email,
        subject: header(`${label}${clean.name ? `: ${clean.name}` : ''}`),
        html,
        text,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      console.error('[contact] Provider rejected the message:', res.status, detail);
      return NextResponse.json(
        { error: `We could not send that just now.${fallbackLine()}` },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error('[contact] Delivery failed:', err);
    return NextResponse.json(
      { error: `We could not send that just now.${fallbackLine()}` },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
