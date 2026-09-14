# Resume content

Each tab loads its content from one Markdown file in the selected language folder:

- `english/About.md`, `english/Experience.md`, `english/Projects.md`, `english/Education.md`
- `portugues/About.md`, `portugues/Experience.md`, `portugues/Projects.md`, `portugues/Education.md`

Supported Markdown: headings, paragraphs, unordered and ordered lists, links, bold text, italic text, inline code, fenced code blocks and block quotes. Raw HTML is intentionally not rendered.

For one expandable block of supporting context, use the native-details directive below. The first label is shown while collapsed and the second while open:

```text
:::details Ver detalhes | Ocultar detalhes
Conteúdo Markdown adicional.
:::
```

Inside an expandable block, use a compact metrics row when a project has measurable results:

```text
:::metrics
49s → 7s | processing time
4 GB → 155 MB | peak memory
:::
```

Full `http://` and `https://` URLs, as well as same-site paths such as `assets/resume-english.pdf`, are converted to clickable links in both Markdown files and `ui.json`. Use a relative path for files stored in this site: it works on both a custom domain and GitHub Pages project URLs.

For the sidebar download action, `sidebar.download.label` is the button text and `sidebar.download.status` is its URL. If `status` is not a supported URL, it is displayed as the unavailable-message instead.

Keep the folder names, filenames and capitalization unchanged: GitHub Pages runs on a case-sensitive server.

Each language folder also has a `ui.json` file for the tab labels and sidebar text. Add the new language to `../languages.json` so it appears in the selector.

The Useful links sidebar list accepts `{ "text": "GitHub", "url": "https://github.com/your-username" }` items. Replace the placeholder profile URLs in each language's `ui.json`.

Set `avatarUrl` in `site.json` to a GitHub profile image URL, such as `https://github.com/your-username.png`. The site falls back to the local SVG avatar if the remote image cannot load.
