"use client";

import { useState } from "react";

export default function ContactForm() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function validate() {
    const newErrors: Record<string, string> = {};
    if (fullName.trim().length < 3) newErrors.fullName = "يرجى إدخال الاسم الكامل.";
    if (!/^(\+?\d{1,3}[\s-]?)?0?5\d{8}$|^\+?\d{8,15}$/.test(phone.trim())) {
      newErrors.phone = "يرجى إدخال رقم جوال صحيح.";
    }
    if (email && !/^\S+@\S+\.\S+$/.test(email.trim())) {
      newErrors.email = "يرجى إدخال بريد إلكتروني صحيح.";
    }
    if (message.trim().length < 10) newErrors.message = "يرجى كتابة رسالة لا تقل عن 10 أحرف.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate() || status === "loading") return;
    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, phone, email, subject, message }),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        setErrorMessage(data.message || "حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setFullName("");
      setPhone("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch {
      setErrorMessage("تعذّر الاتصال بالخادم. يرجى المحاولة مرة أخرى.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-[var(--color-soft-blue)] p-6 text-center">
        <p className="text-[16px] font-bold text-[var(--color-heading)]">
          تم إرسال رسالتك بنجاح
        </p>
        <p className="mt-2 text-[14px] text-[var(--color-muted)]">
          شكرًا لتواصلك معنا، سيقوم فريق العيادة بالرد عليك في أقرب وقت ممكن.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div>
        <label htmlFor="fullName" className="block text-[14px] font-semibold text-[var(--color-heading)] mb-2">
          الاسم الكامل
        </label>
        <input
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full rounded-xl border border-[var(--color-border)] px-4 py-3 text-[14.5px] focus:border-[var(--color-primary)]"
        />
        {errors.fullName && <p className="mt-1.5 text-[13px] text-red-600">{errors.fullName}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="block text-[14px] font-semibold text-[var(--color-heading)] mb-2">
            رقم الجوال
          </label>
          <input
            id="phone"
            dir="ltr"
            placeholder="05xxxxxxxx"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border border-[var(--color-border)] px-4 py-3 text-[14.5px] text-start focus:border-[var(--color-primary)]"
          />
          {errors.phone && <p className="mt-1.5 text-[13px] text-red-600">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-[14px] font-semibold text-[var(--color-heading)] mb-2">
            البريد الإلكتروني (اختياري)
          </label>
          <input
            id="email"
            type="email"
            dir="ltr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-[var(--color-border)] px-4 py-3 text-[14.5px] text-start focus:border-[var(--color-primary)]"
          />
          {errors.email && <p className="mt-1.5 text-[13px] text-red-600">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-[14px] font-semibold text-[var(--color-heading)] mb-2">
          الموضوع (اختياري)
        </label>
        <input
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full rounded-xl border border-[var(--color-border)] px-4 py-3 text-[14.5px] focus:border-[var(--color-primary)]"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-[14px] font-semibold text-[var(--color-heading)] mb-2">
          رسالتك
        </label>
        <textarea
          id="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-xl border border-[var(--color-border)] px-4 py-3 text-[14.5px] focus:border-[var(--color-primary)]"
        />
        {errors.message && <p className="mt-1.5 text-[13px] text-red-600">{errors.message}</p>}
      </div>

      {status === "error" && (
        <p role="alert" className="text-[13.5px] text-red-600">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-[var(--color-primary)] px-7 py-3.5 text-[15px] font-semibold text-white disabled:opacity-60"
      >
        {status === "loading" ? "جاري الإرسال..." : "إرسال الرسالة"}
      </button>
    </form>
  );
}
