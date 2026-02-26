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
  ArrowUpRight, Download, Trophy, Mic2, BarChart3, DollarSign,
  Users, Lightbulb, Target, TrendingUp, Star, Clock,
  CheckCircle, Building2, Briefcase, BookOpen, Rocket,
  ChevronRight, Award, PieChart, Handshake,
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
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
};
const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};
const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ── Scroll-triggered reveal wrapper ──────────────────────────────────────────
function Reveal({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden"
      animate={inView ? 'visible' : 'hidden'} transition={{ delay }} className={className}>
      {children}
    </motion.div>
  );
}

// ── Curriculum data ───────────────────────────────────────────────────────────
const BRACKETS = [
  {
    id:       '10u',
    label:    '10U',
    title:    'Founders Track',
    ages:     'Ages 8–10',
    tagline:  'Big ideas start young.',
    accent:   ROYAL_L,
    accentBg: 'rgba(59,130,246,0.08)',
    accentBorder: 'rgba(59,130,246,0.22)',
    icon:     Rocket,
    overview: 'The Founders Track introduces entrepreneurial thinking through storytelling, creative problem-solving, and team-based mini-ventures. Students finish the program with a real product concept and their first investor pitch.',
    weeks: [
      { week: 'Wk 1–2', module: 'The Idea Machine',      desc: 'Design thinking, identifying real problems, brainstorming solutions that people will pay for.',         icon: Lightbulb   },
      { week: 'Wk 3–4', module: 'Know Your Customer',    desc: 'Market research fundamentals — who buys, why they buy, and how to listen before you build.',            icon: Users       },
      { week: 'Wk 5',   module: 'Unit Economics 101',    desc: 'Revenue, costs, and what it means to make a profit. Taught through real candy-store simulations.',       icon: DollarSign  },
      { week: 'Wk 6',   module: 'Build & Brand',         desc: 'Naming your venture, creating a simple brand identity, and producing your minimum viable product.',      icon: Star        },
      { week: 'Wk 7',   module: 'The Perfect Pitch',     desc: 'Storytelling frameworks, slide structure, and public speaking — culminating in a rehearsed 3-min pitch.', icon: Mic2        },
      { week: 'Wk 8',   module: 'Pitch Day',             desc: 'Students present live to a panel of community mentors and judges. Real feedback. Real stakes.',           icon: Trophy      },
    ],
    outcomes: ['Completed business concept', 'First investor pitch delivered', 'Personal brand statement', 'Financial literacy foundation'],
  },
  {
    id:       '14u',
    label:    '14U',
    title:    'Executives Track',
    ages:     'Ages 11–14',
    tagline:  'Lead like you mean it.',
    accent:   GOLD,
    accentBg: 'rgba(201,168,76,0.08)',
    accentBorder: 'rgba(201,168,76,0.28)',
    icon:     Briefcase,
    overview: 'The Executives Track mirrors an accelerated MBA curriculum. Students conduct market analysis, model unit economics, build a full pitch deck, and present to a panel of real investors and executives on Pitch Day.',
    weeks: [
      { week: 'Wk 1–2', module: 'Market Analysis',       desc: 'TAM/SAM/SOM frameworks, competitive landscape mapping, and identifying white-space opportunities.',      icon: BarChart3   },
      { week: 'Wk 3',   module: 'Business Model Design', desc: 'Revenue streams, value propositions, cost structures, and customer segments using the Business Model Canvas.', icon: PieChart    },
      { week: 'Wk 4',   module: 'Unit Economics',        desc: 'CAC, LTV, gross margin, and break-even analysis. Students build real P&L models in spreadsheets.',       icon: TrendingUp  },
      { week: 'Wk 5',   module: 'Leadership & Team Dynamics', desc: 'Executive presence, conflict resolution, decision-making under pressure, and managing up.',         icon: Users       },
      { week: 'Wk 6',   module: 'Go-To-Market Strategy', desc: 'Channel selection, pricing strategy, and building a 90-day launch plan with measurable KPIs.',           icon: Target      },
      { week: 'Wk 7',   module: 'Investor Pitch Deck',   desc: 'Full 10-slide pitch deck built from scratch: problem, solution, market, traction, ask, and financials.',  icon: BookOpen    },
      { week: 'Wk 8',   module: 'The Boardroom',         desc: 'Live pitch to a panel of real investors and executives. Q&A, term sheet simulation, and formal feedback.', icon: Trophy      },
    ],
    outcomes: ['Full investor pitch deck', 'P&L model and financial projections', 'Go-to-market strategy document', 'Executive presence certification'],
  },
];

// ── Boardroom experience steps ────────────────────────────────────────────────
const BOARDROOM_STEPS = [
  { icon: BookOpen,   title: 'Weeks 1–7',         desc: 'Students build their venture from concept to full pitch deck, working through each module with instructor guidance and peer feedback.' },
  { icon: Target,     title: 'Pre-Pitch Review',   desc: 'A mock pitch session with YIC instructors. Students receive written feedback and have 48 hours to refine before the real thing.' },
  { icon: Building2,  title: 'The Boardroom',      desc: 'A formal presentation environment designed to mirror a real investor meeting — lapel mics, a panel table, and a live audience.' },
  { icon: Handshake,  title: 'Investor Panel',     desc: 'A curated panel of real business executives, entrepreneurs, and community investors who ask questions and provide authentic feedback.' },
  { icon: Mic2,       title: 'The Live Pitch',     desc: '5 minutes to present. 5 minutes of Q&A. Students field real investor questions on their market, financials, and competitive moat.' },
  { icon: Award,      title: 'Recognition & Next Steps', desc: 'Top pitches receive a formal award and an invitation to the YIC Regional Showcase. Every student receives a signed completion certificate.' },
];

// ── Module row component ──────────────────────────────────────────────────────
function ModuleRow({ item, index, accent, accentBg, accentBorder }: {
  item: (typeof BRACKETS)[0]['weeks'][0];
  index: number;
  accent: string;
  accentBg: string;
  accentBorder: string;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = item.icon;

  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:       'flex',
        gap:           '1rem',
        padding:       '1.25rem',
        borderRadius:  '3px',
        background:    hovered ? 'rgba(30,41,59,0.7)' : 'rgba(15,23,42,0.4)',
        border:        `1px solid ${hovered ? accentBorder : 'rgba(255,255,255,0.04)'}`,
        transition:    'all 0.25s ease',
        cursor:        'default',
      }}
    >
      {/* Week badge */}
      <div style={{ flexShrink: 0, paddingTop: '2px' }}>
        <div style={{
          background: accentBg, border: `1px solid ${accentBorder}`,
          borderRadius: '3px', padding: '0.35rem 0.6rem',
          fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.1em',
          textTransform: 'uppercase' as const, color: accent, whiteSpace: 'nowrap' as const,
        }}>
          {item.week}
        </div>
      </div>

      {/* Icon */}
      <div style={{
        flexShrink: 0, width: '36px', height: '36px',
        background: accentBg, border: `1px solid ${accentBorder}`,
        borderRadius: '3px', display: 'flex', alignItems: 'center',
        justifyContent: 'center', color: accent,
      }}>
        <Icon size={16} />
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: '0.9rem', fontWeight: 700, color: WHITE, marginBottom: '0.25rem' }}>
          {item.module}
        </p>
        <p style={{ fontSize: '0.78rem', color: MUTED, lineHeight: 1.6 }}>
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
}

// ── Bracket card ──────────────────────────────────────────────────────────────
function BracketCard({ bracket }: { bracket: typeof BRACKETS[0] }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const Icon   = bracket.icon;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={stagger}
      style={{
        background:    'rgba(15,23,42,0.7)',
        border:        `1px solid ${bracket.accentBorder}`,
        borderRadius:  '4px',
        overflow:      'hidden',
        backdropFilter: 'blur(16px)',
        position:      'relative',
      }}
    >
      {/* Top accent bar */}
      <div style={{ height: '3px', background: `linear-gradient(90deg, ${bracket.accent}, transparent)` }} />

      {/* Card header */}
      <div style={{ padding: '2rem 2rem 1.5rem', borderBottom: `1px solid rgba(255,255,255,0.05)` }}>
        <motion.div variants={fadeIn} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{
            width: '52px', height: '52px',
            background: bracket.accentBg, border: `1px solid ${bracket.accentBorder}`,
            borderRadius: '4px', display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: bracket.accent,
          }}>
            <Icon size={24} />
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{
              display: 'inline-block', padding: '0.3rem 0.8rem',
              background: bracket.accentBg, border: `1px solid ${bracket.accentBorder}`,
              borderRadius: '2px', fontSize: '0.65rem', fontWeight: 800,
              letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: bracket.accent,
            }}>
              {bracket.ages}
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeUp}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <span style={{
              fontFamily: "'Bebas Neue', Impact, sans-serif",
              fontSize: '3.5rem', lineHeight: 1, letterSpacing: '0.04em',
              color: bracket.accent,
            }}>
              {bracket.label}
            </span>
            <span style={{
              fontFamily: "'Bebas Neue', Impact, sans-serif",
              fontSize: '1.6rem', lineHeight: 1, letterSpacing: '0.06em', color: WHITE,
            }}>
              {bracket.title}
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: MUTED, fontStyle: 'italic', marginBottom: '1rem' }}>
            {bracket.tagline}
          </p>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.75, color: MUTED }}>
            {bracket.overview}
          </p>
        </motion.div>
      </div>

      {/* Weekly modules */}
      <div style={{ padding: '1.5rem 2rem' }}>
        <motion.p variants={fadeIn} style={{
          fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.2em',
          textTransform: 'uppercase' as const, color: bracket.accent, marginBottom: '1rem',
        }}>
          Core Modules — 8-Week Track
        </motion.p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {bracket.weeks.map((item, i) => (
            <ModuleRow
              key={i} item={item} index={i}
              accent={bracket.accent}
              accentBg={bracket.accentBg}
              accentBorder={bracket.accentBorder}
            />
          ))}
        </div>
      </div>

      {/* Outcomes */}
      <div style={{ padding: '0 2rem 2rem' }}>
        <p style={{
          fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.2em',
          textTransform: 'uppercase' as const, color: bracket.accent, marginBottom: '0.875rem',
        }}>
          Student Outcomes
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          {bracket.outcomes.map((outcome, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <CheckCircle size={13} color={bracket.accent} style={{ flexShrink: 0, marginTop: '2px' }} />
              <span style={{ fontSize: '0.75rem', color: MUTED, lineHeight: 1.5 }}>{outcome}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function CurriculumPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setDownloading(false);
    // Wire up to real PDF when ready
    alert('PDF coming soon! Connect this to your Vercel Blob or S3 bucket.');
  };

  return (
    <div style={{ background: SLATE, minHeight: '100vh', color: WHITE }}>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative overflow-hidden" style={{ paddingTop: '9rem', paddingBottom: '7rem' }}>
        {/* BG layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position: 'absolute', top: '-15%', left: '-8%', width: '60%', height: '90%', background: 'radial-gradient(ellipse, rgba(37,99,235,0.15) 0%, transparent 68%)' }} />
          <div style={{ position: 'absolute', top: '20%', right: '-10%', width: '45%', height: '70%', background: 'radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 70%)' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(37,99,235,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.035) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />
          {/* Vertical accent lines */}
          {[22, 44, 68].map((pct) => (
            <div key={pct} style={{ position: 'absolute', top: 0, left: `${pct}%`, width: '1px', height: '100%', background: 'linear-gradient(180deg, transparent, rgba(37,99,235,0.12), transparent)' }} />
          ))}
        </div>

        <motion.div style={{ y: heroY }} className="relative mx-auto max-w-7xl px-6 lg:px-12">
          <motion.div variants={stagger} initial="hidden" animate="visible">

            {/* Eyebrow */}
            <motion.div variants={fadeIn} className="mb-6 flex items-center gap-3">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 0.875rem', background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.25)', borderRadius: '2px' }}>
                <BookOpen size={11} color={ROYAL_L} />
                <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: ROYAL_L }}>Curriculum</span>
              </div>
              <div style={{ height: '1px', width: '3rem', background: 'linear-gradient(90deg, rgba(37,99,235,0.4), transparent)' }} />
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeUp} style={{
              fontFamily: "'Bebas Neue', Impact, sans-serif",
              fontSize: 'clamp(4rem, 9vw, 8.5rem)',
              lineHeight: 0.88, letterSpacing: '0.02em', color: WHITE, marginBottom: '0.5rem',
            }}>
              THE CEO
            </motion.h1>
            <motion.h1 variants={fadeUp} style={{
              fontFamily: "'Bebas Neue', Impact, sans-serif",
              fontSize: 'clamp(4rem, 9vw, 8.5rem)',
              lineHeight: 0.88, letterSpacing: '0.02em',
              background: `linear-gradient(135deg, ${ROYAL_L}, #60A5FA, ${ROYAL_L})`,
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmerBlue 4s linear infinite',
              marginBottom: '2rem',
            }}>
              TRACK.
            </motion.h1>

            {/* Sub */}
            <motion.p variants={fadeUp} style={{ fontSize: '1.1rem', lineHeight: 1.75, color: MUTED, maxWidth: '580px', marginBottom: '1.5rem' }}>
              An 8-week venture-based learning model that mirrors the structure of
              a real MBA program — condensed, age-adapted, and built around one
              central belief: the best way to learn business is to do business.
            </motion.p>

            {/* VC-style model descriptor */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10">
              {[
                { label: 'Venture-Based Learning',  color: ROYAL_L },
                { label: '8-Week Intensive',         color: ROYAL_L },
                { label: 'Real Investor Pitch Day',  color: GOLD    },
                { label: 'Two Age-Tiered Tracks',    color: ROYAL_L },
              ].map(({ label, color }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.875rem', background: 'rgba(30,41,59,0.7)', border: '1px solid rgba(37,99,235,0.15)', borderRadius: '2px' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: color, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.72rem', fontWeight: 600, color: MUTED, letterSpacing: '0.06em' }}>{label}</span>
                </div>
              ))}
            </motion.div>

            {/* Stats strip */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-8">
              {[
                { val: '8',    lbl: 'Weeks'         },
                { val: '2',    lbl: 'Age Tracks'     },
                { val: '13',   lbl: 'Core Modules'   },
                { val: '100%', lbl: 'Engagement Rate' },
              ].map(({ val, lbl }) => (
                <div key={lbl} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: '2.2rem', lineHeight: 1, letterSpacing: '0.04em', color: ROYAL_L }}>
                    {val}
                  </span>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: MUTED }}>
                    {lbl}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Divider ticker ────────────────────────────────────────────────── */}
      <div style={{ borderTop: '1px solid rgba(37,99,235,0.12)', borderBottom: '1px solid rgba(37,99,235,0.12)', background: 'rgba(37,99,235,0.03)', padding: '0.875rem 0', overflow: 'hidden' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-12 flex items-center gap-8">
          <span style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase' as const, color: ROYAL_L, flexShrink: 0 }}>
            Venture-Based Learning Model
          </span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(37,99,235,0.3), transparent)' }} />
          {['Problem Identification', 'Market Research', 'Financial Modeling', 'Pitch Deck', 'Investor Q&A'].map((item, i) => (
            <div key={i} className="hidden md:flex items-center gap-4">
              <span style={{ fontSize: '0.7rem', color: MUTED, fontWeight: 500, whiteSpace: 'nowrap' as const }}>{item}</span>
              {i < 4 && <ChevronRight size={12} color={SLATE_3} />}
            </div>
          ))}
        </div>
      </div>

      {/* ── VBL Model explainer ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
              {[
                {
                  icon: Lightbulb,
                  title: 'Venture-Based Learning',
                  body: 'Unlike traditional instruction, VBL puts students inside a real business problem from Day 1. Every lesson is a tool they use immediately — not theory to memorize for a test.',
                },
                {
                  icon: TrendingUp,
                  title: 'Progressive Complexity',
                  body: 'Each week builds on the last. By Week 6, students are running financial models and stress-testing their own assumptions — skills most adults never develop.',
                },
                {
                  icon: Users,
                  title: 'Cohort Learning',
                  body: 'Students work in co-founder teams of 3-4, experiencing real team dynamics, role negotiation, and collaborative decision-making — the #1 MBA skill employers demand.',
                },
              ].map(({ icon: Icon, title, body }, i) => (
                <Reveal key={title} delay={i * 0.1}>
                  <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(37,99,235,0.12)', borderRadius: '4px', padding: '1.75rem', height: '100%' }}>
                    <div style={{ width: '40px', height: '40px', background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: ROYAL_L, marginBottom: '1rem' }}>
                      <Icon size={18} />
                    </div>
                    <p style={{ fontSize: '0.95rem', fontWeight: 700, color: WHITE, marginBottom: '0.5rem' }}>{title}</p>
                    <p style={{ fontSize: '0.82rem', lineHeight: 1.7, color: MUTED }}>{body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Age-Tiered Brackets ───────────────────────────────────────────── */}
      <section style={{ background: 'rgba(15,23,42,0.5)', borderTop: '1px solid rgba(37,99,235,0.08)' }}>
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
          <Reveal className="mb-14">
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div>
                <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: ROYAL_L, marginBottom: '0.5rem' }}>
                  Age-Tiered Tracks
                </p>
                <h2 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', lineHeight: 0.95, letterSpacing: '0.02em', color: WHITE }}>
                  TWO TRACKS.<br />ONE STANDARD OF EXCELLENCE.
                </h2>
              </div>
              <p style={{ fontSize: '0.875rem', color: MUTED, maxWidth: '320px', lineHeight: 1.7 }}>
                Both tracks share the same rigorous methodology — the content
                complexity scales to match each age group's cognitive stage.
              </p>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
            {BRACKETS.map((bracket) => (
              <BracketCard key={bracket.id} bracket={bracket} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Boardroom Experience ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <Reveal className="mb-16">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'end' }}>
            <div>
              <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: GOLD, marginBottom: '0.5rem' }}>
                Week 8 — Final Event
              </p>
              <h2 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 0.9, letterSpacing: '0.02em', color: WHITE }}>
                THE<br />
                <span style={{ color: GOLD }}>BOARDROOM</span><br />
                EXPERIENCE.
              </h2>
            </div>
            <div>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: MUTED, marginBottom: '1.25rem' }}>
                Week 8 is not a class. It is a live investor pitch event — a formal
                boardroom setting where students present their ventures to a curated
                panel of real executives, entrepreneurs, and community investors.
              </p>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: MUTED }}>
                No safety net. No participation trophies. Real questions, real
                feedback, and real consequences — because that is what prepares
                students for the world they are about to enter.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Steps grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.12)', borderRadius: '4px', overflow: 'hidden' }}>
          {BOARDROOM_STEPS.map((step, i) => {
            const ref    = useRef<HTMLDivElement>(null);
            const inView = useInView(ref, { once: true, margin: '-40px' });
            const Icon   = step.icon;
            return (
              <motion.div
                key={i} ref={ref}
                variants={fadeUp} initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                transition={{ delay: i * 0.08 }}
                style={{ background: SLATE, padding: '2rem', position: 'relative' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = SLATE_2; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = SLATE; }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ width: '42px', height: '42px', background: i === 4 ? 'rgba(201,168,76,0.1)' : 'rgba(37,99,235,0.1)', border: `1px solid ${i === 4 ? 'rgba(201,168,76,0.25)' : 'rgba(37,99,235,0.2)'}`, borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: i === 4 ? GOLD : ROYAL_L }}>
                    <Icon size={18} />
                  </div>
                  <span style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: '2rem', color: 'rgba(37,99,235,0.1)', lineHeight: 1 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <p style={{ fontSize: '0.9rem', fontWeight: 700, color: WHITE, marginBottom: '0.5rem' }}>{step.title}</p>
                <p style={{ fontSize: '0.78rem', lineHeight: 1.65, color: MUTED }}>{step.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Boardroom quote */}
        <Reveal delay={0.2} className="mt-10">
          <div style={{ background: `linear-gradient(135deg, rgba(37,99,235,0.1), rgba(15,23,42,0.8))`, border: '1px solid rgba(37,99,235,0.2)', borderRadius: '4px', padding: '2.5rem 3rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: '0 0 0 0', borderLeft: `3px solid ${GOLD}` }} />
            <div style={{ position: 'absolute', inset: 0, borderLeft: 'none', pointerEvents: 'none' }} />
            <p style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', color: WHITE, lineHeight: 1.2, letterSpacing: '0.03em', marginBottom: '1rem', paddingLeft: '1.5rem' }}>
              "WE DESIGNED THE BOARDROOM SO THAT PITCH DAY FEELS MORE INTENSE THAN
              ANY FUTURE BOARDROOM THEY WILL EVER WALK INTO."
            </p>
            <p style={{ paddingLeft: '1.5rem', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: GOLD }}>
              — Cindy Ha, Founder
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── Syllabus CTA ──────────────────────────────────────────────────── */}
      <section style={{ background: 'rgba(15,23,42,0.7)', borderTop: '1px solid rgba(37,99,235,0.1)' }}>
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
          <Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: '3rem', flexWrap: 'wrap' }}>
              <div>
                <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: ROYAL_L, marginBottom: '0.75rem' }}>
                  Full Curriculum Document
                </p>
                <h2 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 0.95, letterSpacing: '0.02em', color: WHITE, marginBottom: '0.875rem' }}>
                  DOWNLOAD THE FULL SYLLABUS.
                </h2>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: MUTED, maxWidth: '520px' }}>
                  The complete 32-page curriculum document — including weekly lesson plans,
                  instructor guides, assessment rubrics, and the full Boardroom scoring
                  framework. Available for school districts, administrators, and investors.
                </p>
                <div className="flex flex-wrap gap-3 mt-5">
                  {['32 Pages', 'Lesson Plans Included', 'Instructor Guides', 'Assessment Rubrics'].map((tag) => (
                    <div key={tag} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.75rem', background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.15)', borderRadius: '2px' }}>
                      <CheckCircle size={10} color={ROYAL_L} />
                      <span style={{ fontSize: '0.7rem', color: MUTED, fontWeight: 500 }}>{tag}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', minWidth: '220px' }}>
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
                    padding: '1.1rem 2rem',
                    background: downloading ? 'rgba(201,168,76,0.4)' : `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_L} 50%, ${GOLD} 100%)`,
                    backgroundSize: '200% auto',
                    border: 'none', borderRadius: '3px',
                    color: downloading ? 'rgba(15,23,42,0.6)' : SLATE,
                    fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.1em',
                    textTransform: 'uppercase' as const, cursor: downloading ? 'wait' : 'pointer',
                    fontFamily: 'inherit', transition: 'all 0.25s ease',
                    boxShadow: downloading ? 'none' : '0 4px 24px rgba(201,168,76,0.3)',
                    whiteSpace: 'nowrap' as const,
                  }}
                  onMouseEnter={(e) => { if (!downloading) e.currentTarget.style.boxShadow = '0 6px 32px rgba(201,168,76,0.45)'; }}
                  onMouseLeave={(e) => { if (!downloading) e.currentTarget.style.boxShadow = '0 4px 24px rgba(201,168,76,0.3)'; }}
                >
                  {downloading ? (
                    <>
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        style={{ width: 14, height: 14, border: `2px solid rgba(15,23,42,0.3)`, borderTopColor: SLATE, borderRadius: '50%' }} />
                      Preparing PDF...
                    </>
                  ) : (
                    <>
                      <Download size={15} />
                      Download Syllabus PDF
                    </>
                  )}
                </button>

                <Link href="/partner" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  padding: '1rem 2rem', background: 'rgba(37,99,235,0.1)',
                  border: '1px solid rgba(37,99,235,0.25)', borderRadius: '3px',
                  color: ROYAL_L, fontSize: '0.78rem', fontWeight: 700,
                  letterSpacing: '0.1em', textTransform: 'uppercase' as const, textDecoration: 'none',
                  transition: 'all 0.2s', whiteSpace: 'nowrap' as const,
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(37,99,235,0.18)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(37,99,235,0.1)'; }}
                >
                  Partner With Us <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          </Reveal>
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