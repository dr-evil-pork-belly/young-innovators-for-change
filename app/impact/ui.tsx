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
 * The first program the organization runs and measures was then the summer
 * cohort; since 21 October 2026 it is the Grade 7 app pilot in DELIVERY.pilot.
 * Its design is not registered yet, so this
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
  const pilot = DELIVERY.pilot;
  const countervailing = RESEARCH.filter((c) => c.countervailing).length;

  return (
    <Page>
      <Hero
        eyebrow="Evidence"
        title={<>Our first program<br />has not run yet.<br /><span style={{ color: GOLD_L }}>Here is everything else.</span></>}
        lede={
          <>
            <p style={{ marginBottom: '0.9rem' }}>
              Most groups put their best numbers on this page. We do not have any yet. So this
              page shows what we do have: what we have built, the research behind it, how we
              will measure the first group of students, and what would prove us wrong.
            </p>
            <p style={{ margin: 0 }}>
              When we have results, good or bad, they will go here.
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
          <Link href="/partner#give" className="btn-gold">Make a gift <ArrowUpRight size={14} /></Link>
          <Link href="/pathway#research" className="btn-ghost">
            Every study, in plain words <ArrowUpRight size={13} />
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
              Notice what is missing: how many students we have served, which districts we work
              with, and test score gains. We have none of those numbers, because the program has
              not run yet. They will be added here when they are real.
            </p>
          </FadeIn>
        )}
      </Section>

      {/* ── The research base ──────────────────────────── */}
      <Section>
        <FadeIn style={{ marginBottom: '2.5rem' }}>
          <Eyebrow color={GOLD}>The research</Eyebrow>
          <Title size="clamp(1.9rem, 4vw, 3.4rem)">What the research<br />does and does not show.</Title>
          <p style={{ fontSize: '0.9rem', color: MUTED, maxWidth: '64ch', marginTop: '1rem' }}>
            Our business and money lessons are built on {RESEARCH.length} published studies,
            and {countervailing === 1 ? 'one of them argues' : `${countervailing} of them argue`} against
            financial education like ours. None of them tested our lessons. Each one is below in
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
            a financial education course mostly wears off within two years. Our answer is to spread the
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
              <FlaskConical size={14} /> Read our draft research paper
            </a>
            <Link href="/resources" className="btn-ghost">All materials <ArrowUpRight size={13} /></Link>
          </div>
        </FadeIn>
      </Section>

      {/* ── How we will measure ────────────────────────── */}
      <Section accent={GOLD}>
        <FadeIn style={{ marginBottom: '2.5rem' }}>
          <Eyebrow color={GREEN_L}>How we will measure it</Eyebrow>
          <Title size="clamp(1.9rem, 4vw, 3.4rem)">How we will know.</Title>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(2rem, 5vw, 3.5rem)', alignItems: 'start' }}>
          <FadeIn>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.85, color: MUTED, marginBottom: '1rem' }}>
              The first program we will run and measure is the Grade 7 pilot: self-paced
              lessons in an app with an AI tutor, plus in-person sessions with guests, for
              every seventh grader who wants it, in each middle school that hosts it.{' '}
              {pilot.theClaim}
            </p>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.85, color: MUTED, marginBottom: '1rem' }}>
              Before the first lesson, we will post our plan for measuring it on the Open
              Science Framework, a public site where researchers lock in their plans ahead of
              time. That way, what we measure, who we compare, and what result would count
              against us are all set in public before we have any data. We cannot change them
              later to look better.
            </p>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.85, color: WHITE }}>
              We have not posted it yet because no school district has agreed to host the
              program. A plan written before we know the place, the dates and the number of
              students would have to be rewritten later, and quietly rewriting it is exactly
              what posting it in advance is meant to prevent. Because anyone who wants in
              gets in, the students who join will not be a random draw, and the plan will say
              how it deals with that rather than pretend otherwise. {pilot.ask}{' '}
              <Link href="/partner" style={{ color: GOLD_L, textDecoration: 'none',
                borderBottom: `1px solid ${GOLD}55` }}>That is what we are asking for</Link>.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ background: '#FFFFFF', border: '1px solid rgba(45,91,227,0.14)',
              borderRadius: '4px', padding: '1.5rem 1.75rem' }}>
              <p style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.18em',
                textTransform: 'uppercase' as const, color: GREEN_L, marginBottom: '0.9rem' }}>
                What the plan will lock in ahead of time
              </p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex',
                flexDirection: 'column', gap: '0.65rem' }}>
                {[
                  'The questions we are testing (the list below), and for each one, the result that would mean we were wrong',
                  'What we measure and when, including a check-in after the program ends',
                  'Which students we compare with which, and why that is the fairest comparison we can make',
                  'A promise to publish the results here, good or bad, with the data when families agree to share it',
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
            Until October 16, 2026, this page described a different plan: a study in Grade 2
            classrooms, with five measures and three results we said in advance would show it
            failed. We dropped that study because we are no longer running a classroom pilot.
            The Grade 7 pilot above is now the first one we will measure. We are saying so
            here instead of quietly deleting the old promise.
          </p>
        </FadeIn>
      </Section>

      {/* ── What would show we are wrong ───────────────── */}
      <Section tinted>
        <FadeIn style={{ marginBottom: '2rem' }}>
          <Eyebrow color="#B42318">What we are betting on</Eyebrow>
          <Title size="clamp(1.9rem, 4vw, 3.4rem)">What would show<br />we are wrong.</Title>
          <p style={{ fontSize: '0.9rem', color: MUTED, maxWidth: '62ch', marginTop: '1rem' }}>
            These are the things that have to be true for this to work. Each one says how it
            could turn out to be false. Measuring the first pilot is how we will test
            them. The mission page shows the same list, pulled from the same place, so the two
            always match.
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
              We have not published it yet, and not because it is embarrassing. We have not
              finished working it out, and a number made up for a web page is not the same as a
              number someone actually calculated.
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
                We are still adding up what it costs to actually run the program: the app and
                the AI tutor for each student, the in-person sessions and the people who host
                them, and anything printed. We are keeping every step of the
                math. When it is done, it goes here and on the partner page as one number, with
                the math shown.
              </p>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.75, color: WHITE }}>
                If you are deciding whether to fund us and need the number sooner, ask. We will
                send what we have and tell you what it leaves out.
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
              <Title size="clamp(1.7rem, 3.4vw, 2.8rem)">This space is for<br />our first students.</Title>
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
                Our registration, tax filings and the gaps we still have are all public,
                including the board seats we have not filled yet. If something you need is
                missing, ask and we will send it. {ORG.legalName} · EIN {ORG.taxStatus.ein}.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href="/partner#give" className="btn-gold">Make a gift <ArrowUpRight size={14} /></Link>
              <Link href="/governance" className="btn-ghost">Read the filings <ArrowUpRight size={13} /></Link>
            </div>
          </div>
        </FadeIn>
      </Section>
    </Page>
  );
}
