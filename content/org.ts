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
 *
 * Counts of what is published are NOT typed here. They come from
 * content/published.ts and content/mathLine.ts, both generated from the
 * curriculum repository by brand/mksite.py. Every count in this file that was
 * typed by hand went stale the first time a book shipped.
 */

import { PUBLISHED_STANDARDS, PUBLISHED_WEEKS, PUBLISHED_YEARS } from './published';

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

  /** The monitored inbox. Every form submission is delivered here, and the
   *  address is printed on /governance so a program officer doing diligence can
   *  reach a person without filling in a form.
   *
   *  Two separate things have to be true for a message to arrive, and they are
   *  easy to confuse. This address must RECEIVE mail, which needs an inbox and
   *  MX records on the root domain. The API route SENDS through Resend from
   *  CONTACT_FROM, which needs its own records on the `send.` subdomain. Neither
   *  one implies the other, and setting only the second is the state this site
   *  was in for a month. See `claude/19-contact-and-email.md`. */
  contactEmail: 'hello@innovateyouth.org',
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

// ─── Mission ──────────────────────────────────────────────────────────────────

/**
 * THE MISSION, in one place.
 *
 * Added 31 August 2026. Until then the mission was restated in slightly different
 * words on the home page, the mission page and the about page, and none of those
 * versions named who the organization is for. It is for children whose families
 * have not had access to the ideas a business education formalizes. That is a
 * narrower claim than "every kid in every zip code" and it is the true one.
 *
 * Read `notYetTrue` before writing any sentence that draws on this. The mission is
 * a statement of intent. Nothing here asserts that a single student has been
 * reached, because none has.
 */
export const MISSION = {
  statement:
    'Young Innovators for Change exists so that children whose families have no '
    + 'business background reach adulthood able to act on money rather than be '
    + 'acted upon.',

  /** Who the work is aimed at. Intent, not a description of who is reached. */
  population:
    'Students in lower income communities, whose families have not had access to '
    + 'the ideas a business education formalizes, and who would otherwise meet them '
    + 'for the first time as adults, priced.',

  /**
   * The phrase to use, and the reason to use it. "Teach kids how capitalism works"
   * is how this gets described in conversation and it is the wrong sentence for a
   * page a program officer reads. The claim below is narrower, defensible and
   * closer to what the material actually does.
   */
  agency:
    'The subject is not financial literacy, it is economic agency: price, cost, '
    + 'margin, risk, credit and ownership, met early enough to change what a child '
    + 'can see.',

  /**
   * Two things happen here and they are not the same thing. Saying so is the honest
   * resolution of a real tension: the free library began as enrichment for students
   * who asked for more, and the mission is aimed at students who are not asking yet
   * because nobody has told them there is anything to ask for. Both are true. Only
   * one of them is the mission.
   */
  roles: [
    {
      title: 'The library is published, not aimed',
      body: 'Every year of curriculum is free to anyone who finds it. A teacher who '
          + 'wants more mathematics for the students in her class who ask for it should '
          + 'take it, and that is how this organization started. It also tells us '
          + 'nothing at all about who receives it.',
    },
    {
      title: 'The program is aimed',
      body: 'It runs in one place, with a roster, for the students the mission names, '
          + 'and it is measured. A download cannot name anyone. That is the whole '
          + 'reason the program exists.',
    },
  ],

  /** Say these before anything else, on any page that draws on the mission. */
  notYetTrue: [
    'No cohort has run. The program described on this site is designed, not delivered.',
    'We do not know who downloads the free materials, and we will not describe them as '
    + 'low income until we can.',
    'Nothing here has been measured. The evaluation design is published. The results do '
    + 'not exist.',
  ],
} as const;

// ─── Statistics ───────────────────────────────────────────────────────────────

export type Stat = { value: string; label: string; note?: string };

/**
 * OUTCOME claims, students served, districts reached, measured change.
 * Add an entry ONLY when you can produce the roster, the district agreement or
 * the dataset behind it. Intentionally empty: no cohort has run.
 */
export const VERIFIED_STATS: Stat[] = [];

/**
 * Facts about what has been built and committed to. All checkable today.
 *
 * The week count and the standards count are no longer typed here. They come
 * from content/published.ts, which brand/mksite.py generates by reading the
 * text layer of every PDF in public/downloads: the standards figure is the
 * count of distinct codes named in the “In class this week” line across every
 * published year, and the books overlap, so the per-book counts sum higher.
 *
 * Both were hand-typed once. `108 weeks` and `44 standards` described three
 * books and stayed on the site through four more. That is the whole reason the
 * generator exists.
 *
 * The `8 Week Program` figure was removed on 31 August 2026. The 36-week years
 * supersede the older Founders Track for Grades 4 to 6, so advertising an
 * eight-week program alongside the published school years described something
 * that had been retired for the grades that actually have material. The
 * Executives Track remains in CURRICULUM and PATHWAY, correctly marked designed.
 */
export const PROGRAM_FACTS: Stat[] = [
  { value: '4',    label: 'Programs Designed', note: 'Discrete Math, Leadership, Venture Lab, Financial Literacy' },
  { value: String(PUBLISHED_WEEKS), label: 'Weeks of Curriculum',
    note: `${PUBLISHED_YEARS.length} full school years, 36 weeks each` },
  { value: String(PUBLISHED_STANDARDS), label: 'CA Standards Mapped',
    note: `Distinct standards named in the “In class this week” line across all ${PUBLISHED_WEEKS} weeks` },
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
        note: 'Grades 1 and 2 complete: What Goes Together and Discrete Math Adventures, '
            + '36 weeks each.' },
      { band: 'Grades 3–5',  status: 'published',
        note: 'Grades 3, 4 and 5 complete: Count Every Way, It Cannot Be Done and The Best '
            + 'Way, 36 weeks each.' },
      { band: 'Grades 6–8',  status: 'published',
        note: 'Grade 6 complete: Find the Rule, 36 weeks. Grades 7 and 8 are '
            + 'deliberately unwritten: print is the wrong medium for that age.' },
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
      { band: 'Grades 3–5',  status: 'designed',
        note: 'Founders Track, an 8-week summer intensive.' },
      { band: 'Grades 6–8',  status: 'designed',
        note: 'Kept for this band deliberately. It is taught in a room rather than '
            + 'read off a page, and the behaviors are worth having at thirteen '
            + 'whether or not a business is ever attached to them.' },
      { band: 'Grades 9–12', status: 'designed',
        note: 'Executives Track: one cohort, four summers of eight weeks each.' },
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
            + 'each, standards-mapped and free. No Grade 3 year is written.' },
      { band: 'Grades 6–8',  status: 'published',
        note: 'Grade 6 complete: The Market Year, 36 weeks. Grades 7 and 8 are '
            + 'deliberately unwritten: print is the wrong medium for that age.' },
      { band: 'Grades 9–12', status: 'designed',
        note: 'Executives Track: one cohort, four summers of eight weeks each.' },
    ],
  },
  {
    key: 'finance', name: 'Financial Literacy', track: 'Enterprise',
    blurb: 'Choosing, saving, giving and keeping track in the elementary grades, then '
         + 'budgeting, credit and compounding when a student is close to meeting them. '
         + 'The money knowledge most adults were never taught.',
    bands: [
      { band: 'Grades 1–2',  status: 'n/a' },
      { band: 'Grades 3–5',  status: 'published',
        note: 'Complete: The Choosing Year, The Planning Year and The Keeping '
            + 'Year, 36 weeks each.' },
      { band: 'Grades 6–8',  status: 'published',
        note: 'Grade 6 complete: The Asking Year, 36 weeks. Grades 7 and 8 are '
            + 'deliberately unwritten: print is the wrong medium for that age.' },
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

/**
 * Where a school can actually start today. The year count is computed from the
 * generated list of published books rather than typed, because it was typed
 * once as "Three full years" and was wrong within a month.
 */
export const AVAILABLE_NOW =
  `${PUBLISHED_YEARS.length} full years, 36 weeks each: the complete Grades 1 to 6 discrete `
  + 'mathematics line, plus The Venture Year (Grade 4 entrepreneurship) and The Numbers Year '
  + '(Grade 5) and The Market Year (Grade 6), plus the complete Grades 3 to 6 '
  + 'financial literacy line.';

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
    grade: 'Grade 3', status: 'published', book: 'The Choosing Year',
    concept: 'There is enough for one of two things, and choosing one means not '
           + 'having the other. Price as a number somebody chose, a ledger kept for a '
           + 'month, saving that takes longer than expected, and a first look at what a '
           + 'home pays for.',
    mbaCourse: 'Microeconomics',
    note: '36 weeks, written in full, free to download today. Nothing is sold in it: '
        + 'that is Grade 4. This year is about the student\'s own money.',
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
    grade: 'Grade 6', status: 'published', book: 'The Market Year',
    concept: 'A second seller appears. Pricing against somebody else’s price, '
           + 'substitutes, market share, and a response round where every team sees '
           + 'every other team’s numbers and moves at the same time.',
    mbaCourse: 'Competitive strategy',
    note: '36 weeks, written in full, free to download today. Written before the first '
        + 'cohort ran, so the first revision after a pilot will be substantial.',
  },
  {
    grade: 'Grade 7', status: 'planned',
    concept: 'Cash against profit. Why a sale and money in hand are different events, '
           + 'what inventory ties up, and how a profitable business runs out of money.',
    mbaCourse: 'Financial accounting',
    note: 'Planned as content, not as a book. Print is the wrong medium for this '
        + 'age, so nothing is written for it until there is a digital form to '
        + 'deliver it in. See DELIVERY.middleGrades.',
  },
  {
    grade: 'Grade 8', status: 'planned',
    concept: 'What capital costs. Interest, simple and compound, the arithmetic of a '
           + 'loan, and the reason the same purchase costs two people different amounts.',
    mbaCourse: 'Corporate finance',
    note: 'Planned as content, not as a book. Print is the wrong medium for this '
        + 'age, so nothing is written for it until there is a digital form to '
        + 'deliver it in. See DELIVERY.middleGrades.',
  },
  {
    grade: 'Grade 9', status: 'designed',
    concept: 'Reading a business from its numbers. Three statements, unit economics, '
           + 'break-even, and the questions to ask when the numbers and the story '
           + 'disagree.',
    mbaCourse: 'Financial statement analysis',
    note: 'Covered in part by the Executives Track, the four-summer cohort. '
        + 'The full year is not written.',
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
  // This line said "Two of its ten years are written" from August until
  // 1 September 2026, by which point four were. pathwayPublishedCount() already
  // existed and the ladder heading above it was already using it; the
  // disclaimer, of all the sentences on the site, was the one still typing the
  // number by hand. Nothing else on this page may hardcode it either.
  `No student has completed this pathway. ${spellOut(pathwayPublishedCount())} of its `
  + `${spellOut(PATHWAY.length).toLowerCase()} years are written, and nobody has run `
  + 'any of them start to finish in a classroom yet.',
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

// ─── Delivery ─────────────────────────────────────────────────────────────────

/**
 * WHO ACTUALLY DELIVERS THIS, and the two shapes the program takes.
 *
 * Added 2 September 2026. Until then the site had eleven pages about the
 * curriculum and none about the person who has to open it with a child, which
 * is the wrong ordering. A workbook on a shelf teaches nobody.
 *
 * READ THIS BEFORE EDITING. Every line here is either a statement about what we
 * owe the delivering adult, or a description of how a program is shaped. Not
 * one of them is a claim about who downloads the material, how many people use
 * it, or where. We do not know any of that. The downloads carry no email wall
 * and no login, deliberately, which means the log is a count and not a roster.
 * `MISSION.notYetTrue` still governs every page that draws on this file:
 * "teachers are using it" is a sentence this file does not support, and the
 * honest version, "we cannot see who is using it", is the one written below.
 *
 * `summerIntensive.status` is 'seeking'. It becomes something else only when a
 * district has agreed in writing and the agreement is on file.
 */
export const DELIVERY = {
  /** The argument, in one sentence, in the founder's framing. */
  claim:
    'The curriculum is the half of this that can be done alone at a desk. The '
    + 'half that decides whether a child learns anything is done by an adult in '
    + 'a room, and we are not that adult.',

  /** What publishing openly costs us in knowledge, said plainly. */
  anonymity:
    'Everything is published with no email wall, no login and no license. That '
    + 'was a deliberate choice and we would make it again. It also means we '
    + 'cannot see who is teaching this. We do not know your name, your school '
    + 'or your grade, so we cannot thank you by name and we will not describe '
    + 'you on this site as though we could.',

  /** What we owe whoever is delivering it. Each line is a commitment we can keep today. */
  commitments: [
    { title: 'Every answer, recomputed rather than remembered',
      body: 'The teacher guide carries the answer to every problem in the book, '
          + 'and each one is recomputed from the problem as printed by a script '
          + 'that refuses to build the book if a single answer disagrees. You '
          + 'should not have to check our arithmetic at ten at night.' },
    { title: 'Prep that fits inside a prep period',
      body: 'Each week is two pages, front and back, with the common wrong '
          + 'answers and what to say to a student who is stuck written out '
          + 'beside them. There is no training week and no certification.' },
    { title: 'It prints on the copier you already have',
      body: 'Every page was proofed in grayscale. Structure lives in the '
          + 'linework and color is accent only, so a black-and-white classroom '
          + 'copy loses nothing.' },
    { title: 'Nothing to sign, nothing to buy, no account',
      body: 'You can run a full year without ever telling us you exist. That is '
          + 'the design, not an oversight, and it is why the log is a count '
          + 'rather than a roster.' },
    { title: 'Tell us where it breaks',
      body: 'A teacher who writes in November to say week twelve falls apart is '
          + 'giving this curriculum something no funder can. We would rather '
          + 'hear that than a compliment, and we will say in the revision notes '
          + 'that it came from a classroom.' },
  ],

  /**
   * THE DELIBERATE BLANK, Grades 7 and 8.
   *
   * Added 2 September 2026. Every version of the curriculum map before this said
   * some form of "not started" for these two grades, which reads as a backlog
   * item somebody has not got to. It is not. It is a decision, and the decision
   * is about the medium rather than the material.
   *
   * READ THIS BEFORE EDITING. This is the argument of the whole delivery page
   * turned back on the organization, and it is load-bearing for exactly that
   * reason: a site that says curriculum is worthless without good delivery, and
   * then publishes for an age band it does not believe it can deliver to, has
   * refuted itself in public. Do not quietly fill this band in to make the
   * roadmap look complete. Fill it in when there is something to deliver it
   * with.
   *
   * Nothing here promises a web app, a date, or a budget. It states why the
   * blank exists and what would have to change.
   */
  middleGrades: {
    band: 'Grades 7 and 8',
    shape: 'Not built, and not for lack of time',
    body: 'No printed year is written for Grade 7 or Grade 8, and the reason is '
        + 'the medium rather than the material. A printed workbook holds a '
        + 'seven-year-old who has an adult sitting beside them, and eight weeks '
        + 'in a summer room holds a sixteen-year-old. We do not believe paper '
        + 'holds a thirteen-year-old. Writing thirty-six weeks of it for that '
        + 'age would be writing something we did not expect anyone to finish.',

    /**
     * The exception, and it is not a hedge on the blank. It is the same test
     * applied and passed: Leadership survives this band precisely because it is
     * delivered by a person in a room rather than off a page, which is the
     * thing this entire page argues decides everything.
     *
     * The second half is the founder's reason and it is a claim about value,
     * not about evidence. Nothing here says it has been measured, because it
     * has not, and MISSION.notYetTrue governs this file as it governs the rest.
     */
    exception:
      'Leadership is the one part that stays. It is taught in a room rather '
      + 'than read off a page, so the medium problem does not apply to it, and '
      + 'the behaviors it teaches are worth having at thirteen whether or not a '
      + 'business is ever attached to them. A student walking toward high '
      + 'school can use them everywhere else in their life.',
    whatWouldChangeIt:
      'That band needs a different form of delivery, almost certainly digital, '
      + 'and we have not built one. Until it exists the honest thing is a blank '
      + 'rather than a book. This is the argument of this whole page turned on '
      + 'ourselves: a curriculum is only as good as its delivery, which means '
      + 'there are ages we should not publish for until we can reach them.',
    status: 'not-built' as const,
  },

  /** The two delivery models. Slow for the elementary years, intensive for the older ones. */
  models: [
    {
      band: 'Grades 1 to 6',
      shape: 'Slow, weekly, inside the school year',
      who: 'The classroom teacher, the instructional aide, the after-school '
         + 'lead, or a caretaker at a kitchen table.',
      body: 'Thirty-six weeks, one assignment a week, sequenced against the '
          + 'California pacing guide so it reinforces what the class is already '
          + 'doing that month. The mathematics years run from Grade 1 and the '
          + 'money and venture years from Grade 3. It is built this way because '
          + 'it asks for the one resource an elementary school actually has, '
          + 'which is a little time every week for a long time.',
      status: 'published' as const,
    },
    {
      band: 'Grades 9 to 12',
      shape: 'One cohort, four summers, eight weeks each',
      who: 'Taught by Cindy Ha, the founder, in person, for the first cohort.',
      body: 'The same ideas in the opposite shape. Eight weeks inside one '
          + 'summer, run the way a business school runs, and then the same '
          + 'students come back and do it again the next summer, and the next, '
          + 'across their high school years. An older student can hold a whole '
          + 'idea at once, and a summer can be given over to it in a way a '
          + 'Tuesday afternoon cannot. This is the Executives Track. It is '
          + 'designed and not yet delivered.',
      status: 'designed' as const,
    },
  ],

  /** The open ask. Change `status` only against a signed agreement. */
  summerIntensive: {
    status: 'seeking' as 'seeking' | 'scheduled' | 'running',
    ask: 'We are looking for one school district willing to host the first '
       + 'cohort.',
    detail:
      'We are asking a district to commit to one summer. Eight weeks, a room, '
      + 'a schedule, and permission to teach a cohort. Nothing is bought, '
      + 'nothing is adopted, and nothing past that first summer is signed for. '
      + 'What we are building is four of those summers with the same students, '
      + 'so the conversation we would rather have is about the first of four '
      + 'than about a one-off. Nobody is handed a binder and wished luck, '
      + 'because a program has to be run by the people who wrote it before it '
      + 'can honestly be handed to anyone else.',

    /**
     * Why it is a cohort and not a course offered four times. This constrains
     * program design, so it is written as a commitment rather than a slogan.
     *
     * It sits close to a real tension with OPT_IN, which promises no screening
     * and says a student who sits out a year loses nothing. Both are kept: the
     * entry criterion is still only wanting to do it. What the cohort asks for
     * is the opposite of a screen, which is that a student comes back.
     */
    whyCohort:
      'A group that has been through three summers together can attempt things '
      + 'a group meeting for the first time cannot. That is the entire reason '
      + 'this is one cohort rather than a course offered four times. There is '
      + 'still no test to get in and no prior year to have completed for the '
      + 'first summer.',

    /**
     * The founder's sentence for what four summers add up to, and the
     * disclaimer it must never travel without.
     *
     * "This would be their business school" is the true and useful half of the
     * claim. The false half is the one NOT_AN_MBA exists to refuse, and the
     * site has already been burned once by a sentence that read well and
     * conferred a credential nobody grants. Both halves stay in one string so
     * they cannot be separated by a later edit that keeps only the good line.
     */
    theClaim:
      'Eight weeks a summer, four summers, the same room and the same people: '
      + 'for a student who has one, this is their business school. It is also '
      + 'not a business school. No degree, no credit, no transcript, and no '
      + 'tuition either.',

    /**
     * Undecided, and deliberately absent from every page until it is settled.
     * The cohort starts either the summer before ninth grade or the summer
     * after it. The copy says "four summers across high school", which is true
     * of both, so nothing has to be corrected once this is chosen.
     */
    entrySummer: null as string | null,

    /**
     * Who teaches it, and why that is the argument rather than a staffing note.
     *
     * Cindy Ha is listed in LEADERSHIP with a documented role, so she can be
     * named here. Everything this draws on is already founder-attested on the
     * About page: she built and sold a business first and met the formal
     * material afterward. Nothing is added to her biography by this sentence.
     */
    whoTeaches:
      'Cindy Ha will teach the first cohort herself. She built a business '
      + 'without this material and met the formal version of it years later, '
      + 'which is the whole reason the organization exists. The first summer is '
      + 'where what she learned late gets handed over early, in person, by her.',
  },
} as const;

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
    authors: 'Veronica Frisancho', year: 2023,
    title: 'Spillover Effects of Financial Education: The Impact of School-Based Programs '
         + 'on Parents',
    publication: 'Journal of Financial Literacy and Wellbeing 1(1), 138 to 153',
    url: 'https://doi.org/10.1017/flw.2023.2',
    finding: 'A randomized controlled trial across 300 public high schools in Peru. '
           + 'Teachers delivered 16 to 32 hours of financial education inside an existing '
           + 'class to nearly 20,000 students in grades 9 to 11. Three years later the '
           + 'study matched 11,090 parents to credit bureau records. Average effects '
           + 'across all parents were small, but in low socioeconomic status households '
           + 'the probability of default fell 26 percent and credit scores rose 5 percent, '
           + 'while high status households showed almost no change. Effects were stronger '
           + 'for the parents of daughters.',
    bearing: 'The only study in this list that tests whether what a child learns reaches '
           + 'the household, which is half the reason this organization exists. It '
           + 'supports that claim specifically for lower income families, which is the '
           + 'population we are built for and the one Fernandes found the weakest effects '
           + 'in. The limits are real and worth stating first: Peru rather than '
           + 'California, grades 9 to 11 rather than elementary, and a short course rather '
           + 'than a ten-year pathway. It says the mechanism exists. It does not say ours '
           + 'will produce it.',
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

/**
 * Small whole numbers as words, for prose that has to start a sentence or read
 * as a sentence. Falls back to the digits, which is ugly but never wrong.
 *
 * This exists so no sentence on the site has to spell a count by hand. The
 * disclaimer in NOT_AN_MBA spent a month saying "Two" while the ladder beside
 * it, computed, said four.
 */
export function spellOut(n: number): string {
  const words = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven',
                 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen',
                 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen',
                 'Nineteen', 'Twenty'];
  return words[n] ?? String(n);
}

/** US dollars, no cents. */
export function usd(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD',
    minimumFractionDigits: 0, maximumFractionDigits: 0 });
}
