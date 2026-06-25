import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Check } from 'lucide-react';
import { WARDS, simulateIntervention, getSeverityLabel } from '../data/mockData';
import './SimulatorPage.css';

function Toggle({ on, onToggle }) {
  return (
    <button className={`sim-toggle ${on ? 'on' : 'off'}`} onClick={onToggle}>
      <div className="sim-toggle-thumb" />
    </button>
  );
}

function Slider({ label, value, min, max, step, unit, onChange }) {
  return (
    <div className="sim-slider">
      <div className="sim-slider-header">
        <span className="sim-slider-label">{label}</span>
        <span className="sim-slider-val mono">{value}{unit}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))} />
      <div className="sim-slider-range">
        <span>{min}{unit}</span><span>{max}{unit}</span>
      </div>
    </div>
  );
}

function DeltaGauge({ baseline, simulated }) {
  const delta = simulated - baseline;
  const reduction = Math.abs(Math.min(delta, 0));
  const pct = Math.min((reduction / 6) * 100, 100);
  const isGood = delta < 0;
  return (
    <div className="delta-gauge">
      <div className="delta-temps">
        <div className="delta-temp-col">
          <div className="delta-temp-label label">Baseline</div>
          <div className="delta-temp-val mono">{baseline.toFixed(1)}<span className="delta-unit">°C</span></div>
        </div>
        <div className="delta-arrow">→</div>
        <div className="delta-temp-col">
          <div className="delta-temp-label label">Simulated</div>
          <div className="delta-temp-val mono" style={{ color: isGood ? 'var(--heat-low)' : 'var(--text)' }}>
            {simulated.toFixed(1)}<span className="delta-unit">°C</span>
          </div>
        </div>
      </div>
      <div className="delta-reduction">
        <span className="delta-reduction-val mono" style={{ color: isGood ? 'var(--heat-low)' : 'var(--text-3)' }}>
          {delta <= 0 ? '−' : '+'}{Math.abs(delta).toFixed(2)}°C
        </span>
        <span className="delta-reduction-label">estimated temperature change</span>
      </div>
      <div className="delta-track">
        <div className="delta-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="delta-track-labels">
        <span>0°C</span>
        <span>−6°C theoretical max</span>
      </div>
    </div>
  );
}

export default function SimulatorPage() {
  const location = useLocation();
  const initWardId = location.state?.wardId || WARDS[0].id;

  const [wardId,         setWardId]         = useState(initWardId);
  const [treeOn,         setTreeOn]         = useState(true);
  const [roofOn,         setRoofOn]         = useState(true);
  const [waterOn,        setWaterOn]        = useState(false);
  const [treePct,        setTreePct]        = useState(20);
  const [roofPct,        setRoofPct]        = useState(35);
  const [waterArea,      setWaterArea]      = useState(500);
  const [result,         setResult]         = useState(null);
  const [saved,          setSaved]          = useState(false);

  const ward = WARDS.find(w => w.id === wardId) || WARDS[0];
  const sev = getSeverityLabel(ward.heat_severity_idx);

  const run = useCallback(() => {
    setResult(simulateIntervention({
      wardId,
      treeCoverage:     treeOn  ? treePct   : 0,
      coolRoofCoverage: roofOn  ? roofPct   : 0,
      waterAreaSqM:     waterOn ? waterArea  : 0,
    }));
    setSaved(false);
  }, [wardId, treeOn, treePct, roofOn, roofPct, waterOn, waterArea]);

  useEffect(() => { run(); }, [run]);

  return (
    <div className="simulator-page">
      <div className="page-header">
        <div>
          <h2>Intervention Simulator</h2>
          <p className="page-subtitle">Physics-informed cooling scenario builder</p>
        </div>
      </div>

      <div className="simulator-body">
        {/* Column 1: Ward selection */}
        <div className="sim-col sim-col-ward">
          <div className="sim-col-label label">Ward</div>
          <select className="sim-ward-select" value={wardId} onChange={e => setWardId(e.target.value)}>
            {WARDS.map(w => <option key={w.id} value={w.id}>{w.ward_name}</option>)}
          </select>

          <div className="sim-ward-facts">
            {[
              { l: 'Baseline LST', v: `${ward.mean_lst}°C`, accent: true },
              { l: 'HSI Score',    v: ward.heat_severity_idx.toFixed(2) },
              { l: 'Severity',     badge: sev },
              { l: 'Impervious',   v: `${ward.impervious_pct}%` },
              { l: 'Vegetation',   v: `${ward.vegetation_pct}%` },
              { l: 'Population',   v: `${(ward.population/1000).toFixed(0)}K` },
              { l: 'Area',         v: `${ward.area_sq_km} km²` },
            ].map(f => (
              <div key={f.l} className="sim-fact-row">
                <span className="sim-fact-label">{f.l}</span>
                {f.badge
                  ? <span className={`badge badge-${f.badge}`}>{f.badge}</span>
                  : <span className="sim-fact-val mono" style={f.accent ? { color: 'var(--accent)' } : {}}>{f.v}</span>
                }
              </div>
            ))}
          </div>

          <div className="sim-physics-box">
            <div className="label" style={{ marginBottom: 'var(--sp-3)' }}>Model</div>
            <p style={{ fontSize: '0.78rem', lineHeight: 1.65 }}>
              Urban energy balance equations. Calibrated against peer-reviewed case studies.
              Diminishing returns formula: ΔT = Σ ΔTᵢ × 0.85ⁱ.
            </p>
          </div>
        </div>

        {/* Column 2: Controls */}
        <div className="sim-col sim-col-controls">
          <div className="sim-col-label label">Interventions</div>

          <div className={`sim-intervention ${treeOn ? 'active' : ''}`}>
            <div className="sim-int-header">
              <div className="sim-int-meta">
                <div className="sim-int-title">Tree Planting</div>
                <div className="sim-int-sub">Evapotranspiration cooling + shading</div>
              </div>
              <Toggle on={treeOn} onToggle={() => setTreeOn(!treeOn)} />
            </div>
            {treeOn && (
              <div className="sim-int-controls">
                <Slider label="Canopy coverage increase" value={treePct} min={5} max={40} step={5} unit="%" onChange={setTreePct} />
                <div className="sim-formula">ΔT ≈ −{(treePct * 0.04).toFixed(1)}°C (tropical coeff. × 1.2)</div>
              </div>
            )}
          </div>

          <div className={`sim-intervention ${roofOn ? 'active' : ''}`}>
            <div className="sim-int-header">
              <div className="sim-int-meta">
                <div className="sim-int-title">Cool Roofs</div>
                <div className="sim-int-sub">High-albedo surfaces reduce solar absorption</div>
              </div>
              <Toggle on={roofOn} onToggle={() => setRoofOn(!roofOn)} />
            </div>
            {roofOn && (
              <div className="sim-int-controls">
                <Slider label="Building coverage" value={roofPct} min={10} max={70} step={5} unit="%" onChange={setRoofPct} />
                <div className="sim-formula">Δα = 0.3 (0.2 → 0.65 albedo) · Solar 620 W/m²</div>
              </div>
            )}
          </div>

          <div className={`sim-intervention ${waterOn ? 'active' : ''}`}>
            <div className="sim-int-header">
              <div className="sim-int-meta">
                <div className="sim-int-title">Water Feature</div>
                <div className="sim-int-sub">Blue infrastructure — evaporative cooling</div>
              </div>
              <Toggle on={waterOn} onToggle={() => setWaterOn(!waterOn)} />
            </div>
            {waterOn && (
              <div className="sim-int-controls">
                <Slider label="Water surface area" value={waterArea} min={200} max={5000} step={100} unit=" m²" onChange={setWaterArea} />
                <div className="sim-formula">Cooling radius ≈ 200m · L = 2.26 MJ/kg</div>
              </div>
            )}
          </div>
        </div>

        {/* Column 3: Results */}
        <div className="sim-col sim-col-results">
          <div className="sim-col-label label">Results</div>

          {result && (
            <>
              <DeltaGauge baseline={result.baseline_lst} simulated={result.simulated_lst} />

              <div className="sim-confidence">
                Confidence <strong className="mono">{result.confidence_pct}%</strong>
                <span className="sim-confidence-note">±15–30% range</span>
              </div>

              <div className="sim-breakdown">
                <div className="sim-breakdown-label label" style={{ marginBottom: 'var(--sp-3)' }}>Breakdown</div>
                {result.breakdown.map(b => (
                  <div key={b.type} className="sim-breakdown-row">
                    <span className="sb-type">{b.type}</span>
                    <span className="sb-delta mono" style={{ color: b.delta_t < 0 ? 'var(--heat-low)' : 'var(--text-3)' }}>
                      {b.delta_t <= 0 ? '−' : '+'}{Math.abs(b.delta_t).toFixed(2)}°C
                    </span>
                    <span className="sb-cost mono">₹{b.cost_lakh.toFixed(1)}L</span>
                  </div>
                ))}
              </div>

              <div className="sim-costs">
                <div className="sim-costs-label label" style={{ marginBottom: 'var(--sp-3)' }}>Cost Analysis</div>
                <div className="sim-cost-row">
                  <span>Total estimate</span>
                  <span className="mono">₹{result.cost_estimate_lakh.toFixed(1)} Lakh</span>
                </div>
                <div className="sim-cost-row">
                  <span>Cost per °C</span>
                  <span className="mono">
                    {result.cost_per_degree > 0 ? `₹${result.cost_per_degree.toFixed(1)}L / °C` : '—'}
                  </span>
                </div>
                <div className="sim-cost-row">
                  <span>Affected residents</span>
                  <span className="mono">{(ward.population/1000).toFixed(0)}K</span>
                </div>
              </div>

              <button
                className={`btn w-full ${saved ? 'btn-secondary' : 'btn-primary'}`}
                style={{ marginTop: 'auto' }}
                onClick={() => setSaved(true)}
              >
                {saved
                  ? <><Check size={15} /> Scenario Saved</>
                  : 'Save Scenario'
                }
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
