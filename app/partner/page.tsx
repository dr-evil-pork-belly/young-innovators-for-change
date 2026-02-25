'use client';

import { useState, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useInView,
  type Variants,
} from 'framer-motion';
import {
  ArrowUpRight, Check, ChevronDown, Zap, Shield, Crown,
  Building2, Mail, User, Phone, MessageSquare, Send,
  TrendingUp, BookOpen, Award, Users
} from 'lucide-react';
import Link from 'next/link';

// ─── Tokens ───────────────────────────────────────────────────────────────────
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

// ─── Variants ─────────────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
};
const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};

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

// ─── Investment Tier Data ─────────────────────────────────────────────────────
const TIERS = [
  {
    id:       'seed',
    icon:     Zap,
    tier:     'Seed Partner',
    amount:   '$1,000',
    tagline:  'Plant the seed of change.',
    accent:   ROYAL_L,
    accentBg: 'rgba(59,130,246,0.08)',
    accentBorder: 'rgba(59,130,246,0.25)',
    featured: false,
    impact: 'Sponsors a Glendora Pilot cohort of 25 students',
    perks: [
      'Sponsors 25 students for one full 8-week cohort',
      'Named sponsor in program materials',
      'Quarterly impact report with student outcomes',
      'Invitation to virtual pitch day showcase',
      'Logo placement on YIC digital presence',
    ],
    roi: '25 students x 8 weeks = 200 hours of elite education',
  },
  {
    id:       'series-a',
    icon:     Shield,
    tier:     'Series A Sponsor',
    amount:   '$5,000',
    tagline:  'Scale what works.',
    accent:   GOLD,
    accentBg: 'rgba(201,168,76,0.08)',
    accentBorder: 'rgba(201,168,76,0.3)',
    featured: true,
    impact:   'Funds an entire district pilot across 3 schools',
    perks: [
      'Funds a full 3-school district pilot program',
      'Dedicated impact dashboard with live metrics',
      'Speaking slot at our Annual Innovation Summit',
      'Co-branded press release and media coverage',
      'Executive briefing with Founder Cindy Ha',
      'Named in all district-level communications',
    ],
    roi: '125 students across 3 schools -- one full semester',
  },
  {
    id:       'founding',
    icon:     Crown,
    tier:     'Founding Circle',
    amount:   '$10,000+',
    tagline:  'Shape the movement.',
    accent:   ROYAL_L,
    accentBg: 'rgba(59,130,246,0.08)',
    accentBorder: 'rgba(59,130,246,0.25)',
    featured: false,
    impact:   'Establishes a permanent district partnership',
    perks: [
      'Establishes a permanent named district partnership',
      'Seat on the YIC Advisory Council',
      'Custom curriculum integration with your brand',
      'Annual gala table for 8 executives',
      'Exclusive Founding Circle recognition permanently',
      'First right of refusal on national expansion naming',
      'Bi-annual strategic meetings with leadership team',
    ],
    roi: 'Permanent legacy -- 500+ students per year, every year',
  },
];

// ─── FAQ Data ─────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'What exactly is the Elite MBA curriculum?',
    a: 'Our 8-week curriculum mirrors the core pillars of top MBA programs, condensed and age-adapted for K-12 students. Each cohort covers Leadership and Executive Presence, Venture Building (students launch a real micro-business), Financial Literacy (budgeting, investing, compounding), and Public Speaking and Pitch Skills. Students leave with a business plan, a pitch deck, and real entrepreneurial experience.',
  },
  {
    q: 'How is this different from existing financial literacy programs?',
    a: 'Most financial literacy programs are worksheet-based and passive. YIC is experiential -- students build and pitch real ventures, make real financial decisions, and receive feedback from real business professionals. We bring the MBA case-study method into K-12 classrooms. The result is 100% engagement rates vs. the industry average of 34%.',
  },
  {
    q: 'Which districts are currently served?',
    a: 'We are currently active across 5+ districts in the greater Los Angeles area, with the Glendora Unified School District serving as our flagship pilot. Our 2025-2026 roadmap targets 20+ districts. Corporate partners receive early access to expansion districts and can co-select target communities aligned with their CSR strategy.',
  },
  {
    q: 'How are partnership funds used?',
    a: 'Funds are allocated directly to program delivery: curriculum materials (18%), instructor compensation (52%), district coordination (15%), and impact measurement (15%). We maintain full financial transparency -- every partner at Series A level and above receives a dedicated impact dashboard showing exactly how their investment is deployed.',
  },
  {
    q: 'Is this a tax-deductible contribution?',
    a: 'Young Innovators for Change is a registered 501(c)(3) nonprofit organization. All contributions are tax-deductible to the full extent permitted by law. Upon completing your partnership, you will receive a formal acknowledgment letter for tax purposes. We recommend consulting your tax advisor for specific guidance.',
  },
  {
    q: 'Can corporations integrate their brand into the curriculum?',
    a: 'Yes -- Founding Circle partners have the option to co-develop branded curriculum modules, sponsor a named Innovation Lab within a school, or integrate real-world case studies from their industry. This creates authentic CSR storytelling while delivering genuine educational value to students.',
  },
];

// ─── Tier Card ────────────────────────────────────────────────────────────────
function TierCard({ tier, index }: { tier: typeof TIERS[number]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const Icon   = tier.icon;

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.12 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col"
      style={{
        background:    hovered
          ? 'linear-gradient(160deg, rgba(30,41,59,0.95), rgba(15,23,42,0.95))'
          : 'rgba(15,23,42,0.7)',
        border:        `1px solid ${hovered ? tier.accent : tier.accentBorder}`,
        borderRadius:  '4px',
        padding:       tier.featured ? '2.5rem' : '2rem',
        transition:    'all 0.35s ease',
        boxShadow:     hovered ? '0 24px 60px rgba(0,0,0,0.5)' : 'none',
        transform:     hovered ? 'translateY(-4px)' : 'translateY(0)',
        backdropFilter: 'blur(16px)',
      }}
    >
      {tier.featured && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <div style={{
            background: `linear-gradient(135deg, ${GOLD}, ${GOLD_L})`,
            color: SLATE, fontSize: '0.6rem', fontWeight: 800,
            letterSpacing: '0.18em', textTransform: 'uppercase' as const,
            padding: '0.3rem 1rem', borderRadius: '2px', whiteSpace: 'nowrap' as const,
          }}>
            Most Popular
          </div>
        </div>
      )}

      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: `linear-gradient(90deg, transparent, ${tier.accent}, transparent)`,
        opacity: hovered ? 1 : 0.4, transition: 'opacity 0.3s',
      }} />

      <div className="mb-6 flex items-start justify-between">
        <div style={{
          width: '44px', height: '44px', background: tier.accentBg,
          border: `1px solid ${tier.accentBorder}`, borderRadius: '3px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: tier.accent,
        }}>
          <Icon size={20} />
        </div>
        <div style={{
          fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em',
          textTransform: 'uppercase' as const, color: tier.accent,
          padding: '0.3rem 0.75rem', background: tier.accentBg,
          border: `1px solid ${tier.accentBorder}`, borderRadius: '2px',
        }}>
          {tier.tier}
        </div>
      </div>

      <div className="mb-1">
        <span style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: '3.5rem', letterSpacing: '0.02em', color: WHITE, lineHeight: 1 }}>
          {tier.amount}
        </span>
      </div>
      <p style={{ fontSize: '0.85rem', color: MUTED, marginBottom: '1rem' }}>{tier.tagline}</p>

      <div style={{
        background: tier.accentBg, border: `1px solid ${tier.accentBorder}`,
        borderRadius: '3px', padding: '0.75rem 1rem', marginBottom: '1.5rem',
        display: 'flex', alignItems: 'flex-start', gap: '0.5rem',
      }}>
        <TrendingUp size={14} color={tier.accent} style={{ flexShrink: 0, marginTop: '2px' }} />
        <p style={{ fontSize: '0.8rem', fontWeight: 600, color: WHITE, lineHeight: 1.5 }}>{tier.impact}</p>
      </div>

      <ul className="flex flex-col gap-2.5 mb-6 flex-1">
        {tier.perks.map((perk, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <div style={{
              width: '16px', height: '16px', flexShrink: 0, background: tier.accentBg,
              border: `1px solid ${tier.accentBorder}`, borderRadius: '2px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1px',
            }}>
              <Check size={9} color={tier.accent} strokeWidth={3} />
            </div>
            <span style={{ fontSize: '0.8rem', color: MUTED, lineHeight: 1.55 }}>{perk}</span>
          </li>
        ))}
      </ul>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem', marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '0.7rem', color: tier.accent, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: '0.25rem' }}>
          Your Impact
        </p>
        <p style={{ fontSize: '0.78rem', color: MUTED, lineHeight: 1.5 }}>{tier.roi}</p>
      </div>

      <Link href={`/partner?tier=${tier.id}`} style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
        padding: '0.875rem',
        background: tier.featured ? `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_L} 50%, ${GOLD} 100%)` : tier.accentBg,
        border: `1px solid ${tier.featured ? GOLD : tier.accentBorder}`,
        borderRadius: '2px', color: tier.featured ? SLATE : tier.accent,
        fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em',
        textTransform: 'uppercase' as const, textDecoration: 'none', transition: 'all 0.25s ease',
      }}>
        Get Started <ArrowUpRight size={13} />
      </Link>
    </motion.div>
  );
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
function FAQItem({ faq, index }: { faq: typeof FAQS[number]; index: number }) {
  const [open, setOpen] = useState(false);
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden"
      animate={inView ? 'visible' : 'hidden'} transition={{ delay: index * 0.07 }}
      style={{ borderBottom: '1px solid rgba(37,99,235,0.1)', overflow: 'hidden' }}
    >
      <button onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-5 text-left"
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <span style={{ fontSize: '0.95rem', fontWeight: 600, color: open ? WHITE : '#CBD5E1', transition: 'color 0.2s', paddingRight: '2rem', lineHeight: 1.5 }}>
          {faq.q}
        </span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25, ease: 'easeOut' }}
          style={{ flexShrink: 0, color: open ? ROYAL_L : SLATE_3 }}>
          <ChevronDown size={18} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeOut' }}>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.8, color: MUTED, paddingBottom: '1.5rem', paddingRight: '2.5rem' }}>
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [form, setForm] = useState({ name: '', title: '', org: '', email: '', phone: '', tier: '', message: '' });

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'rgba(15,23,42,0.7)',
    border: '1px solid rgba(37,99,235,0.18)', borderRadius: '3px',
    padding: '0.875rem 1rem', color: WHITE, fontSize: '0.875rem',
    outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s', fontFamily: 'inherit',
  };
  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '0.7rem', fontWeight: 700,
    letterSpacing: '0.15em', textTransform: 'uppercase', color: MUTED, marginBottom: '0.5rem',
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
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center"
        style={{ background: 'rgba(15,23,42,0.7)', border: '1px solid rgba(37,99,235,0.2)', borderRadius: '4px', padding: '3rem' }}
      >
        <div style={{ width: '56px', height: '56px', background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <Check size={24} color={ROYAL_L} />
        </div>
        <h3 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: '2rem', color: WHITE, marginBottom: '0.75rem', letterSpacing: '0.06em' }}>
          PROSPECTUS REQUESTED
        </h3>
        <p style={{ fontSize: '0.9rem', color: MUTED, lineHeight: 1.7, maxWidth: '340px' }}>
          Thank you. Cindy Ha or a member of our partnerships team will be in touch within 1 business day.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label style={labelStyle}><span className="flex items-center gap-1.5"><User size={10} /> Full Name</span></label>
          <input name="name" required value={form.name} onChange={handle} placeholder="Jane Smith" style={inputStyle} {...focus} />
        </div>
        <div>
          <label style={labelStyle}><span className="flex items-center gap-1.5"><Award size={10} /> Title</span></label>
          <input name="title" value={form.title} onChange={handle} placeholder="Chief Strategy Officer" style={inputStyle} {...focus} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label style={labelStyle}><span className="flex items-center gap-1.5"><Building2 size={10} /> Organization</span></label>
          <input name="org" required value={form.org} onChange={handle} placeholder="Acme Corp / GUSD" style={inputStyle} {...focus} />
        </div>
        <div>
          <label style={labelStyle}><span className="flex items-center gap-1.5"><Mail size={10} /> Work Email</span></label>
          <input name="email" type="email" required value={form.email} onChange={handle} placeholder="jane@acmecorp.com" style={inputStyle} {...focus} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label style={labelStyle}><span className="flex items-center gap-1.5"><Phone size={10} /> Phone (Optional)</span></label>
          <input name="phone" type="tel" value={form.phone} onChange={handle} placeholder="+1 (555) 000-0000" style={inputStyle} {...focus} />
        </div>
        <div>
          <label style={labelStyle}><span className="flex items-center gap-1.5"><Zap size={10} /> Investment Tier</span></label>
          <select name="tier" value={form.tier} onChange={handle} style={{ ...inputStyle, cursor: 'pointer' }} {...focus}>
            <option value="" style={{ background: SLATE }}>Select a tier...</option>
            <option value="seed"     style={{ background: SLATE }}>Seed Partner -- $1,000</option>
            <option value="series-a" style={{ background: SLATE }}>Series A Sponsor -- $5,000</option>
            <option value="founding" style={{ background: SLATE }}>Founding Circle -- $10,000+</option>
            <option value="custom"   style={{ background: SLATE }}>Custom / District Partnership</option>
          </select>
        </div>
      </div>
      <div>
        <label style={labelStyle}><span className="flex items-center gap-1.5"><MessageSquare size={10} /> Message (Optional)</span></label>
        <textarea name="message" rows={4} value={form.message} onChange={handle}
          placeholder="Tell us about your organization, goals, or any questions..."
          style={{ ...inputStyle, resize: 'vertical', minHeight: '110px' }} {...focus} />
      </div>
      <button type="submit" disabled={loading} style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
        padding: '1rem 2rem',
        background: loading ? 'rgba(37,99,235,0.3)' : `linear-gradient(135deg, ${ROYAL_D} 0%, ${ROYAL_L} 100%)`,
        border: 'none', borderRadius: '3px', color: WHITE, fontSize: '0.8rem', fontWeight: 700,
        letterSpacing: '0.12em', textTransform: 'uppercase' as const,
        cursor: loading ? 'wait' : 'pointer', transition: 'all 0.25s ease', fontFamily: 'inherit',
        boxShadow: loading ? 'none' : '0 4px 24px rgba(37,99,235,0.3)',
      }}>
        {loading ? (
          <>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: WHITE, borderRadius: '50%' }} />
            Sending...
          </>
        ) : (
          <>Request Prospectus <Send size={13} /></>
        )}
      </button>
      <p style={{ fontSize: '0.7rem', color: SLATE_3, textAlign: 'center', lineHeight: 1.6 }}>
        We never share your information with third parties.
      </p>
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PartnerPage() {
  return (
    <div style={{ background: SLATE, minHeight: '100vh', color: WHITE }}>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '55%', height: '80%', background: 'radial-gradient(ellipse, rgba(37,99,235,0.14) 0%, transparent 70%)' }} />
          <div style={{ position: 'absolute', bottom: 0, right: '-5%', width: '40%', height: '60%', background: 'radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(37,99,235,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.03) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.div variants={fadeUp} className="mb-5 flex items-center gap-3">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 0.875rem', background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.25)', borderRadius: '2px' }}>
                <TrendingUp size={11} color={ROYAL_L} />
                <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: ROYAL_L }}>Partnership and Investment</span>
              </div>
            </motion.div>
            <motion.h1 variants={fadeUp} style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 'clamp(3rem, 7vw, 6.5rem)', lineHeight: 0.92, letterSpacing: '0.02em', color: WHITE, marginBottom: '1.5rem', maxWidth: '900px' }}>
              INVEST IN THE <span style={{ color: ROYAL_L }}>NEXT GENERATION</span> OF LEADERS.
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: '1.05rem', lineHeight: 1.75, color: MUTED, maxWidth: '560px', marginBottom: '2.5rem' }}>
              Three investment tiers. One mission. Choose the level of impact that aligns with your organization and watch a generation rise.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-6">
              {[
                { icon: Users,    val: '1,200+',   lbl: 'Students Served' },
                { icon: BookOpen, val: '5+',       lbl: 'Active Districts' },
                { icon: Award,    val: '501(c)(3)', lbl: 'Tax Deductible'  },
              ].map(({ icon: Icon, val, lbl }) => (
                <div key={lbl} className="flex items-center gap-2">
                  <Icon size={14} color={ROYAL_L} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: WHITE }}>{val}</span>
                  <span style={{ fontSize: '0.75rem', color: MUTED }}>{lbl}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tiers */}
      <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-12">
        <Reveal className="mb-12">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="label-eyebrow mb-2" style={{ color: ROYAL_L }}>Investment Tiers</p>
              <h2 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: WHITE, lineHeight: 1, letterSpacing: '0.03em' }}>
                CHOOSE YOUR LEVEL OF IMPACT
              </h2>
            </div>
            <p style={{ fontSize: '0.85rem', color: MUTED, maxWidth: '320px', lineHeight: 1.65 }}>
              Every tier is a direct line between your investment and a student future. No overhead bloat -- funds go straight to programs.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">
          {TIERS.map((tier, i) => <TierCard key={tier.id} tier={tier} index={i} />)}
        </div>
        <Reveal delay={0.3} className="mt-8">
          <div style={{ background: 'rgba(30,41,59,0.4)', border: '1px solid rgba(37,99,235,0.12)', borderRadius: '4px', padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p style={{ fontSize: '0.9rem', fontWeight: 600, color: WHITE, marginBottom: '0.25rem' }}>School District or Government Partner?</p>
              <p style={{ fontSize: '0.8rem', color: MUTED }}>We offer custom institutional partnerships with grant-compatible structures and multi-year agreements.</p>
            </div>
            <Link href="#contact" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.25)', borderRadius: '3px', color: ROYAL_L, fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, textDecoration: 'none' }}>
              Let us Talk <ArrowUpRight size={12} />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Form + FAQ */}
      <section id="contact" style={{ background: 'rgba(15,23,42,0.6)', borderTop: '1px solid rgba(37,99,235,0.1)' }}>
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-12">
          <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
            <div>
              <Reveal>
                <p className="label-eyebrow mb-3" style={{ color: ROYAL_L }}>Request a Prospectus</p>
                <h2 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', color: WHITE, lineHeight: 0.95, letterSpacing: '0.03em', marginBottom: '0.75rem' }}>
                  START THE CONVERSATION.
                </h2>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: MUTED, marginBottom: '2rem' }}>
                  Fill out the form and our partnerships team will send you a full investment prospectus within 1 business day.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <div style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(37,99,235,0.15)', borderRadius: '4px', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
                  <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${ROYAL_L}, transparent)` }} />
                  <ContactForm />
                </div>
              </Reveal>
            </div>
            <div>
              <Reveal>
                <p className="label-eyebrow mb-3" style={{ color: ROYAL_L }}>Common Questions</p>
                <h2 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', color: WHITE, lineHeight: 0.95, letterSpacing: '0.03em', marginBottom: '0.75rem' }}>
                  EVERYTHING YOU NEED TO KNOW.
                </h2>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: MUTED, marginBottom: '2rem' }}>
                  Answers to the questions every executive and school administrator asks before partnering with Young Innovators for Change.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <div style={{ borderTop: '1px solid rgba(37,99,235,0.1)' }}>
                  {FAQS.map((faq, i) => <FAQItem key={i} faq={faq} index={i} />)}
                </div>
              </Reveal>
              <Reveal delay={0.2} className="mt-10">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: Shield, label: '501(c)(3) Verified' },
                    { icon: Award,  label: 'Full Transparency'  },
                    { icon: Users,  label: '1-Day Response'     },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} style={{ background: 'rgba(30,41,59,0.5)', border: '1px solid rgba(37,99,235,0.12)', borderRadius: '3px', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', textAlign: 'center' }}>
                      <Icon size={16} color={ROYAL_L} />
                      <span style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUTED }}>{label}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}