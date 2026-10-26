'use client';

import Link from 'next/link';
import { Page, Hero, Section, Eyebrow, Title, FadeIn, Card, MUTED, ROYAL, SUBTLE, GROW } from '@/components/kit';
import { GAMES, BOOKS, type Game } from '@/content/games';

const grades = (['g4', 'g5', 'g6'] as const).filter((g) => GAMES.some((x) => x.grade === g));

export default function PlayUi() {
  return (
    <Page>
      <Hero eyebrow="Games" accent={GROW}
        title={<>Play the money weeks</>}
        lede={<>
          <p style={{ marginBottom: '0.9rem' }}>
            Some weeks of the enterprise workbooks are a thing you can run, not only read: a cost that
            spreads thinner the more you make, a price that sells fewer, a loss that turns into a profit
            one sale at a time. Those weeks have a game here, at the address printed on the page.
          </p>
          <p>Each game runs the week&rsquo;s own numbers. Nothing is stored, nothing is collected, and there is nothing to sign up for.</p>
        </>} />
      {grades.map((g) => (
        <Section key={g} id={g}>
          <FadeIn>
            <Eyebrow>{BOOKS[g].grade}</Eyebrow>
            <Title>{BOOKS[g].name}</Title>
            <p style={{ color: MUTED, margin: '0.8rem 0 1.5rem', maxWidth: '60ch' }}>
              The workbook is <a href={BOOKS[g].pdf} style={{ color: ROYAL }}>a free PDF</a>. The week number below is the week in the book.
            </p>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {GAMES.filter((x) => x.grade === g).map((game) => <GameCard key={game.week} game={game} />)}
          </div>
        </Section>
      ))}
    </Page>
  );
}

function GameCard({ game }: { game: Game }) {
  return (
    <Link href={`/play/${game.grade}/${game.week}`} style={{ textDecoration: 'none', display: 'block' }}>
      <Card accent={GROW}>
        <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: SUBTLE, marginBottom: '0.4rem' }}>Week {game.week}</p>
        <p style={{ fontWeight: 700, color: ROYAL, fontSize: '1.05rem', marginBottom: '0.4rem' }}>{game.title}</p>
        <p style={{ color: MUTED, fontSize: '0.9rem', lineHeight: 1.6 }}>{game.play}</p>
      </Card>
    </Link>
  );
}
