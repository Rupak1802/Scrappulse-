import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useListings } from '../../mocks/listings';
import { useIdeas } from '../../mocks/projectIdeas';
import { ShieldCheck, Truck, MapPin, Store, CheckCircle2, ChevronRight, Star, AlertCircle, ShoppingCart, MessageSquare, Zap, Lightbulb } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function ListingDetail() {
  const { id = 'L-101' } = useParams();
  const listings = useListings();
  const ideas = useIdeas();
  
  const listing = listings.find(l => l.id === id) || listings[0];
  const relatedListings = listings.filter(l => l.componentType === listing.componentType && l.id !== listing.id).slice(0, 3);
  
  // Filter ideas that might use this component
  const relatedIdeas = ideas.filter(i => i.sourceComponentType === listing.componentType).slice(0, 2);

  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:p-8 p-4 max-w-7xl mx-auto">
      
      {/* Left Column: Media & Details */}
      <div className="flex-1 flex flex-col gap-8">
        
        {/* Gallery */}
        <div className="flex flex-col gap-3">
          <div className="bg-neutral-100 rounded-2xl aspect-[4/3] sm:aspect-[16/9] lg:aspect-[4/3] overflow-hidden border border-border relative group">
            <img src={listing.images[activeImage]} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute top-4 left-4">
              {listing.reuseEligible && (
                <div className="bg-green-500/90 backdrop-blur-md text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
                   <ShieldCheck className="w-4 h-4" />
                   <span className="text-[10px] font-black uppercase tracking-widest">Verified Reusable</span>
                </div>
              )}
            </div>
          </div>
          {listing.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {listing.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImage(i)} className={cn("w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-colors", activeImage === i ? "border-teal" : "border-transparent hover:border-neutral-300")}>
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* What can I build with this? */}
        {relatedIdeas.length > 0 && (
          <div className="bg-gradient-to-br from-navy to-teal/90 rounded-2xl p-1 shadow-md">
             <div className="bg-white rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-teal" />
                  </div>
                  <div>
                    <h2 className="font-bold text-neutral-900">What can I build with this?</h2>
                    <p className="text-xs text-neutral-500">Lens AI suggestions for {listing.componentType}</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {relatedIdeas.map(idea => (
                    <Link key={idea.id} to={`/lens/idea/${idea.id}`} className="block bg-neutral-50 border border-neutral-100 rounded-xl p-4 hover:border-teal hover:shadow-md transition-all group">
                       <div className="flex items-start justify-between mb-2">
                          <span className={cn(
                            "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded",
                            idea.noveltyTag === 'existing' ? "bg-white border border-teal text-teal" : "bg-gradient-to-r from-amber-400 to-teal text-white shadow-sm"
                          )}>
                            {idea.noveltyTag === 'existing' ? "Existing Idea" : "Novel Remix ✨"}
                          </span>
                          <span className="text-[10px] font-bold text-neutral-400">{idea.difficulty}</span>
                       </div>
                       <h3 className="font-bold text-sm text-neutral-900 group-hover:text-teal transition-colors mb-1">{idea.title}</h3>
                       <p className="text-xs text-neutral-500 line-clamp-2 mb-3">Uses: {idea.materials.map(m => m.name).join(', ')}</p>
                       <span className="text-teal text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all">View Project <ChevronRight className="w-3 h-3" /></span>
                    </Link>
                  ))}
                </div>
             </div>
          </div>
        )}

        {/* Description & Specs */}
        <div>
           <h2 className="text-xl font-bold text-neutral-900 mb-4">Description</h2>
           <p className="text-neutral-600 leading-relaxed mb-6">{listing.description}</p>
           
           <h2 className="text-xl font-bold text-neutral-900 mb-4">Specifications</h2>
           <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden">
             <table className="w-full text-left text-sm">
               <tbody className="divide-y divide-border">
                 <tr><th className="p-4 bg-neutral-50 font-semibold text-neutral-500 w-1/3">Component Type</th><td className="p-4 font-medium text-neutral-900">{listing.componentType}</td></tr>
                 <tr><th className="p-4 bg-neutral-50 font-semibold text-neutral-500">Condition</th><td className="p-4 font-medium text-neutral-900">{listing.condition}</td></tr>
                 <tr><th className="p-4 bg-neutral-50 font-semibold text-neutral-500">Hazard Status</th><td className="p-4 font-medium text-green-600 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Non-Hazardous</td></tr>
                 <tr><th className="p-4 bg-neutral-50 font-semibold text-neutral-500">Listed On</th><td className="p-4 font-medium text-neutral-900">{new Date(listing.createdAt).toLocaleDateString()}</td></tr>
               </tbody>
             </table>
           </div>
        </div>

      </div>

      {/* Right Column: Buy Box & Seller */}
      <div className="w-full lg:w-96 flex flex-col gap-6 shrink-0">
         
         {/* Sticky Buy Box */}
         <div className="bg-white border border-border rounded-2xl p-6 shadow-lg sticky top-24">
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2">{listing.componentType}</p>
            <h1 className="text-2xl font-black text-neutral-900 leading-tight mb-4">{listing.title}</h1>
            
            <div className="flex items-end gap-2 mb-6">
              <span className="text-4xl font-black text-neutral-900">₹{listing.price}</span>
              <span className="text-sm font-bold text-neutral-400 mb-1">/ unit</span>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                <span className="text-sm font-bold text-neutral-700">Quantity</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-border font-black text-neutral-500 hover:text-neutral-900 hover:border-neutral-300">-</button>
                  <span className="font-black text-neutral-900 min-w-[20px] text-center">{qty}</span>
                  <button onClick={() => setQty(Math.min(listing.quantity, qty + 1))} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-border font-black text-neutral-500 hover:text-neutral-900 hover:border-neutral-300">+</button>
                </div>
              </div>
              <p className="text-xs text-center font-semibold text-neutral-500">{listing.quantity} available</p>
            </div>

            <div className="flex flex-col gap-3">
              <Link to="/marketplace/cart" className="w-full bg-teal hover:bg-teal/90 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-[0.98]">
                <ShoppingCart className="w-5 h-5" /> Buy Now - ₹{listing.price * qty}
              </Link>
              <button className="w-full bg-white border border-border hover:bg-neutral-50 text-neutral-700 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
                Add to Cart
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-border space-y-3">
               <div className="flex items-center gap-3 text-sm font-medium text-neutral-600">
                 <Truck className="w-4 h-4 text-neutral-400" /> Delivery by <span className="font-bold text-neutral-900">Tommorow</span>
               </div>
               <div className="flex items-center gap-3 text-sm font-medium text-neutral-600">
                 <MapPin className="w-4 h-4 text-neutral-400" /> Pickup available in <span className="font-bold text-neutral-900">Andheri East</span>
               </div>
            </div>
         </div>

         {/* Seller Card */}
         <div className="bg-white border border-border rounded-2xl p-5 shadow-sm">
           <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-4">About the Seller</h3>
           <div className="flex items-center gap-4 mb-4">
             <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center shrink-0">
               <Store className="w-6 h-6 text-neutral-400" />
             </div>
             <div>
               <p className="font-bold text-neutral-900 text-sm flex items-center gap-1">{listing.sellerId} <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /></p>
               <p className="text-xs font-semibold text-neutral-500">{listing.sellerType}</p>
             </div>
           </div>
           
           <div className="flex gap-2 mb-4">
             <div className="flex-1 bg-neutral-50 p-2 rounded-lg border border-neutral-100 text-center">
               <div className="flex items-center justify-center gap-1 text-amber-500 mb-0.5">
                 <Star className="w-3 h-3 fill-amber-500" /><Star className="w-3 h-3 fill-amber-500" /><Star className="w-3 h-3 fill-amber-500" /><Star className="w-3 h-3 fill-amber-500" /><Star className="w-3 h-3 fill-amber-500" />
               </div>
               <p className="text-[10px] font-bold text-neutral-500 uppercase">4.9 Rating</p>
             </div>
             <div className="flex-1 bg-neutral-50 p-2 rounded-lg border border-neutral-100 text-center">
               <p className="text-sm font-black text-neutral-900 mb-0.5">1hr</p>
               <p className="text-[10px] font-bold text-neutral-500 uppercase">Response Time</p>
             </div>
           </div>

           <button className="w-full bg-white border border-border hover:bg-neutral-50 text-neutral-700 font-bold py-2 rounded-lg text-sm transition-colors">
             View Storefront
           </button>
         </div>

      </div>

    </div>
  );
}