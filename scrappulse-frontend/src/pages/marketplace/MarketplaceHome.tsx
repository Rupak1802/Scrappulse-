import { useState } from 'react';
import { Search, Filter, Flame, ChevronRight, SlidersHorizontal, Tag, Zap, Box } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useListings, type Listing } from '../../mocks/listings';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = ['All', 'Motors & Mechanics', 'Displays & LCDs', 'Cables & Wires', 'Boards & Logic', 'Sensors', 'Audio', 'Batteries (Safe)', 'Misc'];

export default function MarketplaceHome() {
  const allListings = useListings();
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = allListings.filter(l => 
    (activeCategory === 'All' || l.componentType === activeCategory) &&
    l.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 lg:p-6 p-4">
      {/* Hero Banner */}
      <div className="bg-navy rounded-2xl p-6 lg:p-10 text-white relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500 rounded-full blur-3xl opacity-10 -ml-20 -mb-20"></div>
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block bg-teal text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded mb-4">Second Life Marketplace</span>
          <h1 className="text-3xl lg:text-5xl font-black mb-4 leading-tight">Salvage. Build.<br/><span className="text-teal">Re-invent.</span></h1>
          <p className="text-white/80 font-medium max-w-md mb-6">Discover verified, reusable e-waste components for your next project. Save money and the planet.</p>
          <div className="flex gap-3">
             <button className="bg-teal hover:bg-teal/90 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm">Shop Components</button>
             <button className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-colors backdrop-blur-sm border border-white/10">Got Parts? Sell Here</button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Main Feed */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
             {CATEGORIES.map(cat => (
               <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all border",
                    activeCategory === cat ? "bg-neutral-900 text-white border-neutral-900 shadow-md" : "bg-white text-neutral-600 border-border hover:bg-neutral-50 hover:border-neutral-300"
                  )}
               >
                 {cat}
               </button>
             ))}
          </div>

          {/* Filter Bar */}
          <div className="bg-white border border-border rounded-xl p-3 flex flex-wrap items-center justify-between gap-4 shadow-sm">
             <div className="flex items-center gap-3">
               <div className="relative w-48 sm:w-64">
                 <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                 <input type="text" placeholder="Search parts..." value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-neutral-100 border-transparent rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:ring-1 focus:ring-teal" />
               </div>
               <button className="p-2 border border-border rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 flex items-center gap-2 text-sm font-bold">
                 <SlidersHorizontal className="w-4 h-4" /> <span className="hidden sm:inline">Filters</span>
               </button>
             </div>
             
             <div className="flex items-center gap-2 text-sm">
               <span className="font-semibold text-neutral-500">Sort:</span>
               <select className="bg-transparent font-bold text-neutral-900 outline-none cursor-pointer">
                 <option>Newest First</option>
                 <option>Price: Low to High</option>
                 <option>Most Popular</option>
               </select>
             </div>
          </div>

          {/* Grid */}
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <motion.div layout className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                {filtered.map(listing => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center p-12 bg-white border border-border rounded-xl border-dashed">
                <Box className="w-12 h-12 text-neutral-300 mb-4" />
                <h3 className="text-lg font-bold text-neutral-900 mb-1">No parts found</h3>
                <p className="text-sm text-neutral-500 text-center max-w-sm">We couldn't find any listings matching your search in this category. Try adjusting your filters.</p>
                <button onClick={() => {setSearch(''); setActiveCategory('All');}} className="mt-4 text-teal font-bold text-sm">Clear all filters</button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Right Rail: Trending */}
        <div className="w-full lg:w-72 flex flex-col gap-6 shrink-0">
           <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden">
             <div className="p-4 border-b border-border bg-neutral-50 flex items-center gap-2">
               <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
               <h2 className="font-bold text-neutral-900 text-sm">Trending This Week</h2>
             </div>
             <div className="p-4 flex flex-col gap-4">
               
               <div className="flex gap-3 items-center group cursor-pointer">
                 <div className="w-12 h-12 bg-neutral-100 rounded-lg overflow-hidden shrink-0"><img src="https://picsum.photos/seed/motor1/100/100" className="w-full h-full object-cover group-hover:scale-110 transition-transform" /></div>
                 <div>
                   <p className="text-xs font-bold text-teal uppercase tracking-wider mb-0.5">Surge: Motors</p>
                   <p className="text-sm font-bold text-neutral-900 leading-tight">NEMA 17 Steppers</p>
                   <p className="text-[10px] text-neutral-500">24 new listings today</p>
                 </div>
               </div>
               
               <div className="flex gap-3 items-center group cursor-pointer">
                 <div className="w-12 h-12 bg-neutral-100 rounded-lg overflow-hidden shrink-0"><img src="https://picsum.photos/seed/lcd1/100/100" className="w-full h-full object-cover group-hover:scale-110 transition-transform" /></div>
                 <div>
                   <p className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-0.5">High Demand</p>
                   <p className="text-sm font-bold text-neutral-900 leading-tight">16x2 LCD Displays</p>
                   <p className="text-[10px] text-neutral-500">Selling 2x faster</p>
                 </div>
               </div>

             </div>
             <div className="p-3 border-t border-border bg-neutral-50 text-center">
               <span className="text-xs font-bold text-neutral-500 hover:text-neutral-900 cursor-pointer">View Market Insights <ChevronRight className="w-3 h-3 inline" /></span>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}

function ListingCard({ listing }: { listing: Listing }) {
  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col">
      <Link to={`/marketplace/listing/${listing.id}`} className="relative aspect-square overflow-hidden bg-neutral-100 block">
        <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {listing.condition === 'Working' && <span className="bg-green-500 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">Working</span>}
          {listing.condition === 'For Parts' && <span className="bg-red-500 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">Parts</span>}
        </div>
        
        {listing.id === 'L-101' && (
          <div className="absolute bottom-2 left-2 right-2">
            <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded px-2 py-1 flex items-center justify-center gap-1.5 shadow-sm">
              <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="text-[10px] font-bold text-white uppercase tracking-wider">3 viewing</span>
            </div>
          </div>
        )}
      </Link>
      
      <div className="p-3 flex flex-col flex-1">
        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">{listing.componentType}</p>
        <Link to={`/marketplace/listing/${listing.id}`} className="text-sm font-bold text-neutral-900 leading-tight mb-2 group-hover:text-teal transition-colors line-clamp-2">{listing.title}</Link>
        
        <div className="mt-auto pt-2 flex items-end justify-between">
          <p className="text-lg font-black text-neutral-900">₹{listing.price}</p>
          <div className="text-right">
             <p className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">{listing.sellerType}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}