import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'PepperTracker - Dog Medication Tracker',
  description: 'Track your dog\'s morning and evening medications',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
