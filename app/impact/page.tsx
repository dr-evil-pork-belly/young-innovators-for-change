import type { Metadata } from 'next';
import Ui from './ui';

const DESC =
  'No cohort has run, so there are no outcome numbers on this page. Instead: what has been '
  + 'built, the research it leans on including the paper that argues against the whole '
  + 'category, how the first cohort will be measured, and the assumptions that would have '
  + 'to fail for us to be wrong.';

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
