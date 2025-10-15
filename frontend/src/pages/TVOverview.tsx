import React from 'react';
import ProductionCharts from '@/components/dashboard/ProductionCharts';

// TV-only overview: mirror main overview but remove Actual Output, AgeSegmentation,
// WorkforceAttendance, FactoryHealthPulse, MaterialStock, ProductionPredictor.
// Keep the three summary cards and the two charts, arranged compactly to fit one screen.
const TVOverview: React.FC = () => {
  return (
    <div className="min-h-screen bg-white p-4 tv-compact">
      <header className="mb-3">
        <h1 className="text-2xl font-bold">Factory Overview (TV)</h1>
        <p className="text-sm text-muted-foreground">Compact view for large displays</p>
      </header>

      <div className="tv-top-grid mb-3">
        <div className="metric-card tv-metric grad-attendance tv-metric-clear text-white">
          <div className="text-sm opacity-90">Today's Overall Attendance</div>
          <div className="text-3xl font-extrabold">85%</div>
        </div>
        <div className="metric-card tv-metric grad-workers tv-metric-clear text-white">
          <div className="text-sm opacity-90">Available Workers</div>
          <div className="text-3xl font-extrabold">102 / 120</div>
        </div>
        <div className="metric-card tv-metric grad-predicted tv-metric-clear tv-predicted-highlight text-white md:col-span-2">
          <div className="text-sm opacity-90">Predicted Output</div>
          <div className="text-4xl font-extrabold">680</div>
        </div>
        {/* Removed Actual Output for TV mode to keep a clean concise layout */}
      </div>

      <div className="tv-bottom-grid">
        <ProductionCharts compact={true} tv={true} />
      </div>
    </div>
  );
};

export default TVOverview;
