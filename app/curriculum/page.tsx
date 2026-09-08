import type { Metadata } from 'next';
import { PUBLISHED_YEARS } from '@/content/published';
import Ui from './ui';

/** The OG line here named a single published book for a month after there were
 *  thirteen. Counted rather than typed now, like everything else. */
const DESC =
  'The full K–12 scope: mathematics and science across Grades 1–12, plus leadership, '
  + 'entrepreneurship and financial literacy from Grade 3 up. Every cell is labeled '
  + `published, designed or planned, so nobody has to guess. ${PUBLISHED_YEARS.length} `
  + 'complete school years are written and free today.';

export const metadata: Metadata = {
  title: 'Curriculum',
  description: DESC,
  alternates: { canonical: '/curriculum' },
  openGraph: {
    title: 'Curriculum',
    description: DESC,
    url: '/curriculum',
  },
};

export default function Page() {
  return <Ui />;
}
