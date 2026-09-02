/**
 * End-to-end check of /api/contact, without sending a single real email.
 *
 * A contact form is the one piece of this site whose failure is silent: nothing
 * on the page changes, nobody gets a bounce, and the inquiry is simply gone. The
 * implementation before this one faked success and dropped every submission for
 * a month. So the route is checked the same way a workbook answer is: by running
 * it and comparing what it actually produced against what it is supposed to
 * produce, rather than by reading it and deciding it looks right.
 *
 * It starts a recorder on a local port, points RESEND_API_URL at it, starts the
 * built site against that, posts real submissions, and asserts on the JSON the
 * route would have sent to Resend.
 *
 * Run:  npm run build && node scripts/contact-check.mjs
 */
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { once } from 'node:events';

const RECORDER_PORT = 4319;
/* A port per phase. The first version reused one port and killed the server
 * between phases with site.kill(), which signals the `npx` wrapper and leaves
 * the Next process holding the port. Phase two then talked to phase one's
 * server, saw its empty environment, and reported ten failures against a route
 * that was fine. A test that can answer about the wrong process is worse than
 * no test: it accuses working code. Distinct ports make that impossible, and
 * the whole process group is signalled below rather than the wrapper. */
const PORTS = { unconfigured: 4320, configured: 4321 };
const TO = 'inbox@example.org';
const FROM = 'site@send.example.org';

let failures = 0;
function check(name, condition, detail = '') {
  if (condition) {
    console.log(`  ok    ${name}`);
  } else {
    failures += 1;
    console.log(`  FAIL  ${name}${detail ? `\n          ${detail}` : ''}`);
  }
}

/* Every assertion below reads through `?.` and coerces with `!!`. A perturbation
 * run that dropped the text part crashed here on `m.body.text.includes(...)`
 * and never reported the three checks after it, one of which was also failing.
 * A check suite that stops at the first missing field hides its own findings. */

/** Stands in for api.resend.com. Records every request body it is handed. */
const sent = [];
let nextStatus = 200;
const recorder = createServer((req, res) => {
  let raw = '';
  req.on('data', (c) => { raw += c; });
  req.on('end', () => {
    sent.push({ auth: req.headers.authorization, body: JSON.parse(raw || '{}') });
    res.writeHead(nextStatus, { 'Content-Type': 'application/json' });
    res.end(nextStatus === 200 ? '{"id":"stub"}' : '{"message":"stub rejection"}');
  });
});
recorder.listen(RECORDER_PORT);
await once(recorder, 'listening');

let SITE_PORT = PORTS.unconfigured;

async function withSite(port, env, fn) {
  SITE_PORT = port;
  const site = spawn('npx', ['next', 'start', '-p', String(port)], {
    env: { ...process.env, ...env },
    stdio: ['ignore', 'pipe', 'pipe'],
    detached: true,          // its own group, so the whole tree can be signalled
  });
  const logs = [];
  site.stdout.on('data', (d) => logs.push(String(d)));
  site.stderr.on('data', (d) => logs.push(String(d)));
  try {
    for (let i = 0; i < 60; i++) {
      try {
        await fetch(`http://127.0.0.1:${SITE_PORT}/`);
        break;
      } catch {
        await new Promise((r) => setTimeout(r, 500));
      }
    }
    return await fn(logs);
  } finally {
    try { process.kill(-site.pid, 'SIGTERM'); } catch { /* already gone */ }
    await new Promise((r) => setTimeout(r, 600));
  }
}

const post = (payload, headers = {}) =>
  fetch(`http://127.0.0.1:${SITE_PORT}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(payload),
  });

// ── 1. Unconfigured. The form must fail loudly and name somewhere to write. ──
console.log('\nunconfigured (no RESEND_API_KEY):');
await withSite(PORTS.unconfigured,
  { RESEND_API_KEY: '', CONTACT_TO: '', CONTACT_FROM: '' }, async () => {
  const res = await post({
    formName: 'Partner inquiry', page: '/partner',
    fields: { name: 'A Person', email: 'a@example.org', message: 'Hello.' },
  });
  const data = await res.json();
  check('returns 503 rather than a false success', res.status === 503, `got ${res.status}`);
  check('does not claim ok', data.ok !== true);
  check('names an address to write to instead',
    /@/.test(data.error ?? ''), JSON.stringify(data));
});

// ── 2. Configured. Assert on what would actually reach the provider. ─────────
console.log('\nconfigured:');
const env = {
  RESEND_API_KEY: 're_test_key',
  CONTACT_TO: TO,
  CONTACT_FROM: FROM,
  RESEND_API_URL: `http://127.0.0.1:${RECORDER_PORT}/emails`,
};
await withSite(PORTS.configured, env, async (logs) => {
  sent.length = 0;
  const res = await post({
    formName: 'Partner inquiry', page: '/partner',
    fields: {
      name: 'Dana Reyes', org: 'Pasadena Community Foundation',
      email: 'dana@example.org', message: 'Line one.\nLine two.',
    },
  }, { 'x-forwarded-for': '203.0.113.10' });
  const data = await res.json();
  check('returns ok', res.status === 200 && data.ok === true, `got ${res.status}`);
  check('exactly one message sent', sent.length === 1, `got ${sent.length}`);

  const m = sent[0] ?? { body: { html: '', text: '' }, auth: '' };
  check('bearer token is the configured key', m.auth === 'Bearer re_test_key', m.auth);
  check('from is CONTACT_FROM', m.body.from === FROM, m.body.from);
  check('to is CONTACT_TO', JSON.stringify(m.body.to) === JSON.stringify([TO]),
    JSON.stringify(m.body.to));
  check('reply_to is the sender, so hitting reply reaches them',
    m.body.reply_to === 'dana@example.org', m.body.reply_to);
  check('reply_to uses the snake_case name the REST API expects',
    'reply_to' in m.body && !('replyTo' in m.body));
  check('subject carries the form and the name',
    m.body.subject === 'Partner inquiry: Dana Reyes', m.body.subject);
  check('html alternative present', typeof m.body.html === 'string' && m.body.html.length > 40);
  check('text alternative present', typeof m.body.text === 'string' && m.body.text.length > 20);
  check('every submitted field survives into the html',
    ['Dana Reyes', 'Pasadena Community Foundation', 'dana@example.org', 'Line one.']
      .every((v) => !!m.body.html?.includes(v)));
  check('newlines in a message become line breaks rather than running together',
    !!m.body.html?.includes('Line one.<br>Line two.'));
  check('the plain text keeps the message intact',
    !!m.body.text?.includes('Line one.\nLine two.'));

  // A field containing markup must not become markup in the inbox.
  sent.length = 0;
  await post({
    formName: 'Partner inquiry', page: '/partner',
    fields: { name: '<script>x</script>', email: 'b@example.org', message: 'hi' },
  }, { 'x-forwarded-for': '203.0.113.11' });
  check('html-escapes field content',
    !!sent[0]?.body.html?.includes('&lt;script&gt;') &&
    !sent[0]?.body.html?.includes('<script>'));

  // formName is client-controlled and ends up in a mail header.
  sent.length = 0;
  await post({
    formName: 'Anything I Like\r\nBcc: victim@example.org', page: '/x',
    fields: { name: 'C', email: 'c@example.org' },
  }, { 'x-forwarded-for': '203.0.113.12' });
  check('an unknown form name falls back rather than setting the subject',
    sent[0]?.body.subject === 'Website inquiry: C', sent[0]?.body.subject);
  check('no CR or LF reaches the subject',
    !/[\r\n]/.test(sent[0]?.body.subject ?? ''));

  // Validation and the honeypot.
  sent.length = 0;
  const noEmail = await post({
    formName: 'Partner inquiry', page: '/partner', fields: { name: 'D' },
  }, { 'x-forwarded-for': '203.0.113.13' });
  check('a missing email is rejected', noEmail.status === 400);
  const badEmail = await post({
    formName: 'Partner inquiry', page: '/partner', fields: { email: 'not-an-address' },
  }, { 'x-forwarded-for': '203.0.113.14' });
  check('a malformed email is rejected', badEmail.status === 400);
  const bot = await post({
    formName: 'Partner inquiry', page: '/partner',
    fields: { email: 'bot@example.org' }, company_website: 'spam',
  }, { 'x-forwarded-for': '203.0.113.15' });
  check('the honeypot is accepted silently and sends nothing',
    bot.status === 200 && sent.length === 0, `sent ${sent.length}`);

  // Rate limit: the sixth message in a minute from one address is refused.
  sent.length = 0;
  const codes = [];
  for (let i = 0; i < 7; i++) {
    const r = await post({
      formName: 'Partner inquiry', page: '/partner',
      fields: { email: `flood${i}@example.org` },
    }, { 'x-forwarded-for': '198.51.100.7' });
    codes.push(r.status);
  }
  check('a flood from one address is throttled', codes.includes(429), codes.join(','));
  check('the throttle refuses rather than sends', sent.length <= 5, `sent ${sent.length}`);

  // The address the site prints and the address it delivers to are the same
  // string in two systems, and nothing but this warning compares them.
  sent.length = 0;
  const before = logs.length;
  await post({
    formName: 'Partner inquiry', page: '/partner', fields: { email: 'f@example.org' },
  }, { 'x-forwarded-for': '203.0.113.30' });
  await new Promise((r) => setTimeout(r, 300));
  const warned = logs.slice(before).join('');
  check('warns when CONTACT_TO and ORG.contactEmail disagree',
    warned.includes('disagree'), warned.slice(0, 200) || '(no log output)');
  check('and still delivers rather than refusing', sent.length === 1, `sent ${sent.length}`);

  // Provider failure must surface, not be swallowed.
  nextStatus = 422;
  const rejected = await post({
    formName: 'Partner inquiry', page: '/partner', fields: { email: 'e@example.org' },
  }, { 'x-forwarded-for': '203.0.113.20' });
  const rejData = await rejected.json();
  nextStatus = 200;
  check('a provider rejection surfaces as an error', rejected.status === 502, `got ${rejected.status}`);
  check('the rejection names an address to write to instead', /@/.test(rejData.error ?? ''));
});

recorder.close();
console.log(failures ? `\n${failures} check(s) FAILED\n` : '\nall contact checks passed\n');
process.exit(failures ? 1 : 0);
