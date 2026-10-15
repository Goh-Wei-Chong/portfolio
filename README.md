# Goh Wei Chong — Portfolio

A responsive personal portfolio and a separate photography gallery, built with Vite and vanilla JavaScript.
The site includes:

- A home page with an introduction, selected projects, experience, education, skills, and contact links.
- Project details that open without leaving the page.
- A photography page with twenty-five supplied photographs, category filters, and an image lightbox.
- A supplied profile portrait and designed placeholders for project images.
- Light and dark themes on both pages, with a header toggle and a saved preference.
- An illustrated “last stop” contact footer with official Shisa artwork and thirteen custom English messages.
- A portrait that gently sways beneath a fixed thumbtack on mouse hover, respecting reduced-motion preferences.
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
