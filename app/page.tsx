import { ElectionCalculator } from "@/components/custom/election-calculator"

export default function HomePage() {
  return (
    <div className="container mx-auto py-8 md:py-12 px-6">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">Calculadora Eleitoral</h1>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            Simule a distribuição de mandatos nas eleições autárquicas da Amadora utilizando o método D'Hondt
          </p>
        </div>

        <ElectionCalculator />

        <div className="mt-12 rounded-lg bg-muted/50 p-6 space-y-3">
          <h2 className="text-lg font-semibold">Como funciona o Método D'Hondt?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            O método D'Hondt é um sistema de representação proporcional utilizado para distribuir mandatos em eleições.
            Os votos de cada partido são sucessivamente divididos por 1, 2, 3, 4, etc., e os mandatos são atribuídos aos
            maiores quocientes obtidos. Este método favorece ligeiramente os partidos com maior votação.
          </p>
        </div>
      </div>
    </div>
  )
}
