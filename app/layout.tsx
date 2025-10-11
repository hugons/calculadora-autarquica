import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { SiteHeader } from "@/components/custom/site-header"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Calculadora Eleitoral Autárquicas Amadora",
  description: "Simulador de distribuição de mandatos pelo método D'Hondt para as eleições autárquicas da Amadora",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>
          <SiteHeader />
          <main className="min-h-[calc(100vh-4rem)]">{children}</main>
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
