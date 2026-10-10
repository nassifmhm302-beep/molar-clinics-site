"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import { clinic } from "@/content/clinic";

type Service = { id: string; name: string; category: string };
type Doctor = { id: string; fullName: string; specialty: string };
type Branch = { id: string; name: string; addressLine: string } | null;

const STEP_LABELS = [
  "الخدمة",
  "الطبيب",
  "التاريخ والوقت",
  "بياناتك",
  "المراجعة",
];

const TIME_PERIODS = [
  { value: "morning", label: "صباحًا" },
  { value: "afternoon", label: "ظهرًا" },
  { value: "evening", label: "مساءً" },
];

function todayIso() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

export default function BookingWizard({
  services,
  doctors,
  doctorServiceLinks,
  branch,
}: {
  services: Service[];
  doctors: Doctor[];
  doctorServiceLinks: { doctorId: string; serviceId: string }[];
  branch: Branch;
}) {
  const searchParams = useSearchParams();

  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState<string>(searchParams.get("service") || "");
  const [doctorId, setDoctorId] = useState<string>(searchParams.get("doctor") || "");
  const [requestedDate, setRequestedDate] = useState<string>("");
  const [requestedTimePeriod, setRequestedTimePeriod] = useState<string>("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");
  const [privacyConsent, setPrivacyConsent] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<
    | { ok: true; publicReference: string; status: string; serviceName: string; doctorName: string | null }
    | { ok: false; message: string }
    | null
  >(null);

  const selectedService = services.find((s) => s.id === serviceId) || null;
  const selectedDoctor = doctors.find((d) => d.id === doctorId) || null;

  const availableDoctors = useMemo(() => {
    if (!serviceId) return doctors;
    const ids = new Set(
      doctorServiceLinks.filter((l) => l.serviceId === serviceId).map((l) => l.doctorId)
    );
    const filtered = doctors.filter((d) => ids.has(d.id));
    return filtered.length > 0 ? filtered : doctors;
  }, [serviceId, doctors, doctorServiceLinks]);

  function validateStep(current: number): boolean {
    const newErrors: Record<string, string> = {};
    if (current === 0 && !serviceId) {
      newErrors.serviceId = "يرجى اختيار الخدمة المطلوبة.";
    }
    if (current === 2) {
      if (!requestedDate) newErrors.requestedDate = "يرجى اختيار التاريخ المفضل.";
      if (!requestedTimePeriod) newErrors.requestedTimePeriod = "يرجى اختيار الوقت المفضل.";
    }
    if (current === 3) {
      if (customerName.trim().length < 3) newErrors.customerName = "يرجى إدخال الاسم الكامل.";
      if (!/^(\+?\d{1,3}[\s-]?)?0?5\d{8}$|^\+?\d{8,15}$/.test(customerPhone.trim())) {
        newErrors.customerPhone = "يرجى إدخال رقم جوال صحيح.";
      }
      if (customerEmail && !/^\S+@\S+\.\S+$/.test(customerEmail.trim())) {
        newErrors.customerEmail = "يرجى إدخال بريد إلكتروني صحيح.";
      }
      if (!privacyConsent) newErrors.privacyConsent = "يرجى الموافقة على سياسة الخصوصية.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function goNext() {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(s + 1, STEP_LABELS.length - 1));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit() {
    if (!validateStep(3)) return;
    if (!branch) {
      setResult({ ok: false, message: "تعذّر تحديد موقع العيادة. يرجى التواصل معنا مباشرة." });
      return;
    }
    setSubmitting(true);
    setResult(null);
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId,
          doctorId: doctorId || null,
          branchId: branch.id,
          requestedDate,
          requestedTimePeriod,
          customerName,
          customerPhone,
          customerEmail,
          customerNotes,
          privacyConsent,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        setResult({ ok: false, message: data.message || "حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى." });
      } else {
        setResult({
          ok: true,
          publicReference: data.booking.publicReference,
          status: data.booking.status,
          serviceName: data.booking.serviceName,
          doctorName: data.booking.doctorName,
        });
        setStep(STEP_LABELS.length);
      }
    } catch {
      setResult({ ok: false, message: "تعذّر الاتصال بالخادم. يرجى التحقق من الاتصال والمحاولة مرة أخرى." });
    } finally {
      setSubmitting(false);
    }
  }

  if (result?.ok) {
    return (
      <div className="rounded-[var(--radius-xl)] bg-white p-8 md:p-10 text-center shadow-[0_20px_50px_rgba(23,43,69,0.08)]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-soft-blue)] text-[var(--color-primary)] text-3xl">
          ✓
        </div>
        <h1 className="mt-6 text-[22px] font-bold text-[var(--color-heading)]">
          تم إرسال طلب الموعد بنجاح
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-muted)]">
          شكرًا لاختيارك Molar Clinics. تم استلام طلبك، وسيتم التواصل معك لتأكيد تفاصيل الموعد.
        </p>

        <div className="mt-7 grid gap-3 rounded-2xl bg-[var(--color-pale-blue)] p-5 text-start text-[14px]">
          <div className="flex justify-between">
            <span className="text-[var(--color-muted)]">رقم الطلب</span>
            <span className="font-bold text-[var(--color-heading)]">{result.publicReference}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--color-muted)]">الخدمة</span>
            <span className="font-semibold text-[var(--color-heading)]">{result.serviceName}</span>
          </div>
          {result.doctorName && (
            <div className="flex justify-between">
              <span className="text-[var(--color-muted)]">الطبيب</span>
              <span className="font-semibold text-[var(--color-heading)]">{result.doctorName}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-[var(--color-muted)]">الحالة</span>
            <span className="font-semibold text-[var(--color-primary)]">قيد المراجعة — بانتظار تأكيد العيادة</span>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-full bg-[var(--color-primary)] px-6 py-3 text-[14.5px] font-semibold text-white"
          >
            العودة للصفحة الرئيسية
          </Link>
          <WhatsAppCTA reference={result.publicReference} label="متابعة الطلب عبر واتساب" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[var(--radius-xl)] bg-white p-6 md:p-9 shadow-[0_20px_50px_rgba(23,43,69,0.08)]">
      <h1 className="text-[22px] font-bold text-[var(--color-heading)]">احجز موعدك</h1>
      <p className="mt-2 text-[14px] text-[var(--color-muted)]">
        إرسال هذا النموذج يعني تقديم طلب حجز، وسيتواصل معك فريق العيادة لتأكيد الموعد النهائي.
      </p>

      {/* Progress */}
      <ol className="mt-7 flex items-center gap-2" aria-label="خطوات الحجز">
        {STEP_LABELS.map((label, i) => (
          <li key={label} className="flex flex-1 flex-col items-center gap-2">
            <div
              className={`h-1.5 w-full rounded-full ${
                i <= step ? "bg-[var(--color-primary)]" : "bg-[var(--color-border)]"
              }`}
            />
            <span
              className={`hidden sm:block text-[11.5px] ${
                i === step ? "font-semibold text-[var(--color-heading)]" : "text-[var(--color-muted)]"
              }`}
            >
              {label}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-8">
        {step === 0 && (
          <fieldset>
            <legend className="text-[15px] font-semibold text-[var(--color-heading)] mb-4">
              ما الخدمة التي ترغب في حجزها؟
            </legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {services.map((s) => (
                <label
                  key={s.id}
                  className={`cursor-pointer rounded-2xl border p-4 text-[14px] transition-colors ${
                    serviceId === s.id
                      ? "border-[var(--color-primary)] bg-[var(--color-soft-blue)]"
                      : "border-[var(--color-border)] hover:border-[var(--color-primary)]/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="service"
                    value={s.id}
                    checked={serviceId === s.id}
                    onChange={() => setServiceId(s.id)}
                    className="sr-only"
                  />
                  <span className="block font-semibold text-[var(--color-heading)]">{s.name}</span>
                  <span className="block mt-1 text-[12px] text-[var(--color-muted)]">{s.category}</span>
                </label>
              ))}
            </div>
            {errors.serviceId && <p className="mt-3 text-[13px] text-red-600">{errors.serviceId}</p>}
          </fieldset>
        )}

        {step === 1 && (
          <fieldset>
            <legend className="text-[15px] font-semibold text-[var(--color-heading)] mb-4">
              اختر الطبيب المفضل (اختياري)
            </legend>
            <div className="grid gap-3 sm:grid-cols-2">
              <label
                className={`cursor-pointer rounded-2xl border p-4 text-[14px] transition-colors ${
                  doctorId === ""
                    ? "border-[var(--color-primary)] bg-[var(--color-soft-blue)]"
                    : "border-[var(--color-border)] hover:border-[var(--color-primary)]/50"
                }`}
              >
                <input
                  type="radio"
                  name="doctor"
                  value=""
                  checked={doctorId === ""}
                  onChange={() => setDoctorId("")}
                  className="sr-only"
                />
                <span className="block font-semibold text-[var(--color-heading)]">
                  لا يوجد تفضيل لطبيب محدد
                </span>
                <span className="block mt-1 text-[12px] text-[var(--color-muted)]">
                  سيتم تحديد الطبيب المناسب من قبل العيادة
                </span>
              </label>
              {availableDoctors.map((d) => (
                <label
                  key={d.id}
                  className={`cursor-pointer rounded-2xl border p-4 text-[14px] transition-colors ${
                    doctorId === d.id
                      ? "border-[var(--color-primary)] bg-[var(--color-soft-blue)]"
                      : "border-[var(--color-border)] hover:border-[var(--color-primary)]/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="doctor"
                    value={d.id}
                    checked={doctorId === d.id}
                    onChange={() => setDoctorId(d.id)}
                    className="sr-only"
                  />
                  <span className="block font-semibold text-[var(--color-heading)]">{d.fullName}</span>
                  <span className="block mt-1 text-[12px] text-[var(--color-muted)]">{d.specialty}</span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-6">
            {branch && (
              <div className="rounded-2xl bg-[var(--color-pale-blue)] p-4 text-[13.5px] text-[var(--color-body)]">
                <span className="font-semibold text-[var(--color-heading)]">موقع الموعد: </span>
                {branch.addressLine}
              </div>
            )}
            <div>
              <label htmlFor="requestedDate" className="block text-[14.5px] font-semibold text-[var(--color-heading)] mb-2">
                التاريخ المفضل
              </label>
              <input
                id="requestedDate"
                type="date"
                min={todayIso()}
                value={requestedDate}
                onChange={(e) => setRequestedDate(e.target.value)}
                className="w-full rounded-xl border border-[var(--color-border)] px-4 py-3 text-[14.5px] focus:border-[var(--color-primary)]"
              />
              {errors.requestedDate && <p className="mt-2 text-[13px] text-red-600">{errors.requestedDate}</p>}
            </div>

            <div>
              <span className="block text-[14.5px] font-semibold text-[var(--color-heading)] mb-2">
                الوقت المفضل للتواصل أو الموعد
              </span>
              <div className="grid grid-cols-3 gap-3">
                {TIME_PERIODS.map((t) => (
                  <label
                    key={t.value}
                    className={`cursor-pointer rounded-xl border p-3 text-center text-[13.5px] font-semibold transition-colors ${
                      requestedTimePeriod === t.value
                        ? "border-[var(--color-primary)] bg-[var(--color-soft-blue)] text-[var(--color-primary-dark)]"
                        : "border-[var(--color-border)] text-[var(--color-body)]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="timePeriod"
                      value={t.value}
                      checked={requestedTimePeriod === t.value}
                      onChange={() => setRequestedTimePeriod(t.value)}
                      className="sr-only"
                    />
                    {t.label}
                  </label>
                ))}
              </div>
              {errors.requestedTimePeriod && <p className="mt-2 text-[13px] text-red-600">{errors.requestedTimePeriod}</p>}
            </div>

            <p className="text-[12.5px] text-[var(--color-muted)]">
              هذا التاريخ والوقت هو طلب موعد مفضل، وسيتم تأكيد الموعد النهائي بعد تواصل العيادة معك.
            </p>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-5">
            <div>
              <label htmlFor="customerName" className="block text-[14.5px] font-semibold text-[var(--color-heading)] mb-2">
                الاسم الكامل
              </label>
              <input
                id="customerName"
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full rounded-xl border border-[var(--color-border)] px-4 py-3 text-[14.5px] focus:border-[var(--color-primary)]"
              />
              {errors.customerName && <p className="mt-2 text-[13px] text-red-600">{errors.customerName}</p>}
            </div>
            <div>
              <label htmlFor="customerPhone" className="block text-[14.5px] font-semibold text-[var(--color-heading)] mb-2">
                رقم الجوال
              </label>
              <input
                id="customerPhone"
                type="tel"
                dir="ltr"
                placeholder="05xxxxxxxx"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full rounded-xl border border-[var(--color-border)] px-4 py-3 text-[14.5px] text-start focus:border-[var(--color-primary)]"
              />
              {errors.customerPhone && <p className="mt-2 text-[13px] text-red-600">{errors.customerPhone}</p>}
            </div>
            <div>
              <label htmlFor="customerEmail" className="block text-[14.5px] font-semibold text-[var(--color-heading)] mb-2">
                البريد الإلكتروني (اختياري)
              </label>
              <input
                id="customerEmail"
                type="email"
                dir="ltr"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full rounded-xl border border-[var(--color-border)] px-4 py-3 text-[14.5px] text-start focus:border-[var(--color-primary)]"
              />
              {errors.customerEmail && <p className="mt-2 text-[13px] text-red-600">{errors.customerEmail}</p>}
            </div>
            <div>
              <label htmlFor="customerNotes" className="block text-[14.5px] font-semibold text-[var(--color-heading)] mb-2">
                ملاحظات إضافية (اختياري)
              </label>
              <textarea
                id="customerNotes"
                rows={3}
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                className="w-full rounded-xl border border-[var(--color-border)] px-4 py-3 text-[14.5px] focus:border-[var(--color-primary)]"
              />
            </div>
            <label className="flex items-start gap-3 text-[13px] text-[var(--color-muted)]">
              <input
                type="checkbox"
                checked={privacyConsent}
                onChange={(e) => setPrivacyConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-[var(--color-border)]"
              />
              أوافق على مشاركة بياناتي مع عيادات مولر لطب الأسنان لغرض التواصل وتأكيد الموعد، وفق{" "}
              <Link href="/privacy" className="text-[var(--color-primary)] underline">
                سياسة الخصوصية
              </Link>
              .
            </label>
            {errors.privacyConsent && <p className="text-[13px] text-red-600">{errors.privacyConsent}</p>}
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col gap-5">
            <h2 className="text-[16px] font-bold text-[var(--color-heading)]">مراجعة طلب الحجز</h2>
            <dl className="grid gap-3 rounded-2xl bg-[var(--color-pale-blue)] p-5 text-[14px]">
              {[
                ["الخدمة", selectedService?.name || "—"],
                ["الطبيب", selectedDoctor?.fullName || "لا يوجد تفضيل لطبيب محدد"],
                ["الموقع", branch?.addressLine || "—"],
                ["التاريخ المفضل", requestedDate || "—"],
                ["الوقت المفضل", TIME_PERIODS.find((t) => t.value === requestedTimePeriod)?.label || "—"],
                ["الاسم", customerName],
                ["الجوال", customerPhone],
                ["البريد الإلكتروني", customerEmail || "—"],
                ["ملاحظات", customerNotes || "—"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4">
                  <dt className="text-[var(--color-muted)]">{label}</dt>
                  <dd className="font-semibold text-[var(--color-heading)] text-end">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="text-[12.5px] text-[var(--color-muted)]">
              بالضغط على &quot;إرسال طلب الموعد&quot; أنت ترسل طلب حجز إلى العيادة، وليس تأكيدًا نهائيًا
              للموعد. سيتواصل معك فريق {clinic.brandNameAr} لتأكيد التفاصيل.
            </p>
            {result && !result.ok && (
              <p role="alert" className="text-[13.5px] text-red-600">
                {result.message}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="mt-9 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 0}
          className="rounded-full px-5 py-3 text-[14px] font-semibold text-[var(--color-body)] disabled:opacity-0"
        >
          السابق
        </button>
        {step < 4 ? (
          <button
            type="button"
            onClick={goNext}
            className="rounded-full bg-[var(--color-primary)] px-7 py-3 text-[14.5px] font-semibold text-white"
          >
            التالي
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="rounded-full bg-[var(--color-primary)] px-7 py-3 text-[14.5px] font-semibold text-white disabled:opacity-60"
          >
            {submitting ? "جاري الإرسال..." : "إرسال طلب الموعد"}
          </button>
        )}
      </div>
    </div>
  );
}
