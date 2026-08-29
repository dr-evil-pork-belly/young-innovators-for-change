import type { Metadata } from 'next';
import Ui from './ui';

export const metadata: Metadata = {
  title: 'Mission & Theory of Change',
  description:
    'The problem we work on, what we actually do about it, and how we would know whether it worked.',
  alternates: { canonical: '/mission' },
  openGraph: {
    title: 'Mission & Theory of Change',
    description:
      'The problem we work on, what we actually do about it, and how we would know whether it worked.',
    url: '/mission',
  },
};

export default function Page() {
  return <Ui />;
}
