/**
 * Script to export images from IndexedDB to the repository
 * Run this script before committing and pushing to the repository
 */

const fs = require('fs');
const path = require('path');

// Function to convert data URL to file
function dataURLToFile(dataURL, filePath) {
  // Extract the base64 data
  const base64Data = dataURL.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
  
  // Create the directory if it doesn't exist
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Write the file
  fs.writeFileSync(filePath, base64Data, 'base64');
  console.log(`Saved image to ${filePath}`);
}

// Main function to export images
async function exportImages() {
  try {
    // In a real implementation, we would extract the images from IndexedDB
    // For this example, we'll use localStorage as a proxy
    
    // Read settings from localStorage
    const localStoragePath = path.join(__dirname, '../localStorage.json');
    if (!fs.existsSync(localStoragePath)) {
      console.error('localStorage.json not found. Please run the application and save settings first.');
      return;
    }
    
    const localStorage = JSON.parse(fs.readFileSync(localStoragePath, 'utf8'));
    const settings = JSON.parse(localStorage.landingPageSettings || '{}');
    
    // Extract logo and hero image URLs
    const logoUrl = settings.logoUrl;
    const heroImageUrl = settings.heroImageUrl;
    
    // Save logo if available
    if (logoUrl && (logoUrl.startsWith('data:') || logoUrl.startsWith('db-image://'))) {
      const logoPath = path.join(__dirname, '../public/assets/images/logo.png');
      dataURLToFile(logoUrl, logoPath);
    }
    
    // Save hero image if available
    if (heroImageUrl && (heroImageUrl.startsWith('data:') || heroImageUrl.startsWith('db-image://'))) {
      const heroPath = path.join(__dirname, '../public/assets/images/hero.png');
      dataURLToFile(heroImageUrl, heroPath);
    }
    
    console.log('Images exported successfully!');
  } catch (error) {
    console.error('Error exporting images:', error);
  }
}

// Run the export function
exportImages();
