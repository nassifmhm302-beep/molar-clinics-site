import Link from "next/link";
import { DoctorAvatar } from "./ui";

export default function DoctorCard({
  slug,
  fullName,
  specialty,
}: {
  slug: string;
  fullName: string;
  specialty: string;
}) {
  return (
    <Link
      href={`/doctors/${slug}`}
      className="group flex flex-col items-start gap-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 transition-shadow hover:shadow-[0_18px_40px_rgba(23,43,69,0.09)]"
    >
      <DoctorAvatar name={fullName} />
      <div>
        <h3 className="text-[16.5px] font-bold text-[var(--color-heading)]">{fullName}</h3>
        <p className="mt-1 text-[13.5px] text-[var(--color-muted)]">{specialty}</p>
      </div>
      <span className="text-[13.5px] font-semibold text-[var(--color-primary)]">
        عرض الملف الطبي ←
      </span>
    </Link>
  );
}
