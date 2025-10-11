"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PARTIDOS, OUTROS_VOTOS, type VotosData, type ResultadosData } from "@/lib/constants"
import { calcularDHondt } from "@/lib/dhondt"
import { saveVotos, loadVotos } from "@/lib/storage"
import { Calculator } from "lucide-react"

interface VotesTableProps {
  autarquiaId: string
  autarquiaNome: string
  totalMandatos: number
}

export function VotesTable({ autarquiaId, autarquiaNome, totalMandatos }: VotesTableProps) {
  const [votos, setVotos] = useState<VotosData>({})
  const [resultados, setResultados] = useState<ResultadosData>({})
  const [isCalculating, setIsCalculating] = useState(false)

  // Load votes from localStorage on mount
  useEffect(() => {
    const savedVotos = loadVotos(autarquiaId as any)
    if (savedVotos) {
      setVotos(savedVotos)
    }
  }, [autarquiaId])

  // Save votes to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(votos).length > 0) {
      saveVotos(autarquiaId as any, votos)
    }
  }, [votos, autarquiaId])

  const handleVotoChange = (id: string, value: string) => {
    const numValue = value === "" ? 0 : Number.parseInt(value, 10)
    if (!isNaN(numValue) && numValue >= 0) {
      setVotos((prev) => ({
        ...prev,
        [id]: numValue,
      }))
      // Clear results when votes change
      setResultados({})
    }
  }

  const handleCalcular = () => {
    setIsCalculating(true)

    // Simulate a brief calculation delay for UX feedback
    setTimeout(() => {
      const novosResultados = calcularDHondt(votos, totalMandatos)
      setResultados(novosResultados)
      setIsCalculating(false)
    }, 300)
  }

  const handleLimpar = () => {
    setVotos({})
    setResultados({})
  }

  const totalVotos = Object.values(votos).reduce((sum, v) => sum + (v || 0), 0)
  const totalEleitos = Object.values(resultados).reduce((sum, v) => sum + (v || 0), 0)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-balance">{autarquiaNome}</CardTitle>
        <p className="text-sm text-muted-foreground">
          Total de mandatos a atribuir: <span className="font-semibold text-foreground">{totalMandatos}</span>
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%]">Partido/Lista</TableHead>
                <TableHead className="text-right">Nº de Votos</TableHead>
                <TableHead className="text-right">Nº de Eleitos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PARTIDOS.map((partido) => (
                <TableRow key={partido.id}>
                  <TableCell className="font-medium">{partido.nome}</TableCell>
                  <TableCell className="text-right">
                    <Input
                      type="number"
                      min="0"
                      value={votos[partido.id] || ""}
                      onChange={(e) => handleVotoChange(partido.id, e.target.value)}
                      className="max-w-[150px] ml-auto text-right"
                      placeholder="0"
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-semibold text-primary">{resultados[partido.id] || "-"}</span>
                  </TableCell>
                </TableRow>
              ))}
              {OUTROS_VOTOS.map((outro) => (
                <TableRow key={outro.id} className="bg-muted/30">
                  <TableCell className="font-medium text-muted-foreground">{outro.nome}</TableCell>
                  <TableCell className="text-right">
                    <Input
                      type="number"
                      min="0"
                      value={votos[outro.id] || ""}
                      onChange={(e) => handleVotoChange(outro.id, e.target.value)}
                      className="max-w-[150px] ml-auto text-right"
                      placeholder="0"
                    />
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">-</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pt-4 border-t">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              Total de votos:{" "}
              <span className="font-semibold text-foreground">{totalVotos.toLocaleString("pt-PT")}</span>
            </p>
            {totalEleitos > 0 && (
              <p className="text-sm text-muted-foreground">
                Eleitos distribuídos: <span className="font-semibold text-primary">{totalEleitos}</span> /{" "}
                {totalMandatos}
              </p>
            )}
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" onClick={handleLimpar} className="flex-1 sm:flex-none bg-transparent">
              Limpar
            </Button>
            <Button
              onClick={handleCalcular}
              disabled={isCalculating || totalVotos === 0}
              className="flex-1 sm:flex-none"
            >
              <Calculator className="mr-2 h-4 w-4" />
              {isCalculating ? "A calcular..." : "Calcular Eleitos"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
