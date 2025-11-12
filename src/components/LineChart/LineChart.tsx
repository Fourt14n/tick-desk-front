"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "A bar chart with a label"

const chartData = [
  { equipe: "Desenvolvimento", chamados: 186 },
  { equipe: "Marketing", chamados: 305 },
  { equipe: "Suporte N1", chamados: 237 },
  { equipe: "Suporte N2", chamados: 73 },
]

const chartConfig = {
  chamados: {
    label: "Chamados atribuídos: ",
    color: "var(--chart-1)",
  }
} satisfies ChartConfig

export function ChartBarLabel() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Chamados por equipe</CardTitle>
        <CardDescription>Ultimo mês</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col">
        <ChartContainer className="max-h-120 aspect-square" config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="equipe"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent label={"equipe"} />}
            />
            <Bar dataKey="chamados" fill="#2345" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
