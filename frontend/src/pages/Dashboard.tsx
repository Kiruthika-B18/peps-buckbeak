import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, RefreshCw } from 'lucide-react';
import FactoryHealthPulse from '@/components/dashboard/FactoryHealthPulse';
import WorkforceAttendance from '@/components/dashboard/WorkforceAttendance';
import AgeSegmentation from '@/components/dashboard/AgeSegmentation';
import MaterialStock from '@/components/dashboard/MaterialStock';
import ProductionPredictor from '@/components/dashboard/ProductionPredictor';
import ProductionCharts from '@/components/dashboard/ProductionCharts';
// ...existing imports (Button removed as TV Mode moved to sidebar)

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
  const navigate = useNavigate();

  const SummaryCards = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <div className="metric-card">
        <div className="text-sm text-muted-foreground">Today's Overall Attendance</div>
        <div className="text-2xl font-bold">85%</div>
      </div>
      <div className="metric-card">
        <div className="text-sm text-muted-foreground">Available Workers</div>
        <div className="text-2xl font-bold">102</div>
      </div>
      <div className="metric-card">
        <div className="text-sm text-muted-foreground">Predicted Output</div>
        <div className="text-2xl font-bold">680</div>
      </div>
      <div className="metric-card">
        <div className="text-sm text-muted-foreground">Actual Output</div>
        <div className="text-2xl font-bold">640</div>
      </div>
    </div>
  );

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

      {/* Summary cards */}
      <SummaryCards />

      {/* Age-wise segmentation in overview (also removed from left column) */}
      <div className="mt-4">
        <AgeSegmentation />
      </div>

      {/* Main Grid */}
  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6`}>
        {/* Left column: workforce first after summary */}
        <div className="space-y-6">
          <WorkforceAttendance />
          <FactoryHealthPulse data={factoryHealth} />
        </div>

        {/* Right column: material and predictor */}
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
