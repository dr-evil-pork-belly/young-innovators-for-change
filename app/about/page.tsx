'use client';

import { useRef } from 'react';
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion';
import {
  ArrowUpRight, GraduationCap, Heart, Users,
  MapPin, Award, BookOpen, Star, Quote,
  ChevronRight, Linkedin, Mail,
} from 'lucide-react';
import Link from 'next/link';

// ── Design Tokens — Forbes Dark Edition ──────────────────────────────────────
const INK      = '#0A0A0B';   // near-black ink
const PAPER    = '#F5F0E8';   // aged newsprint cream
const SLATE    = '#0F172A';   // deep navy slate
const SLATE_2  = '#1E293B';
const SLATE_3  = '#334155';
const MUTED    = '#94A3B8';
const WHITE    = '#F8FAFC';
const ROYAL    = '#2563EB';
const ROYAL_L  = '#3B82F6';
const GOLD     = '#C9A84C';
const GOLD_L   = '#E8C94F';
const WARM     = '#D4C5A9';   // warm cream text

// ── Typography — editorial font stack ────────────────────────────────────────
// We load Playfair Display via Google Fonts in the style tag below
const SERIF  = "'Playfair Display', Georgia, 'Times New Roman', serif";
const SANS   = "'DM Sans', system-ui, sans-serif";
const DISPLAY= "'Bebas Neue', Impact, sans-serif";

// ── Variants ──────────────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};
const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};
const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
};

function FadeIn({ children, delay = 0, className = '', v = fadeUp }: {
  children: React.ReactNode; delay?: number; className?: string; v?: Variants;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-56px' });
  return (
    <motion.div ref={ref} variants={v} initial="hidden"
      animate={inView ? 'visible' : 'hidden'} transition={{ delay }} className={className}>
      {children}
    </motion.div>
  );
}

// ── Advisor placeholders ──────────────────────────────────────────────────────
const ADVISORS = [
  { initials: 'JW', name: 'James Wilson',    title: 'Partner, Sequoia Capital',          area: 'Venture & Strategy'      },
  { initials: 'ML', name: 'Maria Lopez',     title: 'Superintendent, LAUSD',             area: 'K-12 Education'          },
  { initials: 'DR', name: 'Dr. Raj Patel',   title: 'Dean, USC Marshall School',         area: 'Academic Advisory'       },
  { initials: 'SC', name: 'Sandra Chen',     title: 'SVP, JP Morgan Chase',              area: 'Financial Literacy'      },
  { initials: 'TO', name: 'Thomas Okafor',   title: 'CEO, BridgePoint Ventures',         area: 'Corporate Partnerships'  },
  { initials: 'EK', name: 'Elena Kowalski',  title: 'Director, Gates Foundation',        area: 'Nonprofit Strategy'      },
  { initials: 'BM', name: 'Brian Martinez',  title: 'Principal, Roosevelt Elementary',   area: 'District Relations'      },
  { initials: 'AS', name: 'Aisha Siddiqui',  title: 'Professor, UCLA Anderson',          area: 'Curriculum Design'       },
];

// ── Credential Badge ──────────────────────────────────────────────────────────
function CredBadge({ icon: Icon, label, sublabel }: {
  icon: React.ElementType; label: string; sublabel: string;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
      <div style={{ width: '36px', height: '36px', flexShrink: 0, background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: ROYAL_L, marginTop: '2px' }}>
        <Icon size={16} />
      </div>
      <div>
        <p style={{ fontSize: '0.875rem', fontWeight: 700, color: WHITE, marginBottom: '1px' }}>{label}</p>
        <p style={{ fontSize: '0.75rem', color: MUTED, lineHeight: 1.45 }}>{sublabel}</p>
      </div>
    </div>
  );
}

// ── Advisor Card ──────────────────────────────────────────────────────────────
function AdvisorCard({ advisor, delay }: { advisor: typeof ADVISORS[0]; delay: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay }}
      style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}
    >
      {/* Grayscale portrait placeholder with grain */}
      <div style={{
        aspectRatio: '3 / 4',
        background:  'linear-gradient(160deg, #1a1f2e 0%, #2a3040 40%, #1e2535 100%)',
        border:      '1px solid rgba(255,255,255,0.07)',
        borderRadius: '2px',
        position:    'relative',
        overflow:    'hidden',
        display:     'flex',
        alignItems:  'center',
        justifyContent: 'center',
      }}>
        {/* Grain texture overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`, backgroundSize: '150px', opacity: 0.6 }} />
        {/* Vignette */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)' }} />
        {/* Initials */}
        <span style={{ fontFamily: SERIF, fontSize: '2.5rem', fontWeight: 700, color: 'rgba(255,255,255,0.18)', letterSpacing: '0.1em', position: 'relative', zIndex: 1 }}>
          {advisor.initials}
        </span>
        {/* Coming soon label */}
        <div style={{ position: 'absolute', bottom: '0.75rem', left: '0.75rem', padding: '0.2rem 0.6rem', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '2px', backdropFilter: 'blur(4px)' }}>
          <span style={{ fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.35)' }}>Photo Coming</span>
        </div>
      </div>

      {/* Name + title */}
      <div>
        <p style={{ fontSize: '0.875rem', fontWeight: 700, color: WHITE, marginBottom: '2px' }}>{advisor.name}</p>
        <p style={{ fontSize: '0.75rem', color: MUTED, lineHeight: 1.45, marginBottom: '4px' }}>{advisor.title}</p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', padding: '0.2rem 0.5rem', background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.15)', borderRadius: '2px' }}>
          <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: ROYAL_L }}>{advisor.area}</span>
        </div>
      </div>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <div style={{ background: SLATE, minHeight: '100vh', color: WHITE, fontFamily: SANS }}>

      {/* Load Playfair Display */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&display=swap');

        .drop-cap::first-letter {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 5.5rem;
          font-weight: 900;
          line-height: 0.75;
          float: left;
          margin-right: 0.12em;
          margin-top: 0.08em;
          color: #F8FAFC;
          letter-spacing: -0.02em;
        }
        .editorial-rule {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.08);
          margin: 0;
        }
        .editorial-rule-gold {
          border: none;
          border-top: 1px solid rgba(201,168,76,0.25);
          margin: 0;
        }
        @keyframes shimmerGold {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
      ` }} />

      {/* ══════════════════════════════════════════════════════
          MAGAZINE COVER HERO
      ══════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative overflow-hidden" style={{ paddingTop: '5rem', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>

        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(160deg, #070B14 0%, #0F172A 50%, #0A0F1E 100%)` }} />
          {/* Warm spotlight center */}
          <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: '60%', height: '70%', background: 'radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 65%)' }} />
          {/* Fine grain */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`, backgroundSize: '200px', opacity: 0.8 }} />
          {/* Horizontal rules — magazine layout */}
          <div style={{ position: 'absolute', top: '5.5rem', left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.05)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
        </div>

        <motion.div style={{ y: heroY }} className="relative w-full">
          <div className="mx-auto max-w-7xl px-6 lg:px-16 py-20">
            <motion.div variants={stagger} initial="hidden" animate="visible">

              {/* Issue label — magazine masthead style */}
              <motion.div variants={fadeIn} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '32px', height: '1px', background: GOLD }} />
                  <span style={{ fontFamily: SANS, fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: GOLD }}>
                    YIC — About
                  </span>
                  <div style={{ width: '32px', height: '1px', background: GOLD }} />
                </div>
                <span style={{ fontFamily: SANS, fontSize: '0.6rem', letterSpacing: '0.2em', color: SLATE_3, textTransform: 'uppercase' as const }}>
                  The Founder's Story
                </span>
              </motion.div>

              {/* Massive editorial headline */}
              <motion.div variants={fadeUp} style={{ marginBottom: '2rem' }}>
                <h1 style={{
                  fontFamily:  SERIF,
                  fontSize:    'clamp(3rem, 7vw, 6.5rem)',
                  fontWeight:  900,
                  lineHeight:  1.0,
                  letterSpacing: '-0.02em',
                  color:       WHITE,
                  marginBottom: '0.25rem',
                }}>
                  The Woman Who Decided
                </h1>
                <h1 style={{
                  fontFamily:    SERIF,
                  fontSize:      'clamp(3rem, 7vw, 6.5rem)',
                  fontWeight:    900,
                  lineHeight:    1.0,
                  letterSpacing: '-0.02em',
                  fontStyle:     'italic',
                  background:    `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_L} 40%, ${GOLD} 100%)`,
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor:  'transparent',
                  backgroundClip:       'text',
                  animation:            'shimmerGold 5s linear infinite',
                }}>
                  Every Child Deserves
                </h1>
                <h1 style={{
                  fontFamily:  SERIF,
                  fontSize:    'clamp(3rem, 7vw, 6.5rem)',
                  fontWeight:  900,
                  lineHeight:  1.0,
                  letterSpacing: '-0.02em',
                  color:       WHITE,
                }}>
                  an MBA.
                </h1>
              </motion.div>

              {/* Sub-deck — magazine style */}
              <motion.p variants={fadeUp} style={{
                fontFamily:  SERIF,
                fontSize:    '1.2rem',
                fontStyle:   'italic',
                lineHeight:  1.7,
                color:       WARM,
                maxWidth:    '600px',
                marginBottom: '3rem',
              }}>
                How a USC MBA graduate and mother of four walked into a Glendora
                classroom and started a movement that is rewriting the rules of
                who gets access to elite business education.
              </motion.p>

              {/* Byline — editorial */}
              <motion.div variants={fadeIn} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                <div style={{ width: '1px', height: '2.5rem', background: 'rgba(201,168,76,0.4)' }} />
                <div>
                  <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: GOLD, marginBottom: '2px' }}>Cindy Ha</p>
                  <p style={{ fontSize: '0.7rem', color: MUTED, letterSpacing: '0.05em' }}>Founder & Executive Director, Young Innovators for Change</p>
                </div>
                <div style={{ width: '1px', height: '2.5rem', background: 'rgba(255,255,255,0.08)' }} />
                <div>
                  <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: MUTED, marginBottom: '2px' }}>Est. 2022</p>
                  <p style={{ fontSize: '0.7rem', color: MUTED }}>Glendora, California</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <hr className="editorial-rule" />

      {/* ══════════════════════════════════════════════════════
          FOUNDER PROFILE — Two-column magazine spread
      ══════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 lg:px-16 py-24">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '5rem', alignItems: 'start' }}>

          {/* Left — portrait + credentials */}
          <FadeIn>
            <div>
              {/* Portrait */}
              <div style={{
                aspectRatio: '4 / 5',
                background:  'linear-gradient(175deg, #151c2e 0%, #1e2840 50%, #141b2c 100%)',
                border:      '1px solid rgba(255,255,255,0.08)',
                borderRadius: '2px',
                position:    'relative',
                overflow:    'hidden',
                marginBottom: '2rem',
              }}>
                {/* Grain */}
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E")`, backgroundSize: '140px' }} />
                {/* Vignette */}
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 40%, transparent 35%, rgba(0,0,0,0.55) 100%)' }} />
                {/* Initials */}
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: SERIF, fontSize: '5rem', fontWeight: 900, color: 'rgba(255,255,255,0.1)', letterSpacing: '0.1em' }}>CH</span>
                </div>
                {/* Gold caption bar */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1rem 1.25rem', background: 'linear-gradient(0deg, rgba(0,0,0,0.85), transparent)', borderTop: `1px solid ${GOLD}22` }}>
                  <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: '0.8rem', color: WARM }}>Cindy Ha — Founder & Executive Director</p>
                  <p style={{ fontSize: '0.65rem', color: MUTED, marginTop: '2px' }}>Young Innovators for Change · Glendora, CA</p>
                </div>
              </div>

              {/* Credentials */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase' as const, color: ROYAL_L, marginBottom: '0.25rem' }}>Credentials</p>
                <CredBadge icon={GraduationCap} label="USC Marshall MBA"     sublabel="Master of Business Administration, University of Southern California" />
                <CredBadge icon={Heart}         label="Mother of Four"       sublabel="Firsthand insight into child development and education inequity" />
                <CredBadge icon={MapPin}        label="Glendora, California" sublabel="Founder of the flagship YIC pilot district, 2022" />
                <CredBadge icon={Users}         label="1,200+ Students"      sublabel="Lives directly impacted through YIC programming to date" />
                <CredBadge icon={Award}         label="501(c)(3) Founder"    sublabel="Registered nonprofit focused on K-12 education equity" />
              </div>

              {/* Social */}
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.75rem' }}>
                {[{ icon: Linkedin, label: 'LinkedIn' }, { icon: Mail, label: 'Email' }].map(({ icon: Icon, label }) => (
                  <button key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1rem', background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(37,99,235,0.18)', borderRadius: '3px', color: MUTED, fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', fontFamily: SANS }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = ROYAL_L; e.currentTarget.style.color = WHITE; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(37,99,235,0.18)'; e.currentTarget.style.color = MUTED; }}
                  >
                    <Icon size={13} /> {label}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Right — editorial profile copy */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <FadeIn>
              <p style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase' as const, color: GOLD }}>The Founder's Profile</p>
            </FadeIn>

            <FadeIn delay={0.05}>
              <p className="drop-cap" style={{ fontFamily: SANS, fontSize: '1.05rem', lineHeight: 1.85, color: WARM, overflow: 'hidden' }}>
                Cindy Ha did not set out to build a nonprofit. She set out to answer
                a question that had been nagging at her since the day she received
                her MBA from USC Marshall: why is this knowledge only accessible to
                people who already have money?
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p style={{ fontFamily: SANS, fontSize: '1.05rem', lineHeight: 1.85, color: MUTED }}>
                As a mother of four children navigating the Los Angeles school system,
                she watched the gap widen year after year. Private schools ran
                entrepreneurship clubs. Prep academies offered investing courses.
                Meanwhile, the schools in Glendora, where she lived and worked, were
                lucky to have a single economics elective.
              </p>
            </FadeIn>

            {/* Pull quote — magazine feature style */}
            <FadeIn delay={0.12}>
              <div style={{ borderLeft: `3px solid ${GOLD}`, paddingLeft: '1.75rem', margin: '0.5rem 0' }}>
                <Quote size={20} color={`${GOLD}60`} style={{ marginBottom: '0.5rem' }} />
                <p style={{ fontFamily: SERIF, fontSize: '1.35rem', fontStyle: 'italic', fontWeight: 600, lineHeight: 1.5, color: WHITE, marginBottom: '0.75rem' }}>
                  "I was not trying to start a movement. I was trying to answer one
                  question: what happens if we give underserved kids the exact same
                  tools we give MBA students?"
                </p>
                <cite style={{ fontSize: '0.72rem', fontStyle: 'normal', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: GOLD }}>
                  — Cindy Ha
                </cite>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p style={{ fontFamily: SANS, fontSize: '1.05rem', lineHeight: 1.85, color: MUTED }}>
                In 2022, she stopped asking the question and started running the
                experiment. Armed with her USC MBA frameworks and a deep
                understanding of how children actually learn, she designed an
                8-week curriculum that compressed the essential pillars of a
                business education into a format that a 10-year-old could not just
                understand, but be genuinely excited by.
              </p>
            </FadeIn>

            <FadeIn delay={0.18}>
              <p style={{ fontFamily: SANS, fontSize: '1.05rem', lineHeight: 1.85, color: MUTED }}>
                Twenty-two students. One classroom. A 100% completion rate and a
                waitlist of 80 for the next cohort. The experiment had its answer.
                Young Innovators for Change was born.
              </p>
            </FadeIn>

            {/* Stats strip */}
            <FadeIn delay={0.2}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.15)', borderRadius: '3px', overflow: 'hidden', marginTop: '0.5rem' }}>
                {[
                  { val: '2022', lbl: 'Founded' },
                  { val: '5+',   lbl: 'Districts' },
                  { val: '100%', lbl: 'Engagement' },
                ].map(({ val, lbl }) => (
                  <div key={lbl} style={{ padding: '1.25rem', background: 'rgba(15,23,42,0.6)', textAlign: 'center' }}>
                    <p style={{ fontFamily: DISPLAY, fontSize: '2.2rem', color: WHITE, lineHeight: 1, letterSpacing: '0.04em' }}>{val}</p>
                    <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: MUTED, marginTop: '4px' }}>{lbl}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <hr className="editorial-rule-gold" />

      {/* ══════════════════════════════════════════════════════
          FOUNDER'S LETTER
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: 'rgba(15,23,42,0.5)' }}>
        <div className="mx-auto max-w-4xl px-6 lg:px-12 py-24">

          <FadeIn className="mb-12">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '2.5rem', height: '1px', background: GOLD }} />
              <p style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: GOLD }}>
                A Letter from the Founder
              </p>
            </div>
          </FadeIn>

          {/* Letter heading */}
          <FadeIn delay={0.05}>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.01em', color: WHITE, marginBottom: '2.5rem' }}>
              To Everyone Who Believes<br />
              <em style={{ color: WARM }}>a Child's Potential Should Never Have a Zip Code.</em>
            </h2>
          </FadeIn>

          {/* Letter body */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '680px' }}>
            {[
              `When I was studying at USC Marshall, surrounded by brilliant, ambitious people from around the world, I kept thinking about the students back home. Not because they were less brilliant. Not because they were less ambitious. But because they had never been given a language for their ambition.`,
              `Business has a vocabulary. Venture capital has a grammar. Leadership has a syntax. And for generations, that language has been taught only in classrooms that cost $50,000 a year to enter. Everyone else had to figure it out on their own — or not at all.`,
              `I am a mother before I am a founder. When I look at my four children, I see the same fire I see in every student who walks into a YIC classroom. The difference is access. That is the only difference. And access is a problem we know how to solve.`,
              `This is not charity. This is not pity. This is equity. We are not giving children something they could not earn themselves — we are removing the artificial barrier that was never supposed to be there in the first place.`,
              `If you are reading this as a potential partner, as a parent, as an administrator, or simply as someone who believes what I believe — that potential is universal and opportunity should be too — then you already understand why this work cannot wait.`,
              `The boardroom has no age limit. And it has no zip code requirement either. Not anymore.`,
            ].map((para, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <p style={{ fontFamily: SANS, fontSize: '1.05rem', lineHeight: 1.9, color: i === 5 ? WHITE : MUTED }}>
                  {para}
                </p>
              </FadeIn>
            ))}
          </div>

          {/* Signature block */}
          <FadeIn delay={0.4}>
            <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              {/* Handwritten-style signature using CSS */}
              <div style={{ marginBottom: '0.5rem' }}>
                <svg width="180" height="60" viewBox="0 0 180 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Stylized "Cindy Ha" signature path */}
                  <path d="M12 38 C18 20, 28 15, 35 28 C38 34, 36 42, 32 44 C26 46, 22 40, 24 35 C26 30, 32 28, 38 32"
                    stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <path d="M42 30 C42 22, 44 18, 48 20 C52 22, 50 32, 46 38 C44 42, 44 44, 46 44"
                    stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <path d="M52 25 L54 44"
                    stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" fill="none" />
                  <path d="M50 32 L58 30"
                    stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" fill="none" />
                  <path d="M62 30 C65 22, 70 20, 73 26 C76 32, 72 40, 67 42 C63 44, 61 40, 63 35 C65 30, 71 30, 75 34"
                    stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  {/* Ha */}
                  <path d="M88 18 L88 44 C91 36, 95 30, 100 28 C106 26, 110 30, 110 36 C110 42, 108 44, 105 44"
                    stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <path d="M115 28 C120 20, 128 18, 132 26 C135 32, 132 40, 128 44 C124 48, 118 44, 118 38 C118 32, 124 28, 132 32"
                    stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  {/* Underline flourish */}
                  <path d="M8 50 C50 46, 100 48, 142 50" stroke={`${GOLD}60`} strokeWidth="1" strokeLinecap="round" fill="none" />
                </svg>
              </div>

              <p style={{ fontFamily: SERIF, fontWeight: 700, fontSize: '1rem', color: WHITE, marginBottom: '2px' }}>Cindy Ha</p>
              <p style={{ fontSize: '0.75rem', color: MUTED }}>Founder & Executive Director, Young Innovators for Change</p>
              <p style={{ fontSize: '0.7rem', color: SLATE_3, marginTop: '2px' }}>Glendora, California · 2022 – Present</p>
            </div>
          </FadeIn>
        </div>
      </section>

      <hr className="editorial-rule" />

      {/* ══════════════════════════════════════════════════════
          ADVISORY BOARD
      ══════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 lg:px-16 py-24">
        <FadeIn className="mb-14">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'end', flexWrap: 'wrap' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ width: '2rem', height: '1px', background: GOLD }} />
                <p style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: GOLD }}>
                  Advisory Board
                </p>
              </div>
              <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.01em', color: WHITE }}>
                The Minds<br />
                <em style={{ color: WARM }}>Behind the Mission.</em>
              </h2>
            </div>
            <div>
              <p style={{ fontFamily: SANS, fontSize: '0.9rem', lineHeight: 1.8, color: MUTED }}>
                Our advisory board brings together education leaders, venture capitalists,
                nonprofit strategists, and academic experts united by a single conviction:
                that access to elite business education is a civil rights issue.
                Official portraits will be added as board members are formally announced.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Advisor grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '2rem' }}>
          {ADVISORS.map((advisor, i) => (
            <AdvisorCard key={advisor.name} advisor={advisor} delay={i * 0.07} />
          ))}
        </div>

        {/* Join board CTA */}
        <FadeIn delay={0.3} className="mt-14">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', padding: '1.75rem 2.5rem', background: 'rgba(15,23,42,0.5)', border: '1px solid rgba(37,99,235,0.15)', borderRadius: '4px' }}>
            <div>
              <p style={{ fontSize: '0.9rem', fontWeight: 700, color: WHITE, marginBottom: '0.25rem' }}>Interested in joining our Advisory Board?</p>
              <p style={{ fontSize: '0.8rem', color: MUTED }}>We are actively seeking advisors in education policy, EdTech, corporate CSR, and venture philanthropy.</p>
            </div>
            <Link href="/partner" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.25)', borderRadius: '3px', color: ROYAL_L, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, textDecoration: 'none', flexShrink: 0 }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(37,99,235,0.18)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(37,99,235,0.1)'; }}
            >
              Express Interest <ArrowUpRight size={12} />
            </Link>
          </div>
        </FadeIn>
      </section>

      <hr className="editorial-rule-gold" />

      {/* ══════════════════════════════════════════════════════
          JOIN THE MOVEMENT — Full-width CTA
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: 'rgba(15,23,42,0.7)' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-16 py-24">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>

            <FadeIn>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ width: '2rem', height: '1px', background: GOLD }} />
                <p style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: GOLD }}>The Invitation</p>
              </div>
              <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.015em', color: WHITE, marginBottom: '1.25rem' }}>
                Join the<br />
                <em style={{ color: GOLD }}>Movement.</em>
              </h2>
              <p style={{ fontFamily: SANS, fontSize: '1rem', lineHeight: 1.8, color: MUTED, maxWidth: '440px' }}>
                The boardroom Cindy Ha is building has room for partners, administrators,
                donors, and believers. If you see what she sees — a generation of kids
                who deserve a seat at the table — we want to hear from you.
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Primary CTA */}
                <Link href="/partner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 1.75rem', background: `linear-gradient(135deg, ${GOLD}22, rgba(15,23,42,0.9))`, border: `1px solid ${GOLD}40`, borderRadius: '3px', textDecoration: 'none', transition: 'all 0.25s', position: 'relative', overflow: 'hidden' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.background = `linear-gradient(135deg, ${GOLD}30, rgba(15,23,42,0.95))`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${GOLD}40`; e.currentTarget.style.background = `linear-gradient(135deg, ${GOLD}22, rgba(15,23,42,0.9))`; }}
                >
                  <div>
                    <p style={{ fontFamily: SANS, fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: GOLD, marginBottom: '4px' }}>Corporate &amp; Individual Partnerships</p>
                    <p style={{ fontFamily: SERIF, fontSize: '1.3rem', fontWeight: 700, color: WHITE }}>Partner With Us</p>
                  </div>
                  <ArrowUpRight size={20} color={GOLD} />
                </Link>

                {/* Secondary CTAs */}
                {[
                  { label: 'School Districts', sub: 'Bring YIC to your schools', href: '/partner', icon: BookOpen },
                  { label: 'Explore the Curriculum', sub: 'View the 8-week CEO Track', href: '/curriculum', icon: Star },
                  { label: 'See Our Impact', sub: 'Read the 2024 impact report', href: '/impact', icon: ChevronRight },
                ].map(({ label, sub, href, icon: Icon }) => (
                  <Link key={label} href={href} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', background: 'rgba(15,23,42,0.5)', border: '1px solid rgba(37,99,235,0.12)', borderRadius: '3px', textDecoration: 'none', transition: 'all 0.2s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(37,99,235,0.3)'; e.currentTarget.style.background = 'rgba(30,41,59,0.6)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(37,99,235,0.12)'; e.currentTarget.style.background = 'rgba(15,23,42,0.5)'; }}
                  >
                    <div>
                      <p style={{ fontFamily: SANS, fontSize: '0.85rem', fontWeight: 600, color: WHITE, marginBottom: '2px' }}>{label}</p>
                      <p style={{ fontFamily: SANS, fontSize: '0.72rem', color: MUTED }}>{sub}</p>
                    </div>
                    <Icon size={15} color={ROYAL_L} />
                  </Link>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

    </div>
  );
}