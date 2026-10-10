import type { Metadata } from "next";
import type { ReactNode } from "react";
import { IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { clinic } from "@/content/clinic";

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-arabic",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(clinic.siteUrl),
  title: {
    default: "عيادات مولر لطب الأسنان | Molar Clinics",
    template: "%s | عيادات مولر لطب الأسنان",
  },
  description:
    "عيادات مولر لطب الأسنان في ظهرة لبن، الرياض — رعاية متكاملة لصحة أسنانك، من زراعة الأسنان وتقويمها إلى العناية الوقائية والتجميلية، مع إمكانية إرسال طلب حجز الموعد مباشرة عبر الموقع.",
  keywords: [
    "عيادات مولر",
    "عيادة أسنان الرياض",
    "زراعة الأسنان",
    "تقويم الأسنان",
    "تبييض الأسنان",
    "ظهرة لبن",
    "Molar Clinics",
  ],
  openGraph: {
    title: "عيادات مولر لطب الأسنان | Molar Clinics",
    description: "رعاية متكاملة لصحة أسنانك في عيادات مولر لطب الأسنان، ظهرة لبن - الرياض.",
    url: clinic.siteUrl,
    siteName: "Molar Clinics",
    locale: "ar_SA",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: clinic.brandNameAr,
  telephone: clinic.phoneHref,
  email: clinic.email,
  url: clinic.siteUrl,
  address: {
    "@type": "PostalAddress",
    streetAddress: clinic.address,
    addressLocality: "الرياض",
    addressCountry: "SA",
  },
  sameAs: [clinic.instagramLink, clinic.facebookLink, clinic.twitterLink, clinic.snapchatLink],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${ibmPlexArabic.variable} ${inter.variable}`}>
      <body className="bg-white text-[var(--color-body)] antialiased font-sans">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:right-3 focus:z-[100] focus:rounded-full focus:bg-[var(--color-primary)] focus:px-4 focus:py-2 focus:text-white"
        >
          تخطي إلى المحتوى الرئيسي
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
