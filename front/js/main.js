document.addEventListener("DOMContentLoaded", () => {
  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));
  const languageSelector = document.querySelector("#language-selector");
  const avatar = document.querySelector(".avatar");
  const markdownCache = new Map();
  const uiCache = new Map();
  let languages = [];
  let language = "english";

  function valueAt(object, path) { return path.split(".").reduce((value, key) => value?.[key], object); }

  function applySiteConfig(config) {
    if (!config?.avatarUrl || !/^https?:\/\//.test(config.avatarUrl)) return;
    avatar.src = config.avatarUrl;
    avatar.alt = config.avatarAlt || "Profile picture";
    avatar.addEventListener("error", () => { avatar.src = avatar.dataset.fallback; }, { once: true });
  }

  function isLinkUrl(value) {
    return typeof value === "string" && /^(https?:\/\/|mailto:|\/(?!\/)|\.\.?\/|assets\/)/.test(value);
  }

  function createSidebarIcon(kind) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("aria-hidden", "true"); svg.setAttribute("viewBox", "0 0 16 16");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", kind === "mail" ? "M2.25 3.5h11.5v9H2.25v-9Zm0 .25L8 8.25l5.75-4.5" : kind === "link" ? "M6.5 9.5 9.5 6.5M6 11.75l-1.25 1.25a2.3 2.3 0 1 1-3.25-3.25L4 7.25m6-3 1.25-1.25a2.3 2.3 0 1 1 3.25 3.25L12 8.75" : "m6 4-4 4 4 4m4-8 4 4-4 4");
    svg.append(path); return svg;
  }

  function renderList(list, items) {
    list.replaceChildren(...items.map((item, index) => {
      const li = document.createElement("li");
      const icon = document.createElement("span"); icon.className = "item-icon";
      const label = typeof item === "string" ? item : item.text;
      if (typeof item === "object" && isLinkUrl(item.url)) {
        const isEmail = item.url.startsWith("mailto:");
        icon.append(createSidebarIcon(isEmail ? "mail" : "link"));
        const link = document.createElement("a"); link.href = item.url; link.textContent = label;
        if (!isEmail) { link.target = "_blank"; link.rel = "noreferrer"; }
        li.append(icon, link);
      } else {
        icon.append(createSidebarIcon("stack"));
        li.append(icon, document.createTextNode(label));
      }
      return li;
    }));
  }

  function setTextWithLinks(element, text) {
    const urlPattern = /(https?:\/\/[^\s<>"']+|mailto:[^\s<>"']+|\/(?!\/)[^\s<>"']+|\.\.?\/[^\s<>"']+|assets\/[^\s<>"']+)/g;
    let lastIndex = 0;
    element.replaceChildren();
    for (const match of text.matchAll(urlPattern)) {
      element.append(document.createTextNode(text.slice(lastIndex, match.index)));
      const link = document.createElement("a"); link.href = match[0]; link.textContent = match[0];
      element.append(link); lastIndex = match.index + match[0].length;
    }
    element.append(document.createTextNode(text.slice(lastIndex)));
  }

  function applyDownload(ui) {
    const link = document.querySelector("[data-download-link]");
    const placeholder = document.querySelector("[data-download-placeholder]");
    const url = ui.sidebar?.download?.status;
    const available = isLinkUrl(url);
    link.hidden = !available;
    placeholder.hidden = available;
    if (available) {
      link.href = url;
    } else {
      link.removeAttribute("href");
      placeholder.textContent = url || "";
    }
  }

  function applyUi(ui, locale) {
    document.documentElement.lang = locale;
    document.querySelectorAll("[data-i18n]").forEach((element) => { setTextWithLinks(element, valueAt(ui, element.dataset.i18n)); });
    document.querySelectorAll("[data-i18n-list]").forEach((element) => { renderList(element, valueAt(ui, element.dataset.i18nList)); });
    languageSelector.setAttribute("aria-label", ui.languageSelectorLabel);
    document.querySelector(".sidebar").setAttribute("aria-label", ui.sidebar.ariaLabel || "Resume details");
    applyDownload(ui);
  }

  async function loadUi(languageId) {
    const path = `content/${languageId}/ui.json`;
    if (!uiCache.has(path)) {
      const ui = await fetch(path).then((response) => {
        if (!response.ok) throw new Error("UI file unavailable");
        return response.json();
      });
      uiCache.set(path, ui);
    }
    return uiCache.get(path);
  }

  function appendInline(element, text) {
    const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^\s)]+\)|https?:\/\/[^\s<>"']+)/g;
    let lastIndex = 0;
    for (const match of text.matchAll(pattern)) {
      element.append(document.createTextNode(text.slice(lastIndex, match.index)));
      const token = match[0];
      if (token.startsWith("**")) { const strong = document.createElement("strong"); strong.textContent = token.slice(2, -2); element.append(strong); }
      else if (token.startsWith("*")) { const emphasis = document.createElement("em"); emphasis.textContent = token.slice(1, -1); element.append(emphasis); }
      else if (token.startsWith("`")) { const code = document.createElement("code"); code.textContent = token.slice(1, -1); element.append(code); }
      else if (token.startsWith("http")) {
        const link = document.createElement("a"); link.href = token; link.textContent = token; element.append(link);
      } else {
        const [, label, href] = token.match(/^\[([^\]]+)\]\(([^\s)]+)\)$/);
        const link = document.createElement("a"); link.textContent = label;
        if (/^(https?:|mailto:|#|\/(?!\/)|\.\/|\.\.\/|assets\/)/.test(href)) link.href = href;
        element.append(link);
      }
      lastIndex = match.index + token.length;
    }
    element.append(document.createTextNode(text.slice(lastIndex)));
  }

  function createDetails(closedLabel, openLabel, markdown) {
    const details = document.createElement("details"); details.className = "content-details";
    const summary = document.createElement("summary");
    const updateLabel = () => { summary.textContent = details.open ? openLabel : closedLabel; };
    details.addEventListener("toggle", updateLabel); updateLabel();
    const content = document.createElement("div"); content.className = "content-details-content";
    content.append(renderMarkdown(markdown)); details.append(summary, content);
    return details;
  }

  function createMetrics(lines) {
    const metrics = document.createElement("dl"); metrics.className = "project-metrics";
    lines.filter((line) => line.trim()).forEach((line) => {
      const match = line.match(/^(.+?)\s*\|\s*(.+)$/); if (!match) return;
      const item = document.createElement("div"); const value = document.createElement("dt"); const label = document.createElement("dd");
      appendInline(value, match[1]); appendInline(label, match[2]); item.append(value, label); metrics.append(item);
    });
    return metrics;
  }

  function renderMarkdown(markdown) {
    const fragment = document.createDocumentFragment(); const lines = markdown.replace(/\r\n?/g, "\n").split("\n"); let line = 0;
    while (line < lines.length) {
      const current = lines[line]; if (!current.trim()) { line += 1; continue; }
      if (current.startsWith("```")) {
        const codeLines = []; line += 1; while (line < lines.length && !lines[line].startsWith("```")) codeLines.push(lines[line++]); if (line < lines.length) line += 1;
        const pre = document.createElement("pre"); const code = document.createElement("code"); code.textContent = codeLines.join("\n"); pre.append(code); fragment.append(pre); continue;
      }
      const details = current.match(/^:::details\s+(.+?)\s*\|\s*(.+)\s*$/);
      if (details) {
        const detailLines = []; let nestedDirectiveDepth = 0; line += 1;
        while (line < lines.length) {
          const detailLine = lines[line];
          if (detailLine.trim() === ":::") {
            if (nestedDirectiveDepth === 0) break;
            nestedDirectiveDepth -= 1;
          } else if (/^:::(?:details\b|metrics\s*$)/.test(detailLine)) nestedDirectiveDepth += 1;
          detailLines.push(detailLine); line += 1;
        }
        if (line < lines.length) line += 1;
        fragment.append(createDetails(details[1], details[2], detailLines.join("\n"))); continue;
      }
      if (current.trim() === ":::metrics") {
        const metricLines = []; line += 1;
        while (line < lines.length && lines[line].trim() !== ":::") metricLines.push(lines[line++]);
        if (line < lines.length) line += 1;
        fragment.append(createMetrics(metricLines)); continue;
      }
      const heading = current.match(/^(#{1,5})\s+(.+)$/);
      if (heading) { const title = document.createElement(`h${Math.min(6, heading[1].length + 1)}`); appendInline(title, heading[2]); fragment.append(title); line += 1; continue; }
      if (/^\s*(?:[-*+] |\d+\. )/.test(current)) {
        const list = document.createElement(/^\s*\d+\. /.test(current) ? "ol" : "ul");
        while (line < lines.length) { const item = lines[line].match(/^\s*(?:[-*+] |\d+\. )(.+)$/); if (!item) break; const li = document.createElement("li"); appendInline(li, item[1]); list.append(li); line += 1; }
        fragment.append(list); continue;
      }
      if (current.startsWith("> ")) { const quote = document.createElement("blockquote"); appendInline(quote, current.slice(2)); fragment.append(quote); line += 1; continue; }
      const paragraphLines = [current]; line += 1;
      while (line < lines.length && lines[line].trim() && !/^(#{1,5}\s|```|\s*(?:[-*+] |\d+\. )|> )/.test(lines[line])) paragraphLines.push(lines[line++]);
      const paragraph = document.createElement("p"); appendInline(paragraph, paragraphLines.join(" ")); fragment.append(paragraph);
    }
    return fragment;
  }

  function contentPath(panel) { return `content/${language}/${panel.dataset.document}`; }
  async function loadPanel(panel) {
    const path = contentPath(panel); panel.setAttribute("aria-busy", "true");
    try {
      const markdown = markdownCache.has(path) ? markdownCache.get(path) : await fetch(path).then((response) => { if (!response.ok) throw new Error("Markdown file unavailable"); return response.text(); });
      markdownCache.set(path, markdown); if (contentPath(panel) !== path) return; panel.replaceChildren(renderMarkdown(markdown));
    } catch {
      if (contentPath(panel) !== path) return; panel.replaceChildren(); const message = document.createElement("p"); message.className = "muted"; message.textContent = `This section could not be loaded from ${path}.`; panel.append(message);
    } finally { if (contentPath(panel) === path) panel.setAttribute("aria-busy", "false"); }
  }

  function updateUrl(panelName) { const url = new URL(location.href); url.searchParams.set("lang", language); url.hash = panelName; history.replaceState(null, "", url); }
  function activateTab(tab, moveFocus = false) {
    const activePanel = document.getElementById(`panel-${tab.dataset.panel}`);
    tabs.forEach((item) => { const active = item === tab; item.setAttribute("aria-selected", active); item.tabIndex = active ? 0 : -1; });
    panels.forEach((panel) => { panel.hidden = panel !== activePanel; }); updateUrl(tab.dataset.panel); loadPanel(activePanel); if (moveFocus) tab.focus();
  }

  async function setLanguage(languageId) {
    language = languageId;
    const selectedLanguage = languages.find((item) => item.id === languageId);
    const ui = await loadUi(languageId);
    if (language !== languageId) return;
    applyUi(ui, selectedLanguage.locale);
    const activeTab = tabs.find((tab) => tab.getAttribute("aria-selected") === "true");
    activateTab(activeTab);
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateTab(tab));
    tab.addEventListener("keydown", (event) => {
      const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
      if (event.key in keys) { event.preventDefault(); activateTab(tabs[(index + keys[event.key] + tabs.length) % tabs.length], true); }
      if (event.key === "Home") { event.preventDefault(); activateTab(tabs[0], true); }
      if (event.key === "End") { event.preventDefault(); activateTab(tabs.at(-1), true); }
    });
  });

  (async () => {
    try {
      languages = await fetch("content/languages.json").then((response) => { if (!response.ok) throw new Error("Language catalog unavailable"); return response.json(); });
      const siteConfig = await fetch("content/site.json").then((response) => response.ok ? response.json() : null).catch(() => null);
      applySiteConfig(siteConfig);
      languageSelector.replaceChildren(...languages.map((item) => new Option(item.label, item.id)));
      const requestedLanguage = new URLSearchParams(location.search).get("lang");
      languageSelector.value = languages.some((item) => item.id === requestedLanguage) ? requestedLanguage : languages[0].id;
      languageSelector.addEventListener("change", () => setLanguage(languageSelector.value));
      await setLanguage(languageSelector.value);
      const hashTab = document.querySelector(`[data-panel="${location.hash.slice(1)}"]`); activateTab(hashTab || tabs[0]);
    } catch {
      languageSelector.replaceChildren(new Option("English", "english"));
      const message = document.createElement("p"); message.className = "muted"; message.textContent = "The language configuration could not be loaded."; document.querySelector(".panel-wrap").replaceChildren(message);
    }
  })();
});
