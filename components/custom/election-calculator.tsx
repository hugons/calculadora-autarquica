"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { VotesTable } from "./votes-table"
import { AUTARQUIAS } from "@/lib/constants"

export function ElectionCalculator() {
  const [selectedTab, setSelectedTab] = useState(AUTARQUIAS[0].id)

  return (
    <div className="w-full">
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="hidden lg:grid w-full grid-cols-8 h-auto bg-card p-2 mb-6">
          {AUTARQUIAS.map((autarquia) => (
            <TabsTrigger
              key={autarquia.id}
              value={autarquia.id}
              className="w-full h-auto py-2 px-1 text-xs leading-tight whitespace-normal text-center data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {autarquia.nome}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="lg:hidden mb-6">
          <Select value={selectedTab} onValueChange={setSelectedTab}>
            <SelectTrigger className="w-full bg-primary text-primary-foreground">
              <SelectValue placeholder="Selecione um órgão autárquico" />
            </SelectTrigger>
            <SelectContent>
              {AUTARQUIAS.map((autarquia) => (
                <SelectItem
                  key={autarquia.id}
                  value={autarquia.id}
                  className="focus:bg-primary focus:text-primary-foreground data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                >
                  {autarquia.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {AUTARQUIAS.map((autarquia) => (
          <TabsContent key={autarquia.id} value={autarquia.id}>
            <VotesTable autarquiaId={autarquia.id} autarquiaNome={autarquia.nome} totalMandatos={autarquia.mandatos} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
