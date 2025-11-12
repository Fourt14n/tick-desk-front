"use client"

import { Pie, PieChart, Sector } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
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

export const description = "A donut chart with an active sector"

const chartData = [
  { urgency: "ALTA", chamados: 275, fill: "red" },
  { urgency: "MEDIA", chamados: 200, fill: "yellow" },
  { urgency: "BAIXA", chamados: 187, fill: "green" },
]

const chartConfig = {
  chamados: {
    label: "Chamados",
  },
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

export function ChartPieDonutActive() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Chamados por urgência</CardTitle>
        <CardDescription>Último mês</CardDescription>
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
