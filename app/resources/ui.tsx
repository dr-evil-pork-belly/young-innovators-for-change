'use client';

import Link from 'next/link';
import { ArrowUpRight, Download, ExternalLink, FileText, FlaskConical } from 'lucide-react';
import {
  Page, Hero, Section, Eyebrow, Title, FadeIn, InkSlab,
  INK, BODY, SUBTLE, CARD_BG, LINE, LINE_2,
  CONNECT, CONNECT_INK, SPARK, SPARK_INK, GROW, GROW_INK, DISPLAY,
} from '@/components/kit';
import { MATH_LINE } from '@/content/mathLine';
import { PUBLISHED_WEEKS, PUBLISHED_YEARS } from '@/content/published';

/**
 * One card per book, not two.
 *
 * This page used to be twenty-eight cards in one grid: a student workbook and
 * a teacher guide as separate, near-identically worded tiles, so every one of
 * the thirteen years appeared twice and nothing on the page showed that the two
 * halves belong together. A teacher looking for the Grade 5 money year had to
 * find it twice.
 *
 * It is thirteen book cards now, each carrying both files, grouped by the three
 * strands, plus the two documents that are not books.
 *
 * The guide descriptions are unchanged, word for word. Four of them state an
 * answer count inside a sentence, and brand/mksite.py reads those counts off
 * this file and recomputes each one from the guide module it names. The guide's
 * file path has to appear before its own "all N of them" sentence, with no
 * other one in between, or that check stops finding it.
 */

type Book = {
  name: string;
  strand: 'Mathematics' | 'Entrepreneurship' | 'Financial literacy';
  grade: number;
  move: string;
  workbook: string;
  pages: number;
  desc: string;
  guide: string;
  guideMeta: string;
  guideDesc: string;
};

const STRAND_HUE = {
  'Mathematics':        { fill: CONNECT, ink: CONNECT_INK },
  'Entrepreneurship':   { fill: SPARK,   ink: SPARK_INK },
  'Financial literacy': { fill: GROW,    ink: GROW_INK },
} as const;

/**
 * The six mathematics books, from content/mathLine.ts rather than typed here.
 * Hand-written cards would have gone stale the first time a book was rebuilt,
 * and the page count and grade would have been the first things to drift.
 */
const MATH_BOOKS: Book[] = MATH_LINE.map((b) => ({
  name: b.title,
  strand: 'Mathematics',
  grade: b.grade,
  move: `${b.move}: ${b.moveLine.charAt(0).toLowerCase()}${b.moveLine.slice(1)}`,
  workbook: b.workbook,
  pages: b.pages,
  desc: '36 weekly assignments, two pages each, plus a contents spread and a certificate. '
      + `Sequenced against a typical California Grade ${b.grade} pacing guide and proofed in `
      + 'grayscale so it prints on a classroom copier.',
  guide: b.guide,
  guideMeta: 'Web page · all 36 weeks',
  guideDesc: 'Answer keys for the main activity, the practice set and the Challenge Zone, plus a '
      + 'running note and the standards tie for every week. Written so a teacher needs no '
      + 'prior background in the mathematics.'
      + (b.checks > 0
          ? ` All ${b.checks.toLocaleString('en-US')} numeric answers are recomputed from the `
            + 'problems by a script that ships with the source.'
          : ' The later books ship a script that recomputes every numeric answer from the '
            + 'problems. This guide predates it, so its answers have been read rather than '
            + 'recomputed.'),
}));

const ENTERPRISE_BOOKS: Book[] = [
  {
    name: 'The Venture Year',
    strand: 'Entrepreneurship', grade: 4,
    move: 'One student, one product, one market day, and an honest answer about whether it made a profit.',
    workbook: '/downloads/venture-year-grade4.pdf', pages: 77,
    desc: '36 weekly assignments in entrepreneurship, two pages each. Students find a real '
        + 'problem, design something that fixes it, work out cost and price, and sell it at a '
        + 'class market day in week 31. Real products and real customers, on play money in a '
        + 'closed classroom economy, so students run their own money box.',
    guide: '/downloads/venture-year-teacher-guide.html',
    guideMeta: 'Web page · all 36 weeks',
    guideDesc: 'The point of each week, every arithmetic answer, the specific wrong turn each '
        + 'week produces, and an honest note wherever a question is a judgment call rather '
        + 'than something with a right answer.',
  },
  {
    name: 'The Numbers Year',
    strand: 'Entrepreneurship', grade: 5,
    move: 'Write the forecast before you sell anything, then find out whether the change did anything.',
    workbook: '/downloads/numbers-year-grade5.pdf', pages: 77,
    desc: '36 weekly assignments, the second entrepreneurship year. Teams of two or three '
        + 'build a line of products, write a forecast before selling anything, sell twice '
        + 'with one deliberate change in between, and find out whether the change did '
        + 'anything. Decimals, margin and break-even throughout.',
    guide: '/downloads/numbers-year-teacher-guide.html',
    guideMeta: 'Web page · all 36 weeks',
    // The count that used to sit here (124) does not match the count the book's
    // own verify.py reports, so it has been removed rather than corrected to a
    // second number nothing on this site can check. The math cards above carry
    // counts because those are read out of the books at generation time.
    guideDesc: 'Every arithmetic answer, the point of each week, and the specific wrong turn it '
        + 'produces. Every numeric answer is recomputed from the problems by a script that '
        + 'ships with the source.',
  },
  {
    name: 'The Market Year',
    strand: 'Entrepreneurship', grade: 6,
    move: 'Two teams, one category, and a price each of them has to defend against the other.',
    workbook: '/downloads/market-year-grade6.pdf', pages: 77,
    desc: '36 weekly assignments, the third and last elementary entrepreneurship year. '
        + 'Teams are given a category another team also has, choose a position, and price '
        + 'against a rival. Two selling rounds with a response round in between, where '
        + 'every team sees every other team’s numbers and moves at the same time.',
    guide: '/downloads/market-year-grade6-teacher-guide.html',
    guideMeta: 'Web page · all 36 weeks',
    guideDesc: 'The point of each week, the specific wrong turn it produces, and every numeric '
        + 'answer. All 163 of them are recomputed from the problems by a script that ships '
        + 'with the source. Where a question is a judgment call, and this year has many, '
        + 'the guide says so rather than inventing something to mark against.',
  },
];

const MONEY_BOOKS: Book[] = [
  {
    name: 'The Choosing Year',
    strand: 'Financial literacy', grade: 3,
    move: 'There is enough for one of two things, and every choice costs you the other.',
    workbook: '/downloads/choosing-year-grade3.pdf', pages: 77,
    desc: '36 weekly assignments about a student’s own money. There is enough for one of '
        + 'two things, and every choice costs them the other. Counting, comparing prices, '
        + 'a ledger kept for a month, saving that takes longer than expected, and what a '
        + 'thing costs in hours rather than dollars. Nothing is sold in it.',
    guide: '/downloads/choosing-year-grade3-teacher-guide.html',
    guideMeta: 'Web page · all 36 weeks',
    guideDesc: 'The point of each week, the specific wrong turn it produces, and every numeric '
        + 'answer, all 210 of them recomputed from the problems by a script that ships with '
        + 'the source. Two weeks carry a note instead of answers: weeks 20 and 21 never ask '
        + 'a child what anything costs at their house, and the guide says what to do if one '
        + 'volunteers an amount anyway.',
  },
  {
    name: 'The Planning Year',
    strand: 'Financial literacy', grade: 4,
    move: 'Decide before you spend rather than while you are spending.',
    workbook: '/downloads/planning-year-grade4.pdf', pages: 77,
    desc: '36 weekly assignments about deciding before you spend rather than while you '
        + 'are spending. Money to the cent, a plan with categories that add up, and the '
        + 'record kept beside it that says what really happened. The repeating costs get '
        + 'multiplied out, and the year ends by asking whether the plan itself was right, '
        + 'which is a different question from whether it was kept.',
    guide: '/downloads/planning-year-grade4-teacher-guide.html',
    guideMeta: 'Web page · all 36 weeks',
    guideDesc: 'The point of each week, the specific wrong turn it produces, and every numeric '
        + 'answer, all 233 of them recomputed from the problems by a script that ships with '
        + 'the source. No plan a student writes is marked right or wrong: what can be '
        + 'marked is whether it adds up, and the guide says so on every week that asks for '
        + 'one.',
  },
  {
    name: 'The Keeping Year',
    strand: 'Financial literacy', grade: 5,
    move: 'A price is what you pay once. A cost is what it keeps costing.',
    workbook: '/downloads/keeping-year-grade5.pdf', pages: 77,
    desc: '36 weekly assignments on the difference between a price and a cost. What a '
        + 'thing costs to keep, what it costs each time you use it, and the month where '
        + 'the cheaper option stops being cheaper. The second half is money with other '
        + 'people: splitting a cost in fractions that have to add up, owing and being '
        + 'owed, and writing an agreement down before it is needed.',
    guide: '/downloads/keeping-year-grade5-teacher-guide.html',
    guideMeta: 'Web page · all 36 weeks',
    guideDesc: 'The point of each week, the specific wrong turn it produces, and every numeric '
        + 'answer, all 239 of them recomputed from the problems by a script that ships '
        + 'with the source. No decision a student writes is marked right or wrong: what '
        + 'can be marked is the arithmetic inside it, and the guide says so on every week '
        + 'that asks for one.',
  },
  {
    name: 'The Asking Year',
    strand: 'Financial literacy', grade: 6,
    move: 'The numbers other people put in front of you, and what would have to be true for them to hold.',
    workbook: '/downloads/asking-year-grade6.pdf', pages: 77,
    desc: '36 weekly assignments on the numbers other people put in front of you. Percent '
        + 'done properly first, because a student who cannot find twenty percent of a price '
        + 'cannot check anything, then what a percent is a percent OF, what "up to" '
        + 'guarantees, why two discounts in a row do not add, and how the same money looks '
        + 'in two frames. The last trimester is the asking itself: what would have to be '
        + 'true, who benefits from yes, and what to do when a claim cannot be checked.',
    guide: '/downloads/asking-year-grade6-teacher-guide.html',
    guideMeta: 'Web page · all 36 weeks',
    guideDesc: 'The point of each week, the specific wrong turn it produces, and every numeric '
        + 'answer, all 314 of them recomputed from the problems by a script that ships with '
        + 'the source. Half this year is claims rather than sums, and where a question has '
        + 'no single right answer the guide says so and says what a good answer contains. '
        + 'Nothing in the book accuses anybody of dishonesty and the guide says that too.',
  },
];

const DOCUMENTS = [
  {
    file: '/downloads/structure-before-fluency.pdf',
    label: 'Structure Before Fluency',
    kind: 'The research case',
    meta: 'PDF · working paper · 10 pages',
    icon: FlaskConical,
    desc: 'The case for discrete mathematics as early-elementary enrichment: the literature, the '
        + 'standards argument, the equity case, plus an explicit account of what the evidence '
        + 'does not support, including the absence of any efficacy trial at this grade.',
  },
  {
    file: '/downloads/discrete-math-pilot-packet.pdf',
    label: 'Pilot Adoption Packet',
    kind: 'For a principal',
    meta: 'PDF · 10 pages',
    icon: FileText,
    desc: 'What a principal needs to decide: the one-pager, what a pilot involves, the full '
        + 'standards crosswalk, the cost sheet, and a complete sample week reproduced exactly '
        + 'as a student receives it.',
  },
];

function BookCard({ b, i }: { b: Book; i: number }) {
  const hue = STRAND_HUE[b.strand];
  return (
    <FadeIn delay={Math.min(i, 5) * 0.06}>
      <div style={{ background: CARD_BG, border: `1px solid ${LINE}`, borderRadius: '12px',
        overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column',
        boxShadow: '0 1px 2px rgba(22,35,58,0.04)' }}>
        <div style={{ height: '4px', background: hue.fill }} />
        <div style={{ padding: '1.5rem 1.6rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem',
            flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em',
              textTransform: 'uppercase' as const, color: hue.ink, background: `${hue.fill}1A`,
              border: `1px solid ${hue.fill}40`, borderRadius: '999px', padding: '0.15rem 0.6rem' }}>
              Grade {b.grade}
            </span>
            <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em',
              textTransform: 'uppercase' as const, color: SUBTLE }}>{b.strand}</span>
            <span style={{ marginLeft: 'auto', fontSize: '0.68rem', fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: GROW_INK }}>
              Published
            </span>
          </div>

          <h3 style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: '1.5rem', lineHeight: 1.1,
            color: INK, marginBottom: '0.4rem' }}>{b.name}</h3>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.55, color: hue.ink, fontWeight: 600,
            marginBottom: '0.8rem' }}>{b.move}</p>
          <p style={{ fontSize: '0.86rem', lineHeight: 1.7, color: BODY, marginBottom: '1.1rem' }}>
            {b.desc}
          </p>

          <div style={{ marginTop: 'auto', borderTop: `1px solid ${LINE}`, paddingTop: '1rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '0.8rem' }}>
              <a href={b.workbook} className="btn-primary" style={{ fontSize: '0.8rem', padding: '0.6rem 1rem' }}>
                <Download size={14} /> Student workbook
              </a>
              <a href={b.guide} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '0.6rem 1rem' }}>
                <ExternalLink size={14} /> Teacher guide
              </a>
            </div>
            <p style={{ fontSize: '0.72rem', color: SUBTLE, marginBottom: '0.55rem' }}>
              Workbook: PDF · {b.pages} pages. Guide: {b.guideMeta}.
            </p>
            <p style={{ fontSize: '0.79rem', lineHeight: 1.65, color: SUBTLE }}>{b.guideDesc}</p>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

function StrandBlock({ title, note, books, hue }: {
  title: string; note: string; books: Book[]; hue: { fill: string; ink: string };
}) {
  return (
    <div style={{ marginBottom: '3.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.9rem', flexWrap: 'wrap',
        marginBottom: '0.4rem' }}>
        <span aria-hidden style={{ width: '28px', height: '6px', borderRadius: '3px',
          background: hue.fill, display: 'inline-block' }} />
        <h2 style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 'clamp(1.5rem, 2.6vw, 2rem)',
          color: INK }}>{title}</h2>
        <span style={{ fontSize: '0.85rem', color: SUBTLE }}>
          {books.length} {books.length === 1 ? 'school year' : 'school years'}, published and free
        </span>
      </div>
      <p style={{ fontSize: '0.9rem', color: BODY, maxWidth: '72ch', marginBottom: '1.4rem' }}>{note}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '1.25rem' }}>
        {books.map((b, i) => <BookCard key={b.workbook} b={b} i={i} />)}
      </div>
    </div>
  );
}

export default function ResourcesUi() {
  return (
    <Page>
      <Hero
        eyebrow="Open materials"
        accent={SPARK}
        title={<>Take it.<br /><span style={{ color: SPARK_INK }}>It is free.</span></>}
        lede={
          <>
            <p style={{ marginBottom: '0.9rem' }}>
              Everything we build is published in full, the student workbook, the complete answer
              key, the research behind it, and the packet we hand to principals. No email wall, no
              license, no partial preview.
            </p>
            <p style={{ marginBottom: '0.9rem' }}>
              Use it in your classroom, adapt it for your district, or read it to decide whether we
              know what we are doing. All three are the point. You owe us no report, no email and
              no account, and if a year of this works it will be because of{' '}
              <Link href="/teachers" style={{ color: CONNECT_INK, fontWeight: 600 }}>the person who ran it</Link>,
              not the paper.
            </p>
            <p style={{ margin: 0 }}>
              On this page:{' '}
              <strong style={{ color: INK }}>
                {PUBLISHED_YEARS.length} complete school years, {PUBLISHED_WEEKS} weekly
                assignments, and the teacher guide for every one of them.
              </strong>
            </p>
          </>
        }
      />

      <Section tinted>
        <StrandBlock
          title="Mathematics"
          hue={STRAND_HUE['Mathematics']}
          note="Six school years of discrete mathematics, Grades 1 to 6. One weekly assignment,
                two pages, sequenced against the California pacing guide so it reinforces what the
                class is already doing that month."
          books={MATH_BOOKS}
        />
        <StrandBlock
          title="Entrepreneurship"
          hue={STRAND_HUE['Entrepreneurship']}
          note="Three school years, Grades 4 to 6. One student, one product and one market day in
                the first year, then teams, forecasts and a rival in the two that follow."
          books={ENTERPRISE_BOOKS}
        />
        <StrandBlock
          title="Financial literacy"
          hue={STRAND_HUE['Financial literacy']}
          note="Four school years, Grades 3 to 6. A student's own money first, then a plan, then
                the difference between a price and a cost, then the numbers other people put in
                front of them."
          books={MONEY_BOOKS}
        />

        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.9rem', flexWrap: 'wrap',
            marginBottom: '1.2rem' }}>
            <span aria-hidden style={{ width: '28px', height: '6px', borderRadius: '3px',
              background: LINE_2, display: 'inline-block' }} />
            <h2 style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 'clamp(1.5rem, 2.6vw, 2rem)',
              color: INK }}>Not books</h2>
            <span style={{ fontSize: '0.85rem', color: SUBTLE }}>the argument, and the packet</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '1.25rem' }}>
            {DOCUMENTS.map((d, i) => {
              const Icon = d.icon;
              return (
                <FadeIn key={d.file} delay={i * 0.08}>
                  <div style={{ background: CARD_BG, border: `1px solid ${LINE}`, borderRadius: '12px',
                    padding: '1.5rem 1.6rem', height: '100%', display: 'flex', flexDirection: 'column',
                    boxShadow: '0 1px 2px rgba(22,35,58,0.04)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '0.8rem' }}>
                      <span style={{ width: '38px', height: '38px', borderRadius: '9px',
                        background: '#EEF3FE', color: CONNECT_INK, display: 'inline-flex',
                        alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={18} />
                      </span>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em',
                        textTransform: 'uppercase' as const, color: SUBTLE }}>{d.kind}</span>
                    </div>
                    <h3 style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: '1.4rem',
                      color: INK, marginBottom: '0.3rem' }}>{d.label}</h3>
                    <p style={{ fontSize: '0.75rem', color: SUBTLE, marginBottom: '0.8rem' }}>{d.meta}</p>
                    <p style={{ fontSize: '0.86rem', lineHeight: 1.7, color: BODY, marginBottom: '1.2rem' }}>
                      {d.desc}
                    </p>
                    <a href={d.file} className="btn-primary"
                      style={{ marginTop: 'auto', alignSelf: 'flex-start', fontSize: '0.8rem', padding: '0.6rem 1rem' }}>
                      <Download size={14} /> Download
                    </a>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </Section>

      <Section>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
          <FadeIn>
            <Eyebrow>Why give it away</Eyebrow>
            <Title size="clamp(1.8rem, 3.4vw, 2.7rem)">The materials are<br />the argument.</Title>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: BODY, maxWidth: '54ch', marginTop: '1rem' }}>
              A curriculum you cannot read is a claim you have to take on trust. Publishing the
              whole thing, including the answer key and the research caveats, is the fastest way
              to show a teacher, a principal or a funder exactly what they would be getting.
            </p>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: BODY, maxWidth: '54ch' }}>
              It also means a school that never talks to us can still run the program. That is a
              feature, not a leak.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ padding: '1.75rem 2rem', background: CARD_BG,
              border: `1px solid ${LINE}`, borderRadius: '12px' }}>
              <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em',
                textTransform: 'uppercase' as const, color: CONNECT_INK, marginBottom: '0.75rem' }}>
                Using these materials
              </p>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: BODY, marginBottom: '0.75rem' }}>
                Teachers and schools may print, copy and use everything here at no cost. Attribution
                is appreciated but not required. We would rather it get used.
              </p>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: BODY, marginBottom: '1.25rem' }}>
                If you adapt it for another grade or another district, we would genuinely like to
                hear how it went, including if it did not work.
              </p>
              <Link href="/partner" className="btn-secondary">Tell us how it went <ArrowUpRight size={14} /></Link>
            </div>
          </FadeIn>
        </div>
      </Section>

      <Section tinted>
        <FadeIn>
          <InkSlab>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              flexWrap: 'wrap', gap: '1.5rem' }}>
              <div>
                <p style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                  color: '#FFFFFF', marginBottom: '0.5rem' }}>More is coming.</p>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.75, color: '#D7DFEC', maxWidth: '58ch' }}>
                  Assessment instruments and a teacher training deck next, then Grade 1 to close the
                  bottom of the mathematics line. Science and the Grades 6 to 12 enterprise
                  materials follow. The full map, with an honest status on every grade band, is on
                  the curriculum page.
                </p>
              </div>
              <Link href="/for-schools" className="btn-primary">Run the pilot <ArrowUpRight size={14} /></Link>
            </div>
          </InkSlab>
          <p style={{ fontSize: '0.82rem', color: SUBTLE, marginTop: '1.5rem', maxWidth: '72ch' }}>
            Nothing here has been taught start to finish in a classroom yet, and none of it carries
            an outcome claim, because there is no cohort to draw one from. What you can check today
            is whether the material is any good.
          </p>
        </FadeIn>
      </Section>
    </Page>
  );
}
