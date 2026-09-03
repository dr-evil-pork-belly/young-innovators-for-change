'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  type Variants,
} from 'framer-motion';
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';

/**
 * The bar is white on a paper site, and the mark in it is Pip.
 *
 * It used to be a lucide `Zap` bolt in a gold box, which is a stock icon that
 * belongs to no one. The organization has a mascot, drawn in brand.py, printed
 * on the cover of every one of the thirteen books, and it appeared on exactly
 * one page of this website. It is the logo now.
 */

const INK      = '#16233A';
const BODY     = '#33415A';
const SUBTLE   = '#5A6880';
const CONNECT  = '#2D5BE3';
const CONNECT_INK = '#2149C7';
const SPARK    = '#FF7A3D';
const GROW     = '#17A67C';
const LINE     = '#DBE3EF';
const DISPLAY  = "'Baloo 2 Variable', 'Baloo 2', 'Trebuchet MS', Verdana, sans-serif";

const NAV_LINKS = [
  { label: 'Mission',   href: '/mission',   dropdown: null },
  {
    label: 'Curriculum', href: '/curriculum',
    dropdown: [
      { label: 'The full K–12 map',   href: '/curriculum',                  desc: 'Five subjects, twelve grades, honest status' },
      { label: 'The ten-year pathway', href: '/pathway',                    desc: 'Grades 3–12 · business school, uncompressed' },
      { label: 'Discrete Math',       href: '/programs/discrete-math',      desc: 'Grades 1–6 · six years, published and free' },
      { label: 'Leadership',          href: '/programs/leadership',         desc: 'Grades 3–12 · designed'          },
      { label: 'Venture Lab',         href: '/programs/venture-lab',        desc: 'Grades 3–12 · designed'          },
      { label: 'Financial Literacy',  href: '/programs/financial-literacy', desc: 'Grades 3–12 · designed'          },
      { label: 'After the program',   href: '/programs/alumni-network',     desc: 'What we commit to students' },
    ],
  },
  { label: 'Teachers',    href: '/teachers',    dropdown: null },
  { label: 'For Schools', href: '/for-schools', dropdown: null },
  { label: 'Resources',   href: '/resources',   dropdown: null },
  { label: 'Evidence',    href: '/impact',      dropdown: null },
  {
    label: 'About', href: '/about',
    dropdown: [
      { label: 'About us',   href: '/about',      desc: 'Who we are and what we have built' },
      { label: 'Governance', href: '/governance', desc: 'Registration, filings and open gaps' },
    ],
  },
];

const navVariants: Variants = {
  initial: { y: -80, opacity: 0 },
  animate: { y: 0,   opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const dropdownVariants: Variants = {
  initial: { opacity: 0, y: -8,  scale: 0.97 },
  animate: { opacity: 1, y: 0,   scale: 1,    transition: { duration: 0.22, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -6,  scale: 0.97, transition: { duration: 0.15, ease: 'easeIn'  } },
};

const mobileMenuVariants: Variants = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: 'auto', transition: { duration: 0.35, ease: 'easeOut' } },
  exit:    { opacity: 0, height: 0,      transition: { duration: 0.25, ease: 'easeIn'  } },
};

/** The three map colors from Week 17, which are the three brand colors. */
function BrandRule() {
  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0"
      style={{
        height: '3px',
        transformOrigin: 'left',
        background: `linear-gradient(90deg, ${CONNECT} 0 34%, ${SPARK} 34% 67%, ${GROW} 67% 100%)`,
      }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
    />
  );
}

function NavItem({ link }: { link: (typeof NAV_LINKS)[number] }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => link.dropdown && setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={link.href}
        className="group relative flex items-center gap-1 py-1 text-sm font-semibold transition-colors duration-200"
        style={{ color: BODY }}
        onMouseEnter={(e) => (e.currentTarget.style.color = CONNECT_INK)}
        onMouseLeave={(e) => (e.currentTarget.style.color = BODY)}
      >
        <span
          className="absolute -bottom-1.5 left-0 h-0.5 w-0 rounded-full transition-all duration-300 group-hover:w-full"
          style={{ background: CONNECT }}
        />
        {link.label}
        {link.dropdown && (
          <ChevronDown
            size={13}
            className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        )}
      </Link>

      {link.dropdown && (
        <AnimatePresence>
          {open && (
            <motion.div
              variants={dropdownVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute left-0 top-full mt-3 w-72 overflow-hidden"
              style={{
                borderRadius: '12px',
                border: `1px solid ${LINE}`,
                background: '#FFFFFF',
                boxShadow: '0 18px 44px rgba(22,35,58,0.14)',
              }}
            >
              <div style={{ height: '3px', background: `linear-gradient(90deg, ${CONNECT} 0 34%, ${SPARK} 34% 67%, ${GROW} 67% 100%)` }} />
              <ul className="py-2">
                {link.dropdown.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group/item flex flex-col px-4 py-2.5 transition-colors duration-150"
                      style={{ color: INK }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#F2F6FE')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <span className="flex items-center justify-between text-sm font-semibold">
                        {item.label}
                        <ArrowUpRight size={13} className="opacity-0 group-hover/item:opacity-100 transition-opacity" />
                      </span>
                      <span className="mt-0.5 text-xs" style={{ color: SUBTLE }}>{item.desc}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY }                 = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => setScrolled(latest > 24));

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <motion.header
        variants={navVariants}
        initial="initial"
        animate="animate"
        className="fixed inset-x-0 top-0 z-50 transition-shadow duration-500"
        style={scrolled ? { boxShadow: '0 6px 20px rgba(22,35,58,0.08)' } : {}}
      >
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{ background: scrolled ? 'rgba(255,255,255,0.97)' : '#FFFFFF',
            backdropFilter: 'blur(12px)' }}
        />

        <nav
          className="relative mx-auto flex h-18 max-w-7xl items-center justify-between px-6 lg:px-10"
          style={{ height: '4.5rem' }}
          aria-label="Primary navigation"
        >
          {/* Logo: Pip, the mascot on the cover of every book. */}
          <Link href="/" className="group relative flex items-center gap-2.5 select-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/pip/pip-mark.svg" alt="" aria-hidden width={36} height={36}
              style={{ width: '36px', height: '36px', display: 'block' }} />
            <div className="flex flex-col leading-none">
              <span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: '1.15rem',
                letterSpacing: '-0.01em', color: INK }}>
                Young Innovators
              </span>
              <span style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: '0.78rem',
                letterSpacing: '0.16em', color: CONNECT_INK, textTransform: 'uppercase' }}>
                for change
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-7 xl:flex">
            {NAV_LINKS.map((link) => <NavItem key={link.href} link={link} />)}
          </div>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-4 xl:flex">
            <Link href="/partner" className="btn-primary">
              Partner with us
              <ArrowUpRight size={14} />
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="flex h-10 w-10 items-center justify-center transition-all duration-200 xl:hidden"
            style={{
              borderRadius: '8px',
              border: `1px solid ${LINE}`,
              background: mobileOpen ? '#F2F6FE' : 'transparent',
              color: mobileOpen ? CONNECT_INK : INK,
            }}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X size={19} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu size={19} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </nav>

        <BrandRule />
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-x-0 z-40 overflow-hidden xl:hidden"
            style={{
              top: '4.5rem',
              borderBottom: `1px solid ${LINE}`,
              background: '#FFFFFF',
              maxHeight: 'calc(100dvh - 4.5rem)',
              boxShadow: '0 18px 44px rgba(22,35,58,0.12)',
            }}
          >
            <div className="overflow-y-auto px-6 pb-8 pt-2">
              <ul className="flex flex-col">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.08, duration: 0.28 }}
                    style={{ borderBottom: `1px solid ${LINE}` }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMobile}
                      className="flex items-center justify-between py-3.5 transition-colors duration-150"
                      style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: '1.2rem', color: INK }}
                    >
                      {link.label}
                      <ArrowUpRight size={16} style={{ color: SUBTLE }} />
                    </Link>

                    {link.dropdown && (
                      <ul className="mb-3 ml-1 space-y-1 pl-4" style={{ borderLeft: `2px solid ${LINE}` }}>
                        {link.dropdown.map((sub) => (
                          <li key={sub.href}>
                            <Link
                              href={sub.href}
                              onClick={closeMobile}
                              className="block py-1.5 text-sm transition-colors"
                              style={{ color: BODY }}
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-3">
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <Link href="/partner" onClick={closeMobile} className="btn-primary w-full justify-center">
                    Partner with us <ArrowUpRight size={14} />
                  </Link>
                </motion.div>
              </div>

              <p className="label-eyebrow mt-8 text-center" style={{ color: SUBTLE }}>
                Free curriculum · K–12 · California 501(c)(3)
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
