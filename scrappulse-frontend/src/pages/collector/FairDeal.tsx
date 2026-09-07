import { useState } from 'react';
import { ChevronLeft, Scale, Share2, Printer, AlertCircle, TrendingUp, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer, BarChart, Bar, Cell, LineChart, Line, YAxis, Tooltip, ReferenceLine } from 'recharts';

const historicalData = [
  { date: 'Sep 1', offer: 58, fairMin: 60, fairMax: 65 },
  { date: 'Sep 2', offer: 60, fairMin: 60, fairMax: 65 },
  { date: 'Sep 3', offer: 62, fairMin: 61, fairMax: 66 },
  { date: 'Sep 4', offer: 59, fairMin: 61, fairMax: 66 },
  { date: 'Sep 5', offer: 61, fairMin: 62, fairMax: 67 },
  { date: 'Sep 6', offer: 63, fairMin: 63, fairMax: 68 },
  { date: 'Sep 7', offer: 58, fairMin: 64, fairMax: 69 },
];

export default function FairDeal() {
  const navigate = useNavigate();
  const [material, setMaterial] = useState('Copper Wire (Insulated)');
  const [weight, setWeight] = useState<number>(15);
  const [offerPrice, setOfferPrice] = useState<number>(58);

  const getFairPrices = (mat: string) => {
    if (mat === 'Copper Wire (Bare)') return { min: 72, max: 78 };
    if (mat === 'Mixed Aluminum') return { min: 45, max: 50 };
    return { min: 64, max: 69 }; // Default Copper Wire (Insulated)
  };

  const { min: fairPriceMin, max: fairPriceMax } = getFairPrices(material);
  const isFair = offerPrice >= fairPriceMin && offerPrice <= fairPriceMax;
  const isLow = offerPrice < fairPriceMin;
  const isHigh = offerPrice > fairPriceMax;

  const totalOffer = weight * offerPrice;
  const totalFairMin = weight * fairPriceMin;
  const lossAmount = totalFairMin - totalOffer;

  const comparisonData = [
    { name: 'Offer', value: totalOffer },
    { name: 'Fair Range', value: totalFairMin }
  ];

  const handleShare = async () => {
    const text = `Check out this ScrapPulse FairDeal analysis! I checked a ${weight}kg offer of ${material} at ₹${offerPrice}/kg. The fair market range is ₹${fairPriceMin}-₹${fairPriceMax}/kg.`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'ScrapPulse FairDeal Check',
          text: text,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(text + ' ' + window.location.href);
      alert('Analysis link copied to clipboard!');
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-neutral-50 pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b border-border sticky top-0 z-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-neutral-500 hover:text-neutral-900">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="font-semibold text-neutral-900 leading-tight">FairDeal Check</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={() => window.print()} className="p-2 text-neutral-500 hover:bg-neutral-100 rounded-full"><Printer className="w-5 h-5" /></button>
          <button onClick={handleShare} className="p-2 text-teal hover:bg-teal/10 rounded-full"><Share2 className="w-5 h-5" /></button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Input Card */}
        <div className="bg-white rounded-xl border border-border p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-neutral-900 flex items-center gap-2 mb-4">
            <Scale className="w-4 h-4 text-teal" /> Check a price offer
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1.5 block">Material</label>
              <select 
                value={material} 
                onChange={(e) => setMaterial(e.target.value)}
                className="w-full bg-neutral-50 border border-border rounded-lg p-3 text-sm font-medium text-neutral-900 outline-none focus:ring-2 focus:ring-teal/50"
              >
                <option>Copper Wire (Insulated)</option>
                <option>Copper Wire (Bare)</option>
                <option>Mixed Aluminum</option>
              </select>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1.5 block">Weight (kg)</label>
                <input 
                  type="number" 
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full bg-neutral-50 border border-border rounded-lg p-3 text-sm font-medium text-neutral-900 outline-none focus:ring-2 focus:ring-teal/50"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1.5 block">Offered ₹/kg</label>
                <input 
                  type="number" 
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(Number(e.target.value))}
                  className="w-full bg-neutral-50 border border-border rounded-lg p-3 text-sm font-bold text-neutral-900 outline-none focus:ring-2 focus:ring-teal/50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Status Tag */}
        <div className={`rounded-xl p-5 shadow-sm text-center border ${isLow ? 'bg-red-50 border-red-200' : isFair ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}>
          <div className="flex justify-center mb-2">
            {isLow ? <AlertCircle className="w-10 h-10 text-red-500" /> : isFair ? <Scale className="w-10 h-10 text-green-500" /> : <TrendingUp className="w-10 h-10 text-blue-500" />}
          </div>
          <h2 className={`text-2xl font-black tracking-tight mb-1 ${isLow ? 'text-red-700' : isFair ? 'text-green-700' : 'text-blue-700'}`}>
            {isLow ? 'LOW OFFER' : isFair ? 'FAIR DEAL' : 'GREAT OFFER'}
          </h2>
          <p className={`text-sm font-medium ${isLow ? 'text-red-600/80' : isFair ? 'text-green-600/80' : 'text-blue-600/80'}`}>
            Fair market range is ₹{fairPriceMin} - ₹{fairPriceMax}/kg
          </p>
        </div>

        {/* Gain/Loss Statement */}
        {isLow && (
          <div className="bg-white rounded-xl border border-border p-4 shadow-sm">
            <h3 className="font-bold text-neutral-900 mb-4">Value Comparison</h3>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-neutral-500 font-medium">Total Offered</p>
                <p className="text-lg font-bold text-neutral-900">₹{totalOffer.toLocaleString()}</p>
              </div>
              <div className="h-8 w-px bg-border"></div>
              <div className="text-right">
                <p className="text-xs text-neutral-500 font-medium">Total Fair Value</p>
                <p className="text-lg font-bold text-teal">₹{totalFairMin.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm font-bold flex items-center gap-2 border border-red-100">
              <TrendingUp className="w-4 h-4 rotate-180" />
              You are losing ₹{lossAmount.toLocaleString()} on this deal
            </div>
            
            <div className="h-20 w-full mt-6 relative">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <YAxis type="category" dataKey="name" hide />
                  <Bar dataKey="value" barSize={20} radius={[0, 4, 4, 0]}>
                    {comparisonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#ef4444' : '#00897B'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 pointer-events-none flex flex-col justify-between py-1">
                <span className="text-[10px] font-bold text-white ml-2 z-10 drop-shadow-md">OFFERED</span>
                <span className="text-[10px] font-bold text-white ml-2 z-10 drop-shadow-md">FAIR RANGE MIN</span>
              </div>
            </div>
          </div>
        )}

        {/* Historical Mini-Chart */}
        <div className="bg-white rounded-xl border border-border p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-neutral-900">Recycler's Pricing History</h3>
            <div className="flex items-center gap-1 text-[10px] font-semibold text-neutral-500 uppercase">
              <span className="w-2 h-2 rounded-full bg-teal block"></span> Fair Range
              <span className="w-2 h-2 rounded-full bg-neutral-800 block ml-2"></span> Their Offers
            </div>
          </div>
          
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <YAxis domain={['dataMin - 2', 'dataMax + 2']} tick={{ fontSize: 10, fill: '#a3a3a3' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#171717' }}
                />
                {/* Simulated area for fair range */}
                <Line type="monotone" dataKey="fairMin" stroke="#00897B" strokeWidth={1} strokeDasharray="3 3" dot={false} />
                <Line type="monotone" dataKey="fairMax" stroke="#00897B" strokeWidth={1} strokeDasharray="3 3" dot={false} />
                {/* Actual offers */}
                <Line type="monotone" dataKey="offer" stroke="#171717" strokeWidth={3} dot={{ r: 4, fill: '#171717', strokeWidth: 0 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-3 bg-neutral-50 p-2.5 rounded-lg text-xs text-neutral-600 flex items-start gap-2 border border-neutral-100">
            <Info className="w-4 h-4 text-neutral-400 shrink-0" />
            <p>This recycler consistently offers 5-8% below fair market value for Copper Wire.</p>
          </div>
        </div>
      </div>
    </div>
  );
}