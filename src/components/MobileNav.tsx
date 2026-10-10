"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { clinic, navLinks } from "@/content/clinic";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="lg:hidden flex items-center gap-2">
      <Link
        href="/booking"
        className="rounded-full bg-[var(--color-primary)] px-4 py-2 text-[13.5px] font-semibold text-white"
      >
        احجز
      </Link>
      <button
        type="button"
        aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-white"
      >
        <span className="relative flex h-4 w-5 flex-col justify-between">
          <span
            className={`block h-[2px] w-full rounded bg-[var(--color-heading)] transition-transform ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-full rounded bg-[var(--color-heading)] transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-full rounded bg-[var(--color-heading)] transition-transform ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 top-[76px] z-40 bg-white">
          <nav
            aria-label="القائمة الرئيسية"
            className="flex h-full flex-col justify-between overflow-y-auto px-6 py-8"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-4 text-[19px] font-semibold text-[var(--color-heading)] hover:bg-[var(--color-soft-blue)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 pt-6 border-t border-[var(--color-border)]">
              <a
                href={`tel:${clinic.phoneHref}`}
                className="rounded-full border border-[var(--color-border)] py-3.5 text-center text-[15px] font-semibold text-[var(--color-heading)]"
              >
                اتصل بنا: {clinic.phoneDisplay}
              </a>
              <Link
                href="/booking"
                onClick={() => setOpen(false)}
                className="rounded-full bg-[var(--color-primary)] py-3.5 text-center text-[15px] font-semibold text-white"
              >
                احجز موعدك
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
