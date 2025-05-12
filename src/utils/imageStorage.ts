import { saveImage, loadImage } from '../services/db';

// Utility functions for handling image storage and retrieval

/**
 * Stores an image in IndexedDB and returns a reference key
 * @param imageData Base64 or data URL of the image
 * @param type Type of image (e.g., 'logo', 'hero')
 * @returns A promise that resolves to a reference key for the stored image
 */
export const storeImage = async (imageData: string, type: string): Promise<string> => {
  if (!imageData) return '';
  
  try {
    // Generate a unique ID for the image
    const imageId = `${type}_${Date.now()}`;
    
    // Store the image in IndexedDB
    await saveImage(imageId, imageData);
    
    // Salvar a imagem no localStorage para exportau00e7u00e3o
    try {
      const exportedImages = JSON.parse(localStorage.getItem('exportedImages') || '{}');
      exportedImages[`${type}.png`] = imageData;
      localStorage.setItem('exportedImages', JSON.stringify(exportedImages));
      console.log(`Imagem ${type} salva no localStorage para exportau00e7u00e3o`);
      
      // Salvar tambem nas configuracu00f5es para garantir persistu00eancia
      const currentSettings = localStorage.getItem('landingPageSettings');
      if (currentSettings) {
        const parsedSettings = JSON.parse(currentSettings);
        if (type === 'logo') {
          parsedSettings.logoUrl = `db-image://${imageId}`;
        } else if (type === 'hero') {
          parsedSettings.heroImageUrl = `db-image://${imageId}`;
        }
        localStorage.setItem('landingPageSettings', JSON.stringify(parsedSettings));
        console.log(`Referu00eancia da imagem ${type} atualizada nas configuracu00f5es`);
      }
    } catch (localStorageError) {
      console.error(`Erro ao salvar imagem ${type} no localStorage:`, localStorageError);
    }
    
    // Return a reference key that can be used to retrieve the image
    return `db-image://${imageId}`;
  } catch (error) {
    console.error('Failed to store image:', error);
    return imageData; // Fall back to the original data if storage fails
  }
};

/**
 * Retrieves an image from IndexedDB by its reference key
 * @param imageRef Reference key for the stored image
 * @returns A promise that resolves to the image data or null if not found
 */
export const retrieveImage = async (imageRef: string): Promise<string | null> => {
  if (!imageRef) return null;
  
  // Se não for uma referência de banco de dados, retornar como está
  if (!imageRef.startsWith('db-image://')) {
    return imageRef;
  }
  
  try {
    // Extrair o ID da imagem da referência
    const imageId = imageRef.replace('db-image://', '');
    const imageType = imageId.split('_')[0]; // 'logo' ou 'hero'
    
    // Carregar a imagem do IndexedDB
    const imageFromDB = await loadImage(imageId);
    
    if (imageFromDB) {
      console.log(`Imagem ${imageType} carregada com sucesso do IndexedDB`);
      
      // Exportar a imagem para o sistema de arquivos para persistência
      try {
        // Aqui você poderia chamar uma função para salvar a imagem no sistema de arquivos
        // Mas como estamos no navegador, não temos acesso direto ao sistema de arquivos
        // Então vamos salvar em localStorage para que o script de exportação possa usá-la
        const exportedImages = JSON.parse(localStorage.getItem('exportedImages') || '{}');
        exportedImages[`${imageType}.png`] = imageFromDB;
        localStorage.setItem('exportedImages', JSON.stringify(exportedImages));
        console.log(`Imagem ${imageType} salva para exportação`);
      } catch (exportError) {
        console.error(`Erro ao preparar imagem ${imageType} para exportação:`, exportError);
      }
      
      return imageFromDB;
    } else {
      // Se não encontrar no IndexedDB, tentar carregar do sistema de arquivos
      console.log(`Imagem ${imageType} não encontrada no IndexedDB, tentando sistema de arquivos`);
      
      try {
        // Verificar se a imagem existe no localStorage (pode ter sido salva recentemente)
        const exportedImages = JSON.parse(localStorage.getItem('exportedImages') || '{}');
        if (exportedImages[`${imageType}.png`]) {
          console.log(`Imagem ${imageType} encontrada no localStorage, usando-a`);
          return exportedImages[`${imageType}.png`];
        }
      } catch (localStorageError) {
        console.error('Erro ao verificar localStorage:', localStorageError);
      }
      
      // Adicionar timestamp para evitar cache do navegador
      const timestamp = Date.now();
      const imagePath = `/assets/images/${imageType}.png?t=${timestamp}`;
      
      // Retornar o caminho da imagem no sistema de arquivos
      console.log(`Tentando carregar imagem do caminho: ${imagePath}`);
      return imagePath;
    }
  } catch (error) {
    console.error('Falha ao recuperar imagem:', error);
    return null;
  }
};

/**
 * Intercepts image URLs and loads from IndexedDB if needed
 * This function can be used as a wrapper for image src attributes
 * @param src The image source URL or reference
 * @param fallbackSrc A fallback image to use if the image can't be loaded
 * @returns A promise that resolves to the actual image URL to use
 */
export const getImageSrc = async (src: string, fallbackSrc: string = ''): Promise<string> => {
  if (!src) return fallbackSrc;
  
  // Check if this is a database reference
  if (src.startsWith('db-image://')) {
    const imageData = await retrieveImage(src);
    return imageData || fallbackSrc;
  }
  
  // Regular URL, return as is
  return src;
};
