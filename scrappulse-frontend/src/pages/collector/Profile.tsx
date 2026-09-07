import { useState } from 'react';
import { User, Globe, WifiOff, Bell, Shield, ChevronLeft, LogOut, CheckCircle2, ChevronRight, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useAppStore } from '../../store';

export default function Profile() {
  const navigate = useNavigate();
  const { offlinePendingCount, setOfflinePendingCount } = useAppStore();
  const [lang, setLang] = useState('en');
  const [notifs, setNotifs] = useState({ pulse: true, price: true, tips: false });
  const [showSafety, setShowSafety] = useState(false);

  const handleSync = () => {
    // Mock sync process
    setTimeout(() => setOfflinePendingCount(0), 1500);
  };

  return (
    <div className="flex flex-col h-full bg-neutral-50 pb-24">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b border-border sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-neutral-500 hover:text-neutral-900">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="font-semibold text-neutral-900 leading-tight">Profile & Settings</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Profile Card */}
        <div className="bg-white rounded-xl border border-border p-4 shadow-sm flex items-center gap-4">
          <div className="w-16 h-16 bg-neutral-200 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm">
            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Ramesh" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-neutral-900">Ramesh Kumar</h2>
            <p className="text-sm text-neutral-500 font-medium">+91 98765 43210</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-bold bg-teal/10 text-teal px-1.5 py-0.5 rounded uppercase">Andheri East</span>
              <span className="text-[10px] font-bold bg-neutral-100 text-neutral-500 px-1.5 py-0.5 rounded uppercase">Member since '23</span>
            </div>
          </div>
        </div>

        {/* Offline Sync Panel */}
        <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
          <div className="p-4 flex items-start gap-3">
            <div className={cn("p-2 rounded-lg shrink-0", offlinePendingCount > 0 ? "bg-amber-50 text-amber-600" : "bg-green-50 text-green-600")}>
              {offlinePendingCount > 0 ? <WifiOff className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-neutral-900 text-sm">Offline Sync</h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                {offlinePendingCount > 0 
                  ? `${offlinePendingCount} transactions waiting to sync` 
                  : "All data is backed up to cloud"}
              </p>
            </div>
            {offlinePendingCount > 0 && (
              <button onClick={handleSync} className="text-xs font-bold bg-navy text-white px-3 py-1.5 rounded-lg shadow-sm">
                Sync Now
              </button>
            )}
          </div>
        </div>

        {/* Language Selector */}
        <div className="bg-white rounded-xl border border-border p-4 shadow-sm">
          <h3 className="font-bold text-neutral-900 text-sm mb-3 flex items-center gap-2">
            <Globe className="w-4 h-4 text-neutral-400" /> Language
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'en', label: 'English', preview: 'Snap & Sell' },
              { id: 'hi', label: 'हिंदी', preview: 'फोटो लें और बेचें' },
              { id: 'mr', label: 'मराठी', preview: 'फोटो काढा आणि विका' },
              { id: 'ta', label: 'தமிழ்', preview: 'படம் எடுத்து விற்கவும்' }
            ].map(l => (
              <div 
                key={l.id} 
                onClick={() => setLang(l.id)}
                className={cn(
                  "border rounded-lg p-2 text-center cursor-pointer transition-all",
                  lang === l.id ? "border-teal bg-teal/5 ring-1 ring-teal shadow-sm" : "border-border hover:bg-neutral-50"
                )}
              >
                <div className={cn("text-sm font-bold", lang === l.id ? "text-teal" : "text-neutral-900")}>{l.label}</div>
                <div className="text-[10px] text-neutral-500 mt-1 truncate px-1">{l.preview}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Guide Mock Trigger */}
        <button onClick={() => setShowSafety(true)} className="w-full bg-white rounded-xl border border-border p-4 shadow-sm flex items-center justify-between hover:bg-neutral-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="bg-orange-50 p-2 rounded-lg text-orange-600">
              <Shield className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-neutral-900 text-sm">Safety Guidelines</h3>
              <p className="text-xs text-neutral-500">Learn how to handle hazardous materials</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-neutral-400" />
        </button>

        {/* Notifications */}
        <div className="bg-white rounded-xl border border-border p-4 shadow-sm">
          <h3 className="font-bold text-neutral-900 text-sm mb-4 flex items-center gap-2">
            <Bell className="w-4 h-4 text-neutral-400" /> Notifications
          </h3>
          <div className="space-y-4">
            <Toggle label="WastePulse Alerts" desc="High demand nearby" checked={notifs.pulse} onChange={(c) => setNotifs({...notifs, pulse: c})} />
            <Toggle label="Price Drops" desc="Alert when prices fall" checked={notifs.price} onChange={(c) => setNotifs({...notifs, price: c})} />
            <Toggle label="Daily Insights" desc="Tips to maximize earnings" checked={notifs.tips} onChange={(c) => setNotifs({...notifs, tips: c})} />
          </div>
        </div>

        {/* Aggregator */}
        <div className="bg-white rounded-xl border border-border p-4 shadow-sm">
          <h3 className="font-bold text-neutral-900 text-sm mb-3">Linked Aggregator</h3>
          <div className="flex items-center justify-between bg-neutral-50 p-3 rounded-lg border border-neutral-100">
            <div>
              <p className="text-sm font-bold text-neutral-900">EcoSourced Cooperatives</p>
              <p className="text-xs text-neutral-500">ID: AGR-8492</p>
            </div>
            <button className="text-xs font-semibold text-red-600 hover:bg-red-50 px-2 py-1 rounded">Unlink</button>
          </div>
        </div>

        {/* Logout */}
        <button className="w-full bg-white rounded-xl border border-red-100 p-4 shadow-sm flex items-center justify-center gap-2 text-red-600 font-bold hover:bg-red-50 transition-colors">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>

      {/* Safety Modal (Sheet style) */}
      {showSafety && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" onClick={() => setShowSafety(false)} />
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 p-5 shadow-2xl animate-in slide-in-from-bottom-full duration-300 max-h-[85vh] overflow-y-auto">
            <div className="w-12 h-1 bg-neutral-200 rounded-full mx-auto mb-4" />
            <div className="flex items-start gap-3 mb-4">
              <div className="bg-red-50 p-2.5 rounded-full shrink-0">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-lg font-black text-neutral-900">Hazard: PVC Burning</h2>
                <p className="text-sm text-neutral-500 font-medium">Burning copper wire insulation is highly toxic and illegal.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-red-50/50 border border-red-100 rounded-xl p-3">
                <h3 className="text-xs font-bold text-red-800 uppercase tracking-wider mb-2">DON'T</h3>
                <ul className="text-xs text-red-900 space-y-1.5 font-medium list-disc pl-3">
                  <li>Burn wires to extract copper</li>
                  <li>Use acid baths in unventilated areas</li>
                </ul>
              </div>
              <div className="bg-green-50/50 border border-green-100 rounded-xl p-3">
                <h3 className="text-xs font-bold text-green-800 uppercase tracking-wider mb-2">DO</h3>
                <ul className="text-xs text-green-900 space-y-1.5 font-medium list-disc pl-3">
                  <li>Use a mechanical wire stripper</li>
                  <li>Sell insulated wire directly</li>
                </ul>
              </div>
            </div>

            <div className="bg-navy text-white rounded-xl p-4 mb-6 shadow-sm">
              <h3 className="text-sm font-bold mb-1">Safer Alternative Available</h3>
              <p className="text-xs text-white/80 mb-3">EcoTech Recycling has a mechanical stripper. They buy insulated wire at a premium.</p>
              <div className="flex justify-between items-center bg-white/10 p-2 rounded-lg">
                <span className="text-xs font-semibold">Insulated Wire Rate</span>
                <span className="text-sm font-black text-teal">₹68/kg</span>
              </div>
            </div>

            <button onClick={() => setShowSafety(false)} className="w-full bg-primary-green hover:bg-primary-green/90 text-white font-bold py-3.5 rounded-xl transition-transform active:scale-[0.98]">
              I Understand
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function Toggle({ label, desc, checked, onChange }: { label: string, desc: string, checked: boolean, onChange: (c: boolean) => void }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-sm font-bold text-neutral-900">{label}</h4>
        <p className="text-xs text-neutral-500">{desc}</p>
      </div>
      <button 
        onClick={() => onChange(!checked)}
        className={cn("w-10 h-6 rounded-full transition-colors relative", checked ? "bg-teal" : "bg-neutral-200")}
      >
        <div className={cn("w-4 h-4 bg-white rounded-full absolute top-1 transition-all", checked ? "left-5" : "left-1")} />
      </button>
    </div>
  );
}