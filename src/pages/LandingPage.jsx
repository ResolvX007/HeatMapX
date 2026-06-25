import { useNavigate } from 'react-router-dom';
import { ArrowRight, Satellite, Brain, Zap } from 'lucide-react';
import './LandingPage.css';

// Minimal heat grid — suggestion of data, not decoration
function HeatMap() {
  const rows = 8;
  const cols = 14;
  const seed = [
    [0.2,0.3,0.5,0.7,0.9,0.95,0.8,0.7,0.5,0.4,0.3,0.2,0.2,0.1],
    [0.3,0.5,0.7,0.85,0.95,1.0,0.9,0.8,0.6,0.5,0.4,0.3,0.2,0.2],
    [0.4,0.6,0.8,0.9,0.85,0.95,0.95,0.85,0.7,0.6,0.5,0.4,0.3,0.2],
    [0.3,0.55,0.75,0.85,0.8,0.9,0.9,0.8,0.65,0.55,0.45,0.35,0.25,0.2],
    [0.25,0.45,0.65,0.75,0.7,0.8,0.85,0.75,0.6,0.5,0.4,0.3,0.2,0.15],
    [0.2,0.35,0.5,0.6,0.6,0.7,0.75,0.65,0.5,0.4,0.3,0.25,0.2,0.15],
    [0.15,0.25,0.4,0.5,0.5,0.55,0.6,0.55,0.4,0.3,0.25,0.2,0.15,0.1],
    [0.1,0.2,0.3,0.4,0.4,0.45,0.45,0.4,0.3,0.25,0.2,0.15,0.1,0.1],
  ];
  const getColor = (v) => {
    if (v > 0.9)  return 'rgba(192,57,43,0.75)';
    if (v > 0.75) return 'rgba(212,98,42,0.65)';
    if (v > 0.55) return 'rgba(201,150,26,0.50)';
    if (v > 0.35) return 'rgba(100,160,220,0.35)';
    return 'rgba(39,134,90,0.25)';
  };
  return (
    <div className="landing-heatmap">
      {seed.map((row, r) => (
        <div key={r} className="hm-row">
          {row.map((v, c) => (
            <div key={c} className="hm-cell" style={{ background: getColor(v) }} />
          ))}
        </div>
      ))}
    </div>
  );
}

const FEATURES = [
  {
    step: '01',
    icon: Satellite,
    heading: 'Detect',
    body: 'Automated hotspot identification from Landsat 8 LST data. DBSCAN clustering ranks every heat zone by severity index — no GIS expertise needed.',
  },
  {
    step: '02',
    icon: Brain,
    heading: 'Diagnose',
    body: 'Random Forest + SHAP explainability decomposes heat causes per ward. Understand whether vegetation loss, impervious surface, or building density is driving UHI.',
  },
  {
    step: '03',
    icon: Zap,
    heading: 'Deploy',
    body: 'Physics-informed simulation estimates temperature reduction from tree planting, cool roofs, and water features. Get cost-per-degree ROI for any budget.',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="landing">

      {/* NAV */}
      <nav className="landing-nav">
        <div className="landing-logo" onClick={() => navigate('/')}>
          <div className="logo-mark">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="0" y="0" width="5" height="5" rx="1" fill="currentColor" />
              <rect x="7" y="0" width="5" height="5" rx="1" fill="currentColor" opacity="0.5" />
              <rect x="0" y="7" width="5" height="5" rx="1" fill="currentColor" opacity="0.3" />
              <rect x="7" y="7" width="5" height="5" rx="1" fill="currentColor" opacity="0.7" />
            </svg>
          </div>
          <span>ResolvX</span>
        </div>
        <div className="landing-nav-right">
          <span className="badge badge-accent">ISRO Hackathon 2026</span>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/app')}>
            Open Platform
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-section">
        <div className="hero-left">
          <div className="hero-eyebrow">
            <div className="eyebrow-dot" />
            Urban Heat Intelligence
          </div>
          <h1 className="hero-heading">
            See the heat.<br />
            Understand the cause.<br />
            <span className="hero-heading-accent">Deploy the cure.</span>
          </h1>
          <p className="hero-body">
            AI-powered heat stress mapping for smart city planners.
            From Landsat 8 satellite data to intervention ROI — in minutes.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/app')}>
              Open Demo Platform <ArrowRight size={17} />
            </button>
            <button className="btn btn-ghost btn-lg" onClick={() => navigate('/app/map')}>
              View Heat Map
            </button>
          </div>
          <div className="hero-meta">
            <span>Landsat 8 · 30m resolution</span>
            <div className="meta-dot" />
            <span>Thiruvananthapuram, Kerala</span>
            <div className="meta-dot" />
            <span>June 2024</span>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-map-card">
            <div className="hero-map-label label">Land Surface Temperature — Ward Level</div>
            <HeatMap />
            <div className="hero-map-legend">
              {[
                { c: 'rgba(39,134,90,0.5)',   l: '< 34°C' },
                { c: 'rgba(100,160,220,0.5)', l: '34–36°C' },
                { c: 'rgba(201,150,26,0.6)',  l: '36–38°C' },
                { c: 'rgba(212,98,42,0.7)',   l: '38–40°C' },
                { c: 'rgba(192,57,43,0.8)',   l: '> 40°C' },
              ].map(({ c, l }) => (
                <div key={l} className="legend-chip">
                  <div className="legend-swatch" style={{ background: c }} />
                  <span>{l}</span>
                </div>
              ))}
            </div>
            <div className="hero-map-stats">
              <div className="map-stat">
                <div className="map-stat-val mono">37.4°C</div>
                <div className="map-stat-lbl">City Mean LST</div>
              </div>
              <div className="map-stat-divider" />
              <div className="map-stat">
                <div className="map-stat-val mono">47</div>
                <div className="map-stat-lbl">Hotspots</div>
              </div>
              <div className="map-stat-divider" />
              <div className="map-stat">
                <div className="map-stat-val mono">−2.8°C</div>
                <div className="map-stat-lbl">Max Intervention ΔT</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THIN DIVIDER + STAT BAR */}
      <div className="stat-bar">
        <div className="stat-bar-inner">
          {[
            ['47', 'Heat Zones Identified'],
            ['3', 'Critical Ward Clusters'],
            ['R² 0.82', 'ML Model Accuracy'],
            ['±15%', 'Intervention Confidence'],
            ['4 datasets', 'Satellite Sources Fused'],
          ].map(([val, label]) => (
            <div key={label} className="stat-bar-item">
              <div className="stat-bar-val mono">{val}</div>
              <div className="stat-bar-lbl">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="how-section">
        <div className="how-inner">
          <div className="how-header">
            <p className="label">Methodology</p>
            <h2>Three stages. One clear decision.</h2>
            <p className="how-sub">ResolvX transforms complex satellite science into a workflow any city official can use in under five minutes.</p>
          </div>
          <div className="how-steps">
            {FEATURES.map(({ step, icon: Icon, heading, body }) => (
              <div key={step} className="how-step">
                <div className="how-step-top">
                  <span className="how-step-num label">{step}</span>
                  <Icon size={18} strokeWidth={1.5} style={{ color: 'var(--text-3)' }} />
                </div>
                <h3 className="how-step-heading">{heading}</h3>
                <p className="how-step-body">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="compare-section">
        <div className="how-inner">
          <div className="compare-grid">
            <div className="compare-left">
              <p className="label" style={{ marginBottom: 'var(--sp-4)' }}>Why ResolvX</p>
              <h2 style={{ marginBottom: 'var(--sp-5)' }}>Satellite data to<br />policy decision — in minutes.</h2>
              <p style={{ marginBottom: 'var(--sp-8)', maxWidth: 400 }}>
                Traditional GIS tools require expert knowledge, days of processing, and produce reports that don't prioritize or recommend. ResolvX does all three automatically.
              </p>
              <button className="btn btn-primary" onClick={() => navigate('/app')}>
                Explore the Platform <ArrowRight size={15} />
              </button>
            </div>
            <div className="compare-right">
              <div className="compare-table">
                <div className="ct-header">
                  <span>Capability</span>
                  <span>Traditional GIS</span>
                  <span style={{ color: 'var(--accent)' }}>ResolvX</span>
                </div>
                {[
                  ['Data fusion',          'Manual, days',    'Automated'],
                  ['Hotspot ranking',      'Visual inspection','ML scoring'],
                  ['Driver attribution',   'Expert judgement', 'SHAP explainability'],
                  ['Intervention impact',  'Not available',   'Physics simulation'],
                  ['Output format',        'Raw GIS maps',    'Decision-ready reports'],
                  ['Time to insight',      'Days to weeks',   'Under 5 minutes'],
                ].map(([cap, old, nw]) => (
                  <div key={cap} className="ct-row">
                    <span>{cap}</span>
                    <span className="ct-old">{old}</span>
                    <span className="ct-new">{nw}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-section">
        <div className="how-inner">
          <div className="cta-inner">
            <div>
              <h2 style={{ marginBottom: 'var(--sp-3)' }}>Ready to explore Thiruvananthapuram's heat intelligence?</h2>
              <p>Live demo using real Landsat 8 data. All 20 wards. Full intervention simulation.</p>
            </div>
            <button className="btn btn-accent btn-lg" onClick={() => navigate('/app')}>
              Open Platform <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="landing-footer">
        <div className="how-inner">
          <div className="footer-inner">
            <div className="footer-brand">
              <div className="landing-logo" style={{ cursor: 'default' }}>
                <div className="logo-mark"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="0" y="0" width="5" height="5" rx="1" fill="currentColor" /><rect x="7" y="0" width="5" height="5" rx="1" fill="currentColor" opacity="0.5" /><rect x="0" y="7" width="5" height="5" rx="1" fill="currentColor" opacity="0.3" /><rect x="7" y="7" width="5" height="5" rx="1" fill="currentColor" opacity="0.7" /></svg></div>
                <span>ResolvX</span>
              </div>
              <p className="footer-tagline">Urban Heat Intelligence Platform</p>
            </div>
            <div className="footer-meta">
              <p>Team ResolvX · ISRO Hackathon 2026</p>
              <p>Built on Landsat 8 · Sentinel-2 · ERA5 · GHSL</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
