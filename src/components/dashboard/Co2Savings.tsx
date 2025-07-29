
"use client"

import { CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Leaf, MoreVertical, Mountain, Footprints } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { InteractiveCard } from '@/components/ui/interactive-card';

export function Co2Savings() {
  const co2Saved = 340;
  const equivalentTrees = 5600;

  return (
    <InteractiveCard className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            <Leaf className="w-6 h-6 text-primary" />
            <CardTitle className="font-headline">CO₂ Savings</CardTitle>
          </div>
          <CardDescription>Total carbon footprint reduction.</CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Report</DropdownMenuItem>
            <DropdownMenuItem>Change Baseline</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col items-center justify-center py-0">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative flex items-center justify-center w-40 h-40">
                 <Footprints className="w-36 h-36 text-primary/20 absolute" />
                 <Footprints className="w-32 h-32 text-primary/50 absolute animate-pulse" style={{ animationDelay: '0.5s' }} />
                 <Footprints className="w-28 h-28 text-primary" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>That's equivalent to planting ~{equivalentTrees.toLocaleString()} trees!</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardContent>
       <CardFooter className="flex-col gap-2 text-center pt-4 border-t">
        <div className="flex items-center gap-2 font-bold text-2xl">
          <Mountain className="w-6 h-6 text-primary/80" />
          <span>{co2Saved} Tonnes</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Total CO₂ saved all time.
        </p>
      </CardFooter>
    </InteractiveCard>
  );
}
