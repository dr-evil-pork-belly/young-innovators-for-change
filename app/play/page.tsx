import type { Metadata } from 'next';
import Ui from './ui';

const DESC =
  'Short games on the money weeks of the enterprise workbooks. Each one runs the week’s own ' +
  'numbers on the same engine the Grade 7 app uses. Nothing to sign up for, nothing stored.';

export const metadata: Metadata = {
  title: 'Play the money weeks',
  description: DESC,
  alternates: { canonical: '/play' },
  openGraph: { title: 'Play the money weeks', description: DESC, url: '/play' },
};

export default function Page() {
  return <Ui />;
}
