import React from "react"
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Lora } from 'next/font/google'

import './globals.css'

const _playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
})

const _lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Para ti, mi amor',
  description: 'Una invitacion especial de San Valentin',
}

export const viewport: Viewport = {
  themeColor: '#e8a0b4',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${_playfair.variable} ${_lora.variable} font-serif antialiased`}>
        {children}
      </body>
    </html>
  )
}
