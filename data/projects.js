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
    year      e.g. "2026" (optional)

  The order here is the order on the site: put newest projects first.

  The three projects below are EXAMPLES. Replace or delete them (and their
  folders in projects/) before you publish.
*/

window.PROJECTS = [
  {
    id: "example-line-follower",
    title: "Example: Line-Following Robot",
    summary: "Replace me with a one-sentence summary of your project.",
    image: "",
    imageAlt: "",
    tags: ["Arduino", "Control Systems", "C++"],
    featured: true,
    year: "2026"
  },
  {
    id: "example-heat-exchanger",
    title: "Example: Heat Exchanger Analysis",
    summary: "Replace me with a one-sentence summary of your project.",
    image: "",
    imageAlt: "",
    tags: ["Thermofluids", "MATLAB", "CAD"],
    featured: true,
    year: "2026"
  },
  {
    id: "example-embedded-device",
    title: "Example: Embedded Sensor Node",
    summary: "Replace me with a one-sentence summary of your project.",
    image: "",
    imageAlt: "",
    tags: ["ESP32", "Embedded Systems", "Electronics"],
    featured: false,
    year: "2025"
  }
];
