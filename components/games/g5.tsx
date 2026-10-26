'use client';
/**
 * The Numbers Year (Grade 5) games. Every number comes from lib/games/grade5.ts,
 * which takes it from the week's own page. The screens only ask and show.
 */
import { useState } from 'react';
import { Card, INK, BODY, SUBTLE, GROW_INK, SPARK_INK, CONNECT, GROW, LINE } from '@/components/kit';
import * as G from '@/lib/games/grade5';
import { $, Checked, MoneyBox, WholeBox, Table, Big, Note, Button, toCents, toPrice, toWhole } from './bits';

const P: React.CSSProperties = { color: BODY, lineHeight: 1.7, marginBottom: '0.8rem' };
const H: React.CSSProperties = { color: INK, fontWeight: 700, margin: '0 0 0.5rem' };

// ============================================= Week 2

export function W2() {
  const [n, setN] = useState('10');
  const k = toWhole(n) ?? 0;
  const r = G.costAt(k);
  const pts = [1, 2, 5, 10, 15, 20, 25, 30, 40, 50, 75, 100].map((m) => ({ m, each: G.costAt(m).each }));
  return (
    <Card>
      <p style={P}>A sign costs <strong>{$(G.W2.fixed)}</strong> once, whatever happens. Each cup costs <strong>{$(G.W2.variable)}</strong>, every single time. Choose how many to make.</p>
      <p style={P}>Make <WholeBox value={n} onChange={setN} label="How many to make" /> cups{' '}
        {G.W2.sizes.map((s) => <Button key={s} ghost onClick={() => setN(String(s))}>{s}</Button>).reduce<React.ReactNode[]>((a, b, i) => (i ? [...a, ' ', b] : [b]), [])}
      </p>
      {k > 0 && (
        <Table head={['', 'Variable cost', 'Fixed cost', 'Total', 'Cost of one, fixed cost included']}
          rows={[[`${k} cups`, $(r.variable), $(r.fixed), <strong key="t">{$(r.total)}</strong>, <Big key="e">{$(r.each)}</Big>]]} />
      )}
      <svg viewBox="0 0 520 170" width="100%" style={{ maxWidth: 520, display: 'block' }} role="img" aria-label="The cost of one falls as more are made">
        {(() => {
          const L = 50, R = 10, T = 10, B = 28, W = 520, Hh = 170;
          const maxY = Math.max(...pts.map((p) => p.each));
          const x = (m: number) => L + ((m - 1) * (W - L - R)) / 99;
          const y = (v: number) => T + ((maxY - v) * (Hh - T - B)) / maxY;
          return (
            <>
              <line x1={L} x2={W - R} y1={y(G.W2.variable)} y2={y(G.W2.variable)} stroke={LINE} strokeDasharray="4 4" />
              <text x={W - R} y={y(G.W2.variable) - 4} textAnchor="end" fontSize="11" fill={SUBTLE}>never below {$(G.W2.variable)}</text>
              <polyline points={pts.map((p) => `${x(p.m)},${y(p.each)}`).join(' ')} fill="none" stroke={CONNECT} strokeWidth="2.5" />
              {k > 0 && k <= 100 && <circle cx={x(k)} cy={y(r.each)} r="5" fill={GROW} />}
              {[1, 25, 50, 75, 100].map((m) => <text key={m} x={x(m)} y={Hh - 8} textAnchor="middle" fontSize="11" fill={SUBTLE}>{m}</text>)}
              <text x={L - 6} y={y(maxY) + 4} textAnchor="end" fontSize="11" fill={SUBTLE}>{$(maxY)}</text>
            </>
          );
        })()}
      </svg>
      <Note>The line is the cost of one, with the sign spread over however many you make. It never reaches {$(G.W2.variable)}, because the sign never goes away.</Note>
    </Card>
  );
}

// ============================================= Week 4

export function W4() {
  const [price, setPrice] = useState('4.00');
  const [cost, setCost] = useState('2.60');
  const p = toPrice(price), c = toPrice(cost);
  const own = p !== null && c !== null && p > 0 ? G.marginOf(p, c) : null;
  const rk = G.rankings(G.ITEMS4);
  const [ranks, setRanks] = useState<Record<string, string>>({});
  const pick = (k: string, v: string) => setRanks({ ...ranks, [k]: v });
  const rankOk = (kind: 'd' | 's', i: number) => {
    const v = ranks[`${kind}${i}`];
    if (!v) return '';
    return v === (kind === 'd' ? rk.byDollars : rk.byShare)[i] ? 'ok' : 'no';
  };
  return (
    <>
      <Card>
        <p style={H}>Fill the table</p>
        <p style={P}>The card is done for you: price {$(400)}, cost {$(260)}, so the margin is {$(140)}, and {$(140)} out of {$(400)} is 35 out of 100. Do the other three.</p>
        {G.ITEMS4.slice(1).map((it) => {
          const m = G.marginOf(it.price, it.cost);
          return (
            <div key={it.name} style={{ borderTop: `1px solid ${LINE}`, padding: '0.5rem 0' }}>
              <p style={{ ...P, marginBottom: '0.2rem' }}><strong>{it.name}</strong>: price {$(it.price)}, cost {$(it.cost)}</p>
              <Checked label="Margin" want={m.margin} />
              <Checked label="Share of price, out of 100" want={m.share} money={false} />
            </div>
          );
        })}
      </Card>
      <div style={{ height: '1rem' }} />
      <Card>
        <p style={H}>Rank them two ways</p>
        <Table head={['Rank', 'By dollars', 'By share']} right={false}
          rows={[0, 1, 2, 3].map((i) => [i === 0 ? '1 (best)' : String(i + 1),
            <span key="d"><select aria-label={`Rank ${i + 1} by dollars`} value={ranks[`d${i}`] ?? ''} onChange={(e) => pick(`d${i}`, e.target.value)}><option value="">choose</option>{G.ITEMS4.map((it) => <option key={it.name}>{it.name}</option>)}</select> <b style={{ color: rankOk('d', i) === 'ok' ? GROW_INK : SPARK_INK }}>{rankOk('d', i) === 'ok' ? 'Right.' : rankOk('d', i) === 'no' ? 'Not yet.' : ''}</b></span>,
            <span key="s"><select aria-label={`Rank ${i + 1} by share`} value={ranks[`s${i}`] ?? ''} onChange={(e) => pick(`s${i}`, e.target.value)}><option value="">choose</option>{G.ITEMS4.map((it) => <option key={it.name}>{it.name}</option>)}</select> <b style={{ color: rankOk('s', i) === 'ok' ? GROW_INK : SPARK_INK }}>{rankOk('s', i) === 'ok' ? 'Right.' : rankOk('s', i) === 'no' ? 'Not yet.' : ''}</b></span>])} />
        <Note>The two rankings are not the same. The page asks you to say why, and which one you would trust.</Note>
      </Card>
      <div style={{ height: '1rem' }} />
      <Card>
        <p style={H}>Try your own</p>
        <p style={P}>Price <MoneyBox value={price} onChange={setPrice} label="Your price" /> and cost <MoneyBox value={cost} onChange={setCost} label="Your cost" /></p>
        {own && <p style={P}>Margin <Big>{$(own.margin)}</Big>, which is <Big>{own.share}</Big> out of every 100 cents the customer hands you.</p>}
        {own && (
          <div style={{ display: 'flex', height: 22, borderRadius: 4, overflow: 'hidden', border: `1px solid ${LINE}` }} aria-hidden>
            <div style={{ width: `${100 - own.share}%`, background: LINE }} />
            <div style={{ width: `${Math.max(0, own.share)}%`, background: GROW }} />
          </div>
        )}
      </Card>
    </>
  );
}

// ============================================= Week 5

export function W5() {
  const [fixed, setFixed] = useState('24.00');
  const [margin, setMargin] = useState('1.50');
  const [sold, setSold] = useState(0);
  const f = toPrice(fixed) ?? 0, m = toPrice(margin) ?? 0;
  const be = m > 0 ? G.breakEven(f, m) : null;
  const profit = G.profitAfter(f, m, sold);
  return (
    <>
      <Card>
        <p style={P}>Fixed costs <MoneyBox value={fixed} onChange={(v) => { setFixed(v); setSold(0); }} label="Fixed costs" /> are already spent. Each sale brings a margin of <MoneyBox value={margin} onChange={(v) => { setMargin(v); setSold(0); }} label="Margin on one" />.</p>
        <p style={P}>Sales so far: <Big>{sold}</Big>. Where you stand: <Big color={profit < 0 ? SPARK_INK : GROW_INK}>{$(profit)}</Big></p>
        <p><Button onClick={() => setSold(sold + 1)} disabled={m <= 0}>Sell one more</Button> <Button ghost onClick={() => setSold(0)}>Start over</Button></p>
        <svg viewBox="0 0 520 60" width="100%" style={{ maxWidth: 520, display: 'block', marginTop: '0.8rem' }} aria-hidden>
          {be !== null && be !== Infinity && (() => {
            const n = Math.min(60, Math.max(be + 4, sold + 1));
            const w = 500 / n;
            return [...Array(n).keys()].map((i) => (
              <rect key={i} x={10 + i * w} y={14} width={Math.max(1, w - 2)} height={32} rx={2}
                fill={i < sold ? (i < be ? SPARK_INK : GROW) : LINE} opacity={i < sold ? 1 : 0.8} />
            ));
          })()}
        </svg>
        <Note>Each box is one sale, up to sixty. Orange sales are paying back the fixed costs. Green sales are profit.</Note>
        {be !== null && sold >= be && <p style={{ ...P, color: GROW_INK, fontWeight: 700 }}>Break even. Every sale from here is yours.</p>}
      </Card>
      <div style={{ height: '1rem' }} />
      <Card>
        <p style={H}>Work these out</p>
        {G.W5.rows.map((r) => <Checked key={r.fixed} label={`Fixed ${$(r.fixed)}, margin ${$(r.margin)}: break even at`} want={G.breakEven(r.fixed, r.margin)} money={false} />)}
        <Checked label={`Fixed ${$(G.W5.uneven.fixed)}, margin ${$(G.W5.uneven.margin)}: it does not divide evenly, so round up to`} want={G.breakEven(G.W5.uneven.fixed, G.W5.uneven.margin)} money={false} />
        <Checked label={`The sign challenge: a ${$(G.W5.sign.now)} sign instead of ${$(G.W5.sign.was)}, margin ${$(G.W5.margin)}. Break even falls by`} want={G.breakEven(G.W5.sign.was, G.W5.margin) - G.breakEven(G.W5.sign.now, G.W5.margin)} money={false} />
      </Card>
    </>
  );
}

// ============================================= Week 6

export function W6() {
  const [tried, setTried] = useState<number[]>([]);
  const peaks = G.ladderPeaks();
  const allTried = G.LADDER.every((r) => tried.includes(r.price));
  const [a1, setA1] = useState(''); const [a2, setA2] = useState('');
  return (
    <>
      <Card>
        <p style={P}>Cost is <strong>{$(G.W6_COST)}</strong> an item, and there are no fixed costs. Pick a price and see what that rung of the ladder does.</p>
        <p>{G.LADDER.map((r) => <span key={r.price}><Button ghost={tried.includes(r.price)} onClick={() => setTried(tried.includes(r.price) ? tried : [...tried, r.price])}>{$(r.price)}</Button> </span>)}</p>
        {tried.length > 0 && (
          <Table head={['Price', 'You would sell', 'Money in', 'Cost of those', 'Profit']}
            rows={[...tried].sort((a, b) => a - b).map((p) => { const r = G.ladderRow(p); return [$(r.price), r.sold, $(r.moneyIn), $(r.cost), <strong key="p">{$(r.profit)}</strong>]; })} />
        )}
      </Card>
      <div style={{ height: '1rem' }} />
      <Card>
        <p style={H}>Read your own table</p>
        <p style={P}>Which price brings in the most money? <select aria-label="Which price brings in the most money" value={a1} onChange={(e) => setA1(e.target.value)}><option value="">choose</option>{G.LADDER.map((r) => <option key={r.price} value={r.price}>{$(r.price)}</option>)}</select> {a1 && <b style={{ color: Number(a1) === peaks.moneyIn ? GROW_INK : SPARK_INK }}>{Number(a1) === peaks.moneyIn ? 'Right.' : 'Not yet.'}</b>}</p>
        <p style={P}>Which price makes the most profit? <select aria-label="Which price makes the most profit" value={a2} onChange={(e) => setA2(e.target.value)}><option value="">choose</option>{G.LADDER.map((r) => <option key={r.price} value={r.price}>{$(r.price)}</option>)}</select> {a2 && <b style={{ color: Number(a2) === peaks.profit ? GROW_INK : SPARK_INK }}>{Number(a2) === peaks.profit ? 'Right.' : 'Not yet.'}</b>}</p>
        {Number(a1) === peaks.moneyIn && Number(a2) === peaks.profit && <p style={{ ...P, color: GROW_INK, fontWeight: 700 }}>They are not the same row. The page asks you to explain why.</p>}
        {!allTried && <Note>Try every rung before you answer, or you are guessing.</Note>}
      </Card>
    </>
  );
}

// ============================================= Week 9

type Q9 = keyof ReturnType<typeof G.fourQuestions>;

function Question9({ k, text, ans, want, onPick }: { k: Q9; text: string; ans: string; want: string; onPick: (k: Q9, v: string) => void }) {
  return (
    <p style={P}>{text} <select aria-label={text} value={ans} onChange={(e) => onPick(k, e.target.value)}><option value="">choose</option>{G.PRODS9.map((p) => <option key={p.name}>{p.name}</option>)}</select> {ans && <b style={{ color: ans === want ? GROW_INK : SPARK_INK }}>{ans === want ? 'Right.' : 'Not yet.'}</b>}</p>
  );
}

export function W9() {
  const q = G.fourQuestions(G.PRODS9);
  const [ans, setAns] = useState<Record<string, string>>({});
  const pick = (k: Q9, v: string) => setAns({ ...ans, [k]: v });
  return (
    <>
      <Card>
        <p style={H}>Fill the table</p>
        {G.PRODS9.map((p) => { const r = G.prodRow(p); return (
          <div key={p.name} style={{ borderTop: `1px solid ${LINE}`, padding: '0.5rem 0' }}>
            <p style={{ ...P, marginBottom: '0.2rem' }}><strong>{p.name}</strong>: sold {p.sold} at {$(p.price)}, each costing {$(p.cost)}</p>
            <Checked label="Money in" want={r.moneyIn} />
            <Checked label="Margin each" want={r.marginEach} />
            <Checked label="Total margin" want={r.totalMargin} />
          </div>
        ); })}
      </Card>
      <div style={{ height: '1rem' }} />
      <Card>
        <p style={H}>Four questions</p>
        <Question9 k="soldMost" text="Which sold the most?" ans={ans.soldMost ?? ''} want={q.soldMost} onPick={pick} />
        <Question9 k="mostMoneyIn" text="Which brought in the most money?" ans={ans.mostMoneyIn ?? ''} want={q.mostMoneyIn} onPick={pick} />
        <Question9 k="mostTotalMargin" text="Which made the most total margin?" ans={ans.mostTotalMargin ?? ''} want={q.mostTotalMargin} onPick={pick} />
        <Question9 k="mostMarginPerSale" text="Which makes the most margin on one sale?" ans={ans.mostMarginPerSale ?? ''} want={q.mostMarginPerSale} onPick={pick} />
        <Checked label="How many extra bags, beyond the 4 sold, would it take to beat the cards' total margin?" want={G.bagsToBeatCards() - G.PRODS9[2].sold} money={false} />
      </Card>
    </>
  );
}

// ============================================= Week 22

export function W22() {
  const [fixed, setFixed] = useState('');
  const [m1, setM1] = useState('');
  const [m2, setM2] = useState('');
  const f = toPrice(fixed), a = toPrice(m1), b = toPrice(m2);
  const avg = a !== null && b !== null ? (a + b) / 2 : null;   // may be a half cent; it is never rounded before dividing
  return (
    <Card>
      <p style={P}>The warm-up: fixed costs {$(G.W22.fixed)}, margin {$(G.W22.margin)} each. <Checked label="Sales to break even" want={G.breakEven(G.W22.fixed, G.W22.margin)} money={false} /></p>
      <p style={H}>Your own number</p>
      <p style={P}>Total fixed costs (week 20) <MoneyBox value={fixed} onChange={setFixed} label="Total fixed costs" /></p>
      <p style={P}>Margin on product 1 <MoneyBox value={m1} onChange={setM1} label="Margin on product 1" /> and on product 2 <MoneyBox value={m2} onChange={setM2} label="Margin on product 2" /></p>
      {avg !== null && f !== null && (
        <p style={P}>Average margin {$(Math.floor(avg))}{avg % 1 ? '5' : ''}. Break even, in items: <Big>{avg > 0 ? G.breakEven(2 * f, a! + b!) : 'no margin, no break even'}</Big>{avg > 0 && (2 * f) % (a! + b!) !== 0 ? <span style={{ color: SUBTLE }}> (it did not divide evenly, so it is rounded up)</span> : ''}</p>
      )}
      <Note>Fixed costs divided by margin, not by price. Nothing you type here is kept anywhere.</Note>
    </Card>
  );
}

// ============================================= Week 23

export function W23() {
  const [n1, setN1] = useState(''); const [p1, setP1] = useState(''); const [c1, setC1] = useState('');
  const [n2, setN2] = useState(''); const [p2, setP2] = useState(''); const [c2, setC2] = useState('');
  const row = (n: string, p: string, c: string) => {
    const k = toWhole(n), pr = toCents(p), co = toCents(c);
    if (k === null || pr === null) return null;
    return { n: k, moneyIn: k * pr, marginEach: co === null ? null : pr - co, total: co === null ? null : k * (pr - co) };
  };
  const r1 = row(n1, p1, c1), r2 = row(n2, p2, c2);
  return (
    <Card>
      <p style={P}>The warm-up: 18 at {$(300)} and 7 at {$(500)}. <Checked label="Money forecast altogether" want={G.forecastMoneyIn(G.W23.p1, G.W23.p2)} /></p>
      <p style={H}>Your session one forecast</p>
      <Table head={['', 'How many', 'Price', 'Cost of one', 'Money in', 'Margin each', 'Total margin']} right={false}
        rows={[
          ['Product 1', <WholeBox key="n" value={n1} onChange={setN1} label="Product 1 how many" width="4.5rem" />, <MoneyBox key="p" value={p1} onChange={setP1} label="Product 1 price" />, <MoneyBox key="c" value={c1} onChange={setC1} label="Product 1 cost" />, r1 ? $(r1.moneyIn) : '', r1?.marginEach !== null && r1 ? $(r1.marginEach!) : '', r1?.total !== null && r1 ? $(r1.total!) : ''],
          ['Product 2', <WholeBox key="n" value={n2} onChange={setN2} label="Product 2 how many" width="4.5rem" />, <MoneyBox key="p" value={p2} onChange={setP2} label="Product 2 price" />, <MoneyBox key="c" value={c2} onChange={setC2} label="Product 2 cost" />, r2 ? $(r2.moneyIn) : '', r2?.marginEach !== null && r2 ? $(r2.marginEach!) : '', r2?.total !== null && r2 ? $(r2.total!) : ''],
          ['TOTAL', r1 && r2 ? r1.n + r2.n : '', '', '', r1 && r2 ? <strong key="m">{$(r1.moneyIn + r2.moneyIn)}</strong> : '', '', r1?.total != null && r2?.total != null ? <strong key="t">{$(r1.total + r2.total)}</strong> : ''],
        ]} />
      <Note>Write it in pen on page 11 of your Numbers File. The screen keeps nothing; the file is the record.</Note>
    </Card>
  );
}

// ============================================= Week 24

export function W24() {
  const [fixed, setFixed] = useState(''); const [margin, setMargin] = useState(''); const [sales, setSales] = useState('');
  const f = toCents(fixed), m = toCents(margin), s = toWhole(sales);
  const okAll = f !== null && m !== null && s !== null;
  return (
    <Card>
      <p style={P}>The warm-up: fixed {$(G.W24.fixed)}, margin {$(G.W24.margin)}, forecast {G.W24.forecast} sales. <Checked label="Profit the forecast gives" want={G.forecastProfit(G.W24.fixed, G.W24.margin, G.W24.forecast)} /></p>
      <p style={H}>Your plan</p>
      <p style={P}>Total fixed costs <MoneyBox value={fixed} onChange={setFixed} label="Fixed costs" />, margin on one <MoneyBox value={margin} onChange={setMargin} label="Margin" />, forecast <WholeBox value={sales} onChange={setSales} label="Forecast sales" /> sales</p>
      {okAll && (
        <>
          <p style={P}>Forecast profit if it comes true: <Big color={G.forecastProfit(f, m, s) < 0 ? SPARK_INK : GROW_INK}>{$(G.forecastProfit(f, m, s))}</Big></p>
          <p style={P}>If you sell only half, {Math.floor(s / 2)}: <Big color={G.forecastProfit(f, m, Math.floor(s / 2)) < 0 ? SPARK_INK : GROW_INK}>{$(G.forecastProfit(f, m, Math.floor(s / 2)))}</Big></p>
          {m > 0 && <p style={P}>The smallest number of sales that keeps you at or above zero: <Big>{G.smallestSales(f, m)}</Big>. That is the number that really matters.</p>}
        </>
      )}
    </Card>
  );
}

// ============================================= Week 33

export function W33() {
  const [sold, setSold] = useState('20'); const [price, setPrice] = useState('4.00'); const [margin, setMargin] = useState('1.80'); const [np, setNp] = useState('3.50'); const [more, setMore] = useState('6');
  const s = toWhole(sold), p = toCents(price), m = toCents(margin), n = toCents(np), e = toWhole(more);
  const r = s !== null && p !== null && m !== null && n !== null && e !== null ? G.oneChange({ sold: s, price: p, margin: m, newPrice: n, more: e }) : null;
  return (
    <Card>
      <p style={P}>You sell <WholeBox value={sold} onChange={setSold} label="Sold now" width="4rem" /> at <MoneyBox value={price} onChange={setPrice} label="Price now" /> with a margin of <MoneyBox value={margin} onChange={setMargin} label="Margin now" /> each.</p>
      <p style={P}>Drop the price to <MoneyBox value={np} onChange={setNp} label="New price" /> and sell <WholeBox value={more} onChange={setMore} label="More sales" width="4rem" /> more.</p>
      {r && (
        <>
          <Table head={['', 'Sales', 'Margin each', 'Total margin']} rows={[['Before', s!, $(m!), <strong key="b">{$(r.before)}</strong>], ['After', s! + e!, $(r.newMargin), <strong key="a">{$(r.after)}</strong>]]} />
          <p style={P}>{r.after > r.before ? <>More: by <Big color={GROW_INK}>{$(r.after - r.before)}</Big>.</> : r.after < r.before ? <>Less: by <Big color={SPARK_INK}>{$(r.difference)}</Big>. The extra sales did not make up for the smaller margin on every sale.</> : <>Exactly the same.</>}</p>
        </>
      )}
      <Note>Change one thing, write what you expect, then find out. Only one.</Note>
    </Card>
  );
}

// ============================================= Week 35

export function W35() {
  const [s1, setS1] = useState('27'); const [p1, setP1] = useState('60'); const [s2, setS2] = useState('31'); const [p2, setP2] = useState('80');
  const a = toWhole(s1), b = toWhole(p1), c = toWhole(s2), d = toWhole(p2);
  const ok = a !== null && b !== null && c !== null && d !== null && b > 0 && d > 0;
  const r1 = ok ? G.rate(a!, b!) : null, r2 = ok ? G.rate(c!, d!) : null;
  const fmt = G.hundredths;
  return (
    <Card>
      <Table head={['', 'Sales', 'People who came past', 'Sales per person']} right={false}
        rows={[
          ['Session 1', <WholeBox key="s" value={s1} onChange={setS1} label="Session 1 sales" width="4.5rem" />, <WholeBox key="p" value={p1} onChange={setP1} label="Session 1 people" width="4.5rem" />, r1 !== null ? <Big key="r">{fmt(r1)}</Big> : ''],
          ['Session 2', <WholeBox key="s" value={s2} onChange={setS2} label="Session 2 sales" width="4.5rem" />, <WholeBox key="p" value={p2} onChange={setP2} label="Session 2 people" width="4.5rem" />, r2 !== null ? <Big key="r">{fmt(r2)}</Big> : ''],
        ]} />
      {r1 !== null && r2 !== null && (
        <p style={P}>{c! > a! && r2 < r1 ? <>Session 2 sold more, and session 1 had the better rate. More people came, so more sales is not the same performance.</> : r1 > r2 ? <>Session 1 had the better rate.</> : r2 > r1 ? <>Session 2 had the better rate.</> : <>The same rate. The change did nothing you can see here.</>}</p>
      )}
      <Note>Compare sales per person, not sales. One session is not proof either way.</Note>
    </Card>
  );
}

export const GRADE5: Record<number, () => React.JSX.Element> = { 2: W2, 4: W4, 5: W5, 6: W6, 9: W9, 22: W22, 23: W23, 24: W24, 33: W33, 35: W35 };
