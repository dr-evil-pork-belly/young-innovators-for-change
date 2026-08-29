import type { Metadata } from 'next';
import Ui from './ui';

const DESC =
  'Eight weeks in which a student takes one real venture from an unmet problem to a live ' +
  'pitch. The syllabus is designed and published here; the materials are not written yet.';

export const metadata: Metadata = {
  title: 'Venture Lab',
  description: DESC,
  alternates: { canonical: '/programs/venture-lab' },
  openGraph: { title: 'Venture Lab', description: DESC, url: '/programs/venture-lab' },
};

export default function Page() {
  return <Ui />;
}
