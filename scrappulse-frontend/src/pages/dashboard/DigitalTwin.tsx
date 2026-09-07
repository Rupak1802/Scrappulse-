import { useState } from 'react';
import { Share2, Zap, Settings2, Play, Activity, AlertCircle, Database, Truck, Factory, RotateCcw } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const simData = [
  { day: 'Day 1', base: 100, scenario: 100 },
  { day: 'Day 2', base: 102, scenario: 98 },
  { day: 'Day 3', base: 105, scenario: 85 },
  { day: 'Day 4', base: 103, scenario: 70 },
  { day: 'Day 5', base: 108, scenario: 75 },
  { day: 'Day 6', base: 110, scenario: 60 },
  { day: 'Day 7', base: 115, scenario: 50 },
];

export default function DigitalTwin() {
  const [params, setParams] = useState({ fuel: 0, demand: 0, collectors: 0 });
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState(false);

  const handleSimulate = () => {
    setRunning(true);
    setResults(false);
    setTimeout(() => {
      setRunning(false);
      setResults(true);
    }, 1500);
  };

  const reset = () => {
    setParams({ fuel: 0, demand: 0, collectors: 0 });
    setResults(false);
  };

  return (
    <div className="flex flex-col h-full bg-neutral-50 relative pb-20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Digital Twin Simulator</h1>
          <p className="text-neutral-500">Stress-test the network against macroeconomic shocks</p>
        </div>
      </div>

      <div className="flex gap-6 h-[600px]">
        
        {/* Parameter Controls */}
        <div className="w-[350px] bg-white border border-border rounded-xl shadow-sm flex flex-col shrink-0 overflow-hidden">
          <div className="p-4 border-b border-border bg-neutral-50">
            <h2 className="font-bold text-neutral-900 flex items-center gap-2"><Settings2 className="w-5 h-5 text-neutral-400" /> Shock Parameters</h2>
          </div>
          
          <div className="p-6 space-y-8 flex-1 overflow-auto">
            <div>
              <div className="flex justify-between items-end mb-2">
                <label className="text-sm font-bold text-neutral-900">Fuel Price Surge</label>
                <span className={cn("text-xs font-black", params.fuel > 0 ? "text-red-500" : "text-neutral-500")}>+{params.fuel}%</span>
              </div>
              <input type="range" min="0" max="100" step="5" value={params.fuel} onChange={(e) => setParams({...params, fuel: Number(e.target.value)})} className="w-full accent-navy" />
              <p className="text-[10px] text-neutral-500 mt-1">Impacts collector route willingness and fleet costs.</p>
            </div>
            
            <div>
              <div className="flex justify-between items-end mb-2">
                <label className="text-sm font-bold text-neutral-900">Copper Demand Spike</label>
                <span className={cn("text-xs font-black", params.demand > 0 ? "text-teal" : "text-neutral-500")}>+{params.demand}%</span>
              </div>
              <input type="range" min="0" max="200" step="10" value={params.demand} onChange={(e) => setParams({...params, demand: Number(e.target.value)})} className="w-full accent-navy" />
              <p className="text-[10px] text-neutral-500 mt-1">Triggers WastePulse alerts and aggregator price wars.</p>
            </div>

            <div>
              <div className="flex justify-between items-end mb-2">
                <label className="text-sm font-bold text-neutral-900">Collector Drop-off</label>
                <span className={cn("text-xs font-black", params.collectors > 0 ? "text-red-500" : "text-neutral-500")}>-{params.collectors}%</span>
              </div>
              <input type="range" min="0" max="50" step="5" value={params.collectors} onChange={(e) => setParams({...params, collectors: Number(e.target.value)})} className="w-full accent-navy" />
              <p className="text-[10px] text-neutral-500 mt-1">Simulates labor shortage or seasonal migration.</p>
            </div>
          </div>
          
          <div className="p-4 border-t border-border bg-neutral-50 flex gap-2">
            <button onClick={reset} className="p-3 bg-white border border-border rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors">
              <RotateCcw className="w-5 h-5" />
            </button>
            <button onClick={handleSimulate} disabled={running} className="flex-1 bg-navy hover:bg-navy/90 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]">
              {running ? <Activity className="w-5 h-5 animate-pulse" /> : <Play className="w-5 h-5 fill-white" />}
              {running ? "Simulating..." : "Run Simulation"}
            </button>
          </div>
        </div>

        {/* Network Map / Results */}
        <div className="flex-1 bg-white border border-border rounded-xl shadow-sm flex flex-col overflow-hidden relative">
          
          {/* Topology Visualization Area */}
          <div className="flex-1 bg-neutral-900 relative overflow-hidden flex flex-col">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
            
            {!results && !running && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50 z-10">
                <Database className="w-16 h-16 mb-4 opacity-50" />
                <p className="font-medium text-lg">Network State: Nominal</p>
                <p className="text-sm">Adjust parameters and run simulation to view impact.</p>
              </div>
            )}

            {running && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-navy/80 backdrop-blur-sm z-20">
                <div className="relative w-32 h-32 mb-6">
                  <div className="absolute inset-0 border-4 border-teal/20 rounded-full" />
                  <div className="absolute inset-0 border-4 border-teal rounded-full border-t-transparent animate-spin" />
                  <Activity className="w-10 h-10 text-teal absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <p className="text-white font-bold text-xl tracking-wider">CALCULATING NETWORK SHOCK...</p>
              </div>
            )}

            {results && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                {/* Mock Topology Nodes */}
                <div className="w-full max-w-2xl flex items-center justify-between px-12">
                  <div className="flex flex-col gap-8">
                    <Node icon={<UserX className="w-5 h-5 text-red-500" />} label="Collectors" status="Critical" alert />
                    <Node icon={<UserCheck className="w-5 h-5 text-teal" />} label="Collectors" status="Active" />
                  </div>
                  
                  {/* Lines */}
                  <div className="flex-1 h-px bg-gradient-to-r from-red-500/50 via-amber-500/50 to-teal/50 relative">
                    <div className="absolute -top-1 left-1/4 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,1)] animate-ping" />
                  </div>
                  
                  <div className="flex flex-col gap-8">
                    <Node icon={<Truck className="w-5 h-5 text-amber-500" />} label="Logistics Hub" status="Bottleneck" alert />
                  </div>

                  <div className="flex-1 h-px bg-gradient-to-r from-amber-500/50 to-red-500/50 relative" />

                  <div className="flex flex-col gap-8">
                    <Node icon={<Factory className="w-5 h-5 text-red-500" />} label="Recycler" status="Starved" alert />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results Panel */}
          {results && (
            <div className="h-64 bg-white border-t border-border flex animate-in slide-in-from-bottom-8">
              <div className="w-1/3 p-6 border-r border-border flex flex-col justify-center">
                <h3 className="font-bold text-neutral-900 mb-4 text-lg">Simulation Impact</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Network Throughput</p>
                    <div className="flex items-end gap-2">
                      <p className="text-3xl font-black text-red-600">-42%</p>
                      <p className="text-sm font-bold text-neutral-400 mb-1">Volume</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Estimated Loss</p>
                    <p className="text-2xl font-black text-neutral-900">₹1.2M <span className="text-sm font-bold text-neutral-400">/ week</span></p>
                  </div>
                </div>
              </div>
              <div className="flex-1 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-neutral-900 text-sm">Throughput Projection (7 Days)</h3>
                  <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-neutral-300" /> Baseline</span>
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-red-500" /> Post-Shock</span>
                  </div>
                </div>
                <div className="h-32 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={simData} margin={{ top: 5, right: 20, left: -20, bottom: 0 }}>
                      <CartesianGrid vertical={false} stroke="#e5e5e5" strokeDasharray="3 3" />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="base" stroke="#d4d4d4" strokeWidth={3} dot={false} strokeDasharray="5 5" />
                      <Line type="monotone" dataKey="scenario" stroke="#ef4444" strokeWidth={3} dot={{ r: 4, fill: '#ef4444', strokeWidth: 0 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

function Node({ icon, label, status, alert = false }: any) {
  return (
    <div className="flex flex-col items-center gap-2 relative group z-10">
      {alert && <div className="absolute -inset-2 bg-red-500/20 rounded-full animate-pulse blur-md" />}
      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl relative z-10 border-2", alert ? "bg-neutral-900 border-red-500/50 text-red-500" : "bg-neutral-900 border-white/10 text-white")}>
        {icon}
      </div>
      <div className="text-center">
        <p className="text-xs font-bold text-white drop-shadow-md">{label}</p>
        <p className={cn("text-[10px] font-bold uppercase tracking-wider", alert ? "text-red-400" : "text-teal-400")}>{status}</p>
      </div>
    </div>
  );
}
// Mocks for icons
function UserX(p:any) { return <svg {...p} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="17" y1="8" x2="23" y2="14"/><line x1="23" y1="8" x2="17" y2="14"/></svg> }
function UserCheck(p:any) { return <svg {...p} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg> }