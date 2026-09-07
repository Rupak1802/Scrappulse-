import { useState } from 'react';
import { Map, MapPin, Zap, ChevronLeft, Search, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';

const ZONES = [
  { id: 'z1', name: 'MIDC Industrial Area', material: 'Copper & PCBs', expectedWeight: '200-500kg', expectedPrice: '₹68-72', distance: 3.2, score: 95, topPick: true },
  { id: 'z2', name: 'Andheri East Commercial', material: 'Mixed E-Waste', expectedWeight: '50-100kg', expectedPrice: '₹45-50', distance: 1.5, score: 72, topPick: false },
  { id: 'z3', name: 'Powai Residential', material: 'Home Appliances', expectedWeight: '100-150kg', expectedPrice: '₹25-30', distance: 4.8, score: 65, topPick: false },
  { id: 'z4', name: 'SEEPZ Tech Park', material: 'Servers & Cables', expectedWeight: '500kg+', expectedPrice: '₹80-85', distance: 6.1, score: 88, topPick: false },
];

export default function OpportunityMap() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');

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
        {/* Stylized Map View */}
        <div className="h-48 w-full bg-neutral-200 rounded-xl border border-border relative overflow-hidden flex items-center justify-center shadow-inner">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-scales.png")' }}></div>
          
          <div className="absolute top-[20%] left-[30%] group">
            <div className="w-4 h-4 bg-teal rounded-full shadow-[0_0_15px_rgba(0,137,123,0.8)] animate-pulse" />
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm opacity-0 group-hover:opacity-100">MIDC</div>
          </div>

          <div className="absolute bottom-[30%] right-[20%] group">
            <div className="w-6 h-6 bg-amber-500 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.8)] border-2 border-white flex items-center justify-center">
               <Zap className="w-3 h-3 text-white fill-white" />
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm opacity-100">SEEPZ</div>
          </div>
          
          <div className="absolute bottom-[20%] left-[40%] w-3 h-3 bg-neutral-500 rounded-full border border-white" />

          {/* User Location */}
          <div className="absolute top-[50%] left-[50%] flex flex-col items-center z-10">
            <MapPin className="w-6 h-6 text-blue-600 fill-blue-600" />
            <div className="w-12 h-12 bg-blue-500/20 rounded-full absolute -top-3 animate-ping" />
          </div>
        </div>

        {/* Zone Cards */}
        <div className="space-y-3">
          <h2 className="font-bold text-neutral-900 px-1 text-sm flex items-center justify-between">
            Top Zones Nearby <span className="text-xs text-teal font-semibold">Live Data</span>
          </h2>
          
          {ZONES.map(zone => (
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
                      <RadialBar background clockWise dataKey="value" cornerRadius={10} />
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
                <button className="flex items-center gap-1.5 text-xs font-bold bg-navy hover:bg-navy/90 text-white px-3 py-1.5 rounded-lg shadow-sm transition-colors active:scale-95">
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