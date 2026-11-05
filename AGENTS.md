# AGENTS.md

## Project Overview

Este repositório contém um currículo bilíngue publicado como site estático sem dependências de runtime. A aplicação é servida pelo GitHub Pages a partir do diretório `front/`.

## Tech Stack

- HTML sem framework em `front/index.html`.
- CSS responsivo em `front/css/styles.css`, com tokens de tema e layout inspirado no GitHub.
- JavaScript de navegador em `front/js/main.js`.
- Markdown e JSON para conteúdo, idiomas e configuração em `front/content/`.
- GitHub Actions e GitHub Pages em `.github/workflows/deploy-pages.yml`.

## Architecture

`index.html` define a estrutura, abas, seletor de idioma e sidebar. Ao carregar, `main.js` lê `content/languages.json` e `content/site.json`, carrega o `ui.json` do idioma selecionado e busca o Markdown da aba ativa. O Markdown é interpretado por um renderer próprio, sem HTML bruto, e o CSS fornece a apresentação responsiva. Pushes para `release` publicam `front/` via GitHub Pages.

## Main Components

- `front/index.html`: shell da página, abas acessíveis, painel de conteúdo e sidebar.
- `front/js/main.js`: carregamento/cache de recursos, troca de idioma, roteamento por query/hash, renderização Markdown e links.
- `front/css/styles.css`: tema, componentes, acessibilidade visual e breakpoints responsivos.
- `front/content/languages.json`: catálogo de idiomas disponíveis.
- `front/content/site.json`: configuração global, incluindo avatar.
- `front/content/english/` e `front/content/portugues/`: textos Markdown e traduções de UI.
- `.github/workflows/deploy-pages.yml`: workflow de publicação no GitHub Pages.

## Project Conventions

- Mantenha nomes de pastas, arquivos e capitalização exatamente como estão; o GitHub Pages é case-sensitive.
- Use caminhos relativos para arquivos armazenados em `front/`, especialmente documentos em `front/assets/`.
- Alterações de conteúdo devem respeitar a sintaxe Markdown suportada documentada em `front/content/README.md`; HTML bruto não é renderizado.
- Ao adicionar um idioma, atualize `front/content/languages.json` e crie sua pasta com `ui.json` e os quatro documentos principais.
- O preview local deve ser servido por HTTP, por exemplo `python -m http.server 4173` a partir de `front/`; abrir o HTML via `file://` impede o carregamento dos arquivos Markdown.
- O branch de publicação é `release`; a automação envia somente o diretório `front/`.

## Instructions for AI Assistants

- Preserve a arquitetura existente e mantenha a solução simples e sem dependências desnecessárias.
- Não altere contratos externos, caminhos publicados, formato dos JSONs ou comportamento das URLs sem validar todos os consumidores e o workflow de publicação.
- Mantenha consistência com o código atual, incluindo o renderer Markdown próprio, o carregamento por `fetch`, o suporte a inglês/português e os requisitos de acessibilidade das abas.
- Seja objetivo: faça mudanças restritas ao escopo solicitado e não especule regras ausentes no código ou na documentação.
- Ao alterar conteúdo ou interface, confira os arquivos correspondentes nos dois idiomas quando aplicável e valide o preview servido por HTTP.
- Não trate um build ou deploy do workflow como prova de validação visual ou de comportamento no navegador; verifique essas dimensões separadamente quando forem relevantes.
