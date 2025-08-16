import Container from "@/components/ui/Container";
import { demoProducts } from "@/data/demoProducts";

type Props = { params: { id: string } };

export default function ProductDetail({ params }: Props) {
  const item = demoProducts.find((p) => String(p.id) === params.id);

  if (!item) {
    return (
      <Container>
        <div className="py-10">
          <p className="text-gray-600">Product not found.</p>
        </div>
      </Container>
    );
  }

  const title = (item as any).title ?? (item as any).name ?? "Product";
  const img =
    (item as any).imageUrl ??
    (item as any).imagePath ??
    (item as any).image ??
    "/image/placeholder.png";
  const gallery: string[] = (item as any).images ?? [img];

  const priceRaw = (item as any).priceBDT ?? (item as any).price;
  const price =
    typeof priceRaw === "number"
      ? `$${priceRaw.toFixed(2)}`
      : typeof priceRaw === "string"
      ? priceRaw
      : "";

  const desc = (item as any).description ?? (item as any).shortDescription;

  return (
    <Container>
      <div className="py-10 grid gap-8 md:grid-cols-2">
        {/* Left: main image + optional thumbnails */}
        <div className="card overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img} alt={title} className="w-full object-cover" />
          {gallery.length > 1 && (
            <div className="grid grid-cols-4 gap-2 p-3 border-t bg-slate-50">
              {gallery.map((g, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={g}
                  alt={`${title} ${i + 1}`}
                  className="h-16 w-full object-cover rounded"
                  loading="lazy"
                />
              ))}
            </div>
          )}
        </div>

        {/* Right: details */}
        <div>
          <h1 className="text-3xl font-semibold">{title}</h1>

          {(item as any).shortDescription && (
            <p className="mt-2 text-gray-600">
              {(item as any).shortDescription}
            </p>
          )}

          {price && <p className="mt-4 text-2xl font-bold">{price}</p>}

          <div className="mt-6 flex gap-3">
            <button className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-black">
              Add to Cart
            </button>
            <button className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-100">
              ♥ Like
            </button>
          </div>
          <div>
            {desc && (
            <div className="mt-4">
              <h2 className="text-sm font-semibold text-slate-600">Details</h2>
              <p className="mt-2 text-gray-700 whitespace-pre-line">{desc}</p>
            </div>
          )}
          </div>
        </div>
      </div>
    </Container>
  );
}

// (Optional) Pre-render pages for each demo product
export function generateStaticParams() {
  return demoProducts
    .filter((p) => p?.id != null)
    .map((p) => ({ id: String(p.id) }));
}
