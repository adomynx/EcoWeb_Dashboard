
"use client"

import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InteractiveCard } from '@/components/ui/interactive-card';
import { Zap, ShieldCheck, Euro, Percent } from 'lucide-react';

const summaryData = {
  consumed: 1423000,
  saved: 256140,
  revenue: 95600,
  optimization: 92.8,
};

const StatCard = ({ title, value, unit, icon: Icon }: { title: string, value: string, unit: string, icon: React.ElementType }) => (
    <InteractiveCard className="bg-card/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{unit}</p>
      </CardContent>
    </InteractiveCard>
);

export function SummaryCards() {
  const formatNumber = (num: number, digits = 0) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(2)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toFixed(digits);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard 
        title="Total Energy Consumed" 
        value={formatNumber(summaryData.consumed)}
        unit="kWh"
        icon={Zap} 
      />
      <StatCard 
        title="Total Energy Saved" 
        value={formatNumber(summaryData.saved)}
        unit="kWh"
        icon={ShieldCheck} 
      />
      <StatCard 
        title="Total Revenue" 
        value={`€${formatNumber(summaryData.revenue)}`}
        unit="All Time"
        icon={Euro} 
      />
      <StatCard 
        title="Optimization Percentage" 
        value={`${summaryData.optimization.toFixed(1)}%`}
        unit="All Time"
        icon={Percent} 
      />
    </div>
  );
}
