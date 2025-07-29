
"use client"

import { CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, AreaChart, Area, Tooltip, Label } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"
import { TrendingUp, MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { InteractiveCard } from '@/components/ui/interactive-card';

const dailyData = [
  { time: '00:00', consumption: 120 }, { time: '03:00', consumption: 80 },
  { time: '06:00', consumption: 250 }, { time: '09:00', consumption: 310 },
  { time: '12:00', consumption: 280 }, { time: '15:00', consumption: 220 },
  { time: '18:00', consumption: 450 }, { time: '21:00', consumption: 300 },
];

const weeklyData = [
  { day: 'Mon', consumption: 2200 }, { day: 'Tue', consumption: 2500 },
  { day: 'Wed', consumption: 2100 }, { day: 'Thu', consumption: 2800 },
  { day: 'Fri', consumption: 3000 }, { day: 'Sat', consumption: 3500 },
  { day: 'Sun', consumption: 3200 },
];

const monthlyData = [
  { month: 'Jan', consumption: 85000, trend: 82000 }, { month: 'Feb', consumption: 78000, trend: 84000 },
  { month: 'Mar', consumption: 90000, trend: 86000 }, { month: 'Apr', consumption: 82000, trend: 88000 },
  { month: 'May', consumption: 95000, trend: 90000 }, { month: 'Jun', consumption: 110000, trend: 92000 },
];

const chartConfig = {
  consumption: {
    label: "kWh",
    color: "hsl(var(--chart-2))",
  },
  trend: {
    label: "Trend",
    color: "hsl(var(--chart-1))",
  }
} satisfies ChartConfig

export function HistoricalTrends() {
  return (
    <InteractiveCard>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-primary" />
            <CardTitle className="font-headline">Energy Consumption Trends</CardTitle>
          </div>
          <CardDescription>Analyze your industrial energy consumption over different periods.</CardDescription>
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
      <CardContent>
        <Tabs defaultValue="monthly">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          <TabsContent value="daily">
            <ChartContainer config={chartConfig} className="w-full h-[250px]">
              <BarChart data={dailyData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }} barCategoryGap="20%">
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis unit="kWh" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <defs>
                  <linearGradient id="fillConsumption" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <Bar dataKey="consumption" fill="url(#fillConsumption)" radius={4} />
              </BarChart>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="weekly">
            <ChartContainer config={chartConfig} className="w-full h-[250px]">
              <LineChart data={weeklyData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis unit="kWh" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip cursor={true} content={<ChartTooltipContent indicator="line" />} />
                <Line type="monotone" dataKey="consumption" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={{fill: "hsl(var(--chart-2))", r:4}} />
              </LineChart>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="monthly">
            <ChartContainer config={chartConfig} className="w-full h-[250px]">
              <AreaChart
                  data={monthlyData}
                  margin={{
                    top: 20,
                    right: 20,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <defs>
                    <linearGradient id="colorConsumption" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `${Number(value) / 1000}`} >
                    <Label value="Consumption (MWh)" angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fill: 'hsl(var(--muted-foreground))' }} />
                  </YAxis>
                  <Tooltip cursor={true} content={<ChartTooltipContent indicator="line" />} />
                  <Area type="monotone" dataKey="consumption" stroke="hsl(var(--chart-2))" strokeWidth={2} fillOpacity={1} fill="url(#colorConsumption)" />
                  <Area type="monotone" dataKey="trend" stroke="hsl(var(--chart-1))" strokeWidth={2} fillOpacity={1} fill="url(#colorTrend)" />
              </AreaChart>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </InteractiveCard>
  );
}
