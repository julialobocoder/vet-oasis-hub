/**
 * Script para configurar os Git Hooks
 * Este script cria um pre-commit hook que exporta as imagens do IndexedDB para o repositu00f3rio
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obter o diretu00f3rio atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho para a pasta .git/hooks
const hooksDir = path.join(__dirname, '../.git/hooks');

// Conteu00fado do hook pre-commit
const preCommitContent = `#!/bin/sh

# Hook de pre-commit para exportar imagens do IndexedDB para o repositu00f3rio
echo "Exportando imagens para o repositu00f3rio..."
node ./scripts/export-images.mjs

# Adiciona as imagens exportadas ao commit
git add ./public/assets/images/logo.png ./public/assets/images/hero.png

# Continua com o commit
exit 0
`;

// Funu00e7u00e3o para criar o hook
function createHook() {
  // Verifica se o diretu00f3rio .git/hooks existe
  if (!fs.existsSync(hooksDir)) {
    console.error('Diretu00f3rio .git/hooks nu00e3o encontrado. Certifique-se de que este u00e9 um repositu00f3rio Git vu00e1lido.');
    return;
  }

  // Caminho para o hook pre-commit
  const preCommitPath = path.join(hooksDir, 'pre-commit');

  // Cria o arquivo pre-commit
  fs.writeFileSync(preCommitPath, preCommitContent, 'utf8');
  
  // Torna o arquivo executu00e1vel (chmod +x)
  try {
    fs.chmodSync(preCommitPath, '755');
    console.log('Hook pre-commit criado com sucesso!');
  } catch (error) {
    console.error('Erro ao tornar o hook executu00e1vel:', error);
    console.log('Por favor, execute manualmente: chmod +x .git/hooks/pre-commit');
  }
}

// Executa a funu00e7u00e3o
createHook();
