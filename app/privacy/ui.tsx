'use client';

import Link from 'next/link';
import {
  ArrowUpRight, CheckCircle, XCircle, Eye, Clock, ShieldCheck, Mail,
} from 'lucide-react';
import {
  Page, Hero, Section, Eyebrow, Title, FadeIn, Card,
  WHITE, MUTED, SLATE_3, GOLD, GOLD_L, ROYAL_L, GREEN_L, DISPLAY,
} from '@/components/kit';
import { STUDENT_PRIVACY as P, ORG, addressLines } from '@/content/org';

/**
 * /privacy, added 21 October 2026. Everything on this page renders from
 * STUDENT_PRIVACY in content/org.ts; read the comment there before editing.
 * The page states the retention policy COPPA requires in the online notice,
 * so do not remove that section or soften it into something without a time.
 */

const BODY: React.CSSProperties = {
  fontSize: '0.95rem', lineHeight: 1.85, color: MUTED,
};

function Item({ icon: Icon, color, children }: {
  icon: typeof CheckCircle; color: string; children: React.ReactNode;
}) {
  return (
    <li style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start' }}>
      <Icon size={15} color={color} style={{ flexShrink: 0, marginTop: '4px' }} />
      <div style={{ fontSize: '0.9rem', lineHeight: 1.7, color: MUTED }}>{children}</div>
    </li>
  );
}

const LIST: React.CSSProperties = {
  listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem',
};

export default function PrivacyUi() {
  const [street, city] = addressLines(ORG.mailingAddress);

  return (
    <Page>
      <Hero
        eyebrow="Student privacy"
        accent={GREEN_L}
        title={<>What the app will know.<br /><span style={{ color: GREEN_L }}>What it never will.</span></>}
        lede={
          <>
            <p style={{ marginBottom: '0.9rem' }}>
              {P.collecting
                ? 'This page describes how the Grades 7 to 12 app handles student data today.'
                : 'No student uses the Grades 7 to 12 web app yet, and we hold no data about any '
                  + 'student. Its first year, Grade 7, is built and open to adults only, as a '
                  + 'passcode preview. This page is what we commit to before the first student logs '
                  + 'in, written now so that a district, a parent or a student can hold us to it.'}
            </p>
            <p style={{ margin: 0 }}>{P.beforeStart}</p>
          </>
        }
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem' }}>
          <Link href="/teachers" className="btn-ghost">
            How the app and the tutor work <ArrowUpRight size={13} />
          </Link>
        </div>
      </Hero>

      {/* ── What we collect ────────────────────────────── */}
      <Section tinted>
        <FadeIn style={{ marginBottom: '2.25rem' }}>
          <Eyebrow color={GREEN_L}>What we collect</Eyebrow>
          <Title size="clamp(1.9rem, 4vw, 3.2rem)">The least<br />that works.</Title>
          <p style={{ ...BODY, maxWidth: '62ch', marginTop: '1rem' }}>
            Each item is here because the program cannot run without it. The reason sits
            beside it.
          </p>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          <FadeIn>
            <Card accent={GREEN_L} pad="1.7rem">
              <p style={{ fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.18em',
                textTransform: 'uppercase' as const, color: GREEN_L, marginBottom: '1rem' }}>
                We will collect
              </p>
              <ul style={LIST}>
                {P.collected.map((c) => (
                  <Item key={c.item} icon={CheckCircle} color={GREEN_L}>
                    <strong style={{ color: WHITE }}>{c.item}.</strong> {c.why}
                  </Item>
                ))}
              </ul>
            </Card>
          </FadeIn>
          <FadeIn delay={0.08}>
            <Card accent={GOLD} pad="1.7rem">
              <p style={{ fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.18em',
                textTransform: 'uppercase' as const, color: GOLD_L, marginBottom: '1rem' }}>
                We will not collect
              </p>
              <ul style={LIST}>
                {P.notCollected.map((n) => (
                  <Item key={n} icon={XCircle} color={GOLD}>{n}</Item>
                ))}
              </ul>
            </Card>
          </FadeIn>
        </div>
      </Section>

      {/* ── Who sees it ────────────────────────────────── */}
      <Section>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
          gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'start' }}>
          <FadeIn>
            <Eyebrow color={ROYAL_L}>Who can see it</Eyebrow>
            <Title size="clamp(1.9rem, 4vw, 3.2rem)">Three kinds of people.<br />One company.</Title>
          </FadeIn>
          <FadeIn delay={0.1}>
            <ul style={LIST}>
              {P.whoSees.map((w) => (
                <Item key={w} icon={Eye} color={ROYAL_L}>{w}</Item>
              ))}
            </ul>
            <p style={{ ...BODY, marginTop: '1.5rem' }}>
              Pip, the tutor, runs on {P.provider.product}, made by {P.provider.name}.{' '}
              {P.provider.noTraining}{' '}
              <a href={P.provider.termsUrl} target="_blank" rel="noopener noreferrer"
                style={{ color: ROYAL_L }}>Read the terms</a>, and {P.provider.name}&rsquo;s{' '}
              <a href={P.provider.minorsUrl} target="_blank" rel="noopener noreferrer"
                style={{ color: ROYAL_L }}>rules for products used by young people</a>.
            </p>
          </FadeIn>
        </div>
      </Section>

      {/* ── How long we keep it: the retention policy ──── */}
      <Section tinted>
        <FadeIn>
          <div style={{ padding: 'clamp(1.75rem, 4vw, 2.75rem)', background: '#FFFFFF',
            border: '1px solid rgba(23,166,124,0.3)', borderRadius: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
              <Clock size={16} color={GREEN_L} />
              <Eyebrow color={GREEN_L}>How long we keep it</Eyebrow>
            </div>
            <p style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.7rem, 3.6vw, 2.6rem)',
              letterSpacing: '-0.01em', color: WHITE, lineHeight: 1.08, margin: '0.2rem 0 1rem' }}>
              One school year, plus sixty days.
            </p>
            <p style={{ ...BODY, maxWidth: '70ch' }}>{P.retention}</p>
          </div>
        </FadeIn>
      </Section>

      {/* ── What we never do ───────────────────────────── */}
      <Section>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
          gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'start' }}>
          <FadeIn>
            <Eyebrow color={GOLD}>What we never do</Eyebrow>
            <Title size="clamp(1.9rem, 4vw, 3.2rem)">Not for a sponsor,<br />not for a grant,<br />not ever.</Title>
          </FadeIn>
          <FadeIn delay={0.1}>
            <ul style={LIST}>
              {P.never.map((n) => (
                <Item key={n} icon={ShieldCheck} color={GOLD}>{n}</Item>
              ))}
            </ul>
          </FadeIn>
        </div>
      </Section>

      {/* ── Parents ────────────────────────────────────── */}
      <Section tinted>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
          gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'start' }}>
          <FadeIn>
            <Eyebrow color={ROYAL_L}>If you are a parent</Eyebrow>
            <Title size="clamp(1.9rem, 4vw, 3.2rem)">You can ask,<br />and we will answer.</Title>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={{ ...BODY, marginBottom: '1rem' }}>At any time, you can ask us to:</p>
            <ul style={LIST}>
              {P.parentRights.map((r) => (
                <Item key={r} icon={CheckCircle} color={ROYAL_L}>{r}</Item>
              ))}
            </ul>
            <p style={{ ...BODY, marginTop: '1.5rem' }}>
              Write to <a href={`mailto:${ORG.contactEmail}`} style={{ color: ROYAL_L }}>{ORG.contactEmail}</a>,
              or by mail to {ORG.legalName}, {street}, {city}. You can also ask your
              child&rsquo;s school, which can tell us to delete it.
            </p>
            <p style={{ fontSize: '0.8rem', lineHeight: 1.75, color: SLATE_3, marginTop: '1.5rem' }}>
              The laws this follows: {P.laws.join('; ')}. The data privacy agreement each
              district signs is what binds us; this page never promises more than it does.
            </p>
            <div style={{ marginTop: '1.5rem' }}>
              <a href={`mailto:${ORG.contactEmail}`} className="btn-gold">
                Ask about your child&rsquo;s data <Mail size={14} />
              </a>
            </div>
          </FadeIn>
        </div>
      </Section>
    </Page>
  );
}
