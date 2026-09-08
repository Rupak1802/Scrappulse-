import { Camera, Map, TrendingUp, AlertCircle, Sparkles, Scale, BookOpen, ChevronRight, Zap } from 'lucide-react';
import { RadialBarChart, RadialBar, ResponsiveContainer, LineChart, Line, YAxis, XAxis, Tooltip, CartesianGrid } from 'recharts';
import { Link } from 'react-router-dom';
import { useAppStore } from '../../store';
import LanguageSwitcher from '../../components/common/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const opportunityData = [{ name: 'Score', value: 82, fill: '#0d9488' }]; // teal-600
const earningsData = [
  { day: 'Mon', value: 450 }, { day: 'Tue', value: 520 }, { day: 'Wed', value: 480 },
  { day: 'Thu', value: 610 }, { day: 'Fri', value: 590 }, { day: 'Sat', value: 720 }, { day: 'Sun', value: 680 }
];

export default function Home() {
  const { t } = useTranslation();
  const { activePulsesCount } = useAppStore();

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-8 pb-8 max-w-md lg:max-w-none mx-auto relative z-10">
      {/* Greeting Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 lg:gap-4">
          <div className="w-12 h-12 lg:w-16 lg:h-16 bg-neutral-200 rounded-full overflow-hidden shrink-0 shadow-lg border-2 border-white/80 backdrop-blur-sm">
            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-xl lg:text-3xl font-black text-neutral-900 leading-tight mb-1">{t('home.greeting')}</h2>
            <p className="text-sm lg:text-base text-neutral-500 font-medium">{t('home.zone')}</p>
          </div>
        </div>
        <LanguageSwitcher />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 flex flex-col gap-6">
          {/* WastePulse Alert Card */}
          {activePulsesCount > 0 && (
            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-xl border border-amber-200/50 rounded-3xl p-6 shadow-[0_8px_32px_rgba(251,191,36,0.1)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 opacity-20 transition-transform group-hover:scale-110 duration-500">
                <Zap className="w-32 h-32 text-amber-500" />
              </div>
              <div className="flex items-start gap-4 relative z-10">
                <div className="bg-amber-100/80 backdrop-blur-sm p-3 rounded-2xl shrink-0 shadow-inner border border-amber-200">
                  <Zap className="w-6 h-6 text-amber-600 fill-amber-600 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-amber-900 mb-1">{t('home.highDemand')}</h3>
                  <p className="text-sm text-amber-800 leading-relaxed mb-4 max-w-md">
                    {t('home.demandSub')}
                  </p>
                  <Link to="/collector/opportunity-map" className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-900 bg-amber-300/80 backdrop-blur-sm hover:bg-amber-300 px-5 py-2.5 rounded-xl transition-colors shadow-sm">
                    {t('home.seeMap')} <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Primary CTA */}
          <Link 
            to="/collector/sell" 
            className="bg-primary-green/90 backdrop-blur-xl hover:bg-primary-green text-white rounded-[2rem] p-6 lg:p-8 shadow-[0_8px_32px_rgba(0,137,123,0.3)] border border-white/20 flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-4 lg:gap-6 transition-all hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
          >
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none group-hover:bg-white/20 transition-colors duration-500" />
            <div className="bg-white/20 backdrop-blur-md p-4 lg:p-6 rounded-2xl shadow-inner border border-white/10 relative z-10">
              <Camera className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
            </div>
            <div className="text-center lg:text-left relative z-10">
              <h2 className="text-2xl lg:text-3xl font-black mb-1 lg:mb-2 text-white">{t('home.snapSell')}</h2>
              <p className="text-primary-green-50 text-sm lg:text-base font-medium">{t('home.snapSellSub')}</p>
            </div>
            <div className="hidden lg:flex ml-auto w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full items-center justify-center border border-white/10 relative z-10 group-hover:bg-white/20 transition-colors">
              <ChevronRight className="w-6 h-6 text-white" />
            </div>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mt-2">
            {/* Opportunity Score */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.04)] flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-2xl" />
              <h3 className="text-sm lg:text-base font-bold text-neutral-500 w-full text-left mb-2 relative z-10">{t('home.creditScore')}</h3>
              <div className="h-32 lg:h-40 w-full relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" barSize={12} data={opportunityData} startAngle={180} endAngle={0}>
                    <RadialBar background={{ fill: 'rgba(0,0,0,0.05)' }} dataKey="value" cornerRadius={10} />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-end justify-center pb-4 lg:pb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl lg:text-5xl font-black text-teal-600 drop-shadow-sm">82</span>
                    <span className="text-sm font-bold text-neutral-400 ml-1">/100</span>
                  </div>
                </div>
              </div>
              <p className="text-xs lg:text-sm font-bold text-teal-700 mt-2 bg-teal-500/10 backdrop-blur-sm px-4 py-2 rounded-xl relative z-10 border border-teal-500/10">{t('home.statusExcellent')}</p>
            </div>

            {/* Weekly Earnings Area Chart */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.04)] flex flex-col relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-2xl" />
              <div className="flex items-start justify-between w-full mb-2 relative z-10">
                <h3 className="text-sm lg:text-base font-bold text-neutral-500">{t('home.weeklyEarnings')}</h3>
                <span className="bg-emerald-500/10 backdrop-blur-sm text-emerald-600 border border-emerald-500/20 px-2.5 py-1 rounded-lg text-xs font-black flex items-center gap-1 shadow-sm">
                  <TrendingUp className="w-3.5 h-3.5" /> +12%
                </span>
              </div>
              <div className="relative z-10">
                <span className="text-3xl lg:text-4xl font-black text-neutral-900 drop-shadow-sm">₹4,050</span>
              </div>
              <div className="h-28 lg:h-32 w-full mt-auto relative z-10 -mx-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={earningsData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#888' }} dy={10} />
                    <YAxis hide domain={['dataMin - 100', 'dataMax + 100']} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', fontWeight: 'bold' }} 
                      itemStyle={{ color: '#0d9488' }}
                      formatter={(value) => [`₹${value}`, 'Earnings']}
                    />
                    <Line type="monotone" dataKey="value" stroke="#0d9488" strokeWidth={4} dot={false} activeDot={{ r: 6, strokeWidth: 0, fill: '#0d9488' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Sidebar on Desktop */}
        <div className="w-full lg:w-[340px] shrink-0 flex flex-col gap-6 mt-2 lg:mt-0 relative z-10">
          {/* Best Recycler Card */}
          <div>
            <div className="flex items-center justify-between mb-4 px-1">
              <h3 className="font-black text-neutral-900 text-lg">{t('home.bestRecycler')}</h3>
              <Link to="/collector/recyclers" className="text-sm font-bold text-teal-600 hover:text-teal-700 transition-colors">{t('home.viewAll')}</Link>
            </div>
            <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.04)] flex items-center justify-between group cursor-pointer hover:bg-white/80 transition-all hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-black text-lg text-neutral-900 group-hover:text-teal-600 transition-colors">EcoTech Recycling</h4>
                  <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                </div>
                <div className="flex flex-col gap-2 text-sm text-neutral-500 font-medium">
                  <span className="flex items-center gap-2"><Map className="w-4 h-4 text-neutral-400" /> 2.4 km away</span>
                  <span className="flex items-center gap-2"><AlertCircle className="w-4 h-4 text-teal-600" /> {t('home.reliablePayouts')}</span>
                </div>
              </div>
              <div className="text-right shrink-0 ml-4 flex flex-col items-end">
                <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">{t('home.mixedEwaste')}</div>
                <div className="text-xl font-black text-teal-600 bg-teal-500/10 px-3 py-1.5 rounded-xl border border-teal-500/10 backdrop-blur-sm">₹68/kg</div>
              </div>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div>
            <h3 className="font-black text-neutral-900 text-lg mb-4 px-1">{t('home.quickActions')}</h3>
            <div className="grid grid-cols-3 gap-3 lg:gap-4">
              <ShortcutCard to="/collector/simulator" icon={<TrendingUp className="text-blue-500 w-6 h-6" />} label={t('home.simulator')} color="bg-blue-500/10" border="border-blue-500/20" />
              <ShortcutCard to="/collector/fair-deal" icon={<Scale className="text-purple-500 w-6 h-6" />} label={t('home.fairDeal')} color="bg-purple-500/10" border="border-purple-500/20" />
              <ShortcutCard to="/collector/profile" icon={<BookOpen className="text-orange-500 w-6 h-6" />} label={t('home.guide')} color="bg-orange-500/10" border="border-orange-500/20" />
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h3 className="font-black text-neutral-900 text-lg mb-4 px-1">{t('home.recentActivity')}</h3>
            <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] overflow-hidden">
              <ActivityRow material="15kg Copper Wire" recycler="MetalCorp" amount="₹4,200" status="Paid" date="Today" />
              <div className="border-t border-white/40" />
              <ActivityRow material="40kg Mixed PCBs" recycler="EcoTech" amount="₹2,400" status="Pending" date="Yesterday" />
              <div className="border-t border-white/40" />
              <ActivityRow material="8kg Batteries" recycler="SafeDispose" amount="₹560" status="Paid" date="Sep 4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShortcutCard({ to, icon, label, color, border }: { to: string, icon: React.ReactNode, label: string, color: string, border: string }) {
  return (
    <Link to={to} className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-[1.25rem] p-4 flex flex-col items-center text-center gap-3 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:bg-white/80 active:scale-95 transition-all group">
      <div className={`p-3 rounded-2xl ${color} border ${border} shadow-inner group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <span className="text-[11px] font-black uppercase tracking-wider text-neutral-600">{label}</span>
    </Link>
  );
}

function ActivityRow({ material, recycler, amount, status, date }: { material: string, recycler: string, amount: string, status: 'Paid' | 'Pending', date: string }) {
  return (
    <div className="p-4 lg:p-5 flex items-center justify-between hover:bg-white/40 transition-colors cursor-pointer">
      <div>
        <h4 className="font-bold text-sm text-neutral-900">{material}</h4>
        <p className="text-xs font-medium text-neutral-500 mt-1">{recycler} • {date}</p>
      </div>
      <div className="text-right">
        <div className="font-black text-sm text-neutral-900">{amount}</div>
        <div className={`text-[10px] font-black uppercase tracking-widest mt-1.5 inline-block px-2 py-0.5 rounded-lg border ${status === 'Paid' ? 'bg-green-500/10 text-green-700 border-green-500/20' : 'bg-amber-500/10 text-amber-700 border-amber-500/20'}`}>
          {status}
        </div>
      </div>
    </div>
  );
}