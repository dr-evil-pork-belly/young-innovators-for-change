'use client';

import Link from 'next/link';
import { ArrowUpRight, ExternalLink, ShieldCheck, FileText, AlertTriangle } from 'lucide-react';
import {
  Page, Hero, Section, Eyebrow, Title, FadeIn, FactRow, Card,
  WHITE, MUTED, SLATE_3, GOLD, GOLD_L, ROYAL_L, GREEN_L,
  DISPLAY,
} from '@/components/kit';
import {
  ORG, TRANSPARENCY, PUBLIC_RECORDS, LEADERSHIP, BOARD,
  hasBoard, trustBadges, taxLine, fmtDate,
} from '@/content/org';

export default function GovernanceUi() {
  const inc = ORG.incorporation;

  return (
    <Page>
      <Hero
        eyebrow="Governance & Transparency"
        accent={GOLD_L}
        title={<>EVERYTHING<br /><span style={{ color: GOLD_L }}>CHECKABLE.</span></>}
        lede={
          <>
            <p style={{ marginBottom: '0.9rem' }}>
              Our registration, our filings, who runs the organization, and the things we have
              not done yet. Every item below is either a public record you can pull up yourself
              or an open gap we are naming before you have to ask.
            </p>
            <p style={{ margin: 0 }}>
              We are a young organization. The honest version of that is more useful to a funder
              than a polished one.
            </p>
          </>
        }
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {trustBadges().map((b) => (
            <span key={b} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
              padding: '0.4rem 0.8rem', background: 'rgba(201,168,76,0.1)',
              border: '1px solid rgba(201,168,76,0.3)', borderRadius: '2px',
              fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em',
              textTransform: 'uppercase' as const, color: GOLD_L }}>
              <ShieldCheck size={12} /> {b}
            </span>
          ))}
        </div>
      </Hero>

      {/* ── The record ─────────────────────────────────── */}
      <Section tinted accent={GOLD}>
        <FadeIn style={{ marginBottom: '2rem' }}>
          <Eyebrow color={GOLD_L}>The record</Eyebrow>
          <Title size="clamp(1.9rem, 4vw, 3.2rem)">LEGAL STATUS.</Title>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div style={{ maxWidth: '840px' }}>
            <FactRow label="Legal name" value={ORG.legalName} />
            <FactRow label="EIN" value={ORG.taxStatus.ein}
              source="Verifiable in the IRS Tax Exempt Organization Search" />
            <FactRow label="Federal status"
              value="501(c)(3) public charity, determination letter issued"
              source={`Determined ${fmtDate(ORG.taxStatus.determinationDate)} · IRS deductibility code ${ORG.taxStatus.deductibilityCode}`} />
            <FactRow label="IRS Publication 78"
              value={ORG.taxStatus.onPub78 ? 'Listed; contributions are deductible' : 'Not listed'} />
            <FactRow label="State of incorporation"
              value={`${inc.entityType}, ${inc.state}`}
              source={`Entity number ${inc.entityNumber} · first filed ${fmtDate(inc.initialFilingDate)}`} />
            <FactRow label="Entity status"
              value={`${inc.status}, good standing`}
              source={`Good standing with: ${inc.standings.join(', ')}`} />
            <FactRow label="Most recent filing"
              value={`Form ${TRANSPARENCY.form990Form}, tax period ${TRANSPARENCY.form990LatestPeriod}`}
              source={`Gross receipts attested at or below $${TRANSPARENCY.grossReceiptsUnder.toLocaleString()}`} />
            <FactRow label="Next filing due"
              value={`California Statement of Information, due ${fmtDate(inc.statementOfInfoDue)}`} />
            <FactRow label="Registered office"
              value={<>{ORG.registeredAddress.line1}<br />{ORG.registeredAddress.line2}</>}
              source="Registered office of the corporation; programs are delivered in the service area below" />
            <FactRow label="Service area" value={ORG.serviceArea} />
            {ORG.contactEmail && (
              <FactRow label="Contact"
                value={<a href={`mailto:${ORG.contactEmail}`} style={{ color: GOLD }}>
                  {ORG.contactEmail}</a>}
                source="A monitored inbox. Every form on this site delivers here." />
            )}
          </div>
        </FadeIn>

        <FadeIn delay={0.14}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '2rem' }}>
            <a href={PUBLIC_RECORDS.irsSearchUrl} target="_blank" rel="noopener noreferrer"
              className="btn-ghost">
              Verify with the IRS <ExternalLink size={13} />
            </a>
            <a href={PUBLIC_RECORDS.caBusinessSearchUrl} target="_blank" rel="noopener noreferrer"
              className="btn-ghost">
              California business search <ExternalLink size={13} />
            </a>
          </div>
          <p style={{ fontSize: '0.78rem', color: SLATE_3, marginTop: '0.9rem', maxWidth: '62ch' }}>
            The California search is by entity name or number. Ours is {inc.entityNumber}.
            We link the search rather than a session URL because those expire.
          </p>
        </FadeIn>
      </Section>

      {/* ── People ─────────────────────────────────────── */}
      <Section>
        <FadeIn style={{ marginBottom: '2.5rem' }}>
          <Eyebrow>Who is accountable</Eyebrow>
          <Title size="clamp(1.9rem, 4vw, 3.2rem)">PEOPLE.</Title>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1rem', marginBottom: '2rem' }}>
          {LEADERSHIP.map((p, i) => (
            <FadeIn key={p.name} delay={i * 0.07}>
              <Card accent={ROYAL_L}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '0.9rem' }}>
                  <div style={{ width: '46px', height: '46px', borderRadius: '50%', flexShrink: 0,
                    background: 'linear-gradient(135deg, rgba(37,99,235,0.3), rgba(37,99,235,0.1))',
                    border: '1px solid rgba(59,130,246,0.25)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: DISPLAY, fontSize: '1.05rem', color: ROYAL_L,
                      letterSpacing: '0.06em' }}>{p.initials}</span>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.95rem', fontWeight: 700, color: WHITE }}>{p.name}</p>
                    <p style={{ fontSize: '0.78rem', color: ROYAL_L, fontWeight: 600 }}>{p.title}</p>
                  </div>
                </div>
                {p.area && (
                  <p style={{ fontSize: '0.72rem', letterSpacing: '0.12em',
                    textTransform: 'uppercase' as const, color: MUTED, marginBottom: '0.5rem' }}>
                    {p.area}
                  </p>
                )}
                {p.bio && <p style={{ fontSize: '0.82rem', lineHeight: 1.7, color: MUTED }}>{p.bio}</p>}
              </Card>
            </FadeIn>
          ))}
        </div>

        {hasBoard ? (
          <FadeIn>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em',
              textTransform: 'uppercase' as const, color: MUTED, margin: '1rem 0 1rem' }}>
              Board of Directors
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              {BOARD.map((p) => (
                <Card key={p.name} accent={GOLD}>
                  <p style={{ fontSize: '0.92rem', fontWeight: 700, color: WHITE }}>{p.name}</p>
                  <p style={{ fontSize: '0.78rem', color: GOLD_L }}>{p.title}</p>
                </Card>
              ))}
            </div>
          </FadeIn>
        ) : (
          <FadeIn>
            <div style={{ background: 'rgba(180,35,24,0.06)', border: '1px solid rgba(253,162,155,0.25)',
              borderRadius: '4px', padding: '1.5rem 1.75rem', maxWidth: '760px' }}>
              <div style={{ display: 'flex', gap: '0.9rem', alignItems: 'flex-start' }}>
                <AlertTriangle size={17} color="#FDA29B" style={{ flexShrink: 0, marginTop: '3px' }} />
                <div>
                  <p style={{ fontSize: '0.95rem', fontWeight: 700, color: WHITE, marginBottom: '0.5rem' }}>
                    We are recruiting a board of directors.
                  </p>
                  <p style={{ fontSize: '0.85rem', lineHeight: 1.75, color: MUTED, marginBottom: '0.9rem' }}>
                    California public benefit corporations are governed by a board, and most
                    funders expect at least three unrelated members. We are actively recruiting
                    and we would rather say so here than leave the question open. If you have
                    governed a small education nonprofit, or you work in K&ndash;12 curriculum,
                    school administration, or nonprofit finance, we would like to talk.
                  </p>
                  <Link href="/partner" className="btn-ghost">
                    Talk to us about the board <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        )}
      </Section>

      {/* ── Money ──────────────────────────────────────── */}
      <Section tinted>
        <FadeIn style={{ marginBottom: '2rem' }}>
          <Eyebrow>Money</Eyebrow>
          <Title size="clamp(1.9rem, 4vw, 3.2rem)">WHAT WE HAVE,<br />AND WHAT WE DO NOT.</Title>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          <FadeIn>
            <Card accent={GREEN_L}>
              <div style={{ display: 'flex', gap: '0.7rem', alignItems: 'center', marginBottom: '0.9rem' }}>
                <FileText size={16} color={GREEN_L} />
                <p style={{ fontSize: '0.9rem', fontWeight: 700, color: WHITE }}>What we file</p>
              </div>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.75, color: MUTED }}>
                We file Form {TRANSPARENCY.form990Form} annually. Our most recent filing covers
                tax period {TRANSPARENCY.form990LatestPeriod} and attests gross receipts at or
                below ${TRANSPARENCY.grossReceiptsUnder.toLocaleString()}. That filing is public
                through the IRS search linked above.
              </p>
            </Card>
          </FadeIn>
          <FadeIn delay={0.08}>
            <Card accent="#FDA29B">
              <div style={{ display: 'flex', gap: '0.7rem', alignItems: 'center', marginBottom: '0.9rem' }}>
                <AlertTriangle size={16} color="#FDA29B" />
                <p style={{ fontSize: '0.9rem', fontWeight: 700, color: WHITE }}>What we do not have</p>
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.85rem', lineHeight: 1.8, color: MUTED }}>
                <li>No independent audit. At our size the 990-N threshold does not trigger one,
                and we will not imply otherwise.</li>
                <li>No published annual report yet. The first one follows the first pilot.</li>
                <li>No measured program outcomes. No cohort has completed.</li>
                {!TRANSPARENCY.caRegistryConfirmed && (
                  <li>California Registry of Charities standing is being confirmed and will be
                  posted here with the registration number.</li>
                )}
              </ul>
            </Card>
          </FadeIn>
        </div>

        <FadeIn delay={0.16}>
          <div style={{ marginTop: '1.5rem', padding: '1.4rem 1.6rem', background: 'rgba(15,23,42,0.6)',
            border: '1px solid rgba(37,99,235,0.14)', borderRadius: '4px', maxWidth: '820px' }}>
            <p style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.16em',
              textTransform: 'uppercase' as const, color: ROYAL_L, marginBottom: '0.6rem' }}>
              Deductibility
            </p>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.8, color: MUTED, margin: 0 }}>
              {taxLine()}
            </p>
          </div>
        </FadeIn>
      </Section>

      {/* ── CTA ────────────────────────────────────────── */}
      <Section>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '1.5rem', padding: '2rem 2.5rem', background: 'rgba(30,41,59,0.6)',
            border: '1px solid rgba(201,168,76,0.18)', borderRadius: '4px' }}>
            <div>
              <p style={{ fontFamily: DISPLAY, fontSize: '1.8rem', letterSpacing: '0.02em',
                color: WHITE, marginBottom: '0.4rem' }}>DILIGENCE QUESTIONS?</p>
              <p style={{ fontSize: '0.85rem', color: MUTED, maxWidth: '52ch' }}>
                If you are assessing us for a grant and something here is missing, ask. We would
                rather send you a document than have you guess.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
              gap: '0.6rem' }}>
              <Link href="/partner" className="btn-gold">
                Contact us <ArrowUpRight size={14} />
              </Link>
              {ORG.contactEmail && (
                <a href={`mailto:${ORG.contactEmail}`}
                  style={{ fontSize: '0.78rem', color: MUTED }}>
                  or write to {ORG.contactEmail}
                </a>
              )}
            </div>
          </div>
        </FadeIn>
      </Section>
    </Page>
  );
}
