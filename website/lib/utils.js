// lib/utils.js
export function fmtKeyOf(name) {
  const n = name.toLowerCase();
  if (n.includes('.sql.') || n.endsWith('.sql'))         return 'sql';
  if (n.includes('.json.') || n.endsWith('.json'))       return 'json';
  if (n.includes('.csv.') || n.endsWith('.csv'))         return 'csv';
  if (n.includes('.sqlite.') || n.endsWith('.sqlite') ||
      n.endsWith('.db') || n.endsWith('.sqlite3'))       return 'sqlite';
  if (n.endsWith('.zip') || n.endsWith('.gz') ||
      n.endsWith('.tar') || n.endsWith('.tgz'))          return 'zip';
  return 'other';
}

export function fmtLabel(name) {
  const n = name.toLowerCase();
  if (n.includes('.sql.'))    return 'SQL.GZ';
  if (n.includes('.json.'))   return 'JSON.GZ';
  if (n.includes('.csv.'))    return 'CSV.GZ';
  if (n.includes('.sqlite.')) return 'SQLite.GZ';
  return name.split('.').pop().toUpperCase();
}

export const FMT_CLASS = {
  sql:    'fmt-sql',
  json:   'fmt-json',
  csv:    'fmt-csv',
  sqlite: 'fmt-sqlite',
  zip:    'fmt-zip',
  other:  'fmt-other',
};

export function fmtClass(name) {
  return FMT_CLASS[fmtKeyOf(name)] ?? 'fmt-other';
}

export function humanSize(bytes) {
  if (!bytes) return '';
  if (bytes < 1024)    return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}

export function formatDate(str) {
  return new Date(str).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

export function guessBookName(filename) {
  return filename
    .split('.')[0]
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function groupAssets(assets) {
  const groups = {};
  for (const a of assets) {
    if (isSourceCode(a.name)) continue;
    const key = a.name.split('.')[0].replace(/-/g, '_').toLowerCase();
    if (!groups[key]) groups[key] = { label: guessBookName(a.name), files: [] };
    groups[key].files.push(a);
  }
  return groups;
}

export function isSourceCode(name) {
  return name.startsWith('Source code');
}

export const REPO = 'sunnah-now/database';
export const FORMATS = ['sql', 'json', 'csv', 'sqlite', 'zip'];
export const FORMAT_CLASSES = {
  sql: 'fmt-sql', json: 'fmt-json', csv: 'fmt-csv',
  sqlite: 'fmt-sqlite', zip: 'fmt-zip',
};