import { stat, realpath } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const publicRoot = await realpath(path.join(root, 'public'));
const errors = [];
const assetChecks = [];

function fail(label, message) {
  errors.push(`${label}: ${message}`);
}

function object(value, label) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    fail(label, 'must be an object.');
    return false;
  }
  return true;
}

function string(value, label, { empty = false } = {}) {
  if (typeof value !== 'string' || (!empty && !value.trim())) {
    fail(label, `must be ${empty ? 'a string' : 'a non-empty string'}.`);
    return false;
  }
  return true;
}

function strings(value, label) {
  if (!Array.isArray(value)) {
    fail(label, 'must be an array of strings.');
    return;
  }
  value.forEach((item, index) => string(item, `${label}[${index}]`));
}

function fields(value, label, names) {
  names.forEach((name) => string(value[name], `${label}.${name}`));
}

function url(value, label, optional = false) {
  if (optional && value === null) return;
  if (!string(value, label)) return;
  try {
    const parsed = new URL(value);
    if (!/^https?:\/\//i.test(value) || !['http:', 'https:'].includes(parsed.protocol) || !parsed.hostname ||
        parsed.username || parsed.password || /[\\\s]/.test(value) || value !== value.trim()) {
      throw new Error('invalid URL');
    }
  } catch {
    fail(label, `must be a complete http:// or https:// URL without credentials${optional ? ', or null' : ''}.`);
  }
}

function asset(value, label) {
  if (value === null) return;
  if (!string(value, label)) return;
  // Keep URL syntax out of file paths. Checking realpath below also rejects
  // symlinks that point outside public/, even when their written path is safe.
  const segments = value.split('/');
  if (path.isAbsolute(value) || /^[a-z][a-z\d+.-]*:/i.test(value) ||
      /[\\?#%<>"'\x00-\x1f\x7f]/.test(value) ||
      value.startsWith('public/') || segments.some((part) => !part || part === '.' || part === '..')) {
    fail(label, 'must be a relative path inside public/ (for example images/photo.webp), without public/, a leading slash, URL syntax, or traversal. Use null for an unset asset.');
    return;
  }
  assetChecks.push((async () => {
    try {
      const resolved = await realpath(path.join(publicRoot, value));
      const relative = path.relative(publicRoot, resolved);
      if (!relative || relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
        fail(label, 'must resolve to a file inside public/.');
      } else if (!(await stat(resolved)).isFile()) {
        fail(label, 'must point to a file, not a directory.');
      }
    } catch {
      fail(label, `file not found under public/: ${value}`);
    }
  })());
}

function image(source, alt, label, altLabel) {
  asset(source, label);
  string(alt, altLabel, { empty: source === null });
}

function collection(value, label, inspect, { ids = false } = {}) {
  if (!Array.isArray(value)) {
    fail(label, 'must be an array.');
    return;
  }
  const seen = new Set();
  value.forEach((item, index) => {
    const entry = `${label}[${index}]`;
    if (!object(item, entry)) return;
    if (ids && string(item.id, `${entry}.id`)) {
      if (item.id !== item.id.trim()) fail(`${entry}.id`, 'must not have leading or trailing spaces.');
      if (seen.has(item.id)) fail(`${entry}.id`, `duplicate ID "${item.id}" in ${label}.`);
      seen.add(item.id);
    }
    inspect(item, entry);
  });
}

let content;
try {
  content = await import(new URL('../src/content.js', import.meta.url));
} catch (error) {
  console.error(`Content check failed: could not load src/content.js.\n${error.message}`);
  process.exit(1);
}

const { profile, projects, experience, education, skills, photos } = content;

if (object(profile, 'profile')) {
  fields(profile, 'profile', ['name', 'shortName', 'role', 'location', 'email', 'availability', 'intro']);
  if (typeof profile.email === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
    fail('profile.email', 'must be a valid email address.');
  }
  url(profile.linkedin, 'profile.linkedin');
  url(profile.github, 'profile.github');
  if (object(profile.portrait, 'profile.portrait')) {
    image(profile.portrait.src, profile.portrait.alt, 'profile.portrait.src', 'profile.portrait.alt');
  }
  asset(profile.resume, 'profile.resume');
}

collection(projects, 'projects', (project, label) => {
  fields(project, label, ['title', 'year', 'category', 'description', 'role']);
  strings(project.tools, `${label}.tools`);
  strings(project.details, `${label}.details`);
  image(project.image, project.imageAlt, `${label}.image`, `${label}.imageAlt`);
  url(project.sourceUrl, `${label}.sourceUrl`, true);
  url(project.liveUrl, `${label}.liveUrl`, true);
}, { ids: true });

collection(experience, 'experience', (entry, label) => {
  fields(entry, label, ['company', 'role', 'dates', 'description']);
  strings(entry.highlights, `${label}.highlights`);
});

collection(education, 'education', (entry, label) => {
  fields(entry, label, ['school', 'qualification', 'dates', 'note']);
});

collection(skills, 'skills', (entry, label) => {
  fields(entry, label, ['label']);
  strings(entry.items, `${label}.items`);
});

collection(photos, 'photos', (photo, label) => {
  fields(photo, label, ['title', 'category']);
  string(photo.location, `${label}.location`, { empty: true });
  string(photo.year, `${label}.year`, { empty: true });
  image(photo.src, photo.alt, `${label}.src`, `${label}.alt`);
  if (photo.thumbnail !== undefined) {
    asset(photo.thumbnail, `${label}.thumbnail`);
    if (photo.thumbnail && !photo.src) fail(`${label}.thumbnail`, 'requires a full image in src.');
  }
  for (const dimension of ['width', 'height']) {
    if (photo[dimension] !== undefined && (!Number.isInteger(photo[dimension]) || photo[dimension] <= 0)) {
      fail(`${label}.${dimension}`, 'must be a positive integer when supplied.');
    }
  }
  if ((photo.width === undefined) !== (photo.height === undefined)) {
    fail(label, 'supply both width and height, or omit both.');
  }
  if (!['portrait', 'landscape'].includes(photo.orientation)) {
    fail(`${label}.orientation`, 'must be "portrait" or "landscape".');
  }
  if (photo.category === 'All') {
    fail(`${label}.category`, '"All" is reserved for the gallery filter; choose a photograph category.');
  }
}, { ids: true });

await Promise.all(assetChecks);

if (errors.length) {
  console.error(`Content check failed (${errors.length} ${errors.length === 1 ? 'issue' : 'issues'}):\n${errors.map((error) => `  - ${error}`).join('\n')}`);
  process.exitCode = 1;
} else {
  console.log(`Content check passed: ${projects.length} projects, ${photos.length} photography frames, and all configured public assets verified.`);
}
