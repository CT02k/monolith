import { IBM_Plex_Mono, Montserrat } from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils"

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "dark",
        "antialiased",
        fontMono.variable,
        "font-sans",
        montserrat.variable
      )}
    >
      <body>{children}</body>
    </html>
  )
}
