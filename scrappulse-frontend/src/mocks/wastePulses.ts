export interface WastePulse {
  id: string;
  zone: string;
  materialId: string;
  materialName: string;
  priceIncreasePct: number;
  activeUntil: string;
}

export const mockWastePulses: WastePulse[] = [
  { id: 'wp1', zone: 'Andheri East', materialId: 'm2', materialName: 'Copper Wire (Insulated)', priceIncreasePct: 15, activeUntil: '2026-09-08T18:00:00Z' },
  { id: 'wp2', zone: 'Bandra West', materialId: 'm4', materialName: 'Circuit Boards (PCB)', priceIncreasePct: 10, activeUntil: '2026-09-09T12:00:00Z' },
  { id: 'wp3', zone: 'MIDC Phase 1', materialId: 'm6', materialName: 'Copper Wire (Bare)', priceIncreasePct: 20, activeUntil: '2026-09-07T22:00:00Z' },
  { id: 'wp4', zone: 'Powai Plaza', materialId: 'm7', materialName: 'Mixed Aluminum', priceIncreasePct: 8, activeUntil: '2026-09-10T09:00:00Z' },
  { id: 'wp5', zone: 'SEEPZ Tech Park', materialId: 'm13', materialName: 'Server Units', priceIncreasePct: 12, activeUntil: '2026-09-11T17:00:00Z' },
  { id: 'wp6', zone: 'Malad West', materialId: 'm11', materialName: 'Mobile Phones (Scrap)', priceIncreasePct: 18, activeUntil: '2026-09-08T20:00:00Z' },
];

export const useWastePulses = () => mockWastePulses;
