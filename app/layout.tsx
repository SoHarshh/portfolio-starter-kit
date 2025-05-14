import './global.css'
import type { Metadata } from 'next'
import { Inconsolata } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { baseUrl } from './sitemap'
import { ThemeProvider } from './components/theme-provider'

// Load Inconsolata font
const inconsolata = Inconsolata({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Harsh Soni',
    template: '%s | Harsh Soni',
  },
  description: 'This is my portfolio.',
  openGraph: {
    title: 'Harsh Soni',
    description: 'This is my portfolio.',
    url: baseUrl,
    siteName: 'Harsh Soni',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={inconsolata.className}
      style={{ backgroundColor: 'transparent', height: '100%' }}
    >
      <body className="antialiased min-h-screen w-full" style={{ backgroundColor: 'transparent' }}>
        <ThemeProvider>
          <div className="max-w-xl mx-4 mt-8 lg:mx-auto">
            <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0" style={{ backgroundColor: 'transparent' }}>
              {children}
              <Analytics />
              <SpeedInsights />
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
