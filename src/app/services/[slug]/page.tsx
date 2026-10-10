import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PrimaryButton, Badge, EmptyState } from "@/components/ui";
import DoctorCard from "@/components/DoctorCard";
import FaqAccordion from "@/components/FaqAccordion";
import {
  getAllServices,
  getDoctorsForService,
  getFaqsForService,
  getServiceBySlug,
} from "@/lib/data";


export async function generateStaticParams() {
  const items = await getAllServices();
  return items.map((item) => ({ slug: item.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.seoTitle || service.name,
    description: service.seoDescription || service.shortDescription,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const [doctors, faqs, allServices] = await Promise.all([
    getDoctorsForService(service.id),
    getFaqsForService(service.id),
    getAllServices(),
  ]);

  const relatedServices = allServices
    .filter((s) => s.category === service.category && s.id !== service.id)
    .slice(0, 3);

  return (
    <>
      <section className="bg-[var(--color-pale-blue)] py-16 md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <Badge>{service.category}</Badge>
            <h1 className="mt-5 text-[clamp(1.8rem,3.6vw,2.6rem)] font-bold leading-tight text-[var(--color-heading)]">
              {service.name}
            </h1>
            <p className="mt-5 text-[15.5px] leading-[1.9] text-[var(--color-body)]">
              {service.longDescription}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <PrimaryButton href={`/booking?service=${service.id}`}>
                احجز استشارة لهذه الخدمة
              </PrimaryButton>
              <PrimaryButton href="/contact" variant="outline">
                استفسر عن التكلفة
              </PrimaryButton>
            </div>
          </div>
          {service.photoUrl && (
            <div className="relative aspect-[5/4] overflow-hidden rounded-[var(--radius-xl)]">
              <Image
                src={service.photoUrl}
                alt={service.name}
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </section>

      <section className="container-page py-16 md:py-20 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
        <div className="flex flex-col gap-12">
          {service.whatToExpect && service.whatToExpect.length > 0 && (
            <div>
              <h2 className="text-[19px] font-bold text-[var(--color-heading)]">
                ماذا تتضمن زيارتك؟
              </h2>
              <ul className="mt-5 flex flex-col gap-4">
                {service.whatToExpect.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-soft-blue)] text-[12px] font-bold text-[var(--color-primary)]">
                      {i + 1}
                    </span>
                    <p className="text-[14.5px] leading-relaxed text-[var(--color-body)]">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {service.whoNeedsIt && service.whoNeedsIt.length > 0 && (
            <div>
              <h2 className="text-[19px] font-bold text-[var(--color-heading)]">
                متى تحتاج إلى استشارة حول هذه الخدمة؟
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {service.whoNeedsIt.map((item, i) => (
                  <li key={i} className="flex gap-3 text-[14.5px] leading-relaxed text-[var(--color-body)]">
                    <span aria-hidden="true" className="text-[var(--color-primary)]">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {service.preparationNotes && (
            <div className="rounded-2xl bg-[var(--color-soft-blue)] p-5">
              <h3 className="text-[14.5px] font-bold text-[var(--color-primary-dark)]">
                قبل موعدك
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-body)]">
                {service.preparationNotes}
              </p>
            </div>
          )}

          <div>
            <h2 className="text-[19px] font-bold text-[var(--color-heading)] mb-5">
              الأسئلة الشائعة
            </h2>
            {faqs.length > 0 ? (
              <FaqAccordion
                items={faqs.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))}
              />
            ) : (
              <EmptyState title="لا توجد أسئلة شائعة لهذه الخدمة بعد" />
            )}
          </div>
        </div>

        <aside className="flex flex-col gap-8">
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] p-6">
            <h3 className="text-[15px] font-bold text-[var(--color-heading)]">تنويه مهم</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--color-muted)]">
              المعلومات أعلاه توضيحية عامة ولا تُغني عن الفحص والتشخيص المباشر من الطبيب. تختلف
              ملاءمة العلاج ومدته من حالة لأخرى، وللاستفسار عن التكلفة يرجى التواصل مع العيادة.
            </p>
          </div>

          {doctors.length > 0 && (
            <div>
              <h3 className="text-[15px] font-bold text-[var(--color-heading)] mb-4">
                أطباء هذه الخدمة
              </h3>
              <div className="flex flex-col gap-4">
                {doctors.map((doctor) => (
                  <DoctorCard key={doctor.id} slug={doctor.slug} fullName={doctor.fullName} specialty={doctor.specialty} />
                ))}
              </div>
            </div>
          )}

          {relatedServices.length > 0 && (
            <div>
              <h3 className="text-[15px] font-bold text-[var(--color-heading)] mb-4">
                خدمات ذات صلة
              </h3>
              <div className="flex flex-col gap-2">
                {relatedServices.map((s) => (
                  <Link
                    key={s.id}
                    href={`/services/${s.slug}`}
                    className="rounded-xl border border-[var(--color-border)] px-4 py-3 text-[14px] font-medium text-[var(--color-heading)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </section>
    </>
  );
}
