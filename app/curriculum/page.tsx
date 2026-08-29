import type { Metadata } from 'next';
import Ui from './ui';

export const metadata: Metadata = {
  title: 'Curriculum',
  description:
    'The full K–12 scope: mathematics and science across Grades 1–12, plus leadership, ' +
    'entrepreneurship and financial literacy from Grade 3 up — with an honest status on every cell.',
  alternates: { canonical: '/curriculum' },
  openGraph: {
    title: 'Curriculum',
    description:
      'Five subjects, twelve grades, and an honest label on every one. Grade 2 mathematics is ' +
      'published and free today; the rest is designed or planned.',
    url: '/curriculum',
  },
};

export default function Page() {
  return <Ui />;
}
