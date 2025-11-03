'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { GalleryImage } from '@/types/image';
import { fetchAllPhotos, shuffleArray } from '@/lib/api';
import ImageModal from './ImageModal';

export default function ImageGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [filterSource, setFilterSource] = useState<'all' | 'jsonplaceholder' | 'picsum'>('all');

  // Fetch images on component mount
  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const fetchedImages = await fetchAllPhotos();
        const shuffledImages = shuffleArray(fetchedImages);
        setImages(shuffledImages);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load images');
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  // Filter images based on source
  const filteredImages = (() => {
    // Demonstrate: arrow function with implicit return and Array.filter()
    if (filterSource === 'all') return images;
    return images.filter((image) => image.source === filterSource);
  })();

  // Handle image click
  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  // Close modal
  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  // Navigate in modal
  const handleNavigate = (index: number) => {
    setSelectedImageIndex(index);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4"></div>
        <p className="text-gray-600 text-lg">Loading images...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-md">
          <h2 className="text-xl font-bold mb-2">Error Loading Images</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">
          Image Gallery
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Responsive gallery with modal slider • Click any image to view full size
        </p>

        {/* Filter buttons */}
        <div className="flex justify-center gap-4 mb-6">
          {/* Demonstrate: Array of objects with forEach to create buttons */}
          {[
            { value: 'all' as const, label: 'All Sources' },
            { value: 'jsonplaceholder' as const, label: 'JSONPlaceholder' },
            { value: 'picsum' as const, label: 'Picsum' },
          ].map((filter) => (
            <button
              key={filter.value}
              onClick={() => setFilterSource(filter.value)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filterSource === filter.value
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Image count */}
        <p className="text-center text-gray-500">
          Showing {filteredImages.length} of {images.length} images
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto">
        {filteredImages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No images found for this filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {/* Demonstrate: Array.map() with index for rendering grid items */}
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="group relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-white"
                onClick={() => handleImageClick(index)}
              >
                <Image
                  src={image.thumbnailUrl}
                  alt={image.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-end">
                  <div className="p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <p className="font-semibold text-sm line-clamp-2">{image.title}</p>
                    <p className="text-xs text-gray-300 mt-1">
                      {image.source === 'jsonplaceholder' ? 'JSONPlaceholder' : 'Picsum'}
                    </p>
                  </div>
                </div>

                {/* Source badge */}
                <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded text-xs font-medium text-gray-700">
                  {image.source === 'jsonplaceholder' ? 'JP' : 'PS'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedImageIndex !== null && (
        <ImageModal
          images={filteredImages}
          currentIndex={selectedImageIndex}
          onClose={handleCloseModal}
          onNavigate={handleNavigate}
        />
      )}

      {/* Footer with loop demonstrations */}
      <div className="max-w-7xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">JavaScript Looping Demonstrations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-blue-50 p-4 rounded">
            <h3 className="font-semibold text-blue-900 mb-2">Array.map()</h3>
            <p className="text-gray-700">Used for rendering gallery grid items and filter buttons</p>
          </div>
          <div className="bg-green-50 p-4 rounded">
            <h3 className="font-semibold text-green-900 mb-2">Array.filter()</h3>
            <p className="text-gray-700">Used for filtering images by source</p>
          </div>
          <div className="bg-purple-50 p-4 rounded">
            <h3 className="font-semibold text-purple-900 mb-2">for...of loop</h3>
            <p className="text-gray-700">Used in API functions for logging (check console)</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded">
            <h3 className="font-semibold text-yellow-900 mb-2">Traditional for loop</h3>
            <p className="text-gray-700">Used in Fisher-Yates shuffle algorithm</p>
          </div>
          <div className="bg-red-50 p-4 rounded">
            <h3 className="font-semibold text-red-900 mb-2">Array.forEach()</h3>
            <p className="text-gray-700">Used for button creation from config array</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded">
            <h3 className="font-semibold text-indigo-900 mb-2">Promise.all()</h3>
            <p className="text-gray-700">Used for parallel API fetching</p>
          </div>
        </div>
      </div>
    </div>
  );
}
