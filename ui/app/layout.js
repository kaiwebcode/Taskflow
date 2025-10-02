import { Toaster } from 'sonner'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Crypto Dashboard',
  description: 'Frontend Developer Intern Assignment',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen bg-gray-100">
          {children}
          <Toaster richColors position="top-right" />
        </main>
      </body>
    </html>
  )
}
