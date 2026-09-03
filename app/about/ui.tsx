'use client';

import Link from 'next/link';
import { ArrowUpRight, Quote, MapPin, Store, GraduationCap, Landmark } from 'lucide-react';
import {
  Page, Hero, Section, Eyebrow, Title, FadeIn, Card,
  WHITE, MUTED, GOLD, GOLD_L, ROYAL_L, GREEN_L, DISPLAY,
} from '@/components/kit';
import {
  FOUNDER, LEADERSHIP, ADVISORS, BOARD, hasAdvisors, hasBoard,
  ORG, fmtDate, type Person,
} from '@/content/org';

/** Pull quotes only. The rest of the page uses the site's sans. */
const SERIF = "'Playfair Display', Georgia, 'Times New Roman', serif";

const BODY: React.CSSProperties = {
  fontSize: '1rem', lineHeight: 1.85, color: MUTED, marginBottom: '1.1rem',
};

/** Two-column section: display heading on the left, running copy on the right. */
function Spread({ eyebrow, accent = ROYAL_L, title, children }: {
  eyebrow: string; accent?: string; title: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
      gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'start' }}>
      <FadeIn>
        <Eyebrow color={accent}>{eyebrow}</Eyebrow>
        <Title size="clamp(1.9rem, 4vw, 3.2rem)">{title}</Title>
      </FadeIn>
      <FadeIn delay={0.1}>
        <div style={{ maxWidth: '58ch' }}>{children}</div>
      </FadeIn>
    </div>
  );
}

function PullQuote({ children, accent = GOLD }: { children: React.ReactNode; accent?: string }) {
  return (
    <div style={{ borderLeft: `3px solid ${accent}`, paddingLeft: 'clamp(1.1rem, 3vw, 1.75rem)',
      margin: '2rem 0' }}>
      <Quote size={18} color={`${accent}70`} style={{ marginBottom: '0.6rem' }} />
      <p style={{ fontFamily: SERIF, fontSize: 'clamp(1.15rem, 2.2vw, 1.4rem)', fontStyle: 'italic',
        fontWeight: 600, lineHeight: 1.55, color: WHITE, marginBottom: '0.7rem' }}>
        {children}
      </p>
      <cite style={{ fontSize: '0.7rem', fontStyle: 'normal', fontWeight: 700,
        letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: accent }}>{FOUNDER.name}
      </cite>
    </div>
  );
}

/** Person tile. No portrait placeholder, an empty frame reads as a missing photo. */
function PersonCard({ person }: { person: Person }) {
  return (
    <Card accent={ROYAL_L} pad="1.6rem">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '1rem' }}>
        <div style={{ width: '44px', height: '44px', flexShrink: 0, borderRadius: '3px',
          background: 'rgba(45,91,227,0.12)', border: '1px solid rgba(45,91,227,0.28)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: DISPLAY, fontSize: '1.15rem', letterSpacing: '-0.01em', color: ROYAL_L }}>
          {person.initials}
        </div>
        <div>
          <p style={{ fontSize: '0.98rem', fontWeight: 700, color: WHITE }}>{person.name}</p>
          <p style={{ fontSize: '0.76rem', color: GOLD_L }}>{person.title}</p>
        </div>
      </div>
      {person.bio && (
        <p style={{ fontSize: '0.83rem', lineHeight: 1.75, color: MUTED }}>{person.bio}</p>
      )}
    </Card>
  );
}

export default function AboutUi() {
  // The MBA institution is named only if it has been filled in deliberately.
  const mba = FOUNDER.mbaSchool
    ? `an MBA from ${FOUNDER.mbaSchool}`
    : 'an MBA';

  return (
    <Page>
      <Hero
        eyebrow="About · the founder"
        accent={GOLD_L}
        title={<>Nobody taught her<br />how business works.<br />
          <span style={{ color: GOLD_L }}>She built one anyway.</span></>}
        lede={
          <>
            <p style={{ marginBottom: '0.9rem' }}>
              {FOUNDER.name} grew up in {FOUNDER.raisedIn}, went through Los Angeles public
              schools doing exactly what was asked of her, and came out the other side without
              ever having been told how a business actually works. She found out by opening
              one: nine hundred square feet, renovated by hand.
            </p>
            <p style={{ margin: 0 }}>
              She went back for {mba} afterward, and discovered a whole field she had spent
              years improvising against. Young Innovators for Change exists because of the
              order of those two things.
            </p>
          </>
        }
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.75rem', alignItems: 'center' }}>
          {[
            { icon: MapPin, label: FOUNDER.raisedIn },
            { icon: GraduationCap, label: FOUNDER.college },
            { icon: Store, label: 'Founder, operator, exited' },
          ].map(({ icon: Icon, label }) => (
            <span key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              fontSize: '0.78rem', color: MUTED }}>
              <Icon size={14} color={GOLD} /> {label}
            </span>
          ))}
        </div>
      </Hero>

      {/* ── Highland Park ──────────────────────────────── */}
      <Section tinted>
        <Spread
          eyebrow="Where it starts"
          title={<>She stayed after<br />school for the<br />board games.</>}
        >
          <p style={BODY}>
            There was not much. Cramped living quarters, both parents working, and afternoons
            that belonged to the neighborhood kids and whatever could be done with a patch
            of dirt.
          </p>
          <p style={BODY}>
            School had one thing she stayed late for. Teachers in her LAUSD elementary put out
            board games and table games at the end of the day, and she stayed to play them, not because anyone made her, and not for a grade.
          </p>
          <div style={{ marginTop: '1.75rem', padding: '1.35rem 1.6rem',
            background: 'rgba(255,122,61,0.06)', border: '1px solid rgba(255,122,61,0.2)',
            borderRadius: '4px' }}>
            <p style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.18em',
              textTransform: 'uppercase' as const, color: GOLD, marginBottom: '0.55rem' }}>
              Worth noticing
            </p>
            <p style={{ fontSize: '0.87rem', lineHeight: 1.8, color: MUTED }}>
              The first thing this organization finished is thirty-six weeks of second-grade
              mathematics taught almost entirely through games, maps and puzzles. That was not
              planned as a tribute to anything. People who remember learning that way tend to
              build that way.{' '}
              <Link href="/curriculum" style={{ color: GOLD_L, textDecoration: 'none',
                borderBottom: `1px solid ${GOLD}55` }}>See the curriculum</Link>.
            </p>
          </div>
        </Spread>
      </Section>

      {/* ── The lockstep ───────────────────────────────── */}
      <Section>
        <Spread
          eyebrow="What school gave her"
          title={<>She did every<br />single thing<br />the system asked.</>}
        >
          <p style={BODY}>
            She mastered what was taught, in the order it was taught. The honors track. The AP
            classes. The SAT, studied for the hard way. It got her into {FOUNDER.college}, and a
            term abroad in {FOUNDER.studiedAbroad} widened the frame further. She worked through
            most of high school and college, because the money had to come from somewhere.
          </p>
          <p style={BODY}>
            She {FOUNDER.academicRecord}. She is specific about the second half of that
            sentence, and it is not modesty. Finishing first was the return on hours nobody
            saw, which is the only reason it is worth mentioning at all here.
          </p>
          <p style={BODY}>
            That is thirteen years of doing it right, followed by four more. And none of it
            included how money works. Not how a price gets set, not what a margin is, not what
            it costs to borrow, not why one shop survives its third year and the one beside it
            does not.
          </p>
          <p style={{ ...BODY, marginBottom: 0, color: WHITE }}>
            That is not a complaint about her teachers. It was not in the curriculum. In most
            public schools it still is not.
          </p>
        </Spread>
      </Section>

      {/* ── The store ──────────────────────────────────── */}
      <Section tinted accent={GOLD}>
        <Spread
          eyebrow="What she did instead"
          accent={GOLD_L}
          title={<>Nine hundred<br /><span style={{ color: GOLD_L }}>square feet.</span></>}
        >
          <p style={BODY}>
            After college came a job at a payroll company. A few years of duties that did not
            need her, and the particular flatness of work that asks for nothing. She left it to
            open a shop.
          </p>
          <p style={BODY}>
            She did the renovation herself. Saved every dollar that could be saved and put in
            sweat wherever sweat could stand in for cash. The {FOUNDER.business.startedFrom} grew
            into a profitable {FOUNDER.business.grewInto} business. She kept learning, kept
            pushing, and {FOUNDER.business.exit}.
          </p>
          <PullQuote>{FOUNDER.quotes.theBusiness}</PullQuote>
          <p style={{ ...BODY, marginBottom: 0 }}>
            This is the part of the record that matters most to a school or a funder deciding
            whether to take this organization seriously: she has actually run something. Payroll,
            inventory, suppliers, pricing, a landlord, a third year. Not a case study of it.
          </p>
        </Spread>
      </Section>

      {/* ── The MBA ────────────────────────────────────── */}
      <Section>
        <Spread
          eyebrow="What she found out afterward"
          title={<>The whole field<br />was already<br />there.</>}
        >
          <p style={BODY}>
            Somewhere along the way she wanted to know what the academy had that the doing had
            not taught her, and went back for {mba}.
          </p>
          <p style={BODY}>
            What she found was not a set of tricks. It was a discipline, pricing, capital,
            operations, strategy, the structure of how firms actually behave, a body of
            knowledge she had been improvising against, blind, for years, and had beaten it anyway.
          </p>
          <PullQuote accent={ROYAL_L}>{FOUNDER.quotes.theMBA}</PullQuote>
          <p style={BODY}>
            The other thing she took from it was about pace. Two years is a compression
            schedule, priced and timed for adults who already speak the language, and she
            came out convinced that the compression was doing real damage to how much of it
            people actually keep. Spread over the years a child is in a classroom anyway,
            there is no schedule to keep up with.{' '}
            <Link href="/pathway" style={{ color: ROYAL_L, textDecoration: 'none',
              borderBottom: '1px solid rgba(45,91,227,0.4)' }}>
              That idea became the ten-year pathway
            </Link>.
          </p>
          <p style={{ ...BODY, marginBottom: 0, color: WHITE }}>
            Winning it blind is not the lesson. The lesson is that she should not have had to.
          </p>
        </Spread>
      </Section>

      {/* ── The thesis ─────────────────────────────────── */}
      <Section tinted accent={GOLD}>
        <FadeIn style={{ marginBottom: '2.5rem', maxWidth: '52ch' }}>
          <Eyebrow color={GOLD_L}>The idea the organization is built on</Eyebrow>
          <Title size="clamp(1.9rem, 4.2vw, 3.4rem)">
            Compound interest,<br /><span style={{ color: GOLD_L }}>but for knowing<br />how things work.</span>
          </Title>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2.5rem', alignItems: 'start' }}>
          <FadeIn>
            <p style={BODY}>
              Every kid on her block could have used this. Not so they would all become
              founders, most will not, and that was never the goal. Understanding how money,
              pricing, ownership and risk actually work changes what a person is able to see,
              and it changes it permanently.
            </p>
            <p style={BODY}>
              Handed to someone at nine instead of at thirty-five, it compounds the way anything
              else does. Twenty-six extra years of seeing the world that way is not a marginal
              advantage, and it is exactly the head start that the families who already know
              have always been able to give their own children.
            </p>
            <p style={{ ...BODY, marginBottom: 0, color: WHITE }}>
              That gap has never been about ability. It is about who happened to be in the room
              when somebody explained it.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <PullQuote>{FOUNDER.quotes.theThesis}</PullQuote>
            <div style={{ padding: '1.5rem 1.75rem', background: '#FFFFFF',
              border: '1px solid rgba(45,91,227,0.16)', borderRadius: '4px' }}>
              <p style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.18em',
                textTransform: 'uppercase' as const, color: ROYAL_L, marginBottom: '0.6rem' }}>
                What that turned into
              </p>
              <p style={{ fontSize: '0.87rem', lineHeight: 1.8, color: MUTED, marginBottom: '1.1rem' }}>
                Two tracks. Mathematics and science across Grades 1–12, because reasoning is the
                floor everything else stands on. Leadership, entrepreneurship and financial
                literacy from Grade 3 up, because that is the part nobody was going to teach
                them. Published free, with an honest status on every grade band we have not
                reached yet.
              </p>
              <Link href="/curriculum" className="btn-ghost">
                The full map <ArrowUpRight size={13} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* ── What she is not claiming ───────────────────── */}
      <Section>
        <FadeIn style={{ marginBottom: '2rem' }}>
          <Eyebrow color={GREEN_L}>In the interest of not overclaiming</Eyebrow>
          <Title size="clamp(1.7rem, 3.4vw, 2.7rem)">What this story<br />is not evidence of.</Title>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: '1rem' }}>
          {[
            { t: 'She is not a credentialed educator', a: GREEN_L,
              d: 'No teaching credential, no education doctorate, no classroom career. The '
               + 'curriculum is built against published standards and published research, and '
               + 'both are cited so you can check the work rather than trust the author.' },
            { t: 'She has not run a school', a: GREEN_L,
              d: 'No cohort has completed a program and no outcome has been measured. What we '
               + 'would count, and what would tell us the program does not work, is written '
               + 'down in advance on the evidence page.' },
            { t: 'One business is not a proof', a: GREEN_L,
              d: 'That she built and sold a company says she can operate. It does not establish '
               + 'that teaching this to nine-year-olds changes their lives. Nobody has shown '
               + 'that yet, including us.' },
          ].map((c) => (
            <FadeIn key={c.t}>
              <Card accent={c.a} pad="1.6rem">
                <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.97rem', fontWeight: 700, color: WHITE,
                  lineHeight: 1.4, marginBottom: '0.6rem' }}>{c.t}</h3>
                <p style={{ fontSize: '0.84rem', lineHeight: 1.75, color: MUTED }}>{c.d}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.2}>
          <p style={{ fontSize: '0.87rem', lineHeight: 1.8, color: MUTED, marginTop: '2rem',
            maxWidth: '70ch' }}>
            A founder&rsquo;s story is the easiest place on a website to quietly inflate, which is
            why this section exists. The materials are published in full, workbook, answer key,
            research paper, adoption packet, so that the argument rests on them and not on the
            biography above.{' '}
            <Link href="/resources" style={{ color: ROYAL_L, textDecoration: 'none',
              borderBottom: '1px solid rgba(45,91,227,0.4)' }}>Read them yourself</Link>.
          </p>
        </FadeIn>
      </Section>

      {/* ── Who runs it ────────────────────────────────── */}
      <Section tinted>
        <FadeIn style={{ marginBottom: '2.25rem' }}>
          <Eyebrow>Who runs it</Eyebrow>
          <Title size="clamp(1.9rem, 4vw, 3.2rem)">The people actually<br />doing the work.</Title>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: MUTED, maxWidth: '62ch',
            marginTop: '1rem' }}>
            This lists the people whose role is documented, and nobody else. There is no advisory
            board on this page because there is not yet an advisory board, and names we cannot
            stand behind are worse than an empty section.
          </p>
        </FadeIn>

        <div style={{ display: 'grid', gap: '1rem',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', maxWidth: '52rem' }}>
          {LEADERSHIP.map((p) => <PersonCard key={p.name} person={p} />)}
        </div>

        {hasBoard && (
          <>
            <p style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.2em',
              textTransform: 'uppercase' as const, color: MUTED, margin: '2.75rem 0 1.25rem' }}>
              Board of directors
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1rem' }}>
              {BOARD.map((p) => <PersonCard key={p.name} person={p} />)}
            </div>
          </>
        )}

        {hasAdvisors && (
          <>
            <p style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.2em',
              textTransform: 'uppercase' as const, color: MUTED, margin: '2.75rem 0 1.25rem' }}>
              Advisors
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1rem' }}>
              {ADVISORS.map((p) => <PersonCard key={p.name} person={p} />)}
            </div>
          </>
        )}

        {!hasBoard && (
          <FadeIn delay={0.15}>
            <div style={{ marginTop: '2rem', padding: '1.5rem 1.75rem',
              background: '#FFFFFF', border: '1px solid rgba(255,122,61,0.22)',
              borderRadius: '4px', display: 'flex', flexWrap: 'wrap', gap: '1.5rem',
              alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ maxWidth: '62ch' }}>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem',
                  fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.18em',
                  textTransform: 'uppercase' as const, color: GOLD, marginBottom: '0.5rem' }}>
                  <Landmark size={13} /> The open seat
                </p>
                <p style={{ fontSize: '0.87rem', lineHeight: 1.8, color: MUTED }}>
                  A California public benefit corporation needs a board, and most funders expect
                  at least three unrelated directors. Ours is not seated yet. We say so here and
                  on the governance page rather than leaving you to work it out from a filing.
                  Educators, school administrators, operators and finance people are exactly who
                  we are looking for.
                </p>
              </div>
              <Link href="/governance" className="btn-ghost">
                Governance <ArrowUpRight size={13} />
              </Link>
            </div>
          </FadeIn>
        )}
      </Section>

      {/* ── The organization ───────────────────────────── */}
      <Section>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'start' }}>
          <FadeIn>
            <Eyebrow>The organization</Eyebrow>
            <Title size="clamp(1.8rem, 3.6vw, 2.9rem)">Small, new,<br />and on the record.</Title>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: MUTED, maxWidth: '54ch',
              marginTop: '1rem' }}>
              {ORG.legalName} was incorporated in {ORG.incorporation.state} on{' '}
              {fmtDate(ORG.incorporation.initialFilingDate)} and recognized by the IRS as a
              501(c)(3) public charity on {fmtDate(ORG.taxStatus.determinationDate)}. Both records
              are public and both are linked from the governance page, along with the things we
              have not done yet.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { label: 'Bring it to a classroom', sub: 'What a pilot involves, and what it costs', href: '/for-schools' },
                { label: 'Download the materials', sub: 'Workbook, answer key, research paper, packet', href: '/resources' },
                { label: 'Governance and filings', sub: 'Records, standing, and the open gaps', href: '/governance' },
                { label: 'Evidence and accountability', sub: 'What we would measure, and what would disprove us', href: '/impact' },
              ].map(({ label, sub, href }) => (
                <Link key={href} href={href} style={{ display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', gap: '1rem', padding: '1.05rem 1.3rem',
                  background: '#FFFFFF', border: '1px solid rgba(45,91,227,0.14)',
                  borderRadius: '3px', textDecoration: 'none' }}>
                  <div>
                    <p style={{ fontSize: '0.88rem', fontWeight: 600, color: WHITE }}>{label}</p>
                    <p style={{ fontSize: '0.75rem', color: MUTED, marginTop: '2px' }}>{sub}</p>
                  </div>
                  <ArrowUpRight size={15} color={ROYAL_L} style={{ flexShrink: 0 }} />
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </Section>
    </Page>
  );
}
