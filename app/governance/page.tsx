import type { Metadata } from 'next';
import Ui from './ui';

export const metadata: Metadata = {
  title: 'Governance & Transparency',
  description:
    'Our registration, filings, leadership and open gaps. EIN 33-1544346, a California 501(c)(3) public benefit corporation in good standing.',
  alternates: { canonical: '/governance' },
  openGraph: {
    title: 'Governance & Transparency',
    description:
      'Our registration, filings, leadership and open gaps. EIN 33-1544346, a California 501(c)(3) public benefit corporation in good standing.',
    url: '/governance',
  },
};

export default function Page() {
  return <Ui />;
}
