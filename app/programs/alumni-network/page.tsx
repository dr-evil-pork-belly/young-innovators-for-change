import type { Metadata } from 'next';
import Ui from './ui';

export const metadata: Metadata = {
  title: 'Alumni Network',
  description:
    'What we are committing to build for the students who complete a Young Innovators program.',
  alternates: { canonical: '/programs/alumni-network' },
  openGraph: {
    title: 'Alumni Network',
    description:
      'What we are committing to build for the students who complete a Young Innovators program.',
    url: '/programs/alumni-network',
  },
};

export default function Page() {
  return <Ui />;
}
