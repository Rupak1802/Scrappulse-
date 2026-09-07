import { useState, useEffect } from 'react';
import { Map, MapPin, Zap, ChevronLeft, Search, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ZONES = [
  { id: 'z1', name: 'MIDC Industrial Area', material: 'Copper & PCBs', expectedWeight: '200-500kg', expectedPrice: '₹68-72', distance: 3.2, score: 95, topPick: true, lat: 19.125, lng: 72.875 },
  { id: 'z2', name: 'Andheri East Commercial', material: 'Aluminium & Mixed E-Waste', expectedWeight: '50-100kg', expectedPrice: '₹45-50', distance: 1.5, score: 72, topPick: false, lat: 19.113, lng: 72.869 },
  { id: 'z3', name: 'Powai Residential', material: 'Home Appliances & Batteries', expectedWeight: '100-150kg', expectedPrice: '₹25-30', distance: 4.8, score: 65, topPick: false, lat: 19.119, lng: 72.906 },
  { id: 'z4', name: 'SEEPZ Tech Park', material: 'Servers & Cables', expectedWeight: '500kg+', expectedPrice: '₹80-85', distance: 6.1, score: 88, topPick: false, lat: 19.123, lng: 72.880 },
];

function MapUpdater({ zones }: { zones: typeof ZONES }) {
  const map = useMap();
  
  useEffect(() => {
    if (zones.length > 0) {
      if (zones.length === 1) {
        map.flyTo([zones[0].lat, zones[0].lng], 14, { animate: true });
      } else {
        const bounds = L.latLngBounds(zones.map(z => [z.lat, z.lng]));
        map.fitBounds(bounds, { padding: [20, 20], animate: true });
      }
    }
  }, [zones, map]);

  return null;
}

export default function OpportunityMap() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');

  const filteredZones = filter === 'All' 
    ? ZONES 
    : ZONES.filter(z => z.material.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="flex flex-col h-full bg-neutral-50 relative pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b border-border sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-neutral-500 hover:text-neutral-900">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="font-semibold text-neutral-900 flex items-center gap-2">
            <Map className="w-5 h-5 text-teal" /> Opportunity Map
          </h1>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {['All', 'Copper', 'PCBs', 'Batteries', 'Aluminium', 'Cables'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors border",
                filter === f ? "bg-navy text-white border-navy" : "bg-neutral-100 text-neutral-600 border-transparent hover:bg-neutral-200"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Realistic Map View */}
        <div className="h-48 w-full bg-neutral-200 rounded-xl border border-border relative overflow-hidden flex items-center justify-center shadow-inner z-10">
          <MapContainer center={[19.120, 72.870]} zoom={13} style={{ height: '100%', width: '100%' }} zoomControl={false}>
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapUpdater zones={filteredZones} />
            {filteredZones.map(zone => (
              <Marker key={zone.id} position={[zone.lat, zone.lng]}>
                <Popup>
                  <div className="font-bold text-neutral-900">{zone.name}</div>
                  <div className="text-xs text-teal font-medium">{zone.material}</div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Zone Cards */}
        <div className="space-y-3">
          <h2 className="font-bold text-neutral-900 px-1 text-sm flex items-center justify-between">
            Top Zones Nearby <span className="text-xs text-teal font-semibold">Live Data</span>
          </h2>
          
          {filteredZones.map(zone => (
            <div key={zone.id} className={cn(
              "bg-white rounded-xl border p-4 shadow-sm relative overflow-hidden transition-all",
              zone.topPick ? "border-amber-200 ring-1 ring-amber-200 bg-amber-50/10" : "border-border"
            )}>
              {zone.topPick && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1 shadow-sm">
                  <Zap className="w-3 h-3 fill-white" /> HOT ZONE
                </div>
              )}
              
              <div className="flex justify-between items-start mb-3">
                <div className={zone.topPick ? "pr-24" : ""}>
                  <h3 className="font-bold text-neutral-900">{zone.name}</h3>
                  <p className="text-xs text-neutral-500 font-medium">{zone.material}</p>
                </div>
                <div className="w-10 h-10 relative shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" barSize={4} data={[{value: zone.score, fill: zone.score > 80 ? '#F59E0B' : '#00897B'}]} startAngle={180} endAngle={-180}>
                      <RadialBar background dataKey="value" cornerRadius={10} />
                    </RadialBarChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center font-bold text-[10px]">{zone.score}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3 bg-neutral-50 p-2 rounded-lg border border-neutral-100">
                <div>
                  <p className="text-[10px] font-bold text-neutral-500 uppercase">Est. Supply</p>
                  <p className="text-sm font-bold text-neutral-900">{zone.expectedWeight}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-neutral-500 uppercase">Est. Rate</p>
                  <p className="text-sm font-bold text-teal">{zone.expectedPrice}<span className="text-[10px] text-neutral-400">/kg</span></p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-neutral-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {zone.distance} km away
                </p>
                <button 
                  onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${zone.lat},${zone.lng}`, '_blank')}
                  className="flex items-center gap-1.5 text-xs font-bold bg-navy hover:bg-navy/90 text-white px-3 py-1.5 rounded-lg shadow-sm transition-colors active:scale-95"
                >
                  <Navigation className="w-3.5 h-3.5" /> Navigate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}