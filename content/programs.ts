/**
 * ENTERPRISE PROGRAM SYLLABI.
 *
 * These three programs share a shape, so they share a renderer
 * (components/ProgramPage.tsx) and differ only in the data below. Before this
 * file each one was a separate 45KB page that had drifted into claiming things
 * that had not happened.
 *
 * THE RULE FOR THIS FILE: everything here describes a DESIGN. The syllabus is
 * real work and it is written down. The classrooms are not. Nothing in this
 * file may describe a student, a cohort, an outcome, a testimonial or a
 * delivery date, because none of those exist yet. Outcome claims belong in
 * VERIFIED_STATS in org.ts, which is empty on purpose.
 *
 * When a program is actually written, change `status` and add what shipped.
 */

export type Unit = {
  n: string;
  when: string;
  title: string;
  tagline?: string;
  desc: string;
  items: string[];
  deliverable?: string;
};

export type Accent = 'royal' | 'gold' | 'green';

export type ProgramSpec = {
  slug: string;
  /** must match a CURRICULUM key in org.ts so the status stays in one place */
  strandKey: 'leadership' | 'venture' | 'finance';
  name: string;
  eyebrow: string;
  /** last line is rendered in the accent color */
  titleLines: string[];
  accent: Accent;
  lede: string[];
  /** what the eight weeks actually are */
  unitsLabel: string;
  unitsIntro: string;
  units: Unit[];
  /** design principles: why the syllabus looks like this */
  principles: { t: string; d: string }[];
  /** written down and reviewable today */
  exists: string[];
  /** explicitly not done, said before anyone has to ask */
  notYet: string[];
};

// ─── Leadership ───────────────────────────────────────────────────────────────

const leadership: ProgramSpec = {
  slug: 'leadership',
  strandKey: 'leadership',
  name: 'Leadership',
  eyebrow: 'Enterprise track · Grades 3 to 12',
  titleLines: ['LEADING IS A SET', 'OF BEHAVIORS.', 'BEHAVIORS CAN BE TAUGHT.'],
  accent: 'royal',
  lede: [
    'Most children are told that some people are natural leaders. That framing is both '
    + 'wrong and expensive: it tells the quiet child the door is closed, and it tells the '
    + 'loud one there is nothing left to learn.',
    'This program treats leadership as a set of specific, nameable behaviors, and teaches '
    + 'them one at a time. Eight weeks, scaling in difficulty from a Founders Track in the '
    + 'middle grades to an Executives Track in high school.',
  ],
  unitsLabel: 'The three strands',
  unitsIntro:
    'Leadership runs as three interleaved strands rather than eight separate topics, '
    + 'because the skills only work together. A student who can structure an argument but '
    + 'cannot read a room has learned debate, not leadership.',
  units: [
    {
      n: '01', when: 'Strand one', title: 'Emotional intelligence',
      tagline: 'Know yourself before you lead anyone else.',
      desc: 'Self-awareness, empathy, emotional regulation and social fluency. This strand '
          + 'runs first because every other skill in the program degrades without it.',
      items: [
        'Self-awareness mapping and a personal SWOT',
        'Reading the room: social and emotional cues',
        'Conflict de-escalation and active listening',
        'Regulating stress under high-stakes conditions',
      ],
      deliverable: 'A written self-assessment the student revisits in week eight',
    },
    {
      n: '02', when: 'Strand two', title: 'Public speaking',
      tagline: 'An idea travels no further than the person explaining it.',
      desc: 'Vocal presence, structured argument and the ability to hold a room. Built '
          + 'toward a five-minute presentation with questions afterward, because the '
          + 'questions are where composure is actually tested.',
      items: [
        'Vocal projection, pace and deliberate silence',
        'Body language and non-verbal signal',
        'Structuring an argument: the PREP and story frameworks',
        'Handling hostile or unexpected questions',
      ],
      deliverable: 'A five-minute talk delivered to the class, with open questions',
    },
    {
      n: '03', when: 'Strand three', title: 'Executive presence',
      tagline: 'Presence is not volume. It is earned attention.',
      desc: 'The teachable components of the thing adults call presence: composure under '
          + 'pressure, decisive language, and the ability to lead without holding a title. '
          + 'This is the strand most obviously rationed by family background, which is '
          + 'why it is in the program.',
      items: [
        'Posture, space and stillness',
        'Decisive language, and why hedging reads as uncertainty',
        'First impressions, and what is actually being read',
        'Speaking to adults as an equal',
      ],
      deliverable: 'A recorded before and after the student keeps',
    },
  ],
  principles: [
    { t: 'Behaviors, not traits',
      d: 'Every objective in the syllabus is written as something a student does, so it '
       + 'can be practiced and observed. "Be more confident" is not an objective. '
       + '"Answer a question you were not expecting without filling the pause" is.' },
    { t: 'The quiet student is the point',
      d: 'A leadership program that rewards the child who already dominates the room has '
       + 'taught nothing. The design deliberately measures change from a student\'s own '
       + 'starting point rather than against the loudest person present.' },
    { t: 'No equipment, no subscription',
      d: 'Everything runs with a room, paper, and a phone camera if one is available. The '
       + 'moment a program needs a device per child it stops reaching the schools it was '
       + 'written for.' },
  ],
  exists: [
    'The full eight-week structure, strand by strand',
    'Learning objectives written as observable behaviors',
    'The Founders Track and Executives Track difficulty split',
  ],
  notYet: [
    'Session-by-session facilitator scripts',
    'The student workbook',
    'Any assessment instrument, piloted or otherwise',
    'A single classroom that has run it',
  ],
};

// ─── Entrepreneurship ─────────────────────────────────────────────────────────

const venture: ProgramSpec = {
  slug: 'venture-lab',
  strandKey: 'venture',
  name: 'Venture Lab',
  eyebrow: 'Enterprise track · Grades 3 to 12',
  titleLines: ['EIGHT WEEKS.', 'ONE REAL BUSINESS.', 'ONE REAL PITCH.'],
  accent: 'gold',
  lede: [
    'Not a case study and not a simulation. Each student or team carries one venture the '
    + 'whole way through: a problem they found themselves, a customer they actually spoke '
    + 'to, a price they had to defend, and a pitch delivered to a panel at the end.',
    'The point is not that they start companies. It is that they learn how the machine '
    + 'works, at an age where knowing changes what they think is available to them.',
  ],
  unitsLabel: 'The eight weeks',
  unitsIntro:
    'Every week ends in something the student made, not something they were shown. The '
    + 'deliverables accumulate into a real venture file by week eight.',
  units: [
    {
      n: '01', when: 'Weeks 1 to 2', title: 'Discover the problem',
      tagline: 'Ventures start with an obsession, not an idea.',
      desc: 'Structured discovery rather than brainstorming. Students learn to observe the '
          + 'world the way a founder does, identify a real unmet need, and separate a '
          + 'symptom from a root cause.',
      items: ['Empathy interviews', 'Problem and solution fit map',
              'Customer journey sketch', 'Five whys root cause analysis'],
      deliverable: 'Problem statement canvas',
    },
    {
      n: '02', when: 'Week 3', title: 'Know your customer',
      tagline: 'Build for one person, not for everyone.',
      desc: 'The ideal customer profile. Students define exactly who they are building for, '
          + 'then validate it with short interviews conducted outside the classroom.',
      items: ['Ideal customer profile framework', 'Short customer interviews',
              'Jobs to be done', 'Market sizing: TAM, SAM and SOM'],
      deliverable: 'Ideal customer profile',
    },
    {
      n: '03', when: 'Week 4', title: 'Design the solution',
      tagline: 'Minimum viable means viable, not minimal effort.',
      desc: 'The business model canvas applied to the student\'s own venture. Value '
          + 'proposition, revenue model and cost structure, then a paper prototype put in '
          + 'front of peers for feedback.',
      items: ['Business model canvas', 'Value proposition design',
              'Paper prototyping', 'Peer feedback panels'],
      deliverable: 'Business model canvas and a prototype',
    },
    {
      n: '04', when: 'Week 5', title: 'Run the numbers',
      tagline: 'If you cannot model it, you cannot run it.',
      desc: 'Unit economics, properly: cost per unit, pricing, gross margin, break-even, '
          + 'and a twelve-month projection built in a simplified spreadsheet made for this '
          + 'age group.',
      items: ['Unit economics', 'Pricing strategy', 'Break-even calculation',
              'Twelve-month revenue projection'],
      deliverable: 'A twelve-month profit and loss model',
    },
    {
      n: '05', when: 'Week 6', title: 'Go to market',
      tagline: 'A good product with no distribution is a hobby.',
      desc: 'Channel strategy, customer acquisition and what product-market fit actually '
          + 'means. Students write a thirty-day plan naming their first ten customers.',
      items: ['Channel selection', 'Acquisition cost and lifetime value',
              'The first ten customers exercise', 'Signals of product-market fit'],
      deliverable: 'A thirty-day go-to-market plan',
    },
    {
      n: '06', when: 'Week 7', title: 'Build the deck',
      tagline: 'Investors fund a story with numbers under it.',
      desc: 'A ten-slide deck built from scratch: problem, solution, market, model, '
          + 'traction, team, financials, competition, roadmap and the ask. One slide per '
          + 'session, reviewed before the next one starts.',
      items: ['The ten-slide structure', 'Slide design basics',
              'Building a narrative arc', 'Structured deck review'],
      deliverable: 'A ten-slide pitch deck',
    },
    {
      n: '07', when: 'Week 8', title: 'Pitch the room',
      tagline: 'The room is yours. Use it.',
      desc: 'A five-minute pitch to a panel of adults from outside the school, followed by '
          + 'five minutes of questions. The format is borrowed from real pitch meetings '
          + 'because the questions are the part that teaches.',
      items: ['Five-minute delivery', 'Live question handling',
              'Panel feedback, recorded', 'A venture file the student keeps'],
      deliverable: 'A live pitch and written panel feedback',
    },
  ],
  principles: [
    { t: 'One venture, all the way through',
      d: 'The student does not switch projects. Carrying one idea from a vague problem to '
       + 'a defended price is where the learning is, and it is the part that gets cut '
       + 'from most entrepreneurship curricula.' },
    { t: 'Numbers before storytelling',
      d: 'The financial model comes in week five, two weeks before the deck. A pitch built '
       + 'on top of real unit economics teaches something. One built first teaches '
       + 'presentation.' },
    { t: 'The panel is adults, not judges',
      d: 'There is no winner. Every student pitches, every student gets written feedback, '
       + 'and nothing is ranked. A competition format would sort the confident from the '
       + 'rest, which is the outcome we are trying to avoid.' },
  ],
  exists: [
    'All eight weeks, with the deliverable defined for each',
    'The frameworks and worksheets each week is built around',
    'The pitch structure and the feedback form',
  ],
  notYet: [
    'The printed student venture file',
    'The facilitator guide',
    'The simplified financial model spreadsheet',
    'Any pitch panel, because no cohort has reached week eight',
  ],
};

// ─── Financial literacy ───────────────────────────────────────────────────────

const finance: ProgramSpec = {
  slug: 'financial-literacy',
  strandKey: 'finance',
  name: 'Financial Literacy',
  eyebrow: 'Enterprise track · Grades 3 to 12',
  titleLines: ['THE MONEY KNOWLEDGE', 'THAT USUALLY ARRIVES', 'THROUGH A FAMILY.'],
  accent: 'green',
  lede: [
    'Compound interest, credit, margin and risk are not difficult. They are simply not '
    + 'taught, so most people meet them for the first time in a contract they have already '
    + 'signed.',
    'Eight weeks, built so that a student leaves with their own budget, their own '
    + 'projection and their own plan, using their own numbers rather than a worksheet '
    + 'about somebody else.',
  ],
  unitsLabel: 'The eight weeks',
  unitsIntro:
    'The sequence is deliberate. Cash flow before budgeting, budgeting before compounding, '
    + 'and credit only after a student can already see what interest does over time.',
  units: [
    {
      n: '01', when: 'Week 1', title: 'Money fundamentals',
      desc: 'Income, expenses, assets and liabilities: the four words that sit under every '
          + 'financial outcome. Students learn to categorize, measure and act on each.',
      items: ['Reading a paycheck', 'Fixed and variable expenses',
              'Calculating net worth', 'Cash flow basics'],
    },
    {
      n: '02', when: 'Week 2', title: 'The budget blueprint',
      desc: 'The 50/30/20 rule adapted to what a student actually has. They build a first '
          + 'budget from real numbers rather than a hypothetical salary.',
      items: ['The 50/30/20 framework', 'Zero-based budgeting',
              'Needs against wants', 'A one-month budget simulation'],
    },
    {
      n: '03', when: 'Week 3', title: 'Compound interest',
      desc: 'The most powerful idea in personal finance, and the one most adults were never '
          + 'shown. Students run the numbers themselves, starting from their own age.',
      items: ['Simple against compound interest', 'The rule of 72',
              'Starting early against starting late', 'Building a projection'],
    },
    {
      n: '04', when: 'Week 4', title: 'Credit and debt',
      desc: 'How credit scores are built, what an interest rate really costs, and the '
          + 'arithmetic of a minimum payment. Taught before a student has ever held a card.',
      items: ['How a credit score is calculated', 'APR and the true cost of debt',
              'Borrowing that builds against borrowing that traps',
              'Establishing credit deliberately'],
    },
    {
      n: '05', when: 'Week 5', title: 'Investing basics',
      desc: 'Stocks, bonds, index funds and risk-adjusted return. Students build a mock '
          + 'portfolio in week five and follow it for the rest of the program, including '
          + 'when it falls.',
      items: ['Stocks, bonds and funds', 'Diversification and risk',
              'The case for index investing', 'Building a mock portfolio'],
    },
    {
      n: '06', when: 'Week 6', title: 'Business finance',
      desc: 'Revenue models, gross margin, acquisition cost and lifetime value: the '
          + 'vocabulary of a business, applied to a venture idea of their own.',
      items: ['Revenue against profit', 'Acquisition cost and lifetime value',
              'Break-even', 'Reading a simple profit and loss'],
    },
    {
      n: '07', when: 'Week 7', title: 'Protection and behavior',
      desc: 'Emergency funds, insurance, and the reason financially literate people still '
          + 'make bad decisions. Systems beat willpower, and the systems are teachable.',
      items: ['Sizing an emergency fund', 'Insurance fundamentals',
              'Behavioral finance basics', 'Lifestyle inflation'],
    },
    {
      n: '08', when: 'Week 8', title: 'The plan',
      desc: 'Each student presents a personal financial plan: their budget, their '
          + 'investment approach, and a ten-year projection with the assumptions written '
          + 'out where they can be argued with.',
      items: ['A personal financial plan', 'A ten-year projection',
              'Presenting to a panel', 'Defending the assumptions'],
      deliverable: 'A written plan the student takes home',
    },
  ],
  principles: [
    { t: 'Their numbers, not a worksheet',
      d: 'Every exercise runs on figures the student supplies. A budget built from an '
       + 'invented salary teaches arithmetic; a budget built from what they actually have '
       + 'coming in teaches budgeting.' },
    { t: 'Nothing is sold',
      d: 'No product, platform, bank or brokerage appears anywhere in the material, and we '
       + 'will not accept sponsorship that would put one there. Financial education paid '
       + 'for by financial companies is marketing.' },
    { t: 'The mock portfolio is allowed to lose',
      d: 'It is built in week five so that it has time to move, including downward. A '
       + 'simulation that only ever goes up teaches the wrong lesson about risk.' },
  ],
  exists: [
    'All eight weeks with skills defined per week',
    'The sequence and the reasoning behind its order',
    'The exercises each week is built around',
  ],
  notYet: [
    'The student workbook and the projection templates',
    'The facilitator guide',
    'A pre and post assessment',
    'Any classroom delivery',
  ],
};

export const PROGRAMS: Record<string, ProgramSpec> = {
  leadership: leadership,
  'venture-lab': venture,
  'financial-literacy': finance,
};
