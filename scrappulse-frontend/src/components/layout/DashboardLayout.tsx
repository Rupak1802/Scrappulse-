import { Outlet, NavLink, useLocation, Link } from 'react-router-dom';
import { 
  Activity, ArrowRightLeft, Truck, Link2, AlertTriangle, 
  ShieldCheck, MonitorSmartphone, FileText, Search, 
  Calendar, Bell, ChevronLeft, ChevronRight, Settings, 
  LogOut, Command, Zap, RefreshCcw
} from 'lucide-react';
import { useAppStore } from '../../store';
import { cn } from '../../lib/utils';
import { useState, useEffect } from 'react';

export default function DashboardLayout() {
  const { isSidebarOpen, toggleSidebar, notifications, activePulsesCount, togglePulsePanel, logout } = useAppStore();
  const [showCommandPalette, setShowCommandPalette] = useState(false);

  // Cmd+K to toggle command palette
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setShowCommandPalette((open) => !open);
      }
    }
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <div className="flex h-screen bg-neutral-50 overflow-hidden font-sans text-neutral-900">
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-navy text-white flex flex-col transition-all duration-300 ease-in-out z-20 shadow-xl",
          isSidebarOpen ? "w-64" : "w-16"
        )}
      >
        {/* Logo Area */}
        <div className="h-14 flex items-center px-4 border-b border-white/10 shrink-0">
          <div className="w-8 h-8 bg-teal rounded flex items-center justify-center shrink-0">
            <Activity className="w-5 h-5 text-white" />
          </div>
          {isSidebarOpen && <span className="ml-3 font-semibold tracking-wide whitespace-nowrap overflow-hidden">ScrapPulse</span>}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden flex flex-col gap-1 px-2">
          <NavItem to="/dashboard" icon={<Activity />} label="Supply Radar" isOpen={isSidebarOpen} />
          <NavItem to="/dashboard/transactions" icon={<ArrowRightLeft />} label="Transactions" isOpen={isSidebarOpen} />
          <NavItem to="/dashboard/fleet" icon={<Truck />} label="Fleet Optimizer" isOpen={isSidebarOpen} />
          <NavItem to="/dashboard/matcher" icon={<Link2 />} label="Supply Matcher" isOpen={isSidebarOpen} />
          <NavItem to="/dashboard/anomalies" icon={<AlertTriangle />} label="Anomalies" isOpen={isSidebarOpen} />
          <NavItem to="/dashboard/reliability" icon={<ShieldCheck />} label="Reliability" isOpen={isSidebarOpen} />
          <NavItem to="/dashboard/digital-twin" icon={<MonitorSmartphone />} label="Digital Twin" isOpen={isSidebarOpen} />
          <NavItem to="/dashboard/reports" icon={<FileText />} label="Reports" isOpen={isSidebarOpen} />
        </nav>

        {/* Sidebar Footer */}
        <div className="p-2 border-t border-white/10 flex flex-col gap-2">
          {isSidebarOpen && (
            <div className="p-2 flex flex-col gap-2 rounded bg-white/5 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-teal/20 border border-teal flex items-center justify-center text-teal font-semibold text-sm shrink-0">
                  RK
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium truncate">Rupak Kumar</span>
                  <span className="text-xs text-neutral-400 truncate">Recycler Dashboard</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/10">
                <Link to="/marketplace" className="flex-1 flex justify-center p-1.5 bg-white/5 hover:bg-white/10 rounded text-neutral-400 hover:text-white transition-colors" title="Switch to Maker">
                  <RefreshCcw className="w-4 h-4" />
                </Link>
                <button onClick={logout} className="flex-1 flex justify-center p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded transition-colors" title="Logout">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
          <button 
            onClick={toggleSidebar}
            className="w-full flex items-center justify-center p-2 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
          >
            {isSidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* Top Header */}
        <header className="h-14 bg-white border-b border-border flex items-center justify-between px-6 shrink-0 shadow-sm z-10">
          
          <div className="flex items-center gap-4 flex-1">
            {/* Breadcrumb (Simplified) */}
            <div className="hidden sm:flex text-sm text-neutral-500 font-medium">
              Dashboard <span className="mx-2 text-neutral-300">/</span> <span className="text-neutral-900 capitalize">{window.location.pathname.split('/').pop() || 'Overview'}</span>
            </div>
            
            {/* Global Search */}
            <button 
              onClick={() => setShowCommandPalette(true)}
              className="ml-auto sm:ml-4 flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-500 px-3 py-1.5 rounded-md text-sm border border-neutral-200 transition-colors w-64"
            >
              <Search className="w-4 h-4" />
              <span>Search anywhere...</span>
              <div className="ml-auto flex items-center gap-1 text-xs font-semibold">
                <Command className="w-3 h-3" /> K
              </div>
            </button>
          </div>

          <div className="flex items-center gap-4 ml-6">
            {/* Date Range Picker Mock */}
            <button className="hidden md:flex items-center gap-2 text-sm border border-border px-3 py-1.5 rounded-md hover:bg-neutral-50 font-medium">
              <Calendar className="w-4 h-4 text-neutral-500" />
              <span>Today: Sep 7</span>
            </button>

            {/* Active Pulses Indicator */}
            {activePulsesCount > 0 && (
              <button 
                onClick={togglePulsePanel}
                className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-amber-100 transition-colors"
              >
                <Zap className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
                <span>{activePulsesCount} Pulses</span>
              </button>
            )}

            {/* Notification Bell */}
            <button className="relative p-2 rounded-full hover:bg-neutral-100 text-neutral-600 transition-colors">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full border-2 border-white" />
              )}
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 relative">
          <Outlet />
        </main>
      </div>

      {/* Mock Command Palette */}
      {showCommandPalette && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-[10vh] px-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden border border-border animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center px-4 py-3 border-b border-border">
              <Search className="w-5 h-5 text-neutral-400 mr-3" />
              <input 
                autoFocus 
                placeholder="Search collectors, transactions, routes..." 
                className="flex-1 bg-transparent outline-none text-base"
              />
              <button onClick={() => setShowCommandPalette(false)} className="text-xs bg-neutral-100 px-2 py-1 rounded text-neutral-500 font-medium">ESC</button>
            </div>
            <div className="p-2">
              <div className="text-xs font-semibold text-neutral-400 px-3 py-2 uppercase tracking-wider">Quick Links</div>
              <div className="p-2 hover:bg-neutral-100 rounded-md cursor-pointer flex items-center gap-3 group">
                <Truck className="w-4 h-4 text-neutral-400 group-hover:text-navy" />
                <span className="text-sm font-medium">Fleet Optimizer</span>
              </div>
              <div className="p-2 hover:bg-neutral-100 rounded-md cursor-pointer flex items-center gap-3 group">
                <AlertTriangle className="w-4 h-4 text-neutral-400 group-hover:text-navy" />
                <span className="text-sm font-medium">Review Open Anomalies</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function NavItem({ to, icon, label, isOpen }: { to: string; icon: React.ReactNode; label: string; isOpen: boolean }) {
  return (
    <NavLink
      to={to}
      end={to === '/dashboard'}
      className={({ isActive }) =>
        cn(
          "flex items-center h-10 px-3 rounded-md transition-colors group relative overflow-hidden",
          isActive ? "bg-teal text-white font-medium shadow-sm" : "text-neutral-300 hover:bg-white/10 hover:text-white"
        )
      }
    >
      <div className="shrink-0 [&>svg]:w-5 [&>svg]:h-5">{icon}</div>
      <span className={cn(
        "ml-3 whitespace-nowrap transition-opacity duration-200", 
        isOpen ? "opacity-100" : "opacity-0 w-0 ml-0 hidden"
      )}>
        {label}
      </span>
      {/* Tooltip for collapsed state could go here */}
    </NavLink>
  );
}