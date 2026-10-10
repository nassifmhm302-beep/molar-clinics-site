"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { clinic, navLinks } from "@/content/clinic";
import MobileNav from "./MobileNav";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-[var(--color-border)] shadow-[0_6px_24px_rgba(23,43,69,0.06)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container-page flex h-[76px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)] text-white font-bold text-lg">
            م
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-bold text-[17px] text-[var(--color-heading)]">
              عيادات مولر
            </span>
            <span className="text-[11px] tracking-wide text-[var(--color-muted)]">
              MOLAR CLINICS
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="التنقل الرئيسي">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3.5 py-2 rounded-full text-[14.5px] font-medium text-[var(--color-body)] hover:text-[var(--color-primary)] hover:bg-[var(--color-soft-blue)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${clinic.phoneHref}`}
            className="text-[14px] font-medium text-[var(--color-body)] hover:text-[var(--color-primary)] transition-colors"
          >
            {clinic.phoneDisplay}
          </a>
          <Link
            href="/booking"
            className="rounded-full bg-[var(--color-primary)] px-5 py-2.5 text-[14.5px] font-semibold text-white shadow-[0_8px_20px_rgba(36,107,206,0.25)] transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            احجز موعدك
          </Link>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
