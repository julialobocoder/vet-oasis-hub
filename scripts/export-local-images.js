/**
 * Script para exportar imagens do localStorage para o sistema de arquivos
 * Este script é útil para testar o sistema de persistência de imagens
 */

const fs = require('fs');
const path = require('path');

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

// Função para simular o localStorage
function getLocalStorage() {
  // Aqui você pode inserir manualmente os dados do localStorage para teste
  return {
    landingPageSettings: JSON.stringify({
      heroImageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', // Pixel transparente para teste
      logoUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==' // Pixel transparente para teste
    })
  };
}

// Função principal para exportar imagens
async function exportImages() {
  try {
    console.log('Exportando imagens do localStorage para o sistema de arquivos...');
    
    // Obter dados do localStorage
    const localStorage = getLocalStorage();
    
    // Verificar se há configurações salvas
    if (!localStorage.landingPageSettings) {
      console.error('Nenhuma configuração encontrada no localStorage.');
      return;
    }
    
    // Analisar as configurações
    const settings = JSON.parse(localStorage.landingPageSettings);
    
    // Extrair URLs das imagens
    const logoUrl = settings.logoUrl;
    const heroImageUrl = settings.heroImageUrl;
    
    // Definir caminhos para as imagens
    const logoPath = path.join(__dirname, '../public/assets/images/logo.png');
    const heroPath = path.join(__dirname, '../public/assets/images/hero.png');
    
    // Salvar logo se disponível
    let logoSaved = false;
    if (logoUrl) {
      logoSaved = dataURLToFile(logoUrl, logoPath);
    }
    
    // Salvar imagem do herói se disponível
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

// Executar a função de exportação
exportImages();
