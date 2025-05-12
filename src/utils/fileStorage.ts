/**
 * Utility functions for saving files to the repository
 */

/**
 * Converts a data URL to a Blob object
 * @param dataUrl The data URL to convert
 * @returns A Blob object representing the data
 */
export const dataURLtoBlob = (dataUrl: string): Blob => {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new Blob([u8arr], { type: mime });
};

/**
 * Saves an image to the public assets folder
 * @param imageData Base64 or data URL of the image
 * @param filename Name to save the file as
 * @returns The URL path to the saved image
 */
export const saveImageToPublic = async (imageData: string, filename: string): Promise<string> => {
  if (!imageData || !imageData.startsWith('data:')) {
    return imageData; // Return as is if not a data URL
  }
  
  try {
    // Convert data URL to Blob
    const blob = dataURLtoBlob(imageData);
    
    // Create a FormData object
    const formData = new FormData();
    formData.append('file', blob, filename);
    
    // URL where the image will be accessible
    const publicUrl = `/assets/images/${filename}`;
    
    // In a real implementation, we would send this to a server endpoint
    // For now, we'll just return the public URL and handle the actual saving separately
    console.log(`Image would be saved as: ${publicUrl}`);
    
    // Return the public URL
    return publicUrl;
  } catch (error) {
    console.error('Failed to save image to public folder:', error);
    return imageData; // Fall back to the original data if saving fails
  }
};

/**
 * Saves the current logo and hero image to the repository
 * @param logoData Base64 or data URL of the logo
 * @param heroData Base64 or data URL of the hero image
 * @returns An object with the URLs of the saved images
 */
export const saveImagesToRepository = async (logoData: string, heroData: string): Promise<{ logoUrl: string, heroUrl: string }> => {
  const logoUrl = await saveImageToPublic(logoData, 'logo.png');
  const heroUrl = await saveImageToPublic(heroData, 'hero.png');
  
  return { logoUrl, heroUrl };
};
