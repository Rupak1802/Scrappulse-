import { useState } from 'react';
import { Shield, ShieldAlert, ShieldCheck, Trophy, TrendingUp, AlertOctagon, UserX, UserCheck } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { cn } from '../../lib/utils';

const COLLECTORS = [
  { id: 'C-101', name: 'Ramesh K.', score: 98, anomalies: 0.5, volume: 1450, rank: 1, status: 'Trusted' },
  { id: 'C-102', name: 'Suresh M.', score: 94, anomalies: 1.2, volume: 920, rank: 2, status: 'Trusted' },
  { id: 'C-103', name: 'Arjun S.', score: 85, anomalies: 3.5, volume: 2100, rank: 14, status: 'Warning' },
  { id: 'C-104', name: 'Vikram B.', score: 62, anomalies: 8.4, volume: 450, rank: 89, status: 'At Risk' },
];

const radarData = [
  { subject: 'Volume', A: 90, fullMark: 100 },
  { subject: 'Quality', A: 98, fullMark: 100 },
  { subject: 'Punctuality', A: 95, fullMark: 100 },
  { subject: 'Honesty', A: 100, fullMark: 100 },
  { subject: 'Safety', A: 85, fullMark: 100 },
];

export default function Reliability() {
  const [selectedCollector, setSelectedCollector] = useState(COLLECTORS[0]);

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Reliability & Trust Score</h1>
          <p className="text-neutral-500">Monitor actor behavior and enforce network quality</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-border rounded-xl shadow-sm p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-neutral-500 uppercase">Avg Collector Score</p>
            <p className="text-3xl font-black text-neutral-900 mt-1">92<span className="text-lg text-neutral-400">/100</span></p>
          </div>
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center"><ShieldCheck className="w-8 h-8 text-green-600" /></div>
        </div>
        <div className="bg-white border border-border rounded-xl shadow-sm p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-neutral-500 uppercase">Avg Facility Score</p>
            <p className="text-3xl font-black text-neutral-900 mt-1">96<span className="text-lg text-neutral-400">/100</span></p>
          </div>
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center"><Shield className="w-8 h-8 text-blue-600" /></div>
        </div>
        <div className="bg-white border border-border rounded-xl shadow-sm p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-neutral-500 uppercase">Network Anomalies</p>
            <p className="text-3xl font-black text-red-600 mt-1">2.4<span className="text-lg text-red-400">%</span></p>
          </div>
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center"><ShieldAlert className="w-8 h-8 text-red-600" /></div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 h-auto md:h-[500px]">
        
        {/* Leaderboard Table */}
        <div className="flex-[2] bg-white border border-border rounded-xl shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border bg-neutral-50 flex items-center justify-between">
            <h2 className="font-bold text-neutral-900 flex items-center gap-2"><Trophy className="w-4 h-4 text-amber-500" /> Collector Rankings</h2>
          </div>
          
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-white border-b border-border shadow-sm z-10">
                <tr className="text-xs uppercase tracking-wider text-neutral-500">
                  <th className="p-4 font-semibold">Rank</th>
                  <th className="p-4 font-semibold">Collector</th>
                  <th className="p-4 font-semibold text-center">Trust Score</th>
                  <th className="p-4 font-semibold text-center">Anomaly Rate</th>
                  <th className="p-4 font-semibold text-right">30-Day Vol.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {COLLECTORS.map((c) => (
                  <tr 
                    key={c.id} 
                    onClick={() => setSelectedCollector(c)}
                    className={cn(
                      "hover:bg-neutral-50/50 cursor-pointer transition-colors",
                      selectedCollector.id === c.id && "bg-teal/5 border-l-4 border-teal"
                    )}
                  >
                    <td className="p-4 font-bold text-neutral-900">
                      {c.rank <= 3 ? <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs">#{c.rank}</span> : `#${c.rank}`}
                    </td>
                    <td className="p-4 font-bold text-neutral-700">{c.name}</td>
                    <td className="p-4 text-center">
                      <span className={cn("font-black text-lg", c.score >= 90 ? "text-green-600" : c.score >= 70 ? "text-amber-600" : "text-red-600")}>{c.score}</span>
                    </td>
                    <td className="p-4 text-center text-sm font-semibold text-neutral-600">{c.anomalies}%</td>
                    <td className="p-4 text-right text-sm font-bold text-neutral-900">{c.volume}kg</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Profile Card */}
        <div className="flex-1 bg-white border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border bg-navy text-white text-center relative">
            <div className="w-16 h-16 bg-white rounded-full mx-auto mb-2 border-4 border-navy shadow-md overflow-hidden flex items-center justify-center font-black text-neutral-900 text-xl">
              {selectedCollector.name.substring(0,2).toUpperCase()}
            </div>
            <h3 className="font-bold text-lg">{selectedCollector.name}</h3>
            <p className="text-white/70 text-xs">{selectedCollector.id}</p>
            
            <div className="absolute top-4 right-4">
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded",
                selectedCollector.status === 'Trusted' ? "bg-green-500/20 text-green-300 border border-green-500/30" : 
                selectedCollector.status === 'Warning' ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" : 
                "bg-red-500/20 text-red-300 border border-red-500/30"
              )}>{selectedCollector.status}</span>
            </div>
          </div>

          <div className="flex-1 p-4 flex flex-col justify-between">
            <div className="h-48 w-full -mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="#e5e5e5" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#737373', fontSize: 10, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name={selectedCollector.name} dataKey="A" stroke="#00897B" strokeWidth={2} fill="#00897B" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-100 text-center">
                <p className="text-[10px] font-bold text-neutral-500 uppercase mb-1">Disputes Won</p>
                <p className="text-lg font-black text-neutral-900">14/15</p>
              </div>
              <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-100 text-center">
                <p className="text-[10px] font-bold text-neutral-500 uppercase mb-1">Avg Rating</p>
                <p className="text-lg font-black text-neutral-900">4.9/5</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-white border border-border hover:bg-neutral-50 text-neutral-700 font-bold py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors shadow-sm">
                <UserCheck className="w-4 h-4 text-green-600" /> Endorse
              </button>
              <button className="flex-1 bg-white border border-red-200 hover:bg-red-50 text-red-600 font-bold py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors shadow-sm">
                <UserX className="w-4 h-4" /> Suspend
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}