import type { Metadata } from 'next';
import Ui from './ui';

export const metadata: Metadata = {
  title: 'Venture Lab',
  description:
    'Students build, pitch and launch a real micro-business over eight weeks. Real stakes, real learning.',
  alternates: { canonical: '/programs/venture-lab' },
  openGraph: {
    title: 'Venture Lab',
    description:
      'Students build, pitch and launch a real micro-business over eight weeks. Real stakes, real learning.',
    url: '/programs/venture-lab',
  },
};

export default function Page() {
  return <Ui />;
}
