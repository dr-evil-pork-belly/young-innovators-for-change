import type { Metadata } from 'next'

// The two typefaces, self-hosted.
//
// These were previously requested with an @import of a Google Fonts stylesheet
// at the top of globals.css. That @import does not survive the Tailwind v4
// build: the shipped CSS contained no @import, no @font-face and no reference
// to fonts.googleapis.com, so neither face had ever loaded and every page was
// rendering in the fallbacks, Impact for headings and system-ui for text.
//
// Imported as modules instead, which the bundler cannot silently drop. Self
// hosting also takes a third-party request off every page load.
// Baloo 2 and Public Sans are the two faces the workbooks are set in. See
// brand/brand.py in the curriculum repository, which names them as
// FONT_DISPLAY and FONT_BODY.
//
// Both are variable, so the display face has a real 800 and the browser never
// has to synthesize a bold. That is what smeared sixty-three headings when the
// display face was Bebas Neue, which ships one weight.
//
// The registered family names carry the word Variable ('Baloo 2 Variable',
// 'Public Sans Variable') and globals.css names them that way. Naming only
// 'Baloo 2' falls through to the fallback silently.
import '@fontsource-variable/baloo-2'
import '@fontsource-variable/public-sans'
import './globals.css'
import Navbar from '@/components/Navbar'
import { ORG } from '@/content/org'

export const metadata: Metadata = {
  metadataBase: new URL(ORG.url),
  title: {
    default: 'Young Innovators for Change',
    template: '%s · Young Innovators for Change',
  },
  description:
    'We build rigorous K–12 business and mathematics curriculum and give it away. ' +
    'A California 501(c)(3) placing full-year programs in classrooms at no cost to students or schools.',
  applicationName: ORG.legalName,
  keywords: [
    'nonprofit', 'K-12 education', 'financial literacy', 'entrepreneurship education',
    'discrete mathematics', 'Grade 2 curriculum', 'free curriculum', 'California',
  ],
  openGraph: {
    type: 'website',
    siteName: ORG.legalName,
    url: ORG.url,
    title: 'Young Innovators for Change',
    description:
      'We build rigorous K–12 curriculum and give it away. A California 501(c)(3).',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: ORG.legalName }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Young Innovators for Change',
    description: 'We build rigorous K–12 curriculum and give it away.',
    images: ['/og.png'],
  },
  robots: { index: true, follow: true },
}

/** Structured data so search engines and funders' tools read the org correctly. */
const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'NGO',
  name: ORG.legalName,
  url: ORG.url,
  taxID: ORG.taxStatus.ein,
  nonprofitStatus: 'Nonprofit501c3',
  foundingDate: ORG.incorporation.initialFilingDate,
  address: {
    '@type': 'PostalAddress',
    streetAddress: ORG.registeredAddress.line1,
    addressLocality: 'San Francisco',
    addressRegion: 'CA',
    postalCode: '94108',
    addressCountry: 'US',
  },
  areaServed: ORG.serviceArea,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body>
        <Navbar />
        <main style={{ paddingTop: '4.5rem' }}>{children}</main>
      </body>
    </html>
  )
}
