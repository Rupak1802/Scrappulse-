export interface Order { id: string; buyerId: string; listingId: string; quantity: number; status: string; amount: number; fulfillmentMethod: string; createdAt: string; }
export const mockOrders: Order[] = [
  { id: 'ORD-501', buyerId: 'U-ME', listingId: 'L-101', quantity: 2, status: 'Completed', amount: 900, fulfillmentMethod: 'Pickup', createdAt: '2026-09-04T12:00:00Z' },
  { id: 'ORD-502', buyerId: 'U-ME', listingId: 'L-105', quantity: 1, status: 'Shipped', amount: 100, fulfillmentMethod: 'Delivery', createdAt: '2026-09-06T15:30:00Z' }
];
export const useOrders = () => mockOrders;
