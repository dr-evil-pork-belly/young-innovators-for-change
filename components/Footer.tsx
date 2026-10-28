import Link from 'next/link';
import {
  ORG, PUBLIC_RECORDS, TRANSPARENCY, taxLine, fmtDate, addressLines,
} from '@/content/org';

/**
 * The site footer, on every page, from app/layout.tsx.
 *
 * Added 26 October 2026. Until then the site had no footer at all: the EIN,
 * the entity number and the addresses were on /governance and /partner and
 * nowhere else. Anyone checking the organization against the IRS record (a
 * program officer, a nonprofit verification service such as Goodstack) could
 * land on a page that never named the legal entity behind it. Every page now
 * does.
 *
 * Every value below is read from content/org.ts. Nothing is typed here. If a
 * fact changes, change it there and this follows.
 *
 * A server component on purpose: it has no state, so it ships no JavaScript.
 * That is also why the colors are restated here rather than imported from
 * components/kit.tsx, which is a client module. They are the same values,
 * from brand/brand.py, and every one used as text clears 4.5:1 on BAND.
 */

const INK         = '#16233A';
const BODY        = '#33415A';
const SUBTLE      = '#5A6880';
const CONNECT     = '#2D5BE3';
const CONNECT_INK = '#2149C7';
const SPARK       = '#FF7A3D';
const GROW        = '#17A67C';
const BAND        = '#E8EEF7';
const LINE        = '#C3CFE2';
const DISPLAY     = "'Baloo 2 Variable', 'Baloo 2', 'Trebuchet MS', Verdana, sans-serif";

const COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: 'The work',
    links: [
      { label: 'Mission',          href: '/mission' },
      { label: 'Curriculum',       href: '/curriculum' },
      { label: 'Free books',       href: '/resources' },
      { label: 'For teachers',     href: '/teachers' },
      { label: 'Evidence',         href: '/impact' },
    ],
  },
  {
    heading: 'The organization',
    links: [
      { label: 'About',                 href: '/about' },
      { label: 'Governance and filings', href: '/governance' },
      { label: 'Student privacy',       href: '/privacy' },
      { label: 'Partner with us',       href: '/partner' },
      { label: 'For funders',           href: '/partner#fund' },
    ],
  },
];

/** The registry line says exactly what is true today and no more. */
function registryLine(): string | null {
  const name = 'California Attorney General’s Registry of Charities and Fundraisers';
  if (TRANSPARENCY.caRegistryConfirmed && TRANSPARENCY.caRegistryNumber) {
    return `Registered with the ${name}, registration number ${TRANSPARENCY.caRegistryNumber}.`;
  }
  if (TRANSPARENCY.caRegistryFiled) {
    return `Registration with the ${name} filed ${fmtDate(TRANSPARENCY.caRegistryFiled)}; `
         + 'the registration number will be posted here when it is issued.';
  }
  return null;
}

export default function Footer() {
  const [officeStreet, officeCity] = addressLines(ORG.address);
  const [mailStreet, mailCity]     = addressLines(ORG.mailingAddress);
  const tax      = taxLine();
  const registry = registryLine();
  const year     = new Date().getUTCFullYear();

  const linkStyle: React.CSSProperties = { color: BODY, textDecoration: 'none' };
  const heading: React.CSSProperties = {
    fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em',
    textTransform: 'uppercase', color: SUBTLE, marginBottom: '0.85rem',
  };

  return (
    <footer className="site-footer" style={{ background: BAND, color: BODY,
      borderTop: `1px solid ${LINE}`, position: 'relative' }}>
      <div aria-hidden style={{ height: '3px',
        background: `linear-gradient(90deg, ${CONNECT} 0 34%, ${SPARK} 34% 67%, ${GROW} 67% 100%)` }} />

      <div style={{ maxWidth: '78rem', margin: '0 auto',
        padding: 'clamp(2.5rem, 5vw, 3.5rem) clamp(1rem, 4vw, 3rem) 2rem' }}>

        <div className="site-footer-grid">
          {/* Identity */}
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem',
              textDecoration: 'none', marginBottom: '0.9rem' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/pip/pip-mark.svg" alt="" aria-hidden width={32} height={32}
                style={{ width: '32px', height: '32px', display: 'block' }} />
              <span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: '1.1rem',
                color: INK, lineHeight: 1.1 }}>
                {ORG.legalName}
              </span>
            </Link>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.65, maxWidth: '34ch' }}>
              Business, money, math and science for kids, free to anyone.
              A California 501(c)(3) public charity.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <p style={heading}>{col.heading}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex',
                flexDirection: 'column', gap: '0.55rem', fontSize: '0.9rem' }}>
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="site-footer-link" style={linkStyle}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact */}
          <div>
            <p style={heading}>Contact</p>
            <address style={{ fontStyle: 'normal', fontSize: '0.9rem', lineHeight: 1.65 }}>
              <a href={`mailto:${ORG.contactEmail}`} className="site-footer-link"
                style={{ color: CONNECT_INK, fontWeight: 600, textDecoration: 'none' }}>
                {ORG.contactEmail}
              </a>
              <span style={{ display: 'block', marginTop: '0.75rem', color: SUBTLE,
                fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em',
                textTransform: 'uppercase' }}>
                Mailing address
              </span>
              {ORG.legalName}<br />
              {mailStreet}<br />
              {mailCity}
            </address>
          </div>
        </div>

        {/* The legal record. Small, but complete. */}
        <div style={{ marginTop: '2.25rem', paddingTop: '1.5rem', borderTop: `1px solid ${LINE}`,
          fontSize: '0.8rem', lineHeight: 1.7, color: BODY, display: 'flex',
          flexDirection: 'column', gap: '0.45rem', maxWidth: '62rem' }}>
          {tax && <p>{tax}</p>}
          <p>
            It is a {ORG.incorporation.state} nonprofit public benefit corporation,
            entity number {ORG.incorporation.entityNumber}, incorporated
            {' '}{fmtDate(ORG.incorporation.initialFilingDate)}. Principal office:
            {' '}{officeStreet}, {officeCity}.
          </p>
          {registry && <p>{registry}</p>}
          <p>
            Check it yourself:{' '}
            <a href={PUBLIC_RECORDS.irsSearchUrl} target="_blank" rel="noopener noreferrer"
              className="site-footer-link" style={{ color: CONNECT_INK }}>
              IRS Tax Exempt Organization Search
            </a>
            {' '}(EIN {ORG.taxStatus.ein}),{' '}
            <a href={PUBLIC_RECORDS.caBusinessSearchUrl} target="_blank" rel="noopener noreferrer"
              className="site-footer-link" style={{ color: CONNECT_INK }}>
              California Secretary of State
            </a>
            {' '}(entity {ORG.incorporation.entityNumber}), and our{' '}
            <Link href="/governance" className="site-footer-link" style={{ color: CONNECT_INK }}>
              filings
            </Link>.
          </p>
        </div>

        <div style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem 1.5rem',
          justifyContent: 'space-between', fontSize: '0.78rem', color: SUBTLE }}>
          {/* No "All rights reserved": the books are free to anyone, and the
              publication license is still open decision 15. */}
          <p>© {year} {ORG.legalName}</p>
          <p>
            <Link href="/privacy" className="site-footer-link" style={{ color: SUBTLE }}>
              Student privacy
            </Link>
            <span aria-hidden> · </span>
            <Link href="/governance" className="site-footer-link" style={{ color: SUBTLE }}>
              Governance
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        .site-footer-grid {
          display: grid;
          gap: 2rem 2.5rem;
          grid-template-columns: minmax(0, 1.4fr) repeat(3, minmax(0, 1fr));
        }
        .site-footer-link:hover { text-decoration: underline; text-underline-offset: 3px; }
        @media (max-width: 900px) {
          .site-footer-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 520px) {
          .site-footer-grid { grid-template-columns: minmax(0, 1fr); }
        }
      `}</style>
    </footer>
  );
}
