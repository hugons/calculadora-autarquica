import { PARTIDOS, type VotosData, type ResultadosData } from "./constants"

export interface QuocienteItem {
  partido: string
  quociente: number
  divisor: number
}

export function calcularDHondt(votos: VotosData, totalMandatos: number): ResultadosData {
  const resultados: ResultadosData = {}

  // Initialize all parties with 0 seats
  PARTIDOS.forEach((partido) => {
    resultados[partido.id] = 0
  })

  // Filter out parties with 0 votes, blank votes, and null votes
  const partidosValidos = PARTIDOS.filter((partido) => votos[partido.id] && votos[partido.id] > 0)

  if (partidosValidos.length === 0) {
    return resultados
  }

  // Calculate all quotients
  const quocientes: QuocienteItem[] = []

  partidosValidos.forEach((partido) => {
    const votosPartido = votos[partido.id]
    for (let divisor = 1; divisor <= totalMandatos; divisor++) {
      quocientes.push({
        partido: partido.id,
        quociente: votosPartido / divisor,
        divisor,
      })
    }
  })

  // Sort quotients in descending order
  quocientes.sort((a, b) => b.quociente - a.quociente)

  // Assign seats to the top N quotients
  for (let i = 0; i < totalMandatos && i < quocientes.length; i++) {
    const partidoId = quocientes[i].partido
    resultados[partidoId] = (resultados[partidoId] || 0) + 1
  }

  return resultados
}
