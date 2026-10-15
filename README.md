# Goh Wei Chong — Portfolio

A responsive personal portfolio and a separate photography gallery, built with Vite and vanilla JavaScript. The visual direction takes inspiration from [Anri's portfolio](https://anri.framer.website/#footer): large typography, an editorial layout, fine borders, and a restrained palette. The implementation and content belong to this project.

The site includes:

- A home page with an introduction, selected projects, experience, education, skills, and contact links.
- Project details that open without leaving the page.
- A photography page with twenty supplied photographs, category filters, and an image lightbox.
- A supplied profile portrait and designed placeholders for project images.
- One central content file, responsive layouts, and a GitHub Pages deployment workflow.

## Run locally

Install Node.js 22.12 or a newer LTS release and npm, then run these commands from the project directory. Vite also supports Node.js 20.19 or newer in the Node 20 release line.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`. The photography page is at `http://localhost:5173/photography/`. Vite refreshes the browser when you save an edit.

To check the site and create a production build:

```bash
npm run check
npm run build
npm run preview
```

The preview normally runs at `http://localhost:4173`. If a port is already occupied, use the address printed in the terminal. Press `Ctrl+C` in the terminal to stop either server. Build output is written to `dist/`.

## Make it yours

Edit [`src/content.js`](src/content.js) to update your information. Replace image `null` values with paths to files you add under `public/images/`. For example, a file at `public/images/portrait/wei-chong.webp` is referenced as `images/portrait/wei-chong.webp`.

Before sharing the website:

- Review the portrait and replace the project image placeholders.
- Review the photograph titles and alternative text, add any known locations or dates, and add more photographs when ready.
- Review the project descriptions and supply any repository or live links you want to publish.
- Confirm your email, LinkedIn, GitHub, availability, and current role are accurate.
- Decide whether to publish a redacted resume and enable its download link.
- Review the website on a narrow phone screen and a desktop screen.

The original resume is deliberately not included in the public website. It contains personal contact and referee information. The resume link starts disabled; see [adding a public resume](docs/EDITING.md#add-a-public-resume) for the exact steps.

See [the editing guide](docs/EDITING.md) for examples, image sizes, content fields, appearance changes, and troubleshooting. See [the architecture guide](docs/ARCHITECTURE.md) for the page structure, rendering, asset handling, and deployment design.

## Project layout

```text
portfolio/
├── index.html                    # Home page entry point and metadata
├── photography/
│   └── index.html                # Photography page entry point and metadata
├── src/
│   ├── content.js                # Your profile, projects, experience, and photographs
│   ├── main.js                   # Page rendering and interactions
│   └── styles.css                # Shared visual styles and responsive behavior
├── public/
│   └── images/
│       ├── portrait/             # Profile portrait: wei-chong.webp
│       ├── projects/             # Add project screenshots or covers here
│       └── photography/          # Optimized photographs and smaller thumbnails
├── scripts/
│   └── check-content.mjs         # Content and referenced-file checks
├── .github/workflows/
│   └── deploy.yml                # GitHub Pages build and deployment
├── docs/
│   ├── EDITING.md
│   └── ARCHITECTURE.md
└── vite.config.js                # Build entry points and deployment base path
```

## Publish on GitHub Pages

The GitHub repository is [`Goh-Wei-Chong/portfolio`](https://github.com/Goh-Wei-Chong/portfolio). The included workflow deploys changes pushed to `main` and can also be started manually.

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions** as the source.
4. Open **Actions**, select the deployment workflow, and choose **Run workflow** if a deployment has not already started.
5. Wait for the deployment job to succeed. Use the environment URL shown in that run to visit the published site.

For that repository name, the expected address is `https://goh-wei-chong.github.io/portfolio/`. This address becomes usable after Pages is enabled and a deployment succeeds. A repository push by itself does not confirm that the public website is live.

The workflow uses `BASE_PATH=/portfolio/`. To reproduce that deployment locally:

```bash
BASE_PATH=/portfolio/ npm run build
BASE_PATH=/portfolio/ npm run preview
```

Open the preview address with `/portfolio/` appended. For a Windows PowerShell terminal, set `$env:BASE_PATH = "/portfolio/"` before running `npm run build`.

If you rename the repository, update the workflow's base path to match. If you use a custom domain or a root user site such as `goh-wei-chong.github.io`, set the base path to `/` and configure the domain in GitHub Pages. See the editing guide for the complete [deployment notes](docs/EDITING.md#deployment-and-base-paths).

## Content sources

- **Resume:** the user-supplied `Goh Wei Chong Resume (2).pdf`. This is the source for the factual resume content used in the site. The private original is not copied into the repository.
- **Professional profile:** [Goh Wei Chong on LinkedIn](https://www.linkedin.com/in/goh-wei-chong-9595ba1a7/). The site links to this profile. The profile headline, Singapore location, availability, and focus on data analytics, Python, SQL, visualisation, and machine learning were reviewed during creation.
- **Visual reference:** [Anri's Framer portfolio](https://anri.framer.website/#footer), used for visual direction, rather than for personal content or assets.

The three project source links were verified against their GitHub READMEs. The photography gallery uses twenty user-supplied images, grouped into Street, Portraits, Interiors, and Details. Their locations and years remain blank until confirmed. The public files are auto-oriented, metadata-stripped WebP exports; the original photographs remain in Downloads outside this project. Unprovided live-demo links remain editable.
