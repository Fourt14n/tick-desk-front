"use client"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

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
import type { CallsByTeam } from "@/types/CountCallsByTeam/CountCallsByTeam"

export const description = "A bar chart with a label"

const chartConfig = {
  chamados: {
    label: "Chamados atribuídos: ",
    color: "var(--chart-1)",
  }
} satisfies ChartConfig

type RequestTeams = {
  times: Array<CallsByTeam>
}

export function ChartBarLabel({times} : RequestTeams) {
  console.log("times", times)
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Chamados por equipe</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        <ChartContainer className="max-h-120 aspect-square" config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={times}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="teamName"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent label={"teamName"} />}
            />
            <Bar dataKey="totalChamados" fill="#2345" radius={8}>
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
