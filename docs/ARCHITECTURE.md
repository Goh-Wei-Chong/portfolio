# Website architecture

This project is a static, two-page portfolio built with Vite and browser-native JavaScript modules. It has no application server, account system, database, or private API credentials. Vite is used during development and production builds; the deployed website consists of static files.

## Page entry points

| Entry point | Public route | Purpose |
| --- | --- | --- |
| `index.html` | `/` | Profile, projects, experience, education, skills, contact |
| `photography/index.html` | `/photography/` | Photograph gallery, filtering, and image viewing |

Both entries load `src/main.js` and share `src/styles.css`. Their HTML provides page metadata and the mounting structure. The renderer selects the appropriate page and fills it using the exports in `src/content.js`.

These are real HTML entry points rather than client-side routing. A visitor can open the photography URL directly, and static hosting can serve it without a fallback routing rule.

## Content and rendering

The content module keeps personal information separate from page construction:

| Export | Content |
| --- | --- |
| `profile` | Identity, headline, introduction, contact links, portrait, optional resume |
| `projects` | Project summaries, longer details, tools, images, optional links |
| `experience` | Professional experience |
| `education` | Qualifications and education |
| `skills` | Published skills |
| `photos` | Gallery images, captions, categories, and orientation |

List order determines presentation order. Stable IDs connect cards to their detailed content. Optional image and URL fields use `null` to represent missing user-provided material.

The initial website intentionally includes image placeholders. They give the user a usable layout before portraits, project covers, and photographs are supplied, without inventing personal imagery. Adding an image requires a file in `public/` and a matching content path.

Text changes normally require only a content edit. New components or content fields require matching changes in `main.js`, the relevant styles, and the content checker.

## Asset paths and production base

Vite copies `public/` contents into the production output. For example:

```text
Source file:     public/images/photography/city-evening.webp
Content value:  images/photography/city-evening.webp
Local URL:      /images/photography/city-evening.webp
Pages URL:      /portfolio/images/photography/city-evening.webp
```

The renderer's asset helper prepends `import.meta.env.BASE_URL` to local asset paths. The build configuration gets its base path from `BASE_PATH`, with `/` as the local default. The GitHub Pages workflow supplies `/portfolio/`.

This is why content paths omit both `public/` and a leading slash. Hardcoding `/images/...` would point to the domain root and fail for a project deployed under `/portfolio/`.

External contact and project links remain complete URLs. The resume is an optional public asset and follows the same base path handling as images.

## Interactions

The shared JavaScript manages the following browser interactions:

- Responsive site navigation.
- Project cards and their detail view.
- Gallery category filtering using the categories in `photos`.
- A gallery lightbox with caption and navigation controls; empty slots open an explanatory frame view.

Keyboard access, visible focus states, and the ability to close overlays are part of the interaction design. When changing an overlay, verify focus behavior and keyboard controls as well as pointer interaction. When changing gallery filtering, confirm that the visible photo order and lightbox navigation remain consistent.

Images without a real source remain placeholders. They should not be treated as actual photographs or linked to invented image URLs.

## Styling

`src/styles.css` contains shared design values, page layouts, components, responsive rules, and interaction states. The design uses prominent headings, generous spacing, rounded panels, and photographic framing to give resume content an editorial presentation.

The home page and photography page share navigation, typography, and contact styling. Component classes provide local variations, while responsive rules adapt grids and spacing to narrower screens. Keep reduced-motion behavior and visible focus treatment intact when adjusting animation or transitions.

## Validation

The local scripts provide three different checks:

| Command | What it verifies |
| --- | --- |
| `npm run check` | Content structure and referenced local files, according to `scripts/check-content.mjs` |
| `npm run build` | Vite can generate the production entries and their bundled assets |
| `npm run preview` | Serves the generated output for a browser review |

The checker is a guard against common editing mistakes, rather than a substitute for visual review. A successful build does not establish that an external link works or that all copy is current. Check the actual production build at its intended base path before publishing significant changes.

## Build and deployment

```text
HTML entry points + src modules + public assets
                       ↓
                 Vite production build
                       ↓
                     dist/
                       ↓
              Static hosting / GitHub Pages
```

The GitHub Actions workflow in `.github/workflows/deploy.yml` runs on a push to `main` or a manual dispatch. It installs the locked dependencies, validates the content, builds using the repository base path, and publishes the generated `dist/` artifact through GitHub Pages.

GitHub Pages must be enabled for the repository with **GitHub Actions** as its build source. Workflow success and the deployment environment URL are the evidence that publication completed. Merely pushing source files does not establish a live site.

If the repository name or domain changes, update the workflow's base path and rebuild. A custom domain hosted at the domain root uses `/`; a project repository normally uses `/<repository-name>/`.

For other static hosts, deploy `dist/` and preserve directory structure. Neither `node_modules/` nor the development server needs to be uploaded.

## Privacy and source boundaries

All client-side content and all files placed in `public/` are public after deployment. They must not contain secrets or documents intended to stay private.

The supplied resume is the source for the factual resume material. Its original copy remains outside the project because it includes a residential address, personal contact information, and referee contact information. A public resume must be independently redacted and explicitly added; `profile.resume` begins as `null`.

The LinkedIn URL is provided as a profile link. Fields that cannot be verified from the supplied resume or an accessible profile should remain editable prompts, rather than invented biographical claims. The Framer reference informs the visual direction and is not a source of photographs, personal details, or third-party source code for this project.

## Extending the project

For another content section, add the data shape in `content.js`, render it in `main.js`, style it in `styles.css`, and update the checker for any newly required fields. For another page, add a separate HTML entry and include it in `vite.config.js`.

Keep the static architecture while it meets the need. A contact link does not require a backend. If you later add a form, analytics, or another external service, document its configuration and data handling, keep any server-side secrets out of the client bundle, and update the deployment instructions.
