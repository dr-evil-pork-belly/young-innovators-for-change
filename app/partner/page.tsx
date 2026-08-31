import type { Metadata } from 'next';
import Ui from './ui';

export const metadata: Metadata = {
  title: 'Partner With Us',
  description:
    'Three finished years of curriculum, free to download, and no classroom has taught them yet. What we have, what we do not, and how to reach us. Young Innovators for Change is a 501(c)(3) nonprofit, EIN 33-1544346.',
  alternates: { canonical: '/partner' },
  openGraph: {
    title: 'Partner With Us',
    description:
      'Three finished years of curriculum, free to download, and no classroom has taught them yet. What we have, what we do not, and how to reach us.',
    url: '/partner',
  },
};

export default function Page() {
  return <Ui />;
}
