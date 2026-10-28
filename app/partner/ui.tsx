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
  BookOpen, Users, Laptop
} from 'lucide-react';
import Link from 'next/link';
import { useContactForm } from '@/components/useContactForm';
import {
  ORG, PUBLIC_RECORDS, TRANSPARENCY, PROGRAM_FACTS, DELIVERY, RESEARCH,
  taxLine, trustBadges, fmtDate, spellOut, addressLines,
  hasOutcomeStats, hasTestimonials, hasAdvisors,
} from '@/content/org';
import { PUBLISHED_WEEKS, PUBLISHED_YEARS } from '@/content/published';

// ─── Tokens ───────────────────────────────────────────────────────────────────
// From the kit, not redeclared here.
import { INK, PAPER, BODY, SUBTLE, CONNECT, CONNECT_INK, GROW_INK, BAND } from '@/components/kit';

/** The one study on this site that tests whether what a child learns reaches
 *  the household, and in which households. Read off the citation list rather
 *  than typed, so the author and year here cannot drift from the entry the
 *  pathway page renders in full, with its limits. */
const SPILLOVER = RESEARCH.find((c) => c.authors === 'Veronica Frisancho');

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
 * Funding is invited here since 22 October 2026, the day Form CT-1 went to the
 * California Registry of Charities and Fundraisers (`TRANSPARENCY.caRegistryFiled`).
 * Since 28 October 2026 the ask is to foundations and institutional funders
 * only; the individual "make a gift" asks were removed site-wide. Two limits
 * still hold:
 *
 *   1. There is no online payment form, and no page should imply one. A grant
 *      starts as a conversation through the contact form.
 *   2. The real cost of the program has not been computed (open decision 8).
 *      No dollar figure, per student or per anything, appears on this page
 *      until it is a number somebody calculated.
 *
 * The previous version of this page carried three sponsorship tiers with
 * invented perks, an invented budget allocation, and a hardcoded "5+ Active
 * Districts". See 06-what-went-wrong.md. Do not reintroduce a benefits list:
 * benefits given in exchange for a payment create quid pro quo disclosure
 * obligations, and brand integration crosses from acknowledgment into
 * advertising, which is taxable.
 */

// ─── What has been built. Every entry comes from org.ts. ──────────────────────
const HERO_FACT_LABELS = ['Weeks of Lessons', 'Cost to Students', 'Free to Download'];
const HERO_FACTS = PROGRAM_FACTS.filter((f) => HERO_FACT_LABELS.includes(f.label));

// ─── Ways to work with us. None of these involve a payment. ───────────────────
const LANES = [
  // Until 16 October 2026 this lane offered a Grade 2 classroom pilot, with
  // printing included and a page of its own at /for-schools. That page is
  // retired and the lane now says what is actually being asked of a district:
  // design the implementation with us. The teachers hand out the books. Since
  // 21 October 2026 the second lane asks for the Grade 7 app pilot instead of
  // a summer cohort. The entry criterion is unchanged and is OPT_IN: wanting
  // to do it.
  {
    id:    'schools',
    icon:  BookOpen,
    label: 'Schools and districts',
    title: 'Design the implementation with us',
    body:  'Every workbook and teacher guide is finished, mapped to California standards, and free today. We are looking for districts to work out the rest with: how the books reach classrooms, which teachers run them, and how those teachers let the students who want more know the Grades 7 to 12 program exists. Wanting to be there is the whole entry requirement.',
    href:  '#contact',
    cta:   'Start that conversation',
  },
  {
    id:    'pilot',
    icon:  Laptop,
    label: 'Districts and middle schools',
    title: 'Host the first pilot',
    body:  `${DELIVERY.pilot.ask} Each district gives a teacher to sponsor it, a room for `
         + 'the in-person sessions, and a signed student data privacy agreement. It costs a '
         + 'district nothing. Cindy Ha, the founder, brings in the speakers and sets dates '
         + 'with each school.'
         + (DELIVERY.pilot.preview.live
           ? ' Grade 7 is built, Grade 8 is there as a draft, and educators can try both now '
             + 'with a passcode from us.'
           : ''),
    href:  '/teachers',
    cta:   'Read the ask',
    // Only once the preview answers at its address (DELIVERY.pilot.preview.live).
    extra: DELIVERY.pilot.preview.live
      ? { href: DELIVERY.pilot.preview.url, cta: 'Try the web app (passcode)' }
      : undefined,
  },
  // Until 28 October 2026 this lane was "Make a founding gift", addressed to
  // donors of every size, and the individuals lane below invited a gift too.
  // Both asks came out: there is no way to give online, and the funding the
  // organization is pursuing is institutional. This lane is for grantmakers.
  {
    id:    'fund',
    icon:  Building2,
    label: 'Foundations and institutional funders',
    title: 'Fund the first pilot year',
    body:  'The first pilot year is where a grant does the most: the app and the tutor, the in-person sessions, and the study that shows whether any of this works. We are looking for foundation and institutional partners, including one able to underwrite the whole first year. There are no outcome numbers to show you yet. What we can show you is the finished curriculum, the evaluation design we have committed to in public, and a clean record you can check without asking us. Tell us what you would need to see.',
    href:  '#contact',
    cta:   'Talk to us about a grant',
  },
  {
    id:    'individuals',
    icon:  Users,
    label: 'Individuals',
    title: 'Open a door',
    body:  'The materials are free and stay free. The most useful thing you can do is forward this to one teacher, principal or program officer who should see it.',
    href:  '#contact',
    cta:   'Introduce us to someone',
  },
];

// ─── What we are not claiming. Driven by the flags in org.ts, so each line ────
// ─── disappears on its own when it stops being true. ──────────────────────────
const NOT_CLAIMING: string[] = [
  ...(!hasOutcomeStats
    ? ['No program of ours has run with students. We publish no outcome statistics, no engagement figures, and no claim about test scores.']
    : []),
  'No usage figures. Teachers have told us they use the free material, but an inbox is not a roster, so there is no number here and no estimate.',
  'No district, school or city named as a user. A teacher downloading a free PDF has not asked to be associated with us, and neither has her employer.',
  'No partner districts. We have not delivered a program in a school, and we will not name a district we do not serve.',
  ...(!hasTestimonials
    ? ['No testimonials. A quote goes on this site only with written permission from the speaker, or a guardian for a minor.']
    : []),
  ...(!hasAdvisors
    ? ['No advisory board. A person is named only after agreeing in writing, with a title they would state themselves.']
    : []),
  'No credential of any kind. We grant no degree, no credit, no certificate, and hold no articulation with any institution.',
];

// ─── FAQ. Every answer traces to org.ts or a public record. ───────────────────
const FAQS = [
  {
    q: 'What has been built?',
    a: `${spellOut(PUBLISHED_YEARS.length)} complete 36-week years of curriculum, `
     + `${PUBLISHED_WEEKS} weeks in all, across mathematics, science, entrepreneurship `
     + 'and financial literacy. Each year is a student workbook plus a teacher guide, mapped '
     + 'to California standards and free on the resources page. Grade 7, the first year of '
     + 'the Grades 7 to 12 program, is also built: all eight units run in our web app with '
     + 'Pip, the AI tutor, in a passcode preview for educators. Grade 8 is there as a '
     + 'draft. Grades 9 to 12 come next.',
  },
  {
    q: 'Who delivers this to students?',
    a: 'For the elementary years, not us. A teacher, an aide or a caretaker does, and that '
     + 'is the half of the work that decides whether a child learns anything. We publish '
     + 'with no login and no email wall, so we cannot see who is doing it. The one program '
     + 'we intend to run ourselves is Grades 7 to 12: self-paced lessons in our web app with '
     + 'Pip, and in-person speaker sessions that Cindy Ha organizes with each school. We are '
     + 'looking for districts to host the first pilot.',
  },
  {
    q: 'Has any of it been taught to students?',
    a: 'Yes, and we can tell you almost nothing about it. Teachers have written to say they are using the material, homeschool educators among them. We do not know how many there are, where they teach, or how far anyone has gone, because nothing we publish asks for a name. What has not happened is a program with a roster and a measurement plan. A first partner is funding that, not joining something already running.',
  },
  {
    q: 'How does a foundation start a conversation?',
    a: 'Write to us through the form on this page, or at ' + ORG.contactEmail + '. Tell us your program area and what you would need to see, and we will send it if it exists or say so if it does not. We filed with the California Attorney General’s Registry of Charities and Fundraisers in October 2026. We have not finished computing what the program costs, so we put no price on a student or a school here; when that number is done it goes on this page with the math shown.',
  },
  {
    q: 'What do funders get in return?',
    a: 'Recognition by name, and nothing else. No branded curriculum, no exclusive rights, no advertising, no seat with authority over what gets taught. That is a deliberate limit.',
  },
  {
    q: 'What is your tax status?',
    a: `${taxLine() ?? ''} Every grant is acknowledged in writing for your records.`,
  },
  {
    q: 'How can I check that this organization is what it says it is?',
    a: 'Every claim about the corporation on this site is in a public record you can pull up without asking us. The records section above has the EIN, the California entity number, and links to both search tools. If something does not match, tell us and we will fix it.',
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
      id={lane.id}
      className="relative flex flex-col"
      style={{
        scrollMarginTop: '6rem',
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
      {lane.extra && (
        <a href={lane.extra.href} target="_blank" rel="noopener noreferrer" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.9rem',
          color: ROYAL_L, fontSize: '0.75rem', fontWeight: 700,
          letterSpacing: '0.1em', textTransform: 'uppercase' as const, textDecoration: 'none',
        }}>
          {lane.extra.cta} <Laptop size={13} />
        </a>
      )}
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
          Thank you. A person reads that inbox, not an autoresponder. In the meantime,
          everything we have built is free to take.
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
            <motion.p variants={fadeUp} style={{ fontSize: '1.05rem', lineHeight: 1.75, color: MUTED, maxWidth: '620px', marginBottom: '2rem' }}>
              {spellOut(PUBLISHED_YEARS.length)} finished school years, {PUBLISHED_WEEKS} weeks of material, free to anyone, and teachers already using them. From Grade 7, a web app with an AI tutor named Pip, open to educators in a preview. What we cannot show you is a single measured classroom, because no program with a roster has run. Closing that gap is the only thing we are asking anyone for.
            </motion.p>
            <motion.p variants={fadeUp} style={{ fontSize: '0.95rem', lineHeight: 1.75, color: MUTED, maxWidth: '620px', marginBottom: '2.5rem' }}>
              This page leads with what we are not claiming, then the public record, then a form. If you are doing diligence, everything you need is on the way down.
            </motion.p>
            {/* A funding page with no button in its hero. Diligence readers scroll;
                the ones who already know what they want should not have to. */}
            <motion.div variants={fadeUp} className="mb-10 flex flex-wrap items-center gap-3">
              <Link href="#contact" className="btn-primary">
                Write to us <ArrowUpRight size={14} />
              </Link>
              <Link href="/impact" className="btn-secondary">
                See the evaluation design <ArrowUpRight size={14} />
              </Link>
            </motion.div>
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

      {/* Who it is for. Written 16 October 2026 for the retired /for-schools
          page as "Who the pilots are for" and moved here the same day when
          that page went. The policy is unchanged; only the word "pilot" is
          gone, because there was no pilot then. What we place our own money and
          attention in is the district work and, since 21 October 2026, the Grade 7
          app pilot. */}
      <section id="who" style={{ background: BAND, borderTop: '1px solid rgba(45,91,227,0.1)' }}>
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <p className="label-eyebrow mb-3" style={{ color: GROW_INK }}>Who it is for</p>
              <h2 style={{ fontFamily: "'Baloo 2 Variable', 'Baloo 2', 'Trebuchet MS', Verdana, sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', color: WHITE, lineHeight: 1.06, letterSpacing: '-0.01em', marginBottom: '1rem' }}>
                Any school can download it. We work in lower-income districts.
              </h2>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: MUTED, maxWidth: '40ch' }}>
                We get asked, kindly and often, to bring the program first to schools whose
                families could buy this education several times over. The answer is no. Here
                is why.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.85, color: MUTED, marginBottom: '1.1rem' }}>
                The workbooks are free to any teacher, anywhere. We do not ask who downloads
                them and we do not restrict them.
              </p>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.85, color: MUTED, marginBottom: '1.1rem' }}>
                Our own money and attention go to public school districts in{' '}
                {ORG.serviceArea} where most students qualify for free or reduced-price
                meals. The best evidence we have found shows financial education working in
                lower-income households, with a measurable spillover to parents, and barely
                at all in higher-income ones
                {SPILLOVER && (
                  <>
                    {' '}(<a href={SPILLOVER.url} target="_blank" rel="noopener noreferrer"
                      style={{ color: GROW_INK }}>{SPILLOVER.authors}, {SPILLOVER.year}</a>; our
                    reading of it, limits included, is on the{' '}
                    <Link href="/pathway#research" style={{ color: GROW_INK }}>pathway page</Link>)
                  </>
                )}. Children whose parents run businesses will usually learn this at home. The
                children we are built for will not, unless someone brings it to them.
              </p>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.85, color: WHITE, marginBottom: '1.5rem' }}>
                If you lead a school that does not fit that description, download the
                materials. They are yours. If you want to help us reach the districts we are
                built for, an introduction to a superintendent in one is the most useful thing
                you can offer.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#contact" className="btn-primary">
                  Introduce us to a superintendent <ArrowUpRight size={14} />
                </a>
                <Link href="/resources" className="btn-secondary">
                  Download the books <ArrowUpRight size={14} />
                </Link>
              </div>
            </Reveal>
          </div>
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
                  A funder who finds one inflated claim rereads every other claim differently, including the true ones. So this list comes before the pitch.
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
              <RecordRow label="Registered office" value={addressLines(ORG.address).join(', ')} />
              <RecordRow label="Mailing address" value={addressLines(ORG.mailingAddress).join(', ')} />
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
                  Say hello in three lines.
                </h2>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: MUTED, marginBottom: '2rem' }}>
                  Who you are, what you are looking at, and what would be useful. This form goes to a monitored inbox, not a ticket system. Tell us what you need to see and we will send it if it exists, or say so if it does not.
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
