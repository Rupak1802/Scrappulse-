import { useState, useEffect } from 'react';
import { Camera, Image as ImageIcon, Info, RotateCcw, ChevronRight, AlertTriangle, Mic, Scale, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

type Step = 'capture' | 'ai-result' | 'weight' | 'valuation';

export default function Sell() {
  const [step, setStep] = useState<Step>('capture');
  const navigate = useNavigate();

  // Step 1: Capture State
  const [photos, setPhotos] = useState<string[]>([]);
  
  // Step 2: AI Result State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [material, setMaterial] = useState('Copper Wire (Insulated)');
  
  // Step 3: Weight State
  const [weight, setWeight] = useState(15);
  const [isListening, setIsListening] = useState(false);

  const handleCapture = () => {
    if (photos.length < 3) {
      setPhotos([...photos, `https://picsum.photos/seed/${Math.random()}/200/200`]);
    }
  };

  const nextStep = (current: Step) => {
    if (current === 'capture') {
      setStep('ai-result');
      setIsAnalyzing(true);
      setTimeout(() => setIsAnalyzing(false), 2000);
    } else if (current === 'ai-result') {
      setStep('weight');
    } else if (current === 'weight') {
      setStep('valuation');
    }
  };

  const prevStep = (current: Step) => {
    if (current === 'ai-result') setStep('capture');
    else if (current === 'weight') setStep('ai-result');
    else if (current === 'valuation') setStep('weight');
  };

  const progress = {
    'capture': 25,
    'ai-result': 50,
    'weight': 75,
    'valuation': 100
  }[step];

  return (
    <div className="flex flex-col h-full bg-neutral-50 relative pb-20">
      {/* Header & Progress */}
      <div className="bg-white px-4 py-3 border-b border-border sticky top-0 z-10">
        <div className="flex items-center justify-between mb-3">
          <button onClick={() => step === 'capture' ? navigate(-1) : prevStep(step)} className="p-1 -ml-1 text-neutral-500 hover:text-neutral-900">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="font-semibold text-neutral-900">New Sale</span>
          <button className="text-sm font-medium text-teal hover:underline">Save Draft</button>
        </div>
        <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden w-full">
          <motion.div 
            className="h-full bg-teal"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="wait">
          {step === 'capture' && (
            <motion.div key="capture" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-neutral-900">Take a photo</h2>
                <p className="text-sm text-neutral-500 flex items-center gap-1 mt-1">
                  Clear photos get better AI estimates <Info className="w-3.5 h-3.5" />
                </p>
              </div>
              
              <div className="aspect-[3/4] bg-neutral-900 rounded-2xl relative overflow-hidden flex items-center justify-center mb-4">
                {/* Mock Camera Viewfinder */}
                <div className="absolute inset-4 border-2 border-white/20 rounded-lg pointer-events-none" />
                <div className="absolute inset-1/3 border border-white/40 pointer-events-none flex items-center justify-center">
                  <div className="w-1 h-1 bg-white rounded-full" />
                </div>
                
                <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-8">
                  <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                    <ImageIcon className="w-5 h-5 text-white" />
                  </button>
                  <button onClick={handleCapture} className="w-16 h-16 rounded-full border-4 border-white/50 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full transition-transform active:scale-95" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                    <RotateCcw className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {photos.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pb-2 snap-x">
                  {photos.map((src, i) => (
                    <div key={i} className="w-16 h-16 rounded-lg bg-neutral-200 shrink-0 snap-start overflow-hidden border-2 border-white shadow-sm relative">
                      <img src={src} alt="Captured" className="w-full h-full object-cover" />
                      <button onClick={() => setPhotos(photos.filter((_, idx) => idx !== i))} className="absolute top-0.5 right-0.5 bg-black/50 p-0.5 rounded-full">
                        <X className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  ))}
                  {photos.length < 3 && (
                    <button onClick={handleCapture} className="w-16 h-16 rounded-lg border-2 border-dashed border-border flex items-center justify-center text-neutral-400 shrink-0 snap-start">
                      <Camera className="w-5 h-5" />
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {step === 'ai-result' && (
            <motion.div key="ai" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              {isAnalyzing ? (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                  <div className="relative w-24 h-24">
                    <div className="absolute inset-0 border-4 border-neutral-100 rounded-full" />
                    <div className="absolute inset-0 border-4 border-teal rounded-full border-t-transparent animate-spin" />
                    <Sparkles className="w-8 h-8 text-teal absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">AI is analyzing...</h3>
                    <p className="text-sm text-neutral-500 mt-1">Identifying material type and grade</p>
                  </div>
                </div>
              ) : (
                <div>
                   <div className="mb-6">
                    <h2 className="text-xl font-bold text-neutral-900">Analysis Complete</h2>
                    <p className="text-sm text-neutral-500 mt-1">Confirm or edit the material</p>
                  </div>

                  <div className="bg-white rounded-xl border border-border p-1 overflow-hidden shadow-sm mb-6">
                    <img src={photos[0] || "https://picsum.photos/seed/copper/400/200"} className="w-full h-40 object-cover rounded-lg" alt="Analyzed" />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1.5 block">Detected Material</label>
                      <select 
                        value={material} 
                        onChange={(e) => setMaterial(e.target.value)}
                        className="w-full bg-white border border-border rounded-lg p-3.5 font-medium text-neutral-900 appearance-none focus:outline-none focus:ring-2 focus:ring-teal/50"
                      >
                        <option>Copper Wire (Insulated)</option>
                        <option>Copper Wire (Bare)</option>
                        <option>Mixed Aluminum</option>
                        <option>Printed Circuit Boards</option>
                      </select>
                    </div>

                    <div className="flex gap-2">
                      <div className="flex-1 bg-green-50 border border-green-100 rounded-lg p-3 flex flex-col items-center justify-center text-center">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mb-1" />
                        <span className="text-xs font-medium text-green-800">94% Confidence</span>
                      </div>
                      <div className="flex-1 bg-amber-50 border border-amber-100 rounded-lg p-3 flex flex-col items-center justify-center text-center relative group">
                        <AlertTriangle className="w-5 h-5 text-amber-600 mb-1" />
                        <span className="text-xs font-medium text-amber-800">Minor Hazard</span>
                        {/* Inline Tooltip Mock */}
                        <div className="hidden group-hover:block absolute bottom-full mb-2 bg-neutral-900 text-white text-xs p-2 rounded w-48 shadow-xl z-20 pointer-events-none text-left">
                          Insulation may contain PVC. Do not burn.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {step === 'weight' && (
            <motion.div key="weight" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-neutral-900">How much do you have?</h2>
                <p className="text-sm text-neutral-500 mt-1">Estimate the weight of {material}</p>
              </div>

              <div className="bg-white border border-border rounded-2xl p-6 shadow-sm mb-6 text-center">
                <div className="flex items-baseline justify-center gap-1 mb-8">
                  <span className="text-5xl font-black text-neutral-900 tracking-tighter">{weight}</span>
                  <span className="text-xl font-bold text-neutral-400">kg</span>
                </div>

                <input 
                  type="range" 
                  min="1" max="100" 
                  value={weight} 
                  onChange={(e) => setWeight(parseInt(e.target.value))}
                  className="w-full accent-teal h-2 bg-neutral-100 rounded-full appearance-none outline-none" 
                />
                <div className="flex justify-between text-xs font-medium text-neutral-400 mt-2 px-1">
                  <span>1kg</span>
                  <span>100kg+</span>
                </div>
              </div>

              <div className="flex justify-center">
                <button 
                  onClick={() => {
                    setIsListening(!isListening);
                    if (!isListening) setTimeout(() => { setWeight(25); setIsListening(false); }, 3000);
                  }}
                  className={cn(
                    "flex items-center gap-3 px-6 py-4 rounded-full border-2 transition-all",
                    isListening ? "border-teal bg-teal/5 shadow-lg shadow-teal/10" : "border-border bg-white"
                  )}
                >
                  <div className={cn("p-2 rounded-full", isListening ? "bg-teal text-white animate-pulse" : "bg-neutral-100 text-neutral-600")}>
                    <Mic className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-bold text-neutral-900">{isListening ? "Listening..." : "Tap to speak"}</span>
                    <span className="text-xs text-neutral-500 font-medium">Say "Pachis kilo"</span>
                  </div>
                  {isListening && (
                    <div className="flex gap-1 ml-4 items-center h-6">
                      {[1,2,3,4,5].map(i => (
                        <motion.div key={i} animate={{ height: [4, 16, 4] }} transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }} className="w-1 bg-teal rounded-full" />
                      ))}
                    </div>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {step === 'valuation' && (
            <motion.div key="val" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-neutral-900">Estimated Value</h2>
                <p className="text-sm text-neutral-500 mt-1">Based on current market rates in your zone</p>
              </div>

              <div className="bg-navy rounded-2xl p-6 text-white text-center shadow-lg mb-6 relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-teal/20 rounded-full blur-2xl pointer-events-none" />
                
                <h3 className="text-white/70 text-sm font-medium uppercase tracking-wider mb-2 relative z-10">Fair Range</h3>
                <div className="flex items-center justify-center gap-2 mb-4 relative z-10">
                  <span className="text-4xl font-black">₹4,200</span>
                  <span className="text-white/50 text-xl font-medium">-</span>
                  <span className="text-4xl font-black text-white/90">₹4,800</span>
                </div>
                
                <div className="bg-white/10 rounded-lg p-3 inline-flex items-center gap-2 backdrop-blur-sm border border-white/10 relative z-10">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-xs font-medium">+5% vs last week</span>
                </div>
              </div>

              <div className="bg-white border border-border rounded-xl p-4 shadow-sm mb-6">
                <h3 className="text-sm font-semibold text-neutral-900 mb-3">Market Position</h3>
                <div className="relative h-2 bg-neutral-100 rounded-full w-full">
                  <div className="absolute left-1/4 right-1/4 h-full bg-teal/20 rounded-full" />
                  <div className="absolute left-[35%] w-3 h-3 bg-teal border-2 border-white rounded-full top-1/2 -translate-y-1/2 shadow-sm z-10" />
                </div>
                <div className="flex justify-between text-xs font-medium mt-2">
                  <span className="text-red-500">Low (₹3.5k)</span>
                  <span className="text-teal font-bold bg-teal/10 px-2 py-0.5 rounded">Fair</span>
                  <span className="text-green-600">High (₹5k+)</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer CTA */}
      <div className="fixed bottom-16 left-0 right-0 bg-white p-4 border-t border-border z-20">
        <button 
          onClick={() => {
            if (step === 'valuation') navigate('/collector/recyclers');
            else if (photos.length > 0) nextStep(step);
          }}
          disabled={step === 'capture' && photos.length === 0}
          className="w-full bg-navy disabled:bg-neutral-200 disabled:text-neutral-400 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
        >
          {step === 'valuation' ? 'Compare Recyclers' : 'Continue'}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// Inline X component since lucide-react X wasn't imported properly at top
function X({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  );
}