import { Settings as SettingsIcon } from 'lucide-react';

const Settings = () => {
  return (
    <div className="space-y-6">
      <div className="card-elevated p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center glow-primary">
            <SettingsIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-sm text-muted-foreground">
              System configuration and preferences
            </p>
          </div>
        </div>
      </div>

      <div className="metric-card text-center py-12">
        <p className="text-muted-foreground">
          Settings panel coming soon...
        </p>
      </div>
    </div>
  );
};

export default Settings;
