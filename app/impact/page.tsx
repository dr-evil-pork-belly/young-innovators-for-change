import type { Metadata } from 'next';
import Ui from './ui';

export const metadata: Metadata = {
  title: 'Evidence & Accountability',
  description:
    'What we have built, what it costs, how we intend to measure it, and what we will publish — including results that do not favour us.',
  alternates: { canonical: '/impact' },
  openGraph: {
    title: 'Evidence & Accountability',
    description:
      'What we have built, what it costs, how we intend to measure it, and what we will publish — including results that do not favour us.',
    url: '/impact',
  },
};

export default function Page() {
  return <Ui />;
}
