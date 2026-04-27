import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import ReleasesSection from '@/components/ReleasesSection';
import Footer from '@/components/Footer';
import {REPO} from '@/lib/utils';

// Fetch releases server-side at request time (ISR: revalidate every 10 min)
async function getReleases() {
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/releases`,
      {
        headers: { Accept: 'application/vnd.github.v3+json' },
        next: { revalidate: 600 },
      }
    );
    if (!res.ok) throw new Error(res.status);
return await res.json();
}

export default async function Page() {
  const releases = await getReleases();

  return (
    <>
      <Nav />
      <Hero />
      <ReleasesSection initialReleases={releases} />
      <Footer />
    </>
  );
}
