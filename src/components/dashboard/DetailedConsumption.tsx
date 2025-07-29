
"use client"

import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"
import { InteractiveCard } from "../ui/interactive-card";

const sensorData = [
    { name: 'Stamping Press 1', consumption: 1250.5 },
    { name: 'CNC Machine A', consumption: 980.2 },
    { name: 'Assembly Line 1', consumption: 750.8 },
    { name: 'Welding Robot 3', consumption: 680.1 },
    { name: 'HVAC - Zone 1', consumption: 550.6 },
  ];

const MAX_CONSUMPTION = Math.max(...sensorData.map(d => d.consumption));

const getBarColor = (value: number, max: number) => {
    const percentage = (value / max) * 100;
    if (percentage > 80) return 'bg-destructive/80';
    if (percentage > 50) return 'bg-yellow-500/80';
    return 'bg-primary/80';
}

const ConsumptionBar = ({ name, value }: {name: string, value: number}) => {
    const percentage = (value / MAX_CONSUMPTION) * 100;
    const barColor = getBarColor(value, MAX_CONSUMPTION);
    
    return (
        <div className="space-y-1">
            <div className="flex justify-between items-baseline">
                <p className="text-sm text-muted-foreground truncate">{name}</p>
                <p className="text-sm font-bold text-right tabular-nums text-foreground">{value.toFixed(1)} kWh</p>
            </div>
            <div className="w-full bg-muted/40 rounded-full h-2.5">
                <div 
                    className={`${barColor} h-2.5 rounded-full transition-all duration-500`} 
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    )
}

export function DetailedConsumption() {
  return (
    <InteractiveCard>
      <CardHeader>
        <div className="flex items-center gap-3">
            <BarChart3 className="w-6 h-6 text-primary" />
            <CardTitle className="font-headline">Detailed Consumption Breakdown</CardTitle>
        </div>
        <CardDescription>Monthly energy usage per sensor and actuator.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-y-4">
        {sensorData.map(sensor => (
            <ConsumptionBar key={sensor.name} name={sensor.name} value={sensor.consumption} />
        ))}
      </CardContent>
    </InteractiveCard>
  )
}
