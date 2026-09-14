# Projects

Personal projects built to solve everyday problems, experiment with technologies, and explore different approaches to software architecture and development.

## Wiki Parser

A parser that transforms large wiki XML dumps into **structured, strongly typed JSON data**, initially built to process data from the Genshin Impact Wiki.

### Technologies

`C#` `.NET 8` `XML` `JSON`

:::details View details | Hide details
The project processes tens of thousands of pages, identifies different entity types from wikitext, and generates organized datasets for easier searching and further processing.

The main challenge was reducing the cost of processing large volumes of data. The solution uses streaming processing to avoid loading the entire XML file into memory.

:::metrics
~49s → ~7s | total processing time
~4 GB → ~155 MB | peak memory usage
:::
:::

## Playnite Integration

A plugin for **Playnite** that integrates external tools used primarily to run visual novels.

**Status:** In development

### Technologies

`C#` `.NET` `Playnite SDK` `PowerShell`

:::details View details | Hide details
The project originated from PowerShell scripts that automated tools such as **Locale Emulator** and **NoRegionLoader**. As the integrations grew, the limitations of this approach began to interfere with Playnite's own features, particularly accurate playtime tracking.

I'm restructuring the solution in **C# and .NET** to bring these integrations into a single, extensible layer between Playnite and external launchers.
:::

## Google Tasks Command Palette

An extension that integrates **Google Tasks with Windows Command Palette**, allowing tasks to be accessed and managed without interrupting the workflow to open a separate application.

**Status:** In development

### Technologies

`C#` `.NET` `Google Tasks API` `Windows Command Palette`

:::details View details | Hide details
The extension allows users to **view, create, and edit tasks and task lists directly from Command Palette** using the Google Tasks API.

The project grew out of a personal need and an opportunity to explore extension development within the Windows ecosystem and integrations with external services.
:::

## HaikenAnime

A desktop application for managing a local anime library, with **automatic detection of the currently playing episode and AniList progress updates**.

### Technologies

`C++` `Qt` `AniList API`

:::details View details | Hide details
The project is a rewrite of my older **AtomAnime** application, created as a way to study **C++, Qt, and application architecture** while improving a tool I was already using.

Although it is an older project and I would make different architectural decisions today, it represents an important part of my growth as a developer and my interest in building tools to solve problems I encounter myself.
:::