/* Builds a "Contents" sidebar from the h2 headings on a project page.
   Add <p class="group-label">Group name</p> above a heading to start a new group.
   Needs at least 3 headings; otherwise nothing is added. */
(function () {
  var body = document.querySelector(".project-body");
  var prose = body && body.querySelector(".prose");
  if (!prose) return;

  var items = [].slice.call(prose.querySelectorAll("h2, .group-label"));
  var heads = items.filter(function (el) { return el.tagName === "H2"; });
  if (heads.length < 3) return;

  var used = {};
  heads.forEach(function (h) {
    if (!h.id) {
      var base = h.textContent.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "section";
      var id = base, n = 2;
      while (used[id] || document.getElementById(id)) { id = base + "-" + n++; }
      h.id = id;
    }
    used[h.id] = true;
  });

  var nav = document.createElement("nav");
  nav.className = "toc";
  nav.setAttribute("aria-label", "Contents");
  var title = document.createElement("p");
  title.className = "toc-title";
  title.textContent = "Contents";
  var ul = document.createElement("ul");
  var links = {};

  items.forEach(function (el) {
    var li = document.createElement("li");
    if (el.tagName === "H2") {
      var a = document.createElement("a");
      a.href = "#" + el.id;
      a.textContent = el.textContent;
      li.appendChild(a);
      links[el.id] = a;
    } else {
      li.className = "toc-group";
      li.textContent = el.textContent;
    }
    ul.appendChild(li);
  });
  nav.appendChild(title);
  nav.appendChild(ul);
  body.classList.add("has-toc");
  body.insertBefore(nav, prose);

  if (!("IntersectionObserver" in window)) return;
  var current = null;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        if (current) current.removeAttribute("aria-current");
        current = links[e.target.id];
        current.setAttribute("aria-current", "true");
      }
    });
  }, { rootMargin: "-10% 0px -75% 0px" });
  heads.forEach(function (h) { io.observe(h); });
})();
