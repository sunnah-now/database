'use client';

import { useLang } from '@/context/LangContext';
import { fmtKeyOf, fmtClass, fmtLabel, humanSize } from '@/lib/utils';

export default function AssetRow({ asset, activeFilters }) {
  const { t } = useLang();
  const fmtKey = fmtKeyOf(asset.name);
  const hidden  = activeFilters.size > 0 && !activeFilters.has(fmtKey);

  if (hidden) return null;

  return (
    <div className="asset-row">
      <div className="asset-info">
        <div className="asset-name">{asset.name}</div>
        {humanSize(asset.size) && (
          <div className="asset-detail">{humanSize(asset.size)}</div>
        )}
      </div>
      <span className={`asset-format ${fmtClass(asset.name)}`}>
        {fmtLabel(asset.name)}
      </span>
      <a className="dl-btn" href={asset.browser_download_url} download>
        <svg width={12} height={12} viewBox="0 0 12 12" fill="none">
          <path d="M6 1v7M3 6l3 3 3-3M1 11h10"
            stroke="currentColor" strokeWidth={1.5}
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>{t.dl_btn}</span>
      </a>
    </div>
  );
}
