import type { VotosData, AutarquiaId } from "./constants"

const STORAGE_KEY_PREFIX = "autarquicas-votos-"

export function saveVotos(autarquiaId: AutarquiaId, votos: VotosData): void {
  if (typeof window === "undefined") return

  try {
    const key = `${STORAGE_KEY_PREFIX}${autarquiaId}`
    localStorage.setItem(key, JSON.stringify(votos))
  } catch (error) {
    console.error("Error saving votes to localStorage:", error)
  }
}

export function loadVotos(autarquiaId: AutarquiaId): VotosData | null {
  if (typeof window === "undefined") return null

  try {
    const key = `${STORAGE_KEY_PREFIX}${autarquiaId}`
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : null
  } catch (error) {
    console.error("Error loading votes from localStorage:", error)
    return null
  }
}

export function clearVotos(autarquiaId: AutarquiaId): void {
  if (typeof window === "undefined") return

  try {
    const key = `${STORAGE_KEY_PREFIX}${autarquiaId}`
    localStorage.removeItem(key)
  } catch (error) {
    console.error("Error clearing votes from localStorage:", error)
  }
}
