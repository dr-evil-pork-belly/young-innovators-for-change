import type { Metadata } from 'next';
import Ui from './ui';

const DESC =
  'No cohort has run, so there are no alumni. This page sets out what we commit to the ' +
  'students who eventually go through a program, fixed in advance and in public.';

export const metadata: Metadata = {
  title: 'After the program',
  description: DESC,
  alternates: { canonical: '/programs/alumni-network' },
  openGraph: { title: 'After the program', description: DESC, url: '/programs/alumni-network' },
};

export default function Page() {
  return <Ui />;
}
