import { Activity, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface FactoryHealthData {
  score: number;
  status: string;
  breakdown: {
    workforce: number;
    materials: number;
    production: number;
    machinery: number;
  };
}

interface Props {
  data: FactoryHealthData;
}

const FactoryHealthPulse = ({ data }: Props) => {
  const getHealthColor = (score: number) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'danger';
  };

  const healthColor = getHealthColor(data.score);

  const metrics = [
    { label: 'Workforce', value: data.breakdown.workforce, color: 'primary' },
    { label: 'Materials', value: data.breakdown.materials, color: 'warning' },
    { label: 'Production', value: data.breakdown.production, color: 'success' },
    { label: 'Machinery', value: data.breakdown.machinery, color: 'primary' },
  ];

  return (
    <div className="metric-card">
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-12 h-12 rounded-xl gradient-${healthColor} flex items-center justify-center glow-${healthColor}`}>
          <Activity className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Factory Health Pulse</h2>
          <p className="text-sm text-muted-foreground">Real-time stability index</p>
        </div>
      </div>

      {/* Circular Progress */}
      <div className="flex justify-center mb-8">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="6"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={`hsl(var(--${healthColor}))`}
              strokeWidth="6"
              strokeDasharray={`${(data.score / 100) * 283} 283`}
              strokeLinecap="round"
              className={`glow-${healthColor}`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-5xl font-bold font-mono">{data.score}</div>
            <div className="text-sm text-muted-foreground">/100</div>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="text-center mb-6">
        <div className="text-2xl mb-2">{data.status}</div>
        <p className="text-sm text-muted-foreground">
          Factory health combines workforce, materials, production, and machinery metrics
        </p>
      </div>

      {/* Breakdown */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <TrendingUp className="w-4 h-4" />
          <span>Health Breakdown</span>
        </div>
        {metrics.map((metric) => (
          <div key={metric.label} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{metric.label}</span>
              <span className="font-mono font-semibold">{metric.value}%</span>
            </div>
            <Progress value={metric.value} className="h-2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FactoryHealthPulse;
