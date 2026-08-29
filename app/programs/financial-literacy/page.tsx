import type { Metadata } from 'next';
import Ui from './ui';

const DESC =
  'Budgeting, compound interest, credit, investing and unit economics for Grades 3 to 12. ' +
  'The eight-week syllabus is designed and published here; the materials are not written ' +
  'yet.';

export const metadata: Metadata = {
  title: 'Financial Literacy',
  description: DESC,
  alternates: { canonical: '/programs/financial-literacy' },
  openGraph: { title: 'Financial Literacy', description: DESC, url: '/programs/financial-literacy' },
};

export default function Page() {
  return <Ui />;
}
