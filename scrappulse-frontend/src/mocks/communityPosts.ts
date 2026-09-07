export interface CommunityPost { id: string; authorId: string; authorName: string; channel: string; title: string; images: string[]; body: string; linkedListingId?: string; linkedIdeaId?: string; likes: number; commentCount: number; createdAt: string; }
export const mockPosts: CommunityPost[] = [
  { id: 'P-201', authorId: 'U-010', authorName: 'Arjun Maker', channel: '#motors-and-mechanics', title: 'Built a self-watering plant system', images: ['https://picsum.photos/seed/build1/600/400'], body: 'Using the salvaged 12V DC motor I got from the marketplace, I hooked it up to a soil moisture sensor to automatically pump water.', linkedListingId: 'L-102', likes: 124, commentCount: 15, createdAt: '2026-09-06T18:00:00Z' },
  { id: 'P-202', authorId: 'U-012', authorName: 'Priya Tech', channel: '#displays', title: 'Revived this old 16x2 LCD', images: ['https://picsum.photos/seed/build2/600/400'], body: 'Bought an untested LCD, resoldered the header pins and it works perfectly! Im going to use it for a weather station.', linkedListingId: 'L-103', likes: 89, commentCount: 6, createdAt: '2026-09-07T09:15:00Z' }
];
export const usePosts = () => mockPosts;
