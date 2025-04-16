import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Smarter Transport Solutions',
  description: 'Created with Smarter Transport Solutions',
  generator: 'Smarter Transport Solutions',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
