'use client';
/**
 * The Market Year (Grade 6) games. Every number comes from lib/games/grade6.ts,
 * which takes it from the week's own page. The screens only ask and show.
 */
import { useState } from 'react';
import { Card, INK, BODY, SUBTLE, GROW_INK, SPARK_INK, CONNECT, GROW, LINE, ALERT } from '@/components/kit';
import * as G from '@/lib/games/grade6';
import { Checked, MoneyBox, WholeBox, Table, Big, Note, Button, toPrice, toWhole } from './bits';

const $ = G.dollars6;
const P: React.CSSProperties = { color: BODY, lineHeight: 1.7, marginBottom: '0.8rem' };
const H: React.CSSProperties = { color: INK, fontWeight: 700, margin: '0 0 0.5rem' };
const Gap = () => <div style={{ height: '1rem' }} />;
const Verdict = ({ ok }: { ok: boolean }) => <b style={{ color: ok ? GROW_INK : SPARK_INK }}>{ok ? 'Right.' : 'Not yet.'}</b>;

/** "37.5" or "35" typed as a percent, as tenths. */
function toTenths(text: string): number | null {
  const t = text.replace(/[%\s]/g, '');
  if (!/^\d+(\.\d)?$/.test(t)) return null;
  const [w, d = '0'] = t.split('.');
  return Number(w) * 10 + Number(d);
}

/** A percent box that accepts one decimal place, checked against tenths. */
function CheckedPct({ label, want }: { label: string; want: number }) {
  const [v, setV] = useState('');
  const n = toTenths(v);
  return (
    <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', padding: '0.35rem 0' }}>
      <span style={{ color: BODY }}>{label}</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <WholeBox value={v} onChange={setV} label={label} inputMode="decimal" /> %
        <span style={{ width: '4.5rem', fontWeight: 700, color: n !== null && n === want ? GROW_INK : ALERT }}>{n === null ? '' : n === want ? 'Right.' : 'Not yet.'}</span>
      </span>
    </label>
  );
}

/** A choice from a list, checked. */
function Pick({ text, options, want }: { text: string; options: readonly string[]; want: string }) {
  const [v, setV] = useState('');
  return (
    <p style={P}>{text} <select aria-label={text} value={v} onChange={(e) => setV(e.target.value)}><option value="">choose</option>{options.map((o) => <option key={o}>{o}</option>)}</select> {v && <Verdict ok={v === want} />}</p>
  );
}

/** A ratio "a to b", checked in simplest terms. */
function CheckedRatio({ label, want }: { label: string; want: string }) {
  const [a, setA] = useState(''); const [b, setB] = useState('');
  const x = toWhole(a), y = toWhole(b);
  const got = x !== null && y !== null && x > 0 && y > 0 ? G.ratio(x, y) : null;
  return (
    <p style={P}>{label}: <WholeBox value={a} onChange={setA} label={`${label}, first`} width="4rem" /> to <WholeBox value={b} onChange={setB} label={`${label}, second`} width="4rem" /> {got && <Verdict ok={got === want && `${x} to ${y}` === want} />}</p>
  );
}

/** A bar: the margin's share of the whole. */
function ShareBar({ part, whole, label }: { part: number; whole: number; label: string }) {
  const p = whole > 0 ? Math.max(0, Math.min(100, (part * 100) / whole)) : 0;
  return (
    <div style={{ margin: '0.5rem 0' }}>
      <div style={{ display: 'flex', height: 22, borderRadius: 4, overflow: 'hidden', border: `1px solid ${LINE}` }} aria-hidden>
        <div style={{ width: `${p}%`, background: GROW }} /><div style={{ width: `${100 - p}%`, background: LINE }} />
      </div>
      <Note>{label}</Note>
    </div>
  );
}

// ============================================= Week 3

export function W3() {
  const [price, setPrice] = useState('4.00'); const [cost, setCost] = useState('2.60');
  const p = toPrice(price), c = toPrice(cost);
  const own = p !== null && c !== null && p > 0 ? G.marginRow(p, c) : null;
  const [s1, setS1] = useState(''); const [s2, setS2] = useState('');
  const shared = G.sharedPercent(G.W3_ROWS);
  const pairOk = s1 && s2 && s1 !== s2 && shared.includes(s1) && shared.includes(s2);
  return (
    <>
      <Card>
        <p style={H}>Margin in dollars, then as a percent</p>
        <p style={P}>Row a is done on the page: price {$(400)}, cost {$(260)}, margin {$(140)}, and {$(140)} out of {$(400)} is 35 percent. Do the other four.</p>
        {G.W3_ROWS.slice(1).map((r, i) => { const m = G.marginRow(r.price, r.cost); return (
          <div key={i} style={{ borderTop: `1px solid ${LINE}`, padding: '0.5rem 0' }}>
            <p style={{ ...P, marginBottom: '0.2rem' }}><strong>Row {'bcde'[i]}</strong>: price {$(r.price)}, cost {$(r.cost)}</p>
            <Checked label="Margin $" want={m.margin} />
            <CheckedPct label="Margin %" want={m.tenths} />
          </div>
        ); })}
        <p style={P}>Two rows have the same margin percent. Which two? <select aria-label="First row that shares a percent" value={s1} onChange={(e) => setS1(e.target.value)}><option value="">row</option>{['a', 'b', 'c', 'd', 'e'].map((l) => <option key={l}>{l}</option>)}</select> and <select aria-label="Second row that shares a percent" value={s2} onChange={(e) => setS2(e.target.value)}><option value="">row</option>{['a', 'b', 'c', 'd', 'e'].map((l) => <option key={l}>{l}</option>)}</select> {s1 && s2 && <Verdict ok={!!pairOk} />}</p>
      </Card>
      <Gap />
      <Card>
        <p style={H}>Your own</p>
        <p style={P}>Price <MoneyBox value={price} onChange={setPrice} label="Price" /> and cost <MoneyBox value={cost} onChange={setCost} label="Cost" /></p>
        {own && (<>
          <p style={P}>Margin <Big>{$(own.margin)}</Big>, which is <Big>{G.tenths(own.tenths)}%</Big> of the price.</p>
          <ShareBar part={own.margin} whole={p!} label="The green part is the margin's share of the price. Out of a hundred." />
        </>)}
        <p style={H}>The challenge</p>
        <Checked label={`You need a ${G.W3_CHALLENGE.marginPct} percent margin and your cost is ${$(G.W3_CHALLENGE.cost)}. The price`} want={G.priceForMargin(G.W3_CHALLENGE.cost, G.W3_CHALLENGE.marginPct)} />
        <Note>It is not {$(420)}. The page says working out why is the point.</Note>
      </Card>
    </>
  );
}

// ============================================= Week 4

export function W4() {
  const [cost, setCost] = useState('2.00'); const [price, setPrice] = useState('3.00');
  const c = toPrice(cost), p = toPrice(price);
  const own = c !== null && p !== null && c > 0 && p > 0 ? G.markupRow(c, p) : null;
  return (
    <>
      <Card>
        <p style={H}>Fill both columns</p>
        <p style={P}>Row a is done: cost {$(200)}, price {$(300)}, you added {$(100)}. Against the cost that is 50 percent markup. Against the price it is 33 percent margin. Same dollar.</p>
        {G.W4_ROWS.slice(1).map((r, i) => { const m = G.markupRow(r.cost, r.price); return (
          <div key={i} style={{ borderTop: `1px solid ${LINE}`, padding: '0.5rem 0' }}>
            <p style={{ ...P, marginBottom: '0.2rem' }}><strong>Row {'bcd'[i]}</strong>: cost {$(r.cost)}, price {$(r.price)}</p>
            <Checked label="Added $" want={m.added} />
            <Checked label="Markup %, of the cost" want={m.markup} money={false} />
            <Checked label="Margin %, of the price" want={m.margin} money={false} />
          </div>
        ); })}
      </Card>
      <Gap />
      <Card>
        <p style={H}>Percent of what?</p>
        <p style={P}>Cost <MoneyBox value={cost} onChange={setCost} label="Cost" /> and price <MoneyBox value={price} onChange={setPrice} label="Price" /></p>
        {own && (<>
          <p style={P}>You added <Big>{$(own.added)}</Big>. Measured against the cost: <Big>{own.markup}%</Big> markup. Against the price: <Big>{own.margin}%</Big> margin.</p>
          <ShareBar part={own.added} whole={c!} label={`The same dollar against the cost of ${$(c!)}.`} />
          <ShareBar part={own.added} whole={p!} label={`The same dollar against the price of ${$(p!)}.`} />
          {own.added > 0 && <Note>Whenever there is a profit, markup is the bigger number, because the cost is the smaller thing to measure against. Margin can never reach 100 percent. Markup can go past it.</Note>}
        </>)}
        <p style={H}>The challenge</p>
        <p style={P}>A supplier says they work on {G.W4_CHALLENGE.workOn} percent and buy at {$(G.W4_CHALLENGE.cost)}. Both answers:</p>
        <Checked label="If they mean markup, they charge" want={G.priceByMarkup(G.W4_CHALLENGE.cost, G.W4_CHALLENGE.workOn)} />
        <Checked label="If they mean margin, they charge" want={G.priceByMargin(G.W4_CHALLENGE.cost, G.W4_CHALLENGE.workOn)} />
      </Card>
    </>
  );
}

// ============================================= Week 10

export function W10() {
  const [price, setPrice] = useState('3.00'); const [q, setQ] = useState('14');
  const p = toPrice(price), n = toWhole(q);
  const pts = p !== null ? [...Array(21).keys()].map((k) => ({ q: k, r: G.revenue(p, k) })) : [];
  return (
    <>
      <Card>
        <p style={H}>Put the numbers in</p>
        <p style={P}>R = p x q. Row a: p is {$(300)}, q is 14, so R is {$(4200)}.</p>
        {G.W10_ROWS.slice(1).map((r, i) => <Checked key={i} label={`Row ${'bcde'[i]}: p ${$(r.p)}, q ${r.q}. R is`} want={G.revenue(r.p, r.q)} />)}
        <Checked label={`Row e again, with fixed costs of ${$(G.W10.fixed)}. The profit, with its sign, is`} want={G.profitOf(500, 0, 0, G.W10.fixed)} />
        <p style={H}>The challenge</p>
        <Checked label={`Your profit formula, checked on row a with c = ${$(G.W10.unitCost)} and f = ${$(G.W10.fixed)}. The profit`} want={G.profitOf(300, 14, G.W10.unitCost, G.W10.fixed)} />
      </Card>
      <Gap />
      <Card>
        <p style={H}>What if</p>
        <p style={P}>p = <MoneyBox value={price} onChange={setPrice} label="Price p" /> and q = <WholeBox value={q} onChange={setQ} label="How many q" width="4rem" /></p>
        {p !== null && n !== null && <p style={P}>R = {$(p)} x {n} = <Big>{$(G.revenue(p, n))}</Big></p>}
        {p !== null && p > 0 && (
          <svg viewBox="0 0 520 190" width="100%" style={{ maxWidth: 520, display: 'block' }} role="img" aria-label="Revenue against how many sold, a straight line">
            {(() => {
              const L = 54, R = 12, T = 12, B = 30, W = 520, Hh = 190;
              const maxY = Math.max(1, pts[20].r);
              const x = (k: number) => L + (k * (W - L - R)) / 20;
              const y = (v: number) => T + ((maxY - v) * (Hh - T - B)) / maxY;
              return (<>
                <line x1={L} x2={W - R} y1={Hh - B} y2={Hh - B} stroke={LINE} /><line x1={L} x2={L} y1={T} y2={Hh - B} stroke={LINE} />
                <polyline points={pts.map((pt) => `${x(pt.q)},${y(pt.r)}`).join(' ')} fill="none" stroke={CONNECT} strokeWidth="2.5" />
                {n !== null && n <= 20 && <circle cx={x(n)} cy={y(G.revenue(p, n))} r="5" fill={GROW} />}
                {[0, 5, 10, 15, 20].map((k) => <text key={k} x={x(k)} y={Hh - 10} textAnchor="middle" fontSize="11" fill={SUBTLE}>{k}</text>)}
                <text x={L - 6} y={T + 4} textAnchor="end" fontSize="11" fill={SUBTLE}>{$(maxY)}</text>
                <text x={W - R} y={Hh - 10} textAnchor="end" fontSize="11" fill={SUBTLE}>q</text>
              </>);
            })()}
          </svg>
        )}
        <Note>A straight line: every extra one sold adds p to R. Change p and the line tilts. Change q and the dot slides along it.</Note>
      </Card>
    </>
  );
}

// ============================================= Week 11

export function W11() {
  const [tried, setTried] = useState<number[]>([]);
  const peaks = G.ladderPeaks11();
  const allTried = G.LADDER11.every((r) => tried.includes(r.price));
  const [a1, setA1] = useState(''); const [a2, setA2] = useState('');
  return (
    <>
      <Card>
        <p style={P}>Price is the one you choose. How many sell is the market answering back. Pick a price.</p>
        <p>{G.LADDER11.map((r) => <span key={r.price}><Button ghost={tried.includes(r.price)} onClick={() => setTried(tried.includes(r.price) ? tried : [...tried, r.price])}>{$(r.price)}</Button> </span>)}</p>
        <svg viewBox="0 0 520 190" width="100%" style={{ maxWidth: 520, display: 'block', marginTop: '0.5rem' }} role="img" aria-label="How many sell at each price: the line slopes down">
          {(() => {
            const L = 54, R = 12, T = 12, B = 30, W = 520, Hh = 190;
            const maxY = 24;
            const x = (p: number) => L + ((p - 100) * (W - L - R)) / 400;
            const y = (v: number) => T + ((maxY - v) * (Hh - T - B)) / maxY;
            return (<>
              <line x1={L} x2={W - R} y1={Hh - B} y2={Hh - B} stroke={LINE} /><line x1={L} x2={L} y1={T} y2={Hh - B} stroke={LINE} />
              <polyline points={G.LADDER11.map((r) => `${x(r.price)},${y(r.sold)}`).join(' ')} fill="none" stroke={CONNECT} strokeWidth="2.5" />
              {G.LADDER11.map((r) => <circle key={r.price} cx={x(r.price)} cy={y(r.sold)} r="5" fill={tried.includes(r.price) ? GROW : LINE} />)}
              {G.LADDER11.map((r) => <text key={r.price} x={x(r.price)} y={Hh - 10} textAnchor="middle" fontSize="11" fill={SUBTLE}>{$(r.price)}</text>)}
              <text x={L - 6} y={T + 4} textAnchor="end" fontSize="11" fill={SUBTLE}>{maxY}</text>
              <text x={L - 6} y={Hh - B} textAnchor="end" fontSize="11" fill={SUBTLE}>0</text>
              <text x={W - R} y={T + 4} textAnchor="end" fontSize="11" fill={SUBTLE}>across: price, you choose. up: how many sell, they choose.</text>
            </>);
          })()}
        </svg>
        {tried.length > 0 && (
          <Table head={['Price', 'How many sell', 'Revenue', `Cost at ${$(G.W11_COST)} each`, 'Profit']}
            rows={[...tried].sort((a, b) => a - b).map((p) => { const r = G.ladderRow11(p); return [$(r.price), r.sold, <strong key="r">{$(r.revenue)}</strong>, $(r.cost), $(r.profit)]; })} />
        )}
      </Card>
      <Gap />
      <Card>
        <p style={H}>Read the line, then use it</p>
        <p style={P}>Where does revenue peak? <select aria-label="Where does revenue peak" value={a1} onChange={(e) => setA1(e.target.value)}><option value="">choose</option>{G.LADDER11.map((r) => <option key={r.price} value={r.price}>{$(r.price)}</option>)}</select> {a1 && <Verdict ok={Number(a1) === peaks.revenue} />}</p>
        <p style={P}>The challenge: with a cost of {$(G.W11_COST)} to make one, where does profit peak? <select aria-label="Where does profit peak" value={a2} onChange={(e) => setA2(e.target.value)}><option value="">choose</option>{G.LADDER11.map((r) => <option key={r.price} value={r.price}>{$(r.price)}</option>)}</select> {a2 && <Verdict ok={Number(a2) === peaks.profit} />}</p>
        {Number(a1) === peaks.revenue && Number(a2) === peaks.profit && <p style={{ ...P, color: GROW_INK, fontWeight: 700 }}>Not the same row. The page asks what else you would have to know.</p>}
        {!allTried && <Note>Try every rung before you answer, or you are guessing.</Note>}
      </Card>
    </>
  );
}

// ============================================= Week 12

export function W12() {
  const d = G.detective(G.STALLS);
  const names = G.STALLS.map((s) => s.name);
  return (
    <>
      <Card>
        <p style={H}>The Saturday market, four stalls</p>
        <Table head={['Stall', 'Price', 'Pack', 'Packs sold', 'Cost per cup']} rows={G.STALLS.map((s) => [s.name, $(s.price), `${s.pack} cup${s.pack > 1 ? 's' : ''}`, s.sold, $(s.costPerCup)])} />
        <Note>All four sell drinks. This is everything you can see. Every question below is one of the eleven weeks; say which one you used.</Note>
      </Card>
      <Gap />
      <Card>
        <p style={H}>Answer with the right tool</p>
        <Checked label="Ben, per cup" want={d.rows[1].perCup} />
        <Checked label="Dev, per cup (to the cent)" want={d.rows[3].perCup} />
        <Pick text="Cheapest per cup?" options={names} want={d.cheapestPerCup} />
        <Checked label="Ana's margin, in dollars" want={d.rows[0].marginPack} />
        <Checked label="Ana's margin, as a percent" want={d.rows[0].marginPct} money={false} />
        <Pick text="Who took the most money? It is not who sold the most packs." options={names} want={d.mostMoney} />
        <Checked label="Cass's profit, with its sign" want={d.rows[2].profit} />
        <CheckedRatio label="Ana to Cass, cups sold, simplest form" want={G.ratio(d.rows[0].cups, d.rows[2].cups)} />
        <Checked label="The four revenues: the range" want={d.range} />
        <Pick text="One stall is losing money and does not obviously look like it. Which?" options={names} want={d.losing[0]} />
      </Card>
    </>
  );
}

// ============================================= Week 20

export function W20() {
  const [cost, setCost] = useState('2.00');
  const c = toPrice(cost);
  const own = c !== null ? G.threeChoices(G.W20.theirPrice, c) : null;
  const [moves, setMoves] = useState(0);
  const war = G.priceWar(moves);
  const fin = G.priceWar();
  return (
    <>
      <Card>
        <p style={H}>Work all three out</p>
        <p style={P}>Their price is {$(G.W20.theirPrice)}. Your cost is <MoneyBox value={cost} onChange={setCost} label="Your cost" /> (the page uses {$(G.W20.cost)}; then put your own from the Market File).</p>
        {own && (
          <Table head={['Choice', 'Price', 'Margin $', `Sales needed for ${$(G.W20.target)} profit`]}
            rows={[own.match, own.under, own.over].map((r) => [r.name, $(r.price), <span key="m" style={{ color: r.margin < 0 ? SPARK_INK : BODY }}>{$(r.margin)}</span>, r.sales === Infinity ? 'never' : r.sales])} />
        )}
        {own && own.standStill !== Infinity && <p style={P}>Going under drops your margin from {$(own.match.margin)} to {$(own.under.margin)}, so you need <Big>{own.standStill}%</Big> more sales just to stand still.</p>}
      </Card>
      <Gap />
      <Card>
        <p style={H}>The challenge: a price war</p>
        <p style={P}>Both teams start at {$(G.WAR.start)} with a cost of {$(G.WAR.cost)}. Each move sets a price {G.WAR.cutPct} percent under the other team&rsquo;s, to the nearest cent. You go first.</p>
        <p><Button onClick={() => setMoves(Math.min(G.WAR.moves, moves + 1))} disabled={moves >= G.WAR.moves}>Next move</Button> <Button ghost onClick={() => setMoves(0)}>Start over</Button></p>
        <Table head={['Move', 'Who', 'Your price', 'Their price']} rows={war.steps.map((s) => [s.move, s.who === 'you' ? 'You' : 'Them', $(s.you), $(s.them)])} />
        {moves >= G.WAR.moves && (<>
          <p style={P}>After four moves: your margin <Big>{$(war.yourMargin)}</Big>, theirs <Big>{$(war.theirMargin)}</Big>. Both started at {$(G.WAR.start - G.WAR.cost)}.</p>
          <Checked label="Your margin after four moves" want={fin.yourMargin} />
          <Checked label="Their margin after four moves" want={fin.theirMargin} />
        </>)}
        <Note>The page asks who wins. Look at what each margin was before anybody moved.</Note>
      </Card>
    </>
  );
}

// ============================================= Week 21

export function W21() {
  const [price, setPrice] = useState('4.00'); const [cost, setCost] = useState('2.00'); const [off, setOff] = useState('10');
  const p = toPrice(price), c = toPrice(cost), o = toWhole(off);
  const own = p !== null && c !== null && o !== null && p > c && o <= 100 ? G.discountRow(o, p, c) : null;
  const rows = G.W21.discounts.map((d) => G.discountRow(d));
  return (
    <>
      <Card>
        <p style={H}>How much more must you sell?</p>
        <p style={P}>Price {$(G.W21.price)}, cost {$(G.W21.cost)}. The 10 percent row is done: new price {$(rows[0].newPrice)}, new margin {$(rows[0].newMargin)}, {rows[0].extra} percent more sales.</p>
        {rows.slice(1).map((r) => (
          <div key={r.pct} style={{ borderTop: `1px solid ${LINE}`, padding: '0.5rem 0' }}>
            <p style={{ ...P, marginBottom: '0.2rem' }}><strong>{r.pct}% off</strong></p>
            <Checked label="New price" want={r.newPrice} />
            <Checked label="New margin" want={r.newMargin} />
            {r.extra !== Infinity && <Checked label="Extra sales needed, percent" want={r.extra} money={false} />}
          </div>
        ))}
        <Pick text="One discount leaves you with no margin at all. Which?" options={G.W21.discounts.map((d) => `${d}%`)} want={`${G.noMargin(G.W21.discounts)[0]}%`} />
      </Card>
      <Gap />
      <Card>
        <p style={H}>Your own</p>
        <p style={P}>Price <MoneyBox value={price} onChange={setPrice} label="Price" />, cost <MoneyBox value={cost} onChange={setCost} label="Cost" />, and <WholeBox value={off} onChange={setOff} label="Percent off" width="4rem" /> percent off.</p>
        {own && (<>
          <p style={P}>New price <Big>{$(own.newPrice)}</Big>. You gave away {$(own.givenAway)}: {o}% of the price, and <Big color={SPARK_INK}>{own.shareOfMargin}%</Big> of your margin.</p>
          <ShareBar part={own.givenAway} whole={p! - c!} label="The share of your margin the discount takes. The cost does not move, so the whole discount comes out of here." />
          <p style={P}>{own.extra === Infinity ? <>No margin is left. No number of extra sales gets it back.</> : <>To make the same money you now need <Big>{own.extra}%</Big> more sales.</>}</p>
        </>)}
      </Card>
    </>
  );
}

// ============================================= Week 22

export function W22() {
  const [single, setSingle] = useState('1.50'); const [n, setN] = useState('2'); const [bundle, setBundle] = useState('2.50'); const [cost, setCost] = useState('0.50');
  const s = toPrice(single), k = toWhole(n), b = toPrice(bundle), c = toPrice(cost);
  const own = s !== null && k !== null && k > 0 && b !== null && c !== null ? G.bundleRow({ single: s, n: k, bundle: b, cost: c }) : null;
  const rows = G.BUNDLES.map((x) => G.bundleRow(x));
  return (
    <>
      <Card>
        <p style={H}>Work out the bundle</p>
        <p style={P}>Row a is done: {$(150)} each, or 2 for {$(250)}, which is {$(125)} each. At a cost of {$(50)} the deal makes {$(150)}.</p>
        {rows.slice(1).map((r, i) => (
          <div key={i} style={{ borderTop: `1px solid ${LINE}`, padding: '0.5rem 0' }}>
            <p style={{ ...P, marginBottom: '0.2rem' }}><strong>Row {'bcd'[i]}</strong>: one is {$(r.single)}, {r.n} for {$(r.bundle)}, cost {$(r.cost)} each</p>
            <Checked label="Each in the bundle" want={r.each} />
            <Checked label="Margin on the deal" want={r.deal} />
          </div>
        ))}
        <Pick text="One bundle makes less than a single sale does. Which?" options={['a', 'b', 'c', 'd']} want={G.worseBundles(G.BUNDLES)[0]} />
      </Card>
      <Gap />
      <Card>
        <p style={H}>Design your own</p>
        <p style={P}>One for <MoneyBox value={single} onChange={setSingle} label="Single price" />, or <WholeBox value={n} onChange={setN} label="How many in the bundle" width="4rem" /> for <MoneyBox value={bundle} onChange={setBundle} label="Bundle price" />, each costing <MoneyBox value={cost} onChange={setCost} label="Cost each" />.</p>
        {own && (<>
          <p style={P}>Each in the bundle: <Big>{$(own.each)}</Big>{!own.cheaperEach && <span style={{ color: SPARK_INK }}> (not cheaper than one, so it is not a bundle)</span>}. Margin on the deal: <Big color={own.deal < 0 ? SPARK_INK : GROW_INK}>{$(own.deal)}</Big>.</p>
          <Table head={['', 'Margin']} rows={[['One full-price sale', $(own.oneSale)], [`${own.n} full-price sales`, $(own.separately)], ['The bundle', <strong key="b">{$(own.deal)}</strong>]]} />
          <p style={P}>{own.deal < own.oneSale ? <>Worse than one sale. The bundle gives money away.</> : own.deal >= own.separately ? <>As good as selling them separately, or better. The challenge asks how that is possible.</> : <>Better than one sale and worse than {own.n} full-price ones. It works if it turned one sale into {own.n}.</>}</p>
        </>)}
      </Card>
    </>
  );
}

// ============================================= Week 23

export function W23() {
  const [crowd, setCrowd] = useState(''); const [rate, setRate] = useState(''); const [teams, setTeams] = useState(''); const [aim, setAim] = useState('');
  const c = toWhole(crowd), r = toWhole(rate), t = toWhole(teams), a = toWhole(aim);
  const own = c !== null && r !== null && t !== null && a !== null && t > 0 && r <= 100 && a <= 10 ? G.shareTarget(c, r, t, a) : null;
  const book = G.shareTarget(G.W23.crowd, G.W23.buyRate, G.W23.teams, G.W23.aimOfTen);
  return (
    <>
      <Card>
        <p style={H}>Size, then share, then how many to make</p>
        <p style={P}>{G.W23.crowd} people at the market, about half might buy in your category, four teams sell it, and your position aims at {G.W23.aimOfTen} in 10.</p>
        <Checked label="Who might buy in your category" want={book.buyers} money={false} />
        <Checked label="An even share would be" want={book.even} money={false} />
        <Checked label="So make this many" want={book.aiming} money={false} />
      </Card>
      <Gap />
      <Card>
        <p style={H}>Your own market</p>
        <p style={P}>People at the market <WholeBox value={crowd} onChange={setCrowd} label="People at the market" width="4.5rem" />, of whom <WholeBox value={rate} onChange={setRate} label="Percent who might buy" width="4rem" /> percent might buy in your category. Teams in your category <WholeBox value={teams} onChange={setTeams} label="Teams" width="3.5rem" />. You aim at <WholeBox value={aim} onChange={setAim} label="Aim out of ten" width="3.5rem" /> in 10.</p>
        {own && (<>
          <Table head={['', 'Number']} rows={[['Who might buy in your category', own.buyers], ['An even share would be', own.even], ['Share you are aiming at', `${a} in 10`], ['So make this many', <strong key="m">{own.aiming}</strong>]]} />
          <p style={P}>{own.aiming > own.even ? <>Above an even share. The page says to write one sentence saying why your corner beats theirs, or lower the number.</> : own.aiming < own.even ? <>Below an even share. That is a target you can explain, and the page asks what would put you there.</> : <>Exactly an even share. A ruler, not a target.</>}</p>
        </>)}
        <Note>Write the six rows in your Market File. Week 31 compares against this, and only if it was written first.</Note>
      </Card>
    </>
  );
}

// ============================================= Week 31

export function W31() {
  const [sold, setSold] = useState(['', '', '', '']);
  const vals = sold.map(toWhole);
  const own = vals.every((v) => v !== null) ? G.shares(vals.map((v, i) => ({ team: ['You', 'B', 'C', 'D'][i], sold: v! }))) : null;
  const book = G.shares(G.TEAMS31);
  return (
    <>
      <Card>
        <p style={H}>Everybody&rsquo;s share</p>
        <p style={P}>You sold 12 of {book.total}: 12/{book.total}, which is {book.rows[0].simplest}, which is {G.tenths(book.rows[0].tenths)} percent. Do the other three. One decimal place where you need it.</p>
        {book.rows.slice(1).map((r) => <CheckedPct key={r.team} label={`Team ${r.team} sold ${r.sold} of ${book.total}: percent`} want={r.tenths} />)}
        <Checked label={`An even share with ${G.W31.evenTeams} teams, percent`} want={G.evenSharePct(G.W31.evenTeams)} money={false} />
        <Note>The percents must add to 100. If yours do not, check that everybody is dividing by the same total.</Note>
      </Card>
      <Gap />
      <Card>
        <p style={H}>Your own market</p>
        <p style={P}>Sold, from week 30&rsquo;s pooled count: {['You', 'B', 'C', 'D'].map((t, i) => <span key={t}>{t} <WholeBox value={sold[i]} onChange={(v) => setSold(sold.map((x, j) => (j === i ? v : x)))} label={`${t} sold`} width="4rem" /> </span>)}</p>
        {own && own.total > 0 && (<>
          <Table head={['Team', 'Sold', 'Fraction', 'Simplest', 'Percent']} rows={[...own.rows.map((r) => [r.team, r.sold, r.fraction, r.simplest, `${G.tenths(r.tenths)}%`]), ['TOTAL', own.total, '', '', `${G.tenths(own.sumTenths)}%`]]} />
          <p style={P}>Your share: <Big>{G.tenths(own.rows[0].tenths)}%</Big>. An even share with four teams is {G.evenSharePct(4)}%. {own.rows[0].tenths > 250 ? 'You are above it.' : own.rows[0].tenths < 250 ? 'You are below it.' : 'You are exactly on it.'} Whether that is your corner working or a good spot on the floor is week 35&rsquo;s question.</p>
        </>)}
      </Card>
    </>
  );
}

// ============================================= Week 35

export function W35() {
  const [y1, setY1] = useState(''); const [y2, setY2] = useState(''); const [m1, setM1] = useState(''); const [m2, setM2] = useState('');
  const a = toWhole(y1), b = toWhole(y2), c = toWhole(m1), d = toWhole(m2);
  const own = a !== null && b !== null && c !== null && d !== null && a > 0 && c > 0 && d > 0 && a <= c && b <= d ? G.twoRounds(a, b, c, d) : null;
  const book = G.twoRounds(G.W35.r1You, G.W35.r2You, G.W35.r1Market, G.W35.r2Market);
  return (
    <>
      <Card>
        <p style={H}>Two rounds, three comparisons</p>
        <p style={P}>The page&rsquo;s numbers: you went from {G.W35.r1You} to {G.W35.r2You}; the whole market went from {G.W35.r1Market} to {G.W35.r2Market}.</p>
        <Checked label="Your sales grew by, percent" want={book.yourGrowth} money={false} />
        <Checked label="The whole market grew by, percent" want={book.marketGrowth} money={false} />
        <Checked label="Your share in round one, percent" want={book.share1} money={false} />
        <Checked label="Your share in round two, percent" want={book.share2} money={false} />
        <Pick text="So your share went" options={['up', 'down']} want={book.shareWent} />
      </Card>
      <Gap />
      <Card>
        <p style={H}>Your own two rounds</p>
        <Table head={['', 'Round one', 'Round two']} right={false} rows={[
          ['Your sales', <WholeBox key="a" value={y1} onChange={setY1} label="Your sales, round one" width="4.5rem" />, <WholeBox key="b" value={y2} onChange={setY2} label="Your sales, round two" width="4.5rem" />],
          ['Whole market sales', <WholeBox key="c" value={m1} onChange={setM1} label="Market sales, round one" width="4.5rem" />, <WholeBox key="d" value={m2} onChange={setM2} label="Market sales, round two" width="4.5rem" />],
          ['Your share', own ? `${own.share1}%` : '', own ? `${own.share2}%` : ''],
        ]} />
        {own && (<>
          <p style={P}>Your sales: <Big color={own.yourGrowth >= 0 ? GROW_INK : SPARK_INK}>{own.yourGrowth >= 0 ? '+' : ''}{own.yourGrowth}%</Big>. The market: <Big color={own.marketGrowth >= 0 ? GROW_INK : SPARK_INK}>{own.marketGrowth >= 0 ? '+' : ''}{own.marketGrowth}%</Big>. Your share went <Big>{own.shareWent}</Big>.</p>
          <p style={P}>{own.confounded ? <>Sales up, share down. The market did that, not your move. The word for this is confounded.</> : own.share2 > own.share1 ? <>Your share went up while everybody moved at once. Share divides out what happened to everybody, so your move did something.</> : own.share2 === own.share1 ? <>The same share. Whatever you did, the market did the same.</> : <>Your share fell. Whatever your sales did, the move did not win you any of the market.</>}</p>
        </>)}
        <Note>Do the share row first. It is the only row that is not confounded.</Note>
      </Card>
    </>
  );
}

export const GRADE6: Record<number, () => React.JSX.Element> = { 3: W3, 4: W4, 10: W10, 11: W11, 12: W12, 20: W20, 21: W21, 22: W22, 23: W23, 31: W31, 35: W35 };
