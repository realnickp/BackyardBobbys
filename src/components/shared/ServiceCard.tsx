import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  slug: string;
  shortDesc: string;
  image: string;
}

export function ServiceCard({ title, slug, shortDesc, image }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${slug}`}
      className="group relative block aspect-[3/4] overflow-hidden rounded-2xl"
    >
      <Image
        src={image}
        alt={`${title} services in Anne Arundel County MD`}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-all duration-500 group-hover:from-black/70 group-hover:via-black/20" />
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-1 font-display">
          {title}
        </h3>
        <p className="text-white/70 text-sm mb-3 line-clamp-2">{shortDesc}</p>
        <span className="inline-flex items-center gap-1.5 text-brand text-sm font-semibold">
          View Service
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </span>
      </div>
    </Link>
  );
}
