import type { Metadata } from 'next';
import Ui from './ui';

const DESC =
  'Three complete school years for Grades 4 to 6, written and free: one product and one ' +
  'market day, then teams and a forecast, then a rival pricing against you. The Grades 9 ' +
  'to 12 summer version, eight weeks from unmet problem to live pitch, is designed and ' +
  'published here; its materials are not written yet.';

export const metadata: Metadata = {
  title: 'Venture Lab',
  description: DESC,
  alternates: { canonical: '/programs/venture-lab' },
  openGraph: { title: 'Venture Lab', description: DESC, url: '/programs/venture-lab' },
};

export default function Page() {
  return <Ui />;
}
