import type { Metadata } from 'next';
import Ui from './ui';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Who runs Young Innovators for Change, how the organization is structured, and what we have built so far.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About',
    description:
      'Who runs Young Innovators for Change, how the organization is structured, and what we have built so far.',
    url: '/about',
  },
};

export default function Page() {
  return <Ui />;
}
