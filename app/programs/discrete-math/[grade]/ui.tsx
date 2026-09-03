'use client';

/**
 * One renderer for every book in the math line.
 *
 * The three enterprise program pages were once three near-identical hand-written
 * files totalling 353KB, and stale content hid in them for months. Five grade
 * pages would have been the same mistake with a different subject, so this is
 * one component driven by content/mathLine.ts, which is itself generated from
 * the books. The week table below is the book's own table of contents: week
 * number, strand, assignment title and the one-line subtitle printed under it.
 */

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight, ChevronRight, ChevronLeft, Download, BookOpen, GraduationCap,
  Clock, FileCheck, Landmark, PenLine, Search,
} from 'lucide-react';
import {
  Page, Section, Container, FadeIn, Card,
  WHITE, MUTED, SLATE_2, SLATE_3, GOLD, DISPLAY, SANS,
} from '@/components/kit';
import { MATH_LINE, type MathBook } from '@/content/mathLine';

const CONNECT_L = '#2149C7';
// Text-safe. The light orange this used to hold, #FF9A69, measures 1.8:1 on the
// tinted band and was carrying the week numbers and every standard code.
const SPARK_L   = '#A8380A';
const GROW_L    = '#0C6B4F';
// Cycles, so the ladder keeps its rhythm however many books there are.
const RUNG = [CONNECT_L, SPARK_L, GROW_L];

/**
 * The page shapes in the line, and there are three of them.
 *
 * Grade 1 has five parts and one of them is unique to it: a single sentence
 * stating the task, because the reader is six. Grade 2 has five without it. The
 * later books add the Words to keep box and the artifact page, so their weeks
 * have seven. Stated separately rather than described as one shape, because
 * they are not one shape, and a page that claims a box a book does not have is
 * the sort of thing nobody notices for a year.
 */
const ANATOMY_G2 = [
  ['In class this week', 'The standard the class is already working on, so the sheet reinforces Tuesday’s lesson.'],
  ['Number Warm-Up', 'Two minutes of ordinary grade-level fluency. The page starts on familiar ground.'],
  ['The Adventure', 'The main activity, with every map, grid and diagram printed on the page.'],
  ['Talk About It', 'One question answered out loud. Short answers, long reasons.'],
  ['★ Challenge Zone', 'Genuinely harder, and not expected of everyone.'],
];

const ANATOMY_G1 = [
  ['In class this week', 'For the teacher: the standard the class is already working on.'],
  ['Number Warm-Up', 'Two minutes of counting out loud. The page starts on familiar ground.'],
  ['One sentence', 'The task, in a sentence a first grader can decode: never more than twelve words, and every word on a first-grade list.'],
  ['The picture', 'The task itself, not an illustration of it. Remove the sentence and a teacher can still tell what the page wants.'],
  ['Room to draw', 'The rest of the page, left open to work in.'],
];

const ANATOMY_LATER = (artifact: string) => [
  ['In class this week', 'The standard the class is already working on, so the sheet reinforces Tuesday’s lesson.'],
  ['Number Warm-Up', 'Two minutes of ordinary grade-level fluency. The page starts on familiar ground.'],
  ['Words to keep', 'The two or three terms this week needs, defined where the student meets them.'],
  ['The main activity', 'Every map, grid, graph and diagram printed on the page, nothing to prepare.'],
  ['More to try', 'The practice set, on page two.'],
  [`Add to your ${artifact.replace(/^The /, '')}`, 'The week’s page of the artifact the student builds across the year.'],
  ['Talk About It, then ★ Challenge Zone', 'One question out loud, a hint, then something genuinely harder.'],
];

function Stat({ value, label, sub, accent }: {
  value: string; label: string; sub: string; accent: string;
}) {
  return (
    <div>
      <div style={{ fontFamily: DISPLAY, fontSize: 'clamp(2rem, 3.6vw, 2.9rem)', lineHeight: 1.06,
        color: accent, letterSpacing: '-0.01em' }}>{value}</div>
      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: WHITE, marginTop: '0.4rem' }}>{label}</div>
      <div style={{ fontSize: '0.73rem', color: MUTED, marginTop: '0.15rem' }}>{sub}</div>
    </div>
  );
}

export default function MathBookUi({ book }: { book: MathBook }) {
  const index  = MATH_LINE.findIndex((b) => b.slug === book.slug);
  const accent = RUNG[index % RUNG.length];
  const prev   = MATH_LINE[index - 1];
  const next   = MATH_LINE[index + 1];

  const [q, setQ] = useState('');
  const weeks = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return book.weeks;
    return book.weeks.filter((w) =>
      `${w.n} ${w.strand} ${w.title} ${w.sub}`.toLowerCase().includes(t));
  }, [q, book.weeks]);

  const anatomy = book.artifact ? ANATOMY_LATER(book.artifact)
                : book.grade === 1 ? ANATOMY_G1 : ANATOMY_G2;

  return (
    <Page>
      {/* ── Hero ──────────────────────────────────────── */}
      <section style={{ position: 'relative', overflow: 'hidden', paddingTop: '5rem' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', inset: 0,
            background: '#FFFFFF' }} />
          <div style={{ position: 'absolute', top: '6%', right: '-8%', width: '58%', height: '72%',
            background: `radial-gradient(ellipse, ${accent}1F 0%, transparent 65%)` }} />
          <div style={{ position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(45,91,227,0.03) 1px, transparent 1px), '
                           + 'linear-gradient(90deg, rgba(45,91,227,0.03) 1px, transparent 1px)',
            backgroundSize: '56px 56px' }} />
        </div>

        <Container style={{ position: 'relative', paddingTop: 'clamp(3rem, 6vw, 4.5rem)',
          paddingBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem',
            flexWrap: 'wrap' }}>
            <Link href="/programs/discrete-math" style={{ fontSize: '0.68rem', color: SLATE_3,
              textDecoration: 'none', fontWeight: 600, letterSpacing: '0.08em' }}>
              Discrete mathematics
            </Link>
            <ChevronRight size={12} color={SLATE_3} />
            <span style={{ fontSize: '0.68rem', color: accent, fontWeight: 700,
              letterSpacing: '0.08em' }}>Grade {book.grade}</span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', marginBottom: '1.5rem' }}>
            {[
              { icon: GraduationCap, text: `Grade ${book.grade}` },
              { icon: Clock,         text: '36 weeks' },
              { icon: BookOpen,      text: `${book.pages} pages` },
            ].map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.375rem 0.875rem', background: `${accent}14`,
                  border: `1px solid ${accent}33`, borderRadius: '2px' }}>
                  <Icon size={12} color={accent} />
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em',
                    textTransform: 'uppercase' as const, color: accent }}>{b.text}</span>
                </div>
              );
            })}
          </div>

          <h1 style={{ fontFamily: DISPLAY, fontSize: 'clamp(2.4rem, 6.5vw, 5.4rem)', lineHeight: 1.06,
            letterSpacing: '-0.01em', color: WHITE, marginBottom: '0.75rem' }}>
            {book.title}
          </h1>
          <p style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.1rem, 2.2vw, 1.6rem)',
            letterSpacing: '-0.01em', color: accent, marginBottom: '1.5rem' }}>
            {book.move}. {book.moveLine}
          </p>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: MUTED, maxWidth: '58ch',
            marginBottom: '2rem' }}>{book.lede}</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem' }}>
            <a href={book.workbook} className="btn-gold">
              Download the workbook <Download size={14} />
            </a>
            <a href={book.guide} className="btn-ghost">
              Teacher guide <ArrowUpRight size={13} />
            </a>
          </div>
        </Container>
      </section>

      {/* ── Facts ─────────────────────────────────────── */}
      <Section tinted>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '2rem' }}>
          <Stat value="36" label="weekly assignments" sub="two pages each" accent={accent} />
          <Stat value={String(book.pages)} label="printable pages" sub="proofed in grayscale" accent={accent} />
          <Stat value={String(book.standards.length)} label="CA standards touched"
            sub="named on the page each week" accent={accent} />
          {book.checks > 0
            ? <Stat value={book.checks.toLocaleString('en-US')} label="answers recomputed"
                sub="from the problems, on every build" accent={accent} />
            : <Stat value="$0" label="cost to a school" sub="photocopy and go" accent={accent} />}
        </div>
      </Section>

      {/* ── The artifact ──────────────────────────────── */}
      {book.artifact && (
        <Section>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem', alignItems: 'start' }}>
            <FadeIn>
              <p className="label-eyebrow" style={{ color: GROW_L, marginBottom: '0.5rem' }}>
                What the student ends the year holding
              </p>
              <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.8rem, 3.6vw, 2.9rem)', lineHeight: 1.06,
                letterSpacing: '-0.01em', color: WHITE, marginBottom: '1rem' }}>
                {book.artifact}.
              </h2>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: MUTED, maxWidth: '52ch' }}>
                {book.artifactLine}
              </p>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: MUTED, maxWidth: '52ch',
                marginTop: '0.9rem' }}>
                It is built one page a week, in the student’s own words, and it is the reason the
                year holds together rather than reading as thirty-six unrelated puzzles.
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <Card accent={GROW_L} pad="1.75rem">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                  <PenLine size={15} color={GROW_L} />
                  <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.16em',
                    textTransform: 'uppercase' as const, color: GROW_L }}>Anatomy of a week</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {anatomy.map(([label, text], i) => (
                    <div key={label} style={{ display: 'grid', gridTemplateColumns: '1.6rem 1fr', gap: '0.75rem' }}>
                      <div style={{ fontFamily: DISPLAY, fontSize: '1rem', color: SLATE_3, lineHeight: 1.3 }}>
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: WHITE }}>{label}</div>
                        <div style={{ fontSize: '0.76rem', lineHeight: 1.6, color: MUTED }}>{text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </FadeIn>
          </div>
        </Section>
      )}

      {/* ── The 36 weeks ──────────────────────────────── */}
      <Section tinted id="weeks">
        <FadeIn style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <p className="label-eyebrow" style={{ color: accent, marginBottom: '0.5rem' }}>
                Every week, in order
              </p>
              <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', lineHeight: 1.06,
                letterSpacing: '-0.01em', color: WHITE }}>
                The whole year.
              </h2>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.55rem 0.85rem', background: '#FFFFFF',
              border: `1px solid ${accent}25`, borderRadius: '3px', minWidth: '240px' }}>
              <Search size={13} color={SLATE_3} />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Find a week or a topic"
                aria-label={`Search the ${book.title} week list`}
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none',
                  color: WHITE, fontFamily: SANS, fontSize: '0.8rem' }}
              />
            </label>
          </div>
        </FadeIn>

        <div style={{ overflowX: 'auto' }}>
          <div style={{ minWidth: '680px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '46px minmax(130px, 0.7fr) minmax(180px, 1fr) minmax(240px, 1.5fr)',
              gap: '1rem', padding: '0 0.5rem 0.6rem', borderBottom: `2px solid ${WHITE}22` }}>
              {['Wk', 'Strand', 'Assignment', 'What the week is'].map((h) => (
                <div key={h} style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.16em',
                  textTransform: 'uppercase' as const, color: WHITE }}>{h}</div>
              ))}
            </div>
            {weeks.map((w) => (
              <div key={w.n} style={{ display: 'grid',
                gridTemplateColumns: '46px minmax(130px, 0.7fr) minmax(180px, 1fr) minmax(240px, 1.5fr)',
                gap: '1rem', padding: '0.7rem 0.5rem',
                borderBottom: '1px solid rgba(90,104,128,0.08)' }}>
                <div style={{ fontFamily: DISPLAY, fontSize: '1.15rem', color: accent, lineHeight: 1.2,
                  fontVariantNumeric: 'tabular-nums' }}>{String(w.n).padStart(2, '0')}</div>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em',
                  textTransform: 'uppercase' as const, color: SLATE_3, paddingTop: '2px' }}>{w.strand}</div>
                <div style={{ fontSize: '0.84rem', fontWeight: 600, color: WHITE, lineHeight: 1.5 }}>{w.title}</div>
                <div style={{ fontSize: '0.8rem', color: MUTED, lineHeight: 1.6 }}>{w.sub}</div>
              </div>
            ))}
            {weeks.length === 0 && (
              <p style={{ fontSize: '0.85rem', color: MUTED, padding: '1.5rem 0.5rem' }}>
                Nothing in this year matches “{q}”. The other four books are on the{' '}
                <Link href="/programs/discrete-math" style={{ color: accent }}>line page</Link>.
              </p>
            )}
          </div>
        </div>

        <p style={{ fontSize: '0.75rem', color: SLATE_3, marginTop: '1.25rem', maxWidth: '72ch' }}>
          This is the book’s own table of contents, read out of the source rather than retyped
          here. The fourth column is the line printed under the title on the student’s page.
        </p>
      </Section>

      {/* ── Standards + downloads ─────────────────────── */}
      <Section>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
          <FadeIn>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <Landmark size={15} color={accent} />
              <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.16em',
                textTransform: 'uppercase' as const, color: accent }}>
                California standards touched
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', lineHeight: 1.75, color: MUTED, marginBottom: '1.1rem',
              maxWidth: '52ch' }}>
              This is enrichment: it reinforces and extends these standards rather than delivering
              them. No standard here is taught to mastery by this program alone. The list is the
              set of codes actually named in the “In class this week” line across the 36 weeks,
              counted from the published book.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {book.standards.map((code) => (
                <span key={code} style={{ padding: '0.25rem 0.55rem', background: `${accent}14`,
                  border: `1px solid ${accent}30`, borderRadius: '2px', fontSize: '0.68rem',
                  fontWeight: 600, color: accent, fontVariantNumeric: 'tabular-nums' }}>{code}</span>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <FileCheck size={15} color={GROW_L} />
              <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.16em',
                textTransform: 'uppercase' as const, color: GROW_L }}>Everything, free</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { href: book.workbook, label: 'Student workbook',
                  meta: `PDF · ${book.pages} pages · Grade ${book.grade}`, accent },
                { href: book.guide, label: 'Teacher guide',
                  meta: 'Web page · all 36 weeks', accent: GROW_L },
              ].map((d) => (
                <a key={d.href} href={d.href} style={{ display: 'flex', alignItems: 'center',
                  gap: '0.75rem', padding: '0.9rem 1rem', background: '#FFFFFF',
                  border: `1px solid ${d.accent}25`, borderRadius: '3px', textDecoration: 'none' }}>
                  <Download size={14} color={d.accent} style={{ flexShrink: 0 }} />
                  <span>
                    <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: WHITE }}>{d.label}</span>
                    <span style={{ display: 'block', fontSize: '0.7rem', color: MUTED }}>{d.meta}</span>
                  </span>
                </a>
              ))}
            </div>
            <p style={{ fontSize: '0.78rem', lineHeight: 1.75, color: MUTED, marginTop: '1.1rem',
              maxWidth: '48ch' }}>
              {book.checks > 0
                ? `Every one of the ${book.checks.toLocaleString('en-US')} numeric answers in that `
                  + 'guide is recomputed from the problem as the workbook states it, by a script '
                  + 'that ships with the source and runs on every build.'
                : 'This guide predates the checking script the four later books ship with, so its '
                  + 'answers have been read rather than recomputed. Writing that check is on the list.'}
            </p>
          </FadeIn>
        </div>
      </Section>

      {/* ── Prev / next ───────────────────────────────── */}
      <section style={{ background: SLATE_2, borderTop: '1px solid rgba(45,91,227,0.1)' }}>
        <Container style={{ paddingTop: 'clamp(3rem, 6vw, 4.5rem)', paddingBottom: 'clamp(3rem, 6vw, 4.5rem)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            {prev ? (
              <Link href={`/programs/discrete-math/${prev.slug}`} className="card-glass"
                style={{ padding: '1.25rem 1.4rem', textDecoration: 'none', display: 'block' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.65rem',
                  fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase' as const,
                  color: MUTED, marginBottom: '0.5rem' }}>
                  <ChevronLeft size={12} /> The year before
                </div>
                <div style={{ fontFamily: DISPLAY, fontSize: '1.35rem', letterSpacing: '-0.01em', color: WHITE }}>
                  GRADE {prev.grade}: {prev.title}
                </div>
                <div style={{ fontSize: '0.78rem', color: MUTED, marginTop: '0.3rem' }}>{prev.move}.</div>
              </Link>
            ) : <div />}
            {next ? (
              <Link href={`/programs/discrete-math/${next.slug}`} className="card-glass"
                style={{ padding: '1.25rem 1.4rem', textDecoration: 'none', display: 'block' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.65rem',
                  fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase' as const,
                  color: MUTED, marginBottom: '0.5rem' }}>
                  The year after <ChevronRight size={12} />
                </div>
                <div style={{ fontFamily: DISPLAY, fontSize: '1.35rem', letterSpacing: '-0.01em', color: WHITE }}>
                  GRADE {next.grade}: {next.title}
                </div>
                <div style={{ fontSize: '0.78rem', color: MUTED, marginTop: '0.3rem' }}>{next.move}.</div>
              </Link>
            ) : (
              <div className="card-glass" style={{ padding: '1.25rem 1.4rem' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.14em',
                  textTransform: 'uppercase' as const, color: MUTED, marginBottom: '0.5rem' }}>
                  The end of the line
                </div>
                <div style={{ fontSize: '0.82rem', lineHeight: 1.7, color: MUTED }}>
                  Grade 6 is the last book in this line. What follows it is not written yet, and
                  the <Link href="/curriculum" style={{ color: GOLD }}>curriculum map</Link> says
                  so cell by cell.
                </div>
              </div>
            )}
          </div>

          <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem' }}>
            <p style={{ fontSize: '0.85rem', color: MUTED, maxWidth: '54ch' }}>
              No year in this line has been run start to finish in a classroom yet. If you would
              be the first teacher to do it, we would like to hear from you.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href="/partner" className="btn-gold">Run a pilot <ArrowUpRight size={14} /></Link>
              <Link href="/programs/discrete-math" className="btn-ghost">All {MATH_LINE.length} years <ChevronRight size={13} /></Link>
            </div>
          </div>
        </Container>
      </section>
    </Page>
  );
}
