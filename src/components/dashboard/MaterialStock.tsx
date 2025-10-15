import { Package, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const MaterialStock = () => {
  const materials = [
    {
      name: 'Springs',
      stock: 1200,
      dailyUse: 580,
      daysLeft: 2.1,
      status: 'danger',
      statusText: '🔴 Critical',
    },
    {
      name: 'Foam',
      stock: 450,
      dailyUse: 45,
      daysLeft: 10,
      status: 'success',
      statusText: '🟢 Adequate',
    },
    {
      name: 'Fabric',
      stock: 12000,
      dailyUse: 820,
      daysLeft: 14.6,
      status: 'success',
      statusText: '🟢 Adequate',
    },
    {
      name: 'Thread',
      stock: 180,
      dailyUse: 25,
      daysLeft: 7.2,
      status: 'warning',
      statusText: '🟡 Low',
    },
  ];

  const criticalCount = materials.filter((m) => m.status === 'danger').length;

  return (
    <div className="metric-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl gradient-warning flex items-center justify-center glow-warning">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Material Stock Summary</h2>
            <p className="text-sm text-muted-foreground">Inventory status</p>
          </div>
        </div>
        {criticalCount > 0 && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-danger/10 text-danger rounded-lg">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-semibold">{criticalCount} Critical</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {materials.map((material, index) => (
          <div
            key={index}
            className="bg-secondary rounded-lg p-4 border-l-4 hover:bg-secondary/80 transition-colors"
            style={{
              borderColor: `hsl(var(--${material.status}))`,
            }}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-lg">{material.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {material.dailyUse} units/day
                </p>
              </div>
              <span className="status-badge" style={{
                backgroundColor: `hsl(var(--${material.status}) / 0.1)`,
                color: `hsl(var(--${material.status}))`,
              }}>
                {material.statusText}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Current Stock</div>
                <div className="text-xl font-bold font-mono">{material.stock.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Days Left</div>
                <div className="text-xl font-bold font-mono">{material.daysLeft}</div>
              </div>
            </div>

            <Progress
              value={(material.daysLeft / 15) * 100}
              className="h-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaterialStock;
