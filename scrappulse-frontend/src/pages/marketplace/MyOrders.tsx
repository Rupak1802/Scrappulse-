import { useOrders } from '../../mocks/orders';
import { useListings } from '../../mocks/listings';
import { Package, Truck, CheckCircle2, ChevronRight, MessageSquarePlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

export default function MyOrders() {
  const orders = useOrders();
  const listings = useListings();

  return (
    <div className="max-w-5xl mx-auto p-4 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-neutral-900">My Purchases</h1>
        <p className="text-neutral-500 font-medium mt-1">Track orders and post your builds to the community.</p>
      </div>

      <div className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col">
        {orders.map((order, idx) => {
          const listing = listings.find(l => l.id === order.listingId);
          if (!listing) return null;

          return (
            <div key={order.id} className={cn("p-6 flex flex-col lg:flex-row gap-6", idx !== 0 && "border-t border-border")}>
              
              <div className="flex-1 flex gap-4 lg:gap-6">
                <Link to={`/marketplace/listing/${listing.id}`} className="w-24 h-24 lg:w-32 lg:h-32 bg-neutral-100 rounded-xl overflow-hidden shrink-0 border border-border group">
                   <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </Link>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded",
                      order.status === 'Completed' ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                    )}>{order.status}</span>
                    <span className="text-xs text-neutral-400 font-bold">{order.id}</span>
                  </div>
                  <h3 className="font-bold text-neutral-900 text-lg lg:text-xl leading-tight mb-1">{listing.title}</h3>
                  <p className="text-sm font-medium text-neutral-500 mb-2">Qty: {order.quantity} • ₹{order.amount}</p>
                  <p className="text-xs text-neutral-400 font-semibold">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="w-full lg:w-72 flex flex-col justify-center gap-3 shrink-0 border-t lg:border-t-0 lg:border-l border-border pt-4 lg:pt-0 lg:pl-6">
                 
                 {order.status === 'Completed' ? (
                   <>
                     <div className="flex items-center gap-2 text-green-600 font-bold text-sm mb-2">
                       <CheckCircle2 className="w-5 h-5" /> Delivered
                     </div>
                     <Link to={`/community/new?item=${listing.id}`} className="w-full bg-teal hover:bg-teal/90 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.98] group text-sm">
                       <MessageSquarePlus className="w-4 h-4" /> Post what you built
                     </Link>
                   </>
                 ) : (
                   <>
                     <div className="flex items-center gap-2 text-blue-600 font-bold text-sm mb-2">
                       <Truck className="w-5 h-5" /> Arriving Tomorrow
                     </div>
                     <button className="w-full bg-white border border-border hover:bg-neutral-50 text-neutral-700 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm text-sm">
                       <Package className="w-4 h-4" /> Track Order
                     </button>
                   </>
                 )}
                 <button className="text-xs font-bold text-neutral-500 hover:text-neutral-900 transition-colors flex items-center justify-center gap-1 w-full py-2">
                   View details <ChevronRight className="w-3 h-3" />
                 </button>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}