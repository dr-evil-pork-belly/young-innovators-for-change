'use client';
/**
 * The Venture Year (Grade 4) games. Every number comes from lib/games/grade4.ts,
 * which takes it from the week's own page. The screens only ask and show.
 */
import { useState } from 'react';
import { Card, INK, BODY, SUBTLE, GROW_INK, SPARK_INK, LINE } from '@/components/kit';
import * as G from '@/lib/games/grade4';
import { Checked, MoneyBox, WholeBox, Table, Big, Note, toCents, toPrice, toWhole } from './bits';

const P: React.CSSProperties = { color: BODY, lineHeight: 1.7, marginBottom: '0.8rem' };
const H: React.CSSProperties = { color: INK, fontWeight: 700, margin: '0 0 0.5rem' };
const $ = G.money4;

const Verdict = ({ ok, text }: { ok: boolean; text?: string }) => <b style={{ color: ok ? GROW_INK : SPARK_INK }}>{ok ? 'Right.' : text ?? 'Not yet.'}</b>;

// ============================================= Week 7

export function W7() {
  const [sold, setSold] = useState('20'); const [price, setPrice] = useState('3'); const [mat, setMat] = useState('18');
  const s = toWhole(sold), p = toPrice(price), m = toPrice(mat);
  const t = s !== null && p !== null && m !== null ? G.trace(s, p, m) : null;
  const [marks, setMarks] = useState<Record<string, string>>({});
  return (
    <>
      <Card>
        <p style={H}>Trace the money</p>
        <p style={P}>A student sells <WholeBox value={sold} onChange={setSold} label="Bracelets sold" width="4rem" /> bracelets at <MoneyBox value={price} onChange={setPrice} label="Price each" /> each. The string and beads cost <MoneyBox value={mat} onChange={setMat} label="Materials" /> in total.</p>
        {t && (
          <Table head={['', 'Amount']} rows={[
            ['Money that came in (revenue)', $(t.revenue)],
            ['Money that went out (cost)', $(t.cost)],
            [<strong key="s">Money that stayed</strong>, <Big key="v" color={t.stayed < 0 ? SPARK_INK : GROW_INK}>{$(t.stayed)}</Big>],
          ]} />
        )}
        <Note>Change the price or the materials and watch which line moves. The money that arrives is revenue. The number that matters is what stays.</Note>
      </Card>
      <div style={{ height: '1rem' }} />
      <Card>
        <p style={H}>Which of these is a cost?</p>
        <Table head={['Item', 'Cost?']} right={false} rows={G.W7_ITEMS.map((it) => {
          const v = marks[it.item] ?? '';
          const right = v === '' ? null : it.arguable ? true : (v === 'yes') === it.cost;
          return [it.item, <span key="s"><select aria-label={`${it.item}: cost or not`} value={v} onChange={(e) => setMarks({ ...marks, [it.item]: e.target.value })}><option value="">choose</option><option value="yes">Cost</option><option value="no">Not a cost</option></select> {right !== null && (it.arguable ? <b style={{ color: SUBTLE }}>Explain your answer.</b> : <Verdict ok={right} />)}</span>];
        })} />
      </Card>
    </>
  );
}

// ============================================= Week 8

export function W8() {
  const [cookie, setCookie] = useState('');
  const c = toPrice(cookie);
  const [n, setN] = useState('100');
  const k = toWhole(n) ?? 0;
  return (
    <>
      <Card>
        <p style={H}>Fill the gap</p>
        <p style={P}>Lemonade is done for you: cost {$(35)}, price {$(100)}, gap {$(65)}.</p>
        {G.W8_ROWS.slice(1).map((r) => (
          <div key={r.name} style={{ borderTop: `1px solid ${LINE}`, padding: '0.4rem 0' }}>
            {r.name === 'Card'
              ? <Checked label={`${r.name}: cost ${$(r.cost)}, gap ${$(G.gap(r.price, r.cost))}. The price`} want={r.price} />
              : <Checked label={`${r.name}: cost ${$(r.cost)}, price ${$(r.price)}. The gap`} want={G.gap(r.price, r.cost)} />}
          </div>
        ))}
      </Card>
      <div style={{ height: '1rem' }} />
      <Card>
        <p style={H}>Price it yourself</p>
        <p style={P}>Cookies cost you <strong>{$(G.COOKIE_COST)}</strong> each to bake. My price: <MoneyBox value={cookie} onChange={setCookie} label="My cookie price" /></p>
        {c !== null && (
          <>
            <p style={P}>Gap on one cookie: <Big color={G.gap(c, G.COOKIE_COST) < 0 ? SPARK_INK : GROW_INK}>{$(G.gap(c, G.COOKIE_COST))}</Big></p>
            <p style={P}>After selling <WholeBox value={n} onChange={setN} label="Cookies sold" width="4.5rem" /> of them: <Big color={G.keep(k, c, G.COOKIE_COST) < 0 ? SPARK_INK : GROW_INK}>{$(G.keep(k, c, G.COOKIE_COST))}</Big>{G.keep(k, c, G.COOKIE_COST) < 0 ? <span style={{ color: SPARK_INK }}> Too low is a real mistake. Selling more just loses more.</span> : ''}</p>
          </>
        )}
      </Card>
      <div style={{ height: '1rem' }} />
      <Card>
        <p style={H}>The challenge</p>
        <p style={P}>You could sell {G.W8_CHALLENGE.a.sold} bracelets at {$(G.W8_CHALLENGE.a.price)}, or {G.W8_CHALLENGE.b.sold} at {$(G.W8_CHALLENGE.b.price)}. Each one costs you {$(G.W8_CHALLENGE.cost)}.</p>
        <Checked label={`The gap you keep: ${G.W8_CHALLENGE.a.sold} at ${$(G.W8_CHALLENGE.a.price)}`} want={G.keep(G.W8_CHALLENGE.a.sold, G.W8_CHALLENGE.a.price, G.W8_CHALLENGE.cost)} />
        <Checked label={`The gap you keep: ${G.W8_CHALLENGE.b.sold} at ${$(G.W8_CHALLENGE.b.price)}`} want={G.keep(G.W8_CHALLENGE.b.sold, G.W8_CHALLENGE.b.price, G.W8_CHALLENGE.cost)} />
        <Note>There is a good argument for both. The page asks which you would choose and why.</Note>
      </Card>
    </>
  );
}

// ============================================= Week 9

export function W9() {
  const [rev, setRev] = useState('60'); const [cost, setCost] = useState('');
  const r = toCents(rev), c = toCents(cost);
  return (
    <>
      <Card>
        <p style={H}>Three days at the same stand</p>
        {G.W9_DAYS.map((d) => <Checked key={d.day} label={`${d.day}: revenue ${$(d.revenue)}, cost ${$(d.cost)}. Profit (a loss with a minus sign)`} want={G.profit(d.revenue, d.cost)} />)}
      </Card>
      <div style={{ height: '1rem' }} />
      <Card>
        <p style={H}>Same revenue, different answer</p>
        {G.W9_STANDS.map((d) => <Checked key={d.stand} label={`${d.stand}: revenue ${$(d.revenue)}, cost ${$(d.cost)}. Profit`} want={G.profit(d.revenue, d.cost)} />)}
        <Note>Both stands would tell you they made $60. The page asks why that is misleading.</Note>
      </Card>
      <div style={{ height: '1rem' }} />
      <Card>
        <p style={H}>Your own day</p>
        <p style={P}>Revenue <MoneyBox value={rev} onChange={setRev} label="Revenue" /> and cost <MoneyBox value={cost} onChange={setCost} label="Cost" /></p>
        {r !== null && c !== null && <p style={P}>Profit: <Big color={G.profit(r, c) < 0 ? SPARK_INK : GROW_INK}>{$(G.profit(r, c))}</Big>{G.profit(r, c) < 0 ? ' Below zero. That is a real result, not a failure to report.' : G.profit(r, c) === 0 ? ' Exactly zero: nothing lost, nothing made.' : ''}</p>}
      </Card>
    </>
  );
}

// ============================================= Week 19

export function W19() {
  const [rows, setRows] = useState([{ name: 'Beads', pack: '4.00', size: '50', used: '8' }, { name: '', pack: '', size: '', used: '' }, { name: '', pack: '', size: '', used: '' }, { name: '', pack: '', size: '', used: '' }]);
  const set = (i: number, k: 'name' | 'pack' | 'size' | 'used', v: string) => setRows(rows.map((r, j) => (j === i ? { ...r, [k]: v } : r)));
  const per = (r: typeof rows[number]) => { const p = toCents(r.pack), s = toWhole(r.size), u = toWhole(r.used); return p !== null && s && u !== null ? G.perItem(p, s, u) : null; };
  const total = rows.reduce((a, r) => a + (per(r) ?? 0), 0);
  return (
    <Card>
      <p style={P}>Materials come in packs. Work out what one item takes from each pack. The beads are done for you: a {$(400)} bag holds 50, a bracelet uses 8, so the beads in one bracelet cost <strong>{$(G.perItem(400, 50, 8))}</strong>.</p>
      <Table head={['Material', 'Pack price', 'How many in a pack', 'Used per item', 'Cost per item']} right={false} rows={[
        ...rows.map((r, i) => [
          <input key="n" aria-label={`Material ${i + 1}`} value={r.name} onChange={(e) => set(i, 'name', e.target.value)} style={{ font: 'inherit', border: `1px solid ${LINE}`, borderRadius: 6, padding: '0.3rem 0.5rem', width: '8rem' }} />,
          <MoneyBox key="p" value={r.pack} onChange={(v) => set(i, 'pack', v)} label={`Pack price ${i + 1}`} />,
          <WholeBox key="s" value={r.size} onChange={(v) => set(i, 'size', v)} label={`In a pack ${i + 1}`} width="4.5rem" />,
          <WholeBox key="u" value={r.used} onChange={(v) => set(i, 'used', v)} label={`Used per item ${i + 1}`} width="4.5rem" />,
          per(r) !== null ? <strong key="c">{$(per(r)!)}</strong> : '',
        ]),
        [<strong key="t">TOTAL cost of one</strong>, '', '', '', <Big key="v">{$(total)}</Big>],
      ]} />
      <Note>To the nearest cent. The page then asks about the ones people forget: packaging, waste, what you borrowed, the sign.</Note>
    </Card>
  );
}

// ============================================= Week 20

export function W20() {
  const [cost, setCost] = useState(''); const [price, setPrice] = useState(''); const [sold, setSold] = useState('23');
  const c = toPrice(cost), p = toPrice(price), n = toWhole(sold) ?? 0;
  return (
    <Card>
      <p style={P}>The warm-up: <Checked label={`${G.W20_WARM.sold} items at ${$(G.W20_WARM.price)} bring in`} want={G.W20_WARM.sold * G.W20_WARM.price} /></p>
      <p style={H}>Test your price</p>
      <p style={P}>My cost to make one (week 19) <MoneyBox value={cost} onChange={setCost} label="Cost to make one" /> and my price <MoneyBox value={price} onChange={setPrice} label="My price" /></p>
      {c !== null && p !== null && (
        <>
          <p style={P}>Is it above my cost? <Verdict ok={p > c} text="No. Stop and fix it now. You cannot make that up by selling more." />{p > c && <> The gap on one is <Big>{$(p - c)}</Big>.</>}</p>
          <p style={P}>Is it easy to hand over? {p % 25 === 0 ? <b style={{ color: SUBTLE }}>It can be paid in quarters.</b> : <b style={{ color: SUBTLE }}>It needs smaller coins. The page asks whether rounding your price would help or hurt.</b>}</p>
          <p style={P}>On a day you sell <WholeBox value={sold} onChange={setSold} label="Items sold" width="4rem" />: money in <strong>{$(n * p)}</strong>, kept after cost <Big color={G.keep(n, p, c) < 0 ? SPARK_INK : GROW_INK}>{$(G.keep(n, p, c))}</Big>.</p>
        </>
      )}
    </Card>
  );
}

// ============================================= Week 21

export function W21() {
  const [price, setPrice] = useState('3.50'); const [cost, setCost] = useState('1.20'); const [goal, setGoal] = useState('');
  const p = toPrice(price), c = toPrice(cost), g = toPrice(goal);
  const one = p !== null && c !== null ? G.gap(p, c) : null;
  return (
    <>
      <Card>
        <p style={P}>Price for one (week 20) <MoneyBox value={price} onChange={setPrice} label="Price" /> and cost to make one (week 19) <MoneyBox value={cost} onChange={setCost} label="Cost" /></p>
        {one !== null && (
          <>
            <p style={P}>Profit on one sale: <Big color={one < 0 ? SPARK_INK : GROW_INK}>{$(one)}</Big>{one < 0 && <span style={{ color: SPARK_INK }}> Negative. Go back to week 19 and week 20 and change one of them.</span>}</p>
            <p style={H}>Scale it up</p>
            <Table head={['If I sell', 'Money in', 'Money out', 'Profit']} rows={G.W21_SCALE.map((n) => { const r = G.scale(p!, c!, n); return [n, $(r.moneyIn), $(r.moneyOut), <strong key="p">{$(r.profit)}</strong>]; })} />
          </>
        )}
      </Card>
      <div style={{ height: '1rem' }} />
      <Card>
        <p style={H}>How many to reach a goal?</p>
        <p style={P}>What I want the money for costs <MoneyBox value={goal} onChange={setGoal} label="Goal" /></p>
        {one !== null && g !== null && one > 0 && <p style={P}>At {$(one)} a sale, that takes <Big>{G.salesToReach(g, one)}</Big> sales. Could you really sell that many in one market day?</p>}
        {one !== null && g !== null && one <= 0 && <p style={{ ...P, color: SPARK_INK }}>With no profit on one sale, no number of sales reaches it.</p>}
      </Card>
    </>
  );
}

// ============================================= Week 22

export function W22() {
  const [mins, setMins] = useState('7'); const [hours, setHours] = useState('2'); const [weeks, setWeeks] = useState(''); const [fund, setFund] = useState(''); const [cost, setCost] = useState('');
  const m = toWhole(mins), h = toWhole(hours), w = toWhole(weeks), f = toPrice(fund), c = toPrice(cost);
  const cap = m && h !== null ? G.capacity(m, h * 60) : null;
  const ready = cap && w !== null ? cap.made * w : null;
  const ml = f !== null && c !== null && c > 0 ? G.moneyLimit(f, c) : null;
  return (
    <>
      <Card>
        <p style={H}>Your capacity</p>
        <p style={P}>Minutes to make one (time it, do not guess) <WholeBox value={mins} onChange={setMins} label="Minutes to make one" width="4rem" />. Hours a week I can work on this <WholeBox value={hours} onChange={setHours} label="Hours a week" width="4rem" />. Weeks until market day <WholeBox value={weeks} onChange={setWeeks} label="Weeks until market day" width="4rem" />.</p>
        {cap && <p style={P}>That is {h! * 60} minutes a week: <Big>{cap.made}</Big> made, with {cap.left} minute{cap.left === 1 ? '' : 's'} left over. {ready !== null && <>Most I can have ready: <Big>{ready}</Big>.</>}</p>}
      </Card>
      <div style={{ height: '1rem' }} />
      <Card>
        <p style={H}>Two limits, one answer</p>
        <p style={P}>Startup fund <MoneyBox value={fund} onChange={setFund} label="Startup fund" /> and cost to make one <MoneyBox value={cost} onChange={setCost} label="Cost to make one" /></p>
        {ml !== null && ready !== null && (
          <Table head={['Limit', 'Number']} rows={[['Money limit: startup fund divided by cost to make one', ml], ['Time limit: what I can get made', ready], [<strong key="r">My real plan (the smaller one)</strong>, <Big key="v">{Math.min(ml, ready)}</Big>]]} />
        )}
        <Note>Whichever number is smaller is your real answer.</Note>
      </Card>
    </>
  );
}

// ============================================= Week 32

export function W32() {
  const [rows, setRows] = useState([{ what: '', sold: '', price: '' }, { what: '', sold: '', price: '' }, { what: '', sold: '', price: '' }]);
  const set = (i: number, k: 'what' | 'sold' | 'price', v: string) => setRows(rows.map((r, j) => (j === i ? { ...r, [k]: v } : r)));
  const line = (r: typeof rows[number]) => { const s = toWhole(r.sold), p = toCents(r.price); return s !== null && p !== null ? s * p : null; };
  const total = rows.reduce((a, r) => a + (line(r) ?? 0), 0);
  return (
    <Card>
      <p style={P}>The warm-up: <Checked label={`${G.W32_WARM[0].sold} items at ${$(G.W32_WARM[0].price)} and ${G.W32_WARM[1].sold} at ${$(G.W32_WARM[1].price)} came to`} want={G.revenueOf(G.W32_WARM)} /></p>
      <p style={H}>What came in</p>
      <Table head={['What sold', 'How many', 'Price each', 'Money in']} right={false} rows={[
        ...rows.map((r, i) => [
          <input key="w" aria-label={`What sold ${i + 1}`} value={r.what} onChange={(e) => set(i, 'what', e.target.value)} style={{ font: 'inherit', border: `1px solid ${LINE}`, borderRadius: 6, padding: '0.3rem 0.5rem', width: '8rem' }} />,
          <WholeBox key="s" value={r.sold} onChange={(v) => set(i, 'sold', v)} label={`How many ${i + 1}`} width="4.5rem" />,
          <MoneyBox key="p" value={r.price} onChange={(v) => set(i, 'price', v)} label={`Price each ${i + 1}`} />,
          line(r) !== null ? <strong key="m">{$(line(r)!)}</strong> : '',
        ]),
        [<strong key="t">TOTAL REVENUE</strong>, '', '', <Big key="v">{$(total)}</Big>],
      ]} />
      <Note>Revenue is only the money that came in. Do not take anything away yet. Costs are next week.</Note>
    </Card>
  );
}

// ============================================= Week 33

export function W33() {
  const [rev, setRev] = useState(''); const [costs, setCosts] = useState(['', '', '', '', '']); const [box, setBox] = useState(''); const [fund, setFund] = useState(''); const [notBox, setNotBox] = useState(''); const [hours, setHours] = useState('');
  const labels = ['Materials for everything I made, including any that went wrong', 'Packaging and labels', 'My sign and table things', 'Anything else I bought for this business', 'Anything I borrowed and must replace'];
  const r = toCents(rev);
  const cs = costs.map(toCents);
  const total = cs.reduce<number>((a, c) => a + (c ?? 0), 0);
  const profit = r !== null ? r - total : null;
  const b = toCents(box), f = toCents(fund), h = toWhole(hours);
  const nb = toCents(notBox) ?? 0;
  return (
    <>
      <Card>
        <p style={P}>The warm-up: <Checked label={`Revenue ${$(G.W33_WARM.revenue)}, costs ${G.W33_WARM.costs.map($).join(', ')}. Profit`} want={G.W33_WARM.revenue - G.totalCost(G.W33_WARM.costs)} /></p>
        <p style={H}>Every cost, including the annoying ones</p>
        <p style={P}>Revenue (week 32) <MoneyBox value={rev} onChange={setRev} label="Revenue" /></p>
        {labels.map((l, i) => <p key={l} style={{ ...P, display: 'flex', justifyContent: 'space-between', gap: '1rem' }}><span>{l}</span><MoneyBox value={costs[i]} onChange={(v) => setCosts(costs.map((c, j) => (j === i ? v : c)))} label={l} /></p>)}
        <p style={P}>Total cost <strong>{$(total)}</strong>.{profit !== null && <> Profit: <Big color={profit < 0 ? SPARK_INK : GROW_INK}>{$(profit)}</Big>{profit < 0 ? ' Below zero. Write it with a minus sign and keep going.' : ''}</>}</p>
      </Card>
      <div style={{ height: '1rem' }} />
      <Card>
        <p style={H}>Check it the other way</p>
        <p style={P}>In my money box at the end <MoneyBox value={box} onChange={setBox} label="Money box" />. The startup fund <MoneyBox value={fund} onChange={setFund} label="Startup fund" />. Any cost not paid from the box <MoneyBox value={notBox} onChange={setNotBox} label="Any cost not paid from the box" />.</p>
        {b !== null && f !== null && profit !== null && (
          <p style={P}>What is left, which is mine: <Big color={G.boxCheck(b, f, nb) < 0 ? SPARK_INK : GROW_INK}>{$(G.boxCheck(b, f, nb))}</Big>. {G.boxCheck(b, f, nb) === profit ? <b style={{ color: GROW_INK }}>It agrees with your profit.</b> : <b style={{ color: SPARK_INK }}>It does not agree with your profit. Your tally and your box disagree; find the difference.</b>}</p>
        )}
        <p style={P}>Hours spent altogether <WholeBox value={hours} onChange={setHours} label="Hours" width="4rem" />{profit !== null && h ? <> : profit divided by hours is <Big color={profit < 0 ? SPARK_INK : GROW_INK}>{$(G.perHour(profit, h))}</Big> an hour.</> : ''}</p>
      </Card>
    </>
  );
}

export const GRADE4: Record<number, () => React.JSX.Element> = { 7: W7, 8: W8, 9: W9, 19: W19, 20: W20, 21: W21, 22: W22, 32: W32, 33: W33 };
