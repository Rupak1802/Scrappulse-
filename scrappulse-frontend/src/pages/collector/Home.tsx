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
    <div className="flex flex-col gap-6 p-4 lg:p-8 pb-8 max-w-md lg:max-w-none mx-auto">
      {/* Greeting Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 lg:gap-4">
          <div className="w-12 h-12 lg:w-16 lg:h-16 bg-neutral-200 rounded-full overflow-hidden shrink-0 shadow-sm border-2 border-white">
            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-xl lg:text-3xl font-black text-neutral-900 leading-tight mb-1">Hi, Ramesh 👋</h2>
            <p className="text-sm lg:text-base text-neutral-500 font-medium">Andheri East Zone</p>
          </div>
        </div>
        <div className="bg-neutral-100 px-3 py-1.5 rounded-lg text-xs lg:text-sm font-semibold text-neutral-600 border border-neutral-200">
          EN / HI
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 flex flex-col gap-6">
          {/* WastePulse Alert Card */}
          {activePulsesCount > 0 && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-10">
                <Zap className="w-24 h-24 lg:w-32 lg:h-32" />
              </div>
              <div className="flex items-start gap-4 relative z-10">
                <div className="bg-amber-100 p-3 rounded-full shrink-0 shadow-inner">
                  <Zap className="w-6 h-6 text-amber-600 fill-amber-600 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-amber-900 mb-1">High Demand: Copper Wire</h3>
                  <p className="text-sm text-amber-800 leading-relaxed mb-4 max-w-md">
                    Recyclers in MIDC are paying <span className="font-bold bg-amber-200/50 px-1 rounded">+15% above average</span> today.
                  </p>
                  <Link to="/collector/opportunity-map" className="inline-flex items-center gap-1 text-sm font-bold text-amber-800 bg-amber-200 hover:bg-amber-300 px-4 py-2 rounded-full transition-colors shadow-sm">
                    See Opportunity Map <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Primary CTA */}
          <Link 
            to="/collector/sell" 
            className="bg-primary-green hover:bg-primary-green/90 text-white rounded-3xl p-6 lg:p-8 shadow-xl shadow-primary-green/20 flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-4 lg:gap-6 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="bg-white/20 p-4 lg:p-6 rounded-full shadow-inner">
              <Camera className="w-10 h-10 lg:w-12 lg:h-12" />
            </div>
            <div className="text-center lg:text-left">
              <h2 className="text-2xl lg:text-3xl font-black mb-1 lg:mb-2">Snap & Sell</h2>
              <p className="text-primary-green-100 text-sm lg:text-base font-medium">Get an instant AI valuation for your scrap</p>
            </div>
            <div className="hidden lg:flex ml-auto w-12 h-12 bg-white/10 rounded-full items-center justify-center">
              <ChevronRight className="w-6 h-6 text-white" />
            </div>
          </Link>

          <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-6 mt-2">
            {/* Opportunity Score */}
            <div className="bg-white border border-border rounded-2xl p-5 shadow-sm flex flex-col items-center text-center">
              <h3 className="text-sm lg:text-base font-bold text-neutral-500 w-full text-left mb-2">Today's Score</h3>
              <div className="h-24 lg:h-32 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" barSize={10} data={opportunityData} startAngle={180} endAngle={0}>
                    <RadialBar background dataKey="value" cornerRadius={10} />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-end justify-center pb-2 lg:pb-4">
                  <span className="text-3xl lg:text-4xl font-black text-teal">82</span>
                  <span className="text-sm font-bold text-neutral-400 mb-1 ml-0.5">/100</span>
                </div>
              </div>
              <p className="text-xs lg:text-sm font-bold text-neutral-600 mt-2 bg-neutral-50 px-3 py-1.5 rounded-full">Expected: ₹800 - ₹1.2k</p>
            </div>

            {/* Weekly Earnings Sparkline */}
            <div className="bg-white border border-border rounded-2xl p-5 shadow-sm flex flex-col">
              <div className="flex items-start justify-between w-full mb-1">
                <h3 className="text-sm lg:text-base font-bold text-neutral-500">Weekly</h3>
                <span className="bg-teal/10 text-teal px-2 py-1 rounded text-[10px] lg:text-xs font-black flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4" /> +12%
                </span>
              </div>
              <div>
                <span className="text-2xl lg:text-3xl font-black text-neutral-900">₹4,050</span>
              </div>
              <div className="h-16 lg:h-24 w-full mt-auto">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={earningsData}>
                    <YAxis domain={['dataMin - 100', 'dataMax + 100']} hide />
                    <Line type="monotone" dataKey="value" stroke="#00897B" strokeWidth={4} dot={false} isAnimationActive={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Sidebar on Desktop */}
        <div className="w-full lg:w-80 shrink-0 flex flex-col gap-6 mt-2 lg:mt-0">
          {/* Best Recycler Card */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-neutral-900 text-lg">Best Recycler Near You</h3>
              <Link to="/collector/recyclers" className="text-sm font-bold text-teal hover:underline">View all</Link>
            </div>
            <div className="bg-white border border-border rounded-2xl p-5 shadow-sm flex items-center justify-between group cursor-pointer hover:border-teal/30 transition-colors">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-bold text-neutral-900 group-hover:text-teal transition-colors">EcoTech Recycling</h4>
                  <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                </div>
                <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4 text-sm text-neutral-500 font-medium">
                  <span className="flex items-center gap-1.5"><Map className="w-4 h-4 text-neutral-400" /> 2.4 km</span>
                  <span className="flex items-center gap-1.5"><AlertCircle className="w-4 h-4 text-teal" /> 98% Reliable</span>
                </div>
              </div>
              <div className="text-right shrink-0 ml-2">
                <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">Mixed E-Waste</div>
                <div className="text-lg font-black text-teal">₹68/kg</div>
              </div>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div>
            <h3 className="font-bold text-neutral-900 text-lg mb-4">Quick Actions</h3>
            <div className="grid grid-cols-3 gap-3">
              <ShortcutCard to="/collector/simulator" icon={<TrendingUp className="text-blue-500" />} label="What-If Simulator" color="bg-blue-50" />
              <ShortcutCard to="/collector/fair-deal" icon={<Scale className="text-purple-500" />} label="FairDeal Check" color="bg-purple-50" />
              <ShortcutCard to="/collector/profile" icon={<BookOpen className="text-orange-500" />} label="Safety Guide" color="bg-orange-50" />
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h3 className="font-bold text-neutral-900 text-lg mb-4">Recent Activity</h3>
            <div className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden">
              <ActivityRow material="15kg Copper Wire" recycler="MetalCorp" amount="₹4,200" status="Paid" date="Today" />
              <div className="border-t border-border" />
              <ActivityRow material="40kg Mixed PCBs" recycler="EcoTech" amount="₹2,400" status="Pending" date="Yesterday" />
              <div className="border-t border-border" />
              <ActivityRow material="8kg Batteries" recycler="SafeDispose" amount="₹560" status="Paid" date="Sep 4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShortcutCard({ to, icon, label, color }: { to: string, icon: React.ReactNode, label: string, color: string }) {
  return (
    <Link to={to} className="border border-border bg-white rounded-2xl p-4 flex flex-col items-center text-center gap-3 shadow-sm hover:shadow-md hover:border-neutral-300 active:scale-95 transition-all">
      <div className={`p-3 rounded-xl ${color}`}>
        {icon}
      </div>
      <span className="text-xs font-bold leading-tight text-neutral-700">{label}</span>
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