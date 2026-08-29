import type { Metadata } from 'next';
import Ui from './ui';

export const metadata: Metadata = {
  title: 'Leadership',
  description:
    'Executive presence, decision-making and team dynamics, taught through real scenarios rather than textbooks.',
  alternates: { canonical: '/programs/leadership' },
  openGraph: {
    title: 'Leadership',
    description:
      'Executive presence, decision-making and team dynamics, taught through real scenarios rather than textbooks.',
    url: '/programs/leadership',
  },
};

export default function Page() {
  return <Ui />;
}
