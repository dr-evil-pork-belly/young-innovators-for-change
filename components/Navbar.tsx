'use client';
// components/Navbar.tsx
// Sticky dark-mode navbar for Young Innovators for Change
// Uses: Tailwind CSS Â· Framer Motion Â· Lucide React

'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowUpRight, Zap } from 'lucide-react';

// --------------------------------------------------------------------------
// Nav link data
// --------------------------------------------------------------------------
const NAV_LINKS = [
  {
    label: 'Mission',
    href: '/mission',
    dropdown: null,
  },
  {
    label: 'Programs',
    href: '/programs',
    dropdown: [
      { label: 'Leadership Academy',   href: '/programs/leadership',   desc: 'Building tomorrows CEOs today'       },
      { label: 'Venture Lab',          href: '/programs/venture-lab',  desc: 'From idea to pitch in 8 weeks'        },
      { label: 'Financial Literacy',   href: '/programs/finance',      desc: 'Money mastery for young minds'        },
      { label: 'Alumni Network',       href: '/programs/alumni',       desc: 'Lifelong community & mentorship'      },
    ],
  },
  {
    label: 'Impact',
    href: '/impact',
    dropdown: null,
  },
  {
    label: 'About',
    href: '/about',
    dropdown: null,
  },
] as const;

// --------------------------------------------------------------------------
// Animation variants
// --------------------------------------------------------------------------
const navVariants = {
  initial: { y: -80, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const dropdownVariants = {
  initial: { opacity: 0, y: -8, scale: 0.97 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.97,
    transition: { duration: 0.15, ease: 'easeIn' },
  },
};

const mobileMenuVariants = {
  initial: { opacity: 0, height: 0 },
  animate: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.25, ease: 'easeIn' },
  },
};

// --------------------------------------------------------------------------
// Subcomponents
// --------------------------------------------------------------------------

/** Gold accent rule that animates in on load */
function GoldRule() {
  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.5)] to-transparent"
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: 'center' }}
    />
  );
}

/** Desktop nav link â€” with optional dropdown */
function NavItem({
  link,
}: {
  link: (typeof NAV_LINKS)[number];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => link.dropdown && setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={link.href}
        className="group relative flex items-center gap-1 py-1 text-[0.8125rem] font-medium tracking-[0.06em] uppercase text-[#A8A29E] transition-colors duration-200 hover:text-[#F0EDEA]"
        aria-haspopup={!!link.dropdown}
        aria-expanded={open}
      >
        {/* Underline accent on hover */}
        <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-gradient-to-r from-[#C9A84C] to-[#E8C050] transition-all duration-300 group-hover:w-full" />
        {link.label}
        {link.dropdown && (
          <ChevronDown
            size={12}
            className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        )}
      </Link>

      {/* Dropdown panel */}
      {link.dropdown && (
        <AnimatePresence>
          {open && (
            <motion.div
              variants={dropdownVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute left-0 top-full mt-3 w-64 overflow-hidden rounded-[2px] border border-[rgba(201,168,76,0.12)] bg-[rgba(17,17,19,0.96)] shadow-[0_20px_60px_rgba(0,0,0,0.7)] backdrop-blur-xl"
            >
              {/* Top gold accent line */}
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.6)] to-transparent" />

              <ul className="py-2">
                {link.dropdown.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group/item flex flex-col px-4 py-3 transition-colors duration-150 hover:bg-[rgba(201,168,76,0.06)]"
                    >
                      <span className="flex items-center justify-between text-[0.8125rem] font-medium text-[#E0DDD8] transition-colors group-hover/item:text-[#C9A84C]">
                        {item.label}
                        <ArrowUpRight size={12} className="opacity-0 transition-opacity group-hover/item:opacity-100" />
                      </span>
                      <span className="mt-0.5 text-[0.7rem] text-[#6B6664]">
                        {item.desc}
                      </span>
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

// --------------------------------------------------------------------------
// Main Navbar Component
// --------------------------------------------------------------------------
export default function Navbar() {
  const [scrolled, setScrolled]         = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const { scrollY }                     = useScroll();

  // Track scroll state for elevated shadow
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 24);
  });

  // Lock body scroll when mobile menu is open
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
        className={`
          fixed inset-x-0 top-0 z-50
          transition-shadow duration-500
          ${scrolled
            ? 'shadow-[0_1px_0_rgba(201,168,76,0.1),0_8px_32px_rgba(0,0,0,0.7)]'
            : ''
          }
        `}
      >
        {/* ---- Backdrop surface ---- */}
        <div
          className={`
            absolute inset-0
            bg-[rgba(10,10,11,0.90)] backdrop-blur-[20px] saturate-150
            transition-all duration-500
            ${scrolled ? 'bg-[rgba(7,7,8,0.96)]' : ''}
          `}
          aria-hidden="true"
        />

        {/* ---- Content ---- */}
        <nav
          className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-12"
          aria-label="Primary navigation"
        >

          {/* ---- Logo ---- */}
          <Link
            href="/"
            className="group relative flex items-center gap-3 no-select"
            aria-label="Young Innovators for Change â€” Home"
          >
            {/* Icon badge */}
            <div className="relative flex h-9 w-9 items-center justify-center rounded-[2px] border border-[rgba(201,168,76,0.25)] bg-[rgba(201,168,76,0.08)] transition-all duration-300 group-hover:border-[rgba(201,168,76,0.5)] group-hover:bg-[rgba(201,168,76,0.12)] group-hover:shadow-[0_0_16px_rgba(201,168,76,0.2)]">
              <Zap
                size={18}
                className="text-[#C9A84C] transition-transform duration-300 group-hover:scale-110"
                fill="rgba(201,168,76,0.2)"
              />
            </div>

            {/* Wordmark */}
            <div className="flex flex-col leading-none">
              <span
                className="font-display text-[1.05rem] tracking-[0.12em] text-[#F0EDEA] transition-colors duration-200 group-hover:text-white"
                style={{ fontFamily: 'var(--font-display, "Bebas Neue", Impact, sans-serif)' }}
              >
                YOUNG INNOVATORS
              </span>
              <div className="flex items-center gap-2">
                <span className="h-[1px] w-full flex-1 bg-gradient-to-r from-[#C9A84C] to-transparent" />
                <span
                  className="font-display text-[0.85rem] tracking-[0.2em] text-[#C9A84C]"
                  style={{ fontFamily: 'var(--font-display, "Bebas Neue", Impact, sans-serif)' }}
                >
                  FOR CHANGE
                </span>
              </div>
            </div>
          </Link>

          {/* ---- Desktop Nav Links ---- */}
          <div className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <NavItem key={link.href} link={link} />
            ))}
          </div>

          {/* ---- Desktop CTA ---- */}
          <div className="hidden items-center gap-4 lg:flex">
            {/* Secondary â€” Login */}
            <Link
              href="/login"
              className="btn-ghost text-[0.75rem] px-4 py-[0.6rem]"
            >
              Log In
            </Link>

            {/* Primary â€” Partner Now */}
            <Link
              href="/partner"
              className="btn-gold text-[0.75rem] group"
            >
              Partner Now
              <ArrowUpRight
                size={13}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          {/* ---- Mobile Hamburger ---- */}
          <button
            className="relative flex h-10 w-10 items-center justify-center rounded-[2px] border border-[rgba(201,168,76,0.12)] bg-transparent text-[#A8A29E] transition-all duration-200 hover:border-[rgba(201,168,76,0.3)] hover:text-[#C9A84C] lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={18} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </nav>

        {/* ---- Animated bottom rule ---- */}
        <GoldRule />
      </motion.header>

      {/* ================================================================
          Mobile Menu Overlay
      ================================================================= */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-x-0 top-20 z-40 overflow-hidden border-b border-[rgba(201,168,76,0.12)] bg-[rgba(7,7,8,0.98)] backdrop-blur-[24px] lg:hidden"
            style={{ maxHeight: 'calc(100dvh - 5rem)' }}
          >
            <div className="overflow-y-auto px-6 pb-8 pt-4">

              {/* Mobile nav links */}
              <ul className="flex flex-col divide-y divide-[rgba(201,168,76,0.06)]">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.1, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMobile}
                      className="flex items-center justify-between py-4 font-display text-xl tracking-[0.1em] text-[#A8A29E] transition-colors duration-150 hover:text-[#C9A84C]"
                      style={{ fontFamily: 'var(--font-display, "Bebas Neue", Impact, sans-serif)' }}
                    >
                      {link.label.toUpperCase()}
                      <ArrowUpRight size={16} className="opacity-40" />
                    </Link>

                    {/* Mobile sub-links */}
                    {link.dropdown && (
                      <ul className="mb-3 ml-2 space-y-1 border-l border-[rgba(201,168,76,0.12)] pl-4">
                        {link.dropdown.map((sub) => (
                          <li key={sub.href}>
                            <Link
                              href={sub.href}
                              onClick={closeMobile}
                              className="block py-1.5 text-[0.8125rem] text-[#6B6664] transition-colors hover:text-[#C9A84C]"
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

              {/* Mobile CTAs */}
              <div className="mt-6 flex flex-col gap-3">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32, duration: 0.35 }}
                >
                  <Link
                    href="/partner"
                    onClick={closeMobile}
                    className="btn-gold w-full justify-center text-[0.8125rem]"
                  >
                    Partner Now
                    <ArrowUpRight size={14} />
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.38, duration: 0.35 }}
                >
                  <Link
                    href="/login"
                    onClick={closeMobile}
                    className="btn-ghost w-full justify-center text-[0.8125rem]"
                  >
                    Log In
                  </Link>
                </motion.div>
              </div>

              {/* Footer micro-copy */}
              <motion.p
                className="label-eyebrow mt-8 opacity-30 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 0.45 }}
              >
                Elite MBA Â· For Kids Â· For Change
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
