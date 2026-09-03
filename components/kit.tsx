'use client';

/**
 * Shared tokens and primitives.
 *
 * Before this file, every page redeclared its own color constants and its own
 * FadeIn. That is why the same eight colors appeared in eight places and why
 * stale content could hide in plain sight. New pages import from here.
 *
 * ── The repaint, and why the old names are still here ──────────────────────
 *
 * This site used to be near-black with an antique gold. The books it gives
 * away are Baloo 2 and Public Sans printed in blue, orange, green and gold on
 * white paper. The two shared no color and no typeface, so nothing about the
 * site said it came from the same organization as the thing you downloaded
 * from it. Everything below is now the palette in brand/brand.py.
 *
 * The old constant names (WHITE, MUTED, GOLD, ROYAL_L, SLATE_3) are kept and
 * repointed rather than renamed. They are named 824 times across seventeen
 * page files, and a rename in the same pass as a repaint would have made every
 * one of those diffs unreadable. Each one now holds the light-ground color
 * that plays the role its name used to play, and each is stated in terms of
 * the brand token underneath it.
 *
 * ── The one rule ───────────────────────────────────────────────────────────
 *
 * There are two tiers of every hue, and they are not interchangeable.
 *
 *   FILL tier   CONNECT, SPARK, GROW, SUN. Bars, chips, dots, icons, rules,
 *               illustration. Never a word: SPARK measures 2.4:1 as text on
 *               paper, GROW 2.9:1 and SUN 1.5:1.
 *   TEXT tier   CONNECT_INK, SPARK_INK, GROW_INK, SUN_INK. Same hues, darkened
 *               until they clear 4.5:1 on paper, on white and on the band.
 *
 * Every constant a page can put in a `color:` is in the text tier. The old
 * site had thirty places that set text to SLATE_3, which was #334155 on a
 * #0F172A ground: 1.7:1, invisible. Several of them were the provenance lines
 * under the facts on the governance page, which is the page whose entire
 * purpose is that a stranger can check the claim.
 */

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';

// ── Brand tokens, from brand/brand.py ─────────────────────────────────────────
export const INK     = '#16233A';  // deep blue-black: outlines, body type
export const CONNECT = '#2D5BE3';  // primary blue: links, limbs, headings
export const SPARK   = '#FF7A3D';  // orange: the idea, the accent that moves
export const GROW    = '#17A67C';  // green: growth, correctness, "yes"
export const SUN     = '#FFC44D';  // gold: celebration, certificates
export const PAPER   = '#F5F7FA';  // cool light ground

// Text-safe darkenings of the same four hues.
export const CONNECT_INK = '#2149C7';
export const SPARK_INK   = '#A8380A';
export const GROW_INK    = '#0C6B4F';
export const SUN_INK     = '#7A5100';

// Grounds and lines.
export const CARD_BG = '#FFFFFF';
export const BAND    = '#E8EEF7';
export const LINE    = '#DBE3EF';
export const LINE_2  = '#C3CFE2';

// Type.
export const BODY    = '#33415A';  //  9.6:1 on paper
export const SUBTLE  = '#5A6880';  //  5.3:1 on paper

// The single warning hue, for the places that say a thing is missing.
export const ALERT     = '#B42318';
export const ALERT_TINT = 'rgba(180,35,24,0.07)';
export const ALERT_LINE = 'rgba(180,35,24,0.25)';

// ── Palette (compatibility names) ─────────────────────────────────────────────
// Each of these used to be a color on a dark ground. Each now holds the
// light-ground color that plays the same role. Anything that can end up in a
// `color:` is text-safe.
export const SLATE   = PAPER;      // was the page ground
export const SLATE_2 = CARD_BG;    // was the card ground
export const SLATE_3 = SUBTLE;     // was dim type at 1.7:1; now 5.3:1
export const MUTED   = BODY;       // was body copy on dark
export const WHITE   = INK;        // was primary type on dark
export const OBSIDIAN = INK;       // was the darkest ground

export const GOLD    = SPARK_INK;  // the warm accent, when it carries a word
export const GOLD_L  = SUN_INK;
export const ROYAL   = CONNECT_INK;
export const ROYAL_L = CONNECT;
export const ROYAL_XL = CONNECT_INK;
export const GREEN   = GROW_INK;
export const GREEN_L = GROW_INK;

export const DISPLAY = "'Baloo 2 Variable', 'Baloo 2', 'Trebuchet MS', Verdana, sans-serif";
export const SANS    = "'Public Sans Variable', 'Public Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif";

/**
 * What a status means, and the one color it is allowed to be.
 *
 * On the old site a number was blue on one page, gold on the next and green on
 * a third, chosen by whoever wrote that page. Five stat figures sat in a row on
 * the impact page in three different colors that meant nothing. Color now
 * carries exactly one meaning and it is this one.
 */
export const STATUS = {
  published: { fill: GROW,    ink: GROW_INK },     // written, downloadable, done
  designed:  { fill: SUN,     ink: SUN_INK },      // syllabus complete, not written
  planned:   { fill: LINE_2,  ink: SUBTLE },       // on the roadmap, not started
  ask:       { fill: SPARK,   ink: SPARK_INK },    // the thing we are asking for
  link:      { fill: CONNECT, ink: CONNECT_INK },  // structure and navigation
} as const;

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
    <div style={{ width: '100%', maxWidth: '78rem', marginLeft: 'auto', marginRight: 'auto',
      paddingLeft: PAD_X, paddingRight: PAD_X, ...style }}>
      {children}
    </div>
  );
}

// ── Building blocks ───────────────────────────────────────────────────────────

export function Eyebrow({ children, color = CONNECT_INK }: { children: React.ReactNode; color?: string }) {
  return (
    <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em',
      textTransform: 'uppercase' as const, color, marginBottom: '0.6rem' }}>
      {children}
    </p>
  );
}

export function Title({ children, size = 'clamp(1.9rem, 3.6vw, 3rem)' }: {
  children: React.ReactNode; size?: string;
}) {
  return (
    <h2 style={{ fontFamily: DISPLAY, fontSize: size, fontWeight: 800, lineHeight: 1.06,
      letterSpacing: '-0.01em', color: INK }}>
      {children}
    </h2>
  );
}

/**
 * A white card with a colored rule across the top. The rule is the only place
 * the fill tier of a hue appears in a card, which is what keeps a page of
 * fifteen cards from turning into a page of fifteen colors.
 */
export function Card({ children, accent = CONNECT, pad = '1.5rem' }: {
  children: React.ReactNode; accent?: string; pad?: string;
}) {
  return (
    <div style={{ background: CARD_BG, border: `1px solid ${LINE}`,
      borderRadius: '10px', overflow: 'hidden', height: '100%', display: 'flex',
      flexDirection: 'column', boxShadow: '0 1px 2px rgba(22,35,58,0.04)' }}>
      <div style={{ height: '3px', background: accent }} />
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
      gap: '1.25rem', padding: '0.9rem 0', borderBottom: `1px solid ${LINE}` }}>
      <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em',
        textTransform: 'uppercase' as const, color: SUBTLE, paddingTop: '2px' }}>{label}</div>
      <div>
        <div style={{ fontSize: '0.95rem', color: INK, fontWeight: 600 }}>{value}</div>
        {source && (
          <div style={{ fontSize: '0.78rem', color: SUBTLE, marginTop: '3px' }}>{source}</div>
        )}
      </div>
    </div>
  );
}

/**
 * `accent` is accepted and ignored. Seventeen page files pass it, and on the
 * dark site it tinted the section's hairline borders a different hue per page,
 * which is exactly the drift the palette rule above exists to stop. Sections
 * alternate paper and band now, and nothing else.
 */
export function Section({ id, children, tinted = false }: {
  id?: string; children: React.ReactNode; tinted?: boolean; accent?: string;
}) {
  return (
    <section
      id={id}
      style={tinted ? {
        background: BAND,
        borderTop: `1px solid ${LINE}`,
        borderBottom: `1px solid ${LINE}`,
      } : { background: PAPER }}
    >
      <Container style={{ paddingTop: PAD_Y, paddingBottom: PAD_Y }}>{children}</Container>
    </section>
  );
}

/**
 * An inverted slab, for the one or two moments on a page that should stop the
 * scroll: a closing ask, a footer note. Buttons inside it flip automatically
 * through the `.on-ink` rules in globals.css.
 */
export function InkSlab({ children, style }: {
  children: React.ReactNode; style?: React.CSSProperties;
}) {
  return (
    <div className="on-ink" style={{ background: INK, color: PAPER, borderRadius: '14px',
      padding: 'clamp(1.75rem, 4vw, 3rem)', ...style }}>
      {children}
    </div>
  );
}

/** Page shell: paper ground, correct type. */
export function Page({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: PAPER, minHeight: '100vh', color: BODY, fontFamily: SANS }}>
      {children}
    </div>
  );
}

/**
 * The three-coloring of a map, which is Week 17 of the Grade 2 book and the
 * reason the brand has three colors. Drawn rather than photographed because
 * the organization has no photographs it is entitled to use, and drawn from
 * the curriculum rather than from stock because that is what it has.
 *
 * Decorative only: aria-hidden, and nothing it shows is stated anywhere as a
 * claim.
 */
export function MapMotif({ size = 460, opacity = 1 }: { size?: number; opacity?: number }) {
  const V: [number, number, string][] = [
    [ 60,  52, CONNECT], [168,  30, SPARK], [268,  86, GROW],
    [ 28, 158, GROW],    [140, 132, SUN],   [252, 196, CONNECT],
    [ 96, 232, SPARK],   [196, 268, GROW],  [ 22, 268, CONNECT],
  ];
  const E: [number, number][] = [
    [0,1],[1,2],[0,4],[1,4],[2,4],[2,5],[0,3],[3,4],[3,6],[4,6],[4,5],[5,7],[6,7],[3,8],[6,8],
  ];
  return (
    <svg viewBox="0 0 300 300" width={size} height={size} aria-hidden="true"
      style={{ display: 'block', maxWidth: '100%', height: 'auto', opacity }}>
      {E.map(([a, b], i) => (
        <line key={i} x1={V[a][0]} y1={V[a][1]} x2={V[b][0]} y2={V[b][1]}
          stroke={INK} strokeWidth={3} strokeLinecap="round" opacity={0.35} />
      ))}
      {V.map(([x, y, c], i) => (
        <circle key={i} cx={x} cy={y} r={15} fill={c} stroke={INK} strokeWidth={3} />
      ))}
    </svg>
  );
}

/**
 * Standard page opener.
 *
 * The old hero was a left-aligned column of text inside a 1280px container with
 * nothing at all to its right, on every page, so a third of the first screen
 * was empty on all seventeen. It is a two-column grid now: words on the left,
 * and on the right either whatever the page passes as `art` or, when a page
 * passes none, the map.
 */
export function Hero({ eyebrow, title, lede, accent = CONNECT, children, art }: {
  eyebrow: string; title: React.ReactNode; lede: React.ReactNode;
  accent?: string; children?: React.ReactNode; art?: React.ReactNode;
}) {
  const eyebrowInk =
    accent === SPARK || accent === SPARK_INK ? SPARK_INK :
    accent === GROW  || accent === GROW_INK  ? GROW_INK  :
    accent === SUN   || accent === SUN_INK   ? SUN_INK   : CONNECT_INK;
  const rule =
    accent === SPARK || accent === SPARK_INK ? SPARK :
    accent === GROW  || accent === GROW_INK  ? GROW  :
    accent === SUN   || accent === SUN_INK   ? SUN   : CONNECT;

  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: CARD_BG,
      borderBottom: `1px solid ${LINE}` }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `radial-gradient(${LINE} 1.2px, transparent 1.2px)`,
        backgroundSize: '22px 22px', opacity: 0.7 }} />
      <div aria-hidden style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '4px',
        background: `linear-gradient(90deg, ${CONNECT} 0 34%, ${SPARK} 34% 67%, ${GROW} 67% 100%)` }} />
      <Container style={{ position: 'relative', paddingTop: 'clamp(3rem, 6vw, 4.75rem)',
        paddingBottom: 'clamp(2.75rem, 5vw, 4rem)' }}>
        <div style={{ display: 'grid', gap: 'clamp(2rem, 5vw, 3.5rem)',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, auto)', alignItems: 'center' }}>
          <motion.div variants={stagger} initial="hidden" animate="visible" style={{ minWidth: 0 }}>
            <motion.div variants={fadeIn}><Eyebrow color={eyebrowInk}>{eyebrow}</Eyebrow></motion.div>
            <motion.h1 variants={fadeUp} style={{ fontFamily: DISPLAY, fontWeight: 800,
              fontSize: 'clamp(2.15rem, 4.6vw, 3.9rem)', lineHeight: 1.04, letterSpacing: '-0.015em',
              color: INK, marginBottom: '1.1rem', maxWidth: '18ch' }}>
              {title}
            </motion.h1>
            <motion.div variants={fadeUp} style={{ fontSize: '1.02rem', lineHeight: 1.72,
              color: BODY, maxWidth: '60ch' }}>
              {lede}
            </motion.div>
            {children && <motion.div variants={fadeUp} style={{ marginTop: '1.9rem' }}>{children}</motion.div>}
            <motion.div variants={fadeIn} aria-hidden style={{ marginTop: '2rem', height: '4px',
              width: '84px', borderRadius: '2px', background: rule }} />
          </motion.div>
          <motion.div variants={fadeIn} initial="hidden" animate="visible"
            className="hero-art" style={{ justifySelf: 'end' }}>
            {art ?? <MapMotif size={380} opacity={0.95} />}
          </motion.div>
        </div>
      </Container>
      <style>{`
        @media (max-width: 900px) {
          .hero-art { display: none; }
        }
      `}</style>
    </section>
  );
}
