import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: 'Karim Development',
  description: 'Karim Antar - Full-stack web developer specializing in React, Next.js, Laravel, and Node.js. Based in Cairo, Egypt. View my portfolio of web applications and get in touch.',
  keywords: 'web development, react, next.js, laravel, node.js, full-stack developer, cairo, egypt, karim antar',
  icons: {
    icon: '/logo_with_gradient.png',
    apple: '/logo_with_gradient.png',
  },
  openGraph: {
    title: 'Karim Development',
    description: 'Karim Antar - Full-stack web developer specializing in React, Next.js, Laravel, and Node.js. Based in Cairo, Egypt.',
    images: ['/logo_with_gradient.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Karim Development',
    description: 'Karim Antar - Full-stack web developer specializing in React, Next.js, Laravel, and Node.js.',
    images: ['/logo_with_gradient.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={montserrat.className}>
        <div className="animated-bg"></div>
        {children}
      </body>
    </html>
  )
}
