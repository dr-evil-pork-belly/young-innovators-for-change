'use client';

import Link from 'next/link';
import {
  ArrowUpRight, CheckCircle, CalendarDays, Laptop, Mail, Download, ShieldCheck,
} from 'lucide-react';
import {
  Page, Hero, Section, Eyebrow, Title, FadeIn, Card,
  WHITE, MUTED, SLATE_3, GOLD, GOLD_L, GREEN_L, DISPLAY,
} from '@/components/kit';
import { DELIVERY, ORG } from '@/content/org';
import { PUBLISHED_WEEKS, PUBLISHED_YEARS } from '@/content/published';

export default function TeachersUi() {
  const pilot = DELIVERY.pilot;
  const seeking = pilot.status === 'seeking';

  return (
    <Page>
      <Hero
        eyebrow="For teachers, aides and caretakers"
        title={<>We wrote<br /><span style={{ color: GOLD_L }}>the easy half.</span></>}
        accent={GOLD}
        lede={
          <>
            <p style={{ marginBottom: '0.9rem' }}>
              A workbook on a shelf teaches nobody. It is paper until an adult opens it with
              a child, reads the week before the week happens, notices which student has
              gone quiet, and decides to spend the extra twenty minutes. That decision is
              the program. Everything we publish is the part that can be done alone, at a
              desk, by someone who will never meet your students.
            </p>
            <p style={{ marginBottom: '0.9rem' }}>
              {DELIVERY.claim}
            </p>
            <p style={{ margin: 0 }}>
              When people compliment this organization, they compliment the books. The books
              were the easy half.
            </p>
          </>
        }
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem' }}>
          <Link href="/resources" className="btn-gold">
            Take a year, free <Download size={14} />
          </Link>
          <Link href="/curriculum" className="btn-ghost">
            See every finished year <ArrowUpRight size={13} />
          </Link>
        </div>
      </Hero>

      {/* ── What the download does not tell us ─────────── */}
      <Section tinted accent={GOLD}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
          <FadeIn>
            <Eyebrow color={GOLD_L}>The thing we cannot see</Eyebrow>
            <Title size="clamp(1.9rem, 4vw, 3.2rem)">We do not know<br />your name.</Title>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.85, color: MUTED, marginBottom: '1rem' }}>
              {DELIVERY.anonymity}
            </p>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.85, color: MUTED, marginBottom: '1rem' }}>
              Some of you have written anyway. {DELIVERY.inUse.known} Those messages are
              the entire evidence base for the sentence that follows, and they are worth
              more than that makes them sound: it is being taught, and if a child has
              learned one thing from these pages, an adult did that. Not the paper, and
              not us.
            </p>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.85, color: MUTED, marginBottom: '1rem' }}>
              What we will not do is turn an inbox into a number. {DELIVERY.inUse.unknown}{' '}
              A funder who wants to know how many classrooms are running this deserves a
              real answer, and the real answer today is that we do not have one.
            </p>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.85, color: MUTED }}>
              It is the ordinary, unglamorous work that carries this: the aide who reruns
              week nine because half the room missed it, the teacher who photocopies on
              her own prep, the grandparent working through the money year at a kitchen
              table because nobody else was going to. None of that shows up in a download
              count. All of it is the actual program.
            </p>
          </FadeIn>
        </div>
      </Section>

      {/* ── Two speeds ─────────────────────────────────── */}
      <Section>
        <FadeIn style={{ marginBottom: '2.5rem' }}>
          <Eyebrow>How it is delivered</Eyebrow>
          <Title size="clamp(1.9rem, 4vw, 3.4rem)">Two speeds,<br />one for each age.</Title>
          <p style={{ fontSize: '0.9rem', color: MUTED, maxWidth: '64ch', marginTop: '1rem' }}>
            The same ideas are shaped twice, because a nine-year-old with a teacher beside
            them and a thirteen-year-old who can work on their own are not the same
            delivery problem. Printed weeks hold the first. We do not believe paper holds
            the second, so from Grade 7 the lessons move to an app that lets each student
            go at their own pace, and the time we ask a school for goes to a room instead.
            The second card is designed and not built, and it says so.
          </p>
        </FadeIn>

        {/* Two cards. Until 21 October 2026 there were three, and the middle one
            was a deliberate blank for Grades 7 and 8 (DELIVERY.middleGrades): the
            band we would not publish for until we could deliver to it. A digital
            form now exists as a design, so the blank gave way to it, as the blank's
            own comment said it should. */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {DELIVERY.models.map((m, i) => {
            const Icon = m.status === 'published' ? CalendarDays : Laptop;
            const live = m.status === 'published';
            const accent = live ? GREEN_L : GOLD;
            return (
              <FadeIn key={m.band} delay={i * 0.1}>
                <Card accent={accent} pad="1.9rem">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                    <Icon size={16} color={accent} />
                    <span style={{ fontSize: '0.64rem', fontWeight: 800, letterSpacing: '0.16em',
                      textTransform: 'uppercase' as const, color: accent }}>{m.band}</span>
                    <span style={{ marginLeft: 'auto', fontSize: '0.62rem', fontWeight: 700,
                      letterSpacing: '0.12em', textTransform: 'uppercase' as const,
                      color: live ? GREEN_L : SLATE_3, border: `1px solid ${live ? GREEN_L : SLATE_3}55`,
                      borderRadius: '2px', padding: '0.2rem 0.45rem' }}>
                      {live ? 'Running today' : 'Not yet built'}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: DISPLAY, fontSize: '1.6rem', letterSpacing: '-0.01em',
                    color: WHITE, lineHeight: 1.05, marginBottom: '0.85rem' }}>
                    {m.shape}
                  </h3>
                  <p style={{ fontSize: '0.86rem', lineHeight: 1.8, color: MUTED, marginBottom: '1.1rem' }}>
                    {m.body}
                  </p>
                  <p style={{ fontSize: '0.8rem', lineHeight: 1.7, color: WHITE, paddingTop: '1rem',
                    borderTop: `1px solid ${accent}22` }}>
                    <strong style={{ color: accent, fontWeight: 700 }}>Delivered by: </strong>
                    {m.who}
                  </p>
                </Card>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.25}>
          <p style={{ fontSize: '0.8rem', color: SLATE_3, marginTop: '1.5rem', maxWidth: '70ch' }}>
            {PUBLISHED_YEARS.length} full school years, {PUBLISHED_WEEKS} weeks in all, are
            written and free to download today. Which grades those cover, and which are
            still only designed, is set out honestly on the{' '}
            <Link href="/curriculum" style={{ color: GOLD_L }}>curriculum map</Link>.
          </p>
        </FadeIn>

        {/* Why there is a room, and what the tutor will and will not do.
            Replaced the "Why it is a cohort" panel on 21 October 2026. theClaim
            carries its own disclaimer and NOT_AN_MBA governs the rest; do not
            split the two halves of that string. */}
        <FadeIn delay={0.3}>
          <div style={{ marginTop: '2.5rem', padding: 'clamp(1.75rem, 4vw, 2.75rem)',
            background: 'linear-gradient(135deg, rgba(255,122,61,0.10), #FFFFFF)',
            border: '1px solid rgba(255,122,61,0.25)', borderRadius: '4px' }}>
            <Eyebrow color={GOLD_L}>Why there is still a room</Eyebrow>
            <p style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.7rem, 3.6vw, 2.8rem)',
              letterSpacing: '-0.01em', color: WHITE, lineHeight: 1.06, margin: '0.4rem 0 1.1rem' }}>
              The app teaches. The room is for wanting it.
            </p>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.85, color: MUTED, maxWidth: '70ch',
              marginBottom: '1rem' }}>
              {pilot.whyInPerson}
            </p>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.85, color: WHITE, maxWidth: '70ch',
              fontWeight: 600, marginBottom: '1.75rem' }}>
              {pilot.theClaim}{' '}
              <Link href="/pathway" style={{ color: GOLD_L, fontWeight: 400 }}>
                What we do and do not grant
              </Link>.
            </p>

            <p style={{ fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.16em',
              textTransform: 'uppercase' as const, color: GOLD_L, marginBottom: '1rem' }}>
              What the tutor will and will not do
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '0.9rem 1.5rem' }}>
              {pilot.tutorRules.map((r) => (
                <div key={r.title} style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start' }}>
                  <ShieldCheck size={15} color={GOLD} style={{ flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <p style={{ fontSize: '0.88rem', fontWeight: 700, color: WHITE, lineHeight: 1.5 }}>{r.title}</p>
                    <p style={{ fontSize: '0.82rem', lineHeight: 1.7, color: MUTED }}>{r.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '0.8rem', lineHeight: 1.7, color: SLATE_3, maxWidth: '70ch',
              marginTop: '1.25rem' }}>
              These are commitments we put in writing to any district that hosts the program.
              The data privacy agreement each district signs, not this list, is what binds us.{' '}
              <Link href="/privacy" style={{ color: GOLD_L }}>What the app will keep, and for how long</Link>.
            </p>
          </div>
        </FadeIn>
      </Section>

      {/* ── What we owe you ────────────────────────────── */}
      <Section tinted>
        <FadeIn style={{ marginBottom: '2.5rem' }}>
          <Eyebrow color={GREEN_L}>Our side of it</Eyebrow>
          <Title size="clamp(1.9rem, 4vw, 3.4rem)">If you are going to<br />carry this, here is<br />what we owe you.</Title>
          <p style={{ fontSize: '0.9rem', color: MUTED, maxWidth: '60ch', marginTop: '1rem' }}>
            We cannot make the twenty minutes appear. What we can do is make sure not one
            of them is wasted on checking our work, hunting for an answer key, or
            reprinting something that came out gray.
          </p>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          {DELIVERY.commitments.map((c, i) => (
            <FadeIn key={c.title} delay={i * 0.06}>
              <div style={{ background: '#FFFFFF', border: '1px solid rgba(45,91,227,0.12)',
                borderRadius: '4px', padding: '1.4rem 1.6rem', height: '100%' }}>
                <div style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-start', marginBottom: '0.7rem' }}>
                  <CheckCircle size={14} color={GREEN_L} style={{ flexShrink: 0, marginTop: '4px' }} />
                  <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: WHITE, fontWeight: 700 }}>{c.title}</p>
                </div>
                <p style={{ fontSize: '0.84rem', lineHeight: 1.8, color: MUTED }}>{c.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ── The open ask ───────────────────────────────── */}
      {seeking && (
        <Section accent={GOLD}>
          <FadeIn>
            <div style={{ padding: 'clamp(2rem, 5vw, 3.25rem)', background: '#FFFFFF',
              border: '1px solid rgba(255,122,61,0.28)', borderRadius: '4px', position: 'relative',
              overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: '0 0 auto 0', height: '2px',
                background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
              <Eyebrow color={GOLD_L}>An open ask, and the only one on this site</Eyebrow>
              <p style={{ fontFamily: DISPLAY, fontSize: 'clamp(2rem, 4.4vw, 3.4rem)',
                letterSpacing: '-0.01em', color: WHITE, lineHeight: 1.06, margin: '0.4rem 0 1.1rem' }}>
                We need one district<br />to say yes.
              </p>
              <p style={{ fontSize: '0.98rem', lineHeight: 1.8, color: WHITE, maxWidth: '62ch',
                marginBottom: '0.9rem', fontWeight: 600 }}>
                {pilot.ask}
              </p>
              <p style={{ fontSize: '0.92rem', lineHeight: 1.85, color: MUTED, maxWidth: '66ch',
                marginBottom: '1.1rem' }}>
                {pilot.detail}
              </p>
              <p style={{ fontSize: '0.92rem', lineHeight: 1.85, color: WHITE, maxWidth: '66ch',
                marginBottom: '1.1rem', paddingLeft: '1.1rem',
                borderLeft: `3px solid ${GOLD}` }}>
                {pilot.whoHosts}{' '}
                <Link href="/about" style={{ color: GOLD_L }}>Her story is here</Link>.
              </p>
              <p style={{ fontSize: '0.92rem', lineHeight: 1.85, color: MUTED, maxWidth: '66ch',
                marginBottom: '1.75rem' }}>
                If you sit anywhere near that decision, in a district office, a middle school
                or a county office of education, one email starts it. It costs the district
                nothing. The only things to sign are the ones that protect students: a data
                privacy agreement, and a consent form for each family.
              </p>
              {pilot.preview.live && (
                <p style={{ fontSize: '0.92rem', lineHeight: 1.85, color: MUTED, maxWidth: '66ch',
                  marginBottom: '1.75rem' }}>
                  {pilot.preview.body}
                </p>
              )}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem' }}>
                <Link href="/partner#contact" className="btn-gold">
                  Talk to us about a pilot <Mail size={14} />
                </Link>
                {pilot.preview.live && (
                  <a href={pilot.preview.url} className="btn-ghost" target="_blank" rel="noopener noreferrer">
                    Try the first unit (passcode) <Laptop size={13} />
                  </a>
                )}
                <Link href="/pathway" className="btn-ghost">
                  What the six years cover <ArrowUpRight size={13} />
                </Link>
              </div>
              <p style={{ fontSize: '0.75rem', color: SLATE_3, marginTop: '1.5rem' }}>
                {ORG.legalName} &middot; 501(c)(3) &middot; EIN {ORG.taxStatus.ein} &middot; Programs aimed at {ORG.serviceArea}
              </p>
            </div>
          </FadeIn>
        </Section>
      )}

      {/* ── Closing ────────────────────────────────────── */}
      <Section tinted>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
          <FadeIn>
            <Eyebrow color={GOLD}>Start anywhere</Eyebrow>
            <Title size="clamp(1.8rem, 3.6vw, 2.9rem)">You do not need<br />our permission.</Title>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.85, color: MUTED, marginBottom: '1.25rem' }}>
              Take a book. Take one week of it. Run it in an after-school hour, a small
              group, or a single kitchen table. Nothing is gated, nothing expires, and no
              one here will ever ask you to account for it.
            </p>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.85, color: MUTED, marginBottom: '1.75rem' }}>
              If it works, that was you. If it breaks, write and tell us where, and the
              next revision will be better because a real classroom found the seam.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem' }}>
              <Link href="/resources" className="btn-gold">Every book and guide <Download size={14} /></Link>
              <Link href="/partner#contact" className="btn-ghost">Tell us where it broke <ArrowUpRight size={13} /></Link>
            </div>
          </FadeIn>
        </div>
      </Section>
    </Page>
  );
}
