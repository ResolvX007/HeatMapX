import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Map, Flame, BarChart3, Sliders, FileText
} from 'lucide-react';
import './Sidebar.css';

const NAV = [
  { to: '/app',          label: 'Overview',    icon: LayoutDashboard, end: true },
  { to: '/app/map',      label: 'Heat Map',    icon: Map },
  { to: '/app/hotspots', label: 'Hotspots',    icon: Flame },
  { to: '/app/drivers',  label: 'Drivers',     icon: BarChart3 },
  { to: '/app/simulate', label: 'Simulator',   icon: Sliders },
  { to: '/app/report',   label: 'Report',      icon: FileText },
];

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo" onClick={() => navigate('/')}>
        <div className="sidebar-logo-mark">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="0" y="0" width="6" height="6" rx="1.5" fill="currentColor" />
            <rect x="8" y="0" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.5" />
            <rect x="0" y="8" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.3" />
            <rect x="8" y="8" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.7" />
          </svg>
        </div>
        <span className="sidebar-logo-name">ResolvX</span>
      </div>

      {/* Live status */}
      <div className="sidebar-status">
        <div className="status-pulse" />
        Live · Thiruvananthapuram
      </div>

      {/* Navigation */}
      <div className="sidebar-section-label">Platform</div>
      <nav className="sidebar-nav">
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <span className="sidebar-link-icon"><Icon size={15} strokeWidth={1.75} /></span>
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-footer-label">ISRO Hackathon 2026</div>
        <div className="sidebar-footer-sub">Team ResolvX · v1.0</div>
      </div>
    </aside>
  );
}
