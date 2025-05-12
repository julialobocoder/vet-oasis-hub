# Vet Oasis Hub

## Informações do Projeto

**URL**: https://lovable.dev/projects/069b8008-c4f6-4dcb-9166-6868ca26a9e8

## Sistema de Persistência de Imagens

Este projeto inclui um sistema de persistência de imagens que garante que a logo e a imagem do hero sejam salvas permanentemente no repositório após um commit e push. Isso significa que as imagens configuradas na aba CRM serão mantidas mesmo após clonar o repositório em outro ambiente.

### Como funciona

1. Quando você configura imagens na aba CRM e salva as configurações, as imagens são armazenadas no IndexedDB do navegador.
2. Após salvar as configurações, execute o comando `npm run export-images` para exportar as imagens do IndexedDB para a pasta `public/assets/images/` do projeto.
3. Quando você faz um commit e push, as imagens exportadas são incluídas no repositório.
4. Quando o projeto é iniciado, ele verifica se existem imagens na pasta `public/assets/images/` e as utiliza em vez das imagens do IndexedDB.

### Comandos Úteis

- `npm run export-images`: Exporta as imagens do IndexedDB para a pasta `public/assets/images/`.
- `npm run setup-hooks`: Configura os Git Hooks para exportar automaticamente as imagens antes de cada commit.

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/069b8008-c4f6-4dcb-9166-6868ca26a9e8) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/069b8008-c4f6-4dcb-9166-6868ca26a9e8) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
