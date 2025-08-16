"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Search, ShoppingCart, User, X } from "lucide-react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/locations", label: "Locations" },
  { href: "/shop", label: "Shop" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => setMenuOpen(false), [pathname]);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur shadow-sm">
      <div className="relative mx-auto max-w-screen-2xl px-4 h-14 flex items-center">
        {/* LEFT spacer keeps center aligned on mobile */}
        <div className="md:hidden w-9" />

        {/* CENTER: desktop nav + search */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6 text-sm">
            {LINKS.map((l) => {
              const active = pathname === l.href || pathname.startsWith(l.href + "/");
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={active ? "text-slate-900 font-medium" : "text-slate-600 hover:text-slate-900"}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2 rounded-full border bg-white px-3 py-1.5 shadow-xs min-w-[260px]">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              className="w-56 bg-transparent outline-none placeholder:text-slate-400 text-sm"
              placeholder="Search products"
              aria-label="Search"
            />
          </div>
        </div>

        {/* RIGHT: actions + MOBILE MENU TOGGLE */}
        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/user"
            className="grid h-9 w-9 place-items-center rounded-full border bg-white hover:bg-slate-50"
            aria-label="My Profile"
          >
            <User className="h-5 w-5" />
          </Link>
          <Link
            href="/cart"
            className="grid h-9 w-9 place-items-center rounded-full border bg-white hover:bg-slate-50"
            aria-label="Cart"
          >
            <ShoppingCart className="h-5 w-5" />
          </Link>

          {/* Hamburger toggles ONLY the mobile menu links */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="md:hidden grid h-9 w-9 place-items-center rounded-full border bg-white hover:bg-slate-50 relative z-50"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU (sheet under header) */}
      <div
        id="mobile-nav"
        className={`md:hidden fixed left-0 right-0 top-14 z-40
                    transition-transform duration-300 ${menuOpen ? "translate-y-0" : "-translate-y-4 pointer-events-none"}
                    `}
      >
        {/* backdrop */}
        <button
          onClick={() => setMenuOpen(false)}
          className={`fixed inset-0 top-14 bg-black/30 transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0"}`}
          aria-label="Close menu backdrop"
        />

        {/* panel */}
        <nav
          className={`mx-3 rounded-2xl border bg-white shadow-xl overflow-hidden
                      transition-[opacity,transform] duration-300
                      ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
          aria-label="Mobile navigation"
        >
          <ul className="divide-y">
            {LINKS.map(({ href, label }) => {
              const active = pathname === href || pathname.startsWith(href + "/");
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`block px-5 py-3 text-base ${active ? "text-slate-900 font-medium" : "text-slate-700 hover:bg-slate-50"}`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
