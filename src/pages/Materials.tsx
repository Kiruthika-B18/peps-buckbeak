import { Package, AlertTriangle, TrendingDown, BarChart3 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from 'recharts';

const Materials = () => {
  const materials = [
    {
      name: 'Springs',
      stock: 1200,
      dailyUse: 580,
      daysLeft: 2.1,
      status: 'danger',
      statusText: '🔴 Critical',
      reorderPoint: 2000,
      lastOrder: '2024-12-05',
    },
    {
      name: 'Foam',
      stock: 450,
      dailyUse: 45,
      daysLeft: 10,
      status: 'success',
      statusText: '🟢 Adequate',
      reorderPoint: 200,
      lastOrder: '2024-12-01',
    },
    {
      name: 'Fabric',
      stock: 12000,
      dailyUse: 820,
      daysLeft: 14.6,
      status: 'success',
      statusText: '🟢 Adequate',
      reorderPoint: 5000,
      lastOrder: '2024-11-28',
    },
    {
      name: 'Thread',
      stock: 180,
      dailyUse: 25,
      daysLeft: 7.2,
      status: 'warning',
      statusText: '🟡 Low',
      reorderPoint: 100,
      lastOrder: '2024-12-08',
    },
    {
      name: 'Adhesive',
      stock: 85,
      dailyUse: 12,
      daysLeft: 7.1,
      status: 'warning',
      statusText: '🟡 Low',
      reorderPoint: 50,
      lastOrder: '2024-12-10',
    },
  ];

  const usageTrend = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    springs: 550 + Math.random() * 60,
    foam: 40 + Math.random() * 10,
    fabric: 800 + Math.random() * 40,
    thread: 20 + Math.random() * 10,
  }));

  const stockHistory = Array.from({ length: 14 }, (_, i) => ({
    day: `Day ${i + 1}`,
    springs: 3000 - (i * 120),
    foam: 600 - (i * 10),
    fabric: 15000 - (i * 200),
  }));

  const criticalCount = materials.filter((m) => m.status === 'danger').length;
  const lowCount = materials.filter((m) => m.status === 'warning').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card-elevated p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl gradient-danger flex items-center justify-center glow-danger">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Materials Management</h1>
              <p className="text-sm text-muted-foreground">
                Stock overview and inventory control
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            {criticalCount > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 bg-danger/10 text-danger rounded-lg">
                <AlertTriangle className="w-5 h-5" />
                <div>
                  <div className="text-xs font-semibold">Critical</div>
                  <div className="text-lg font-bold">{criticalCount}</div>
                </div>
              </div>
            )}
            {lowCount > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 bg-warning/10 text-warning rounded-lg">
                <TrendingDown className="w-5 h-5" />
                <div>
                  <div className="text-xs font-semibold">Low Stock</div>
                  <div className="text-lg font-bold">{lowCount}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Material Stock Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {materials.map((material, index) => (
          <div
            key={index}
            className="metric-card border-l-4"
            style={{
              borderColor: `hsl(var(--${material.status}))`,
            }}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">{material.name}</h3>
                <p className="text-xs text-muted-foreground">
                  Last order: {material.lastOrder}
                </p>
              </div>
              <span
                className="status-badge"
                style={{
                  backgroundColor: `hsl(var(--${material.status}) / 0.1)`,
                  color: `hsl(var(--${material.status}))`,
                }}
              >
                {material.statusText}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Current Stock</div>
                <div className="text-2xl font-bold font-mono">
                  {material.stock.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Daily Use</div>
                <div className="text-2xl font-bold font-mono">{material.dailyUse}</div>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Days Remaining</span>
                <span className={`font-bold font-mono text-${material.status}`}>
                  {material.daysLeft} days
                </span>
              </div>
              <Progress
                value={(material.stock / material.reorderPoint) * 100}
                className="h-2"
              />
            </div>

            {material.status === 'danger' && (
              <div className="bg-danger/10 text-danger text-xs p-2 rounded-lg">
                ⚠️ Order immediately - stock critically low
              </div>
            )}
            {material.status === 'warning' && (
              <div className="bg-warning/10 text-warning text-xs p-2 rounded-lg">
                ⚡ Consider reordering soon
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Daily Usage Trends */}
      <div className="metric-card">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">30-Day Usage Trends</h2>
        </div>

        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={usageTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
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
              dataKey="springs"
              name="Springs"
              stroke="hsl(217 91% 60%)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="foam"
              name="Foam"
              stroke="hsl(142 76% 36%)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="fabric"
              name="Fabric"
              stroke="hsl(32 95% 44%)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="thread"
              name="Thread"
              stroke="hsl(188 95% 62%)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Stock Depletion Forecast */}
      <div className="metric-card">
        <div className="flex items-center gap-2 mb-6">
          <TrendingDown className="w-5 h-5 text-warning" />
          <h2 className="text-xl font-bold">14-Day Stock Depletion Forecast</h2>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={stockHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
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
              dataKey="springs"
              name="Springs"
              stroke="hsl(0 72% 51%)"
              fill="hsl(0 72% 51% / 0.3)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="foam"
              name="Foam"
              stroke="hsl(142 76% 36%)"
              fill="hsl(142 76% 36% / 0.3)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="fabric"
              name="Fabric"
              stroke="hsl(217 91% 60%)"
              fill="hsl(217 91% 60% / 0.3)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Reorder Recommendations */}
      <div className="metric-card">
        <div className="flex items-center gap-2 mb-6">
          <Package className="w-5 h-5 text-success" />
          <h2 className="text-xl font-bold">Reorder Recommendations</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {materials
            .filter((m) => m.status !== 'success')
            .map((material, index) => (
              <div key={index} className="bg-secondary rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-lg">{material.name}</h3>
                  <span
                    className={`status-badge text-xs ${
                      material.status === 'danger' ? 'bg-danger/10 text-danger' : 'bg-warning/10 text-warning'
                    }`}
                  >
                    {material.status === 'danger' ? 'URGENT' : 'SOON'}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current Stock:</span>
                    <span className="font-mono font-semibold">{material.stock}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Recommended Order:</span>
                    <span className="font-mono font-semibold text-primary">
                      {material.reorderPoint}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Days until critical:</span>
                    <span className={`font-mono font-semibold text-${material.status}`}>
                      {material.daysLeft}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Materials;
