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

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'bg-primary text-primary-foreground font-semibold'
      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground';

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
                      <NavLink to={item.url} className={getNavClass}>
                        <item.icon className="w-4 h-4" />
                        {!isCollapsed && <span>{item.title}</span>}
                      </NavLink>
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
