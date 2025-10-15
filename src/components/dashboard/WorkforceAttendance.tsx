import { Users, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const WorkforceAttendance = () => {
  const attendanceData = {
    present: 85,
    total: 120,
    weeklyAvg: 78,
    departments: [
      { name: 'Production', attendance: 81, color: 'hsl(217 91% 60%)' },
      { name: 'Quality', attendance: 80, color: 'hsl(142 76% 36%)' },
      { name: 'Maintenance', attendance: 53, color: 'hsl(0 72% 51%)' },
    ],
  };

  const percentage = Math.round((attendanceData.present / attendanceData.total) * 100);

  return (
    <div className="metric-card">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center glow-primary">
          <Users className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Workforce Attendance</h2>
          <p className="text-sm text-muted-foreground">Today's snapshot</p>
        </div>
      </div>

      {/* Current Attendance */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-secondary rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">Present Today</div>
          <div className="text-3xl font-bold font-mono">
            {attendanceData.present}
            <span className="text-lg text-muted-foreground">/{attendanceData.total}</span>
          </div>
          <div className="text-sm text-success mt-1">{percentage}%</div>
        </div>
        <div className="bg-secondary rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">Weekly Avg</div>
          <div className="text-3xl font-bold font-mono">{attendanceData.weeklyAvg}%</div>
          <div className="flex items-center gap-1 text-sm text-success mt-1">
            <TrendingUp className="w-3 h-3" />
            <span>+3%</span>
          </div>
        </div>
      </div>

      {/* Department Breakdown */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold">Department Split</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={attendanceData.departments}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="name"
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
            <Bar dataKey="attendance" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WorkforceAttendance;
