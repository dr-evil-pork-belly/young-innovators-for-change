'use client';

import ProgramPage from '@/components/ProgramPage';
import { PROGRAMS } from '@/content/programs';

export default function Ui() {
  return <ProgramPage spec={PROGRAMS['venture-lab']} />;
}
