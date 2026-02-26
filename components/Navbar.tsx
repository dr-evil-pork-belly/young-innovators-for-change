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
import { Menu, X, ChevronDown, ArrowUpRight, Zap } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Mission',   href: '/mission',   dropdown: null },
  {
    label: 'Programs', href: '/programs',
    dropdown: [
      { label: 'Leadership', href: '/programs/leadership',  desc: 'Building tomorrows CEOs today'     },
      { label: 'Venture Lab',        href: '/programs/venture-lab', desc: 'From idea to pitch in 8 weeks'    },
      { label: 'Financial Literacy', href: '/programs/financial-literacy',     desc: 'Money mastery for young minds'    },
      { label: 'Alumni Network',     href: '/programs/alumni',      desc: 'Lifelong community and mentorship' },
    ],
  },
  { label: 'Impact', href: '/impact', dropdown: null },
  { label: 'About',  href: '/about',  dropdown: null },
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

function GoldRule() {
  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 h-px"
      style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)' }}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
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
        className="group relative flex items-center gap-1 py-1 text-xs font-medium tracking-widest uppercase transition-colors duration-200"
        style={{ color: '#A8A29E' }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#F0EDEA')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#A8A29E')}
      >
        <span
          className="absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full"
          style={{ background: 'linear-gradient(90deg, #C9A84C, #E8C050)' }}
        />
        {link.label}
        {link.dropdown && (
          <ChevronDown
            size={12}
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
              className="absolute left-0 top-full mt-3 w-64 overflow-hidden"
              style={{
                borderRadius: '2px',
                border: '1px solid rgba(201,168,76,0.12)',
                background: 'rgba(17,17,19,0.97)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.6), transparent)' }} />
              <ul className="py-2">
                {link.dropdown.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group/item flex flex-col px-4 py-3 transition-colors duration-150"
                      style={{ color: '#E0DDD8' }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(201,168,76,0.06)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <span className="flex items-center justify-between text-xs font-medium">
                        {item.label}
                        <ArrowUpRight size={12} className="opacity-0 group-hover/item:opacity-100 transition-opacity" />
                      </span>
                      <span className="mt-0.5 text-xs" style={{ color: '#6B6664' }}>{item.desc}</span>
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
        style={scrolled ? { boxShadow: '0 1px 0 rgba(201,168,76,0.1), 0 8px 32px rgba(0,0,0,0.7)' } : {}}
      >
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: scrolled ? 'rgba(7,7,8,0.97)' : 'rgba(10,10,11,0.90)',
            backdropFilter: 'blur(20px)',
          }}
        />

        <nav
          className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-12"
          aria-label="Primary navigation"
        >
          {/* Logo */}
          <Link href="/" className="group relative flex items-center gap-3 select-none">
            <div
              className="flex h-9 w-9 items-center justify-center transition-all duration-300"
              style={{
                borderRadius: '2px',
                border: '1px solid rgba(201,168,76,0.25)',
                background: 'rgba(201,168,76,0.08)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '1px solid rgba(201,168,76,0.5)';
                e.currentTarget.style.background = 'rgba(201,168,76,0.14)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = '1px solid rgba(201,168,76,0.25)';
                e.currentTarget.style.background = 'rgba(201,168,76,0.08)';
              }}
            >
              <Zap size={18} color="#C9A84C" fill="rgba(201,168,76,0.2)" />
            </div>

            <div className="flex flex-col leading-none">
              <span style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: '1.05rem', letterSpacing: '0.12em', color: '#F0EDEA' }}>
                YOUNG INNOVATORS
              </span>
              <div className="flex items-center gap-2">
                <span className="h-px flex-1" style={{ background: 'linear-gradient(90deg, #C9A84C, transparent)' }} />
                <span style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: '0.85rem', letterSpacing: '0.2em', color: '#C9A84C' }}>
                  FOR CHANGE
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => <NavItem key={link.href} link={link} />)}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-4 lg:flex">
            <Link href="/login" className="btn-ghost">Log In</Link>
            <Link href="/partner" className="btn-gold">
              Partner Now
              <ArrowUpRight size={13} />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex h-10 w-10 items-center justify-center transition-all duration-200 lg:hidden"
            style={{
              borderRadius: '2px',
              border: '1px solid rgba(201,168,76,0.12)',
              background: 'transparent',
              color: mobileOpen ? '#C9A84C' : '#A8A29E',
            }}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X size={18} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </nav>

        <GoldRule />
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-x-0 top-20 z-40 overflow-hidden lg:hidden"
            style={{
              borderBottom: '1px solid rgba(201,168,76,0.12)',
              background: 'rgba(7,7,8,0.98)',
              backdropFilter: 'blur(24px)',
              maxHeight: 'calc(100dvh - 5rem)',
            }}
          >
            <div className="overflow-y-auto px-6 pb-8 pt-4">
              <ul className="flex flex-col" style={{ borderTop: '1px solid rgba(201,168,76,0.06)' }}>
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.1, duration: 0.3 }}
                    style={{ borderBottom: '1px solid rgba(201,168,76,0.06)' }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMobile}
                      className="flex items-center justify-between py-4 transition-colors duration-150"
                      style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: '1.25rem', letterSpacing: '0.1em', color: '#A8A29E' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A84C')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#A8A29E')}
                    >
                      {link.label.toUpperCase()}
                      <ArrowUpRight size={16} style={{ opacity: 0.4 }} />
                    </Link>

                    {link.dropdown && (
                      <ul className="mb-3 ml-2 space-y-1 pl-4" style={{ borderLeft: '1px solid rgba(201,168,76,0.12)' }}>
                        {link.dropdown.map((sub) => (
                          <li key={sub.href}>
                            <Link
                              href={sub.href}
                              onClick={closeMobile}
                              className="block py-1.5 text-xs transition-colors"
                              style={{ color: '#6B6664' }}
                              onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A84C')}
                              onMouseLeave={(e) => (e.currentTarget.style.color = '#6B6664')}
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
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}>
                  <Link href="/partner" onClick={closeMobile} className="btn-gold w-full justify-center">
                    Partner Now <ArrowUpRight size={14} />
                  </Link>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}>
                  <Link href="/login" onClick={closeMobile} className="btn-ghost w-full justify-center">
                    Log In
                  </Link>
                </motion.div>
              </div>

              <motion.p
                className="label-eyebrow mt-8 text-center"
                style={{ opacity: 0.3 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 0.45 }}
              >
                Elite MBA · For Kids · For Change
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}