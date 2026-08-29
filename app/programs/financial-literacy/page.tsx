import type { Metadata } from 'next';
import Ui from './ui';

export const metadata: Metadata = {
  title: 'Financial Literacy',
  description:
    'Budgeting, credit, compounding and unit economics — the money knowledge most adults were never taught.',
  alternates: { canonical: '/programs/financial-literacy' },
  openGraph: {
    title: 'Financial Literacy',
    description:
      'Budgeting, credit, compounding and unit economics — the money knowledge most adults were never taught.',
    url: '/programs/financial-literacy',
  },
};

export default function Page() {
  return <Ui />;
}
