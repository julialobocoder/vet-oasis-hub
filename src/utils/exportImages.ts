/**
 * Utility para exportar imagens do IndexedDB para o sistema de arquivos
 */

import { loadImage } from '../services/db';

/**
 * Exporta uma imagem do IndexedDB para o sistema de arquivos
 * @param id ID da imagem no IndexedDB
 * @param filename Nome do arquivo para salvar
 * @returns URL do arquivo salvo
 */
export const exportImageToFileSystem = async (id: string, filename: string): Promise<string> => {
  try {
    // Carrega a imagem do IndexedDB
    const imageData = await loadImage(id);
    
    if (!imageData) {
      console.error(`Imagem com ID ${id} não encontrada no IndexedDB`);
      return '';
    }
    
    // Em um ambiente de navegador, não podemos escrever diretamente no sistema de arquivos
    // Então vamos simular isso salvando no localStorage para que o script export-images.js possa acessar
    
    // Cria um objeto para armazenar as imagens exportadas
    const exportedImages = JSON.parse(localStorage.getItem('exportedImages') || '{}');
    
    // Adiciona a imagem ao objeto
    exportedImages[filename] = imageData;
    
    // Salva o objeto atualizado no localStorage
    localStorage.setItem('exportedImages', JSON.stringify(exportedImages));
    
    console.log(`Imagem ${id} exportada para ${filename}`);
    
    // Retorna o caminho público para a imagem
    return `/assets/images/${filename}`;
  } catch (error) {
    console.error('Erro ao exportar imagem:', error);
    return '';
  }
};

/**
 * Verifica se uma imagem existe no sistema de arquivos
 * @param filename Nome do arquivo
 * @returns true se a imagem existir, false caso contrário
 */
export const checkImageExists = async (filename: string): Promise<boolean> => {
  try {
    // Em um ambiente de navegador, não podemos verificar diretamente o sistema de arquivos
    // Então vamos simular isso tentando carregar a imagem
    const img = new Image();
    img.src = `/assets/images/${filename}?t=${Date.now()}`; // Adiciona timestamp para evitar cache
    
    return new Promise((resolve) => {
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  } catch (error) {
    console.error('Erro ao verificar imagem:', error);
    return false;
  }
};

/**
 * Exporta todas as imagens do IndexedDB para o sistema de arquivos
 */
export const exportAllImages = async (): Promise<void> => {
  try {
    // Exporta a logo
    await exportImageToFileSystem('logo', 'logo.png');
    
    // Exporta a imagem do herói
    await exportImageToFileSystem('hero', 'hero.png');
    
    console.log('Todas as imagens foram exportadas com sucesso!');
  } catch (error) {
    console.error('Erro ao exportar todas as imagens:', error);
  }
};
