'use client';

import { useLang } from '@/context/LangContext';

export default function Hero() {
  const { t } = useLang();
  return (
    <div className="hero">
      <h1>{t.hero_title}</h1>
      <p>{t.hero_sub}</p>
    </div>
  );
}
