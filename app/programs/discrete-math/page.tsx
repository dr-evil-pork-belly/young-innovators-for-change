import type { Metadata } from 'next';
import { MATH_LINE, MATH_GRADE_RANGE } from '@/content/mathLine';
import Ui from './ui';

const DESCRIPTION =
  `${MATH_LINE.length} complete school years of discrete mathematics enrichment, `
  + `${MATH_GRADE_RANGE.toLowerCase()}: sorting, maps, proofs, routes and rules, one weekly `
  + 'assignment at a time. Free to schools, sequenced to the California pacing guide.';

export const metadata: Metadata = {
  title: `Discrete Mathematics, ${MATH_GRADE_RANGE}`,
  description: DESCRIPTION,
  alternates: { canonical: '/programs/discrete-math' },
  openGraph: {
    title: `Discrete Mathematics, ${MATH_GRADE_RANGE}`,
    description: DESCRIPTION,
    url: '/programs/discrete-math',
  },
};

export default function Page() {
  return <Ui />;
}
