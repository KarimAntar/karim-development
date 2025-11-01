import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: 'Karim Antar - Web Developer Portfolio',
  description: 'Karim Antar - Full-stack web developer specializing in React, Next.js, Laravel, and Node.js. Based in Cairo, Egypt. View my portfolio of web applications and get in touch.',
  keywords: 'web development, react, next.js, laravel, node.js, full-stack developer, cairo, egypt, karim antar',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <div className="animated-bg"></div>
        {children}
      </body>
    </html>
  )
}
