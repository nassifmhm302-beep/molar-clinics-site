import Link from "next/link";
import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "start" | "center";
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className="text-[13px] font-semibold tracking-[0.08em] text-[var(--color-primary)] mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-[clamp(1.6rem,3.2vw,2.3rem)] font-bold leading-tight text-[var(--color-heading)]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-[15.5px] leading-[1.9] text-[var(--color-muted)]">{description}</p>
      )}
    </div>
  );
}

export function PrimaryButton({
  href,
  children,
  variant = "solid",
  className = "",
  type,
}: {
  href?: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost";
  className?: string;
  type?: "button" | "submit";
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold transition-all active:scale-[0.98]";
  const styles =
    variant === "solid"
      ? "bg-[var(--color-primary)] text-white shadow-[0_10px_24px_rgba(36,107,206,0.25)] hover:bg-[var(--color-primary-dark)]"
      : variant === "outline"
        ? "border border-[var(--color-border)] text-[var(--color-heading)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
        : "text-[var(--color-primary)] hover:bg-[var(--color-soft-blue)]";

  if (href) {
    return (
      <Link href={href} className={`${base} ${styles} ${className}`}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type || "button"} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );
}

export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-[var(--color-border)] bg-[var(--color-pale-blue)] px-6 py-14 text-center">
      <h3 className="text-[17px] font-semibold text-[var(--color-heading)]">{title}</h3>
      {description && <p className="mt-2 text-[14px] text-[var(--color-muted)]">{description}</p>}
    </div>
  );
}

export function LoadingState({ label = "جاري التحميل..." }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-10 text-[var(--color-muted)]" role="status">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-primary)]" />
      <span className="text-[14px]">{label}</span>
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-[14px] text-red-700"
    >
      {message}
    </div>
  );
}

export function DoctorAvatar({ name, size = 88 }: { name: string; size?: number }) {
  const initials = name
    .replace(/^د\.\s*/, "")
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("");

  return (
    <div
      style={{ width: size, height: size }}
      className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white font-bold"
    >
      <span style={{ fontSize: size * 0.34 }}>{initials}</span>
    </div>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[var(--color-soft-blue)] px-3.5 py-1.5 text-[12.5px] font-semibold text-[var(--color-primary-dark)]">
      {children}
    </span>
  );
}
