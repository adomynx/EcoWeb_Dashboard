
"use client"

import { useState } from 'react';
import { CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Bell, BellRing, Trash2, MoreVertical } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { InteractiveCard } from '@/components/ui/interactive-card';

interface Alert {
  id: number;
  threshold: number;
}

export function Alerts() {
  const { toast } = useToast()
  const [threshold, setThreshold] = useState('');
  const [alerts, setAlerts] = useState<Alert[]>([
    { id: 1, threshold: 5000 },
  ]);

  const handleSetAlert = (e: React.FormEvent) => {
    e.preventDefault();
    const numericThreshold = parseFloat(threshold);
    if (!numericThreshold || numericThreshold <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid positive number for the threshold.",
        variant: "destructive",
      })
      return;
    }
    setAlerts([...alerts, { id: Date.now(), threshold: numericThreshold }]);
    setThreshold('');
    toast({
      title: "Alert Set!",
      description: `You will be notified if usage exceeds ${numericThreshold} kWh.`,
    })
  };

  const removeAlert = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
    toast({
      title: "Alert Removed",
      description: "The usage alert has been successfully removed.",
    })
  }

  return (
    <InteractiveCard className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-primary" />
            <CardTitle className="font-headline">Custom Alerts</CardTitle>
          </div>
          <CardDescription>Set usage thresholds to get notified.</CardDescription>
        </div>
         <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setAlerts([])}>Clear All</DropdownMenuItem>
            <DropdownMenuItem>Mute All</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSetAlert} className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Usage threshold in kWh"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
          />
          <Button type="submit" size="icon" aria-label="Set Alert">
            <BellRing className="w-4 h-4" />
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <h3 className="font-semibold text-sm w-full">Active Alerts</h3>
        <ul className="w-full space-y-2">
          {alerts.length > 0 ? alerts.map((alert) => (
            <li key={alert.id} className="flex justify-between items-center text-sm bg-muted/50 p-2 rounded-md">
              <span>Usage &gt; {alert.threshold} kWh</span>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeAlert(alert.id)}>
                <Trash2 className="w-4 h-4 text-destructive/80" />
              </Button>
            </li>
          )) : <p className="text-xs text-muted-foreground">No active alerts.</p>}
        </ul>
      </CardFooter>
    </InteractiveCard>
  );
}
