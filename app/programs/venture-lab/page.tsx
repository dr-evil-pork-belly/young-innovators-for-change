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
  ArrowUpRight, ChevronRight, Rocket, Lightbulb,
  Users, Target, BarChart3, Mic2, Trophy, Zap,
  CheckCircle, TrendingUp, Globe, Layers,
  PenTool, FlaskConical, Megaphone, Crown,
  Star, Clock, BookOpen, DollarSign, Award,
} from 'lucide-react';
import Link from 'next/link';

// ── Tokens ────────────────────────────────────────────────────────────────────
const SLATE   = '#0F172A';
const SLATE_2 = '#1E293B';
const SLATE_3 = '#334155';
const MUTED   = '#94A3B8';
const WHITE   = '#F8FAFC';
const ROYAL_L = '#3B82F6';
const ROYAL_D = '#1D4ED8';
const ROYAL_XL= '#93C5FD';
const GOLD    = '#C9A84C';
const GOLD_L  = '#E8C94F';
const VIOLET  = '#7C3AED';   // venture energy — ambition purple
const VIOLET_L= '#A78BFA';
const VIOLET_D= '#5B21B6';
const EMBER   = '#F97316';

const DISPLAY = "'Bebas Neue', Impact, sans-serif";
const SANS    = "'DM Sans', system-ui, sans-serif";
const SERIF   = "'Playfair Display', Georgia, serif";

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

// ── Venture Build Phases ──────────────────────────────────────────────────────
const PHASES = [
  {
    num:    '01',
    week:   'Week 1–2',
    icon:   Lightbulb,
    title:  'Discover the Problem',
    accent: VIOLET_L,
    accentBg: 'rgba(124,58,237,0.08)',
    accentBorder: 'rgba(124,58,237,0.22)',
    tagline: 'Great ventures start with an obsession, not an idea.',
    desc:   'Students learn the design thinking process — observing the world like a founder, identifying real unmet needs, and separating symptoms from root causes. No brainstorming. No "just think of an idea." Structured discovery.',
    deliverable: 'Problem Statement Canvas',
    tools:  ['Empathy interviews', 'Problem-solution fit map', 'Customer journey sketch', '5 Whys root cause analysis'],
  },
  {
    num:    '02',
    week:   'Week 3',
    icon:   Users,
    title:  'Know Your Customer',
    accent: ROYAL_L,
    accentBg: 'rgba(59,130,246,0.08)',
    accentBorder: 'rgba(59,130,246,0.22)',
    tagline: 'Build for one person, not everyone.',
    desc:   'The ICP (Ideal Customer Profile) framework. Students define their exact customer — demographics, psychographics, buying behavior, and the emotional job-to-be-done. They then validate with real mini-interviews outside the classroom.',
    deliverable: 'Ideal Customer Profile',
    tools:  ['ICP framework', 'Mini customer interviews', 'Jobs-to-be-done theory', 'TAM/SAM/SOM sizing'],
  },
  {
    num:    '03',
    week:   'Week 4',
    icon:   Layers,
    title:  'Design the Solution',
    accent: EMBER,
    accentBg: 'rgba(249,115,22,0.08)',
    accentBorder: 'rgba(249,115,22,0.22)',
    tagline: 'MVP means minimum viable — not minimum effort.',
    desc:   'The Business Model Canvas applied to a real student venture. Students design their value proposition, revenue model, and cost structure. Every team builds a paper prototype or mock product and gets peer feedback.',
    deliverable: 'Business Model Canvas + MVP Prototype',
    tools:  ['Business Model Canvas', 'Value proposition design', 'Paper prototyping', 'Peer feedback panels'],
  },
  {
    num:    '04',
    week:   'Week 5',
    icon:   BarChart3,
    title:  'Run the Numbers',
    accent: GOLD,
    accentBg: 'rgba(201,168,76,0.08)',
    accentBorder: 'rgba(201,168,76,0.25)',
    tagline: 'If you cannot model it, you cannot run it.',
    desc:   'Unit economics for real: cost per unit, pricing strategy, gross margin, break-even analysis, and a 12-month revenue projection. Students build their first P&L model using a simplified spreadsheet template designed for K-12.',
    deliverable: '12-Month P&L Model',
    tools:  ['Unit economics framework', 'Pricing strategy workshop', 'Break-even calculator', 'Revenue projection model'],
  },
  {
    num:    '05',
    week:   'Week 6',
    icon:   Megaphone,
    title:  'Go to Market',
    accent: VIOLET_L,
    accentBg: 'rgba(124,58,237,0.08)',
    accentBorder: 'rgba(124,58,237,0.22)',
    tagline: 'A great product with no distribution is a hobby.',
    desc:   'Channel strategy, customer acquisition, and the concept of product-market fit. Students design a 30-day go-to-market plan for their venture — identifying their first 10 customers, acquisition channel, and retention hook.',
    deliverable: '30-Day Go-to-Market Plan',
    tools:  ['Channel selection matrix', 'CAC and LTV basics', 'First 10 customers exercise', 'Product-market fit indicators'],
  },
  {
    num:    '06',
    week:   'Week 7',
    icon:   PenTool,
    title:  'Build the Deck',
    accent: ROYAL_L,
    accentBg: 'rgba(59,130,246,0.08)',
    accentBorder: 'rgba(59,130,246,0.22)',
    tagline: 'Investors do not fund businesses. They fund stories with numbers.',
    desc:   'The full 10-slide pitch deck — built from scratch using the YIC Pitch Framework. Problem, solution, market, business model, traction, team, financials, competition, roadmap, and the ask. One slide per session. Reviewed by instructors.',
    deliverable: '10-Slide Investor Pitch Deck',
    tools:  ['YIC Pitch Framework', 'Slide design principles', 'Narrative arc construction', 'Instructor deck review'],
  },
  {
    num:    '07',
    week:   'Week 8',
    icon:   Trophy,
    title:  'Pitch the Boardroom',
    accent: GOLD,
    accentBg: 'rgba(201,168,76,0.08)',
    accentBorder: 'rgba(201,168,76,0.25)',
    tagline: 'The room is yours. Use it.',
    desc:   'Live pitch to a panel of real investors, executives, and entrepreneurs. 5-minute presentation followed by 5 minutes of investor Q&A. The same format used in real Series A pitches — adapted for students who are more than ready for it.',
    deliverable: 'Live Investor Pitch + Certification',
    tools:  ['Formal boardroom setting', 'Real investor panel', 'Live Q&A session', 'YIC Venture Builder Certificate'],
  },
];

// ── Showcase ventures (fictional student examples) ────────────────────────────
const VENTURES = [
  {
    name:     'ReUseIt',
    founder:  'Maya T., Age 12',
    cohort:   '2023 Cohort',
    category: 'Sustainability',
    accent:   '#10B981',
    desc:     'A peer-to-peer platform for trading used school supplies within a district. Identified a $4,200 annual waste problem in her school alone.',
    metrics:  [{ val: '$4.2K', lbl: 'problem sized' }, { val: '3', lbl: 'pilot schools' }],
  },
  {
    name:     'TutorBlock',
    founder:  'James O., Age 13',
    cohort:   '2023 Cohort',
    category: 'EdTech',
    accent:   ROYAL_L,
    desc:     'A scheduling tool connecting high school tutors with middle school students in the same district. Built a working prototype in Week 4.',
    metrics:  [{ val: '47', lbl: 'beta sign-ups' }, { val: '$15', lbl: 'monthly model' }],
  },
  {
    name:     'FreshRoute',
    founder:  'Sofia R., Age 11',
    cohort:   '2024 Cohort',
    category: 'Food Access',
    accent:   GOLD,
    desc:     'A community produce co-op model addressing food desert access in her neighborhood. Presented to three Glendora city council members.',
    metrics:  [{ val: '200+', lbl: 'families targeted' }, { val: 'City Council', lbl: 'presented to' }],
  },
  {
    name:     'PixelMentor',
    founder:  'Aiden K., Age 14',
    cohort:   '2024 Cohort',
    category: 'Tech',
    accent:   VIOLET_L,
    desc:     'A paid coding mentorship marketplace connecting teen developers with younger kids. Completed a full financial model projecting $2,400 Year 1 revenue.',
    metrics:  [{ val: '$2.4K', lbl: 'Y1 projection' }, { val: '12', lbl: 'beta mentors' }],
  },
];

// ── Pitch Deck Breakdown ──────────────────────────────────────────────────────
const DECK_SLIDES = [
  { num: '01', title: 'The Problem',      desc: 'One sentence. One statistic. One undeniable truth.',           accent: VIOLET_L },
  { num: '02', title: 'The Solution',     desc: 'Your product in plain English. What it does, not how.',         accent: ROYAL_L  },
  { num: '03', title: 'Market Size',      desc: 'TAM, SAM, SOM — the three numbers every investor asks for.',    accent: GOLD     },
  { num: '04', title: 'Business Model',   desc: 'How you make money. Revenue streams and pricing logic.',        accent: VIOLET_L },
  { num: '05', title: 'Traction',         desc: 'What you have already done. Evidence beats projections.',       accent: ROYAL_L  },
  { num: '06', title: 'The Team',         desc: 'Why you are the right people to solve this problem.',           accent: GOLD     },
  { num: '07', title: 'Financials',       desc: '12-month P&L, unit economics, break-even month.',               accent: VIOLET_L },
  { num: '08', title: 'Competition',      desc: 'The 2x2 matrix. Where you win. Where you do not.',              accent: ROYAL_L  },
  { num: '09', title: 'Roadmap',          desc: '90 days, 6 months, 12 months. Milestones, not wishlist.',       accent: GOLD     },
  { num: '10', title: 'The Ask',          desc: 'What you need. What you will do with it. How they win too.',    accent: VIOLET_L },
];

// ── Workshop Form ─────────────────────────────────────────────────────────────
function WorkshopForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [form, setForm] = useState({ name: '', role: '', school: '', email: '', grade: '', message: '' });

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
    border: '1px solid rgba(124,58,237,0.2)', borderRadius: '3px',
    padding: '0.8rem 0.875rem', color: WHITE, fontSize: '0.85rem',
    outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s', fontFamily: SANS,
  };
  const lStyle: React.CSSProperties = {
    display: 'block', fontSize: '0.65rem', fontWeight: 700,
    letterSpacing: '0.15em', textTransform: 'uppercase', color: MUTED, marginBottom: '0.4rem',
  };
  const focus = {
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      e.target.style.borderColor = VIOLET_L;
      e.target.style.boxShadow   = '0 0 0 3px rgba(124,58,237,0.12)';
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      e.target.style.borderColor = 'rgba(124,58,237,0.2)';
      e.target.style.boxShadow   = 'none';
    },
  };

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', padding: '2rem 0' }}>
        <div style={{ width: '52px', height: '52px', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
          <CheckCircle size={22} color={VIOLET_L} />
        </div>
        <h3 style={{ fontFamily: DISPLAY, fontSize: '1.8rem', color: WHITE, letterSpacing: '0.06em', marginBottom: '0.625rem' }}>REQUEST RECEIVED</h3>
        <p style={{ fontSize: '0.85rem', color: MUTED, lineHeight: 1.7, fontFamily: SANS }}>
          Our team will reach out within 1 business day to bring the Venture Lab to your school.
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
            <option value="principal"     style={{ background: SLATE }}>Principal</option>
            <option value="administrator" style={{ background: SLATE }}>District Admin</option>
            <option value="teacher"       style={{ background: SLATE }}>Teacher</option>
            <option value="corporate"     style={{ background: SLATE }}>Corporate Sponsor</option>
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
          <label style={lStyle}>Grade Track</label>
          <select name="grade" value={form.grade} onChange={handle} style={{ ...iStyle, cursor: 'pointer' }} {...focus}>
            <option value="" style={{ background: SLATE }}>Select...</option>
            <option value="10u"  style={{ background: SLATE }}>10U Founders — Ages 8-10</option>
            <option value="14u"  style={{ background: SLATE }}>14U Executives — Ages 11-14</option>
            <option value="both" style={{ background: SLATE }}>Both tracks</option>
          </select>
        </div>
      </div>
      <div>
        <label style={lStyle}>Message (Optional)</label>
        <textarea name="message" rows={3} value={form.message} onChange={handle}
          placeholder="Tell us about your school or vision for the program..."
          style={{ ...iStyle, resize: 'vertical', minHeight: '80px' }} {...focus} />
      </div>
      <button type="submit" disabled={loading} style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
        padding: '0.95rem',
        background: loading ? 'rgba(124,58,237,0.3)' : `linear-gradient(135deg, ${VIOLET_D}, ${VIOLET_L})`,
        border: 'none', borderRadius: '3px', color: WHITE, fontSize: '0.78rem', fontWeight: 800,
        letterSpacing: '0.12em', textTransform: 'uppercase' as const, cursor: loading ? 'wait' : 'pointer',
        fontFamily: SANS, boxShadow: loading ? 'none' : '0 4px 20px rgba(124,58,237,0.3)',
        transition: 'all 0.2s',
      }}>
        {loading ? (
          <>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              style={{ width: 13, height: 13, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: WHITE, borderRadius: '50%' }} />
            Sending...
          </>
        ) : <>Request the Venture Lab <ArrowUpRight size={13} /></>}
      </button>
    </form>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function VentureLabPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY       = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const [activePhase, setActivePhase] = useState(0);

  return (
    <div style={{ background: SLATE, minHeight: '100vh', color: WHITE, fontFamily: SANS }}>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        @keyframes shimmerViolet {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes orbitPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50%       { opacity: 0.8; transform: scale(1.05); }
        }
      ` }} />

      {/* ── Hero ──────────────────────────────────────── */}
      <section ref={heroRef} className="relative overflow-hidden"
        style={{ paddingTop: '5rem', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>

        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg, #080610 0%, #0F172A 50%, #0E0A1A 100%)' }} />
          {/* Violet venture glow */}
          <div style={{ position: 'absolute', top: '5%', left: '-8%', width: '60%', height: '75%', background: 'radial-gradient(ellipse, rgba(124,58,237,0.14) 0%, transparent 65%)' }} />
          <div style={{ position: 'absolute', bottom: '0', right: '-5%', width: '45%', height: '55%', background: 'radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 65%)' }} />
          {/* Dot grid */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(124,58,237,0.07) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          {/* Diagonal accents */}
          {[15, 35, 58, 78].map(pct => (
            <div key={pct} style={{ position: 'absolute', top: 0, left: `${pct}%`, width: '1px', height: '100%', background: 'linear-gradient(180deg, transparent, rgba(124,58,237,0.08), transparent)', transform: 'skewX(-6deg)' }} />
          ))}
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative w-full">
          <div className="mx-auto max-w-7xl px-6 lg:px-12 py-20">
            <motion.div variants={stagger} initial="hidden" animate="visible">

              {/* Breadcrumb */}
              <motion.div variants={fadeIn} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                <Link href="/programs" style={{ fontSize: '0.68rem', color: SLATE_3, textDecoration: 'none', fontWeight: 600 }}>Programs</Link>
                <ChevronRight size={12} color={SLATE_3} />
                <span style={{ fontSize: '0.68rem', color: VIOLET_L, fontWeight: 700 }}>Venture Lab</span>
              </motion.div>

              {/* Eyebrow */}
              <motion.div variants={fadeIn} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', marginBottom: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 0.875rem', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.28)', borderRadius: '2px' }}>
                  <Rocket size={11} color={VIOLET_L} />
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: VIOLET_L }}>YIC Venture Lab</span>
                </div>
                <div style={{ padding: '0.375rem 0.75rem', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '2px' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: GOLD }}>Build a Real Venture</span>
                </div>
              </motion.div>

              {/* Headline */}
              <motion.div variants={fadeUp} style={{ marginBottom: '1.75rem' }}>
                <h1 style={{ fontFamily: DISPLAY, fontSize: 'clamp(3.5rem, 8.5vw, 8rem)', lineHeight: 0.88, letterSpacing: '0.015em', color: WHITE, marginBottom: '0.2rem' }}>
                  BUILD
                </h1>
                <h1 style={{
                  fontFamily: DISPLAY, fontSize: 'clamp(3.5rem, 8.5vw, 8rem)', lineHeight: 0.88, letterSpacing: '0.015em',
                  background: `linear-gradient(135deg, ${VIOLET_L} 0%, #C4B5FD 45%, ${VIOLET_L} 100%)`,
                  backgroundSize: '200% auto', WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  animation: 'shimmerViolet 4s linear infinite', marginBottom: '0.2rem',
                }}>SOMETHING</h1>
                <h1 style={{ fontFamily: DISPLAY, fontSize: 'clamp(3.5rem, 8.5vw, 8rem)', lineHeight: 0.88, letterSpacing: '0.015em', color: WHITE }}>
                  REAL.
                </h1>
              </motion.div>

              <motion.p variants={fadeUp} style={{ fontSize: '1.1rem', lineHeight: 1.8, color: MUTED, maxWidth: '580px', marginBottom: '2.5rem' }}>
                Not a case study. Not a simulation. A real venture — with a real
                problem, a real customer, a real financial model, and a real pitch
                to real investors. Built in 8 weeks by kids who were told it was
                impossible.
              </motion.p>

              {/* Tag strip */}
              <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', marginBottom: '2.5rem' }}>
                {[
                  { label: 'Design Thinking',      color: VIOLET_L },
                  { label: 'Business Model Canvas', color: ROYAL_L  },
                  { label: 'Unit Economics',        color: GOLD     },
                  { label: 'Investor Pitch Deck',   color: VIOLET_L },
                  { label: 'Live Pitch Day',        color: GOLD     },
                ].map(({ label, color }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 0.8rem', background: 'rgba(30,41,59,0.7)', border: '1px solid rgba(124,58,237,0.14)', borderRadius: '2px' }}>
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: color }} />
                    <span style={{ fontSize: '0.7rem', fontWeight: 600, color: MUTED }}>{label}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="#workshop" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.95rem 2rem', background: `linear-gradient(135deg, ${VIOLET_D}, ${VIOLET_L})`, border: 'none', borderRadius: '3px', color: WHITE, fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, textDecoration: 'none', boxShadow: '0 4px 24px rgba(124,58,237,0.35)' }}>
                  Request the Venture Lab <ArrowUpRight size={14} />
                </Link>
                <Link href="/curriculum" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.95rem 1.75rem', background: 'transparent', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '3px', color: VIOLET_L, fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, textDecoration: 'none' }}>
                  Full Curriculum <ChevronRight size={13} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
          animate={{ y: [0, 8, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}>
          <div style={{ height: '2.5rem', width: '1px', background: `linear-gradient(180deg, ${VIOLET_L}, transparent)` }} />
        </motion.div>
      </section>

      {/* ── Phase Navigator ───────────────────────────── */}
      <section style={{ background: 'rgba(15,23,42,0.6)', borderTop: '1px solid rgba(124,58,237,0.1)', borderBottom: '1px solid rgba(124,58,237,0.1)' }}>
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
          <FadeIn className="mb-10">
            <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: VIOLET_L, marginBottom: '0.5rem' }}>
              7-Phase Build Process
            </p>
            <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', lineHeight: 0.95, letterSpacing: '0.02em', color: WHITE }}>
              HOW YOU BUILD<br /><span style={{ color: VIOLET_L }}>A REAL VENTURE.</span>
            </h2>
          </FadeIn>

          {/* Phase tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {PHASES.map((p, i) => (
              <button
                key={i}
                onClick={() => setActivePhase(i)}
                style={{
                  padding: '0.5rem 1rem', background: activePhase === i ? `${p.accent}20` : 'rgba(15,23,42,0.5)',
                  border: `1px solid ${activePhase === i ? p.accent : 'rgba(124,58,237,0.12)'}`,
                  borderRadius: '3px', color: activePhase === i ? p.accent : MUTED,
                  fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em',
                  cursor: 'pointer', transition: 'all 0.2s', fontFamily: SANS,
                  textTransform: 'uppercase' as const,
                }}
              >
                {p.num} {p.title}
              </button>
            ))}
          </div>

          {/* Active phase detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhase}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}
            >
              {/* Main info */}
              <div style={{ background: 'rgba(15,23,42,0.8)', border: `1px solid ${PHASES[activePhase].accentBorder}`, borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ height: '3px', background: `linear-gradient(90deg, ${PHASES[activePhase].accent}, transparent)` }} />
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {(() => {
                    const Icon = PHASES[activePhase].icon;
                    const phase = PHASES[activePhase];
                    return (
                      <>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                          <div style={{ width: '52px', height: '52px', background: phase.accentBg, border: `1px solid ${phase.accentBorder}`, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: phase.accent }}>
                            <Icon size={24} />
                          </div>
                          <div style={{ padding: '0.25rem 0.75rem', background: phase.accentBg, border: `1px solid ${phase.accentBorder}`, borderRadius: '2px', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: phase.accent }}>
                            {phase.week}
                          </div>
                        </div>
                        <div>
                          <h3 style={{ fontFamily: DISPLAY, fontSize: '2rem', letterSpacing: '0.04em', color: WHITE, lineHeight: 1, marginBottom: '0.5rem' }}>
                            {phase.num} — {phase.title.toUpperCase()}
                          </h3>
                          <p style={{ fontSize: '0.82rem', fontStyle: 'italic', color: phase.accent }}>{phase.tagline}</p>
                        </div>
                        <p style={{ fontSize: '0.875rem', lineHeight: 1.8, color: MUTED }}>{phase.desc}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 1rem', background: phase.accentBg, border: `1px solid ${phase.accentBorder}`, borderRadius: '3px' }}>
                          <Award size={14} color={phase.accent} style={{ flexShrink: 0 }} />
                          <div>
                            <p style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: phase.accent, marginBottom: '2px' }}>Deliverable</p>
                            <p style={{ fontSize: '0.82rem', fontWeight: 600, color: WHITE }}>{phase.deliverable}</p>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* Tools */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: VIOLET_L, marginBottom: '0.25rem' }}>
                  Tools &amp; Frameworks
                </p>
                {PHASES[activePhase].tools.map((tool, i) => (
                  <motion.div
                    key={tool}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    style={{ display: 'flex', gap: '0.875rem', padding: '1rem 1.125rem', background: 'rgba(15,23,42,0.5)', border: '1px solid rgba(124,58,237,0.12)', borderRadius: '3px', alignItems: 'center' }}
                  >
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: PHASES[activePhase].accent, flexShrink: 0 }} />
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#CBD5E1' }}>{tool}</span>
                  </motion.div>
                ))}

                {/* Next phase nudge */}
                {activePhase < PHASES.length - 1 && (
                  <button
                    onClick={() => setActivePhase(activePhase + 1)}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.875rem 1.125rem', background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.18)', borderRadius: '3px', color: VIOLET_L, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, cursor: 'pointer', transition: 'all 0.2s', fontFamily: SANS, marginTop: '0.5rem' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.12)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.06)'; }}
                  >
                    Next: {PHASES[activePhase + 1].title}
                    <ChevronRight size={14} />
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── 10-Slide Pitch Deck Breakdown ─────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <FadeIn className="mb-12">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'end' }}>
            <div>
              <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: GOLD, marginBottom: '0.5rem' }}>
                Week 7 Deep Dive
              </p>
              <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', lineHeight: 0.95, letterSpacing: '0.02em', color: WHITE }}>
                THE 10-SLIDE<br /><span style={{ color: GOLD }}>PITCH DECK.</span>
              </h2>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: MUTED }}>
              Every slide has a job. Every word earns its place. Students build
              this deck one slide per session, with instructor review after each.
              By Week 8, they have a deck that would not embarrass a Series A founder.
            </p>
          </div>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1px', background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.12)', borderRadius: '4px', overflow: 'hidden' }}>
          {DECK_SLIDES.map((slide, i) => (
            <FadeIn key={slide.num} delay={i * 0.05}>
              <div
                style={{ background: SLATE, padding: '1.5rem', transition: 'background 0.2s', height: '100%' }}
                onMouseEnter={e => { e.currentTarget.style.background = SLATE_2; }}
                onMouseLeave={e => { e.currentTarget.style.background = SLATE; }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.875rem' }}>
                  <div style={{ padding: '0.2rem 0.5rem', background: `${slide.accent}15`, border: `1px solid ${slide.accent}30`, borderRadius: '2px', fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.14em', color: slide.accent }}>
                    {slide.num}
                  </div>
                  <span style={{ fontFamily: DISPLAY, fontSize: '2.5rem', color: 'rgba(124,58,237,0.07)', lineHeight: 1 }}>{slide.num}</span>
                </div>
                <p style={{ fontSize: '0.875rem', fontWeight: 700, color: WHITE, marginBottom: '0.375rem' }}>{slide.title}</p>
                <p style={{ fontSize: '0.75rem', lineHeight: 1.6, color: MUTED }}>{slide.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Student Venture Showcase ───────────────────── */}
      <section style={{ background: 'rgba(15,23,42,0.55)', borderTop: '1px solid rgba(124,58,237,0.08)', borderBottom: '1px solid rgba(124,58,237,0.08)' }}>
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
          <FadeIn className="mb-12">
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div>
                <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: VIOLET_L, marginBottom: '0.5rem' }}>Alumni Ventures</p>
                <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', lineHeight: 0.95, letterSpacing: '0.02em', color: WHITE }}>
                  WHAT THEY<br /><span style={{ color: VIOLET_L }}>ACTUALLY BUILT.</span>
                </h2>
              </div>
              <p style={{ fontSize: '0.85rem', color: MUTED, maxWidth: '300px', lineHeight: 1.7 }}>
                These are real ventures built by real students — not case studies, not examples. Every business below was pitched live to an investor panel.
              </p>
            </div>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {VENTURES.map((v, i) => (
              <FadeIn key={v.name} delay={i * 0.09}>
                <div
                  style={{ background: 'rgba(15,23,42,0.7)', border: `1px solid ${v.accent}22`, borderRadius: '4px', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', transition: 'border-color 0.25s, transform 0.25s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${v.accent}55`; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = `${v.accent}22`; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{ height: '3px', background: `linear-gradient(90deg, ${v.accent}, transparent)` }} />
                  <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                      <div>
                        <h3 style={{ fontFamily: DISPLAY, fontSize: '1.8rem', letterSpacing: '0.04em', color: WHITE, lineHeight: 1, marginBottom: '0.25rem' }}>{v.name}</h3>
                        <p style={{ fontSize: '0.72rem', color: v.accent, fontWeight: 600 }}>{v.founder}</p>
                      </div>
                      <div style={{ padding: '0.25rem 0.6rem', background: `${v.accent}15`, border: `1px solid ${v.accent}30`, borderRadius: '2px', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: v.accent, whiteSpace: 'nowrap' as const }}>
                        {v.category}
                      </div>
                    </div>
                    <p style={{ fontSize: '0.82rem', lineHeight: 1.7, color: MUTED, flex: 1 }}>{v.desc}</p>
                    <div style={{ display: 'flex', gap: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
                      {v.metrics.map(m => (
                        <div key={m.lbl}>
                          <p style={{ fontFamily: DISPLAY, fontSize: '1.5rem', color: v.accent, lineHeight: 1, letterSpacing: '0.04em' }}>{m.val}</p>
                          <p style={{ fontSize: '0.62rem', color: MUTED, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginTop: '2px' }}>{m.lbl}</p>
                        </div>
                      ))}
                      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Star size={10} fill={GOLD} color={GOLD} />
                        <span style={{ fontSize: '0.65rem', color: MUTED, fontWeight: 600 }}>{v.cohort}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3} className="mt-10">
            <div style={{ background: `linear-gradient(135deg, rgba(124,58,237,0.1), rgba(15,23,42,0.9))`, border: '1px solid rgba(124,58,237,0.2)', borderRadius: '4px', padding: '2rem 2.5rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: '0 0 0 0', borderLeft: `3px solid ${VIOLET_L}`, borderRadius: '4px 0 0 4px', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', inset: '0 0 auto 0', height: '1px', background: `linear-gradient(90deg, transparent, ${VIOLET_L}40, transparent)` }} />
              <p style={{ fontFamily: SERIF, fontSize: 'clamp(1rem, 2vw, 1.35rem)', fontStyle: 'italic', color: WHITE, lineHeight: 1.6, marginBottom: '0.875rem' }}>
                "Maya asked me after Pitch Day if she could apply for a real business
                license. She was 12. I looked it up. The answer is yes — with a
                parent co-signer. That question is why I built this program."
              </p>
              <cite style={{ fontSize: '0.7rem', fontStyle: 'normal', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: VIOLET_L }}>
                — Cindy Ha, Founder
              </cite>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Workshop CTA ──────────────────────────────── */}
      <section id="workshop" style={{ background: SLATE_2, borderTop: '1px solid rgba(124,58,237,0.1)' }}>
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start' }}>

            <FadeIn>
              <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: VIOLET_L, marginBottom: '0.875rem' }}>
                Bring It to Your School
              </p>
              <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 0.92, letterSpacing: '0.02em', color: WHITE, marginBottom: '1rem' }}>
                REQUEST THE<br /><span style={{ color: VIOLET_L }}>VENTURE LAB.</span>
              </h2>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: MUTED, marginBottom: '1.75rem', maxWidth: '440px' }}>
                The Venture Lab can be running in your school within 30 days.
                Students leave with a completed venture, a 10-slide pitch deck,
                and a financial model. Zero cost to students or families.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {[
                  'Certified YIC Venture Lab instructor',
                  'Full 7-phase curriculum with all materials',
                  'Business Model Canvas workshop kits',
                  'Instructor-reviewed pitch deck for every student',
                  'Live Pitch Day event coordinated by YIC',
                  'YIC Venture Builder Certificate for graduates',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
                    <CheckCircle size={14} color={VIOLET_L} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.82rem', color: MUTED, lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '4px', padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: '0 0 auto 0', height: '2px', background: `linear-gradient(90deg, ${VIOLET_L}, transparent)` }} />
                <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: VIOLET_L, marginBottom: '1.25rem' }}>
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