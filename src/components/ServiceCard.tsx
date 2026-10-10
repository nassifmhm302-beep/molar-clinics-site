import Image from "next/image";
import Link from "next/link";

export default function ServiceCard({
  slug,
  name,
  shortDescription,
  photoUrl,
  category,
}: {
  slug: string;
  name: string;
  shortDescription: string;
  photoUrl: string | null;
  category: string;
}) {
  return (
    <Link
      href={`/services/${slug}`}
      className="group flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white transition-shadow hover:shadow-[0_18px_40px_rgba(23,43,69,0.09)]"
    >
      <div className="relative h-48 w-full overflow-hidden bg-[var(--color-soft-blue)]">
        {photoUrl && (
          <Image
            src={photoUrl}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="text-[12px] font-semibold text-[var(--color-primary)]">{category}</span>
        <h3 className="text-[17px] font-bold text-[var(--color-heading)]">{name}</h3>
        <p className="text-[14px] leading-relaxed text-[var(--color-muted)] line-clamp-2">
          {shortDescription}
        </p>
        <span className="mt-2 text-[14px] font-semibold text-[var(--color-primary)]">
          اعرف المزيد ←
        </span>
      </div>
    </Link>
  );
}
