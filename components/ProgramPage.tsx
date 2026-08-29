'use client';

import Link from 'next/link';
import {
  ArrowUpRight, CheckCircle, Circle, PenTool, FileText, AlertTriangle,
} from 'lucide-react';
import {
  Page, Hero, Section, Eyebrow, Title, FadeIn, Card,
  WHITE, MUTED, SLATE_3, GOLD, GOLD_L, ROYAL_L, GREEN_L, DISPLAY,
} from '@/components/kit';
import { CURRICULUM, STATUS_LABEL } from '@/content/org';
import type { ProgramSpec, Accent } from '@/content/programs';

const ACCENT: Record<Accent, string> = {
  royal: ROYAL_L,
  gold:  GOLD_L,
  green: GREEN_L,
};

/**
 * One renderer for all three enterprise programs.
 *
 * The status banner is not decoration. Every one of these programs is designed
 * and not yet written, and a visitor should know that before they read a
 * syllabus that reads like a finished product.
 */
export default function ProgramPage({ spec }: { spec: ProgramSpec }) {
  const accent = ACCENT[spec.accent];
  const strand = CURRICULUM.find((s) => s.key === spec.strandKey);
  const lines  = spec.titleLines;

  return (
    <Page>
      <Hero
        eyebrow={spec.eyebrow}
        accent={accent}
        title={
          <>
            {lines.slice(0, -1).map((l) => <span key={l}>{l}<br /></span>)}
            <span style={{ color: accent }}>{lines[lines.length - 1]}</span>
          </>
        }
        lede={
          <>
            {spec.lede.map((p, i) => (
              <p key={i} style={{ marginBottom: i === spec.lede.length - 1 ? 0 : '0.9rem' }}>{p}</p>
            ))}
          </>
        }
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem' }}>
          <Link href="/curriculum" className="btn-ghost">
            Where this sits in the map <ArrowUpRight size={13} />
          </Link>
          <Link href="/resources" className="btn-ghost">
            What is finished today <ArrowUpRight size={13} />
          </Link>
        </div>
      </Hero>

      {/* ── Status, stated before the syllabus ─────────── */}
      <Section tinted accent={GOLD}>
        <FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(2rem, 5vw, 3.5rem)', alignItems: 'start' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.4rem 0.85rem', background: 'rgba(232,201,79,0.1)',
                border: '1px solid rgba(232,201,79,0.3)', borderRadius: '2px',
                marginBottom: '1.25rem' }}>
                <PenTool size={13} color={GOLD_L} />
                <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.16em',
                  textTransform: 'uppercase' as const, color: GOLD_L }}>Designed, not yet written</span>
              </div>
              <Title size="clamp(1.7rem, 3.4vw, 2.7rem)">
                READ THIS BEFORE<br />YOU READ THE SYLLABUS.
              </Title>
            </div>
            <div>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.85, color: MUTED, marginBottom: '1rem' }}>
                The syllabus below is real and it is finished. The materials that would let a
                teacher run it are not. No class has taken this program, so there is nothing on
                this page about results, and there will not be until there is something true to
                report.
              </p>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.85, color: WHITE }}>
                One thing is written, printed and free to run this year: the Grade 2 mathematics
                course. If you want a program in a classroom in September, that is the one.{' '}
                <Link href="/for-schools" style={{ color: GOLD_L, textDecoration: 'none',
                  borderBottom: `1px solid ${GOLD}55` }}>Start there</Link>.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Per grade band status, straight from the curriculum map */}
        {strand && (
          <FadeIn delay={0.12}>
            <div style={{ marginTop: '2.5rem', display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem' }}>
              {strand.bands.map((b) => {
                const on = b.status !== 'n/a';
                return (
                  <div key={b.band} style={{ padding: '0.9rem 1rem',
                    background: on ? 'rgba(15,23,42,0.6)' : 'transparent',
                    border: `1px solid ${on ? 'rgba(232,201,79,0.2)' : 'rgba(148,163,184,0.12)'}`,
                    borderRadius: '3px' }}>
                    <p style={{ fontSize: '0.8rem', fontWeight: 700,
                      color: on ? WHITE : SLATE_3 }}>{b.band}</p>
                    <p style={{ fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.12em',
                      textTransform: 'uppercase' as const, marginTop: '0.3rem',
                      color: on ? GOLD_L : SLATE_3 }}>
                      {b.status === 'n/a' ? 'Does not run here' : STATUS_LABEL[b.status]}
                    </p>
                    {b.note && (
                      <p style={{ fontSize: '0.7rem', color: MUTED, marginTop: '0.3rem' }}>{b.note}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </FadeIn>
        )}
      </Section>

      {/* ── The syllabus ───────────────────────────────── */}
      <Section>
        <FadeIn style={{ marginBottom: '2.5rem' }}>
          <Eyebrow color={accent}>{spec.unitsLabel}</Eyebrow>
          <Title size="clamp(1.9rem, 4vw, 3.2rem)">WHAT IS ACTUALLY<br />IN IT.</Title>
          <p style={{ fontSize: '0.92rem', lineHeight: 1.8, color: MUTED, maxWidth: '64ch',
            marginTop: '1rem' }}>
            {spec.unitsIntro}
          </p>
        </FadeIn>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {spec.units.map((u, i) => (
            <FadeIn key={u.n} delay={Math.min(i, 4) * 0.05}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 'clamp(1.25rem, 3vw, 2.5rem)', padding: 'clamp(1.25rem, 3vw, 1.75rem)',
                background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(37,99,235,0.13)',
                borderRadius: '4px', borderLeft: `2px solid ${accent}` }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.85rem',
                    marginBottom: '0.5rem' }}>
                    <span style={{ fontFamily: DISPLAY, fontSize: '1.9rem', lineHeight: 1,
                      color: accent, letterSpacing: '0.04em' }}>{u.n}</span>
                    <span style={{ fontSize: '0.64rem', fontWeight: 800, letterSpacing: '0.16em',
                      textTransform: 'uppercase' as const, color: MUTED }}>{u.when}</span>
                  </div>
                  <h3 style={{ fontFamily: DISPLAY, fontSize: '1.5rem', letterSpacing: '0.03em',
                    lineHeight: 1.05, color: WHITE }}>{u.title.toUpperCase()}</h3>
                  {u.tagline && (
                    <p style={{ fontSize: '0.83rem', fontStyle: 'italic', color: accent,
                      marginTop: '0.5rem' }}>{u.tagline}</p>
                  )}
                  <p style={{ fontSize: '0.87rem', lineHeight: 1.8, color: MUTED,
                    marginTop: '0.75rem' }}>{u.desc}</p>
                </div>

                <div>
                  <p style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.18em',
                    textTransform: 'uppercase' as const, color: SLATE_3, marginBottom: '0.7rem' }}>
                    Covered
                  </p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column',
                    gap: '0.5rem' }}>
                    {u.items.map((it) => (
                      <li key={it} style={{ display: 'flex', gap: '0.6rem', fontSize: '0.83rem',
                        lineHeight: 1.6, color: MUTED }}>
                        <Circle size={7} color={accent} style={{ flexShrink: 0, marginTop: '0.45rem' }} />
                        {it}
                      </li>
                    ))}
                  </ul>
                  {u.deliverable && (
                    <div style={{ marginTop: '1rem', paddingTop: '0.85rem',
                      borderTop: '1px solid rgba(148,163,184,0.12)', display: 'flex',
                      gap: '0.55rem', alignItems: 'flex-start' }}>
                      <FileText size={13} color={accent} style={{ flexShrink: 0, marginTop: '2px' }} />
                      <p style={{ fontSize: '0.78rem', lineHeight: 1.6, color: WHITE }}>
                        {u.deliverable}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ── Design principles ──────────────────────────── */}
      <Section tinted>
        <FadeIn style={{ marginBottom: '2.25rem' }}>
          <Eyebrow color={accent}>Why it is built this way</Eyebrow>
          <Title size="clamp(1.8rem, 3.6vw, 2.9rem)">THE DECISIONS<br />BEHIND THE SYLLABUS.</Title>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: '1rem' }}>
          {spec.principles.map((p, i) => (
            <FadeIn key={p.t} delay={i * 0.07}>
              <Card accent={accent} pad="1.6rem">
                <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: WHITE,
                  lineHeight: 1.4, marginBottom: '0.6rem' }}>{p.t}</h3>
                <p style={{ fontSize: '0.84rem', lineHeight: 1.75, color: MUTED }}>{p.d}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ── Exists / does not exist ────────────────────── */}
      <Section>
        <FadeIn style={{ marginBottom: '2.25rem' }}>
          <Eyebrow color={GREEN_L}>Written down against still to write</Eyebrow>
          <Title size="clamp(1.8rem, 3.6vw, 2.9rem)">EXACTLY WHAT<br />EXISTS TODAY.</Title>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1rem' }}>
          <FadeIn>
            <Card accent={GREEN_L} pad="1.7rem">
              <p style={{ fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.18em',
                textTransform: 'uppercase' as const, color: GREEN_L, marginBottom: '1rem' }}>
                Finished and reviewable
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {spec.exists.map((e) => (
                  <li key={e} style={{ display: 'flex', gap: '0.6rem', fontSize: '0.87rem',
                    lineHeight: 1.65, color: MUTED }}>
                    <CheckCircle size={14} color={GREEN_L} style={{ flexShrink: 0, marginTop: '3px' }} />
                    {e}
                  </li>
                ))}
              </ul>
            </Card>
          </FadeIn>
          <FadeIn delay={0.08}>
            <Card accent={GOLD} pad="1.7rem">
              <p style={{ fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.18em',
                textTransform: 'uppercase' as const, color: GOLD_L, marginBottom: '1rem' }}>
                Not written yet
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {spec.notYet.map((e) => (
                  <li key={e} style={{ display: 'flex', gap: '0.6rem', fontSize: '0.87rem',
                    lineHeight: 1.65, color: MUTED }}>
                    <AlertTriangle size={14} color={GOLD_L} style={{ flexShrink: 0, marginTop: '3px' }} />
                    {e}
                  </li>
                ))}
              </ul>
            </Card>
          </FadeIn>
        </div>
        <FadeIn delay={0.2}>
          <p style={{ fontSize: '0.87rem', lineHeight: 1.8, color: MUTED, marginTop: '2rem',
            maxWidth: '70ch' }}>
            We publish the right-hand column because a school deciding whether to wait for this
            program needs to know how far away it is, and because a funder who finds the gap
            themselves will reasonably wonder what else was left out.{' '}
            <Link href="/curriculum" style={{ color: ROYAL_L, textDecoration: 'none',
              borderBottom: '1px solid rgba(59,130,246,0.4)' }}>The full map</Link> carries the
            same status for every grade band we have not reached.
          </p>
        </FadeIn>
      </Section>

      {/* ── CTA ────────────────────────────────────────── */}
      <Section tinted accent={GOLD}>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '1.75rem' }}>
            <div style={{ maxWidth: '58ch' }}>
              <Title size="clamp(1.6rem, 3.2vw, 2.5rem)">WANT THIS ONE<br />BUILT SOONER?</Title>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: MUTED, marginTop: '1rem' }}>
                What moves a program from designed to written is a school willing to run the
                first one and the funding to write the materials properly. If either of those is
                you, that is the conversation we want to have.
              </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <Link href="/partner" className="btn-gold">Start a conversation <ArrowUpRight size={14} /></Link>
              <Link href="/for-schools" className="btn-ghost">Run the finished one <ArrowUpRight size={13} /></Link>
            </div>
          </div>
        </FadeIn>
      </Section>
    </Page>
  );
}
