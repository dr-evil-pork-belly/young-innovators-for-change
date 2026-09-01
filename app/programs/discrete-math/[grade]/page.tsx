import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MATH_LINE, bookBySlug } from '@/content/mathLine';
import Ui from './ui';

/** Five static routes, one per book. No other slug resolves. */
export function generateStaticParams() {
  return MATH_LINE.map((b) => ({ grade: b.slug }));
}

export const dynamicParams = false;

function describe(grade: number, title: string, move: string, moveLine: string) {
  return `${title}: a full year of weekly discrete mathematics enrichment for Grade ${grade}. `
       + `${move}. ${moveLine} Free to schools, sequenced to the California pacing guide.`;
}

export async function generateMetadata({ params }: {
  params: Promise<{ grade: string }>;
}): Promise<Metadata> {
  const { grade } = await params;
  const book = bookBySlug(grade);
  if (!book) return {};
  const title = `${book.title}: Grade ${book.grade} Mathematics`;
  const description = describe(book.grade, book.title, book.move, book.moveLine);
  const url = `/programs/discrete-math/${book.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  };
}

export default async function Page({ params }: { params: Promise<{ grade: string }> }) {
  const { grade } = await params;
  const book = bookBySlug(grade);
  if (!book) notFound();
  return <Ui book={book} />;
}
