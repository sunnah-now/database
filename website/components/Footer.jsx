'use client';

import { useLang } from '@/context/LangContext';

const FOOTER_LINKS = [
  { key: 'nav_home',   href: 'https://sunnah.now/' },
  { key: 'nav_docs',   href: 'https://docs.sunnah.now/' },
  { key: 'nav_api',    href: 'https://api.sunnah.now/' },
  { key: 'nav_github', href: 'https://github.com/sunnah-now/database' },
];

export default function Footer() {
  const { t } = useLang();
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-left">
          <span className="footer-copy">{t.footer_copy}</span>
          <span
            className="footer-feedback"
            dangerouslySetInnerHTML={{ __html: t.footer_feedback }}
          />
        </div>
        <div className="footer-links">
          {FOOTER_LINKS.map(({ key, href }) => (
            <a key={key} href={href} target="_blank" rel="noopener noreferrer">
              {t[key]}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
