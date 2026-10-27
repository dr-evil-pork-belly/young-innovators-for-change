import type { Metadata } from 'next';
import Ui from './ui';

const DESC =
  'Four complete school years for Grades 3 to 6, written and free: a child’s own money, a ' +
  'plan, the gap between a price and a cost, and the numbers other people put in front of ' +
  'them. From Grade 7 it continues in our web app, in preview for educators. An eight-week ' +
  'outline for Grades 9 to 12 on budgeting, compound interest, credit and investing is ' +
  'published here; its lessons are not written yet.';

export const metadata: Metadata = {
  title: 'Financial Literacy',
  description: DESC,
  alternates: { canonical: '/programs/financial-literacy' },
  openGraph: { title: 'Financial Literacy', description: DESC, url: '/programs/financial-literacy' },
};

export default function Page() {
  return <Ui />;
}
