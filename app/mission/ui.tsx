'use client';

import Link from 'next/link';
import { ArrowUpRight, ArrowRight, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import {
  Page, Hero, Section, Eyebrow, Title, FadeIn, Card,
  WHITE, MUTED, SLATE_3, GOLD, GOLD_L, ROYAL_L, GREEN_L, DISPLAY,
} from '@/components/kit';

// ── Logic model ───────────────────────────────────────────────────────────────
const CHAIN = [
  {
    stage: 'Inputs',
    accent: SLATE_3,
    items: ['Curriculum written in-house', 'Volunteer instructors', 'Printing and materials',
            'A published research base'],
  },
  {
    stage: 'Activities',
    accent: ROYAL_L,
    items: ['Weekly math and science enrichment, Grades 1–12', 'Eight-week enterprise intensives, Grades 3–12',
            'Teacher orientation and support', 'Everything published free'],
  },
  {
    stage: 'Outputs',
    accent: GOLD,
    items: ['Classrooms running a full year', 'Teachers supported through it',
            'Materials downloaded and reused', 'Weeks actually completed'],
  },
  {
    stage: 'Short-term outcomes',
    accent: GREEN_L,
    items: ['More students explaining reasoning aloud', 'Wider participation, not just the fast ones',
            'Teachers willing to run it again', 'No loss on grade-level benchmarks'],
  },
  {
    stage: 'Long-term outcome',
    accent: GOLD_L,
    items: ['Students who believe mathematics is something they can do',
            'and who carry that into how they choose subjects later'],
  },
];

const ASSUMPTIONS = [
  { text: 'That reasoning-heavy, computation-light content lets students who struggle with '
        + 'arithmetic participate fully.', risk: 'If it turns out to need fluency after all, the '
        + 'access argument collapses and this becomes another gifted program.' },
  { text: 'That a teacher with no background in the mathematics can run it from a guide.',
    risk: 'If teachers need real training, the model does not scale past the people we can train personally.' },
  { text: 'That thirty-five minutes a week is enough to matter.',
    risk: 'It may be too little to move anything, or enough to cost time that fluency needed more.' },
  { text: 'That schools will run a free program from an organization with no track record.',
    risk: 'This is the assumption we are testing first, and the one most likely to fail.' },
];

export default function MissionUi() {
  return (
    <Page>
      <Hero
        eyebrow="Mission & theory of change"
        title={<>THE MATH IS NOT<br />THE HARD PART.<br /><span style={{ color: ROYAL_L }}>ACCESS IS.</span></>}
        lede={
          <>
            <p style={{ marginBottom: '0.9rem' }}>
              We build rigorous curriculum and give it away: mathematics and science across
              Grades 1&ndash;12, and leadership, entrepreneurship and financial literacy from
              Grade 3 up. The barrier for most children was never capability. It was whether
              anyone handed them the material.
            </p>
            <p style={{ margin: 0 }}>
              This page sets out what we think the problem is, exactly what we do about it, what
              would have to be true for that to work, and what would tell us we were wrong.
            </p>
          </>
        }
      >
        <Link href="/for-schools" className="btn-gold">Bring it to a classroom <ArrowUpRight size={14} /></Link>
      </Hero>

      {/* ── The problem ────────────────────────────────── */}
      <Section tinted>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
          <FadeIn>
            <Eyebrow>The problem</Eyebrow>
            <Title size="clamp(1.9rem, 4vw, 3.2rem)">A NARROW SKILL<br />BECOMES A WHOLE<br />IDENTITY.</Title>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.85, color: MUTED, marginBottom: '1rem' }}>
              By the end of second grade a child is expected to add and subtract fluently within
              twenty. The standards also ask for argument, structure and perseverance, but in
              most classrooms those are carried on the back of computational work.
            </p>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.85, color: MUTED, marginBottom: '1rem' }}>
              So a child who is slow to regroup does not simply fall behind on regrouping. They
              get fewer chances to argue, to notice structure, to be <em>seen reasoning</em>.
              Arithmetic speed becomes the only currency in which a seven-year-old can demonstrate
              mathematical competence, and a narrow skill quietly becomes a broad identity.
            </p>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.85, color: MUTED }}>
              The same pattern repeats later with business and money: the students who get taught
              how capital, pricing and negotiation actually work are the ones whose families
              already know.
            </p>
          </FadeIn>
        </div>
      </Section>

      {/* ── What we do ─────────────────────────────────── */}
      <Section>
        <FadeIn style={{ marginBottom: '2.5rem' }}>
          <Eyebrow color={GOLD}>What we actually do</Eyebrow>
          <Title size="clamp(1.9rem, 4vw, 3.4rem)">BUILD IT PROPERLY.<br />THEN GIVE IT AWAY.</Title>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1rem' }}>
          {[
            { t: 'Write the curriculum ourselves', a: ROYAL_L,
              d: 'Not a workshop series or a licensed kit. Full years of material, week by week, '
               + 'mapped to the standards a class is already teaching that month, with an honest '
               + 'status published on every grade band we have not reached yet.' },
            { t: 'Publish all of it, free', a: GOLD,
              d: 'Workbook, answer key, research paper, adoption packet. No email wall. A school '
               + 'that never speaks to us can still run the program.' },
            { t: 'Remove every barrier to trying', a: GREEN_L,
              d: 'No cost, no devices, no subscription, no training week. Crayons, counters and a '
               + 'photocopier. Programs that require purchase get adopted by schools that can purchase.' },
            { t: 'Measure honestly, publish either way', a: ROYAL_L,
              d: 'We have pre-committed to the outcomes that would show the program does not work, '
               + 'and we will report them if we see them.' },
          ].map((c, i) => (
            <FadeIn key={c.t} delay={i * 0.07}>
              <Card accent={c.a}>
                <h3 style={{ fontFamily: DISPLAY, fontSize: '1.35rem', letterSpacing: '0.03em',
                  color: WHITE, lineHeight: 1.05, marginBottom: '0.7rem' }}>{c.t.toUpperCase()}</h3>
                <p style={{ fontSize: '0.84rem', lineHeight: 1.75, color: MUTED }}>{c.d}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ── Logic model ────────────────────────────────── */}
      <Section tinted accent={GOLD}>
        <FadeIn style={{ marginBottom: '2.5rem' }}>
          <Eyebrow color={GOLD_L}>Theory of change</Eyebrow>
          <Title size="clamp(1.9rem, 4vw, 3.4rem)">FROM WHAT WE PUT IN<br />TO WHAT WE HOPE CHANGES.</Title>
          <p style={{ fontSize: '0.9rem', color: MUTED, maxWidth: '62ch', marginTop: '1rem' }}>
            Read left to right. Everything to the left of the outcomes is something we control and
            can report on today. Everything to the right is a claim we have not yet earned, which
            is why it is written as intent rather than achievement.
          </p>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {CHAIN.map((col, i) => (
            <FadeIn key={col.stage} delay={i * 0.08}>
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
                  <span style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.16em',
                    textTransform: 'uppercase' as const, color: col.accent }}>{col.stage}</span>
                  {i < CHAIN.length - 1 && <ArrowRight size={12} color={SLATE_3} style={{ marginLeft: 'auto' }} />}
                </div>
                <div style={{ borderTop: `2px solid ${col.accent}`, paddingTop: '0.9rem', flex: 1,
                  background: i >= 3 ? 'rgba(15,23,42,0.4)' : 'transparent',
                  borderRadius: i >= 3 ? '0 0 4px 4px' : 0,
                  padding: i >= 3 ? '0.9rem 0.9rem 1rem' : '0.9rem 0 0' }}>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex',
                    flexDirection: 'column', gap: '0.55rem' }}>
                    {col.items.map((it) => (
                      <li key={it} style={{ fontSize: '0.79rem', lineHeight: 1.6, color: MUTED,
                        paddingLeft: '0.75rem', borderLeft: `2px solid ${col.accent}33` }}>{it}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <p style={{ fontSize: '0.78rem', color: SLATE_3, marginTop: '1.5rem', maxWidth: '70ch' }}>
            The two right-hand columns are shaded because nothing in them has been measured. The
            evaluation design that would test them is published in full on the{' '}
            <Link href="/impact" style={{ color: GOLD_L }}>evidence page</Link>.
          </p>
        </FadeIn>
      </Section>

      {/* ── Assumptions ────────────────────────────────── */}
      <Section>
        <FadeIn style={{ marginBottom: '2.5rem' }}>
          <Eyebrow color="#FDA29B">Load-bearing assumptions</Eyebrow>
          <Title size="clamp(1.9rem, 4vw, 3.4rem)">WHAT HAS TO BE TRUE.</Title>
          <p style={{ fontSize: '0.9rem', color: MUTED, maxWidth: '60ch', marginTop: '1rem' }}>
            Every theory of change rests on assumptions. Most organizations leave them implicit.
            Ours are listed here with the specific way each one could fail.
          </p>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
          {ASSUMPTIONS.map((a, i) => (
            <FadeIn key={a.text} delay={i * 0.06}>
              <div style={{ background: 'rgba(15,23,42,0.65)', border: '1px solid rgba(37,99,235,0.12)',
                borderRadius: '4px', padding: '1.4rem 1.6rem', height: '100%' }}>
                <div style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-start', marginBottom: '0.9rem' }}>
                  <CheckCircle size={14} color={ROYAL_L} style={{ flexShrink: 0, marginTop: '4px' }} />
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: WHITE, fontWeight: 600 }}>{a.text}</p>
                </div>
                <div style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-start',
                  paddingTop: '0.85rem', borderTop: '1px solid rgba(37,99,235,0.1)' }}>
                  <AlertTriangle size={14} color="#FDA29B" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <p style={{ fontSize: '0.82rem', lineHeight: 1.7, color: MUTED }}>{a.risk}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ── What we will not claim ─────────────────────── */}
      <Section tinted>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
          <FadeIn>
            <Eyebrow color={GREEN_L}>Our standard</Eyebrow>
            <Title size="clamp(1.8rem, 3.6vw, 2.9rem)">WHAT WE WILL NOT<br />SAY ABOUT OURSELVES.</Title>
          </FadeIn>
          <FadeIn delay={0.1}>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex',
              flexDirection: 'column', gap: '0.8rem' }}>
              {[
                'Any number of students served that we cannot produce a roster for.',
                'Any outcome we have not measured, however plausible it sounds.',
                'Any advisor, partner or endorsement we do not have in writing.',
                'Any claim that our programs raise test scores. We have not tested that.',
              ].map((x) => (
                <li key={x} style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-start' }}>
                  <XCircle size={15} color="#FDA29B" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span style={{ fontSize: '0.88rem', lineHeight: 1.7, color: MUTED }}>{x}</span>
                </li>
              ))}
            </ul>
            <p style={{ fontSize: '0.82rem', lineHeight: 1.75, color: SLATE_3, marginTop: '1.5rem', maxWidth: '52ch' }}>
              This is a policy, not a slogan. Every factual claim on this site is held in a single
              file, and anything not in it does not appear on the page.
            </p>
          </FadeIn>
        </div>
      </Section>

      {/* ── CTA ────────────────────────────────────────── */}
      <Section>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '1.5rem', padding: '2rem 2.5rem', background: 'rgba(30,41,59,0.6)',
            border: '1px solid rgba(201,168,76,0.18)', borderRadius: '4px' }}>
            <div>
              <p style={{ fontFamily: DISPLAY, fontSize: '2rem', letterSpacing: '0.02em',
                color: WHITE, marginBottom: '0.4rem' }}>THE FIRST CLASSROOM MATTERS MOST.</p>
              <p style={{ fontSize: '0.85rem', color: MUTED, maxWidth: '54ch' }}>
                Everything above is a plan until one teacher runs one year. If that could be your
                school, or you want to fund the classrooms that follow, start here.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href="/for-schools" className="btn-gold">For schools <ArrowUpRight size={14} /></Link>
              <Link href="/partner" className="btn-ghost">For funders <ArrowUpRight size={13} /></Link>
            </div>
          </div>
        </FadeIn>
      </Section>
    </Page>
  );
}
