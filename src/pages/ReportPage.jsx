import { useState } from 'react';
import { Download, Check } from 'lucide-react';
import { CITY, HOTSPOTS, WARDS, CITY_DRIVERS } from '../data/mockData';
import './ReportPage.css';

const SECTIONS = [
  { id: 'executive',     label: 'Executive Summary',             on: true },
  { id: 'hotspots',      label: 'Top 5 Hotspot Summary',         on: true },
  { id: 'drivers',       label: 'Driver Attribution',            on: true },
  { id: 'interventions', label: 'Intervention Recommendations',  on: true },
  { id: 'methodology',   label: 'Methodology Note',              on: false },
];

export default function ReportPage() {
  const [title,    setTitle]    = useState(`Urban Heat Stress Report — ${CITY.name}`);
  const [sections, setSections] = useState(Object.fromEntries(SECTIONS.map(s => [s.id, s.on])));
  const [printed,  setPrinted]  = useState(false);

  const toggle = id => setSections(s => ({ ...s, [id]: !s[id] }));
  const print  = () => { setPrinted(true); window.print(); };

  const topHotspots = HOTSPOTS.slice(0, 5);

  return (
    <div className="report-page">
      <div className="page-header">
        <div>
          <h2>Report Generator</h2>
          <p className="page-subtitle">Generate a print-ready urban heat stress analysis report</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={print}>
            <Download size={15} strokeWidth={1.75} />
            {printed ? 'Print again' : 'Generate PDF'}
          </button>
        </div>
      </div>

      <div className="report-body">
        {/* Config */}
        <div className="report-config">
          <div className="rc-section">
            <label className="label" style={{ display: 'block', marginBottom: 'var(--sp-3)' }}>Report Title</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
          </div>

          <div className="rc-section">
            <div className="label" style={{ marginBottom: 'var(--sp-3)' }}>Snapshot</div>
            <div className="rc-info">
              <div>{CITY.name}, {CITY.state}</div>
              <div>{new Date(CITY.snapshot_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
              <div>Landsat 8 · {CITY.cloud_cover_pct}% cloud cover</div>
            </div>
          </div>

          <div className="rc-section">
            <div className="label" style={{ marginBottom: 'var(--sp-3)' }}>Sections</div>
            <div className="rc-sections">
              {SECTIONS.map(s => (
                <label key={s.id} className="rc-section-row">
                  <div className={`rc-checkbox ${sections[s.id] ? 'checked' : ''}`} onClick={() => toggle(s.id)}>
                    {sections[s.id] && <Check size={10} strokeWidth={2.5} />}
                  </div>
                  <span>{s.label}</span>
                </label>
              ))}
            </div>
          </div>

          {printed && (
            <div className="rc-print-msg">
              <Check size={14} />
              Report sent to print dialog
            </div>
          )}
        </div>

        {/* Preview */}
        <div className="report-preview" id="report-content">
          {/* Cover */}
          <div className="rp-cover">
            <div className="rp-cover-eyebrow label">ResolvX Urban Heat Intelligence Platform</div>
            <h1 className="rp-cover-title">{title}</h1>
            <div className="rp-cover-meta">
              <span>{CITY.name}, {CITY.state}</span>
              <span>·</span>
              <span>Generated {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              <span>·</span>
              <span>Landsat 8 · {new Date(CITY.snapshot_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
          </div>

          {/* Executive summary */}
          {sections.executive && (
            <div className="rp-section">
              <h2 className="rp-section-title">Executive Summary</h2>
              <div className="rp-kpi-row">
                {[
                  { val: `${CITY.mean_lst}°C`, label: 'Mean City LST' },
                  { val: `${CITY.critical_count}`, label: 'Critical Zones' },
                  { val: `${CITY.hotspot_count}`, label: 'Total Hotspots' },
                  { val: `${CITY.vegetation_pct}%`, label: 'Vegetation Cover' },
                ].map(k => (
                  <div key={k.label} className="rp-kpi">
                    <div className="rp-kpi-val mono">{k.val}</div>
                    <div className="rp-kpi-label label">{k.label}</div>
                  </div>
                ))}
              </div>
              <p className="rp-para">
                {CITY.name} exhibits significant Urban Heat Island (UHI) effects with a mean land surface temperature of {CITY.mean_lst}°C — approximately {(CITY.mean_lst - 34).toFixed(1)}°C above the rural reference baseline measured for this acquisition date. {CITY.critical_count} ward clusters are classified as CRITICAL (HSI &gt; 2.5), requiring immediate cooling intervention. The primary city-level driver is vegetation deficit, contributing 31% of observed UHI intensity per SHAP analysis. Fort, Thampanoor, and Pattom wards represent the highest priority intervention targets.
              </p>
            </div>
          )}

          {/* Hotspot table */}
          {sections.hotspots && (
            <div className="rp-section">
              <h2 className="rp-section-title">Top 5 Heat Hotspots</h2>
              <table className="rp-table">
                <thead>
                  <tr>
                    <th>#</th><th>Zone</th><th>Ward</th>
                    <th>Mean LST</th><th>HSI</th><th>Population</th><th>Severity</th>
                  </tr>
                </thead>
                <tbody>
                  {topHotspots.map((hs, i) => (
                    <tr key={hs.id}>
                      <td>{i + 1}</td>
                      <td>{hs.hotspot_label}</td>
                      <td>{hs.ward_name}</td>
                      <td className="mono">{hs.mean_lst}°C</td>
                      <td className="mono">{hs.z_score.toFixed(2)}</td>
                      <td>{(hs.population_exposed / 1000).toFixed(0)}K</td>
                      <td><span className={`badge badge-${hs.severity_rank}`}>{hs.severity_rank}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Drivers */}
          {sections.drivers && (
            <div className="rp-section">
              <h2 className="rp-section-title">Heat Driver Attribution</h2>
              <p className="rp-para" style={{ marginBottom: 'var(--sp-5)' }}>
                Random Forest model (R² = 0.82) with SHAP explainability. Higher mean |SHAP| = stronger city-level influence on LST.
              </p>
              <div className="rp-drivers">
                {CITY_DRIVERS.slice(0, 6).map(d => (
                  <div key={d.driver_name} className="rp-driver-row">
                    <span className="rp-driver-name">{d.driver_name}</span>
                    <div className="rp-driver-bar-track">
                      <div className="rp-driver-bar"
                        style={{
                          width: `${Math.min(Math.abs(d.mean_shap) * 1500, 100)}%`,
                          background: d.direction === 'heating' ? 'var(--heat-high)' : 'var(--heat-low)',
                        }}
                      />
                    </div>
                    <span className="rp-driver-shap mono">{d.mean_shap.toFixed(4)}</span>
                    <span className={`rp-driver-dir ${d.direction}`}>{d.direction}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interventions */}
          {sections.interventions && (
            <div className="rp-section">
              <h2 className="rp-section-title">Intervention Recommendations</h2>
              <table className="rp-table">
                <thead>
                  <tr><th>Ward</th><th>Intervention</th><th>Est. ΔT</th><th>Cost</th><th>Priority</th></tr>
                </thead>
                <tbody>
                  {[
                    ['Fort',       'Cool Roofs (60% coverage)',       '−2.1°C', '₹42.0 L', 'critical'],
                    ['Thampanoor', 'Tree Planting (25% canopy)',      '−1.8°C', '₹28.5 L', 'critical'],
                    ['Pattom',     'Trees + Cool Roof (combined)',    '−2.8°C', '₹18.0 L', 'high'],
                    ['East Fort',  'Water Feature (1,200m²)',         '−0.9°C', '₹12.0 L', 'high'],
                    ['Palayam',    'Cool Roofs (35% coverage)',       '−1.4°C', '₹22.0 L', 'moderate'],
                  ].map(([ward, int_, dt, cost, sev]) => (
                    <tr key={ward}>
                      <td style={{ fontWeight: 500 }}>{ward}</td>
                      <td>{int_}</td>
                      <td className="mono" style={{ color: 'var(--heat-low)' }}>{dt}</td>
                      <td className="mono">{cost}</td>
                      <td><span className={`badge badge-${sev}`}>{sev}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Methodology */}
          {sections.methodology && (
            <div className="rp-section">
              <h2 className="rp-section-title">Methodology Note</h2>
              <p className="rp-para">
                <strong>Data Sources:</strong> Landsat 8 Collection 2 Band 10 (Thermal Infrared, 30m) — Sobrino emissivity method for LST retrieval. Sentinel-2 L2A for spectral indices (NDVI, NDBI, NDWI). ERA5 reanalysis for wind and humidity inputs. GHSL R2023A for building footprint density.
              </p>
              <p className="rp-para" style={{ marginTop: 'var(--sp-4)' }}>
                <strong>ML Model:</strong> Random Forest Regressor (200 estimators, max_depth=8). SHAP TreeExplainer for per-sample attribution. Cross-validation R² = 0.82, RMSE = 0.81°C. Hotspot detection via DBSCAN (ε=0.002°, min_samples=10) on pixels exceeding city_mean + 1.5σ.
              </p>
              <p className="rp-para" style={{ marginTop: 'var(--sp-4)' }}>
                <strong>Intervention Physics:</strong> Tree planting uses evapotranspiration formulas from Bowler et al. (2010) with 1.2× tropical modifier. Cool roof model uses radiative forcing (Δα = 0.3, insolation 620 W/m²). Water feature uses latent heat of vaporization (L = 2.26 MJ/kg). Confidence intervals: trees ±25%, cool roofs ±15%, water ±30%.
              </p>
            </div>
          )}

          <div className="rp-footer">
            ResolvX Urban Heat Intelligence Platform · Team ResolvX · ISRO Hackathon 2026
            <br />Compatible with ISRO IRS / EOS-06 data products
          </div>
        </div>
      </div>
    </div>
  );
}
