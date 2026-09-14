# Projetos

Projetos pessoais para resolver problemas do meu dia a dia, experimentar tecnologias e explorar diferentes abordagens de arquitetura e desenvolvimento.

## Wiki Parser

Parser para transformar grandes dumps XML de wikis em **dados JSON estruturados e tipados**, criado inicialmente para processar dados da wiki de Genshin Impact.

### Tecnologias

`C#` `.NET 8` `XML` `JSON`

:::details Ver detalhes | Ocultar detalhes
O projeto processa dezenas de milhares de páginas, identifica diferentes tipos de entidades a partir de wikitext e gera conjuntos de dados organizados para facilitar busca e processamento posterior.

O principal desafio foi reduzir o custo de processar grandes volumes de dados. A solução usa processamento em streaming e evita carregar o arquivo XML completo em memória.

:::metrics
~49s → ~7s | tempo total de processamento
~4 GB → ~155 MB | pico de memória
:::
:::

## Playnite Integration

Plugin para o **Playnite** que integra ferramentas externas usadas principalmente na execução de visual novels.

**Status:** Em desenvolvimento

### Tecnologias

`C#` `.NET` `Playnite SDK` `PowerShell`

:::details Ver detalhes | Ocultar detalhes
O projeto surgiu de scripts PowerShell que automatizavam ferramentas como **Locale Emulator** e **NoRegionLoader**. À medida que as integrações cresceram, as limitações dessa abordagem passaram a afetar funcionalidades do próprio Playnite, em especial o acompanhamento correto do tempo de jogo.

Estou reestruturando a solução em **C# e .NET** para concentrar as integrações em uma camada única e extensível entre o Playnite e os launchers externos.
:::

## Google Tasks Command Palette

Extensão que integra o **Google Tasks ao Windows Command Palette**, permitindo acessar tarefas sem interromper o fluxo de trabalho para abrir outra aplicação.

**Status:** Em desenvolvimento

### Tecnologias

`C#` `.NET` `Google Tasks API` `Windows Command Palette`

:::details Ver detalhes | Ocultar detalhes
A extensão permite **visualizar, criar e editar tarefas e listas diretamente pela Command Palette**, usando a API do Google Tasks.

O projeto nasceu de uma necessidade pessoal e da oportunidade de explorar desenvolvimento de extensões para o ecossistema do Windows e integrações com serviços externos.
:::

## HaikenAnime

Aplicação desktop para gerenciamento de uma biblioteca local de animes, com **detecção automática do episódio em reprodução e atualização do progresso no AniList**.

### Tecnologias

`C++` `Qt` `AniList API`

:::details Ver detalhes | Ocultar detalhes
O projeto é uma reescrita do meu antigo **AtomAnime**, criada para estudar **C++, Qt e arquitetura de aplicações** enquanto eu evoluía uma ferramenta que já utilizava.

Embora seja um projeto mais antigo e eu hoje tomasse decisões arquiteturais diferentes, ele representa uma parte importante da minha evolução como desenvolvedor e do meu interesse por construir ferramentas para resolver problemas pessoais.
:::
