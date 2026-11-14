# WRicho portfolio

A static site: plain HTML, CSS and JavaScript. No build step, no dependencies,
nothing to install. Hosted free on GitHub Pages.

## How it's organised

```
index.html                 home page: banner, project cards, filters
css/style.css              all the styling
js/                        the code that draws the pages (you rarely edit this)
data/site.js               headline, intro line, contact links
data/projects.js           the LIST of projects (feeds the banner and cards)
projects/
  _template/index.html     copy this to start a new project
  line-follower/index.html one folder + index.html per project = its own page
  ...
images/                    site-wide images (project images can live in their own folder)
```

Every project is a **folder inside `projects/` with its own `index.html`**.
That page is yours to write however you like. `data/projects.js` just lists
the projects so they show up on the home page.

## Adding a project

1. **Copy the template.** Copy the folder `projects/_template` and rename the
   copy to the project's id: lowercase, hyphens, no spaces
   (e.g. `projects/line-follower`).
2. **Point the page at itself.** Open the new `index.html` and change
   `data-project="CHANGE-ME"` on the `<body>` tag to the same id
   (`data-project="line-follower"`).
3. **Write the project.** Edit the section inside `<article class="prose">`.
   The comments in the template show the building blocks (headings,
   paragraphs, lists, images, a key-facts box, link buttons).
4. **List it on the home page.** In `data/projects.js`, copy a `{ ... }` block
   to the top of the list and set `id` to the same name as the folder, plus a
   title, one-sentence summary, tags and year. Set `featured: true` to also
   show it in the scrolling banner.
5. Preview, then commit and push (below).

The title, year, summary, keywords and cover image at the top of a project
page are filled in **automatically from `data/projects.js`**, so you only
write that information once.

### Images

Keep a project's images in its own folder, next to its `index.html`
(e.g. `projects/line-follower/rig.png`).

- **In the write-up**, use just the file name:
  `<img src="rig.png" alt="Short description">`
- **As the cover image**, set `image` in `data/projects.js` with the path from
  the site root: `image: "projects/line-follower/cover.png"`. The cover shows
  on the home page and at the top of the project page. With no `image`, an
  automatic coloured cover is used on the home page and none on the project page.

Always fill in `alt` text; it's what screen readers read out.

### Removing a project

Delete its `{ ... }` block from `data/projects.js` and delete its folder in
`projects/`.

## Before you publish

The three "Example" projects (and their folders in `projects/`) are
placeholders. Delete them or replace them with real work, and fill in your
links in `data/site.js`.

## Previewing locally

Open `index.html` in your browser (double-click it), and refresh after each
save. For auto-refresh, install the **Live Server** extension in VS Code,
right-click `index.html` and choose **Open with Live Server**.

## Publishing changes

In the VS Code terminal (it opens in the repo folder already):

```
git add .
git commit -m "Add <project name>"
git push
```

GitHub Pages rebuilds automatically; changes are live in about a minute.

## Notes

- **`_template` is never published.** GitHub Pages' default build skips folders
  that start with an underscore, so the template stays private. If you ever add
  a file called `.nojekyll` to the repo root, it *would* be published, so don't.
- **Links between pages are relative** (`../../index.html`), so the site works
  whether it's at `username.github.io/` or `username.github.io/repo-name/`.
  Don't change them to start with `/`.
- **Folder and file names are case-sensitive on GitHub Pages.** `Rig.png` and
  `rig.png` are different files.

## Troubleshooting

- **A project page says "Project not found":** `data-project` on its `<body>`
  tag doesn't match any `id` in `data/projects.js`. They must be identical.
- **A card leads to a 404:** the `id` in `data/projects.js` doesn't match the
  folder name in `projects/`.
- **Home page shows no projects at all:** a missing comma or bracket in
  `data/projects.js` stops the whole list loading. Press `F12` in the browser
  and look at the Console tab; it names the line. VS Code also underlines
  syntax mistakes in red.
- **Page is unstyled:** check the paths still match the structure above.
