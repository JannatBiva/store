import Container from '@/components/ui/Container';
import Banner from '@/components/shop/BannerHero';
import ProductCard from '@/components/shop/ProductCard';
import { api } from '@/lib/api';
import { EP } from '@/lib/endpoints';
import { ContentCardDTO } from '@/types/content/content';

export default async function HomePage() {
  const products = await api<ContentCardDTO[]>(EP.mostViewed).catch(() => []);

  return (
    <Container>
      <div className="py-8 space-y-6">
        <Banner />
        
        <section className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.slice(0, 12).map((p, i) => (
            <ProductCard key={p.id ?? i} item={p} />
          ))}
        </section>
      </div>
    </Container>
  );
}
