/**
 * The Numbers Year (Grade 5 entrepreneurship) as games on the venture engine.
 * Every constant here is printed on the week's own page in
 * curriculum/grade5-entrepreneurship/src (n01.py to n04.py), and that book's
 * verify.py recomputes the same answers for the teacher guide. The book works
 * in cents, so the engine runs in cents here: every integer is a number of
 * cents, and the screen divides by 100.
 *
 * Pure module: no React, nothing stored. scripts/games-check.mjs tests it.
 */
import { replay, cumulativeProfit, type Scenario, type State } from '../engine/engine.ts';

/** A cents value as "$1.30". Negative as "-$2.00". */
export const dollars = (cents: number) => {
  const sign = cents < 0 ? '-' : '';
  const n = Math.abs(cents);
  return `${sign}$${Math.floor(n / 100).toLocaleString()}.${String(n % 100).padStart(2, '0')}`;
};

/** A share as a whole percent, to the nearest, as the book's verify.py rounds (7/20 is 35; two thirds is 67). */
export const percent = (part: number, whole: number) => (whole > 0 ? Math.round((part * 100) / whole) : 0);

/** Fixed costs divided by margin, rounded up: the book's rule for break even. */
export const breakEven = (fixed: number, margin: number) => (margin > 0 ? Math.ceil(fixed / margin) : Infinity);

const base: Omit<Scenario, 'id' | 'code' | 'unitCost' | 'referencePrice' | 'fixedCosts' | 'weeks' | 'demandBase'> = {
  startCash: 0, startInventory: 0, demandSwingPct: 0, loanRate: 0, loanLimit: 0, wage: 0,
  lotSize: 1, sellCost: 0, allowNegativeCash: true,
};

// ============================================= Week 2: Two Kinds of Cost

/** A sign costs $9.00 once. Each cup costs $0.40. */
export const W2 = { fixed: 900, variable: 40, sizes: [10, 25, 50] as const };

export const CUPS: Scenario = { ...base, id: 'g5w2-cups', code: 11, unitCost: W2.variable, referencePrice: 100, demandBase: 0, fixedCosts: W2.fixed, weeks: 1 };

/** Make n cups: the total cost and the cost of one with the sign spread over them (rounded to the cent, down). */
export function costAt(n: number): { variable: number; fixed: number; total: number; each: number } {
  // One turn: order n, sell none (demand 0). The engine pays for the cups and the sign.
  const st = replay(CUPS, 1, [{ order: n, demandOverride: 0 }]);
  const total = st.log[0].cashPaid;
  // The cost of one to the nearest cent, as verify.py's money() rounds it (19.00 / 25 is 0.76; 25.00 / 40 is 0.63).
  return { variable: n * W2.variable, fixed: W2.fixed, total, each: n > 0 ? Math.round(total / n) : 0 };
}

// ============================================= Week 4: Margin

export const ITEMS4 = [
  { name: 'Card', price: 400, cost: 260 },
  { name: 'Bracelet', price: 300, cost: 100 },
  { name: 'Bag', price: 500, cost: 400 },
  { name: 'Badge', price: 200, cost: 50 },
] as const;

export function marginOf(price: number, cost: number) {
  const margin = price - cost;
  return { margin, share: percent(margin, price) };
}

/** Rankings by margin in dollars and by share of price, best first. */
export function rankings(items: readonly { name: string; price: number; cost: number }[]) {
  const byDollars = [...items].sort((a, b) => (b.price - b.cost) - (a.price - a.cost)).map((i) => i.name);
  const byShare = [...items].sort((a, b) => (b.price - b.cost) / b.price - (a.price - a.cost) / a.price).map((i) => i.name);
  return { byDollars, byShare };
}

// ============================================= Week 5: Break Even

/** Fixed costs $24.00, margin $1.50 on each sale. */
export const W5 = { fixed: 2400, margin: 150, rows: [{ fixed: 1800, margin: 90 }, { fixed: 3000, margin: 250 }, { fixed: 1250, margin: 50 }] as const, uneven: { fixed: 2000, margin: 150 }, sign: { was: 900, now: 300 } };

/** A stand with these fixed costs that makes `margin` on each sale, after n sales: cumulative profit. */
export function profitAfter(fixed: number, margin: number, n: number): number {
  // Price = margin + cost; cost 0 keeps the arithmetic to the margin alone.
  const sc: Scenario = { ...base, id: 'g5w5-stand', code: 12, unitCost: 0, referencePrice: margin, demandBase: 0, fixedCosts: fixed, weeks: 1 };
  const st = replay(sc, 1, [{ order: n, price: margin, demandOverride: n }]);
  return cumulativeProfit(st);
}

// ============================================= Week 6: The Price Ladder

/** Cost $1.20 an item, no fixed costs, and what the page says would sell at each price. */
export const LADDER = [
  { price: 150, sold: 46 }, { price: 200, sold: 40 }, { price: 250, sold: 35 }, { price: 300, sold: 30 },
  { price: 400, sold: 22 }, { price: 500, sold: 12 }, { price: 600, sold: 5 },
] as const;
export const W6_COST = 120;

export const LADDER_SCENARIO: Scenario = {
  ...base, id: 'g5w6-ladder', code: 13, unitCost: W6_COST, referencePrice: 300, demandBase: 30, fixedCosts: 0, weeks: 7,
  demandByPrice: LADDER.map((r) => ({ price: r.price, units: r.sold })),
};

export function ladderRow(price: number): { price: number; sold: number; moneyIn: number; cost: number; profit: number } {
  const st = replay(LADDER_SCENARIO, 1, [{ order: soldAtPrice(price), price }]);
  const w = st.log[0];
  return { price, sold: w.unitsSold, moneyIn: w.revenue, cost: w.costOfGoodsSold, profit: w.profit };
}

export function soldAtPrice(price: number): number {
  const hit = LADDER.find((r) => r.price === price);
  if (!hit) throw new Error(`the ladder has no rung at ${price}`);
  return hit.sold;
}

export function ladderPeaks() {
  const rows = LADDER.map((r) => ladderRow(r.price));
  const moneyIn = rows.reduce((a, b) => (b.moneyIn > a.moneyIn ? b : a)).price;
  const profit = rows.reduce((a, b) => (b.profit > a.profit ? b : a)).price;
  return { moneyIn, profit };
}

// ============================================= Week 9: Four Products, One Table

export const PRODS9 = [
  { name: 'Cards', sold: 14, price: 250, cost: 110 },
  { name: 'Badges', sold: 9, price: 150, cost: 40 },
  { name: 'Bags', sold: 4, price: 600, cost: 380 },
  { name: 'Keyrings', sold: 21, price: 100, cost: 55 },
] as const;

export type Prod = { name: string; sold: number; price: number; cost: number };

export function prodRow(p: Prod) {
  return { ...p, moneyIn: p.sold * p.price, marginEach: p.price - p.cost, totalMargin: p.sold * (p.price - p.cost) };
}

/** The four questions, and which product answers each. */
export function fourQuestions(prods: readonly Prod[]) {
  const rows = prods.map(prodRow);
  const top = (k: (r: ReturnType<typeof prodRow>) => number) => rows.reduce((a, b) => (k(b) > k(a) ? b : a)).name;
  return {
    soldMost: top((r) => r.sold),
    mostMoneyIn: top((r) => r.moneyIn),
    mostTotalMargin: top((r) => r.totalMargin),
    mostMarginPerSale: top((r) => r.marginEach),
  };
}

/** How many bags would beat the cards' total margin. */
export function bagsToBeatCards(): number {
  const cards = prodRow(PRODS9[0]).totalMargin;
  const each = prodRow(PRODS9[2]).marginEach;
  let n = Math.ceil(cards / each);
  if (n * each <= cards) n += 1;
  return n;
}

// ============================================= Weeks 22 to 24: your own numbers

/** Week 22's warm-up: fixed $21.00, margin $1.75. Week 24's: fixed $18.00, margin $2.25, forecast 30. */
export const W22 = { fixed: 2100, margin: 175 };
export const W24 = { fixed: 1800, margin: 225, forecast: 30 };
/** Week 23's warm-up: 18 at $3.00 and 7 at $5.00. */
export const W23 = { p1: { n: 18, price: 300 }, p2: { n: 7, price: 500 } };

export function forecastMoneyIn(p1: { n: number; price: number }, p2: { n: number; price: number }): number {
  return p1.n * p1.price + p2.n * p2.price;
}

export function forecastProfit(fixed: number, margin: number, sales: number): number {
  return sales * margin - fixed;
}

/** Week 24's challenge: the smallest number of sales that keeps profit at or above zero. */
export function smallestSales(fixed: number, margin: number): number {
  return breakEven(fixed, margin);
}

// ============================================= Week 33: Change One Thing

/** 20 at $4.00 with a $1.80 margin; drop to $3.50 and sell 6 more. */
export const W33 = { sold: 20, price: 400, margin: 180, newPrice: 350, more: 6 };

export function oneChange(c = W33) {
  const before = c.sold * c.margin;
  const newMargin = c.margin - (c.price - c.newPrice);
  const after = (c.sold + c.more) * newMargin;
  return { before, newMargin, after, difference: before - after };
}

// ============================================= Week 35: Did It Work?

/** Session one: 27 sales from 60 people. Session two: 31 from 80. */
export const W35 = { one: { sales: 27, people: 60 }, two: { sales: 31, people: 80 } };

/** Sales per person as a whole number of hundredths (0.45 is 45; 1.17 is 117). */
export function rate(sales: number, people: number): number {
  return people > 0 ? Math.round((sales * 100) / people) : 0;
}
/** Hundredths as the book writes them: 45 is "0.45", 117 is "1.17". */
export const hundredths = (r: number) => `${Math.floor(r / 100)}.${String(r % 100).padStart(2, '0')}`;

export type { State };
