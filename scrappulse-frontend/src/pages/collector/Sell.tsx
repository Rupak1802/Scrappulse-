import { useState } from 'react';
import { Camera, Image as ImageIcon, Info, RotateCcw, ChevronRight, AlertTriangle, Mic, Scale, ChevronLeft, CheckCircle2, Sparkles, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
    <div className="flex flex-col min-h-[calc(100vh-64px)] lg:min-h-0 bg-neutral-50 lg:bg-transparent lg:py-8 lg:px-4">
      <div className="flex flex-col flex-1 lg:flex-none lg:max-w-2xl lg:mx-auto w-full lg:bg-white lg:border lg:border-border lg:rounded-3xl lg:shadow-xl lg:overflow-hidden relative bg-neutral-50 pb-20 lg:pb-0">
        
        {/* Header & Progress */}
        <div className="bg-white px-4 py-3 lg:p-6 border-b border-border sticky top-0 z-30 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => step === 'capture' ? navigate(-1) : prevStep(step)} className="p-2 -ml-2 text-neutral-500 hover:text-neutral-900 bg-neutral-100 lg:bg-white rounded-full transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-black text-neutral-900 lg:text-lg">New Sale Estimate</span>
            <button className="text-sm font-bold text-teal hover:underline bg-teal/10 px-3 py-1.5 rounded-full">Save Draft</button>
          </div>
          <div className="h-2 bg-neutral-100 rounded-full overflow-hidden w-full relative">
            <motion.div 
              className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-teal to-green-500 rounded-full shadow-[0_0_10px_rgba(20,184,166,0.5)]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8 relative">
          <AnimatePresence mode="wait">
            {step === 'capture' && (
              <motion.div key="capture" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="mb-6">
                  <h2 className="text-2xl font-black text-neutral-900">Take a photo</h2>
                  <p className="text-sm font-medium text-neutral-500 flex items-center gap-1 mt-1">
                    Clear photos get better AI estimates <Info className="w-4 h-4 text-teal" />
                  </p>
                </div>
                
                <div className="aspect-[3/4] sm:aspect-square lg:aspect-video bg-neutral-900 rounded-3xl relative overflow-hidden flex items-center justify-center mb-6 shadow-inner border border-neutral-800">
                  {/* Mock Camera Viewfinder */}
                  <div className="absolute inset-4 lg:inset-8 border-2 border-white/20 rounded-2xl pointer-events-none" />
                  <div className="absolute inset-1/3 border border-white/40 pointer-events-none flex items-center justify-center rounded-lg">
                    <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]" />
                  </div>
                  
                  <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-8 lg:gap-12">
                    <button className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md hover:bg-white/20 transition-colors">
                      <ImageIcon className="w-6 h-6 text-white" />
                    </button>
                    <button onClick={handleCapture} className="w-20 h-20 rounded-full border-4 border-white/50 flex items-center justify-center hover:border-white transition-colors group">
                      <div className="w-14 h-14 bg-white rounded-full transition-transform group-active:scale-90" />
                    </button>
                    <button className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md hover:bg-white/20 transition-colors">
                      <RotateCcw className="w-6 h-6 text-white" />
                    </button>
                  </div>
                </div>

                {photos.length > 0 && (
                  <div className="flex gap-3 overflow-x-auto pb-2 snap-x hide-scrollbar">
                    {photos.map((src, i) => (
                      <div key={i} className="w-20 h-20 lg:w-24 lg:h-24 rounded-xl bg-neutral-200 shrink-0 snap-start overflow-hidden border-2 border-white shadow-md relative">
                        <img src={src} alt="Captured" className="w-full h-full object-cover" />
                        <button onClick={() => setPhotos(photos.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 bg-black/60 p-1 rounded-full backdrop-blur-sm hover:bg-red-500 transition-colors">
                          <X className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    ))}
                    {photos.length < 3 && (
                      <button onClick={handleCapture} className="w-20 h-20 lg:w-24 lg:h-24 rounded-xl border-2 border-dashed border-border bg-neutral-50 hover:bg-neutral-100 flex items-center justify-center text-neutral-400 shrink-0 snap-start transition-colors">
                        <Camera className="w-6 h-6" />
                      </button>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {step === 'ai-result' && (
              <motion.div key="ai" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                {isAnalyzing ? (
                  <div className="flex flex-col items-center justify-center py-32 lg:py-40 text-center space-y-6">
                    <div className="relative w-32 h-32">
                      <div className="absolute inset-0 border-4 border-neutral-100 rounded-full" />
                      <div className="absolute inset-0 border-4 border-teal rounded-full border-t-transparent animate-spin" />
                      <Sparkles className="w-10 h-10 text-teal absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-black text-2xl text-neutral-900">AI is analyzing...</h3>
                      <p className="text-neutral-500 mt-2 font-medium">Identifying material type and grade</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-6 lg:mb-8">
                      <h2 className="text-2xl font-black text-neutral-900">Analysis Complete</h2>
                      <p className="text-sm font-medium text-neutral-500 mt-1">Confirm or edit the material</p>
                    </div>

                    <div className="bg-white rounded-2xl border border-border p-1.5 overflow-hidden shadow-sm mb-8">
                      <img src={photos[0] || "https://picsum.photos/seed/copper/600/300"} className="w-full h-48 lg:h-64 object-cover rounded-xl" alt="Analyzed" />
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 block pl-1">Detected Material</label>
                        <select 
                          value={material} 
                          onChange={(e) => setMaterial(e.target.value)}
                          className="w-full bg-neutral-50 border border-border rounded-xl p-4 font-bold text-neutral-900 appearance-none focus:outline-none focus:ring-2 focus:ring-teal/50 shadow-sm cursor-pointer"
                        >
                          <option>Copper Wire (Insulated)</option>
                          <option>Copper Wire (Bare)</option>
                          <option>Mixed Aluminum</option>
                          <option>Printed Circuit Boards</option>
                        </select>
                      </div>

                      <div className="flex gap-3">
                        <div className="flex-1 bg-green-50 border border-green-200 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm">
                          <CheckCircle2 className="w-6 h-6 text-green-600 mb-2" />
                          <span className="text-sm font-bold text-green-800">94% Confidence</span>
                        </div>
                        <div className="flex-1 bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col items-center justify-center text-center relative group shadow-sm">
                          <AlertTriangle className="w-6 h-6 text-amber-600 mb-2" />
                          <span className="text-sm font-bold text-amber-800">Minor Hazard</span>
                          <div className="hidden group-hover:block absolute bottom-full mb-2 bg-neutral-900 text-white text-xs p-3 rounded-lg w-56 shadow-xl z-20 pointer-events-none text-left">
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
                <div className="mb-8">
                  <h2 className="text-2xl font-black text-neutral-900">How much do you have?</h2>
                  <p className="text-sm font-medium text-neutral-500 mt-1">Estimate the weight of <span className="font-bold text-neutral-700">{material}</span></p>
                </div>

                <div className="bg-white border border-border rounded-3xl p-8 lg:p-12 shadow-sm mb-8 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><Scale className="w-32 h-32" /></div>
                  <div className="flex items-baseline justify-center gap-1 mb-10 relative z-10">
                    <span className="text-6xl lg:text-7xl font-black text-neutral-900 tracking-tighter">{weight}</span>
                    <span className="text-2xl font-bold text-neutral-400">kg</span>
                  </div>

                  <input 
                    type="range" 
                    min="1" max="100" 
                    value={weight} 
                    onChange={(e) => setWeight(parseInt(e.target.value))}
                    className="w-full accent-teal h-3 bg-neutral-100 rounded-full appearance-none outline-none relative z-10 cursor-pointer shadow-inner" 
                  />
                  <div className="flex justify-between text-xs font-bold text-neutral-400 mt-3 px-1 relative z-10">
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
                      "flex items-center gap-4 px-8 py-5 rounded-full border-2 transition-all shadow-sm hover:shadow-md",
                      isListening ? "border-teal bg-teal/5" : "border-border bg-white hover:border-neutral-300"
                    )}
                  >
                    <div className={cn("p-3 rounded-full transition-colors", isListening ? "bg-teal text-white animate-pulse" : "bg-neutral-100 text-neutral-600")}>
                      <Mic className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col items-start text-left">
                      <span className="text-base font-black text-neutral-900">{isListening ? "Listening..." : "Tap to speak"}</span>
                      <span className="text-sm text-neutral-500 font-medium">Say "Pachis kilo"</span>
                    </div>
                    {isListening && (
                      <div className="flex gap-1.5 ml-6 items-center h-8">
                        {[1,2,3,4,5].map(i => (
                          <motion.div key={i} animate={{ height: [6, 24, 6] }} transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }} className="w-1.5 bg-teal rounded-full" />
                        ))}
                      </div>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'valuation' && (
              <motion.div key="val" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="mb-8">
                  <h2 className="text-2xl font-black text-neutral-900">Estimated Value</h2>
                  <p className="text-sm font-medium text-neutral-500 mt-1">Based on current market rates in your zone</p>
                </div>

                <div className="bg-gradient-to-br from-navy to-slate-900 rounded-3xl p-8 lg:p-10 text-white text-center shadow-2xl mb-8 relative overflow-hidden">
                  <div className="absolute -top-16 -right-16 w-56 h-56 bg-teal/20 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-green-500/20 rounded-full blur-3xl pointer-events-none" />
                  
                  <h3 className="text-white/70 text-sm font-bold uppercase tracking-widest mb-4 relative z-10">Fair Range</h3>
                  <div className="flex items-center justify-center gap-3 mb-6 relative z-10">
                    <span className="text-5xl lg:text-6xl font-black text-white">₹4,200</span>
                    <span className="text-white/40 text-3xl font-medium">-</span>
                    <span className="text-5xl lg:text-6xl font-black text-white/90">₹4,800</span>
                  </div>
                  
                  <div className="bg-white/10 rounded-full px-4 py-2 inline-flex items-center gap-2 backdrop-blur-md border border-white/20 relative z-10 shadow-sm">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <span className="text-sm font-bold text-white tracking-wide">+5% vs last week</span>
                  </div>
                </div>

                <div className="bg-white border border-border rounded-2xl p-6 shadow-sm mb-6">
                  <h3 className="text-sm font-bold text-neutral-900 mb-4 uppercase tracking-wider">Market Position</h3>
                  <div className="relative h-3 bg-neutral-100 rounded-full w-full shadow-inner">
                    <div className="absolute left-1/4 right-1/4 h-full bg-gradient-to-r from-teal/40 to-teal/40 rounded-full" />
                    <div className="absolute left-[35%] w-4 h-4 bg-teal border-2 border-white rounded-full top-1/2 -translate-y-1/2 shadow-md z-10 ring-4 ring-teal/20" />
                  </div>
                  <div className="flex justify-between text-xs font-black uppercase tracking-wider mt-4">
                    <span className="text-red-500">Low (₹3.5k)</span>
                    <span className="text-teal bg-teal/10 px-3 py-1 rounded-full border border-teal/20">Fair</span>
                    <span className="text-green-600">High (₹5k+)</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer CTA */}
        <div className="fixed bottom-[64px] lg:sticky lg:bottom-0 left-0 right-0 lg:left-auto lg:right-auto bg-white/90 backdrop-blur-md p-4 lg:p-6 border-t border-border z-40 lg:rounded-b-3xl">
          <button 
            onClick={() => {
              if (step === 'valuation') navigate('/collector/recyclers');
              else if (photos.length > 0) nextStep(step);
            }}
            disabled={step === 'capture' && photos.length === 0}
            className="w-full bg-navy disabled:bg-neutral-200 disabled:text-neutral-400 text-white font-black text-lg py-4 lg:py-5 rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all hover:bg-navy/90 hover:shadow-xl active:scale-[0.98]"
          >
            {step === 'valuation' ? 'Compare Recyclers' : 'Continue'}
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
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