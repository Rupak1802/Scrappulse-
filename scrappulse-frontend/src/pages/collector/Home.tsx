import { Camera, Map, TrendingUp, AlertCircle, Sparkles, Scale, BookOpen, ChevronRight, Zap } from 'lucide-react';
import { RadialBarChart, RadialBar, ResponsiveContainer, LineChart, Line, YAxis } from 'recharts';
import { Link } from 'react-router-dom';
import { useAppStore } from '../../store';

const opportunityData = [{ name: 'Score', value: 82, fill: '#00897B' }];
const earningsData = [
  { day: 'M', value: 450 }, { day: 'T', value: 520 }, { day: 'W', value: 480 },
  { day: 'T', value: 610 }, { day: 'F', value: 590 }, { day: 'S', value: 720 }, { day: 'S', value: 680 }
];

export default function Home() {
  const { activePulsesCount } = useAppStore();

  return (
    <div className="flex flex-col gap-4 p-4 pb-8 max-w-md mx-auto">
      {/* Greeting Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-neutral-200 rounded-full overflow-hidden shrink-0">
            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-neutral-900 leading-tight">Hi, Ramesh 👋</h2>
            <p className="text-sm text-neutral-500 font-medium">Andheri East Zone</p>
          </div>
        </div>
        <div className="bg-neutral-100 px-2 py-1 rounded text-xs font-semibold text-neutral-600 border border-neutral-200">
          EN / HI
        </div>
      </div>

      {/* WastePulse Alert Card */}
      {activePulsesCount > 0 && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-10">
            <Zap className="w-16 h-16" />
          </div>
          <div className="flex items-start gap-3 relative z-10">
            <div className="bg-amber-100 p-2 rounded-full shrink-0">
              <Zap className="w-5 h-5 text-amber-600 fill-amber-600" />
            </div>
            <div>
              <h3 className="font-bold text-amber-900">High Demand: Copper Wire</h3>
              <p className="text-sm text-amber-800 mt-0.5 leading-snug">
                Recyclers in MIDC are paying <span className="font-bold">+15% above average</span> today.
              </p>
              <Link to="/collector/opportunity-map" className="inline-flex items-center gap-1 mt-3 text-sm font-bold text-amber-700 bg-amber-200/50 hover:bg-amber-200 px-3 py-1.5 rounded-full transition-colors">
                See Opportunity Map <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Primary CTA */}
      <Link 
        to="/collector/sell" 
        className="bg-primary-green hover:bg-primary-green/90 text-white rounded-2xl p-5 shadow-lg shadow-primary-green/20 flex flex-col items-center justify-center gap-3 transition-transform active:scale-[0.98]"
      >
        <div className="bg-white/20 p-4 rounded-full">
          <Camera className="w-8 h-8" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold">Snap & Sell</h2>
          <p className="text-primary-green-100 text-sm mt-1">Get an instant AI valuation</p>
        </div>
      </Link>

      <div className="grid grid-cols-2 gap-4 mt-2">
        {/* Opportunity Score */}
        <div className="bg-white border border-border rounded-xl p-4 shadow-sm flex flex-col items-center text-center">
          <h3 className="text-sm font-semibold text-neutral-500 w-full text-left">Today's Score</h3>
          <div className="h-24 w-full mt-2 relative">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" barSize={10} data={opportunityData} startAngle={180} endAngle={0}>
                <RadialBar background clockWise dataKey="value" cornerRadius={10} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-end justify-center pb-2">
              <span className="text-2xl font-bold text-teal">82</span>
              <span className="text-xs text-neutral-400 mb-1 ml-0.5">/100</span>
            </div>
          </div>
          <p className="text-xs font-medium text-neutral-600 mt-2">Expected: ₹800 - ₹1.2k</p>
        </div>

        {/* Weekly Earnings Sparkline */}
        <div className="bg-white border border-border rounded-xl p-4 shadow-sm flex flex-col">
          <div className="flex items-start justify-between w-full">
            <h3 className="text-sm font-semibold text-neutral-500">Weekly</h3>
            <span className="bg-teal/10 text-teal px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +12%
            </span>
          </div>
          <div className="mt-1">
            <span className="text-lg font-bold text-neutral-900">₹4,050</span>
          </div>
          <div className="h-16 w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={earningsData}>
                <YAxis domain={['dataMin - 100', 'dataMax + 100']} hide />
                <Line type="monotone" dataKey="value" stroke="#00897B" strokeWidth={3} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Best Recycler Card */}
      <div className="mt-2">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-neutral-900">Best Recycler Near You</h3>
          <Link to="/collector/recyclers" className="text-sm font-semibold text-teal hover:underline">View all</Link>
        </div>
        <div className="bg-white border border-border rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-neutral-900">EcoTech Recycling</h4>
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            </div>
            <div className="flex items-center gap-3 mt-1.5 text-sm text-neutral-500 font-medium">
              <span className="flex items-center gap-1"><Map className="w-3.5 h-3.5" /> 2.4 km</span>
              <span className="flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5 text-teal" /> 98% Reliable</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-neutral-500">Mixed E-Waste</div>
            <div className="font-bold text-teal">₹68/kg</div>
          </div>
        </div>
      </div>

      {/* Quick Shortcuts */}
      <div className="mt-2">
        <h3 className="font-bold text-neutral-900 mb-3">Quick Actions</h3>
        <div className="flex gap-3 overflow-x-auto pb-2 snap-x hide-scrollbar">
          <ShortcutCard to="/collector/simulator" icon={<TrendingUp className="text-blue-500" />} label="What-If Simulator" color="bg-blue-50" />
          <ShortcutCard to="/collector/fair-deal" icon={<Scale className="text-purple-500" />} label="FairDeal Check" color="bg-purple-50" />
          <ShortcutCard to="/collector/profile" icon={<BookOpen className="text-orange-500" />} label="Safety Guide" color="bg-orange-50" />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-2">
        <h3 className="font-bold text-neutral-900 mb-3">Recent Activity</h3>
        <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden">
          <ActivityRow material="15kg Copper Wire" recycler="MetalCorp" amount="₹4,200" status="Paid" date="Today" />
          <div className="border-t border-border" />
          <ActivityRow material="40kg Mixed PCBs" recycler="EcoTech" amount="₹2,400" status="Pending" date="Yesterday" />
          <div className="border-t border-border" />
          <ActivityRow material="8kg Batteries" recycler="SafeDispose" amount="₹560" status="Paid" date="Sep 4" />
        </div>
      </div>
    </div>
  );
}

function ShortcutCard({ to, icon, label, color }: { to: string, icon: React.ReactNode, label: string, color: string }) {
  return (
    <Link to={to} className="snap-start shrink-0 w-32 border border-border bg-white rounded-xl p-3 flex flex-col items-start gap-3 shadow-sm active:scale-95 transition-transform">
      <div className={`p-2 rounded-lg ${color}`}>
        {icon}
      </div>
      <span className="text-xs font-semibold leading-tight text-neutral-700">{label}</span>
    </Link>
  );
}

function ActivityRow({ material, recycler, amount, status, date }: { material: string, recycler: string, amount: string, status: 'Paid' | 'Pending', date: string }) {
  return (
    <div className="p-4 flex items-center justify-between hover:bg-neutral-50 transition-colors">
      <div>
        <h4 className="font-bold text-sm text-neutral-900">{material}</h4>
        <p className="text-xs text-neutral-500 mt-0.5">{recycler} • {date}</p>
      </div>
      <div className="text-right">
        <div className="font-bold text-sm text-neutral-900">{amount}</div>
        <div className={`text-[10px] font-bold uppercase tracking-wider mt-1 inline-block px-1.5 py-0.5 rounded ${status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
          {status}
        </div>
      </div>
    </div>
  );
}