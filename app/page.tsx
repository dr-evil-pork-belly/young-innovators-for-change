import type { Metadata } from 'next';
import Ui from './ui';

export const metadata: Metadata = {
  description:
    'We build rigorous K–12 business and mathematics curriculum and give it away. A California 501(c)(3) placing full-year programs in classrooms at no cost to students or schools.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Young Innovators for Change',
    description:
      'We build rigorous K–12 business and mathematics curriculum and give it away. A California 501(c)(3) placing full-year programs in classrooms at no cost to students or schools.',
    url: '/',
  },
};

export default function Page() {
  return <Ui />;
}
