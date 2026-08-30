'use client';

import Link from 'next/link';
import { ArrowUpRight, Download, BookOpen, FileText, GraduationCap, FlaskConical } from 'lucide-react';
import {
  Page, Hero, Section, Eyebrow, Title, FadeIn, Card,
  WHITE, MUTED, SLATE_3, GOLD, GOLD_L, ROYAL_L, GREEN_L, DISPLAY,
} from '@/components/kit';

type Resource = {
  file: string;
  label: string;
  kind: string;
  meta: string;
  accent: string;
  icon: React.ElementType;
  desc: string;
};

const RESOURCES: Resource[] = [
  {
    file: '/downloads/discrete-math-adventures-workbook.pdf',
    label: 'Discrete Math Adventures: Student Workbook',
    kind: 'Curriculum', meta: 'PDF · 77 pages · Grade 2', accent: ROYAL_L, icon: BookOpen,
    desc: '36 weekly assignments, two pages each, plus a contents spread and a certificate. '
        + 'Sequenced against a typical California Grade 2 pacing guide and proofed in grayscale '
        + 'so it prints on a classroom copier.',
  },
  {
    file: '/downloads/discrete-math-teacher-guide.html',
    label: 'Discrete Math Adventures: Teacher Guide',
    kind: 'Curriculum', meta: 'Web page · all 36 weeks', accent: GREEN_L, icon: GraduationCap,
    desc: 'Answer keys for the main activity, the practice set and the Challenge Zone, plus a '
        + 'running note and the standards tie for every week. Written so a teacher needs no '
        + 'prior background in the mathematics.',
  },
  {
    file: '/downloads/venture-year-grade4.pdf',
    label: 'The Venture Year: Student Workbook',
    kind: 'Curriculum', meta: 'PDF · 77 pages · Grade 4', accent: GOLD_L, icon: BookOpen,
    desc: '36 weekly assignments in entrepreneurship, two pages each. Students find a real '
        + 'problem, design something that fixes it, work out cost and price, and sell it at a '
        + 'class market day in week 31. Real products and real customers, on play money in a '
        + 'closed classroom economy, so students run their own money box.',
  },
  {
    file: '/downloads/venture-year-teacher-guide.html',
    label: 'The Venture Year: Teacher Guide',
    kind: 'Curriculum', meta: 'Web page · all 36 weeks', accent: GREEN_L, icon: GraduationCap,
    desc: 'The point of each week, every arithmetic answer, the specific wrong turn each '
        + 'week produces, and an honest note wherever a question is a judgement call rather '
        + 'than something with a right answer.',
  },
  {
    file: '/downloads/numbers-year-grade5.pdf',
    label: 'The Numbers Year: Student Workbook',
    kind: 'Curriculum', meta: 'PDF · 77 pages · Grade 5', accent: GOLD_L, icon: BookOpen,
    desc: '36 weekly assignments, the second entrepreneurship year. Teams of two or three '
        + 'build a line of products, write a forecast before selling anything, sell twice '
        + 'with one deliberate change in between, and find out whether the change did '
        + 'anything. Decimals, margin and break-even throughout.',
  },
  {
    file: '/downloads/numbers-year-teacher-guide.html',
    label: 'The Numbers Year: Teacher Guide',
    kind: 'Curriculum', meta: 'Web page · all 36 weeks', accent: GREEN_L, icon: GraduationCap,
    desc: 'Every arithmetic answer, the point of each week, and the specific wrong turn it '
        + 'produces. All 124 numeric answers are recomputed from the problems by a script '
        + 'that ships with the source.',
  },
  {
    file: '/downloads/structure-before-fluency.pdf',
    label: 'Structure Before Fluency',
    kind: 'Research', meta: 'PDF · working paper · 10 pages', accent: GOLD, icon: FlaskConical,
    desc: 'The case for discrete mathematics as early-elementary enrichment: the literature, the '
        + 'standards argument, the equity case, plus an explicit account of what the evidence '
        + 'does not support, including the absence of any efficacy trial at this grade.',
  },
  {
    file: '/downloads/discrete-math-pilot-packet.pdf',
    label: 'Pilot Adoption Packet',
    kind: 'For schools', meta: 'PDF · 10 pages', accent: ROYAL_L, icon: FileText,
    desc: 'What a principal needs to decide: the one-pager, what a pilot involves, the full '
        + 'standards crosswalk, the cost sheet, and a complete sample week reproduced exactly '
        + 'as a student receives it.',
  },
];

export default function ResourcesUi() {
  return (
    <Page>
      <Hero
        eyebrow="Open materials"
        accent={GOLD_L}
        title={<>TAKE IT.<br /><span style={{ color: GOLD_L }}>IT IS FREE.</span></>}
        lede={
          <>
            <p style={{ marginBottom: '0.9rem' }}>
              Everything we build is published in full, the student workbook, the complete answer
              key, the research behind it, and the packet we hand to principals. No email wall, no
              license, no partial preview.
            </p>
            <p style={{ margin: 0 }}>
              Use it in your classroom, adapt it for your district, or read it to decide whether we
              know what we are doing. All three are the point.
            </p>
          </>
        }
      />

      <Section tinted accent={GOLD}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))', gap: '1.25rem' }}>
          {RESOURCES.map((r, i) => {
            const Icon = r.icon;
            return (
              <FadeIn key={r.file} delay={i * 0.07}>
                <Card accent={r.accent} pad="1.75rem">
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                    gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ width: '40px', height: '40px', background: `${r.accent}15`,
                      border: `1px solid ${r.accent}30`, borderRadius: '3px', display: 'flex',
                      alignItems: 'center', justifyContent: 'center', color: r.accent, flexShrink: 0 }}>
                      <Icon size={18} />
                    </div>
                    <span style={{ padding: '0.2rem 0.6rem', background: `${r.accent}12`,
                      border: `1px solid ${r.accent}25`, borderRadius: '2px', fontSize: '0.6rem',
                      fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase' as const,
                      color: r.accent, whiteSpace: 'nowrap' }}>{r.kind}</span>
                  </div>
                  <h3 style={{ fontSize: '1.02rem', fontWeight: 700, color: WHITE, lineHeight: 1.35,
                    marginBottom: '0.35rem' }}>{r.label}</h3>
                  <p style={{ fontSize: '0.72rem', color: r.accent, fontWeight: 600, marginBottom: '0.75rem' }}>{r.meta}</p>
                  <p style={{ fontSize: '0.85rem', lineHeight: 1.75, color: MUTED, marginBottom: '1.25rem' }}>{r.desc}</p>
                  <a href={r.file} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.6rem 1.1rem', background: `${r.accent}12`, border: `1px solid ${r.accent}30`,
                    borderRadius: '3px', color: r.accent, fontSize: '0.72rem', fontWeight: 700,
                    letterSpacing: '0.1em', textTransform: 'uppercase' as const, textDecoration: 'none' }}>
                    <Download size={12} /> Download
                  </a>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      <Section>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
          <FadeIn>
            <Eyebrow>Why give it away</Eyebrow>
            <Title size="clamp(1.8rem, 3.6vw, 2.9rem)">THE MATERIALS ARE<br />THE ARGUMENT.</Title>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: MUTED, maxWidth: '54ch', marginTop: '1rem' }}>
              A curriculum you cannot read is a claim you have to take on trust. Publishing the
              whole thing, including the answer key and the research caveats, is the fastest way
              to show a teacher, a principal or a funder exactly what they would be getting.
            </p>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: MUTED, maxWidth: '54ch' }}>
              It also means a school that never talks to us can still run the program. That is a
              feature, not a leak.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ padding: '1.75rem 2rem', background: 'rgba(15,23,42,0.6)',
              border: '1px solid rgba(37,99,235,0.14)', borderRadius: '4px' }}>
              <p style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.16em',
                textTransform: 'uppercase' as const, color: ROYAL_L, marginBottom: '0.75rem' }}>
                Using these materials
              </p>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.75, color: MUTED, marginBottom: '0.75rem' }}>
                Teachers and schools may print, copy and use everything here at no cost. Attribution
                is appreciated but not required. We would rather it get used.
              </p>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.75, color: MUTED, marginBottom: '1.25rem' }}>
                If you adapt it for another grade or another district, we would genuinely like to
                hear how it went, including if it did not work.
              </p>
              <Link href="/partner" className="btn-ghost">Tell us how it went <ArrowUpRight size={13} /></Link>
            </div>
          </FadeIn>
        </div>
      </Section>

      <Section tinted>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <p style={{ fontFamily: DISPLAY, fontSize: '1.9rem', letterSpacing: '0.02em',
                color: WHITE, marginBottom: '0.4rem' }}>MORE IS COMING.</p>
              <p style={{ fontSize: '0.85rem', color: MUTED, maxWidth: '54ch' }}>
                Assessment instruments, a teacher training deck, then Grade 3 and Grade 1, after
                the first pilot, so they are shaped by a real classroom rather than a guess about
                one. Science and the Grades 3–12 enterprise materials follow. The full map, with
                an honest status on every grade band, is on the curriculum page.
              </p>
            </div>
            <Link href="/for-schools" className="btn-gold">Run the pilot <ArrowUpRight size={14} /></Link>
          </div>
          <p style={{ fontSize: '0.75rem', color: SLATE_3, marginTop: '1.5rem' }}>
            The workbook PDF was generated in an environment without the brand display font, so its
            cover type falls back to a system sans. All artwork is vector and unaffected.
          </p>
        </FadeIn>
      </Section>
    </Page>
  );
}
