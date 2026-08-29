import type { Metadata } from 'next';
import Ui from './ui';

export const metadata: Metadata = {
  title: 'Resources',
  description:
    'Every workbook, teacher guide, research paper and adoption packet we have built — published in full and free to use.',
  alternates: { canonical: '/resources' },
  openGraph: {
    title: 'Resources',
    description:
      'Every workbook, teacher guide, research paper and adoption packet we have built — published in full and free to use.',
    url: '/resources',
  },
};

export default function Page() {
  return <Ui />;
}
