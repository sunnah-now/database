'use client';

import { useState, useEffect } from 'react';
import { useLang } from '@/context/LangContext';
import { REPO, FORMATS, FORMAT_CLASSES } from '@/lib/utils';
import Stats from './Stats';
import ReleaseCard from './ReleaseCard';

const GithubIcon = () => (
  <svg width={14} height={14} viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

const ExternalArrow = () => (
  <svg width={10} height={10} viewBox="0 0 10 10" fill="none"
    style={{ opacity: 0.45, verticalAlign: 'middle', marginLeft: 2 }}>
    <path d="M1.5 1.5h7v7M8.5 1.5 1 9"
      stroke="currentColor" strokeWidth={1.4}
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ReleasesSection() {
  const { t } = useLang();
  const [releases, setReleases]           = useState([]);
  const [loading, setLoading]             = useState(true);
  const [activeFilters, setActiveFilters] = useState(new Set());

  useEffect(() => {
    fetch(`https://api.github.com/repos/${REPO}/releases`, {
      headers: { Accept: 'application/vnd.github.v3+json' },
    })
      .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then((data) => setReleases(data))
      .finally(() => setLoading(false));
  }, []);

  const toggleFilter = (fmt) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      next.has(fmt) ? next.delete(fmt) : next.add(fmt);
      return next;
    });
  };

  return (
    <div className="container">
      {!loading && releases.length > 0 && (
        <Stats releases={releases} />
      )}

      <div className="section-header">
        <div className="section-title">
          <span>{t.all_releases}</span>
          <span className="count">{loading ? '…' : releases.length}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          {/* Format filters */}
          {/*<div className="filters-bar">*/}
          {/*  <span className="filter-label">{t.filter_label}</span>*/}
          {/*  {FORMATS.map((fmt) => (*/}
          {/*    <button*/}
          {/*      key={fmt}*/}
          {/*      className={[*/}
          {/*        'filter-chip',*/}
          {/*        FORMAT_CLASSES[fmt] ?? '',*/}
          {/*        activeFilters.has(fmt) ? 'active' : '',*/}
          {/*      ].join(' ')}*/}
          {/*      onClick={() => toggleFilter(fmt)}*/}
          {/*    >*/}
          {/*      {fmt.toUpperCase()}*/}
          {/*    </button>*/}
          {/*  ))}*/}
          {/*</div>*/}
          {/* GitHub link */}
          <a
            className="github-link"
            href={`https://github.com/${REPO}/releases`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
            <span>{t.view_github}</span>
            <ExternalArrow />
          </a>
        </div>
      </div>

      {loading && (
        <div className="state-box">
          <div className="spinner" />
          <div>{t.loading}</div>
        </div>
      )}

      {!loading && releases.map((release, i) => (
        <ReleaseCard
          key={release.tag_name}
          release={release}
          isFirst={i === 0}
          activeFilters={activeFilters}
        />
      ))}
    </div>
  );
}
