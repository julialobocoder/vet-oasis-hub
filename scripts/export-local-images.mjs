/**
 * Script para exportar imagens do localStorage para o sistema de arquivos
 * Este script u00e9 u00fatil para testar o sistema de persistu00eancia de imagens
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obter o diretu00f3rio atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Funu00e7u00e3o para converter data URL para arquivo
function dataURLToFile(dataURL, filePath) {
  if (!dataURL || typeof dataURL !== 'string' || !dataURL.startsWith('data:')) {
    console.log(`Ignorando imagem invu00e1lida para ${filePath}`);
    return false;
  }

  try {
    // Extrair os dados base64
    const base64Data = dataURL.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
    
    // Criar o diretu00f3rio se nu00e3o existir
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

// Funu00e7u00e3o para simular o localStorage
function getLocalStorage() {
  // Aqui vocu00ea pode inserir manualmente os dados do localStorage para teste
  return {
    landingPageSettings: JSON.stringify({
      heroImageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', // Pixel transparente para teste
      logoUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==' // Pixel transparente para teste
    })
  };
}

// Funu00e7u00e3o principal para exportar imagens
async function exportImages() {
  try {
    console.log('Exportando imagens do localStorage para o sistema de arquivos...');
    
    // Obter dados do localStorage
    const localStorage = getLocalStorage();
    
    // Verificar se hu00e1 configurau00e7u00f5es salvas
    if (!localStorage.landingPageSettings) {
      console.error('Nenhuma configurau00e7u00e3o encontrada no localStorage.');
      return;
    }
    
    // Analisar as configurau00e7u00f5es
    const settings = JSON.parse(localStorage.landingPageSettings);
    
    // Extrair URLs das imagens
    const logoUrl = settings.logoUrl;
    const heroImageUrl = settings.heroImageUrl;
    
    // Definir caminhos para as imagens
    const logoPath = path.join(__dirname, '../public/assets/images/logo.png');
    const heroPath = path.join(__dirname, '../public/assets/images/hero.png');
    
    // Salvar logo se disponu00edvel
    let logoSaved = false;
    if (logoUrl) {
      logoSaved = dataURLToFile(logoUrl, logoPath);
    }
    
    // Salvar imagem do heru00f3i se disponu00edvel
    let heroSaved = false;
    if (heroImageUrl) {
      heroSaved = dataURLToFile(heroImageUrl, heroPath);
    }
    
    // Verificar se alguma imagem foi salva
    if (logoSaved || heroSaved) {
      console.log('Imagens exportadas com sucesso!');
    } else {
      console.log('Nenhuma imagem foi exportada.');
    }
  } catch (error) {
    console.error('Erro ao exportar imagens:', error);
  }
}

// Executar a funu00e7u00e3o de exportau00e7u00e3o
exportImages();
