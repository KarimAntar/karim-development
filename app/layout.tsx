import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: 'Karim Development - Professional Web Solutions',
  description: 'Expert web development and software solutions by Karim Development. Specializing in modern web technologies, custom applications, and digital transformation.',
  keywords: 'web development, software solutions, react, next.js, typescript, karim development',
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