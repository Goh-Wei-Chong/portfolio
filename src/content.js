// This is the main editing file. See docs/EDITING.md for examples.
// Asset paths are relative to public/ and must not begin with a slash.
export const profile = {
  name: 'Goh Wei Chong',
  shortName: 'Wei Chong',
  role: 'Computer Science undergraduate',
  location: 'Singapore',
  email: '101.21.gohweichong@gmail.com',
  linkedin: 'https://www.linkedin.com/in/goh-wei-chong-9595ba1a7/',
  github: 'https://github.com/Goh-Wei-Chong',
  availability: 'Open to opportunities',
  intro: 'I’m Wei Chong, a Computer Science undergraduate at the National University of Singapore. I’m interested in turning complex problems into useful applications — and finding the stories hidden in data.',
  portrait: { src: 'images/portrait/wei-chong.webp', alt: 'Goh Wei Chong smiling in front of colourful blue and yellow sculptures' },
  // Add a redacted PDF to public/ and set e.g. 'resume.pdf'.
  resume: null,
};

export const projects = [
  {
    id: 'text-analytics', title: 'Making sense of the news', year: '2021',
    category: 'Data analytics', description: 'Exploring patterns in BBC news articles through association rule mining and predictive modelling.',
    tools: ['Python', 'Jupyter Notebook', 'Machine learning'], role: 'Academic project',
    details: ['Analysed a BBC news dataset using Jupyter Notebook.', 'Applied association rule mining to explore relationships in the data.', 'Worked with multiple predictive models as part of the analysis.'],
    image: null, imageAlt: 'Screenshot of the text analytics project', sourceUrl: 'https://github.com/Goh-Wei-Chong/BBC-Text-Analysis', liveUrl: null,
  },
  {
    id: 'judging-platform', title: 'A platform for fair play', year: '2021',
    category: 'Web development', description: 'A competition judging website, built as a group project with ASP.NET and SQL.',
    tools: ['ASP.NET', 'C#', 'SQL', 'JavaScript'], role: 'Group assignment',
    details: ['Built a competition judging platform as a final group assignment.', 'Developed the website using ASP.NET in Visual Studio 2019.', 'Used C#, SQL, JavaScript, CSS, and HTML.'],
    image: null, imageAlt: 'Screenshot of the competition judging platform', sourceUrl: 'https://github.com/Goh-Wei-Chong/Competitor-Judging-Platform', liveUrl: null,
  },
  {
    id: 'pokemon-website', title: 'A playful way to explore', year: '2020',
    category: 'Interactive web', description: 'A Pokémon-themed website bringing together search, public API data, and interactive games.',
    tools: ['HTML', 'CSS', 'JavaScript', 'Public APIs'], role: 'Pair assignment',
    details: ['Created a Pokémon-themed website as a final pair assignment.', 'Implemented search functionality and worked with public APIs.', 'Added interactive games with HTML, CSS, and JavaScript.'],
    image: null, imageAlt: 'Screenshot of the Pokémon website', sourceUrl: 'https://github.com/Goh-Wei-Chong/Goh-Wei-Chong.github.io-Pokemon-Website', liveUrl: null,
  },
];

export const experience = [
  { company: 'GovTech Singapore', role: 'Research & Development Intern', dates: 'Apr 2022 — Mar 2023',
    description: 'A year-long internship working with government technology projects, from application development to the research and documentation behind them.',
    highlights: ['Log management and live application monitoring', 'Application development and troubleshooting', 'Research, documentation, and team collaboration'] },
  { company: 'ICT Overflow, Ngee Ann Polytechnic', role: 'Technology Lead', dates: '2020 — 2023',
    description: 'Sharing an interest in technology through teaching, programming, and student-led activities.',
    highlights: ['Planned and delivered weekly Python module sessions', 'Helped teach API concepts after a full-stack bootcamp', 'Represented the club at CCA Fiesta'] },
];

export const education = [
  { school: 'National University of Singapore', qualification: 'BSc, Computer Science', dates: '2025 — 2028 (expected)', note: 'An ongoing journey in computer science.' },
  { school: 'University of Oxford', qualification: 'Summer Programme', dates: 'Jun — Aug 2026', note: 'Quantum Computing and Mathematical Modelling' },
  { school: 'Ngee Ann Polytechnic', qualification: 'Diploma in Information Technology', dates: '2020 — 2023', note: 'Graduated with Merit · Director’s List, 2021' },
];

export const skills = [
  { label: 'Development', items: ['Python', 'SQL', 'C#', 'HTML / CSS', 'JavaScript', 'VBA'] },
  { label: 'Data & tools', items: ['Machine learning', 'Data visualisation', 'Tableau', 'Jupyter Notebook', 'Excel', 'GitHub'] },
  { label: 'Beyond the code', items: ['Teaching & mentoring', 'Research & documentation', 'Photoshop', 'Illustrator', 'Photography'] },
];

// Curated by colour and scale: portraits, city scenes, and quieter details.
// The landscape frame provides a visual pause; the soft city lights close the sequence.
// src is the large lightbox image; thumbnail is the optional 900px export.
// Locations and dates are left blank until confirmed by the photographer.
export const photos = [
  {
    "id": "between-floors",
    "title": "Between floors",
    "category": "Portraits",
    "location": "",
    "year": "",
    "src": "images/photography/dscf0287.webp",
    "thumbnail": "images/photography/dscf0287-900.webp",
    "width": 1467,
    "height": 2200,
    "alt": "A woman standing in a pale blue lift, framed by warm amber mosaic tiles.",
    "orientation": "portrait"
  },
  {
    "id": "city-at-rest",
    "title": "City at rest",
    "category": "Street",
    "location": "",
    "year": "",
    "src": "images/photography/dscf0213.webp",
    "thumbnail": "images/photography/dscf0213-900.webp",
    "width": 1467,
    "height": 2200,
    "alt": "An amber-lit pedestrian avenue between tall buildings, with a red bridge overhead.",
    "orientation": "portrait"
  },
  {
    "id": "the-green-hour",
    "title": "The green hour",
    "category": "Portraits",
    "location": "",
    "year": "",
    "src": "images/photography/dscf0158.webp",
    "thumbnail": "images/photography/dscf0158-900.webp",
    "width": 1467,
    "height": 2200,
    "alt": "A woman on a staircase beside a tall textured window glowing green.",
    "orientation": "portrait"
  },
  {
    "id": "the-way-down",
    "title": "The way down",
    "category": "Street",
    "location": "",
    "year": "",
    "src": "images/photography/dscf0224.webp",
    "thumbnail": "images/photography/dscf0224-900.webp",
    "width": 1467,
    "height": 2200,
    "alt": "A seated man in a patterned shirt overlooking a brightly lit stairway and street at night.",
    "orientation": "portrait"
  },
  {
    "id": "electric-blue",
    "title": "Electric blue",
    "category": "Interiors",
    "location": "",
    "year": "",
    "src": "images/photography/dscf0312.webp",
    "thumbnail": "images/photography/dscf0312-900.webp",
    "width": 1467,
    "height": 2200,
    "alt": "A visitor looking at illuminated film posters in a dark, blue-lit interior.",
    "orientation": "portrait"
  },
  {
    "id": "passing-through",
    "title": "Passing through",
    "category": "Street",
    "location": "",
    "year": "",
    "src": "images/photography/dscf0221.webp",
    "thumbnail": "images/photography/dscf0221-900.webp",
    "width": 1467,
    "height": 2200,
    "alt": "A green bus and a silver car in motion beneath warm lights at night.",
    "orientation": "portrait"
  },
  {
    "id": "in-the-grooves",
    "title": "In the grooves",
    "category": "Details",
    "location": "",
    "year": "",
    "src": "images/photography/dscf0302.webp",
    "thumbnail": "images/photography/dscf0302-900.webp",
    "width": 1467,
    "height": 2200,
    "alt": "Rows of records beneath a wall of colourful album sleeves and framed magazine covers.",
    "orientation": "portrait"
  },
  {
    "id": "on-repeat",
    "title": "On repeat",
    "category": "Portraits",
    "location": "",
    "year": "",
    "src": "images/photography/dscf0320.webp",
    "thumbnail": "images/photography/dscf0320-900.webp",
    "width": 1467,
    "height": 2200,
    "alt": "A woman adjusting headphones in front of a tiled wall and listening stations.",
    "orientation": "portrait"
  },
  {
    "id": "stories-in-colour",
    "title": "Stories in colour",
    "category": "Details",
    "location": "",
    "year": "",
    "src": "images/photography/dscf0307.webp",
    "thumbnail": "images/photography/dscf0307-900.webp",
    "width": 1467,
    "height": 2200,
    "alt": "Illuminated Singapore film posters glowing red, gold, and blue against a dark wall.",
    "orientation": "portrait"
  },
  {
    "id": "below-the-walkway",
    "title": "Below the walkway",
    "category": "Street",
    "location": "",
    "year": "",
    "src": "images/photography/dscf0205.webp",
    "thumbnail": "images/photography/dscf0205-900.webp",
    "width": 2200,
    "height": 1467,
    "alt": "An elevated view of small figures walking along an amber-lit path beneath a dark overhead structure.",
    "orientation": "landscape"
  },
  {
    "id": "from-above",
    "title": "From above",
    "category": "Portraits",
    "location": "",
    "year": "",
    "src": "images/photography/dscf0250.webp",
    "thumbnail": "images/photography/dscf0250-900.webp",
    "width": 1467,
    "height": 2200,
    "alt": "A woman walking beside an illuminated shopfront, photographed from an upper level.",
    "orientation": "portrait"
  },
  {
    "id": "windows-awake",
    "title": "Windows awake",
    "category": "Street",
    "location": "",
    "year": "",
    "src": "images/photography/dscf0239.webp",
    "thumbnail": "images/photography/dscf0239-900.webp",
    "width": 1467,
    "height": 2200,
    "alt": "Small illuminated windows in a dark apartment block above a red and white Chinatown sign.",
    "orientation": "portrait"
  },
  {
    "id": "familiar-glow",
    "title": "Familiar glow",
    "category": "Portraits",
    "location": "",
    "year": "",
    "src": "images/photography/dscf0255.webp",
    "thumbnail": "images/photography/dscf0255-900.webp",
    "width": 1467,
    "height": 2200,
    "alt": "A woman standing outside a brightly lit 7-Eleven storefront with red and green signs.",
    "orientation": "portrait"
  },
  {
    "id": "pages-of-home",
    "title": "Pages of home",
    "category": "Details",
    "location": "",
    "year": "",
    "src": "images/photography/dscf0290.webp",
    "thumbnail": "images/photography/dscf0290-900.webp",
    "width": 1467,
    "height": 2200,
    "alt": "Vintage Our Home magazine covers displayed behind glass in soft amber light.",
    "orientation": "portrait"
  },
  {
    "id": "through-the-glass",
    "title": "Through the glass",
    "category": "Interiors",
    "location": "",
    "year": "",
    "src": "images/photography/dscf0306.webp",
    "thumbnail": "images/photography/dscf0306-900.webp",
    "width": 1467,
    "height": 2200,
    "alt": "A blurred foreground reflection partially obscuring a warm-lit shop display and FairPrice sign.",
    "orientation": "portrait"
  },
  {
    "id": "lines-of-light",
    "title": "Lines of light",
    "category": "Street",
    "location": "",
    "year": "",
    "src": "images/photography/dscf0211.webp",
    "thumbnail": "images/photography/dscf0211-900.webp",
    "width": 1467,
    "height": 2200,
    "alt": "Illuminated buildings framing a pedestrian avenue beneath an overhead roof at night.",
    "orientation": "portrait"
  },
  {
    "id": "a-quieter-turn",
    "title": "A quieter turn",
    "category": "Portraits",
    "location": "",
    "year": "",
    "src": "images/photography/dscf0156.webp",
    "thumbnail": "images/photography/dscf0156-900.webp",
    "width": 1467,
    "height": 2200,
    "alt": "A woman looking back from a staircase with cream railings and green-lit windows.",
    "orientation": "portrait"
  },
  {
    "id": "a-glimpse",
    "title": "A glimpse",
    "category": "Portraits",
    "location": "",
    "year": "",
    "src": "images/photography/dscf0254.webp",
    "thumbnail": "images/photography/dscf0254-900.webp",
    "width": 1467,
    "height": 2200,
    "alt": "A woman holding a phone, seen through a narrow gap with a glowing shop sign above.",
    "orientation": "portrait"
  },
  {
    "id": "city-in-motion",
    "title": "City in motion",
    "category": "Street",
    "location": "",
    "year": "",
    "src": "images/photography/dscf0222.webp",
    "thumbnail": "images/photography/dscf0222-900.webp",
    "width": 1467,
    "height": 2200,
    "alt": "Blurred silhouettes moving past glowing signs, with light trails across a night scene.",
    "orientation": "portrait"
  },
  {
    "id": "distant-lights",
    "title": "Distant lights",
    "category": "Street",
    "location": "",
    "year": "",
    "src": "images/photography/dscf0198.webp",
    "thumbnail": "images/photography/dscf0198-900.webp",
    "width": 1467,
    "height": 2200,
    "alt": "Soft red, white, and amber traffic lights glowing out of focus against a dark city.",
    "orientation": "portrait"
  }
];
