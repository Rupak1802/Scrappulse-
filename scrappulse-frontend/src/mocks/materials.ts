export interface Material {
  id: string;
  name: string;
  category: string;
  basePricePerKg: number;
  hazardous: boolean;
  unit: string;
}

export const mockMaterials: Material[] = [
  { id: 'm1', name: 'Mixed E-Waste', category: 'General', basePricePerKg: 35, hazardous: false, unit: 'kg' },
  { id: 'm2', name: 'Copper Wire (Insulated)', category: 'Metal', basePricePerKg: 450, hazardous: false, unit: 'kg' },
  { id: 'm3', name: 'Lithium Batteries', category: 'Battery', basePricePerKg: 60, hazardous: true, unit: 'kg' },
  { id: 'm4', name: 'Circuit Boards (PCB)', category: 'Component', basePricePerKg: 200, hazardous: true, unit: 'kg' },
  { id: 'm5', name: 'CRT Monitors', category: 'Screen', basePricePerKg: 10, hazardous: true, unit: 'unit' },
  { id: 'm6', name: 'Copper Wire (Bare)', category: 'Metal', basePricePerKg: 520, hazardous: false, unit: 'kg' },
  { id: 'm7', name: 'Mixed Aluminum', category: 'Metal', basePricePerKg: 110, hazardous: false, unit: 'kg' },
  { id: 'm8', name: 'Steel Scrap', category: 'Metal', basePricePerKg: 45, hazardous: false, unit: 'kg' },
  { id: 'm9', name: 'Lead Acid Batteries', category: 'Battery', basePricePerKg: 85, hazardous: true, unit: 'kg' },
  { id: 'm10', name: 'Hard Drives (HDD)', category: 'Component', basePricePerKg: 75, hazardous: false, unit: 'kg' },
  { id: 'm11', name: 'Mobile Phones (Scrap)', category: 'Device', basePricePerKg: 1500, hazardous: true, unit: 'kg' },
  { id: 'm12', name: 'Laptops (Scrap)', category: 'Device', basePricePerKg: 800, hazardous: true, unit: 'kg' },
  { id: 'm13', name: 'Server Units', category: 'Device', basePricePerKg: 250, hazardous: false, unit: 'kg' },
  { id: 'm14', name: 'Plastic Casings (ABS)', category: 'Plastic', basePricePerKg: 25, hazardous: false, unit: 'kg' },
  { id: 'm15', name: 'Gold-Plated Connectors', category: 'Precious', basePricePerKg: 3500, hazardous: false, unit: 'kg' }
];

export const useMaterials = () => {
  return mockMaterials;
};
