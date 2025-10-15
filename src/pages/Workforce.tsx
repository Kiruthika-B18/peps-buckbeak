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
    { name: 'Production', present: 39, total: 48, percentage: 81, color: 'hsl(217 91% 60%)' },
    { name: 'Quality Control', present: 16, total: 20, percentage: 80, color: 'hsl(142 76% 36%)' },
    { name: 'Maintenance', present: 8, total: 15, percentage: 53, color: 'hsl(0 72% 51%)' },
    { name: 'Logistics', present: 12, total: 15, percentage: 80, color: 'hsl(188 95% 62%)' },
    { name: 'Administration', present: 10, total: 12, percentage: 83, color: 'hsl(32 95% 44%)' },
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

        <div className="metric-card">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-warning" />
            <span className="text-sm text-muted-foreground">On Leave</span>
          </div>
          <div className="text-3xl font-bold font-mono text-warning">{attendanceOverview.onLeave}</div>
        </div>
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
                  <div
                    className="h-3 rounded-full transition-all"
                    style={{
                      width: `${dept.percentage}%`,
                      backgroundColor: dept.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="percentage" name="Attendance %" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Attendance Trend */}
        <div className="metric-card">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">Weekly Attendance Trend</h2>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 100]} />
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
                dataKey="attendance"
                name="Attendance %"
                stroke="hsl(142 76% 36%)"
                strokeWidth={3}
                dot={{ fill: 'hsl(142 76% 36%)', r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="target"
                name="Target (85%)"
                stroke="hsl(var(--warning))"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Experience Level Distribution */}
        <div className="metric-card">
          <div className="flex items-center gap-2 mb-6">
            <Users2 className="w-5 h-5 text-warning" />
            <h2 className="text-xl font-bold">Experience Level Distribution</h2>
          </div>

          <div className="space-y-4">
            {experienceLevel.map((level, index) => (
              <div key={index} className="bg-secondary rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">{level.level}</span>
                  <span className="text-sm font-mono">{level.count} ({level.percentage}%)</span>
                </div>
                <Progress value={level.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workforce;
