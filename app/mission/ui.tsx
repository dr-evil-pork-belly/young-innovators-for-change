'use client';

import Link from 'next/link';
import { ArrowUpRight, ArrowRight, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import {
  Page, Hero, Section, Eyebrow, Title, FadeIn, Card,
  WHITE, MUTED, SLATE_3, GOLD, GOLD_L, ROYAL_L, GREEN_L, DISPLAY,
} from '@/components/kit';
import { MISSION } from '@/content/org';
import { PUBLISHED_WEEKS } from '@/content/published';

// ── Logic model ───────────────────────────────────────────────────────────────
const CHAIN = [
  {
    stage: 'Inputs',
    accent: SLATE_3,
    items: [`${PUBLISHED_WEEKS} weeks of curriculum, written in-house`,
            'A teacher, an aide or a caretaker willing to spend the time, which is the '
            + 'input we do not control and the one that decides everything',
            'One instructor, and volunteers where we have them',
            'Printing, materials, and a small seed fund per team',
            'A published research base, including the paper that argues against us'],
  },
  {
    stage: 'Activities',
    accent: ROYAL_L,
    items: ['Publishing every year in full, free to anyone (running today)',
            'A delivered program with a roster, five to six weeks, real money (not yet run)',
            'Family sessions where the student teaches the adult (not yet run)',
            'Teacher orientation and support'],
  },
  {
    stage: 'Outputs',
    accent: GOLD,
    items: ['Students enrolled, and weeks actually completed',
            'Ventures launched, priced and sold',
            'Family sessions attended',
            'Materials downloaded and reused'],
  },
  {
    stage: 'Short-term outcomes',
    accent: GREEN_L,
    items: ['Students computing margin and unit cost on their own numbers',
            'More willingness to plan and to act, which is what the research points at',
            'Wider participation, not just the fast ones',
            'At least one money practice changed at home'],
  },
  {
    stage: 'Long-term outcome',
    accent: GOLD_L,
    items: ['Adults who can price something, read a cost, judge a risk and understand what '
            + 'owning a share of something means',
            'and who can help a household decide rather than watch it be decided'],
  },
];

const ASSUMPTIONS = [
  { text: 'That an adult with the book in front of them will do the part the book '
        + 'cannot do.',
    risk: 'This is the assumption the whole organization rests on and the one we control '
        + 'least. A year run without conviction is a stack of worksheets. We can make the '
        + 'material short, correct and free; we cannot supply the thirty-five minutes a '
        + 'week, and no amount of curriculum quality substitutes for a person who cares '
        + 'whether the child in the third row understood it.' },
  { text: 'That what a child learns about money reaches the household behind them.',
    risk: 'The one randomized trial that found this ran in Peruvian high schools with a '
        + 'short course. If it does not transfer to a compressed program here, half the '
        + 'reason this organization exists does nothing.' },
  { text: 'That an opt-in program does not simply gather the students who were already '
        + 'going to be fine.',
    risk: 'If it does, we widen the gap we set out to close and this becomes another '
        + 'gifted program. It is the likeliest way for us to fail while appearing to '
        + 'succeed.' },
  { text: 'That real stakes and spacing hold an effect after the program ends.',
    risk: 'The largest meta-analysis in our research list found financial education '
        + 'effects negligible 20 months out. Our answer is to spread the material and '
        + 'attach it to real money. Neither has been tested.' },
  { text: 'That a school or expanded learning site will run a program from an '
        + 'organization with no track record.',
    risk: 'This is the assumption we are testing first, and the one most likely to fail.' },
];

export default function MissionUi() {
  return (
    <Page>
      <Hero
        eyebrow="Mission & theory of change"
        title={<>SOME CHILDREN LEARN<br />HOW MONEY WORKS<br /><span style={{ color: ROYAL_L }}>AT HOME.</span></>}
        lede={
          <>
            <p style={{ marginBottom: '0.9rem' }}>
              The rest are expected to buy it later, compressed into two years, at graduate
              school prices. {MISSION.statement} {MISSION.agency}
            </p>
            <p style={{ marginBottom: '0.9rem' }}>
              We write that material and publish all of it free: mathematics and science
              across Grades 1&ndash;12, and leadership, entrepreneurship and financial
              literacy from Grade 3 up. The barrier was never capability. It was whether
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
            <Title size="clamp(1.9rem, 4vw, 3.2rem)">THE HEAD START<br />IS HANDED OUT<br />AT HOME.</Title>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.85, color: MUTED, marginBottom: '1rem' }}>
              The children who get taught how capital, pricing and negotiation actually work
              are the ones whose families already know. Everyone else is expected to buy it
              later, compressed into two years, at graduate school prices.
            </p>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.85, color: MUTED, marginBottom: '1rem' }}>
              It is not a knowledge gap in the ordinary sense. A child in a household that runs
              a business hears cost, margin and risk discussed at the table for eighteen years
              before anyone calls it a subject. A child in a household that does not hears none
              of it, then arrives at adulthood expected to make the same decisions with none of
              the practice.
            </p>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.85, color: MUTED, marginBottom: '1rem' }}>
              The same pattern shows up earlier, and more quietly, in mathematics. By the end of
              second grade a child is expected to add and subtract fluently within twenty. The
              standards also ask for argument, structure and perseverance, but in most classrooms
              those are carried on the back of computational work, so a child who is slow to
              regroup gets fewer chances to argue, to notice structure, to be <em>seen reasoning</em>.
              A narrow skill quietly becomes a broad identity.
            </p>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.85, color: MUTED }}>
              Our answer to the first of those is to stop compressing it.{' '}
              <Link href="/pathway" style={{ color: GOLD_L, textDecoration: 'none',
                borderBottom: `1px solid ${GOLD}55` }}>
                The ten-year pathway
              </Link>{' '}
              sets out which ideas land in which grade, what is written and what is not, and the
              published research the design leans on, including the paper that argues the whole
              category does not work.
            </p>
          </FadeIn>
        </div>
      </Section>

      {/* ── What we do ─────────────────────────────────── */}
      <Section>
        <FadeIn style={{ marginBottom: '2.5rem' }}>
          <Eyebrow color={GOLD}>What we actually do</Eyebrow>
          <Title size="clamp(1.9rem, 4vw, 3.4rem)">BUILD IT PROPERLY.<br />THEN GIVE IT AWAY.</Title>
          <div style={{ marginTop: '1.25rem', maxWidth: '70ch', display: 'flex',
            flexDirection: 'column', gap: '0.75rem' }}>
            {MISSION.roles.map((r) => (
              <p key={r.title} style={{ fontSize: '0.9rem', lineHeight: 1.75, color: MUTED }}>
                <strong style={{ color: WHITE, fontWeight: 700 }}>{r.title}.</strong>{' '}
                {r.body}
              </p>
            ))}
          </div>
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
          <div style={{ marginTop: '1.5rem', maxWidth: '70ch' }}>
            <p style={{ fontSize: '0.78rem', color: SLATE_3, marginBottom: '0.75rem' }}>
              The two right-hand columns are shaded because nothing in them has been measured.
              The evaluation design that would test them is published in full on the{' '}
              <Link href="/impact" style={{ color: GOLD_L }}>evidence page</Link>.
            </p>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex',
              flexDirection: 'column', gap: '0.4rem' }}>
              {MISSION.notYetTrue.map((x) => (
                <li key={x} style={{ fontSize: '0.78rem', lineHeight: 1.65, color: SLATE_3,
                  paddingLeft: '0.75rem', borderLeft: '2px solid rgba(253,162,155,0.35)' }}>{x}</li>
              ))}
            </ul>
          </div>
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
                color: WHITE, marginBottom: '0.4rem' }}>THE FIRST MEASURED CLASSROOM MATTERS MOST.</p>
              <p style={{ fontSize: '0.85rem', color: MUTED, maxWidth: '54ch' }}>
                Teachers are already running this material on their own. What nobody has done
                is run it with a roster and measure what happened, so everything to the right
                of the outputs above is still intent. The curriculum is the half we can finish
                alone; the half that decides whether a child learns anything belongs to
                whoever opens the book with them.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href="/teachers" className="btn-gold">For teachers <ArrowUpRight size={14} /></Link>
              <Link href="/for-schools" className="btn-ghost">For schools <ArrowUpRight size={13} /></Link>
              <Link href="/partner" className="btn-ghost">For funders <ArrowUpRight size={13} /></Link>
            </div>
          </div>
        </FadeIn>
      </Section>
    </Page>
  );
}
