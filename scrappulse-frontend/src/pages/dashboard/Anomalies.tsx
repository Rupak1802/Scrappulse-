import { useState } from 'react';
import { AlertTriangle, CheckSquare, Search, Filter, Camera, Scale, XCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const ANOMALIES = [
  { id: 'AN-892', type: 'Weight Mismatch', trxId: 'TRX-1095', collector: 'Ramesh K.', status: 'Open', severity: 'High', date: '2026-09-07 15:42' },
  { id: 'AN-891', type: 'Material Mismatch', trxId: 'TRX-1082', collector: 'Suresh M.', status: 'Open', severity: 'Medium', date: '2026-09-07 11:20' },
  { id: 'AN-890', type: 'Price Dispute', trxId: 'TRX-1075', collector: 'Arjun S.', status: 'Resolved', severity: 'Low', date: '2026-09-06 16:15' },
];

export default function Anomalies() {
  const [selectedId, setSelectedId] = useState<string | null>('AN-892');

  return (
    <div className="flex flex-col h-full bg-neutral-50 relative pb-20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Anomaly Review Queue</h1>
          <p className="text-neutral-500">Resolve discrepancies between collectors and facilities</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-red-50 text-red-700 px-3 py-1.5 rounded-lg border border-red-200 font-bold text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> 2 Open
          </div>
        </div>
      </div>

      <div className="flex gap-6 h-[600px]">
        {/* Queue List */}
        <div className="w-[350px] bg-white border border-border rounded-xl shadow-sm flex flex-col overflow-hidden shrink-0">
          <div className="p-3 border-b border-border bg-neutral-50 flex gap-2">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 absolute left-2 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input type="text" placeholder="Search..." className="w-full bg-white border border-border rounded pl-7 pr-2 py-1.5 text-xs outline-none focus:border-teal" />
            </div>
            <button className="p-1.5 border border-border bg-white rounded text-neutral-500 hover:text-neutral-900"><Filter className="w-3.5 h-3.5" /></button>
          </div>
          
          <div className="flex-1 overflow-auto divide-y divide-border">
            {ANOMALIES.map(an => (
              <div 
                key={an.id} 
                onClick={() => setSelectedId(an.id)}
                className={cn(
                  "p-4 cursor-pointer transition-colors relative",
                  selectedId === an.id ? "bg-teal/5 border-l-4 border-l-teal" : "hover:bg-neutral-50 border-l-4 border-l-transparent"
                )}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded",
                    an.severity === 'High' ? "bg-red-100 text-red-700" : an.severity === 'Medium' ? "bg-amber-100 text-amber-700" : "bg-neutral-100 text-neutral-600"
                  )}>{an.severity}</span>
                  <span className="text-xs font-semibold text-neutral-400">{an.date.split(' ')[1]}</span>
                </div>
                <h3 className="font-bold text-neutral-900 text-sm mb-1">{an.type}</h3>
                <p className="text-xs text-neutral-500 font-medium">{an.trxId} • {an.collector}</p>
                {an.status === 'Resolved' && <div className="absolute inset-0 bg-white/60 flex items-center justify-center backdrop-blur-[1px]"><CheckCircle2 className="w-8 h-8 text-green-500/50" /></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Resolution Panel */}
        <AnimatePresence mode="wait">
          {selectedId === 'AN-892' && (
            <motion.div key="AN-892" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 bg-white border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
              <div className="p-4 border-b border-border bg-navy text-white flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-lg flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-amber-500" /> AN-892: Weight Mismatch</h2>
                  <p className="text-white/70 text-xs font-medium">TRX-1095 • Ramesh K.</p>
                </div>
                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Unresolved</span>
              </div>

              <div className="flex-1 overflow-auto p-6 flex flex-col gap-6">
                
                <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 flex justify-between items-center">
                  <div className="text-center flex-1">
                    <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">Collector Claim</p>
                    <p className="text-3xl font-black text-neutral-900">45.5<span className="text-lg text-neutral-400">kg</span></p>
                    <p className="text-xs text-neutral-500 mt-1">Input via app at 14:10</p>
                  </div>
                  <div className="w-px h-16 bg-neutral-300 mx-4" />
                  <div className="text-center flex-1">
                    <p className="text-xs font-bold text-red-500 uppercase tracking-wider mb-1">Facility Scale</p>
                    <p className="text-3xl font-black text-red-600">41.2<span className="text-lg text-red-400">kg</span></p>
                    <p className="text-xs text-neutral-500 mt-1">IoT Scale #4 at 15:30</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-neutral-900 mb-3 text-sm flex items-center gap-2"><Camera className="w-4 h-4 text-neutral-400" /> Evidence Photos</h3>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <div className="aspect-video bg-neutral-900 rounded-lg overflow-hidden border border-border relative group cursor-pointer">
                        <img src="https://picsum.photos/seed/scrap1/400/300" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="Collector" />
                        <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded backdrop-blur-sm">Collector's Photo</div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="aspect-video bg-neutral-900 rounded-lg overflow-hidden border border-border relative group cursor-pointer">
                        <img src="https://picsum.photos/seed/scale/400/300" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="Scale" />
                        <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded backdrop-blur-sm">CCTV / Scale Snapshot</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                  <div className="shrink-0"><Scale className="w-5 h-5 text-amber-600" /></div>
                  <div>
                    <h3 className="text-sm font-bold text-amber-900 mb-1">System Recommendation</h3>
                    <p className="text-xs text-amber-800 leading-snug">
                      Facility IoT scale has 99.9% historical accuracy. Collector Ramesh K. has 3 prior weight discrepancies this month. 
                      <strong> Recommend adopting Facility Scale weight (41.2kg) and issuing a warning.</strong>
                    </p>
                  </div>
                </div>

              </div>
              
              <div className="p-4 border-t border-border bg-neutral-50 flex gap-3">
                <button className="flex-1 px-4 py-3 bg-white border border-red-200 text-red-600 hover:bg-red-50 font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm">
                  <XCircle className="w-5 h-5" /> Reject Claim (Use 41.2kg)
                </button>
                <button className="flex-1 px-4 py-3 bg-teal hover:bg-teal/90 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm">
                  <CheckSquare className="w-5 h-5" /> Accept Claim (Use 45.5kg)
                </button>
              </div>
            </motion.div>
          )}

          {selectedId !== 'AN-892' && (
             <motion.div key="other" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 bg-white border border-border rounded-xl shadow-sm flex items-center justify-center text-neutral-400">
               <p className="font-semibold">Select an anomaly to review</p>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}