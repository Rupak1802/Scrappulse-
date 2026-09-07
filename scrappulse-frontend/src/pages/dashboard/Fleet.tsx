import { useState } from 'react';
import { Truck, MapPin, Zap, TrendingUp, CheckSquare, Clock, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const PICKUPS = [
  { id: 'PU-101', loc: 'MIDC Phase 1', weight: 450, value: 31000, checked: true },
  { id: 'PU-102', loc: 'MIDC Phase 2', weight: 280, value: 19500, checked: true },
  { id: 'PU-103', loc: 'Andheri E.', weight: 120, value: 8400, checked: true },
  { id: 'PU-104', loc: 'Powai Plaza', weight: 90, value: 5000, checked: false },
];

export default function Fleet() {
  const [capacity, setCapacity] = useState(1000);
  const [pickups, setPickups] = useState(PICKUPS);
  const [isDispatching, setIsDispatching] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [activeRoutes, setActiveRoutes] = useState<any[]>([]);

  const selectedPickups = pickups.filter(p => p.checked);
  const totalWeight = selectedPickups.reduce((acc, p) => acc + p.weight, 0);
  const totalValue = selectedPickups.reduce((acc, p) => acc + p.value, 0);

  const togglePickup = (id: string) => {
    setPickups(pickups.map(p => p.id === id ? { ...p, checked: !p.checked } : p));
  };

  const handleDispatch = () => {
    setIsDispatching(true);
    setTimeout(() => {
      setActiveRoutes([{ id: `RT-${Math.floor(Math.random()*1000)}`, truck: 'MH-04-AB-1234', stops: selectedPickups.length, load: totalWeight, status: 'In Transit' }, ...activeRoutes]);
      setIsDispatching(false);
      setShowConfirm(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6 h-full relative">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-neutral-900">Fleet Route Optimizer</h1>
        <p className="text-neutral-500">Maximize load efficiency and minimize transit time</p>
      </div>

      <div className="grid grid-cols-[350px_1fr] gap-6">
        {/* Input Panel */}
        <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden flex flex-col h-[600px]">
          <div className="p-4 border-b border-border bg-neutral-50">
            <h2 className="font-bold text-neutral-900">Route Parameters</h2>
          </div>
          
          <div className="p-4 border-b border-border">
            <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 block">Truck Capacity (kg)</label>
            <input 
              type="number" 
              value={capacity} 
              onChange={e => setCapacity(Number(e.target.value))}
              className="w-full bg-neutral-50 border border-border rounded-lg p-2.5 text-sm font-bold text-neutral-900 outline-none focus:border-teal" 
            />
            <div className="mt-3 bg-neutral-100 rounded-full h-2 w-full overflow-hidden">
              <div 
                className={cn("h-full transition-all", (totalWeight/capacity) > 0.9 ? 'bg-red-500' : 'bg-teal')} 
                style={{ width: `${Math.min((totalWeight/capacity)*100, 100)}%` }} 
              />
            </div>
            <div className="flex justify-between text-xs font-bold mt-1">
              <span className={cn((totalWeight/capacity) > 1 ? 'text-red-500' : 'text-neutral-900')}>{totalWeight}kg Selected</span>
              <span className="text-neutral-500">{capacity}kg Max</span>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-2">
            <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 px-2">Confirmed Pickups</h3>
            <div className="space-y-1">
              {pickups.map(p => (
                <label key={p.id} className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                  p.checked ? "bg-teal/5 border-teal/20" : "bg-white border-transparent hover:bg-neutral-50"
                )}>
                  <input type="checkbox" checked={p.checked} onChange={() => togglePickup(p.id)} className="accent-teal rounded w-4 h-4" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-neutral-900 leading-tight">{p.loc}</p>
                    <p className="text-xs text-neutral-500">{p.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-neutral-900">{p.weight}kg</p>
                    <p className="text-xs text-teal font-semibold">₹{(p.value/1000).toFixed(1)}k</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Candidate Routes */}
        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-neutral-900">Generated Candidates</h2>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Recommended Route */}
            <div className="bg-white border-2 border-teal rounded-xl shadow-md overflow-hidden relative group">
              <div className="absolute top-0 right-0 bg-teal text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg shadow-sm flex items-center gap-1">
                <Zap className="w-3 h-3 fill-white" /> RECOMMENDED
              </div>
              <div className="p-5">
                <div className="flex items-end justify-between mb-6 mt-2">
                  <div>
                    <p className="text-xs font-semibold text-neutral-500 uppercase">Route Alpha</p>
                    <p className="text-2xl font-black text-neutral-900">8.4 <span className="text-sm text-neutral-400 font-bold">km</span></p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-teal">94<span className="text-lg text-teal/50">%</span></div>
                    <p className="text-[10px] font-bold text-neutral-400 uppercase">Efficiency Score</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6 bg-neutral-50 p-3 rounded-lg border border-neutral-100">
                  <div>
                    <p className="text-[10px] font-bold text-neutral-500 uppercase">Load Fill</p>
                    <p className="text-sm font-bold text-neutral-900">{Math.round((totalWeight/capacity)*100)}% ({totalWeight}kg)</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-neutral-500 uppercase">Est. Value</p>
                    <p className="text-sm font-bold text-teal">₹{totalValue.toLocaleString()}</p>
                  </div>
                </div>

                {/* Stylized Route Line */}
                <div className="relative pl-6 py-2 border-l-2 border-teal ml-3 mb-6 space-y-4">
                  <div className="absolute -left-[7px] -top-1 w-3 h-3 bg-white border-2 border-teal rounded-full" />
                  <div className="absolute -left-[7px] -bottom-1 w-3 h-3 bg-teal rounded-full shadow-[0_0_8px_rgba(0,137,123,0.8)]" />
                  
                  {selectedPickups.slice(0,3).map((p, i) => (
                    <div key={i} className="text-xs font-bold text-neutral-700 flex items-center gap-2">
                      <span className="w-4 h-4 rounded bg-neutral-200 flex items-center justify-center text-[8px] text-neutral-500 shrink-0">{i+1}</span>
                      <span className="truncate">{p.loc}</span>
                    </div>
                  ))}
                  {selectedPickups.length > 3 && <div className="text-xs font-bold text-neutral-400 pl-2">+{selectedPickups.length - 3} more stops</div>}
                </div>

                <button onClick={() => setShowConfirm(true)} className="w-full bg-navy hover:bg-navy/90 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm">
                  Select & Dispatch <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Alternative Route */}
            <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
              <div className="p-5">
                <div className="flex items-end justify-between mb-6 mt-2">
                  <div>
                    <p className="text-xs font-semibold text-neutral-500 uppercase">Route Beta (Fastest)</p>
                    <p className="text-2xl font-black text-neutral-900">6.2 <span className="text-sm text-neutral-400 font-bold">km</span></p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-neutral-600">78<span className="text-lg text-neutral-400">%</span></div>
                    <p className="text-[10px] font-bold text-neutral-400 uppercase">Efficiency Score</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6 bg-neutral-50 p-3 rounded-lg border border-neutral-100">
                  <div>
                    <p className="text-[10px] font-bold text-neutral-500 uppercase">Load Fill</p>
                    <p className="text-sm font-bold text-neutral-900">{Math.round(((totalWeight-120)/capacity)*100)}% ({totalWeight-120}kg)</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-neutral-500 uppercase">Est. Value</p>
                    <p className="text-sm font-bold text-neutral-600">₹{(totalValue-8400).toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="bg-neutral-100 text-neutral-500 text-xs p-3 rounded-lg flex items-start gap-2 mb-6">
                  <TrendingUp className="w-4 h-4 shrink-0 mt-0.5" />
                  <p>Skips Andheri E. to save 45 mins of traffic delay, but reduces load fill significantly.</p>
                </div>

                <button className="w-full bg-white border-2 border-border hover:bg-neutral-50 text-neutral-700 font-bold py-2.5 rounded-lg transition-colors mt-auto">
                  Select Alternative
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active/Past Routes Table */}
      <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden mt-2">
        <div className="p-4 border-b border-border bg-neutral-50 flex items-center justify-between">
          <h2 className="font-bold text-neutral-900 flex items-center gap-2"><Truck className="w-4 h-4 text-teal" /> Active & Past Routes</h2>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wider text-neutral-500 bg-white">
              <th className="p-4 font-semibold">Route ID / Truck</th>
              <th className="p-4 font-semibold">Stops</th>
              <th className="p-4 font-semibold">Total Load</th>
              <th className="p-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {activeRoutes.map((r, i) => (
              <tr key={i} className="hover:bg-neutral-50/50 bg-teal/5">
                <td className="p-4">
                  <div className="font-bold text-neutral-900 text-sm">{r.id}</div>
                  <div className="text-xs font-semibold text-neutral-500">{r.truck}</div>
                </td>
                <td className="p-4 text-sm font-bold text-neutral-700">{r.stops} stops</td>
                <td className="p-4 text-sm font-bold text-neutral-900">{r.load} kg</td>
                <td className="p-4">
                  <span className="bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center w-fit gap-1">
                    <Clock className="w-3 h-3" /> {r.status}
                  </span>
                </td>
              </tr>
            ))}
            <tr className="hover:bg-neutral-50/50">
              <td className="p-4">
                <div className="font-bold text-neutral-900 text-sm">RT-842</div>
                <div className="text-xs font-semibold text-neutral-500">MH-04-XX-9999</div>
              </td>
              <td className="p-4 text-sm font-bold text-neutral-700">4 stops</td>
              <td className="p-4 text-sm font-bold text-neutral-900">920 kg</td>
              <td className="p-4">
                <span className="bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center w-fit gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Completed
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirm && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-40" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 w-full max-w-md overflow-hidden">
              <div className="p-6">
                <div className="w-12 h-12 bg-teal/10 rounded-full flex items-center justify-center mb-4">
                  <Truck className="w-6 h-6 text-teal" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">Dispatch Route Alpha?</h3>
                <p className="text-neutral-500 text-sm mb-6">This will notify 4 collectors and lock in their pickup schedules. Truck MH-04-AB-1234 will be assigned.</p>
                
                <div className="flex gap-3">
                  <button onClick={() => setShowConfirm(false)} className="flex-1 px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold rounded-xl transition-colors">Cancel</button>
                  <button onClick={handleDispatch} className="flex-1 px-4 py-2.5 bg-teal hover:bg-teal/90 text-white font-bold rounded-xl transition-colors flex items-center justify-center shadow-md">
                    {isDispatching ? <Zap className="w-5 h-5 animate-pulse" /> : "Confirm Dispatch"}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}