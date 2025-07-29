
"use client"

import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CircleDotDashed } from "lucide-react"
import { InteractiveCard } from "../ui/interactive-card";

type SensorStatusType = "Operational" | "Needs Maintenance";

const sensorData: { name: string; status: SensorStatusType }[] = [
    { name: 'Heating & A/C Sensor', status: 'Operational' },
    { name: 'Lighting Sensor', status: 'Operational' },
    { name: 'Refrigeration Sensor', status: 'Needs Maintenance' },
    { name: 'Motion Sensor', status: 'Operational' },
    { name: 'Plug Load Sensor', status: 'Operational' },
];

const statusConfig: Record<SensorStatusType, { color: string; label: string }> = {
    'Operational': { color: 'bg-green-500', label: 'Operational' },
    'Needs Maintenance': { color: 'bg-orange-500', label: 'Needs Maintenance' },
};

const StatusIndicator = ({ status }: { status: SensorStatusType }) => {
    const { color, label } = statusConfig[status];
    return (
        <div className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
            <span>{label}</span>
        </div>
    );
};

export function SensorStatus() {
  return (
    <InteractiveCard className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-3">
            <CircleDotDashed className="w-6 h-6 text-primary" />
            <CardTitle className="font-headline">Sensor Status</CardTitle>
        </div>
        <CardDescription>Live operational status of facility sensors.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        {sensorData.map((sensor, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg h-[66px]">
            <p className="text-sm font-medium">{sensor.name}</p>
            <StatusIndicator status={sensor.status} />
          </div>
        ))}
      </CardContent>
    </InteractiveCard>
  )
}
