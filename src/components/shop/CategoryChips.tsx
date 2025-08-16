import Link from "next/link";

const CHIPS = [
  { label: "Clothing", href: "/shop?cat=clothing" },
  { label: "Accessories", href: "/shop?cat=accessories" },
  { label: "Home & Living", href: "/shop?cat=home" },
  { label: "Gifts", href: "/shop?cat=gifts" },
  { label: "Flash Deals", href: "/deals" },
];

export default function CategoryChips() {
  return (
    <nav className="">
      {/* Wrap to multiple lines */}
      <ul className="flex flex-wrap gap-2 py-2">
        {CHIPS.map((c) => (
          <li key={c.href} className="shrink-0">
            <Link
              href={c.href}
              className="
                inline-flex items-center justify-center text-center
                px-3 py-2
                rounded-xl border bg-white
                text-sm leading-tight
                /* allow two-line chips on very small screens */
                whitespace-normal break-words
                /* keep chips from getting too wide on tiny screens */
                max-w-[45vw] sm:max-w-none
                hover:bg-slate-50
              "
            >
              {c.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
