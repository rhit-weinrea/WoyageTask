import { JSONPlaceholderPhoto, PicsumPhoto, GalleryImage } from '@/types/image';

// Mock data for when API calls fail (useful for development/testing)
const mockJSONPlaceholderPhotos: GalleryImage[] = Array.from({ length: 15 }, (_, i) => ({
  id: `jp-${i + 1}`,
  title: `Sample Photo ${i + 1} from JSONPlaceholder`,
  thumbnailUrl: `https://via.placeholder.com/150/${['FF6B6B', '4ECDC4', '45B7D1', 'FFA07A', '98D8C8'][i % 5]}/FFFFFF?text=Photo+${i + 1}`,
  fullUrl: `https://via.placeholder.com/600/${['FF6B6B', '4ECDC4', '45B7D1', 'FFA07A', '98D8C8'][i % 5]}/FFFFFF?text=Photo+${i + 1}`,
  source: 'jsonplaceholder' as const,
}));

const mockPicsumPhotos: GalleryImage[] = Array.from({ length: 15 }, (_, i) => ({
  id: `picsum-${i + 1}`,
  title: `Sample Photo by Author ${i + 1}`,
  author: `Photographer ${i + 1}`,
  thumbnailUrl: `https://via.placeholder.com/150/${['9B59B6', '3498DB', 'E74C3C', '2ECC71', 'F39C12'][i % 5]}/FFFFFF?text=Picsum+${i + 1}`,
  fullUrl: `https://via.placeholder.com/600/${['9B59B6', '3498DB', 'E74C3C', '2ECC71', 'F39C12'][i % 5]}/FFFFFF?text=Picsum+${i + 1}`,
  source: 'picsum' as const,
}));

/**
 * Fetch photos from JSONPlaceholder API
 * Demonstrates: async/await, fetch API, error handling
 */
export async function fetchJSONPlaceholderPhotos(limit: number = 20): Promise<GalleryImage[]> {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=${limit}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch JSONPlaceholder photos: ${response.status}`);
    }
    
    const photos: JSONPlaceholderPhoto[] = await response.json();
    
    // Demonstrate: Array.map() for transforming data
    return photos.map((photo) => ({
      id: `jp-${photo.id}`,
      title: photo.title,
      thumbnailUrl: photo.thumbnailUrl,
      fullUrl: photo.url,
      source: 'jsonplaceholder' as const,
    }));
  } catch (error) {
    console.error('Error fetching JSONPlaceholder photos:', error);
    console.log('Using mock JSONPlaceholder data instead');
    // Return mock data as fallback
    return mockJSONPlaceholderPhotos.slice(0, limit);
  }
}

/**
 * Fetch photos from Picsum API
 * Demonstrates: async/await, fetch API, error handling
 */
export async function fetchPicsumPhotos(limit: number = 20): Promise<GalleryImage[]> {
  try {
    const response = await fetch(`https://picsum.photos/v2/list?limit=${limit}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Picsum photos: ${response.status}`);
    }
    
    const photos: PicsumPhoto[] = await response.json();
    
    // Demonstrate: Array.map() for transforming data
    return photos.map((photo) => ({
      id: `picsum-${photo.id}`,
      title: `Photo by ${photo.author}`,
      author: photo.author,
      thumbnailUrl: `${photo.download_url}?w=400&h=300`,
      fullUrl: photo.download_url,
      source: 'picsum' as const,
    }));
  } catch (error) {
    console.error('Error fetching Picsum photos:', error);
    console.log('Using mock Picsum data instead');
    // Return mock data as fallback
    return mockPicsumPhotos.slice(0, limit);
  }
}

/**
 * Fetch photos from both APIs and combine them
 * Demonstrates: Promise.all, array spreading, forEach, for...of, error handling
 */
export async function fetchAllPhotos(): Promise<GalleryImage[]> {
  try {
    // Fetch from both APIs in parallel
    const [jsonPlaceholderPhotos, picsumPhotos] = await Promise.all([
      fetchJSONPlaceholderPhotos(15),
      fetchPicsumPhotos(15),
    ]);
    
    // Demonstrate: Array spreading to combine arrays
    const allPhotos = [...jsonPlaceholderPhotos, ...picsumPhotos];
    
    // Demonstrate: forEach loop to count photos by source
    const sourceCounts: Record<string, number> = {};
    allPhotos.forEach((photo) => {
      sourceCounts[photo.source] = (sourceCounts[photo.source] || 0) + 1;
    });
    console.log('Photo counts by source:', sourceCounts);
    
    // Demonstrate: for...of loop to log each photo (for demo purposes)
    console.log('Fetched photos:');
    for (const photo of allPhotos) {
      console.log(`- ${photo.title} (${photo.source})`);
    }
    
    return allPhotos;
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
}

/**
 * Shuffle an array using Fisher-Yates algorithm
 * Demonstrates: traditional for loop, array manipulation
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  
  // Demonstrate: traditional for loop (counting down)
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
}
