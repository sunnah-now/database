import { Inter, Lora } from 'next/font/google';
import { LangProvider } from '@/context/LangContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const lora  = Lora({ subsets: ['latin'], variable: '--font-lora' });

export const metadata = {
  title: 'db.sunnah.now · Hadith Database Downloads',
  description: 'Scholarly-curated, structured hadith data — available in SQL, JSON, CSV and SQLite formats.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" className={`${inter.variable} ${lora.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Scheherazade New for Arabic — not in next/font, loaded via Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Scheherazade+New:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
