/**
 * Script para exportar imagens do IndexedDB para o repositório
 * Execute este script antes de fazer commit e push para o repositório
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obter o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Função para converter data URL para arquivo
function dataURLToFile(dataURL, filePath) {
  if (!dataURL || typeof dataURL !== 'string' || !dataURL.startsWith('data:')) {
    console.log(`Ignorando imagem inválida para ${filePath}`);
    return false;
  }

  try {
    // Extrair os dados base64
    const base64Data = dataURL.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
    
    // Criar o diretório se não existir
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Escrever o arquivo
    fs.writeFileSync(filePath, base64Data, 'base64');
    console.log(`Imagem salva em ${filePath}`);
    return true;
  } catch (error) {
    console.error(`Erro ao salvar imagem em ${filePath}:`, error);
    return false;
  }
}

// Função principal para exportar imagens
async function exportImages() {
  try {
    console.log('Exportando imagens para o repositório...');
    
    // Criar diretório de imagens se não existir
    const imagesDir = path.join(__dirname, '../public/assets/images');
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
      console.log(`Diretório de imagens criado: ${imagesDir}`);
    }
    
    // Definir caminhos para as imagens
    const logoPath = path.join(__dirname, '../public/assets/images/logo.png');
    const heroPath = path.join(__dirname, '../public/assets/images/hero.png');
    
    // Verificar se o arquivo localStorageExport.json existe (nova abordagem)
    const localStorageExportPath = path.join(__dirname, '../localStorageExport.json');
    if (fs.existsSync(localStorageExportPath)) {
      console.log('Usando localStorageExport.json para exportar imagens');
      const localStorageData = JSON.parse(fs.readFileSync(localStorageExportPath, 'utf8'));
      const settings = JSON.parse(localStorageData.landingPageSettings || '{}');
      
      // Extrair URLs das imagens
      const logoUrl = settings.logoUrl;
      const heroImageUrl = settings.heroImageUrl;
      
      // Verificar se há referências de imagens no IndexedDB
      let needsExportedImages = false;
      if ((logoUrl && logoUrl.startsWith('db-image://')) || 
          (heroImageUrl && heroImageUrl.startsWith('db-image://'))) {
        needsExportedImages = true;
      }
      
      // Se houver referências de IndexedDB, verificar exportedImages.json
      if (needsExportedImages) {
        const exportedImagesPath = path.join(__dirname, '../exportedImages.json');
        if (fs.existsSync(exportedImagesPath)) {
          console.log('Usando exportedImages.json para obter dados das imagens');
          const exportedImages = JSON.parse(fs.readFileSync(exportedImagesPath, 'utf8'));
          
          // Salvar logo se disponível
          let logoSaved = false;
          if (exportedImages['logo.png']) {
            logoSaved = dataURLToFile(exportedImages['logo.png'], logoPath);
          }
          
          // Salvar imagem do herói se disponível
          let heroSaved = false;
          if (exportedImages['hero.png']) {
            heroSaved = dataURLToFile(exportedImages['hero.png'], heroPath);
          }
          
          // Verificar se alguma imagem foi salva
          if (logoSaved || heroSaved) {
            console.log('Imagens exportadas com sucesso do exportedImages.json!');
            return;
          }
        }
      }
      
      // Se não conseguiu usar exportedImages.json, tentar usar as URLs diretamente
      let logoSaved = false;
      if (logoUrl && !logoUrl.startsWith('db-image://')) {
        logoSaved = dataURLToFile(logoUrl, logoPath);
      }
      
      let heroSaved = false;
      if (heroImageUrl && !heroImageUrl.startsWith('db-image://')) {
        heroSaved = dataURLToFile(heroImageUrl, heroPath);
      }
      
      if (logoSaved || heroSaved) {
        console.log('Imagens exportadas com sucesso do localStorageExport.json!');
        return;
      }
    }
    
    // Verificar se o arquivo localStorage.json existe (abordagem anterior)
    const localStoragePath = path.join(__dirname, '../localStorage.json');
    if (fs.existsSync(localStoragePath)) {
      console.log('Usando localStorage.json para exportar imagens');
      const localStorageData = JSON.parse(fs.readFileSync(localStoragePath, 'utf8'));
      const settings = JSON.parse(localStorageData.landingPageSettings || '{}');
      
      // Extrair URLs das imagens
      const logoUrl = settings.logoUrl;
      const heroImageUrl = settings.heroImageUrl;
      
      // Salvar logo se disponível
      let logoSaved = false;
      if (logoUrl && (logoUrl.startsWith('data:') || logoUrl.startsWith('db-image://'))) {
        logoSaved = dataURLToFile(logoUrl, logoPath);
      }
      
      // Salvar imagem do herói se disponível
      let heroSaved = false;
      if (heroImageUrl && (heroImageUrl.startsWith('data:') || heroImageUrl.startsWith('db-image://'))) {
        heroSaved = dataURLToFile(heroImageUrl, heroPath);
      }
      
      // Verificar se alguma imagem foi salva
      if (logoSaved || heroSaved) {
        console.log('Imagens exportadas com sucesso do localStorage.json!');
        return;
      }
    }
    
    // Alternativa: usar o exportedImages.json diretamente
    const exportedImagesPath = path.join(__dirname, '../exportedImages.json');
    if (fs.existsSync(exportedImagesPath)) {
      console.log('Usando exportedImages.json para exportar imagens');
      const exportedImages = JSON.parse(fs.readFileSync(exportedImagesPath, 'utf8'));
      
      // Salvar logo se disponível
      let logoSaved = false;
      if (exportedImages['logo.png']) {
        logoSaved = dataURLToFile(exportedImages['logo.png'], logoPath);
      }
      
      // Salvar imagem do herói se disponível
      let heroSaved = false;
      if (exportedImages['hero.png']) {
        heroSaved = dataURLToFile(exportedImages['hero.png'], heroPath);
      }
      
      // Verificar se alguma imagem foi salva
      if (logoSaved || heroSaved) {
        console.log('Imagens exportadas com sucesso do exportedImages.json!');
        return;
      }
    }
    
    // Se chegou aqui, não conseguiu exportar nenhuma imagem
    // Verificar se as imagens já existem no sistema de arquivos
    const logoExists = fs.existsSync(logoPath);
    const heroExists = fs.existsSync(heroPath);
    
    if (logoExists || heroExists) {
      console.log('As imagens já existem no sistema de arquivos. Nenhuma alteração necessária.');
    } else {
      // Criar imagens de teste (pixel transparente) como último recurso
      console.log('Nenhuma imagem encontrada. Criando imagens de teste...');
      const testImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
      
      // Salvar imagens de teste
      dataURLToFile(testImage, logoPath);
      dataURLToFile(testImage, heroPath);
      
      console.log('Imagens de teste criadas com sucesso!');
    }
  } catch (error) {
    console.error('Erro ao exportar imagens:', error);
  }
}

// Executar a função de exportação
exportImages();
