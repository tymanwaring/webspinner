import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Webspinner | Front-End Consulting',
  description: 'We spin digital experiences into reality. Front-end consulting with 10+ years of craft, specializing in React, Next.js, and design systems.',
  generator: 'v0.app',
  keywords: ['front-end consulting', 'React', 'Next.js', 'web development', 'design systems', 'TypeScript'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Webspinner | Front-End Consulting',
    description: 'We spin digital experiences into reality. Front-end consulting with 10+ years of craft.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#141210',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
