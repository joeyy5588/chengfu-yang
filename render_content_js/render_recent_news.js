/* Renders recent research news from content/recent-news.json. */
(function () {
  "use strict";
  const container = document.getElementById("recent-news-list");
  if (!container) return;
  function render(items) {
    if (!Array.isArray(items)) return;
    container.replaceChildren();
    items.slice(0, 5).forEach(function (news) {
      const row = document.createElement("div");
      row.className = "news-item";
      const date = document.createElement("time");
      date.className = "news-date";
      date.textContent = news.date || "";
      const target = news.link && /^https?:\/\//.test(news.link)
        ? document.createElement("a")
        : document.createElement("span");
      target.className = "news-text";
      target.textContent = news.title || "";
      if (target.tagName === "A") {
        target.href = news.link;
        target.target = "_blank";
        target.rel = "noopener noreferrer";
      }
      row.append(date, target);
      container.appendChild(row);
    });
  }
  fetch("./content/recent-news.json", {cache:"no-cache"})
    .then(function (response) {
      if (!response.ok) throw new Error("News unavailable");
      return response.json();
    })
    .then(render)
    .catch(function () {
      container.textContent = "Recent updates are also available on my research project pages.";
    });
}());
