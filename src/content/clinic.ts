// ---------------------------------------------------------------------------
// Verified Molar Clinics business information.
//
// Sources (publicly available, verified at build time):
// - Official Instagram: https://www.instagram.com/molar_clinics/
// - Official website: https://molar.clinic/
// - Official Snapchat / X (Twitter): @molar_clinics
// - Official Facebook: https://www.facebook.com/molar.clinics/
//
// Values below reflect what could be verified from those public sources.
// Anything that could not be verified (prices, exact doctor credentials,
// awards, patient counts, etc.) is intentionally left out rather than
// invented. Contact details may be overridden via environment variables
// without touching this file.
// ---------------------------------------------------------------------------

export const clinic = {
  brandNameAr: "عيادات مولر لطب الأسنان",
  brandNameEn: "Molar Clinics",
  tagline: "تجدنا حينما تبحث عن ابتسامة مختلفة",
  legalCity: "الرياض، المملكة العربية السعودية",
  address: "٦٨٨٢ الشفا، حي ظهرة لبن، الرياض ١٣٧٨٤، المملكة العربية السعودية",
  neighbourhood: "ظهرة لبن",
  phoneDisplay: "٠٥٧ ٠٧٠ ٧٠٢٩",
  phoneHref: "+966570707029",
  email: "info@molar.clinic",
  whatsappLink: process.env.WHATSAPP_LINK || "https://wa.link/jvlpgr",
  whatsappNumber: process.env.WHATSAPP_NUMBER || "+966570707029",
  instagramLink: process.env.INSTAGRAM_LINK || "https://www.instagram.com/molar_clinics/",
  facebookLink: "https://www.facebook.com/molar.clinics/",
  snapchatLink: "https://www.snapchat.com/@molar_clinics",
  twitterLink: "https://x.com/molar_clinics",
  googleMapsUrl:
    process.env.GOOGLE_MAPS_URL ||
    "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("عيادات مولر لطب الأسنان، ظهرة لبن، الرياض"),
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  // Opening hours as published on the official clinic website (molar.clinic).
  openingHoursNote: "السبت إلى الخميس، من الساعة 2 ظهرًا حتى 10 مساءً",
  closedDayNote: "الجمعة: إجازة",
} as const;

export const whatsappMessage = (reference?: string) =>
  reference
    ? `مرحبًا، أرسلت طلب موعد عبر موقع ${clinic.brandNameEn}، ورقم الطلب هو ${reference}. أرغب في متابعة حالة الطلب.`
    : `مرحبًا، أرغب في الاستفسار عن مواعيد وخدمات ${clinic.brandNameAr}.`;

export const buildWhatsappUrl = (message: string) => {
  const base = clinic.whatsappLink;
  const encoded = encodeURIComponent(message);
  return base.includes("?") ? `${base}&text=${encoded}` : `${base}?text=${encoded}`;
};

export const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "من نحن" },
  { href: "/services", label: "خدمات الأسنان" },
  { href: "/doctors", label: "أطباؤنا" },
  { href: "/blog", label: "المدونة" },
  { href: "/location", label: "موقعنا" },
  { href: "/contact", label: "تواصل معنا" },
] as const;

export const dayNamesAr = [
  "الأحد",
  "الاثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
] as const;
