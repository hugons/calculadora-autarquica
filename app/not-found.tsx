import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileQuestion } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="text-center space-y-6">
        <FileQuestion className="h-24 w-24 mx-auto text-muted-foreground" />
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Página não encontrada</h1>
          <p className="text-muted-foreground text-lg">A página que procura não existe ou foi removida.</p>
        </div>
        <Button asChild>
          <Link href="/">Voltar à página inicial</Link>
        </Button>
      </div>
    </div>
  )
}
