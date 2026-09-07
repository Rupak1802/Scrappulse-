import { useState } from 'react';
import { MapPin, ShieldCheck, TrendingUp, ChevronLeft, Search, SlidersHorizontal, Map as MapIcon, Info, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';
import { cn } from '../../lib/utils';

const MOCK_RECYCLERS = [
  { id: '1', name: 'EcoTech Recycling', price: 68, distance: 2.4, reliability: 98, onTime: 99, recommended: true, tags: ['Best Price', 'Verified'] },
  { id: '2', name: 'GreenEarth Metals', price: 65, distance: 1.2, reliability: 92, onTime: 90, recommended: false, tags: ['Nearest'] },
  { id: '3', name: 'Mumbai Scrap Hub', price: 62, distance: 3.8, reliability: 85, onTime: 80, recommended: false, tags: ['Accepts All'] },
  { id: '4', name: 'SafeDispose Inc.', price: 64, distance: 5.1, reliability: 95, onTime: 96, recommended: false, tags: ['Verified'] },
];

export default function Recyclers() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [view, setView] = useState<'list' | 'map'>('list');

  return (
    <div className="flex flex-col h-full bg-neutral-50 relative pb-24">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b border-border sticky top-0 z-20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-neutral-500 hover:text-neutral-900">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="font-semibold text-neutral-900 leading-tight">Compare Recyclers</h1>
              <p className="text-xs text-neutral-500">15kg Copper Wire</p>
            </div>
          </div>
          <button onClick={() => setView(v => v === 'list' ? 'map' : 'list')} className="p-2 bg-neutral-100 rounded-lg text-neutral-600 font-medium text-xs flex items-center gap-1.5">
            <MapIcon className="w-4 h-4" /> {view === 'list' ? 'Map View' : 'List View'}
          </button>
        </div>

        {/* Counterfactual Banner */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-start gap-2 mb-3">
          <TrendingUp className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-green-900">Selling to EcoTech vs your usual seller</p>
            <p className="text-xs text-green-700 mt-0.5">+₹120 extra profit on this load</p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Search or filter..." 
              className="w-full bg-neutral-100 border-transparent rounded-lg pl-9 pr-3 py-2 text-sm focus:bg-white focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all"
            />
          </div>
          <button className="p-2 border border-border rounded-lg bg-white text-neutral-600 hover:bg-neutral-50">
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        {view === 'list' ? (
          <div className="space-y-4">
            {MOCK_RECYCLERS.map((recycler) => (
              <div 
                key={recycler.id}
                onClick={() => setSelectedId(recycler.id)}
                className={cn(
                  "bg-white border rounded-xl p-4 transition-all cursor-pointer relative overflow-hidden",
                  selectedId === recycler.id ? "border-teal shadow-md ring-1 ring-teal" : "border-border shadow-sm hover:border-neutral-300",
                  recycler.recommended && selectedId !== recycler.id && "border-amber-200"
                )}
              >
                {recycler.recommended && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" /> RECOMMENDED
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-3 mt-1">
                  <div>
                    <h3 className="font-bold text-neutral-900">{recycler.name}</h3>
                    <div className="flex gap-1.5 mt-1">
                      {recycler.tags.map(tag => (
                        <span key={tag} className="bg-neutral-100 text-neutral-600 text-[10px] font-semibold px-1.5 py-0.5 rounded uppercase tracking-wider">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-teal">₹{recycler.price}<span className="text-sm font-bold text-neutral-400">/kg</span></div>
                    <div className="text-xs text-neutral-500 font-medium">Est. ₹{recycler.price * 15} total</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 py-3 border-y border-border my-3">
                  <div className="flex flex-col items-center justify-center text-center border-r border-border">
                    <MapPin className="w-4 h-4 text-neutral-400 mb-1" />
                    <span className="text-sm font-bold text-neutral-900">{recycler.distance} km</span>
                    <span className="text-[10px] text-neutral-500 uppercase">Distance</span>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center border-r border-border relative">
                    <div className="w-10 h-10 absolute -top-1 opacity-20">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" barSize={4} data={[{value: recycler.reliability, fill: '#00897B'}]} startAngle={90} endAngle={-270}>
                          <RadialBar background dataKey="value" cornerRadius={10} />
                        </RadialBarChart>
                      </ResponsiveContainer>
                    </div>
                    <ShieldCheck className="w-4 h-4 text-teal mb-1 z-10" />
                    <span className="text-sm font-bold text-neutral-900 z-10">{recycler.reliability}</span>
                    <span className="text-[10px] text-neutral-500 uppercase z-10">Reliability</span>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center">
                    <TrendingUp className="w-4 h-4 text-neutral-400 mb-1" />
                    <span className="text-sm font-bold text-neutral-900">{recycler.onTime}%</span>
                    <span className="text-[10px] text-neutral-500 uppercase">On-Time Pay</span>
                  </div>
                </div>

                {recycler.recommended && (
                  <div className="bg-amber-50 rounded-lg p-2.5 text-xs text-amber-900 flex items-start gap-2">
                    <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p>Highest combined score of price and historical reliability for Copper Wire in your zone.</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-[60vh] bg-neutral-200 rounded-xl border border-border overflow-hidden relative flex items-center justify-center">
            {/* Stylized Mock Map */}
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>
            <div className="relative z-10 flex flex-col items-center">
              <MapPin className="w-12 h-12 text-teal animate-bounce" />
              <div className="bg-white px-3 py-1.5 rounded-full shadow-lg font-bold text-sm text-neutral-900 mt-2">
                4 Recyclers nearby
              </div>
            </div>
            {/* Mock pins */}
            <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-teal rounded-full shadow-[0_0_15px_rgba(0,137,123,0.8)]" />
            <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-neutral-400 rounded-full" />
            <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-neutral-400 rounded-full" />
          </div>
        )}
      </div>

      {/* Sticky Bottom Confirm Bar */}
      {selectedId && (
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-border z-30 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)] animate-in slide-in-from-bottom-full duration-300">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs font-semibold text-neutral-500 uppercase">Selected Recycler</p>
              <p className="font-bold text-neutral-900">{MOCK_RECYCLERS.find(r => r.id === selectedId)?.name}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-neutral-500 uppercase">Total Value</p>
              <p className="font-black text-teal text-lg">₹{(MOCK_RECYCLERS.find(r => r.id === selectedId)?.price || 0) * 15}</p>
            </div>
          </div>
          <button onClick={() => navigate('/collector')} className="w-full bg-primary-green hover:bg-primary-green/90 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]">
            Confirm Pickup Request
          </button>
        </div>
      )}
    </div>
  );
}