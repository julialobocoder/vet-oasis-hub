/**
 * Utility for saving images from IndexedDB to the repository
 */

import { loadImage } from '../services/db';
import { saveImageToPublic } from './fileStorage';
import fs from 'fs';
import path from 'path';

/**
 * Saves an image from IndexedDB to the repository
 * @param imageId The ID of the image in IndexedDB
 * @param filename The filename to save as
 */
export const saveImageFromDBToRepository = async (imageId: string, filename: string): Promise<string> => {
  try {
    // Load the image from IndexedDB
    const imageData = await loadImage(imageId);
    
    if (!imageData) {
      console.error(`Image with ID ${imageId} not found in IndexedDB`);
      return '';
    }
    
    // Save the image to the repository
    return await saveImageToPublic(imageData, filename);
  } catch (error) {
    console.error('Failed to save image from IndexedDB to repository:', error);
    return '';
  }
};

/**
 * Exports the current logo and hero image to the repository
 * This function should be called before committing to the repository
 */
export const exportImagesToRepository = async (): Promise<void> => {
  try {
    // Get the most recent logo and hero image IDs from IndexedDB
    const logoId = 'logo_' + Date.now(); // This should be replaced with the actual ID
    const heroId = 'hero_' + Date.now(); // This should be replaced with the actual ID
    
    // Save the images to the repository
    await saveImageFromDBToRepository(logoId, 'logo.png');
    await saveImageFromDBToRepository(heroId, 'hero.png');
    
    console.log('Images exported to repository successfully');
  } catch (error) {
    console.error('Failed to export images to repository:', error);
  }
};
