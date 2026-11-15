/*
  Used by every page in projects/. It looks up the page's project (using the
  data-project attribute on <body>) in data/projects.js and fills in the title,
  year, summary, keywords and cover image at the top. The write-up underneath
  is plain HTML that you write in the page itself.
*/
(function () {
  "use strict";

  var P = window.Portfolio;
  var projects = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];
  var id = document.body.getAttribute("data-project");
  var project = projects.filter(function (p) { return p.id === id; })[0];

  var $ = function (sel) { return document.querySelector(sel); };
  var BASE = "../../"; // project pages sit two folders below the site root

  P.renderFooter();

  if (!project) {
    $("#p-title").textContent = "Project not found";
    $("#p-summary").textContent = 'No project with the id "' + id + '" exists in data/projects.js. ' +
      "Check that data-project on the <body> tag matches the id exactly.";
    return;
  }

  document.title = project.title + " \u2014 WRicho";
  var meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", project.summary || project.title);

  $("#p-year").textContent = (project.year || "Project") + (project.status ? " · " + project.status.charAt(0).toUpperCase() + project.status.slice(1) : "");
  $("#p-title").textContent = project.title;
  $("#p-summary").textContent = project.summary || "";
  $("#p-tags").innerHTML = (project.tags || []).map(function (t) {
    return '<span class="keyword">' + P.esc(t) + "</span>";
  }).join("");

  if (project.image) {
    var cover = $("#p-cover");
    cover.hidden = false;
    cover.innerHTML = '<div class="project-cover-inner" style="' + P.artStyle(project) + '">' +
      P.artInner(project, BASE) + "</div>";
  }
})();
