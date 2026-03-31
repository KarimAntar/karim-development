import type { Metadata } from 'next'
import { Space_Grotesk, Manrope } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Karim Development | Architectural Digital Excellence',
  description: 'Karim Antar — Full Stack Web Developer based in Cairo, Egypt. Engineering excellence in every line of code. React, Next.js, Node.js, TypeScript.',
  keywords: 'web development, react, next.js, node.js, full-stack developer, cairo, egypt, karim antar, karim development',
  icons: {
    icon: '/logo_with_gradient.png',
    apple: '/logo_with_gradient.png',
  },
  openGraph: {
    title: 'Karim Development | Architectural Digital Excellence',
    description: 'Karim Antar — Full Stack Web Developer. React, Next.js, Node.js, TypeScript. Based in Cairo, Egypt.',
    images: ['/logo_with_gradient.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Karim Development',
    description: 'Karim Antar — Full Stack Web Developer. React, Next.js, Node.js.',
    images: ['/logo_with_gradient.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${manrope.variable} antialiased`}
        suppressHydrationWarning
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
