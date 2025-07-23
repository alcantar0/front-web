import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Apoio Calouros',
  description: 'Sistema de Apoio a Calouros',
  icons: {
    icon: '/images/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
