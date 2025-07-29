
"use client"

import { useState, useEffect } from 'react';
import { CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Zap, MoreVertical } from 'lucide-react';
import { BarChart, Bar } from 'recharts';
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { InteractiveCard } from '@/components/ui/interactive-card';

const chartConfig = {
  power: {
    label: "Power (MW)",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

const generateChartData = () => Array.from({ length: 20 }, (_, i) => ({
    name: `${i + 1}`,
    power: 2.5 + Math.random() * 0.5,
}));

// Initial static data to prevent hydration mismatch
const initialChartData = Array.from({ length: 20 }, (_, i) => ({ name: `${i + 1}`, power: 2.75 }));

export function SmartIotSensors() {
    const [power, setPower] = useState(2.75);
    const [voltage, setVoltage] = useState(13.81);
    const [chartData, setChartData] = useState(initialChartData);

  useEffect(() => {
    // Start interval for dynamic data only on the client
    const interval = setInterval(() => {
      setPower(2.75 + (Math.random() - 0.5) * 0.1);
      setVoltage(13.81 + (Math.random() - 0.5) * 0.05);
      setChartData(generateChartData());
    }, 2000);

    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <InteractiveCard className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            <Zap className="w-6 h-6 text-primary" />
            <CardTitle className="font-headline">Smart IoT Sensors</CardTitle>
          </div>
          <CardDescription>Live data from your main industrial meters.</CardDescription>
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
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg">
            <p className="text-4xl font-bold tracking-tighter">{power.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">Power (MW)</p>
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg">
            <p className="text-4xl font-bold tracking-tighter">{voltage.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">Voltage (kV)</p>
          </div>
        </div>
        <div className="mt-4 h-[120px]">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <BarChart 
                data={chartData} 
                margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            >
              <ChartTooltip
                cursor={false}
                contentStyle={{
                  background: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Bar dataKey="power" fill="hsl(var(--primary))" radius={2} barSize={4} />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </InteractiveCard>
  );
}
