"use client";
import Link from "next/link";
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer
            className="
        relative bg-white  shadow-[0_-12px_40px_-24px_rgba(2,6,23,0.25)]
        before:pointer-events-none before:content-[''] before:absolute
        before:inset-x-0 before:-top-px before:h-px
        before:bg-gradient-to-r before:from-transparent before:via-slate-300/60 before:to-transparent
      "
        >
            <div className="mx-auto max-w-screen-2xl px-4">
                {/* Columns */}
                <section className="grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Brand / About */}
                    <div>
                        <div className="flex items-center gap-2">
                            <img
                                src="/logo-32x32.png"
                                alt="Marketplace Logo"
                                className="h-9 w-9 rounded-lg bg-indigo-600 p-1"
                            />
                            <span className="text-lg font-semibold">Marketplace</span>
                        </div>
                        <p className="mt-3 text-sm text-slate-600">
                            Thoughtful products from trusted sellers. Fair, sustainable, and made to last.
                        </p>
                        <ul className="mt-4 space-y-2 text-sm text-slate-600">
                            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Helsinki, Finland</li>
                            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +358 000 0000</li>
                            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@marketplace.example</li>
                        </ul>
                    </div>

                    {/* Shop */}
                    <div>
                        <h4 className="text-sm font-semibold text-slate-900">Shop</h4>
                        <ul className="mt-3 space-y-2 text-sm text-slate-600">
                            <li><Link href="/shop?cat=new" className="hover:underline">New arrivals</Link></li>
                            <li><Link href="/shop?cat=best" className="hover:underline">Best sellers</Link></li>
                            <li><Link href="/shop?cat=gifts" className="hover:underline">Gift cards</Link></li>
                            <li><Link href="/deals" className="hover:underline">Sale</Link></li>
                        </ul>
                    </div>

                    {/* Help */}
                    <div>
                        <h4 className="text-sm font-semibold text-slate-900">Help</h4>
                        <ul className="mt-3 space-y-2 text-sm text-slate-600">
                            <li><Link href="/help/shipping" className="hover:underline">Shipping & delivery</Link></li>
                            <li><Link href="/help/returns" className="hover:underline">Returns & refunds</Link></li>
                            <li><Link href="/help/faq" className="hover:underline">FAQ</Link></li>
                            <li><Link href="/contact" className="hover:underline">Contact us</Link></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-sm font-semibold text-slate-900">Follow us</h4>
                        <div className="mt-3 flex gap-3">
                            <Link aria-label="Instagram" href="https://instagram.com"
                                className="grid h-9 w-9 place-items-center rounded-full ring-1 ring-slate-200/70 bg-white hover:bg-slate-50">
                                <Instagram className="h-4 w-4" />
                            </Link>
                            <Link aria-label="Facebook" href="https://facebook.com"
                                className="grid h-9 w-9 place-items-center rounded-full ring-1 ring-slate-200/70 bg-white hover:bg-slate-50">
                                <Facebook className="h-4 w-4" />
                            </Link>
                            <Link aria-label="YouTube" href="https://youtube.com"
                                className="grid h-9 w-9 place-items-center rounded-full ring-1 ring-slate-200/70 bg-white hover:bg-slate-50">
                                <Youtube className="h-4 w-4" />
                            </Link>
                        </div>
                        <p className="mt-4 text-xs text-slate-500">
                            Designed by <span className="font-medium">Jannatul</span> ✨
                        </p>
                    </div>
                </section>

                {/* Bottom bar */}
                <div className="mt-2 rounded-t-2xl ring-1 ring-slate-200/60 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50">
                    <div className="flex flex-col-reverse items-center justify-between gap-3 py-6 text-sm text-slate-600 md:flex-row px-4">
                        <p>© {year} Marketplace · Designed by Jannatul</p>
                        <div className="flex items-center gap-4">
                            <Link href="/privacy" className="hover:underline">Privacy</Link>
                            <span className="text-slate-300">·</span>
                            <Link href="/terms" className="hover:underline">Terms</Link>
                            <span className="text-slate-300">·</span>
                            <Link href="/cookies" className="hover:underline">Cookies</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}