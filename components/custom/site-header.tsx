import Link from "next/link"
import { Vote } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl flex flex-col md:flex-row h-auto md:h-16 items-center justify-between py-4 md:py-0 gap-4 md:gap-0 px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
          <Vote className="h-6 w-6 text-primary" />
          <span>Amadora - Autárquicas 2025</span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/historico/autarquicas-2021"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Autárquicas 2021
          </Link>
          <Link
            href="/historico/legislativas-2024"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Legislativas 2024
          </Link>
        </nav>
      </div>
    </header>
  )
}
