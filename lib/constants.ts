export const PARTIDOS = [
  { id: "il", nome: "Iniciativa Liberal" },
  { id: "cdu", nome: "CDU" },
  { id: "ps", nome: "Partido Socialista" },
  { id: "amadora-resolve", nome: "Amadora Resolve" },
  { id: "adn", nome: "ADN" },
  { id: "be", nome: "Bloco de Esquerda" },
  { id: "livre", nome: "LIVRE" },
  { id: "chega", nome: "Chega" },
] as const

export const OUTROS_VOTOS = [
  { id: "brancos", nome: "Votos em Branco" },
  { id: "nulos", nome: "Votos Nulos" },
] as const

export const AUTARQUIAS = [
  { id: "camara-amadora", nome: "Câmara Municipal da Amadora", mandatos: 11 },
  { id: "asm-amadora", nome: "Assembleia Municipal da Amadora", mandatos: 33 },
  { id: "aguas-livres", nome: "Águas Livres", mandatos: 20 },
  { id: "alfragide", nome: "Alfragide", mandatos: 13 },
  { id: "encosta-do-sol", nome: "Encosta do Sol", mandatos: 19 },
  { id: "falagueira-venda-nova", nome: "Falagueira-Venda Nova", mandatos: 12 },
  { id: "mina-de-agua", nome: "Mina de Água", mandatos: 19 },
  { id: "venteira", nome: "Venteira", mandatos: 19 },
] as const

export type PartidoId = (typeof PARTIDOS)[number]["id"]
export type OutrosVotosId = (typeof OUTROS_VOTOS)[number]["id"]
export type AutarquiaId = (typeof AUTARQUIAS)[number]["id"]
export type VotoId = PartidoId | OutrosVotosId

export interface VotosData {
  [key: string]: number
}

export interface ResultadosData {
  [key: string]: number
}
