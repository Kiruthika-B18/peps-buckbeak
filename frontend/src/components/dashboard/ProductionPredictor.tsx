import { useState } from 'react';
import { Calculator, Target, TrendingUp, Users } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

const ProductionPredictor = () => {
  const [workers, setWorkers] = useState(85);
  
  const baseOutputPerWorker = 7;
  const dailyTarget = 805;
  const predictedOutput = workers * baseOutputPerWorker;
  const targetGap = predictedOutput - dailyTarget;
  const workersNeeded = Math.ceil((dailyTarget - predictedOutput) / baseOutputPerWorker);

  const getStatusColor = () => {
    if (targetGap >= 0) return 'success';
    if (targetGap >= -100) return 'warning';
    return 'danger';
  };

  const statusColor = getStatusColor();

  return (
    <div className="metric-card">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center glow-primary">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold">What-If Production Predictor</h2>
          <p className="text-sm text-muted-foreground">Interactive workforce simulation</p>
        </div>
      </div>

      {/* Worker Slider */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Users className="w-4 h-4" />
            <span>Workers</span>
          </div>
          <span className="text-2xl font-bold font-mono">{workers}</span>
        </div>
        <Slider
          value={[workers]}
          onValueChange={(value) => setWorkers(value[0])}
          min={50}
          max={150}
          step={5}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>50</span>
          <span>150</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        <div className="bg-secondary rounded-lg p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <TrendingUp className="w-4 h-4" />
            <span>Predicted Output</span>
          </div>
          <div className="text-3xl font-bold font-mono">{predictedOutput}</div>
          <div className="text-xs text-muted-foreground mt-1">mattresses/day</div>
        </div>
      </div>

      {/* Target Gap */}
      <div className={`rounded-lg p-4 border-2 ${
        statusColor === 'success' ? 'bg-green-50 border-green-500' : statusColor === 'warning' ? 'bg-yellow-50 border-yellow-500' : 'bg-red-50 border-red-500'
      }`}>
        <div className="text-sm font-semibold mb-2">Target Gap Analysis</div>
        <div className="flex items-baseline gap-2 mb-3">
          <span className={`text-3xl font-bold font-mono ${
            statusColor === 'success' ? 'text-green-600' : statusColor === 'warning' ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {targetGap >= 0 ? '+' : ''}{targetGap}
          </span>
          <span className="text-sm text-muted-foreground">mattresses</span>
        </div>
        
        {targetGap < 0 ? (
          <div className="text-sm">
            💡 <span className="font-semibold">Suggestion:</span> Add{' '}
            <span className="font-bold text-primary">{workersNeeded} workers</span> to reach daily goal
          </div>
        ) : (
          <div className="text-sm text-success">
            ✓ On track to exceed daily target!
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductionPredictor;
