'use client';

import Link from 'next/link';
import {
  ArrowUpRight, CheckCircle, Clock, Printer, Users, School,
  FileText, Download, CalendarCheck, MessageSquare,
} from 'lucide-react';
import {
  Page, Hero, Section, Eyebrow, Title, FadeIn, Card,
  WHITE, MUTED, SLATE_3, GOLD, ROYAL_L, GREEN_L, DISPLAY,
} from '@/components/kit';
import { ORG } from '@/content/org';

const STEPS = [
  { when: 'Step one', icon: MessageSquare, accent: ROYAL_L, title: 'A twenty-minute call',
    text: 'With the teacher, and the principal if you want them there. We answer questions and confirm which class.' },
  { when: 'Step two', icon: Download, accent: GREEN_L, title: 'Materials arrive',
    text: 'Printed workbooks for the class, the teacher guide, and a 45-minute orientation, in person or by video.' },
  { when: 'Step three', icon: CalendarCheck, accent: GOLD, title: 'One page a week',
    text: 'The teacher runs the weekly assignment. We check in monthly and are reachable the same day for anything urgent.' },
  { when: 'Step four', icon: FileText, accent: ROYAL_L, title: 'What we learned',
    text: 'A 30-minute conversation in June. You see the full results before anyone else does.' },
];

const PROVIDE = [
  'Printed student workbooks for every child in the class',
  'The teacher guide: every answer, every week, plus running notes',
  'A 45-minute orientation and a named person to email',
  'Replacement copies at any point in the year',
  'All measurement instruments and the consent materials',
];

const SCHOOL_PROVIDES = [
  'One classroom and a willing teacher',
  'About 35 minutes of instructional time a week',
  'Crayons, counters and number cards, almost certainly already in the room',
  'Permission for a brief pre and post activity with students',
  'Access to the benchmark data the district already collects',
];

const HONEST = [
  { q: 'Has this been proven to raise scores?',
    a: 'No. No cohort has run yet, and we have not measured anything. The research base is published on our evidence page, including a section on what the literature does not support. Anyone telling you an unproven program raises scores is guessing.' },
  { q: 'What does it cost the school?',
    a: 'Nothing. Our internal cost is about $105 per classroom of 24, roughly $4.40 per student for the year, and we cover it. If you would rather print it yourself, every file is free to download.' },
  { q: 'Does the teacher need to know graph theory?',
    a: 'No. The guide carries every answer, the common misconceptions, and what to say when a student is stuck. The orientation is about how to run a week, not about mathematics.' },
  { q: 'Will it print on our copier?',
    a: 'Yes. The whole book was proofed in grayscale. Structure lives in the linework and color is accent only.' },
  { q: 'What happens if it is not working?',
    a: 'You stop. There is no contract and no invoice. A teacher who tells us in November that this is not working is giving us better information than one who quietly finishes the year.' },
  { q: 'What data leaves the school?',
    a: 'No individually identifiable student data. Classroom-level counts, the teacher log, and aggregate benchmark results. You approve the consent materials before anything goes home.' },
];

export default function ForSchoolsUi() {
  return (
    <Page>
      <Hero
        eyebrow={`Grade 2 pilot · ${ORG.serviceArea}`}
        title={<>ONE TEACHER.<br />ONE YEAR.<br /><span style={{ color: GREEN_L }}>NO COST.</span></>}
        lede={
          <>
            <p style={{ marginBottom: '0.9rem' }}>
              We built a 36-week discrete mathematics enrichment program for Grade 2 and we are
              placing it in classrooms. Thirty-five minutes a week, sequenced against the
              California pacing guide so it reinforces what you are already teaching.
            </p>
            <p style={{ marginBottom: '0.9rem' }}>
              We are looking for teachers, not buyers. Everything is free, including the printing.
            </p>
            <p style={{ margin: 0, fontSize: '0.88rem' }}>
              Grade 2 mathematics is what is finished and available for the coming year. Science,
              the other math grades, and the Grades 3&ndash;12 enterprise programs are on the
              build map. <Link href="/curriculum" style={{ color: GREEN_L }}>See exactly
              where each one stands</Link>.
            </p>
          </>
        }
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem' }}>
          <Link href="/partner" className="btn-gold">
            Start a conversation <ArrowUpRight size={14} />
          </Link>
          <Link href="/programs/discrete-math" className="btn-ghost">
            See the program <ArrowUpRight size={13} />
          </Link>
        </div>
      </Hero>

      {/* ── At a glance ────────────────────────────────── */}
      <Section tinted>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1.5rem' }}>
          {[
            { icon: Clock,   v: '35 min',  l: 'a week',            s: 'Two pages, front and back' },
            { icon: Users,   v: '1',       l: 'classroom',         s: 'Whole class, not a pull-out group' },
            { icon: Printer, v: '$0',      l: 'to the school',     s: 'Materials and printing included' },
            { icon: School,  v: '20',      l: 'CA standards',      s: 'Reinforced, not replaced' },
          ].map(({ icon: Icon, v, l, s }, i) => (
            <FadeIn key={l} delay={i * 0.07}>
              <div>
                <Icon size={17} color={ROYAL_L} />
                <div style={{ fontFamily: DISPLAY, fontSize: 'clamp(2rem, 3.6vw, 2.9rem)',
                  lineHeight: 1, color: WHITE, marginTop: '0.6rem' }}>{v}</div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: WHITE }}>{l}</div>
                <div style={{ fontSize: '0.74rem', color: MUTED, marginTop: '0.15rem' }}>{s}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ── How a pilot runs ───────────────────────────── */}
      <Section>
        <FadeIn style={{ marginBottom: '2.5rem' }}>
          <Eyebrow>How a pilot runs</Eyebrow>
          <Title size="clamp(1.9rem, 4vw, 3.4rem)">FOUR STEPS.<br />NO COMMITTEE.</Title>
          <p style={{ fontSize: '0.9rem', color: MUTED, maxWidth: '58ch', marginTop: '1rem' }}>
            We have deliberately made this small. A pilot that needs a planning committee will
            not happen, and a program that cannot survive one busy teacher trying it is not
            ready anyway.
          </p>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1rem' }}>
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <FadeIn key={s.title} delay={i * 0.07}>
                <div style={{ borderTop: `2px solid ${s.accent}`, paddingTop: '1.1rem', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.7rem' }}>
                    <Icon size={15} color={s.accent} />
                    <span style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.16em',
                      textTransform: 'uppercase' as const, color: s.accent }}>{s.when}</span>
                  </div>
                  <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: WHITE, marginBottom: '0.4rem' }}>{s.title}</h3>
                  <p style={{ fontSize: '0.82rem', lineHeight: 1.7, color: MUTED }}>{s.text}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* ── Who does what ──────────────────────────────── */}
      <Section tinted>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
          <FadeIn>
            <Card accent={GREEN_L} pad="1.75rem">
              <p style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.16em',
                textTransform: 'uppercase' as const, color: GREEN_L, marginBottom: '1rem' }}>We provide</p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', margin: 0, padding: 0, listStyle: 'none' }}>
                {PROVIDE.map((x) => (
                  <li key={x} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                    <CheckCircle size={13} color={GREEN_L} style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span style={{ fontSize: '0.85rem', lineHeight: 1.6, color: MUTED }}>{x}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Card accent={ROYAL_L} pad="1.75rem">
              <p style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.16em',
                textTransform: 'uppercase' as const, color: ROYAL_L, marginBottom: '1rem' }}>The school provides</p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', margin: 0, padding: 0, listStyle: 'none' }}>
                {SCHOOL_PROVIDES.map((x) => (
                  <li key={x} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                    <CheckCircle size={13} color={ROYAL_L} style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span style={{ fontSize: '0.85rem', lineHeight: 1.6, color: MUTED }}>{x}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </FadeIn>
        </div>
      </Section>

      {/* ── Straight answers ───────────────────────────── */}
      <Section>
        <FadeIn style={{ marginBottom: '2.5rem' }}>
          <Eyebrow color={GOLD}>Straight answers</Eyebrow>
          <Title size="clamp(1.9rem, 4vw, 3.4rem)">WHAT PRINCIPALS ASK.</Title>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))', gap: '1.75rem 3rem' }}>
          {HONEST.map((f, i) => (
            <FadeIn key={f.q} delay={i * 0.05}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: WHITE, marginBottom: '0.5rem' }}>{f.q}</h3>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.75, color: MUTED, maxWidth: '54ch' }}>{f.a}</p>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ── Materials ──────────────────────────────────── */}
      <Section tinted>
        <FadeIn style={{ marginBottom: '2rem' }}>
          <Eyebrow>Look before you decide</Eyebrow>
          <Title size="clamp(1.8rem, 3.6vw, 3rem)">READ IT FIRST.</Title>
          <p style={{ fontSize: '0.9rem', color: MUTED, maxWidth: '56ch', marginTop: '0.9rem' }}>
            Everything is public. Read the actual workbook and the actual answer key before you
            take a call with us.
          </p>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
          {[
            { href: '/downloads/discrete-math-adventures-workbook.pdf', label: 'Student workbook', meta: 'PDF · 77 pages', accent: ROYAL_L },
            { href: '/downloads/discrete-math-teacher-guide.html',      label: 'Teacher guide',    meta: 'Web · all 36 weeks', accent: GREEN_L },
            { href: '/downloads/discrete-math-pilot-packet.pdf',        label: 'Pilot packet',     meta: 'PDF · 10 pages', accent: GOLD },
            { href: '/downloads/structure-before-fluency.pdf',          label: 'The research case', meta: 'PDF · working paper', accent: ROYAL_L },
          ].map((d) => (
            <a key={d.href} href={d.href} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem',
              padding: '0.9rem 1rem', background: 'rgba(15,23,42,0.6)',
              border: `1px solid ${d.accent}25`, borderRadius: '3px', textDecoration: 'none' }}>
              <Download size={14} color={d.accent} style={{ flexShrink: 0 }} />
              <span>
                <span style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: WHITE }}>{d.label}</span>
                <span style={{ display: 'block', fontSize: '0.7rem', color: MUTED }}>{d.meta}</span>
              </span>
            </a>
          ))}
        </div>
      </Section>

      {/* ── CTA ────────────────────────────────────────── */}
      <Section>
        <FadeIn>
          <div style={{ padding: '2.5rem 2.75rem', background: 'rgba(30,41,59,0.6)',
            border: '1px solid rgba(37,99,235,0.18)', borderRadius: '4px' }}>
            <p style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.9rem, 3.6vw, 2.8rem)',
              letterSpacing: '0.02em', color: WHITE, lineHeight: 1, marginBottom: '0.9rem' }}>
              INTERESTED? ONE EMAIL IS ENOUGH.
            </p>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: MUTED, maxWidth: '56ch', marginBottom: '1.5rem' }}>
              Tell us your school, the teacher&rsquo;s name, and a good time to call. There is
              nothing to sign and no budget conversation.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem' }}>
              <Link href="/partner" className="btn-gold">Start a conversation <ArrowUpRight size={14} /></Link>
              <Link href="/governance" className="btn-ghost">Check our credentials <ArrowUpRight size={13} /></Link>
            </div>
            <p style={{ fontSize: '0.75rem', color: SLATE_3, marginTop: '1.25rem' }}>
              {ORG.legalName} · 501(c)(3) · EIN {ORG.taxStatus.ein}
            </p>
          </div>
        </FadeIn>
      </Section>
    </Page>
  );
}
