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

import {
  PUBLISHED_SCIENCE_STANDARDS, PUBLISHED_STANDARDS, PUBLISHED_WEEKS, PUBLISHED_YEARS,
} from './published';

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
    /** verified, the filed Statement of Information. Nonprofit corporations
     *  file every two years, in the month of original filing and the five
     *  months before it. First filed October 2024, so the windows are
     *  October 2026, October 2028, and so on. */
    statementOfInfoFiled:  '2026-10-05',
    statementOfInfoFileNo: 'BA20261884943',
    statementOfInfoDue:    '2028-10-31',
  },

  /** verified, IRS Tax Exempt Organization Search */
  taxStatus: {
    status: 'determined' as 'determined' | 'pending' | 'fiscally-sponsored' | 'none',
    ein: '33-1544346',
    /** IRS determination letter date, 28 October 2024 (David, 22 Oct 2026).
     *  It was 2024-10-20 until then, which is the date the Form 1023-EZ was
     *  submitted (Pay.gov receipt), not the letter date. See claude/47. */
    determinationDate: '2024-10-28',
    /** IRS deductibility code PC, public charity */
    deductibilityCode: 'PC',
    onPub78: true,
    fiscalSponsor: null as string | null,
  },

  /** verified, CA Secretary of State. Principal office of the corporation,
   *  the legal address of record, as filed on the Statement of Information of
   *  5 October 2026 (`incorporation.statementOfInfoFileNo`). It replaced the
   *  original office at 166 Geary St, Ste 1500, Box 2512, San Francisco,
   *  CA 94108, which the IRS still has until a Form 8822-B is filed. This is
   *  where the organization is, not where programs are
   *  delivered, see `serviceArea`. */
  address: {
    street:  '301 E Arrow Hwy, Ste 101',
    city:    'San Dimas',
    state:   'CA',
    zip:     '91773',
    country: 'United States',
  },

  /** verified, same Statement of Information. Where mail goes: same building,
   *  with a box number. Also the address of the agent for service of process.
   *  Use this on anything that will be mailed back: grant correspondence, IRS
   *  and FTB notices, checks. */
  mailingAddress: {
    street:  '301 E Arrow Hwy, Ste 101 - #829',
    city:    'San Dimas',
    state:   'CA',
    zip:     '91773',
    country: 'United States',
  },

  /** Decided by David, 22 October 2026: the pilot is offered to school
   *  districts across Southern California (an email to every district), not
   *  only the San Gabriel Valley. The office is in San Dimas. Grant
   *  applications ask for both, separately; this is the program line. */
  serviceArea: 'Southern California',

  /** The monitored inbox. Every form submission is delivered here, and the
   *  address is printed on /governance so a program officer doing diligence can
   *  reach a person without filling in a form.
   *
   *  Two separate things have to be true for a message to arrive, and they are
   *  easy to confuse. This address must RECEIVE mail, which is Porkbun's free
   *  forwarding and needs MX records on the root domain. The API route SENDS
   *  through Resend from CONTACT_FROM, which needs Resend's own records, which
   *  Resend places on the `send.` subdomain so the two cannot collide. Neither
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

  /** California charities register with the Attorney General's Registry of
   *  Charities and Fundraisers and file annually. Form CT-1 was submitted by
   *  David on 22 October 2026 (`caRegistryFiled`). Set `caRegistryConfirmed`
   *  to true and fill `caRegistryNumber` only when the Registry issues the
   *  number; that turns on the badge on /governance. Until then the site says
   *  filed, never registered. */
  caRegistryFiled: '2026-10-22' as string | null,
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
    'Young Innovators for Change exists so that children who would not otherwise learn '
    + 'how business works reach adulthood able to act on money rather than be acted '
    + 'upon.',

  /** Who the work is aimed at. Intent, not a description of who is reached. */
  population:
    'Students in lower income communities, whose families have not had access to '
    + 'the ideas a business education formalizes, and who would otherwise meet them '
    + 'first as adults, at a price.',

  /**
   * The phrase to use, and the reason to use it. "Teach kids how capitalism works"
   * is how this gets described in conversation and it is the wrong sentence for a
   * page a program officer reads. The claim below is narrower, defensible and
   * closer to what the material actually does.
   */
  agency:
    'The subject is not financial literacy but economic agency: price, cost, '
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
      body: 'Every year of curriculum is free to anyone who finds it. That is how this '
          + 'organization started, and it tells us nothing about who receives it.',
    },
    {
      title: 'The program is aimed',
      body: 'It runs in the districts that host it, with a roster, for the students the '
          + 'mission names, and it is measured. A download cannot name anyone. That is '
          + 'why the program exists.',
    },
  ],

  /** Say these before anything else, on any page that draws on the mission. */
  notYetTrue: [
    'No program of ours has run with students. Grade 7 is written and Grade 8 is a draft, '
    + 'both running in our web app as a preview for adults. Teachers using the free material on their own are '
    + 'not a program we ran, and we do not count them as one.',
    'We do not know who downloads the free materials, and we will not describe them as '
    + 'low income until we can.',
    'Nothing has been measured. The evaluation design is published. The results do not '
    + 'exist.',
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
 * that had been retired for the grades that actually have material.
 *
 * On 21 October 2026 the high school summer program (the Executives Track) was
 * cut. Grades 7 to 12 are now one designed program: self-paced lessons in an
 * app with an AI tutor, plus in-person sessions with guests. See
 * DELIVERY.models and DELIVERY.pilot, and claude/42-the-grade7-app-pilot.md.
 */
// PROGRAM_FACTS is declared after CURRICULUM, below, because its first entry
// counts the subject lines in that array rather than typing the number. It said
// "4 Programs Designed" and named four of them for three days after the science
// line, the fifth, was published.

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

type PostalAddress = typeof ORG.address | typeof ORG.mailingAddress;

/** The two printed lines of an address, e.g.
 *  ["301 E Arrow Hwy, Ste 101", "San Dimas, CA 91773"]. */
export function addressLines(a: PostalAddress): [string, string] {
  return [a.street, `${a.city}, ${a.state} ${a.zip}`];
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
    blurb: 'Reasoning-first mathematics that sits beside the state curriculum. Discrete '
         + 'mathematics in the early grades, widening into proof, modeling and applied '
         + 'problem solving.',
    bands: [
      { band: 'Grades 1–2',  status: 'published',
        note: 'Grades 1 and 2 complete: What Goes Together and Things Worth Noticing, '
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
    blurb: 'Investigation-led science on the same principle as the mathematics: low '
         + 'materials cost, high reasoning demand, printable on a school copier.',
    bands: [
      { band: 'Grades 1–2',  status: 'published',
        note: 'Grades 1 and 2 complete: Look and Listen and Look Closer, 36 weeks each.' },
      { band: 'Grades 3–5',  status: 'published',
        note: 'Grades 3 to 5 complete: What Made That Happen?, Where Did It Go? and Too '
            + 'Small to See, 36 weeks each.' },
      { band: 'Grades 6–8',  status: 'published',
        note: 'Grade 6 complete: Inside the System, 36 weeks. Grades 7 and 8 are '
            + 'deliberately unwritten: print is the wrong medium for that age.' },
      { band: 'Grades 9–12', status: 'planned' },
    ],
  },
  {
    key: 'leadership', name: 'Leadership', track: 'Enterprise',
    blurb: 'Executive presence, decision-making and team dynamics, taught through real '
         + 'scenarios.',
    bands: [
      { band: 'Grades 1–2',  status: 'n/a' },
      // The Founders Track was a summer program. Summer programs were cut on
      // 21 October 2026 and Grades 1 to 6 are printed workbooks only, so this
      // band keeps its design and has no form of delivery.
      { band: 'Grades 3–5',  status: 'designed',
        note: 'Designed as a summer program, since cut. No leadership workbook is '
            + 'written for these grades.' },
      { band: 'Grades 6–8',  status: 'designed',
        note: 'From Grade 7, part of the web app program with in-person guest speakers. '
            + 'Designed, not written.' },
      { band: 'Grades 9–12', status: 'designed',
        note: 'Part of the Grades 7 to 12 web app program. Designed, not written.' },
    ],
  },
  {
    key: 'venture', name: 'Entrepreneurship', track: 'Enterprise',
    blurb: 'A full school year, one assignment a week: find a problem, design a fix, work '
         + 'out cost and price, sell it at a class market day, then find out whether it '
         + 'made a profit.',
    bands: [
      { band: 'Grades 1–2',  status: 'n/a' },
      { band: 'Grades 3–5',  status: 'published',
        note: 'Grades 4 and 5 complete: The Venture Year and The Numbers Year, 36 weeks '
            + 'each. No Grade 3 year is written.' },
      { band: 'Grades 6–8',  status: 'published',
        note: 'Grade 6 complete: The Market Year, 36 weeks. Grade 7 is written and runs '
            + 'in the web app as a preview for educators, and Grade 8 runs there as a '
            + 'draft. No printed year is planned.' },
      { band: 'Grades 9–12', status: 'designed',
        note: 'Part of the Grades 7 to 12 web app program. Grade 9 is drafted and not yet '
            + 'in the web app. Grades 10 to 12 are designed, not written.' },
    ],
  },
  {
    key: 'finance', name: 'Financial Literacy', track: 'Enterprise',
    blurb: 'Choosing, saving, giving and keeping track in the elementary grades, then '
         + 'budgeting, credit and compounding when a student is about to meet them.',
    bands: [
      { band: 'Grades 1–2',  status: 'n/a' },
      { band: 'Grades 3–5',  status: 'published',
        note: 'Complete: The Choosing Year, The Planning Year and The Keeping '
            + 'Year, 36 weeks each.' },
      { band: 'Grades 6–8',  status: 'published',
        note: 'Grade 6 complete: The Asking Year, 36 weeks. Grade 7 is written and runs '
            + 'in the web app as a preview for educators, and Grade 8 runs there as a '
            + 'draft. No printed year is planned.' },
      { band: 'Grades 9–12', status: 'designed',
        note: 'Part of the Grades 7 to 12 web app program. Grade 9 is drafted and not yet '
            + 'in the web app. Grades 10 to 12 are designed, not written.' },
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

/** "Mathematics, science, leadership, entrepreneurship and financial literacy". */
function subjectList(): string {
  const names = CURRICULUM.map((s, i) => (i === 0 ? s.name : s.name.toLowerCase()));
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
}

export const PROGRAM_FACTS: Stat[] = [
  { value: String(CURRICULUM.length), label: 'Subjects', note: subjectList() },
  { value: String(PUBLISHED_WEEKS), label: 'Weeks of Lessons',
    note: `${PUBLISHED_YEARS.length} full school years, 36 weeks each` },
  // Mathematics (CCSS-M) and science (CA NGSS) codes, each read off the
  // published PDFs by brand/mksite.py and counted separately there, so neither
  // number can quietly absorb the other.
  { value: String(PUBLISHED_STANDARDS + PUBLISHED_SCIENCE_STANDARDS), label: 'California Standards Matched',
    note: `Distinct math and science standards across all ${PUBLISHED_WEEKS} weeks` },
  { value: '$0',   label: 'Cost to Students' },
  { value: '100%', label: 'Free to Download', note: 'Every workbook and teacher guide' },
];

/**
 * Where a school can actually start today. The year count is computed from the
 * generated list of published books rather than typed, because it was typed
 * once as "Three full years" and was wrong within a month.
 */
export const AVAILABLE_NOW =
  `${PUBLISHED_YEARS.length} full years, 36 weeks each: mathematics and science for Grades `
  + '1 to 6, financial literacy for Grades 3 to 6, and entrepreneurship for Grades 4 to 6.';

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
    note: '36 weeks, written in full, free today. Nothing is sold in it: that is Grade 4. '
        + 'This year is about the student\'s own money.',
  },
  {
    grade: 'Grade 4', status: 'published', book: 'The Venture Year',
    concept: 'One student, one product, one market day, whole dollars. Find a problem, '
           + 'design a fix, work out what it costs and what to charge, sell it, then '
           + 'find out whether it made a profit.',
    mbaCourse: 'Marketing and introductory accounting',
    note: '36 weeks, written in full, free today.',
  },
  {
    grade: 'Grade 5', status: 'published', book: 'The Numbers Year',
    concept: 'A team of two or three with named roles and a profit split written as '
           + 'fractions. A product line of three with one cut. Fixed and variable costs '
           + 'pulled apart. A forecast, two selling sessions, one change between them, '
           + 'and the answer to whether the change did anything.',
    mbaCourse: 'Managerial accounting and operations',
    note: '36 weeks, written in full, free today. The third trimester is a controlled '
        + 'experiment.',
  },
  {
    grade: 'Grade 6', status: 'published', book: 'The Market Year',
    concept: 'A second seller appears. Pricing against somebody else’s price, '
           + 'substitutes, market share, and a response round where every team sees '
           + 'every other team’s numbers and moves at once.',
    mbaCourse: 'Competitive strategy',
    note: '36 weeks, written in full, free today. Written before any class ran it, so '
        + 'the first revision after one will be substantial.',
  },
  {
    // Designed since 21 October 2026: the year's units are mapped
    // (claude/44-grades-7-12-course-map.md) and the first ones are written and
    // verified. Stays short of 'published' until a student has used it.
    // "See DELIVERY.pilot." used to end this note and rendered on /pathway.
    grade: 'Grade 7', status: 'designed',
    concept: 'Cash against profit. Why a sale and money in hand are different events, '
           + 'what inventory ties up, and how a profitable business runs out of money. '
           + 'Each student also picks the one venture they will carry through Grade 12.',
    mbaCourse: 'Financial accounting and marketing',
    note: 'The first year of the web app and the year the first pilot teaches. All '
        + 'eight units are written, checked, and running as a preview for educators. No '
        + 'student has used it yet.',
  },
  {
    // Planned until 27 October 2026, with the note "Next in the web app. Not
    // written yet." All eight units are now written (claude/57) and in the same
    // preview as Grade 7, marked there as a draft. The concept was rewritten to
    // match the units as written: the old one promised "why the same purchase
    // costs two people different amounts", which no unit teaches.
    grade: 'Grade 8', status: 'designed',
    concept: 'What capital costs, and what records can tell you. Interest, compound '
           + 'growth, the arithmetic of a loan, whether a purchase is worth borrowing '
           + 'for, and a lender against a partner. Then reading records, lines that '
           + 'predict, and how often a prediction was wrong. The question for the '
           + 'student’s own venture: borrow or not, and how much.',
    mbaCourse: 'Corporate finance and data analysis',
    note: 'All eight units are written as a draft and open to educators in the same '
        + 'preview as Grade 7. No student has used it yet.',
  },
  {
    grade: 'Grade 9', status: 'designed',
    concept: 'Reading a business from its numbers. Three statements, unit economics, '
           + 'break-even, and the questions to ask when the numbers and the story '
           + 'disagree.',
    mbaCourse: 'Financial statement analysis',
    note: 'All eight units are drafted. They are not in the web app yet, and no student '
        + 'has used them.',
  },
  {
    grade: 'Grade 10', status: 'designed',
    concept: 'How a group of people gets work done. Roles, delegation, incentives, and '
           + 'what happens to a plan when the people carrying it out did not write it.',
    mbaCourse: 'Organizational behavior and operations',
    note: 'Parts are outlined in the Leadership syllabus. The full year is not written.',
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
  'This is not a degree. Finishing it confers no credential of any kind.',
  'It carries no academic credit, no college credit, and no articulation agreement '
  + 'with any institution.',
  'Young Innovators for Change is not an accredited school and awards no diplomas, '
  + 'certificates or transcripts.',
  'It is not a substitute for a graduate business education. A student who completes '
  + 'it and later wants an MBA should go and get one.',
  // This line said "Two of its ten years are written" from August until
  // 1 September 2026, by which point four were. pathwayPublishedCount() already
  // existed and the ladder heading above it was already using it; the
  // disclaimer, of all the sentences on the site, was the one still typing the
  // number by hand. Nothing else on this page may hardcode it either.
  `No student has completed this pathway. ${spellOut(pathwayPublishedCount())} of its `
  + `${spellOut(PATHWAY.length).toLowerCase()} years are published as books, Grade 7 is `
  + 'written in the web app with Grade 8 there as a draft, and nobody has run any of them start to finish with '
  + 'students yet.',
];

/**
 * The opt-in principle, in Cindy's framing: nobody can be made to want this.
 * Written as a commitment because it constrains program design, not as a slogan.
 */
export const OPT_IN: { title: string; body: string }[] = [
  // Rewritten 21 October 2026, when the 16-seat summer cohort was cut. Its
  // waitlist, handwritten proposal and lottery went with it: the Grades 7 to 12
  // program runs in an app, so it needs no seat limit and nobody has to be
  // chosen. Fit is unchanged, in David's words: a student who is hungry and has
  // a real interest in business. Family business background is not part of it.
  { title: 'Offered to every student, required of none',
    body: 'The pathway sits beside the school day, not inside a graduation requirement. '
        + 'A student who is not interested this year loses nothing and can start next '
        + 'year. From Grade 7 the lessons run in a web app, so there is no seat limit.' },
  { title: 'No test, no ranking, no prerequisite',
    body: 'No test to get in, no application to be ranked, no prior year to have '
        + 'completed. Wanting to do it is the entry criterion.' },
  { title: 'The ceiling is not set by us',
    body: 'A student who wants to go further than their grade should be handed the next '
        + 'book. Every year is published in full, so nothing waits on our permission.' },
  { title: 'Effort is the variable we are betting on',
    body: 'The material rewards work rather than speed or prior exposure. Whether that '
        + 'is enough is an open question, listed on the evidence page as one we could be '
        + 'wrong about.' },
  // Was "Missing a summer does not cost your place" (20 October 2026). The
  // principle survived the cohort: a student who stops is not shut out.
  { title: 'Stopping does not close the door',
    body: 'A student who stops can come back. The program asks students to keep going. '
        + 'It does not shut out one who could not.' },
];

// ─── Load-bearing assumptions ─────────────────────────────────────────────────

/**
 * What has to be true for the theory of change to hold, each with the specific
 * way it could fail. Rendered on /mission as the assumptions and on /impact as
 * the questions the first pilot study has to answer, from this one list, so
 * the two pages cannot drift apart. Moved here from app/mission/ui.tsx on
 * 16 October 2026 when /impact lost its Grade 2 classroom study and needed the
 * same list.
 */
export const ASSUMPTIONS: { text: string; risk: string }[] = [
  { text: 'That an adult with the book in front of them will do the part the book '
        + 'cannot do.',
    risk: 'Everything rests on this, and it is the part we control least. We can make '
        + 'the books short, correct and free. We cannot supply the thirty-five minutes a '
        + 'week, or a person who cares whether the child in the third row understood it.' },
  { text: 'That what a child learns about money makes it home to their family.',
    risk: 'The only experiment that found this happening was a short course in Peruvian '
        + 'high schools. If it does not hold up here, half the reason this organization '
        + 'exists does nothing.' },
  { text: 'That a program students choose to join does not just attract the ones who '
        + 'were already going to be fine.',
    risk: 'If it does, we widen the gap we set out to close. It is the likeliest way for '
        + 'us to fail while looking like a success.' },
  // Until 22 October 2026 this said "using real money", which no book does:
  // the market days run on play money. The bet is the venture thread instead.
  { text: 'That spreading the lessons over years, and tying them to a venture each '
        + 'student carries from Grade 7 to Grade 12, makes the learning last.',
    risk: 'The biggest review in our research list found that financial education had '
        + 'almost no effect 20 months later. Our answer is to spread the lessons out and '
        + 'attach them to decisions about the student\'s own venture. Neither has been '
        + 'tested.' },
  // The next two were added 21 October 2026 with the Grades 7 to 12 app. They
  // name the two ways the app could fail that the old summer room could not.
  { text: 'That a student will keep working through lessons on their own, with a '
        + 'tutor that is not a person.',
    risk: 'If students start and drift off, the app reaches many and teaches few. The '
        + 'in-person sessions are our answer, and they have not been tested.' },
  { text: 'That an AI tutor teaches the lessons we wrote, and nothing else.',
    risk: 'A tutor that is confidently wrong teaches a child something false. Ours works '
        + 'only from lessons we have written and checked, and adults can read every '
        + 'conversation it has. Neither safeguard has been tried with a student.' },
  { text: 'That a school district will host a program from an organization with no '
        + 'track record.',
    risk: 'The assumption we are testing first, and the one most likely to fail.' },
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
 * `pilot.status` is 'seeking'. It becomes something else only when a district
 * has agreed in writing and the agreement is on file.
 *
 * Changed 21 October 2026. The high school summer cohort (one instructor, 16
 * seats, four summers) was cut because it could not reach enough students.
 * Grades 7 to 12 became one designed program, self-paced lessons in an app
 * with an AI tutor plus in-person sessions with guests, and `summerIntensive`
 * became `pilot`. The deliberate blank for Grades 7 and 8 (`middleGrades`,
 * written 2 September 2026) was retired the same day, as its own comment said
 * it should be once a digital form of delivery existed. The app is designed,
 * not built, and every line below says so.
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
    + 'was deliberate. It also means we cannot see who is teaching this. We do '
    + 'not know your name, your school or your grade, and we will not describe '
    + 'you on this site as though we did.',

  /** What we owe whoever is delivering it. Each line is a commitment we can keep today. */
  commitments: [
    { title: 'Every answer, recomputed rather than remembered',
      body: 'The teacher guide carries the answer to every problem, each one '
          + 'recomputed from the problem as printed by a script that refuses to '
          + 'build the book if a single answer disagrees. You should not have to '
          + 'check our arithmetic at ten at night.' },
    { title: 'Prep that fits inside a prep period',
      body: 'Each week is two pages, with the common wrong answers and what to '
          + 'say to a stuck student written out beside them. No training week, '
          + 'no certification.' },
    { title: 'It prints on the copier you already have',
      body: 'Every page was proofed in grayscale. Structure lives in the '
          + 'linework and color is accent only, so a black-and-white copy loses '
          + 'nothing.' },
    { title: 'Nothing to sign, nothing to buy, no account',
      body: 'You can run a full year without ever telling us you exist. That is '
          + 'the design, and it is why our log is a count rather than a roster.' },
    { title: 'Tell us where it breaks',
      body: 'A teacher who writes in November to say week twelve falls apart is '
          + 'giving this curriculum something no funder can. We would rather hear '
          + 'that than a compliment.' },
  ],

  /**
   * WHAT WE KNOW ABOUT USE, which is very little, and how little is the point.
   *
   * FOUNDER-ATTESTED. Like the biography in FOUNDER and unlike the EIN, none of
   * this is a public record. Teachers have written in to say they are using the
   * material with their classes, some of them only to say thank you, and that
   * correspondence is the entire evidence base for the claim below.
   *
   * WHAT THIS DOES NOT LICENSE, and every line of this list has burned a
   * nonprofit before:
   *
   *   - No count. Not "dozens", not "a growing number", not "several". We have
   *     an inbox, not a roster, and an estimate dressed as a figure is the same
   *     error as the hardcoded stats in 06-what-went-wrong.md.
   *   - No district, school or city named, anywhere on the site. A teacher
   *     downloading a free PDF does not make her employer a partner, has not
   *     asked to be associated with us, and 01-organization.md is explicit:
   *     we do not name a district we do not serve.
   *   - No quotes. A thank-you message is not permission to publish anyone's
   *     words. TESTIMONIALS is still empty and stays empty until written
   *     consent is on file.
   *   - No outcome, however tempting. Somebody being glad to have the book is
   *     not evidence that a child learned anything from it.
   *
   * The honest shape is: it is being taught, we cannot tell you by whom or how
   * well, and we would rather say that than imply either more or less.
   */
  inUse: {
    known:
      'The material is being taught. Teachers have written to tell us so, '
      + 'homeschool educators among them.',
    unknown:
      'We do not know how many there are, where they teach, how far anyone has '
      + 'gone, or whether any of it is working. Nothing we publish asks for a '
      + 'name, so there is no roster, and we will not estimate one and call it a '
      + 'figure.',
  },

  /**
   * The two delivery models. Slow and printed for the elementary years; for the
   * older ones, self-paced in an app plus a room. The second is DESIGNED: the
   * Grade 7's eight units are written and an adults-only preview of them is
   * live (claude/45), but the app students will use is not built. Its status
   * changes only when a student has used it. `badge` is the small label each
   * card carries on / and /teachers; it used to be computed from `status` and
   * said "Not yet built" beside a sentence saying the first unit was built.
   */
  models: [
    {
      band: 'Grades 1 to 6',
      shape: 'Slow, weekly, inside the school year',
      badge: 'Running today',
      who: 'The classroom teacher, the instructional aide, the after-school '
         + 'lead, or a caretaker at a kitchen table.',
      body: 'Thirty-six weeks, one assignment a week, sequenced against the '
          + 'California pacing guide so it reinforces what the class is already '
          + 'doing that month. Mathematics and science run from Grade 1, the money '
          + 'years from Grade 3 and the venture years from Grade 4. It asks for the '
          + 'one resource an elementary school has: a little time every week for a '
          + 'long time.',
      status: 'published' as const,
    },
    {
      band: 'Grades 7 to 12',
      shape: 'At their own pace, with a room to meet in',
      badge: 'Grades 7 and 8 preview, adults only',
      who: 'Pip, an AI tutor that tells students plainly it is an AI. Guest speakers '
         + 'and fireside chats in person, organized by Cindy Ha, the founder, with a '
         + 'teacher from the school in the room.',
      body: 'The ideas a business school teaches, spread over six years instead of '
          + 'two, in a web app with nothing to install. Every student works through '
          + 'the same written lessons at their own pace with Pip, an AI tutor that '
          + 'explains, asks questions and gives feedback. Pip teaches from lessons we '
          + 'write and check; it does not make up the course. The room is for what an '
          + 'app cannot do: guest speakers from business, and conversations about what '
          + 'is happening in it now. Each student picks one venture in Grade 7 and '
          + 'builds on it through Grade 12. Grade 7 is written and running as a '
          + 'preview for educators, with Grade 8 beside it as a draft. Grades 9 to 12 '
          + 'come next. No student has used it yet.',
      status: 'designed' as const,
    },
  ],

  /** The open ask. Change `status` only against a signed agreement. */
  pilot: {
    status: 'seeking' as 'seeking' | 'scheduled' | 'running',

    /**
     * The working preview of Grade 7 (Unit 1 from 21 October 2026, all eight units
     * from 22 October; Grade 8 beside it as a draft from 27 October), a separate app at
     * app.innovateyouth.org behind a passcode (the young-innovators-demo
     * folder). Set `live` to true only once that address answers with the
     * passcode page; until then /teachers shows nothing about it.
     */
    preview: {
      live: true,
      url: 'https://app.innovateyouth.org',
      body: 'Grade 7 is built in the web app, all eight units, and Grade 8 is there '
          + 'too as a draft. Educators and district staff can try it the way a student '
          + 'would, Pip included, then see what the teacher sponsor sees. It sits behind a passcode because no '
          + 'student may use it until a district has signed a data agreement and '
          + 'families have signed consent forms. Write to us for the passcode.',
    },
    /**
     * Decided 22 October 2026, by David: recruit districts in parallel and
     * start them in sequence. The one-district rule existed because the summer
     * cohort had 16 seats and a district that said yes could not be turned
     * away; the app has no seat limit, so that reason is gone. Later the same
     * day: no named first districts either; the ask goes by email to every
     * district in Southern California (`ORG.serviceArea`). The first
     * district to sign runs the spring test unit in one school; the full year
     * can run in several districts from the fall. No number of districts is
     * stated: the limit is how many rooms Cindy can host, which is not set.
     */
    ask: 'We are looking for school districts to host the first pilot year. The '
       + 'first to sign runs a spring test unit in one middle school. From the fall, '
       + 'the full Grade 7 year can run in several districts at once, because the '
       + 'lessons run in a web app and nobody needs a seat.',

    /**
     * Decided 21 October 2026: one unit in the spring as a test, then the full
     * Grade 7 year from the fall, open to every interested seventh grader. No
     * year is named because no district has signed. The session cadence is not
     * decided (open decision 18), so this does not state one.
     */
    detail:
      'We ask each district for a teacher to sponsor it, a room for the in-person '
      + 'sessions, someone at each school to set dates with us, help letting seventh '
      + 'graders know it exists, and a signed student data privacy agreement. It '
      + 'costs a district nothing. Nobody is handed an app and wished luck: a program '
      + 'has to be run by the people who wrote it before it can be handed to anyone '
      + 'else.',

    /**
     * Why there is a room at all, when the lessons run in an app. This
     * constrains program design, so it is written as a commitment rather than a
     * slogan. "Is meant to be" is deliberate: nothing here has been tried.
     */
    whyInPerson:
      'An app can teach the ideas. It cannot make a thirteen-year-old want them, '
      + 'or introduce them to someone who does this for a living. That is what the '
      + 'room is for: a guest lecture, or a fireside conversation about something '
      + 'happening in business now, with the other students who chose to be there. '
      + 'The app is how this reaches every student who wants it. The room is meant '
      + 'to be why they keep going.',

    /**
     * The founder's sentence for what the six years add up to, and the
     * disclaimer it must never travel without.
     *
     * "This would be their business school" is the true and useful half of the
     * claim. The false half is the one NOT_AN_MBA exists to refuse, and the
     * site has already been burned once by a sentence that read well and
     * conferred a credential nobody grants. Both halves stay in one string so
     * they cannot be separated by a later edit that keeps only the good line.
     * Never write "MBA" into the positive half.
     */
    theClaim:
      'Six years of the ideas a business school teaches, at their own pace, '
      + 'alongside people who do the work: for a student who has nothing else '
      + 'like it, this is their business school. It is also not a business '
      + 'school. No degree, no credit, no transcript, and no tuition either.',

    /**
     * What the tutor will and will not do. Design commitments, written into the
     * first district proposal on 21 October 2026, so they are binding on the
     * build. The district's data agreement, not this list, is what binds us
     * legally, and the page says so.
     */
    tutorRules: [
      // The tutor carries the mascot's name, Pip, and nothing else of a
      // character (claude/43). Name only: keep these two rules saying so.
      { title: 'It says it is an AI',
        body: 'The tutor is called Pip, after the mascot on our books, and every '
            + 'screen where it speaks says Pip is an AI, not a person.' },
      { title: 'It stays on the lessons',
        body: 'Pip is a name, not a character. It does not play one, keep up a '
            + 'friendship, remember anything beyond a student\'s lessons and work, or '
            + 'chat about anything else. On a personal or safety topic it stops and '
            + 'points the student to a trusted adult at school.' },
      { title: 'Adults can read every conversation',
        body: 'The school\'s sponsor and our staff can review what Pip said to any '
            + 'student, at any time.' },
      { title: 'The least data that works',
        body: 'Students join with a code from their school. We do not collect phone '
            + 'numbers, home addresses or personal email addresses.' },
      { title: 'Nothing sold, nothing trained',
        body: 'No ads. Student work is never sold, and never used to train an AI '
            + 'model.' },
      { title: 'Nobody starts without signatures',
        body: 'No student logs in until the district has signed a data privacy '
            + 'agreement and a parent has signed a consent form.' },
    ],

    /**
     * Who runs the in-person side, and why that is the argument rather than a
     * staffing note.
     *
     * Changed 22 October 2026 (David): Cindy does not host every session. She
     * organizes and directs: recruits the speakers and guests, sets dates and
     * times with each school's principal, and means to be at every speaker
     * session and fireside chat herself until the program is too big for one
     * person to reach every site. "Intends" is deliberate; it is a plan, not
     * a guarantee, and the page must not promise more.
     *
     * Cindy Ha is listed in LEADERSHIP with a documented role, so she can be
     * named here. The biography it draws on is already founder-attested on the
     * About page. The key name `whoHosts` is kept so the pages need no change.
     */
    whoHosts:
      'Cindy Ha, the founder, runs the in-person side. She brings in the speakers '
      + 'and guests, sets dates with each school\'s principal, and intends to be at '
      + 'every session herself until the program grows past what one person can '
      + 'reach. She built a business without this material and met the formal '
      + 'version of it years later, which is why the organization exists.',
  },
} as const;

// ─── Student privacy ──────────────────────────────────────────────────────────

/**
 * STUDENT PRIVACY, for the Grades 7 to 12 app. Rendered on /privacy.
 *
 * Added 21 October 2026. This is the public half of what the compliance memo
 * (claude/43-compliance-memo.md) says must exist before any student logs in:
 * COPPA requires the online notice to carry a written data retention policy
 * (16 CFR 312.4(d), 312.10), and Anthropic's guidelines for organizations
 * serving minors ask for COPPA compliance to be stated publicly.
 *
 * READ THIS BEFORE EDITING. `collecting` is false because the app is not
 * built and no student data exists. Every line below is a commitment about
 * what will happen, written in the future tense on purpose. Flip `collecting`
 * only when the first district agreement is signed, and reread every line
 * against the app as built when you do. The district's data agreement binds
 * us; this page must never promise more than it does.
 *
 * Decided by David, 21 October 2026: the AI provider is Anthropic, and
 * student data is deleted 60 days after the school year ends.
 *
 * Decided by David, 26 October 2026: the page names the provider by category,
 * not by company. The amended COPPA rule asks the online notice for "the
 * identities or specific categories" of third parties and the purpose
 * (16 CFR 312.4(d)), so a category satisfies it; the company is named in every
 * district data agreement and to any parent who asks (`onRequest`), which the
 * page says. `provider` below is the record, and is NOT rendered. Counsel to
 * confirm (claude/43, question 1). See claude/58.
 */
export const STUDENT_PRIVACY = {
  collecting: false,

  /** The record. Not rendered on the page; named in district agreements and on request. */
  provider: {
    name: 'Anthropic',
    product: 'Claude',
    /** Commercial Terms, section B, checked 21 October 2026: "Anthropic may
     *  not train models on Customer Content from Services." */
    termsUrl: 'https://www.anthropic.com/legal/commercial-terms',
  },

  /** Rendered under the who-can-see list, so the category stays checkable. */
  onRequest:
    'We name the AI provider in every district data agreement, and to any parent '
    + 'who asks.',

  /** What the app will collect, and why each item is needed. */
  collected: [
    { item: 'First name and last initial',
      why: 'So the student’s school sponsor knows whose work is whose.' },
    { item: 'The class code from the school',
      why: 'So only students the school has signed up can get in.' },
    { item: 'Lesson progress and answers to practice problems',
      why: 'So a student can pick up where they stopped, and the app can mark '
         + 'numeric answers.' },
    { item: 'Work the student submits',
      why: 'Each unit ends in something the student made, and they should be able '
         + 'to keep it.' },
    { item: 'Conversations with Pip, the tutor',
      why: 'So the tutor can answer, and so the school sponsor and our staff can '
         + 'check what it told a student.' },
  ],

  /** What it will not collect. */
  notCollected: [
    'Phone numbers',
    'Home addresses',
    'Personal email addresses',
    'Photos, voice recordings or location',
    'Birthdates',
  ],

  /** Who can see a student's data. */
  whoSees: [
    'The student.',
    'The teacher at the school who sponsors the program.',
    'Our staff, to check that the tutor is teaching what the lessons say.',
    'The AI service that runs Pip, which processes each message only to write the '
    + 'reply. Its terms forbid it from training its models on what we send.',
  ],

  /** The written retention policy COPPA requires in the online notice. */
  retention:
    'We keep a student’s data only for the school year it was collected in. '
    + 'Sixty days after that school year ends, we delete it. We delete it sooner if '
    + 'the school or a parent asks. Before it is deleted, a student can download '
    + 'everything they made, and bring it back the next year.',

  /** What we will never do with it. */
  never: [
    'Show ads to students, in the app or anywhere else.',
    'Sell student information to anyone.',
    'Build a profile of a student for any reason other than their lessons.',
    'Use student work or conversations to train or build an AI system.',
  ],

  /** What a parent can do. COPPA gives these rights to the parent of a child under 13; we extend them to every family. */
  parentRights: [
    'See what we hold about their child.',
    'Have it deleted.',
    'Stop us from collecting any more, which ends the child’s use of the app.',
  ],

  /** Nothing starts until both are signed. */
  beforeStart:
    'No student logs in until two things are signed: a student data privacy '
    + 'agreement between us and the school district, and a consent form from the '
    + 'student’s parent or guardian. We ask every family for consent, not only '
    + 'families of children under 13.',

  laws: [
    'The Children’s Online Privacy Protection Act (COPPA)',
    'The Family Educational Rights and Privacy Act (FERPA)',
    'California’s student online privacy law (Business and Professions Code '
    + 'section 22584), including the limits on artificial intelligence that take '
    + 'effect January 1, 2027',
    'California Education Code section 49073.1, which sets what a district’s '
    + 'contract with us must contain',
  ],
} as const;

// ─── Research base ────────────────────────────────────────────────────────────

/**
 * The published work the pathway design leans on, with what each one does and
 * does not support.
 *
 * RULE: every entry is a real, locatable publication, cited with enough detail
 * that a reader can pull it up and check whether we characterized it correctly.
 * `bearing` must state the limit of the claim. `plain` says the same thing in
 * words a parent with no degree reads once and understands: the finding, what
 * it means for us, and its limit. It restates the two fields below and adds
 * nothing they do not already say. The literature here is about
 * financial and entrepreneurship education in general. None of it evaluates our
 * curriculum, and one of the strongest papers in the list is a critique.
 */
export type Citation = {
  authors: string;
  year: number;
  title: string;
  publication: string;
  url: string;
  /** The finding and its limit, in plain words. Rendered first. */
  plain: string;
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
    plain: 'Children can learn big ideas early if you keep coming back to them, a little '
         + 'deeper each year. That is the shape of our program. It is an idea from 1960, '
         + 'not a test: it says the plan makes sense, not that it works.',
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
    plain: 'Children form money habits between about ages 6 and 12, and learn the formal '
         + 'rules as teenagers. That is why our early grades build habits and the later '
         + 'grades teach the reasoning. It is a research summary, not a test of any '
         + 'program.',
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
    plain: 'People remember more when they learn a little at a time over a long stretch '
         + 'than when they cram, and the longer they need to remember it, the more it '
         + 'should be spread out. That is why this is one lesson a week for ten years. '
         + 'One limit: most of these studies tested word lists in a lab, not business '
         + 'lessons in a classroom.',
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
    plain: 'Researchers checked ten common ways to study. Only two held up well across the '
         + 'board, and spreading practice out over time was one of them. It backs how we '
         + 'teach. It says nothing about what we chose to teach.',
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
    plain: 'Across 168 studies, financial education barely changed how people handled '
         + 'money. What they learned wore off, and even long courses had almost no effect '
         + 'two years later. It worked even less for lower-income families, who are the '
         + 'children we serve. We built the program around this problem, but nobody, '
         + 'including us, has shown that spreading lessons over ten years solves it.',
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
    plain: 'A newer review of 76 experiments, with more than 160,000 people, found that '
         + 'financial education does help people know more and handle money better, with '
         + 'effects at least three times larger than earlier studies found. This review '
         + 'and the one above disagree, and we would rather say so than pick a side.',
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
    plain: 'After Georgia, Idaho and Texas began requiring personal finance in school, young '
         + 'people there later had better credit scores and fell behind on payments less '
         + 'often than young people in other states. It shows school lessons can pay off '
         + 'years later. It cannot tell you which lessons did it.',
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
    plain: 'In Peru, high school students took a short financial education course. Three '
         + 'years later, in lower-income homes, parents were 26 percent less likely to '
         + 'default on a loan; wealthier homes saw almost no change. So children can carry '
         + 'lessons home. But these were older students in another country taking a short '
         + 'course, so it does not prove our program will do the same.',
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
    plain: 'In Sweden, teenagers who ran a small business in high school were followed for '
         + 'up to 16 years. They were more likely to start a company and earned more from '
         + 'it, but their companies were no more likely to last. The study compared '
         + 'similar students rather than running an experiment, and they were teenagers, '
         + 'not nine-year-olds.',
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
    plain: 'People stay motivated when they have a real choice, feel they can do the work, '
         + 'and feel connected to others. Chosen interest lasts; forced interest usually '
         + 'does not. That is why joining is optional. The risk is that the children who '
         + 'sign up are not the ones who needed it most.',
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
