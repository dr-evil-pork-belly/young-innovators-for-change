'use client';

import Link from 'next/link';
import {
  ArrowUpRight, XCircle, CheckCircle, PenTool, Map as MapIcon, Minus,
  Quote, BookOpen, AlertTriangle, ExternalLink,
} from 'lucide-react';
import {
  Page, Hero, Section, Eyebrow, Title, FadeIn, Card,
  WHITE, MUTED, SLATE_3, GOLD, GOLD_L, ROYAL, ROYAL_L, GREEN_L, DISPLAY,
} from '@/components/kit';
import {
  PATHWAY, NOT_AN_MBA, OPT_IN, RESEARCH, MBA_COST, FOUNDER,
  uscTwoYearTotal, pathwayPublishedCount, usd, STATUS_LABEL,
  type Status, type PathwayStage, type Citation,
} from '@/content/org';

const SERIF = "'Playfair Display', Georgia, 'Times New Roman', serif";

const BODY: React.CSSProperties = {
  fontSize: '0.95rem', lineHeight: 1.85, color: MUTED, marginBottom: '1.1rem',
};

const STATUS_STYLE: Record<Status, { fg: string; bg: string; bd: string; icon: React.ElementType }> = {
  published: { fg: GREEN_L, bg: 'rgba(23,166,124,0.10)', bd: 'rgba(23,166,124,0.32)', icon: CheckCircle },
  designed:  { fg: GOLD_L,  bg: 'rgba(255,196,77,0.09)', bd: 'rgba(255,196,77,0.28)',  icon: PenTool },
  planned:   { fg: ROYAL,   bg: 'rgba(45,91,227,0.07)', bd: 'rgba(45,91,227,0.22)',  icon: MapIcon },
  'n/a':     { fg: SLATE_3, bg: 'transparent',           bd: 'rgba(90,104,128,0.10)', icon: Minus },
};

function StatusChip({ status }: { status: Status }) {
  const st = STATUS_STYLE[status];
  const Icon = st.icon;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
      background: st.bg, border: `1px solid ${st.bd}`, borderRadius: '2px',
      padding: '0.2rem 0.45rem', fontSize: '0.58rem', fontWeight: 800,
      letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: st.fg }}>
      <Icon size={10} /> {STATUS_LABEL[status]}
    </span>
  );
}

/** One rung of the ladder. */
function Rung({ s }: { s: PathwayStage }) {
  const st = STATUS_STYLE[s.status];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(150px, 190px) 1fr',
      gap: 'clamp(1rem, 3vw, 2rem)', padding: '1.35rem 0',
      borderTop: '1px solid rgba(45,91,227,0.1)' }}>
      <div>
        <p style={{ fontFamily: DISPLAY, fontSize: '1.65rem', letterSpacing: '-0.01em',
          color: s.status === 'published' ? WHITE : MUTED, lineHeight: 1.06, marginBottom: '0.5rem' }}>
          {s.grade}
        </p>
        <StatusChip status={s.status} />
        {s.book && (
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.35rem',
            fontSize: '0.75rem', color: GOLD_L, marginTop: '0.55rem' }}>
            <BookOpen size={11} /> {s.book}
          </p>
        )}
      </div>
      <div>
        <p style={{ fontSize: '0.88rem', lineHeight: 1.75,
          color: s.status === 'published' ? WHITE : MUTED, marginBottom: '0.6rem' }}>
          {s.concept}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase' as const, color: st.fg,
            borderLeft: `2px solid ${st.bd}`, paddingLeft: '0.5rem' }}>
            {s.mbaCourse}
          </span>
        </div>
        {s.note && (
          <p style={{ fontSize: '0.75rem', lineHeight: 1.6, color: SLATE_3, marginTop: '0.5rem' }}>
            {s.note}
          </p>
        )}
      </div>
    </div>
  );
}

function CitationCard({ c }: { c: Citation }) {
  const accent = c.countervailing ? '#B42318' : ROYAL_L;
  return (
    <div style={{ background: '#FFFFFF',
      border: `1px solid ${c.countervailing ? 'rgba(180,35,24,0.28)' : 'rgba(45,91,227,0.14)'}`,
      borderRadius: '4px', padding: '1.5rem 1.7rem', height: '100%' }}>
      {c.countervailing && (
        <p style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.62rem',
          fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase' as const,
          color: accent, marginBottom: '0.7rem' }}>
          <AlertTriangle size={12} /> Argues against us
        </p>
      )}
      <p style={{ fontSize: '0.95rem', fontWeight: 700, color: WHITE, lineHeight: 1.45,
        marginBottom: '0.35rem' }}>
        {c.title}
      </p>
      <p style={{ fontSize: '0.75rem', color: MUTED, marginBottom: '0.9rem' }}>
        {c.authors} ({c.year}). <em>{c.publication}</em>.
      </p>
      <p style={{ fontSize: '0.83rem', lineHeight: 1.75, color: MUTED, marginBottom: '0.9rem' }}>
        {c.finding}
      </p>
      <p style={{ fontSize: '0.83rem', lineHeight: 1.75, color: WHITE,
        paddingTop: '0.85rem', borderTop: `1px solid ${accent}22` }}>
        <span style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.16em',
          textTransform: 'uppercase' as const, color: accent, display: 'block',
          marginBottom: '0.4rem' }}>
          What it does and does not support
        </span>
        {c.bearing}
      </p>
      <a href={c.url} target="_blank" rel="noopener noreferrer"
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
          fontSize: '0.73rem', color: accent, textDecoration: 'none', marginTop: '0.9rem' }}>
        Read the source <ExternalLink size={11} />
      </a>
    </div>
  );
}

export default function PathwayUi() {
  const total   = PATHWAY.length;
  const written = pathwayPublishedCount();
  const usc     = uscTwoYearTotal();

  return (
    <Page>
      <Hero
        eyebrow="The pathway · Grades 3 to 12"
        accent={GOLD_L}
        title={<>The same ideas.<br />Ten years instead<br />
          <span style={{ color: GOLD_L }}>of two. No tuition.</span></>}
        lede={
          <>
            <p style={{ marginBottom: '0.9rem' }}>
              A graduate business school takes the core of how commerce works and compresses
              it into roughly two years, for adults, at a price. {MBA_COST.usc.school} puts
              the two years of its full-time MBA at {usd(usc)} in tuition, fees and
              insurance. {MBA_COST.stanford.school} puts the first nine months alone
              at {usd(MBA_COST.stanford.totalNineMonths)}.
            </p>
            <p style={{ margin: 0 }}>
              A child in a Title I elementary school is not in a position to pay that, and
              will not be at twenty-two either. But that child is already sitting in a
              classroom for ten more years. The pathway is the argument that the constraint
              was never the material. It was the compression, and the price.
            </p>
          </>
        }
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem' }}>
          <Link href="/resources" className="btn-gold">Download what is written <ArrowUpRight size={14} /></Link>
          <Link href="/curriculum" className="btn-ghost">The full K&ndash;12 map <ArrowUpRight size={13} /></Link>
        </div>
      </Hero>

      {/* ── Honest status, up front ────────────────────── */}
      <Section tinted accent={GOLD}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2rem', alignItems: 'start' }}>
          <FadeIn>
            <Eyebrow color={GOLD_L}>Before anything else</Eyebrow>
            <Title size="clamp(1.8rem, 3.6vw, 2.9rem)">
              {written} OF {total} YEARS<br />Are actually<br />written.
            </Title>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={{ ...BODY }}>
              Everything on this page below the fold is a design. {written} of its {total} years
              exist as finished books that a teacher could photocopy tomorrow. The other{' '}
              {total - written} are a plan, and the ladder marks each one so you never have to
              guess which you are reading.
            </p>
            <p style={{ ...BODY, marginBottom: 0, color: WHITE }}>
              No student has completed this pathway, because no student could have. It is
              published now because the shape of it is the thing worth arguing with, not
              because it is done.
            </p>
          </FadeIn>
        </div>
      </Section>

      {/* ── Why compression is the problem ─────────────── */}
      <Section>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
          gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'start' }}>
          <FadeIn>
            <Eyebrow>Where the idea comes from</Eyebrow>
            <Title size="clamp(1.9rem, 4vw, 3.2rem)">Two years is not<br />how long it takes<br />to understand it.</Title>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={BODY}>
              This is Cindy&rsquo;s account, and it is the reason the organization is built the
              way it is. She had already run a business, profitably, for years. She went
              through the two years anyway, and it was only inside them that the way a
              business actually thinks became something she held rather than something she
              improvised.
            </p>
            <p style={BODY}>
              Her read on that is not that the material is hard. It is that two years is a
              compression schedule, priced and paced for adults who are already fluent in the
              vocabulary, and that the compression is doing a lot of the damage. Spread the
              same ideas over the years a child is in school anyway and there is no schedule
              to keep up with. There is one idea a week, met again the next year in a slightly
              larger form.
            </p>
            <div style={{ borderLeft: `3px solid ${GOLD}`, paddingLeft: 'clamp(1.1rem, 3vw, 1.75rem)',
              margin: '2rem 0' }}>
              <Quote size={18} color={`${GOLD}70`} style={{ marginBottom: '0.6rem' }} />
              <p style={{ fontFamily: SERIF, fontSize: 'clamp(1.15rem, 2.2vw, 1.4rem)',
                fontStyle: 'italic', fontWeight: 600, lineHeight: 1.55, color: WHITE,
                marginBottom: '0.7rem' }}>
                {FOUNDER.quotes.theMBA}
              </p>
              <cite style={{ fontSize: '0.7rem', fontStyle: 'normal', fontWeight: 700,
                letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: GOLD }}>
                {FOUNDER.name}
              </cite>
            </div>
            <p style={{ ...BODY, marginBottom: 0, color: WHITE }}>
              She graduated at the top of her class at every stage, and says plainly that this
              was effort rather than talent. That matters here for one reason: the pathway is
              built for students willing to work, and she is not asking them for anything she
              did not do.
            </p>
          </FadeIn>
        </div>
      </Section>

      {/* ── The ladder ─────────────────────────────────── */}
      <Section tinted>
        <FadeIn style={{ marginBottom: '2rem' }}>
          <Eyebrow color={GOLD}>The ladder</Eyebrow>
          <Title size="clamp(1.9rem, 4vw, 3.4rem)">One idea a year,<br />for ten years.</Title>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: MUTED, maxWidth: '64ch',
            marginTop: '1rem' }}>
            Each row is a school year, what a student does in it, and the graduate course that
            eventually formalizes the same idea. That last column is our own mapping. It is an
            argument about the order things can be learned in, not a claim of equivalence, and
            certainly not a claim of credit.
          </p>
        </FadeIn>

        <div style={{ overflowX: 'auto', paddingBottom: '0.5rem' }}>
          <div style={{ minWidth: '600px', borderBottom: '1px solid rgba(45,91,227,0.1)' }}>
            {PATHWAY.map((s, i) => (
              <FadeIn key={s.grade} delay={Math.min(i * 0.04, 0.3)}><Rung s={s} /></FadeIn>
            ))}
          </div>
        </div>

        <FadeIn delay={0.2}>
          <p style={{ fontSize: '0.78rem', lineHeight: 1.7, color: SLATE_3, marginTop: '1.5rem',
            maxWidth: '74ch' }}>
            Grades 4, 5 and 6 are written because that is where the work started, not
            because they are the most important rungs. The elementary band is now
            continuous. Grade 3 and the upper grades are the furthest out and the most
            likely to change once a teacher has run a full year and told us what actually
            happened.
          </p>
        </FadeIn>
      </Section>

      {/* ── What this is not ───────────────────────────── */}
      <Section>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(2rem, 5vw, 3.5rem)', alignItems: 'start' }}>
          <FadeIn>
            <Eyebrow color="#B42318">Say it before someone else does</Eyebrow>
            <Title size="clamp(1.8rem, 3.6vw, 2.9rem)">This is not<br />an MBA.</Title>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: MUTED, maxWidth: '52ch',
              marginTop: '1rem' }}>
              There is a version of this page that ends with a student graduating high school
              having quietly earned a business degree. It is a better sentence than it is a
              true one, so here is the true one instead.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex',
              flexDirection: 'column', gap: '0.9rem' }}>
              {NOT_AN_MBA.map((x) => (
                <li key={x} style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-start' }}>
                  <XCircle size={15} color="#B42318" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span style={{ fontSize: '0.88rem', lineHeight: 1.7, color: MUTED }}>{x}</span>
                </li>
              ))}
            </ul>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.8, color: WHITE, marginTop: '1.75rem',
              maxWidth: '56ch' }}>
              What a student would have instead, if all ten years get written and they take
              them, is ten years of practice with the ideas a business degree covers, met
              early enough to change what they can see. That is a smaller claim, and it is
              the one we can defend.
            </p>
          </FadeIn>
        </div>
      </Section>

      {/* ── Opt in ─────────────────────────────────────── */}
      <Section tinted accent={GOLD}>
        <FadeIn style={{ marginBottom: '2.5rem' }}>
          <Eyebrow color={GOLD_L}>How a student gets in</Eyebrow>
          <Title size="clamp(1.9rem, 4vw, 3.4rem)">Nobody can be<br />made to want this.</Title>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: MUTED, maxWidth: '64ch',
            marginTop: '1rem' }}>
            The pathway is offered, never required, and that is a design constraint rather
            than a courtesy. A student who does not want it will not absorb it, and a student
            who does should not have to get past us to reach it.
          </p>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
          gap: '1rem' }}>
          {OPT_IN.map((c, i) => (
            <FadeIn key={c.title} delay={i * 0.07}>
              <Card accent={GOLD} pad="1.6rem">
                <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.97rem', fontWeight: 700, color: WHITE,
                  lineHeight: 1.4, marginBottom: '0.6rem' }}>{c.title}</h3>
                <p style={{ fontSize: '0.84rem', lineHeight: 1.75, color: MUTED }}>{c.body}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.3}>
          <div style={{ marginTop: '1.5rem', padding: '1.5rem 1.75rem',
            background: '#FFFFFF', border: '1px solid rgba(255,122,61,0.2)',
            borderRadius: '4px', maxWidth: '76ch' }}>
            <p style={{ fontSize: '0.87rem', lineHeight: 1.8, color: MUTED, margin: 0 }}>
              The honest risk in an opt-in design is that the students who opt in are the ones
              who were already going to be fine, and that the program ends up widening the gap
              it was built to close. We do not have an answer to that yet. It is written down
              as a stated risk on the{' '}
              <Link href="/impact" style={{ color: GOLD_L, textDecoration: 'none',
                borderBottom: `1px solid ${GOLD}55` }}>evidence page</Link>, and it is one of
              the first things a pilot would need to measure.
            </p>
          </div>
        </FadeIn>
      </Section>

      {/* ── Research ───────────────────────────────────── */}
      <Section>
        <FadeIn style={{ marginBottom: '2.5rem' }}>
          <Eyebrow color={GREEN_L}>The research this leans on</Eyebrow>
          <Title size="clamp(1.9rem, 4vw, 3.4rem)">Including the paper<br />that says we are<br />probably wrong.</Title>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: MUTED, maxWidth: '66ch',
            marginTop: '1rem' }}>
            None of the work below evaluates our curriculum. It is the published literature on
            spacing, on childhood financial development, on entrepreneurship education and on
            motivation, and it is what the design is reasoning from. Each entry says what the
            study found and where its support for us runs out. The field is contested, and the
            strongest single result in it cuts against the whole category.
          </p>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))',
          gap: '1rem' }}>
          {RESEARCH.map((c, i) => (
            <FadeIn key={c.title} delay={Math.min(i * 0.05, 0.3)}>
              <CitationCard c={c} />
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.3}>
          <p style={{ fontSize: '0.82rem', lineHeight: 1.8, color: SLATE_3, marginTop: '2rem',
            maxWidth: '74ch' }}>
            If you know this literature better than we do and think we have characterized a
            paper wrongly, we would rather hear it than not. The citation list lives in one
            file in the site&rsquo;s source, the same file every other factual claim on this site
            is held in.
          </p>
        </FadeIn>
      </Section>

      {/* ── CTA ────────────────────────────────────────── */}
      <Section tinted>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '1.5rem', padding: '2rem 2.5rem', background: '#FFFFFF',
            border: '1px solid rgba(255,122,61,0.18)', borderRadius: '4px' }}>
            <div>
              <p style={{ fontFamily: DISPLAY, fontSize: '2rem', letterSpacing: '-0.01em',
                color: WHITE, marginBottom: '0.4rem' }}>Ten years starts with one.</p>
              <p style={{ fontSize: '0.85rem', color: MUTED, maxWidth: '56ch' }}>
                {written} of the {total} years are finished and free to download. The fastest
                way to find out whether any of this holds up is for one teacher to run one of
                them.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href="/for-schools" className="btn-gold">For schools <ArrowUpRight size={14} /></Link>
              <Link href="/resources" className="btn-ghost">Download the books <ArrowUpRight size={13} /></Link>
            </div>
          </div>
        </FadeIn>
      </Section>
    </Page>
  );
}
