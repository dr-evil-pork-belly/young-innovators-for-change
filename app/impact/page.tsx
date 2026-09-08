import type { Metadata } from 'next';
import Ui from './ui';

const DESC =
  'No cohort has run, so there are no outcome numbers on this page. Instead: what has been '
  + 'built, what a classroom actually costs, the research it leans on including the paper '
  + 'that argues against the whole category, and the specific results we have pre-committed '
  + 'to publishing if they go against us.';

export const metadata: Metadata = {
  title: 'Evidence & Accountability',
  description: DESC,
  alternates: { canonical: '/impact' },
  openGraph: {
    title: 'Evidence & Accountability',
    description: DESC,
    url: '/impact',
  },
};

export default function Page() {
  return <Ui />;
}
