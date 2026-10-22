import type { Metadata } from 'next';
import Ui from './ui';

const DESC =
  'Three complete school years for Grades 4 to 6, written and free: one product and one ' +
  'market day, then teams and a forecast, then a rival pricing against you. From Grade 7 ' +
  'the same ideas move to a self-paced app with in-person sessions, which is designed, ' +
  'with its first unit in preview; the old eight-week outline is published here.';

export const metadata: Metadata = {
  title: 'Venture Lab',
  description: DESC,
  alternates: { canonical: '/programs/venture-lab' },
  openGraph: { title: 'Venture Lab', description: DESC, url: '/programs/venture-lab' },
};

export default function Page() {
  return <Ui />;
}
