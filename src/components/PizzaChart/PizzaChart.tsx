"use client"

import { Pie, PieChart, Sector } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import type { PieSectorDataItem } from "recharts/types/polar/Pie"
import type { CallsByUrgency } from "@/types/CountCallsByUrgency/CountCallsByUrgency"

export const description = "A donut chart with an active sector"

type ChartDataObj = {
  urgency: string,
  chamados: number,
  fill: string
}

const chartConfig = {
  ALTA: {
    label: "Alta urgência: ",
    color: "var(--chart-1)",
  },
  MEDIA: {
    label: "Media urgência: ",
    color: "var(--chart-1)",
  },
  BAIXA: {
    label: "Baixa urgência:",
    color: "var(--chart-1)",
  }
} satisfies ChartConfig

type RequestUrgencies = {
  urgencias: Array<CallsByUrgency>
}

export function ChartPieDonutActive({urgencias} : RequestUrgencies) {
  let chartData : ChartDataObj[] = [];

  urgencias.map(urgencia => {
    var tipoUrgencia = urgencia.urgency;
    var color = ""
    switch(tipoUrgencia){
      case "ALTA": color = "red"; break;
      case "MEDIA": color = "yellow"; break;
      case "BAIXA": color = "green"; break;
    }

    chartData.push({chamados: urgencia.totalChamados, fill: color, urgency: urgencia.urgency});
  })

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Chamados por urgência</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto max-h-120 aspect-square"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="chamados"
              nameKey="urgency"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={0}
              activeShape={({
                outerRadius = 2,
                ...props
              }: PieSectorDataItem) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
