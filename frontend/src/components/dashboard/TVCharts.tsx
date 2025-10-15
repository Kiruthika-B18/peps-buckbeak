import React from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, BarChart3 } from 'lucide-react';

const TVCharts = () => {
  const productionData = Array.from({ length: 31 }, (_, i) => ({
    day: i + 1,
    spring: Math.floor(400 + Math.random() * 100),
    cirrus: Math.floor(350 + Math.random() * 100),
  }));

  const efficiencyData = Array.from({ length: 4 }, (_, i) => ({
    week: `W${i + 1}`,
    efficiency: Math.round(70 + Math.random() * 25),
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="metric-card p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center glow-primary">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Production Overview</h3>
            <div className="text-sm text-muted-foreground">Monthly output</div>
          </div>
        </div>

        <div className="tv-card-height">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={productionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={10} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="spring" name="Spring" stroke="#2563eb" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="cirrus" name="Cirrus" stroke="#16a34a" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="metric-card p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg gradient-success flex items-center justify-center glow-success">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Efficiency Comparison</h3>
            <div className="text-sm text-muted-foreground">Weekly performance</div>
          </div>
        </div>

        <div className="tv-card-height">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={efficiencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={10} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Area type="monotone" dataKey="efficiency" name="Efficiency (%)" stroke="#16a34a" fill="#16a34a33" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TVCharts;
