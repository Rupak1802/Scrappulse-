import { useState } from 'react';
import { FileText, Download, Database, CheckSquare, Calendar, Filter, FileJson, Table as TableIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Reports() {
  const [dataset, setDataset] = useState('Transactions');
  const [format, setFormat] = useState('CSV');

  return (
    <div className="flex flex-col h-full bg-neutral-50 relative pb-20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Reports & Dataset Export</h1>
          <p className="text-neutral-500">Generate compliance docs and raw data dumps</p>
        </div>
      </div>

      <div className="flex gap-6 h-[600px]">
        
        {/* Report Builder */}
        <div className="w-[350px] bg-white border border-border rounded-xl shadow-sm flex flex-col shrink-0 overflow-hidden">
          <div className="p-4 border-b border-border bg-neutral-50">
            <h2 className="font-bold text-neutral-900 flex items-center gap-2"><Database className="w-4 h-4 text-neutral-400" /> Query Builder</h2>
          </div>
          
          <div className="p-4 flex-1 overflow-y-auto space-y-5">
            
            <div>
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 block">1. Select Dataset</label>
              <select value={dataset} onChange={(e) => setDataset(e.target.value)} className="w-full bg-neutral-50 border border-border rounded-lg p-2.5 text-sm font-medium text-neutral-900 outline-none focus:border-teal">
                <option>Transactions (Ledger)</option>
                <option>Collector Reliability Scores</option>
                <option>Anomaly Resolution Log</option>
                <option>Fleet Route History</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 block">2. Date Range</label>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Calendar className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input type="text" placeholder="Start Date" defaultValue="2026-09-01" className="w-full bg-neutral-50 border border-border rounded-lg pl-8 pr-2 py-2 text-sm font-medium text-neutral-900 outline-none focus:border-teal" />
                </div>
                <div className="flex-1 relative">
                  <Calendar className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input type="text" placeholder="End Date" defaultValue="2026-09-07" className="w-full bg-neutral-50 border border-border rounded-lg pl-8 pr-2 py-2 text-sm font-medium text-neutral-900 outline-none focus:border-teal" />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>3. Columns</span>
                <span className="text-teal font-semibold cursor-pointer">Select All</span>
              </label>
              <div className="space-y-2 bg-neutral-50 p-3 rounded-lg border border-neutral-100">
                {['Transaction ID', 'Date/Time', 'Collector Name', 'Material Type', 'Weight (kg)', 'Value (INR)', 'Payment Status', 'Blockchain Hash'].map(col => (
                  <label key={col} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-teal rounded" />
                    <span className="text-sm font-medium text-neutral-700">{col}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 block">4. Export Format</label>
              <div className="flex bg-neutral-100 p-1 rounded-lg">
                {['CSV', 'JSON', 'PDF'].map(f => (
                  <button 
                    key={f}
                    onClick={() => setFormat(f)}
                    className={cn(
                      "flex-1 py-1.5 text-xs font-bold rounded-md transition-colors flex items-center justify-center gap-1.5",
                      format === f ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-900"
                    )}
                  >
                    {f === 'CSV' ? <TableIcon className="w-3.5 h-3.5" /> : f === 'JSON' ? <FileJson className="w-3.5 h-3.5" /> : <FileText className="w-3.5 h-3.5" />}
                    {f}
                  </button>
                ))}
              </div>
            </div>

          </div>
          
          <div className="p-4 border-t border-border bg-neutral-50">
            <button className="w-full bg-navy hover:bg-navy/90 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 shadow-sm transition-colors active:scale-[0.98]">
              <Download className="w-4 h-4" /> Download {format}
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-6">
          {/* Quick Reports */}
          <div className="bg-white border border-border rounded-xl shadow-sm p-4">
            <h2 className="font-bold text-neutral-900 mb-4 flex items-center gap-2"><FileText className="w-4 h-4 text-teal" /> Standard Compliance Reports</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-border rounded-lg p-3 hover:bg-neutral-50 cursor-pointer transition-colors flex items-center justify-between group">
                <div>
                  <h3 className="font-bold text-sm text-neutral-900">Monthly E-Waste Audit</h3>
                  <p className="text-xs text-neutral-500">Format required by CPCB guidelines.</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-teal group-hover:text-white transition-colors text-neutral-400">
                  <Download className="w-4 h-4" />
                </div>
              </div>
              <div className="border border-border rounded-lg p-3 hover:bg-neutral-50 cursor-pointer transition-colors flex items-center justify-between group">
                <div>
                  <h3 className="font-bold text-sm text-neutral-900">Collector KYC Dump</h3>
                  <p className="text-xs text-neutral-500">Active collectors with verified IDs.</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-teal group-hover:text-white transition-colors text-neutral-400">
                  <Download className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Data Preview */}
          <div className="bg-white border border-border rounded-xl shadow-sm flex-1 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-border bg-neutral-50 flex items-center justify-between">
              <h2 className="font-bold text-neutral-900 flex items-center gap-2"><TableIcon className="w-4 h-4 text-neutral-400" /> Live Data Preview</h2>
              <span className="text-xs font-semibold text-neutral-500">Showing top 5 rows</span>
            </div>
            
            <div className="flex-1 overflow-auto p-4">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-wider text-neutral-500 bg-white">
                    <th className="py-2 pr-4 font-semibold">TRX ID</th>
                    <th className="py-2 px-4 font-semibold">Date</th>
                    <th className="py-2 px-4 font-semibold">Collector</th>
                    <th className="py-2 px-4 font-semibold">Material</th>
                    <th className="py-2 px-4 font-semibold text-right">Weight</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-sm font-medium">
                  <tr>
                    <td className="py-2 pr-4 font-bold text-neutral-900">TRX-1092</td>
                    <td className="py-2 px-4 text-neutral-500">2026-09-07</td>
                    <td className="py-2 px-4">Ramesh K.</td>
                    <td className="py-2 px-4">Copper Wire</td>
                    <td className="py-2 px-4 text-right">15.0 kg</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-bold text-neutral-900">TRX-1091</td>
                    <td className="py-2 px-4 text-neutral-500">2026-09-06</td>
                    <td className="py-2 px-4">Suresh M.</td>
                    <td className="py-2 px-4">Aluminium</td>
                    <td className="py-2 px-4 text-right">42.0 kg</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-bold text-neutral-900">TRX-1090</td>
                    <td className="py-2 px-4 text-neutral-500">2026-09-05</td>
                    <td className="py-2 px-4">Ramesh K.</td>
                    <td className="py-2 px-4">Mixed PCBs</td>
                    <td className="py-2 px-4 text-right">8.0 kg</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-bold text-neutral-900">TRX-1089</td>
                    <td className="py-2 px-4 text-neutral-500">2026-09-03</td>
                    <td className="py-2 px-4">Arjun S.</td>
                    <td className="py-2 px-4">Batteries</td>
                    <td className="py-2 px-4 text-right">25.0 kg</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-bold text-neutral-900">TRX-1088</td>
                    <td className="py-2 px-4 text-neutral-500">2026-09-01</td>
                    <td className="py-2 px-4">Vikram B.</td>
                    <td className="py-2 px-4">Copper Bare</td>
                    <td className="py-2 px-4 text-right">12.0 kg</td>
                  </tr>
                </tbody>
              </table>
              <div className="w-full h-8 mt-2 bg-gradient-to-t from-white to-transparent relative z-10" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}