import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useListings } from '../../mocks/listings';
import { Trash2, MapPin, Truck, ShieldCheck, ChevronRight, CheckCircle2, ArrowRight, ShoppingCart } from 'lucide-react';
import { cn } from '../../lib/utils';


export default function CartCheckout() {
  const listings = useListings();
  // Mock cart items
  const [cartItems, setCartItems] = useState([
    { ...listings[0], cartQty: 2 },
    { ...listings[1], cartQty: 1 }
  ]);
  
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [method, setMethod] = useState<'pickup' | 'shipping'>('shipping');

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.cartQty), 0);
  const shipping = method === 'shipping' ? 50 : 0;
  const total = subtotal + shipping;

  const handleRemove = (id: string) => {
    setCartItems(cartItems.filter(i => i.id !== id));
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setCartItems(cartItems.map(i => {
      if (i.id === id) {
        const newQty = Math.max(1, Math.min(i.quantity, i.cartQty + delta));
        return { ...i, cartQty: newQty };
      }
      return i;
    }));
  };

  if (step === 'success') {
    return (
      <div className="max-w-2xl mx-auto p-4 lg:p-8 pt-12">
        <div className="bg-white border border-border rounded-2xl p-8 lg:p-12 text-center shadow-lg">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-black text-neutral-900 mb-2">Order Confirmed!</h1>
          <p className="text-neutral-500 mb-8">Order #ORD-503 has been placed successfully.</p>
          
          <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-100 mb-8 max-w-sm mx-auto text-left">
            <h3 className="font-bold text-sm text-neutral-900 mb-3">Next Steps</h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-sm text-neutral-600"><div className="w-5 h-5 rounded-full bg-teal/10 flex items-center justify-center text-teal font-bold shrink-0 mt-0.5">1</div> Wait for the seller to confirm your order.</li>
              <li className="flex gap-3 text-sm text-neutral-600"><div className="w-5 h-5 rounded-full bg-teal/10 flex items-center justify-center text-teal font-bold shrink-0 mt-0.5">2</div> Build something awesome.</li>
              <li className="flex gap-3 text-sm font-bold text-teal"><div className="w-5 h-5 rounded-full bg-teal flex items-center justify-center text-white shrink-0 mt-0.5">3</div> Post your build to the community!</li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/marketplace/orders" className="px-6 py-3 bg-white border border-border rounded-xl font-bold text-neutral-700 hover:bg-neutral-50 transition-colors shadow-sm">View Order Tracking</Link>
            <Link to="/lens" className="px-6 py-3 bg-teal hover:bg-teal/90 rounded-xl font-bold text-white transition-colors shadow-md flex items-center justify-center gap-2">Scan parts for Ideas <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-8 flex flex-col lg:flex-row gap-8">
      
      {/* Main Column */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-8">
           <span className={cn("font-bold", step === 'cart' ? "text-neutral-900" : "text-neutral-400 cursor-pointer")} onClick={() => step==='checkout' && setStep('cart')}>Cart ({cartItems.length})</span>
           <ChevronRight className="w-4 h-4 text-neutral-300" />
           <span className={cn("font-bold", step === 'checkout' ? "text-neutral-900" : "text-neutral-400")}>Checkout</span>
        </div>

        {step === 'cart' ? (
          <div className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden">
            {cartItems.length > 0 ? (
              <div className="divide-y divide-border">
                {cartItems.map(item => (
                  <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 group">
                    <Link to={`/marketplace/listing/${item.id}`} className="w-24 h-24 sm:w-32 sm:h-32 bg-neutral-100 rounded-xl overflow-hidden shrink-0 border border-border">
                      <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </Link>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start gap-4 mb-1">
                        <Link to={`/marketplace/listing/${item.id}`} className="font-bold text-neutral-900 hover:text-teal transition-colors text-lg">{item.title}</Link>
                        <span className="font-black text-neutral-900 text-lg">₹{item.price * item.cartQty}</span>
                      </div>
                      <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">{item.condition} • {item.sellerId}</p>
                      <div className="flex items-center gap-1.5 mb-4">
                        <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                        <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">Verified Reusable</span>
                      </div>
                      
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-neutral-50 border border-neutral-200 rounded-lg p-1">
                          <button onClick={() => handleUpdateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center rounded bg-white border border-neutral-200 font-black text-neutral-500 hover:text-neutral-900 shadow-sm">-</button>
                          <span className="font-black text-neutral-900 min-w-[20px] text-center">{item.cartQty}</span>
                          <button onClick={() => handleUpdateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center rounded bg-white border border-neutral-200 font-black text-neutral-500 hover:text-neutral-900 shadow-sm">+</button>
                        </div>
                        <button onClick={() => handleRemove(item.id)} className="text-neutral-400 hover:text-red-500 transition-colors flex items-center gap-1 text-sm font-bold">
                          <Trash2 className="w-4 h-4" /> <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <ShoppingCart className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-neutral-900 mb-2">Your cart is empty</h2>
                <p className="text-neutral-500 mb-6">Looks like you haven't added any components yet.</p>
                <Link to="/marketplace" className="inline-block px-6 py-3 bg-teal text-white font-bold rounded-xl hover:bg-teal/90 transition-colors">Browse Components</Link>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-neutral-900 mb-4">Fulfillment Method</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <button onClick={() => setMethod('shipping')} className={cn("p-4 rounded-xl border-2 text-left transition-all", method === 'shipping' ? "border-teal bg-teal/5" : "border-border hover:border-neutral-300 bg-white")}>
                  <Truck className={cn("w-6 h-6 mb-3", method === 'shipping' ? "text-teal" : "text-neutral-400")} />
                  <p className="font-bold text-neutral-900 mb-1">Standard Shipping</p>
                  <p className="text-xs text-neutral-500 font-medium">₹50 • Delivery in 2-3 days</p>
                </button>
                <button onClick={() => setMethod('pickup')} className={cn("p-4 rounded-xl border-2 text-left transition-all", method === 'pickup' ? "border-teal bg-teal/5" : "border-border hover:border-neutral-300 bg-white")}>
                  <MapPin className={cn("w-6 h-6 mb-3", method === 'pickup' ? "text-teal" : "text-neutral-400")} />
                  <p className="font-bold text-neutral-900 mb-1">Local Pickup</p>
                  <p className="text-xs text-neutral-500 font-medium">Free • Available tomorrow from Seller location</p>
                </button>
              </div>
            </div>
            
            {method === 'shipping' && (
              <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-neutral-900 mb-4">Shipping Address</h2>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="First Name" className="w-full bg-neutral-50 border border-border rounded-lg p-3 outline-none focus:border-teal" />
                    <input type="text" placeholder="Last Name" className="w-full bg-neutral-50 border border-border rounded-lg p-3 outline-none focus:border-teal" />
                  </div>
                  <input type="text" placeholder="Address Line 1" className="w-full bg-neutral-50 border border-border rounded-lg p-3 outline-none focus:border-teal" />
                  <div className="grid sm:grid-cols-3 gap-4">
                    <input type="text" placeholder="City" className="w-full bg-neutral-50 border border-border rounded-lg p-3 outline-none focus:border-teal" />
                    <input type="text" placeholder="State" className="w-full bg-neutral-50 border border-border rounded-lg p-3 outline-none focus:border-teal" />
                    <input type="text" placeholder="PIN Code" className="w-full bg-neutral-50 border border-border rounded-lg p-3 outline-none focus:border-teal" />
                  </div>
                </div>
              </div>
            )}
            
            <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-neutral-900 mb-4">Payment Method</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors">
                  <input type="radio" name="payment" defaultChecked className="w-4 h-4 accent-teal" />
                  <span className="font-bold text-sm text-neutral-900">Credit / Debit Card (Mock)</span>
                </label>
                <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors">
                  <input type="radio" name="payment" className="w-4 h-4 accent-teal" />
                  <span className="font-bold text-sm text-neutral-900">UPI (Mock)</span>
                </label>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Summary Column */}
      <div className="w-full lg:w-96 shrink-0">
        <div className="bg-white border border-border rounded-2xl p-6 shadow-sm sticky top-24">
          <h2 className="text-lg font-bold text-neutral-900 mb-6">Order Summary</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center text-sm font-medium text-neutral-600">
              <span>Items ({cartItems.reduce((a,c)=>a+c.cartQty,0)})</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between items-center text-sm font-medium text-neutral-600">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
            </div>
            <div className="border-t border-border pt-4 flex justify-between items-end">
              <span className="font-bold text-neutral-900">Total</span>
              <span className="text-2xl font-black text-neutral-900">₹{total}</span>
            </div>
          </div>
          
          {step === 'cart' ? (
            <button onClick={() => setStep('checkout')} disabled={cartItems.length === 0} className="w-full bg-teal hover:bg-teal/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl flex items-center justify-center transition-all shadow-md active:scale-[0.98]">
              Proceed to Checkout
            </button>
          ) : (
            <button onClick={() => setStep('success')} className="w-full bg-navy hover:bg-navy/90 text-white font-bold py-4 rounded-xl flex items-center justify-center transition-all shadow-md active:scale-[0.98]">
              Place Order
            </button>
          )}

          {step === 'cart' && cartItems.length > 0 && (
             <div className="mt-8 pt-6 border-t border-border">
               <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-4">You might also need</h3>
               <div className="flex items-center gap-3 p-2 hover:bg-neutral-50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-border">
                 <div className="w-12 h-12 bg-neutral-100 rounded-md overflow-hidden shrink-0"><img src="https://picsum.photos/seed/sensor/100/100" /></div>
                 <div className="flex-1">
                   <p className="text-sm font-bold text-neutral-900 line-clamp-1">HC-SR04 Sensor</p>
                   <p className="text-xs text-neutral-500">₹60</p>
                 </div>
                 <button className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-teal hover:text-white transition-colors">+</button>
               </div>
             </div>
          )}
        </div>
      </div>

    </div>
  );
}