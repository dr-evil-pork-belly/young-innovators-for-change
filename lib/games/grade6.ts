/**
 * The Market Year (Grade 6 entrepreneurship) as games on the venture engine.
 * Every constant here is printed on the week's own page in
 * curriculum/grade6-entrepreneurship/src (s01.py to s04.py), and that book's
 * verify.py recomputes the same answers for the teacher guide from the same
 * data dicts. Money is in cents inside (integers); the screen divides by 100.
 *
 * The rival in this book is arithmetic on what you can see: their price, the
 * counts on the board, your share of a pooled total. No demand response to a
 * rival's price is modeled anywhere, because the book never states one, and a
 * number the book does not print does not go in a game. The engine runs the
 * days of selling (weeks 10, 11 and 12); the share and percent work is plain
 * arithmetic on counts.
 *
 * Pure module: no React, nothing stored. scripts/games-check.mjs tests it.
 */
import { replay, cumulativeProfit, type Scenario } from '../engine/engine.ts';

/** A cents value as "$1.30". Negative as "-$2.40". The book prints two decimals always. */
export const dollars6 = (cents: number) => {
  const sign = cents < 0 ? '-' : '';
  const n = Math.abs(cents);
  return `${sign}$${Math.floor(n / 100).toLocaleString()}.${String(n % 100).padStart(2, '0')}`;
};

/**
 * A percent to the nearest whole, as the book's guide prints most of them. Math.round sends an exact
 * half up where Python's round() sends it to even; no printed row in the book lands on a half, so the
 * book's numbers agree, and only a student's own numbers can differ by one at an exact half.
 */
export const pct = (part: number, whole: number) => (whole > 0 ? Math.round((part * 100) / whole) : 0);
/** A percent in tenths (37.5 is 375), for the rows the book prints to one decimal. */
export const pctTenths = (part: number, whole: number) => (whole > 0 ? Math.round((part * 1000) / whole) : 0);
/** Tenths as the book prints them: 375 is "37.5", 350 is "35", -25 is "-2.5". */
export const tenths = (t: number) => { const s = t < 0 ? '-' : ''; const n = Math.abs(t); return s + (n % 10 === 0 ? String(n / 10) : `${Math.floor(n / 10)}.${n % 10}`); };

export const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
/** "3 to 4", the book's form for a ratio in simplest terms. */
export const ratio = (a: number, b: number) => { const g = gcd(a, b) || 1; return `${a / g} to ${b / g}`; };
/** "3/10", the book's form for a fraction in simplest terms. */
export const fraction = (a: number, b: number) => { const g = gcd(a, b) || 1; return `${a / g}/${b / g}`; };

const base: Omit<Scenario, 'id' | 'code' | 'unitCost' | 'referencePrice' | 'fixedCosts' | 'weeks' | 'demandBase'> = {
  startCash: 0, startInventory: 0, demandSwingPct: 0, loanRate: 0, loanLimit: 0, wage: 0,
  lotSize: 1, sellCost: 0, allowNegativeCash: true,
};

/** One day on the engine: sell `sold` at `price` with `unitCost` each and `fixed` once. Cents. */
export function day(sold: number, price: number, unitCost: number, fixed: number) {
  const sc: Scenario = { ...base, id: 'g6-day', code: 31, unitCost, referencePrice: price, demandBase: sold, fixedCosts: fixed, weeks: 1 };
  const st = replay(sc, 1, [{ order: sold, price, demandOverride: sold }]);
  const w = st.log[0];
  return { revenue: w.revenue, cost: w.costOfGoodsSold + w.fixedCosts, profit: cumulativeProfit(st) };
}

// ============================================= Week 3: Out of a Hundred

/** Price and cost, the five rows of the table. Row a is the worked one. */
export const W3_ROWS = [
  { price: 400, cost: 260 }, { price: 200, cost: 150 }, { price: 500, cost: 200 }, { price: 120, cost: 90 }, { price: 800, cost: 500 },
] as const;
/** The challenge: a 40 percent margin on a cost of $3.00. */
export const W3_CHALLENGE = { cost: 300, marginPct: 40 };

export function marginRow(price: number, cost: number) {
  const margin = price - cost;
  return { margin, tenths: pctTenths(margin, price) };
}
/** The two rows (letters) that share a margin percent. The page says there are exactly two. */
export function sharedPercent(rows: readonly { price: number; cost: number }[]): string[] {
  const t = rows.map((r) => marginRow(r.price, r.cost).tenths);
  return rows.map((_, i) => 'abcde'[i]).filter((_, i) => t.filter((x) => x === t[i]).length > 1);
}
/** The price that gives a margin percent on a cost: cost divided by what is left of the price, to the cent, up. */
export const priceForMargin = (cost: number, marginPct: number) => (marginPct < 100 ? Math.ceil((cost * 100) / (100 - marginPct)) : Infinity);

// ============================================= Week 4: Markup Is Not Margin

export const W4_ROWS = [{ cost: 200, price: 300 }, { cost: 400, price: 500 }, { cost: 150, price: 300 }, { cost: 600, price: 750 }] as const;
/** The challenge: a supplier who "works on 25 percent" buying at $8.00. */
export const W4_CHALLENGE = { cost: 800, workOn: 25 };

export function markupRow(cost: number, price: number) {
  const added = price - cost;
  return { added, markup: pct(added, cost), margin: pct(added, price) };
}
/** Their price if the percent is a markup on cost. */
export const priceByMarkup = (cost: number, p: number) => Math.round((cost * (100 + p)) / 100);
/** Their price if the percent is a margin on price, to the cent, up. */
export const priceByMargin = (cost: number, p: number) => priceForMargin(cost, p);

// ============================================= Week 10: Revenue Is a Formula

export const W10_ROWS = [{ p: 300, q: 14 }, { p: 250, q: 20 }, { p: 400, q: 9 }, { p: 175, q: 40 }, { p: 500, q: 0 }] as const;
export const W10 = { fixed: 1200, unitCost: 120 };

/** R = p x q, on the engine. */
export const revenue = (p: number, q: number) => day(q, p, 0, 0).revenue;
/** Profit = p x q - c x q - f, on the engine. */
export const profitOf = (p: number, q: number, c: number, f: number) => day(q, p, c, f).profit;

// ============================================= Week 11: Change the Price, Change the Line

export const LADDER11 = [{ price: 100, sold: 24 }, { price: 200, sold: 18 }, { price: 300, sold: 13 }, { price: 400, sold: 9 }, { price: 500, sold: 6 }] as const;
export const W11_COST = 150;

export const LADDER11_SCENARIO: Scenario = {
  ...base, id: 'g6w11-ladder', code: 30, unitCost: W11_COST, referencePrice: 300, demandBase: 13, fixedCosts: 0, weeks: 5,
  demandByPrice: LADDER11.map((r) => ({ price: r.price, units: r.sold })),
};

export function soldAt11(price: number): number {
  const hit = LADDER11.find((r) => r.price === price);
  if (!hit) throw new Error(`the ladder has no rung at ${price}`);
  return hit.sold;
}
export function ladderRow11(price: number) {
  const st = replay(LADDER11_SCENARIO, 1, [{ order: soldAt11(price), price }]);
  const w = st.log[0];
  return { price, sold: w.unitsSold, revenue: w.revenue, cost: w.costOfGoodsSold, profit: w.profit };
}
export function ladderPeaks11() {
  const rows = LADDER11.map((r) => ladderRow11(r.price));
  const revenue = rows.reduce((a, b) => (b.revenue > a.revenue ? b : a)).price;
  const profit = rows.reduce((a, b) => (b.profit > a.profit ? b : a)).price;
  return { revenue, profit };
}

// ============================================= Week 12: The Market Detective

export type Stall = { name: string; price: number; pack: number; sold: number; costPerCup: number };
/** All four sell drinks. Price is per pack; cost is per cup. */
export const STALLS = [
  { name: 'Ana', price: 200, pack: 1, sold: 18, costPerCup: 80 },
  { name: 'Ben', price: 360, pack: 2, sold: 12, costPerCup: 80 },
  { name: 'Cass', price: 150, pack: 1, sold: 24, costPerCup: 160 },
  { name: 'Dev', price: 500, pack: 3, sold: 9, costPerCup: 90 },
] as const;

/** Price per cup to the cent. The book prints 5.00 / 3 as 1.67. */
export const perCup = (s: Stall) => Math.round(s.price / s.pack);
/** A stall's day on the engine: a pack is the unit, its cost is the cups in it. */
export function stallRow(s: Stall) {
  const d = day(s.sold, s.price, s.costPerCup * s.pack, 0);
  const marginPack = s.price - s.costPerCup * s.pack;
  return { ...s, perCup: perCup(s), revenue: d.revenue, marginPack, marginPct: pct(marginPack, s.price), profit: d.profit, cups: s.sold * s.pack };
}
export function detective(stalls: readonly Stall[]) {
  const rows = stalls.map(stallRow);
  const by = (k: (r: ReturnType<typeof stallRow>) => number, lowest = false) => rows.reduce((a, b) => ((lowest ? k(b) < k(a) : k(b) > k(a)) ? b : a)).name;
  const revs = rows.map((r) => r.revenue);
  return {
    rows,
    cheapestPerCup: by((r) => r.perCup, true),
    mostMoney: by((r) => r.revenue),
    mostPacks: by((r) => r.sold),
    losing: rows.filter((r) => r.profit < 0).map((r) => r.name),
    range: Math.max(...revs) - Math.min(...revs),
  };
}

// ============================================= Week 20: Pricing Against Somebody Else

export const W20 = { theirPrice: 400, underPct: 10, overPct: 25, cost: 200, target: 3000 };
export const WAR = { start: 400, cost: 200, cutPct: 10, moves: 4 };

/** A percent of a price, to the cent, half up (the book's rounding). */
export const percentOff = (price: number, p: number) => Math.round((price * (100 - p)) / 100);
export const percentOver = (price: number, p: number) => Math.round((price * (100 + p)) / 100);
/** Sales needed for a target profit: target over margin, rounded up. */
export const salesFor = (target: number, margin: number) => (margin > 0 ? Math.ceil(target / margin) : Infinity);
/** Extra sales to stand still after the margin falls from `was` to `now`, as a whole percent. */
export const extraSalesPct = (was: number, now: number) => (now > 0 ? Math.round(((was / now) - 1) * 100) : Infinity);

export function threeChoices(theirPrice = W20.theirPrice, cost = W20.cost, target = W20.target) {
  const prices = { match: theirPrice, under: percentOff(theirPrice, W20.underPct), over: percentOver(theirPrice, W20.overPct) };
  const row = (name: string, price: number) => ({ name, price, margin: price - cost, sales: salesFor(target, price - cost) });
  return {
    match: row('Match', prices.match), under: row(`Under by ${W20.underPct}%`, prices.under), over: row(`Over by ${W20.overPct}%`, prices.over),
    standStill: extraSalesPct(prices.match - cost, prices.under - cost),
  };
}

/** The price war: each move sets a price `cutPct` under the other team's current price. You move first. */
export function priceWar(moves = WAR.moves, start = WAR.start, cost = WAR.cost, cutPct = WAR.cutPct) {
  const steps: { move: number; who: 'you' | 'them'; you: number; them: number }[] = [];
  let you = start, them = start;
  for (let i = 1; i <= moves; i++) {
    if (i % 2 === 1) you = percentOff(them, cutPct); else them = percentOff(you, cutPct);
    steps.push({ move: i, who: i % 2 === 1 ? 'you' : 'them', you, them });
  }
  return { steps, you, them, yourMargin: you - cost, theirMargin: them - cost };
}

// ============================================= Week 21: What a Discount Really Costs

export const W21 = { price: 400, cost: 200, discounts: [10, 20, 25, 50] as const };

export function discountRow(p: number, price = W21.price, cost = W21.cost) {
  const newPrice = percentOff(price, p);
  const newMargin = newPrice - cost;
  const was = price - cost;
  return { pct: p, newPrice, newMargin, givenAway: price - newPrice, shareOfMargin: pct(price - newPrice, was), extra: newMargin > 0 ? extraSalesPct(was, newMargin) : Infinity };
}
/** The one discount in the list that leaves no margin at all. */
export const noMargin = (list: readonly number[], price = W21.price, cost = W21.cost) => list.filter((p) => percentOff(price, p) - cost <= 0);

// ============================================= Week 22: Bundles

/** One for `single`; `n` for `bundle`; each costs `cost`. */
export const BUNDLES = [
  { single: 150, n: 2, bundle: 250, cost: 50 }, { single: 200, n: 3, bundle: 500, cost: 90 },
  { single: 80, n: 4, bundle: 240, cost: 30 }, { single: 300, n: 2, bundle: 500, cost: 210 },
] as const;
export type Bundle = { single: number; n: number; bundle: number; cost: number };

export function bundleRow(b: Bundle) {
  const each = Math.round(b.bundle / b.n);
  const deal = b.bundle - b.cost * b.n;
  const oneSale = b.single - b.cost;
  return { ...b, each, deal, oneSale, separately: oneSale * b.n, cheaperEach: b.bundle / b.n < b.single, worseThanOne: deal < oneSale };
}
/** The letters of the bundles that make less than a single sale. The page says there is one. */
export const worseBundles = (list: readonly Bundle[]) => list.map((b, i) => (bundleRow(b).worseThanOne ? 'abcd'[i] : '')).filter(Boolean);

// ============================================= Week 23: The Share You Are Going For

export const W23 = { crowd: 120, buyRate: 50, teams: 4, aimOfTen: 3 };

export function shareTarget(crowd: number, buyRatePct: number, teams: number, aimOfTen: number) {
  const buyers = Math.round((crowd * buyRatePct) / 100);
  return { buyers, even: teams > 0 ? Math.round(buyers / teams) : 0, aiming: Math.round((buyers * aimOfTen) / 10) };
}

// ============================================= Week 31: Your Share of the Market

export const TEAMS31 = [{ team: 'You', sold: 12 }, { team: 'B', sold: 9 }, { team: 'C', sold: 15 }, { team: 'D', sold: 4 }] as const;
export const W31 = { evenTeams: 4 };

export function shares(teams: readonly { team: string; sold: number }[]) {
  const total = teams.reduce((s, t) => s + t.sold, 0);
  const rows = teams.map((t) => ({ ...t, fraction: total ? `${t.sold}/${total}` : '', simplest: total ? fraction(t.sold, total) : '', tenths: pctTenths(t.sold, total) }));
  return { total, rows, sumTenths: rows.reduce((s, r) => s + r.tenths, 0) };
}
export const evenSharePct = (teams: number) => (teams > 0 ? Math.round(100 / teams) : 0);

// ============================================= Week 35: Did the Move Work?

export const W35 = { r1You: 12, r2You: 17, r1Market: 40, r2Market: 58 };

export function twoRounds(r1You: number, r2You: number, r1Market: number, r2Market: number) {
  const share1 = pct(r1You, r1Market), share2 = pct(r2You, r2Market);
  return {
    yourGrowth: pct(r2You - r1You, r1You), marketGrowth: pct(r2Market - r1Market, r1Market),
    share1, share2, shareWent: share2 < share1 ? 'down' : share2 > share1 ? 'up' : 'nowhere',
    confounded: r2You > r1You && share2 < share1,
  };
}

export const GAME_WEEKS_6 = [3, 4, 10, 11, 12, 20, 21, 22, 23, 31, 35] as const;
