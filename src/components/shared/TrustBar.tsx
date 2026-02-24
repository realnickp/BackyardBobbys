import { Shield, MapPin, Clock, Star } from "lucide-react";
import { SITE } from "@/lib/constants";

const items = [
  { icon: Shield, label: `Licensed: ${SITE.license}` },
  { icon: MapPin, label: `Serving ${SITE.address.region}, MD` },
  { icon: Clock, label: "Fast Free Estimates" },
  { icon: Star, label: "5-Star Craftsmanship" },
];

export function TrustBar() {
  return (
    <div className="bg-gradient-to-r from-brand to-brand-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-3 text-sm font-medium">
          {items.map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-white">
              <item.icon className="h-4 w-4 opacity-90" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
