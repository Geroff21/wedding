// app/layout.tsx
import type { Metadata } from 'next'
import { Courier_Prime } from 'next/font/google'
import './globals.css'



const courier = Courier_Prime({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-courier',
})

export const metadata: Metadata = {
  title: 'Матвей & София | Свадьба',
  description: 'Приглашение на нашу свадьбу',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={`${courier.variable} antialiased font-['Courier_New',_monospace]`}>
        {children}
      </body>
    </html>
  )
}