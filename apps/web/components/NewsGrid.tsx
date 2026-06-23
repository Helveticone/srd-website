import Image from 'next/image';
import { Card, CardContent } from '@srd/ui';
import type { NewsItem } from '@/lib/content/news';

export function NewsGrid({ items }: { items: NewsItem[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((a) => (
        <article key={a.titre} className="group">
          <Card className="h-full overflow-hidden transition-colors hover:border-accent">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={a.image}
                alt={a.titre}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <CardContent className="flex flex-col gap-2 p-5">
              <span className="text-xs text-srd-muted">{a.date}</span>
              <h3 className="font-display text-xl font-black uppercase leading-tight tracking-tight group-hover:text-accent">
                {a.titre}
              </h3>
              <p className="text-sm text-srd-muted">{a.chapo}</p>
            </CardContent>
          </Card>
        </article>
      ))}
    </div>
  );
}
