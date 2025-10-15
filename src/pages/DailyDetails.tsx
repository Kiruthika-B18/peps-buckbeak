import { Calendar, Clock, Users, Package } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const DailyDetails = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const hourlyData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    production: i >= 6 && i < 22 ? 30 + Math.random() * 20 : 0,
    workers: i >= 6 && i < 14 ? 45 + Math.random() * 10 : i >= 14 && i < 22 ? 40 + Math.random() * 10 : 0,
  }));

  const shiftData = [
    { shift: 'Morning (6AM-2PM)', workers: 48, production: 392, efficiency: 85, status: 'success' },
    { shift: 'Evening (2PM-10PM)', workers: 37, production: 289, efficiency: 78, status: 'warning' },
    { shift: 'Night (10PM-6AM)', workers: 0, production: 0, efficiency: 0, status: 'muted' },
  ];

  const departmentActivity = [
    { dept: 'Production', morning: 95, evening: 88, night: 0 },
    { dept: 'Quality', morning: 92, evening: 85, night: 0 },
    { dept: 'Maintenance', morning: 65, evening: 72, night: 30 },
    { dept: 'Logistics', morning: 78, evening: 82, night: 15 },
  ];

  const todayMetrics = [
    { label: 'Total Production', value: '681', unit: 'mattresses', color: 'primary' },
    { label: 'Active Workers', value: '85', unit: 'employees', color: 'success' },
    { label: 'Avg Efficiency', value: '81.5%', unit: '', color: 'warning' },
    { label: 'Material Used', value: '1,425', unit: 'units', color: 'danger' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card-elevated p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl gradient-success flex items-center justify-center glow-success">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Daily Details</h1>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {currentDate}
            </p>
          </div>
        </div>
      </div>

      {/* Today's Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {todayMetrics.map((metric, index) => (
          <div key={index} className="metric-card">
            <div className="text-sm text-muted-foreground mb-2">{metric.label}</div>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold font-mono">{metric.value}</div>
              {metric.unit && <div className="text-sm text-muted-foreground">{metric.unit}</div>}
            </div>
          </div>
        ))}
      </div>

      {/* Hourly Production & Workforce */}
      <div className="metric-card">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">Hourly Production & Workforce</h2>
        </div>

        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={hourlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="hour"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              interval={2}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
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
              dataKey="production"
              name="Production (units/hr)"
              stroke="hsl(217 91% 60%)"
              strokeWidth={3}
              dot={{ fill: 'hsl(217 91% 60%)', r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="workers"
              name="Active Workers"
              stroke="hsl(142 76% 36%)"
              strokeWidth={2}
              dot={{ fill: 'hsl(142 76% 36%)', r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Shift Analysis */}
      <div className="metric-card">
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-5 h-5 text-success" />
          <h2 className="text-xl font-bold">Shift-wise Performance</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {shiftData.map((shift, index) => (
            <div
              key={index}
              className={`bg-secondary rounded-lg p-5 border-2 ${
                shift.status === 'muted' ? 'border-muted opacity-60' : `border-${shift.status}`
              }`}
            >
              <h3 className="font-bold text-lg mb-4">{shift.shift}</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Workers</span>
                  <span className="text-xl font-bold font-mono">{shift.workers}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Production</span>
                  <span className="text-xl font-bold font-mono">{shift.production}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Efficiency</span>
                  <span className={`text-xl font-bold font-mono text-${shift.status}`}>
                    {shift.efficiency}%
                  </span>
                </div>
              </div>

              {shift.status !== 'muted' && (
                <div className="mt-4 w-full bg-muted rounded-full h-2">
                  <div
                    className={`bg-${shift.status} h-2 rounded-full transition-all`}
                    style={{ width: `${shift.efficiency}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Department Activity by Shift */}
      <div className="metric-card">
        <div className="flex items-center gap-2 mb-6">
          <Package className="w-5 h-5 text-warning" />
          <h2 className="text-xl font-bold">Department Activity by Shift</h2>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={departmentActivity}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="dept" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Bar dataKey="morning" name="Morning Shift" fill="hsl(217 91% 60%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="evening" name="Evening Shift" fill="hsl(142 76% 36%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="night" name="Night Shift" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DailyDetails;
