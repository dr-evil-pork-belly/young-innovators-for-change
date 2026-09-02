import type { Metadata } from 'next';
import Ui from './ui';

const DESC =
  'The curriculum is the easy half. The half that decides whether a child learns '
  + 'anything is done by a teacher, an aide or a caretaker in a room. This is what we '
  + 'owe them, how the two programs are shaped, and the one thing we are asking for.';

export const metadata: Metadata = {
  title: 'For Teachers, Aides and Caretakers',
  description: DESC,
  alternates: { canonical: '/teachers' },
  openGraph: {
    title: 'For Teachers, Aides and Caretakers',
    description: DESC,
    url: '/teachers',
  },
};

export default function Page() {
  return <Ui />;
}
