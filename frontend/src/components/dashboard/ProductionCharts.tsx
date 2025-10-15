import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, BarChart3 } from 'lucide-react';

const ProductionCharts = ({ compact = false, tv = false }: { compact?: boolean; tv?: boolean }) => {
  const productionData = Array.from({ length: 31 }, (_, i) => ({
    day: i + 1,
    spring: Math.floor(400 + Math.random() * 100),
    cirrus: Math.floor(350 + Math.random() * 100),
    target: 805,
  }));

  const efficiencyData = Array.from({ length: 4 }, (_, i) => ({
    week: `Week ${i + 1}`,
    efficiency: 70 + Math.random() * 25,
    target: 95,
  }));

  // TV mode should render larger charts that fit a large display
  const prodHeight = tv ? 520 : compact ? 320 : 350;
  const effHeight = tv ? 420 : compact ? 260 : 300;

  const productionNode = (
    <div className={tv ? 'metric-card tv-chart-large' : 'metric-card'}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center glow-primary">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Production Overview</h2>
          <p className="text-sm text-muted-foreground">Monthly output tracking</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={prodHeight}>
        <LineChart data={productionData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="day"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
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
            dataKey="spring"
            name="Spring Mattresses"
            stroke="#2563eb"
            strokeWidth={3}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="cirrus"
            name="Cirrus Mattresses"
            stroke="#16a34a"
            strokeWidth={3}
            dot={false}
          />
          {/* Target line removed as requested */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  const efficiencyNode = (
    <div className={tv ? 'metric-card tv-chart-large' : 'metric-card'}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl gradient-success flex items-center justify-center glow-success">
          <BarChart3 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Efficiency Comparison</h2>
          <p className="text-sm text-muted-foreground">Weekly performance trends</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={effHeight}>
        <AreaChart data={efficiencyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="week"
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
          <Area
            type="monotone"
            dataKey="efficiency"
            name="Total Efficiency (%)"
            stroke="hsl(142 76% 36%)"
            fill="hsl(142 76% 36% / 0.3)"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="target"
            name="Target (95%)"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth={2}
            strokeDasharray="5 5"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );

  return compact ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {productionNode}
      {efficiencyNode}
    </div>
  ) : (
    <div className="space-y-6">
      {productionNode}
      {efficiencyNode}
    </div>
  );
};

export default ProductionCharts;
