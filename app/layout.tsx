import './globals.css'
import { ThemeProvider } from '../contexts/ThemeContext'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Buy Me a Coffee - Mongolia',
  description: 'Support your favorite creators with a virtual coffee!',
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
