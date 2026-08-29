import type { Metadata } from 'next';
import Ui from './ui';

const DESC =
  'Cindy Ha grew up in Highland Park, did everything Los Angeles public schools asked of ' +
  'her, and was never taught how a business works. She found out by building one. Young ' +
  'Innovators for Change exists because of the order of those two things.';

export const metadata: Metadata = {
  title: 'About the founder',
  description: DESC,
  alternates: { canonical: '/about' },
  openGraph: { title: 'About the founder', description: DESC, url: '/about' },
};

export default function Page() {
  return <Ui />;
}
