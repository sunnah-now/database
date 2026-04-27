'use client';

import { useLang } from '@/context/LangContext';

const ExternalIcon = () => (
  <svg width={10} height={10} viewBox="0 0 10 10" fill="none"
    style={{ opacity: 0.45, verticalAlign: 'middle', marginLeft: 2 }}>
    <path d="M1.5 1.5h7v7M8.5 1.5 1 9"
      stroke="currentColor" strokeWidth={1.4}
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const NAV_LINKS = [
  { key: 'nav_home',   href: 'https://sunnah.now/' },
  { key: 'nav_docs',   href: 'https://docs.sunnah.now/' },
  { key: 'nav_api',    href: 'https://api.sunnah.now/' },
  { key: 'nav_github', href: 'https://github.com/sunnah-now/database' },
];

export default function Nav() {
  const { lang, setLang, t } = useLang();

  return (
    <nav>
      <a href="https://db.sunnah.now/" className="nav-logo">
        <span className="dot" />
        <span className="subdomain">db.</span>sunnah.now
      </a>
      <div className="nav-right">
        <ul className="nav-links">
          {NAV_LINKS.map(({ key, href }) => (
            <li key={key}>
              <a href={href} target="_blank" rel="noopener noreferrer">
                {t[key]}<ExternalIcon />
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-divider" />
        <div className="lang-toggle">
          {['en', 'ar'].map((l) => (
            <button
              key={l}
              className={`lang-btn${lang === l ? ' active' : ''}`}
              onClick={() => setLang(l)}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
