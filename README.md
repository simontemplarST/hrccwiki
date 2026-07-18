# HRCC Wiki

A static [Hugo](https://gohugo.io) rebuild of the Ham Radio Crash Course community wiki,
using the [hugo-book](https://github.com/alex-shpak/hugo-book) theme. Content was imported
from the original Wiki.js site.

## Local development

```sh
hugo server
```

Then open <http://localhost:1313>.

## Build

```sh
hugo --gc --minify
```

Output is written to `public/`.

## Deployment

Pushing to `main` builds and publishes the site to GitHub Pages via
[.github/workflows/hugo.yml](.github/workflows/hugo.yml). The `baseURL` is set
automatically from the Pages configuration, so the site works whether it is served
from a project subpath or a custom domain.

## Content import

Pages live under [`content/`](content/). Each page keeps its original wiki URL via a
`url:` field in the front matter. The importer that converted the original rendered
HTML to Markdown is kept in `_convert.js` / `_dl.sh` for provenance (run `npm install`
first); it is not needed to build or serve the site.

## Theme

The `hugo-book` theme is vendored under [`themes/hugo-book/`](themes/hugo-book) (not a
submodule) so the site builds without any extra setup. Custom Markdown render hooks in
[`layouts/_markup/`](layouts/_markup) rewrite root-relative links and images through
`relURL` so they resolve correctly under a Pages subpath.
