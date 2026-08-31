/**
 * SINGLE SOURCE OF TRUTH FOR EVERY FACTUAL CLAIM ON THIS SITE.
 *
 * Rule: if a claim is not in this file, it does not belong on the site.
 *
 * Everything below marked "verified" is documented in a public record, the IRS
 * Tax Exempt Organization Search or the California Secretary of State business
 * search, and can be checked by anyone, which is exactly the point.
 *
 * Empty arrays and null values render nothing. A section with nothing true to
 * say disappears rather than falling back to something invented.
 */

// ─── Organization ─────────────────────────────────────────────────────────────

export const ORG = {
  legalName: 'Young Innovators for Change',
  shortName: 'YIC',
  domain:    'innovateyouth.org',
  url:       'https://innovateyouth.org',

  /** verified, CA Secretary of State, entity 6427957 */
  incorporation: {
    state:            'California',
    entityNumber:     '6427957',
    entityType:       'Nonprofit Corporation (CA), Public Benefit',
    initialFilingDate: '2024-10-17',
    status:           'Active',
    standings:        ['Secretary of State', 'Franchise Tax Board', 'Agent', 'VCFCF'],
    statementOfInfoDue: '2026-10-31',
  },

  /** verified, IRS Tax Exempt Organization Search */
  taxStatus: {
    status: 'determined' as 'determined' | 'pending' | 'fiscally-sponsored' | 'none',
    ein: '33-1544346',
    determinationDate: '2024-10-20',
    /** IRS deductibility code PC, public charity */
    deductibilityCode: 'PC',
    onPub78: true,
    fiscalSponsor: null as string | null,
  },

  /** Registered office of the corporation. This is the legal address of record,
   *  not where programs are delivered, see `serviceArea`. */
  registeredAddress: {
    line1: '28 Geary Street, Suite 650',
    line2: 'San Francisco, CA 94108',
    country: 'United States',
  },

  /** TODO, CONFIRM. The corporation is registered in San Francisco; the programs
   *  described on this site are aimed at schools in the San Gabriel Valley. Grant
   *  applications ask for both, and they ask separately. Make sure this line
   *  matches what you put on an application. */
  serviceArea: 'San Gabriel Valley, California',

  /** TODO, a monitored inbox. This address receives every form submission and
   *  appears on the governance page. Without it the contact route cannot deliver. */
  contactEmail: '',
} as const;

/** Public records a funder can pull up without asking you for anything. */
export const PUBLIC_RECORDS = {
  irsSearchUrl:
    'https://apps.irs.gov/app/eos/detailsPage?ein=33-1544346&name=Young%20Innovators%20for%20Change&resultsPerPage=25&indexOfFirstRow=0&search=Advanced&dispatchMethod=searchAll',
  caBusinessSearchUrl: 'https://bizfileonline.sos.ca.gov/search/business',
  /** verified, determination letter is published by the IRS at this filename */
  determinationLetterFile:
    'FinalLetter_33-1544346_YOUNGINNOVATORSFORCHANGE_10202024_00.pdf',
};

/** Claims about transparency and oversight. Each requires an artifact behind it. */
export const TRANSPARENCY = {
  /** verified, Form 990-N (e-Postcard) filed for tax period 2025 */
  form990Filed: true,
  form990Form: '990-N (e-Postcard)' as string | null,
  form990LatestPeriod: '2025',
  /** verified, gross receipts attestation on the 990-N */
  grossReceiptsUnder: 50000,

  /** Not yet true. A 990-N filer is below the threshold that would normally
   *  trigger an audit; do not imply otherwise. */
  independentlyAudited: false,
  annualReportUrl: null as string | null,
  candidProfileUrl: null as string | null,

  /** TODO, California charities that solicit donations register separately with
   *  the Attorney General's Registry of Charities and Fundraisers and file annually.
   *  Confirm standing, then set this to true so it appears on /governance. */
  caRegistryConfirmed: false,
  caRegistryNumber: null as string | null,
};

// ─── Statistics ───────────────────────────────────────────────────────────────

export type Stat = { value: string; label: string; note?: string };

/**
 * OUTCOME claims, students served, districts reached, measured change.
 * Add an entry ONLY when you can produce the roster, the district agreement or
 * the dataset behind it. Intentionally empty: no cohort has run.
 */
export const VERIFIED_STATS: Stat[] = [];

/** Facts about what has been built and committed to. All checkable today. */
export const PROGRAM_FACTS: Stat[] = [
  { value: '4',    label: 'Programs Designed', note: 'Discrete Math, Leadership, Venture Lab, Financial Literacy' },
  { value: '108',  label: 'Weeks of Curriculum', note: 'Three full years: Grades 2, 4 and 5, 36 weeks each' },
  { value: '20',   label: 'CA Standards Mapped' },
  { value: '8',    label: 'Week Program', note: 'Founders and Executives tracks' },
  { value: '$0',   label: 'Cost to Students' },
  { value: '100%', label: 'Materials Open', note: 'Every workbook and guide is free to download' },
];

// ─── People ───────────────────────────────────────────────────────────────────

export type Person = {
  initials: string;
  name: string;
  title: string;
  area?: string;
  bio?: string;
};

/**
 * Leadership. Only people whose role is documented.
 *
 * Cindy Ha is listed as Principal Officer on the organization's Form 990-N and
 * as agent for service of process with the California Secretary of State, both
 * public records.
 *
 * TODO: add other officers and staff here as their roles are settled. Write the
 * title you would put on a grant application, not a more impressive one.
 */
export const LEADERSHIP: Person[] = [
  {
    initials: 'CH',
    name: 'Cindy Ha',
    title: 'Founder & Executive Director',
    area: 'Governance & Programs',
    bio: 'Listed as Principal Officer on the organization’s Form 990-N and as agent for '
       + 'service of process with the California Secretary of State.',
  },
];

/**
 * FOUNDER, biography.
 *
 * PROVENANCE, and read this before editing: unlike everything above, none of
 * this is a public record. It is Cindy's own account of her life, and it is on
 * the site because she chose to put it there. That makes it a different kind of
 * claim from the EIN, not weaker, but checkable by a different method, which is
 * asking her.
 *
 * The rule that follows from that: every line here should be one she would say
 * out loud, unedited, to a program officer sitting across a table. Nothing
 * here is rounded up. No institution is named that she did not attend, no title
 * is inflated, and no number appears that she did not give.
 */
export const FOUNDER = {
  name: 'Cindy Ha',
  role: 'Founder & Executive Director',

  /** founder-attested */
  raisedIn:  'Highland Park, Los Angeles',
  schooling: 'Los Angeles Unified School District',
  college:   'University of California, Irvine',
  studiedAbroad: 'Italy',

  /**
   * founder-attested, supplied directly and confirmed for publication.
   *
   * A named institution is the single most checkable thing on this page, and a
   * grant reviewer who finds one wrong claim re-reads everything else
   * differently. Change this only on Cindy's word, never from an older draft.
   */
  mbaSchool: 'the University of Southern California',

  /**
   * founder-attested. She finished at the top of her class at every stage:
   * high school, UC Irvine, and the MBA.
   *
   * This is on the site for one reason. The pathway argument rests on the claim
   * that effort, not talent, is what carries a student through, and she is the
   * example she is willing to put her own name against. It is not a credential
   * claim and it is not offered as evidence that the curriculum works.
   */
  academicRecord: 'graduated at the top of her class at every stage, by working for it',

  /** founder-attested, the business she built and exited */
  business: {
    startedFrom: '900-square-foot retail storefront',
    grewInto:    'retail, wholesale, import and e-commerce',
    exit:        'sold after the birth of her first child',
  },

  /**
   * Direct quotes. These are Cindy's words, lightly punctuated.
   *
   * If she would not say a sentence in this shape, change the sentence, do not
   * keep it because it reads well.
   */
  quotes: {
    theBusiness:
      'Looking back, those were the best moments: the ideas, and the sweat. '
      + 'It is the unknown. That combination.',
    theMBA:
      'If only I had known all of this at a much younger age.',
    theThesis:
      'Think about compound interest, but for knowledge.',
  },
} as const;

/**
 * Advisors. EMPTY BY DESIGN. Add a person only when all three are true:
 *   1. They have agreed in writing to be listed.
 *   2. Their title and affiliation are current and exactly as they would state them.
 *   3. Their institution has no objection to being named alongside yours.
 */
export const ADVISORS: Person[] = [];

/**
 * Board of directors, distinct from advisors, and the thing grantmakers ask for
 * by name. California public benefit corporations must have a board, and most
 * foundations expect at least three unrelated members.
 *
 * This being empty is currently the single largest gap in the organization's
 * grant readiness.
 */
export const BOARD: Person[] = [];

// ─── Testimonials ─────────────────────────────────────────────────────────────

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  cohort?: string;
  type: 'student' | 'principal' | 'parent' | 'instructor' | 'partner';
};

/**
 * EMPTY BY DESIGN. Add a quote only with written permission from the speaker
 * (or, for a minor, their guardian). For students use a first name and last
 * initial. Keep the consent on file.
 */
export const TESTIMONIALS: Testimonial[] = [];

// ─── Derived helpers ──────────────────────────────────────────────────────────

export const hasTestimonials = TESTIMONIALS.length > 0;
export const hasAdvisors     = ADVISORS.length > 0;
export const hasBoard        = BOARD.length > 0;
export const hasOutcomeStats = VERIFIED_STATS.length > 0;

export function foundedYear(): number {
  return new Date(ORG.incorporation.initialFilingDate).getUTCFullYear();
}

/** Tax line, phrased to match the actual status. Never claims more. */
export function taxLine(): string | null {
  const { status, ein } = ORG.taxStatus;
  switch (status) {
    case 'determined':
      return `${ORG.legalName} is a 501(c)(3) nonprofit corporation (EIN ${ein}), `
           + 'listed in IRS Publication 78. Contributions are tax-deductible to the '
           + 'extent permitted by law.';
    case 'pending':
      return `${ORG.legalName} has applied for 501(c)(3) recognition. Contributions are not `
           + 'yet tax-deductible, and we will confirm in writing if and when that changes.';
    case 'fiscally-sponsored':
      return `${ORG.legalName} operates under the fiscal sponsorship of ${ORG.taxStatus.fiscalSponsor}. `
           + 'Contributions are made to the sponsor and are tax-deductible to the extent permitted by law.';
    default:
      return null;
  }
}

/** Badges for the funding pages. Returns only what is actually backed. */
export function trustBadges(): string[] {
  const out: string[] = [];
  if (ORG.taxStatus.status === 'determined') out.push('501(c)(3) Determined');
  if (ORG.taxStatus.onPub78) out.push('IRS Publication 78 Listed');
  if (ORG.incorporation.status === 'Active') out.push('CA Nonprofit, Active and in Good Standing');
  if (TRANSPARENCY.form990Filed) out.push(`Form ${TRANSPARENCY.form990Form} Filed`);
  if (TRANSPARENCY.caRegistryConfirmed) out.push('CA Registry of Charities');
  if (TRANSPARENCY.independentlyAudited) out.push('Independently Audited');
  if (TRANSPARENCY.annualReportUrl) out.push('Annual Report Published');
  return out;
}

/** Human-readable date, e.g. "20 October 2024". */
export function fmtDate(iso: string): string {
  return new Date(iso + 'T00:00:00Z').toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
  });
}

// ─── Curriculum scope ─────────────────────────────────────────────────────────

/**
 * The full K–12 scope the organization is building, and the honest status of
 * every cell in it.
 *
 *   published, written in full, downloadable today
 *   designed, syllabus and module structure complete, materials not yet written
 *   planned, on the roadmap, not started
 *   n/a. This strand does not run at this grade band
 *
 * The distinction matters more than it looks. A funder reading "Grades 1–12"
 * next to a single published year needs to see which is which, and a school
 * needs to know what it can actually run in September.
 */
export type Status = 'published' | 'designed' | 'planned' | 'n/a';

export type Band = { band: string; status: Status; note?: string };

export type Strand = {
  key: string;
  name: string;
  track: 'Academics' | 'Enterprise';
  blurb: string;
  bands: Band[];
};

export const GRADE_BANDS = ['Grades 1–2', 'Grades 3–5', 'Grades 6–8', 'Grades 9–12'] as const;

export const CURRICULUM: Strand[] = [
  {
    key: 'math', name: 'Mathematics', track: 'Academics',
    blurb: 'Reasoning-first mathematics that sits beside the state curriculum rather than '
         + 'repeating it. Discrete mathematics in the early grades, widening into proof, '
         + 'modeling and applied problem solving.',
    bands: [
      { band: 'Grades 1–2',  status: 'published',
        note: 'Grade 2 complete: 36 weeks, standards-mapped, free. Grade 1 in development.' },
      { band: 'Grades 3–5',  status: 'planned', note: 'Grade 3 is next, after the first pilot reports.' },
      { band: 'Grades 6–8',  status: 'planned' },
      { band: 'Grades 9–12', status: 'planned' },
    ],
  },
  {
    key: 'science', name: 'Science', track: 'Academics',
    blurb: 'Investigation-led science built on the same principle as the mathematics: low '
         + 'materials cost, high reasoning demand, and every lesson printable on a school copier.',
    bands: [
      { band: 'Grades 1–2',  status: 'planned' },
      { band: 'Grades 3–5',  status: 'planned' },
      { band: 'Grades 6–8',  status: 'planned' },
      { band: 'Grades 9–12', status: 'planned' },
    ],
  },
  {
    key: 'leadership', name: 'Leadership', track: 'Enterprise',
    blurb: 'Executive presence, decision-making and team dynamics, taught through real '
         + 'scenarios rather than textbooks.',
    bands: [
      { band: 'Grades 1–2',  status: 'n/a' },
      { band: 'Grades 3–5',  status: 'designed', note: 'Founders Track, 8 weeks.' },
      { band: 'Grades 6–8',  status: 'designed' },
      { band: 'Grades 9–12', status: 'designed', note: 'Executives Track, 8 weeks.' },
    ],
  },
  {
    key: 'venture', name: 'Entrepreneurship', track: 'Enterprise',
    blurb: 'A full school year, one assignment a week: find a problem worth solving, design '
         + 'something that fixes it, work out cost and price, sell it at a class market day, '
         + 'then work out honestly whether it made a profit.',
    bands: [
      { band: 'Grades 1–2',  status: 'n/a' },
      { band: 'Grades 3–5',  status: 'published',
        note: 'Grades 4 and 5 complete: The Venture Year and The Numbers Year, 36 weeks '
            + 'each, standards-mapped and free. Grade 3 is next.' },
      { band: 'Grades 6–8',  status: 'designed',
        note: 'The Grade 6 year is next after Grade 3. The 8-week intensive covers '
            + 'Grades 7–8.' },
      { band: 'Grades 9–12', status: 'designed', note: 'Executives Track, 8 weeks.' },
    ],
  },
  {
    key: 'finance', name: 'Financial Literacy', track: 'Enterprise',
    blurb: 'Budgeting, credit, compounding and unit economics: the money knowledge most '
         + 'adults were never taught, at an age where it still changes decisions.',
    bands: [
      { band: 'Grades 1–2',  status: 'n/a' },
      { band: 'Grades 3–5',  status: 'designed' },
      { band: 'Grades 6–8',  status: 'designed' },
      { band: 'Grades 9–12', status: 'designed' },
    ],
  },
];

export const STATUS_LABEL: Record<Status, string> = {
  published: 'Published',
  designed:  'Designed',
  planned:   'Planned',
  'n/a':     'Not at this band',
};

export function countByStatus(s: Status): number {
  return CURRICULUM.reduce((n, st) => n + st.bands.filter((b) => b.status === s).length, 0);
}

/** Where a school can actually start today. */
export const AVAILABLE_NOW =
  'Three full years: Discrete Math Adventures (Grade 2 mathematics), The Venture Year '
  + '(Grade 4 entrepreneurship) and The Numbers Year (Grade 5). 36 weeks each.';

// ─── The pathway ──────────────────────────────────────────────────────────────

/**
 * THE TEN-YEAR PATHWAY.
 *
 * The design idea the enterprise track is built around, stated plainly so it can
 * be argued with: a graduate business school compresses its core into roughly
 * two years for adults who pay for it. The same concepts, unhurried, fit inside
 * the ten years a child is already sitting in a classroom.
 *
 * READ THIS BEFORE EDITING. Two different kinds of claim live in this array and
 * they must not be blurred together:
 *
 *   1. `concept` for a row marked `published` describes material that exists.
 *      It is checkable by downloading the book and reading it.
 *   2. `concept` for every other row is DESIGN INTENT. It is what we plan to
 *      write. It is not a description of anything a student can do today, and
 *      the page renders it with its status attached for exactly that reason.
 *
 * `mbaCourse` is our own mapping of a school-age idea onto the graduate course
 * that eventually formalizes it. It is an argument about sequence, not a claim
 * of equivalence, accreditation, credit or articulation. See NOT_AN_MBA below,
 * which is rendered on the page and is not optional.
 */
export type PathwayStage = {
  grade: string;
  /** The year's published title, where one exists. */
  book?: string;
  /** What the student actually does that year. */
  concept: string;
  /** The graduate course this is the childhood form of. Our mapping, not a credit. */
  mbaCourse: string;
  status: Status;
  note?: string;
};

export const PATHWAY: PathwayStage[] = [
  {
    grade: 'Grade 3', status: 'planned',
    concept: 'What things cost and why anyone trades at all. Wants against needs, '
           + 'price as a number somebody chose, and the first honest look at where '
           + 'money in a household actually goes.',
    mbaCourse: 'Microeconomics',
    note: 'Next to be written, after the first pilot reports.',
  },
  {
    grade: 'Grade 4', status: 'published', book: 'The Venture Year',
    concept: 'One student, one product, one market day, whole dollars. Find a problem '
           + 'worth solving, design something that fixes it, work out what it costs to '
           + 'make and what to charge, sell it, then work out honestly whether it made '
           + 'a profit.',
    mbaCourse: 'Marketing and introductory accounting',
    note: '36 weeks, written in full, free to download today.',
  },
  {
    grade: 'Grade 5', status: 'published', book: 'The Numbers Year',
    concept: 'A team of two or three with named roles and a profit split written as '
           + 'fractions. A product line of three with one deliberately cut. Fixed and '
           + 'variable costs pulled apart. A forecast, two selling sessions, one '
           + 'deliberate change between them, and the honest answer to whether the '
           + 'change did anything.',
    mbaCourse: 'Managerial accounting and operations',
    note: '36 weeks, written in full, free to download today. The third trimester is '
        + 'a controlled experiment rather than an event.',
  },
  {
    grade: 'Grade 6', status: 'designed',
    concept: 'A second seller appears. Pricing against somebody else’s price, '
           + 'substitutes, and what happens to a market when it stops being yours alone.',
    mbaCourse: 'Competitive strategy',
    note: 'Designed. Materials not yet written.',
  },
  {
    grade: 'Grade 7', status: 'planned',
    concept: 'Cash against profit. Why a sale and money in hand are different events, '
           + 'what inventory ties up, and how a profitable business runs out of money.',
    mbaCourse: 'Financial accounting',
  },
  {
    grade: 'Grade 8', status: 'planned',
    concept: 'What capital costs. Interest, simple and compound, the arithmetic of a '
           + 'loan, and the reason the same purchase costs two people different amounts.',
    mbaCourse: 'Corporate finance',
  },
  {
    grade: 'Grade 9', status: 'designed',
    concept: 'Reading a business from its numbers. Three statements, unit economics, '
           + 'break-even, and the questions to ask when the numbers and the story '
           + 'disagree.',
    mbaCourse: 'Financial statement analysis',
    note: 'Covered in part by the Executives Track, 8 weeks. The full year is not written.',
  },
  {
    grade: 'Grade 10', status: 'designed',
    concept: 'How a group of people gets work done. Roles, delegation, incentives, and '
           + 'what happens to a plan when the people executing it are not the people '
           + 'who wrote it.',
    mbaCourse: 'Organizational behavior',
    note: 'Covered in part by the Leadership track. The full year is not written.',
  },
  {
    grade: 'Grade 11', status: 'planned',
    concept: 'Where an advantage comes from and how a deal gets structured. What to ask '
           + 'for, what to concede, and how to tell the difference between a negotiation '
           + 'and an argument.',
    mbaCourse: 'Strategy and negotiations',
  },
  {
    grade: 'Grade 12', status: 'planned',
    concept: 'Ownership. Equity, dilution, risk, what it means to hold a share of '
           + 'something other people work at, and what is owed to them.',
    mbaCourse: 'Entrepreneurial finance and business ethics',
  },
];

/**
 * The disclaimer. This is rendered on the pathway page and must stay there.
 *
 * "They would have earned an MBA without realizing it" is a good sentence and a
 * false one. A degree is a credential granted by an accredited institution after
 * admission, assessment and payment. We grant nothing. Say what is true instead:
 * the ideas arrive earlier, spread thinner, and free.
 */
export const NOT_AN_MBA: string[] = [
  'This is not a degree, and finishing it confers no credential of any kind.',
  'It carries no academic credit, no college credit, and no articulation agreement '
  + 'with any institution.',
  'Young Innovators for Change is not an accredited school and does not award '
  + 'diplomas, certificates or transcripts.',
  'It is not a substitute for a graduate business education, and a student who '
  + 'completes it and later wants an MBA should go and get one.',
  'No student has completed this pathway. Two of its ten years are written, and '
  + 'nobody has run either of them start to finish in a classroom yet.',
];

/**
 * The opt-in principle, in Cindy's framing: nobody can be made to want this.
 * Written as a commitment because it constrains program design, not as a slogan.
 */
export const OPT_IN: { title: string; body: string }[] = [
  { title: 'Offered to every student, required of none',
    body: 'The pathway sits beside the school day rather than inside a graduation '
        + 'requirement. A student who is not interested this year loses nothing and '
        + 'can start next year.' },
  { title: 'No screening, no application, no prerequisite',
    body: 'There is no test to get in and no prior year to have completed. Wanting to '
        + 'do it is the entire entry criterion, which is the opposite of how access to '
        + 'this material usually works.' },
  { title: 'The ceiling is not set by us',
    body: 'A student who wants to go further than the year they are in should be handed '
        + 'the next book, not held at their grade level. Every year is published in '
        + 'full, so nothing is gated on our permission.' },
  { title: 'Effort is the variable we are betting on',
    body: 'The material is written to reward work rather than speed or prior exposure. '
        + 'Whether that is enough is an open question, and it is on the evidence page '
        + 'as one we could be wrong about.' },
];

// ─── Research base ────────────────────────────────────────────────────────────

/**
 * The published work the pathway design leans on, with what each one does and
 * does not support.
 *
 * RULE: every entry is a real, locatable publication, cited with enough detail
 * that a reader can pull it up and check whether we characterized it correctly.
 * `bearing` must state the limit of the claim. The literature here is about
 * financial and entrepreneurship education in general. None of it evaluates our
 * curriculum, and one of the strongest papers in the list is a critique.
 */
export type Citation = {
  authors: string;
  year: number;
  title: string;
  publication: string;
  url: string;
  /** What the study found, in its own terms. */
  finding: string;
  /** What it does and does not support about our design. */
  bearing: string;
  /** Set for work that cuts against us. */
  countervailing?: boolean;
};

export const RESEARCH: Citation[] = [
  {
    authors: 'Jerome S. Bruner', year: 1960,
    title: 'The Process of Education',
    publication: 'Harvard University Press',
    url: 'https://www.hup.harvard.edu/books/9780674710016',
    finding: 'Sets out the spiral curriculum: "A curriculum as it develops should revisit '
           + 'these basic ideas repeatedly, building upon them until the student has grasped '
           + 'the full formal apparatus that goes with them" (p. 13), on the hypothesis that '
           + '"any subject can be taught effectively in some intellectually honest form to '
           + 'any child at any stage of development" (p. 33).',
    bearing: 'This is the structural argument for the pathway, and it is a 1960 theoretical '
           + 'position rather than an experimental result. It says a spiral is a coherent way '
           + 'to build a curriculum. It does not say ours is any good.',
  },
  {
    authors: 'Consumer Financial Protection Bureau', year: 2016,
    title: 'Building Blocks to Help Youth Achieve Financial Capability: A New Model and '
         + 'Recommendations',
    publication: 'U.S. Consumer Financial Protection Bureau',
    url: 'https://files.consumerfinance.gov/f/documents/092016_cfpb_BuildingBlocksReport_ModelAndRecommendations_web.pdf',
    finding: 'Places executive function in early childhood (ages 3 to 5), financial habits '
           + 'and norms in middle childhood (ages 6 to 12), and explicit financial knowledge '
           + 'and decision-making skills in adolescence and young adulthood (ages 13 to 21).',
    bearing: 'This is the developmental case for starting in elementary school and saving the '
           + 'formal reasoning for the upper grades, which is how the ladder is ordered. It is '
           + 'a synthesis and a model, not a trial of any program.',
  },
  {
    authors: 'Nicholas J. Cepeda, Harold Pashler, Edward Vul, John T. Wixted and Doug Rohrer',
    year: 2006,
    title: 'Distributed Practice in Verbal Recall Tasks: A Review and Quantitative Synthesis',
    publication: 'Psychological Bulletin 132(3), 354 to 380',
    url: 'https://doi.org/10.1037/0033-2909.132.3.354',
    finding: '839 assessments across 317 experiments in 184 articles. Spaced study beats '
           + 'massed study, and the gap that produces the best retention grows as the delay '
           + 'before the test grows.',
    bearing: 'The reason the pathway is ten years of one lesson a week rather than a course. '
           + 'Caveat worth stating: this literature is mostly verbal recall in laboratory '
           + 'settings, not business concepts in classrooms over a decade.',
  },
  {
    authors: 'John Dunlosky, Katherine A. Rawson, Elizabeth J. Marsh, Mitchell J. Nathan and '
           + 'Daniel T. Willingham',
    year: 2013,
    title: 'Improving Students’ Learning With Effective Learning Techniques: Promising '
         + 'Directions From Cognitive and Educational Psychology',
    publication: 'Psychological Science in the Public Interest 14(1), 4 to 58',
    url: 'https://doi.org/10.1177/1529100612453266',
    finding: 'Reviews ten study techniques against the evidence and rates only two as high '
           + 'utility across materials, learners and settings. Distributed practice is one of '
           + 'them.',
    bearing: 'Independent confirmation that spacing is among the few instructional choices '
           + 'with broad support. It says nothing about the content we chose to space.',
  },
  {
    authors: 'Daniel Fernandes, John G. Lynch Jr. and Richard G. Netemeyer', year: 2014,
    title: 'Financial Literacy, Financial Education, and Downstream Financial Behaviors',
    publication: 'Management Science 60(8), 1861 to 1883',
    url: 'https://doi.org/10.1287/mnsc.2013.1849',
    finding: 'A meta-analysis of 168 papers covering 201 studies. Interventions to improve '
           + 'financial literacy explained 0.1 percent of the variance in the financial '
           + 'behaviors studied, effects decayed over time, and even large interventions with '
           + 'many hours of instruction had negligible effects on behavior 20 months or more '
           + 'afterward. Effects were weaker in low-income samples.',
    bearing: 'The strongest published argument against the thing we are building, and the '
           + 'reason it is designed the way it is. If a one-time course fades within two '
           + 'years, the answer is not a better one-time course. Whether spreading the same '
           + 'material across ten years defeats that decay is untested, including by us. '
           + 'The finding of weaker effects in low-income samples lands directly on our '
           + 'intended schools and we have no answer to it yet.',
    countervailing: true,
  },
  {
    authors: 'Tim Kaiser, Annamaria Lusardi, Lukas Menkhoff and Carly Urban', year: 2022,
    title: 'Financial Education Affects Financial Knowledge and Downstream Behaviors',
    publication: 'Journal of Financial Economics 145(2), 255 to 272',
    url: 'https://doi.org/10.1016/j.jfineco.2021.09.022',
    finding: 'A meta-analysis of 76 randomized experiments with over 160,000 participants. '
           + 'Financial education has positive causal effects on financial knowledge and on '
           + 'downstream behavior, comparable in size to educational interventions in other '
           + 'domains and at least three times the average effect found in earlier work.',
    bearing: 'The counterweight to the paper above, and more recent, but it is a different '
           + 'evidence base: randomized trials rather than the wider set. Taken together the '
           + 'two say the field is contested, which is the accurate summary and the one we '
           + 'would rather publish than a tidier one.',
  },
  {
    authors: 'Alexandra Brown, J. Michael Collins, Maximilian Schmeiser and Carly Urban',
    year: 2014,
    title: 'State Mandated Financial Education and the Credit Behavior of Young Adults',
    publication: 'Federal Reserve Board, Finance and Economics Discussion Series 2014-68',
    url: 'https://www.federalreserve.gov/pubs/feds/2014/201468/201468abs.html',
    finding: 'Young people in school after Georgia, Idaho and Texas introduced a financial '
           + 'education requirement in 2007 had higher relative credit scores and lower '
           + 'relative delinquency rates than comparable young people in states without one.',
    bearing: 'Evidence that school-delivered money instruction can show up years later in '
           + 'behavior that costs real money. It is a state policy study, not a curriculum '
           + 'study, and it cannot tell you which parts of the instruction did the work.',
  },
  {
    authors: 'Niklas Elert, Fredrik W. Andersson and Karl Wennberg', year: 2015,
    title: 'The Impact of Entrepreneurship Education in High School on Long-Term '
         + 'Entrepreneurial Performance',
    publication: 'Journal of Economic Behavior & Organization 111, 209 to 223',
    url: 'https://doi.org/10.1016/j.jebo.2014.12.020',
    finding: 'Swedish students who took part in the Junior Achievement Company Program in high '
           + 'school, followed for up to 16 years, were more likely to start a firm and earned '
           + 'higher entrepreneurial incomes than matched peers. There was no effect on firm '
           + 'survival.',
    bearing: 'The closest thing in the literature to a long-run test of running a small '
           + 'business as schoolwork, and the null result on survival is the part worth '
           + 'sitting with. It is a matched observational study, not a randomized trial, and '
           + 'it studies teenagers rather than nine-year-olds.',
  },
  {
    authors: 'Richard M. Ryan and Edward L. Deci', year: 2000,
    title: 'Self-Determination Theory and the Facilitation of Intrinsic Motivation, Social '
         + 'Development, and Well-Being',
    publication: 'American Psychologist 55(1), 68 to 78',
    url: 'https://doi.org/10.1037/0003-066X.55.1.68',
    finding: 'Sustained motivation depends on three conditions being met: autonomy, competence '
           + 'and relatedness. Interest that is chosen holds; interest that is imposed tends '
           + 'not to.',
    bearing: 'The research basis for making the pathway opt-in rather than required. It '
           + 'supports the design choice. It does not promise that the students who opt in '
           + 'will be the ones who most needed it, which is a real risk and is on the '
           + 'evidence page.',
  },
];

/**
 * What two years of graduate business school costs, from the schools' own
 * published figures. Used to state the gap the pathway is a response to.
 *
 * These are list prices before financial aid, and both schools give aid. The
 * point is not that every student pays this. It is that this is the price of
 * admission to the material, and a child in a Title I elementary school is not
 * in a position to negotiate it.
 */
export const MBA_COST = {
  stanford: {
    school: 'Stanford Graduate School of Business',
    year: '2026 to 2027',
    tuitionNineMonths: 89187,
    totalNineMonths: 140940,
    url: 'https://gsb.stanford.edu/programs/mba/tuition-financial-aid/cost-attendance',
    note: 'First-year MBA, single student, nine months, tuition plus living costs.',
  },
  usc: {
    school: 'USC Marshall School of Business',
    year: '2024 to 2025',
    firstYearTotal: 89769,
    secondYearTotal: 77706,
    url: 'https://www.marshall.usc.edu/programs/graduate-programs/mba-programs/full-time-mba/tuition-fees',
    note: 'Full-time MBA, tuition, fees and health insurance, both years.',
  },
} as const;

/** Two-year total at USC, computed rather than asserted. */
export function uscTwoYearTotal(): number {
  return MBA_COST.usc.firstYearTotal + MBA_COST.usc.secondYearTotal;
}

/** How many pathway years are actually written. Computed, never typed by hand. */
export function pathwayPublishedCount(): number {
  return PATHWAY.filter((s) => s.status === 'published').length;
}

/** US dollars, no cents. */
export function usd(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD',
    minimumFractionDigits: 0, maximumFractionDigits: 0 });
}
