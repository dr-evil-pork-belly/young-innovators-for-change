'use client';

/**
 * Shared tokens and primitives.
 *
 * Before this file, every page redeclared its own color constants and its own
 * FadeIn. That is why the same eight colors appeared in eight places and why
 * stale content could hide in plain sight. New pages import from here.
 */

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';

// ── Palette ───────────────────────────────────────────────────────────────────
export const SLATE   = '#0F172A';
export const SLATE_2 = '#1E293B';
export const SLATE_3 = '#334155';
export const MUTED   = '#94A3B8';
export const WHITE   = '#F8FAFC';
export const OBSIDIAN = '#0A0A0B';

export const GOLD    = '#C9A84C';
export const GOLD_L  = '#E8C94F';
export const ROYAL   = '#2563EB';
export const ROYAL_L = '#3B82F6';
export const ROYAL_XL = '#93C5FD';
export const GREEN   = '#10B981';
export const GREEN_L = '#34D399';

export const DISPLAY = "'Bebas Neue', Impact, sans-serif";
export const SANS    = "'DM Sans Variable', 'DM Sans', system-ui, sans-serif";

// ── Motion ────────────────────────────────────────────────────────────────────
export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
};
export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};
export const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export function FadeIn({ children, delay = 0, className = '', style, v = fadeUp }: {
  children: React.ReactNode; delay?: number; className?: string;
  style?: React.CSSProperties; v?: Variants;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div ref={ref} variants={v} initial="hidden"
      animate={inView ? 'visible' : 'hidden'} transition={{ delay }}
      className={className} style={style}>
      {children}
    </motion.div>
  );
}

/**
 * Layout is done with inline styles rather than Tailwind utilities on purpose.
 * The global reset sets margin/padding on `*`, and for a long time it sat
 * outside any cascade layer, which silently killed every px-*, py-* and
 * mx-auto on the site. That is fixed in globals.css now, but these components
 * should not depend on it.
 */
const PAD_X = 'clamp(1.25rem, 4vw, 3rem)';
const PAD_Y = 'clamp(3.5rem, 7vw, 6rem)';

export function Container({ children, style }: {
  children: React.ReactNode; style?: React.CSSProperties;
}) {
  return (
    <div style={{ width: '100%', maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto',
      paddingLeft: PAD_X, paddingRight: PAD_X, ...style }}>
      {children}
    </div>
  );
}

// ── Building blocks ───────────────────────────────────────────────────────────

export function Eyebrow({ children, color = ROYAL_L }: { children: React.ReactNode; color?: string }) {
  return (
    <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.22em',
      textTransform: 'uppercase' as const, color, marginBottom: '0.5rem' }}>
      {children}
    </p>
  );
}

export function Title({ children, size = 'clamp(2rem, 4.5vw, 3.8rem)' }: {
  children: React.ReactNode; size?: string;
}) {
  return (
    <h2 style={{ fontFamily: DISPLAY, fontSize: size, lineHeight: 0.95,
      letterSpacing: '0.02em', color: WHITE }}>
      {children}
    </h2>
  );
}

export function Card({ children, accent = ROYAL_L, pad = '1.5rem' }: {
  children: React.ReactNode; accent?: string; pad?: string;
}) {
  return (
    <div style={{ background: 'rgba(15,23,42,0.7)', border: `1px solid ${accent}22`,
      borderRadius: '4px', overflow: 'hidden', height: '100%', display: 'flex',
      flexDirection: 'column' }}>
      <div style={{ height: '2px', background: `linear-gradient(90deg, ${accent}, transparent)` }} />
      <div style={{ padding: pad, flex: 1 }}>{children}</div>
    </div>
  );
}

/** A labeled fact with its source. Used wherever a claim needs provenance. */
export function FactRow({ label, value, source }: {
  label: string; value: React.ReactNode; source?: string;
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(150px, 220px) 1fr',
      gap: '1.25rem', padding: '0.85rem 0', borderBottom: '1px solid rgba(37,99,235,0.1)' }}>
      <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em',
        textTransform: 'uppercase' as const, color: MUTED, paddingTop: '2px' }}>{label}</div>
      <div>
        <div style={{ fontSize: '0.92rem', color: WHITE, fontWeight: 600 }}>{value}</div>
        {source && (
          <div style={{ fontSize: '0.72rem', color: SLATE_3, marginTop: '2px' }}>{source}</div>
        )}
      </div>
    </div>
  );
}

export function Section({ id, children, tinted = false, accent = ROYAL }: {
  id?: string; children: React.ReactNode; tinted?: boolean; accent?: string;
}) {
  const rgb = accent === GOLD ? '201,168,76' : '37,99,235';
  return (
    <section
      id={id}
      style={tinted ? {
        background: 'rgba(15,23,42,0.5)',
        borderTop: `1px solid rgba(${rgb},0.08)`,
        borderBottom: `1px solid rgba(${rgb},0.08)`,
      } : undefined}
    >
      <Container style={{ paddingTop: PAD_Y, paddingBottom: PAD_Y }}>{children}</Container>
    </section>
  );
}

/** Page shell: dark ground, correct type, room for the fixed navbar. */
export function Page({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: SLATE, minHeight: '100vh', color: WHITE, fontFamily: SANS }}>
      {children}
    </div>
  );
}

/** Standard page opener. */
export function Hero({ eyebrow, title, lede, accent = ROYAL_L, children }: {
  eyebrow: string; title: React.ReactNode; lede: React.ReactNode;
  accent?: string; children?: React.ReactNode;
}) {
  const rgb = accent === GOLD || accent === GOLD_L ? '201,168,76' : '37,99,235';
  return (
    <section style={{ position: 'relative', overflow: 'hidden', paddingTop: '5rem' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: 0,
          background: 'linear-gradient(145deg, #060C10 0%, #0F172A 58%, #0A1428 100%)' }} />
        <div style={{ position: 'absolute', top: '6%', right: '-8%', width: '58%', height: '72%',
          background: `radial-gradient(ellipse, rgba(${rgb},0.12) 0%, transparent 65%)` }} />
        <div style={{ position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(rgba(${rgb},0.03) 1px, transparent 1px), ` +
                           `linear-gradient(90deg, rgba(${rgb},0.03) 1px, transparent 1px)`,
          backgroundSize: '56px 56px' }} />
      </div>
      <Container style={{ position: 'relative', paddingTop: 'clamp(3.5rem, 7vw, 5.5rem)',
        paddingBottom: 'clamp(3rem, 6vw, 4.5rem)' }}>
        <motion.div variants={stagger} initial="hidden" animate="visible">
          <motion.div variants={fadeIn}><Eyebrow color={accent}>{eyebrow}</Eyebrow></motion.div>
          <motion.h1 variants={fadeUp} style={{ fontFamily: DISPLAY,
            fontSize: 'clamp(2.4rem, 6.5vw, 5.4rem)', lineHeight: 0.94, letterSpacing: '0.02em',
            color: WHITE, marginBottom: '1.25rem' }}>
            {title}
          </motion.h1>
          <motion.div variants={fadeUp} style={{ fontSize: '1rem', lineHeight: 1.75,
            color: MUTED, maxWidth: '58ch' }}>
            {lede}
          </motion.div>
          {children && <motion.div variants={fadeUp} style={{ marginTop: '2rem' }}>{children}</motion.div>}
        </motion.div>
      </Container>
    </section>
  );
}
