import Link from "next/link";
import ProductCard from "@/components/shop/ProductCard"; 
import { api } from "@/lib/api";
import { ContentCardDTO } from "@/types/content/content";

type Props = {
  title: string;
  endpoint: string;
  href?: string;
  limit?: number;
};

export default async function ProductSection({ title, endpoint, href, limit = 8 }: Props) {
  const items = await api<ContentCardDTO[]>(endpoint).catch(() => []);
  if (!items.length) return null;

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        {href && (
          <Link href={href} className="text-sm text-slate-600 hover:underline">
            View more &gt;
          </Link>
        )}
      </div>

      <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.slice(0, limit).map((p, i) => (
          <ProductCard key={(p as any).id ?? (p as any)._id ?? i} item={p} />
        ))}
      </div>
    </section>
  );
}
