export interface LensScanResult { id: string; userId: string; image: string; detectedComponent: string; confidence: number; suggestedIdeaIds: string[]; scannedAt: string; }
export const mockScans: LensScanResult[] = [
  { id: 'S-401', userId: 'U-ME', image: 'https://picsum.photos/seed/scan1/400/400', detectedComponent: 'NEMA 17 Stepper Motor', confidence: 96, suggestedIdeaIds: ['I-301'], scannedAt: '2026-09-07T10:00:00Z' },
  { id: 'S-402', userId: 'U-ME', image: 'https://picsum.photos/seed/scan2/400/400', detectedComponent: 'Ultrasonic Sensor HC-SR04', confidence: 92, suggestedIdeaIds: ['I-302'], scannedAt: '2026-09-06T15:20:00Z' }
];
export const useScans = () => mockScans;
