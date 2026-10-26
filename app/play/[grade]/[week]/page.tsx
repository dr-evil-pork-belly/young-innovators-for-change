import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GAMES, BOOKS, findGame } from '@/content/games';
import Ui from './ui';

type Params = { grade: string; week: string };

/** One static page per game, from content/games.ts. */
export function generateStaticParams(): Params[] {
  return GAMES.map((g) => ({ grade: g.grade, week: String(g.week) }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { grade, week } = await params;
  const game = findGame(grade, Number(week));
  if (!game) return {};
  const book = BOOKS[game.grade];
  const title = `${game.title}: week ${game.week} of ${book.name}`;
  const path = `/play/${game.grade}/${game.week}`;
  return {
    title,
    description: game.play,
    alternates: { canonical: path },
    openGraph: { title, description: game.play, url: path },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { grade, week } = await params;
  const game = findGame(grade, Number(week));
  if (!game) notFound();
  return <Ui grade={game.grade} week={game.week} />;
}
