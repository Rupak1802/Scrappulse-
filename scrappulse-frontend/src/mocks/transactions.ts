import type { Material } from './materials';

export interface Transaction {
  id: string;
  collectorId: string;
  recyclerId: string;
  materialId: string;
  weightKg: number;
  totalAmount: number;
  date: string;
  status: 'completed' | 'pending' | 'flagged';
}

export const mockTransactions: Transaction[] = [
  { id: 'TRX-1001', collectorId: 'c1', recyclerId: 'r1', materialId: 'm2', weightKg: 15.0, totalAmount: 6900, date: '2026-09-01T10:30:00Z', status: 'completed' },
  { id: 'TRX-1002', collectorId: 'c2', recyclerId: 'r2', materialId: 'm1', weightKg: 120.0, totalAmount: 4200, date: '2026-09-02T14:15:00Z', status: 'completed' },
  { id: 'TRX-1003', collectorId: 'c1', recyclerId: 'r1', materialId: 'm3', weightKg: 5.0, totalAmount: 325, date: '2026-09-03T09:00:00Z', status: 'completed' },
  { id: 'TRX-1004', collectorId: 'c3', recyclerId: 'r3', materialId: 'm4', weightKg: 50.0, totalAmount: 10000, date: '2026-09-04T11:45:00Z', status: 'flagged' },
  { id: 'TRX-1005', collectorId: 'c4', recyclerId: 'r4', materialId: 'm6', weightKg: 8.5, totalAmount: 4505, date: '2026-09-04T13:20:00Z', status: 'completed' },
  { id: 'TRX-1006', collectorId: 'c2', recyclerId: 'r5', materialId: 'm9', weightKg: 25.0, totalAmount: 2250, date: '2026-09-05T08:30:00Z', status: 'completed' },
  { id: 'TRX-1007', collectorId: 'c1', recyclerId: 'r6', materialId: 'm7', weightKg: 45.0, totalAmount: 4725, date: '2026-09-05T15:10:00Z', status: 'pending' },
  { id: 'TRX-1008', collectorId: 'c5', recyclerId: 'r1', materialId: 'm2', weightKg: 22.0, totalAmount: 10120, date: '2026-09-06T10:05:00Z', status: 'completed' },
  { id: 'TRX-1009', collectorId: 'c3', recyclerId: 'r7', materialId: 'm1', weightKg: 80.0, totalAmount: 2880, date: '2026-09-06T12:40:00Z', status: 'completed' },
  { id: 'TRX-1010', collectorId: 'c6', recyclerId: 'r2', materialId: 'm3', weightKg: 12.0, totalAmount: 720, date: '2026-09-06T14:55:00Z', status: 'completed' },
  { id: 'TRX-1011', collectorId: 'c4', recyclerId: 'r9', materialId: 'm11', weightKg: 3.5, totalAmount: 5600, date: '2026-09-06T16:30:00Z', status: 'completed' },
  { id: 'TRX-1012', collectorId: 'c1', recyclerId: 'r4', materialId: 'm4', weightKg: 18.0, totalAmount: 3780, date: '2026-09-07T09:15:00Z', status: 'pending' },
  { id: 'TRX-1013', collectorId: 'c7', recyclerId: 'r10', materialId: 'm15', weightKg: 1.2, totalAmount: 4320, date: '2026-09-07T10:20:00Z', status: 'completed' },
  { id: 'TRX-1014', collectorId: 'c2', recyclerId: 'r6', materialId: 'm8', weightKg: 150.0, totalAmount: 7200, date: '2026-09-07T11:05:00Z', status: 'flagged' },
  { id: 'TRX-1015', collectorId: 'c5', recyclerId: 'r5', materialId: 'm4', weightKg: 42.0, totalAmount: 8400, date: '2026-09-07T13:45:00Z', status: 'completed' },
  { id: 'TRX-1016', collectorId: 'c8', recyclerId: 'r8', materialId: 'm2', weightKg: 5.5, totalAmount: 2365, date: '2026-09-07T14:30:00Z', status: 'completed' },
  { id: 'TRX-1017', collectorId: 'c3', recyclerId: 'r9', materialId: 'm13', weightKg: 65.0, totalAmount: 16900, date: '2026-09-07T15:10:00Z', status: 'pending' },
  { id: 'TRX-1018', collectorId: 'c1', recyclerId: 'r4', materialId: 'm12', weightKg: 14.0, totalAmount: 11480, date: '2026-09-07T16:00:00Z', status: 'completed' }
];

export const useTransactions = () => mockTransactions;
