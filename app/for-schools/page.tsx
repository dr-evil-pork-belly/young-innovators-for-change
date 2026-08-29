import type { Metadata } from 'next';
import Ui from './ui';

export const metadata: Metadata = {
  title: 'For Schools',
  description:
    'A free 36-week Grade 2 mathematics enrichment pilot. One teacher, one classroom, 35 minutes a week, no cost and no contract.',
  alternates: { canonical: '/for-schools' },
  openGraph: {
    title: 'For Schools',
    description:
      'A free 36-week Grade 2 mathematics enrichment pilot. One teacher, one classroom, 35 minutes a week, no cost and no contract.',
    url: '/for-schools',
  },
};

export default function Page() {
  return <Ui />;
}
