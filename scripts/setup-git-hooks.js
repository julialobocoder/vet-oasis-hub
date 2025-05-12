/**
 * Script para configurar os Git Hooks
 * Este script cria um pre-commit hook que exporta as imagens do IndexedDB para o repositório
 */

const fs = require('fs');
const path = require('path');

// Caminho para a pasta .git/hooks
const hooksDir = path.join(__dirname, '../.git/hooks');

// Conteúdo do hook pre-commit
const preCommitContent = `#!/bin/sh

# Hook de pre-commit para exportar imagens do IndexedDB para o repositório
echo "Exportando imagens para o repositório..."
node ./scripts/export-images.js

# Adiciona as imagens exportadas ao commit
git add ./public/assets/images/logo.png ./public/assets/images/hero.png

# Continua com o commit
exit 0
`;

// Função para criar o hook
function createHook() {
  // Verifica se o diretório .git/hooks existe
  if (!fs.existsSync(hooksDir)) {
    console.error('Diretório .git/hooks não encontrado. Certifique-se de que este é um repositório Git válido.');
    return;
  }

  // Caminho para o hook pre-commit
  const preCommitPath = path.join(hooksDir, 'pre-commit');

  // Cria o arquivo pre-commit
  fs.writeFileSync(preCommitPath, preCommitContent, 'utf8');
  
  // Torna o arquivo executável (chmod +x)
  try {
    fs.chmodSync(preCommitPath, '755');
    console.log('Hook pre-commit criado com sucesso!');
  } catch (error) {
    console.error('Erro ao tornar o hook executável:', error);
    console.log('Por favor, execute manualmente: chmod +x .git/hooks/pre-commit');
  }
}

// Executa a função
createHook();
