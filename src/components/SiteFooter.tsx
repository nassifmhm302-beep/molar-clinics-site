import Link from "next/link";
import { clinic } from "@/content/clinic";

const footerServiceLinks = [
  { href: "/services/dental-implants", label: "زراعة الأسنان" },
  { href: "/services/orthodontics", label: "تقويم الأسنان" },
  { href: "/services/laser-teeth-whitening", label: "تبييض الأسنان" },
  { href: "/services/teeth-cleaning", label: "تنظيف الأسنان" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-[var(--color-primary-dark)] text-white">
      <div className="container-page py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white font-bold text-lg">
              م
            </span>
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-[17px]">عيادات مولر</span>
              <span className="text-[11px] tracking-wide text-white/70">MOLAR CLINICS</span>
            </div>
          </div>
          <p className="text-[14px] text-white/75 leading-relaxed">{clinic.tagline}</p>
          <div className="flex gap-3 pt-1">
            <a
              href={clinic.instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="إنستغرام"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="6" stroke="white" strokeWidth="1.7" />
                <circle cx="12" cy="12" r="4.2" stroke="white" strokeWidth="1.7" />
                <circle cx="17.3" cy="6.7" r="1.1" fill="white" />
              </svg>
            </a>
            <a
              href={clinic.facebookLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="فيسبوك"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M14 9h2V6h-2c-1.66 0-3 1.34-3 3v2H9v3h2v6h3v-6h2.2l.8-3H14V9c0-.28.22-.5.5-.5H14z"
                  fill="white"
                />
              </svg>
            </a>
            <a
              href={clinic.twitterLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="إكس"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M3 3l7.5 9.5L3.3 21H6l5.8-6.6L16.5 21H21l-8-10.2L20.2 3H17.5l-5.3 6L7.5 3H3z"
                  fill="white"
                />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-[14px] font-semibold text-white/60 mb-4 tracking-wide">
            روابط سريعة
          </h3>
          <ul className="flex flex-col gap-3 text-[14.5px]">
            <li><Link href="/about" className="text-white/85 hover:text-white">من نحن</Link></li>
            <li><Link href="/services" className="text-white/85 hover:text-white">خدمات الأسنان</Link></li>
            <li><Link href="/doctors" className="text-white/85 hover:text-white">أطباؤنا</Link></li>
            <li><Link href="/blog" className="text-white/85 hover:text-white">المدونة</Link></li>
            <li><Link href="/booking" className="text-white/85 hover:text-white">احجز موعدك</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-[14px] font-semibold text-white/60 mb-4 tracking-wide">
            خدماتنا
          </h3>
          <ul className="flex flex-col gap-3 text-[14.5px]">
            {footerServiceLinks.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="text-white/85 hover:text-white">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[14px] font-semibold text-white/60 mb-4 tracking-wide">
            تواصل معنا
          </h3>
          <ul className="flex flex-col gap-3 text-[14.5px] text-white/85">
            <li>{clinic.address}</li>
            <li>
              <a href={`tel:${clinic.phoneHref}`} className="hover:text-white">
                {clinic.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${clinic.email}`} className="hover:text-white">
                {clinic.email}
              </a>
            </li>
            <li>{clinic.openingHoursNote}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-white/60">
          <p>© {new Date().getFullYear()} عيادات مولر لطب الأسنان. جميع الحقوق محفوظة.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-white">سياسة الخصوصية</Link>
            <Link href="/terms" className="hover:text-white">الشروط والأحكام</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
