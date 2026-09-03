'use client';

import { useState, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useInView,
  type Variants,
} from 'framer-motion';
import {
  ArrowUpRight, Check, ChevronDown, Shield, FileText, ExternalLink,
  Building2, Mail, User, Phone, MessageSquare, Send,
  BookOpen, Users, Sun
} from 'lucide-react';
import Link from 'next/link';
import { useContactForm } from '@/components/useContactForm';
import {
  ORG, PUBLIC_RECORDS, TRANSPARENCY, PROGRAM_FACTS, DELIVERY,
  taxLine, trustBadges, fmtDate, spellOut,
  hasOutcomeStats, hasTestimonials, hasAdvisors,
} from '@/content/org';
import { PUBLISHED_WEEKS, PUBLISHED_YEARS } from '@/content/published';

// ─── Tokens ───────────────────────────────────────────────────────────────────
// From the kit, not redeclared here.
import { INK, PAPER, BODY, SUBTLE, CONNECT, CONNECT_INK } from '@/components/kit';

const ROYAL_L = CONNECT;
const ROYAL_D = CONNECT_INK;
const SLATE   = PAPER;
const SLATE_3 = SUBTLE;
const MUTED   = BODY;
const WHITE   = INK;

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

/**
 * ─── A NOTE ON THIS PAGE ─────────────────────────────────────────────────────
 *
 * This page does not solicit money and it must not start doing so until two
 * things are true, both tracked in 05-open-decisions.md:
 *
 *   1. Form CT-1 is filed with the California Registry of Charities and
 *      Fundraisers. California charities register within 30 days of first
 *      receiving charitable assets. `TRANSPARENCY.caRegistryConfirmed` is the
 *      flag; it is false today.
 *   2. The real cost of one classroom for one year has been computed and put
 *      into `content/org.ts`. No dollar figure appears on this page until it
 *      is a number somebody calculated.
 *
 * The previous version of this page carried three sponsorship tiers with
 * invented perks, an invented budget allocation, and a hardcoded "5+ Active
 * Districts". See 06-what-went-wrong.md. Do not reintroduce a benefits list:
 * benefits given in exchange for a payment create quid pro quo disclosure
 * obligations, and brand integration crosses from acknowledgment into
 * advertising, which is taxable.
 */

// ─── What has been built. Every entry comes from org.ts. ──────────────────────
const HERO_FACT_LABELS = ['Weeks of Curriculum', 'Cost to Students', 'Materials Open'];
const HERO_FACTS = PROGRAM_FACTS.filter((f) => HERO_FACT_LABELS.includes(f.label));

// ─── Ways to work with us. None of these involve a payment. ───────────────────
const LANES = [
  {
    id:    'schools',
    icon:  BookOpen,
    label: 'Schools and districts',
    title: 'Host the first measured classroom',
    body:  'Every workbook and teacher guide is finished, mapped to California standards, and free to download today, and teachers are already using them on their own. What does not exist is a classroom running one with a roster, a pre and post, and somebody watching. We are looking for the first few.',
    href:  '/for-schools',
    cta:   'What a pilot involves',
  },
  {
    id:    'summer',
    icon:  Sun,
    label: 'Districts and high schools',
    title: 'Host the first cohort',
    body:  `${DELIVERY.summerIntensive.ask} Eight weeks of one summer: a room, a schedule, `
         + 'and permission to teach. Nothing is bought and nothing past that summer is '
         + 'signed for, though what we are building is four of them with the same '
         + 'students. Cindy Ha, the founder, will teach the first herself rather than hand '
         + 'a district a binder and wish it luck.',
    href:  '/teachers',
    cta:   'Read the ask',
  },
  {
    id:    'funders',
    icon:  Building2,
    label: 'Foundations and grantmakers',
    title: 'Fund the first cohorts',
    body:  'We are pre-cohort. There are no outcome numbers to show you and we are not going to pretend otherwise. What we can show you is the curriculum, the evaluation design we have committed to, and a complete public record. Start a conversation and we will send whatever you need to assess us.',
    href:  '#contact',
    cta:   'Start a conversation',
  },
  {
    id:    'individuals',
    icon:  Users,
    label: 'Individuals',
    title: 'Open a door',
    body:  'The materials are free and they stay free, so there is nothing to buy. The most useful thing anyone can offer right now is an introduction to a teacher or a principal who might want to try a year of this with their students.',
    href:  '#contact',
    cta:   'Get in touch',
  },
];

// ─── What we are not claiming. Driven by the flags in org.ts, so each line ────
// ─── disappears on its own when it stops being true. ──────────────────────────
const NOT_CLAIMING: string[] = [
  ...(!hasOutcomeStats
    ? ['No cohort has run. We publish no outcome statistics, no engagement figures, and no claim about test scores.']
    : []),
  'No usage figures. Teachers have told us they use the free material and we are glad of it, but an inbox is not a roster, so there is no number here and there will not be an estimate.',
  'No district, school or city named as a user of these materials. A teacher downloading a free PDF has not asked to be associated with us, and neither has her employer.',
  'No partner districts. We have not delivered a program in a school, and we will not name a district we do not serve.',
  ...(!hasTestimonials
    ? ['No testimonials. A quote goes on this site only with written permission from the speaker, or from a guardian for a minor.']
    : []),
  ...(!hasAdvisors
    ? ['No advisory board. A person is named only after agreeing in writing, with a current title they would state themselves.']
    : []),
  'No credential of any kind. Young Innovators for Change grants no degree, no credit, no certificate, and holds no articulation with any institution.',
];

// ─── FAQ. Every answer traces to org.ts or a public record. ───────────────────
const FAQS = [
  {
    q: 'What has actually been built?',
    a: `${spellOut(PUBLISHED_YEARS.length)} complete 36-week years of curriculum, `
     + `${PUBLISHED_WEEKS} weeks in all, across mathematics, entrepreneurship and `
     + 'financial literacy. Each year is a student workbook plus a teacher guide, mapped '
     + 'to California standards, and each is on the resources page as a free download. '
     + 'Nothing is behind a form or a fee.',
  },
  {
    q: 'Who delivers this to students?',
    a: 'Not us, for the elementary years. A teacher, an instructional aide or a caretaker '
     + 'does, and that is the half of this work that decides whether a child learns '
     + 'anything. We publish with no login and no email wall, so we cannot see who is '
     + 'doing it and we will not describe them on this site as though we could. The one '
     + 'program we intend to run ourselves is the high school summer intensive, one cohort '
     + 'returning for four consecutive summers, which Cindy Ha will teach herself for the '
     + 'first cohort. We are still looking for a district willing to host it.',
  },
  {
    q: 'Has any of it been taught to students?',
    a: 'Yes, and we can tell you almost nothing about it. Teachers have written to say they are using the material with their classes, homeschool educators among them. We do not know how many there are, where they teach, or how far anyone has gone, because nothing we publish asks for a name, and we are not going to estimate a figure and present it as one. What has not happened is a delivered program with a roster and a measurement plan attached. A first partner is funding that, not joining something already running.',
  },
  {
    q: 'Why is there no way to donate on this page?',
    a: 'Two reasons, both procedural. California charities register with the Attorney General’s Registry of Charities and Fundraisers before soliciting, and that filing is not yet complete. And we have not finished computing what a classroom actually costs, so any figure we put here would be a guess. Both are being worked on. Until then, if you want to fund this, write to us and we will talk directly.',
  },
  {
    q: 'What do supporters get in return?',
    a: 'Recognition by name, and nothing else. No branded curriculum, no exclusive rights, no advertising, no seat that carries authority over what gets taught. Curriculum decisions stay with the organization. This is a deliberate limit rather than an oversight.',
  },
  {
    q: 'Is a contribution tax-deductible?',
    a: `${taxLine() ?? ''} Any contribution is acknowledged in writing for your records, and we recommend consulting your own tax advisor.`,
  },
  {
    q: 'How can I check that this organization is what it says it is?',
    a: 'Every claim about the corporation on this site is in a public record you can pull up without asking us for anything. The records section above has the EIN, the California entity number, and links to the two search tools. If something does not match, tell us and we will fix it.',
  },
];

// ─── Lane Card ────────────────────────────────────────────────────────────────
function LaneCard({ lane, index }: { lane: typeof LANES[number]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const Icon   = lane.icon;

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
        background:     hovered ? '#FFFFFF' : '#FFFFFF',
        border:         `1px solid ${hovered ? ROYAL_L : 'rgba(45,91,227,0.18)'}`,
        borderRadius:   '4px',
        padding:        '2rem',
        transition:     'all 0.35s ease',
        transform:      hovered ? 'translateY(-3px)' : 'translateY(0)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <div className="mb-5 flex items-center gap-3">
        <div style={{
          width: '40px', height: '40px', background: 'rgba(45,91,227,0.08)',
          border: '1px solid rgba(45,91,227,0.25)', borderRadius: '3px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: ROYAL_L,
        }}>
          <Icon size={18} />
        </div>
        <span style={{
          fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em',
          textTransform: 'uppercase' as const, color: ROYAL_L,
        }}>
          {lane.label}
        </span>
      </div>

      <h3 style={{
        fontFamily: "'Baloo 2 Variable', 'Baloo 2', 'Trebuchet MS', Verdana, sans-serif", fontSize: '1.75rem',
        letterSpacing: '-0.01em', color: WHITE, lineHeight: 1.05, marginBottom: '0.85rem',
      }}>
        {lane.title}
      </h3>

      <p style={{ fontSize: '0.875rem', color: MUTED, lineHeight: 1.7, flex: 1, marginBottom: '1.75rem' }}>
        {lane.body}
      </p>

      <Link href={lane.href} style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
        color: ROYAL_L, fontSize: '0.75rem', fontWeight: 700,
        letterSpacing: '0.1em', textTransform: 'uppercase' as const, textDecoration: 'none',
      }}>
        {lane.cta} <ArrowUpRight size={13} />
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
      style={{ borderBottom: '1px solid rgba(45,91,227,0.1)', overflow: 'hidden' }}
    >
      <button onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-5 text-left"
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <span style={{ fontSize: '0.95rem', fontWeight: 600, color: open ? ROYAL_D : WHITE, transition: 'color 0.2s', paddingRight: '2rem', lineHeight: 1.5 }}>
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

// ─── Public record row ────────────────────────────────────────────────────────
function RecordRow({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      gap: '1.5rem', padding: '0.85rem 0', borderBottom: '1px solid rgba(45,91,227,0.1)',
    }}>
      <span style={{
        fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em',
        textTransform: 'uppercase' as const, color: MUTED, flexShrink: 0,
      }}>
        {label}
      </span>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" style={{
          fontSize: '0.85rem', color: ROYAL_L, textAlign: 'right',
          display: 'inline-flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none',
        }}>
          {value} <ExternalLink size={11} />
        </a>
      ) : (
        <span style={{ fontSize: '0.85rem', color: WHITE, textAlign: 'right' }}>{value}</span>
      )}
    </div>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const { form, handle, submit, submitted, loading, error, trap, setTrap } =
    useContactForm({ name: '', title: '', org: '', email: '', phone: '', role: '', message: '' }, 'Partner inquiry', '/partner');

  const inputStyle: React.CSSProperties = {
    width: '100%', background: '#FFFFFF',
    border: '1px solid rgba(45,91,227,0.18)', borderRadius: '3px',
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
      e.target.style.boxShadow   = '0 0 0 3px rgba(45,91,227,0.1)';
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      e.target.style.borderColor = 'rgba(45,91,227,0.18)';
      e.target.style.boxShadow   = 'none';
    },
  };

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center"
        style={{ background: '#FFFFFF', border: '1px solid rgba(45,91,227,0.2)', borderRadius: '4px', padding: '3rem' }}
      >
        <div style={{ width: '56px', height: '56px', background: 'rgba(45,91,227,0.1)', border: '1px solid rgba(45,91,227,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <Check size={24} color={ROYAL_L} />
        </div>
        <h3 style={{ fontFamily: "'Baloo 2 Variable', 'Baloo 2', 'Trebuchet MS', Verdana, sans-serif", fontSize: '2rem', color: WHITE, marginBottom: '0.75rem', letterSpacing: '-0.01em' }}>
          Message sent
        </h3>
        <p style={{ fontSize: '0.9rem', color: MUTED, lineHeight: 1.7, maxWidth: '340px' }}>
          Thank you. Your message reached us and someone will read it.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      <input type="text" name="company_website" value={trap} onChange={e => setTrap(e.target.value)}
        tabIndex={-1} autoComplete="off" aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }} />
      {error && (
        <p role="alert" style={{ fontSize: '0.8rem', lineHeight: 1.6, color: '#B42318',
          background: 'rgba(180,35,24,0.12)', border: '1px solid rgba(180,35,24,0.35)',
          borderRadius: '3px', padding: '0.7rem 0.9rem' }}>{error}</p>
      )}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label style={labelStyle}><span className="flex items-center gap-1.5"><User size={10} /> Full Name</span></label>
          <input name="name" required value={form.name} onChange={handle} placeholder="Jane Smith" style={inputStyle} {...focus} />
        </div>
        <div>
          <label style={labelStyle}><span className="flex items-center gap-1.5"><Building2 size={10} /> Organization (Optional)</span></label>
          <input name="org" value={form.org} onChange={handle} placeholder="School, foundation, or company" style={inputStyle} {...focus} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label style={labelStyle}><span className="flex items-center gap-1.5"><Mail size={10} /> Email</span></label>
          <input name="email" type="email" required value={form.email} onChange={handle} placeholder="jane@example.org" style={inputStyle} {...focus} />
        </div>
        <div>
          <label style={labelStyle}><span className="flex items-center gap-1.5"><Phone size={10} /> Phone (Optional)</span></label>
          <input name="phone" type="tel" value={form.phone} onChange={handle} placeholder="+1 (555) 000-0000" style={inputStyle} {...focus} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label style={labelStyle}><span className="flex items-center gap-1.5"><Users size={10} /> Title (Optional)</span></label>
          <input name="title" value={form.title} onChange={handle} placeholder="Principal, program officer, teacher" style={inputStyle} {...focus} />
        </div>
        <div>
          <label style={labelStyle}><span className="flex items-center gap-1.5"><Shield size={10} /> Writing As</span></label>
          <select name="role" value={form.role} onChange={handle} style={{ ...inputStyle, cursor: 'pointer' }} {...focus}>
            <option value=""            style={{ background: SLATE }}>Select one...</option>
            <option value="school"      style={{ background: SLATE }}>A school or district</option>
            <option value="funder"      style={{ background: SLATE }}>A foundation or grantmaker</option>
            <option value="individual"  style={{ background: SLATE }}>An individual</option>
            <option value="other"       style={{ background: SLATE }}>Something else</option>
          </select>
        </div>
      </div>
      <div>
        <label style={labelStyle}><span className="flex items-center gap-1.5"><MessageSquare size={10} /> Message</span></label>
        <textarea name="message" rows={4} required value={form.message} onChange={handle}
          placeholder="Tell us what you have in mind, or what you would need to see from us."
          style={{ ...inputStyle, resize: 'vertical', minHeight: '110px' }} {...focus} />
      </div>
      {/* The only form on the site, and it used to be the only place with its own
          button color, its own corner radius and its own uppercase label. It is
          the same button as every other primary action now. */}
      <button type="submit" disabled={loading} className="btn-primary"
        style={{ width: '100%', padding: '0.95rem 2rem',
          opacity: loading ? 0.65 : 1, cursor: loading ? 'wait' : 'pointer' }}>
        {loading ? (
          <>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.35)', borderTopColor: '#FFFFFF', borderRadius: '50%' }} />
            Sending...
          </>
        ) : (
          <>Send message <Send size={14} /></>
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
  const badges = trustBadges();

  return (
    <div style={{ background: SLATE, minHeight: '100vh', color: WHITE }}>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ paddingTop: '8rem', paddingBottom: '5rem' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '55%', height: '80%', background: 'radial-gradient(ellipse, rgba(45,91,227,0.14) 0%, transparent 70%)' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(45,91,227,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(45,91,227,0.03) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.div variants={fadeUp} className="mb-5 flex items-center gap-3">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 0.875rem', background: 'rgba(45,91,227,0.1)', border: '1px solid rgba(45,91,227,0.25)', borderRadius: '2px' }}>
                <Users size={11} color={ROYAL_L} />
                <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: ROYAL_L }}>Partner With Us</span>
              </div>
            </motion.div>
            <motion.h1 variants={fadeUp} style={{ fontFamily: "'Baloo 2 Variable', 'Baloo 2', 'Trebuchet MS', Verdana, sans-serif", fontSize: 'clamp(3rem, 7vw, 6.5rem)', lineHeight: 1.06, letterSpacing: '-0.01em', color: WHITE, marginBottom: '1.5rem', maxWidth: '980px' }}>
              The curriculum is written. <span style={{ color: ROYAL_L }}>The evidence is not.</span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: '1.05rem', lineHeight: 1.75, color: MUTED, maxWidth: '620px', marginBottom: '2.5rem' }}>
              {spellOut(PUBLISHED_YEARS.length)} finished school years, {PUBLISHED_WEEKS} weeks of material, free to anyone who wants them, and teachers already using them. What we cannot show you is one measured classroom, because no program with a roster has run and nothing has been evaluated. That is the honest position, and it is the thing we are trying to change.
            </motion.p>
            {HERO_FACTS.length > 0 && (
              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-x-8 gap-y-3">
                {HERO_FACTS.map((fact) => (
                  <div key={fact.label} className="flex items-center gap-2">
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: WHITE }}>{fact.value}</span>
                    <span style={{ fontSize: '0.75rem', color: MUTED }}>{fact.label}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Lanes */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-12">
        <Reveal className="mb-10">
          <p className="label-eyebrow mb-2" style={{ color: ROYAL_L }}>Four ways in</p>
          <h2 style={{ fontFamily: "'Baloo 2 Variable', 'Baloo 2', 'Trebuchet MS', Verdana, sans-serif", fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: WHITE, lineHeight: 1.06, letterSpacing: '-0.01em' }}>
            What would actually help
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-stretch">
          {LANES.map((lane, i) => <LaneCard key={lane.id} lane={lane} index={i} />)}
        </div>
      </section>

      {/* What we are not claiming */}
      {NOT_CLAIMING.length > 0 && (
        <section style={{ background: '#FFFFFF', borderTop: '1px solid rgba(45,91,227,0.1)', borderBottom: '1px solid rgba(45,91,227,0.1)' }}>
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
              <Reveal>
                <p className="label-eyebrow mb-3" style={{ color: ROYAL_L }}>Read this first</p>
                <h2 style={{ fontFamily: "'Baloo 2 Variable', 'Baloo 2', 'Trebuchet MS', Verdana, sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', color: WHITE, lineHeight: 1.06, letterSpacing: '-0.01em', marginBottom: '1rem' }}>
                  What we are not claiming.
                </h2>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: MUTED, maxWidth: '38ch' }}>
                  A funder who finds one inflated claim rereads every other claim differently, including the true ones. So this list comes before the pitch rather than after it.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <ul className="flex flex-col gap-4">
                  {NOT_CLAIMING.map((line) => (
                    <li key={line} className="flex items-start gap-3">
                      <div style={{
                        width: '18px', height: '18px', flexShrink: 0, marginTop: '3px',
                        border: '1px solid rgba(45,91,227,0.3)', background: 'rgba(45,91,227,0.08)',
                        borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: ROYAL_L, fontSize: '0.7rem', fontWeight: 700, lineHeight: 1,
                      }} aria-hidden="true">
                        &times;
                      </div>
                      <span style={{ fontSize: '0.9rem', color: MUTED, lineHeight: 1.7 }}>{line}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* Public record */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="label-eyebrow mb-3" style={{ color: ROYAL_L }}>Check us</p>
              <h2 style={{ fontFamily: "'Baloo 2 Variable', 'Baloo 2', 'Trebuchet MS', Verdana, sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', color: WHITE, lineHeight: 1.06, letterSpacing: '-0.01em', marginBottom: '1rem' }}>
                The public record.
              </h2>
              {taxLine() && (
                <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: MUTED, marginBottom: '1.5rem', maxWidth: '46ch' }}>
                  {taxLine()}
                </p>
              )}
              {badges.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {badges.map((label) => (
                    <span key={label} style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                      background: '#FFFFFF', border: '1px solid rgba(45,91,227,0.15)',
                      borderRadius: '2px', padding: '0.45rem 0.7rem',
                      fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.06em',
                      textTransform: 'uppercase' as const, color: MUTED,
                    }}>
                      <Shield size={11} color={ROYAL_L} /> {label}
                    </span>
                  ))}
                </div>
              )}
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div style={{ background: '#FFFFFF', border: '1px solid rgba(45,91,227,0.15)', borderRadius: '4px', padding: '1.75rem 2rem' }}>
              <div className="mb-3 flex items-center gap-2">
                <FileText size={13} color={ROYAL_L} />
                <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: ROYAL_L }}>
                  Verifiable by anyone
                </span>
              </div>
              <RecordRow label="Legal name" value={ORG.legalName} />
              <RecordRow label="EIN" value={ORG.taxStatus.ein} href={PUBLIC_RECORDS.irsSearchUrl} />
              <RecordRow label="IRS determination" value={fmtDate(ORG.taxStatus.determinationDate)} />
              <RecordRow label="CA entity number" value={ORG.incorporation.entityNumber} href={PUBLIC_RECORDS.caBusinessSearchUrl} />
              <RecordRow label="Incorporated" value={fmtDate(ORG.incorporation.initialFilingDate)} />
              <RecordRow label="Entity type" value={ORG.incorporation.entityType} />
              {TRANSPARENCY.form990Filed && TRANSPARENCY.form990Form && (
                <RecordRow label="Latest filing" value={`${TRANSPARENCY.form990Form}, ${TRANSPARENCY.form990LatestPeriod}`} />
              )}
              <RecordRow label="Registered office" value={`${ORG.registeredAddress.line1}, ${ORG.registeredAddress.line2}`} />
              <RecordRow label="Programs aimed at" value={ORG.serviceArea} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Form + FAQ */}
      <section id="contact" style={{ background: '#FFFFFF', borderTop: '1px solid rgba(45,91,227,0.1)' }}>
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-12">
          <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
            <div>
              <Reveal>
                <p className="label-eyebrow mb-3" style={{ color: ROYAL_L }}>Get in touch</p>
                <h2 style={{ fontFamily: "'Baloo 2 Variable', 'Baloo 2', 'Trebuchet MS', Verdana, sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', color: WHITE, lineHeight: 1.06, letterSpacing: '-0.01em', marginBottom: '0.75rem' }}>
                  Start the conversation.
                </h2>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: MUTED, marginBottom: '2rem' }}>
                  Whether you run a classroom, a foundation, or neither, this form reaches us directly. Tell us what you would need to see and we will send it if it exists, or say so if it does not.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <div style={{ background: '#FFFFFF', border: '1px solid rgba(45,91,227,0.15)', borderRadius: '4px', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
                  <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${ROYAL_L}, transparent)` }} />
                  <ContactForm />
                </div>
              </Reveal>
            </div>
            <div>
              <Reveal>
                <p className="label-eyebrow mb-3" style={{ color: ROYAL_L }}>Common questions</p>
                <h2 style={{ fontFamily: "'Baloo 2 Variable', 'Baloo 2', 'Trebuchet MS', Verdana, sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', color: WHITE, lineHeight: 1.06, letterSpacing: '-0.01em', marginBottom: '0.75rem' }}>
                  The things people ask.
                </h2>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: MUTED, marginBottom: '2rem' }}>
                  Including the two that are least comfortable to answer.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <div style={{ borderTop: '1px solid rgba(45,91,227,0.1)' }}>
                  {FAQS.map((faq, i) => <FAQItem key={i} faq={faq} index={i} />)}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
