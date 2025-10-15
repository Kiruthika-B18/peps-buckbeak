import { Activity, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const FactoryHealth = () => {
  const healthScore = 76;
  const healthData = {
    workforce: 85,
    materials: 65,
    production: 78,
    machinery: 90,
  };

  const historicalData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    score: 70 + Math.random() * 20,
    workforce: 80 + Math.random() * 15,
    materials: 60 + Math.random() * 25,
    production: 75 + Math.random() * 15,
    machinery: 85 + Math.random() * 10,
  }));

  const issues = [
    { category: 'Materials', issue: 'Springs stock critically low', severity: 'danger', impact: 'High' },
    { category: 'Workforce', issue: 'Maintenance dept. attendance 53%', severity: 'warning', impact: 'Medium' },
    { category: 'Production', issue: 'Line 2 efficiency at 72%', severity: 'warning', impact: 'Medium' },
  ];

  const recommendations = [
    'Order 2,000 units of springs immediately',
    'Review maintenance team scheduling',
    'Inspect Line 2 machinery for bottlenecks',
    'Consider adding 30 workers to meet production targets',
  ];

  const getHealthColor = (score: number) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'danger';
  };

  const healthColor = getHealthColor(healthScore);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card-elevated p-6">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl gradient-${healthColor} flex items-center justify-center glow-${healthColor}`}>
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Factory Health Monitoring</h1>
            <p className="text-sm text-muted-foreground">
              Comprehensive health analysis and diagnostics
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overall Health Score */}
        <div className="metric-card lg:col-span-1">
          <h2 className="text-xl font-bold mb-6">Overall Health Score</h2>
          <div className="flex justify-center mb-6">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="hsl(var(--muted))"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={`hsl(var(--${healthColor}))`}
                  strokeWidth="8"
                  strokeDasharray={`${(healthScore / 100) * 283} 283`}
                  strokeLinecap="round"
                  className={`glow-${healthColor}`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-4xl font-bold font-mono">{healthScore}</div>
                <div className="text-xs text-muted-foreground">/100</div>
              </div>
            </div>
          </div>

          <div className="text-center mb-6">
            <div className={`text-xl font-bold text-${healthColor} mb-2`}>
              {healthScore >= 80 ? '🟢 Healthy' : healthScore >= 60 ? '🟡 Moderate' : '🔴 Critical'}
            </div>
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleTimeString()}
            </p>
          </div>

          <div className="space-y-3">
            {Object.entries(healthData).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="capitalize text-muted-foreground">{key}</span>
                  <span className="font-mono font-semibold">{value}%</span>
                </div>
                <Progress value={value} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Historical Trend */}
        <div className="metric-card lg:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">30-Day Health Trend</h2>
          </div>

          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="day"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="score"
                name="Overall Score"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="workforce"
                name="Workforce"
                stroke="hsl(142 76% 36%)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="materials"
                name="Materials"
                stroke="hsl(32 95% 44%)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="production"
                name="Production"
                stroke="hsl(188 95% 62%)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Issues */}
        <div className="metric-card">
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <h2 className="text-xl font-bold">Active Issues</h2>
            <span className="ml-auto status-badge bg-danger/10 text-danger">
              {issues.length} Issues
            </span>
          </div>

          <div className="space-y-3">
            {issues.map((issue, index) => (
              <div
                key={index}
                className="bg-secondary rounded-lg p-4 border-l-4"
                style={{
                  borderColor: `hsl(var(--${issue.severity}))`,
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="text-sm font-semibold text-muted-foreground">
                    {issue.category}
                  </div>
                  <span
                    className="status-badge text-xs"
                    style={{
                      backgroundColor: `hsl(var(--${issue.severity}) / 0.1)`,
                      color: `hsl(var(--${issue.severity}))`,
                    }}
                  >
                    {issue.impact} Impact
                  </span>
                </div>
                <p className="text-sm">{issue.issue}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="metric-card">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle className="w-5 h-5 text-success" />
            <h2 className="text-xl font-bold">Recommended Actions</h2>
          </div>

          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex gap-3 p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
                <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-sm">{rec}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Component Health Matrix */}
      <div className="metric-card">
        <h2 className="text-xl font-bold mb-6">Component Health Matrix</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={[
            { component: 'Workforce', health: healthData.workforce },
            { component: 'Materials', health: healthData.materials },
            { component: 'Production', health: healthData.production },
            { component: 'Machinery', health: healthData.machinery },
          ]}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="component" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="health" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FactoryHealth;
