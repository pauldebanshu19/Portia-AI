import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ClientThemeProvider } from '@/components/ClientThemeProvider'

// const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ weight: ["400"], subsets: ['latin'] , variable: '--font-poppins'})

export const metadata: Metadata = {
  title: 'Portia AI',
  description: 'AI-powered exam prep & assessments.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className={` ${poppins.className}`}>
          <ClientThemeProvider>
            {children}
          </ClientThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
