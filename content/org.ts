/**
 * SINGLE SOURCE OF TRUTH FOR EVERY FACTUAL CLAIM ON THIS SITE.
 *
 * Rule: if a claim is not in this file, it does not belong on the site.
 *
 * Everything below marked "verified" is documented in a public record — the IRS
 * Tax Exempt Organization Search or the California Secretary of State business
 * search — and can be checked by anyone, which is exactly the point.
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

  /** verified — CA Secretary of State, entity 6427957 */
  incorporation: {
    state:            'California',
    entityNumber:     '6427957',
    entityType:       'Nonprofit Corporation — CA — Public Benefit',
    initialFilingDate: '2024-10-17',
    status:           'Active',
    standings:        ['Secretary of State', 'Franchise Tax Board', 'Agent', 'VCFCF'],
    statementOfInfoDue: '2026-10-31',
  },

  /** verified — IRS Tax Exempt Organization Search */
  taxStatus: {
    status: 'determined' as 'determined' | 'pending' | 'fiscally-sponsored' | 'none',
    ein: '33-1544346',
    determinationDate: '2024-10-20',
    /** IRS deductibility code PC — public charity */
    deductibilityCode: 'PC',
    onPub78: true,
    fiscalSponsor: null as string | null,
  },

  /** Registered office of the corporation. This is the legal address of record,
   *  not where programs are delivered — see `serviceArea`. */
  registeredAddress: {
    line1: '28 Geary Street, Suite 650',
    line2: 'San Francisco, CA 94108',
    country: 'United States',
  },

  /** TODO — CONFIRM. The corporation is registered in San Francisco; the programs
   *  described on this site are aimed at schools in the San Gabriel Valley. Grant
   *  applications ask for both, and they ask separately. Make sure this line
   *  matches what you put on an application. */
  serviceArea: 'San Gabriel Valley, California',

  /** TODO — a monitored inbox. This address receives every form submission and
   *  appears on the governance page. Without it the contact route cannot deliver. */
  contactEmail: '',
} as const;

/** Public records a funder can pull up without asking you for anything. */
export const PUBLIC_RECORDS = {
  irsSearchUrl:
    'https://apps.irs.gov/app/eos/detailsPage?ein=33-1544346&name=Young%20Innovators%20for%20Change&resultsPerPage=25&indexOfFirstRow=0&search=Advanced&dispatchMethod=searchAll',
  caBusinessSearchUrl: 'https://bizfileonline.sos.ca.gov/search/business',
  /** verified — determination letter is published by the IRS at this filename */
  determinationLetterFile:
    'FinalLetter_33-1544346_YOUNGINNOVATORSFORCHANGE_10202024_00.pdf',
};

/** Claims about transparency and oversight. Each requires an artifact behind it. */
export const TRANSPARENCY = {
  /** verified — Form 990-N (e-Postcard) filed for tax period 2025 */
  form990Filed: true,
  form990Form: '990-N (e-Postcard)' as string | null,
  form990LatestPeriod: '2025',
  /** verified — gross receipts attestation on the 990-N */
  grossReceiptsUnder: 50000,

  /** Not yet true. A 990-N filer is below the threshold that would normally
   *  trigger an audit; do not imply otherwise. */
  independentlyAudited: false,
  annualReportUrl: null as string | null,
  candidProfileUrl: null as string | null,

  /** TODO — California charities that solicit donations register separately with
   *  the Attorney General's Registry of Charities and Fundraisers and file annually.
   *  Confirm standing, then set this to true so it appears on /governance. */
  caRegistryConfirmed: false,
  caRegistryNumber: null as string | null,
};

// ─── Statistics ───────────────────────────────────────────────────────────────

export type Stat = { value: string; label: string; note?: string };

/**
 * OUTCOME claims — students served, districts reached, measured change.
 * Add an entry ONLY when you can produce the roster, the district agreement or
 * the dataset behind it. Intentionally empty: no cohort has run.
 */
export const VERIFIED_STATS: Stat[] = [];

/** Facts about what has been built and committed to. All checkable today. */
export const PROGRAM_FACTS: Stat[] = [
  { value: '4',    label: 'Programs Designed', note: 'Discrete Math, Leadership, Venture Lab, Financial Literacy' },
  { value: '36',   label: 'Weeks of Curriculum', note: 'Discrete Math Adventures, Grade 2' },
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
 * as agent for service of process with the California Secretary of State — both
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
 * FOUNDER — biography.
 *
 * PROVENANCE, and read this before editing: unlike everything above, none of
 * this is a public record. It is Cindy's own account of her life, and it is on
 * the site because she chose to put it there. That makes it a different kind of
 * claim from the EIN — not weaker, but checkable by a different method, which is
 * asking her.
 *
 * The rule that follows from that: every line here should be one she would say
 * out loud, unedited, to a programme officer sitting across a table. Nothing
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
   * TODO — she holds an MBA. Put the school here and the About page names it;
   * leave it empty and the page says "an MBA" and names nothing.
   *
   * Do not fill this in from memory or from an older draft of the site. A named
   * institution is the single most checkable thing on this page, and a grant
   * reviewer who finds one wrong claim re-reads everything else differently.
   */
  mbaSchool: '',

  /** founder-attested — the business she built and exited */
  business: {
    startedFrom: '900-square-foot retail storefront',
    grewInto:    'retail, wholesale, import and e-commerce',
    exit:        'sold after the birth of her first child',
  },

  /**
   * Direct quotes. These are Cindy's words, lightly punctuated.
   *
   * If she would not say a sentence in this shape, change the sentence — do not
   * keep it because it reads well.
   */
  quotes: {
    theBusiness:
      'Looking back, those were the best moments — the ideas, and the sweat. '
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
 * Board of directors — distinct from advisors, and the thing grantmakers ask for
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
  if (ORG.incorporation.status === 'Active') out.push('CA Nonprofit — Active, Good Standing');
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
 *   published — written in full, downloadable today
 *   designed  — syllabus and module structure complete, materials not yet written
 *   planned   — on the roadmap, not started
 *   n/a       — this strand does not run at this grade band
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
         + 'repeating it — discrete mathematics in the early grades, widening into proof, '
         + 'modelling and applied problem solving.',
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
      { band: 'Grades 3–5',  status: 'designed', note: 'Founders Track — 8 weeks.' },
      { band: 'Grades 6–8',  status: 'designed' },
      { band: 'Grades 9–12', status: 'designed', note: 'Executives Track — 8 weeks.' },
    ],
  },
  {
    key: 'venture', name: 'Entrepreneurship', track: 'Enterprise',
    blurb: 'Students build, price and pitch a real micro-business over eight weeks, ending '
         + 'in a live pitch to a panel.',
    bands: [
      { band: 'Grades 1–2',  status: 'n/a' },
      { band: 'Grades 3–5',  status: 'designed' },
      { band: 'Grades 6–8',  status: 'designed' },
      { band: 'Grades 9–12', status: 'designed' },
    ],
  },
  {
    key: 'finance', name: 'Financial Literacy', track: 'Enterprise',
    blurb: 'Budgeting, credit, compounding and unit economics — the money knowledge most '
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
  'n/a':     '—',
};

export function countByStatus(s: Status): number {
  return CURRICULUM.reduce((n, st) => n + st.bands.filter((b) => b.status === s).length, 0);
}

/** Where a school can actually start today. */
export const AVAILABLE_NOW = 'Grade 2 mathematics — Discrete Math Adventures, 36 weeks.';
