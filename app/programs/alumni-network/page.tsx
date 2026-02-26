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
  ArrowUpRight, Mic2, Brain, Star, Eye,
  ChevronRight, Users, Zap, Shield, Crown,
  MessageSquare, Target, TrendingUp, Award,
  CheckCircle, Clock, BookOpen, Flame,
  Volume2, Heart, Lightbulb, Building2,
} from 'lucide-react';
import Link from 'next/link';

// ── Tokens ────────────────────────────────────────────────────────────────────
const SLATE   = '#0F172A';
const SLATE_2 = '#1E293B';
const SLATE_3 = '#334155';
const MUTED   = '#94A3B8';
const WHITE   = '#F8FAFC';
const ROYAL   = '#2563EB';
const ROYAL_L = '#3B82F6';
const ROYAL_D = '#1D4ED8';
const ROYAL_XL= '#93C5FD';
const GOLD    = '#C9A84C';
const GOLD_L  = '#E8C94F';
const EMBER   = '#F97316'; // warm orange for presence/energy

const SERIF   = "'Playfair Display', Georgia, serif";
const DISPLAY = "'Bebas Neue', Impact, sans-serif";
const SANS    = "'DM Sans', system-ui, sans-serif";

// ── Variants ──────────────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
};
const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.55 } },
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

// ── Curriculum Pillars ────────────────────────────────────────────────────────
const PILLARS = [
  {
    icon:   Brain,
    title:  'Emotional Intelligence',
    abbr:   'EQ',
    accent: ROYAL_L,
    accentBg: 'rgba(59,130,246,0.08)',
    accentBorder: 'rgba(59,130,246,0.22)',
    tagline: 'Know yourself before you lead anyone else.',
    desc:   'Students develop self-awareness, empathy, emotional regulation, and social fluency — the four pillars of executive EQ that distinguish good managers from great leaders.',
    modules: [
      'Self-awareness mapping & personal SWOT',
      'Reading the room: social and emotional cues',
      'Conflict de-escalation and active listening',
      'Stress regulation under high-stakes conditions',
    ],
    stat: { val: '92%', lbl: 'report improved peer relationships' },
  },
  {
    icon:   Mic2,
    title:  'Public Speaking',
    abbr:   'VOICE',
    accent: GOLD,
    accentBg: 'rgba(201,168,76,0.08)',
    accentBorder: 'rgba(201,168,76,0.28)',
    tagline: 'Your idea is only as powerful as your ability to communicate it.',
    desc:   'From classroom participation to the main stage — students master vocal presence, body language, structured argumentation, and the ability to hold a room through a 5-minute investor pitch.',
    modules: [
      'Vocal projection, pace, and deliberate silence',
      'Body language and non-verbal dominance',
      'Structuring arguments: PREP and Story frameworks',
      'Handling tough Q&A with composure',
    ],
    stat: { val: '3x', lbl: 'increase in voluntary class participation' },
  },
  {
    icon:   Crown,
    title:  'Executive Presence',
    abbr:   'PRESENCE',
    accent: EMBER,
    accentBg: 'rgba(249,115,22,0.08)',
    accentBorder: 'rgba(249,115,22,0.22)',
    tagline: 'Presence is not arrogance. It is earned authority.',
    desc:   'Executive presence is the intangible quality that makes people stop and listen. We teach the teachable components: confidence under pressure, decisive communication, and the ability to lead without a title.',
    modules: [
      'The authority stance: posture, space, and stillness',
      'Decision-making language: "I will" vs "I think maybe"',
      'First-impression engineering — 7 seconds and beyond',
      'Leading up: speaking to adults as an equal',
    ],
    stat: { val: '4.8/5', lbl: 'instructor-rated presence growth' },
  },
];

// ── CEO Persona Framework ─────────────────────────────────────────────────────
const CEO_TRAITS = [
  { icon: Eye,          label: 'Situational Awareness',   desc: 'Reading every room, every dynamic, every power structure before speaking a word.' },
  { icon: Volume2,      label: 'Commanded Attention',     desc: 'The ability to begin speaking and have every person in the room instinctively listen.' },
  { icon: Shield,       label: 'Composure Under Fire',    desc: 'Responding to hard questions, unexpected setbacks, and hostile audiences without visible anxiety.' },
  { icon: MessageSquare,label: 'Precision Language',      desc: 'Eliminating filler words. Saying exactly what is meant. Never using vagueness as a shield.' },
  { icon: Heart,        label: 'Genuine Conviction',      desc: 'The audience can feel when you believe in what you are saying. We help students find and project that belief.' },
  { icon: Lightbulb,    label: 'Adaptive Intelligence',   desc: 'Pivoting a pitch, adjusting a message, and reading when the plan needs to change — in real time.' },
];

// ── Student Growth Timeline ───────────────────────────────────────────────────
const TIMELINE = [
  {
    day:    'Day 1',
    phase:  'Baseline Assessment',
    icon:   BookOpen,
    accent: SLATE_3,
    title:  'Where You Start',
    desc:   'Every student completes a 10-minute video self-assessment. Most speak quietly, avoid eye contact, and use filler words an average of 22 times per minute. This is the baseline — and it is completely normal.',
    milestone: 'Baseline EQ score established. Video recorded for Week 8 comparison.',
    student: '"I had never heard my own voice on camera before. I was embarrassed."',
  },
  {
    day:    'Week 1–2',
    phase:  'Self-Discovery',
    icon:   Brain,
    accent: ROYAL_L,
    title:  'Learning Your Operating System',
    desc:   'Students map their emotional triggers, communication defaults, and interpersonal strengths through the YIC EQ Framework. No grades. No judgment. Pure self-knowledge.',
    milestone: 'Personal EQ profile completed. Strengths and growth edges identified.',
    student: '"I realized I go quiet when I am uncomfortable. I never knew that about myself."',
  },
  {
    day:    'Week 3–4',
    phase:  'Voice Activation',
    icon:   Mic2,
    accent: GOLD,
    title:  'Finding the Voice You Already Have',
    desc:   'Daily speaking exercises, structured debates, and improvisational scenarios. Students practice deliberate silence, vocal projection, and the art of the pause. Filler words drop by 60% in two weeks.',
    milestone: 'First structured 2-minute pitch delivered. Peer feedback workshop completed.',
    student: '"My teacher told me I sounded like a different person. I felt like one."',
  },
  {
    day:    'Week 5–6',
    phase:  'Presence Engineering',
    icon:   Crown,
    accent: EMBER,
    title:  'Building the CEO Persona',
    desc:   'The full CEO Persona framework is introduced. Students work with mirrors, video playback, and peer feedback to engineer their executive presence — posture, eye contact patterns, authority language, and controlled movement.',
    milestone: 'CEO Persona blueprint finalized. Mid-program confidence assessment shows avg. 2.1x improvement.',
    student: '"I stood differently. I walked differently. I did not even notice until my mom pointed it out."',
  },
  {
    day:    'Week 7',
    phase:  'High-Stakes Simulation',
    icon:   Flame,
    accent: EMBER,
    title:  'Controlled Pressure',
    desc:   'Mock boardroom scenarios: hostile investor Q&A, unexpected topic changes, technical failures mid-pitch. Students learn that composure is a skill, not a personality trait — and it is trained, not inherited.',
    milestone: 'Mock pitch to external evaluator completed. Written feedback received and actioned.',
    student: '"The investor asked a question I had no answer for. I used the pause. It worked."',
  },
  {
    day:    'Week 8',
    phase:  'The Final Pitch',
    icon:   Award,
    accent: GOLD,
    title:  'The Room is Yours',
    desc:   'The same students who could not hold eye contact in Week 1 walk into a formal boardroom and command it for 5 minutes. Live panel. Real investors. Real feedback. 100% completion rate across all cohorts.',
    milestone: 'Final pitch delivered. Week 1 vs Week 8 video comparison reveals transformation. Certificate awarded.',
    student: '"I watched my Day 1 video. I could not believe it was the same person."',
  },
];

// ── Timeline Node ─────────────────────────────────────────────────────────────
function TimelineNode({ item, index, isLast }: {
  item: typeof TIMELINE[0]; index: number; isLast: boolean;
}) {
  const [open, setOpen] = useState(index === 0);
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const Icon   = item.icon;

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.07 }}
      style={{ display: 'flex', gap: '0' }}
    >
      {/* Spine */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '1.5rem', flexShrink: 0 }}>
        <motion.div
          whileHover={{ scale: 1.1 }}
          onClick={() => setOpen(v => !v)}
          style={{
            width: '48px', height: '48px', borderRadius: '50%', cursor: 'pointer',
            background: open
              ? `radial-gradient(circle, ${item.accent}33, ${item.accent}11)`
              : 'rgba(30,41,59,0.8)',
            border: `2px solid ${open ? item.accent : SLATE_3}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: open ? item.accent : SLATE_3,
            flexShrink: 0, zIndex: 1,
            boxShadow: open ? `0 0 18px ${item.accent}33` : 'none',
            transition: 'all 0.3s ease',
          }}
        >
          <Icon size={18} />
        </motion.div>
        {!isLast && (
          <div style={{
            flex: 1, width: '2px', marginTop: '4px',
            background: open
              ? `linear-gradient(180deg, ${item.accent}80, rgba(30,41,59,0.4))`
              : 'rgba(30,41,59,0.6)',
            minHeight: '2rem', transition: 'background 0.3s',
          }} />
        )}
      </div>

      {/* Card */}
      <div
        onClick={() => setOpen(v => !v)}
        style={{
          flex: 1, marginBottom: isLast ? 0 : '1rem', cursor: 'pointer',
          background: open ? 'rgba(30,41,59,0.8)' : 'rgba(15,23,42,0.4)',
          border: `1px solid ${open ? item.accent + '44' : 'rgba(255,255,255,0.05)'}`,
          borderRadius: '4px', overflow: 'hidden',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Active top line */}
        {open && <div style={{ height: '2px', background: `linear-gradient(90deg, ${item.accent}, transparent)` }} />}

        {/* Header */}
        <div style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
              <div style={{ padding: '0.2rem 0.6rem', background: `${item.accent}18`, border: `1px solid ${item.accent}35`, borderRadius: '2px', fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: item.accent, whiteSpace: 'nowrap' as const }}>
                {item.day}
              </div>
              <span style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: SLATE_3 }}>{item.phase}</span>
            </div>
            <h3 style={{ fontSize: '0.975rem', fontWeight: 700, color: open ? WHITE : '#CBD5E1', transition: 'color 0.2s' }}>
              {item.title}
            </h3>
          </div>
          <motion.div animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.22 }}>
            <ChevronRight size={16} color={open ? item.accent : SLATE_3} />
          </motion.div>
        </div>

        {/* Expanded body */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: 'easeOut' }}
            >
              <div style={{ padding: '0 1.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p style={{ fontSize: '0.845rem', lineHeight: 1.75, color: MUTED }}>{item.desc}</p>

                {/* Milestone */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', padding: '0.75rem 1rem', background: `${item.accent}0d`, border: `1px solid ${item.accent}25`, borderRadius: '3px' }}>
                  <CheckCircle size={13} color={item.accent} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <p style={{ fontSize: '0.78rem', color: WHITE, lineHeight: 1.55, fontWeight: 500 }}>{item.milestone}</p>
                </div>

                {/* Student voice */}
                <div style={{ display: 'flex', gap: '0.625rem', paddingLeft: '0.75rem', borderLeft: `2px solid ${item.accent}40` }}>
                  <p style={{ fontSize: '0.78rem', fontStyle: 'italic', color: MUTED, lineHeight: 1.6 }}>
                    {item.student}
                    <span style={{ display: 'block', fontSize: '0.65rem', fontStyle: 'normal', fontWeight: 600, color: SLATE_3, marginTop: '4px', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>— Student Voice</span>
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function LeadershipAcademyPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY       = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div style={{ background: SLATE, minHeight: '100vh', color: WHITE, fontFamily: SANS }}>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');
        @keyframes presencePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(249,115,22,0); }
          50%       { box-shadow: 0 0 0 12px rgba(249,115,22,0); }
        }
        @keyframes shimmerBlue {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
      ` }} />

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative overflow-hidden" style={{ paddingTop: '5rem', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>

        {/* BG */}
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(145deg, #070B14 0%, #0F172A 55%, #0C1420 100%)` }} />
          <div style={{ position: 'absolute', top: '5%', left: '-5%', width: '55%', height: '70%', background: 'radial-gradient(ellipse, rgba(37,99,235,0.13) 0%, transparent 65%)' }} />
          <div style={{ position: 'absolute', bottom: '0%', right: '-5%', width: '45%', height: '55%', background: 'radial-gradient(ellipse, rgba(249,115,22,0.07) 0%, transparent 65%)' }} />
          {/* diagonal rules */}
          {[18, 38, 62, 80].map(pct => (
            <div key={pct} style={{ position: 'absolute', top: 0, left: `${pct}%`, width: '1px', height: '100%', background: 'linear-gradient(180deg, transparent, rgba(37,99,235,0.07), transparent)', transform: 'skewX(-8deg)' }} />
          ))}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(37,99,235,0.06) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative w-full">
          <div className="mx-auto max-w-7xl px-6 lg:px-12 py-20">
            <motion.div variants={stagger} initial="hidden" animate="visible">

              {/* Breadcrumb */}
              <motion.div variants={fadeIn} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                <Link href="/programs" style={{ fontSize: '0.68rem', color: SLATE_3, textDecoration: 'none', fontWeight: 600, letterSpacing: '0.08em' }}>Programs</Link>
                <ChevronRight size={12} color={SLATE_3} />
                <span style={{ fontSize: '0.68rem', color: ROYAL_L, fontWeight: 700, letterSpacing: '0.08em' }}>Leadership Academy</span>
              </motion.div>

              {/* Eyebrow */}
              <motion.div variants={fadeIn} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 0.875rem', background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.25)', borderRadius: '2px' }}>
                  <Crown size={11} color={ROYAL_L} />
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: ROYAL_L }}>YIC Leadership Academy</span>
                </div>
                <div style={{ padding: '0.375rem 0.75rem', background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.25)', borderRadius: '2px' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: EMBER }}>K-12 Program</span>
                </div>
              </motion.div>

              {/* Headline */}
              <motion.div variants={fadeUp} style={{ marginBottom: '1.75rem' }}>
                <h1 style={{ fontFamily: DISPLAY, fontSize: 'clamp(3.5rem, 8.5vw, 8rem)', lineHeight: 0.88, letterSpacing: '0.015em', color: WHITE, marginBottom: '0.2rem' }}>
                  LEADERSHIP
                </h1>
                <h1 style={{ fontFamily: DISPLAY, fontSize: 'clamp(3.5rem, 8.5vw, 8rem)', lineHeight: 0.88, letterSpacing: '0.015em', background: `linear-gradient(135deg, ${ROYAL_L} 0%, ${ROYAL_XL} 50%, ${ROYAL_L} 100%)`, backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmerBlue 4s linear infinite', marginBottom: '0.2rem' }}>
                  ACADEMY.
                </h1>
              </motion.div>

              <motion.p variants={fadeUp} style={{ fontFamily: SANS, fontSize: '1.1rem', lineHeight: 1.8, color: MUTED, maxWidth: '580px', marginBottom: '2.5rem' }}>
                EQ. Public speaking. Executive presence. The three skills that separate
                the people who lead from everyone else — taught to K-12 students who
                have never been told they are allowed to lead.
              </motion.p>

              {/* Pillar pills */}
              <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2.5rem' }}>
                {[
                  { label: 'Emotional Intelligence', color: ROYAL_L },
                  { label: 'Public Speaking',         color: GOLD    },
                  { label: 'Executive Presence',      color: EMBER   },
                  { label: '8-Week Intensive',         color: ROYAL_L },
                ].map(({ label, color }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.375rem 0.875rem', background: 'rgba(30,41,59,0.7)', border: '1px solid rgba(37,99,235,0.14)', borderRadius: '2px' }}>
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: color }} />
                    <span style={{ fontSize: '0.72rem', fontWeight: 600, color: MUTED, letterSpacing: '0.05em' }}>{label}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="#workshop" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.95rem 2rem', background: `linear-gradient(135deg, ${ROYAL_D}, ${ROYAL_L})`, border: 'none', borderRadius: '3px', color: WHITE, fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, textDecoration: 'none', boxShadow: '0 4px 24px rgba(37,99,235,0.3)' }}>
                  Request a Workshop <ArrowUpRight size={14} />
                </Link>
                <Link href="/curriculum" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.95rem 1.75rem', background: 'transparent', border: '1px solid rgba(37,99,235,0.3)', borderRadius: '3px', color: ROYAL_L, fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, textDecoration: 'none' }}>
                  Full Curriculum <ChevronRight size={13} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}>
          <div style={{ height: '2.5rem', width: '1px', background: `linear-gradient(180deg, ${ROYAL_L}, transparent)` }} />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════
          THREE PILLARS
      ══════════════════════════════════════════════════ */}
      <div style={{ borderTop: '1px solid rgba(37,99,235,0.1)', borderBottom: '1px solid rgba(37,99,235,0.1)', background: 'rgba(37,99,235,0.02)', padding: '1rem 0' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-12 flex items-center gap-6 overflow-x-auto" style={{ flexWrap: 'nowrap' }}>
          {[
            { icon: Brain, label: 'EQ',       sub: 'Emotional Intelligence' },
            { label: '→',  icon: ChevronRight },
            { icon: Mic2,  label: 'VOICE',    sub: 'Public Speaking'        },
            { label: '→',  icon: ChevronRight },
            { icon: Crown, label: 'PRESENCE', sub: 'Executive Presence'     },
            { label: '→',  icon: ChevronRight },
            { icon: Award, label: 'PITCH DAY',sub: 'Week 8 Final Event'     },
          ].map((item, i) => {
            if ('sub' in item) {
              const Icon = item.icon;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                  <Icon size={13} color={ROYAL_L} />
                  <div>
                    <span style={{ display: 'block', fontFamily: DISPLAY, fontSize: '0.85rem', letterSpacing: '0.12em', color: WHITE }}>{item.label}</span>
                    <span style={{ display: 'block', fontSize: '0.6rem', color: MUTED, fontWeight: 500 }}>{item.sub}</span>
                  </div>
                </div>
              );
            }
            return <ChevronRight key={i} size={14} color={SLATE_3} style={{ flexShrink: 0 }} />;
          })}
        </div>
      </div>

      {/* Pillar cards */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <FadeIn className="mb-12">
          <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: ROYAL_L, marginBottom: '0.5rem' }}>The Three Pillars</p>
          <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', lineHeight: 0.95, letterSpacing: '0.02em', color: WHITE }}>
            WHAT WE ACTUALLY TEACH.
          </h2>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.25rem' }}>
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <FadeIn key={pillar.title} delay={i * 0.1}>
                <div style={{ background: 'rgba(15,23,42,0.7)', border: `1px solid ${pillar.accentBorder}`, borderRadius: '4px', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                  <div style={{ height: '3px', background: `linear-gradient(90deg, ${pillar.accent}, transparent)` }} />
                  <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                      <div style={{ width: '50px', height: '50px', background: pillar.accentBg, border: `1px solid ${pillar.accentBorder}`, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: pillar.accent }}>
                        <Icon size={22} />
                      </div>
                      <span style={{ fontFamily: DISPLAY, fontSize: '3.5rem', color: 'rgba(255,255,255,0.04)', lineHeight: 1 }}>{pillar.abbr}</span>
                    </div>
                    {/* Title */}
                    <div>
                      <h3 style={{ fontFamily: DISPLAY, fontSize: '1.9rem', letterSpacing: '0.05em', color: WHITE, lineHeight: 1, marginBottom: '0.5rem' }}>{pillar.title.toUpperCase()}</h3>
                      <p style={{ fontSize: '0.82rem', fontStyle: 'italic', color: pillar.accent, lineHeight: 1.5 }}>{pillar.tagline}</p>
                    </div>
                    {/* Desc */}
                    <p style={{ fontSize: '0.83rem', lineHeight: 1.75, color: MUTED }}>{pillar.desc}</p>
                    {/* Modules */}
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                      {pillar.modules.map((m, mi) => (
                        <li key={mi} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                          <div style={{ width: '14px', height: '14px', flexShrink: 0, marginTop: '2px', background: pillar.accentBg, border: `1px solid ${pillar.accentBorder}`, borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CheckCircle size={8} color={pillar.accent} />
                          </div>
                          <span style={{ fontSize: '0.78rem', color: MUTED, lineHeight: 1.55 }}>{m}</span>
                        </li>
                      ))}
                    </ul>
                    {/* Stat */}
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'baseline' }}>
                      <span style={{ fontFamily: DISPLAY, fontSize: '1.8rem', color: pillar.accent, lineHeight: 1 }}>{pillar.stat.val}</span>
                      <span style={{ fontSize: '0.68rem', color: MUTED, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>{pillar.stat.lbl}</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          THE CEO PERSONA
      ══════════════════════════════════════════════════ */}
      <section style={{ background: 'rgba(15,23,42,0.6)', borderTop: '1px solid rgba(37,99,235,0.08)', borderBottom: '1px solid rgba(37,99,235,0.08)' }}>
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
          <FadeIn className="mb-5">
            <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: EMBER, marginBottom: '0.5rem' }}>Week 5–6 Deep Dive</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'end', marginBottom: '3rem' }}>
              <div>
                <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(2.5rem, 5.5vw, 5rem)', lineHeight: 0.88, letterSpacing: '0.02em', color: WHITE }}>
                  THE CEO<br /><span style={{ color: EMBER }}>PERSONA.</span>
                </h2>
              </div>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: MUTED }}>
                Executive presence is not a personality type. It is not something
                you are born with. It is a set of six learnable behaviors that we
                systematically teach — and it transforms how every person in a room
                responds to a student before they speak a single word.
              </p>
            </div>
          </FadeIn>

          {/* CEO Persona grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1px', background: 'rgba(249,115,22,0.06)', border: '1px solid rgba(249,115,22,0.12)', borderRadius: '4px', overflow: 'hidden' }}>
            {CEO_TRAITS.map((trait, i) => {
              const Icon = trait.icon;
              return (
                <FadeIn key={trait.label} delay={i * 0.07}>
                  <div style={{ background: SLATE, padding: '2rem', height: '100%', transition: 'background 0.25s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = SLATE_2; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = SLATE; }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <div style={{ width: '42px', height: '42px', background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.22)', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: EMBER }}>
                        <Icon size={18} />
                      </div>
                      <span style={{ fontFamily: DISPLAY, fontSize: '2rem', color: 'rgba(249,115,22,0.08)', lineHeight: 1 }}>{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <p style={{ fontSize: '0.875rem', fontWeight: 700, color: WHITE, marginBottom: '0.5rem' }}>{trait.label}</p>
                    <p style={{ fontSize: '0.78rem', lineHeight: 1.65, color: MUTED }}>{trait.desc}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          {/* CEO Persona callout */}
          <FadeIn delay={0.3} className="mt-8">
            <div style={{ background: `linear-gradient(135deg, rgba(249,115,22,0.1), rgba(15,23,42,0.9))`, border: '1px solid rgba(249,115,22,0.2)', borderRadius: '4px', padding: '2.25rem 2.5rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: '0 0 0 0', borderLeft: '3px solid rgba(249,115,22,0.6)', borderRadius: '4px 0 0 4px', pointerEvents: 'none' }} />
              <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.4), transparent)' }} />
              <p style={{ fontFamily: SERIF, fontSize: 'clamp(1.1rem, 2.5vw, 1.7rem)', fontStyle: 'italic', color: WHITE, lineHeight: 1.4, marginBottom: '1rem' }}>
                "We use video playback from Day 1 versus Week 8. No rubric, no grade —
                just the student watching themselves transform. That moment of recognition
                is more powerful than any certificate we could give."
              </p>
              <cite style={{ fontSize: '0.72rem', fontStyle: 'normal', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: EMBER }}>
                — YIC Lead Instructor, Leadership Academy
              </cite>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          STUDENT GROWTH TIMELINE
      ══════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <FadeIn className="mb-14">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'end' }}>
            <div>
              <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: ROYAL_L, marginBottom: '0.5rem' }}>Student Growth Timeline</p>
              <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', lineHeight: 0.95, letterSpacing: '0.02em', color: WHITE }}>
                DAY 1<br /><span style={{ color: ROYAL_L }}>TO THE BOARDROOM.</span>
              </h2>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: MUTED }}>
              Every student starts with a baseline video assessment. Every student
              ends with a live investor pitch. Click each milestone to follow a
              real student's transformation across the 8-week program.
            </p>
          </div>
        </FadeIn>

        <div style={{ maxWidth: '760px' }}>
          {TIMELINE.map((item, i) => (
            <TimelineNode key={item.day} item={item} index={i} isLast={i === TIMELINE.length - 1} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          WORKSHOP REQUEST CTA
      ══════════════════════════════════════════════════ */}
      <section id="workshop" style={{ background: SLATE_2, borderTop: '1px solid rgba(37,99,235,0.1)' }}>
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>

            <FadeIn>
              <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: ROYAL_L, marginBottom: '0.875rem' }}>
                Bring It to Your School
              </p>
              <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 0.92, letterSpacing: '0.02em', color: WHITE, marginBottom: '1rem' }}>
                REQUEST A WORKSHOP<br /><span style={{ color: ROYAL_L }}>FOR YOUR SCHOOL.</span>
              </h2>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: MUTED, marginBottom: '1.75rem', maxWidth: '480px' }}>
                Whether you are a principal, a district administrator, or a
                corporate sponsor — the Leadership Academy can be in your school
                within 30 days of a signed agreement. No upfront cost to students.
                Full support from our instructor team.
              </p>

              {/* What you get */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {[
                  'Certified YIC Leadership instructor placement',
                  '8-week structured curriculum with all materials',
                  'Student assessment reports for administrators',
                  'Pitch Day event coordinated by YIC team',
                  'Zero cost to students or families',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem' }}>
                    <CheckCircle size={14} color={ROYAL_L} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.82rem', color: MUTED, lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(37,99,235,0.18)', borderRadius: '4px', padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: '0 0 auto 0', height: '2px', background: `linear-gradient(90deg, ${ROYAL_L}, transparent)` }} />

                <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: ROYAL_L, marginBottom: '1.25rem' }}>
                  Workshop Request Form
                </p>

                <WorkshopForm />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

    </div>
  );
}

// ── Workshop Form ─────────────────────────────────────────────────────────────
function WorkshopForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [form, setForm] = useState({ name: '', role: '', school: '', email: '', students: '', message: '' });

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1100));
    setLoading(false);
    setSubmitted(true);
  };

  const iStyle: React.CSSProperties = {
    width: '100%', background: 'rgba(15,23,42,0.7)',
    border: '1px solid rgba(37,99,235,0.18)', borderRadius: '3px',
    padding: '0.8rem 0.875rem', color: WHITE, fontSize: '0.85rem',
    outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
    fontFamily: SANS,
  };
  const lStyle: React.CSSProperties = {
    display: 'block', fontSize: '0.65rem', fontWeight: 700,
    letterSpacing: '0.15em', textTransform: 'uppercase', color: MUTED, marginBottom: '0.4rem',
  };
  const focus = {
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      e.target.style.borderColor = ROYAL_L;
      e.target.style.boxShadow   = '0 0 0 3px rgba(59,130,246,0.1)';
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      e.target.style.borderColor = 'rgba(37,99,235,0.18)';
      e.target.style.boxShadow   = 'none';
    },
  };

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', padding: '1.5rem 0' }}>
        <div style={{ width: '52px', height: '52px', background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
          <CheckCircle size={22} color={ROYAL_L} />
        </div>
        <h3 style={{ fontFamily: DISPLAY, fontSize: '1.8rem', color: WHITE, letterSpacing: '0.06em', marginBottom: '0.625rem' }}>REQUEST RECEIVED</h3>
        <p style={{ fontSize: '0.85rem', color: MUTED, lineHeight: 1.7 }}>
          Our team will reach out within 1 business day to discuss bringing the Leadership Academy to your school.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
        <div>
          <label style={lStyle}>Your Name</label>
          <input name="name" required value={form.name} onChange={handle} placeholder="Ms. Garcia" style={iStyle} {...focus} />
        </div>
        <div>
          <label style={lStyle}>Your Role</label>
          <select name="role" value={form.role} onChange={handle} style={{ ...iStyle, cursor: 'pointer' }} {...focus}>
            <option value="" style={{ background: SLATE }}>Select...</option>
            <option value="principal"      style={{ background: SLATE }}>Principal</option>
            <option value="administrator"  style={{ background: SLATE }}>District Admin</option>
            <option value="teacher"        style={{ background: SLATE }}>Teacher</option>
            <option value="corporate"      style={{ background: SLATE }}>Corporate Sponsor</option>
          </select>
        </div>
      </div>
      <div>
        <label style={lStyle}>School / Organization</label>
        <input name="school" required value={form.school} onChange={handle} placeholder="Roosevelt Elementary, GUSD" style={iStyle} {...focus} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
        <div>
          <label style={lStyle}>Email</label>
          <input name="email" type="email" required value={form.email} onChange={handle} placeholder="you@school.edu" style={iStyle} {...focus} />
        </div>
        <div>
          <label style={lStyle}>Est. Students</label>
          <select name="students" value={form.students} onChange={handle} style={{ ...iStyle, cursor: 'pointer' }} {...focus}>
            <option value="" style={{ background: SLATE }}>How many?</option>
            <option value="25"  style={{ background: SLATE }}>~25 (1 class)</option>
            <option value="75"  style={{ background: SLATE }}>~75 (3 classes)</option>
            <option value="150" style={{ background: SLATE }}>~150 (school-wide)</option>
            <option value="500" style={{ background: SLATE }}>500+ (district)</option>
          </select>
        </div>
      </div>
      <div>
        <label style={lStyle}>Anything else?</label>
        <textarea name="message" rows={3} value={form.message} onChange={handle} placeholder="Tell us about your school, timing, or goals..." style={{ ...iStyle, resize: 'vertical', minHeight: '80px' }} {...focus} />
      </div>
      <button type="submit" disabled={loading} style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
        padding: '0.95rem', background: loading ? 'rgba(37,99,235,0.3)' : `linear-gradient(135deg, ${ROYAL_D}, ${ROYAL_L})`,
        border: 'none', borderRadius: '3px', color: WHITE, fontSize: '0.78rem', fontWeight: 800,
        letterSpacing: '0.12em', textTransform: 'uppercase' as const, cursor: loading ? 'wait' : 'pointer',
        fontFamily: SANS, boxShadow: loading ? 'none' : '0 4px 20px rgba(37,99,235,0.28)', transition: 'all 0.2s',
      }}>
        {loading ? (
          <>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              style={{ width: 13, height: 13, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: WHITE, borderRadius: '50%' }} />
            Sending...
          </>
        ) : (
          <>Request a Workshop <ArrowUpRight size={13} /></>
        )}
      </button>
    </form>
  );
}