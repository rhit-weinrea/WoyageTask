'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { GalleryImage } from '@/types/image';

interface ImageModalProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function ImageModal({ images, currentIndex, onClose, onNavigate }: ImageModalProps) {
  const currentImage = images[currentIndex];

  // Navigate to previous image
  const goToPrevious = useCallback(() => {
    // Demonstrate: ternary operator for circular navigation
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    onNavigate(newIndex);
  }, [currentIndex, images.length, onNavigate]);

  // Navigate to next image
  const goToNext = useCallback(() => {
    // Demonstrate: modulo operator for circular navigation
    const newIndex = (currentIndex + 1) % images.length;
    onNavigate(newIndex);
  }, [currentIndex, images.length, onNavigate]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Demonstrate: switch statement for multiple conditions
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, goToPrevious, goToNext]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-gray-300 transition-colors z-10"
        aria-label="Close modal"
      >
        &times;
      </button>

      {/* Previous button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          goToPrevious();
        }}
        className="absolute left-4 text-white text-6xl font-bold hover:text-gray-300 transition-colors z-10 hover:scale-110"
        aria-label="Previous image"
      >
        ‹
      </button>

      {/* Image container */}
      <div 
        className="relative max-w-7xl max-h-[90vh] w-full mx-16"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-[80vh]">
          <Image
            src={currentImage.fullUrl}
            alt={currentImage.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
            priority
          />
        </div>
        
        {/* Image info */}
        <div className="mt-4 text-white text-center">
          <h2 className="text-xl font-semibold mb-2">{currentImage.title}</h2>
          <p className="text-gray-300 text-sm">
            Image {currentIndex + 1} of {images.length}
            {currentImage.author && ` • ${currentImage.author}`}
            {` • Source: ${currentImage.source}`}
          </p>
        </div>

        {/* Thumbnail navigation */}
        <div className="mt-6 flex justify-center gap-2 overflow-x-auto px-4 pb-2">
          {/* Demonstrate: Array.map() with index for rendering */}
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => onNavigate(index)}
              className={`flex-shrink-0 relative w-16 h-16 rounded overflow-hidden transition-all ${
                index === currentIndex 
                  ? 'ring-4 ring-white scale-110' 
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={image.thumbnailUrl}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Next button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          goToNext();
        }}
        className="absolute right-4 text-white text-6xl font-bold hover:text-gray-300 transition-colors z-10 hover:scale-110"
        aria-label="Next image"
      >
        ›
      </button>
    </div>
  );
}
