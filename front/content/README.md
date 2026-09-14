# Resume content

Each tab loads its content from one Markdown file in the selected language folder:

- `english/About.md`, `english/Experience.md`, `english/Projects.md`, `english/Education.md`
- `portugues/About.md`, `portugues/Experience.md`, `portugues/Projects.md`, `portugues/Education.md`

Supported Markdown: headings, paragraphs, unordered and ordered lists, links, bold text, italic text, inline code, fenced code blocks and block quotes. Raw HTML is intentionally not rendered.

Full `http://` and `https://` URLs are converted to clickable links in both Markdown files and `ui.json`. For example, set `sidebar.download.status` to your PDF URL.

Keep the folder names, filenames and capitalization unchanged: GitHub Pages runs on a case-sensitive server.

Each language folder also has a `ui.json` file for the tab labels and sidebar text. Add the new language to `../languages.json` so it appears in the selector.

The Useful links sidebar list accepts `{ "text": "GitHub", "url": "https://github.com/your-username" }` items. Replace the placeholder profile URLs in each language's `ui.json`.
