import { Outlet, NavLink, useLocation, Link } from 'react-router-dom';
import { Bell, Home, Camera, IndianRupee, Map, User, WifiOff, Zap, X, Menu, LogOut, RefreshCcw } from 'lucide-react';
import { useAppStore } from '../../store';
import { cn } from '../../lib/utils';
import { useState } from 'react';

export default function CollectorLayout() {
  const { notifications, offlinePendingCount, activePulsesCount, logout, userRole } = useAppStore();
  const location = useLocation();
  const [showTicker, setShowTicker] = useState(true);

  // Derive title from route
  const titleMap: Record<string, string> = {
    '/collector': 'Home',
    '/collector/sell': 'Snap & Sell',
    '/collector/recyclers': 'Find Recyclers',
    '/collector/fair-deal': 'FairDeal Check',
    '/collector/earnings': 'Earnings',
    '/collector/simulator': 'Income Simulator',
    '/collector/opportunity-map': 'Opportunity Map',
    '/collector/profile': 'Profile',
  };
  const title = titleMap[location.pathname] || 'Kabadi Connect';

  const navItems = [
    { to: '/collector', icon: <Home />, label: 'Home' },
    { to: '/collector/sell', icon: <Camera />, label: 'Sell' },
    { to: '/collector/earnings', icon: <IndianRupee />, label: 'Earnings' },
    { to: '/collector/opportunity-map', icon: <Map />, label: 'Map' },
    { to: '/collector/profile', icon: <User />, label: 'Profile' }
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden relative font-sans">
      
      {/* Animated Background Blobs for Glassmorphism */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] rounded-full bg-teal-400/20 blur-[120px] pointer-events-none mix-blend-multiply opacity-70" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] rounded-full bg-emerald-400/20 blur-[120px] pointer-events-none mix-blend-multiply opacity-70" />
      
      {/* Desktop Sidebar (hidden on mobile) */}
      <aside className="hidden lg:flex w-64 flex-col bg-white border-r border-border h-full relative z-20">
        <div className="h-16 flex items-center px-6 border-b border-border bg-gradient-to-br from-teal to-green-600">
           <h1 className="text-white font-black text-xl tracking-tight">KabadiConnect</h1>
        </div>
        
        <div className="p-4 border-b border-border bg-neutral-50/50">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-teal/20 flex items-center justify-center text-teal font-bold border border-teal/30">
               C
             </div>
             <div>
               <p className="text-sm font-bold text-neutral-900">Collector Portal</p>
               <p className="text-xs text-neutral-500 uppercase tracking-wider">{userRole}</p>
             </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <SidebarItem key={item.to} {...item} />
          ))}
        </nav>
        
        <div className="p-4 border-t border-border">
          <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-red-500 transition-colors">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-border shadow-sm px-4 lg:px-8 h-16 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2 -ml-2 rounded-full hover:bg-neutral-100 text-neutral-600">
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg lg:text-xl font-semibold lg:font-bold text-navy">{title}</h1>
          </div>
          
          <div className="flex items-center gap-2 lg:gap-4">
            {offlinePendingCount > 0 && (
              <div className="flex items-center gap-1.5 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full text-xs font-medium border border-amber-200 shadow-sm">
                <WifiOff className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{offlinePendingCount} pending</span>
              </div>
            )}
            
            <button className="relative p-2 rounded-full hover:bg-neutral-100 text-neutral-600 transition-colors">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-destructive border-2 border-white rounded-full" />
              )}
            </button>
            
            {/* Desktop Switch Role */}
            <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-border ml-2">
               <span className="text-xs text-neutral-400 font-bold">Switch:</span>
               <Link to="/dashboard" className="p-1.5 text-neutral-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Recycler Dashboard"><RefreshCcw className="w-4 h-4" /></Link>
            </div>
          </div>
        </header>

        {/* WastePulse Ticker */}
        {showTicker && activePulsesCount > 0 && (
          <div className="bg-primary-green/10 text-primary-green px-4 lg:px-8 py-2 flex items-center justify-between text-sm border-b border-primary-green/20 shrink-0">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 fill-primary-green animate-pulse" />
              <span className="font-medium">{activePulsesCount} Active Pulses near you!</span>
            </div>
            <button onClick={() => setShowTicker(false)} className="text-primary-green/70 hover:text-primary-green">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Main Scrolling Content */}
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-8">
          <div className="mx-auto max-w-5xl w-full">
            <Outlet />
          </div>
        </main>

        {/* Mobile Bottom Tab Bar (hidden on lg) */}
        <nav className="lg:hidden absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-border h-16 flex items-center justify-around px-2 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-50">
          {navItems.map(item => (
            <TabItem key={item.to} {...item} />
          ))}
        </nav>
      </div>
    </div>
  );
}

function SidebarItem({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <NavLink
      to={to}
      end={to === '/collector'}
      className={({ isActive }) => cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold transition-all",
        isActive 
          ? "bg-primary-green/10 text-primary-green shadow-sm" 
          : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
      )}
    >
      {({ isActive }) => (
        <>
          <div className={cn("[&>svg]:w-5 [&>svg]:h-5", isActive ? "[&>svg]:stroke-[2.5px]" : "[&>svg]:stroke-[2px]")}>
            {icon}
          </div>
          <span>{label}</span>
        </>
      )}
    </NavLink>
  );
}

function TabItem({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <NavLink
      to={to}
      end={to === '/collector'}
      className={({ isActive }) =>
        cn(
          "flex flex-col items-center justify-center w-full h-full gap-1 text-[10px] font-bold transition-all relative",
          isActive ? "text-primary-green" : "text-neutral-400 hover:text-neutral-900"
        )
      }
    >
      {({ isActive }) => (
        <>
          {isActive && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary-green rounded-b-full" />}
          <div className={cn("[&>svg]:w-5 [&>svg]:h-5 transition-transform", isActive ? "[&>svg]:stroke-[2.5px] -translate-y-0.5" : "[&>svg]:stroke-[2px]")}>
            {icon}
          </div>
          <span>{label}</span>
        </>
      )}
    </NavLink>
  );
}