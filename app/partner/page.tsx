import type { Metadata } from 'next';
import Ui from './ui';

export const metadata: Metadata = {
  title: 'Support the Work',
  description:
    'Fund a classroom, a program, or a year. Young Innovators for Change is a 501(c)(3) nonprofit, EIN 33-1544346.',
  alternates: { canonical: '/partner' },
  openGraph: {
    title: 'Support the Work',
    description:
      'Fund a classroom, a program, or a year. Young Innovators for Change is a 501(c)(3) nonprofit, EIN 33-1544346.',
    url: '/partner',
  },
};

export default function Page() {
  return <Ui />;
}
