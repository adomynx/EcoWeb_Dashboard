import { Header } from '@/components/Header';
import { SmartIotSensors } from '@/components/dashboard/SmartIotSensors';
import { HistoricalTrends } from '@/components/dashboard/HistoricalTrends';
import { CostAnalysis } from '@/components/dashboard/CostAnalysis';
import { AiTips } from '@/components/dashboard/AiTips';
import { SystemControls } from '@/components/dashboard/SystemControls';
import { Alerts } from '@/components/dashboard/Alerts';
import { DetailedConsumption } from '@/components/dashboard/DetailedConsumption';
import { TeamShiftManagement } from '@/components/dashboard/TeamShiftManagement';
import { SummaryCards } from '@/components/dashboard/SummaryCards';
import { SensorStatus } from '@/components/dashboard/SensorStatus';
import { Co2Savings } from '@/components/dashboard/Co2Savings';

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 p-6 pt-0">
        <div className="grid gap-6 grid-cols-12">
          <div className="col-span-12">
            <SummaryCards />
          </div>
          <div className="col-span-12 lg:col-span-5">
            <SmartIotSensors />
          </div>
          <div className="col-span-12 lg:col-span-7">
            <CostAnalysis />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <TeamShiftManagement />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <SensorStatus />
          </div>
          <div className="col-span-12">
            <HistoricalTrends />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <DetailedConsumption />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <Co2Savings />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <AiTips />
          </div>
          <div className="col-span-12 lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <SystemControls />
            <Alerts />
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-xs text-muted-foreground">
        <p>For demo representation purposes only.</p>
      </footer>
    </div>
  );
}
