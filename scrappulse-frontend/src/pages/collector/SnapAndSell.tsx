import React, { useState } from 'react';
import { Camera, CheckCircle2, ChevronRight, AlertTriangle, ScanLine, Scale } from 'lucide-react';
import { useMaterials } from '../../mocks/materials';

export const SnapAndSell = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isScanning, setIsScanning] = useState(false);
  const materials = useMaterials();
  const [detectedMaterial, setDetectedMaterial] = useState<any>(null);
  const [weight, setWeight] = useState<number>(10);

  const handleSnap = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      // Mock detection
      setDetectedMaterial(materials.find(m => m.id === 'm4')); // Circuit Boards (Hazardous)
      setStep(2);
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto space-y-6 pb-20">
      <h2 className="text-2xl font-bold text-navy dark:text-white">Snap & Sell</h2>
      
      {/* Step Indicators */}
      <div className="flex justify-between items-center px-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary-green text-white' : 'bg-neutral-100 text-neutral-400'}`}>1</div>
        <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-primary-green' : 'bg-neutral-100'}`} />
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary-green text-white' : 'bg-neutral-100 text-neutral-400'}`}>2</div>
        <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-primary-green' : 'bg-neutral-100'}`} />
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary-green text-white' : 'bg-neutral-100 text-neutral-400'}`}>3</div>
      </div>

      {step === 1 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="aspect-[4/3] bg-neutral-900 rounded-xl relative overflow-hidden flex items-center justify-center border-2 border-neutral-800">
            {isScanning ? (
              <div className="text-teal flex flex-col items-center gap-4">
                <ScanLine className="animate-pulse" size={48} />
                <p className="font-medium animate-pulse">Analyzing Material AI...</p>
              </div>
            ) : (
              <Camera className="text-neutral-500 opacity-50" size={64} />
            )}
          </div>
          <button 
            onClick={handleSnap}
            disabled={isScanning}
            className="w-full bg-navy text-white py-4 rounded-full font-bold text-lg shadow-lg hover:bg-navy/90 transition-all active:scale-95 disabled:opacity-70 disabled:active:scale-100"
          >
            {isScanning ? 'Processing...' : 'Take Photo'}
          </button>
        </div>
      )}

      {step === 2 && detectedMaterial && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-neutral-500 font-medium">Detected Material</p>
                <h3 className="text-2xl font-bold text-navy dark:text-white flex items-center gap-2">
                  {detectedMaterial.name} <CheckCircle2 className="text-primary-green" size={20} />
                </h3>
                <p className="text-sm text-primary-green font-medium mt-1">98% Confidence</p>
              </div>
            </div>
            
            {detectedMaterial.hazardous && (
              <div className="mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 p-4 rounded-lg flex gap-3">
                <AlertTriangle className="text-red-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-red-700 dark:text-red-400 text-sm">Hazardous Material Notice</h4>
                  <p className="text-sm text-red-600 dark:text-red-300 mt-1">Please handle with gloves. Do not break open.</p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Estimated Weight (kg)
            </label>
            <div className="flex items-center gap-4">
              <input 
                type="range" 
                min="1" max="100" 
                value={weight} 
                onChange={e => setWeight(Number(e.target.value))}
                className="flex-1 accent-primary-green h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="w-20 relative">
                <input 
                  type="number" 
                  value={weight} 
                  onChange={e => setWeight(Number(e.target.value))}
                  className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-3 pr-8 font-bold text-center focus:ring-2 focus:ring-primary-green outline-none"
                />
                <span className="absolute right-3 top-3 text-neutral-500 font-medium text-sm">kg</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setStep(3)}
            className="w-full bg-primary-green text-white py-4 rounded-full font-bold text-lg shadow-lg hover:bg-primary-green/90 transition-all active:scale-95 flex justify-center items-center gap-2"
          >
            Find Best Price <ChevronRight />
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
           {/* We will build Recycler Comparison here later */}
           <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 text-center space-y-4">
              <Scale className="mx-auto text-teal" size={48} />
              <h3 className="text-xl font-bold">Estimated Value: ₹{(detectedMaterial?.basePricePerKg * weight).toLocaleString()}</h3>
              <p className="text-neutral-500">Searching for authorized recyclers nearby...</p>
              
              <div className="mt-6 flex flex-col gap-3">
                <div className="border border-primary-green/30 bg-primary-green/5 p-4 rounded-xl flex justify-between items-center">
                  <div className="text-left">
                    <h4 className="font-bold">EcoWaste Solutions</h4>
                    <p className="text-sm text-neutral-500">5.1 km away</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-primary-green">₹{(detectedMaterial?.basePricePerKg * weight * 1.05).toLocaleString()}</p>
                    <span className="bg-primary-green text-white text-xs px-2 py-1 rounded-full">Recommended</span>
                  </div>
                </div>
                <button className="w-full bg-navy text-white py-3 rounded-xl font-bold shadow hover:bg-navy/90 transition-all active:scale-95">
                  Confirm Drop-off
                </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
