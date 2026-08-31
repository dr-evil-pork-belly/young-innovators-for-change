import type { Metadata } from 'next';
import Ui from './ui';

const DESC =
  'A graduate business school compresses its core into two years for adults who can pay ' +
  'for it. The same ideas, unhurried, fit inside the ten years a child is already sitting ' +
  'in a classroom. This is the design, what it is not, and the published research it leans on.';

export const metadata: Metadata = {
  title: 'The ten-year pathway',
  description: DESC,
  alternates: { canonical: '/pathway' },
  openGraph: { title: 'The ten-year pathway', description: DESC, url: '/pathway' },
};

export default function Page() {
  return <Ui />;
}
