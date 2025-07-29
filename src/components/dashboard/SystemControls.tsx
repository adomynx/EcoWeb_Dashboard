
"use client"

import { useState } from 'react';
import { CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ToggleRight, Zap, Lightbulb, Wind, MoreVertical, Factory } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { InteractiveCard } from '@/components/ui/interactive-card';

export function SystemControls() {
  const [switches, setSwitches] = useState({
    mainPower: true,
    lighting: true,
    hvac: false,
    machinery: true,
  });

  const handleSwitchChange = (id: keyof typeof switches) => {
    setSwitches(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAllOn = () => {
    setSwitches({
      mainPower: true,
      lighting: true,
      hvac: true,
      machinery: true,
    });
  };

  const handleAllOff = () => {
    setSwitches({
      mainPower: false,
      lighting: false,
      hvac: false,
      machinery: false,
    });
  };

  return (
    <InteractiveCard className="h-full">
       <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            <ToggleRight className="w-6 h-6 text-primary" />
            <CardTitle className="font-headline">System Controls</CardTitle>
          </div>
          <CardDescription>Manage automated actuators for your facility.</CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleAllOn}>All On</DropdownMenuItem>
            <DropdownMenuItem onClick={handleAllOff}>All Off</DropdownMenuItem>
            <DropdownMenuItem>View Schedules</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <Label htmlFor="mainPower" className="flex items-center gap-2 cursor-pointer">
              <Zap className="w-5 h-5" />
              <span>Main Grid</span>
            </Label>
            <Switch id="mainPower" checked={switches.mainPower} onCheckedChange={() => handleSwitchChange('mainPower')} />
          </div>
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <Label htmlFor="lighting" className="flex items-center gap-2 cursor-pointer">
              <Lightbulb className="w-5 h-5" />
              <span>Facility Lighting</span>
            </Label>
            <Switch id="lighting" checked={switches.lighting} onCheckedChange={() => handleSwitchChange('lighting')} />
          </div>
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <Label htmlFor="hvac" className="flex items-center gap-2 cursor-pointer">
              <Wind className="w-5 h-5" />
              <span>Cooling Systems</span>
            </Label>
            <Switch id="hvac" checked={switches.hvac} onCheckedChange={() => handleSwitchChange('hvac')} />
          </div>
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <Label htmlFor="machinery" className="flex items-center gap-2 cursor-pointer">
              <Factory className="w-5 h-5" />
              <span>Heavy Machinery</span>
            </Label>
            <Switch id="machinery" checked={switches.machinery} onCheckedChange={() => handleSwitchChange('machinery')} />
          </div>
        </div>
      </CardContent>
    </InteractiveCard>
  );
}
