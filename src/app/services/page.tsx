import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui";
import ServiceCard from "@/components/ServiceCard";
import { getAllServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "خدمات طب الأسنان",
  description:
    "استعرض خدمات عيادات مولر لطب الأسنان: زراعة الأسنان، تقويم الأسنان، تبييض الأسنان، العناية الوقائية، وغيرها.",
};


export default async function ServicesPage() {
  const services = await getAllServices();

  const categories = Array.from(new Set(services.map((s) => s.category)));

  return (
    <div className="container-page py-16 md:py-20">
      <SectionHeading
        eyebrow="خدماتنا"
        title="خدمات طب الأسنان لدى عيادات مولر"
        description="تعرض هذه الصفحة الخدمات المتاحة حاليًا في العيادة. يحدد الطبيب الخدمة والخطة الأنسب لحالتك بعد الفحص المباشر."
      />

      <div className="mt-12 flex flex-col gap-14">
        {categories.map((category) => (
          <div key={category}>
            <h2 className="text-[13px] font-semibold tracking-[0.06em] text-[var(--color-primary)] mb-5">
              {category.toUpperCase()}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services
                .filter((s) => s.category === category)
                .map((service) => (
                  <ServiceCard
                    key={service.id}
                    slug={service.slug}
                    name={service.name}
                    shortDescription={service.shortDescription}
                    photoUrl={service.photoUrl}
                    category={service.category}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
