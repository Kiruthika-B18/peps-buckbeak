import { Users, UserCheck, UserX, TrendingUp, Users2 } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Progress } from '@/components/ui/progress';

const Workforce = () => {
  const attendanceOverview = {
    present: 85,
    absent: 15,
    onLeave: 10,
    total: 120,
    percentage: 71,
  };

  const departmentData = [
    { name: 'Production', present: 39, total: 48, percentage: 81, colorClass: 'bg-blue-500' },
    { name: 'Quality Control', present: 16, total: 20, percentage: 80, colorClass: 'bg-green-600' },
    { name: 'Maintenance', present: 8, total: 15, percentage: 53, colorClass: 'bg-red-500' },
    { name: 'Logistics', present: 12, total: 15, percentage: 80, colorClass: 'bg-cyan-500' },
    { name: 'Administration', present: 10, total: 12, percentage: 83, colorClass: 'bg-amber-500' },
  ];

  const ageDistribution = [
    { name: 'Under 25', value: 25, percentage: 21, color: 'hsl(280 90% 65%)' },
    { name: '25-35', value: 45, percentage: 38, color: 'hsl(142 76% 36%)' },
    { name: '36-45', value: 35, percentage: 29, color: 'hsl(32 95% 44%)' },
    { name: '45+', value: 15, percentage: 12, color: 'hsl(217 91% 60%)' },
  ];

  const weeklyTrend = Array.from({ length: 7 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    attendance: 75 + Math.random() * 15,
    target: 85,
  }));

  const experienceLevel = [
    { level: '0-1 year', count: 18, percentage: 15 },
    { level: '1-3 years', count: 35, percentage: 29 },
    { level: '3-5 years', count: 32, percentage: 27 },
    { level: '5-10 years', count: 25, percentage: 21 },
    { level: '10+ years', count: 10, percentage: 8 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card-elevated p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl gradient-warning flex items-center justify-center glow-warning">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Workforce Management</h1>
            <p className="text-sm text-muted-foreground">
              Comprehensive attendance and segmentation analytics
            </p>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="metric-card">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Total Workforce</span>
          </div>
          <div className="text-3xl font-bold font-mono">{attendanceOverview.total}</div>
        </div>

        <div className="metric-card">
          <div className="flex items-center gap-2 mb-2">
            <UserCheck className="w-4 h-4 text-success" />
            <span className="text-sm text-muted-foreground">Present Today</span>
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-bold font-mono text-success">{attendanceOverview.present}</div>
            <div className="text-sm text-muted-foreground">({attendanceOverview.percentage}%)</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center gap-2 mb-2">
            <UserX className="w-4 h-4 text-danger" />
            <span className="text-sm text-muted-foreground">Absent</span>
          </div>
          <div className="text-3xl font-bold font-mono text-danger">{attendanceOverview.absent}</div>
        </div>

        {/* On Leave card removed as requested */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department-wise Attendance */}
        <div className="metric-card">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">Department-wise Attendance</h2>
          </div>

          <div className="space-y-4">
            {departmentData.map((dept, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{dept.name}</span>
                  <span className="text-sm font-mono">
                    {dept.present}/{dept.total} ({dept.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div className={`h-3 rounded-full transition-all ${dept.colorClass}`} style={{ width: `${dept.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Department Bar chart removed; only progress bars are shown above */}
        </div>

        {/* Age Distribution */}
        <div className="metric-card">
          <div className="flex items-center gap-2 mb-6">
            <Users2 className="w-5 h-5 text-success" />
            <h2 className="text-xl font-bold">Age-wise Distribution</h2>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={ageDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ percentage }) => `${percentage}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {ageDistribution.map((entry, index) => (
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
            {ageDistribution.map((item, index) => (
              <div key={index} className="bg-secondary rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="6" cy="6" r="6" fill={item.color} />
                    </svg>
                    <div className="text-xs text-muted-foreground">{item.name}</div>
                  </div>
                  <div className="text-sm font-mono">{item.percentage}%</div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold font-mono">{item.value}</span>
                  <span className="text-sm text-muted-foreground">workers</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly trend and experience distribution removed as requested */}
      <div>
        {/* Removed additional charts — page now focuses on department progress and age segmentation */}
      </div>
    </div>
  );
};

export default Workforce;
