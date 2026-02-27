'use client';

import { useRef, useState } from 'react';
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
  type Variants,
} from 'framer-motion';
import {
  ArrowUpRight, ChevronRight, Globe,
  GraduationCap, Handshake, Rocket, Crown,
  CheckCircle, Award, Heart,
  Users, BookOpen, Briefcase,
  Sparkles, DollarSign,
} from 'lucide-react';
import Link from 'next/link';

const SLATE   = '#0F172A';
const SLATE_2 = '#1E293B';
const SLATE_3 = '#334155';
const MUTED   = '#94A3B8';
const WHITE   = '#F8FAFC';
const ROYAL_L = '#3B82F6';
const GOLD    = '#C9A84C';
const GOLD_L  = '#E8C94F';
const GOLD_D  = '#A07830';

const DISPLAY = "'Bebas Neue', Impact, sans-serif";
const SANS    = "'DM Sans', system-ui, sans-serif";
const SERIF   = "'Playfair Display', Georgia, serif";

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
};
const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.55 } },
};
const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function FadeIn({ children, delay = 0, className = '', v = fadeUp }: {
  children: React.ReactNode; delay?: number; className?: string; v?: Variants;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div ref={ref} variants={v} initial="hidden"
      animate={inView ? 'visible' : 'hidden'} transition={{ delay }} className={className}>
      {children}
    </motion.div>
  );
}

const ALUMNI = [
  { initials:'MR', name:'Marcus R.',    cohort:'2022 · Glendora',   now:'Stanford CS, Class of 2028',        type:'University',  accent:ROYAL_L, icon:GraduationCap, venture:'Founded campus EdTech startup'    },
  { initials:'AT', name:'Aisha T.',     cohort:'2022 · Glendora',   now:'YIC Mentor, Lead Instructor',       type:'Mentor',      accent:GOLD,    icon:Handshake,     venture:'Returned to mentor 3 cohorts'    },
  { initials:'JS', name:'Jordan S.',    cohort:'2023 · Pasadena',   now:'Accepted: MIT, NYU, UC Berkeley',   type:'University',  accent:ROYAL_L, icon:GraduationCap, venture:'Built FreshRoute food co-op'     },
  { initials:'PE', name:'Priya E.',     cohort:'2023 · Glendora',   now:'Founder, ReVerde Labs',             type:'Founder',     accent:GOLD,    icon:Rocket,        venture:'$8K pre-seed raised at age 16'  },
  { initials:'DK', name:'David K.',     cohort:'2023 · Pasadena',   now:'Goldman Sachs Summer Analyst',      type:'Career',      accent:ROYAL_L, icon:Briefcase,     venture:'First YIC corporate placement'  },
  { initials:'SM', name:'Sofia M.',     cohort:'2022 · Glendora',   now:'YIC Advisory Council Member',      type:'Mentor',      accent:GOLD,    icon:Crown,         venture:'Youngest council member, age 17' },
  { initials:'LC', name:'Liam C.',      cohort:'2024 · LA Unified', now:'Gates Scholarship Finalist',       type:'Scholarship', accent:ROYAL_L, icon:Award,         venture:'TutorBlock — 47 beta users'     },
  { initials:'NW', name:'Nadia W.',     cohort:'2024 · LA Unified', now:'First-Gen College Student, USC',   type:'University',  accent:GOLD,    icon:GraduationCap, venture:'Presented to 3 city officials'   },
  { initials:'RO', name:'Rohan O.',     cohort:'2023 · Pasadena',   now:'YIC Lead Instructor (part-time)',   type:'Mentor',      accent:ROYAL_L, icon:Handshake,     venture:'PixelMentor — 12 active mentors' },
  { initials:'EV', name:'Elena V.',     cohort:'2024 · Glendora',   now:'Barnard College, Early Decision',  type:'University',  accent:GOLD,    icon:GraduationCap, venture:'Thesis: EQ in K-12 education'   },
  { initials:'TN', name:'Tyler N.',     cohort:'2022 · Glendora',   now:'Seed Investor, age 19',            type:'Founder',     accent:ROYAL_L, icon:DollarSign,    venture:'Invested in 2 YIC alumni startups'},
  { initials:'KP', name:'Kezia P.',     cohort:'2024 · LA Unified', now:'Harvard HPAIR Delegate',           type:'Scholarship', accent:GOLD,    icon:Globe,         venture:'International business delegate' },
];

const TYPE_LABEL: Record<string, string> = {
  University: 'University', Mentor: 'YIC Mentor', Founder: 'Founder',
  Career: 'Career', Scholarship: 'Scholarship',
};

const DESTINATIONS = [
  { city:'Stanford, CA',    x:8,  y:38, label:'Stanford / Silicon Valley', count:3 },
  { city:'Cambridge, MA',   x:27, y:32, label:'MIT / Harvard',             count:2 },
  { city:'New York, NY',    x:25, y:35, label:'NYU / Goldman Sachs',       count:2 },
  { city:'Chicago, IL',     x:22, y:34, label:'Northwestern',              count:1 },
  { city:'Washington DC',   x:25, y:37, label:'Policy & Gov',              count:1 },
  { city:'London, UK',      x:47, y:28, label:'Global Exchange',           count:1 },
  { city:'Tokyo, Japan',    x:80, y:35, label:'International Program',     count:1 },
  { city:'Singapore',       x:76, y:52, label:'Asia Pacific Hub',          count:1 },
  { city:'Sao Paulo',       x:27, y:65, label:'Latin America',             count:1 },
  { city:'Lagos, Nigeria',  x:49, y:53, label:'Africa Initiative',         count:1 },
  { city:'Berlin, Germany', x:50, y:27, label:'EU Partners',               count:1 },
  { city:'Toronto, Canada', x:23, y:30, label:'Canada Expansion',          count:1 },
];

const MENTOR_BENEFITS = [
  { icon: Users,         title: 'Lifetime Community',   desc: 'Access to a growing network of YIC alumni, instructors, investors, and corporate partners — for life.' },
  { icon: GraduationCap, title: 'College Prep Access',  desc: 'Dedicated college counseling, application review, and essay workshops from YIC advisors.' },
  { icon: Rocket,        title: 'Venture Credits',      desc: 'Alumni founders receive introductions to our investor network, mentors, and seed resources.' },
  { icon: Briefcase,     title: 'Career Pathways',      desc: 'Corporate partner internship pipeline, resume workshops, and direct introductions to hiring partners.' },
  { icon: Handshake,     title: 'Pay It Forward',       desc: 'Become a YIC Mentor — return to lead workshops, guest lecture, or co-instruct future cohorts.' },
  { icon: Crown,         title: 'Legacy Recognition',   desc: 'Top alumni join the Founders Circle — a permanent directory of YIC graduates shaping the world.' },
];

const PILLARS = [
  { val:'100%', lbl:'of alumni have access to lifetime mentorship',    accent:GOLD    },
  { val:'3',    lbl:'alumni enrolled in top-20 universities',          accent:ROYAL_L },
  { val:'$8K+', lbl:'raised by alumni founders post-graduation',       accent:GOLD    },
  { val:'2022', lbl:'first cohort — already making history',           accent:ROYAL_L },
];

function AlumniCard({ alumni, delay }: { alumni: typeof ALUMNI[0]; delay: number }) {
  const [hovered, setHovered] = useState(false);
  const Icon = alumni.icon;
  return (
    <FadeIn delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? SLATE_2 : 'rgba(15,23,42,0.7)',
          border: `1px solid ${hovered ? alumni.accent + '55' : alumni.accent + '1a'}`,
          borderRadius: '4px', overflow: 'hidden', transition: 'all 0.25s ease',
          transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
          height: '100%', display: 'flex', flexDirection: 'column' as const,
        }}
      >
        <div style={{ height: '2px', background: `linear-gradient(90deg, ${alumni.accent}, transparent)` }} />
        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: `linear-gradient(135deg, ${alumni.accent}25, ${alumni.accent}0d)`, border: `2px solid ${alumni.accent}44`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: SERIF, fontSize: '1.1rem', fontWeight: 700, color: alumni.accent }}>{alumni.initials}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.2rem 0.55rem', background: `${alumni.accent}12`, border: `1px solid ${alumni.accent}28`, borderRadius: '2px' }}>
              <Icon size={10} color={alumni.accent} />
              <span style={{ fontSize: '0.58rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: alumni.accent }}>{TYPE_LABEL[alumni.type]}</span>
            </div>
          </div>
          <div>
            <p style={{ fontSize: '0.9rem', fontWeight: 700, color: WHITE, marginBottom: '2px' }}>{alumni.name}</p>
            <p style={{ fontSize: '0.65rem', color: SLATE_3, fontWeight: 600, letterSpacing: '0.08em' }}>{alumni.cohort}</p>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: alumni.accent, marginBottom: '0.3rem' }}>Now</p>
            <p style={{ fontSize: '0.82rem', fontWeight: 600, color: WHITE, lineHeight: 1.45 }}>{alumni.now}</p>
          </div>
          <p style={{ fontSize: '0.72rem', lineHeight: 1.5, color: MUTED, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.75rem' }}>{alumni.venture}</p>
        </div>
      </div>
    </FadeIn>
  );
}

function WorldMap() {
  const [active, setActive] = useState<number | null>(null);
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} style={{ background: 'rgba(15,23,42,0.7)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: '4px', overflow: 'hidden' }}>
      <div style={{ height: '2px', background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />
      <div style={{ padding: '2rem 2rem 1rem' }}>
        <p style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: GOLD, marginBottom: '0.25rem' }}>Where They Are Going</p>
        <h3 style={{ fontFamily: DISPLAY, fontSize: '1.8rem', letterSpacing: '0.04em', color: WHITE, marginBottom: '0.25rem' }}>THE WORLD IS THEIR BOARDROOM.</h3>
        <p style={{ fontSize: '0.78rem', color: MUTED, marginBottom: '1.5rem' }}>Hover a dot to see where our Young Innovators are headed next.</p>
      </div>
      <svg viewBox="0 0 100 65" style={{ width: '100%', display: 'block' }} preserveAspectRatio="xMidYMid meet">
        <rect width="100" height="65" fill="rgba(15,23,42,0.01)" />
        <path d="M5,15 L8,12 L14,11 L18,13 L22,12 L24,16 L26,20 L28,24 L25,28 L22,30 L18,34 L16,38 L14,40 L12,38 L10,34 L8,28 L6,22 Z" fill="rgba(30,41,59,0.6)" stroke="rgba(201,168,76,0.12)" strokeWidth="0.3" />
        <path d="M18,38 L22,38 L24,42 L22,44 L18,42 Z" fill="rgba(30,41,59,0.6)" stroke="rgba(201,168,76,0.12)" strokeWidth="0.3" />
        <path d="M22,44 L28,43 L32,46 L34,52 L32,58 L28,62 L24,60 L20,55 L19,50 L20,46 Z" fill="rgba(30,41,59,0.6)" stroke="rgba(201,168,76,0.12)" strokeWidth="0.3" />
        <path d="M44,14 L48,12 L54,13 L56,16 L54,20 L50,22 L46,21 L43,18 Z" fill="rgba(30,41,59,0.6)" stroke="rgba(201,168,76,0.12)" strokeWidth="0.3" />
        <path d="M44,24 L52,23 L56,26 L58,32 L56,40 L52,46 L48,50 L44,48 L41,42 L40,34 L41,28 Z" fill="rgba(30,41,59,0.6)" stroke="rgba(201,168,76,0.12)" strokeWidth="0.3" />
        <path d="M56,10 L66,8 L76,10 L84,14 L88,18 L86,24 L80,28 L72,30 L64,28 L58,24 L55,18 Z" fill="rgba(30,41,59,0.6)" stroke="rgba(201,168,76,0.12)" strokeWidth="0.3" />
        <path d="M72,32 L80,30 L84,34 L82,40 L78,42 L74,40 L72,36 Z" fill="rgba(30,41,59,0.6)" stroke="rgba(201,168,76,0.12)" strokeWidth="0.3" />
        <path d="M74,48 L82,46 L88,50 L88,56 L82,60 L74,58 L70,54 Z" fill="rgba(30,41,59,0.6)" stroke="rgba(201,168,76,0.12)" strokeWidth="0.3" />
        {[20,40,60].map(y => <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(201,168,76,0.04)" strokeWidth="0.3" strokeDasharray="1,2" />)}
        {[25,50,75].map(x => <line key={x} x1={x} y1="0" x2={x} y2="65" stroke="rgba(201,168,76,0.04)" strokeWidth="0.3" strokeDasharray="1,2" />)}
        {DESTINATIONS.map((dest, i) => (
          <g key={dest.city} style={{ cursor: 'pointer' }} onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}>
            {inView && <circle cx={dest.x} cy={dest.y} r={active === i ? 3 : 1.8} fill="none" stroke={active === i ? GOLD : 'rgba(201,168,76,0.35)'} strokeWidth="0.4" style={{ transition: 'all 0.25s' }} />}
            <motion.circle cx={dest.x} cy={dest.y} r={active === i ? 1.2 : 0.8} fill={active === i ? GOLD : 'rgba(201,168,76,0.7)'} initial={{ scale: 0, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : {}} transition={{ delay: i * 0.08, duration: 0.4 }} />
            {active === i && (
              <g>
                <rect x={dest.x > 70 ? dest.x - 24 : dest.x + 2} y={dest.y > 45 ? dest.y - 10 : dest.y + 2} width="22" height="7" rx="0.8" fill="rgba(15,23,42,0.95)" stroke="rgba(201,168,76,0.4)" strokeWidth="0.3" />
                <text x={dest.x > 70 ? dest.x - 13 : dest.x + 13} y={dest.y > 45 ? dest.y - 5.5 : dest.y + 6.5} fill={GOLD} fontSize="1.6" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontWeight="700">{dest.label}</text>
              </g>
            )}
          </g>
        ))}
        <circle cx="8.5" cy="37.5" r="1.5" fill="rgba(59,130,246,0.3)" stroke={ROYAL_L} strokeWidth="0.5" />
        <circle cx="8.5" cy="37.5" r="0.6" fill={ROYAL_L} />
        <text x="10.2" y="37" fill={ROYAL_L} fontSize="1.4" fontFamily="'DM Sans', sans-serif" fontWeight="700">Glendora, CA</text>
      </svg>
      <div style={{ padding: '1rem 2rem 1.5rem', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', borderTop: '1px solid rgba(201,168,76,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: ROYAL_L }} />
          <span style={{ fontSize: '0.68rem', color: MUTED, fontWeight: 600 }}>Origin — Glendora, CA</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: GOLD, opacity: 0.7 }} />
          <span style={{ fontSize: '0.68rem', color: MUTED, fontWeight: 600 }}>Alumni Destination</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto' }}>
          <Globe size={12} color={GOLD} />
          <span style={{ fontSize: '0.68rem', color: MUTED, fontWeight: 600 }}>{DESTINATIONS.length} cities across 6 continents</span>
        </div>
      </div>
    </div>
  );
}

function MentorForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [form, setForm] = useState({ name:'', email:'', cohort:'', role:'', expertise:'', message:'' });

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    await new Promise(r => setTimeout(r, 1100));
    setLoading(false); setSubmitted(true);
  };

  const iStyle: React.CSSProperties = { width:'100%', background:'rgba(15,23,42,0.7)', border:'1px solid rgba(201,168,76,0.2)', borderRadius:'3px', padding:'0.8rem 0.875rem', color:WHITE, fontSize:'0.85rem', outline:'none', transition:'border-color 0.2s, box-shadow 0.2s', fontFamily:SANS };
  const lStyle: React.CSSProperties = { display:'block', fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', color:MUTED, marginBottom:'0.4rem' };
  const focus = {
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { e.target.style.borderColor = GOLD; e.target.style.boxShadow = '0 0 0 3px rgba(201,168,76,0.1)'; },
    onBlur:  (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { e.target.style.borderColor = 'rgba(201,168,76,0.2)'; e.target.style.boxShadow = 'none'; },
  };

  if (submitted) return (
    <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} style={{ textAlign:'center', padding:'2rem 0' }}>
      <div style={{ width:'56px', height:'56px', background:'rgba(201,168,76,0.1)', border:'1px solid rgba(201,168,76,0.3)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 1.25rem' }}>
        <Sparkles size={22} color={GOLD} />
      </div>
      <h3 style={{ fontFamily:DISPLAY, fontSize:'2rem', color:WHITE, letterSpacing:'0.06em', marginBottom:'0.625rem' }}>WELCOME TO THE CIRCLE.</h3>
      <p style={{ fontSize:'0.875rem', color:MUTED, lineHeight:1.75, fontFamily:SANS, maxWidth:'340px', margin:'0 auto' }}>Your application has been received. Our Alumni Director will be in touch within 2 business days.</p>
    </motion.div>
  );

  return (
    <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.875rem' }}>
        <div><label style={lStyle}>Full Name</label><input name="name" required value={form.name} onChange={handle} placeholder="Your name" style={iStyle} {...focus} /></div>
        <div><label style={lStyle}>Email</label><input name="email" type="email" required value={form.email} onChange={handle} placeholder="you@email.com" style={iStyle} {...focus} /></div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.875rem' }}>
        <div>
          <label style={lStyle}>YIC Cohort Year</label>
          <select name="cohort" value={form.cohort} onChange={handle} style={{ ...iStyle, cursor:'pointer' }} {...focus}>
            <option value="" style={{ background:SLATE }}>Select year...</option>
            <option value="2022" style={{ background:SLATE }}>2022 — Founding Cohort</option>
            <option value="2023" style={{ background:SLATE }}>2023 Cohort</option>
            <option value="2024" style={{ background:SLATE }}>2024 Cohort</option>
            <option value="external" style={{ background:SLATE }}>External Mentor</option>
          </select>
        </div>
        <div><label style={lStyle}>Current Role</label><input name="role" value={form.role} onChange={handle} placeholder="Student, Founder, Executive..." style={iStyle} {...focus} /></div>
      </div>
      <div>
        <label style={lStyle}>Area of Expertise</label>
        <select name="expertise" value={form.expertise} onChange={handle} style={{ ...iStyle, cursor:'pointer' }} {...focus}>
          <option value="" style={{ background:SLATE }}>What can you offer?</option>
          <option value="eq"      style={{ background:SLATE }}>EQ and Leadership Coaching</option>
          <option value="finance" style={{ background:SLATE }}>Financial Literacy</option>
          <option value="venture" style={{ background:SLATE }}>Venture Building</option>
          <option value="college" style={{ background:SLATE }}>College Prep and Applications</option>
          <option value="career"  style={{ background:SLATE }}>Career Pathways</option>
          <option value="all"     style={{ background:SLATE }}>All of the above</option>
        </select>
      </div>
      <div>
        <label style={lStyle}>Why do you want to mentor?</label>
        <textarea name="message" rows={3} value={form.message} onChange={handle} placeholder="Tell us what brought you back..." style={{ ...iStyle, resize:'vertical', minHeight:'80px' }} {...focus} />
      </div>
      <button type="submit" disabled={loading} style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem', padding:'1rem', background:loading ? 'rgba(201,168,76,0.2)' : `linear-gradient(135deg, ${GOLD_D}, ${GOLD_L})`, border:'none', borderRadius:'3px', color:loading ? WHITE : SLATE, fontSize:'0.8rem', fontWeight:800, letterSpacing:'0.12em', textTransform:'uppercase' as const, cursor:loading ? 'wait' : 'pointer', fontFamily:SANS, boxShadow:loading ? 'none' : '0 4px 24px rgba(201,168,76,0.3)', transition:'all 0.2s' }}>
        {loading ? (<><motion.div animate={{ rotate:360 }} transition={{ duration:0.8, repeat:Infinity, ease:'linear' }} style={{ width:13, height:13, border:'2px solid rgba(255,255,255,0.3)', borderTopColor:WHITE, borderRadius:'50%' }} />Sending...</>) : <>Join the Mentor Network <ArrowUpRight size={13} /></>}
      </button>
    </form>
  );
}

export default function AlumniNetworkPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY       = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'University', 'Founder', 'Mentor', 'Career', 'Scholarship'];
  const filtered = filter === 'All' ? ALUMNI : ALUMNI.filter(a => a.type === filter);

  return (
    <div style={{ background:SLATE, minHeight:'100vh', color:WHITE, fontFamily:SANS }}>
      <style dangerouslySetInnerHTML={{ __html:`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');
        @keyframes shimmerGold { 0%{background-position:-200% center} 100%{background-position:200% center} }
      ` }} />

      {/* HERO */}
      <section ref={heroRef} className="relative overflow-hidden" style={{ paddingTop:'5rem', minHeight:'100vh', display:'flex', alignItems:'center' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(155deg, #070510 0%, #0F172A 50%, #100C05 100%)' }} />
          <div style={{ position:'absolute', top:'5%', right:'-5%', width:'60%', height:'70%', background:'radial-gradient(ellipse, rgba(201,168,76,0.1) 0%, transparent 65%)' }} />
          <div style={{ position:'absolute', bottom:'10%', left:'-5%', width:'40%', height:'50%', background:'radial-gradient(ellipse, rgba(37,99,235,0.07) 0%, transparent 65%)' }} />
          <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(rgba(201,168,76,0.06) 1px, transparent 1px)', backgroundSize:'36px 36px' }} />
          {[18,42,68,88].map(pct => <div key={pct} style={{ position:'absolute', top:`${pct}%`, left:0, right:0, height:'1px', background:'linear-gradient(90deg, transparent, rgba(201,168,76,0.06), transparent)' }} />)}
        </div>

        <motion.div style={{ y:heroY, opacity:heroOpacity }} className="relative w-full">
          <div className="mx-auto max-w-7xl px-6 lg:px-12 py-20">
            <motion.div variants={stagger} initial="hidden" animate="visible">
              <motion.div variants={fadeIn} style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'2rem' }}>
                <Link href="/programs" style={{ fontSize:'0.68rem', color:SLATE_3, textDecoration:'none', fontWeight:600 }}>Programs</Link>
                <ChevronRight size={12} color={SLATE_3} />
                <span style={{ fontSize:'0.68rem', color:GOLD, fontWeight:700 }}>Alumni Network</span>
              </motion.div>

              <motion.div variants={fadeIn} style={{ display:'flex', flexWrap:'wrap', gap:'0.625rem', marginBottom:'1.75rem' }}>
                {[{ icon:Crown, label:'The Legacy Program', color:GOLD }, { icon:Globe, label:'Lifetime Network', color:ROYAL_L }, { icon:GraduationCap, label:'College Prep Included', color:GOLD }].map(({ icon:Icon, label, color }) => (
                  <div key={label} style={{ display:'flex', alignItems:'center', gap:'0.45rem', padding:'0.375rem 0.875rem', background:`${color}12`, border:`1px solid ${color}28`, borderRadius:'2px' }}>
                    <Icon size={11} color={color} />
                    <span style={{ fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase' as const, color }}>{label}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} style={{ marginBottom:'1.75rem' }}>
                <h1 style={{ fontFamily:SERIF, fontSize:'clamp(3rem, 7vw, 6.5rem)', fontWeight:900, lineHeight:0.95, letterSpacing:'-0.02em', color:WHITE, marginBottom:'0.3rem' }}>Once a Young</h1>
                <h1 style={{ fontFamily:SERIF, fontWeight:900, fontStyle:'italic', fontSize:'clamp(3rem, 7vw, 6.5rem)', lineHeight:0.95, letterSpacing:'-0.02em', background:`linear-gradient(135deg, ${GOLD} 0%, ${GOLD_L} 40%, ${GOLD} 100%)`, backgroundSize:'200% auto', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', animation:'shimmerGold 5s linear infinite', marginBottom:'0.3rem' }}>Innovator.</h1>
                <h1 style={{ fontFamily:SERIF, fontSize:'clamp(3rem, 7vw, 6.5rem)', fontWeight:900, lineHeight:0.95, letterSpacing:'-0.02em', color:WHITE }}>Always a Founder.</h1>
              </motion.div>

              <motion.p variants={fadeUp} style={{ fontFamily:SANS, fontSize:'1.1rem', lineHeight:1.8, color:MUTED, maxWidth:'560px', marginBottom:'2.5rem' }}>
                The program ends at Week 8. The network never does. Every YIC graduate enters a lifetime community of mentors, investors, college advisors, and fellow builders.
              </motion.p>

              <motion.div variants={fadeUp} style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
                <Link href="#mentor" style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', padding:'0.95rem 2rem', background:`linear-gradient(135deg, ${GOLD_D}, ${GOLD_L})`, border:'none', borderRadius:'3px', color:SLATE, fontSize:'0.8rem', fontWeight:800, letterSpacing:'0.1em', textTransform:'uppercase' as const, textDecoration:'none', boxShadow:'0 4px 24px rgba(201,168,76,0.35)' }}>
                  Join the Mentor Network <ArrowUpRight size={14} />
                </Link>
                <Link href="#circle" style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', padding:'0.95rem 1.75rem', background:'transparent', border:'1px solid rgba(201,168,76,0.3)', borderRadius:'3px', color:GOLD, fontSize:'0.8rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase' as const, textDecoration:'none' }}>
                  The Founders Circle <ChevronRight size={13} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" animate={{ y:[0,8,0] }} transition={{ duration:2.2, repeat:Infinity, ease:'easeInOut' }}>
          <div style={{ height:'2.5rem', width:'1px', background:`linear-gradient(180deg, ${GOLD}, transparent)` }} />
        </motion.div>
      </section>

      {/* STATS */}
      <div style={{ borderTop:'1px solid rgba(201,168,76,0.1)', background:'rgba(201,168,76,0.02)' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'1px', background:'rgba(201,168,76,0.08)' }}>
            {PILLARS.map((p, i) => (
              <FadeIn key={p.lbl} delay={i * 0.08}>
                <div style={{ background:SLATE, padding:'2rem', textAlign:'center', transition:'background 0.2s' }} onMouseEnter={e=>{e.currentTarget.style.background=SLATE_2}} onMouseLeave={e=>{e.currentTarget.style.background=SLATE}}>
                  <p style={{ fontFamily:DISPLAY, fontSize:'2.8rem', color:p.accent, lineHeight:1, marginBottom:'0.5rem', letterSpacing:'0.03em' }}>{p.val}</p>
                  <p style={{ fontSize:'0.72rem', color:MUTED, lineHeight:1.5, fontWeight:500 }}>{p.lbl}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* BENEFITS */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <FadeIn className="mb-12">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'3rem', alignItems:'end' }}>
            <div>
              <p style={{ fontSize:'0.65rem', fontWeight:800, letterSpacing:'0.22em', textTransform:'uppercase' as const, color:GOLD, marginBottom:'0.5rem' }}>The Legacy Program</p>
              <h2 style={{ fontFamily:DISPLAY, fontSize:'clamp(2rem, 4.5vw, 3.8rem)', lineHeight:0.95, letterSpacing:'0.02em', color:WHITE }}>WHAT COMES<br /><span style={{ color:GOLD }}>AFTER PITCH DAY.</span></h2>
            </div>
            <p style={{ fontSize:'0.95rem', lineHeight:1.8, color:MUTED }}>Graduating is the beginning. Every YIC alumnus receives lifetime access to three pillars: mentorship, college prep, and venture support — for as long as they need it.</p>
          </div>
        </FadeIn>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'1.25rem' }}>
          {MENTOR_BENEFITS.map((b, i) => {
            const Icon = b.icon;
            const accent = i % 2 === 0 ? GOLD : ROYAL_L;
            return (
              <FadeIn key={b.title} delay={i * 0.08}>
                <div style={{ background:'rgba(15,23,42,0.6)', border:`1px solid ${accent}1a`, borderRadius:'4px', padding:'1.75rem', height:'100%', display:'flex', flexDirection:'column', gap:'1rem', transition:'all 0.25s' }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=`${accent}44`;e.currentTarget.style.background=SLATE_2}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=`${accent}1a`;e.currentTarget.style.background='rgba(15,23,42,0.6)'}}>
                  <div style={{ width:'44px', height:'44px', background:`${accent}12`, border:`1px solid ${accent}28`, borderRadius:'3px', display:'flex', alignItems:'center', justifyContent:'center', color:accent }}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <p style={{ fontSize:'0.9rem', fontWeight:700, color:WHITE, marginBottom:'0.375rem' }}>{b.title}</p>
                    <p style={{ fontSize:'0.8rem', lineHeight:1.7, color:MUTED }}>{b.desc}</p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* FOUNDERS CIRCLE */}
      <section id="circle" style={{ background:'rgba(15,23,42,0.55)', borderTop:'1px solid rgba(201,168,76,0.08)', borderBottom:'1px solid rgba(201,168,76,0.08)' }}>
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
          <FadeIn className="mb-10">
            <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:'1.5rem', marginBottom:'2rem' }}>
              <div>
                <p style={{ fontSize:'0.65rem', fontWeight:800, letterSpacing:'0.22em', textTransform:'uppercase' as const, color:GOLD, marginBottom:'0.5rem' }}>Graduate Directory</p>
                <h2 style={{ fontFamily:DISPLAY, fontSize:'clamp(2rem, 4.5vw, 3.8rem)', lineHeight:0.95, letterSpacing:'0.02em', color:WHITE }}>THE FOUNDERS<br /><span style={{ color:GOLD }}>CIRCLE.</span></h2>
              </div>
              <p style={{ fontSize:'0.85rem', color:MUTED, maxWidth:'320px', lineHeight:1.7 }}>Every name below is a proof point. Filter by where they went next.</p>
            </div>
            <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
              {filters.map(f => (
                <button key={f} onClick={() => setFilter(f)} style={{ padding:'0.4rem 0.9rem', borderRadius:'2px', cursor:'pointer', fontFamily:SANS, fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase' as const, border:`1px solid ${filter===f ? GOLD : 'rgba(201,168,76,0.15)'}`, background:filter===f ? 'rgba(201,168,76,0.12)' : 'rgba(15,23,42,0.5)', color:filter===f ? GOLD : MUTED, transition:'all 0.2s' }}>
                  {f}
                </button>
              ))}
            </div>
          </FadeIn>

          <AnimatePresence mode="wait">
            <motion.div key={filter} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} transition={{ duration:0.25 }} style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:'1rem' }}>
              {filtered.map((a, i) => <AlumniCard key={a.name} alumni={a} delay={i * 0.05} />)}
            </motion.div>
          </AnimatePresence>

          <FadeIn delay={0.3} className="mt-10">
            <div style={{ background:'linear-gradient(135deg, rgba(201,168,76,0.1), rgba(15,23,42,0.95))', border:'1px solid rgba(201,168,76,0.22)', borderRadius:'4px', padding:'2rem 2.5rem', position:'relative', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1.5rem' }}>
              <div style={{ position:'absolute', inset:'0 0 0 0', borderLeft:`3px solid ${GOLD}`, borderRadius:'4px 0 0 4px', pointerEvents:'none' }} />
              <div>
                <p style={{ fontFamily:SERIF, fontStyle:'italic', fontSize:'1.1rem', color:WHITE, lineHeight:1.6, marginBottom:'0.5rem' }}>
                  "The Founders Circle is not a trophy wall. It is a living directory of proof — proof that where you grow up does not determine where you end up."
                </p>
                <cite style={{ fontSize:'0.7rem', fontStyle:'normal', fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase' as const, color:GOLD }}>— Cindy Ha, Founder</cite>
              </div>
              <Link href="#mentor" style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', padding:'0.875rem 1.5rem', background:`linear-gradient(135deg, ${GOLD_D}, ${GOLD_L})`, borderRadius:'3px', color:SLATE, fontSize:'0.75rem', fontWeight:800, letterSpacing:'0.1em', textTransform:'uppercase' as const, textDecoration:'none', flexShrink:0 }}>
                Add Your Story <ArrowUpRight size={13} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* WORLD MAP */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <FadeIn><WorldMap /></FadeIn>
      </section>

      {/* MENTOR CTA */}
      <section id="mentor" style={{ background:SLATE_2, borderTop:'1px solid rgba(201,168,76,0.12)' }}>
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'4rem', alignItems:'start' }}>
            <FadeIn>
              <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1.25rem' }}>
                <div style={{ width:'2rem', height:'1px', background:GOLD }} />
                <p style={{ fontSize:'0.6rem', fontWeight:800, letterSpacing:'0.28em', textTransform:'uppercase' as const, color:GOLD }}>The Mentor Network</p>
              </div>
              <h2 style={{ fontFamily:DISPLAY, fontSize:'clamp(2.2rem, 5vw, 4rem)', lineHeight:0.92, letterSpacing:'0.02em', color:WHITE, marginBottom:'1rem' }}>YOU MADE IT.<br /><span style={{ color:GOLD }}>NOW COME BACK.</span></h2>
              <p style={{ fontSize:'0.95rem', lineHeight:1.8, color:MUTED, marginBottom:'1.75rem', maxWidth:'440px' }}>The most powerful thing a YIC graduate can do is return. Whether you mentor one student a month or co-teach a full cohort, you become living proof that this program changes lives.</p>
              <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem', marginBottom:'1.5rem' }}>
                {[
                  { icon:Users,      label:'1-on-1 mentoring sessions',       sub:'1 hour/month minimum commitment'   },
                  { icon:BookOpen,   label:'Guest lecture in active cohorts', sub:'Share your real-world experience' },
                  { icon:Award,      label:'Serve on investor pitch panels',  sub:'Judge Week 8 pitch presentations' },
                  { icon:Heart,      label:'College app essay support',       sub:'Review apps for current students'  },
                ].map(({ icon:Icon, label, sub }) => (
                  <div key={label} style={{ display:'flex', gap:'0.875rem', alignItems:'flex-start' }}>
                    <div style={{ width:'32px', height:'32px', flexShrink:0, background:'rgba(201,168,76,0.1)', border:'1px solid rgba(201,168,76,0.2)', borderRadius:'3px', display:'flex', alignItems:'center', justifyContent:'center', color:GOLD }}>
                      <Icon size={14} />
                    </div>
                    <div>
                      <p style={{ fontSize:'0.85rem', fontWeight:700, color:WHITE, marginBottom:'1px' }}>{label}</p>
                      <p style={{ fontSize:'0.72rem', color:MUTED }}>{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', padding:'1rem 1.25rem', background:'rgba(201,168,76,0.06)', border:'1px solid rgba(201,168,76,0.15)', borderRadius:'3px' }}>
                <div style={{ display:'flex' }}>
                  {['AT','SM','RO'].map(init => (
                    <div key={init} style={{ width:'28px', height:'28px', borderRadius:'50%', background:'linear-gradient(135deg, rgba(201,168,76,0.3), rgba(201,168,76,0.1))', border:`2px solid ${SLATE_2}`, display:'flex', alignItems:'center', justifyContent:'center', marginLeft:'-8px' }}>
                      <span style={{ fontFamily:SERIF, fontSize:'0.6rem', fontWeight:700, color:GOLD }}>{init}</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize:'0.78rem', color:MUTED, lineHeight:1.5 }}><strong style={{ color:WHITE }}>3 alumni</strong> are already active mentors. Join them.</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.12}>
              <div style={{ background:'rgba(15,23,42,0.85)', border:'1px solid rgba(201,168,76,0.2)', borderRadius:'4px', padding:'2.5rem', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', inset:'0 0 auto 0', height:'2px', background:`linear-gradient(90deg, ${GOLD}, transparent)` }} />
                <p style={{ fontSize:'0.65rem', fontWeight:800, letterSpacing:'0.2em', textTransform:'uppercase' as const, color:GOLD, marginBottom:'1.25rem' }}>Mentor Application</p>
                <MentorForm />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}