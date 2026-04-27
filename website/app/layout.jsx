import { LangProvider } from '@/context/LangContext';
import './globals.css';

export const metadata = {
  title: 'db.sunnah.now · Hadith Database Downloads',
  description: 'Scholarly-curated, structured hadith data — available in SQL, JSON, CSV and SQLite formats.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Lora:ital,wght@0,400;0,600;1,400&family=Scheherazade+New:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
