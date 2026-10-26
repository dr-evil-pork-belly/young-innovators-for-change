'use client';
/**
 * Small pieces the game screens share: a dollars box, a whole-number box, a
 * checked box that says right or not yet (never the answer), and a plain
 * table. Built on the kit's tokens so the games read as the site does.
 */
import { useState } from 'react';
import { INK, BODY, SUBTLE, LINE, LINE_2, BAND, CARD_BG, CONNECT, CONNECT_INK, GROW_INK, ALERT, DISPLAY } from '@/components/kit';
import { dollars } from '@/lib/games/grade5';

/** The largest amount a box accepts: a million dollars, or a million of anything. Beyond that the arithmetic stops being a lesson. */
const MAX_CENTS = 100_000_000;
const MAX_WHOLE = 1_000_000;

/** Text a student typed as dollars, as cents: "$1.30", "1.3" and "1.30" are 130; "130" is $130, so 13,000. A minus sign is allowed, for answers that are a loss. */
export function toCents(text: string): number | null {
  const t = text.replace(/[$,\s]/g, '');
  if (t === '' || t === '-' || t === '.' || t === '-.') return null;
  if (!/^-?\d*(\.\d{0,2})?$/.test(t)) return null;
  const neg = t.startsWith('-');
  const [d, c = ''] = t.replace('-', '').split('.');
  const cents = Number(d || '0') * 100 + Number((c + '00').slice(0, 2));
  if (cents > MAX_CENTS) return null;
  return neg ? -cents : cents;
}

/** A price, a cost or a margin the student sets: dollars that cannot be below zero. The engine refuses a negative price, so the screen never sends one. */
export function toPrice(text: string): number | null {
  const n = toCents(text);
  return n === null || n < 0 ? null : n;
}

export function toWhole(text: string): number | null {
  const t = text.replace(/[,\s]/g, '');
  if (t === '' || !/^\d+$/.test(t)) return null;
  const n = Number(t);
  return n > MAX_WHOLE ? null : n;
}

const box: React.CSSProperties = {
  font: 'inherit', color: INK, border: `1px solid ${LINE_2}`, borderRadius: '6px', padding: '0.4rem 0.55rem',
  background: CARD_BG, width: '7rem', textAlign: 'right',
};

export function MoneyBox({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) {
  return <span style={{ whiteSpace: 'nowrap' }}>$ <input aria-label={label} inputMode="decimal" value={value} onChange={(e) => onChange(e.target.value)} style={box} /></span>;
}

export function WholeBox({ value, onChange, label, width = '5rem', inputMode = 'numeric' }: { value: string; onChange: (v: string) => void; label: string; width?: string; inputMode?: 'numeric' | 'decimal' }) {
  return <input aria-label={label} inputMode={inputMode} value={value} onChange={(e) => onChange(e.target.value)} style={{ ...box, width }} />;
}

/** A box the student fills; the game checks it. Says right or not yet, never the answer. */
export function Checked({ label, want, money = true }: { label: string; want: number; money?: boolean }) {
  const [v, setV] = useState('');
  const n = money ? toCents(v) : toWhole(v);
  const state = n === null ? '' : n === want ? 'ok' : 'no';
  return (
    <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', padding: '0.35rem 0' }}>
      <span style={{ color: BODY }}>{label}</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {money ? <MoneyBox value={v} onChange={setV} label={label} /> : <WholeBox value={v} onChange={setV} label={label} />}
        <span style={{ width: '4.5rem', fontWeight: 700, color: state === 'ok' ? GROW_INK : ALERT }}>{state === 'ok' ? 'Right.' : state === 'no' ? 'Not yet.' : ''}</span>
      </span>
    </label>
  );
}

export function Table({ head, rows, right = true }: { head: string[]; rows: React.ReactNode[][]; right?: boolean }) {
  const cell: React.CSSProperties = { border: `1px solid ${LINE}`, padding: '0.4rem 0.6rem', textAlign: right ? 'right' : 'left', fontSize: '0.92rem' };
  return (
    <table style={{ borderCollapse: 'collapse', width: '100%', margin: '0.6rem 0 1rem' }}>
      <thead><tr>{head.map((h, i) => <th key={i} style={{ ...cell, textAlign: i === 0 ? 'left' : cell.textAlign, background: BAND, color: INK, fontWeight: 700 }}>{h}</th>)}</tr></thead>
      <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} style={{ ...cell, textAlign: j === 0 ? 'left' : cell.textAlign, color: BODY }}>{c}</td>)}</tr>)}</tbody>
    </table>
  );
}

export function Big({ children, color = CONNECT_INK }: { children: React.ReactNode; color?: string }) {
  return <span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: '1.5rem', color }}>{children}</span>;
}

export function Note({ children }: { children: React.ReactNode }) {
  return <p style={{ color: SUBTLE, fontSize: '0.88rem', marginTop: '0.6rem' }}>{children}</p>;
}

export function Button({ children, onClick, ghost = false, disabled = false }: { children: React.ReactNode; onClick: () => void; ghost?: boolean; disabled?: boolean }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} style={{
      font: 'inherit', fontWeight: 700, cursor: disabled ? 'not-allowed' : 'pointer', borderRadius: '6px', padding: '0.45rem 0.9rem',
      border: `1px solid ${CONNECT}`, background: ghost ? CARD_BG : CONNECT, color: ghost ? CONNECT_INK : '#fff', opacity: disabled ? 0.5 : 1,
    }}>{children}</button>
  );
}

export const $ = dollars;
