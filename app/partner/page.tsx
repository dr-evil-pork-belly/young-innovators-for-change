import type { Metadata } from 'next';
import Ui from './ui';

const DESC =
  'Finished curriculum, free and already in use, and not one measured classroom. This page '
  + 'leads with what we are not claiming, then the public record you can check without '
  + 'asking us, then a form that reaches a person. Young Innovators for Change is a '
  + '501(c)(3) nonprofit, EIN 33-1544346.';

export const metadata: Metadata = {
  title: 'Partner With Us',
  description: DESC,
  alternates: { canonical: '/partner' },
  openGraph: {
    title: 'Partner With Us',
    description: DESC,
    url: '/partner',
  },
};

export default function Page() {
  return <Ui />;
}
