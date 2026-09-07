import { useState } from 'react';
import { Calculator, ChevronLeft, Sparkles, ArrowRight, Save, History, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

export default function Simulator() {
  const navigate = useNavigate();
  
  const [opt1, setOpt1] = useState({ recycler: 'EcoTech', timing: 'Today', weight: 15 });
  const [opt2, setOpt2] = useState({ recycler: 'MetalCorp', timing: 'Tomorrow', weight: 15 });

  // Mock calculation logic
  const getRate = (recycler: string, timing: string) => {
    let base = recycler === 'EcoTech' ? 68 : recycler === 'MetalCorp' ? 65 : 62;
    if (timing === 'Tomorrow') base *= 0.95; // 5% drop prediction
    if (timing === 'Next Week') base *= 1.05; // 5% rise prediction
    return base;
  };

  const val1 = opt1.weight * getRate(opt1.recycler, opt1.timing);
  const val2 = opt2.weight * getRate(opt2.recycler, opt2.timing);
  
  const diff = Math.abs(val1 - val2);
  const winner = val1 > val2 ? 1 : val1 < val2 ? 2 : 0;

  return (
    <div className="flex flex-col h-full bg-neutral-50 pb-20">
      <div className="bg-white px-4 py-3 border-b border-border sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-neutral-500 hover:text-neutral-900">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="font-semibold text-neutral-900 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-teal" /> What-If Simulator
          </h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Winner Banner */}
        <div className="bg-navy text-white rounded-xl p-5 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <Sparkles className="w-24 h-24" />
          </div>
          <h2 className="text-white/70 text-sm font-semibold uppercase tracking-wider mb-2 relative z-10">Best Decision</h2>
          
          <div className="flex items-end gap-3 relative z-10">
            <div className="flex-1">
              <p className="text-xl font-bold leading-tight">
                {winner === 1 ? `Sell to ${opt1.recycler} ${opt1.timing.toLowerCase()}` : 
                 winner === 2 ? `Sell to ${opt2.recycler} ${opt2.timing.toLowerCase()}` : 
                 "Both options yield same value"}
              </p>
            </div>
            {winner !== 0 && (
              <motion.div 
                key={diff}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-teal text-white px-3 py-1.5 rounded-lg border border-teal/50 shadow-sm flex items-center gap-1.5 shrink-0"
              >
                <TrendingUp className="w-4 h-4" />
                <span className="font-black text-lg">+₹{Math.round(diff)}</span>
              </motion.div>
            )}
          </div>
          
          <button onClick={() => navigate('/collector/earnings')} className="mt-4 w-full bg-white/10 hover:bg-white/20 transition-colors border border-white/20 rounded-lg py-2.5 text-sm font-bold flex items-center justify-center gap-2 relative z-10">
            Apply to my Sell Guidance <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Builder Panels Side-by-Side */}
        <div className="flex gap-3">
          {/* Option A */}
          <div className={cn("flex-1 rounded-xl border p-3 bg-white transition-all", winner === 1 ? "border-teal ring-1 ring-teal shadow-md" : "border-border shadow-sm")}>
            <div className="flex items-center justify-between border-b border-border pb-2 mb-3">
              <h3 className="font-bold text-neutral-900 text-sm">Option A</h3>
              {winner === 1 && <span className="text-[10px] bg-teal text-white font-bold px-1.5 py-0.5 rounded uppercase">Winner</span>}
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-neutral-500 uppercase">Recycler</label>
                <select value={opt1.recycler} onChange={e => setOpt1({...opt1, recycler: e.target.value})} className="w-full text-sm p-1.5 bg-neutral-50 border border-border rounded outline-none font-medium text-neutral-900">
                  <option>EcoTech</option><option>MetalCorp</option><option>GreenEarth</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-neutral-500 uppercase">Timing</label>
                <select value={opt1.timing} onChange={e => setOpt1({...opt1, timing: e.target.value})} className="w-full text-sm p-1.5 bg-neutral-50 border border-border rounded outline-none font-medium text-neutral-900">
                  <option>Today</option><option>Tomorrow</option><option>Next Week</option>
                </select>
              </div>
              <div className="pt-2 border-t border-border mt-3">
                <p className="text-[10px] font-bold text-neutral-500 uppercase">Est. Value</p>
                <motion.p key={val1} initial={{ scale: 0.9 }} animate={{ scale: 1 }} className={cn("text-xl font-black", winner === 1 ? "text-teal" : "text-neutral-900")}>
                  ₹{Math.round(val1)}
                </motion.p>
              </div>
            </div>
          </div>

          {/* Option B */}
          <div className={cn("flex-1 rounded-xl border p-3 bg-white transition-all", winner === 2 ? "border-teal ring-1 ring-teal shadow-md" : "border-border shadow-sm")}>
            <div className="flex items-center justify-between border-b border-border pb-2 mb-3">
              <h3 className="font-bold text-neutral-900 text-sm">Option B</h3>
              {winner === 2 && <span className="text-[10px] bg-teal text-white font-bold px-1.5 py-0.5 rounded uppercase">Winner</span>}
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-neutral-500 uppercase">Recycler</label>
                <select value={opt2.recycler} onChange={e => setOpt2({...opt2, recycler: e.target.value})} className="w-full text-sm p-1.5 bg-neutral-50 border border-border rounded outline-none font-medium text-neutral-900">
                  <option>EcoTech</option><option>MetalCorp</option><option>GreenEarth</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-neutral-500 uppercase">Timing</label>
                <select value={opt2.timing} onChange={e => setOpt2({...opt2, timing: e.target.value})} className="w-full text-sm p-1.5 bg-neutral-50 border border-border rounded outline-none font-medium text-neutral-900">
                  <option>Today</option><option>Tomorrow</option><option>Next Week</option>
                </select>
              </div>
              <div className="pt-2 border-t border-border mt-3">
                <p className="text-[10px] font-bold text-neutral-500 uppercase">Est. Value</p>
                <motion.p key={val2} initial={{ scale: 0.9 }} animate={{ scale: 1 }} className={cn("text-xl font-black", winner === 2 ? "text-teal" : "text-neutral-900")}>
                  ₹{Math.round(val2)}
                </motion.p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button className="flex items-center gap-1.5 text-sm font-semibold text-teal bg-teal/10 px-3 py-1.5 rounded-lg hover:bg-teal/20 transition-colors">
            <Save className="w-4 h-4" /> Save Comparison
          </button>
        </div>

        {/* History */}
        <div className="bg-white rounded-xl border border-border shadow-sm p-4 mt-2">
          <h3 className="font-bold text-neutral-900 mb-3 flex items-center gap-2">
            <History className="w-4 h-4 text-neutral-400" /> Recent Simulations
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 rounded hover:bg-neutral-50 cursor-pointer">
              <div>
                <p className="text-sm font-bold text-neutral-900">EcoTech vs GreenEarth</p>
                <p className="text-xs text-neutral-500">Copper Wire (Today)</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded border border-green-100">+₹150</span>
              </div>
            </div>
            <div className="border-t border-border" />
            <div className="flex items-center justify-between p-2 rounded hover:bg-neutral-50 cursor-pointer">
              <div>
                <p className="text-sm font-bold text-neutral-900">Today vs Tomorrow</p>
                <p className="text-xs text-neutral-500">Aluminium @ MetalCorp</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-100">-₹50</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}