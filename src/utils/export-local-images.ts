/**
 * Utilitário para exportar imagens do localStorage para o sistema de arquivos
 * Este script será executado no navegador para preparar as imagens para exportação
 */

/**
 * Exporta as imagens do localStorage para um formato que pode ser usado pelo script de exportação
 */
export const prepareImagesForExport = async (): Promise<void> => {
  try {
    console.log('Preparando imagens para exportação...');
    
    // Obter configurações do localStorage
    const savedSettings = localStorage.getItem('landingPageSettings');
    if (!savedSettings) {
      console.log('Nenhuma configuração encontrada no localStorage');
      return;
    }
    
    const parsedSettings = JSON.parse(savedSettings);
    const logoUrl = parsedSettings.logoUrl;
    const heroImageUrl = parsedSettings.heroImageUrl;
    
    // Verificar se há referências de imagens do IndexedDB
    let hasDbReferences = false;
    
    if (logoUrl && logoUrl.startsWith('db-image://')) {
      hasDbReferences = true;
      console.log('Referência de logo do IndexedDB encontrada:', logoUrl);
    }
    
    if (heroImageUrl && heroImageUrl.startsWith('db-image://')) {
      hasDbReferences = true;
      console.log('Referência de imagem do herói do IndexedDB encontrada:', heroImageUrl);
    }
    
    // Se não houver referências do IndexedDB, não é necessário fazer nada
    if (!hasDbReferences) {
      console.log('Nenhuma referência de imagem do IndexedDB encontrada. Nada a fazer.');
      return;
    }
    
    // Criar um objeto localStorage para exportação
    const localStorageData = {
      landingPageSettings: savedSettings
    };
    
    // Salvar o objeto localStorage para exportação
    localStorage.setItem('localStorageExport', JSON.stringify(localStorageData));
    console.log('Dados do localStorage preparados para exportação');
    
    // Verificar se há imagens exportadas no localStorage
    const exportedImagesStr = localStorage.getItem('exportedImages');
    if (!exportedImagesStr) {
      console.log('Nenhuma imagem exportada encontrada no localStorage');
      return;
    }
    
    console.log('Imagens preparadas para exportação com sucesso!');
  } catch (error) {
    console.error('Erro ao preparar imagens para exportação:', error);
  }
};

/**
 * Função para ser chamada quando o usuário salva as configurações
 */
export const exportImagesOnSave = async (): Promise<void> => {
  try {
    await prepareImagesForExport();
    
    // Em um ambiente real, aqui poderíamos chamar uma API para salvar as imagens no servidor
    // Mas como estamos no navegador, apenas preparamos os dados para o script de exportação
    console.log('Imagens preparadas para exportação. Execute o script export-images.mjs para exportá-las.');
  } catch (error) {
    console.error('Erro ao exportar imagens:', error);
  }
};
