import { PageHeader } from '@/components/PageHeader';
import { NewsGrid } from '@/components/NewsGrid';
import { getNews } from '@/lib/content/news';

export const metadata = { title: 'Actualités — Académie' };

export default function ActualitesAcademiePage() {
  return (
    <>
      <PageHeader surtitre="Académie" titre="Actualités" intro="La vie du centre de formation." />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <NewsGrid items={getNews('academie')} />
      </section>
    </>
  );
}
