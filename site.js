(function () {
  const chapters = Array.isArray(window.MAXIMUM_DUEL_CHAPTERS)
    ? window.MAXIMUM_DUEL_CHAPTERS
    : [];

  document.addEventListener("DOMContentLoaded", () => {
    renderChapterLists();
    markCurrentChapter();
  });

  function renderChapterLists() {
    document.querySelectorAll(".chapter-list").forEach(renderSidebarList);

    const tocGrid = document.querySelector(".toc-grid");
    if (tocGrid) renderFullToc(tocGrid);
  }

  function renderSidebarList(list) {
    list.innerHTML = "";

    if (!chapters.length) {
      list.append(emptyItem("No chapters posted yet."));
      return;
    }

    chapters.forEach(chapter => {
      const item = document.createElement("li");
      const link = document.createElement("a");

      link.href = siteUrl(chapter.file);
      link.textContent = chapter.title;
      item.append(link);
      list.append(item);
    });
  }

  function renderFullToc(list) {
    list.innerHTML = "";

    if (!chapters.length) {
      list.append(emptyItem("No chapters have been posted yet."));
      return;
    }

    chapters.forEach((chapter, index) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      const title = document.createElement("strong");
      const meta = document.createElement("span");

      link.href = siteUrl(chapter.file);
      title.textContent = chapter.title;
      meta.textContent = chapter.date
        ? `Chapter ${index + 1} - ${chapter.date}`
        : `Chapter ${index + 1}`;

      link.append(title, meta);
      item.append(link);
      list.append(item);
    });
  }

  function markCurrentChapter() {
    const currentPath = normalizePath(window.location.pathname);

    document.querySelectorAll(".chapter-list a, .toc-grid a").forEach(link => {
      const linkPath = normalizePath(new URL(link.href, window.location.href).pathname);
      if (currentPath.endsWith(linkPath) || linkPath.endsWith(currentPath)) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  function emptyItem(message) {
    const item = document.createElement("li");
    item.className = "empty-note";
    item.textContent = message;
    return item;
  }

  function siteUrl(file) {
    return `${document.body.dataset.siteRoot || ""}${file}`;
  }

  function normalizePath(pathname) {
    return decodeURIComponent(pathname).replace(/\\/g, "/").replace(/^.*Maximum Duel\//, "");
  }
})();
