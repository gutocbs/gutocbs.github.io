# Augusto Bernardes resume

This is a dependency-free static website intended for GitHub Pages.

## Local preview

Do not open `index.html` directly from File Explorer. The browser prevents JavaScript from reading local Markdown files through `file://` URLs.

From this folder, run:

```powershell
python -m http.server 4173
```

Then open [http://localhost:4173](http://localhost:4173).

## Content

Each main tab loads a file from `content/`. See [content/README.md](content/README.md) for the filenames and supported Markdown syntax.

On GitHub Pages, no extra setup is necessary beyond enabling Pages for the repository: the site and Markdown files are served over HTTPS, so the tabs load normally.
