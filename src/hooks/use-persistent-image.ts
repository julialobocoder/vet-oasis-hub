import { useState, useEffect } from 'react';
import { storeImage, retrieveImage } from '../utils/imageStorage';

/**
 * Hook for managing images with persistent storage
 * This hook helps components work with images stored in IndexedDB
 * without changing their existing layout or functionality
 */
export function usePersistentImage(initialSrc: string, imageType: string) {
  const [imageSrc, setImageSrc] = useState<string>(initialSrc);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Load image on component mount
  useEffect(() => {
    const loadImage = async () => {
      if (!initialSrc) return;
      
      try {
        setIsLoading(true);
        // Check if the image is a database reference and load it
        const loadedSrc = await retrieveImage(initialSrc) || initialSrc;
        setImageSrc(loadedSrc);
        setError(null);
      } catch (err) {
        console.error('Error loading image:', err);
        setError(err instanceof Error ? err : new Error('Failed to load image'));
      } finally {
        setIsLoading(false);
      }
    };

    loadImage();
  }, [initialSrc]);

  // Function to update the image
  const updateImage = async (newImageSrc: string): Promise<string> => {
    try {
      setIsLoading(true);
      
      // Store the new image in the database
      const storedImageRef = await storeImage(newImageSrc, imageType);
      setImageSrc(newImageSrc); // Update UI immediately with the actual image data
      setError(null);
      
      return storedImageRef; // Return the reference for storage in settings
    } catch (err) {
      console.error('Error updating image:', err);
      setError(err instanceof Error ? err : new Error('Failed to update image'));
      return newImageSrc; // Return original on error
    } finally {
      setIsLoading(false);
    }
  };

  return {
    imageSrc,
    isLoading,
    error,
    updateImage
  };
}
