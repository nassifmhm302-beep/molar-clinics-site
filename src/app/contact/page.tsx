import type { Metadata } from "next";
import { SectionHeading, PrimaryButton } from "@/components/ui";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import { clinic } from "@/content/clinic";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description: "تواصل مع عيادات مولر لطب الأسنان عبر الهاتف أو واتساب أو نموذج التواصل.",
};

export default function ContactPage() {
  return (
    <div className="container-page py-16 md:py-20">
      <SectionHeading eyebrow="تواصل معنا" title="نحن هنا للإجابة على استفساراتك" />

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div className="flex flex-col gap-6">
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] p-6">
            <h3 className="text-[14px] font-semibold text-[var(--color-muted)]">الهاتف وواتساب</h3>
            <p className="mt-1 text-[16px] font-semibold text-[var(--color-heading)]">
              {clinic.phoneDisplay}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <PrimaryButton href={`tel:${clinic.phoneHref}`} variant="outline">
                اتصل الآن
              </PrimaryButton>
              <WhatsAppCTA />
            </div>
          </div>

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] p-6">
            <h3 className="text-[14px] font-semibold text-[var(--color-muted)]">البريد الإلكتروني</h3>
            <p className="mt-1 text-[16px] font-semibold text-[var(--color-heading)]">{clinic.email}</p>
          </div>

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] p-6">
            <h3 className="text-[14px] font-semibold text-[var(--color-muted)]">العنوان</h3>
            <p className="mt-1 text-[15px] leading-relaxed text-[var(--color-heading)]">
              {clinic.address}
            </p>
            <p className="mt-3 text-[13.5px] text-[var(--color-muted)]">
              {clinic.openingHoursNote} — {clinic.closedDayNote}
            </p>
          </div>

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] p-6">
            <h3 className="text-[14px] font-semibold text-[var(--color-muted)] mb-3">إنستغرام</h3>
            <a
              href={clinic.instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14.5px] font-semibold text-[var(--color-primary)]"
            >
              molar_clinics@
            </a>
          </div>
        </div>

        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] p-7">
          <h2 className="text-[17px] font-bold text-[var(--color-heading)] mb-5">
            أرسل لنا رسالة
          </h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
