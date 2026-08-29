import type { Metadata } from 'next';
import Ui from './ui';

export const metadata: Metadata = {
  title: 'Discrete Math Adventures',
  description:
    'A full year of weekly mathematics enrichment for Grade 2 — maps, robots, secret codes and bridges. Free to schools, sequenced to the California pacing guide.',
  alternates: { canonical: '/programs/discrete-math' },
  openGraph: {
    title: 'Discrete Math Adventures',
    description:
      'A full year of weekly mathematics enrichment for Grade 2 — maps, robots, secret codes and bridges. Free to schools, sequenced to the California pacing guide.',
    url: '/programs/discrete-math',
  },
};

export default function Page() {
  return <Ui />;
}
