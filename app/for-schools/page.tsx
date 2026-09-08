import type { Metadata } from 'next';
import Ui from './ui';

const DESC =
  'A free 36-week Grade 2 mathematics enrichment pilot. One teacher, one classroom, 35 '
  + 'minutes a week. No cost, no contract, no planning committee, and every page is public '
  + 'so you can read the whole thing before you ever take a call with us.';

export const metadata: Metadata = {
  title: 'For Schools',
  description: DESC,
  alternates: { canonical: '/for-schools' },
  openGraph: {
    title: 'For Schools',
    description: DESC,
    url: '/for-schools',
  },
};

export default function Page() {
  return <Ui />;
}
