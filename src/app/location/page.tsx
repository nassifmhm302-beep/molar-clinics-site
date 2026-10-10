import type { Metadata } from "next";
import { SectionHeading, PrimaryButton } from "@/components/ui";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import { clinic, dayNamesAr } from "@/content/clinic";
import { getOpeningHours, getPrimaryBranch } from "@/lib/data";

export const metadata: Metadata = {
  title: "موقعنا",
  description: "موقع عيادات مولر لطب الأسنان في ظهرة لبن بالرياض، وساعات العمل وطرق التواصل.",
};


export default async function LocationPage() {
  const branch = await getPrimaryBranch();
  const hours = branch ? await getOpeningHours(branch.id) : [];

  return (
    <div className="container-page py-16 md:py-20">
      <SectionHeading eyebrow="موقعنا" title="فرع ظهرة لبن، الرياض" />

      <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-7">
          <div>
            <h3 className="text-[14px] font-semibold text-[var(--color-muted)]">العنوان</h3>
            <p className="mt-1 text-[15.5px] text-[var(--color-heading)]">{clinic.address}</p>
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-[var(--color-muted)]">الهاتف وواتساب</h3>
            <p className="mt-1 text-[15.5px] text-[var(--color-heading)]">{clinic.phoneDisplay}</p>
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-[var(--color-muted)]">البريد الإلكتروني</h3>
            <p className="mt-1 text-[15.5px] text-[var(--color-heading)]">{clinic.email}</p>
          </div>

          {hours.length > 0 && (
            <div>
              <h3 className="text-[14px] font-semibold text-[var(--color-muted)] mb-3">ساعات العمل</h3>
              <ul className="flex flex-col gap-2 rounded-2xl border border-[var(--color-border)] p-4">
                {hours.map((h) => (
                  <li key={h.id} className="flex justify-between text-[14px]">
                    <span className="text-[var(--color-body)]">{dayNamesAr[h.dayOfWeek]}</span>
                    <span className="font-semibold text-[var(--color-heading)]">
                      {h.isClosed ? "إجازة" : `${h.opensAt} - ${h.closesAt}`}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-2">
            <PrimaryButton href={clinic.googleMapsUrl}>فتح خرائط جوجل</PrimaryButton>
            <WhatsAppCTA />
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)]">
          <iframe
            title="موقع عيادات مولر لطب الأسنان على الخريطة"
            className="h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(
              "عيادات مولر لطب الأسنان، ظهرة لبن، الرياض"
            )}&z=14&output=embed`}
          />
        </div>
      </div>
    </div>
  );
}
