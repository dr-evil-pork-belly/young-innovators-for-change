'use client';

import { useRef, useState } from 'react';
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion';
import {
  Scale, BookOpen, Crown, ArrowUpRight, MapPin,
  CheckCircle, ChevronRight, Sparkles, Globe,
  Building2, Users, TrendingUp, Star, Flag,
  Rocket, Award, Heart,
} from 'lucide-react';
import Link from 'next/link';

// ── Tokens ────────────────────────────────────────────────────────────────────
const ROYAL   = '#2563EB';
const ROYAL_L = '#3B82F6';
const ROYAL_D = '#1D4ED8';
const SLATE   = '#0F172A';
const SLATE_2 = '#1E293B';
const SLATE_3 = '#334155';
const MUTED   = '#94A3B8';
const WHITE   = '#F8FAFC';
const GOLD    = '#C9A84C';
const GOLD_L  = '#E8C94F';

// ── Animation variants ────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};
const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.65, ease: 'easeOut' } },
};
const fadeLeft: Variants = {
  hidden:  { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: 'easeOut' } },
};
const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.13 } },
};

// ── Scroll-triggered fade-in paragraph wrapper ────────────────────────────────
function FadeIn({ children, delay = 0, variant = fadeUp, className = '' }: {
  children: React.ReactNode;
  delay?: number;
  variant?: Variants;
  className?: string;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-56px' });
  return (
    <motion.div
      ref={ref}
      variants={variant}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Pillar data ───────────────────────────────────────────────────────────────
const PILLARS = [
  {
    icon:   Scale,
    title:  'Equity',
    accent: ROYAL_L,
    accentBg: 'rgba(59,130,246,0.08)',
    accentBorder: 'rgba(59,130,246,0.22)',
    thesis: 'The zip code a child is born into should have zero bearing on the ceiling of their ambition.',
    body:   'Top MBA programs cost $200,000. The frameworks they teach — market analysis, leadership, financial modeling — are not secret. They are simply gatekept. We remove the gate.',
    stats:  [{ val: '$200K', lbl: 'avg MBA cost' }, { val: '$0', lbl: 'our cost to students' }],
  },
  {
    icon:   BookOpen,
    title:  'Literacy',
    accent: GOLD,
    accentBg: 'rgba(201,168,76,0.08)',
    accentBorder: 'rgba(201,168,76,0.25)',
    thesis: 'Financial ignorance is not a personal failure. It is a systemic one — and we refuse to accept it.',
    body:   'Most adults were never taught how money actually works. Compound interest, CAC, gross margin — this vocabulary shapes who builds wealth and who does not. We teach it at age 10.',
    stats:  [{ val: '57%', lbl: 'of Americans financially illiterate' }, { val: '8', lbl: 'weeks to change that' }],
  },
  {
    icon:   Crown,
    title:  'Leadership',
    accent: ROYAL_L,
    accentBg: 'rgba(59,130,246,0.08)',
    accentBorder: 'rgba(59,130,246,0.22)',
    thesis: 'Leaders are not born. They are built through pressure, feedback, and the courage to stand in front of a room.',
    body:   'Executive presence, conflict resolution, and decision-making under pressure are learnable skills. Our Boardroom experience puts students under real pressure — because that is what builds real leaders.',
    stats:  [{ val: '100%', lbl: 'engagement rate' }, { val: '3x', lbl: 'confidence growth reported' }],
  },
];

// ── Roadmap data ──────────────────────────────────────────────────────────────
const ROADMAP = [
  {
    year:   '2022',
    phase:  'The Spark',
    icon:   Sparkles,
    accent: GOLD,
    title:  'One Classroom. One Idea.',
    body:   'Cindy Ha runs the first YIC pilot in a single Glendora classroom with 22 students. All 22 complete the program. All 22 deliver a pitch. The results are undeniable.',
    metrics: ['22 students', '1 classroom', '100% completion rate'],
    status: 'complete',
  },
  {
    year:   '2023',
    phase:  'Proof of Concept',
    icon:   CheckCircle,
    accent: ROYAL_L,
    title:  'Glendora Unified Adopts the Model.',
    body:   'Following the pilot results, Glendora Unified School District formally partners with YIC. The program expands to 3 schools, 120 students, and earns its first district-level endorsement.',
    metrics: ['3 schools', '120 students', 'First district endorsement'],
    status: 'complete',
  },
  {
    year:   '2024',
    phase:  'Regional Expansion',
    icon:   MapPin,
    accent: ROYAL_L,
    title:  '5 Districts. 1,200+ Students.',
    body:   'YIC expands across 5 Los Angeles-area districts. The first cohort of YIC alumni reaches high school. Early data shows 2.3x higher financial literacy scores vs. control groups.',
    metrics: ['5 districts', '1,200+ students', '2.3x literacy improvement'],
    status: 'complete',
  },
  {
    year:   '2025',
    phase:  'Infrastructure',
    icon:   Building2,
    accent: ROYAL_L,
    title:  'Building the Platform for Scale.',
    body:   'Digital curriculum tools, instructor certification programs, and a national partnership framework. YIC is building the infrastructure to move from regional model to national movement.',
    metrics: ['Digital curriculum launch', 'Instructor certification', 'National framework'],
    status: 'active',
  },
  {
    year:   '2026',
    phase:  'National Launch',
    icon:   Globe,
    accent: MUTED,
    title:  '20+ Districts. 10,000 Students.',
    body:   'The national rollout begins. 20+ districts across 5 states, a formal nonprofit endowment, and the first class of YIC alumni entering college with real business experience on their resumes.',
    metrics: ['20+ districts', '5 states', '10,000 students targeted'],
    status: 'upcoming',
  },
  {
    year:   '2030',
    phase:  'The Movement',
    icon:   Flag,
    accent: GOLD,
    title:  'A Generation of CEOs.',
    body:   'Every underserved K-12 district in America has access to a YIC-certified program. The first generation of YIC alumni are launching companies, leading teams, and reshaping what leadership looks like in America.',
    metrics: ['Every underserved district', 'First YIC alumni CEOs', 'A permanent legacy'],
    status: 'vision',
  },
];

// ── Roadmap Node ──────────────────────────────────────────────────────────────
function RoadmapNode({ item, index, isLast }: {
  item: typeof ROADMAP[0]; index: number; isLast: boolean;
}) {
  const [expanded, setExpanded] = useState(index < 3);
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const Icon   = item.icon;

  const statusStyle: Record<string, React.CSSProperties> = {
    complete: { background: 'rgba(59,130,246,0.1)',  border: '1px solid rgba(59,130,246,0.3)',  color: ROYAL_L },
    active:   { background: 'rgba(201,168,76,0.1)',  border: '1px solid rgba(201,168,76,0.35)', color: GOLD    },
    upcoming: { background: 'rgba(148,163,184,0.06)', border: '1px solid rgba(148,163,184,0.15)', color: MUTED  },
    vision:   { background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)',  color: GOLD    },
  };
  const statusLabel: Record<string, string> = {
    complete: 'Achieved', active: 'In Progress', upcoming: 'Upcoming', vision: 'The Vision',
  };

  return (
    <motion.div
      ref={ref}
      variants={fadeLeft}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.08 }}
      style={{ display: 'flex', gap: '0', position: 'relative' }}
    >
      {/* Timeline spine */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '1.75rem', flexShrink: 0 }}>
        {/* Node dot */}
        <div style={{
          width:        '48px', height: '48px',
          borderRadius: '50%',
          background:   item.status === 'active'
            ? `radial-gradient(circle, ${GOLD}, ${GOLD_L})`
            : item.status === 'complete'
              ? 'rgba(37,99,235,0.15)'
              : 'rgba(30,41,59,0.8)',
          border:       `2px solid ${item.status === 'active' ? GOLD : item.status === 'complete' ? ROYAL_L : SLATE_3}`,
          display:      'flex', alignItems: 'center', justifyContent: 'center',
          color:        item.status === 'active' ? SLATE : item.status === 'complete' ? ROYAL_L : SLATE_3,
          flexShrink:   0, zIndex: 1,
          boxShadow:    item.status === 'active' ? `0 0 20px rgba(201,168,76,0.4)` : 'none',
        }}>
          <Icon size={18} />
        </div>
        {/* Connector line */}
        {!isLast && (
          <div style={{
            flex: 1, width: '2px', marginTop: '4px',
            background: item.status === 'complete'
              ? `linear-gradient(180deg, ${ROYAL_L}, rgba(37,99,235,0.2))`
              : 'rgba(30,41,59,0.8)',
            minHeight: '2rem',
          }} />
        )}
      </div>

      {/* Content card */}
      <div
        onClick={() => setExpanded((v) => !v)}
        style={{
          flex:          1,
          marginBottom:  isLast ? 0 : '1.25rem',
          background:    item.status === 'active'
            ? 'rgba(30,41,59,0.9)'
            : item.status === 'vision'
              ? 'rgba(30,41,59,0.4)'
              : 'rgba(15,23,42,0.6)',
          border:        `1px solid ${
            item.status === 'active'   ? 'rgba(201,168,76,0.3)'  :
            item.status === 'complete' ? 'rgba(37,99,235,0.18)' :
            item.status === 'vision'   ? 'rgba(201,168,76,0.12)' :
            'rgba(255,255,255,0.05)'
          }`,
          borderRadius:  '4px',
          padding:       '1.5rem',
          cursor:        'pointer',
          transition:    'border-color 0.25s, background 0.25s',
          position:      'relative',
          overflow:      'hidden',
        }}
        onMouseEnter={(e) => {
          if (item.status !== 'upcoming') return;
          e.currentTarget.style.borderColor = 'rgba(37,99,235,0.25)';
        }}
        onMouseLeave={(e) => {
          if (item.status !== 'upcoming') return;
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
        }}
      >
        {/* Active glow */}
        {item.status === 'active' && (
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at top left, rgba(201,168,76,0.06), transparent 60%)', pointerEvents: 'none' }} />
        )}

        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: expanded ? '1rem' : 0 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.375rem', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: '1.1rem', letterSpacing: '0.1em', color: item.accent }}>{item.year}</span>
              <div style={{ ...statusStyle[item.status], fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase' as const, padding: '0.2rem 0.6rem', borderRadius: '2px' }}>
                {statusLabel[item.status]}
              </div>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: SLATE_3 }}>{item.phase}</span>
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: item.status === 'upcoming' || item.status === 'vision' ? MUTED : WHITE, lineHeight: 1.3 }}>
              {item.title}
            </h3>
          </div>
          <ChevronRight
            size={16}
            color={SLATE_3}
            style={{ flexShrink: 0, transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease', marginTop: '2px' }}
          />
        </div>

        {/* Expandable body */}
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <p style={{ fontSize: '0.845rem', lineHeight: 1.75, color: MUTED, marginBottom: '1rem' }}>{item.body}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {item.metrics.map((m, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.75rem', background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.12)', borderRadius: '2px' }}>
                  <CheckCircle size={10} color={item.accent} />
                  <span style={{ fontSize: '0.7rem', color: MUTED, fontWeight: 500 }}>{m}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function MissionPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY       = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <div style={{ background: SLATE, minHeight: '100vh', color: WHITE }}>

      {/* ══════════════════════════════════════════════════════
          MANIFESTO HERO
      ══════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative flex min-h-screen items-center justify-center overflow-hidden" style={{ paddingTop: '5rem' }}>

        {/* Background layers */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Base */}
          <div style={{ position: 'absolute', inset: 0, background: SLATE }} />
          {/* Royal blue glow — centered */}
          <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: '80%', height: '60%', background: 'radial-gradient(ellipse, rgba(37,99,235,0.12) 0%, transparent 65%)' }} />
          {/* Top-left accent */}
          <div style={{ position: 'absolute', top: '-5%', left: '-5%', width: '40%', height: '50%', background: 'radial-gradient(ellipse, rgba(37,99,235,0.08) 0%, transparent 70%)' }} />
          {/* Gold bottom-right warmth */}
          <div style={{ position: 'absolute', bottom: '5%', right: '-5%', width: '35%', height: '40%', background: 'radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 70%)' }} />
          {/* Horizontal rule lines — editorial feel */}
          {[15, 35, 60, 82].map((pct) => (
            <div key={pct} style={{ position: 'absolute', top: `${pct}%`, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.06), transparent)' }} />
          ))}
          {/* Dot grid */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(37,99,235,0.08) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        {/* Hero content — centered manifesto */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 w-full">
          <div className="mx-auto max-w-6xl px-6 lg:px-12 text-center">
            <motion.div variants={stagger} initial="hidden" animate="visible">

              {/* Eyebrow */}
              <motion.div variants={fadeIn} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
                <div style={{ height: '1px', width: '3rem', background: `linear-gradient(90deg, transparent, rgba(37,99,235,0.4))` }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 0.875rem', background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.25)', borderRadius: '2px' }}>
                  <Heart size={11} color={ROYAL_L} />
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: ROYAL_L }}>Our Mission</span>
                </div>
                <div style={{ height: '1px', width: '3rem', background: `linear-gradient(90deg, rgba(37,99,235,0.4), transparent)` }} />
              </motion.div>

              {/* Manifesto headline */}
              <motion.h1 variants={fadeUp} style={{
                fontFamily:    "'Bebas Neue', Impact, sans-serif",
                fontSize:      'clamp(3rem, 8.5vw, 8rem)',
                lineHeight:    0.9,
                letterSpacing: '0.01em',
                color:         WHITE,
                marginBottom:  '0.5rem',
              }}>
                POTENTIAL IS
              </motion.h1>
              <motion.h1 variants={fadeUp} style={{
                fontFamily:    "'Bebas Neue', Impact, sans-serif",
                fontSize:      'clamp(3rem, 8.5vw, 8rem)',
                lineHeight:    0.9,
                letterSpacing: '0.01em',
                background:    `linear-gradient(135deg, ${ROYAL_L} 0%, #93C5FD 45%, ${ROYAL_L} 100%)`,
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor:  'transparent',
                backgroundClip:       'text',
                animation:            'shimmerBlue 4s linear infinite',
                marginBottom:         '0.5rem',
              }}>
                UNIVERSAL.
              </motion.h1>
              <motion.h1 variants={fadeUp} style={{
                fontFamily:    "'Bebas Neue', Impact, sans-serif",
                fontSize:      'clamp(3rem, 8.5vw, 8rem)',
                lineHeight:    0.9,
                letterSpacing: '0.01em',
                color:         WHITE,
                marginBottom:  '0.5rem',
              }}>
                OPPORTUNITY
              </motion.h1>
              <motion.h1 variants={fadeUp} style={{
                fontFamily:    "'Bebas Neue', Impact, sans-serif",
                fontSize:      'clamp(3rem, 8.5vw, 8rem)',
                lineHeight:    0.9,
                letterSpacing: '0.01em',
                color:         MUTED,
                marginBottom:  '3.5rem',
              }}>
                IS NOT.
              </motion.h1>

              {/* Manifesto statement */}
              <motion.p variants={fadeUp} style={{
                fontSize:    '1.15rem',
                lineHeight:  1.85,
                color:       MUTED,
                maxWidth:    '680px',
                margin:      '0 auto 2.5rem',
              }}>
                We exist to close the distance between those two sentences.
                Not through charity. Through education — the most powerful equalizer
                ever invented. We bring the boardroom to every kid, in every zip code,
                regardless of what their parents earn.
              </motion.p>

              {/* CTA strip */}
              <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="/partner" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 2rem', background: `linear-gradient(135deg, ${ROYAL_D}, ${ROYAL_L})`, border: 'none', borderRadius: '2px', color: WHITE, fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, textDecoration: 'none', boxShadow: '0 4px 24px rgba(37,99,235,0.3)' }}>
                  Join the Mission <ArrowUpRight size={13} />
                </Link>
                <Link href="/curriculum" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 2rem', background: 'transparent', border: '1px solid rgba(37,99,235,0.3)', borderRadius: '2px', color: ROYAL_L, fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, textDecoration: 'none' }}>
                  See the Curriculum <ChevronRight size={13} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}>
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase' as const, color: SLATE_3 }}>Scroll</span>
          <div style={{ height: '2.5rem', width: '1px', background: `linear-gradient(180deg, ${ROYAL_L}, transparent)` }} />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════
          THESIS BREAK — full-width statement
      ══════════════════════════════════════════════════════ */}
      <div style={{ background: SLATE_2, borderTop: '1px solid rgba(37,99,235,0.1)', borderBottom: '1px solid rgba(37,99,235,0.1)', overflow: 'hidden' }}>
        <FadeIn>
          <div className="mx-auto max-w-7xl px-6 lg:px-12 py-16">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase' as const, color: ROYAL_L, marginBottom: '1rem' }}>
                  Why We Exist
                </p>
                <h2 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 0.95, letterSpacing: '0.02em', color: WHITE }}>
                  THE SYSTEM IS NOT BROKEN.<br />
                  <span style={{ color: ROYAL_L }}>IT WAS BUILT THIS WAY.</span>
                </h2>
              </div>
              <div>
                <FadeIn delay={0.1}>
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.85, color: MUTED, marginBottom: '1.25rem' }}>
                    Elite business education has always been available — to those who
                    can afford it. Private schools teach negotiation. Prep academies
                    teach investing. Harvard teaches leadership. The rest of the world
                    gets a worksheet on balancing a checkbook.
                  </p>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.85, color: MUTED }}>
                    Young Innovators for Change was built on the conviction that this
                    is not inevitable. It is a choice — and we are choosing differently.
                  </p>
                </FadeIn>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* ══════════════════════════════════════════════════════
          THREE PILLARS
      ══════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <FadeIn className="mb-14">
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase' as const, color: ROYAL_L, marginBottom: '0.75rem' }}>
              Our Foundation
            </p>
            <h2 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 0.92, letterSpacing: '0.02em', color: WHITE }}>
              THE THREE PILLARS.
            </h2>
          </div>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <FadeIn key={pillar.title} delay={i * 0.12}>
                <div style={{
                  background:   'rgba(15,23,42,0.7)',
                  border:       `1px solid ${pillar.accentBorder}`,
                  borderRadius: '4px',
                  overflow:     'hidden',
                  height:       '100%',
                  display:      'flex',
                  flexDirection: 'column',
                  position:     'relative',
                }}>
                  {/* Top bar */}
                  <div style={{ height: '3px', background: `linear-gradient(90deg, ${pillar.accent}, transparent)` }} />

                  <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Icon + label */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                      <div style={{ width: '52px', height: '52px', background: pillar.accentBg, border: `1px solid ${pillar.accentBorder}`, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: pillar.accent }}>
                        <Icon size={24} />
                      </div>
                      <span style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: '4rem', color: 'rgba(255,255,255,0.03)', lineHeight: 1, userSelect: 'none' as const }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: '2.2rem', letterSpacing: '0.06em', color: pillar.accent, lineHeight: 1, marginBottom: '1rem' }}>
                      {pillar.title.toUpperCase()}
                    </h3>

                    {/* Thesis */}
                    <FadeIn delay={i * 0.08}>
                      <p style={{ fontSize: '0.95rem', fontWeight: 600, color: WHITE, lineHeight: 1.6, marginBottom: '1rem', fontStyle: 'italic' }}>
                        "{pillar.thesis}"
                      </p>
                    </FadeIn>

                    {/* Body */}
                    <FadeIn delay={i * 0.1 + 0.05}>
                      <p style={{ fontSize: '0.845rem', lineHeight: 1.75, color: MUTED, marginBottom: '1.5rem', flex: 1 }}>
                        {pillar.body}
                      </p>
                    </FadeIn>

                    {/* Stats */}
                    <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.25rem', marginTop: 'auto' }}>
                      {pillar.stats.map((stat) => (
                        <div key={stat.lbl} style={{ flex: 1 }}>
                          <p style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: '1.8rem', color: pillar.accent, lineHeight: 1, letterSpacing: '0.04em' }}>
                            {stat.val}
                          </p>
                          <p style={{ fontSize: '0.65rem', color: MUTED, letterSpacing: '0.08em', textTransform: 'uppercase' as const, fontWeight: 600, marginTop: '2px' }}>
                            {stat.lbl}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          THE GLENDORA STORY — The Pilot
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: 'rgba(15,23,42,0.6)', borderTop: '1px solid rgba(37,99,235,0.08)', borderBottom: '1px solid rgba(37,99,235,0.08)' }}>
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>

            {/* Left — Story */}
            <div>
              <FadeIn>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <MapPin size={14} color={GOLD} />
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: GOLD }}>
                    Glendora, California
                  </span>
                </div>
              </FadeIn>

              <FadeIn delay={0.05}>
                <h2 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 0.9, letterSpacing: '0.02em', color: WHITE, marginBottom: '2rem' }}>
                  THE PILOT.<br />
                  <span style={{ color: ROYAL_L }}>WHERE IT ALL</span><br />
                  BEGAN.
                </h2>
              </FadeIn>

              <FadeIn delay={0.1}>
                <p style={{ fontSize: '1rem', lineHeight: 1.85, color: MUTED, marginBottom: '1.5rem' }}>
                  In 2022, Cindy Ha walked into a single Glendora classroom with
                  one question: can underserved K-12 students master CEO-level
                  business concepts if given the same tools as elite students?
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <p style={{ fontSize: '1rem', lineHeight: 1.85, color: MUTED, marginBottom: '1.5rem' }}>
                  Twenty-two students. Eight weeks. Zero prior business education.
                  By Week 8, all 22 had built a venture concept, completed a
                  financial model, and delivered a live investor pitch.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p style={{ fontSize: '1rem', lineHeight: 1.85, color: MUTED, marginBottom: '2rem' }}>
                  The answer to Cindy's question was unambiguous: <strong style={{ color: WHITE }}>yes.</strong>{' '}
                  Not just yes — they thrived. The pilot produced a 100% completion
                  rate, a 2.3x improvement in financial literacy scores, and a
                  waitlist of 80 students for the next cohort.
                </p>
              </FadeIn>
              <FadeIn delay={0.25}>
                <blockquote style={{ borderLeft: `3px solid ${GOLD}`, paddingLeft: '1.5rem', marginBottom: '2rem' }}>
                  <p style={{ fontSize: '1.05rem', fontStyle: 'italic', lineHeight: 1.75, color: WHITE, marginBottom: '0.75rem' }}>
                    "I did not walk in there to prove a theory. I walked in there
                    because I had four kids of my own and I refused to accept that
                    their futures would be determined by our address."
                  </p>
                  <cite style={{ display: 'block', fontSize: '0.75rem', fontStyle: 'normal', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: GOLD }}>
                    — Cindy Ha, Founder
                  </cite>
                </blockquote>
              </FadeIn>
            </div>

            {/* Right — Proof stats + story beats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Big stat */}
              <FadeIn>
                <div style={{ background: `linear-gradient(135deg, rgba(37,99,235,0.12), rgba(15,23,42,0.9))`, border: '1px solid rgba(37,99,235,0.22)', borderRadius: '4px', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, borderLeft: `3px solid ${ROYAL_L}`, borderRadius: '4px 0 0 4px', pointerEvents: 'none' }} />
                  <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${ROYAL_L}, transparent)` }} />
                  <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: ROYAL_L, marginBottom: '0.75rem' }}>
                    Pilot Results — 2022
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    {[
                      { val: '100%', lbl: 'Completion Rate' },
                      { val: '22',   lbl: 'Students Enrolled' },
                      { val: '2.3x', lbl: 'Literacy Improvement' },
                      { val: '80+',  lbl: 'Waitlisted Next Cohort' },
                    ].map(({ val, lbl }) => (
                      <div key={lbl}>
                        <p style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: '2.5rem', color: WHITE, lineHeight: 1, letterSpacing: '0.04em' }}>{val}</p>
                        <p style={{ fontSize: '0.68rem', color: MUTED, textTransform: 'uppercase' as const, letterSpacing: '0.1em', fontWeight: 600, marginTop: '2px' }}>{lbl}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Story beats */}
              {[
                { icon: Rocket,      label: 'The Hypothesis',   body: 'Every child, regardless of zip code, can master CEO-level concepts if given the right environment and tools.' },
                { icon: CheckCircle, label: 'The Proof',        body: 'A 100% completion rate in the first cohort validated the model. The students did not just complete the program — they excelled.' },
                { icon: TrendingUp,  label: 'The Implication',  body: 'If it works in one Glendora classroom, it works everywhere. The only variable is access — and access is what we provide.' },
              ].map(({ icon: Icon, label, body }, i) => (
                <FadeIn key={label} delay={i * 0.1}>
                  <div style={{ display: 'flex', gap: '1rem', padding: '1.25rem', background: 'rgba(15,23,42,0.5)', border: '1px solid rgba(37,99,235,0.1)', borderRadius: '3px' }}>
                    <div style={{ width: '36px', height: '36px', flexShrink: 0, background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: ROYAL_L }}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.78rem', fontWeight: 700, color: WHITE, marginBottom: '0.25rem', letterSpacing: '0.04em' }}>{label}</p>
                      <p style={{ fontSize: '0.78rem', lineHeight: 1.65, color: MUTED }}>{body}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          INTERACTIVE TIMELINE — Roadmap
      ══════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <FadeIn className="mb-16">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'end', flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase' as const, color: ROYAL_L, marginBottom: '0.75rem' }}>
                Growth Roadmap
              </p>
              <h2 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 0.9, letterSpacing: '0.02em', color: WHITE }}>
                FROM ONE SCHOOL<br />
                <span style={{ color: ROYAL_L }}>TO A NATIONAL</span><br />
                MOVEMENT.
              </h2>
            </div>
            <div>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: MUTED, marginBottom: '1.25rem' }}>
                Every movement starts with a single proof point. Ours was
                Glendora. Click each milestone to read the full story of how we
                got here — and where we are going.
              </p>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                {[
                  { dot: ROYAL_L, label: 'Achieved'   },
                  { dot: GOLD,    label: 'In Progress' },
                  { dot: SLATE_3, label: 'Upcoming'    },
                ].map(({ dot, label }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: dot }} />
                    <span style={{ fontSize: '0.72rem', color: MUTED, fontWeight: 500 }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Timeline */}
        <div style={{ maxWidth: '760px' }}>
          {ROADMAP.map((item, i) => (
            <RoadmapNode key={item.year} item={item} index={i} isLast={i === ROADMAP.length - 1} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CLOSING CTA — manifesto close
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: SLATE_2, borderTop: '1px solid rgba(37,99,235,0.1)' }}>
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
          <FadeIn>
            <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto' }}>
              <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase' as const, color: ROYAL_L, marginBottom: '1.5rem' }}>
                The Invitation
              </p>
              <h2 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', lineHeight: 0.9, letterSpacing: '0.02em', color: WHITE, marginBottom: '2rem' }}>
                THE MOVEMENT<br />
                <span style={{ color: ROYAL_L }}>NEEDS YOU.</span>
              </h2>
              <FadeIn delay={0.1}>
                <p style={{ fontSize: '1rem', lineHeight: 1.85, color: MUTED, marginBottom: '2.5rem' }}>
                  Whether you are a school district administrator, a corporate
                  executive, an individual donor, or a parent — there is a role
                  for you in this movement. The only requirement is that you believe
                  every child deserves a seat at the table.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link href="/partner" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2.5rem', background: `linear-gradient(135deg, ${GOLD}, ${GOLD_L})`, border: 'none', borderRadius: '2px', color: SLATE, fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' as const, textDecoration: 'none', boxShadow: '0 4px 24px rgba(201,168,76,0.3)' }}>
                    Partner Now <ArrowUpRight size={14} />
                  </Link>
                  <Link href="/curriculum" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', background: 'transparent', border: '1px solid rgba(37,99,235,0.3)', borderRadius: '2px', color: ROYAL_L, fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, textDecoration: 'none' }}>
                    Explore the Curriculum <ChevronRight size={13} />
                  </Link>
                </div>
              </FadeIn>
            </div>
          </FadeIn>
        </div>
      </section>

      <style>{`
        @keyframes shimmerBlue {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
      `}</style>
    </div>
  );
}