import type { Metadata } from 'next';
import Ui from './ui';

const DESC =
  'Some children absorb how money works at a kitchen table across eighteen years. The rest '
  + 'are expected to buy it later at graduate school prices, and then everyone is told the '
  + 'difference was talent. This is the problem we work on, what we do about it, the '
  + 'assumptions it rests on, and the results that would prove us wrong.';

export const metadata: Metadata = {
  title: 'Mission & Theory of Change',
  description: DESC,
  alternates: { canonical: '/mission' },
  openGraph: {
    title: 'Mission & Theory of Change',
    description: DESC,
    url: '/mission',
  },
};

export default function Page() {
  return <Ui />;
}
