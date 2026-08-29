import type { Metadata } from 'next';
import Ui from './ui';

const DESC =
  'Executive presence, decision-making and team dynamics for Grades 3 to 12. The eight-week ' +
  'syllabus is designed and published here; the materials are not written yet, and we say ' +
  'which is which.';

export const metadata: Metadata = {
  title: 'Leadership',
  description: DESC,
  alternates: { canonical: '/programs/leadership' },
  openGraph: { title: 'Leadership', description: DESC, url: '/programs/leadership' },
};

export default function Page() {
  return <Ui />;
}
