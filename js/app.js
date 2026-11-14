/*
  Home page code. You shouldn't need to edit this to add projects;
  that happens in data/projects.js and the projects/ folder.
*/
(function () {
  "use strict";

  var P = window.Portfolio;
  var esc = P.esc, artStyle = P.artStyle, artInner = P.artInner;

  var projects = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];
  var site = window.SITE || {};
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var $ = function (sel) { return document.querySelector(sel); };
  var el = {
    heroTitle: $("#hero-title"), heroIntro: $("#hero-intro"),
    carousel: $("#carousel"), track: $("#track"), dots: $("#dots"),
    prev: $("#prev"), next: $("#next"), toggle: $("#toggle"),
    search: $("#search"), count: $("#count"),
    grid: $("#grid"), empty: $("#empty")
  };

  // Where a project's page lives. Ends in index.html so it also works when
  // you open the site straight from your files (without a web server).
  function pageUrl(p) { return "projects/" + encodeURIComponent(p.id) + "/index.html"; }

  /* ---------- hero + footer ---------- */
  el.heroTitle.textContent = site.headline || "Selected projects";
  el.heroIntro.textContent = site.intro || "";
  el.heroIntro.hidden = !site.intro;
  P.renderFooter();

  /* ---------- featured carousel ---------- */
  var featured = projects.filter(function (p) { return p.featured; });
  var index = 0;
  var timer = null;
  var paused = reduceMotion; // reduced-motion visitors never get autoplay

  function renderCarousel() {
    if (!featured.length) return;
    el.carousel.hidden = false;
    el.track.innerHTML = featured.map(function (p, i) {
      return '<article class="feat" style="' + artStyle(p) + '" aria-roledescription="slide" aria-label="' + (i + 1) + " of " + featured.length + '">' +
        '<div class="feat-art">' + artInner(p, "") + "</div>" +
        '<div class="feat-body"><h3><a class="card-link" href="' + esc(pageUrl(p)) + '">' + esc(p.title) + "</a></h3>" +
        "<p>" + esc(p.summary) + "</p></div></article>";
    }).join("");

    var multiple = featured.length > 1;
    [el.prev, el.next, el.dots, el.toggle].forEach(function (n) { n.hidden = !multiple; });
    el.dots.innerHTML = featured.map(function (_, i) {
      return '<button class="dot" type="button" data-i="' + i + '" aria-label="Show project ' + (i + 1) + '"></button>';
    }).join("");
    updateDots();
    if (multiple) startAutoplay();
  }

  function cardOffset(i) {
    var pad = parseFloat(getComputedStyle(el.track).paddingLeft) || 0;
    return el.track.children[i].offsetLeft - pad;
  }
  function updateDots() {
    el.dots.querySelectorAll(".dot").forEach(function (d, i) {
      if (i === index) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current");
    });
  }
  function goTo(i) {
    index = (i + featured.length) % featured.length;
    el.track.scrollTo({ left: cardOffset(index), behavior: reduceMotion ? "auto" : "smooth" });
    updateDots();
  }

  // Keep the dots right when someone swipes or scrolls by hand.
  var scrollTimer;
  el.track.addEventListener("scroll", function () {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function () {
      var best = 0, bestDist = Infinity;
      for (var i = 0; i < el.track.children.length; i++) {
        var dist = Math.abs(cardOffset(i) - el.track.scrollLeft);
        if (dist < bestDist) { best = i; bestDist = dist; }
      }
      index = best;
      updateDots();
    }, 80);
  }, { passive: true });

  function startAutoplay() {
    stopAutoplay();
    if (!paused) timer = setInterval(function () { goTo(index + 1); }, 5500);
  }
  function stopAutoplay() { clearInterval(timer); timer = null; }

  el.prev.addEventListener("click", function () { goTo(index - 1); });
  el.next.addEventListener("click", function () { goTo(index + 1); });
  el.dots.addEventListener("click", function (e) {
    var dot = e.target.closest(".dot");
    if (dot) goTo(Number(dot.dataset.i));
  });
  el.toggle.textContent = paused ? "Play" : "Pause";
  el.toggle.addEventListener("click", function () {
    paused = !paused;
    el.toggle.textContent = paused ? "Play" : "Pause";
    if (paused) stopAutoplay(); else startAutoplay();
  });
  // Don't move things while someone is reading or interacting with the banner.
  el.carousel.addEventListener("mouseenter", stopAutoplay);
  el.carousel.addEventListener("focusin", stopAutoplay);
  el.carousel.addEventListener("mouseleave", function () { if (!paused) startAutoplay(); });
  el.carousel.addEventListener("focusout", function () { if (!paused) startAutoplay(); });

  /* ---------- project grid, search ---------- */
  function matches(p) {
    var q = el.search.value.trim().toLowerCase();
    var inTag = true;
    var inText = !q || [p.title, p.summary, (p.tags || []).join(" ")]
      .some(function (s) { return String(s || "").toLowerCase().indexOf(q) !== -1; });
    return inTag && inText;
  }

  function renderGrid() {
    var list = projects.filter(matches);
    el.grid.innerHTML = list.map(function (p) {
      return '<article class="card" style="' + artStyle(p) + '">' +
        (p.featured ? '<span class="badge">Featured</span>' : "") +
        '<div class="card-art">' + artInner(p, "") + "</div>" +
        '<div class="card-body">' +
          '<h3><a class="card-link" href="' + esc(pageUrl(p)) + '">' + esc(p.title) + "</a></h3>" +
          "<p>" + esc(p.summary) + "</p>" +
          '<div class="keywords">' + (p.tags || []).slice(0, 4).map(function (t) { return '<span class="keyword">' + esc(t) + "</span>"; }).join("") + "</div>" +
        "</div></article>";
    }).join("");

    el.empty.hidden = list.length > 0;
    if (!list.length) {
      el.empty.textContent = projects.length
        ? "No projects match that search. Try a different word or clear the keyword filter."
        : "Projects will appear here once they're added to data/projects.js.";
    }
    el.count.textContent = projects.length
      ? "Showing " + list.length + " of " + projects.length + (projects.length === 1 ? " project" : " projects")
      : "";
  }
  el.search.addEventListener("input", renderGrid);

  /* ---------- go ---------- */
  renderCarousel();
  renderGrid();
})();
