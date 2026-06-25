import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const { BaseLayer, Overlay } = LayersControl;

const hotspots = [
  { id: 1, name: 'Downtown', lat: 28.6139, lng: 77.2090, temp: 46.8, risk: 'Extreme' },
  { id: 2, name: 'Northview', lat: 28.6300, lng: 77.2150, temp: 44.1, risk: 'High' },
  { id: 3, name: 'Eastwood', lat: 28.6100, lng: 77.2300, temp: 43.6, risk: 'High' },
  { id: 4, name: 'Westfield', lat: 28.6200, lng: 77.1800, temp: 47.2, risk: 'Extreme' },
  { id: 5, name: 'Southpark', lat: 28.5800, lng: 77.2000, temp: 41.0, risk: 'Moderate' },
];

const getRiskColor = (temp) => {
  if (temp > 45) return '#ef4444'; // Extreme
  if (temp > 43) return '#f97316'; // High
  return '#eab308'; // Moderate
};

const UrbanHeatMap = () => {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden border border-[var(--border-color)]">
      <MapContainer 
        center={[28.6139, 77.2090]} 
        zoom={12} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <LayersControl position="topright">
          <BaseLayer checked name="Dark Satellite">
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
          </BaseLayer>
          <BaseLayer name="Street Map">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>

          <Overlay checked name="Heat Hotspots">
            {hotspots.map((spot) => (
              <CircleMarker
                key={spot.id}
                center={[spot.lat, spot.lng]}
                radius={Math.max(10, spot.temp - 30)}
                fillColor={getRiskColor(spot.temp)}
                color={getRiskColor(spot.temp)}
                weight={2}
                opacity={0.8}
                fillOpacity={0.4}
              >
                <Popup className="custom-popup">
                  <div className="text-sm">
                    <h3 className="font-bold text-[var(--text-primary)] mb-1">{spot.name}</h3>
                    <p className="text-[var(--text-secondary)]">Surface Temp: <span className="text-[var(--heat-extreme)] font-bold">{spot.temp}°C</span></p>
                    <p className="text-[var(--text-secondary)]">Risk Level: <span className="text-white font-medium">{spot.risk}</span></p>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
};

export default UrbanHeatMap;
