/*
  Shared helpers used by the home page (js/app.js) and every project page
  (js/project.js). You shouldn't need to edit this file.
*/
(function () {
  "use strict";

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // Cutting-mat green cover colours, picked consistently per project from its id.
  var ART = [
    ["#0b7a52", "#043a28"], ["#064d34", "#032e1f"], ["#1aa672", "#0b7a52"],
    ["#0a6a47", "#032e1f"], ["#0b7a52", "#064d34"], ["#1aa672", "#043a28"]
  ];
  function artStyle(project) {
    var seed = String(project.id || project.title || "");
    var h = 0;
    for (var i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
    var pair = ART[h % ART.length];
    return "--a:" + pair[0] + ";--b:" + pair[1];
  }

  // Image paths in data/projects.js are written relative to the site root.
  // `base` is how far up the root is from the current page ("" for the home
  // page, "../../" for a project page).
  function resolve(path, base) {
    if (/^([a-z][a-z0-9+.-]*:|\/\/|\/)/i.test(path)) return path;
    return (base || "") + path;
  }

  function artInner(project, base) {
    var initial = esc((project.title || "?").replace(/^Example:\s*/i, "").charAt(0).toUpperCase());
    var img = project.image
      ? '<img src="' + esc(resolve(project.image, base)) + '" alt="' + esc(project.imageAlt || "") + '" loading="lazy">'
      : "";
    return img + '<span class="monogram" aria-hidden="true">' + initial + "</span>";
  }

  // Contact links in the footer come from data/site.js. Empty urls are skipped.
  function renderFooter() {
    var site = window.SITE || {};
    var box = document.getElementById("footer-links");
    var year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
    if (!box) return;
    (site.links || []).filter(function (l) { return l && l.url; }).forEach(function (l) {
      var a = document.createElement("a");
      a.href = l.url;
      a.textContent = l.label;
      if (/^https?:/i.test(l.url)) { a.target = "_blank"; a.rel = "noopener"; }
      box.appendChild(a);
    });
  }

  // If a cover image path is wrong, fall back to the generated cover instead of a
  // broken icon. (Images inside a project's write-up are left alone so you notice
  // and fix them.)
  document.addEventListener("error", function (e) {
    var t = e.target;
    if (t && t.tagName === "IMG" && t.closest(".card-art, .feat-art, .project-cover")) t.remove();
  }, true);

  window.Portfolio = { esc: esc, artStyle: artStyle, artInner: artInner, resolve: resolve, renderFooter: renderFooter };
})();
