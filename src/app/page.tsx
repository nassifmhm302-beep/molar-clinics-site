import Image from "next/image";
import Link from "next/link";
import { SectionHeading, PrimaryButton, Badge, EmptyState } from "@/components/ui";
import ServiceCard from "@/components/ServiceCard";
import DoctorCard from "@/components/DoctorCard";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import { clinic } from "@/content/clinic";
import {
  getActiveOffers,
  getAllDoctors,
  getBlogArticles,
  getFeaturedServices,
  getPrimaryBranch,
} from "@/lib/data";


export default async function HomePage() {
  const [featuredServices, doctors, offers, articles, branch] = await Promise.all([
    getFeaturedServices(),
    getAllDoctors(),
    getActiveOffers(),
    getBlogArticles(),
    getPrimaryBranch(),
  ]);

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Hero */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-[var(--color-pale-blue)]">
        <div className="container-page grid gap-10 py-16 md:py-24 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="reveal order-2 lg:order-1">
            <Badge>عيادات مولر لطب الأسنان — ظهرة لبن، الرياض</Badge>
            <h1 className="mt-6 text-[clamp(2.1rem,5vw,3.4rem)] font-bold leading-[1.15] text-[var(--color-heading)]">
              ابتسامتك تستحق عناية مختلفة
            </h1>
            <p className="mt-5 max-w-lg text-[16.5px] leading-[1.9] text-[var(--color-body)]">
              اكتشف تجربة متكاملة للعناية بصحة أسنانك، مع خدمات واضحة وتجربة حجز سهلة تساعدك على
              اتخاذ خطوتك القادمة بثقة.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <PrimaryButton href="/booking">احجز موعدك</PrimaryButton>
              <PrimaryButton href="/services" variant="outline">
                اكتشف خدماتنا
              </PrimaryButton>
            </div>
            <div className="mt-8">
              <WhatsAppCTA />
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto overflow-hidden rounded-[var(--radius-xl)] shadow-[0_30px_60px_rgba(23,43,69,0.15)] lg:max-w-none">
              <Image
                src="https://images.pexels.com/photos/3845553/pexels-photo-3845553.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=800"
                alt="مريض مبتسم أثناء جلسة فحص في عيادة أسنان حديثة"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 right-1/2 translate-x-1/2 lg:right-6 lg:translate-x-0 rounded-2xl bg-white px-5 py-4 shadow-[0_18px_40px_rgba(23,43,69,0.12)] border border-[var(--color-border)]">
              <p className="text-[13px] text-[var(--color-muted)]">ساعات العمل</p>
              <p className="mt-1 text-[14.5px] font-semibold text-[var(--color-heading)]">
                {clinic.openingHoursNote}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Intro */}
      {/* ---------------------------------------------------------------- */}
      <section className="container-page py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16 items-center">
          <div>
            <SectionHeading
              eyebrow="عن العيادة"
              title="رعاية أسنان واضحة، بخطوات مريحة من البداية حتى المتابعة"
            />
            <p className="mt-5 text-[15.5px] leading-[1.9] text-[var(--color-body)]">
              تقدّم عيادات مولر لطب الأسنان خدمات طب الأسنان العام إلى جانب علاجات زراعة الأسنان،
              تقويم الأسنان، وتجميل الابتسامة، ضمن بيئة سريرية حديثة في حي ظهرة لبن بالرياض. يحرص
              فريق العيادة على توضيح كل خطوة من خطوات العلاج قبل البدء بها.
            </p>
            <div className="mt-6 flex flex-wrap gap-6">
              <div>
                <p className="text-[13px] text-[var(--color-muted)]">الموقع</p>
                <p className="mt-1 text-[14.5px] font-semibold text-[var(--color-heading)]">
                  ظهرة لبن، الرياض
                </p>
              </div>
              <div>
                <p className="text-[13px] text-[var(--color-muted)]">التواصل</p>
                <p className="mt-1 text-[14.5px] font-semibold text-[var(--color-heading)]">
                  {clinic.phoneDisplay}
                </p>
              </div>
              <div>
                <p className="text-[13px] text-[var(--color-muted)]">طريقة الحجز</p>
                <p className="mt-1 text-[14.5px] font-semibold text-[var(--color-heading)]">
                  عبر الموقع أو واتساب
                </p>
              </div>
            </div>
            <div className="mt-8">
              <PrimaryButton href="/about" variant="ghost">
                تعرّف على العيادة أكثر ←
              </PrimaryButton>
            </div>
          </div>
          <div className="relative aspect-[5/4] overflow-hidden rounded-[var(--radius-xl)]">
            <Image
              src="https://images.pexels.com/photos/5355858/pexels-photo-5355858.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1000"
              alt="غرفة علاج حديثة مجهزة بكرسي أسنان أزرق ومعدات طبية"
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Services */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-[var(--color-cool-white)] py-16 md:py-20 border-y border-[var(--color-border)]">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="خدماتنا"
              title="خدمات طب الأسنان لدى عيادات مولر"
              description="مجموعة من العلاجات الأساسية والتجميلية، يحدد الطبيب المناسب منها لحالتك بعد الفحص."
            />
            <PrimaryButton href="/services" variant="outline">
              جميع الخدمات
            </PrimaryButton>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service) => (
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
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Patient journey */}
      {/* ---------------------------------------------------------------- */}
      <section className="container-page py-16 md:py-20">
        <SectionHeading
          eyebrow="رحلة الحجز"
          title="كيف يسير طلب حجز الموعد؟"
          description="عملية بسيطة من اختيار الخدمة حتى تأكيد العيادة لتفاصيل موعدك."
          align="center"
        />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { n: "01", t: "اختر الخدمة", d: "حدد الخدمة التي ترغب بها أو اطلب استشارة عامة." },
            { n: "02", t: "اختر الطبيب والموعد", d: "حدد الطبيب المفضل إن وجد، والتاريخ والوقت المناسبين لك." },
            { n: "03", t: "أدخل بياناتك", d: "شارك بيانات التواصل الأساسية لإتمام طلب الحجز." },
            { n: "04", t: "تأكيد العيادة", d: "يتواصل فريق العيادة معك لتأكيد تفاصيل الموعد النهائية." },
          ].map((step) => (
            <div key={step.n} className="relative rounded-[var(--radius-lg)] border border-[var(--color-border)] p-6">
              <span className="text-[13px] font-bold text-[var(--color-sky)]">{step.n}</span>
              <h3 className="mt-3 text-[16px] font-bold text-[var(--color-heading)]">{step.t}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-muted)]">{step.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <PrimaryButton href="/booking">ابدأ طلب الحجز الآن</PrimaryButton>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Featured treatment spotlight */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-[var(--color-primary-dark)] py-16 md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[var(--radius-xl)] order-2 lg:order-1">
            <Image
              src="https://images.pexels.com/photos/5355857/pexels-photo-5355857.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1000"
              alt="طبيبة أسنان تعرض نتائج المسح الرقمي للمريض على شاشة لوحية"
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <Badge>تقنيات حديثة</Badge>
            <h2 className="mt-5 text-[clamp(1.6rem,3vw,2.2rem)] font-bold leading-tight text-white">
              طبعة رقمية ثلاثية الأبعاد بدلًا من العجينة التقليدية
            </h2>
            <p className="mt-4 text-[15px] leading-[1.9] text-white/80">
              تعتمد العيادة على المسح الضوئي الرقمي لأخذ قياسات دقيقة وسريعة للأسنان، لتجربة أكثر
              راحة للمريض ضمن خطط التقويم والتركيبات.
            </p>
            <div className="mt-7">
              <PrimaryButton href="/services/digital-scanning" variant="outline" className="!text-white !border-white/30 hover:!bg-white/10">
                اقرأ عن هذه التقنية
              </PrimaryButton>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Doctors */}
      {/* ---------------------------------------------------------------- */}
      {doctors.length > 0 && (
        <section className="container-page py-16 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="فريقنا الطبي"
              title="تعرّف على أطباء عيادات مولر"
              description="فريق من أطباء الأسنان يغطي مجالات التقويم، الجراحة، الزراعة، وطب الأسنان العام."
            />
            <PrimaryButton href="/doctors" variant="outline">
              جميع الأطباء
            </PrimaryButton>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {doctors.slice(0, 4).map((doctor) => (
              <DoctorCard key={doctor.id} slug={doctor.slug} fullName={doctor.fullName} specialty={doctor.specialty} />
            ))}
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Trust / process section (replacing unverifiable testimonials) */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-[var(--color-soft-blue)] py-16 md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <SectionHeading eyebrow="نهجنا في العناية" title="كيف نحرص على راحة كل مريض؟" />
            <ul className="mt-6 flex flex-col gap-5">
              {[
                { t: "شرح واضح لكل خطوة", d: "يناقش الطبيب خطة العلاج المقترحة وتفاصيلها قبل البدء بأي إجراء." },
                { t: "تقييم دقيق قبل العلاج", d: "فحص وأشعة تشخيصية عند الحاجة لضمان اختيار العلاج المناسب." },
                { t: "متابعة بعد العلاج", d: "إرشادات عناية واضحة بعد كل إجراء لدعم تعافٍ أفضل." },
              ].map((item) => (
                <li key={item.t} className="flex gap-4">
                  <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[var(--color-primary)] font-bold">✓</span>
                  <div>
                    <p className="text-[15px] font-semibold text-[var(--color-heading)]">{item.t}</p>
                    <p className="mt-1 text-[14px] leading-relaxed text-[var(--color-muted)]">{item.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[5/4] overflow-hidden rounded-[var(--radius-xl)]">
            <Image
              src="https://images.pexels.com/photos/6627354/pexels-photo-6627354.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1000"
              alt="طبيب يناقش خطة العلاج مع المريض باستخدام صور رقمية"
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Offers (only rendered when verified active offers exist) */}
      {/* ---------------------------------------------------------------- */}
      {offers.length > 0 && (
        <section className="container-page py-16 md:py-20">
          <SectionHeading eyebrow="عروض حالية" title="عروض مولر لطب الأسنان" align="center" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <div key={offer.id} className="rounded-[var(--radius-lg)] border border-[var(--color-border)] p-6">
                <h3 className="text-[16px] font-bold text-[var(--color-heading)]">{offer.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-muted)]">{offer.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Blog */}
      {/* ---------------------------------------------------------------- */}
      <section className="container-page py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="مدونة العناية بالأسنان"
            title="محتوى تثقيفي لمساعدتك على فهم صحة أسنانك"
          />
          <PrimaryButton href="/blog" variant="outline">
            جميع المقالات
          </PrimaryButton>
        </div>
        {articles.length === 0 ? (
          <div className="mt-8">
            <EmptyState title="لا توجد مقالات منشورة حاليًا" />
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.slice(0, 3).map((article) => (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className="group flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white hover:shadow-[0_18px_40px_rgba(23,43,69,0.09)] transition-shadow"
              >
                <div className="relative h-44 w-full overflow-hidden bg-[var(--color-soft-blue)]">
                  {article.coverImageUrl && (
                    <Image
                      src={article.coverImageUrl}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <span className="text-[12px] text-[var(--color-muted)]">{article.readingMinutes} دقائق قراءة</span>
                  <h3 className="text-[16px] font-bold text-[var(--color-heading)] leading-snug">{article.title}</h3>
                  <p className="text-[13.5px] leading-relaxed text-[var(--color-muted)] line-clamp-2">{article.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Location */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-[var(--color-pale-blue)] py-16 md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <SectionHeading eyebrow="موقعنا" title="زرنا في فرع ظهرة لبن، الرياض" />
            <p className="mt-4 text-[15px] leading-[1.9] text-[var(--color-body)]">{clinic.address}</p>
            <p className="mt-2 text-[14.5px] text-[var(--color-muted)]">{clinic.openingHoursNote} — {clinic.closedDayNote}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <PrimaryButton href={clinic.googleMapsUrl}>فتح خرائط جوجل</PrimaryButton>
              <PrimaryButton href="/location" variant="outline">تفاصيل الموقع</PrimaryButton>
            </div>
          </div>
          <div className="relative aspect-[5/3] overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)]">
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
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Final CTA */}
      {/* ---------------------------------------------------------------- */}
      <section className="container-page py-16 md:py-20">
        <div className="rounded-[var(--radius-xl)] bg-[var(--color-primary)] px-8 py-14 text-center md:px-16">
          <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-bold text-white">
            جاهز لحجز موعدك القادم؟
          </h2>
          <p className="mt-4 text-[15px] text-white/85 max-w-xl mx-auto">
            أرسل طلب حجز موعدك الآن، وسيتواصل معك فريق عيادات مولر لتأكيد تفاصيل الموعد في أقرب وقت.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/booking"
              className="rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-[var(--color-primary)] hover:bg-white/90 transition-colors"
            >
              احجز موعدك
            </Link>
            <WhatsAppCTA className="!bg-white/10 !border-white/30 !text-white hover:!bg-white/20" />
          </div>
        </div>
      </section>
    </>
  );
}
