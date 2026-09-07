import { useState } from 'react';
import { Link2, Search, Zap, CheckCircle2, Factory } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { cn } from '../../lib/utils';

const supplyData = [
  { name: 'MIDC', amount: 450 },
  { name: 'SEEPZ', amount: 320 },
  { name: 'Andheri', amount: 150 },
];

export default function Matcher() {
  const [material, setMaterial] = useState('Copper Wire');
  const [qty, setQty] = useState(1000);
  const [timeframe, setTimeframe] = useState('Next 7 Days');
  
  const totalSupply = supplyData.reduce((acc, curr) => acc + curr.amount, 0);
  const fulfillment = Math.min((totalSupply / qty) * 100, 100);

  return (
    <div className="flex flex-col h-full bg-white border border-border rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-border bg-neutral-50">
        <h1 className="text-xl font-bold text-neutral-900">Supply-Demand Matcher</h1>
        <p className="text-sm text-neutral-500">Find the right supply zones for your production targets</p>
      </div>

      <div className="flex-1 overflow-auto p-6 flex flex-col lg:flex-row gap-6">
        
        {/* Demand Entry */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <div className="bg-white border border-border rounded-xl shadow-sm p-5">
            <h2 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
              <Factory className="w-4 h-4 text-neutral-400" /> New Demand Request
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1.5 block">Target Material</label>
                <select value={material} onChange={e => setMaterial(e.target.value)} className="w-full bg-neutral-50 border border-border rounded-lg p-2.5 text-sm outline-none font-medium text-neutral-900 focus:border-teal">
                  <option>Copper Wire</option><option>Mixed PCBs</option><option>Aluminium</option>
                </select>
              </div>
              
              <div>
                <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1.5 block">Quantity Needed (kg)</label>
                <input type="number" value={qty} onChange={e => setQty(Number(e.target.value))} className="w-full bg-neutral-50 border border-border rounded-lg p-2.5 text-sm outline-none font-bold text-neutral-900 focus:border-teal" />
              </div>
              
              <div>
                <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1.5 block">Timeframe</label>
                <select value={timeframe} onChange={e => setTimeframe(e.target.value)} className="w-full bg-neutral-50 border border-border rounded-lg p-2.5 text-sm outline-none font-medium text-neutral-900 focus:border-teal">
                  <option>Next 7 Days</option><option>This Month</option><option>Next Quarter</option>
                </select>
              </div>

              <button className="w-full mt-2 bg-navy hover:bg-navy/90 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                <Search className="w-4 h-4" /> Run Matcher
              </button>
            </div>
          </div>

          <div className="bg-white border border-border rounded-xl shadow-sm p-4 flex-1">
            <h3 className="font-bold text-neutral-900 text-sm mb-3">Recent Requests</h3>
            <div className="space-y-2">
              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-100 flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm text-neutral-900">500kg PCBs</p>
                  <p className="text-xs text-neutral-500">Target: Sep 1 - Sep 7</p>
                </div>
                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-bold">100% MET</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-100 flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm text-neutral-900">2T Aluminium</p>
                  <p className="text-xs text-neutral-500">Target: Sep 1 - Sep 30</p>
                </div>
                <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-[10px] font-bold">82% PRJ</span>
              </div>
            </div>
          </div>
        </div>

        {/* Matcher Results */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          
          <div className="bg-white border border-border rounded-xl shadow-sm p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
              <Link2 className="w-32 h-32 text-navy" />
            </div>
            
            <h2 className="font-bold text-neutral-900 mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-teal" /> Match Analysis: {qty}kg {material}
            </h2>
            
            <div className="flex items-center gap-8 mb-8">
              <div className="relative w-32 h-32 flex-shrink-0">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f5f5f5" strokeWidth="3" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={fulfillment >= 100 ? "#00897B" : "#F59E0B"} strokeWidth="3" strokeDasharray={`${fulfillment}, 100`} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-neutral-900">{Math.round(fulfillment)}%</span>
                  <span className="text-[10px] font-bold text-neutral-400 uppercase">Fulfilled</span>
                </div>
              </div>
              
              <div>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-3xl font-black text-neutral-900">{totalSupply} <span className="text-sm font-bold text-neutral-400">kg found</span></span>
                </div>
                <p className="text-sm text-neutral-500 max-w-sm">
                  {fulfillment >= 100 
                    ? `We expect to easily meet your target within the ${timeframe.toLowerCase()}.` 
                    : `Predicted supply falls short of your ${qty}kg target. Consider expanding sourcing zones.`}
                </p>
              </div>
            </div>

            <div className="h-48 w-full border-t border-border pt-6">
              <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-4">Predicted Supply by Zone</h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={supplyData} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#171717', fontWeight: 600 }} width={80} />
                  <XAxis type="number" hide />
                  <Tooltip cursor={{ fill: '#f5f5f5' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="amount" barSize={20} radius={[0, 4, 4, 0]}>
                    {supplyData.map((_, i) => <Cell key={i} fill={i === 0 ? '#00897B' : '#0f766e'} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 fill-amber-500 text-amber-500" /> Suggested Actions
            </h3>
            <div className="flex gap-4">
              <div className="flex-1 bg-white rounded-lg p-3 border border-amber-100 shadow-sm hover:shadow-md cursor-pointer transition-shadow">
                <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">Activate WastePulse</p>
                <p className="text-sm font-bold text-neutral-900 mb-1">Broadcast +15% Price Premium</p>
                <p className="text-xs text-neutral-500">Send an instant notification to 142 collectors in Andheri to drive {qty - totalSupply}kg extra supply.</p>
              </div>
              <div className="flex-1 bg-white rounded-lg p-3 border border-amber-100 shadow-sm hover:shadow-md cursor-pointer transition-shadow">
                <p className="text-xs font-bold text-teal uppercase tracking-wider mb-1">Expand Radius</p>
                <p className="text-sm font-bold text-neutral-900 mb-1">Include Powai Zone</p>
                <p className="text-xs text-neutral-500">Powai has an estimated 180kg of {material} available over the next 7 days.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}