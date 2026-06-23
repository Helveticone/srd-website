import { PageHeader } from '@/components/PageHeader';
import { NewsGrid } from '@/components/NewsGrid';
import { getNews } from '@/lib/content/news';

export const metadata = { title: 'Actualités — Association' };

export default function ActualitesAssocPage() {
  return (
    <>
      <PageHeader surtitre="Association" titre="Actualités" intro="Toute la vie de l’Association." />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <NewsGrid items={getNews('association')} />
      </section>
    </>
  );
}
