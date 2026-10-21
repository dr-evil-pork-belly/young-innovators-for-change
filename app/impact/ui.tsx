'use client';

import Link from 'next/link';
import {
  ArrowUpRight, BookOpen, FlaskConical, AlertTriangle, ExternalLink,
  CheckCircle,
} from 'lucide-react';
import {
  Page, Hero, Section, Eyebrow, Title, FadeIn, Card,
  WHITE, MUTED, SLATE_3, GOLD, GOLD_L, ROYAL_L, GREEN_L, DISPLAY,
} from '@/components/kit';
import {
  PROGRAM_FACTS, VERIFIED_STATS, hasOutcomeStats, hasTestimonials,
  TESTIMONIALS, trustBadges, ORG, RESEARCH, ASSUMPTIONS, DELIVERY,
} from '@/content/org';

/**
 * Until 16 October 2026 this page described the evaluation of a Grade 2
 * classroom pilot: a matched-classroom quasi-experiment across four to eight
 * classrooms, five measures, and three pre-committed disconfirming results.
 * That pilot was retired with /for-schools (claude/38-retiring-for-schools.md).
 * The first program the organization runs and measures is the summer cohort
 * in DELIVERY.summerIntensive, and its design is not registered yet, so this
 * page says what will be registered and when, and does not invent measures to
 * fill the space. The classroom study's withdrawal is stated on the page
 * rather than deleted quietly, because a pre-commitment that disappears
 * without a word is worse than one that is withdrawn in public.
 */

// ── The literature behind the mathematics line ───────────────────────────────
// These four are the case for discrete mathematics as elementary enrichment.
// They are the working paper's sources, and they say nothing about the
// business and money line, whose research base is RESEARCH in org.ts and is
// rendered in full on /pathway.
const MATH_SOURCES = [
  {
    cite: 'Rosenstein, Franzblau & Roberts (eds.), 1997',
    title: 'Discrete Mathematics in the Schools',
    where: 'DIMACS Vol. 36 · American Mathematical Society and NCTM',
    says: 'The founding case that discrete math (the math of counting, networks and logic '
        + 'puzzles) can and should be taught in school, starting as early as kindergarten, '
        + 'as a way to teach reasoning rather than one more topic fighting for time.',
    strength: 'An argument, not a test',
  },
  {
    cite: 'Hamkins, 2014',
    title: 'Math for seven-year-olds',
    where: 'Second-grade classroom account',
    says: 'Children aged seven and eight learned map-coloring puzzles and the Seven Bridges '
        + 'of Königsberg (can you find a walk that crosses every bridge exactly once?), then '
        + 'made up puzzles of their own. Almost exactly the content of Weeks 17, 18, 26 and 27.',
    strength: 'Shows it can be done',
  },
  {
    cite: 'Blanco & García-Moya, 2021',
    title: 'Graph theory for primary school students with high skills in mathematics',
    where: 'Mathematics 9(13), 1567',
    says: 'Children aged 6 to 11 worked on map coloring, routes through networks and the '
        + 'handshake problem. They became more motivated and started finding their own ways '
        + 'to solve problems.',
    strength: 'Small study, seven top students',
  },
  {
    cite: 'Ferrarello, Gionfriddo, Grasso & Mammana, 2022',
    title: 'Graph theory and combinatorial calculus',
    where: 'ZDM – Mathematics Education 54, 847–864',
    says: 'A careful study showing students can turn real situations into network diagrams '
        + 'and reason about how things can be arranged when there are rules to follow.',
    strength: 'Careful study, but eighth grade',
  },
];

export default function ImpactUi() {
  const cohort = DELIVERY.summerIntensive;
  const countervailing = RESEARCH.filter((c) => c.countervailing).length;

  return (
    <Page>
      <Hero
        eyebrow="Evidence & accountability"
        title={<>No cohort<br />has run yet.<br /><span style={{ color: GOLD_L }}>Here is everything else.</span></>}
        lede={
          <>
            <p style={{ marginBottom: '0.9rem' }}>
              Most organizations put their best numbers on this page. We do not have any yet, so
              this page holds what we do have: what has been built, the research it rests on,
              how the first cohort will be measured, and the assumptions that would have to
              fail for the whole thing to be wrong.
            </p>
            <p style={{ margin: 0 }}>
              When there are outcomes, they will appear here, favorable or not.
            </p>
          </>
        }
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.75rem' }}>
          {trustBadges().map((b) => (
            <span key={b} style={{ padding: '0.35rem 0.75rem', background: 'rgba(255,122,61,0.1)',
              border: '1px solid rgba(255,122,61,0.28)', borderRadius: '2px', fontSize: '0.66rem',
              fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const,
              color: GOLD_L }}>{b}</span>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem' }}>
          <Link href="/partner" className="btn-gold">Fund the first cohort <ArrowUpRight size={14} /></Link>
          <Link href="/pathway#research" className="btn-ghost">
            The research, paper by paper <ArrowUpRight size={13} />
          </Link>
        </div>
      </Hero>

      {/* ── What exists ────────────────────────────────── */}
      <Section tinted>
        <FadeIn style={{ marginBottom: '2.5rem' }}>
          <Eyebrow>What exists today</Eyebrow>
          <Title size="clamp(1.9rem, 4vw, 3.4rem)">Built, not claimed.</Title>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.75rem' }}>
          {[...VERIFIED_STATS, ...PROGRAM_FACTS].map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.06}>
              <div>
                <div style={{ fontFamily: DISPLAY, fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                  lineHeight: 1.06, color: ROYAL_L }}>{s.value}</div>
                <div style={{ fontSize: '0.83rem', fontWeight: 700, color: WHITE, marginTop: '0.3rem' }}>{s.label}</div>
                {s.note && <div style={{ fontSize: '0.74rem', color: MUTED, marginTop: '0.15rem' }}>{s.note}</div>}
              </div>
            </FadeIn>
          ))}
        </div>
        {!hasOutcomeStats && (
          <FadeIn delay={0.3}>
            <p style={{ fontSize: '0.82rem', color: SLATE_3, marginTop: '2rem', maxWidth: '68ch' }}>
              Note what is absent: students served, districts reached, engagement, score gains.
              Those are outcome claims and we have none, because no cohort has run the program.
              This section will grow from the left as that changes.
            </p>
          </FadeIn>
        )}
      </Section>

      {/* ── The research base ──────────────────────────── */}
      <Section>
        <FadeIn style={{ marginBottom: '2.5rem' }}>
          <Eyebrow color={GOLD}>The research base</Eyebrow>
          <Title size="clamp(1.9rem, 4vw, 3.4rem)">What the research<br />does and does not show.</Title>
          <p style={{ fontSize: '0.9rem', color: MUTED, maxWidth: '64ch', marginTop: '1rem' }}>
            Our business and money lessons are built on {RESEARCH.length} published studies,
            and {countervailing === 1 ? 'one of them argues' : `${countervailing} of them argue`} against
            money classes like ours. None of them tested our lessons. Each one is below in
            plain words. The pathway page has the full detail on every study, including where
            it stops backing us up.
          </p>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0.75rem' }}>
          {RESEARCH.map((c, i) => {
            const accent = c.countervailing ? '#B42318' : ROYAL_L;
            return (
              <FadeIn key={c.title} delay={Math.min(i * 0.04, 0.3)}>
                <a href={c.url} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'block', height: '100%', padding: '1rem 1.15rem',
                    background: '#FFFFFF', borderRadius: '4px', textDecoration: 'none',
                    border: `1px solid ${c.countervailing ? 'rgba(180,35,24,0.28)' : 'rgba(45,91,227,0.14)'}`,
                    borderLeft: `2px solid ${accent}` }}>
                  {c.countervailing && (
                    <p style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.6rem',
                      fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase' as const,
                      color: accent, marginBottom: '0.45rem' }}>
                      <AlertTriangle size={11} /> Argues against us
                    </p>
                  )}
                  <p style={{ fontSize: '0.86rem', lineHeight: 1.65, color: WHITE,
                    marginBottom: '0.5rem' }}>{c.plain}</p>
                  <p style={{ fontSize: '0.74rem', color: MUTED, display: 'flex', alignItems: 'center',
                    gap: '0.35rem' }}>
                    {c.authors}, {c.year} <ExternalLink size={10} color={accent} />
                  </p>
                </a>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.3}>
          <p style={{ fontSize: '0.87rem', lineHeight: 1.8, color: MUTED, marginTop: '1.5rem', maxWidth: '70ch' }}>
            Start with the study that argues against us. It found that what people learn in
            a money class mostly wears off within two years. Our answer is to spread the
            lessons over ten years instead of one course, but nobody has tested whether that
            works, including us.{' '}
            <Link href="/pathway#research" style={{ color: ROYAL_L, textDecoration: 'none',
              borderBottom: '1px solid rgba(45,91,227,0.4)' }}>
              Every study, with its limits
            </Link>.
          </p>
        </FadeIn>
      </Section>

      {/* ── The mathematics line's base ────────────────── */}
      <Section tinted>
        <FadeIn style={{ marginBottom: '2.5rem' }}>
          <Eyebrow>The mathematics line</Eyebrow>
          <Title size="clamp(1.8rem, 3.6vw, 2.9rem)">Four sources, and<br />a gap we could not close.</Title>
          <p style={{ fontSize: '0.9rem', color: MUTED, maxWidth: '64ch', marginTop: '1rem' }}>
            The discrete math years rest on different research. Four sources make that case.
            Each one says what it actually shows, including where a study is too small, or
            used older students, to prove what we would like it to prove.
          </p>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))', gap: '1rem' }}>
          {MATH_SOURCES.map((s, i) => (
            <FadeIn key={s.cite} delay={i * 0.07}>
              <Card accent={i === 1 ? GOLD : ROYAL_L} pad="1.6rem">
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem',
                  alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <BookOpen size={16} color={i === 1 ? GOLD : ROYAL_L} />
                  <span style={{ padding: '0.2rem 0.55rem', border: `1px solid ${i === 1 ? GOLD : ROYAL_L}30`,
                    borderRadius: '2px', fontSize: '0.58rem', fontWeight: 800, letterSpacing: '0.12em',
                    textTransform: 'uppercase' as const, color: i === 1 ? GOLD : ROYAL_L,
                    textAlign: 'right', lineHeight: 1.5 }}>{s.strength}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.98rem', fontWeight: 700, color: WHITE, lineHeight: 1.4 }}>{s.title}</h3>
                <p style={{ fontSize: '0.74rem', color: i === 1 ? GOLD : ROYAL_L, fontWeight: 600, margin: '0.2rem 0 0.15rem' }}>{s.cite}</p>
                <p style={{ fontSize: '0.72rem', color: SLATE_3, marginBottom: '0.8rem' }}>{s.where}</p>
                <p style={{ fontSize: '0.83rem', lineHeight: 1.75, color: MUTED }}>{s.says}</p>
              </Card>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div style={{ marginTop: '1.5rem', background: 'rgba(180,35,24,0.06)',
            border: '1px solid rgba(180,35,24,0.25)', borderRadius: '4px', padding: '1.5rem 1.75rem' }}>
            <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
              <AlertTriangle size={17} color="#B42318" style={{ flexShrink: 0, marginTop: '3px' }} />
              <div>
                <p style={{ fontSize: '0.92rem', fontWeight: 700, color: WHITE, marginBottom: '0.5rem' }}>
                  No one has tested a program like this at this age.
                </p>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.75, color: MUTED, maxWidth: '70ch' }}>
                  We could not find a single study that compared young elementary students who
                  got a discrete math program with students who did not, and measured the
                  results. Anyone who tells you the evidence here is strong is overstating it.
                  The working paper lays out the case, and the gap, in full.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.36}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.5rem' }}>
            <a href="/downloads/structure-before-fluency.pdf" className="btn-gold">
              <FlaskConical size={14} /> Read the working paper
            </a>
            <Link href="/resources" className="btn-ghost">All materials <ArrowUpRight size={13} /></Link>
          </div>
        </FadeIn>
      </Section>

      {/* ── How we will measure ────────────────────────── */}
      <Section accent={GOLD}>
        <FadeIn style={{ marginBottom: '2.5rem' }}>
          <Eyebrow color={GREEN_L}>The evaluation</Eyebrow>
          <Title size="clamp(1.9rem, 4vw, 3.4rem)">How we will know.</Title>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(2rem, 5vw, 3.5rem)', alignItems: 'start' }}>
          <FadeIn>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.85, color: MUTED, marginBottom: '1rem' }}>
              The first program we run and measure is the summer cohort. {cohort.theClaim}
            </p>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.85, color: MUTED, marginBottom: '1rem' }}>
              Its evaluation design will be registered on the Open Science Framework before the
              first summer starts, so that the measures, the comparison, and the results that
              would count against us are fixed in public before any data exists and cannot be
              moved afterward.
            </p>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.85, color: WHITE }}>
              It is not registered yet, because there is no host district yet, and a design
              written for a program whose site, dates and cohort size are unknown would have to
              be quietly rewritten once they were. {cohort.ask}{' '}
              <Link href="/partner" style={{ color: GOLD_L, textDecoration: 'none',
                borderBottom: `1px solid ${GOLD}55` }}>That is the open ask</Link>.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ background: '#FFFFFF', border: '1px solid rgba(45,91,227,0.14)',
              borderRadius: '4px', padding: '1.5rem 1.75rem' }}>
              <p style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.18em',
                textTransform: 'uppercase' as const, color: GREEN_L, marginBottom: '0.9rem' }}>
                What the registration will fix in advance
              </p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex',
                flexDirection: 'column', gap: '0.65rem' }}>
                {[
                  'The questions, which are the assumptions below, each with the result that would mean it failed',
                  'The measures and when they are taken, including a follow-up after the program ends',
                  'Who is compared with whom, and why that comparison is the honest one available',
                  'A commitment to publish the result either way, here, with the data where consent allows',
                ].map((x) => (
                  <li key={x} style={{ display: 'flex', gap: '0.6rem', fontSize: '0.86rem',
                    lineHeight: 1.65, color: MUTED }}>
                    <CheckCircle size={14} color={GREEN_L} style={{ flexShrink: 0, marginTop: '3px' }} />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.2}>
          <p style={{ fontSize: '0.8rem', lineHeight: 1.75, color: SLATE_3, marginTop: '2rem', maxWidth: '74ch' }}>
            Until 16 October 2026 this page carried the design of a Grade 2 classroom study, with
            five measures and three pre-committed results that would have shown it failed. That
            study is withdrawn, because there is no classroom pilot: the first measured program
            is the cohort above. We say so here rather than letting the commitment disappear.
          </p>
        </FadeIn>
      </Section>

      {/* ── What would show we are wrong ───────────────── */}
      <Section tinted>
        <FadeIn style={{ marginBottom: '2rem' }}>
          <Eyebrow color="#B42318">Load-bearing</Eyebrow>
          <Title size="clamp(1.9rem, 4vw, 3.4rem)">What would show<br />we are wrong.</Title>
          <p style={{ fontSize: '0.9rem', color: MUTED, maxWidth: '62ch', marginTop: '1rem' }}>
            The cohort study exists to test these. Each one is an assumption the design rests
            on, with the specific way it could fail. The same list is on the mission page, read
            from the same file, so the two cannot drift apart.
          </p>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          {ASSUMPTIONS.map((a, i) => (
            <FadeIn key={a.text} delay={i * 0.06}>
              <div style={{ background: '#FFFFFF', border: '1px solid rgba(180,35,24,0.18)',
                borderRadius: '4px', padding: '1.4rem 1.6rem', height: '100%' }}>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: WHITE, fontWeight: 600,
                  marginBottom: '0.75rem' }}>{a.text}</p>
                <div style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-start',
                  paddingTop: '0.75rem', borderTop: '1px solid rgba(180,35,24,0.12)' }}>
                  <AlertTriangle size={14} color="#B42318" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <p style={{ fontSize: '0.82rem', lineHeight: 1.7, color: MUTED }}>{a.risk}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ── Money ──────────────────────────────────────── */}
      {/* Until 16 October 2026 this section carried a cost table: workbooks at
          a typed print rate, $105 per classroom of 24, $4.40 a student. Nothing
          in content/org.ts held those numbers and nobody had computed them
          (05-open-decisions.md, item 8). The same figure was pulled off
          /for-schools the same day. No dollar figure returns here until it is
          a number somebody calculated, with the working kept. */}
      <Section>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          <FadeIn>
            <Eyebrow>Cost</Eyebrow>
            <Title size="clamp(1.8rem, 3.6vw, 2.9rem)">What a program<br />actually costs.</Title>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: MUTED, maxWidth: '52ch', marginTop: '1rem' }}>
              Not published yet, and not because it is embarrassing. We have not finished
              computing it, and a figure written for a web page is not the same thing as a
              figure somebody worked out.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ background: '#FFFFFF', border: '1px solid rgba(255,122,61,0.16)',
              borderRadius: '4px', padding: '1.6rem 1.8rem' }}>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: MUTED, marginBottom: '0.9rem' }}>
                The materials cost nothing. Every workbook and teacher guide is free to download,
                so a school with its own copier runs a year for the cost of paper.
              </p>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: MUTED, marginBottom: '0.9rem' }}>
                What a delivered program costs, with instructor hours at a real rate, printing,
                materials and the seed money the venture weeks need, is being worked out with the
                arithmetic kept. When it is done it goes here, and on the partner page, as one
                number with its working.
              </p>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.75, color: WHITE }}>
                If you are assessing us and need that figure before it is published, ask, and we
                will send what we have and say what it does not yet include.
              </p>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* ── Voices, withheld ───────────────────────────── */}
      {!hasTestimonials && (
        <Section tinted>
          <FadeIn>
            <div style={{ background: '#FFFFFF', border: '1px dashed rgba(45,91,227,0.25)',
              borderRadius: '4px', padding: '2.5rem 3rem', maxWidth: '860px' }}>
              <Eyebrow>Voices from the field</Eyebrow>
              <Title size="clamp(1.7rem, 3.4vw, 2.8rem)">This space is for<br />our first cohort.</Title>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: MUTED, maxWidth: '58ch', marginTop: '1rem' }}>
                When students, teachers and families have something to say about the programs,
                their words will appear here with their permission and their real names, and not
                before.
              </p>
            </div>
          </FadeIn>
        </Section>
      )}

      {hasTestimonials && (
        <Section tinted>
          <FadeIn style={{ marginBottom: '2rem' }}><Eyebrow>Voices from the field</Eyebrow><Title>What they say.</Title></FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
            {TESTIMONIALS.map((t) => (
              <Card key={t.name} accent={ROYAL_L} pad="1.6rem">
                <p style={{ fontSize: '0.92rem', lineHeight: 1.8, color: WHITE, fontStyle: 'italic',
                  marginBottom: '1rem' }}>&ldquo;{t.quote}&rdquo;</p>
                <p style={{ fontSize: '0.85rem', fontWeight: 700, color: WHITE }}>{t.name}</p>
                <p style={{ fontSize: '0.75rem', color: MUTED }}>{t.role}</p>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {/* ── CTA ────────────────────────────────────────── */}
      <Section>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <p style={{ fontFamily: DISPLAY, fontSize: '2rem', letterSpacing: '-0.01em',
                color: WHITE, marginBottom: '0.4rem' }}>Check us before you fund us.</p>
              <p style={{ fontSize: '0.85rem', color: MUTED, maxWidth: '56ch' }}>
                Registration, filings and open gaps are published in full, including the board
                seats we have not filled. If something you need is missing, ask and we will
                send it. {ORG.legalName} · EIN {ORG.taxStatus.ein}.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href="/partner" className="btn-gold">Fund the first cohort <ArrowUpRight size={14} /></Link>
              <Link href="/governance" className="btn-ghost">Read the filings <ArrowUpRight size={13} /></Link>
            </div>
          </div>
        </FadeIn>
      </Section>
    </Page>
  );
}
