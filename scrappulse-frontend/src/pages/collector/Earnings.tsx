import { useState } from 'react';
import { IndianRupee, TrendingUp, AlertTriangle, ArrowUpRight, Search, FileDown, Info } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { cn } from '../../lib/utils';

const earningsData = [
  { date: 'Sep 1', amount: 1200 },
  { date: 'Sep 2', amount: 900 },
  { date: 'Sep 3', amount: 1500 },
  { date: 'Sep 4', amount: 800 },
  { date: 'Sep 5', amount: 2100 },
  { date: 'Sep 6', amount: 1700 },
  { date: 'Sep 7', amount: 2400 },
];

const LEDGER = [
  { id: 'TRX-1092', date: 'Sep 7', material: 'Copper Wire', weight: 15, recycler: 'EcoTech', price: 1020, status: 'Paid' },
  { id: 'TRX-1091', date: 'Sep 6', material: 'Aluminium', weight: 42, recycler: 'MetalCorp', price: 4200, status: 'Paid' },
  { id: 'TRX-1090', date: 'Sep 5', material: 'Mixed PCBs', weight: 8, recycler: 'GreenEarth', price: 1600, status: 'Pending' },
  { id: 'TRX-1089', date: 'Sep 3', material: 'Batteries', weight: 25, recycler: 'EcoTech', price: 1250, status: 'Paid' },
  { id: 'TRX-1088', date: 'Sep 1', material: 'Copper Bare', weight: 12, recycler: 'SafeDispose', price: 900, status: 'Paid' },
];

export default function Earnings() {
  const [filter, setFilter] = useState('Week');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const filteredLedger = statusFilter === 'All' ? LEDGER : LEDGER.filter(l => l.status === statusFilter);

  return (
    <div className="flex flex-col min-h-full bg-neutral-50 pb-20">
      <div className="p-4 space-y-4">
        
        {/* Header Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-3 rounded-xl border border-border shadow-sm flex flex-col justify-between h-24">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Avg Daily Income</span>
            <div>
              <span className="text-xl font-black text-neutral-900">₹1,450</span>
              <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1 py-0.5 rounded ml-2">+12%</span>
            </div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-border shadow-sm flex flex-col justify-between h-24">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Best Material</span>
            <div>
              <span className="text-lg font-bold text-neutral-900 leading-tight block">Copper Wire</span>
              <span className="text-xs text-teal font-medium block">42% of revenue</span>
            </div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-border shadow-sm flex flex-col justify-between h-24">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Avg Pay Delay</span>
            <div>
              <span className="text-lg font-bold text-neutral-900 leading-tight block">1.2 Days</span>
              <span className="text-[10px] text-amber-600 bg-amber-50 px-1 py-0.5 rounded font-medium block w-fit mt-1">Slightly High</span>
            </div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-border shadow-sm flex flex-col justify-between h-24">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Best Zone</span>
            <div>
              <span className="text-lg font-bold text-neutral-900 leading-tight block">Andheri E.</span>
              <span className="text-[10px] font-bold text-neutral-500 mt-1 block">Usually 2PM-5PM</span>
            </div>
          </div>
        </div>

        {/* Hold/Sell Guidance */}
        <div className="bg-navy rounded-xl p-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <TrendingUp className="w-16 h-16 text-white" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-teal text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Strong Buy Signal</span>
            </div>
            <h3 className="text-white font-bold text-lg leading-tight mb-1">Sell Copper & PCBs Today</h3>
            <p className="text-white/70 text-sm leading-snug mb-4">Prices are peaking at ₹68/kg in MIDC. We predict a 5% drop by tomorrow afternoon.</p>
            <button className="bg-white text-navy font-bold text-sm px-4 py-2 rounded-lg hover:bg-neutral-100 transition-colors">
              Find Recyclers Now
            </button>
          </div>
        </div>

        {/* Earnings Chart */}
        <div className="bg-white rounded-xl border border-border p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-neutral-900">Earnings History</h3>
            <div className="flex bg-neutral-100 p-1 rounded-lg">
              {['Week', 'Month', '3M'].map(f => (
                <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "px-3 py-1 text-xs font-semibold rounded-md transition-colors",
                    filter === f ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={earningsData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00897B" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00897B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#737373' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#737373' }} />
                <CartesianGrid vertical={false} stroke="#e5e5e5" strokeDasharray="3 3" />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#171717' }}
                  itemStyle={{ fontSize: '14px', fontWeight: 'bold', color: '#00897B' }}
                />
                <Area type="monotone" dataKey="amount" stroke="#00897B" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Insights */}
        <div className="space-y-2">
          <h3 className="font-bold text-neutral-900 px-1">AI Insights</h3>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-900 leading-snug">
              <span className="font-bold block mb-0.5">Payment Delay Warning</span>
              GreenEarth Recycling is currently taking 3-4 days to pay. Consider switching to EcoTech.
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-sm text-blue-900 leading-snug">
              <span className="font-bold block mb-0.5">Route Optimization</span>
              You frequently visit MIDC twice a day. Consolidating trips could save you ₹300/week in fuel.
            </p>
          </div>
        </div>

        {/* Full Ledger */}
        <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="font-bold text-neutral-900">Transaction Ledger</h3>
            <button className="p-1.5 bg-neutral-100 rounded-lg text-neutral-600 hover:bg-neutral-200 transition-colors">
              <FileDown className="w-4 h-4" />
            </button>
          </div>
          
          <div className="p-3 border-b border-border bg-neutral-50 flex items-center gap-2 overflow-x-auto hide-scrollbar">
            {['All', 'Paid', 'Pending'].map(s => (
              <button 
                key={s}
                onClick={() => setStatusFilter(s)}
                className={cn(
                  "px-3 py-1 text-xs font-semibold rounded-full border whitespace-nowrap transition-colors",
                  statusFilter === s ? "bg-navy text-white border-navy" : "bg-white text-neutral-600 border-border hover:bg-neutral-50"
                )}
              >
                {s}
              </button>
            ))}
            <div className="ml-auto relative flex items-center">
              <Search className="w-3.5 h-3.5 absolute left-2 text-neutral-400" />
              <input type="text" placeholder="Search..." className="w-28 pl-7 pr-2 py-1 text-xs rounded border border-border outline-none focus:border-teal" />
            </div>
          </div>

          <div className="divide-y divide-border">
            {filteredLedger.map((row, i) => (
              <div key={i} className="p-3 flex items-center justify-between hover:bg-neutral-50 transition-colors cursor-pointer">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-bold text-sm text-neutral-900">{row.material}</span>
                    <span className="text-[10px] text-neutral-400 font-medium bg-neutral-100 px-1.5 py-0.5 rounded">{row.weight}kg</span>
                  </div>
                  <div className="text-xs text-neutral-500 font-medium">
                    {row.date} • {row.recycler}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-neutral-900 text-sm">₹{row.price.toLocaleString()}</div>
                  <div className={cn(
                    "text-[10px] font-bold uppercase tracking-wider mt-1 inline-block px-1.5 py-0.5 rounded",
                    row.status === 'Paid' ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                  )}>
                    {row.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 bg-neutral-50 text-center border-t border-border">
            <button className="text-xs font-bold text-teal hover:underline">Load More</button>
          </div>
        </div>

      </div>
    </div>
  );
}
