/* Publications are loaded from content/publication.json.
   DOM nodes use textContent so publication metadata is not interpreted as HTML. */
(function () {
  "use strict";
  const container = document.getElementById("publication-list");
  if (!container) return;

  function element(tag, className, content) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (content !== undefined && content !== null) node.textContent = content;
    return node;
  }
  function formatAuthors(text) {
    const p = element("p", "paper-authors");
    String(text || "").split(/(Cheng-Fu Yang)/g).forEach(function (part) {
      if (part === "Cheng-Fu Yang") p.appendChild(element("strong", null, part));
      else p.appendChild(document.createTextNode(part));
    });
    return p;
  }
  function makeLinks(links) {
    const list = element("div", "paper-links");
    const names = {project:"Project", demo:"Live demo", paper:"Paper", code:"Code", data:"Data", bibtex:"BibTeX", slides:"Slides", talk:"Talk"};
    Object.keys(names).forEach(function (name) {
      const url = links && links[name];
      if (!url || !/^https?:\/\//.test(url)) return;
      const a = element("a", "", names[name]);
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      list.appendChild(a);
    });
    return list;
  }
  function render(data) {
    container.replaceChildren();
    if (!Array.isArray(data) || !data.length) throw new Error("No papers found");
    data.sort(function (a, b) { return Number(b.year) - Number(a.year); });
    let lastYear = null;
    data.forEach(function (paper) {
      if (paper.year !== lastYear) {
        const heading = element("h3", "year-heading", String(paper.year));
        container.appendChild(heading);
        lastYear = paper.year;
      }
      const item = element("article", "publication-entry");
      item.appendChild(element("div", "paper-venue", paper.conference));
      item.appendChild(element("h4", "paper-title", paper.paper_title));
      item.appendChild(formatAuthors(paper.author_list));
      item.appendChild(makeLinks(paper.links));
      container.appendChild(item);
    });
  }
  fetch("./content/publication.json", {cache:"no-cache"})
    .then(function (response) {
      if (!response.ok) throw new Error("Could not load publications");
      return response.json();
    })
    .then(render)
    .catch(function () {
      container.textContent = "Publication list is temporarily unavailable. Please visit my Google Scholar profile for the complete record.";
    });
}());
