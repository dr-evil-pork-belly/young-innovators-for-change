'use client';

import { useRef } from 'react';
import {
  motion,
  useInView,
  type Variants,
} from 'framer-motion';
import { ArrowUpRight, GraduationCap, Users, MapPin, Star, ChevronRight, Laptop } from 'lucide-react';
import Link from 'next/link';
import { VERIFIED_STATS, PROGRAM_FACTS, FOUNDER, DELIVERY, usd, uscTwoYearTotal, spellOut } from '@/content/org';
import { PUBLISHED_WEEKS, PUBLISHED_YEARS } from '@/content/published';

// ─── Design tokens ────────────────────────────────────────────────────────────
// Taken from the kit rather than redeclared. This file used to carry its own
// copy of nine colors, which is how the home page and the rest of the site
// drifted apart in the first place.
import {
  INK, PAPER, CARD_BG, BAND, LINE, BODY, SUBTLE,
  CONNECT, CONNECT_INK, SPARK, SPARK_INK, GROW, SUN,
  DISPLAY, InkSlab,
} from '@/components/kit';

const ROYAL_L = CONNECT;
const ROYAL_D = CONNECT_INK;
const SLATE_3 = SUBTLE;
const MUTED   = BODY;
const WHITE   = INK;
const GOLD    = SPARK_INK;

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

// ─── What exists ──────────────────────────────────────────────────────────────
// Every figure here comes from content/org.ts. Outcome claims (students served,
// districts reached) render only once they are populated there with evidence
// behind them; until then this shows what is true about the work itself.
//
// This used to be a marquee that slid the same numbers past on an endless
// twenty-eight second loop. A figure a reader cannot hold still to read is not
// being reported to them, and two of the five were already in the hero. It is a
// list now.
const FACT_ITEMS = [...VERIFIED_STATS, ...PROGRAM_FACTS];

function WhatExists() {
  return (
    <div style={{ background: BAND, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10" style={{ paddingTop: '1.75rem', paddingBottom: '1.75rem' }}>
        <dl style={{ display: 'grid', gap: '1.25rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
          {FACT_ITEMS.map((item) => (
            <div key={item.label}>
              <dt style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: SUBTLE, marginBottom: '0.3rem' }}>
                {item.label}
              </dt>
              <dd style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: '1.9rem',
                lineHeight: 1.06, color: CONNECT_INK }}>
                {item.value}
              </dd>
              {item.note && (
                <p style={{ fontSize: '0.76rem', color: SUBTLE, marginTop: '0.3rem', lineHeight: 1.5 }}>
                  {item.note}
                </p>
              )}
            </div>
          ))}
        </dl>
      </div>
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
        background:   '#FFFFFF',
        border:       '1px solid rgba(45,91,227,0.15)',
        borderRadius: '4px',
        backdropFilter: 'blur(12px)',
        transition:   'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(45,91,227,0.4)';
        e.currentTarget.style.boxShadow   = '0 8px 32px rgba(45,91,227,0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(45,91,227,0.15)';
        e.currentTarget.style.boxShadow   = 'none';
      }}
    >
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-px" style={{
        background:    'linear-gradient(90deg, transparent, rgba(45,91,227,0.5), transparent)',
        borderRadius:  '4px 4px 0 0',
      }} />

      <div className="mb-3 flex h-10 w-10 items-center justify-center" style={{
        background:   'rgba(45,91,227,0.1)',
        border:       '1px solid rgba(45,91,227,0.2)',
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
function StatPill({ value, label, hue }: { value: string; label: string; hue: string }) {
  return (
    <div style={{ background: CARD_BG, border: `1px solid ${LINE}`, borderRadius: '10px',
      padding: '0.9rem 1rem', borderTop: `3px solid ${hue}` }}>
      <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: '1.9rem', lineHeight: 1.06,
        color: INK }}>
        {value}
      </div>
      <div style={{ fontSize: '0.72rem', fontWeight: 600, color: SUBTLE, marginTop: '0.3rem',
        lineHeight: 1.35 }}>
        {label}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div style={{ background: PAPER, minHeight: '100vh', color: BODY }}>

      {/* ══════════════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', overflow: 'hidden', background: CARD_BG,
        borderBottom: `1px solid ${LINE}` }}>
        {/* The three map colors from Week 17, which are the three brand colors. */}
        <div aria-hidden style={{ position: 'absolute', insetInline: 0, top: 0, height: '5px',
          background: `linear-gradient(90deg, ${CONNECT} 0 34%, ${SPARK} 34% 67%, ${GROW} 67% 100%)` }} />
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `radial-gradient(${LINE} 1.2px, transparent 1.2px)`,
          backgroundSize: '24px 24px', opacity: 0.75 }} />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10"
          style={{ paddingTop: 'clamp(2.5rem, 5vw, 4rem)', paddingBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <div className="hero-grid">
            <motion.div variants={stagger} initial="hidden" animate="visible" style={{ minWidth: 0 }}>

              <motion.p variants={fadeIn} className="label-eyebrow" style={{ marginBottom: '0.9rem' }}>
                Business, money, math and science for kids &middot; Free &middot; California 501(c)(3)
              </motion.p>

              {/* Rewritten 15 October 2026. The previous headline ("Some kids learn
                  how money works at home. The rest can download it here.") led
                  with the download, and the library had quietly become the front
                  door of a site whose reason to exist is the business line. The
                  mission in org.ts never changed; the home page had stopped
                  quoting it first. This headline states who it is for and what
                  they get, and the library appears third, as the proof the
                  thing is real rather than as the product.
                  Rewritten again 22 October 2026, when Grade 7 went into the web
                  app. The old line ("Some kids hear how business works at home.
                  The rest can start in third grade.") did not read cleanly, and
                  third grade was no longer the whole story. */}
              <motion.h1
                variants={fadeUp}
                style={{
                  fontFamily:    DISPLAY,
                  fontWeight:    800,
                  fontSize:      'clamp(2.5rem, 5.4vw, 4.6rem)',
                  lineHeight: 1.06,
                  letterSpacing: '-0.02em',
                  color:         INK,
                  marginBottom:  '1.25rem',
                  textWrap:      'balance',
                }}
              >
                Some kids grow up around business.{' '}
                <span style={{ color: CONNECT }}>Every kid can learn it.</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                style={{ fontSize: '1.05rem', lineHeight: 1.7, color: BODY, maxWidth: '56ch',
                  marginBottom: '1.25rem' }}
              >
                Price, cost, margin, risk, credit and ownership: the ideas a business school
                packs into two years for adults, spread across the years a child is already
                in school. Grades 3 to 6 run on printed workbooks, one assignment a week.
                From Grade 7 the lessons move to a web app with Pip, an AI tutor, and guest
                speakers in person. It is built for kids in lower-income communities who will
                not hear any of this at the dinner table, and it is free to anyone.
              </motion.p>

              <motion.p
                variants={fadeUp}
                style={{ fontSize: '1.05rem', lineHeight: 1.7, color: BODY, maxWidth: '56ch',
                  marginBottom: '1.9rem' }}
              >
                {spellOut(PUBLISHED_YEARS.length)} school years of workbooks are written and
                free today, with math and science for Grades 1 to 6 beside the business line.
                Grade 7 is written and open to educators as a preview. No program of ours has
                run with students yet, and this site says so wherever it matters. If you teach
                Grades 1 to 6, take a year and start Monday.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
                <Link href="/pathway" className="btn-primary">
                  See the ten-year pathway
                  <ArrowUpRight size={14} />
                </Link>
                <Link href="/resources" className="btn-secondary">
                  Take a year, free
                  <ChevronRight size={14} />
                </Link>
                <Link href="/teachers" className="btn-secondary">
                  See the Grade 7 app
                  <Laptop size={14} />
                </Link>
              </motion.div>

              {/* What has been built, not what it has achieved. */}
              <motion.div variants={fadeUp} className="hero-stats">
                <StatPill value={String(PUBLISHED_WEEKS)} label="Workbook weeks" hue={CONNECT} />
                <StatPill value={String(PUBLISHED_YEARS.length)} label="Workbook years" hue={GROW} />
                <StatPill value="$0" label="Price, to anyone" hue={SPARK} />
              </motion.div>
            </motion.div>

            <motion.div variants={fadeIn} initial="hidden" animate="visible" className="hero-art">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/pip/pip-wave.svg" alt="" aria-hidden
                style={{ width: 'min(320px, 100%)', height: 'auto', display: 'block' }} />
              <p style={{ fontSize: '0.78rem', color: SUBTLE, marginTop: '1rem', maxWidth: '30ch',
                textAlign: 'center' }}>
                This is Pip. Pip is a graph: one vertex, five edges, no loops. Pip is on the
                cover of all {PUBLISHED_YEARS.length} books, and an older Pip is the tutor in
                the Grade 7 app.
              </p>
            </motion.div>
          </div>
        </div>

        <style>{`
          .hero-grid { display: grid; gap: clamp(2rem, 5vw, 4rem); align-items: center;
                       grid-template-columns: minmax(0,1fr); }
          .hero-art  { display: none; }
          .hero-stats { display: grid; grid-template-columns: repeat(3, minmax(0,1fr));
                        gap: 0.75rem; margin-top: 2.25rem; max-width: 34rem; }
          @media (min-width: 960px) {
            .hero-grid { grid-template-columns: minmax(0,1fr) auto; }
            .hero-art  { display: flex; flex-direction: column; align-items: center;
                         justify-self: end; }
          }
        `}</style>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHAT EXISTS
      ══════════════════════════════════════════════════════ */}
      <WhatExists />

      {/* ══════════════════════════════════════════════════════
          MISSION STATEMENT INTERLUDE
      ══════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-28 lg:px-12">
        <RevealSection>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
            <div className="max-w-2xl">
              <p className="label-eyebrow mb-4" style={{ color: ROYAL_L }}>Our Mission</p>
              <h2 style={{
                fontFamily:    "'Baloo 2 Variable', 'Baloo 2', 'Trebuchet MS', Verdana, sans-serif",
                fontSize:      'clamp(2.5rem, 5vw, 4.5rem)',
                lineHeight: 1.06,
                letterSpacing: '-0.01em',
                color:         WHITE,
              }}>
                Adults pay<br />
                <span style={{ color: ROYAL_L }}>{usd(uscTwoYearTotal())} for this.</span><br />
                Nine-year-olds get it free.
              </h2>
            </div>
            <div className="max-w-sm">
              <p style={{ fontSize: '0.95rem', lineHeight: 1.75, color: MUTED, marginBottom: '1rem' }}>
                That is USC&rsquo;s own published figure for two years of a full-time MBA,
                and Stanford asks more. It buys you how pricing, capital and ownership work,
                at twenty-eight, on a payment plan. We write the same ideas for children,
                spread across their school years, and charge nobody.
              </p>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.75, color: MUTED, marginBottom: '1rem' }}>
                It is not a degree, and we say so at length. It is the material, ten years
                early, free, for the child whose family could not have handed it down. And
                for the family too: the student is meant to go home and teach it.
              </p>
              <Link href="/pathway" style={{ display: 'inline-flex', alignItems: 'center',
                gap: '0.4rem', fontSize: '0.8rem', fontWeight: 600, color: GOLD,
                textDecoration: 'none' }}>
                See which idea lands in which grade <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>
        </RevealSection>

        {/* Four strands, two tracks */}
        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2">
          {[
            /* Order matters. Business and money first, because they are the
               reason the organization exists; mathematics and science beside
               them, because they were built and are free, not because they
               are the mission. Reordered 15 October 2026. */
            { num: '01', title: 'Leadership & Venture', href: '/pathway', cta: 'The ten-year ladder',
              body: 'One student, one product, one market day. Then a team, a profit split written as fractions, and a rival who prices against you. Grades 4 to 6 are written and free. From Grade 7 it moves to our web app, with Pip the AI tutor and guest speakers in person. Grade 7 is in preview for educators; Grades 8 to 12 come next.' },
            { num: '02', title: 'Financial Literacy', href: '/programs/financial-literacy', cta: 'The four money years',
              body: 'A child’s own money first, then a plan, then the gap between a price and a cost, then the numbers other people put in front of them. Grades 3 to 6 are written and free, and from Grade 7 it continues in the web app. This is knowledge that usually arrives through a family, which is why it belongs in a school.' },
            { num: '03', title: 'Mathematics', href: '/programs/discrete-math', cta: 'The six years',
              body: 'Sorting, maps, proofs, routes and rules, beside the state curriculum rather than on top of it. Six complete years, Grades 1 to 6, standards-mapped and free today. It asks for reasoning rather than speed, so it reaches the child still shaky on regrouping.' },
            { num: '04', title: 'Science', href: '/curriculum', cta: 'Where it sits on the map',
              body: 'Investigation-led, almost no materials cost, printable in black and white. Six years, Grades 1 to 6, written and free: plants, sound and light; land and materials; causes and fair tests; energy; particles and ecosystems; systems from a cell to the climate. Grades 7 and 8 are deliberately unwritten, and high school science is not written yet.' },
          ].map((pillar, i) => (
            <RevealSection key={pillar.num} delay={i * 0.1}>
              <div
                className="group relative p-8 h-full"
                style={{
                  background:   '#FFFFFF',
                  border:       '1px solid rgba(45,91,227,0.12)',
                  borderRadius: '4px',
                  transition:   'border-color 0.3s, background 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(45,91,227,0.35)';
                  e.currentTarget.style.background  = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(45,91,227,0.12)';
                  e.currentTarget.style.background  = '#FFFFFF';
                }}
              >
                {/* The index used to be a 56px ghost at 12% opacity: 1.2:1, and a screen
                    reader read it out as a number nobody could see. It is a real,
                    readable label now. */}
                <span style={{
                  fontFamily:    "'Public Sans Variable', 'Public Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                  fontSize:      '0.75rem',
                  fontWeight:    700,
                  letterSpacing: '0.14em',
                  color:         CONNECT_INK,
                  display:       'block',
                  marginBottom:  '0.75rem',
                }}>
                  {pillar.num}
                </span>
                <h3 style={{
                  fontFamily:    "'Baloo 2 Variable', 'Baloo 2', 'Trebuchet MS', Verdana, sans-serif",
                  fontSize:      '1.8rem',
                  letterSpacing: '-0.01em',
                  color:         WHITE,
                  marginBottom:  '0.75rem',
                }}>
                  {pillar.title}
                </h3>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: MUTED }}>
                  {pillar.body}
                </p>
                {/* This was a "Learn more" div that linked nowhere, on all four
                    cards, on the home page. It is a real destination now, and it
                    names what is on the other side of it. */}
                <Link href={pillar.href} className="mt-6 flex items-center gap-2"
                  style={{ color: ROYAL_L, fontSize: '0.75rem', fontWeight: 600,
                    letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}>
                  {pillar.cta} <ArrowUpRight size={12} />
                </Link>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          THE DELIVERY ARGUMENT
          The curriculum is the half we can do alone. This section exists
          because the site described the material on eleven pages and the
          person delivering it on none. See DELIVERY in content/org.ts: no
          sentence here claims to know who is teaching this, because the
          downloads carry no email wall and the log is a count, not a roster.
      ══════════════════════════════════════════════════════ */}
      <section style={{
        background:  '#FFFFFF',
        borderTop:    '1px solid rgba(255,122,61,0.18)',
        borderBottom: '1px solid rgba(255,122,61,0.18)',
      }}>
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-12">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-start">

            <RevealSection>
              <p className="label-eyebrow mb-4" style={{ color: GOLD }}>The half we did not write</p>
              <h2 style={{
                fontFamily:    "'Baloo 2 Variable', 'Baloo 2', 'Trebuchet MS', Verdana, sans-serif",
                fontSize:      'clamp(2.4rem, 5vw, 4.4rem)',
                lineHeight: 1.06,
                letterSpacing: '-0.01em',
                color:         WHITE,
                marginBottom:  '1.5rem',
              }}>
                A workbook has<br />
                <span style={{ color: GOLD }}>never taught</span><br />
                anyone anything.
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: 1.8, color: MUTED, marginBottom: '1.25rem' }}>
                {DELIVERY.claim}
              </p>
              <p style={{ fontSize: '1rem', lineHeight: 1.8, color: MUTED, marginBottom: '2rem' }}>
                {DELIVERY.inUse.known} We could not tell you their names, because nothing we
                publish asks for one. What we can tell you is that if a child has learned one
                thing from these pages, an adult did that. Not the paper, and not us.
              </p>
              <Link href="/teachers" className="btn-gold" style={{ fontSize: '0.8rem', display: 'inline-flex' }}>
                If you teach, this page is for you
                <ArrowUpRight size={13} />
              </Link>
            </RevealSection>

            <div className="flex flex-col gap-4">
              {DELIVERY.models.map((m, i) => {
                const live   = m.status === 'published';
                const accent = live ? ROYAL_L : GOLD;
                return (
                  <RevealSection key={m.band} delay={0.1 + i * 0.1}>
                    <div style={{
                      background:   '#FFFFFF',
                      border:       `1px solid ${accent}30`,
                      borderRadius: '4px',
                      padding:      '1.6rem 1.75rem',
                      height:       '100%',
                    }}>
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <span style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.16em',
                          textTransform: 'uppercase', color: accent }}>{m.band}</span>
                        <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em',
                          textTransform: 'uppercase', color: live ? ROYAL_L : MUTED,
                          border: `1px solid ${live ? ROYAL_L : SLATE_3}66`, borderRadius: '2px',
                          padding: '0.18rem 0.42rem' }}>
                          {m.badge}
                        </span>
                      </div>
                      <p style={{ fontFamily: "'Baloo 2 Variable', 'Baloo 2', 'Trebuchet MS', Verdana, sans-serif", fontSize: '1.5rem',
                        letterSpacing: '-0.01em', color: WHITE, lineHeight: 1.05, marginBottom: '0.7rem' }}>
                        {m.shape}
                      </p>
                      <p style={{ fontSize: '0.85rem', lineHeight: 1.75, color: MUTED }}>
                        {m.who}
                      </p>
                    </div>
                  </RevealSection>
                );
              })}

              <RevealSection delay={0.3}>
                <div style={{
                  background:   'linear-gradient(135deg, rgba(255,122,61,0.14), #FFFFFF)',
                  border:       '1px solid rgba(255,122,61,0.3)',
                  borderRadius: '4px',
                  padding:      '1.6rem 1.75rem',
                }}>
                  <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.18em',
                    textTransform: 'uppercase', color: GOLD, marginBottom: '0.6rem' }}>
                    The one thing we are asking for
                  </p>
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: WHITE, fontWeight: 600,
                    marginBottom: '0.7rem' }}>
                    {DELIVERY.pilot.ask}
                  </p>
                  <p style={{ fontSize: '0.83rem', lineHeight: 1.75, color: MUTED, marginBottom: '1.1rem' }}>
                    Cindy Ha, the founder, brings in the speakers and intends to be at every
                    session.
                  </p>
                  <Link href="/teachers" style={{ display: 'inline-flex', alignItems: 'center',
                    gap: '0.4rem', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em',
                    textTransform: 'uppercase', color: GOLD, textDecoration: 'none' }}>
                    Read the ask <ArrowUpRight size={12} />
                  </Link>
                </div>
              </RevealSection>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FOUNDER SPOTLIGHT, CINDY HA
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: '#FFFFFF', borderTop: '1px solid rgba(45,91,227,0.1)', borderBottom: '1px solid rgba(45,91,227,0.1)' }}>
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-12">

          {/* Section label */}
          <RevealSection>
            <p className="label-eyebrow mb-16" style={{ color: ROYAL_L }}>Founder Spotlight</p>
          </RevealSection>

          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-start">

            {/* Left, Text */}
            <div>
              <RevealSection>
                <h2 style={{
                  fontFamily:    "'Baloo 2 Variable', 'Baloo 2', 'Trebuchet MS', Verdana, sans-serif",
                  fontSize:      'clamp(2.8rem, 5vw, 5rem)',
                  lineHeight: 1.06,
                  letterSpacing: '-0.01em',
                  color:         WHITE,
                  marginBottom:  '1.5rem',
                }}>
                  The founder<br />
                  learned this<br />
                  <span style={{ color: ROYAL_L }}>the hard way.</span>
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
                    border:       '2px solid rgba(45,91,227,0.3)',
                    display:      'flex',
                    alignItems:   'center',
                    justifyContent: 'center',
                    flexShrink:   0,
                  }}>
                    <span style={{
                      fontFamily: "'Baloo 2 Variable', 'Baloo 2', 'Trebuchet MS', Verdana, sans-serif",
                      fontSize:   '1.5rem',
                      color:      WHITE,
                      letterSpacing: '-0.01em',
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
                  Cindy Ha grew up in Highland Park and went through Los Angeles public
                  schools doing everything they asked of her. None of it covered how a
                  business works. She found out by opening one: a 900-square-foot storefront
                  she renovated herself, grew into a retail, wholesale, import and e-commerce
                  business, and later sold.
                </p>
                <p style={{ fontSize: '1rem', lineHeight: 1.8, color: MUTED, marginBottom: '2rem' }}>
                  The MBA at {FOUNDER.mbaSchool} came afterward, and with it the discovery
                  that a whole field had been there the entire time. This organization hands
                  that to children two decades earlier than she got it, spread across their
                  school years instead of compressed into two.
                </p>
              </RevealSection>

              <RevealSection delay={0.2}>
                <blockquote style={{
                  borderLeft:  `3px solid ${ROYAL_L}`,
                  paddingLeft: '1.5rem',
                  marginBottom: '2.5rem',
                }}>
                  <p style={{ fontSize: '1.05rem', fontStyle: 'italic', lineHeight: 1.7, color: WHITE }}>
                    &ldquo;{FOUNDER.quotes.theMBA}&rdquo;
                  </p>
                  <cite style={{ display: 'block', marginTop: '0.75rem', fontSize: '0.8rem', fontStyle: 'normal', fontWeight: 600, color: ROYAL_L, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Cindy Ha, Founder &amp; Executive Director
                  </cite>
                </blockquote>
              </RevealSection>

              <RevealSection delay={0.25}>
                <Link href="/about" className="btn-gold" style={{ fontSize: '0.8rem', display: 'inline-flex' }}>
                  Read her story
                  <ArrowUpRight size={13} />
                </Link>
              </RevealSection>
            </div>

            {/* Right, Credential Cards */}
            <div className="flex flex-col gap-4">
              <CredentialCard
                icon={<GraduationCap size={18} />}
                title="Operator, then student"
                subtitle="Built a 900-square-foot storefront into a retail, wholesale, import and e-commerce business, sold it, then went back for an MBA."
                delay={0.1}
              />
              <CredentialCard
                icon={<Users size={18} />}
                title="Los Angeles public schools"
                subtitle="Raised in Highland Park and schooled in LAUSD classrooms, where none of this was on offer. That is the gap the curriculum closes."
                delay={0.2}
              />
              <CredentialCard
                icon={<MapPin size={18} />}
                title="Built for a public school budget"
                subtitle="Written against the California pacing guide and proofed on a black-and-white copier, so money is never why a school says no."
                delay={0.3}
              />
              <CredentialCard
                icon={<Star size={18} />}
                title="Published whole, or not at all"
                subtitle="Workbooks, answer keys and the research behind them, in full. No license, no email wall, no sample chapter with the rest behind a call."
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
                  background:   `linear-gradient(135deg, rgba(45,91,227,0.15), rgba(33,73,199,0.08))`,
                  border:       `1px solid rgba(45,91,227,0.25)`,
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
                      What we have built
                    </p>
                    <p style={{ fontFamily: "'Baloo 2 Variable', 'Baloo 2', 'Trebuchet MS', Verdana, sans-serif", fontSize: '3rem', color: WHITE, lineHeight: 1.06, letterSpacing: '-0.01em' }}>
                      {PUBLISHED_WEEKS}<span style={{ color: ROYAL_L }}> weeks</span>
                    </p>
                    <p style={{ fontSize: '0.8rem', color: MUTED, marginTop: '0.25rem' }}>
                      {PUBLISHED_YEARS.length} full school years, written and free to download
                    </p>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/pip/pip-cheer.svg" alt="" aria-hidden
                    style={{ width: '84px', height: 'auto', flexShrink: 0 }} />
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
          <InkSlab style={{ textAlign: 'center', padding: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
            <p className="label-eyebrow" style={{ color: SUN, marginBottom: '0.9rem' }}>
              The honest ask
            </p>
            <h2
              className="mx-auto"
              style={{
                fontFamily:    DISPLAY,
                fontWeight:    800,
                fontSize:      'clamp(2.1rem, 4.4vw, 3.5rem)',
                lineHeight:    1.06,
                letterSpacing: '-0.02em',
                color:         '#FFFFFF',
                maxWidth:      '20ch',
                marginBottom:  '1.25rem',
              }}
            >
              Somebody is already teaching this.
            </h2>
            <p className="mx-auto" style={{ fontSize: '1rem', lineHeight: 1.75, color: '#D7DFEC',
              maxWidth: '62ch', marginBottom: '2rem' }}>
              {PUBLISHED_YEARS.length} finished years, free to run, and teachers have written
              to say they are running them. What has never happened is a program with a
              roster, a pre and post, and somebody watching. The Grade 7 web app is built for
              that, and it needs a district to say yes. If you teach, take a year. If you work
              for a district, host the first pilot. If you give, make it the first program
              anybody can check.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/resources" className="btn-primary">
                Take a year, free
                <ArrowUpRight size={14} />
              </Link>
              <Link href="/partner#pilot" className="btn-secondary">
                Host the first pilot
              </Link>
              <Link href="/partner#give" className="btn-secondary">
                Make a gift
              </Link>
            </div>
          </InkSlab>
        </RevealSection>
      </section>

    </div>
  );
}
