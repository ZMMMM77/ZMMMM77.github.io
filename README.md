# Personal portfolio

A blank personal website based on [Magic UI Portfolio](https://github.com/magicuidesign/portfolio), published with GitHub Pages.

Website: https://zmmmm77.github.io/

## Content and structure

- `src/data/profile.json`: personal information and all content. Empty fields are intentional; no biography or sample achievements are published.
- `src/data/site.json`: section titles, order, visibility and site metadata. Reorder the `sections` array, or set `enabled` to `false` to hide a section.
- `public/`: images and the future resume PDF. A file at `public/resume.pdf` uses `/resume.pdf` in `resumeUrl`.
- `src/app/page.tsx`: page layout and reusable content sections.
- `src/app/globals.css`: visual styling.
- `src/app/blog/page.tsx`: empty notes page, reserved for future content.

The blank framework uses static placeholder shapes, not a loading indicator. Keep `showPlaceholders` true while preparing content. Set it to false when ready. `allowIndexing` defaults to false until the site contains real content; it is not access control.

### Content format

Work, education and research use arrays of objects with `title`, `subtitle`, `dates`, and optional `description`, `logoUrl`, `logoText`, and `href` fields. Clicking a row expands its description; education rows with `href` show a school website link. Projects use `title`, `description`, `dates`, `tags` (array of strings), and optional `image` and `href`. Interests use `title` and `description`. Social links use `label` and `url`. Leave arrays empty until ready.

## Local development

Use Node.js 22 or newer and pnpm 10.28.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

## Production build

```sh
pnpm build
```

The website is exported to `out/`. It needs no application server or database. Preview `out/` with any static HTTP server.

## Deployment

In repository **Settings → Pages → Build and deployment**, select **GitHub Actions**. Every push to `main` runs `.github/workflows/deploy.yml`, builds the static website and deploys it to GitHub Pages. The workflow can also be run manually from Actions.

Do not upload the enclosing career folder, private resume drafts, credentials or local build directories. This repository contains only the website.

## License and attribution

Based on Magic UI Portfolio by Dillion Verma and contributors, upstream commit `5ef12e4`. Original MIT license retained in `LICENSE`. Upstream demonstration biography, photos and articles have been removed from the deployed site.
