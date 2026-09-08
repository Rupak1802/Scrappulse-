import { useState } from 'react';
import { Search, Filter, Download, CheckSquare, MoreVertical, X, QrCode, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const TRANSACTIONS = [
  { id: 'TRX-1092', date: '2026-09-07 14:30', collector: 'Ramesh K.', material: 'Copper Wire', weight: 15, price: 1020, status: 'Paid', mode: 'UPI' },
  { id: 'TRX-1091', date: '2026-09-06 09:15', collector: 'Suresh M.', material: 'Aluminium', weight: 42, price: 4200, status: 'Paid', mode: 'Cash' },
  { id: 'TRX-1090', date: '2026-09-05 16:45', collector: 'Ramesh K.', material: 'Mixed PCBs', weight: 8, price: 1600, status: 'Pending', mode: 'Bank Tx' },
  { id: 'TRX-1089', date: '2026-09-03 11:20', collector: 'Arjun S.', material: 'Batteries', weight: 25, price: 1250, status: 'Flagged', mode: 'Cash' },
];

export default function Transactions() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [activeDrawer, setActiveDrawer] = useState<string | null>(null);

  const toggleRow = (id: string) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };
  const toggleAll = () => {
    setSelectedRows(selectedRows.length === TRANSACTIONS.length ? [] : TRANSACTIONS.map(t => t.id));
  };

  return (
    <div className="flex flex-col h-full bg-white border border-border rounded-xl shadow-sm overflow-hidden relative">
      
      {/* Header & Filters */}
      <div className="p-4 border-b border-border bg-neutral-50 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-neutral-900">Transactions & Traceability</h1>
            <p className="text-sm text-neutral-500">Monitor all e-waste transfers across the network</p>
          </div>
          
          <AnimatePresence>
            {selectedRows.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-3 bg-teal/10 border border-teal/20 px-4 py-2 rounded-lg text-teal font-semibold"
              >
                <span className="text-sm">{selectedRows.length} selected</span>
                <div className="w-px h-4 bg-teal/20 mx-1" />
                <button className="text-sm hover:underline flex items-center gap-1.5"><CheckSquare className="w-4 h-4" /> Mark Reviewed</button>
                <button className="text-sm hover:underline flex items-center gap-1.5"><Download className="w-4 h-4" /> Export Data</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input type="text" placeholder="Search ID, Collector, or Material..." className="w-full bg-white border border-border rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:border-teal" />
          </div>
          <button className="bg-white border border-border px-4 py-2 rounded-lg text-sm font-medium text-neutral-700 flex items-center gap-2 hover:bg-neutral-50">
            <Filter className="w-4 h-4" /> Status: All
          </button>
          <button className="bg-white border border-border px-4 py-2 rounded-lg text-sm font-medium text-neutral-700 flex items-center gap-2 hover:bg-neutral-50">
            <Filter className="w-4 h-4" /> Date: Last 7 Days
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-neutral-50 border-b border-border shadow-sm z-10">
            <tr className="text-xs uppercase tracking-wider text-neutral-500">
              <th className="p-4 w-12 text-center">
                <input type="checkbox" checked={selectedRows.length === TRANSACTIONS.length} onChange={toggleAll} className="accent-teal rounded" />
              </th>
              <th className="p-4 font-semibold cursor-pointer hover:text-neutral-900">Transaction ID</th>
              <th className="p-4 font-semibold cursor-pointer hover:text-neutral-900">Date & Time</th>
              <th className="p-4 font-semibold cursor-pointer hover:text-neutral-900">Collector</th>
              <th className="p-4 font-semibold">Material / Weight</th>
              <th className="p-4 font-semibold cursor-pointer hover:text-neutral-900 text-right">Value (₹)</th>
              <th className="p-4 font-semibold">Status / Mode</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {TRANSACTIONS.map((t) => (
              <tr 
                key={t.id} 
                className={cn("hover:bg-neutral-50/50 cursor-pointer transition-colors", activeDrawer === t.id && "bg-teal/5")}
                onClick={() => setActiveDrawer(t.id)}
              >
                <td className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
                  <input type="checkbox" checked={selectedRows.includes(t.id)} onChange={() => toggleRow(t.id)} className="accent-teal rounded" />
                </td>
                <td className="p-4 font-bold text-neutral-900 text-sm">{t.id}</td>
                <td className="p-4 text-sm text-neutral-500 font-medium">{t.date}</td>
                <td className="p-4 font-bold text-neutral-700 text-sm flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-neutral-200 text-[10px] flex items-center justify-center font-bold text-neutral-600">{t.collector.substring(0,2).toUpperCase()}</div>
                  {t.collector}
                </td>
                <td className="p-4">
                  <div className="text-sm font-bold text-neutral-900">{t.material}</div>
                  <div className="text-xs font-semibold text-neutral-500 bg-neutral-100 w-fit px-1.5 py-0.5 rounded mt-0.5">{t.weight} kg</div>
                </td>
                <td className="p-4 text-right">
                  <div className="font-black text-teal text-base">₹{t.price}</div>
                  <div className="text-[10px] text-neutral-400 font-bold uppercase">₹{Math.round(t.price/t.weight)}/kg</div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col items-start gap-1">
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border",
                      t.status === 'Paid' ? "bg-green-50 text-green-700 border-green-200" : 
                      t.status === 'Pending' ? "bg-amber-50 text-amber-700 border-amber-200" : 
                      "bg-red-50 text-red-700 border-red-200"
                    )}>{t.status}</span>
                    <span className="text-xs text-neutral-500 font-medium">{t.mode}</span>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <button className="p-1.5 hover:bg-neutral-100 rounded text-neutral-400 hover:text-neutral-900">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-border flex items-center justify-between text-sm font-medium text-neutral-500 bg-neutral-50">
        <div>Showing 1 to 4 of 42 entries</div>
        <div className="flex gap-1">
          <button className="px-3 py-1 border border-border rounded-md bg-white hover:bg-neutral-50 disabled:opacity-50" disabled>Prev</button>
          <button className="px-3 py-1 border border-border rounded-md bg-navy text-white hover:bg-navy/90">1</button>
          <button className="px-3 py-1 border border-border rounded-md bg-white hover:bg-neutral-50">2</button>
          <button className="px-3 py-1 border border-border rounded-md bg-white hover:bg-neutral-50">3</button>
          <button className="px-3 py-1 border border-border rounded-md bg-white hover:bg-neutral-50">Next</button>
        </div>
      </div>

      {/* Detail Drawer (Slide-over) */}
      <AnimatePresence>
        {activeDrawer && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-neutral-900/20 backdrop-blur-sm z-20"
              onClick={() => setActiveDrawer(null)}
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 bottom-0 w-[90vw] sm:w-[500px] bg-white border-l border-border shadow-2xl z-30 flex flex-col"
            >
              <div className="p-4 border-b border-border flex items-center justify-between bg-navy text-white">
                <div>
                  <h2 className="font-bold text-lg">{activeDrawer}</h2>
                  <p className="text-white/70 text-xs font-medium">Traceability Record</p>
                </div>
                <button onClick={() => setActiveDrawer(null)} className="p-1 hover:bg-white/10 rounded-full transition-colors"><X className="w-5 h-5" /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* QR Payload Preview */}
                <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 flex gap-4">
                  <div className="w-20 h-20 bg-white border border-border rounded-lg p-1 shrink-0">
                    <QrCode className="w-full h-full text-neutral-800" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h3 className="font-bold text-sm text-neutral-900 mb-1">Blockchain Hash Payload</h3>
                    <code className="text-[10px] text-neutral-500 break-all block bg-white p-2 rounded border border-neutral-200 font-mono">
                      e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                    </code>
                    <div className="flex items-center gap-1 mt-2 text-xs font-semibold text-green-600">
                      <ShieldCheck className="w-4 h-4" /> Verified Immutable
                    </div>
                  </div>
                </div>

                {/* Audit Timeline */}
                <div>
                  <h3 className="font-bold text-neutral-900 mb-4">Audit Trail</h3>
                  <div className="relative border-l-2 border-neutral-200 ml-3 space-y-6 pb-4">
                    <TimelineItem icon={<Camera />} title="Material Captured (AI Valued)" time="14:05" desc="AI detected Copper Wire (94% conf.). Weight inputted: 15kg." />
                    <TimelineItem icon={<MapPin />} title="Pickup Confirmed" time="14:12" desc="Accepted by EcoTech via FairDeal network." />
                    <TimelineItem icon={<Truck />} title="Transit" time="14:20" desc="Collector en-route to MIDC facility." />
                    <TimelineItem icon={<CheckSquare />} title="Received & Weighed" time="14:30" desc="Facility scale confirmed 15.1kg. No discrepancy." active />
                    <TimelineItem icon={<IndianRupee />} title="Payment Triggered" time="14:32" desc="UPI transfer of ₹1020 initiated." active />
                  </div>
                </div>

              </div>
              
              <div className="p-4 border-t border-border bg-neutral-50 flex justify-end gap-3">
                <button className="px-4 py-2 border border-border bg-white rounded-lg text-sm font-semibold hover:bg-neutral-100">Flag Anomaly</button>
                <button className="px-4 py-2 bg-navy text-white rounded-lg text-sm font-bold hover:bg-navy/90 shadow-sm flex items-center gap-2"><Download className="w-4 h-4" /> Download PDF</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function TimelineItem({ icon, title, time, desc, active = false }: any) {
  return (
    <div className="relative pl-6">
      <div className={cn("absolute -left-[11px] top-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center bg-white", active ? "border-teal text-teal" : "border-neutral-300 text-neutral-400")}>
        <div className={cn("w-2 h-2 rounded-full", active ? "bg-teal" : "bg-neutral-300")} />
      </div>
      <div className="flex items-center justify-between mb-1">
        <h4 className={cn("font-bold text-sm", active ? "text-neutral-900" : "text-neutral-500")}>{title}</h4>
        <span className="text-xs font-medium text-neutral-400">{time}</span>
      </div>
      <p className="text-xs text-neutral-500 leading-snug">{desc}</p>
    </div>
  );
}
// Mocks for icons since not all imported
function Camera(p:any) { return <svg {...p} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg> }
function IndianRupee(p:any) { return <svg {...p} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12"/><path d="M6 8h12"/><path d="m6 13 8.5 8"/><path d="M6 13h3"/><path d="M9 13c6.667 0 6.667-10 0-10"/></svg> }
function Truck(p:any) { return <svg {...p} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h2"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg> }
