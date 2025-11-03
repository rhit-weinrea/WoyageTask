// Type definitions for image APIs

// JSONPlaceholder Photo type
export interface JSONPlaceholderPhoto {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

// Picsum Photo type
export interface PicsumPhoto {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

// Unified Image type for the gallery
export interface GalleryImage {
  id: string;
  title: string;
  author?: string;
  thumbnailUrl: string;
  fullUrl: string;
  source: 'jsonplaceholder' | 'picsum';
}
