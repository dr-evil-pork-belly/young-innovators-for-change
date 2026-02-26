'use client';

import { useRef, useState, useEffect } from 'react';
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
  type Variants,
} from 'framer-motion';
import {
  ArrowUpRight, ChevronLeft, ChevronRight, Quote,
  TrendingUp, DollarSign, Users, Building2,
  Star, Award, Heart, BarChart3, PieChart,
  CheckCircle, ArrowRight, Sparkles, Shield,
} from 'lucide-react';
import Link from 'next/link';

// ── Tokens ────────────────────────────────────────────────────────────────────
const ROYAL   = '#2563EB';
const ROYAL_L = '#3B82F6';
const ROYAL_D = '#1D4ED8';
const ROYAL_XL= '#93C5FD';
const SLATE   = '#0F172A';
const SLATE_2 = '#1E293B';
const SLATE_3 = '#334155';
const MUTED   = '#94A3B8';
const WHITE   = '#F8FAFC';
const GOLD    = '#C9A84C';
const GOLD_L  = '#E8C94F';
const GREEN   = '#10B981';
const GREEN_L = '#34D399';

// ── Animation variants ────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
};
const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.55, ease: 'easeOut' } },
};
const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function FadeIn({ children, delay = 0, className = '', variant = fadeUp }: {
  children: React.ReactNode; delay?: number; className?: string; variant?: Variants;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div ref={ref} variants={variant} initial="hidden"
      animate={inView ? 'visible' : 'hidden'} transition={{ delay }} className={className}>
      {children}
    </motion.div>
  );
}

// ── Animated counter ──────────────────────────────────────────────────────────
function useCounter(target: number, duration = 2000, decimals = 0) {
  const [count, setCount] = useState(0);
  const ref    = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(parseFloat((ease * target).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration, decimals]);

  return { count, ref };
}

// ── Hero stat card ────────────────────────────────────────────────────────────
function HeroStat({
  prefix = '', suffix = '', target, decimals = 0,
  label, sublabel, accent, delay = 0,
}: {
  prefix?: string; suffix?: string; target: number; decimals?: number;
  label: string; sublabel: string; accent: string; delay?: number;
}) {
  const { count, ref } = useCounter(target, 2200, decimals);
  const cardRef  = useRef<HTMLDivElement>(null);
  const inView   = useInView(cardRef, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay }}
      style={{
        background:    'rgba(15,23,42,0.7)',
        border:        `1px solid rgba(37,99,235,0.15)`,
        borderRadius:  '4px',
        padding:       '2.25rem 2rem',
        position:      'relative',
        overflow:      'hidden',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Top accent line */}
      <div style={{ position: 'absolute', inset: '0 0 auto 0', height: '2px', background: `linear-gradient(90deg, ${accent}, transparent)` }} />

      <span ref={ref} style={{
        display:       'block',
        fontFamily:    "'Bebas Neue', Impact, sans-serif",
        fontSize:      'clamp(3rem, 5vw, 4.5rem)',
        lineHeight:    1,
        letterSpacing: '0.02em',
        color:         WHITE,
        marginBottom:  '0.25rem',
      }}>
        {prefix}{decimals > 0 ? count.toFixed(decimals) : Math.round(count).toLocaleString()}{suffix}
      </span>

      <p style={{ fontSize: '0.875rem', fontWeight: 700, color: WHITE, marginBottom: '0.25rem' }}>{label}</p>
      <p style={{ fontSize: '0.75rem', color: MUTED, lineHeight: 1.5 }}>{sublabel}</p>

      {/* Ghost watermark */}
      <div style={{ position: 'absolute', bottom: '-0.5rem', right: '1rem', fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: '5rem', color: 'rgba(37,99,235,0.04)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>
        {suffix || prefix}
      </div>
    </motion.div>
  );
}

// ── Testimonial data ──────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote:  "Before this program, I thought business was for rich adults. After 8 weeks I had built my own product, run a profit-and-loss model, and pitched to real investors. I was 12.",
    name:   "Marcus T.",
    role:   "10U Founders Track Alumni, Glendora",
    cohort: "2023 Cohort",
    stars:  5,
    type:   'student',
  },
  {
    quote:  "We have tried three financial literacy programs in the last five years. None of them came close to what YIC delivered in eight weeks. The engagement was unlike anything I have seen in 18 years of education.",
    name:   "Dr. Patricia Nguyen",
    role:   "Principal, Roosevelt Elementary School",
    cohort: "District Partner",
    stars:  5,
    type:   'principal',
  },
  {
    quote:  "My daughter came home from Week 3 and asked me to explain our household budget to her. She started questioning our family's spending decisions. I did not expect that from a 10-year-old.",
    name:   "Sandra L.",
    role:   "Parent, 10U Founders Track",
    cohort: "2024 Cohort",
    stars:  5,
    type:   'parent',
  },
  {
    quote:  "I watched a student who had never spoken in class stand up and field 5 minutes of investor questions without flinching. That is what this program does. It does not just teach business — it builds people.",
    name:   "James Okafor",
    role:   "14U Executives Track Instructor",
    cohort: "Lead Instructor, Cohort 4",
    stars:  5,
    type:   'instructor',
  },
  {
    quote:  "The TAM-SAM-SOM framework, the pitch deck, the Q&A — I use all of it now in my high school business class. YIC gave me a vocabulary I did not know I needed at 13.",
    name:   "Aisha M.",
    role:   "14U Executives Track Alumni",
    cohort: "2023 Cohort, Now 9th Grade",
    stars:  5,
    type:   'student',
  },
  {
    quote:  "As a Seed Partner, I expected to write a check and receive a thank-you note. Instead I was invited to Pitch Day and watched 25 kids present better than half my adult colleagues. My investment ROI was immediate.",
    name:   "David Chen",
    role:   "Seed Partner, Tech Executive",
    cohort: "2024 Seed Partner",
    stars:  5,
    type:   'partner',
  },
];

const TYPE_COLORS: Record<string, string> = {
  student:    ROYAL_L,
  principal:  GOLD,
  parent:     GREEN,
  instructor: ROYAL_L,
  partner:    GOLD,
};

// ── Testimonial Carousel ──────────────────────────────────────────────────────
function TestimonialCarousel() {
  const [active, setActive]   = useState(0);
  const [dir, setDir]         = useState(1);
  const total = TESTIMONIALS.length;

  const go = (next: number) => {
    setDir(next > active ? 1 : -1);
    setActive((next + total) % total);
  };

  const slideVariants: Variants = {
    enter:  (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.45, ease: 'easeOut' } },
    exit:   (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40, transition: { duration: 0.3 } }),
  };

  const t = TESTIMONIALS[active];
  const accent = TYPE_COLORS[t.type];

  return (
    <div style={{ position: 'relative' }}>
      {/* Main card */}
      <div style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(37,99,235,0.15)', borderRadius: '4px', overflow: 'hidden', minHeight: '280px', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: '0 0 auto 0', height: '2px', background: `linear-gradient(90deg, ${accent}, transparent)` }} />

        <AnimatePresence custom={dir} mode="wait">
          <motion.div
            key={active}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{ padding: '2.5rem 3rem' }}
          >
            {/* Quote icon */}
            <div style={{ width: '40px', height: '40px', background: `rgba(37,99,235,0.1)`, border: `1px solid rgba(37,99,235,0.2)`, borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <Quote size={18} color={accent} />
            </div>

            {/* Quote text */}
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: WHITE, marginBottom: '2rem', fontStyle: 'italic', maxWidth: '720px' }}>
              "{t.quote}"
            </p>

            {/* Attribution */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {/* Avatar */}
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: `linear-gradient(135deg, rgba(37,99,235,0.3), rgba(37,99,235,0.1))`, border: `1px solid ${accent}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: '1rem', color: accent, letterSpacing: '0.06em' }}>
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p style={{ fontSize: '0.875rem', fontWeight: 700, color: WHITE }}>{t.name}</p>
                  <p style={{ fontSize: '0.75rem', color: MUTED }}>{t.role}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: "center", gap: '0.75rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} size={13} fill={GOLD} color={GOLD} />
                  ))}
                </div>
                <div style={{ padding: '0.25rem 0.6rem', background: `${accent}15`, border: `1px solid ${accent}30`, borderRadius: '2px', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: accent }}>
                  {t.cohort}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.5rem' }}>
        {/* Dots */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => go(i)} style={{ width: i === active ? '24px' : '8px', height: '8px', borderRadius: '4px', background: i === active ? ROYAL_L : SLATE_3, border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', padding: 0 }} />
          ))}
        </div>
        {/* Arrows */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {([[-1, ChevronLeft], [1, ChevronRight]] as const).map(([d, Icon]) => (
            <button key={d} onClick={() => go(active + d)} style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(15,23,42,0.7)', border: '1px solid rgba(37,99,235,0.18)', borderRadius: '3px', color: MUTED, cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = ROYAL_L; e.currentTarget.style.color = WHITE; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(37,99,235,0.18)'; e.currentTarget.style.color = MUTED; }}>
              <Icon size={16} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Allocation data (pie chart) ───────────────────────────────────────────────
const ALLOCATION = [
  { label: 'Instructor Compensation', pct: 52, color: ROYAL_L,  sublabel: 'Certified YIC instructors, training & development' },
  { label: 'Curriculum & Materials',  pct: 18, color: GOLD,     sublabel: 'Workbooks, digital tools, pitch materials' },
  { label: 'District Coordination',   pct: 15, color: GREEN,    sublabel: 'School liaison, scheduling, logistics' },
  { label: 'Impact Measurement',      pct: 15, color: ROYAL_XL, sublabel: 'Data collection, reporting, outcome tracking' },
];

// ── SVG Donut chart ───────────────────────────────────────────────────────────
function DonutChart() {
  const ref    = useRef<SVGSVGElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-40px' });
  const [hovered, setHovered] = useState<number | null>(null);

  const size   = 220;
  const cx     = size / 2;
  const cy     = size / 2;
  const r      = 80;
  const inner  = 54;
  const stroke = r - inner;
  const circ   = 2 * Math.PI * (inner + stroke / 2);

  let cumulative = 0;
  const segments = ALLOCATION.map((seg, i) => {
    const offset  = circ * (1 - cumulative / 100);
    const dash    = circ * (seg.pct / 100);
    const startAngle = (cumulative / 100) * 2 * Math.PI - Math.PI / 2;
    const midAngle   = startAngle + (seg.pct / 100) * Math.PI;
    cumulative       += seg.pct;
    return { ...seg, offset, dash, midAngle, index: i };
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg ref={ref} width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {/* BG track */}
          <circle cx={cx} cy={cy} r={inner + stroke / 2} fill="none" stroke="rgba(37,99,235,0.06)" strokeWidth={stroke} />
          {/* Segments */}
          {segments.map((seg, i) => (
            <motion.circle
              key={seg.label}
              cx={cx} cy={cy}
              r={inner + stroke / 2}
              fill="none"
              stroke={seg.color}
              strokeWidth={hovered === i ? stroke + 6 : stroke}
              strokeDasharray={`${inView ? seg.dash : 0} ${circ}`}
              strokeDashoffset={seg.offset}
              strokeLinecap="butt"
              style={{ transition: 'stroke-width 0.2s ease', cursor: 'pointer', filter: hovered === i ? `drop-shadow(0 0 8px ${seg.color}66)` : 'none' }}
              initial={{ strokeDasharray: `0 ${circ}` }}
              animate={{ strokeDasharray: inView ? `${seg.dash} ${circ}` : `0 ${circ}` }}
              transition={{ duration: 1.2, delay: i * 0.18, ease: 'easeOut' }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            />
          ))}
        </svg>
        {/* Center label */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {hovered !== null ? (
            <>
              <span style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: '2rem', color: ALLOCATION[hovered].color, lineHeight: 1 }}>{ALLOCATION[hovered].pct}%</span>
              <span style={{ fontSize: '0.65rem', color: MUTED, textAlign: 'center', maxWidth: '80px', lineHeight: 1.4, fontWeight: 600, letterSpacing: '0.06em' }}>{ALLOCATION[hovered].label}</span>
            </>
          ) : (
            <>
              <span style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: '2rem', color: WHITE, lineHeight: 1 }}>100%</span>
              <span style={{ fontSize: '0.65rem', color: MUTED, letterSpacing: '0.1em', textTransform: 'uppercase' as const, fontWeight: 700 }}>Students</span>
            </>
          )}
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', width: '100%' }}>
        {ALLOCATION.map((seg, i) => (
          <div key={seg.label}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.625rem 0.875rem', background: hovered === i ? 'rgba(30,41,59,0.7)' : 'rgba(15,23,42,0.4)', border: `1px solid ${hovered === i ? seg.color + '44' : 'rgba(255,255,255,0.04)'}`, borderRadius: '3px', cursor: 'default', transition: 'all 0.2s' }}
          >
            <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: seg.color, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: hovered === i ? WHITE : '#CBD5E1' }}>{seg.label}</span>
                <span style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: '1.1rem', color: seg.color, lineHeight: 1, flexShrink: 0 }}>{seg.pct}%</span>
              </div>
              <span style={{ fontSize: '0.68rem', color: MUTED }}>{seg.sublabel}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Multiplier data ───────────────────────────────────────────────────────────
const MULTIPLIERS = [
  { input: '$1', label: 'Your Investment', color: ROYAL_L, icon: DollarSign, desc: 'Every dollar contributed goes directly to student programming — zero administrative leakage.' },
  { input: '$12', label: 'Community Economic Value', color: GREEN, icon: TrendingUp, desc: 'Research shows each dollar invested in youth education yields $12 in future economic productivity per student.' },
  { input: '$28', label: 'Lifetime Earnings Premium', color: GOLD, icon: Award, desc: 'Students who complete entrepreneurship programs earn 28x the program cost over their careers, on average.' },
  { input: '∞', label: 'Generational Impact', color: ROYAL_XL, icon: Heart, desc: 'The student who learns to read a P&L at 12 teaches their own children. The compound effect of financial literacy is incalculable.' },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ImpactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);

  return (
    <div style={{ background: SLATE, minHeight: '100vh', color: WHITE }}>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section ref={heroRef} className="relative overflow-hidden" style={{ paddingTop: '9rem', paddingBottom: '5rem' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '80%', height: '70%', background: 'radial-gradient(ellipse, rgba(37,99,235,0.1) 0%, transparent 65%)' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(37,99,235,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.025) 1px, transparent 1px)', backgroundSize: '72px 72px' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.15), transparent)' }} />
        </div>

        <motion.div style={{ y: heroY }} className="relative mx-auto max-w-7xl px-6 lg:px-12">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.div variants={fadeIn} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 0.875rem', background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.25)', borderRadius: '2px' }}>
                <BarChart3 size={11} color={ROYAL_L} />
                <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: ROYAL_L }}>Impact Report 2024</span>
              </div>
            </motion.div>

            <motion.h1 variants={fadeUp} style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 'clamp(3.5rem, 8vw, 7rem)', lineHeight: 0.9, letterSpacing: '0.02em', color: WHITE, marginBottom: '1.5rem', maxWidth: '800px' }}>
              NUMBERS THAT<br />
              <span style={{ background: `linear-gradient(135deg, ${ROYAL_L}, ${ROYAL_XL})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>TELL THE TRUTH.</span>
            </motion.h1>

            <motion.p variants={fadeUp} style={{ fontSize: '1.05rem', lineHeight: 1.8, color: MUTED, maxWidth: '560px', marginBottom: '3.5rem' }}>
              Every dollar invested. Every student served. Every outcome measured.
              This is our annual impact report — presented with the transparency
              that every stakeholder deserves.
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Animated Hero Stats ───────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-12">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <HeroStat target={1200}  suffix="+"  label="Lives Impacted"     sublabel="Students who completed a full YIC cohort"            accent={ROYAL_L} delay={0}    />
          <HeroStat target={0}    prefix="$"   label="Cost to Families"   sublabel="Every program is 100% free for students"             accent={GREEN}   delay={0.1}  />
          <HeroStat target={5}    suffix="+"   label="School Districts"   sublabel="Active district partnerships in greater LA"           accent={GOLD}    delay={0.2}  />
          <HeroStat target={100}  suffix="%"   label="Engagement Rate"    sublabel="Highest in YIC program history, all cohorts"         accent={ROYAL_L} delay={0.3}  />
          <HeroStat target={2.3}  suffix="x"   label="Literacy Gain"      sublabel="Financial literacy score improvement vs. baseline"   accent={GOLD}    delay={0.4}  decimals={1} />
          <HeroStat target={8}    suffix=" wks" label="Program Duration"  sublabel="From zero to investor pitch in 8 focused weeks"      accent={ROYAL_XL} delay={0.5} />
        </div>
      </section>

      {/* Divider */}
      <div style={{ borderTop: '1px solid rgba(37,99,235,0.08)', borderBottom: '1px solid rgba(37,99,235,0.08)', background: 'rgba(37,99,235,0.02)', padding: '1rem 0', marginBottom: 0 }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-12 flex items-center justify-between flex-wrap gap-4">
          <span style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: ROYAL_L }}>2024 Annual Impact Report</span>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {['Independently Verified', '501(c)(3) Registered', 'Full Financial Disclosure'].map((tag) => (
              <div key={tag} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle size={11} color={GREEN} />
                <span style={{ fontSize: '0.7rem', color: MUTED, fontWeight: 500 }}>{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Testimonial Carousel ──────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <FadeIn className="mb-12">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: ROYAL_L, marginBottom: '0.5rem' }}>Voices From the Field</p>
              <h2 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', lineHeight: 0.95, letterSpacing: '0.02em', color: WHITE }}>
                WHAT THEY SAY<br />SAYS IT ALL.
              </h2>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {[
                { label: 'Students',    color: ROYAL_L },
                { label: 'Principals',  color: GOLD    },
                { label: 'Parents',     color: GREEN   },
                { label: 'Partners',    color: GOLD    },
              ].map(({ label, color }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.75rem', background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(37,99,235,0.12)', borderRadius: '2px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: color }} />
                  <span style={{ fontSize: '0.68rem', color: MUTED, fontWeight: 600 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <TestimonialCarousel />
        </FadeIn>
      </section>

      {/* ── Multiplier Effect ─────────────────────────────── */}
      <section style={{ background: 'rgba(15,23,42,0.6)', borderTop: '1px solid rgba(37,99,235,0.08)', borderBottom: '1px solid rgba(37,99,235,0.08)' }}>
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
          <FadeIn className="mb-14">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'end', flexWrap: 'wrap' }}>
              <div>
                <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: ROYAL_L, marginBottom: '0.5rem' }}>Return on Investment</p>
                <h2 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', lineHeight: 0.95, letterSpacing: '0.02em', color: WHITE }}>
                  THE MULTIPLIER<br />
                  <span style={{ color: ROYAL_L }}>EFFECT.</span>
                </h2>
              </div>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: MUTED }}>
                Youth education is the highest-returning investment in the social
                sector. Nobel economist James Heckman estimates a 7–12% annual
                return on early education investment. Our data suggests YIC
                programs generate even higher multipliers at the community level.
              </p>
            </div>
          </FadeIn>

          {/* Multiplier flow */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0', position: 'relative' }}>
            {MULTIPLIERS.map((item, i) => {
              const Icon = item.icon;
              const isLast = i === MULTIPLIERS.length - 1;
              return (
                <FadeIn key={item.label} delay={i * 0.1}>
                  <div style={{ position: 'relative', padding: '2rem', background: 'rgba(15,23,42,0.4)', borderTop: '1px solid rgba(37,99,235,0.1)', borderRight: isLast ? 'none' : '1px solid rgba(37,99,235,0.08)', borderBottom: '1px solid rgba(37,99,235,0.1)', borderLeft: i === 0 ? '1px solid rgba(37,99,235,0.1)' : 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {/* Arrow connector */}
                    {!isLast && (
                      <div style={{ position: 'absolute', right: '-12px', top: '50%', transform: 'translateY(-50%)', zIndex: 2, width: '24px', height: '24px', borderRadius: '50%', background: SLATE_2, border: `1px solid rgba(37,99,235,0.2)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowRight size={10} color={ROYAL_L} />
                      </div>
                    )}

                    <div style={{ width: '44px', height: '44px', background: `${item.color}15`, border: `1px solid ${item.color}30`, borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color }}>
                      <Icon size={20} />
                    </div>

                    <div>
                      <p style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: '2.8rem', color: item.color, lineHeight: 1, letterSpacing: '0.02em', marginBottom: '0.25rem' }}>
                        {item.input}
                      </p>
                      <p style={{ fontSize: '0.8rem', fontWeight: 700, color: WHITE, marginBottom: '0.375rem' }}>{item.label}</p>
                      <p style={{ fontSize: '0.75rem', lineHeight: 1.65, color: MUTED }}>{item.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          {/* ROI callout */}
          <FadeIn delay={0.3} className="mt-8">
            <div style={{ background: `linear-gradient(135deg, rgba(16,185,129,0.08), rgba(15,23,42,0.8))`, border: '1px solid rgba(16,185,129,0.2)', borderRadius: '4px', padding: '1.75rem 2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: '0 0 0 0', borderLeft: `3px solid ${GREEN}`, borderRadius: '4px 0 0 4px', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', inset: 'auto 0 0 0', height: '1px', background: `linear-gradient(90deg, ${GREEN}30, transparent)` }} />
              <div>
                <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: GREEN, marginBottom: '0.375rem' }}>Bottom Line</p>
                <p style={{ fontSize: '1rem', fontWeight: 600, color: WHITE, lineHeight: 1.5 }}>
                  A $1,000 Seed Partner investment sponsors 25 students — generating an estimated{' '}
                  <span style={{ color: GREEN }}>$300,000 in projected lifetime earnings premium</span>{' '}
                  across the cohort.
                </p>
              </div>
              <Link href="/partner" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 1.75rem', background: `linear-gradient(135deg, ${GREEN}, ${GREEN_L})`, border: 'none', borderRadius: '3px', color: SLATE, fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' as const, textDecoration: 'none', flexShrink: 0, boxShadow: '0 4px 20px rgba(16,185,129,0.25)' }}>
                Invest Now <ArrowUpRight size={13} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Donor Transparency ────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <FadeIn className="mb-14">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'end', flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: ROYAL_L, marginBottom: '0.5rem' }}>Donor Transparency</p>
              <h2 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', lineHeight: 0.95, letterSpacing: '0.02em', color: WHITE }}>
                WHERE YOUR<br />
                <span style={{ color: ROYAL_L }}>MONEY GOES.</span>
              </h2>
            </div>
            <div>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: MUTED, marginBottom: '1rem' }}>
                100% of all program donations are allocated directly to student resources.
                We operate on a lean, mission-driven model with zero administrative overhead
                drawn from donor funds. Hover over each segment to explore the breakdown.
              </p>
              <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                {[
                  { icon: Shield,    label: '501(c)(3) Certified',   color: GREEN   },
                  { icon: CheckCircle, label: 'Independently Audited', color: ROYAL_L },
                ].map(({ icon: Icon, label, color }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Icon size={13} color={color} />
                    <span style={{ fontSize: '0.75rem', color: MUTED, fontWeight: 600 }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '4rem', alignItems: 'start' }}>
          {/* Donut chart */}
          <FadeIn>
            <DonutChart />
          </FadeIn>

          {/* Transparency commitments */}
          <FadeIn delay={0.15}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: ROYAL_L, marginBottom: '0.25rem' }}>
                Our Commitments to You
              </p>
              {[
                { title: 'Annual Financial Audit',       body: 'YIC publishes a full independent audit each year. Every line item, every dollar, available to any donor on request.',             icon: Shield,     color: ROYAL_L },
                { title: 'Real-Time Impact Dashboard',  body: 'Series A+ partners receive a live dashboard showing exactly how their investment is deployed and what outcomes it is generating.',  icon: BarChart3,  color: GOLD    },
                { title: 'Zero Overhead Guarantee',     body: 'Administrative costs are funded separately through grant income. Donor contributions go exclusively to student programming.',        icon: CheckCircle,color: GREEN   },
                { title: 'Named Allocation Option',     body: 'Major gifts can be designated to a specific school, district, or program. You choose where your investment lands.',                  icon: Building2,  color: ROYAL_L },
                { title: 'Quarterly Impact Reports',    body: 'All partners at any tier receive a quarterly report with enrollment numbers, engagement rates, and student outcome data.',            icon: TrendingUp, color: GOLD    },
              ].map(({ title, body, icon: Icon, color }, i) => (
                <FadeIn key={title} delay={i * 0.08}>
                  <div style={{ display: 'flex', gap: '1rem', padding: '1.25rem', background: 'rgba(15,23,42,0.5)', border: '1px solid rgba(37,99,235,0.1)', borderRadius: '3px', transition: 'border-color 0.2s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(37,99,235,0.25)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(37,99,235,0.1)'; }}
                  >
                    <div style={{ width: '36px', height: '36px', flexShrink: 0, background: `${color}15`, border: `1px solid ${color}25`, borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.85rem', fontWeight: 700, color: WHITE, marginBottom: '0.25rem' }}>{title}</p>
                      <p style={{ fontSize: '0.77rem', lineHeight: 1.65, color: MUTED }}>{body}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────── */}
      <section style={{ background: SLATE_2, borderTop: '1px solid rgba(37,99,235,0.1)' }}>
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
          <FadeIn>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: '3rem', flexWrap: 'wrap' }}>
              <div>
                <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: ROYAL_L, marginBottom: '0.75rem' }}>Ready to Add to These Numbers?</p>
                <h2 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 0.95, letterSpacing: '0.02em', color: WHITE, marginBottom: '0.875rem' }}>
                  EVERY STUDENT COUNTED HERE<br />STARTED WITH ONE DECISION.
                </h2>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: MUTED, maxWidth: '520px' }}>
                  The 1,201st student, the 6th district, the next zero on our impact
                  number — they are waiting. Your partnership is the difference between
                  a statistic and a story.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', minWidth: '200px' }}>
                <Link href="/partner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '1rem 2rem', background: `linear-gradient(135deg, ${ROYAL_D}, ${ROYAL_L})`, border: 'none', borderRadius: '3px', color: WHITE, fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' as const, textDecoration: 'none', boxShadow: '0 4px 24px rgba(37,99,235,0.3)', whiteSpace: 'nowrap' as const }}>
                  Partner Now <ArrowUpRight size={13} />
                </Link>
                <Link href="/mission" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.875rem 2rem', background: 'transparent', border: '1px solid rgba(37,99,235,0.25)', borderRadius: '3px', color: ROYAL_L, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, textDecoration: 'none', whiteSpace: 'nowrap' as const }}>
                  Read Our Mission
                </Link>
              </div>
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