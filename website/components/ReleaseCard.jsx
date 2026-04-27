'use client';

import { useState } from 'react';
import { useLang } from '@/context/LangContext';
import { groupAssets, isSourceCode, formatDate } from '@/lib/utils';
import AssetRow from './AssetRow';

const ChevronIcon = () => (
  <svg width={12} height={12} viewBox="0 0 12 12" fill="none">
    <path d="M2 4l4 4 4-4"
      stroke="currentColor" strokeWidth={1.5}
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ReleaseCard({ release, isFirst, activeFilters }) {
  const { t } = useLang();
  const [open, setOpen] = useState(isFirst);

  const assets  = (release.assets ?? []).filter((a) => !isSourceCode(a.name));
  const groups  = groupAssets(release.assets ?? []);
  const summary = release.body
    ? release.body.split('\n')[0].replace(/[#*`]/g, '').trim()
    : null;

  return (
    <div className={`release-card${open ? ' open' : ''}`}>

      {/* Header */}
      <div className="release-header" onClick={() => setOpen((o) => !o)}>
        <div className="release-meta">
          <div className="release-top">
            <span className="release-tag">{release.tag_name}</span>
            {isFirst && <span className="release-tag latest">{t.latest_label}</span>}
            <span className="release-date">{formatDate(release.published_at)}</span>
          </div>
          <div className="release-name">{release.name ?? release.tag_name}</div>
          {summary && <div className="release-body">{summary}</div>}
        </div>
        <div className="release-toggle">
          <ChevronIcon />
        </div>
      </div>

      {/* Body */}
      {open && (
        <div className="book-grid">
          {assets.length === 0 ? (
            <div className="no-assets-msg">{t.no_assets}</div>
          ) : (
            Object.entries(groups).map(([key, group]) => (
              <div key={key}>
                <div className="book-section">{group.label}</div>
                {group.files
                  .filter((a) => !isSourceCode(a.name))
                  .map((asset) => (
                    <AssetRow
                      key={asset.id ?? asset.name}
                      asset={asset}
                      activeFilters={activeFilters}
                    />
                  ))}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
