import './globals.css'

export const metadata = {
  title: 'Buy Me a Coffee - Mongolia',
  description: 'Support your favorite creators with a virtual coffee!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}