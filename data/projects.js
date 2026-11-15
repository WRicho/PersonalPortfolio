/*
  PROJECTS: the list that builds the banner and the project cards on the
  home page. Each project's full write-up lives on its own page, in
  projects/<id>/index.html.

  To add a project:
    1. Copy the folder projects/_template and rename the copy to the
       project's id (e.g. projects/line-follower).
    2. Edit the index.html inside it (that's the project's page).
    3. Copy one of the { ... } blocks below, paste it at the top of the
       list, and set id to the SAME name as the folder.

  Fields:
    id        must match the folder name in projects/ exactly. No spaces;
              use lowercase and hyphens.
    title     project name
    summary   one sentence, shown on the card and at the top of the page
    image     cover image path, from the site root, e.g.
              "projects/line-follower/cover.png". Leave "" for an automatic cover.
    imageAlt  short description of the image for screen readers (optional)
    tags      keywords for the card, the project page, and the filter buttons
    featured  true = also appears in the scrolling banner at the top
    status    "ongoing" or "completed" (optional; shown on the card and used by the Ongoing / Completed buttons)
    date      YYYY-MM-DD, used only for sorting (the year field is just for display)
    year      e.g. "2026" (optional)

  The order here is the order on the site: put newest projects first.

  The two projects below are placeholders. Replace their text, or delete them
  (and their folders in projects/) before you publish.
*/

window.PROJECTS = [
  {
    id: "project-one",
    title: "Personal Portfolio Website",
    summary: "Personal Portfolio using GitHub Pages to showcase projects & experiment with using AI as a tool.",
    image: "projects/project-one/cover.svg",
    imageAlt: "Simplified illustration of the portfolio website: a header, a heading and two project tiles on an emerald cutting mat.",
    tags: ["HTML", "CSS", "JavaScript", "AI"],
    status: "ongoing",
    featured: true,
    date: "2026-11-15",
    year: "November 2026"
  },
  {
    id: "project-two",
    title: "Project two",
    summary: "A one-sentence summary of this project.",
    image: "",
    imageAlt: "",
    tags: ["Arduino", "Mechatronics"],
    status: "completed",
    featured: true,
    date: "2026-10-01",
    year: "2026"
  }
];
