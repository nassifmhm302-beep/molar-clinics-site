import Image from "next/image";
import type { Metadata } from "next";
import { SectionHeading, PrimaryButton, Badge } from "@/components/ui";
import { clinic } from "@/content/clinic";

export const metadata: Metadata = {
  title: "من نحن",
  description:
    "تعرّف على عيادات مولر لطب الأسنان في ظهرة لبن بالرياض، ونهجها في تقديم رعاية أسنان واضحة ومريحة للمرضى.",
};

const principles = [
  {
    title: "تواصل واضح مع المريض",
    description: "يشرح الطبيب خطة العلاج المقترحة وخياراتها المتاحة قبل البدء بأي إجراء.",
  },
  {
    title: "خدمات متكاملة لطب الأسنان",
    description: "من الفحص والوقاية إلى الزراعة والتقويم وتجميل الابتسامة، ضمن فريق واحد.",
  },
  {
    title: "راحة المريض أولوية",
    description: "بيئة سريرية حديثة وتقنيات مثل المسح الرقمي ثلاثي الأبعاد لتجربة أكثر راحة.",
  },
  {
    title: "عناية وقائية مستمرة",
    description: "تشجيع المتابعة الدورية والعناية اليومية كجزء أساسي من صحة الفم والأسنان.",
  },
  {
    title: "سهولة طلب الموعد",
    description: "إمكانية إرسال طلب حجز الموعد مباشرة عبر الموقع أو التواصل عبر واتساب والهاتف.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-[var(--color-pale-blue)] py-16 md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <Badge>من نحن</Badge>
            <h1 className="mt-5 text-[clamp(1.9rem,4vw,2.8rem)] font-bold leading-tight text-[var(--color-heading)]">
              العناية بأسنانك تبدأ من هنا
            </h1>
            <p className="mt-5 text-[15.5px] leading-[1.9] text-[var(--color-body)]">
              عيادات مولر لطب الأسنان عيادة متخصصة في حي ظهرة لبن بالرياض، تقدّم خدمات طب الأسنان
              العام إلى جانب علاجات متقدمة مثل زراعة الأسنان، وتقويم الأسنان، وتجميل الابتسامة.
              يحرص فريق العيادة على توضيح كل خطوة من خطوات العلاج للمريض بلغة مبسطة بعيدة عن
              التعقيد الطبي.
            </p>
            <div className="mt-7">
              <PrimaryButton href="/booking">احجز موعدك</PrimaryButton>
            </div>
          </div>
          <div className="relative aspect-[5/4] overflow-hidden rounded-[var(--radius-xl)]">
            <Image
              src="https://images.pexels.com/photos/4269369/pexels-photo-4269369.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1100"
              alt="طبيبة أسنان تعرض نموذجًا توضيحيًا على مريض خلال الاستشارة"
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <SectionHeading
          eyebrow="نهجنا"
          title="ما الذي يميز تجربة العلاج في عيادات مولر؟"
          align="center"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p) => (
            <div key={p.title} className="rounded-[var(--radius-lg)] border border-[var(--color-border)] p-6">
              <h3 className="text-[16px] font-bold text-[var(--color-heading)]">{p.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-muted)]">{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--color-soft-blue)] py-16 md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[var(--radius-xl)] order-2 lg:order-1">
            <Image
              src="https://images.pexels.com/photos/5355863/pexels-photo-5355863.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1000"
              alt="عيادة أسنان حديثة بكراسي زرقاء ومعدات طبية نظيفة"
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading eyebrow="موقع العيادة" title="فرع ظهرة لبن، الرياض" />
            <p className="mt-4 text-[15px] leading-[1.9] text-[var(--color-body)]">{clinic.address}</p>
            <p className="mt-2 text-[14.5px] text-[var(--color-muted)]">
              {clinic.openingHoursNote} — {clinic.closedDayNote}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <PrimaryButton href="/location">تفاصيل الموقع والتواصل</PrimaryButton>
              <PrimaryButton href="/doctors" variant="outline">
                تعرّف على فريقنا الطبي
              </PrimaryButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
