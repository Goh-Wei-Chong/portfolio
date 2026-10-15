# Website architecture

This project is a static, two-page portfolio built with Vite and browser-native JavaScript modules. It has no application server, account system, database, or private API credentials. Vite is used during development and production builds; the deployed website consists of static files.

## Page entry points

| Entry point | Public route | Purpose |
| --- | --- | --- |
| `index.html` | `/` | Profile, projects, experience, education, skills, contact |
| `photography/index.html` | `/photography/` | Photograph gallery, filtering, and image viewing |

Both entries load `src/main.js` and share the layout and theme styles. Their HTML provides page metadata and the mounting structure, and loads `public/theme-init.js` early to apply the initial theme. The renderer selects the appropriate page and fills it using the exports in `src/content.js`.

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
| `photos` | Full images, optional thumbnails and dimensions, captions, categories, and orientation |

List order determines presentation order. Stable IDs connect cards to their detailed content. Optional image and URL fields use `null` to represent missing user-provided material.

The profile portrait uses the supplied image at `public/images/portrait/wei-chong.webp`; project covers retain designed placeholders. The gallery contains twenty-five user-supplied photographs in Street, Portraits, Interiors, and Details; all current images use portrait orientation. It does not invent locations or dates. Adding or replacing an image requires a file in `public/` and a matching content path.

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

Gallery cards use an optional `thumbnail` export. When dimensions are also supplied, responsive `srcset` markup offers the thumbnail and full `src`; its thumbnail width calculation assumes a 900-pixel long edge. The lightbox uses `src`. The current WebP exports have a 2200-pixel long edge for full images and a 900-pixel long edge for thumbnails. Orientation is applied before export, metadata is removed, and the original photographs remain outside the repository in Downloads.

Optional `width` and `height` describe the full image after orientation and set its aspect ratio in the gallery, preserving both portrait and landscape framing. Future entries can omit the thumbnail and dimensions: rendering falls back to `src` and the orientation-based default shape.

The gallery recalculates staggering and centers isolated closing portraits, including after category filtering. Future entries marked `landscape` span a full row and create a new layout group. These choices use the existing orientation and array order; no extra content fields are required.

## Interactions

The shared JavaScript manages the following browser interactions:

- Responsive site navigation.
- Project cards and their detail view.
- Gallery category filtering using the categories in `photos`.
- A gallery lightbox with caption and navigation controls; empty slots open an explanatory frame view.
- A shared light/dark theme toggle with a saved browser preference.
- An illustrated shared contact footer with a back-to-top action and Shisa messages for hover, focus, and tap interaction.
- A CSS portrait wobble for fine-pointer hover when reduced motion is not requested.

Keyboard access, visible focus states, and the ability to close overlays are part of the interaction design. When changing an overlay, verify focus behavior and keyboard controls as well as pointer interaction. When changing gallery filtering, confirm that the visible photo order and lightbox navigation remain consistent.

Images without a real source remain placeholders. They should not be treated as actual photographs or linked to invented image URLs.

## Styling

`src/styles.css` contains the base light palette, shared design values, page layouts, components, responsive rules, and interaction states. `src/theme.css` supplies the dark palette, theme-specific component styling, and toggle styles. The design uses prominent headings, generous spacing, fine borders, and photographic framing to give resume content an editorial presentation.

The home page and photography page share navigation, typography, and contact styling. Component classes provide local variations, while responsive rules adapt grids and spacing to narrower screens. Keep reduced-motion behavior and visible focus treatment intact when adjusting animation or transitions.

`src/icons.js` provides `icon(name, className = '')` for shared inline SVG symbols, including arrows, asterisks, and controls. SVG geometry keeps their appearance consistent across browsers and platforms; `currentColor` follows the surrounding theme. These decorative icons are hidden from assistive technology and cannot take focus, so buttons and links retain their own accessible names.

The home page portrait's hover effect is defined by `.hero-portrait:hover .portrait-frame` and `@keyframes portrait-shake` in `src/styles.css`. Its media query requires hover support, a fine pointer, and `prefers-reduced-motion: no-preference`.

`public/theme-init.js` reads a saved `light` or `dark` value from local storage under `gwc-theme`, falling back to the system color preference. It sets the root `data-theme`, `color-scheme`, and browser `theme-color` before the main module renders. `src/theme.js` renders and manages the header control, follows system changes until a manual choice is made, and persists choices across both pages. Storage changes also synchronize open tabs. Theme behavior runs entirely in the browser; unavailable storage does not prevent the current page's toggle from working.

`src/footer.js` exports `footerMarkup()` for the shared contact scene and `initFooter()` for the interactive Shisa mascot. Its exported `shisaMessages` array contains thirteen custom English strings supplied by the user. Hover, focus, and button activation cycle through messages, with a brief guard against duplicate events from one gesture. The visual bubble is `aria-hidden`; a separate visually hidden `[data-shisa-announcement]` polite live region announces the same English text.

The bubble stays visible while the pointer is within the mascot/bubble greeting area or the button has keyboard focus. Pointer exit dismisses it after 200 milliseconds when keyboard focus is absent; blur dismisses it when the pointer is outside. A document-level Escape handler also closes it. The six-second dismissal timer applies to activations without persistent hover or keyboard focus, such as a tap. The footer retains the profile's contact links and email-copy control, alongside a back-to-top link to the shared header's `#top` anchor.

`src/footer.css` owns the `--footer-*` palette variables, illustration placement, and responsive layout. Olive backgrounds, cream line art, and terracotta accents match the rest of the site. Dark overrides reuse the shared theme values.

The footer's assets are the original station drawing at `public/images/footer/last-stop.svg` and the unmodified official sprite at `public/images/footer/shisa-official.png`. The `.shisa-art` CSS window displays the Shisa region of the sprite. Decorative artwork stays outside the accessibility tree, while the mascot remains accessible to keyboard and touch interaction. The shared footer styling loads after the general theme styles so its scene colors can adapt to either mode. [Artwork credits and custom message notes](ASSETS.md) are documented separately.

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
