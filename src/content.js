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
  portrait: { src: null, alt: 'Portrait of Goh Wei Chong' },
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

// Intentional empty frames, not photographs attributed to Wei Chong.
// Add your own files, then update src, title, location, year, and alt.
export const photos = [
  { id: 'frame-01', title: 'An everyday pause', category: 'Street', location: '', year: '', src: null, alt: '', orientation: 'portrait' },
  { id: 'frame-02', title: 'Somewhere, slowly', category: 'Travel', location: '', year: '', src: null, alt: '', orientation: 'landscape' },
  { id: 'frame-03', title: 'Looking up', category: 'Street', location: '', year: '', src: null, alt: '', orientation: 'portrait' },
  { id: 'frame-04', title: 'Room to breathe', category: 'Nature', location: '', year: '', src: null, alt: '', orientation: 'landscape' },
  { id: 'frame-05', title: 'Between places', category: 'Travel', location: '', year: '', src: null, alt: '', orientation: 'portrait' },
  { id: 'frame-06', title: 'The quieter details', category: 'Nature', location: '', year: '', src: null, alt: '', orientation: 'landscape' },
];
