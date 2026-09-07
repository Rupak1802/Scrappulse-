import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Bell, User, Camera, MessageSquare, Store, LayoutGrid, Menu, X, LogOut, RefreshCcw } from 'lucide-react';
import { useState } from 'react';
import { useAppStore } from '../../store';
import { cn } from '../../lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

export default function SecondLifeLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout } = useAppStore();

  const tabs = [
    { name: 'Marketplace', path: '/marketplace', icon: Store },
    { name: 'Community Feed', path: '/community', icon: MessageSquare },
    { name: 'Lens', path: '/lens', icon: Camera },
  ];

  const currentTab = tabs.find(t => location.pathname.startsWith(t.path)) || tabs[0];

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
      
      {/* Top Nav (Shared) */}
      <header className="bg-white border-b border-border sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo & Mobile Menu Toggle */}
            <div className="flex items-center gap-4">
              <button onClick={toggleMenu} className="lg:hidden p-2 -ml-2 text-neutral-500 hover:text-neutral-900 rounded-md">
                <Menu className="w-6 h-6" />
              </button>
              <Link to="/marketplace" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal to-green-600 flex items-center justify-center text-white font-black text-xl shadow-inner">
                  K
                </div>
                <div className="hidden sm:block">
                  <span className="font-bold text-lg text-neutral-900 leading-tight block">KabadiConnect</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-teal leading-none block">Second Life</span>
                </div>
              </Link>
            </div>

            {/* Desktop Tabs */}
            <div className="hidden lg:flex items-center gap-8 h-full">
              {tabs.map(tab => {
                const active = currentTab.path === tab.path;
                return (
                  <Link 
                    key={tab.path} 
                    to={tab.path} 
                    className={cn(
                      "h-full flex items-center gap-2 border-b-2 px-1 text-sm font-bold transition-colors",
                      active ? "border-teal text-teal" : "border-transparent text-neutral-500 hover:text-neutral-900 hover:border-neutral-300"
                    )}
                  >
                    <tab.icon className={cn("w-4 h-4", active ? "text-teal" : "text-neutral-400")} />
                    {tab.name}
                  </Link>
                );
              })}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Global Search */}
              <div className="hidden md:flex relative w-64 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-teal transition-colors" />
                <input 
                  type="text" 
                  placeholder={`Search ${currentTab.name}...`}
                  className="w-full bg-neutral-100 border-transparent focus:bg-white focus:border-teal focus:ring-1 focus:ring-teal rounded-full pl-9 pr-4 py-1.5 text-sm outline-none transition-all"
                />
              </div>

              {/* Actions */}
              <Link to="/marketplace/cart" className="p-2 text-neutral-500 hover:bg-neutral-100 rounded-full relative transition-colors">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-teal rounded-full border border-white" />
              </Link>
              
              <button className="p-2 text-neutral-500 hover:bg-neutral-100 rounded-full relative transition-colors hidden sm:block">
                <Bell className="w-5 h-5" />
              </button>
              
              <Link to="/collector" className="p-2 text-neutral-500 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors hidden sm:block" title="Switch to Collector">
                <RefreshCcw className="w-5 h-5" />
              </Link>

              <button onClick={logout} className="p-2 text-neutral-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors hidden sm:block" title="Logout">
                <LogOut className="w-5 h-5" />
              </button>
              
              <div className="w-8 h-8 rounded-full bg-neutral-200 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center cursor-pointer ml-1">
                <img src="https://i.pravatar.cc/150?u=maker" alt="User" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout Area */}
      <div className="flex-1 max-w-7xl mx-auto w-full flex items-start">
        
        {/* Desktop Left Rail */}
        <aside className="hidden lg:flex w-64 shrink-0 flex-col gap-6 py-8 pr-8 border-r border-border h-[calc(100vh-64px)] sticky top-16 overflow-y-auto">
          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3 pl-2">Quick Links</h3>
            <nav className="space-y-1">
              <SidebarLink to="/marketplace/sell/new" icon={<Store />} label="List an Item" highlight />
              <SidebarLink to="/marketplace/orders" icon={<ShoppingCart />} label="My Purchases" />
              <SidebarLink to="/lens/saved" icon={<LayoutGrid />} label="Saved Ideas" />
              <SidebarLink to="/community/new" icon={<MessageSquare />} label="Post a Build" />
            </nav>
          </div>

          {/* Categories / Filters (Contextual to Marketplace/Community) */}
          {(currentTab.path === '/marketplace' || currentTab.path === '/community') && (
            <div>
              <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3 pl-2">Component Types</h3>
              <nav className="space-y-1">
                <SidebarLink to="#" label="Motors & Mechanics" count={12} />
                <SidebarLink to="#" label="Displays & LCDs" count={8} />
                <SidebarLink to="#" label="Cables & Wires" count={24} />
                <SidebarLink to="#" label="Boards & Logic" count={15} />
                <SidebarLink to="#" label="Sensors" count={6} />
                <SidebarLink to="#" label="Audio & Speakers" count={9} />
              </nav>
            </div>
          )}
        </aside>

        {/* Mobile Bottom Sheet Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeMenu} className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-50 lg:hidden" />
              <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 lg:hidden shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
                <div className="p-4 border-b border-border flex justify-between items-center bg-neutral-50">
                  <span className="font-bold text-neutral-900">Menu</span>
                  <button onClick={closeMenu} className="p-1 text-neutral-500 bg-white rounded-full"><X className="w-5 h-5" /></button>
                </div>
                <div className="overflow-y-auto p-4 flex flex-col gap-6">
                  <nav className="flex flex-col gap-2">
                    {tabs.map(tab => (
                      <Link key={tab.path} to={tab.path} onClick={closeMenu} className={cn("p-3 rounded-lg font-bold flex items-center gap-3", currentTab.path === tab.path ? "bg-teal/10 text-teal" : "bg-neutral-50 text-neutral-700")}>
                        <tab.icon className="w-5 h-5" /> {tab.name}
                      </Link>
                    ))}
                  </nav>
                  
                  <div>
                    <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-2">
                       <Link to="/marketplace/sell/new" onClick={closeMenu} className="p-3 bg-white border border-border rounded-lg text-sm font-semibold flex flex-col items-center justify-center gap-2 text-neutral-700 shadow-sm"><Store className="w-5 h-5 text-teal" /> List Item</Link>
                       <Link to="/community/new" onClick={closeMenu} className="p-3 bg-white border border-border rounded-lg text-sm font-semibold flex flex-col items-center justify-center gap-2 text-neutral-700 shadow-sm"><MessageSquare className="w-5 h-5 text-blue-500" /> Post Build</Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Content Area */}
        <main className="flex-1 min-w-0 relative min-h-[calc(100vh-64px)] pb-24 lg:pb-8">
          <Outlet />
        </main>

      </div>

      {/* Floating Action Button (Global Lens Scan) */}
      <Link 
        to="/lens" 
        className={cn(
          "fixed z-40 flex items-center justify-center gap-2 rounded-full shadow-lg transition-all hover:scale-105 hover:shadow-xl group",
          "bottom-6 right-6 lg:top-[88px] lg:right-8 lg:bottom-auto", // Bottom-right on mobile, top-right on desktop
          "bg-navy text-white px-5 py-4 lg:py-3 font-bold"
        )}
      >
        <Camera className="w-6 h-6 lg:w-5 lg:h-5 group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline">Scan with Lens</span>
      </Link>
      
    </div>
  );
}

function SidebarLink({ to, icon, label, count, highlight }: any) {
  return (
    <Link to={to} className={cn(
      "flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors group",
      highlight ? "bg-teal text-white font-bold hover:bg-teal/90 shadow-sm mb-2" : "text-neutral-600 font-medium hover:bg-neutral-100 hover:text-neutral-900"
    )}>
      <div className="flex items-center gap-3">
        {icon && <span className={cn(highlight ? "text-white" : "text-neutral-400 group-hover:text-teal transition-colors")}>{icon}</span>}
        {label}
      </div>
      {count !== undefined && <span className="text-[10px] font-bold bg-neutral-200 text-neutral-600 px-1.5 py-0.5 rounded">{count}</span>}
    </Link>
  );
}
