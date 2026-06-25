// ============================================================
// ResolvX — Mock Data Layer
// Mirrors the real API shape exactly. Swap with real API calls
// by changing the data source in each hook/component.
// City: Thiruvananthapuram (8.5241°N, 76.9366°E)
// ============================================================

export const CITY = {
  id: 'city-tvpm-001',
  name: 'Thiruvananthapuram',
  state: 'Kerala',
  country: 'India',
  center_lat: 8.5241,
  center_lng: 76.9366,
  mean_lst: 37.4,
  hotspot_count: 8,
  critical_count: 3,
  vegetation_pct: 41,
  snapshot_date: '2024-06-12T05:30:00Z',
  source: 'Landsat 8 Collection 2',
  cloud_cover_pct: 4.2,
};

// ---- Ward data: 20 wards around Thiruvananthapuram ----
// Boundaries are approximated polygons around real ward centroids
function makeWardPolygon(lat, lng, size = 0.018) {
  const s = size;
  return [
    [lng - s, lat - s * 0.7],
    [lng + s, lat - s * 0.7],
    [lng + s, lat + s * 0.7],
    [lng - s, lat + s * 0.7],
    [lng - s, lat - s * 0.7],
  ];
}

export const WARDS = [
  { id: 'w01', ward_code: 'W01', ward_name: 'Pattom',            lat: 8.5241, lng: 76.9366, mean_lst: 38.7, max_lst: 41.2, heat_severity_idx: 2.84, uhi_magnitude: 1.3, population: 124000, area_sq_km: 12.4, ndvi_mean: 0.18, ndbi_mean: 0.42, impervious_pct: 74, vegetation_pct: 14, building_density: 0.82 },
  { id: 'w02', ward_code: 'W02', ward_name: 'Kowdiar',           lat: 8.5320, lng: 76.9410, mean_lst: 37.9, max_lst: 40.1, heat_severity_idx: 2.41, uhi_magnitude: 0.5, population: 98000,  area_sq_km: 9.8,  ndvi_mean: 0.22, ndbi_mean: 0.38, impervious_pct: 68, vegetation_pct: 19, building_density: 0.74 },
  { id: 'w03', ward_code: 'W03', ward_name: 'Vazhuthacaud',      lat: 8.5100, lng: 76.9500, mean_lst: 37.4, max_lst: 39.6, heat_severity_idx: 2.18, uhi_magnitude: 0.0, population: 87500,  area_sq_km: 8.2,  ndvi_mean: 0.25, ndbi_mean: 0.34, impervious_pct: 61, vegetation_pct: 24, building_density: 0.67 },
  { id: 'w04', ward_code: 'W04', ward_name: 'Thampanoor',        lat: 8.4875, lng: 76.9525, mean_lst: 39.1, max_lst: 42.3, heat_severity_idx: 2.97, uhi_magnitude: 1.7, population: 142000, area_sq_km: 6.1,  ndvi_mean: 0.09, ndbi_mean: 0.58, impervious_pct: 88, vegetation_pct: 6,  building_density: 0.95 },
  { id: 'w05', ward_code: 'W05', ward_name: 'Palayam',           lat: 8.5010, lng: 76.9580, mean_lst: 38.4, max_lst: 40.8, heat_severity_idx: 2.62, uhi_magnitude: 1.0, population: 118000, area_sq_km: 7.3,  ndvi_mean: 0.14, ndbi_mean: 0.49, impervious_pct: 79, vegetation_pct: 10, building_density: 0.88 },
  { id: 'w06', ward_code: 'W06', ward_name: 'Kazhakootam',       lat: 8.5750, lng: 76.8900, mean_lst: 36.8, max_lst: 38.9, heat_severity_idx: 1.74, uhi_magnitude: -0.6, population: 76000, area_sq_km: 18.5, ndvi_mean: 0.35, ndbi_mean: 0.28, impervious_pct: 48, vegetation_pct: 38, building_density: 0.51 },
  { id: 'w07', ward_code: 'W07', ward_name: 'Nemom',             lat: 8.4600, lng: 76.9450, mean_lst: 36.2, max_lst: 38.1, heat_severity_idx: 1.32, uhi_magnitude: -1.2, population: 62000, area_sq_km: 22.1, ndvi_mean: 0.44, ndbi_mean: 0.19, impervious_pct: 35, vegetation_pct: 52, building_density: 0.38 },
  { id: 'w08', ward_code: 'W08', ward_name: 'Vattiyoorkavu',     lat: 8.5550, lng: 76.9200, mean_lst: 37.1, max_lst: 39.4, heat_severity_idx: 1.98, uhi_magnitude: -0.3, population: 89000, area_sq_km: 14.8, ndvi_mean: 0.28, ndbi_mean: 0.33, impervious_pct: 55, vegetation_pct: 31, building_density: 0.60 },
  { id: 'w09', ward_code: 'W09', ward_name: 'Ulloor',            lat: 8.5180, lng: 76.9150, mean_lst: 37.8, max_lst: 40.0, heat_severity_idx: 2.29, uhi_magnitude: 0.4, population: 104000, area_sq_km: 10.2, ndvi_mean: 0.21, ndbi_mean: 0.40, impervious_pct: 66, vegetation_pct: 21, building_density: 0.71 },
  { id: 'w10', ward_code: 'W10', ward_name: 'Thirumala',         lat: 8.5400, lng: 76.9600, mean_lst: 36.5, max_lst: 38.4, heat_severity_idx: 1.51, uhi_magnitude: -0.9, population: 54000, area_sq_km: 16.4, ndvi_mean: 0.40, ndbi_mean: 0.23, impervious_pct: 42, vegetation_pct: 46, building_density: 0.44 },
  { id: 'w11', ward_code: 'W11', ward_name: 'Poojappura',        lat: 8.5050, lng: 76.9650, mean_lst: 38.1, max_lst: 40.3, heat_severity_idx: 2.44, uhi_magnitude: 0.7, population: 96000, area_sq_km: 8.9,  ndvi_mean: 0.17, ndbi_mean: 0.45, impervious_pct: 71, vegetation_pct: 16, building_density: 0.79 },
  { id: 'w12', ward_code: 'W12', ward_name: 'Sreekaryam',        lat: 8.5620, lng: 76.9000, mean_lst: 35.9, max_lst: 37.6, heat_severity_idx: 1.12, uhi_magnitude: -1.5, population: 47000, area_sq_km: 25.3, ndvi_mean: 0.51, ndbi_mean: 0.15, impervious_pct: 28, vegetation_pct: 61, building_density: 0.29 },
  { id: 'w13', ward_code: 'W13', ward_name: 'Fort',              lat: 8.4710, lng: 76.9480, mean_lst: 39.4, max_lst: 42.8, heat_severity_idx: 3.12, uhi_magnitude: 2.0, population: 156000, area_sq_km: 5.2,  ndvi_mean: 0.07, ndbi_mean: 0.62, impervious_pct: 91, vegetation_pct: 4,  building_density: 0.98 },
  { id: 'w14', ward_code: 'W14', ward_name: 'Kamaleswaram',      lat: 8.5300, lng: 76.9700, mean_lst: 37.3, max_lst: 39.1, heat_severity_idx: 2.05, uhi_magnitude: -0.1, population: 82000, area_sq_km: 11.6, ndvi_mean: 0.26, ndbi_mean: 0.36, impervious_pct: 58, vegetation_pct: 28, building_density: 0.63 },
  { id: 'w15', ward_code: 'W15', ward_name: 'Pangode',           lat: 8.4800, lng: 76.9300, mean_lst: 36.0, max_lst: 37.8, heat_severity_idx: 1.18, uhi_magnitude: -1.4, population: 51000, area_sq_km: 19.7, ndvi_mean: 0.47, ndbi_mean: 0.17, impervious_pct: 32, vegetation_pct: 55, building_density: 0.35 },
  { id: 'w16', ward_code: 'W16', ward_name: 'Enchakkal',         lat: 8.4950, lng: 76.9100, mean_lst: 35.4, max_lst: 37.1, heat_severity_idx: 0.87, uhi_magnitude: -2.0, population: 38000, area_sq_km: 28.4, ndvi_mean: 0.58, ndbi_mean: 0.11, impervious_pct: 22, vegetation_pct: 68, building_density: 0.22 },
  { id: 'w17', ward_code: 'W17', ward_name: 'Medical College',   lat: 8.5130, lng: 76.9450, mean_lst: 37.6, max_lst: 39.8, heat_severity_idx: 2.21, uhi_magnitude: 0.2, population: 91000, area_sq_km: 9.4,  ndvi_mean: 0.23, ndbi_mean: 0.39, impervious_pct: 63, vegetation_pct: 23, building_density: 0.69 },
  { id: 'w18', ward_code: 'W18', ward_name: 'East Fort',         lat: 8.4830, lng: 76.9560, mean_lst: 38.8, max_lst: 41.4, heat_severity_idx: 2.71, uhi_magnitude: 1.4, population: 132000, area_sq_km: 6.8, ndvi_mean: 0.11, ndbi_mean: 0.53, impervious_pct: 83, vegetation_pct: 9,  building_density: 0.91 },
  { id: 'w19', ward_code: 'W19', ward_name: 'Ambalamukku',       lat: 8.5430, lng: 76.9280, mean_lst: 36.7, max_lst: 38.6, heat_severity_idx: 1.63, uhi_magnitude: -0.7, population: 67000, area_sq_km: 15.1, ndvi_mean: 0.37, ndbi_mean: 0.25, impervious_pct: 45, vegetation_pct: 43, building_density: 0.48 },
  { id: 'w20', ward_code: 'W20', ward_name: 'Vizhinjam',         lat: 8.3920, lng: 76.9780, mean_lst: 34.8, max_lst: 36.2, heat_severity_idx: 0.54, uhi_magnitude: -2.6, population: 29000, area_sq_km: 31.2, ndvi_mean: 0.62, ndbi_mean: 0.08, impervious_pct: 18, vegetation_pct: 74, building_density: 0.18 },
];

// GeoJSON FeatureCollection for Leaflet
export const WARDS_GEOJSON = {
  type: 'FeatureCollection',
  features: WARDS.map(w => ({
    type: 'Feature',
    properties: { ...w },
    geometry: {
      type: 'Polygon',
      coordinates: [makeWardPolygon(w.lat, w.lng, 0.014 + Math.random() * 0.006)],
    },
  })),
};

// ---- Hotspots ----
export const HOTSPOTS = [
  { id: 'hs01', ward_id: 'w13', ward_name: 'Fort',         severity_rank: 'critical', mean_lst: 39.4, max_lst: 42.8, area_sq_m: 1840000, z_score: 3.21, lat: 8.471,  lng: 76.948, hotspot_label: 'Dense Commercial Core',       population_exposed: 156000 },
  { id: 'hs02', ward_id: 'w04', ward_name: 'Thampanoor',   severity_rank: 'critical', mean_lst: 39.1, max_lst: 42.3, area_sq_m: 1240000, z_score: 3.01, lat: 8.4875, lng: 76.953, hotspot_label: 'Railway Station Cluster',       population_exposed: 142000 },
  { id: 'hs03', ward_id: 'w01', ward_name: 'Pattom',       severity_rank: 'critical', mean_lst: 38.7, max_lst: 41.2, area_sq_m: 980000,  z_score: 2.84, lat: 8.524,  lng: 76.937, hotspot_label: 'Govt. Complex Zone',            population_exposed: 124000 },
  { id: 'hs04', ward_id: 'w18', ward_name: 'East Fort',    severity_rank: 'high',     mean_lst: 38.8, max_lst: 41.4, area_sq_m: 860000,  z_score: 2.71, lat: 8.483,  lng: 76.956, hotspot_label: 'Industrial Mixed Zone',         population_exposed: 132000 },
  { id: 'hs05', ward_id: 'w05', ward_name: 'Palayam',      severity_rank: 'high',     mean_lst: 38.4, max_lst: 40.8, area_sq_m: 720000,  z_score: 2.62, lat: 8.501,  lng: 76.958, hotspot_label: 'Central Market District',       population_exposed: 118000 },
  { id: 'hs06', ward_id: 'w02', ward_name: 'Kowdiar',      severity_rank: 'high',     mean_lst: 37.9, max_lst: 40.1, area_sq_m: 640000,  z_score: 2.41, lat: 8.532,  lng: 76.941, hotspot_label: 'Residential High-Rise Cluster', population_exposed: 98000  },
  { id: 'hs07', ward_id: 'w11', ward_name: 'Poojappura',   severity_rank: 'high',     mean_lst: 38.1, max_lst: 40.3, area_sq_m: 580000,  z_score: 2.44, lat: 8.505,  lng: 76.965, hotspot_label: 'Dense Residential B',          population_exposed: 96000  },
  { id: 'hs08', ward_id: 'w03', ward_name: 'Vazhuthacaud', severity_rank: 'moderate', mean_lst: 37.4, max_lst: 39.6, area_sq_m: 420000,  z_score: 2.18, lat: 8.510,  lng: 76.950, hotspot_label: 'Office Corridor',              population_exposed: 87500  },
];

// ---- Ward drivers (SHAP values per ward) ----
const BASE_DRIVERS = {
  w01: [ // Pattom
    { driver_name: 'NDVI Deficit',       shap_value: 0.034, contribution_pct: 34, direction: 'heating' },
    { driver_name: 'Impervious Surface', shap_value: 0.028, contribution_pct: 28, direction: 'heating' },
    { driver_name: 'Building Density',   shap_value: 0.019, contribution_pct: 19, direction: 'heating' },
    { driver_name: 'Low Albedo',         shap_value: 0.012, contribution_pct: 12, direction: 'heating' },
    { driver_name: 'Wind Speed',         shap_value: -0.007, contribution_pct: 7, direction: 'cooling' },
  ],
  w04: [ // Thampanoor
    { driver_name: 'Impervious Surface', shap_value: 0.041, contribution_pct: 41, direction: 'heating' },
    { driver_name: 'Building Density',   shap_value: 0.029, contribution_pct: 29, direction: 'heating' },
    { driver_name: 'NDVI Deficit',       shap_value: 0.018, contribution_pct: 18, direction: 'heating' },
    { driver_name: 'Anthropogenic Heat', shap_value: 0.008, contribution_pct: 8,  direction: 'heating' },
    { driver_name: 'NDWI (Water)',       shap_value: -0.004, contribution_pct: 4, direction: 'cooling' },
  ],
  w13: [ // Fort
    { driver_name: 'Impervious Surface', shap_value: 0.045, contribution_pct: 45, direction: 'heating' },
    { driver_name: 'NDVI Deficit',       shap_value: 0.024, contribution_pct: 24, direction: 'heating' },
    { driver_name: 'Building Density',   shap_value: 0.017, contribution_pct: 17, direction: 'heating' },
    { driver_name: 'Low Albedo',         shap_value: 0.009, contribution_pct: 9,  direction: 'heating' },
    { driver_name: 'Wind Speed',         shap_value: -0.005, contribution_pct: 5, direction: 'cooling' },
  ],
  default: [
    { driver_name: 'NDVI Deficit',       shap_value: 0.029, contribution_pct: 29, direction: 'heating' },
    { driver_name: 'Impervious Surface', shap_value: 0.024, contribution_pct: 24, direction: 'heating' },
    { driver_name: 'Building Density',   shap_value: 0.021, contribution_pct: 21, direction: 'heating' },
    { driver_name: 'Low Albedo',         shap_value: 0.014, contribution_pct: 14, direction: 'heating' },
    { driver_name: 'NDWI (Water)',       shap_value: -0.007, contribution_pct: 7, direction: 'cooling' },
    { driver_name: 'Wind Speed',         shap_value: -0.005, contribution_pct: 5, direction: 'cooling' },
  ],
};

export function getWardDrivers(wardId) {
  return BASE_DRIVERS[wardId] || BASE_DRIVERS.default;
}

// City-level mean SHAP importances (for bar chart)
export const CITY_DRIVERS = [
  { driver_name: 'NDVI Deficit',         mean_shap: 0.031, direction: 'heating' },
  { driver_name: 'Impervious Surface',   mean_shap: 0.028, direction: 'heating' },
  { driver_name: 'Building Density',     mean_shap: 0.022, direction: 'heating' },
  { driver_name: 'Low Albedo',           mean_shap: 0.014, direction: 'heating' },
  { driver_name: 'Anthropogenic Heat',   mean_shap: 0.009, direction: 'heating' },
  { driver_name: 'Solar Radiation',      mean_shap: 0.008, direction: 'heating' },
  { driver_name: 'Building Height',      mean_shap: 0.006, direction: 'heating' },
  { driver_name: 'NDWI (Water Bodies)',  mean_shap: -0.008, direction: 'cooling' },
  { driver_name: 'Wind Speed',           mean_shap: -0.011, direction: 'cooling' },
  { driver_name: 'Humidity',             mean_shap: -0.006, direction: 'cooling' },
];

// NDVI vs LST scatter data (all wards)
export const NDVI_LST_SCATTER = WARDS.map(w => ({
  ward_name: w.ward_name,
  ndvi: w.ndvi_mean,
  lst: w.mean_lst,
  hsi: w.heat_severity_idx,
}));

// ---- Intervention simulation ----
export function simulateIntervention({ wardId, treeCoverage, coolRoofCoverage, waterAreaSqM }) {
  const ward = WARDS.find(w => w.id === wardId) || WARDS[0];
  const baselineLst = ward.mean_lst;

  // Tree planting: -0.25°C per % NDVI coverage increase
  const treeDelta = treeCoverage > 0
    ? -(treeCoverage * 0.25 * 1.2 * 0.7)  // tropical modifier, area factor
    : 0;

  // Cool roof: radiative cooling
  const albedoIncrease = 0.3;
  const solarRad = 620; // W/m² typical tropical
  const coolRoofDelta = coolRoofCoverage > 0
    ? -((coolRoofCoverage / 100) * albedoIncrease * solarRad * 0.018)
    : 0;

  // Water feature: evaporative cooling
  const wardAreaM2 = ward.area_sq_km * 1_000_000;
  const waterDelta = waterAreaSqM > 0
    ? -(Math.min(waterAreaSqM / wardAreaM2, 0.3) * (1 - 0.72) * 4.2)
    : 0;

  // Stacking with diminishing returns
  const deltas = [treeDelta, coolRoofDelta, waterDelta]
    .filter(d => d !== 0)
    .sort((a, b) => Math.abs(b) - Math.abs(a));

  let combined = 0;
  deltas.forEach((d, i) => { combined += d * Math.pow(0.85, i); });

  const simulatedLst = Math.max(baselineLst + combined, 30);
  const deltaT = simulatedLst - baselineLst;

  // Cost estimates (INR Lakh)
  const treeCost = treeCoverage > 0 ? (ward.area_sq_km * treeCoverage * 0.01 * 3500 * 0.001) : 0;
  const coolRoofCost = coolRoofCoverage > 0 ? (ward.area_sq_km * 1e6 * 0.4 * (coolRoofCoverage / 100) * 225 / 1e5) : 0;
  const waterCost = waterAreaSqM > 0 ? (waterAreaSqM * 0.0025) : 0;
  const totalCost = treeCost + coolRoofCost + waterCost;

  const confidence = 78 - (deltas.length > 1 ? 5 : 0);

  return {
    baseline_lst: parseFloat(baselineLst.toFixed(1)),
    simulated_lst: parseFloat(simulatedLst.toFixed(1)),
    delta_t: parseFloat(deltaT.toFixed(1)),
    confidence_pct: confidence,
    cost_estimate_lakh: parseFloat(totalCost.toFixed(1)),
    cost_per_degree: deltaT !== 0 ? parseFloat((totalCost / Math.abs(deltaT)).toFixed(1)) : 0,
    breakdown: [
      { type: 'Tree Planting',    delta_t: parseFloat(treeDelta.toFixed(2)),     cost_lakh: parseFloat(treeCost.toFixed(1)) },
      { type: 'Cool Roofs',       delta_t: parseFloat(coolRoofDelta.toFixed(2)), cost_lakh: parseFloat(coolRoofCost.toFixed(1)) },
      { type: 'Water Feature',    delta_t: parseFloat(waterDelta.toFixed(2)),    cost_lakh: parseFloat(waterCost.toFixed(1)) },
    ].filter(b => b.delta_t !== 0 || b.cost_lakh !== 0),
  };
}

// Historical LST trend (30-day sparkline)
export const HISTORICAL_LST = [
  { date: 'May 13', lst: 36.2 }, { date: 'May 17', lst: 36.8 },
  { date: 'May 21', lst: 37.1 }, { date: 'May 25', lst: 37.4 },
  { date: 'May 29', lst: 37.9 }, { date: 'Jun 02', lst: 38.1 },
  { date: 'Jun 06', lst: 37.7 }, { date: 'Jun 10', lst: 37.4 },
  { date: 'Jun 12', lst: 37.4 },
];

export const SEVERITY_COLORS = {
  critical: '#FF3B3B',
  high:     '#FF6B35',
  moderate: '#FFCA3A',
  low:      '#6BCB77',
};

export function getHSIColor(hsi) {
  // Vibrant Folium/Jet style colormap
  if (hsi < 0.5) return '#0000AA'; // Deep Blue
  if (hsi < 1.0) return '#00AFFF'; // Cyan
  if (hsi < 1.5) return '#00FF00'; // Green
  if (hsi < 2.0) return '#FFFF00'; // Yellow
  if (hsi < 2.5) return '#FF5500'; // Orange
  if (hsi < 3.0) return '#FF0000'; // Red
  return '#AA0000'; // Dark Red
}

export function getSeverityLabel(hsi) {
  if (hsi >= 2.5) return 'critical';
  if (hsi >= 1.5) return 'high';
  if (hsi >= 0.8) return 'moderate';
  return 'low';
}
