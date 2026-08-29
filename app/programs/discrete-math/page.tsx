'use client';

import { useRef, useState } from 'react';
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
  type Variants,
} from 'framer-motion';
import {
  ArrowUpRight, ChevronRight, CheckCircle, Map, Route,
  Binary, Shapes, Layers, Sigma, GitBranch, Lightbulb,
  Clock, Printer, FileText, GraduationCap, School, Sparkles, Download,
} from 'lucide-react';
import Link from 'next/link';

// ── Tokens ────────────────────────────────────────────────────────────────────
const SLATE   = '#0F172A';
const SLATE_2 = '#1E293B';
const SLATE_3 = '#334155';
const MUTED   = '#94A3B8';
const WHITE   = '#F8FAFC';
const GOLD    = '#C9A84C';

// Pip sub-brand accents — the three map colors from Week 17.
const CONNECT = '#2D5BE3';
const CONNECT_L = '#7CA6F5';
const SPARK   = '#FF7A3D';
const SPARK_L = '#FF9A69';
const GROW    = '#17A67C';
const GROW_L  = '#4FCBA3';

const DISPLAY = "'Bebas Neue', Impact, sans-serif";
const SANS    = "'DM Sans', system-ui, sans-serif";

// ── Variants ──────────────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
};
const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};
const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function FadeIn({ children, delay = 0, className = '', v = fadeUp }: {
  children: React.ReactNode; delay?: number; className?: string; v?: Variants;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div ref={ref} variants={v} initial="hidden"
      animate={inView ? 'visible' : 'hidden'} transition={{ delay }} className={className}>
      {children}
    </motion.div>
  );
}

// ── The six strands ───────────────────────────────────────────────────────────
const STRANDS = [
  {
    weeks:  'Weeks 1–4, 13, 25',
    icon:   Layers,
    title:  'Sorting & Logic',
    accent: CONNECT_L,
    desc:   'Rules, Venn diagrams, logic grids, and the difference between an example and a reason. This is where a child first has to defend an answer instead of just giving one.',
    skills: ['Inferring a rule from examples and non-examples', 'Two-attribute sorting', 'Deduction on a logic grid', 'Always / sometimes / never'],
  },
  {
    weeks:  'Weeks 5–8, 10, 11',
    icon:   Binary,
    title:  'Number Structure',
    accent: SPARK_L,
    desc:   'Binary as place value with a different multiplier, function machines, sorting algorithms, and binary search. Arithmetic seen from the outside.',
    skills: ['Base two as a second place-value system', 'Input–rule–output machines', 'Two sorting methods compared', 'Halving to find a hidden number'],
  },
  {
    weeks:  'Weeks 12, 15, 29, 33, 34',
    icon:   Sigma,
    title:  'Counting Carefully',
    accent: GROW_L,
    desc:   'Counting every case without missing one or repeating one. Handshakes, combinations, choice trees, tilings, and lattice paths — organized listing as a discipline.',
    skills: ['Systematic enumeration', 'The double-counting correction', 'Arrays as a picture of a count', 'Pascal’s triangle, built by hand'],
  },
  {
    weeks:  'Weeks 17, 18, 23',
    icon:   Map,
    title:  'Maps & Colors',
    accent: CONNECT_L,
    desc:   'Graph coloring, and the moment a child proves that fewer colors is not merely hard but impossible. Ends with the Four Color Theorem — by name.',
    skills: ['Coloring with a shared-border constraint', 'Finding the structure that forces a third color', 'Reading a graph as dots and edges', 'Building a bar graph from graph data'],
  },
  {
    weeks:  'Weeks 9, 16, 26, 27, 28',
    icon:   Route,
    title:  'Paths & Routes',
    accent: SPARK_L,
    desc:   'Shortest paths, Euler tracing, the Bridges of Königsberg, and connecting towns for the least cost. Heavy grade-level addition, wrapped around real theorems.',
    skills: ['Weighted shortest path', 'Odd and even used as a working tool', 'Why the bridge walk is impossible', 'Minimum spanning trees'],
  },
  {
    weeks:  'Weeks 20, 21, 22, 32, 35, 36',
    icon:   GitBranch,
    title:  'Algorithms & Codes',
    accent: GROW_L,
    desc:   'Instructions precise enough for a machine: robot programs, loops as repeated addition, greedy change-making, clock arithmetic, and ciphers.',
    skills: ['Writing and shortening a program', 'Loops as repeated addition', 'A greedy rule — and where it fails', 'Shift ciphers and binary decoding'],
  },
];

// ── The week shape ────────────────────────────────────────────────────────────
const WEEK_SHAPE = [
  { n: '01', label: 'In class this week', accent: CONNECT_L, text: 'A line naming the standard the class is already working on, so the sheet reinforces Tuesday’s lesson.' },
  { n: '02', label: 'Number Warm-Up',     accent: SPARK_L,   text: 'Two minutes of ordinary grade-level fluency. The page starts on familiar ground.' },
  { n: '03', label: 'The Adventure',      accent: CONNECT_L, text: 'The main activity, with every map, grid, and diagram printed on the page — nothing to prepare.' },
  { n: '04', label: 'Talk About It',      accent: GROW_L,    text: 'One question answered out loud. Most weeks have short answers and long reasons.' },
  { n: '05', label: '★ Challenge Zone',   accent: SPARK_L,   text: 'Genuinely harder, and not expected of everyone. Where the student who finishes in eight minutes goes.' },
];

const DOWNLOADS = [
  { file: '/downloads/discrete-math-adventures-workbook.pdf', label: 'Student workbook',
    meta: 'PDF · 77 pages', accent: CONNECT_L },
  { file: '/downloads/discrete-math-teacher-guide.html', label: 'Teacher guide',
    meta: 'Web · all 36 weeks', accent: GROW_L },
  { file: '/downloads/discrete-math-pilot-packet.pdf', label: 'Pilot packet',
    meta: 'PDF · 10 pages', accent: SPARK_L },
  { file: '/downloads/structure-before-fluency.pdf', label: 'The research case',
    meta: 'PDF · working paper', accent: GOLD },
];

const STATS = [
  { value: '36',    label: 'weekly assignments', sub: 'one full school year' },
  { value: '30–40', label: 'minutes each',       sub: 'two pages, front and back' },
  { value: '20',    label: 'CA standards touched', sub: 'reinforced, not replaced' },
  { value: '$0',    label: 'prep cost',          sub: 'photocopy and go' },
];

const STANDARDS = [
  '2.OA.1', '2.OA.2', '2.OA.3', '2.OA.4', '2.NBT.1', '2.NBT.2', '2.NBT.3',
  '2.NBT.4', '2.NBT.5', '2.NBT.7', '2.MD.1', '2.MD.4', '2.MD.5', '2.MD.6',
  '2.MD.7', '2.MD.8', '2.MD.10', '2.G.1', '2.G.2', '2.G.3',
];

const FAQS = [
  {
    q: 'Does this replace the math curriculum?',
    a: 'No. It sits beside it. The year is sequenced against a typical California Grade 2 pacing guide so that each week’s puzzle lands near the standard the class is already teaching — money week on coin counting, time week on clock arithmetic, the array weeks at the end where multiplication begins.',
  },
  {
    q: 'How much does a teacher have to prepare?',
    a: 'Nothing beyond photocopying. Every map, grid, graph, and diagram is printed on the page. The teacher guide carries the answer key, a running note, and the challenge answers for all 36 weeks.',
  },
  {
    q: 'Will it print on a classroom copier?',
    a: 'Yes. The whole book is proofed in grayscale. Structure lives in the linework and color is accent only — nothing stops working when the copier strips it.',
  },
  {
    q: 'Is discrete math too hard for second graders?',
    a: 'It needs almost no computational fluency, which is exactly why it works as enrichment — a student still shaky on regrouping can reason beautifully about a map coloring. What it does demand is explanation, and that is the point.',
  },
  {
    q: 'Can it go home as homework?',
    a: 'It is written to the student, clearly enough to travel in a backpack. Everything a teacher needs to launch a week lives in the guide rather than on the sheet, so the same page works in class or at the kitchen table.',
  },
];

function FAQItem({ faq, index }: { faq: typeof FAQS[0]; index: number }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div style={{ borderBottom: '1px solid rgba(45,91,227,0.12)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '1rem', padding: '1.15rem 0', background: 'transparent', border: 'none',
          cursor: 'pointer', textAlign: 'left', color: WHITE, fontFamily: SANS,
        }}
      >
        <span style={{ fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.5 }}>{faq.q}</span>
        <ChevronRight
          size={15}
          color={open ? CONNECT_L : SLATE_3}
          style={{ flexShrink: 0, transform: open ? 'rotate(90deg)' : 'none', transition: 'transform 0.22s, color 0.22s' }}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ fontSize: '0.82rem', lineHeight: 1.75, color: MUTED, paddingBottom: '1.15rem', maxWidth: '58ch' }}>
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DiscreteMathPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY       = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div style={{ background: SLATE, minHeight: '100vh', color: WHITE, fontFamily: SANS }}>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800&display=swap');
        .pip-float { animation: pipFloat 6s ease-in-out infinite; }
        @keyframes pipFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .pip-float { animation: none; }
        }
      ` }} />

      {/* ── Hero ──────────────────────────────────────── */}
      <section ref={heroRef} className="relative overflow-hidden"
        style={{ paddingTop: '5rem', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>

        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg, #060C10 0%, #0F172A 55%, #0A1428 100%)' }} />
          <div style={{ position: 'absolute', top: '8%', right: '-6%', width: '55%', height: '70%', background: 'radial-gradient(ellipse, rgba(45,91,227,0.13) 0%, transparent 65%)' }} />
          <div style={{ position: 'absolute', bottom: '4%', left: '-5%', width: '42%', height: '52%', background: 'radial-gradient(ellipse, rgba(255,122,61,0.07) 0%, transparent 65%)' }} />
          {/* Graph-paper grid — the subject, as texture */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(45,91,227,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(45,91,227,0.035) 1px, transparent 1px)', backgroundSize: '56px 56px' }} />
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative w-full">
          <div className="mx-auto max-w-7xl px-6 lg:px-12 py-20">
            <motion.div variants={stagger} initial="hidden" animate="visible">

              {/* Breadcrumb */}
              <motion.div variants={fadeIn} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                <Link href="/programs" style={{ fontSize: '0.68rem', color: SLATE_3, textDecoration: 'none', fontWeight: 600, letterSpacing: '0.08em' }}>Programs</Link>
                <ChevronRight size={12} color={SLATE_3} />
                <span style={{ fontSize: '0.68rem', color: CONNECT_L, fontWeight: 700, letterSpacing: '0.08em' }}>Discrete Math Adventures</span>
              </motion.div>

              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.35fr) minmax(0,0.65fr)', gap: '3rem', alignItems: 'center' }}
                   className="hero-grid">

                <div>
                  {/* Eyebrow badges */}
                  <motion.div variants={fadeIn} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', marginBottom: '1.75rem' }}>
                    {[
                      { icon: GraduationCap, text: 'Grade 2' },
                      { icon: Clock,         text: '36 weeks' },
                      { icon: Printer,       text: 'Print and go' },
                    ].map(b => {
                      const Icon = b.icon;
                      return (
                        <div key={b.text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 0.875rem', background: 'rgba(45,91,227,0.1)', border: '1px solid rgba(45,91,227,0.25)', borderRadius: '2px' }}>
                          <Icon size={12} color={CONNECT_L} />
                          <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: CONNECT_L }}>{b.text}</span>
                        </div>
                      );
                    })}
                  </motion.div>

                  <motion.h1 variants={fadeUp} style={{ fontFamily: DISPLAY, fontSize: 'clamp(2.6rem, 7vw, 6rem)', lineHeight: 0.92, letterSpacing: '0.02em', color: WHITE, marginBottom: '1.5rem' }}>
                    THE MATH OF<br />
                    <span style={{ color: CONNECT_L }}>HOW THINGS CONNECT.</span>
                  </motion.h1>

                  <motion.p variants={fadeUp} style={{ fontSize: '1rem', lineHeight: 1.75, color: MUTED, maxWidth: '52ch', marginBottom: '2.25rem' }}>
                    A full year of maps, robots, secret codes and bridges — for seven-year-olds.
                    Discrete mathematics needs almost no computational fluency, which is exactly
                    why it works as enrichment. A student still shaky on regrouping can reason
                    beautifully about a map coloring, and be asked to prove it.
                  </motion.p>

                  <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem' }}>
                    <Link href="#pilot" className="btn-gold">
                      Bring it to your school <ArrowUpRight size={14} />
                    </Link>
                    <Link href="#year" className="btn-ghost">
                      See the year <ChevronRight size={14} />
                    </Link>
                  </motion.div>
                </div>

                {/* Pip */}
                <motion.div variants={fadeIn} style={{ display: 'flex', justifyContent: 'center' }}>
                  <div style={{ position: 'relative', width: '100%', maxWidth: '270px' }}>
                    <div style={{ position: 'absolute', inset: '-14%', background: 'radial-gradient(circle, rgba(45,91,227,0.16) 0%, transparent 68%)' }} />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/pip/pip-wave-dark.svg"
                      alt="Pip, a friendly character drawn as a vertex with five edges"
                      className="pip-float"
                      style={{ position: 'relative', width: '100%', height: 'auto', display: 'block' }}
                    />
                    <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: SLATE_3, fontWeight: 700 }}>
                      Meet Pip
                    </p>
                    <p style={{ textAlign: 'center', fontSize: '0.75rem', color: MUTED, lineHeight: 1.6, marginTop: '0.4rem' }}>
                      One dot, five lines. Pip is a graph — the exact object the students
                      spend the year proving things about.
                    </p>
                  </div>
                </motion.div>
              </div>

            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── Stats ─────────────────────────────────────── */}
      <section style={{ background: 'rgba(15,23,42,0.5)', borderTop: '1px solid rgba(45,91,227,0.08)', borderBottom: '1px solid rgba(45,91,227,0.08)' }}>
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-12">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem' }}>
            {STATS.map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.08}>
                <div>
                  <div style={{ fontFamily: DISPLAY, fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', lineHeight: 1, color: CONNECT_L, letterSpacing: '0.02em' }}>{s.value}</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: WHITE, marginTop: '0.4rem' }}>{s.label}</div>
                  <div style={{ fontSize: '0.73rem', color: MUTED, marginTop: '0.15rem' }}>{s.sub}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── The case ──────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3.5rem', alignItems: 'start' }}>
          <FadeIn>
            <p className="label-eyebrow" style={{ color: SPARK_L, marginBottom: '0.6rem' }}>Why this, why now</p>
            <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(2rem, 4.5vw, 3.6rem)', lineHeight: 0.95, letterSpacing: '0.02em', color: WHITE, marginBottom: '1.5rem' }}>
              SECOND GRADE MATH IS ABOUT QUANTITY.<br />
              <span style={{ color: SPARK_L }}>THIS IS ABOUT STRUCTURE.</span>
            </h2>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.8, color: MUTED, maxWidth: '56ch' }}>
              Discrete mathematics asks how things connect, how many arrangements exist,
              and whether something is possible at all. Because it leans on reasoning
              rather than computation, it reaches students that arithmetic practice
              leaves behind — and it stretches the ones who finish early.
            </p>
          </FadeIn>

          <FadeIn delay={0.12}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { icon: Lightbulb, accent: CONNECT_L, title: 'It gives them proof',
                  text: 'Three weeks of the year end in something being impossible — two colors cannot work, five dots cannot each have three lines, the bridge walk cannot be done. Explaining why is a kind of thinking the regular curriculum rarely asks for at this age.' },
                { icon: Shapes, accent: GROW_L, title: 'It feeds the pacing guide',
                  text: 'Loops are repeated addition. Grids are arrays. Binary is place value. Weeks 32 through 35 are 2.OA.4 and 2.G.2 in disguise, and some students arrive at arrays through the loop who never got there through the array.' },
                { icon: Sparkles, accent: SPARK_L, title: 'It needs almost nothing',
                  text: 'Crayons, counters, and a photocopier. No devices, no kits, no subscription, no training week before you can start.' },
              ].map(c => {
                const Icon = c.icon;
                return (
                  <div key={c.title} className="card-glass" style={{ padding: '1.4rem', borderColor: `${c.accent}22` }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <div style={{ width: '36px', height: '36px', flexShrink: 0, background: `${c.accent}15`, border: `1px solid ${c.accent}30`, borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.accent }}>
                        <Icon size={16} />
                      </div>
                      <div>
                        <h3 style={{ fontFamily: DISPLAY, fontSize: '1.25rem', letterSpacing: '0.04em', color: WHITE, lineHeight: 1, marginBottom: '0.5rem' }}>{c.title.toUpperCase()}</h3>
                        <p style={{ fontSize: '0.8rem', lineHeight: 1.7, color: MUTED }}>{c.text}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── The year ──────────────────────────────────── */}
      <section id="year" style={{ background: 'rgba(15,23,42,0.5)', borderTop: '1px solid rgba(45,91,227,0.08)', borderBottom: '1px solid rgba(45,91,227,0.08)' }}>
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
          <FadeIn className="mb-12">
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div>
                <p className="label-eyebrow" style={{ color: CONNECT_L, marginBottom: '0.5rem' }}>Six strands, 36 weeks</p>
                <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', lineHeight: 0.95, letterSpacing: '0.02em', color: WHITE }}>
                  WHAT WE TEACH.<br /><span style={{ color: CONNECT_L }}>WEEK BY WEEK.</span>
                </h2>
              </div>
              <p style={{ fontSize: '0.85rem', color: MUTED, maxWidth: '320px', lineHeight: 1.7 }}>
                The strands interleave rather than run in blocks, so an idea comes back
                three or four times across the year with more weight each time.
              </p>
            </div>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {STRANDS.map((s, i) => {
              const Icon = s.icon;
              return (
                <FadeIn key={s.title} delay={i * 0.07}>
                  <div
                    style={{ background: 'rgba(15,23,42,0.7)', border: `1px solid ${s.accent}22`, borderRadius: '4px', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', transition: 'border-color 0.25s, transform 0.25s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${s.accent}55`; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = `${s.accent}22`; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    <div style={{ height: '2px', background: `linear-gradient(90deg, ${s.accent}, transparent)` }} />
                    <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
                        <div style={{ width: '40px', height: '40px', background: `${s.accent}15`, border: `1px solid ${s.accent}30`, borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.accent }}>
                          <Icon size={18} />
                        </div>
                        <div style={{ padding: '0.2rem 0.6rem', background: `${s.accent}12`, border: `1px solid ${s.accent}25`, borderRadius: '2px', fontSize: '0.58rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: s.accent, whiteSpace: 'nowrap' }}>
                          {s.weeks}
                        </div>
                      </div>
                      <h3 style={{ fontFamily: DISPLAY, fontSize: '1.4rem', letterSpacing: '0.04em', color: WHITE, lineHeight: 1 }}>{s.title.toUpperCase()}</h3>
                      <p style={{ fontSize: '0.8rem', lineHeight: 1.7, color: MUTED, flex: 1 }}>{s.desc}</p>
                      <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {s.skills.map((skill, si) => (
                          <li key={si} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                            <CheckCircle size={11} color={s.accent} style={{ flexShrink: 0, marginTop: '3px' }} />
                            <span style={{ fontSize: '0.75rem', color: MUTED, lineHeight: 1.5 }}>{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Anatomy of a week ─────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <FadeIn className="mb-12">
          <p className="label-eyebrow" style={{ color: GROW_L, marginBottom: '0.5rem' }}>Anatomy of a week</p>
          <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(2rem, 4.5vw, 3.6rem)', lineHeight: 0.95, letterSpacing: '0.02em', color: WHITE }}>
            TWO PAGES.<br /><span style={{ color: GROW_L }}>FIVE MOVES.</span>
          </h2>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {WEEK_SHAPE.map((w, i) => (
            <FadeIn key={w.n} delay={i * 0.06}>
              <div style={{ borderTop: `2px solid ${w.accent}`, paddingTop: '1rem', height: '100%' }}>
                <div style={{ fontFamily: DISPLAY, fontSize: '1.6rem', color: `${w.accent}`, letterSpacing: '0.04em', lineHeight: 1 }}>{w.n}</div>
                <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: WHITE, margin: '0.6rem 0 0.4rem' }}>{w.label}</h3>
                <p style={{ fontSize: '0.76rem', lineHeight: 1.65, color: MUTED }}>{w.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Standards */}
        <FadeIn delay={0.2}>
          <div className="card-glass" style={{ marginTop: '3.5rem', padding: '1.75rem', borderColor: 'rgba(45,91,227,0.14)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 260px' }}>
                <h3 style={{ fontFamily: DISPLAY, fontSize: '1.3rem', letterSpacing: '0.04em', color: WHITE, marginBottom: '0.5rem' }}>CALIFORNIA STANDARDS TOUCHED</h3>
                <p style={{ fontSize: '0.78rem', lineHeight: 1.7, color: MUTED }}>
                  This is enrichment — it reinforces and extends these standards rather than
                  delivering them. No standard here is taught to mastery by this program alone.
                </p>
              </div>
              <div style={{ flex: '1 1 340px', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {STANDARDS.map(code => (
                  <span key={code} style={{ padding: '0.25rem 0.55rem', background: 'rgba(45,91,227,0.1)', border: '1px solid rgba(45,91,227,0.22)', borderRadius: '2px', fontSize: '0.68rem', fontWeight: 600, color: CONNECT_L, fontVariantNumeric: 'tabular-nums' }}>
                    {code}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── Materials + FAQ ───────────────────────────── */}
      <section style={{ background: 'rgba(15,23,42,0.5)', borderTop: '1px solid rgba(45,91,227,0.08)', borderBottom: '1px solid rgba(45,91,227,0.08)' }}>
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem' }}>

            <FadeIn>
              <p className="label-eyebrow" style={{ color: SPARK_L, marginBottom: '0.5rem' }}>What a school receives</p>
              <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.8rem, 3.6vw, 2.9rem)', lineHeight: 0.95, letterSpacing: '0.02em', color: WHITE, marginBottom: '1.75rem' }}>
                THE MATERIALS.
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {[
                  { icon: FileText, accent: CONNECT_L, title: 'Student workbook', sub: '77 printable pages',
                    text: 'Cover, how-to, a year-at-a-glance spread, 36 two-page assignments, and a certificate. Proofed in grayscale.' },
                  { icon: School, accent: GROW_L, title: 'Teacher guide', sub: 'every week, every answer',
                    text: 'Answer keys for the activity, the practice set, and the Challenge Zone — plus a running note and the standards tie for all 36 weeks.' },
                  { icon: Sparkles, accent: SPARK_L, title: 'Classroom kit', sub: 'crayons, counters, number cards',
                    text: 'The only physical materials the year asks for. Most classrooms already have them.' },
                ].map(m => {
                  const Icon = m.icon;
                  return (
                    <div key={m.title} className="card-glass" style={{ padding: '1.25rem', borderColor: `${m.accent}20` }}>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                        <div style={{ width: '34px', height: '34px', flexShrink: 0, background: `${m.accent}15`, border: `1px solid ${m.accent}30`, borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: m.accent }}>
                          <Icon size={15} />
                        </div>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', flexWrap: 'wrap' }}>
                            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: WHITE }}>{m.title}</h3>
                            <span style={{ fontSize: '0.68rem', color: m.accent, fontWeight: 600 }}>{m.sub}</span>
                          </div>
                          <p style={{ fontSize: '0.78rem', lineHeight: 1.65, color: MUTED, marginTop: '0.35rem' }}>{m.text}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <p style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: SLATE_3, margin: '1.75rem 0 0.75rem' }}>
                Everything is free to download
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.5rem' }}>
                {DOWNLOADS.map(d => (
                  <a
                    key={d.file}
                    href={d.file}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.7rem 0.85rem', background: 'rgba(15,23,42,0.6)', border: `1px solid ${d.accent}25`, borderRadius: '3px', textDecoration: 'none', transition: 'border-color 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${d.accent}60`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = `${d.accent}25`; }}
                  >
                    <Download size={13} color={d.accent} style={{ flexShrink: 0 }} />
                    <span>
                      <span style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: WHITE }}>{d.label}</span>
                      <span style={{ display: 'block', fontSize: '0.66rem', color: MUTED }}>{d.meta}</span>
                    </span>
                  </a>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.12}>
              <p className="label-eyebrow" style={{ color: CONNECT_L, marginBottom: '0.5rem' }}>Questions</p>
              <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.8rem, 3.6vw, 2.9rem)', lineHeight: 0.95, letterSpacing: '0.02em', color: WHITE, marginBottom: '1rem' }}>
                WHAT TEACHERS ASK.
              </h2>
              <div>
                {FAQS.map((faq, i) => <FAQItem key={faq.q} faq={faq} index={i} />)}
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ── Pilot CTA ─────────────────────────────────── */}
      <section id="pilot" style={{ background: SLATE_2, borderTop: '1px solid rgba(45,91,227,0.1)' }}>
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <FadeIn>
              <p className="label-eyebrow" style={{ color: GOLD, marginBottom: '0.6rem' }}>Pilot a classroom</p>
              <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(2rem, 4.5vw, 3.6rem)', lineHeight: 0.95, letterSpacing: '0.02em', color: WHITE, marginBottom: '1.25rem' }}>
                ONE TEACHER.<br />ONE YEAR.<br /><span style={{ color: GOLD }}>NO COST.</span>
              </h2>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: MUTED, maxWidth: '48ch', marginBottom: '2rem' }}>
                We are placing <em>Discrete Math Adventures</em> in Grade 2 classrooms across
                the San Gabriel Valley. A pilot is one teacher, one class, one school year —
                materials and support provided. Tell us about your school and we will send the
                adoption packet.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem' }}>
                <Link href="/partner" className="btn-gold">
                  Request the packet <ArrowUpRight size={14} />
                </Link>
                <Link href="/about" className="btn-ghost">
                  About us <ChevronRight size={14} />
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.12}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ position: 'relative', width: '100%', maxWidth: '240px' }}>
                  <div style={{ position: 'absolute', inset: '-16%', background: 'radial-gradient(circle, rgba(255,196,77,0.14) 0%, transparent 68%)' }} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/pip/pip-cheer-dark.svg"
                    alt="Pip celebrating"
                    style={{ position: 'relative', width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      ` }} />
    </div>
  );
}
