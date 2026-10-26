/**
 * The Venture Year (Grade 4 entrepreneurship) as games on the venture engine.
 * Every constant here is printed on the week's own page in
 * curriculum/grade4-entrepreneurship/src (e01.py to e04.py), and that book's
 * verify.py recomputes the same answers for the teacher guide. Money is in
 * cents inside (integers); the screen shows whole dollars when there are no
 * cents, as the book does.
 *
 * Pure module: no React, nothing stored. scripts/games-check.mjs tests it.
 */
import { replay, cumulativeProfit, type Scenario } from '../engine/engine.ts';

/** Cents as the book prints them: "$42", "$0.35", "-$8". */
export const money4 = (cents: number) => {
  const sign = cents < 0 ? '-' : '';
  const n = Math.abs(cents);
  const d = Math.floor(n / 100), c = n % 100;
  return `${sign}$${d.toLocaleString()}${c ? '.' + String(c).padStart(2, '0') : ''}`;
};

const base: Omit<Scenario, 'id' | 'code' | 'unitCost' | 'referencePrice' | 'fixedCosts' | 'weeks' | 'demandBase'> = {
  startCash: 0, startInventory: 0, demandSwingPct: 0, loanRate: 0, loanLimit: 0, wage: 0,
  lotSize: 1, sellCost: 0, allowNegativeCash: true,
};

/** One market day on the engine: sell `sold` at `price` with `unitCost` each and `fixed` once. Returns revenue, cost and profit in cents. */
export function day(sold: number, price: number, unitCost: number, fixed: number) {
  const sc: Scenario = { ...base, id: 'g4-day', code: 21, unitCost, referencePrice: price, demandBase: sold, fixedCosts: fixed, weeks: 1 };
  const st = replay(sc, 1, [{ order: sold, price, demandOverride: sold }]);
  const w = st.log[0];
  return { revenue: w.revenue, cost: w.costOfGoodsSold + w.fixedCosts, profit: cumulativeProfit(st) };
}

// ============================================= Week 7: Where the Money Goes

/** 20 bracelets at $3; string and beads $18 in total. */
export const W7 = { sold: 20, price: 300, materials: 1800 };
export const W7_WARM = { tookIn: 8500, supplies: 3400, table: 1200 };

export function trace(sold = W7.sold, price = W7.price, materials = W7.materials) {
  const d = day(sold, price, 0, materials);
  return { revenue: d.revenue, cost: d.cost, stayed: d.profit };
}

/** Which of these is a cost? The book's five items and the answer the guide gives. Two are arguable and the page says so. */
export const W7_ITEMS = [
  { item: 'String and beads', cost: true, arguable: false },
  { item: 'The money customers paid', cost: false, arguable: false },
  { item: 'A cardboard sign', cost: true, arguable: false },
  { item: 'Borrowing a table from home', cost: false, arguable: true },
  { item: 'Scissors they already owned', cost: false, arguable: true },
] as const;

// ============================================= Week 8: Cost and Price

export const W8_ROWS = [
  { name: 'Lemonade', cost: 35, price: 100 },
  { name: 'Bracelet', cost: 90, price: 300 },
  { name: 'Dog treat bag', cost: 120, price: 400 },
  { name: 'Card', cost: 45, price: 200 },
] as const;
export const COOKIE_COST = 40;
/** The challenge: 10 at $5 or 30 at $2, each costing $0.90. */
export const W8_CHALLENGE = { cost: 90, a: { sold: 10, price: 500 }, b: { sold: 30, price: 200 } };

export const gap = (price: number, cost: number) => price - cost;

/** The gap you keep across a whole day at that price, on the engine. */
export function keep(sold: number, price: number, cost: number) {
  return day(sold, price, cost, 0).profit;
}

// ============================================= Week 9: Profit, What Is Left

export const W9_DAYS = [
  { day: 'Monday', revenue: 4000, cost: 2500 },
  { day: 'Tuesday', revenue: 3100, cost: 3100 },
  { day: 'Wednesday', revenue: 2200, cost: 3000 },
] as const;
export const W9_STANDS = [{ stand: 'Popcorn', revenue: 6000, cost: 1800 }, { stand: 'Slushies', revenue: 6000, cost: 5200 }] as const;
export const W9_WARM = { cards: 18, price: 200, cost: 1400 };
export const profit = (revenue: number, cost: number) => revenue - cost;
/** $8 over 6 hours, to the nearest cent, as the book's verify.py rounds it (round(8 / 6, 2) is 1.33). A loss rounds the same way: -$8 over 6 hours is -$1.33. */
export const perHour = (profitCents: number, hours: number) => Math.round(profitCents / hours);

// ============================================= Week 19: What It Costs to Make One

/** A $4.00 bag holds 50 beads; a bracelet uses 8. */
export const W19 = { packPrice: 400, packSize: 50, usedPer: 8 };

/** Cost of one item's share of a pack, to the nearest cent, as the book's verify.py rounds it (round(4.00 / 50 * 8, 2) is 0.64). */
export function perItem(packPrice: number, packSize: number, usedPer: number): number {
  return Math.round((packPrice * usedPer) / packSize);
}
export const itemsPerPack = (packSize: number, usedPer: number) => Math.floor(packSize / usedPer);
/** Spoilage: make 10 at $0.80, one is ruined, the nine that sell carry all ten. To the nearest cent, as verify.py has it (8.00 / 9 is 0.89). */
export function withSpoilage(costEach: number, made: number, ruined: number) {
  const total = costEach * made;
  return { total, each: made > ruined ? Math.round(total / (made - ruined)) : 0 };
}

// ============================================= Week 20: Choosing Your Price

export const W20_WARM = { sold: 23, price: 300 };

// ============================================= Week 21: Profit on One Sale

export const W21_WARM = { price: 350, cost: 120 };
export const W21_SCALE = [5, 10, 25, 50] as const;

export function scale(price: number, cost: number, n: number) {
  const d = day(n, price, cost, 0);
  return { n, moneyIn: d.revenue, moneyOut: d.cost, profit: d.profit };
}
/** Sales it takes to reach a goal, rounded up. */
export const salesToReach = (goal: number, profitOnOne: number) => (profitOnOne > 0 ? Math.ceil(goal / profitOnOne) : Infinity);

// ============================================= Week 22: How Many Can You Make?

export const W22_WARM = { minutesEach: 7, hours: 2 };
export function capacity(minutesEach: number, minutes: number) {
  return { made: Math.floor(minutes / minutesEach), left: minutes % minutesEach };
}
export const moneyLimit = (fund: number, costEach: number) => (costEach > 0 ? Math.floor(fund / costEach) : 0);

// ============================================= Week 32: Count It Up

export const W32_WARM = [{ sold: 17, price: 300 }, { sold: 6, price: 500 }] as const;
export const revenueOf = (rows: readonly { sold: number; price: number }[]) => rows.reduce((s, r) => s + r.sold * r.price, 0);

// ============================================= Week 33: Did You Make a Profit?

export const W33_WARM = { revenue: 8400, costs: [3100, 600, 900] };
export const totalCost = (costs: readonly number[]) => costs.reduce((s, c) => s + c, 0);
/** The other way: the money box less the startup fund (and any cost not paid from the box). */
export const boxCheck = (box: number, fund: number, notFromBox: number) => box - fund - notFromBox;
