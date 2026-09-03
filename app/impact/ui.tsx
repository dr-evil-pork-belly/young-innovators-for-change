'use client';

import Link from 'next/link';
import {
  ArrowUpRight, BookOpen, FlaskConical, AlertTriangle,
  XCircle,
} from 'lucide-react';
import {
  Page, Hero, Section, Eyebrow, Title, FadeIn, Card, FactRow,
  WHITE, MUTED, SLATE_3, GOLD, GOLD_L, ROYAL_L, GREEN_L, DISPLAY,
} from '@/components/kit';
import {
  PROGRAM_FACTS, VERIFIED_STATS, hasOutcomeStats, hasTestimonials,
  TESTIMONIALS, trustBadges, ORG,
} from '@/content/org';

// ── The literature actually consulted ─────────────────────────────────────────
const SOURCES = [
  {
    cite: 'Rosenstein, Franzblau & Roberts (eds.), 1997',
    title: 'Discrete Mathematics in the Schools',
    where: 'DIMACS Vol. 36 · American Mathematical Society and NCTM',
    says: 'The foundational curricular case that discrete mathematics can and should be taught '
        + 'in K–12, including material for the K–2 band, and framed as a vehicle for teaching '
        + 'reasoning rather than an extra topic competing for time.',
    strength: 'Curricular argument',
  },
  {
    cite: 'Hamkins, 2013',
    title: 'Math for seven-year-olds',
    where: 'Second-grade classroom account',
    says: 'Vertex coloring, chromatic numbers, Eulerian paths and the Seven Bridges of '
        + 'Königsberg taught to seven- and eight-year-olds, who went on to build their own '
        + 'challenge graphs. Almost exactly the content of Weeks 17, 18, 26 and 27.',
    strength: 'Existence proof',
  },
  {
    cite: 'Blanco & García-Moya, 2021',
    title: 'Graph theory for primary school students with high skills in mathematics',
    where: 'Mathematics 9(13), 1567',
    says: 'Map coloring, the four-color theorem, Eulerian paths, the handshake problem and '
        + 'vertex degree with primary students aged 6–11. Reports increased motivation and the '
        + 'emergence of real problem-solving strategies.',
    strength: 'Small study, seven gifted students',
  },
  {
    cite: 'Ferrarello, Gionfriddo, Grasso & Mammana, 2022',
    title: 'Graph theory and combinatorial calculus',
    where: 'ZDM – Mathematics Education 54, 847–864',
    says: 'A careful study within the Teaching for Robust Understanding framework showing '
        + 'students can model real situations as graphs and reason about constrained arrangements.',
    strength: 'Strong method, but eighth grade',
  },
];

const DISCONFIRM = [
  'Grade-level benchmark performance declines relative to comparison classrooms. That would mean '
  + 'the opportunity cost is real and the supplement is not affordable.',
  'Participation breadth does not move, or moves toward students already identified as '
  + 'high-achieving. That would mean we built a better gifted program, not a wider door.',
  'Teachers do not complete the year. Below roughly two-thirds of weeks, the design has failed '
  + 'regardless of what the other measures say.',
];

const MEASURES = [
  { c: 'Mathematical disposition', i: 'Established elementary attitude scale, administered orally', t: 'Pre and post' },
  { c: 'Reasoning and justification', i: 'Task-based interview on two unfamiliar problems, scored by rubric', t: 'Pre and post' },
  { c: 'Grade-level achievement', i: 'The district’s existing benchmark, no additional testing', t: 'District schedule' },
  { c: 'Participation breadth', i: 'Teacher log: which students volunteer explanations, by week', t: 'Continuous' },
  { c: 'Feasibility', i: 'Weeks completed, minutes spent, teacher exit interview', t: 'Continuous, then post' },
];

export default function ImpactUi() {
  return (
    <Page>
      <Hero
        eyebrow="Evidence & accountability"
        title={<>No cohort<br />has run yet.<br /><span style={{ color: GOLD_L }}>Here is everything else.</span></>}
        lede={
          <>
            <p style={{ marginBottom: '0.9rem' }}>
              Most organizations put their best numbers on this page. We do not have any yet, so
              this page holds what we do have: what has been built, the research it rests on, what
              it costs, exactly how we intend to measure it, and the results that would tell us we
              were wrong.
            </p>
            <p style={{ margin: 0 }}>
              When there are outcomes, they will appear here, favorable or not.
            </p>
          </>
        }
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {trustBadges().map((b) => (
            <span key={b} style={{ padding: '0.35rem 0.75rem', background: 'rgba(255,122,61,0.1)',
              border: '1px solid rgba(255,122,61,0.28)', borderRadius: '2px', fontSize: '0.66rem',
              fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const,
              color: GOLD_L }}>{b}</span>
          ))}
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
              Those are outcome claims and we have none, because no class has run the program.
              This section will grow from the left as that changes.
            </p>
          </FadeIn>
        )}
      </Section>

      {/* ── The research base ──────────────────────────── */}
      <Section>
        <FadeIn style={{ marginBottom: '2.5rem' }}>
          <Eyebrow color={GOLD}>The research base</Eyebrow>
          <Title size="clamp(1.9rem, 4vw, 3.4rem)">What the literature<br />does and does not support.</Title>
          <p style={{ fontSize: '0.9rem', color: MUTED, maxWidth: '64ch', marginTop: '1rem' }}>
            Four sources carry most of the argument. Each is summarized with its actual weight,
            including where a study is too small or at the wrong grade to prove what we would like
            it to prove.
          </p>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))', gap: '1rem' }}>
          {SOURCES.map((s, i) => (
            <FadeIn key={s.cite} delay={i * 0.07}>
              <Card accent={i === 1 ? GOLD : ROYAL_L} pad="1.6rem">
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem',
                  alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <BookOpen size={16} color={i === 1 ? GOLD : ROYAL_L} />
                  <span style={{ padding: '0.2rem 0.55rem', border: `1px solid ${i === 1 ? GOLD : ROYAL_L}30`,
                    borderRadius: '2px', fontSize: '0.58rem', fontWeight: 800, letterSpacing: '0.12em',
                    textTransform: 'uppercase' as const, color: i === 1 ? GOLD : ROYAL_L,
                    whiteSpace: 'nowrap' }}>{s.strength}</span>
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
                  There is no efficacy trial at this grade level.
                </p>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.75, color: MUTED, maxWidth: '70ch' }}>
                  We could locate no randomized or quasi-experimental study of a discrete
                  mathematics enrichment program in the early elementary grades with measured
                  outcomes. Anyone who tells you the evidence base here is strong is overstating
                  it. That gap is the reason the study below exists.
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
      <Section tinted accent={GOLD}>
        <FadeIn style={{ marginBottom: '2.5rem' }}>
          <Eyebrow color={GREEN_L}>The evaluation</Eyebrow>
          <Title size="clamp(1.9rem, 4vw, 3.4rem)">How we will know.</Title>
          <p style={{ fontSize: '0.9rem', color: MUTED, maxWidth: '64ch', marginTop: '1rem' }}>
            A matched-classroom quasi-experiment across four to eight Grade 2 classrooms, run over
            a single school year, with classrooms rather than students as the unit of assignment.
            A randomized design is not realistic at this scale and we will report it as what it is.
          </p>
        </FadeIn>

        <div style={{ maxWidth: '900px' }}>
          {MEASURES.map((m) => (
            <FadeIn key={m.c}>
              <FactRow label={m.c} value={m.i} source={m.t} />
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <p style={{ fontSize: '0.88rem', lineHeight: 1.8, color: MUTED, maxWidth: '66ch', marginTop: '1.75rem' }}>
            The participation-breadth measure is the one we care about most, because it
            operationalizes the actual hypothesis: that a different kind of content changes{' '}
            <em style={{ color: WHITE }}>who</em> gets to be the child explaining something to the
            class.
          </p>
        </FadeIn>
      </Section>

      {/* ── Disconfirming ──────────────────────────────── */}
      <Section>
        <FadeIn style={{ marginBottom: '2rem' }}>
          <Eyebrow color="#B42318">Pre-committed</Eyebrow>
          <Title size="clamp(1.9rem, 4vw, 3.4rem)">What would show<br />we are wrong.</Title>
          <p style={{ fontSize: '0.9rem', color: MUTED, maxWidth: '62ch', marginTop: '1rem' }}>
            Published before data collection, so it cannot be moved afterward.
          </p>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          {DISCONFIRM.map((d, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <div style={{ background: '#FFFFFF', border: '1px solid rgba(180,35,24,0.18)',
                borderRadius: '4px', padding: '1.4rem 1.6rem', height: '100%', display: 'flex',
                gap: '0.75rem', alignItems: 'flex-start' }}>
                <XCircle size={15} color="#B42318" style={{ flexShrink: 0, marginTop: '3px' }} />
                <p style={{ fontSize: '0.85rem', lineHeight: 1.75, color: MUTED }}>{d}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ── Money ──────────────────────────────────────── */}
      <Section tinted>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          <FadeIn>
            <Eyebrow>Cost</Eyebrow>
            <Title size="clamp(1.8rem, 3.6vw, 2.9rem)">What a classroom<br />actually costs.</Title>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: MUTED, maxWidth: '52ch', marginTop: '1rem' }}>
              Published so a principal can see there is no catch and a funder can see what a seat
              costs. These are our internal figures at local print rates, not a price.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ background: '#FFFFFF', border: '1px solid rgba(255,122,61,0.16)',
              borderRadius: '4px', padding: '1.6rem 1.8rem' }}>
              {[
                ['Student workbooks, 77 pages, B&W, bound', '$96', '24 copies at $4.00'],
                ['Teacher guide, printed and bound', '$9', 'One copy; also free online'],
                ['Classroom kit', '$0', 'Already in the room'],
                ['Orientation and year-long support', '$0', 'Volunteer-delivered'],
              ].map(([a, b, c]) => (
                <div key={a} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem',
                  padding: '0.7rem 0', borderBottom: '1px solid rgba(255,122,61,0.1)' }}>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: WHITE }}>{a}</div>
                    <div style={{ fontSize: '0.72rem', color: SLATE_3 }}>{c}</div>
                  </div>
                  <div style={{ fontFamily: DISPLAY, fontSize: '1.3rem', color: GOLD_L, whiteSpace: 'nowrap' }}>{b}</div>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                gap: '1rem', paddingTop: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: WHITE }}>Total per classroom of 24</div>
                  <div style={{ fontSize: '0.75rem', color: MUTED }}>about $4.40 per student for the year</div>
                </div>
                <div style={{ fontFamily: DISPLAY, fontSize: '2rem', color: GOLD }}>$105</div>
              </div>
            </div>
            <p style={{ fontSize: '0.78rem', color: SLATE_3, marginTop: '1rem' }}>
              A school with its own reprographics can run the program for the cost of paper, since every file is free to download.
            </p>
          </FadeIn>
        </div>
      </Section>

      {/* ── Voices, withheld ───────────────────────────── */}
      {!hasTestimonials && (
        <Section>
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
        <Section>
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
      <Section tinted>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <p style={{ fontFamily: DISPLAY, fontSize: '2rem', letterSpacing: '-0.01em',
                color: WHITE, marginBottom: '0.4rem' }}>Check us before you fund us.</p>
              <p style={{ fontSize: '0.85rem', color: MUTED, maxWidth: '56ch' }}>
                Our registration, filings and open gaps are published in full, including a board
                seat we have not filled. {ORG.legalName} · EIN {ORG.taxStatus.ein}.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href="/governance" className="btn-gold">Governance <ArrowUpRight size={14} /></Link>
              <Link href="/partner" className="btn-ghost">Support the work <ArrowUpRight size={13} /></Link>
            </div>
          </div>
        </FadeIn>
      </Section>
    </Page>
  );
}
