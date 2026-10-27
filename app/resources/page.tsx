import type { Metadata } from 'next';
import { PUBLISHED_YEARS, PUBLISHED_WEEKS } from '@/content/published';
import Ui from './ui';

const DESC =
  `${PUBLISHED_YEARS.length} complete school years, ${PUBLISHED_WEEKS} weekly assignments, `
  + 'and the full teacher guide for every one. Math and science for Grades 1 to 6, financial '
  + 'literacy for Grades 3 to 6, entrepreneurship for Grades 4 to 6. Free to download, print '
  + 'and run. No account, no email wall.';

export const metadata: Metadata = {
  title: 'Free workbooks and teacher guides',
  description: DESC,
  alternates: { canonical: '/resources' },
  openGraph: {
    title: 'Free workbooks and teacher guides',
    description: DESC,
    url: '/resources',
  },
};

export default function Page() {
  return <Ui />;
}
