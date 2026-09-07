import { useState } from 'react';
import { Activity, AlertTriangle, ShieldCheck, Truck, Zap, Map as MapIcon, ChevronRight, Download } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';

const forecastData = [
  { day: 'Mon', amount: 120 }, { day: 'Tue', amount: 150 }, { day: 'Wed', amount: 180 },
  { day: 'Thu', amount: 140 }, { day: 'Fri', amount: 220 }, { day: 'Sat', amount: 280 }, { day: 'Sun', amount: 250 }
];

export default function SupplyRadar() {
  const [selectedZone, setSelectedZone] = useState<string | null>('MIDC');

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Supply Radar</h1>
          <p className="text-neutral-500">Live E-Waste Weather & Forecasting</p>
        </div>
        <div className="flex gap-2 bg-neutral-100 p-1 rounded-lg">
          {['All Materials', 'Copper', 'PCBs', 'Aluminium'].map(m => (
            <button key={m} className={cn("px-4 py-1.5 text-sm font-semibold rounded-md transition-colors", m === 'All Materials' ? 'bg-white shadow-sm' : 'text-neutral-500 hover:text-neutral-900')}>
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-4">
        <KPICard icon={<Zap className="text-amber-500" />} title="Active Pulses" value="12" trend="+3 vs yesterday" trendUp={true} />
        <KPICard icon={<Activity className="text-blue-500" />} title="7-Day Predict" value="4.2 Tons" trend="+15% vs last week" trendUp={true} />
        <KPICard icon={<ShieldCheck className="text-teal" />} title="Avg Reliability" value="94%" trend="Stable" trendUp={true} />
        <KPICard icon={<AlertTriangle className="text-red-500" />} title="Open Anomalies" value="5" trend="-2 resolved today" trendUp={true} />
      </div>

      <div className="flex gap-6 h-[400px]">
        {/* Map Area */}
        <div className="flex-1 bg-white border border-border rounded-xl shadow-sm overflow-hidden flex flex-col relative">
          <div className="p-4 border-b border-border bg-neutral-50 flex items-center justify-between">
            <h3 className="font-bold text-neutral-900 flex items-center gap-2"><MapIcon className="w-4 h-4 text-teal" /> Zone Heatmap</h3>
          </div>
          <div className="flex-1 relative bg-neutral-100 flex items-center justify-center p-8">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>
            <div className="grid grid-cols-2 gap-4 w-full h-full relative z-10">
              <ZoneBox name="Andheri East" intensity="high" onClick={() => setSelectedZone('Andheri East')} selected={selectedZone === 'Andheri East'} />
              <ZoneBox name="Powai" intensity="low" onClick={() => setSelectedZone('Powai')} selected={selectedZone === 'Powai'} />
              <ZoneBox name="MIDC" intensity="extreme" onClick={() => setSelectedZone('MIDC')} selected={selectedZone === 'MIDC'} />
              <ZoneBox name="SEEPZ" intensity="medium" onClick={() => setSelectedZone('SEEPZ')} selected={selectedZone === 'SEEPZ'} />
            </div>
          </div>
        </div>

        {/* Side Panel */}
        {selectedZone && (
          <div className="w-96 bg-white border border-border rounded-xl shadow-sm flex flex-col overflow-hidden animate-in slide-in-from-right-4">
            <div className="p-4 border-b border-border bg-navy text-white">
              <h3 className="font-bold text-lg">{selectedZone} <span className="text-teal text-sm font-medium ml-2">Forecast</span></h3>
            </div>
            <div className="p-4 flex-1 overflow-y-auto">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <p className="text-xs text-neutral-500 font-bold uppercase tracking-wider">Est. Next 7 Days</p>
                  <p className="text-2xl font-black text-neutral-900">840 <span className="text-sm text-neutral-400 font-bold">kg</span></p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-neutral-500 font-bold uppercase tracking-wider">AI Confidence</p>
                  <p className="text-lg font-bold text-green-600">92%</p>
                </div>
              </div>

              <div className="h-40 w-full mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={forecastData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorFcast" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00897B" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#00897B" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                    <CartesianGrid vertical={false} stroke="#e5e5e5" strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="amount" stroke="#00897B" strokeWidth={3} fillOpacity={1} fill="url(#colorFcast)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6">
                <p className="text-sm text-amber-900 font-medium">
                  <strong className="block mb-1 text-amber-950">Capacity Warning:</strong>
                  Expected supply exceeds usual collection capacity by 15%.
                </p>
              </div>

              <Link to="/dashboard/fleet" className="w-full bg-teal hover:bg-teal/90 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                <Truck className="w-4 h-4" /> Dispatch Fleet Here
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Active Pulses Table */}
      <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between bg-neutral-50">
          <h3 className="font-bold text-neutral-900 flex items-center gap-2"><Zap className="w-4 h-4 text-amber-500" /> Active Pulses (Live)</h3>
          <button className="flex items-center gap-2 text-sm font-semibold text-teal hover:underline"><Download className="w-4 h-4" /> Export CSV</button>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wider text-neutral-500 bg-white">
              <th className="p-4 font-semibold">Locality</th>
              <th className="p-4 font-semibold">Material</th>
              <th className="p-4 font-semibold">Signal Strength</th>
              <th className="p-4 font-semibold">Est. Supply</th>
              <th className="p-4 font-semibold">Age</th>
              <th className="p-4 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {[
              { loc: 'MIDC Phase 2', mat: 'Copper Wire', str: 95, sup: '400kg', age: '15 mins' },
              { loc: 'Andheri East', mat: 'Mixed PCBs', str: 82, sup: '120kg', age: '1 hr' },
              { loc: 'Powai Plaza', mat: 'Aluminium', str: 65, sup: '80kg', age: '3 hrs' },
            ].map((p, i) => (
              <tr key={i} className="hover:bg-neutral-50/50">
                <td className="p-4 font-bold text-neutral-900">{p.loc}</td>
                <td className="p-4 text-sm text-neutral-600 font-medium">{p.mat}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-neutral-100 rounded-full overflow-hidden w-24">
                      <div className="h-full bg-amber-500" style={{ width: `${p.str}%` }} />
                    </div>
                    <span className="text-xs font-bold text-neutral-600">{p.str}%</span>
                  </div>
                </td>
                <td className="p-4 text-sm font-bold text-neutral-900">{p.sup}</td>
                <td className="p-4 text-sm text-neutral-500">{p.age}</td>
                <td className="p-4 text-right">
                  <button className="text-sm font-semibold text-teal hover:bg-teal/10 px-3 py-1.5 rounded transition-colors">Analyze</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function KPICard({ icon, title, value, trend, trendUp }: any) {
  return (
    <div className="bg-white p-5 rounded-xl border border-border shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-neutral-50 p-2 rounded-lg border border-neutral-100">{icon}</div>
        <span className="font-semibold text-neutral-600 text-sm">{title}</span>
      </div>
      <div className="mt-2">
        <span className="text-3xl font-black text-neutral-900 tracking-tight">{value}</span>
        <div className="mt-2 flex items-center gap-1.5">
          <span className={cn("text-xs font-bold px-1.5 py-0.5 rounded", trendUp ? "bg-green-50 text-green-700" : "bg-neutral-100 text-neutral-600")}>{trend}</span>
        </div>
      </div>
    </div>
  );
}

function ZoneBox({ name, intensity, selected, onClick }: any) {
  const bg = {
    high: 'bg-orange-500/80',
    low: 'bg-teal/40',
    extreme: 'bg-red-600/90',
    medium: 'bg-amber-400/80'
  }[intensity as string];

  return (
    <div 
      onClick={onClick}
      className={cn(
        "rounded-xl p-4 flex items-end cursor-pointer transition-all hover:scale-[1.02]", 
        bg,
        selected ? "ring-4 ring-navy shadow-xl scale-[1.02] z-10" : "shadow-md hover:shadow-lg"
      )}
    >
      <span className="font-bold text-white drop-shadow-md text-lg">{name}</span>
    </div>
  );
}
