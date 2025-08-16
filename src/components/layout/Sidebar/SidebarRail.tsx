"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home, ShoppingCart, LayoutGrid, Heart, Tag, Package, User as UserIcon,
  Settings, ChevronLeft
} from "lucide-react";

const LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/shop", label: "Shop", icon: ShoppingCart },
  { href: "/collections", label: "Collections", icon: LayoutGrid },
  { href: "/favourites", label: "Favourites", icon: Heart },
  { href: "/deals", label: "Deals", icon: Tag },
  { href: "/orders", label: "Orders", icon: Package },
  { href: "/user", label: "My Profile", icon: UserIcon },
  { href: "/settings", label: "Settings", icon: Settings },
];

const STORAGE_KEY = "store.sidebar.expanded";

export default function SidebarRail() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(true);

  // Navbar -> Sidebar bridge
  useEffect(() => {
    const handler = () => setExpanded(v => !v);
    window.addEventListener("sidebar:toggle", handler);
    return () => window.removeEventListener("sidebar:toggle", handler);
  }, []);

  // restore AFTER mount (no hydration mismatch)
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) setExpanded(saved === "1");
  }, []);

  // persist + expose width var
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, expanded ? "1" : "0");
    document.documentElement.style.setProperty("--sidebar-w", expanded ? "16rem" : "3.5rem");
  }, [expanded]);

  // default for first paint
  useEffect(() => {
    document.documentElement.style.setProperty("--sidebar-w", "16rem");
  }, []);

  return (
    <aside
      className={`fixed top-0 left-0 h-screen z-[70] bg-white shadow-sm
                  transition-[width] duration-200 ${expanded ? "w-64" : "w-14"}`}
      aria-label="Main navigation"
    >
      <div className="pointer-events-none absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-slate-300/70 to-transparent" />

      {/* header */}
      <div className="grid grid-cols-[44px_36px_1fr] items-center gap-2 px-2 py-3
                      border-b border-slate-200/60 bg-white/90 backdrop-blur">
        <button
          onClick={() => setExpanded(v => !v)}
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
          title="Toggle sidebar"
          className="grid h-9 w-9 place-items-center rounded-full border bg-white/80 hover:bg-white shadow-sm transition"
        >
          <ChevronLeft className={`h-4 w-4 transition-transform ${expanded ? "" : "rotate-180"}`} />
        </button>
        <span className="relative h-9 w-9 shrink-0 rounded-xl overflow-hidden bg-[--brand-blue]">
          <Image src="/logo-32x32.png" alt="Marketplace" fill className="object-contain p-1" />
        </span>
        {expanded && <span className="min-w-0 font-semibold truncate">Marketplace</span>}
      </div>

      {/* nav */}
      <nav className="p-2">
        <ul className="space-y-1">
          {LINKS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <li key={href}>
                <Link
                  href={href}
                  title={!expanded ? label : undefined}
                  aria-current={active ? "page" : undefined}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-2 transition
                    ${active ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"}`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {expanded && <span className="truncate">{label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
