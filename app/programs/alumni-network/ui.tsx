'use client';

import Link from 'next/link';
import {
  ArrowUpRight, ShieldCheck, XCircle, Compass, Lock, Users, FileSignature,
} from 'lucide-react';
import {
  Page, Hero, Section, Eyebrow, Title, FadeIn, Card,
  WHITE, MUTED, SLATE_3, GOLD, GOLD_L, ROYAL_L, GREEN_L, DISPLAY,
} from '@/components/kit';

/**
 * There are no alumni. This page used to say otherwise: it carried named
 * graduates, cohort years and venture traction figures, none of which existed.
 *
 * Rather than delete the page, it now does the one useful thing an alumni page
 * can do before there are any alumni, which is fix the commitments in public
 * while they are still cheap to make.
 */

const COMMITMENTS = [
  {
    icon: Lock, accent: GREEN_L,
    t: 'Nothing a student makes is ours to sell',
    d: 'A venture built in the program belongs to the student who built it. We take no '
     + 'equity, no license, no right of first refusal, and no claim on anything they go on '
     + 'to do with it. This is stated here because youth entrepreneurship programs have '
     + 'not always been clear about it.',
  },
  {
    icon: FileSignature, accent: ROYAL_L,
    t: 'Consent is separate from enrollment, and revocable',
    d: 'We will not use a student\'s name, face, work or story in fundraising or marketing '
     + 'without written permission from them and their guardian, asked for separately from '
     + 'signing up, and withdrawable at any point afterward with the material taken down. '
     + 'A child should not have to become a case study to get a free program.',
  },
  {
    icon: ShieldCheck, accent: GOLD_L,
    t: 'Student data does not leave',
    d: 'No student data is sold, traded, shared with partners or funders, or used to market '
     + 'anything to a family. Measurement is reported at the classroom level. Individually '
     + 'identifiable records stay with the school.',
  },
  {
    icon: Users, accent: GREEN_L,
    t: 'Access does not end at graduation',
    d: 'Everything we publish stays free to everyone who has been through a program, and to '
     + 'everyone who has not. There is no alumni tier, no paid upgrade, and no version of '
     + 'this organization in which the good material sits behind a relationship.',
  },
  {
    icon: Compass, accent: ROYAL_L,
    t: 'A reference comes from a person or not at all',
    d: 'If a graduate asks us to vouch for them, they get a letter from someone who actually '
     + 'taught them, describing what that person actually saw. We will not generate '
     + 'certificates of participation that imply more than attendance.',
  },
];

const NOT_PROMISING = [
  'Internships or job placement. We have no employer relationships and will not imply that we do.',
  'Introductions to investors. Adults on a pitch panel are there to ask good questions, not to fund children.',
  'Scholarships or financial awards. If that ever changes it will be announced with the criteria attached.',
  'A guaranteed mentor. Mentorship depends on volunteers, and promising a person we have not recruited is how programs disappoint families.',
];

const INTENT = [
  { t: 'A directory people opt into',
    d: 'Graduates choose to be listed. Nobody is added by default, and anyone can leave and '
     + 'be removed from the record rather than archived.' },
  { t: 'Older students teaching younger ones',
    d: 'The most useful thing a high school graduate of the Executives Track can do is run a '
     + 'session for the Founders Track. It is also the cheapest way for this to keep '
     + 'running without us.' },
  { t: 'A standing invitation back',
    d: 'Anyone who has been through a program can come back to a later cohort as a guest, a '
     + 'panelist or a co-instructor, at whatever level of commitment they have room for.' },
];

export default function AlumniUi() {
  return (
    <Page>
      <Hero
        eyebrow="After the program"
        accent={GOLD_L}
        title={<>Nobody has<br />graduated yet.<br />
          <span style={{ color: GOLD_L }}>This is the promise.</span></>}
        lede={
          <>
            <p style={{ marginBottom: '0.9rem' }}>
              No cohort has run, so this organization has no alumni, no success stories and no
              network. A page claiming otherwise would be the easiest lie on this website to
              tell and the hardest one to walk back.
            </p>
            <p style={{ margin: 0 }}>
              So it does the opposite. What an organization owes the children who go through it
              is easiest to decide honestly now, while it costs nothing, nobody is watching, and
              there is no awkward case that makes us want to bend it.
            </p>
          </>
        }
      >
        <Link href="/governance" className="btn-ghost">
          How we hold ourselves to things <ArrowUpRight size={13} />
        </Link>
      </Hero>

      {/* ── The commitments ────────────────────────────── */}
      <Section tinted>
        <FadeIn style={{ marginBottom: '2.5rem' }}>
          <Eyebrow color={GREEN_L}>Fixed in advance</Eyebrow>
          <Title size="clamp(1.9rem, 4vw, 3.2rem)">Five things that<br />will not change.</Title>
          <p style={{ fontSize: '0.92rem', lineHeight: 1.8, color: MUTED, maxWidth: '66ch',
            marginTop: '1rem' }}>
            These are written as commitments rather than intentions, which means we expect to be
            held to them, and that changing one would require saying so on this page with the
            reason.
          </p>
        </FadeIn>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {COMMITMENTS.map((c, i) => {
            const Icon = c.icon;
            return (
              <FadeIn key={c.t} delay={Math.min(i, 4) * 0.06}>
                <div style={{ display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
                  gap: 'clamp(1rem, 3vw, 2.5rem)', padding: 'clamp(1.25rem, 3vw, 1.75rem)',
                  background: '#FFFFFF', border: '1px solid rgba(45,91,227,0.13)',
                  borderRadius: '4px', borderLeft: `2px solid ${c.accent}` }}>
                  <div style={{ display: 'flex', gap: '0.9rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '34px', height: '34px', flexShrink: 0, borderRadius: '3px',
                      background: `${c.accent}15`, border: `1px solid ${c.accent}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: c.accent }}>
                      <Icon size={15} />
                    </div>
                    <h3 style={{ fontFamily: DISPLAY, fontSize: '1.4rem', letterSpacing: '-0.01em',
                      lineHeight: 1.05, color: WHITE, paddingTop: '3px' }}>
                      {c.t}
                    </h3>
                  </div>
                  <p style={{ fontSize: '0.88rem', lineHeight: 1.85, color: MUTED }}>{c.d}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* ── Not promising ──────────────────────────────── */}
      <Section>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'start' }}>
          <FadeIn>
            <Eyebrow color={GOLD}>The other half</Eyebrow>
            <Title size="clamp(1.8rem, 3.6vw, 2.9rem)">What we are<br />not promising.</Title>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: MUTED, maxWidth: '52ch',
              marginTop: '1rem' }}>
              Every item below is something organizations at our stage routinely imply and
              rarely deliver. Naming them costs us nothing today and protects a family from
              expecting something later.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {NOT_PROMISING.map((n) => (
                <li key={n} style={{ display: 'flex', gap: '0.7rem', fontSize: '0.88rem',
                  lineHeight: 1.75, color: MUTED }}>
                  <XCircle size={15} color={GOLD_L} style={{ flexShrink: 0, marginTop: '4px' }} />
                  {n}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </Section>

      {/* ── Intent ─────────────────────────────────────── */}
      <Section tinted accent={GOLD}>
        <FadeIn style={{ marginBottom: '2.25rem' }}>
          <Eyebrow color={ROYAL_L}>Intended, not built</Eyebrow>
          <Title size="clamp(1.8rem, 3.6vw, 2.9rem)">What we want<br />this to become.</Title>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: MUTED, maxWidth: '62ch',
            marginTop: '1rem' }}>
            Design intent, written down so it can be argued with. None of it exists, and none of
            it will until there is a first cohort to build it around.
          </p>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: '1rem' }}>
          {INTENT.map((p, i) => (
            <FadeIn key={p.t} delay={i * 0.07}>
              <Card accent={ROYAL_L} pad="1.6rem">
                <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.98rem', fontWeight: 700, color: WHITE,
                  lineHeight: 1.4, marginBottom: '0.6rem' }}>{p.t}</h3>
                <p style={{ fontSize: '0.84rem', lineHeight: 1.75, color: MUTED }}>{p.d}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ── Close ──────────────────────────────────────── */}
      <Section>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '1.75rem' }}>
            <div style={{ maxWidth: '60ch' }}>
              <Title size="clamp(1.6rem, 3.2vw, 2.5rem)">The way to make<br />this page real.</Title>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: MUTED, marginTop: '1rem' }}>
                One classroom, one year, one teacher willing to go first. Everything on this page
                stays hypothetical until that happens, and the Grade 2 mathematics course is
                written, printed and ready for it now.
              </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <Link href="/for-schools" className="btn-gold">Run the first one <ArrowUpRight size={14} /></Link>
              <Link href="/curriculum" className="btn-ghost">The full map <ArrowUpRight size={13} /></Link>
            </div>
          </div>
          <p style={{ fontSize: '0.8rem', lineHeight: 1.7, color: SLATE_3, marginTop: '2rem',
            maxWidth: '72ch' }}>
            When there are graduates, this page will carry their names only where they and their
            guardians have asked for that in writing, and it will still carry the commitments
            above.
          </p>
        </FadeIn>
      </Section>
    </Page>
  );
}
