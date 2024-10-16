import './globals.css'
import { ThemeProvider } from '../contexts/ThemeContext'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Buy Me a Coffee - Mongolia',
  description: 'Support your favorite creators with a virtual coffee!',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/shortcut-icon.png',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <ThemeProvider>
        <body>{children}</body>
      </ThemeProvider>
    </html>
  )
}
