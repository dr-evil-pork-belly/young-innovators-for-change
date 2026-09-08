import type { Metadata } from 'next';
import { PUBLISHED_YEARS, PUBLISHED_WEEKS } from '@/content/published';
import Ui from './ui';

/** Counted rather than typed, so a new book updates the search snippet too. */
const DESC =
  `${PUBLISHED_YEARS.length} complete school years of free curriculum, `
  + `${PUBLISHED_WEEKS} weekly assignments in all: discrete mathematics for Grades 1 to 6, `
  + 'entrepreneurship and financial literacy for Grades 3 to 6. Workbook and full answer '
  + 'key for every year, mapped to California standards and proofed to print in black and '
  + 'white. No account, no email wall. A California 501(c)(3).';

export const metadata: Metadata = {
  description: DESC,
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Young Innovators for Change',
    description: DESC,
    url: '/',
  },
};

export default function Page() {
  return <Ui />;
}
