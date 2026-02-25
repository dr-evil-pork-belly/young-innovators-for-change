'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  type Variants,
} from 'framer-motion';
import { ArrowUpRight, GraduationCap, Users, MapPin, Star, ChevronRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

// ─── Design tokens ────────────────────────────────────────────────────────────
const ROYAL   = '#2563EB'; // Royal Blue
const ROYAL_L = '#3B82F6'; // Lighter blue
const ROYAL_D = '#1D4ED8'; // Deeper blue
const SLATE   = '#0F172A'; // Near-black slate
const SLATE_2 = '#1E293B'; // Mid slate
const SLATE_3 = '#334155'; // Light slate
const MUTED   = '#94A3B8'; // Muted text
const WHITE   = '#F8FAFC';
const GOLD    = '#C9A84C'; // Carry-over from navbar

// ─── Reusable animation variants ─────────────────────────────────────────────
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// ─── Section wrapper with scroll-triggered reveal ────────────────────────────
function RevealSection({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref  = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Impact Ticker ────────────────────────────────────────────────────────────
const TICKER_ITEMS = [
  { value: '1,200+', label: 'Students Impacted' },
  { value: '5+',     label: 'Districts Served'  },
  { value: '100%',   label: 'Engagement Rate'   },
  { value: '8',      label: 'Week Program'       },
  { value: '3x',     label: 'Confidence Growth'  },
  { value: '$0',     label: 'Cost to Students'   },
];

function ImpactTicker() {
  // Duplicate for seamless loop
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="relative overflow-hidden py-5" style={{
      borderTop:    '1px solid rgba(37,99,235,0.2)',
      borderBottom: '1px solid rgba(37,99,235,0.2)',
      background:   'rgba(37,99,235,0.04)',
    }}>
      {/* Left fade */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24" style={{
        background: `linear-gradient(90deg, ${SLATE}, transparent)`,
      }} />
      {/* Right fade */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24" style={{
        background: `linear-gradient(270deg, ${SLATE}, transparent)`,
      }} />

      <motion.div
        className="flex items-center gap-0 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
      >
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-10 px-10">
            <div className="flex items-center gap-3">
              <span style={{
                fontFamily:    "'Bebas Neue', Impact, sans-serif",
                fontSize:      '2rem',
                letterSpacing: '0.04em',
                color:         ROYAL_L,
                lineHeight:    1,
              }}>
                {item.value}
              </span>
              <span style={{
                fontSize:      '0.7rem',
                fontWeight:    600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color:         MUTED,
              }}>
                {item.label}
              </span>
            </div>
            <span style={{ color: 'rgba(37,99,235,0.3)', fontSize: '1.2rem' }}>◆</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Credential Card ──────────────────────────────────────────────────────────
function CredentialCard({
  icon,
  title,
  subtitle,
  delay = 0,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  delay?: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay }}
      className="group relative p-6"
      style={{
        background:   'rgba(30,41,59,0.6)',
        border:       '1px solid rgba(37,99,235,0.15)',
        borderRadius: '4px',
        backdropFilter: 'blur(12px)',
        transition:   'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(37,99,235,0.4)';
        e.currentTarget.style.boxShadow   = '0 8px 32px rgba(37,99,235,0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(37,99,235,0.15)';
        e.currentTarget.style.boxShadow   = 'none';
      }}
    >
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-px" style={{
        background:    'linear-gradient(90deg, transparent, rgba(37,99,235,0.5), transparent)',
        borderRadius:  '4px 4px 0 0',
      }} />

      <div className="mb-3 flex h-10 w-10 items-center justify-center" style={{
        background:   'rgba(37,99,235,0.1)',
        border:       '1px solid rgba(37,99,235,0.2)',
        borderRadius: '3px',
        color:        ROYAL_L,
      }}>
        {icon}
      </div>
      <p style={{ fontSize: '0.95rem', fontWeight: 600, color: WHITE, marginBottom: '0.25rem' }}>
        {title}
      </p>
      <p style={{ fontSize: '0.8rem', color: MUTED, lineHeight: 1.5 }}>
        {subtitle}
      </p>
    </motion.div>
  );
}

// ─── Stat pill ────────────────────────────────────────────────────────────────
function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center px-8 py-4" style={{
      borderRight: '1px solid rgba(37,99,235,0.15)',
    }}>
      <span style={{
        fontFamily:    "'Bebas Neue', Impact, sans-serif",
        fontSize:      '2.5rem',
        letterSpacing: '0.04em',
        color:         ROYAL_L,
        lineHeight:    1,
      }}>
        {value}
      </span>
      <span style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: MUTED, marginTop: '0.25rem' }}>
        {label}
      </span>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY       = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div style={{ background: SLATE, minHeight: '100vh', color: WHITE }}>

      {/* ══════════════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative flex min-h-screen items-center overflow-hidden"
        style={{ paddingTop: '5rem' }}
      >
        {/* Layered background */}
        <div className="absolute inset-0">
          {/* Deep navy base */}
          <div className="absolute inset-0" style={{ background: SLATE }} />

          {/* Royal blue radial glow — top left */}
          <div className="absolute" style={{
            top: '-10%', left: '-5%',
            width: '60%', height: '70%',
            background: `radial-gradient(ellipse, rgba(37,99,235,0.18) 0%, transparent 70%)`,
          }} />

          {/* Slate glow — bottom right */}
          <div className="absolute" style={{
            bottom: '-10%', right: '-5%',
            width: '50%', height: '60%',
            background: `radial-gradient(ellipse, rgba(30,41,59,0.8) 0%, transparent 70%)`,
          }} />

          {/* Grid overlay */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
          }} />

          {/* Diagonal blue stripe */}
          <div className="absolute" style={{
            top: 0, right: '15%',
            width: '1px', height: '100%',
            background: 'linear-gradient(180deg, transparent, rgba(37,99,235,0.2), transparent)',
            transform: 'skewX(-15deg)',
          }} />
          <div className="absolute" style={{
            top: 0, right: '35%',
            width: '1px', height: '100%',
            background: 'linear-gradient(180deg, transparent, rgba(37,99,235,0.08), transparent)',
            transform: 'skewX(-15deg)',
          }} />
        </div>

        {/* Hero content */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-16 lg:px-12"
        >
          <motion.div variants={stagger} initial="hidden" animate="visible">

            {/* Eyebrow */}
            <motion.div variants={fadeIn} className="mb-8 flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5" style={{
                background:   'rgba(37,99,235,0.1)',
                border:       '1px solid rgba(37,99,235,0.25)',
                borderRadius: '2px',
              }}>
                <Sparkles size={11} color={ROYAL_L} />
                <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: ROYAL_L }}>
                  Elite MBA for K-12
                </span>
              </div>
              <div className="h-px flex-1 max-w-16" style={{ background: `linear-gradient(90deg, rgba(37,99,235,0.4), transparent)` }} />
            </motion.div>

            {/* Main headline */}
            <motion.h1
              variants={fadeUp}
              className="mb-6 max-w-4xl"
              style={{
                fontFamily:    "'Bebas Neue', Impact, sans-serif",
                fontSize:      'clamp(3.5rem, 8vw, 7.5rem)',
                lineHeight:    0.92,
                letterSpacing: '0.02em',
                color:         WHITE,
              }}
            >
              THE BOARDROOM{' '}
              <span style={{
                display:    'inline-block',
                background: `linear-gradient(135deg, ${ROYAL_L} 0%, #60A5FA 50%, ${ROYAL_L} 100%)`,
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor:  'transparent',
                backgroundClip:       'text',
                animation:            'shimmerBlue 4s linear infinite',
              }}>
                HAS NO
              </span>
              <br />
              AGE LIMIT.
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={fadeUp}
              className="mb-10 max-w-xl"
              style={{ fontSize: '1.05rem', lineHeight: 1.7, color: MUTED }}
            >
              We bring world-class business education — leadership, venture building,
              and financial literacy — directly into underserved K-12 districts.
              Because every child deserves a seat at the table.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
              <Link
                href="/programs"
                className="btn-gold"
                style={{ fontSize: '0.8125rem', padding: '0.875rem 2rem' }}
              >
                Explore Programs
                <ArrowUpRight size={14} />
              </Link>
              <Link
                href="/partner"
                className="btn-ghost"
                style={{
                  fontSize: '0.8125rem',
                  padding:  '0.875rem 2rem',
                  borderColor: 'rgba(37,99,235,0.3)',
                  color:       ROYAL_L,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = ROYAL_L;
                  e.currentTarget.style.background  = 'rgba(37,99,235,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(37,99,235,0.3)';
                  e.currentTarget.style.background  = 'transparent';
                }}
              >
                Partner With Us
                <ChevronRight size={14} />
              </Link>
            </motion.div>

            {/* Stat row */}
            <motion.div
              variants={fadeUp}
              className="mt-20 inline-flex items-stretch overflow-hidden"
              style={{
                border:       '1px solid rgba(37,99,235,0.15)',
                borderRadius: '4px',
                background:   'rgba(15,23,42,0.6)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <StatPill value="1,200+" label="Students"   />
              <StatPill value="5+"     label="Districts"  />
              <div className="flex flex-col items-center px-8 py-4">
                <span style={{
                  fontFamily:    "'Bebas Neue', Impact, sans-serif",
                  fontSize:      '2.5rem',
                  letterSpacing: '0.04em',
                  color:         GOLD,
                  lineHeight:    1,
                }}>
                  100%
                </span>
                <span style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: MUTED, marginTop: '0.25rem' }}>
                  Engagement
                </span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: MUTED }}>Scroll</span>
          <div className="h-8 w-px" style={{ background: `linear-gradient(180deg, ${ROYAL_L}, transparent)` }} />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════
          IMPACT TICKER
      ══════════════════════════════════════════════════════ */}
      <ImpactTicker />

      {/* ══════════════════════════════════════════════════════
          MISSION STATEMENT INTERLUDE
      ══════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-28 lg:px-12">
        <RevealSection>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
            <div className="max-w-2xl">
              <p className="label-eyebrow mb-4" style={{ color: ROYAL_L }}>Our Mission</p>
              <h2 style={{
                fontFamily:    "'Bebas Neue', Impact, sans-serif",
                fontSize:      'clamp(2.5rem, 5vw, 4.5rem)',
                lineHeight:    0.95,
                letterSpacing: '0.02em',
                color:         WHITE,
              }}>
                AN ELITE MBA.<br />
                <span style={{ color: ROYAL_L }}>FOR EVERY KID.</span><br />
                IN EVERY ZIP CODE.
              </h2>
            </div>
            <div className="max-w-sm">
              <p style={{ fontSize: '0.95rem', lineHeight: 1.75, color: MUTED }}>
                Top business schools charge $200K for an MBA. We deliver the same
                frameworks — venture building, financial literacy, leadership — to
                kids in underserved districts. For free. Because access shouldn't
                be a privilege.
              </p>
            </div>
          </div>
        </RevealSection>

        {/* Three pillars */}
        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { num: '01', title: 'Leadership', body: 'Executive presence, decision-making, and team dynamics — taught through real scenarios, not textbooks.' },
            { num: '02', title: 'Venture Building', body: 'Students build, pitch, and launch real micro-businesses over 8 weeks. Real stakes, real learning.' },
            { num: '03', title: 'Financial Literacy', body: 'Budgeting, investing, and compounding interest — the money knowledge most adults never received.' },
          ].map((pillar, i) => (
            <RevealSection key={pillar.num} delay={i * 0.1}>
              <div
                className="group relative p-8 h-full"
                style={{
                  background:   'rgba(30,41,59,0.4)',
                  border:       '1px solid rgba(37,99,235,0.12)',
                  borderRadius: '4px',
                  transition:   'border-color 0.3s, background 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(37,99,235,0.35)';
                  e.currentTarget.style.background  = 'rgba(30,41,59,0.7)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(37,99,235,0.12)';
                  e.currentTarget.style.background  = 'rgba(30,41,59,0.4)';
                }}
              >
                <span style={{
                  fontFamily:    "'Bebas Neue', Impact, sans-serif",
                  fontSize:      '3.5rem',
                  color:         'rgba(37,99,235,0.12)',
                  lineHeight:    1,
                  display:       'block',
                  marginBottom:  '1rem',
                  transition:    'color 0.3s',
                }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(37,99,235,0.25)')}
                >
                  {pillar.num}
                </span>
                <h3 style={{
                  fontFamily:    "'Bebas Neue', Impact, sans-serif",
                  fontSize:      '1.8rem',
                  letterSpacing: '0.06em',
                  color:         WHITE,
                  marginBottom:  '0.75rem',
                }}>
                  {pillar.title}
                </h3>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: MUTED }}>
                  {pillar.body}
                </p>
                <div className="mt-6 flex items-center gap-2" style={{ color: ROYAL_L, fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Learn more <ArrowUpRight size={12} />
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FOUNDER SPOTLIGHT — CINDY HA
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: 'rgba(15,23,42,0.6)', borderTop: '1px solid rgba(37,99,235,0.1)', borderBottom: '1px solid rgba(37,99,235,0.1)' }}>
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-12">

          {/* Section label */}
          <RevealSection>
            <p className="label-eyebrow mb-16" style={{ color: ROYAL_L }}>Founder Spotlight</p>
          </RevealSection>

          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-start">

            {/* Left — Text */}
            <div>
              <RevealSection>
                <h2 style={{
                  fontFamily:    "'Bebas Neue', Impact, sans-serif",
                  fontSize:      'clamp(2.8rem, 5vw, 5rem)',
                  lineHeight:    0.92,
                  letterSpacing: '0.02em',
                  color:         WHITE,
                  marginBottom:  '1.5rem',
                }}>
                  MEET THE<br />
                  <span style={{ color: ROYAL_L }}>VISIONARY</span><br />
                  BEHIND IT ALL.
                </h2>
              </RevealSection>

              <RevealSection delay={0.1}>
                <div className="mb-6 flex items-center gap-4">
                  {/* Avatar placeholder */}
                  <div style={{
                    width:        '64px',
                    height:       '64px',
                    borderRadius: '50%',
                    background:   `linear-gradient(135deg, ${ROYAL_D}, ${ROYAL_L})`,
                    border:       '2px solid rgba(37,99,235,0.3)',
                    display:      'flex',
                    alignItems:   'center',
                    justifyContent: 'center',
                    flexShrink:   0,
                  }}>
                    <span style={{
                      fontFamily: "'Bebas Neue', Impact, sans-serif",
                      fontSize:   '1.5rem',
                      color:      WHITE,
                      letterSpacing: '0.05em',
                    }}>
                      CH
                    </span>
                  </div>
                  <div>
                    <p style={{ fontSize: '1.1rem', fontWeight: 700, color: WHITE }}>Cindy Ha</p>
                    <p style={{ fontSize: '0.8rem', color: MUTED, marginTop: '2px' }}>Founder & Executive Director</p>
                  </div>
                </div>
              </RevealSection>

              <RevealSection delay={0.15}>
                <p style={{ fontSize: '1rem', lineHeight: 1.8, color: MUTED, marginBottom: '1.5rem' }}>
                  As a USC MBA graduate and mother of four, Cindy Ha knows firsthand
                  the gap between the education elite families access and what
                  underserved communities receive. She built Young Innovators for
                  Change to close that gap — permanently.
                </p>
                <p style={{ fontSize: '1rem', lineHeight: 1.8, color: MUTED, marginBottom: '2rem' }}>
                  Her vision is radical in its simplicity: every child, regardless of
                  zip code or household income, deserves the same business acumen that
                  top MBA programs charge $200,000 to teach. And she is delivering it —
                  one district at a time.
                </p>
              </RevealSection>

              <RevealSection delay={0.2}>
                <blockquote style={{
                  borderLeft:  `3px solid ${ROYAL_L}`,
                  paddingLeft: '1.5rem',
                  marginBottom: '2.5rem',
                }}>
                  <p style={{ fontSize: '1.05rem', fontStyle: 'italic', lineHeight: 1.7, color: WHITE }}>
                    "The zip code a child is born into should never determine the ceiling
                    of their ambition. We are here to remove that ceiling entirely."
                  </p>
                  <cite style={{ display: 'block', marginTop: '0.75rem', fontSize: '0.8rem', fontStyle: 'normal', fontWeight: 600, color: ROYAL_L, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    — Cindy Ha, Founder
                  </cite>
                </blockquote>
              </RevealSection>

              <RevealSection delay={0.25}>
                <Link href="/about" className="btn-gold" style={{ fontSize: '0.8rem', display: 'inline-flex' }}>
                  Read Cindy's Story
                  <ArrowUpRight size={13} />
                </Link>
              </RevealSection>
            </div>

            {/* Right — Credential Cards */}
            <div className="flex flex-col gap-4">
              <CredentialCard
                icon={<GraduationCap size={18} />}
                title="USC Marshall MBA"
                subtitle="Master of Business Administration from the University of Southern California's top-ranked Marshall School of Business."
                delay={0.1}
              />
              <CredentialCard
                icon={<Users size={18} />}
                title="Mother of Four"
                subtitle="A firsthand understanding of child development, education gaps, and what it truly means to invest in a child's future."
                delay={0.2}
              />
              <CredentialCard
                icon={<MapPin size={18} />}
                title="5+ Districts Served"
                subtitle="Programs currently active across multiple underserved K-12 districts, with an expansion roadmap spanning 20+ districts by 2026."
                delay={0.3}
              />
              <CredentialCard
                icon={<Star size={18} />}
                title="100% Engagement Rate"
                subtitle="The highest student engagement metric in the program's history — achieved through real-world curriculum, not worksheets."
                delay={0.4}
              />

              {/* Highlight stat box */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: 0.5 }}
                style={{
                  background:   `linear-gradient(135deg, rgba(37,99,235,0.15), rgba(29,78,216,0.08))`,
                  border:       `1px solid rgba(37,99,235,0.25)`,
                  borderRadius: '4px',
                  padding:      '1.5rem',
                  position:     'relative',
                  overflow:     'hidden',
                }}
              >
                <div className="absolute inset-x-0 top-0 h-px" style={{
                  background: `linear-gradient(90deg, transparent, ${ROYAL_L}, transparent)`,
                }} />
                <div className="flex items-center justify-between">
                  <div>
                    <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: ROYAL_L, marginBottom: '0.5rem' }}>
                      Program Impact
                    </p>
                    <p style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: '3rem', color: WHITE, lineHeight: 1, letterSpacing: '0.04em' }}>
                      1,200<span style={{ color: ROYAL_L }}>+</span>
                    </p>
                    <p style={{ fontSize: '0.8rem', color: MUTED, marginTop: '0.25rem' }}>
                      students transformed since founding
                    </p>
                  </div>
                  <div style={{
                    fontFamily:    "'Bebas Neue', Impact, sans-serif",
                    fontSize:      '5rem',
                    color:         'rgba(37,99,235,0.08)',
                    lineHeight:    1,
                    userSelect:    'none',
                  }}>
                    YIC
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-28 lg:px-12">
        <RevealSection>
          <div
            className="relative overflow-hidden p-12 lg:p-20 text-center"
            style={{
              background:   `linear-gradient(135deg, rgba(37,99,235,0.12) 0%, rgba(15,23,42,0.8) 50%, rgba(37,99,235,0.08) 100%)`,
              border:       '1px solid rgba(37,99,235,0.2)',
              borderRadius: '4px',
            }}
          >
            {/* Background decorative elements */}
            <div className="absolute" style={{ top: '-30%', right: '-10%', width: '40%', height: '150%', background: 'radial-gradient(ellipse, rgba(37,99,235,0.08) 0%, transparent 70%)' }} />
            <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${ROYAL_L}, transparent)` }} />
            <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(37,99,235,0.3), transparent)` }} />

            <p className="label-eyebrow relative mb-4" style={{ color: ROYAL_L }}>Join the Movement</p>
            <h2
              className="relative mx-auto mb-6 max-w-3xl"
              style={{
                fontFamily:    "'Bebas Neue', Impact, sans-serif",
                fontSize:      'clamp(2.5rem, 5vw, 4.5rem)',
                lineHeight:    0.95,
                letterSpacing: '0.02em',
                color:         WHITE,
              }}
            >
              READY TO BRING THIS TO YOUR DISTRICT?
            </h2>
            <p className="relative mx-auto mb-10 max-w-lg" style={{ fontSize: '0.95rem', lineHeight: 1.75, color: MUTED }}>
              Partner with us to bring the Young Innovators curriculum to your students.
              No cost. Full support. Transformative results.
            </p>
            <div className="relative flex flex-wrap items-center justify-center gap-4">
              <Link href="/partner" className="btn-gold" style={{ fontSize: '0.875rem', padding: '1rem 2.5rem' }}>
                Partner Now
                <ArrowUpRight size={14} />
              </Link>
              <Link href="/programs" className="btn-ghost" style={{ fontSize: '0.875rem', padding: '1rem 2rem', borderColor: 'rgba(37,99,235,0.3)', color: ROYAL_L }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = ROYAL_L;
                  e.currentTarget.style.background  = 'rgba(37,99,235,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(37,99,235,0.3)';
                  e.currentTarget.style.background  = 'transparent';
                }}
              >
                View Programs
              </Link>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* Shimmer keyframe for headline */}
      <style>{`
        @keyframes shimmerBlue {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
      `}</style>
    </div>
  );
}