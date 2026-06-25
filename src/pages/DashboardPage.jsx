import { useNavigate } from 'react-router-dom';
import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import { CITY, HOTSPOTS, HISTORICAL_LST, SEVERITY_COLORS } from '../data/mockData';
import './DashboardPage.css';

function KPICard({ label, value, unit, sub, trend, trendLabel, accent }) {
  return (
    <div className="kpi-card">
      <div className="kpi-label label">{label}</div>
      <div className="kpi-body">
        <span className="kpi-value mono">{value}</span>
        {unit && <span className="kpi-unit">{unit}</span>}
      </div>
      <div className="kpi-footer">
        <span className="kpi-sub">{sub}</span>
        {trend && (
          <span className={`kpi-trend kpi-trend--${trend}`}>
            {trend === 'up' ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {trendLabel}
          </span>
        )}
      </div>
    </div>
  );
}

function AlertRow({ hotspot, rank }) {
  const sev = hotspot.severity_rank;
  return (
    <div className="alert-row">
      <div className="alert-rank mono">#{rank}</div>
      <div className="alert-body">
        <div className="alert-name">{hotspot.ward_name} — {hotspot.hotspot_label}</div>
        <div className="alert-meta">
          HSI {hotspot.z_score.toFixed(2)} · {hotspot.mean_lst}°C · {(hotspot.population_exposed / 1000).toFixed(0)}K residents
        </div>
      </div>
      <span className={`badge badge-${sev}`}>{sev}</span>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'var(--bg)', border: '1px solid var(--border-strong)', borderRadius: 8, padding: '8px 12px', fontSize: 12 }}>
      <div style={{ color: 'var(--text-3)', marginBottom: 2 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--accent)' }}>{payload[0].value}°C</div>
    </div>
  );
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const acqDate = new Date(CITY.snapshot_date);

  return (
    <div className="dashboard-page">
      {/* Page header */}
      <div className="page-header">
        <div>
          <h2>Overview</h2>
          <p className="page-subtitle">{CITY.name}, {CITY.state} · {acqDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
        <div className="header-actions">
          <div className="data-tag">
            <div className="data-tag-dot" />
            Landsat 8 · {CITY.cloud_cover_pct}% cloud cover
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/app/map')}>
            View Heat Map <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        {/* KPI Row */}
        <div className="kpi-row">
          <KPICard
            label="Mean Land Surface Temp"
            value={CITY.mean_lst}
            unit="°C"
            sub="City-wide average, all 20 wards"
            trend="up"
            trendLabel="+0.6°C vs May"
          />
          <KPICard
            label="Critical Hotspot Zones"
            value={CITY.critical_count}
            unit=" zones"
            sub={`of ${CITY.hotspot_count} total hotspots identified`}
            trend="up"
            trendLabel="+1 this week"
          />
          <KPICard
            label="Highest Risk Ward"
            value="Fort"
            sub="HSI 3.12 · 39.4°C · 156K residents"
          />
          <KPICard
            label="Vegetation Coverage"
            value={CITY.vegetation_pct}
            unit="%"
            sub="City-wide NDVI-derived green cover"
            trend="down"
            trendLabel="−2% vs 2023"
          />
        </div>

        {/* Main panels */}
        <div className="dashboard-panels">
          {/* LST Trend */}
          <div className="panel panel-chart">
            <div className="panel-header">
              <div>
                <h3>LST Trend — 30 Days</h3>
                <p className="text-sm" style={{ color: 'var(--text-3)', marginTop: 3 }}>Mean land surface temperature across all wards</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={HISTORICAL_LST} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
                <XAxis dataKey="date" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[34.5, 39.5]} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="lst"
                  stroke="var(--accent)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: 'var(--accent)', strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Severity dist */}
          <div className="panel panel-severity">
            <div className="panel-header">
              <h3>Ward Severity</h3>
            </div>
            <div className="severity-list">
              {[
                { label: 'Critical', count: 3,  pct: 15, sev: 'critical' },
                { label: 'High',     count: 4,  pct: 20, sev: 'high' },
                { label: 'Moderate', count: 7,  pct: 35, sev: 'moderate' },
                { label: 'Low',      count: 6,  pct: 30, sev: 'low' },
              ].map(s => (
                <div key={s.label} className="sev-row">
                  <div className="sev-left">
                    <span className={`badge badge-${s.sev}`}>{s.label}</span>
                    <span className="mono sev-count">{s.count}</span>
                  </div>
                  <div className="sev-bar-track">
                    <div
                      className="sev-bar"
                      style={{ width: `${s.pct}%`, background: SEVERITY_COLORS[s.sev] }}
                    />
                  </div>
                  <span className="sev-pct mono">{s.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts table */}
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Priority Alerts</h3>
              <p className="text-sm" style={{ color: 'var(--text-3)', marginTop: 3 }}>Wards with highest heat severity index</p>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => navigate('/app/hotspots')}>
              All Hotspots <ArrowRight size={13} />
            </button>
          </div>
          <div className="alerts-list">
            {HOTSPOTS.slice(0, 5).map((h, i) => (
              <AlertRow key={h.id} hotspot={h} rank={i + 1} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
