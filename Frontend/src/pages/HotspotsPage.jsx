import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { Download, ArrowRight } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import { CITY, HOTSPOTS, SEVERITY_COLORS } from '../data/mockData';
import './HotspotsPage.css';

export default function HotspotsPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(HOTSPOTS[0]);

  return (
    <div className="hotspots-page">
      <div className="page-header">
        <div>
          <h2>Hotspot Intelligence</h2>
          <p className="page-subtitle">{HOTSPOTS.length} zones identified · {CITY.name} · Ranked by heat severity</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary btn-sm">
            <Download size={14} strokeWidth={1.75} /> Export CSV
          </button>
        </div>
      </div>

      <div className="hotspots-body">
        {/* Ranked list */}
        <div className="hs-list">
          <div className="hs-list-head">
            <span>#</span>
            <span>Zone</span>
            <span>LST</span>
            <span>Severity</span>
          </div>
          {HOTSPOTS.map((hs, i) => (
            <div
              key={hs.id}
              className={`hs-row ${selected?.id === hs.id ? 'selected' : ''}`}
              onClick={() => setSelected(hs)}
            >
              <span className="hs-rank mono">{i + 1}</span>
              <div className="hs-info">
                <div className="hs-name">{hs.hotspot_label}</div>
                <div className="hs-ward">{hs.ward_name}</div>
              </div>
              <div className="hs-temp">
                <div className="mono hs-temp-val">{hs.mean_lst}°C</div>
                <div className="hs-temp-peak">peak {hs.max_lst}°C</div>
              </div>
              <span className={`badge badge-${hs.severity_rank}`}>{hs.severity_rank}</span>
            </div>
          ))}
        </div>

        {/* Detail */}
        {selected && (
          <div className="hs-detail">
            {/* Mini map */}
            <div className="hs-mini-map">
              <MapContainer
                center={[selected.lat, selected.lng]}
                zoom={14}
                className="hs-mini-leaflet"
                zoomControl={false}
                scrollWheelZoom={false}
                dragging={false}
              >
                <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" maxZoom={18} />
                <CircleMarker
                  center={[selected.lat, selected.lng]}
                  radius={32}
                  pathOptions={{ fillColor: SEVERITY_COLORS[selected.severity_rank], fillOpacity: 0.18, color: SEVERITY_COLORS[selected.severity_rank], weight: 1.5 }}
                />
                <CircleMarker
                  center={[selected.lat, selected.lng]}
                  radius={8}
                  pathOptions={{ fillColor: SEVERITY_COLORS[selected.severity_rank], fillOpacity: 0.9, color: '#fff', weight: 2 }}
                />
              </MapContainer>
              <div className="hs-mini-overlay" />
              <div className="hs-mini-label">{selected.hotspot_label}</div>
            </div>

            {/* Metrics */}
            <div className="hs-detail-content">
              <div className="hs-detail-header">
                <div>
                  <h3>{selected.hotspot_label}</h3>
                  <p style={{ marginTop: 4 }}>{selected.ward_name} Ward · {CITY.name}</p>
                </div>
                <span className={`badge badge-${selected.severity_rank}`}>{selected.severity_rank}</span>
              </div>

              <div className="hs-metrics">
                {[
                  { label: 'Mean LST',   val: `${selected.mean_lst}°C`,                       accent: true },
                  { label: 'Peak LST',   val: `${selected.max_lst}°C`,                        accent: false },
                  { label: 'HSI Score',  val: selected.z_score.toFixed(2),                    accent: false },
                  { label: 'Area',       val: `${(selected.area_sq_m/10000).toFixed(1)} ha`,  accent: false },
                  { label: 'Population', val: `${(selected.population_exposed/1000).toFixed(0)}K`, accent: false },
                  { label: 'Z-score',    val: `+${selected.z_score.toFixed(2)}σ`,              accent: false },
                ].map(m => (
                  <div key={m.label} className="hs-metric-box">
                    <div className="hs-metric-val mono" style={m.accent ? { color: 'var(--accent)' } : {}}>{m.val}</div>
                    <div className="hs-metric-lbl">{m.label}</div>
                  </div>
                ))}
              </div>

              <div className="hs-actions-list">
                <h4 className="label" style={{ marginBottom: 'var(--sp-4)' }}>Recommended Actions</h4>
                {[
                  { priority: 'Immediate',   text: 'Deploy cool roof coating programme on residential and commercial blocks' },
                  { priority: 'Short-term',  text: 'Plant native broadleaf trees along ward periphery targeting 20% canopy cover' },
                  { priority: 'Medium-term', text: 'Retrofit major thoroughfares with reflective permeable pavement' },
                ].map(a => (
                  <div key={a.priority} className="hs-action">
                    <span className="hs-action-priority">{a.priority}</span>
                    <span className="hs-action-text">{a.text}</span>
                  </div>
                ))}
              </div>

              <button
                className="btn btn-primary"
                onClick={() => navigate('/app/simulate', { state: { wardId: selected.ward_id } })}
              >
                Simulate Interventions <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
