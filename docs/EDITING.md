# Editing your portfolio

Most changes belong in `src/content.js`. You do not need to change the rendering code to replace your portrait, edit your biography, add a project, or add photographs.

## Start an editing session

```bash
npm install
npm run dev
```

Open the URL printed in the terminal. Keep the development server running, edit a file, and save it to see the result. Work through one section at a time so that mistakes are easy to identify.

After your edits:

```bash
npm run check
npm run build
npm run preview
```

The content check catches structural or referenced-file problems; the build checks that the production bundle can be created. Also inspect the pages in your browser. Automated checks cannot judge whether a crop looks good, a biography is accurate, or a photograph has appropriate alternative text.

## How the content file works

`src/content.js` is a JavaScript module. Keep the existing export names and object keys. Values in quotes are text, square brackets contain lists, and curly braces group related fields.

- Keep commas between fields and list items.
- Use `null` without quotes to leave an optional image or link empty.
- Use straight single or double quotes for JavaScript strings.
- If a sentence contains an apostrophe inside single quotes, use double quotes around the sentence or escape the apostrophe.
- Use a unique, stable `id` for each project and photograph. For example, `campus-at-dusk`.
- Keep links complete, such as `https://github.com/your-account/your-project`.

A missing image is supported: the site displays its designed placeholder. An empty string is less explicit than `null`, so use `null` for an asset you have not supplied.

## Edit your profile

Find `profile` in `src/content.js`. Edit the existing fields:

| Field | Purpose |
| --- | --- |
| `name` | Full name stored with the profile |
| `shortName` | Short name stored with the profile |
| `role` | Your professional headline |
| `location` | Public location, such as a city or country |
| `email` | Address visitors can use to contact you |
| `linkedin` | Complete LinkedIn profile URL |
| `github` | Complete GitHub profile URL |
| `availability` | Your current availability message |
| `intro` | Introductory copy shown on the home page |
| `portrait.src` | Local image path, or `null` to keep the placeholder |
| `portrait.alt` | Description of the portrait |
| `resume` | Public resume file path, or `null` to hide the download link |

The oversized hero name, `GWC` brand, footer signature, and some editorial copy are authored directly in `src/main.js` to preserve their specific layout. If you change your displayed name or those sentences, update the matching strings there as well as the profile fields and HTML metadata.

For example, replace only the portrait fields inside the existing profile:

```js
portrait: {
  src: 'images/portrait/wei-chong.webp',
  alt: 'Goh Wei Chong standing outdoors',
},
```

Keep residential addresses, referee contact details, and any telephone number you do not want public out of the site content. Every file under `public/` and all client-side content can be downloaded by visitors.

## Add or replace images

1. Prepare an image you own or have permission to publish.
2. Give it a readable filename using lowercase letters and hyphens.
3. Copy it into the matching directory under `public/images/`.
4. Set the relevant `src` or `image` field in `src/content.js`.
5. Add useful alternative text and inspect the crop in the browser.

Use paths beginning with `images/`, without a leading slash and without `public/`:

```js
// Correct: file is public/images/photography/city-evening.webp
src: 'images/photography/city-evening.webp',
```

The site prepends the configured deployment base path. This allows the same source to work locally and under GitHub Pages' `/portfolio/` directory.

### Suggested image sizes

These are preparation guidelines, not exact required dimensions.

| Image | Suggested export | Notes |
| --- | --- | --- |
| Portrait | 1200 × 1500 px | Leave some space around your face for responsive cropping. |
| Project cover | 1600 × 1100 px | Put essential information away from the edges. |
| Landscape photo | Around 2000 px on the long edge | Preserve the photo's original aspect ratio. |
| Portrait photo | Around 2000 px on the long edge | Mark its orientation as `portrait`. |

Use WebP or a well-compressed JPEG for photographs. PNG is useful for screenshots that need crisp text or transparency. Aim for a few hundred kilobytes per normal gallery image where the quality permits it. Avoid uploading full-resolution camera originals with several megabytes of data.

Image files can contain location and camera metadata. Review the metadata before publishing if that information is private.

## Edit or add a project

Find the `projects` array. Edit an existing object, or copy an existing object and change its fields. The list order determines the display order.

```js
{
  id: 'your-project',
  title: 'Your project title',
  year: '2026',
  category: 'Your project category',
  description: 'A short explanation of the problem and what you built.',
  tools: ['Tool one', 'Tool two'],
  role: 'Your contribution to the project',
  details: [
    'Describe the problem or setting.',
    'Explain the approach and your own contribution.',
    'Add a confirmed result, or explain what you learned.',
  ],
  image: null,
  imageAlt: 'Description of the project cover',
  sourceUrl: null,
  liveUrl: null,
},
```

To supply a cover, add the file under `public/images/projects/` and change `image` to a path such as `images/projects/your-project.webp`.

`sourceUrl` is for a source repository or other relevant project source. `liveUrl` is for a running demo or published result. Leave a missing link as `null`; do not use `#` as a placeholder. Confirm that any linked repository or document is intended to be public.

Keep factual project outcomes tied to your records. Do not add numerical improvements or responsibilities unless you can support them.

## Update experience, education, and skills

These sections also live in `src/content.js`. Keep the newest experience or qualification first if you want a reverse chronological presentation.

An experience entry has a company, role, date label, description, and a list of highlights:

```js
{
  company: 'Organisation name',
  role: 'Your role',
  dates: 'Jan 2026 — Present',
  description: 'A short description of the role.',
  highlights: ['A responsibility or contribution', 'Another confirmed contribution'],
},
```

An education entry uses these fields:

```js
{
  school: 'Institution name',
  qualification: 'Qualification or programme',
  dates: '2025 — 2028 (expected)',
  note: 'Relevant subjects, awards, or other confirmed details',
},
```

Skills are grouped by a label and a list of individual items:

```js
{
  label: 'Development',
  items: ['Python', 'JavaScript', 'SQL'],
},
```

Use clear date labels and keep titles, organizations, qualification names, and descriptions consistent with your current resume. The skills list should reflect tools you are comfortable discussing, rather than every tool associated with a project.

If you remove an entire section's content, preview the page to confirm that its heading and spacing still make sense.

## Add photographs

Place your image files in `public/images/photography/`, then edit the `photos` array.

The starter gallery contains six empty frames. You can fill as many as you want and delete the unused objects; there is no requirement to publish all six. The displayed frame count includes empty slots as well as supplied photographs. The home page previews the first three entries, or fewer if your list is shorter.

Replace the placeholder objects or copy one for every additional image:

```js
{
  id: 'city-evening',
  title: 'City at evening',
  category: 'Street',
  location: 'Singapore',
  year: '2026',
  src: 'images/photography/city-evening.webp',
  alt: 'A person crossing a street beneath illuminated signs at dusk',
  orientation: 'landscape',
},
```

- `id` must be unique.
- `title` is the photograph's displayed name.
- `category` controls category grouping. Reuse the same spelling and capitalization for photographs in the same category.
- `location` can be a city, country, broader region, or a label you are comfortable making public.
- `year` describes when the photograph was made.
- `src` is the image path; `null` retains the designed placeholder.
- `alt` describes the visible subject, rather than repeating only the title.
- `orientation` is either `landscape` or `portrait` and helps the gallery layout.

The page builds its category filters from the photograph data, so new categories do not need separate buttons in the HTML. The order of entries in `photos` determines their order in the gallery.

Open a real photograph to check its larger lightbox view, caption, next/previous navigation, and close control. Check both portrait and landscape images.

The lightbox follows the currently selected category. Use its arrow buttons or the left/right arrow keys to move between frames; use the close button or `Escape` to return to the gallery. An empty frame opens an explanation that it is ready for your photograph.

## Add a public resume

The original supplied resume contains private information and is not included in the public website. The initial value of `profile.resume` is `null`.

1. Make a separate public copy of your resume.
2. Remove residential address details, personal telephone details you do not want published, and referee names/contact information that should remain private.
3. Review the exported PDF, including document metadata, and confirm that the text was removed rather than covered visually.
4. Save the public file as `public/resume.pdf`.
5. Change the existing field in `profile`:

```js
resume: 'resume.pdf',
```

6. Run the content check, then open the download link in the local preview.

The public PDF will be accessible to anyone who knows its URL. To disable the download again, set `resume` back to `null` and remove the PDF from `public/` before rebuilding.

## Change colors, type, and layout

Edit `src/styles.css` for the visual design. Start with the shared custom properties near the beginning of the file; these control recurring colors and visual values. Then inspect the relevant component rules for card spacing, image framing, or typography.

Keep changes small and preview both pages after each visual change. A style used for one card may also be used elsewhere. Retain visible keyboard focus indicators and readable foreground/background contrast.

The page shells and browser metadata are in `index.html` and `photography/index.html`. Update their document titles and description metadata when you change your public headline. If you add a social sharing image, use a real public image and the final public URL in the appropriate metadata.

## Change site behavior

`src/main.js` renders the pages from the data and manages interactions, including navigation, project details, gallery filters, and the lightbox. Change this file only when you need new behavior or a new content structure.

If you rename content keys or introduce required fields, update both the rendering code and `scripts/check-content.mjs`. Keep the HTML entry points and Vite build configuration in sync if you add a page.

## Deployment and base paths

The local development default is `/`. The GitHub Actions workflow builds with `BASE_PATH=/portfolio/` because GitHub Pages project sites are served below their repository name.

| Deployment | Base path |
| --- | --- |
| Local development | `/` |
| `https://goh-wei-chong.github.io/portfolio/` | `/portfolio/` |
| Project repository renamed to `my-site` | `/my-site/` |
| Custom domain such as `https://example.com/` | `/` |
| Root user repository `goh-wei-chong.github.io` | `/` |

For a manual production build on macOS or Linux:

```bash
BASE_PATH=/portfolio/ npm run build
npm run preview
```

For PowerShell:

```powershell
$env:BASE_PATH = "/portfolio/"
npm run build
npm run preview
```

Visit the preview URL with the configured path appended. The environment variable is read when the build runs; changing it after the build does not rewrite `dist/`.

For GitHub Pages:

1. In the GitHub repository, set **Settings → Pages → Source** to **GitHub Actions**.
2. Push your changes to `main`, or run the deployment workflow manually from **Actions**.
3. Wait for both the build and deployment jobs to succeed.
4. Open the deployment's environment URL and test both the home page and `/photography/` page.

Saving files on your computer does not update the published site. After reviewing and checking an edit, commit and push it. For a content-and-image update on `main`:

```bash
git status
git diff
git add src/content.js public/images
git diff --cached --stat
git commit -m "Update portfolio content and photographs"
git push origin main
```

Include any other deliberately changed files in `git add`, such as `src/styles.css`, the HTML metadata, or `public/resume.pdf`. Check the staged file list before committing so you publish only the files you intended. The push triggers the workflow when the repository is configured with the included `main` branch trigger.

To use a custom domain, configure it under **Settings → Pages**, configure the domain's DNS as GitHub instructs, and change the workflow's `BASE_PATH` to `/`. If you use a `CNAME` file, put it in `public/CNAME` so Vite includes it in the build. The file should contain only your domain name, without `https://` or a path.

To host elsewhere, upload the contents of `dist/` to a static host. Preserve the `photography/` directory and choose a base path that matches the hosted address. This project does not require a server runtime or a database after it is built.

## Before publishing an update

- Review copy, dates, and contact links for accuracy.
- Check image crops and alternative text.
- Confirm that no private resume or full-resolution originals were added to `public/` by accident.
- Run `npm run check` and `npm run build`.
- Preview the production build and open both pages directly.
- Test project details, photo filters, the lightbox, and navigation with the keyboard.
- Check phone and desktop widths.
- After deployment, verify the actual public URL and image paths.

## Troubleshooting

| Problem | What to check |
| --- | --- |
| `npm` is not found | Install Node.js LTS, reopen the terminal, and try again. |
| The page becomes blank after an edit | Inspect the terminal and browser console; a missing comma or quote in `content.js` can prevent the module from loading. |
| An image remains a placeholder | Confirm its field is no longer `null` and that the file exists under `public/`. |
| An image works locally but fails online | Check exact filename capitalization and the deployment base path; do not start content asset paths with `/`. |
| A new category appears twice | Make category spelling and capitalization identical. |
| A project or photo opens the wrong details | Check for duplicate `id` values. |
| The resume button is absent | Supply a redacted PDF and set `profile.resume` to its public path. |
| GitHub has the files but the site is unavailable | Enable Pages with GitHub Actions and inspect the latest deployment run. |
| A deployed page has old content | Confirm the latest workflow succeeded, then reload the public page. |
| The gallery URL returns 404 on another host | Ensure the host serves directory `index.html` files and that `dist/photography/index.html` was uploaded. |

For dependency changes, inspect the package's release notes and test the production build. Commit `package-lock.json` alongside `package.json` so the automated deployment uses the same dependency versions.
