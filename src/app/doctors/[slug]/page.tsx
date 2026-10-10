import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { DoctorAvatar, PrimaryButton, Badge } from "@/components/ui";
import { getAllDoctors, getDoctorBySlug, getServicesForDoctor } from "@/lib/data";


export async function generateStaticParams() {
  const items = await getAllDoctors();
  return items.map((item) => ({ slug: item.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doctor = await getDoctorBySlug(slug);
  if (!doctor) return {};
  return {
    title: doctor.fullName,
    description: `${doctor.fullName} — ${doctor.specialty} في عيادات مولر لطب الأسنان.`,
  };
}

export default async function DoctorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doctor = await getDoctorBySlug(slug);
  if (!doctor) notFound();

  const services = await getServicesForDoctor(doctor.id);
  const languages = (doctor.languages as unknown as unknown as string[] | null) || [];
  const qualifications = (doctor.qualifications as unknown as unknown as string[] | null) || [];

  return (
    <div className="container-page py-16 md:py-20">
      <div className="grid gap-10 lg:grid-cols-[320px_1fr] lg:gap-16">
        <div>
          <DoctorAvatar name={doctor.fullName} size={140} />
          <h1 className="mt-6 text-[22px] font-bold text-[var(--color-heading)]">
            {doctor.fullName}
          </h1>
          <Badge>{doctor.specialty}</Badge>

          {languages.length > 0 && (
            <div className="mt-6">
              <p className="text-[13px] font-semibold text-[var(--color-muted)]">اللغات</p>
              <p className="mt-1 text-[14px] text-[var(--color-heading)]">{languages.join("، ")}</p>
            </div>
          )}

          <div className="mt-6">
            <p className="text-[13px] font-semibold text-[var(--color-muted)]">الموقع</p>
            <p className="mt-1 text-[14px] text-[var(--color-heading)]">فرع ظهرة لبن، الرياض</p>
          </div>

          <div className="mt-8">
            <PrimaryButton href={`/booking?doctor=${doctor.id}`}>
              احجز مع هذا الطبيب
            </PrimaryButton>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          {doctor.bio && (
            <div>
              <h2 className="text-[18px] font-bold text-[var(--color-heading)] mb-3">نبذة</h2>
              <p className="text-[15px] leading-[1.9] text-[var(--color-body)]">{doctor.bio}</p>
            </div>
          )}

          {qualifications.length > 0 && (
            <div>
              <h2 className="text-[18px] font-bold text-[var(--color-heading)] mb-3">المؤهلات</h2>
              <ul className="flex flex-col gap-2">
                {qualifications.map((q, i) => (
                  <li key={i} className="text-[14.5px] text-[var(--color-body)]">• {q}</li>
                ))}
              </ul>
            </div>
          )}

          {services.length > 0 && (
            <div>
              <h2 className="text-[18px] font-bold text-[var(--color-heading)] mb-4">
                الخدمات ذات الصلة
              </h2>
              <div className="flex flex-wrap gap-3">
                {services.map((s) => (
                  <Link
                    key={s.id}
                    href={`/services/${s.slug}`}
                    className="rounded-full border border-[var(--color-border)] px-4 py-2 text-[13.5px] font-medium text-[var(--color-heading)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
