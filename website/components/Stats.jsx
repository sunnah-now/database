'use client';

import { useLang } from '@/context/LangContext';
import { isSourceCode } from '@/lib/utils';

export default function Stats({ releases }) {
  const { t } = useLang();

  const books = new Set();
  for (const a of releases[0].assets ?? []) {
    if (isSourceCode(a.name)) continue;
    books.add(a.name.split('.')[0].toLowerCase());
  }

  let totalAssets = 0;
  for (const r of releases) {
    for (const a of r.assets ?? []) {
      if (isSourceCode(a.name)) continue;
      totalAssets++;
    }
  }

  const stats = [
    { value: releases.length, label: t.stat_releases },
    { value: books.size || '—', label: t.stat_books },
    { value: totalAssets || '—', label: t.stat_files },
  ];

  return (
    <div className="stats-row">
      {stats.map(({ value, label }) => (
        <div key={label} className="stat">
          <div className="stat-value">{value}</div>
          <div className="stat-label">{label}</div>
        </div>
      ))}
    </div>
  );
}
