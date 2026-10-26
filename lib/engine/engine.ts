/**
 * The venture engine: one deterministic business simulation that every game
 * from Grade 3 to Grade 12 runs on.
 *
 * Rules that hold everywhere (see the spec, "Venture Engine and Grade 7
 * Unit 1 Game Spec"):
 *   - The engine computes; Pip narrates. Nothing here talks to an AI, and no
 *     number a student sees may come from anywhere but this file's output.
 *   - Every field is an integer. Money is whole dollars. Any rule that would
 *     produce a fraction rounds against the company.
 *   - Given the same scenario, seed and decisions, the result is identical
 *     every time. The log is the game; a save code is the log, compressed.
 *   - Unless the scenario allows negative cash, cash never goes below zero:
 *     an order the company cannot pay for is refused (a shortfall event) and
 *     the student decides again, and a bill the company cannot pay at the end
 *     of the turn rolls to the next turn as a late payable while the turn
 *     still closes. Dani's unit allows negative cash because the minus sign
 *     is what it teaches.
 *
 * Grade bands differ only in which decisions they expose. A Grade 4 game and
 * a Grade 7 game with the same choices produce the same numbers.
 *
 * This file has no imports on purpose: it runs unchanged in the browser
 * (Grades 3 to 8, nothing stored) and on a server (Grades 9 to 12), and the
 * test script loads it straight into Node.
 */

// ---------------------------------------------------------------- scenario

/** The fixed rules of one game. Every number a unit's story depends on. */
export type Scenario = {
  /** Short id, also encoded in the save code. */
  id: string;
  /** Registry number for the save code (1 to 31). Never reuse one. */
  code: number;
  startCash: number;
  /** Units on the shelf at the start (Dani's January starts with 25 blanks). */
  startInventory: number;
  unitCost: number;
  /** The price the demand table is written against. */
  referencePrice: number;
  /** Customers who want one unit a week at the reference price. */
  demandBase: number;
  /** Largest weekly swing in demand, in percent of the adjusted demand. 0 = none. */
  demandSwingPct: number;
  fixedCosts: number;
  /** Annual interest rate on the loan, whole percent. */
  loanRate: number;
  /** Most the bank will lend in total. 0 = no bank in this scenario. */
  loanLimit: number;
  /** Weekly pay per employee. */
  wage: number;
  /** Length of the game in turns (weeks or months; the engine does not care what a turn is called). */
  weeks: number;
  /** Stock comes in lots of this many units (Dani's boxes of 100). 1 = any quantity. */
  lotSize: number;
  /** A cost per unit paid in cash when the unit is sold (Dani's ink). Part of cost of goods sold. */
  sellCost: number;
  /**
   * Demand per turn when the story fixes it (Dani's market: 30, 25, 30, 40).
   * When present it replaces the price table and the swing. The decision's
   * demandOverride still wins over it.
   */
  demandSchedule?: readonly number[];
  /**
   * Demand at each price when the story measured it (Marcus's price tests:
   * $8 sold 40, $10 sold 30, ...). When present, a turn at a listed price
   * sells that many; an unlisted price is refused. Wins over demandSchedule.
   */
  demandByPrice?: readonly { price: number; units: number }[];
  /**
   * When true the account may go below zero: no shortfall refusal, bills are
   * always paid, cash can be negative. Dani's unit teaches the minus sign, so
   * it needs this on. Grades 3 to 6 games keep it off.
   */
  allowNegativeCash: boolean;
};

/** Grade 7 Unit 1: cash against profit. The numbers in the spec. */
export const G7_UNIT1: Scenario = {
  id: 'g7u1',
  code: 1,
  startCash: 200,
  startInventory: 0,
  unitCost: 4,
  referencePrice: 10,
  demandBase: 30,
  demandSwingPct: 0,
  fixedCosts: 20,
  loanRate: 0,
  loanLimit: 0,
  wage: 0,
  weeks: 36,
  lotSize: 1,
  sellCost: 0,
  allowNegativeCash: false,
};

/**
 * Grade 7 Unit 1 as the app teaches it: Dani's tote bag stand, September to
 * December. Every constant is in data/unit01.json (case.facts and
 * case.market_sales). A turn is a month. The account is allowed below zero
 * because October ending at -155 is the lesson.
 */
export const G7_DANI: Scenario = {
  id: 'g7u1-dani',
  code: 2,
  startCash: 150,
  startInventory: 0,
  unitCost: 4,
  referencePrice: 15,
  demandBase: 30,
  demandSwingPct: 0,
  fixedCosts: 60,
  loanRate: 0,
  loanLimit: 200,
  wage: 0,
  weeks: 4,
  lotSize: 100,
  sellCost: 2,
  demandSchedule: [30, 25, 30, 40],
  allowNegativeCash: true,
};

/** Unit 3, Lesson 4: Marcus's phone stands (unit03 case.marcus). Each costs $5, the website $35 a month, and the price tests say what sells. */
export const MARCUS: Scenario = {
  id: 'g7u3-marcus',
  code: 3,
  startCash: 0,
  startInventory: 0,
  unitCost: 5,
  referencePrice: 12,
  demandBase: 20,
  demandSwingPct: 0,
  fixedCosts: 35,
  loanRate: 0,
  loanLimit: 0,
  wage: 0,
  weeks: 5,
  lotSize: 1,
  sellCost: 0,
  demandByPrice: [
    { price: 8, units: 40 }, { price: 10, units: 30 }, { price: 12, units: 20 }, { price: 15, units: 13 }, { price: 18, units: 9 },
  ],
  allowNegativeCash: true,
};

/** Unit 8: Dani's next six months (unit08 case). She starts where December left her. */
export const DANI_2027: Scenario = {
  ...G7_DANI,
  id: 'g7u8-dani',
  code: 4,
  startCash: 1385,
  startInventory: 25,
  weeks: 6,
  demandSchedule: [0, 30, 25, 30, 35, 45],
};

/** Every scenario a save code can name. Never reuse a code. */
export const SCENARIOS: readonly Scenario[] = [G7_UNIT1, G7_DANI, MARCUS, DANI_2027];

export function scenarioByCode(code: number): Scenario | undefined {
  return SCENARIOS.find((s) => s.code === code);
}

// ------------------------------------------------------------------ state

export type Due = { week: number; amount: number };

export type Decision = {
  /** Units to order this week. */
  order: number;
  /** Price per unit this week. */
  price: number;
  /** Pay the supplier now (false) or one turn later (true). */
  payLater: boolean;
  /**
   * Units sold on credit this turn to one customer (the club's 50), on top of
   * market demand, at this turn's price. Filled before market customers
   * because it is a promise. 0 = none.
   */
  creditUnits: number;
  /** Turns until the credit customer pays. Must be at least 1 when creditUnits > 0. */
  creditWeeks: number;
  /** Dollars the credit customer pays up front (Fix A: half of 750). The rest is a receivable. */
  creditUpfront: number;
  /** Borrow this much from the bank at the start of the week. */
  borrow: number;
  /** Repay this much of the loan at the end of the week. */
  repay: number;
  /** Employees on payroll this week. */
  employees: number;
  /** Cash the owner takes out of the business this turn (Dani's $1,000 toward a laptop). Not an expense; it reduces equity. */
  draw: number;
  /** A one-time buy of a tool this turn (Dani's $700 heat press). Cash out now; an asset, not an expense. */
  tool: number;
  /** Spent on getting found this turn (a fair table, flyers). An expense. */
  marketingCost: number;
  /** Customers that spending brought, on top of demand. */
  marketingDemand: number;
  /**
   * A story event that fixes this week's demand (the fair wants 60). -1 means
   * none. Set by the unit's script, not typed by the student, but it is part
   * of the decision because the student chose to accept the event.
   */
  demandOverride: number;
};

export const DEFAULT_DECISION: Decision = {
  order: 0,
  price: 0,
  payLater: false,
  creditUnits: 0,
  creditWeeks: 0,
  creditUpfront: 0,
  borrow: 0,
  repay: 0,
  employees: 0,
  draw: 0,
  tool: 0,
  marketingCost: 0,
  marketingDemand: 0,
  demandOverride: -1,
};

export type WeekResult = {
  week: number;
  decision: Decision;
  /** The random draw this week, in percent (-swing to +swing). 0 when swing is 0. */
  draw: number;
  demand: number;
  /** Units the credit customer took. */
  creditUnitsSold: number;
  /** Units market customers took. */
  marketUnitsSold: number;
  unitsSold: number;
  revenue: number;
  costOfGoodsSold: number;
  fixedCosts: number;
  wages: number;
  interest: number;
  marketingCost: number;
  profit: number;
  /** Cash out that is not an expense: the owner's draw and a tool bought. */
  ownerDraw: number;
  tool: number;
  cashCollected: number;
  cashPaid: number;
  cashStart: number;
  cashEnd: number;
  /** Bills the company could not pay this week, rolled to next week. */
  late: number;
};

export type State = {
  scenario: Scenario;
  seed: number;
  week: number;
  cash: number;
  inventory: number;
  receivables: Due[];
  payables: Due[];
  loanBalance: number;
  /** What the business paid for the tools it owns. */
  tools: number;
  /** Everything the owner has taken out. */
  draws: number;
  log: WeekResult[];
};

export type Shortfall = {
  kind: 'shortfall';
  week: number;
  /** Cash left after this week's bills that are due before the stand opens. */
  freeCash: number;
  /** The most units freeCash buys at unit cost. */
  maxUnits: number;
  /** What the refused order would have cost. */
  orderCost: number;
};

export type TurnOutcome =
  | { ok: true; state: State; result: WeekResult }
  | { ok: false; state: State; event: Shortfall };

// ---------------------------------------------------------------- helpers

/** Total of a due list. */
export function total(dues: readonly Due[]): number {
  return dues.reduce((s, d) => s + d.amount, 0);
}

/** Integer division rounded against the company: costs round up, income rounds down. */
export function ceilDiv(a: number, b: number): number {
  return Math.floor((a + b - 1) / b);
}

function int(n: number, name: string): number {
  if (!Number.isInteger(n)) throw new Error(`${name} must be an integer, got ${n}`);
  return n;
}

function nonNeg(n: number, name: string): number {
  int(n, name);
  if (n < 0) throw new Error(`${name} must not be negative, got ${n}`);
  return n;
}

/**
 * Demand at a price, as a percent of demandBase. A fixed table, not a
 * formula: students do not need to know it, the tests recompute it.
 * Boundaries are inclusive on the lower price (a price exactly at 80% of
 * reference gets 125%).
 */
export function demandPct(price: number, referencePrice: number): number {
  // Compare price * 100 against referencePrice * threshold to stay in integers.
  const p = price * 100;
  const r = referencePrice;
  if (p <= r * 50) return 150;
  if (p <= r * 80) return 125;
  if (p <= r * 100) return 100;
  if (p <= r * 120) return 80;
  if (p <= r * 150) return 60;
  if (p <= r * 200) return 40;
  return 20;
}

/**
 * A small deterministic generator (mulberry32). Given the seed and the week,
 * returns the same draw every time, so a replay never depends on how many
 * times the student re-decided a week.
 */
export function drawFor(seed: number, week: number, swingPct: number): number {
  if (swingPct <= 0) return 0;
  let t = (seed + week * 0x9e3779b9) >>> 0;
  t = (t + 0x6d2b79f5) >>> 0;
  let r = Math.imul(t ^ (t >>> 15), 1 | t);
  r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
  const u = ((r ^ (r >>> 14)) >>> 0) / 4294967296; // [0, 1)
  return Math.floor(u * (2 * swingPct + 1)) - swingPct; // -swing .. +swing
}

/** Demand this turn before any story override. Rounded down (against the company). */
export function baseDemand(s: Scenario, price: number, draw: number, week = 1): number {
  if (s.demandByPrice) {
    const hit = s.demandByPrice.find((d) => d.price === price);
    if (!hit) throw new Error(`no demand is known at a price of ${price}; the tests covered ${s.demandByPrice.map((d) => d.price).join(', ')}`);
    return hit.units;
  }
  if (s.demandSchedule) {
    const d = s.demandSchedule[week - 1];
    if (d === undefined) throw new Error(`the demand schedule has no entry for turn ${week}`);
    return d;
  }
  const adjusted = Math.floor((s.demandBase * demandPct(price, s.referencePrice)) / 100);
  const swung = Math.floor((adjusted * (100 + draw)) / 100);
  return Math.max(0, swung);
}

/** Weekly interest on the loan, rounded up. */
export function weeklyInterest(balance: number, annualRatePct: number): number {
  if (balance <= 0 || annualRatePct <= 0) return 0;
  return ceilDiv(balance * annualRatePct, 100 * 52);
}

// ----------------------------------------------------------------- engine

export function newGame(scenario: Scenario, seed: number): State {
  nonNeg(seed, 'seed');
  return {
    scenario,
    seed,
    week: 1,
    cash: scenario.startCash,
    inventory: scenario.startInventory,
    receivables: [],
    payables: [],
    loanBalance: 0,
    tools: 0,
    draws: 0,
    log: [],
  };
}

/** Bills that must be paid before the stand opens this week. */
export function dueBeforeOpening(state: State): number {
  const s = state.scenario;
  return s.fixedCosts
    + total(state.payables.filter((d) => d.week === state.week))
    + weeklyInterest(state.loanBalance, s.loanRate);
}

/** Cash the student can spend on this week's order after the bills above. Can be negative. */
export function freeCash(state: State, borrow = 0): number {
  return state.cash + borrow - dueBeforeOpening(state);
}

/** Most units the student can order and pay for now. */
export function maxUnits(state: State, borrow = 0): number {
  const s = state.scenario;
  const units = Math.max(0, Math.floor(freeCash(state, borrow) / s.unitCost));
  return units - (units % s.lotSize);
}

/**
 * Play one turn. Pure: returns a new state, never changes the one passed in.
 *
 * Order of operations, the same at every grade:
 *   1. Borrow.  2. Order (refused as a shortfall if cash cannot cover it,
 *   unless the scenario allows negative cash).  3. Sell: the credit customer
 *   first, then market customers; ink and the like are paid per unit sold.
 *   4. Collect receivables due.  5. Pay interest, fixed costs, wages,
 *   payables due, then repayment.  6. Close: write the turn to the log.
 */
export function playWeek(state: State, partial: Partial<Decision>): TurnOutcome {
  const s = state.scenario;
  const d: Decision = { ...DEFAULT_DECISION, price: s.referencePrice, ...partial };
  nonNeg(d.order, 'order');
  nonNeg(d.price, 'price');
  nonNeg(d.creditUnits, 'creditUnits');
  nonNeg(d.creditWeeks, 'creditWeeks');
  nonNeg(d.creditUpfront, 'creditUpfront');
  nonNeg(d.borrow, 'borrow');
  nonNeg(d.repay, 'repay');
  nonNeg(d.employees, 'employees');
  nonNeg(d.draw, 'draw');
  nonNeg(d.tool, 'tool');
  nonNeg(d.marketingCost, 'marketingCost');
  nonNeg(d.marketingDemand, 'marketingDemand');
  int(d.demandOverride, 'demandOverride');
  if (state.week > s.weeks) throw new Error(`the game is over after turn ${s.weeks}`);
  if (d.order % s.lotSize !== 0) throw new Error(`orders come in lots of ${s.lotSize}, got ${d.order}`);
  if (d.creditUnits > 0 && d.creditWeeks < 1) throw new Error('a credit sale needs creditWeeks of at least 1');
  if (d.borrow > 0 && state.loanBalance + d.borrow > s.loanLimit) {
    throw new Error(`the bank lends at most ${s.loanLimit} in total`);
  }

  const week = state.week;
  const cashStart = state.cash;
  let cash = cashStart + d.borrow;
  let collected = 0;
  let paid = 0;

  // 2. Order. Paying now needs the cash for the order and for every bill due
  // before the stand opens; sales come after the stand opens, so they cannot
  // fund the order. Paying later moves the bill to next turn's payables.
  // A scenario that allows negative cash skips the refusal: the overdraft
  // is the lesson there.
  const orderCost = d.order * s.unitCost;
  const reserved = dueBeforeOpening(state);
  if (!s.allowNegativeCash && !d.payLater && d.order > 0 && cash - reserved < orderCost) {
    const free = cash - reserved;
    const units = Math.max(0, Math.floor(free / s.unitCost));
    return {
      ok: false,
      state,
      event: {
        kind: 'shortfall',
        week,
        freeCash: free,
        maxUnits: units - (units % s.lotSize),
        orderCost,
      },
    };
  }
  let payables = state.payables.slice();
  if (d.order > 0) {
    if (d.payLater) payables = [...payables, { week: week + 1, amount: orderCost }];
    else { cash -= orderCost; paid += orderCost; }
  }
  const inventory = state.inventory + d.order;

  // 3. Sell. The credit customer is a promise, so it is filled first.
  const draw = drawFor(state.seed, week, s.demandSwingPct);
  const demand = (d.demandOverride >= 0 ? d.demandOverride : baseDemand(s, d.price, draw, week)) + d.marketingDemand;
  const creditUnitsSold = Math.min(inventory, d.creditUnits);
  const marketUnitsSold = Math.min(inventory - creditUnitsSold, demand);
  const unitsSold = creditUnitsSold + marketUnitsSold;
  const revenue = unitsSold * d.price;
  const costOfGoodsSold = unitsSold * (s.unitCost + s.sellCost);
  let receivables = state.receivables.slice();
  const marketRevenue = marketUnitsSold * d.price;
  cash += marketRevenue;
  collected += marketRevenue;
  const creditRevenue = creditUnitsSold * d.price;
  if (creditRevenue > 0) {
    const upfront = Math.min(d.creditUpfront, creditRevenue);
    cash += upfront;
    collected += upfront;
    if (creditRevenue - upfront > 0) {
      receivables = [...receivables, { week: week + d.creditWeeks, amount: creditRevenue - upfront }];
    }
  }
  const sellCosts = unitsSold * s.sellCost;
  cash -= sellCosts;
  paid += sellCosts;

  // 4. Collect receivables due this turn.
  const dueNow = total(receivables.filter((r) => r.week === week));
  receivables = receivables.filter((r) => r.week !== week);
  cash += dueNow;
  collected += dueNow;

  // 5. Pay. Interest, fixed costs, wages, then payables due. When the
  // scenario keeps cash at or above zero, anything the cash does not cover
  // rolls to next turn as a late payable. When it allows negative cash, every
  // bill is paid and the account shows the minus sign.
  const interest = weeklyInterest(state.loanBalance, s.loanRate);
  const wages = d.employees * s.wage;
  const payablesDue = total(payables.filter((p) => p.week === week));
  payables = payables.filter((p) => p.week !== week);
  const bills = interest + s.fixedCosts + wages + payablesDue + d.marketingCost;
  const payNow = s.allowNegativeCash ? bills : Math.min(Math.max(cash, 0), bills);
  const late = bills - payNow;
  cash -= payNow;
  paid += payNow;
  if (late > 0) payables = [...payables, { week: week + 1, amount: late }];

  const repay = Math.min(d.repay, state.loanBalance, s.allowNegativeCash ? d.repay : Math.max(cash, 0));
  cash -= repay;
  paid += repay;
  const loanBalance = state.loanBalance + d.borrow - repay;

  // The owner's draw and a tool bought leave cash but are not expenses.
  // Where cash may not go below zero, each is capped at the cash on hand.
  const tool = s.allowNegativeCash ? d.tool : Math.min(d.tool, Math.max(cash, 0));
  cash -= tool;
  paid += tool;
  const drawOut = s.allowNegativeCash ? d.draw : Math.min(d.draw, Math.max(cash, 0));
  cash -= drawOut;
  paid += drawOut;

  // 6. Close.
  const profit = revenue - costOfGoodsSold - s.fixedCosts - wages - interest - d.marketingCost;
  const result: WeekResult = {
    week,
    decision: d,
    draw,
    demand,
    creditUnitsSold,
    marketUnitsSold,
    unitsSold,
    revenue,
    costOfGoodsSold,
    fixedCosts: s.fixedCosts,
    wages,
    interest,
    marketingCost: d.marketingCost,
    profit,
    ownerDraw: drawOut,
    tool,
    cashCollected: collected + d.borrow,
    cashPaid: paid,
    cashStart,
    cashEnd: cash,
    late,
  };
  const next: State = {
    scenario: s,
    seed: state.seed,
    week: week + 1,
    cash,
    inventory: inventory - unitsSold,
    receivables,
    payables,
    loanBalance,
    tools: state.tools + tool,
    draws: state.draws + drawOut,
    log: [...state.log, result],
  };
  return { ok: true, state: next, result };
}

/** Profit so far, from the log. */
export function cumulativeProfit(state: State): number {
  return state.log.reduce((s, w) => s + w.profit, 0);
}

/** A balance sheet at this moment. Inventory and tools at what was paid for them. */
export type BalanceSheet = {
  cash: number; receivables: number; inventory: number; tools: number; totalAssets: number;
  payables: number; loan: number; totalLiabilities: number;
  equity: number;
  /** Equity the other way: what the owner put in, plus every profit, minus every draw. Always equals equity. */
  equityCheck: number;
};

export function balanceSheet(state: State): BalanceSheet {
  const receivables = total(state.receivables);
  const inventory = state.inventory * state.scenario.unitCost;
  const payables = total(state.payables);
  const totalAssets = state.cash + receivables + inventory + state.tools;
  const totalLiabilities = payables + state.loanBalance;
  return {
    cash: state.cash, receivables, inventory, tools: state.tools, totalAssets,
    payables, loan: state.loanBalance, totalLiabilities,
    equity: totalAssets - totalLiabilities,
    equityCheck: state.scenario.startCash + state.scenario.startInventory * state.scenario.unitCost + cumulativeProfit(state) - state.draws,
  };
}

/**
 * Replay a list of decisions from week 1. Every decision must be accepted;
 * a shortfall in a replay means the list is not a valid game log.
 */
export function replay(scenario: Scenario, seed: number, decisions: readonly Partial<Decision>[]): State {
  let state = newGame(scenario, seed);
  for (const d of decisions) {
    const out = playWeek(state, d);
    if (!out.ok) throw new Error(`replay: week ${out.event.week} was a shortfall; the log is not valid`);
    state = out.state;
  }
  return state;
}

// -------------------------------------------------------------- save code

/*
 * A save code is the game: scenario, seed and every decision, so the engine
 * can rebuild the company anywhere. Nothing personal is in it.
 *
 * Layout, as unsigned varints: version, scenario code, seed, week count, then
 * per turn a flags varint and only the fields the flags say are present:
 *   bit 0  order differs from last turn      -> order
 *   bit 1  price differs from last turn      -> price
 *   bit 2  payLater
 *   bit 3  creditUnits > 0                   -> creditUnits, creditWeeks
 *   bit 4  borrow > 0                        -> borrow
 *   bit 5  repay > 0                         -> repay
 *   bit 6  employees > 0                     -> employees
 *   bit 7  demandOverride >= 0               -> demandOverride
 *   bit 8  creditUpfront > 0                 -> creditUpfront
 *   bit 9  draw > 0                          -> draw
 *   bit 10 tool > 0                          -> tool
 *   bit 11 marketingCost > 0                 -> marketingCost
 *   bit 12 marketingDemand > 0               -> marketingDemand
 * A turn that repeats last turn's order and price costs one byte, so a
 * steady 36-week game is about 70 characters and a busy one about 110. The
 * bytes are written in Crockford base32 (no I, L, O, U) in groups of four,
 * with a two-character checksum over the characters on the end. Any single
 * wrong character fails the checksum.
 */

const ALPHABET = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
const SAVE_VERSION = 2;   // 2: the checksum changed (see checksum below); version 1 codes no longer check out
/** "Last week's" order and price before week 1. */
const FIRST_ORDER = 0;

function varint(n: number, out: number[]) {
  nonNeg(n, 'varint');
  while (n >= 0x80) { out.push((n & 0x7f) | 0x80); n = Math.floor(n / 0x80); }
  out.push(n);
}

function readVarint(bytes: number[], pos: { i: number }): number {
  let n = 0, mul = 1;
  for (;;) {
    if (pos.i >= bytes.length) throw new Error('save code ended early');
    const b = bytes[pos.i++];
    n += (b & 0x7f) * mul;
    if (b < 0x80) return n;
    mul *= 0x80;
  }
}

function toBase32(bytes: number[]): string {
  let bits = 0, acc = 0, out = '';
  for (const b of bytes) {
    acc = (acc << 8) | b; bits += 8;
    while (bits >= 5) { out += ALPHABET[(acc >>> (bits - 5)) & 31]; bits -= 5; }
  }
  if (bits > 0) out += ALPHABET[(acc << (5 - bits)) & 31];
  return out;
}

function fromBase32(text: string): number[] {
  let bits = 0, acc = 0;
  const out: number[] = [];
  for (const ch of text) {
    const v = ALPHABET.indexOf(ch);
    if (v < 0) throw new Error(`save code has a bad character: ${ch}`);
    acc = ((acc << 5) | v) & 0xffff; bits += 5;
    if (bits >= 8) { out.push((acc >>> (bits - 8)) & 0xff); bits -= 8; }
  }
  return out;
}

/**
 * Two base32 characters computed over the body's characters (not its bytes,
 * so a change hidden in base32 padding bits is still caught). Each character
 * of the checksum is its own running sum modulo 32, kept apart rather than
 * folded together. The first sum catches every single-character change: a
 * character's value moves by 1 to 31, which is never 0 modulo 32. The second
 * sum catches every swap of two neighboring characters that differ. (An
 * earlier version folded both sums into ten bits, and that fold let one
 * substitution in about a thousand through; the engine test now tries every
 * wrong value at every position.)
 */
function checksum(body: string): string {
  let a = 1, b = 0;
  for (const ch of body) { a = (a + ALPHABET.indexOf(ch)) % 32; b = (b + a) % 32; }
  return ALPHABET[a] + ALPHABET[b];
}

/** Normalize what a student typed: upper case, no spaces or dashes, O->0, I and L->1. */
export function cleanSaveCode(text: string): string {
  return text.toUpperCase().replace(/[\s-]/g, '').replace(/O/g, '0').replace(/[IL]/g, '1');
}

export function encodeSave(state: State): string {
  const bytes: number[] = [];
  varint(SAVE_VERSION, bytes);
  varint(state.scenario.code, bytes);
  varint(state.seed, bytes);
  varint(state.log.length, bytes);
  let lastOrder = FIRST_ORDER, lastPrice = state.scenario.referencePrice;
  for (const w of state.log) {
    const d = w.decision;
    const flags = (d.order !== lastOrder ? 1 : 0) | (d.price !== lastPrice ? 2 : 0) | (d.payLater ? 4 : 0)
      | (d.creditUnits > 0 ? 8 : 0) | (d.borrow > 0 ? 16 : 0) | (d.repay > 0 ? 32 : 0)
      | (d.employees > 0 ? 64 : 0) | (d.demandOverride >= 0 ? 128 : 0) | (d.creditUpfront > 0 ? 256 : 0)
      | (d.draw > 0 ? 512 : 0) | (d.tool > 0 ? 1024 : 0) | (d.marketingCost > 0 ? 2048 : 0) | (d.marketingDemand > 0 ? 4096 : 0);
    varint(flags, bytes);
    if (flags & 1) varint(d.order, bytes);
    if (flags & 2) varint(d.price, bytes);
    if (flags & 8) { varint(d.creditUnits, bytes); varint(d.creditWeeks, bytes); }
    if (flags & 16) varint(d.borrow, bytes);
    if (flags & 32) varint(d.repay, bytes);
    if (flags & 64) varint(d.employees, bytes);
    if (flags & 128) varint(d.demandOverride, bytes);
    if (flags & 256) varint(d.creditUpfront, bytes);
    if (flags & 512) varint(d.draw, bytes);
    if (flags & 1024) varint(d.tool, bytes);
    if (flags & 2048) varint(d.marketingCost, bytes);
    if (flags & 4096) varint(d.marketingDemand, bytes);
    lastOrder = d.order; lastPrice = d.price;
  }
  const body = toBase32(bytes);
  return (body + checksum(body)).replace(/(.{4})(?=.)/g, '$1-');
}

export function decodeSave(text: string): State {
  const clean = cleanSaveCode(text);
  if (clean.length < 3) throw new Error('save code is too short');
  const body = clean.slice(0, -2);
  if (checksum(body) !== clean.slice(-2)) throw new Error('save code does not check out; one character may be wrong');
  // Drop the partial byte base32 leaves when the bit count is not a multiple of 8.
  const bytes = trimPadding(fromBase32(body), body.length);
  const pos = { i: 0 };
  const version = readVarint(bytes, pos);
  if (version !== SAVE_VERSION) throw new Error(`save code version ${version} is not supported`);
  const scenario = scenarioByCode(readVarint(bytes, pos));
  if (!scenario) throw new Error('save code names a scenario this app does not have');
  const seed = readVarint(bytes, pos);
  const n = readVarint(bytes, pos);
  const decisions: Decision[] = [];
  let lastOrder = FIRST_ORDER, lastPrice = scenario.referencePrice;
  for (let k = 0; k < n; k++) {
    const flags = readVarint(bytes, pos);
    const credit = flags & 8;
    const d: Decision = {
      order: flags & 1 ? readVarint(bytes, pos) : lastOrder,
      price: flags & 2 ? readVarint(bytes, pos) : lastPrice,
      payLater: (flags & 4) !== 0,
      creditUnits: credit ? readVarint(bytes, pos) : 0,
      creditWeeks: credit ? readVarint(bytes, pos) : 0,
      borrow: flags & 16 ? readVarint(bytes, pos) : 0,
      repay: flags & 32 ? readVarint(bytes, pos) : 0,
      employees: flags & 64 ? readVarint(bytes, pos) : 0,
      demandOverride: flags & 128 ? readVarint(bytes, pos) : -1,
      creditUpfront: flags & 256 ? readVarint(bytes, pos) : 0,
      draw: flags & 512 ? readVarint(bytes, pos) : 0,
      tool: flags & 1024 ? readVarint(bytes, pos) : 0,
      marketingCost: flags & 2048 ? readVarint(bytes, pos) : 0,
      marketingDemand: flags & 4096 ? readVarint(bytes, pos) : 0,
    };
    decisions.push(d);
    lastOrder = d.order; lastPrice = d.price;
  }
  if (pos.i !== bytes.length) throw new Error('save code has extra data on the end');
  return replay(scenario, seed, decisions);
}

/** base32 of n bytes is ceil(8n/5) chars; chars tell us n exactly. */
function trimPadding(bytes: number[], chars: number): number[] {
  const n = Math.floor((chars * 5) / 8);
  return bytes.slice(0, n);
}
