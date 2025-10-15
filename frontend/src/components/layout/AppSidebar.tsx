import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  Calendar,
  Users,
  Package,
  Settings,
  Activity,
  BarChart3,
  Factory,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useState } from 'react';

const menuItems = [
  {
    title: 'DASHBOARD',
    items: [
      { title: 'Main Overview', url: '/dashboard', icon: LayoutDashboard },
      { title: 'Factory Health', url: '/factory-health', icon: Activity },
    ],
  },
  {
    title: 'ANALYTICS',
    items: [
      { title: 'Monthly Trends', url: '/monthly-analytics', icon: TrendingUp },
      { title: 'Daily Details', url: '/daily-details', icon: Calendar },
    ],
  },
  {
    title: 'WORKFORCE',
    items: [{ title: 'Attendance & Segmentation', url: '/workforce', icon: Users }],
  },
  {
    title: 'MATERIALS',
    items: [
      { title: 'Stock Overview', url: '/materials', icon: Package },
      { title: 'Usage Trends', url: '/materials/trends', icon: BarChart3 },
    ],
  },
  {
    title: 'SETTINGS',
    items: [{ title: 'Configuration', url: '/settings', icon: Settings }],
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  const [pressed, setPressed] = useState<string | null>(null);

  const getNavClass = ({ isActive }: { isActive: boolean }, title: string) => {
    // Subtle active styling for current route (no dark background)
    const base = isActive
      ? 'flex items-center gap-2 px-3 py-2 rounded text-primary font-semibold'
      : 'flex items-center gap-2 px-3 py-2 rounded text-slate-800 hover:bg-sidebar-accent hover:text-slate-900 transition-colors';

    // If this item is being pressed, add the dark pressed class
    return pressed === title ? `${base} sidebar-pressed` : base;
  };

  return (
    <Sidebar className="border-r border-sidebar-border">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center glow-primary">
            <Factory className="w-6 h-6 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="font-bold text-lg">Factory</h2>
              <p className="text-xs text-muted-foreground">Management</p>
            </div>
          )}
        </div>
        {/* TV Mode button placed directly under the header for prominence */}
        <div className="mt-4">
          {isCollapsed ? (
            <a
              href="/tv-overview"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open TV Mode"
              className="w-10 h-10 rounded-lg bg-amber-400 flex items-center justify-center text-black shadow-md"
            >
              <BarChart3 className="w-5 h-5" />
            </a>
          ) : (
            <a
              href="/tv-overview"
              target="_blank"
              rel="noopener noreferrer"
              role="button"
              aria-label="Open TV Mode"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-400 text-black font-semibold hover:bg-amber-500 shadow-lg border border-amber-300"
            >
              <BarChart3 className="w-4 h-4" />
              <span>TV Mode</span>
            </a>
          )}
        </div>
      </div>

      <SidebarContent>
        {menuItems.map((section) => (
          <SidebarGroup key={section.title}>
            {!isCollapsed && <SidebarGroupLabel>{section.title}</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      {item.title === 'TV Mode' ? (
                        // Render as an anchor so it opens in a new tab
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 px-3 py-2 rounded ${!isCollapsed ? 'font-semibold text-white bg-primary' : 'text-current'}`}
                        >
                          <item.icon className="w-4 h-4 text-white" />
                          {!isCollapsed && <span>TV Mode</span>}
                        </a>
                      ) : (
                        <NavLink
                          to={item.url}
                          className={(nav) => getNavClass(nav, item.title)}
                          onMouseDown={() => setPressed(item.title)}
                          onMouseUp={() => setPressed(null)}
                          onMouseLeave={() => setPressed(null)}
                          onTouchStart={() => setPressed(item.title)}
                          onTouchEnd={() => setPressed(null)}
                        >
                          <item.icon className="w-4 h-4 text-current" />
                          {!isCollapsed && <span>{item.title}</span>}
                        </NavLink>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
