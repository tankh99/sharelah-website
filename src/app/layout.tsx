import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Head from 'next/head'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'ShareLah SG - Umbrella Sharing Service',
  description: 'Singapore\'s Community Umbrella Sharing Service - Stay dry and help others do the same!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-[var(--color-background)] text-[var(--color-foreground)]`}>
        <Header />
        <div className="pt-14">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
