import { LayoutDashboard, ListTodo, Calendar, FileText, BarChart3, Settings, Lightbulb } from 'lucide-react';
import { useState } from 'react';

type View = 'dashboard' | 'all-tasks' | 'agendas' | 'decisions' | 'analytics' | 'parking-lot' | 'settings';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

const menuItems = [
  { id: 'dashboard' as View, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'all-tasks' as View, label: 'All Tasks', icon: ListTodo },
  { id: 'agendas' as View, label: 'Meeting Agendas', icon: Calendar },
  { id: 'decisions' as View, label: 'Decisions & Logs', icon: FileText },
  { id: 'analytics' as View, label: 'Analytics', icon: BarChart3 },
  { id: 'parking-lot' as View, label: 'Phase 2 Parking Lot', icon: Lightbulb },
  { id: 'settings' as View, label: 'Settings', icon: Settings }
];

export default function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`bg-gradient-to-b from-gray-900 via-gray-900 to-[#E98A24]/10 text-white transition-all duration-300 flex flex-col ${
        collapsed ? 'w-20' : 'w-64'
      } min-h-screen`}
    >
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#E98A24] to-[#1A9CD7] bg-clip-text text-transparent">
              The Simple Plan
            </h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {collapsed ? '→' : '←'}
          </button>
        </div>
      </div>

      <nav className="flex-1 px-3 py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#E98A24] to-[#1A9CD7] text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <Icon size={20} />
                  {!collapsed && <span className="font-medium">{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800">
        {!collapsed && (
          <div className="text-sm text-gray-400">
            <p className="font-semibold text-white mb-1">Sprint Timeline</p>
            <p>Mar 1 – Apr 30, 2026</p>
            <div className="mt-3 bg-gray-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#E98A24] to-[#1A9CD7] h-full transition-all"
                style={{ width: '35%' }}
              />
            </div>
            <p className="mt-2 text-xs">Day 21 of 60</p>
          </div>
        )}
      </div>
    </aside>
  );
}
