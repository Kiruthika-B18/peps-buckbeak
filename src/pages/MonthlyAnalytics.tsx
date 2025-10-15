import { TrendingUp, Calendar, Package, Users } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from 'recharts';

const MonthlyAnalytics = () => {
  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const monthlyProduction = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(2024, i, 1).toLocaleDateString('en-US', { month: 'short' }),
    spring: 12000 + Math.random() * 3000,
    cirrus: 10000 + Math.random() * 2500,
    total: 22000 + Math.random() * 5000,
    target: 24000,
  }));

  const monthlyAttendance = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(2024, i, 1).toLocaleDateString('en-US', { month: 'short' }),
    attendance: 75 + Math.random() * 15,
    target: 85,
  }));

  const materialConsumption = [
    { material: 'Springs', consumed: 17400, projected: 18000, unit: 'units' },
    { material: 'Foam', consumed: 1350, projected: 1400, unit: 'units' },
    { material: 'Fabric', consumed: 24600, projected: 25000, unit: 'meters' },
    { material: 'Thread', consumed: 750, projected: 800, unit: 'spools' },
  ];

  const kpis = [
    { label: 'Total Production', value: '23,847', change: '+12%', color: 'primary' },
    { label: 'Avg Attendance', value: '82%', change: '+5%', color: 'success' },
    { label: 'Material Efficiency', value: '94%', change: '+3%', color: 'success' },
    { label: 'Defect Rate', value: '2.1%', change: '-0.8%', color: 'danger' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card-elevated p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center glow-primary">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Monthly Analytics</h1>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {currentMonth}
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <div key={index} className="metric-card">
            <div className="text-sm text-muted-foreground mb-2">{kpi.label}</div>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold font-mono">{kpi.value}</div>
              <div className={`text-sm font-semibold ${kpi.change.startsWith('+') ? 'text-success' : 'text-danger'}`}>
                {kpi.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Production Trends */}
      <div className="metric-card">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">Monthly Production Trends</h2>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={monthlyProduction}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Bar dataKey="spring" name="Spring Mattresses" fill="hsl(217 91% 60%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="cirrus" name="Cirrus Mattresses" fill="hsl(142 76% 36%)" radius={[4, 4, 0, 0]} />
            <Line type="monotone" dataKey="target" name="Target" stroke="hsl(var(--warning))" strokeWidth={2} strokeDasharray="5 5" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Trends */}
        <div className="metric-card">
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-5 h-5 text-success" />
            <h2 className="text-xl font-bold">Attendance Trends</h2>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyAttendance}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 100]} />
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
                dataKey="attendance"
                name="Attendance %"
                stroke="hsl(142 76% 36%)"
                fill="hsl(142 76% 36% / 0.3)"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="target"
                name="Target (85%)"
                stroke="hsl(var(--warning))"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Material Consumption */}
        <div className="metric-card">
          <div className="flex items-center gap-2 mb-6">
            <Package className="w-5 h-5 text-warning" />
            <h2 className="text-xl font-bold">Material Consumption</h2>
          </div>

          <div className="space-y-4">
            {materialConsumption.map((item, index) => (
              <div key={index} className="bg-secondary rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold">{item.material}</h3>
                  <span className="text-xs text-muted-foreground">{item.unit}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Consumed</div>
                    <div className="text-xl font-bold font-mono">{item.consumed.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Projected</div>
                    <div className="text-xl font-bold font-mono text-muted-foreground">
                      {item.projected.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${(item.consumed / item.projected) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyAnalytics;

