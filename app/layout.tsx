import type { Metadata } from 'next'
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body>
        <Navbar />
        <main style={{ paddingTop: '5rem' }}>{children}</main>
      </body>
    </html>
  )
}
