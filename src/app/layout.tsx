// app/layout.tsx
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from "next/font/google";
import './globals.css'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: 'София & Матвей | Свадьба',
  description: 'Приглашение на нашу свадьбу',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}