'use client';

/**
 * The discrete mathematics line, Grades 1 to 6.
 *
 * This page used to be the Grade 2 book. It carried its own copy of the palette,
 * its own FadeIn, and a hand-typed list of twenty standard codes, one of which
 * (2.NBT.3) was not in the book. Everything factual on this page and on the per
 * grade pages now comes from content/mathLine.ts, which is generated out of the
 * curriculum repository by brand/mksite.py. Nothing here is typed twice.
 */

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight, ChevronRight, ChevronDown, Clock, Printer, GraduationCap,
  Lightbulb, Shapes, Sparkles, Download, Layers,
} from 'lucide-react';
import Link from 'next/link';
import {
  Page, Section, Container, FadeIn, fadeUp, fadeIn, stagger,
  WHITE, MUTED, SLATE_2, SLATE_3, GOLD, DISPLAY, SANS,
} from '@/components/kit';
import {
  MATH_LINE, MATH_STANDARD_COUNT, MATH_WEEK_COUNT, MATH_CHECK_COUNT,
  MATH_GRADE_RANGE, MATH_MOVES,
} from '@/content/mathLine';

/** "one, two, three" spelled, so prose can count without a numeral. */
const WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven',
               'eight', 'nine', 'ten'];
const spell = (n: number) => WORDS[n] ?? String(n);
/** Sentence-initial. The lede began with a lowercase "six" without this. */
const Spell = (n: number) => {
  const w = spell(n);
  return w.charAt(0).toUpperCase() + w.slice(1);
};

/** Books whose teacher guide is recomputed from the problems by a script. */
const CHECKED = MATH_LINE.filter((b) => b.checks > 0);
const UNCHECKED = MATH_LINE.filter((b) => b.checks === 0);

/**
 * Pip's three accents, the map colors from the Grade 2 book. These belong to
 * this program rather than to the site, so they stay local rather than going
 * into the shared kit.
 */
const CONNECT_L = '#2149C7';
// Text-safe. The light orange this used to hold, #FF9A69, measures 1.8:1 on the
// tinted band and was carrying the week numbers and every standard code.
const SPARK_L   = '#A8380A';
const GROW_L    = '#0C6B4F';
// Cycles, so the ladder keeps its rhythm however many books there are.
const RUNG = [CONNECT_L, SPARK_L, GROW_L];

const FAQS = [
  {
    q: 'Does this replace the math curriculum?',
    a: 'No. It sits beside it. Every year is sequenced against a typical California pacing '
     + 'guide so each week lands near the standard the class is already teaching, and every '
     + 'assignment names that standard on the page.',
  },
  {
    q: 'How much does a teacher have to prepare?',
    a: 'Nothing beyond photocopying. Every map, grid, graph and diagram is printed on the '
     + 'page. The teacher guide carries the answer key, a running note and the challenge '
     + 'answers for all 36 weeks.',
  },
  {
    q: 'Do the years have to be run in order?',
    a: 'No. Each book is a complete standalone year written against its own grade’s '
     + 'standards, and none of them assumes the year before. A class that starts at Grade 5 '
     + 'is not missing a prerequisite. Run in sequence they do build: the same objects come '
     + 'back doing harder work, and a few weeks say so out loud.',
  },
  {
    q: 'Will it print on a classroom copier?',
    a: 'Yes. Every book is proofed in grayscale and every text style is checked against a '
     + 'print contrast threshold before it ships. Structure lives in the linework and color '
     + 'is accent only, so nothing stops working when the copier strips it.',
  },
  {
    q: 'Is discrete math too hard for elementary students?',
    a: 'It needs very little computational fluency, which is exactly why it works as '
     + 'enrichment. A student still shaky on regrouping can reason well about a map coloring, '
     + 'and be asked to prove it. What it does demand is explanation, and that is the point. '
     + 'The Grade 1 book goes further and assumes the child cannot yet read the page: every '
     + 'week is one sentence and a picture, and the picture is the task.',
  },
  {
    q: 'How do you know the answer keys are right?',
    a: `${CHECKED.length} of the ${MATH_LINE.length} books ship a script that recomputes every `
     + 'numeric answer in the teacher guide from the problem as the workbook states it. Across '
     + `those books that is ${MATH_CHECK_COUNT.toLocaleString('en-US')} answers, rechecked on `
     + 'every build, so a fix to a page that changes an answer fails the build until the guide '
     + `agrees. ${UNCHECKED.map((b) => b.title).join(' and ')} predates that discipline and `
     + 'is not machine checked yet.',
  },
];

function FAQItem({ faq, index }: { faq: typeof FAQS[0]; index: number }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div style={{ borderBottom: '1px solid rgba(45,91,227,0.12)' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '1rem', padding: '1.15rem 0', background: 'transparent', border: 'none',
          cursor: 'pointer', textAlign: 'left', color: WHITE, fontFamily: SANS }}
      >
        <span style={{ fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.5 }}>{faq.q}</span>
        <ChevronRight size={15} color={open ? CONNECT_L : SLATE_3}
          style={{ flexShrink: 0, transform: open ? 'rotate(90deg)' : 'none',
            transition: 'transform 0.22s, color 0.22s' }} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{ overflow: 'hidden' }}>
            <p style={{ fontSize: '0.82rem', lineHeight: 1.75, color: MUTED,
              paddingBottom: '1.15rem', maxWidth: '58ch' }}>{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DiscreteMathLineUi() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY       = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const stats = [
    { value: String(MATH_LINE.length), label: 'school years', sub: MATH_GRADE_RANGE },
    { value: String(MATH_WEEK_COUNT),  label: 'weekly assignments', sub: 'two pages each' },
    { value: String(MATH_STANDARD_COUNT), label: 'CA standards touched', sub: 'reinforced, not replaced' },
    { value: '$0', label: 'prep cost', sub: 'photocopy and go' },
  ];

  return (
    <Page>
      <style dangerouslySetInnerHTML={{ __html: `
        .pip-float { animation: pipFloat 6s ease-in-out infinite; }
        @keyframes pipFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
        @media (prefers-reduced-motion: reduce) { .pip-float { animation: none; } }
        @media (max-width: 900px) { .hero-grid { grid-template-columns: 1fr !important; } }
      ` }} />

      {/* ── Hero ──────────────────────────────────────── */}
      <section ref={heroRef} style={{ position: 'relative', overflow: 'hidden', paddingTop: '5rem' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', inset: 0,
            background: '#FFFFFF' }} />
          <div style={{ position: 'absolute', top: '8%', right: '-6%', width: '55%', height: '70%',
            background: 'radial-gradient(ellipse, rgba(45,91,227,0.13) 0%, transparent 65%)' }} />
          <div style={{ position: 'absolute', bottom: '4%', left: '-5%', width: '42%', height: '52%',
            background: 'radial-gradient(ellipse, rgba(255,122,61,0.07) 0%, transparent 65%)' }} />
          {/* Graph paper, the subject itself, as texture */}
          <div style={{ position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(45,91,227,0.035) 1px, transparent 1px), '
                           + 'linear-gradient(90deg, rgba(45,91,227,0.035) 1px, transparent 1px)',
            backgroundSize: '56px 56px' }} />
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity, position: 'relative', width: '100%' }}>
          <Container style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)', paddingBottom: 'clamp(3rem, 6vw, 4.5rem)' }}>
            <motion.div variants={stagger} initial="hidden" animate="visible">
              <motion.div variants={fadeIn} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem',
                marginBottom: '1.75rem' }}>
                {[
                  { icon: GraduationCap, text: MATH_GRADE_RANGE },
                  { icon: Clock,         text: `${MATH_WEEK_COUNT} weeks` },
                  { icon: Printer,       text: 'Print and go' },
                ].map((b) => {
                  const Icon = b.icon;
                  return (
                    <div key={b.text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem',
                      padding: '0.375rem 0.875rem', background: 'rgba(45,91,227,0.1)',
                      border: '1px solid rgba(45,91,227,0.25)', borderRadius: '2px' }}>
                      <Icon size={12} color={CONNECT_L} />
                      <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em',
                        textTransform: 'uppercase' as const, color: CONNECT_L }}>{b.text}</span>
                    </div>
                  );
                })}
              </motion.div>

              <div className="hero-grid" style={{ display: 'grid',
                gridTemplateColumns: 'minmax(0,1.35fr) minmax(0,0.65fr)', gap: '3rem', alignItems: 'center' }}>
                <div>
                  <motion.h1 variants={fadeUp} style={{ fontFamily: DISPLAY,
                    fontSize: 'clamp(2.4rem, 6.5vw, 5.4rem)', lineHeight: 1.06, letterSpacing: '-0.01em',
                    color: WHITE, marginBottom: '1.5rem' }}>
                    The math of<br />
                    <span style={{ color: CONNECT_L }}>how things connect.</span>
                  </motion.h1>

                  <motion.p variants={fadeUp} style={{ fontSize: '1rem', lineHeight: 1.75, color: MUTED,
                    maxWidth: '54ch', marginBottom: '1.25rem' }}>
                    {Spell(MATH_LINE.length)} complete
                    school years of sorting, maps, proofs, routes and rules, one weekly assignment
                    at a time. Discrete mathematics needs very little computational fluency, which
                    is exactly why it works as enrichment: a student still shaky on regrouping can
                    reason well about a map coloring, and be asked to prove it.
                  </motion.p>
                  <motion.p variants={fadeUp} style={{ fontSize: '1rem', lineHeight: 1.75, color: MUTED,
                    maxWidth: '54ch', marginBottom: '2.25rem' }}>
                    Each year teaches one new mathematical move. Read them in order and they make
                    a sentence: {MATH_MOVES.join(', ')}.
                  </motion.p>

                  <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem' }}>
                    <Link href="#years" className="btn-gold">
                      See the {spell(MATH_LINE.length)} years <ChevronDown size={14} />
                    </Link>
                    <Link href="/resources" className="btn-ghost">
                      Download everything <Download size={13} />
                    </Link>
                  </motion.div>
                </div>

                <motion.div variants={fadeIn} style={{ display: 'flex', justifyContent: 'center' }}>
                  <div style={{ position: 'relative', width: '100%', maxWidth: '270px' }}>
                    <div style={{ position: 'absolute', inset: '-14%',
                      background: 'radial-gradient(circle, rgba(45,91,227,0.16) 0%, transparent 68%)' }} />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/pip/pip-wave-dark.svg"
                      alt="Pip, a friendly character drawn as a vertex with five edges"
                      className="pip-float"
                      style={{ position: 'relative', width: '100%', height: 'auto', display: 'block' }} />
                    <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.68rem',
                      letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: SLATE_3,
                      fontWeight: 700 }}>Meet Pip</p>
                    <p style={{ textAlign: 'center', fontSize: '0.75rem', color: MUTED, lineHeight: 1.6,
                      marginTop: '0.4rem' }}>
                      One dot, five lines. Pip is a graph: the exact object the students spend
                      {' '}{spell(MATH_LINE.length)} years proving things about.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </Container>
        </motion.div>
      </section>

      {/* ── Stats ─────────────────────────────────────── */}
      <Section tinted>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem' }}>
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.08}>
              <div>
                <div style={{ fontFamily: DISPLAY, fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', lineHeight: 1.06,
                  color: CONNECT_L, letterSpacing: '-0.01em' }}>{s.value}</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: WHITE, marginTop: '0.4rem' }}>{s.label}</div>
                <div style={{ fontSize: '0.73rem', color: MUTED, marginTop: '0.15rem' }}>{s.sub}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ── The five years ────────────────────────────── */}
      <Section id="years">
        <FadeIn style={{ marginBottom: '2.5rem' }}>
          <p className="label-eyebrow" style={{ color: CONNECT_L, marginBottom: '0.5rem' }}>
            One move a year
          </p>
          <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', lineHeight: 1.06,
            letterSpacing: '-0.01em', color: WHITE, marginBottom: '1rem' }}>
            {spell(MATH_LINE.length)} books.<br />
            <span style={{ color: CONNECT_L }}>One argument.</span>
          </h2>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: MUTED, maxWidth: '62ch' }}>
            The years are not the same year with bigger numbers. Grade 1 asks a child to hold a
            rule in their head while they use it. Grade 2 shows them that mathematics has parts
            that are not arithmetic. Each year after that adds a different kind of move and reuses
            the same objects, shapes, graphs, maps, coins and codes, as material for it. That
            order is also the order in which the moves are hard: a first grader can follow a rule,
            a third grader can be systematic, a sixth grader can hold a variable.
          </p>
        </FadeIn>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {MATH_LINE.map((b, i) => {
            const accent = RUNG[i % RUNG.length];
            return (
              <FadeIn key={b.slug} delay={i * 0.06}>
                <Link href={`/programs/discrete-math/${b.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div
                    className="rung"
                    style={{ background: '#FFFFFF', border: `1px solid ${accent}22`,
                      borderRadius: '4px', overflow: 'hidden', transition: 'border-color 0.25s, transform 0.25s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${accent}55`;
                      e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${accent}22`;
                      e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    <div style={{ height: '2px', background: `linear-gradient(90deg, ${accent}, transparent)` }} />
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 96px) minmax(0, 1.1fr) minmax(0, 1.4fr) auto',
                      gap: '1.5rem', alignItems: 'center', padding: '1.4rem 1.6rem' }}
                      className="rung-grid">
                      <div>
                        <div style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.16em',
                          textTransform: 'uppercase' as const, color: SLATE_3 }}>Grade</div>
                        <div style={{ fontFamily: DISPLAY, fontSize: '2.6rem', lineHeight: 1.06, color: accent,
                          letterSpacing: '-0.01em' }}>{b.grade}</div>
                      </div>
                      <div>
                        <h3 style={{ fontFamily: DISPLAY, fontSize: '1.5rem', letterSpacing: '-0.01em',
                          color: WHITE, lineHeight: 1.06, marginBottom: '0.45rem' }}>
                          {b.title}
                        </h3>
                        <p style={{ fontSize: '0.72rem', fontWeight: 700, color: accent,
                          letterSpacing: '0.04em' }}>{b.move}.</p>
                      </div>
                      <div>
                        <p style={{ fontSize: '0.85rem', lineHeight: 1.7, color: MUTED }}>{b.moveLine}</p>
                        {b.artifact && (
                          <p style={{ fontSize: '0.75rem', color: SLATE_3, marginTop: '0.4rem' }}>
                            The year builds <span style={{ color: MUTED }}>{b.artifact}</span>.
                          </p>
                        )}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: accent,
                        fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em',
                        textTransform: 'uppercase' as const, whiteSpace: 'nowrap' }}>
                        The year <ChevronRight size={14} />
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          @media (max-width: 820px) {
            .rung-grid { grid-template-columns: 1fr !important; gap: 0.9rem !important; }
          }
        ` }} />
      </Section>

      {/* ── The case ──────────────────────────────────── */}
      <Section tinted>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3.5rem', alignItems: 'start' }}>
          <FadeIn>
            <p className="label-eyebrow" style={{ color: SPARK_L, marginBottom: '0.6rem' }}>Why this, why now</p>
            <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(2rem, 4.5vw, 3.6rem)', lineHeight: 1.06,
              letterSpacing: '-0.01em', color: WHITE, marginBottom: '1.5rem' }}>
              Elementary math is about quantity.<br />
              <span style={{ color: SPARK_L }}>This is about structure.</span>
            </h2>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.8, color: MUTED, maxWidth: '56ch' }}>
              Discrete mathematics asks how things connect, how many arrangements exist, and
              whether something is possible at all. Because it leans on reasoning rather than
              computation, it reaches students that arithmetic practice leaves behind, and it
              stretches the ones who finish early.
            </p>
          </FadeIn>

          <FadeIn delay={0.12}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { icon: Lightbulb, accent: CONNECT_L, title: 'It gives them proof',
                  text: 'A whole year of the line, Grade 4, is about things that cannot be done: '
                      + 'two colors will not work, five dots cannot each have three lines, the '
                      + 'bridge walk is impossible. Explaining why is a kind of thinking the '
                      + 'regular curriculum rarely asks for at this age.' },
                { icon: Shapes, accent: GROW_L, title: 'It feeds the pacing guide',
                  text: 'Loops are repeated addition. Grids are arrays. Binary is place value. '
                      + 'Factor rectangles are 4.OA.4 in disguise, and some students arrive at '
                      + 'arrays through the loop who never got there through the array.' },
                { icon: Sparkles, accent: SPARK_L, title: 'It needs almost nothing',
                  text: 'Crayons, counters and a photocopier. No devices, no kits, no '
                      + 'subscription, no training week before you can start.' },
                { icon: Layers, accent: CONNECT_L, title: 'It is checked, not asserted',
                  text: `Every one of the ${MATH_CHECK_COUNT.toLocaleString('en-US')} numeric `
                      + `answers in the ${CHECKED.length} newest teacher guides is recomputed `
                      + 'from the problem as the workbook states it, by a script that ships with '
                      + 'the source and runs on every build. If a fix to a page changes an '
                      + 'answer, the build fails until the guide agrees.' },
              ].map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.title} className="card-glass" style={{ padding: '1.4rem', borderColor: `${c.accent}22` }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <div style={{ width: '36px', height: '36px', flexShrink: 0, background: `${c.accent}15`,
                        border: `1px solid ${c.accent}30`, borderRadius: '3px', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', color: c.accent }}>
                        <Icon size={16} />
                      </div>
                      <div>
                        <h3 style={{ fontFamily: DISPLAY, fontSize: '1.25rem', letterSpacing: '-0.01em',
                          color: WHITE, lineHeight: 1.06, marginBottom: '0.5rem' }}>{c.title}</h3>
                        <p style={{ fontSize: '0.8rem', lineHeight: 1.7, color: MUTED }}>{c.text}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* ── FAQ ───────────────────────────────────────── */}
      <Section>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem' }}>
          <FadeIn>
            <p className="label-eyebrow" style={{ color: CONNECT_L, marginBottom: '0.5rem' }}>Questions</p>
            <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.8rem, 3.6vw, 2.9rem)', lineHeight: 1.06,
              letterSpacing: '-0.01em', color: WHITE, marginBottom: '1.25rem' }}>
              What teachers ask.
            </h2>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.8, color: MUTED, maxWidth: '46ch' }}>
              Anything not answered here is worth an email. We would rather field the question
              than have a school guess.
            </p>
          </FadeIn>
          <FadeIn delay={0.12}>
            <div>{FAQS.map((faq, i) => <FAQItem key={faq.q} faq={faq} index={i} />)}</div>
          </FadeIn>
        </div>
      </Section>

      {/* ── Pilot CTA ─────────────────────────────────── */}
      <section id="pilot" style={{ background: SLATE_2, borderTop: '1px solid rgba(45,91,227,0.1)' }}>
        <Container style={{ paddingTop: 'clamp(3.5rem, 7vw, 6rem)', paddingBottom: 'clamp(3.5rem, 7vw, 6rem)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem', alignItems: 'center' }}>
            <FadeIn>
              <p className="label-eyebrow" style={{ color: GOLD, marginBottom: '0.6rem' }}>Pilot a classroom</p>
              <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(2rem, 4.5vw, 3.6rem)', lineHeight: 1.06,
                letterSpacing: '-0.01em', color: WHITE, marginBottom: '1.25rem' }}>
                One teacher.<br />One year.<br /><span style={{ color: GOLD }}>No cost.</span>
              </h2>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: MUTED, maxWidth: '48ch',
                marginBottom: '2rem' }}>
                We are placing these years in elementary classrooms across the San Gabriel Valley.
                A pilot is one teacher, one class, one school year, materials and support provided.
                No year has been run start to finish yet, and the first teacher to do it will
                change how every later book gets written.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem' }}>
                <Link href="/partner" className="btn-gold">Request the packet <ArrowUpRight size={14} /></Link>
                <Link href="/for-schools" className="btn-ghost">What a pilot involves <ChevronRight size={14} /></Link>
              </div>
            </FadeIn>
            <FadeIn delay={0.12}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ position: 'relative', width: '100%', maxWidth: '240px' }}>
                  <div style={{ position: 'absolute', inset: '-16%',
                    background: 'radial-gradient(circle, rgba(255,196,77,0.14) 0%, transparent 68%)' }} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/pip/pip-cheer-dark.svg" alt="Pip celebrating"
                    style={{ position: 'relative', width: '100%', height: 'auto', display: 'block' }} />
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>
    </Page>
  );
}
