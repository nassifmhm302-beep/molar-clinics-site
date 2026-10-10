import type { Metadata } from "next";
import { SectionHeading, PrimaryButton, EmptyState } from "@/components/ui";
import { getActiveOffers } from "@/lib/data";

export const metadata: Metadata = {
  title: "العروض",
  description: "عروض عيادات مولر لطب الأسنان الحالية، عند توفرها.",
};


export default async function OffersPage() {
  const offers = await getActiveOffers();

  return (
    <div className="container-page py-16 md:py-20">
      <SectionHeading eyebrow="العروض" title="عروض عيادات مولر لطب الأسنان" align="center" />

      {offers.length === 0 ? (
        <div className="mt-10 mx-auto max-w-xl">
          <EmptyState
            title="لا توجد عروض منشورة حاليًا"
            description="للاستفسار عن أحدث العروض والأسعار، يُرجى التواصل مع العيادة مباشرة عبر الهاتف أو واتساب."
          />
          <div className="mt-8 flex justify-center">
            <PrimaryButton href="/contact">تواصل معنا</PrimaryButton>
          </div>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <div key={offer.id} className="rounded-[var(--radius-lg)] border border-[var(--color-border)] p-6">
              <h3 className="text-[16px] font-bold text-[var(--color-heading)]">{offer.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-muted)]">
                {offer.description}
              </p>
              {offer.termsText && (
                <p className="mt-3 text-[12.5px] text-[var(--color-muted)]">{offer.termsText}</p>
              )}
              <div className="mt-5">
                <PrimaryButton href="/booking" variant="outline">
                  احجز الآن
                </PrimaryButton>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
