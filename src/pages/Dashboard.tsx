import { useState } from 'react';
import { Calendar, RefreshCw } from 'lucide-react';
import FactoryHealthPulse from '@/components/dashboard/FactoryHealthPulse';
import WorkforceAttendance from '@/components/dashboard/WorkforceAttendance';
import AgeSegmentation from '@/components/dashboard/AgeSegmentation';
import MaterialStock from '@/components/dashboard/MaterialStock';
import ProductionPredictor from '@/components/dashboard/ProductionPredictor';
import ProductionCharts from '@/components/dashboard/ProductionCharts';

const Dashboard = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const [factoryHealth] = useState({
    score: 76,
    status: '🟡 Moderate',
    breakdown: {
      workforce: 85,
      materials: 65,
      production: 78,
      machinery: 90,
    },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card-elevated p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Factory Dashboard</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{currentDate}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Factory Health Pulse</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-bold font-mono">{factoryHealth.score}/100</span>
                <span className="text-xl">{factoryHealth.status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Column 1 */}
        <div className="space-y-6">
          <FactoryHealthPulse data={factoryHealth} />
          <WorkforceAttendance />
          <AgeSegmentation />
        </div>

        {/* Column 2 */}
        <div className="space-y-6">
          <MaterialStock />
          <ProductionPredictor />
        </div>
      </div>

      {/* Full Width Charts */}
      <ProductionCharts />
    </div>
  );
};

export default Dashboard;
