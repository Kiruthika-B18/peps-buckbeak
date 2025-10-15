import { Users2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const AgeSegmentation = () => {
  const data = [
    { name: 'Under 25', value: 25, percentage: 21, color: 'hsl(280 90% 65%)' },
    { name: '25-35', value: 45, percentage: 38, color: 'hsl(142 76% 36%)' },
    { name: '36-45', value: 35, percentage: 29, color: 'hsl(32 95% 44%)' },
    { name: '45+', value: 15, percentage: 12, color: 'hsl(217 91% 60%)' },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="metric-card">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl gradient-success flex items-center justify-center glow-success">
          <Users2 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Age-Wise Segmentation</h2>
          <p className="text-sm text-muted-foreground">Workforce distribution</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ percentage }) => `${percentage}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-2 gap-3 mt-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-secondary rounded-lg p-3 border-l-4"
            style={{ borderColor: item.color }}
          >
            <div className="text-xs text-muted-foreground mb-1">{item.name}</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono">{item.value}</span>
              <span className="text-sm text-muted-foreground">workers</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgeSegmentation;
