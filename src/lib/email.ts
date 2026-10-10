import { clinic } from "@/content/clinic";

type BookingEmailPayload = {
  publicReference: string;
  serviceName: string;
  doctorName?: string | null;
  branchName?: string | null;
  requestedDate: string;
  requestedTimePeriod: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string | null;
  customerNotes?: string | null;
  status: string;
};

function renderBookingEmailHtml(payload: BookingEmailPayload) {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 14px;color:#718096;font-size:13px;white-space:nowrap;">${label}</td>
      <td style="padding:10px 14px;color:#172b45;font-size:14px;font-weight:600;">${value}</td>
    </tr>`;

  return `
  <div style="background:#F4F8FD;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;direction:rtl;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #E5ECF4;">
      <div style="background:#174A8B;padding:24px 28px;">
        <p style="margin:0;color:#ffffff;font-size:12px;letter-spacing:1px;">MOLAR CLINICS</p>
        <h1 style="margin:6px 0 0;color:#ffffff;font-size:20px;">طلب موعد جديد</h1>
      </div>
      <div style="padding:20px 24px;">
        <p style="color:#39485B;font-size:14px;line-height:1.7;margin:0 0 16px;">
          تم استلام طلب حجز جديد عبر موقع عيادات مولر لطب الأسنان. الرجاء التواصل مع المريض لتأكيد تفاصيل الموعد.
        </p>
        <table style="width:100%;border-collapse:collapse;background:#F4F8FD;border-radius:12px;overflow:hidden;">
          ${row("رقم الطلب", payload.publicReference)}
          ${row("الحالة", payload.status)}
          ${row("الخدمة", payload.serviceName)}
          ${payload.doctorName ? row("الطبيب", payload.doctorName) : ""}
          ${payload.branchName ? row("الموقع", payload.branchName) : ""}
          ${row("التاريخ المفضل", payload.requestedDate)}
          ${row("الوقت المفضل", payload.requestedTimePeriod)}
          ${row("اسم المراجع", payload.customerName)}
          ${row("رقم الجوال", payload.customerPhone)}
          ${payload.customerEmail ? row("البريد الإلكتروني", payload.customerEmail) : ""}
          ${payload.customerNotes ? row("ملاحظات", payload.customerNotes) : ""}
        </table>
      </div>
      <div style="padding:16px 24px;background:#EAF3FC;">
        <p style="margin:0;color:#174A8B;font-size:12px;">عيادات مولر لطب الأسنان — ${clinic.address}</p>
      </div>
    </div>
  </div>`;
}

/**
 * Attempts to send a booking notification email to the clinic inbox.
 * Uses the Resend API when EMAIL_API_KEY + CLINIC_EMAIL are configured.
 * Returns a status string without throwing, so a failed notification never
 * blocks a successfully persisted booking.
 */
export async function sendBookingNotificationEmail(
  payload: BookingEmailPayload
): Promise<"sent" | "failed" | "skipped"> {
  const apiKey = process.env.EMAIL_API_KEY;
  const clinicEmail = process.env.CLINIC_EMAIL || clinic.email;

  if (!apiKey || !clinicEmail) {
    return "skipped";
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Molar Clinics <bookings@molar.clinic>",
        to: [clinicEmail],
        subject: `طلب موعد جديد — ${payload.publicReference}`,
        html: renderBookingEmailHtml(payload),
      }),
    });

    if (!response.ok) {
      return "failed";
    }
    return "sent";
  } catch {
    return "failed";
  }
}
