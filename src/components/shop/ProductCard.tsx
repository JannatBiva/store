import Link from "next/link"; 
import { ContentCardDTO } from "@/types/content/content";

type Card = ContentCardDTO;

const Star = ({ filled }: { filled: boolean }) => (
  <svg viewBox="0 0 20 20" className={`h-4 w-4 ${filled ? "text-amber-400" : "text-slate-300"}`} fill="currentColor">
    <path d="M9.049 2.927a1 1 0 011.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.922-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.196-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.88 8.72c-.783-.57-.38-1.81.588-1.81H6.93a1 1 0 00.951-.69l1.168-3.292z"/>
  </svg>
);

const Heart = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.77 0-3.304.96-4.062 2.367-.758-1.408-2.293-2.367-4.063-2.367C5.6 3.75 3.5 5.765 3.5 8.25c0 6.22 8.75 11 8.75 11s8.75-4.78 8.75-11z"/>
  </svg>
);

export default function ProductCard({ item }: { item: Card }) {
  // build href for detail page
  const id = (item as any).id ?? (item as any)._id;
  const href = id != null ? `/product/${id}` : undefined;

  // use a fallback that exists in /public
  const img = item.imageUrl ?? item.imagePath ?? "/image/placeholder.png";
  const avatar = item.sellerAvatarUrl ?? item.sellerAvatarPath ?? "/image/sellers/mina.png";

  const price =
    item.priceBDT != null ? `${item.priceBDT}৳`
    : item.price != null ? `$${item.price.toFixed(2)}`
    : "";

  const showStrike =
    item.originalPriceBDT != null &&
    item.priceBDT != null &&
    item.originalPriceBDT > item.priceBDT;

  const rawRating =
    (item as any).rating ??
    (item as any).ratingValue ??
    (item as any).avgRating ??
    0;
  const rating = Math.max(0, Math.min(5, Number(rawRating) || 0));

  return (
    <article className="card overflow-hidden hover:shadow-md transition-shadow">
      {/* Image + discount */}
      <div className="relative aspect-[4/3] bg-gray-100">
        {href ? (
          <Link href={href} aria-label={item.title ?? "View product"}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
          </Link>
        ) : (
          // fallback if no id
          <img src={img} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
        )}

        {typeof item.discountPct === "number" && item.discountPct > 0 && (
          <span className="absolute top-3 right-3 text-xs px-2 py-1 rounded text-white bg-[#13bc2e]">
            -{item.discountPct}%
          </span>
        )}
      </div>

      <div className="p-4">
        {/* Title (clickable) */}
        {href ? (
          <Link href={href} className="block hover:underline">
            <h3 className="font-semibold line-clamp-1">{item.title}</h3>
          </Link>
        ) : (
          <h3 className="font-semibold line-clamp-1">{item.title}</h3>
        )}

        {/* ⭐ Rating row */}
        <div className="mt-2 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} filled={i < Math.round(rating)} />
          ))}
          {rating > 0 && (
            <span className="text-xs text-slate-500 ml-1">{rating.toFixed(1)}</span>
          )}
        </div>

        {/* Price + actions */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold">{price}</span>
            {showStrike && (
              <span className="text-[#959595] text-sm line-through">
                {item.originalPriceBDT}৳
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button className="text-sm px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-100 inline-flex items-center gap-1">
              <Heart /> <span>Like</span>
            </button>
          </div>
        </div>

        {/* Seller row */}
        {(item.sellerName || avatar) && (
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={avatar}
                alt={item.sellerName ? `${item.sellerName} avatar` : "Seller avatar"}
                className="w-9 h-9 lg:w-10 lg:h-10 rounded-full object-cover"
                loading="lazy"
              />
              <p className="text-[13px] text-black">{item.sellerName ?? "Seller"}</p>
            </div>

            <button
              className="shrink-0 text-sm px-3 py-1.5 rounded-full border bg-gray-900 text-white hover:bg-black"
              // onClick={() => addToCart(item)}
            >
              Add to cart
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
