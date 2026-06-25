import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  ScatterChart, Scatter, CartesianGrid,
} from 'recharts';
import { CITY_DRIVERS, NDVI_LST_SCATTER, WARDS, getWardDrivers } from '../data/mockData';
import './DriversPage.css';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  return (
    <div style={{ background: 'var(--bg)', border: '1px solid var(--border-strong)', borderRadius: 8, padding: '8px 12px', fontSize: 12 }}>
      <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{d?.ward_name}</div>
      <div style={{ color: 'var(--text-3)' }}>NDVI: <span style={{ fontFamily: 'var(--font-mono)' }}>{d?.ndvi?.toFixed(3)}</span></div>
      <div style={{ color: 'var(--accent)' }}>LST: <span style={{ fontFamily: 'var(--font-mono)' }}>{d?.lst}°C</span></div>
    </div>
  );
};

const ScatterDot = (props) => {
  const { cx, cy, payload } = props;
  const c = payload.hsi >= 2.5 ? '#C0392B' : payload.hsi >= 1.5 ? '#D4622A' : payload.hsi >= 0.8 ? '#C9961A' : '#27865A';
  return <circle cx={cx} cy={cy} r={5.5} fill={c} fillOpacity={0.7} stroke="none" />;
};

const BarTip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'var(--bg)', border: '1px solid var(--border-strong)', borderRadius: 8, padding: '8px 12px', fontSize: 12 }}>
      <div style={{ color: 'var(--text-2)', marginBottom: 2 }}>{payload[0]?.payload?.driver_name}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>SHAP: {payload[0]?.value?.toFixed(4)}</div>
      <div style={{ color: payload[0]?.payload?.direction === 'heating' ? 'var(--heat-high)' : 'var(--heat-low)', fontSize: 11 }}>
        {payload[0]?.payload?.direction}
      </div>
    </div>
  );
};

export default function DriversPage() {
  const [wardId, setWardId] = useState('w01');
  const wardDrivers = getWardDrivers(wardId);
  const ward = WARDS.find(w => w.id === wardId);

  const chartData = CITY_DRIVERS
    .map(d => ({ ...d, abs_shap: Math.abs(d.mean_shap) }))
    .sort((a, b) => b.abs_shap - a.abs_shap);

  return (
    <div className="drivers-page">
      <div className="page-header">
        <div>
          <h2>Driver Analysis</h2>
          <p className="page-subtitle">SHAP-based ML explainability · Random Forest · R² = 0.82</p>
        </div>
      </div>

      <div className="drivers-content">
        {/* City SHAP bar chart */}
        <div className="drivers-top">
          <div className="panel drivers-shap-panel">
            <div className="panel-header">
              <div>
                <h3>City-Level Feature Importance</h3>
                <p className="text-sm" style={{ color: 'var(--text-3)', marginTop: 3 }}>
                  Mean |SHAP| across all {WARDS.length} wards · higher = stronger driver
                </p>
              </div>
              <div style={{ display: 'flex', gap: 'var(--sp-4)', fontSize: '0.75rem' }}>
                <span style={{ color: 'var(--heat-high)' }}>● Heating</span>
                <span style={{ color: 'var(--heat-low)' }}>● Cooling</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 8, left: 140, bottom: 0 }}>
                <XAxis type="number" tick={{ fontSize: 10 }} tickFormatter={v => v.toFixed(3)} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="driver_name" tick={{ fontSize: 12 }} width={140} axisLine={false} tickLine={false} />
                <Tooltip content={<BarTip />} />
                <Bar dataKey="abs_shap" radius={[0, 3, 3, 0]}>
                  {chartData.map(d => (
                    <Cell key={d.driver_name} fill={d.direction === 'heating' ? 'var(--heat-high)' : 'var(--heat-low)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Ward detail */}
          <div className="panel drivers-ward-panel">
            <div className="panel-header" style={{ alignItems: 'center' }}>
              <h3>Ward Attribution</h3>
              <select
                className="drivers-ward-select"
                value={wardId}
                onChange={e => setWardId(e.target.value)}
              >
                {WARDS.map(w => <option key={w.id} value={w.id}>{w.ward_name}</option>)}
              </select>
            </div>

            {ward && (
              <div className="ward-insight-box">
                <div className="wib-name">{ward.ward_name}</div>
                <p className="wib-text">
                  Primary driver is{' '}
                  <strong style={{ color: 'var(--heat-high)' }}>
                    {wardDrivers[0]?.driver_name} ({wardDrivers[0]?.contribution_pct}%)
                  </strong>
                  {wardDrivers.find(d => d.direction === 'cooling') && (
                    <>. Partially offset by <strong style={{ color: 'var(--heat-low)' }}>
                      {wardDrivers.find(d => d.direction === 'cooling')?.driver_name}
                    </strong></>
                  )}.
                </p>
              </div>
            )}

            <div className="ward-drivers-breakdown">
              {wardDrivers.slice(0, 5).map(d => (
                <div key={d.driver_name} className="ward-driver-row">
                  <div className="wd-name">{d.driver_name}</div>
                  <div className="wd-bar-track">
                    <div
                      className="wd-bar"
                      style={{
                        width: `${d.contribution_pct}%`,
                        background: d.direction === 'heating' ? 'var(--heat-high)' : 'var(--heat-low)',
                      }}
                    />
                  </div>
                  <div className="wd-right">
                    <span className="wd-pct mono">{d.contribution_pct}%</span>
                    <span className={`wd-dir ${d.direction}`}>{d.direction === 'heating' ? '↑' : '↓'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scatter */}
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>NDVI ↔ LST Correlation</h3>
              <p className="text-sm" style={{ color: 'var(--text-3)', marginTop: 3 }}>
                All {WARDS.length} wards · Pearson r = −0.84 · confirms vegetation deficit as primary UHI driver
              </p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <ScatterChart margin={{ top: 4, right: 16, left: 0, bottom: 16 }}>
              <CartesianGrid stroke="var(--border)" />
              <XAxis
                dataKey="ndvi" type="number" domain={[0.05, 0.7]}
                tick={{ fontSize: 10 }}
                label={{ value: 'NDVI Mean', position: 'insideBottom', offset: -8, style: { fontSize: 11, fill: 'var(--text-3)' } }}
                axisLine={false} tickLine={false}
              />
              <YAxis
                dataKey="lst" type="number" domain={[33, 41]}
                tick={{ fontSize: 10 }}
                label={{ value: 'LST (°C)', angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: 'var(--text-3)' } }}
                axisLine={false} tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Scatter data={NDVI_LST_SCATTER} shape={<ScatterDot />} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
