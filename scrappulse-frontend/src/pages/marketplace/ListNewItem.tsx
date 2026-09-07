import { useState } from 'react';
import { Camera, ShieldCheck, AlertOctagon, UploadCloud, ChevronRight, Zap, RefreshCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function ListNewItem() {
  const [step, setStep] = useState(1);
  const [analyzing, setAnalyzing] = useState(false);
  const [isHazardous, setIsHazardous] = useState(false);
  
  const handlePhotoUpload = (simulateHazard = false) => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setIsHazardous(simulateHazard);
      setStep(2);
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 lg:p-8">
      
      <div className="mb-8">
        <h1 className="text-2xl font-black text-neutral-900">List an Item for Reuse</h1>
        <p className="text-neutral-500 font-medium mt-1">Items must be safe, functional, or salvageable for parts.</p>
      </div>

      <div className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden relative">
        
        {/* Step 1: Upload */}
        <AnimatePresence mode="wait">
          {step === 1 && !analyzing && (
            <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-8 lg:p-12 text-center">
              <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera className="w-8 h-8 text-neutral-400" />
              </div>
              <h2 className="text-xl font-bold text-neutral-900 mb-2">Snap a clear photo</h2>
              <p className="text-sm text-neutral-500 mb-8 max-w-md mx-auto">Our AI will automatically classify the component and verify it is safe for the Second Life marketplace.</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <button onClick={() => handlePhotoUpload(false)} className="px-6 py-3 bg-teal hover:bg-teal/90 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98]">
                   <UploadCloud className="w-5 h-5" /> Simulate Safe Component
                 </button>
                 <button onClick={() => handlePhotoUpload(true)} className="px-6 py-3 bg-white border border-border hover:bg-neutral-50 text-neutral-700 font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.98]">
                   <UploadCloud className="w-5 h-5" /> Simulate Hazardous (Lithium)
                 </button>
              </div>
            </motion.div>
          )}

          {/* Analyzing State */}
          {analyzing && (
            <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-12 lg:p-24 flex flex-col items-center justify-center bg-navy relative overflow-hidden">
               <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />
               <RefreshCcw className="w-12 h-12 text-teal animate-spin mb-6" />
               <h2 className="text-xl font-bold text-white mb-2 relative z-10">Running Lens AI Verification...</h2>
               <p className="text-sm text-white/60 font-medium relative z-10">Checking for hazardous materials against CPCB lists.</p>
            </motion.div>
          )}

          {/* Step 2: Result & Details */}
          {step === 2 && !isHazardous && (
            <motion.div key="step2-safe" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 lg:p-8">
               <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-8 flex gap-4 items-start">
                 <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                   <ShieldCheck className="w-5 h-5 text-green-600" />
                 </div>
                 <div>
                   <h3 className="font-bold text-green-900 text-lg mb-1">Detected: Stepper Motor</h3>
                   <p className="text-sm text-green-800">✅ Verified reusable — not hazardous. You can proceed with listing this on the Second Life marketplace.</p>
                 </div>
               </div>

               <div className="space-y-6">
                 <div>
                   <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 block">Title</label>
                   <input type="text" defaultValue="NEMA 17 Stepper Motor" className="w-full bg-neutral-50 border border-border rounded-lg p-3 font-bold text-neutral-900 outline-none focus:border-teal" />
                 </div>
                 
                 <div className="grid sm:grid-cols-2 gap-6">
                   <div>
                     <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 block">Condition</label>
                     <select className="w-full bg-neutral-50 border border-border rounded-lg p-3 font-bold text-neutral-900 outline-none focus:border-teal">
                       <option>Working</option><option>Untested</option><option>For Parts / Repair</option>
                     </select>
                   </div>
                   <div>
                     <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 block">Quantity</label>
                     <input type="number" defaultValue={1} min={1} className="w-full bg-neutral-50 border border-border rounded-lg p-3 font-bold text-neutral-900 outline-none focus:border-teal" />
                   </div>
                 </div>

                 <div>
                   <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                     <span>Price (₹)</span>
                     <span className="text-teal text-[10px] flex items-center gap-1"><Zap className="w-3 h-3 fill-teal" /> Suggested: ₹400 - ₹500</span>
                   </label>
                   <input type="number" defaultValue={450} className="w-full bg-neutral-50 border border-border rounded-lg p-3 font-black text-2xl text-neutral-900 outline-none focus:border-teal" />
                 </div>

                 <div>
                   <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 block">Description & Specs</label>
                   <textarea rows={4} placeholder="Where did it come from? Are there any visible defects?" className="w-full bg-neutral-50 border border-border rounded-lg p-3 text-sm text-neutral-900 outline-none focus:border-teal resize-none"></textarea>
                 </div>
               </div>

               <div className="mt-8 pt-6 border-t border-border flex gap-4">
                 <button onClick={() => setStep(1)} className="px-6 py-3 bg-white border border-border hover:bg-neutral-50 text-neutral-700 font-bold rounded-xl transition-colors">Back</button>
                 <Link to="/marketplace" className="flex-1 px-6 py-3 bg-teal hover:bg-teal/90 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md">Publish Listing</Link>
               </div>
            </motion.div>
          )}

          {/* Step 2: Blocked Hazardous */}
          {step === 2 && isHazardous && (
            <motion.div key="step2-danger" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-8 lg:p-12 text-center bg-red-50/50">
               <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                 <AlertOctagon className="w-10 h-10 text-red-600" />
               </div>
               <h2 className="text-2xl font-black text-red-900 mb-4">Hazardous Material Detected</h2>
               <p className="text-red-700 font-medium mb-8 max-w-md mx-auto">
                 Lens AI detected a <strong>Swollen Lithium-Ion Battery</strong>. This item is hazardous and cannot be sold on the Second Life marketplace. It must be sent to an authorized recycler for safe disposal.
               </p>
               
               <div className="bg-white border border-red-200 rounded-xl p-6 max-w-md mx-auto mb-8 shadow-sm text-left">
                 <h3 className="font-bold text-neutral-900 text-sm mb-2">Required Action</h3>
                 <p className="text-xs text-neutral-500 mb-4">Please route this through the standard Kabadi Connect recycling flow to ensure proper traceability and safe handling.</p>
                 <Link to="/collector/sell" className="w-full py-3 bg-navy text-white text-sm font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-navy/90 transition-colors">
                   Switch to Recycling Flow <ChevronRight className="w-4 h-4" />
                 </Link>
               </div>

               <button onClick={() => setStep(1)} className="text-sm font-bold text-neutral-500 hover:text-neutral-900 transition-colors">Scan a different item</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}