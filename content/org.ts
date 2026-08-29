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
  { value: '4',    label: 'Programs Designed' },
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
