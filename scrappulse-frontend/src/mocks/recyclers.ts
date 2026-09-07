export interface Recycler {
  id: string;
  name: string;
  distanceKm: number;
  reliabilityScore: number;
  isAuthorized: boolean;
  basePriceOffers: Record<string, number>;
}

export const mockRecyclers: Recycler[] = [
  { id: 'r1', name: 'GreenTech Recycling', distanceKm: 2.4, reliabilityScore: 98, isAuthorized: true, basePriceOffers: { 'm1': 38, 'm2': 460, 'm3': 65, 'm4': 205, 'm6': 530 } },
  { id: 'r2', name: 'EcoWaste Solutions', distanceKm: 5.1, reliabilityScore: 92, isAuthorized: true, basePriceOffers: { 'm1': 35, 'm2': 440, 'm3': 60, 'm6': 515, 'm7': 115 } },
  { id: 'r3', name: 'Metro Scrap Traders', distanceKm: 1.2, reliabilityScore: 75, isAuthorized: false, basePriceOffers: { 'm1': 40, 'm2': 470, 'm3': 50, 'm4': 190, 'm6': 540 } },
  { id: 'r4', name: 'EcoTech Recyclers', distanceKm: 3.8, reliabilityScore: 95, isAuthorized: true, basePriceOffers: { 'm2': 465, 'm4': 210, 'm7': 110, 'm11': 1550, 'm12': 820 } },
  { id: 'r5', name: 'SafeDispose Inc.', distanceKm: 6.5, reliabilityScore: 99, isAuthorized: true, basePriceOffers: { 'm3': 68, 'm4': 200, 'm9': 90, 'm11': 1450 } },
  { id: 'r6', name: 'Mumbai Metal Works', distanceKm: 4.2, reliabilityScore: 88, isAuthorized: true, basePriceOffers: { 'm2': 455, 'm6': 525, 'm7': 105, 'm8': 48 } },
  { id: 'r7', name: 'Rapid E-Waste', distanceKm: 8.0, reliabilityScore: 84, isAuthorized: true, basePriceOffers: { 'm1': 36, 'm4': 195, 'm10': 80, 'm12': 780 } },
  { id: 'r8', name: 'Local Kabadiwala #1', distanceKm: 0.5, reliabilityScore: 60, isAuthorized: false, basePriceOffers: { 'm1': 30, 'm2': 430, 'm7': 100, 'm8': 42 } },
  { id: 'r9', name: 'TechSalvage Co.', distanceKm: 12.4, reliabilityScore: 96, isAuthorized: true, basePriceOffers: { 'm4': 215, 'm10': 78, 'm11': 1600, 'm12': 850, 'm13': 260 } },
  { id: 'r10', name: 'Precious Metals Recovery', distanceKm: 15.0, reliabilityScore: 97, isAuthorized: true, basePriceOffers: { 'm4': 220, 'm11': 1650, 'm15': 3600 } },
];

export const useRecyclers = () => mockRecyclers;
