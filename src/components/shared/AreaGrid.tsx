import Link from "next/link";
import { MapPin } from "lucide-react";
import { CITY_DATA } from "@/lib/constants";

export function AreaGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {CITY_DATA.map((city) => (
        <Link
          key={city.slug}
          href={`/areas/${city.slug}`}
          className="group flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm shadow-sm border border-border/30 hover:border-brand/50 hover:shadow-md transition-all"
        >
          <MapPin className="h-3.5 w-3.5 text-brand flex-shrink-0 group-hover:scale-110 transition-transform" />
          <span className="font-medium group-hover:text-brand transition-colors">{city.name}</span>
        </Link>
      ))}
    </div>
  );
}
