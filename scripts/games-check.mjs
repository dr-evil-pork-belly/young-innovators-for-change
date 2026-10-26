/**
 * Checks the elementary games against their books. The expected values are
 * the ones each book's own verify.py recomputes for the teacher guide
 * (curriculum/grade{4,5,6}-entrepreneurship/src/verify.py), so a game and its
 * page cannot disagree without this failing. A few lines check a game's own
 * behavior on numbers the book leaves to the student (marked "not in the
 * book"); those are the rule under test, not a page. Run: node scripts/games-check.mjs
 */
import * as G5 from '../lib/games/grade5.ts';
import * as G4 from '../lib/games/grade4.ts';
import * as G6 from '../lib/games/grade6.ts';

let checks = 0, failures = 0;
const eq = (a, b, m) => { checks++; if (a !== b) { failures++; console.error('FAIL', m, ': expected', b, 'got', a); } };
const ok = (c, m) => { checks++; if (!c) { failures++; console.error('FAIL', m); } };

// Week 2: two kinds of cost (verify: totals and cost of one, fixed cost included)
for (const [n, total, each] of [[10, 1300, 130], [25, 1900, 76], [50, 2900, 58]]) {
  const r = G5.costAt(n);
  eq(r.total, total, `week 2: total at ${n}`);
  eq(r.each, each, `week 2: cost of one at ${n}`);
  eq(r.variable + r.fixed, r.total, `week 2: parts add up at ${n}`);
}
eq(G5.costAt(40).each, 63, 'week 2: 25.00 / 40 is 0.63 to the nearest (the chart plots it)'); eq(G5.hundredths(45), '0.45', 'hundredths: 0.45'); eq(G5.hundredths(117), '1.17', 'hundredths: above one');
eq(G5.dollars(130), '$1.30', 'dollars: 1.30'); eq(G5.dollars(76), '$0.76', 'dollars: 0.76'); eq(G5.dollars(-200), '-$2.00', 'dollars: negative'); eq(G5.dollars(156000), '$1,560.00', 'dollars: thousands');

// Week 4: margin and share (verify: 7/20, two thirds, one fifth, three quarters; both rankings)
eq(G5.marginOf(400, 260).margin, 140, 'week 4: card margin');
eq(G5.marginOf(400, 260).share, 35, 'week 4: card share 7/20 is 35%');
eq(G5.marginOf(300, 100).share, 67, 'week 4: bracelet share two thirds, to the nearest');
eq(G5.marginOf(500, 400).share, 20, 'week 4: bag share one fifth');
eq(G5.marginOf(200, 50).share, 75, 'week 4: badge share three quarters');
const rk = G5.rankings(G5.ITEMS4);
eq(rk.byDollars.join(', '), 'Bracelet, Badge, Card, Bag', 'week 4: by dollars');
eq(rk.byShare.join(', '), 'Badge, Bracelet, Card, Bag', 'week 4: by share');
ok(rk.byDollars.join() !== rk.byShare.join(), 'week 4: the rankings disagree');

// Week 5: break even (verify: 16; 20, 12, 25; 13.33 so 14; sign challenge 4 sales)
eq(G5.breakEven(2400, 150), 16, 'week 5: 24 / 1.50');
for (const [f, m, want] of [[1800, 90, 20], [3000, 250, 12], [1250, 50, 25]]) eq(G5.breakEven(f, m), want, `week 5: ${f} / ${m}`);
eq(G5.breakEven(2000, 150), 14, 'week 5: 13.33 rounds up to 14');
eq(G5.breakEven(900, 150) - G5.breakEven(300, 150), 4, 'week 5: a $3 sign lowers break even by 4 sales');
eq(G5.profitAfter(2400, 150, 0), -2400, 'week 5: before any sale, the fixed costs are the loss');
eq(G5.profitAfter(2400, 150, 15), -150, 'week 5: one short of break even');
eq(G5.profitAfter(2400, 150, 16), 0, 'week 5: break even exactly');
eq(G5.profitAfter(2400, 150, 17), 150, 'week 5: one past it');
ok([...Array(40).keys()].every((n) => (G5.profitAfter(2400, 150, n) >= 0) === (n >= G5.breakEven(2400, 150))), 'week 5: the engine and the rule agree at every n');

// Week 6: the price ladder (verify: money in, cost and profit at every rung; money in peaks at 3.00, profit at 4.00)
const want6 = { 150: [6900, 5520, 1380], 200: [8000, 4800, 3200], 250: [8750, 4200, 4550], 300: [9000, 3600, 5400], 400: [8800, 2640, 6160], 500: [6000, 1440, 4560], 600: [3000, 600, 2400] };
for (const [p, [inn, cost, profit]] of Object.entries(want6)) {
  const r = G5.ladderRow(Number(p));
  eq(r.moneyIn, inn, `week 6: money in at ${p}`); eq(r.cost, cost, `week 6: cost at ${p}`); eq(r.profit, profit, `week 6: profit at ${p}`);
}
eq(G5.ladderPeaks().moneyIn, 300, 'week 6: money in peaks at $3.00');
eq(G5.ladderPeaks().profit, 400, 'week 6: profit peaks at $4.00');
let threw = false; try { G5.ladderRow(350); } catch { threw = true; } ok(threw, 'week 6: a price not on the ladder is refused');

// Week 9: four products (verify: money in, margin each, total margin; four questions, three answers; 9 bags, 5 extra)
const rows9 = G5.PRODS9.map(G5.prodRow);
eq(rows9.map((r) => r.moneyIn).join(','), '3500,1350,2400,2100', 'week 9: money in');
eq(rows9.map((r) => r.marginEach).join(','), '140,110,220,45', 'week 9: margin each');
eq(rows9.map((r) => r.totalMargin).join(','), '1960,990,880,945', 'week 9: total margin');
const q = G5.fourQuestions(G5.PRODS9);
eq(q.soldMost, 'Keyrings', 'week 9: sold most'); eq(q.mostMoneyIn, 'Cards', 'week 9: most money in'); eq(q.mostTotalMargin, 'Cards', 'week 9: most total margin'); eq(q.mostMarginPerSale, 'Bags', 'week 9: most margin per sale');
eq(new Set(Object.values(q)).size, 3, 'week 9: four questions, three different answers');
eq(G5.bagsToBeatCards(), 9, 'week 9: 9 bags beat the cards'); eq(G5.bagsToBeatCards() - 4, 5, 'week 9: 5 extra');

// Weeks 22 to 24 (verify: 21 / 1.75 = 12; 18 at 3.00 plus 7 at 5.00 = 89.00; 30 x 2.25 minus 18 = 49.50)
eq(G5.breakEven(G5.W22.fixed, G5.W22.margin), 12, 'week 22: break even');
eq(G5.forecastMoneyIn(G5.W23.p1, G5.W23.p2), 8900, 'week 23: the forecast');
eq(G5.forecastProfit(G5.W24.fixed, G5.W24.margin, G5.W24.forecast), 4950, 'week 24: forecast profit');
eq(G5.forecastProfit(G5.W24.fixed, G5.W24.margin, 15), 1575, 'week 24: at half the forecast, still above zero');
eq(G5.smallestSales(G5.W24.fixed, G5.W24.margin), 8, 'week 24: the smallest number of sales above zero');

// Week 33 (verify: 36.00 before, 33.80 after, 2.20 difference)
const c = G5.oneChange();
eq(c.before, 3600, 'week 33: before'); eq(c.newMargin, 130, 'week 33: the new margin'); eq(c.after, 3380, 'week 33: after'); eq(c.difference, 220, 'week 33: difference');

// Week 35 (verify: 27/60 is 0.45; 31/80 about 0.39; session one better)
eq(G5.rate(27, 60), 45, 'week 35: session one rate'); eq(G5.rate(31, 80), 39, 'week 35: session two rate');
ok(G5.rate(27, 60) > G5.rate(31, 80), 'week 35: session one had the better rate');


// ============================================= Grade 4, The Venture Year
// Expected values are the ones curriculum/grade4-entrepreneurship/src/verify.py
// recomputes (warm() and worked() lines for weeks 7, 8, 9, 19 to 22, 32, 33).
eq(G4.money4(8500), '$85', 'money4: whole dollars'); eq(G4.money4(35), '$0.35', 'money4: cents'); eq(G4.money4(-800), '-$8', 'money4: negative'); eq(G4.money4(210), '$2.10', 'money4: dollars and cents');
// week 7
eq(G4.W7_WARM.tookIn - G4.W7_WARM.supplies - G4.W7_WARM.table, 3900, 'g4 week 7 warm-up: 85 - 34 - 12');
const t7 = G4.trace();
eq(t7.revenue, 6000, 'g4 week 7: bracelet revenue 60'); eq(t7.cost, 1800, 'g4 week 7: cost'); eq(t7.stayed, 4200, 'g4 week 7: bracelet profit 42');
eq(G4.W7_ITEMS.filter((i) => i.cost).length, 2, 'g4 week 7: two clear costs'); eq(G4.W7_ITEMS.filter((i) => i.arguable).length, 2, 'g4 week 7: two arguable items, as the page says');
// week 8
eq(G4.day(24, 100, 35, 0).cost, 840, 'g4 week 8 warm-up: 24 cups at 35c cost 8.40');
eq(G4.gap(300, 90), 210, 'g4 week 8: bracelet gap 2.10'); eq(G4.gap(400, 120), 280, 'g4 week 8: dog treats gap 2.80'); eq(G4.W8_ROWS[3].cost + G4.gap(G4.W8_ROWS[3].price, G4.W8_ROWS[3].cost), G4.W8_ROWS[3].price, 'g4 week 8: card cost 0.45 plus the gap is the price 2.00');
eq(G4.keep(10, 500, 90), 4100, 'g4 week 8: 10 at $5 keeps 41.00'); eq(G4.keep(30, 200, 90), 3300, 'g4 week 8: 30 at $2 keeps 33.00');
eq(G4.keep(100, 30, 40), -1000, 'g4 week 8: 100 cookies at $0.30 lose $10');
// week 9
eq(G4.day(18, 200, 0, 1400).revenue, 3600, 'g4 week 9 warm-up: revenue 36'); eq(G4.day(18, 200, 0, 1400).profit, 2200, 'g4 week 9 warm-up: profit 22');
eq(G4.W9_DAYS.map((d) => G4.profit(d.revenue, d.cost)).join(','), '1500,0,-800', 'g4 week 9: Monday 15, Tuesday 0, Wednesday -8');
eq(G4.W9_STANDS.map((d) => G4.profit(d.revenue, d.cost)).join(','), '4200,800', 'g4 week 9: popcorn 42, slushies 8');
eq(G4.perHour(800, 6), 133, 'g4 week 9: $8 over 6 hours is 1.33'); eq(G4.perHour(-800, 6), -133, 'g4 week 9: a loss of $8 over 6 hours is -1.33 (not in the book; the same rounding)'); eq(G4.perHour(1000, 6), 167, 'g4 week 9: $10 over 6 hours is 1.67 to the nearest (not in the book)');
// week 19
eq(G4.itemsPerPack(50, 8), 6, 'g4 week 19: 6 bracelets from a bag'); eq(G4.perItem(400, 50, 1), 8, 'g4 week 19: 8 cents a bead'); eq(G4.perItem(100, 3, 1), 33, 'g4 week 19: $1.00 over 3 is 0.33 to the nearest (not in the book)'); eq(G4.perItem(400, 50, 8), 64, 'g4 week 19: beads in one bracelet 0.64');
eq(G4.withSpoilage(80, 10, 1).total, 800, 'g4 week 19: spoilage total 8.00'); eq(G4.withSpoilage(80, 10, 1).each, 89, 'g4 week 19: cost per sellable 0.89');
// weeks 20 to 22
eq(G4.day(23, 300, 0, 0).revenue, 6900, 'g4 week 20 warm-up: 23 at $3');
eq(G4.gap(350, 120), 230, 'g4 week 21: profit on one 2.30'); eq(G4.scale(350, 120, 12).profit, 2760, 'g4 week 21: on twelve 27.60');
eq(G4.W21_SCALE.map((n) => G4.scale(350, 120, n).profit).join(','), '1150,2300,5750,11500', 'g4 week 21: scale it up');
eq(G4.salesToReach(2000, 230), 9, 'g4 week 21: 9 sales reach $20');
eq(G4.capacity(7, 120).made, 17, 'g4 week 22 warm-up: 17 in 2 hours'); eq(G4.capacity(7, 120).left, 1, 'g4 week 22 warm-up: 1 minute left');
eq(G4.moneyLimit(2000, 64), 31, 'g4 week 22: a $20 fund at 0.64 each makes 31 (the fund is a test value; the page says to ask the teacher)');
// weeks 32, 33
eq(G4.revenueOf(G4.W32_WARM), 8100, 'g4 week 32 warm-up: 17 at $3 and 6 at $5');
eq(G4.W33_WARM.revenue - G4.totalCost(G4.W33_WARM.costs), 3800, 'g4 week 33 warm-up: 84 - 46 = 38');
eq(G4.boxCheck(8400 + 2000 - 4600, 2000, 0), 3800, 'g4 week 33: the box check agrees'); eq(G4.boxCheck(8400 + 2000 - 4600 + 600, 2000, 600), 3800, 'g4 week 33: a cost not paid from the box is taken away too');


// ============================================= Grade 6, The Market Year
// Expected values are the ones curriculum/grade6-entrepreneurship/src/verify.py
// recomputes from srender.WEEKS[n]["data"] (the guide's printed answers for
// weeks 3, 4, 10, 11, 12, 20 to 23, 31 and 35), plus the page claims it checks.
eq(G6.dollars6(360), '$3.60', 'dollars6'); eq(G6.dollars6(-240), '-$2.40', 'dollars6: negative'); eq(G6.tenths(375), '37.5', 'tenths: 37.5'); eq(G6.tenths(350), '35', 'tenths: whole'); eq(G6.tenths(-25), '-2.5', 'tenths: negative'); eq(G6.tenths(-5), '-0.5', 'tenths: small negative');
eq(G6.ratio(18, 12), '3 to 2', 'ratio: 18 to 12'); eq(G6.fraction(12, 40), '3/10', 'fraction: 12/40');
// week 3 (guide: margin $ 1.40, 0.50, 3.00, 0.30, 3.00; margin % 35, 25, 60, 25, 37.5; two rows share a percent)
eq(G6.W3_ROWS.map((r) => G6.marginRow(r.price, r.cost).margin).join(','), '140,50,300,30,300', 'g6 week 3: margin $');
eq(G6.W3_ROWS.map((r) => G6.tenths(G6.marginRow(r.price, r.cost).tenths)).join(','), '35,25,60,25,37.5', 'g6 week 3: margin %');
eq(G6.sharedPercent(G6.W3_ROWS).join(''), 'bd', 'g6 week 3: rows b and d share a percent');
eq(G6.priceForMargin(300, 40), 500, 'g6 week 3 challenge: 40% margin on $3.00 is $5.00, not $4.20');
// week 4 (guide: added 1.00, 1.00, 1.50, 1.50; markup 50, 25, 100, 25; margin 33, 20, 50, 20)
const r4 = G6.W4_ROWS.map((r) => G6.markupRow(r.cost, r.price));
eq(r4.map((r) => r.added).join(','), '100,100,150,150', 'g6 week 4: added'); eq(r4.map((r) => r.markup).join(','), '50,25,100,25', 'g6 week 4: markup %'); eq(r4.map((r) => r.margin).join(','), '33,20,50,20', 'g6 week 4: margin %');
ok(r4.every((r) => r.margin < 100), 'g6 week 4: margin never reaches 100'); ok(r4.every((r) => r.markup > r.margin), 'g6 week 4: markup is the bigger one whenever there is a profit');
eq(G6.priceByMarkup(800, 25), 1000, 'g6 week 4 challenge: 25% markup on $8.00 is $10.00'); eq(G6.priceByMargin(800, 25), 1067, 'g6 week 4 challenge: 25% margin on $8.00 is $10.67');
// week 10 (guide: revenue 42, 50, 36, 70, 0; row e profit -12; challenge profit on row a 13.20)
eq(G6.W10_ROWS.map((r) => G6.revenue(r.p, r.q)).join(','), '4200,5000,3600,7000,0', 'g6 week 10: R = p x q');
eq(G6.profitOf(500, 0, 0, G6.W10.fixed), -1200, 'g6 week 10: row e profit is minus the fixed costs');
eq(G6.profitOf(300, 14, G6.W10.unitCost, G6.W10.fixed), 1320, 'g6 week 10 challenge: profit on row a 13.20');
// week 11 (guide: revenue 24, 36, 39, 36, 30; best revenue $3.00; best profit $4.00; ladder slopes down)
eq(G6.LADDER11.map((r) => G6.ladderRow11(r.price).revenue).join(','), '2400,3600,3900,3600,3000', 'g6 week 11: revenue at each rung');
eq(G6.LADDER11.map((r) => G6.ladderRow11(r.price).profit).join(','), '-1200,900,1950,2250,2100', 'g6 week 11: profit at each rung');
eq(G6.ladderPeaks11().revenue, 300, 'g6 week 11: revenue peaks at $3.00'); eq(G6.ladderPeaks11().profit, 400, 'g6 week 11: profit peaks at $4.00');
ok(G6.LADDER11.every((r, i) => i === 0 || r.sold < G6.LADDER11[i - 1].sold), 'g6 week 11: the ladder slopes down');
{ let t = false; try { G6.ladderRow11(250); } catch { t = true; } ok(t, 'g6 week 11: a price not on the ladder is refused'); }
// week 12 (guide: per cup 2.00, 1.80, 1.50, 1.67; cheapest Cass; Ana margin 1.20 and 60%; revenues 36, 43.20, 36, 45; most money Dev; Cass profit -2.40; Ana to Cass 3 to 4; range 9.00)
const d12 = G6.detective(G6.STALLS);
eq(d12.rows.map((r) => r.perCup).join(','), '200,180,150,167', 'g6 week 12: per cup'); eq(d12.cheapestPerCup, 'Cass', 'g6 week 12: cheapest per cup');
eq(d12.rows[0].marginPack, 120, 'g6 week 12: Ana margin $'); eq(d12.rows[0].marginPct, 60, 'g6 week 12: Ana margin %');
eq(d12.rows.map((r) => r.revenue).join(','), '3600,4320,3600,4500', 'g6 week 12: revenues'); eq(d12.mostMoney, 'Dev', 'g6 week 12: most money');
ok(d12.mostMoney !== d12.mostPacks, 'g6 week 12: the most money is not who sold the most packs');
eq(d12.rows[2].profit, -240, 'g6 week 12: Cass profit -2.40'); eq(d12.losing.join(), 'Cass', 'g6 week 12: one stall is losing money');
eq(G6.ratio(d12.rows[0].cups, d12.rows[2].cups), '3 to 4', 'g6 week 12: Ana to Cass'); eq(d12.range, 900, 'g6 week 12: revenue range');
// week 20 (guide: under 3.60; margins 2.00, 1.60, 3.00; sales for $30: 15, 19, 10; 25% more to stand still; war margins 0.92 and 0.63)
const c20 = G6.threeChoices();
eq(c20.under.price, 360, 'g6 week 20 warm-up: 10% under $4.00'); eq(c20.over.price, 500, 'g6 week 20: 25% over');
eq([c20.match, c20.under, c20.over].map((r) => r.margin).join(','), '200,160,300', 'g6 week 20: margins');
eq([c20.match, c20.under, c20.over].map((r) => r.sales).join(','), '15,19,10', 'g6 week 20: sales for $30'); eq(c20.standStill, 25, 'g6 week 20: 25% more sales to stand still');
const war = G6.priceWar();
eq(war.steps.map((s) => `${s.you}/${s.them}`).join(' '), '360/400 360/324 292/324 292/263', 'g6 week 20 challenge: the four moves');
eq(war.yourMargin, 92, 'g6 week 20 challenge: your margin 0.92'); eq(war.theirMargin, 63, 'g6 week 20 challenge: their margin 0.63');
// week 21 (guide: new price 3.60, 3.20, 3.00, 2.00; new margin 1.60, 1.20, 1.00, 0.00; extra sales 25, 67, 100; one discount leaves no margin)
const r21 = G6.W21.discounts.map((p) => G6.discountRow(p));
eq(r21.map((r) => r.newPrice).join(','), '360,320,300,200', 'g6 week 21: new prices'); eq(r21.map((r) => r.newMargin).join(','), '160,120,100,0', 'g6 week 21: new margins');
eq(r21.slice(0, 3).map((r) => r.extra).join(','), '25,67,100', 'g6 week 21: extra sales'); eq(r21[0].shareOfMargin, 20, 'g6 week 21: 10% off the price is 20% of the margin');
eq(G6.noMargin(G6.W21.discounts).join(), '50', 'g6 week 21: 50% leaves no margin'); eq(r21[3].extra, Infinity, 'g6 week 21: no margin, no number of sales stands still');
// week 22 (guide: each 1.25, 1.67, 0.60, 2.50; margin on the deal 1.50, 2.30, 1.20, 0.80; every bundle cheaper each; only d worse than one sale at 0.90)
const r22 = G6.BUNDLES.map((b) => G6.bundleRow(b));
eq(r22.map((r) => r.each).join(','), '125,167,60,250', 'g6 week 22: each in bundle'); eq(r22.map((r) => r.deal).join(','), '150,230,120,80', 'g6 week 22: margin on the deal');
ok(r22.every((r) => r.cheaperEach), 'g6 week 22: every bundle is cheaper per item'); eq(G6.worseBundles(G6.BUNDLES).join(), 'd', 'g6 week 22: only d makes less than one sale'); eq(r22[3].oneSale, 90, 'g6 week 22: d makes 0.90 on one sale');
// week 23 (guide: warm-up 30; buyers 60; even share 15; aiming at 18)
eq(Math.round(G6.W23.crowd / 4), 30, 'g6 week 23 warm-up: a quarter of 120');
const t23 = G6.shareTarget(G6.W23.crowd, G6.W23.buyRate, G6.W23.teams, G6.W23.aimOfTen);
eq(t23.buyers, 60, 'g6 week 23: buyers'); eq(t23.even, 15, 'g6 week 23: even share'); eq(t23.aiming, 18, 'g6 week 23: aiming at');
// week 31 (guide: 30; percents 30, 22.5, 37.5, 10; even share 25; they add to 100; you are above even)
const s31 = G6.shares(G6.TEAMS31);
eq(s31.total, 40, 'g6 week 31: total'); eq(s31.rows.map((r) => G6.tenths(r.tenths)).join(','), '30,22.5,37.5,10', 'g6 week 31: percents');
eq(s31.rows[0].simplest, '3/10', 'g6 week 31: 12/40 is 3/10'); eq(s31.sumTenths, 1000, 'g6 week 31: the percents add to 100'); eq(G6.evenSharePct(4), 25, 'g6 week 31: even share');
ok(s31.rows[0].tenths > 250, 'g6 week 31: you are above an even share');
// week 35 (guide: down; growth 42 and 45; share 30 then 29; confounded)
const t35 = G6.twoRounds(G6.W35.r1You, G6.W35.r2You, G6.W35.r1Market, G6.W35.r2Market);
eq(t35.yourGrowth, 42, 'g6 week 35: your growth'); eq(t35.marketGrowth, 45, 'g6 week 35: market growth'); eq(t35.share1, 30, 'g6 week 35: share round one'); eq(t35.share2, 29, 'g6 week 35: share round two');
eq(t35.shareWent, 'down', 'g6 week 35 warm-up: share went down'); ok(t35.confounded, 'g6 week 35: sales up, share down');

console.log(`games: ${checks} checks, ${failures} failures`);
if (failures) process.exit(1);
