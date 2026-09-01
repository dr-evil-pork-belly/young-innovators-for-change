import type { Metadata } from 'next';
import Ui from './ui';

const DESCRIPTION =
  'Five complete school years of discrete mathematics enrichment, Grades 2 through 6: '
  + 'maps, proofs, routes and rules, one weekly assignment at a time. Free to schools, '
  + 'sequenced to the California pacing guide.';

export const metadata: Metadata = {
  title: 'Discrete Mathematics, Grades 2 to 6',
  description: DESCRIPTION,
  alternates: { canonical: '/programs/discrete-math' },
  openGraph: {
    title: 'Discrete Mathematics, Grades 2 to 6',
    description: DESCRIPTION,
    url: '/programs/discrete-math',
  },
};

export default function Page() {
  return <Ui />;
}
