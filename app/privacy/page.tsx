import type { Metadata } from 'next';
import Ui from './ui';

const DESC =
  'What the Grades 7 to 12 app will collect about a student, who can see it, how long ' +
  'we keep it, and what we will never do with it. No student data exists yet: these ' +
  'are commitments made before the first student logs in.';

export const metadata: Metadata = {
  title: 'Student privacy',
  description: DESC,
  alternates: { canonical: '/privacy' },
  openGraph: { title: 'Student privacy', description: DESC, url: '/privacy' },
};

export default function Page() {
  return <Ui />;
}
