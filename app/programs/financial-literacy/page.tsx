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
  ArrowUpRight, DollarSign, TrendingUp, PieChart,
  ChevronRight, BarChart3, Percent, CreditCard,
  CheckCircle, Lightbulb, Target, Wallet,
  Building2, ShieldCheck, Coins, Calculator,
  BookOpen, Award, Clock, Users,
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
const GREEN   = '#10B981';
const GREEN_L = '#34D399';
const GREEN_D = '#059669';

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

// ── Curriculum modules ────────────────────────────────────────────────────────
const MODULES = [
  {
    week:   'Week 1',
    icon:   Wallet,
    title:  'Money Fundamentals',
    accent: ROYAL_L,
    desc:   'Income, expenses, assets, and liabilities — the four words that determine every financial outcome. Students learn to categorize, measure, and act on each.',
    skills: ['Reading a paycheck', 'Fixed vs variable expenses', 'Net worth calculation', 'Cash flow basics'],
  },
  {
    week:   'Week 2',
    icon:   Calculator,
    title:  'The Budget Blueprint',
    accent: GREEN,
    desc:   'The 50/30/20 rule adapted for real student contexts. Students build their first personal budget using real numbers — not hypotheticals.',
    skills: ['50/30/20 framework', 'Zero-based budgeting intro', 'Needs vs wants analysis', 'Monthly budget simulation'],
  },
  {
    week:   'Week 3',
    icon:   TrendingUp,
    title:  'Compound Interest',
    accent: GOLD,
    desc:   'The single most powerful concept in personal finance — and the one most adults were never taught. Students run real compound interest simulations starting at age 10.',
    skills: ['Simple vs compound interest', 'The Rule of 72', 'Starting early vs starting late', 'Real investment projections'],
  },
  {
    week:   'Week 4',
    icon:   CreditCard,
    title:  'Credit & Debt',
    accent: ROYAL_L,
    desc:   'Credit scores, interest rates, and the true cost of debt. Students learn how credit works before they ever have a credit card — so they never become a statistic.',
    skills: ['How credit scores are calculated', 'APR and the true cost of debt', 'Good debt vs bad debt', 'Building credit responsibly'],
  },
  {
    week:   'Week 5',
    icon:   BarChart3,
    title:  'Investing Basics',
    accent: GREEN,
    desc:   'Stocks, bonds, index funds, and the concept of risk-adjusted return. Students build a mock $10,000 portfolio and track it through the remainder of the program.',
    skills: ['Stocks vs bonds vs funds', 'Diversification and risk', 'Index investing philosophy', 'Mock portfolio construction'],
  },
  {
    week:   'Week 6',
    icon:   Building2,
    title:  'Entrepreneurial Finance',
    accent: GOLD,
    desc:   'Revenue models, gross margin, CAC, and LTV — the financial vocabulary of business. Students apply these concepts to their own venture ideas.',
    skills: ['Revenue vs profit distinction', 'Unit economics: CAC and LTV', 'Break-even analysis', 'Reading a simple P&L'],
  },
  {
    week:   'Week 7',
    icon:   ShieldCheck,
    title:  'Financial Protection',
    accent: ROYAL_L,
    desc:   'Insurance, emergency funds, and the psychology of financial decision-making. Why smart people make bad money decisions — and how to build systems that prevent it.',
    skills: ['Emergency fund sizing', 'Insurance fundamentals', 'Behavioral finance basics', 'Avoiding lifestyle inflation'],
  },
  {
    week:   'Week 8',
    icon:   Award,
    title:  'The Financial Pitch',
    accent: GOLD,
    desc:   'Students present a personal financial plan to a panel — showing their budget, investment strategy, and 10-year wealth projection. Real numbers. Real accountability.',
    skills: ['Personal financial plan', '10-year wealth projection', 'Live panel presentation', 'Financial literacy certification'],
  },
];

// ── Compound interest simulator data ─────────────────────────────────────────
const COMPOUND_SCENARIOS = [
  { age: 10, monthly: 25,  rate: 7, years: 55, label: 'Start at 10',  accent: GREEN,   note: 'The YIC student' },
  { age: 22, monthly: 25,  rate: 7, years: 43, label: 'Start at 22',  accent: ROYAL_L, note: 'College grad'     },
  { age: 35, monthly: 25,  rate: 7, years: 30, label: 'Start at 35',  accent: GOLD,    note: 'Most adults'      },
];

function calcFV(monthly: number, rate: number, years: number) {
  const r = rate / 100 / 12;
  const n = years * 12;
  return monthly * ((Math.pow(1 + r, n) - 1) / r);
}

// ── Compound Interest Visualizer ──────────────────────────────────────────────
function CompoundVisualizer() {
  const [monthly, setMonthly] = useState(25);
  const maxFV = calcFV(monthly, 7, 55);

  return (
    <div style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(37,99,235,0.18)', borderRadius: '4px', overflow: 'hidden' }}>
      {/* Top rule */}
      <div style={{ height: '2px', background: `linear-gradient(90deg, ${GREEN}, ${ROYAL_L}, transparent)` }} />

      <div style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: GREEN, marginBottom: '0.25rem' }}>Interactive Simulator</p>
            <h3 style={{ fontFamily: DISPLAY, fontSize: '1.6rem', letterSpacing: '0.05em', color: WHITE }}>COMPOUND INTEREST BY AGE</h3>
          </div>
          {/* Monthly input */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(37,99,235,0.2)', borderRadius: '3px', padding: '0.5rem 1rem' }}>
            <DollarSign size={14} color={GREEN} />
            <span style={{ fontSize: '0.72rem', color: MUTED, fontWeight: 600 }}>Monthly:</span>
            <input
              type="range" min={10} max={200} step={5} value={monthly}
              onChange={e => setMonthly(Number(e.target.value))}
              style={{ width: '100px', accentColor: GREEN, cursor: 'pointer' }}
            />
            <span style={{ fontFamily: DISPLAY, fontSize: '1.2rem', color: GREEN, minWidth: '3.5rem' }}>${monthly}</span>
          </div>
        </div>

        {/* Bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {COMPOUND_SCENARIOS.map((s) => {
            const fv      = calcFV(monthly, s.rate, s.years);
            const total   = monthly * 12 * s.years;
            const pct     = Math.min((fv / (maxFV * 1.05)) * 100, 100);
            const contPct = Math.min((total / fv) * 100, 100);

            return (
              <div key={s.label}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: s.accent, flexShrink: 0 }} />
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: WHITE }}>{s.label}</span>
                    <span style={{ fontSize: '0.7rem', color: MUTED }}>{s.note} · {s.years} yrs to age 65</span>
                  </div>
                  <span style={{ fontFamily: DISPLAY, fontSize: '1.4rem', color: s.accent, letterSpacing: '0.03em' }}>
                    ${Math.round(fv).toLocaleString()}
                  </span>
                </div>

                {/* Stacked bar: contributions + growth */}
                <div style={{ height: '32px', background: 'rgba(30,41,59,0.6)', borderRadius: '3px', overflow: 'hidden', position: 'relative' }}>
                  {/* Total bar */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
                    style={{ height: '100%', background: `${s.accent}22`, position: 'absolute', left: 0, top: 0, borderRadius: '3px' }}
                  />
                  {/* Contributions portion */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct * contPct / 100}%` }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
                    style={{ height: '100%', background: `${s.accent}55`, position: 'absolute', left: 0, top: 0, borderRadius: '3px' }}
                  />
                  {/* Labels inside bar */}
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', paddingLeft: '0.75rem', gap: '1rem' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, color: s.accent }}>
                      ${Math.round(total).toLocaleString()} contributed
                    </span>
                    <span style={{ fontSize: '0.65rem', color: MUTED }}>
                      +${Math.round(fv - total).toLocaleString()} growth
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p style={{ fontSize: '0.72rem', color: SLATE_3, marginTop: '1.25rem', fontStyle: 'italic' }}>
          Assumes 7% average annual return. For educational illustration only.
        </p>
      </div>
    </div>
  );
}

// ── Stats ─────────────────────────────────────────────────────────────────────
const STATS = [
  { val: '57%',  lbl: 'of Americans are financially illiterate',      accent: ROYAL_L },
  { val: '$0',   lbl: 'financial education in most K-12 curricula',   accent: GREEN   },
  { val: '78%',  lbl: 'of workers live paycheck to paycheck',         accent: GOLD    },
  { val: '10',   lbl: 'ideal age to learn compound interest',         accent: GREEN   },
];

// ── FAQ ───────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'Is this age-appropriate for elementary students?',
    a: 'Absolutely. The 10U track uses candy-store simulations, allowance scenarios, and real-world analogies to make financial concepts tangible. By Week 3, 10-year-olds are running compound interest calculations and asking their parents about retirement accounts.',
  },
  {
    q: 'How is this different from standard financial literacy programs?',
    a: 'Most programs teach financial vocabulary. We teach financial behavior. Every concept is applied immediately through simulations, mock portfolios, and real budgeting exercises. Students leave with a completed personal financial plan — not a completed worksheet.',
  },
  {
    q: 'Do students need any prior math knowledge?',
    a: 'No. The curriculum is designed to meet students where they are. Instructors use visual tools, interactive calculators, and peer-learning models so that mathematical concepts become intuitive, not intimidating.',
  },
  {
    q: 'What do students take home after the program?',
    a: 'Every graduate receives a completed personal budget template, a 10-year wealth projection model, their mock investment portfolio summary, and a YIC Financial Literacy Certification — a credential they can include in future applications.',
  },
];

function FAQItem({ faq, index }: { faq: typeof FAQS[0]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <FadeIn delay={index * 0.07}>
      <div style={{ borderBottom: '1px solid rgba(37,99,235,0.1)', overflow: 'hidden' }}>
        <button
          onClick={() => setOpen(v => !v)}
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 0', background: 'none', border: 'none', cursor: 'pointer', gap: '1rem' }}
        >
          <span style={{ fontSize: '0.925rem', fontWeight: 600, color: open ? WHITE : '#CBD5E1', textAlign: 'left', lineHeight: 1.5, fontFamily: SANS }}>
            {faq.q}
          </span>
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22 }} style={{ flexShrink: 0 }}>
            <ChevronRight size={16} color={open ? GREEN : SLATE_3} style={{ transform: 'rotate(90deg)' }} />
          </motion.div>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <p style={{ fontSize: '0.875rem', lineHeight: 1.8, color: MUTED, paddingBottom: '1.25rem', fontFamily: SANS }}>{faq.a}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeIn>
  );
}

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
    border: '1px solid rgba(37,99,235,0.18)', borderRadius: '3px',
    padding: '0.8rem 0.875rem', color: WHITE, fontSize: '0.85rem',
    outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s', fontFamily: SANS,
  };
  const lStyle: React.CSSProperties = {
    display: 'block', fontSize: '0.65rem', fontWeight: 700,
    letterSpacing: '0.15em', textTransform: 'uppercase', color: MUTED, marginBottom: '0.4rem',
  };
  const focus = {
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      e.target.style.borderColor = GREEN;
      e.target.style.boxShadow   = '0 0 0 3px rgba(16,185,129,0.1)';
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      e.target.style.borderColor = 'rgba(37,99,235,0.18)';
      e.target.style.boxShadow   = 'none';
    },
  };

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', padding: '1.5rem 0' }}>
        <div style={{ width: '52px', height: '52px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
          <CheckCircle size={22} color={GREEN} />
        </div>
        <h3 style={{ fontFamily: DISPLAY, fontSize: '1.8rem', color: WHITE, letterSpacing: '0.06em', marginBottom: '0.625rem' }}>REQUEST RECEIVED</h3>
        <p style={{ fontSize: '0.85rem', color: MUTED, lineHeight: 1.7, fontFamily: SANS }}>
          Our team will be in touch within 1 business day to schedule your Financial Literacy workshop.
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
          <label style={lStyle}>Grade Level</label>
          <select name="grade" value={form.grade} onChange={handle} style={{ ...iStyle, cursor: 'pointer' }} {...focus}>
            <option value="" style={{ background: SLATE }}>Select...</option>
            <option value="10u"  style={{ background: SLATE }}>10U — Ages 8-10</option>
            <option value="14u"  style={{ background: SLATE }}>14U — Ages 11-14</option>
            <option value="both" style={{ background: SLATE }}>Both tracks</option>
          </select>
        </div>
      </div>
      <div>
        <label style={lStyle}>Message (Optional)</label>
        <textarea name="message" rows={3} value={form.message} onChange={handle}
          placeholder="Tell us about your school or any specific goals..."
          style={{ ...iStyle, resize: 'vertical', minHeight: '80px' }} {...focus} />
      </div>
      <button type="submit" disabled={loading} style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
        padding: '0.95rem', background: loading
          ? 'rgba(16,185,129,0.3)'
          : `linear-gradient(135deg, ${GREEN_D}, ${GREEN})`,
        border: 'none', borderRadius: '3px', color: WHITE, fontSize: '0.78rem', fontWeight: 800,
        letterSpacing: '0.12em', textTransform: 'uppercase' as const, cursor: loading ? 'wait' : 'pointer',
        fontFamily: SANS, boxShadow: loading ? 'none' : '0 4px 20px rgba(16,185,129,0.28)',
        transition: 'all 0.2s',
      }}>
        {loading ? (
          <>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              style={{ width: 13, height: 13, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: WHITE, borderRadius: '50%' }} />
            Sending...
          </>
        ) : <>Request a Workshop <ArrowUpRight size={13} /></>}
      </button>
    </form>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function FinancialLiteracyPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY       = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div style={{ background: SLATE, minHeight: '100vh', color: WHITE, fontFamily: SANS }}>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        @keyframes shimmerGreen {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes countUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        input[type=range] { height: 4px; border-radius: 2px; }
      ` }} />

      {/* ── Hero ──────────────────────────────────────── */}
      <section ref={heroRef} className="relative overflow-hidden"
        style={{ paddingTop: '5rem', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>

        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg, #060C10 0%, #0F172A 55%, #091510 100%)' }} />
          {/* Green glow — money energy */}
          <div style={{ position: 'absolute', top: '10%', left: '-5%', width: '55%', height: '70%', background: 'radial-gradient(ellipse, rgba(16,185,129,0.1) 0%, transparent 65%)' }} />
          <div style={{ position: 'absolute', bottom: '5%', right: '-5%', width: '40%', height: '50%', background: 'radial-gradient(ellipse, rgba(37,99,235,0.08) 0%, transparent 65%)' }} />
          {/* Grid */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(16,185,129,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.03) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />
          {/* Vertical accent lines */}
          {[20, 42, 65, 82].map(pct => (
            <div key={pct} style={{ position: 'absolute', top: 0, left: `${pct}%`, width: '1px', height: '100%', background: 'linear-gradient(180deg, transparent, rgba(16,185,129,0.07), transparent)' }} />
          ))}
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative w-full">
          <div className="mx-auto max-w-7xl px-6 lg:px-12 py-20">
            <motion.div variants={stagger} initial="hidden" animate="visible">

              {/* Breadcrumb */}
              <motion.div variants={fadeIn} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                <Link href="/programs" style={{ fontSize: '0.68rem', color: SLATE_3, textDecoration: 'none', fontWeight: 600, letterSpacing: '0.08em' }}>Programs</Link>
                <ChevronRight size={12} color={SLATE_3} />
                <span style={{ fontSize: '0.68rem', color: GREEN, fontWeight: 700, letterSpacing: '0.08em' }}>Financial Literacy</span>
              </motion.div>

              {/* Eyebrow badges */}
              <motion.div variants={fadeIn} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', marginBottom: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 0.875rem', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '2px' }}>
                  <DollarSign size={11} color={GREEN} />
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: GREEN }}>Financial Literacy Program</span>
                </div>
                <div style={{ padding: '0.375rem 0.75rem', background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.22)', borderRadius: '2px' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: ROYAL_L }}>Ages 8–14</span>
                </div>
                <div style={{ padding: '0.375rem 0.75rem', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '2px' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: GOLD }}>8-Week Intensive</span>
                </div>
              </motion.div>

              {/* Headline */}
              <motion.div variants={fadeUp} style={{ marginBottom: '1.75rem' }}>
                <h1 style={{ fontFamily: DISPLAY, fontSize: 'clamp(3.5rem, 8.5vw, 8rem)', lineHeight: 0.88, letterSpacing: '0.015em', color: WHITE, marginBottom: '0.2rem' }}>
                  MONEY
                </h1>
                <h1 style={{
                  fontFamily: DISPLAY, fontSize: 'clamp(3.5rem, 8.5vw, 8rem)', lineHeight: 0.88, letterSpacing: '0.015em',
                  background: `linear-gradient(135deg, ${GREEN} 0%, ${GREEN_L} 45%, ${GREEN} 100%)`,
                  backgroundSize: '200% auto', WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  animation: 'shimmerGreen 4s linear infinite', marginBottom: '0.2rem',
                }}>MASTERY.</h1>
                <h1 style={{ fontFamily: DISPLAY, fontSize: 'clamp(3.5rem, 8.5vw, 8rem)', lineHeight: 0.88, letterSpacing: '0.015em', color: `${WHITE}33` }}>
                  FOR KIDS.
                </h1>
              </motion.div>

              <motion.p variants={fadeUp} style={{ fontSize: '1.1rem', lineHeight: 1.8, color: MUTED, maxWidth: '580px', marginBottom: '2.5rem' }}>
                The financial knowledge most adults were never taught —
                compound interest, budgeting, investing, credit — delivered
                to K-12 students before they ever have a bank account.
                Because the best time to learn money is before you need it.
              </motion.p>

              {/* Stat strip */}
              <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginBottom: '2.5rem' }}>
                {[
                  { val: '57%',  lbl: 'of adults financially illiterate', color: GREEN   },
                  { val: '8',    lbl: 'modules, 8 weeks',                  color: ROYAL_L },
                  { val: '2.3x', lbl: 'literacy score improvement',        color: GOLD    },
                ].map(({ val, lbl, color }) => (
                  <div key={lbl} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ fontFamily: DISPLAY, fontSize: '2.2rem', lineHeight: 1, letterSpacing: '0.04em', color }}>{val}</span>
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: MUTED }}>{lbl}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="#workshop" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.95rem 2rem', background: `linear-gradient(135deg, ${GREEN_D}, ${GREEN})`, border: 'none', borderRadius: '3px', color: WHITE, fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, textDecoration: 'none', boxShadow: '0 4px 24px rgba(16,185,129,0.3)' }}>
                  Request a Workshop <ArrowUpRight size={14} />
                </Link>
                <Link href="/curriculum" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.95rem 1.75rem', background: 'transparent', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '3px', color: GREEN, fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, textDecoration: 'none' }}>
                  Full Curriculum <ChevronRight size={13} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}>
          <div style={{ height: '2.5rem', width: '1px', background: `linear-gradient(180deg, ${GREEN}, transparent)` }} />
        </motion.div>
      </section>

      {/* ── The Problem ───────────────────────────────── */}
      <div style={{ borderTop: '1px solid rgba(16,185,129,0.1)', borderBottom: '1px solid rgba(16,185,129,0.1)', background: 'rgba(16,185,129,0.02)' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-14">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1px', background: 'rgba(16,185,129,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
            {STATS.map((s, i) => (
              <FadeIn key={s.lbl} delay={i * 0.08}>
                <div style={{ background: SLATE, padding: '1.75rem', textAlign: 'center' }}
                  onMouseEnter={e => { e.currentTarget.style.background = SLATE_2; }}
                  onMouseLeave={e => { e.currentTarget.style.background = SLATE; }}
                >
                  <p style={{ fontFamily: DISPLAY, fontSize: '2.8rem', color: s.accent, lineHeight: 1, letterSpacing: '0.03em', marginBottom: '0.5rem' }}>{s.val}</p>
                  <p style={{ fontSize: '0.75rem', color: MUTED, lineHeight: 1.5, fontWeight: 500 }}>{s.lbl}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* ── Compound Interest Simulator ───────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <FadeIn className="mb-10">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'end' }}>
            <div>
              <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: GREEN, marginBottom: '0.5rem' }}>
                Why We Start at Age 10
              </p>
              <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', lineHeight: 0.95, letterSpacing: '0.02em', color: WHITE }}>
                TIME IS THE<br /><span style={{ color: GREEN }}>ONLY VARIABLE</span><br />THAT MATTERS.
              </h2>
            </div>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: MUTED }}>
              The difference between starting at 10 and starting at 35 is not
              discipline, income, or intelligence. It is time. Our simulator shows
              students exactly what 25 extra years of compounding looks like —
              in real dollars. Drag the slider to see the impact of your choices.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <CompoundVisualizer />
        </FadeIn>
      </section>

      {/* ── 8-Week Curriculum ─────────────────────────── */}
      <section style={{ background: 'rgba(15,23,42,0.5)', borderTop: '1px solid rgba(16,185,129,0.08)', borderBottom: '1px solid rgba(16,185,129,0.08)' }}>
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
          <FadeIn className="mb-12">
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div>
                <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: GREEN, marginBottom: '0.5rem' }}>8-Week Curriculum</p>
                <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', lineHeight: 0.95, letterSpacing: '0.02em', color: WHITE }}>
                  WHAT WE TEACH.<br /><span style={{ color: GREEN }}>WEEK BY WEEK.</span>
                </h2>
              </div>
              <p style={{ fontSize: '0.85rem', color: MUTED, maxWidth: '300px', lineHeight: 1.7 }}>
                Each module builds on the last. By Week 8 students have a complete financial literacy foundation that most adults never develop.
              </p>
            </div>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {MODULES.map((mod, i) => {
              const Icon = mod.icon;
              return (
                <FadeIn key={mod.title} delay={i * 0.07}>
                  <div
                    style={{ background: 'rgba(15,23,42,0.7)', border: `1px solid ${mod.accent}22`, borderRadius: '4px', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', transition: 'border-color 0.25s, transform 0.25s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${mod.accent}55`; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = `${mod.accent}22`; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    <div style={{ height: '2px', background: `linear-gradient(90deg, ${mod.accent}, transparent)` }} />
                    <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <div style={{ width: '40px', height: '40px', background: `${mod.accent}15`, border: `1px solid ${mod.accent}30`, borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: mod.accent }}>
                          <Icon size={18} />
                        </div>
                        <div style={{ padding: '0.2rem 0.6rem', background: `${mod.accent}12`, border: `1px solid ${mod.accent}25`, borderRadius: '2px', fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: mod.accent }}>
                          {mod.week}
                        </div>
                      </div>
                      <h3 style={{ fontFamily: DISPLAY, fontSize: '1.4rem', letterSpacing: '0.04em', color: WHITE, lineHeight: 1 }}>{mod.title.toUpperCase()}</h3>
                      <p style={{ fontSize: '0.8rem', lineHeight: 1.7, color: MUTED, flex: 1 }}>{mod.desc}</p>
                      <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {mod.skills.map((skill, si) => (
                          <li key={si} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                            <CheckCircle size={11} color={mod.accent} style={{ flexShrink: 0, marginTop: '3px' }} />
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

      {/* ── Outcomes + FAQ ────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem' }}>

          {/* Outcomes */}
          <div>
            <FadeIn>
              <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: GREEN, marginBottom: '0.5rem' }}>What Students Graduate With</p>
              <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', lineHeight: 0.95, letterSpacing: '0.02em', color: WHITE, marginBottom: '1.5rem' }}>
                REAL TOOLS.<br /><span style={{ color: GREEN }}>NOT WORKSHEETS.</span>
              </h2>
            </FadeIn>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {[
                { icon: Wallet,     label: 'Personal Budget Template',        desc: 'A completed, personalized monthly budget they built themselves.' },
                { icon: TrendingUp, label: '10-Year Wealth Projection',        desc: 'A real investment model showing their projected net worth at 25, 35, and 65.' },
                { icon: BarChart3,  label: 'Mock Investment Portfolio',        desc: 'A tracked $10,000 hypothetical portfolio they managed over 4 weeks.' },
                { icon: Award,      label: 'YIC Financial Literacy Certificate', desc: 'A formal credential recognizing completion of the 8-week program.' },
                { icon: Target,     label: 'Financial Pitch Delivered',        desc: 'A live presentation of their personal financial plan to a real panel.' },
              ].map(({ icon: Icon, label, desc }, i) => (
                <FadeIn key={label} delay={i * 0.07}>
                  <div style={{ display: 'flex', gap: '1rem', padding: '1.125rem', background: 'rgba(15,23,42,0.5)', border: '1px solid rgba(16,185,129,0.1)', borderRadius: '3px', transition: 'border-color 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(16,185,129,0.28)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(16,185,129,0.1)'; }}
                  >
                    <div style={{ width: '36px', height: '36px', flexShrink: 0, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: GREEN }}>
                      <Icon size={15} />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.85rem', fontWeight: 700, color: WHITE, marginBottom: '2px' }}>{label}</p>
                      <p style={{ fontSize: '0.75rem', lineHeight: 1.55, color: MUTED }}>{desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div>
            <FadeIn>
              <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: ROYAL_L, marginBottom: '0.5rem' }}>Common Questions</p>
              <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', lineHeight: 0.95, letterSpacing: '0.02em', color: WHITE, marginBottom: '1.5rem' }}>
                GOOD QUESTIONS<br /><span style={{ color: ROYAL_L }}>DESERVE ANSWERS.</span>
              </h2>
            </FadeIn>
            <div style={{ borderTop: '1px solid rgba(37,99,235,0.1)' }}>
              {FAQS.map((faq, i) => <FAQItem key={i} faq={faq} index={i} />)}
            </div>

            {/* Pull quote */}
            <FadeIn delay={0.3} className="mt-8">
              <div style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(15,23,42,0.9))', border: '1px solid rgba(16,185,129,0.18)', borderRadius: '4px', padding: '1.75rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: '0 0 0 0', borderLeft: `3px solid ${GREEN}`, borderRadius: '4px 0 0 4px', pointerEvents: 'none' }} />
                <p style={{ fontFamily: SERIF, fontSize: '1.05rem', fontStyle: 'italic', color: WHITE, lineHeight: 1.65, marginBottom: '0.75rem' }}>
                  "A student asked me after Week 3 why her parents were not teaching
                  her this. I did not have a good answer. That is exactly why this
                  program exists."
                </p>
                <cite style={{ fontSize: '0.68rem', fontStyle: 'normal', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: GREEN }}>
                  — YIC Financial Literacy Instructor
                </cite>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Workshop CTA ──────────────────────────────── */}
      <section id="workshop" style={{ background: SLATE_2, borderTop: '1px solid rgba(16,185,129,0.1)' }}>
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start' }}>
            <FadeIn>
              <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: GREEN, marginBottom: '0.875rem' }}>
                Bring It to Your School
              </p>
              <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 0.92, letterSpacing: '0.02em', color: WHITE, marginBottom: '1rem' }}>
                REQUEST A WORKSHOP<br /><span style={{ color: GREEN }}>FOR YOUR SCHOOL.</span>
              </h2>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: MUTED, marginBottom: '1.75rem', maxWidth: '440px' }}>
                The Financial Literacy program can be running in your school
                within 30 days. Zero cost to students. Full instructor support.
                Age-appropriate for both 10U and 14U tracks.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {[
                  'Certified YIC financial literacy instructor',
                  'All curriculum materials and calculators included',
                  'Age-tiered content for 10U and 14U',
                  'Student financial plans reviewed by instructor',
                  'Pitch Day coordinated and hosted by YIC',
                  'Zero cost to students or families',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
                    <CheckCircle size={14} color={GREEN} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.82rem', color: MUTED, lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(16,185,129,0.18)', borderRadius: '4px', padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: '0 0 auto 0', height: '2px', background: `linear-gradient(90deg, ${GREEN}, transparent)` }} />
                <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: GREEN, marginBottom: '1.25rem' }}>
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