import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  Activity, 
  BrainCircuit, 
  SlidersHorizontal, 
  Target, 
  TrendingUp, 
  FileText, 
  Settings 
} from 'lucide-react';
import { cn } from '../ui/GlassCard';

const navItems = [
  { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Heat Maps', path: '/heat-maps', icon: Map },
  { name: 'Heat Drivers', path: '/heat-drivers', icon: Activity },
  { name: 'AIML Insights', path: '/aiml-insights', icon: BrainCircuit },
  { name: 'Simulations', path: '/simulations', icon: SlidersHorizontal },
  { name: 'Optimization', path: '/optimization', icon: Target },
  { name: 'Forecasting', path: '/forecasting', icon: TrendingUp },
  { name: 'Reports', path: '/reports', icon: FileText },
  { name: 'Settings', path: '/settings', icon: Settings },
];

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen fixed left-0 top-0 bg-[var(--bg-sidebar)] backdrop-blur-xl border-r border-[var(--border-color)] flex flex-col py-6 z-50">
      <div className="px-6 mb-8 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center animate-glow">
          <Map className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-bold text-white tracking-wide">
          Heat<span className="text-neon-cyan">Lens</span> AI
        </h1>
      </div>

      <nav className="flex-1 flex flex-col gap-2 px-4">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 relative group overflow-hidden",
                isActive 
                  ? "bg-slate-800/50 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]" 
                  : "text-slate-400 hover:text-white hover:bg-slate-800/30 hover:border hover:border-slate-700 border border-transparent"
              )
            }
          >
            {({ isActive }) => (
              <>
                {/* Active persistent glow border effect */}
                {isActive && (
                  <div className="absolute inset-0 border border-cyan-500 rounded-lg opacity-50 animate-glow pointer-events-none" />
                )}
                <item.icon className={cn("w-5 h-5 transition-colors", isActive ? "text-cyan-400" : "text-slate-400 group-hover:text-cyan-300")} />
                <span className="font-medium text-sm">{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
