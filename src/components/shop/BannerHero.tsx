import Image from "next/image";

export default function BannerHero() {
  return (
    <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-pink-400 via-fuchsia-500 to-indigo-600 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-8 sm:p-10 lg:p-12">
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
            Shop Eco-Friendly<br />Products
          </h1>
          <p className="mt-3 text-white/90">
            Shop ethnic saree & eco goods from trusted sellers.
          </p>
        </div>
        <div className="relative h-56 md:h-full">
          <Image
            src="/image/banners/banner.png"
            alt="Happy shopper"
            fill
            className="object-cover md:object-contain md:object-right"
            priority
          />
        </div>
      </div>
    </div>
  );
}
