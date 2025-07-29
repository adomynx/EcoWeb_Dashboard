
"use client"

import { CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Euro, MoreVertical } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell } from "recharts"
import type { ChartConfig } from "@/components/ui/chart"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { InteractiveCard } from '@/components/ui/interactive-card';

const costData = [
  { name: 'Machinery', value: 45000, fill: "hsl(var(--chart-1))" },
  { name: 'Lighting', value: 15000, fill: "hsl(var(--chart-2))" },
  { name: 'Cooling Systems (HVAC)', value: 25000, fill: "hsl(var(--chart-3))" },
  { name: 'Ancillary', value: 5000, fill: "hsl(var(--chart-4))" },
];

const chartConfig = {
  cost: {
    label: "Cost",
  },
  Machinery: {
    label: "Machinery",
  },
  Lighting: {
    label: "Lighting",
  },
  "Cooling Systems (HVAC)": {
    label: "Cooling Systems (HVAC)",
  },
  Ancillary: {
    label: "Ancillary Systems",
  },
} satisfies ChartConfig

const costs = {
  today: 3250,
  week: 22750,
  month: 91000,
};

export function CostAnalysis() {
  const formatCost = (value: number) => {
    if (value >= 1000) {
      return `€${(value / 1000).toFixed(1)}k`;
    }
    return `€${value.toFixed(2)}`;
  }

  return (
    <InteractiveCard className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            <Euro className="w-6 h-6 text-primary" />
            <CardTitle className="font-headline">Cost Analysis</CardTitle>
          </div>
          <CardDescription>Estimated electricity costs based on usage.</CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Export Data</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="bg-muted/50 p-3 rounded-lg">
            <p className="text-sm text-muted-foreground">Today</p>
            <p className="text-2xl font-bold">{formatCost(costs.today)}</p>
          </div>
          <div className="bg-muted/50 p-3 rounded-lg">
            <p className="text-sm text-muted-foreground">This Week</p>
            <p className="text-2xl font-bold">{formatCost(costs.week)}</p>
          </div>
          <div className="bg-muted/50 p-3 rounded-lg">
            <p className="text-sm text-muted-foreground">This Month</p>
            <p className="text-2xl font-bold">{formatCost(costs.month)}</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
            <ChartContainer config={chartConfig} className="min-h-[150px] w-full">
                 <PieChart>
                    <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                    <Pie data={costData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={70} paddingAngle={5}>
                        {costData.map((entry) => (
                            <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                        ))}
                    </Pie>
                </PieChart>
            </ChartContainer>
            <p className="text-xs text-muted-foreground mt-2">Monthly Cost Breakdown</p>
        </div>
      </CardContent>
    </InteractiveCard>
  );
}
