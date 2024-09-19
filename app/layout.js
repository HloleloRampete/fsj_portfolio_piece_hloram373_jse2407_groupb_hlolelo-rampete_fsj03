import NavBar from "@/components/NavBar";
import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MandoZA E-commerce Store',
  description: 'Find the best products at the best prices',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  )
}