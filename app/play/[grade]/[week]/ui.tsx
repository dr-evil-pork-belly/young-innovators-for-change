'use client';

import Link from 'next/link';
import { Page, Section, Eyebrow, FadeIn, MUTED, ROYAL, SUBTLE, GROW, INK, DISPLAY } from '@/components/kit';
import { BOOKS, findGame, gamesFor, type Game } from '@/content/games';
import { GRADE5 } from '@/components/games/g5';
import { GRADE4 } from '@/components/games/g4';
import { GRADE6 } from '@/components/games/g6';

const GAME_SETS: Record<Game['grade'], Record<number, () => React.JSX.Element>> = { g4: GRADE4, g5: GRADE5, g6: GRADE6 };

export default function GameUi({ grade, week }: { grade: Game['grade']; week: number }) {
  const game = findGame(grade, week)!;
  const book = BOOKS[grade];
  const Game = GAME_SETS[grade][week];
  const others = gamesFor(grade).filter((g) => g.week !== week);
  return (
    <Page>
      <Section>
        <FadeIn>
          <Eyebrow>{book.grade} · {book.name} · Week {week}</Eyebrow>
          <h1 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.9rem, 3.6vw, 3rem)', fontWeight: 800, lineHeight: 1.06, letterSpacing: '-0.01em', color: INK }}>{game.title}</h1>
          <p style={{ color: MUTED, margin: '0.8rem 0 0.4rem', maxWidth: '60ch', fontSize: '1.05rem' }}>{game.line}</p>
          <p style={{ color: SUBTLE, margin: '0 0 1.5rem', maxWidth: '60ch', fontSize: '0.9rem' }}>
            This game goes with week {week} of the workbook. Do the page first; the game is for seeing the numbers move. Nothing you type is kept.
          </p>
        </FadeIn>
        <div style={{ maxWidth: '46rem' }}>
          {Game ? <Game /> : <p style={{ color: MUTED }}>This week&rsquo;s game is not written yet.</p>}
        </div>
        <div style={{ marginTop: '2.5rem', borderTop: `1px solid ${GROW}22`, paddingTop: '1.25rem' }}>
          <p style={{ color: SUBTLE, fontSize: '0.88rem', marginBottom: '0.5rem' }}>
            The workbook: <a href={book.pdf} style={{ color: ROYAL }}>{book.name}</a> (free PDF). The teacher guide: <a href={book.guide} style={{ color: ROYAL }}>answers and watch-fors</a>.
          </p>
          {others.length > 0 && (
            <p style={{ color: SUBTLE, fontSize: '0.88rem' }}>
              Other weeks with a game: {others.map((o, i) => <span key={o.week}>{i > 0 ? ', ' : ''}<Link href={`/play/${o.grade}/${o.week}`} style={{ color: ROYAL }}>{o.week} {o.title}</Link></span>)}.
              {' '}<Link href="/play" style={{ color: ROYAL }}>All games</Link>.
            </p>
          )}
        </div>
      </Section>
    </Page>
  );
}
