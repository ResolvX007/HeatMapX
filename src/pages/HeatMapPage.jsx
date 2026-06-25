import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Popup } from 'react-leaflet';
import { X, ArrowRight, Layers } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import {
  CITY, WARDS_GEOJSON, HOTSPOTS, getHSIColor, getSeverityLabel, getWardDrivers
} from '../data/mockData';
import './HeatMapPage.css';

const LAYERS = [
  { id: 'hsi',  label: 'Heat Severity (HSI)' },
  { id: 'lst',  label: 'Land Surface Temp' },
  { id: 'ndvi', label: 'NDVI Vegetation' },
  { id: 'ndbi', label: 'NDBI Built-up' },
];

function getLayerColor(feature, layer) {
  const p = feature.properties;
  if (layer === 'hsi')  return getHSIColor(p.heat_severity_idx);
  if (layer === 'lst')  return getHSIColor((p.mean_lst - 34) / 5);
  if (layer === 'ndvi') return `hsl(${Math.round(p.ndvi_mean * 260)}, 65%, 45%)`;
  if (layer === 'ndbi') return getHSIColor(p.ndbi_mean * 3);
  return getHSIColor(p.heat_severity_idx);
}

function WardPanel({ ward, onClose, onSimulate }) {
  if (!ward) return null;
  const drivers = getWardDrivers(ward.id);
  const sev = getSeverityLabel(ward.heat_severity_idx);
  return (
    <div className="ward-panel">
      <div className="ward-panel-header">
        <div>
          <h3>{ward.ward_name}</h3>
          <span className="ward-code">{ward.ward_code} · {ward.area_sq_km} km²</span>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={onClose}><X size={15} strokeWidth={1.75} /></button>
      </div>

      <div className="ward-hsi-block">
        <span className="ward-hsi-num">{ward.heat_severity_idx.toFixed(2)}</span>
        <span className={`badge badge-${sev}`}>{sev}</span>
      </div>

      <div className="ward-metrics-grid">
        {[
          { val: `${ward.mean_lst}°C`, lbl: 'Mean LST' },
          { val: `${ward.max_lst}°C`, lbl: 'Peak LST' },
          { val: `${ward.uhi_magnitude > 0 ? '+' : ''}${ward.uhi_magnitude}°C`, lbl: 'UHI Delta' },
          { val: `${(ward.population/1000).toFixed(0)}K`, lbl: 'Population' },
        ].map(m => (
          <div key={m.lbl} className="ward-metric">
            <div className="ward-metric-val">{m.val}</div>
            <div className="ward-metric-lbl">{m.lbl}</div>
          </div>
        ))}
      </div>

      <div className="ward-section">
        <h4 className="ward-section-heading label">Top Heat Drivers</h4>
        <div>
          {drivers.slice(0, 4).map(d => (
            <div key={d.driver_name} className="driver-row">
              <span className="driver-row-name">{d.driver_name}</span>
              <div className="driver-row-bar-track">
                <div
                  className="driver-row-bar"
                  style={{
                    width: `${d.contribution_pct}%`,
                    background: d.direction === 'heating' ? 'var(--heat-high)' : 'var(--heat-low)',
                  }}
                />
              </div>
              <span className="driver-row-pct">{d.contribution_pct}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="ward-section">
        <h4 className="label" style={{ marginBottom: 'var(--sp-3)' }}>Land Cover</h4>
        <div style={{ display: 'flex', gap: 'var(--sp-4)' }}>
          <div style={{ textAlign: 'center' }}>
            <div className="ward-metric-val">{ward.impervious_pct}%</div>
            <div className="ward-metric-lbl">Impervious</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="ward-metric-val">{ward.vegetation_pct}%</div>
            <div className="ward-metric-lbl">Vegetation</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="ward-metric-val">{ward.ndvi_mean.toFixed(3)}</div>
            <div className="ward-metric-lbl">NDVI Mean</div>
          </div>
        </div>
      </div>

      <div className="ward-panel-action">
        <button className="btn btn-primary w-full" onClick={() => onSimulate(ward)}>
          Simulate Interventions <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}

export default function HeatMapPage() {
  const navigate = useNavigate();
  const [activeLayer, setActiveLayer] = useState('hsi');
  const [showHotspots, setShowHotspots] = useState(true);
  const [selectedWard, setSelectedWard] = useState(null);
  const [geoKey, setGeoKey] = useState(0);

  const wardStyle = (feature) => ({
    fillColor: getLayerColor(feature, activeLayer),
    fillOpacity: selectedWard?.id === feature.properties.id ? 0.88 : 0.68,
    weight: selectedWard?.id === feature.properties.id ? 2 : 0.8,
    color: selectedWard?.id === feature.properties.id
      ? 'rgba(255,255,255,0.9)'
      : 'rgba(255,255,255,0.2)',
    opacity: 1,
  });

  const onEachWard = (feature, layer) => {
    layer.on('click', () => setSelectedWard(feature.properties));
    layer.on('mouseover', e => {
      if (selectedWard?.id !== feature.properties.id)
        e.target.setStyle({ fillOpacity: 0.85, weight: 1.5, color: 'rgba(255,255,255,0.5)' });
    });
    layer.on('mouseout', e => {
      if (selectedWard?.id !== feature.properties.id)
        e.target.setStyle(wardStyle(feature));
    });
  };

  useEffect(() => { setGeoKey(k => k + 1); }, [activeLayer]);

  return (
    <div className="heatmap-page">
      {/* Top bar */}
      <div className="map-topbar">
        <div className="map-city-info">
          <span style={{ fontWeight: 600 }}>{CITY.name}</span>
          <span className="map-info-sep">·</span>
          <span className="map-stat-pill">
            Mean LST <strong>{CITY.mean_lst}°C</strong>
          </span>
          <span className="map-stat-pill">
            <strong>{CITY.hotspot_count}</strong> hotspots
          </span>
          <span className="map-stat-pill" style={{ color: 'var(--heat-critical)' }}>
            <strong>{CITY.critical_count}</strong> critical
          </span>
        </div>
        <div className="map-topbar-right">
          <span className="label">Landsat 8 · {new Date(CITY.snapshot_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
        </div>
      </div>

      {/* Leaflet map */}
      <MapContainer
        center={[CITY.center_lat, CITY.center_lng]}
        zoom={12}
        className="leaflet-map"
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          maxZoom={18}
        />
        <GeoJSON key={geoKey} data={WARDS_GEOJSON} style={wardStyle} onEachFeature={onEachWard} />
        {showHotspots && HOTSPOTS.map(hs => (
          <CircleMarker
            key={hs.id}
            center={[hs.lat, hs.lng]}
            radius={hs.severity_rank === 'critical' ? 10 : 7}
            pathOptions={{
              fillColor: hs.severity_rank === 'critical' ? '#C0392B'
                : hs.severity_rank === 'high' ? '#D4622A' : '#C9961A',
              fillOpacity: 0.25,
              color: hs.severity_rank === 'critical' ? '#C0392B'
                : hs.severity_rank === 'high' ? '#D4622A' : '#C9961A',
              weight: 1.5,
            }}
          >
            <Popup>
              <strong>{hs.hotspot_label}</strong><br />
              {hs.ward_name} · {hs.mean_lst}°C
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      {/* Layer controls */}
      <div className="map-controls">
        <div className="map-ctrl-panel">
          <div className="map-ctrl-label">Layers</div>
          {LAYERS.map(l => (
            <button
              key={l.id}
              className={`layer-btn ${activeLayer === l.id ? 'active' : ''}`}
              onClick={() => setActiveLayer(l.id)}
            >
              <div className={`layer-check ${activeLayer === l.id ? 'checked' : ''}`}>
                {activeLayer === l.id && <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3L3 5L7 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </div>
              {l.label}
            </button>
          ))}
          <button
            className={`layer-btn ${showHotspots ? 'active' : ''}`}
            onClick={() => setShowHotspots(!showHotspots)}
          >
            <div className={`layer-check ${showHotspots ? 'checked' : ''}`}>
              {showHotspots && <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3L3 5L7 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </div>
            Hotspot Markers
          </button>
        </div>

        {/* Legend */}
        <div className="map-legend">
          <div className="legend-title label">Heat Severity Index</div>
          <div className="legend-scale">
            {[
              { color: '#4361EE', label: '< 0.5 — Cool' },
              { color: '#4CC9F0', label: '0.5 – 1.0' },
              { color: '#C9961A', label: '1.0 – 1.5 — Moderate' },
              { color: '#D4622A', label: '1.5 – 2.5 — High' },
              { color: '#C0392B', label: '> 2.5 — Critical' },
            ].map(l => (
              <div key={l.label} className="legend-item">
                <div className="legend-dot" style={{ background: l.color }} />
                <span>{l.label}</span>
              </div>
            ))}
          </div>
          <div className="legend-source">Source: Landsat 8 Collection 2</div>
        </div>
      </div>

      {/* Ward panel */}
      {selectedWard && (
        <WardPanel
          ward={selectedWard}
          onClose={() => setSelectedWard(null)}
          onSimulate={w => navigate('/app/simulate', { state: { wardId: w.id } })}
        />
      )}
    </div>
  );
}
