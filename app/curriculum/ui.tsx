'use client';

import Link from 'next/link';
import {
  ArrowUpRight, CheckCircle, PenTool, Map as MapIcon, Minus,
} from 'lucide-react';
import {
  Page, Hero, Section, Eyebrow, Title, FadeIn, Card,
  WHITE, MUTED, SLATE_3, GOLD, GOLD_L, ROYAL, ROYAL_L, GREEN_L, DISPLAY,
} from '@/components/kit';
import {
  CURRICULUM, GRADE_BANDS, STATUS_LABEL, countByStatus, AVAILABLE_NOW, spellOut,
  foundedYear, type Status, type Strand,
} from '@/content/org';
import { PUBLISHED_WEEKS, PUBLISHED_YEARS } from '@/content/published';

const STATUS_STYLE: Record<Status, { fg: string; bg: string; bd: string; icon: React.ElementType | null }> = {
  published: { fg: GREEN_L, bg: 'rgba(23,166,124,0.10)', bd: 'rgba(23,166,124,0.32)', icon: CheckCircle },
  designed:  { fg: GOLD_L,  bg: 'rgba(255,196,77,0.09)', bd: 'rgba(255,196,77,0.28)',  icon: PenTool },
  planned:   { fg: ROYAL,   bg: 'rgba(45,91,227,0.07)', bd: 'rgba(45,91,227,0.22)',  icon: MapIcon },
  'n/a':     { fg: SLATE_3, bg: 'transparent',           bd: 'rgba(90,104,128,0.10)', icon: Minus },
};

/**
 * The hero reads "Five subjects. Twelve grades. N years finished." and the
 * first two are words, so the third has to be. It is still derived: the count
 * comes from the generated list of published books, this only spells it.
 *
 * This used to keep its own word list, which stopped at twelve and so rendered
 * "13 years finished" the day the thirteenth book shipped. It now shares
 * spellOut() with the rest of the site, so there is one list to extend.
 */
const spell = (n: number) => spellOut(n);

function Cell({ status, note }: { status: Status; note?: string }) {
  const st = STATUS_STYLE[status];
  const Icon = st.icon;
  return (
    <div style={{ background: st.bg, border: `1px solid ${st.bd}`, borderRadius: '3px',
      padding: '0.7rem 0.8rem', height: '100%', minHeight: '76px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: note ? '0.4rem' : 0 }}>
        {Icon && <Icon size={12} color={st.fg} style={{ flexShrink: 0 }} />}
        <span style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.12em',
          textTransform: 'uppercase' as const, color: st.fg }}>
          {STATUS_LABEL[status]}
        </span>
      </div>
      {note && (
        <p style={{ fontSize: '0.7rem', lineHeight: 1.5, color: MUTED }}>{note}</p>
      )}
    </div>
  );
}

function StrandRow({ s }: { s: Strand }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(210px, 1.15fr) repeat(4, minmax(120px, 1fr))',
      gap: '0.5rem', alignItems: 'stretch', marginBottom: '0.5rem' }}>
      <div style={{ paddingRight: '1rem' }}>
        <p style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.16em',
          textTransform: 'uppercase' as const,
          color: s.track === 'Academics' ? ROYAL_L : GOLD, marginBottom: '0.25rem' }}>
          {s.track}
        </p>
        <h3 style={{ fontFamily: DISPLAY, fontSize: '1.5rem', letterSpacing: '-0.01em',
          color: WHITE, lineHeight: 1.06, marginBottom: '0.45rem' }}>
          {s.name}
        </h3>
        <p style={{ fontSize: '0.76rem', lineHeight: 1.6, color: MUTED }}>{s.blurb}</p>
      </div>
      {s.bands.map((b) => <Cell key={b.band} status={b.status} note={b.note} />)}
    </div>
  );
}

export default function CurriculumUi() {
  const published = countByStatus('published');
  const designed  = countByStatus('designed');
  const planned   = countByStatus('planned');

  return (
    <Page>
      <Hero
        eyebrow="Curriculum scope & status"
        title={<>Five subjects.<br />Twelve grades.<br />
          <span style={{ color: GOLD_L }}>{spell(PUBLISHED_YEARS.length)} years finished.</span></>}
        accent={GOLD_L}
        lede={
          <>
            <p style={{ marginBottom: '0.9rem' }}>
              We are building mathematics and science across Grades 1&ndash;12, and leadership,
              entrepreneurship and financial literacy from Grade 3 upward. That is the plan. It
              will take years, and most of the grid below still says so.
            </p>
            <p style={{ margin: 0 }}>
              Every cell carries an honest label, so nobody has to guess which parts are real.{' '}
              <strong style={{ color: WHITE }}>Ready to run today: {AVAILABLE_NOW}</strong>
            </p>
          </>
        }
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem' }}>
          <Link href="/resources" className="btn-gold">Take the finished years <ArrowUpRight size={14} /></Link>
          <Link href="/teachers" className="btn-ghost">What running a year involves <ArrowUpRight size={13} /></Link>
        </div>
      </Hero>

      {/* ── Status counts ──────────────────────────────── */}
      <Section tinted accent={GOLD}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          {[
            { n: published, l: 'Published',
              s: 'At least one complete year written and free to download. The cell says which grades',
              c: GREEN_L, i: CheckCircle },
            { n: designed,  l: 'Designed',  s: 'Syllabus and modules complete, materials not yet written', c: GOLD_L, i: PenTool },
            { n: planned,   l: 'Planned',   s: 'On the roadmap, not started', c: ROYAL_L, i: MapIcon },
          ].map((x, i) => {
            const Icon = x.i;
            return (
              <FadeIn key={x.l} delay={i * 0.08}>
                <div>
                  <Icon size={17} color={x.c} />
                  <div style={{ fontFamily: DISPLAY, fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                    lineHeight: 1.06, color: x.c, marginTop: '0.5rem' }}>{x.n}</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: WHITE }}>
                    {x.l} <span style={{ color: MUTED, fontWeight: 400 }}>grade bands</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: MUTED, marginTop: '0.2rem', maxWidth: '30ch' }}>{x.s}</div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* ── The matrix ─────────────────────────────────── */}
      <Section>
        <FadeIn style={{ marginBottom: '2rem' }}>
          <Eyebrow>The map</Eyebrow>
          <Title size="clamp(1.9rem, 4vw, 3.4rem)">Every subject,<br />every grade band.</Title>
        </FadeIn>

        <div style={{ overflowX: 'auto', paddingBottom: '0.5rem' }}>
          <div style={{ minWidth: '760px' }}>
            {/* header */}
            <div style={{ display: 'grid',
              gridTemplateColumns: 'minmax(210px, 1.15fr) repeat(4, minmax(120px, 1fr))',
              gap: '0.5rem', marginBottom: '0.75rem', paddingBottom: '0.6rem',
              borderBottom: `2px solid ${WHITE}22` }}>
              <div />
              {GRADE_BANDS.map((b) => (
                <div key={b} style={{ fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.14em',
                  textTransform: 'uppercase' as const, color: WHITE }}>{b}</div>
              ))}
            </div>
            {CURRICULUM.map((s, i) => (
              <FadeIn key={s.key} delay={i * 0.05}><StrandRow s={s} /></FadeIn>
            ))}
          </div>
        </div>

        <FadeIn delay={0.3}>
          <p style={{ fontSize: '0.78rem', color: SLATE_3, marginTop: '1.25rem', maxWidth: '72ch' }}>
            A band marked <em>published</em> means at least one complete year in it can be
            downloaded and run today, and the note on the cell names exactly which grades those
            are. Mathematics and science read published across three bands because Grades 1
            through 6 are written; Grades 7 and 8 are not, and the cells say so.
          </p>
          <p style={{ fontSize: '0.78rem', color: SLATE_3, marginTop: '0.75rem', maxWidth: '72ch' }}>
            Much of this grid still says <em>planned</em>, and publishing it that way is the
            point. An organization founded in {foundedYear()} with {PUBLISHED_YEARS.length}{' '}
            finished years of curriculum, {PUBLISHED_WEEKS} weekly assignments and no program
            yet run with students is exactly what we are. The grid is how that becomes a K&ndash;12 program,
            one honest cell at a time.
          </p>
        </FadeIn>
      </Section>

      {/* ── Two tracks ─────────────────────────────────── */}
      <Section tinted>
        <FadeIn style={{ marginBottom: '2.5rem' }}>
          <Eyebrow color={GOLD}>How it fits together</Eyebrow>
          <Title size="clamp(1.9rem, 4vw, 3.4rem)">Two tracks.<br />One argument.</Title>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          <FadeIn>
            <Card accent={ROYAL_L} pad="1.9rem">
              <p style={{ fontSize: '0.64rem', fontWeight: 800, letterSpacing: '0.18em',
                textTransform: 'uppercase' as const, color: ROYAL_L, marginBottom: '0.6rem' }}>
                Academics · Grades 1–12
              </p>
              <h3 style={{ fontFamily: DISPLAY, fontSize: '1.9rem', letterSpacing: '-0.01em',
                color: WHITE, lineHeight: 1.06, marginBottom: '0.9rem' }}>
                Mathematics &amp; science
              </h3>
              <p style={{ fontSize: '0.87rem', lineHeight: 1.8, color: MUTED, marginBottom: '1rem' }}>
                Weekly enrichment that runs alongside the state curriculum. Reasoning-first,
                low materials cost, printable in black and white, and sequenced so each week
                reinforces the standard the class is already teaching.
              </p>
              <p style={{ fontSize: '0.87rem', lineHeight: 1.8, color: MUTED, marginBottom: '1rem' }}>
                Grades 1 through 6 are written, as six separate school years that each teach one
                new mathematical move: sort it, see it, count it, rule it out, cost it,
                generalize it. Any one of them runs on its own, and the elementary band is now
                continuous from Grade 1 to Grade 6.
              </p>
              <p style={{ fontSize: '0.87rem', lineHeight: 1.8, color: MUTED, marginBottom: '1rem' }}>
                Science has six years: Look and Listen (Grade 1), Look Closer (Grade 2),
                What Made That Happen? (Grade 3), Where Did It Go? (Grade 4), Too Small to See
                (Grade 5) and Inside the System (Grade 6), thirty-six weeks each. Grades 7 and 8
                are deliberately unwritten, and high school science is not written yet.
              </p>
              <Link href="/programs/discrete-math" style={{ display: 'inline-flex', alignItems: 'center',
                gap: '0.4rem', fontSize: '0.8rem', fontWeight: 600, color: ROYAL_L,
                textDecoration: 'none' }}>
                The six mathematics years <ArrowUpRight size={13} />
              </Link>
            </Card>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Card accent={GOLD} pad="1.9rem">
              <p style={{ fontSize: '0.64rem', fontWeight: 800, letterSpacing: '0.18em',
                textTransform: 'uppercase' as const, color: GOLD, marginBottom: '0.6rem' }}>
                Enterprise · Grades 3–12
              </p>
              <h3 style={{ fontFamily: DISPLAY, fontSize: '1.9rem', letterSpacing: '-0.01em',
                color: WHITE, lineHeight: 1.06, marginBottom: '0.9rem' }}>
                Leadership, venture &amp; money
              </h3>
              <p style={{ fontSize: '0.87rem', lineHeight: 1.8, color: MUTED, marginBottom: '1rem' }}>
                In the elementary grades this runs as a full school year, one assignment a
                week, delivered by whoever is already in the room, because younger students
                hold this better spread out than compressed. The Grades 4, 5 and 6 years are
                written, which makes the elementary band continuous. From Grade 7 it takes a
                different shape: self-paced lessons in an app, with an AI tutor, and
                in-person sessions with guests from business in place of classwork. Its
                first unit is written, and educators can try it in a preview. No student has
                used it yet.{' '}
                <Link href="/teachers" style={{ color: GOLD_L }}>Why the two shapes differ</Link>.
              </p>
              <p style={{ fontSize: '0.87rem', lineHeight: 1.8, color: MUTED, marginBottom: '1rem' }}>
                This is the knowledge that usually arrives through a family, not a school. That
                is precisely why it belongs in one.
              </p>
              <Link href="/pathway" style={{ display: 'inline-flex', alignItems: 'center',
                gap: '0.4rem', fontSize: '0.8rem', fontWeight: 600, color: GOLD_L,
                textDecoration: 'none' }}>
                How the years stack up, Grades 3 to 12 <ArrowUpRight size={13} />
              </Link>
            </Card>
          </FadeIn>
        </div>

        <FadeIn delay={0.2}>
          <div style={{ marginTop: '1.5rem', padding: '1.5rem 1.75rem', background: '#FFFFFF',
            border: '1px solid rgba(45,91,227,0.14)', borderRadius: '4px', maxWidth: '860px' }}>
            <p style={{ fontSize: '0.87rem', lineHeight: 1.8, color: MUTED, margin: 0 }}>
              The two tracks share one idea: the material that decides how far a child gets is
              usually rationed by what their family already knows or can pay for. We write it
              properly once, then remove the price.
            </p>
          </div>
        </FadeIn>
      </Section>

      {/* ── Build order ────────────────────────────────── */}
      <Section>
        <FadeIn style={{ marginBottom: '2.5rem' }}>
          <Eyebrow color={GREEN_L}>Build order</Eyebrow>
          <Title size="clamp(1.9rem, 4vw, 3.4rem)">What comes next,<br />and why in that order.</Title>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          {[
            // Until 22 October 2026, 01 was "Run a written year in a real classroom"
            // and 02 the pre/post instrument for that classroom study. The classroom
            // pilot was dropped on 16 October and the Grade 7 app pilot became the
            // first measured program on 21 October (claude/42), so the list follows it.
            { n: '01', a: GREEN_L, t: 'Write the Grade 7 year',
              d: 'The first year of the Grades 7 to 12 app. Its units are mapped, the first '
               + 'ones are written and checked the way the books are, and educators can try '
               + 'the first in a preview. The rest of the year comes next.' },
            { n: '02', a: GOLD_L, t: 'Run the first pilot, and measure it',
              d: 'One unit in the spring as a test, then the full year. The plan for '
               + 'measuring it goes up in public before the first lesson. Nothing else on '
               + 'this list can substitute for students actually using it.' },
            { n: '03', a: ROYAL_L, t: 'Split the years into single weeks',
              d: `${PUBLISHED_WEEKS} two-page assignments currently ship as ${PUBLISHED_YEARS.length} `
               + 'all-or-nothing PDFs. One week is a far easier thing for a teacher to try, and '
               + 'each one names a standard a teacher might search for.' },
            { n: '04', a: ROYAL_L, t: 'Then Grades 8 to 12',
              d: 'Grades 3 to 6 are written, so the elementary band is complete. The other '
               + 'five years of the app are mapped, one idea a year, and none is written '
               + 'yet.' },
            { n: '05', a: SLATE_3, t: 'Science, and the upper grades',
              d: 'Grades 1 to 6 science are written. High school science and the upper grades are '
               + 'still the largest part of the grid and the furthest out. We would rather say '
               + 'that plainly than imply they are nearly done.' },
          ].map((s, i) => (
            <FadeIn key={s.n} delay={i * 0.06}>
              <div style={{ borderTop: `2px solid ${s.a}`, paddingTop: '1rem', height: '100%' }}>
                <div style={{ fontFamily: DISPLAY, fontSize: '1.7rem', color: s.a, lineHeight: 1.06 }}>{s.n}</div>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.92rem', fontWeight: 700, color: WHITE, margin: '0.5rem 0 0.4rem' }}>{s.t}</h3>
                <p style={{ fontSize: '0.79rem', lineHeight: 1.7, color: MUTED }}>{s.d}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ── CTA ────────────────────────────────────────── */}
      <Section tinted>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <p style={{ fontFamily: DISPLAY, fontSize: '2rem', letterSpacing: '-0.01em',
                color: WHITE, marginBottom: '0.4rem' }}>Green cells move faster than gray ones.</p>
              <p style={{ fontSize: '0.85rem', color: MUTED, maxWidth: '56ch' }}>
                Curriculum writers, subject specialists and funders all turn planned cells into
                published ones. So does one teacher willing to run a year that already exists
                and tell us where it broke.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href="/resources" className="btn-gold">Take a finished year <ArrowUpRight size={14} /></Link>
              <Link href="/partner" className="btn-ghost">Help write an unfinished one <ArrowUpRight size={13} /></Link>
            </div>
          </div>
        </FadeIn>
      </Section>
    </Page>
  );
}
