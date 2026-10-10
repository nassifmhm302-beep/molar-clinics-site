import { z } from "zod";

// Accepts Saudi local format (05XXXXXXXX) or international (+9665XXXXXXXX / 9665XXXXXXXX)
// while remaining permissive enough for legitimate international patients.
const phoneRegex = /^(\+?\d{1,3}[\s-]?)?0?5\d{8}$|^\+?\d{8,15}$/;

export const bookingSchema = z.object({
  serviceId: z.string().uuid({ message: "يرجى اختيار الخدمة المطلوبة." }),
  doctorId: z.string().uuid().nullable().optional(),
  branchId: z.string().uuid({ message: "يرجى اختيار الموقع." }),
  requestedDate: z
    .string()
    .min(1, { message: "يرجى اختيار التاريخ المفضل." }),
  requestedTimePeriod: z.string().min(1, { message: "يرجى اختيار الوقت المفضل." }),
  customerName: z
    .string()
    .trim()
    .min(3, { message: "يرجى إدخال الاسم الكامل." })
    .max(120),
  customerPhone: z
    .string()
    .trim()
    .regex(phoneRegex, { message: "يرجى إدخال رقم جوال صحيح." }),
  customerEmail: z
    .union([z.string().trim().email({ message: "يرجى إدخال بريد إلكتروني صحيح." }), z.literal("")])
    .optional(),
  customerNotes: z.string().trim().max(600).optional(),
  privacyConsent: z.literal(true, {
    message: "يرجى الموافقة على سياسة الخصوصية لإتمام الحجز.",
  }),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export const contactSchema = z.object({
  fullName: z.string().trim().min(3, { message: "يرجى إدخال الاسم الكامل." }).max(120),
  phone: z.string().trim().regex(phoneRegex, { message: "يرجى إدخال رقم جوال صحيح." }),
  email: z
    .union([z.string().trim().email({ message: "يرجى إدخال بريد إلكتروني صحيح." }), z.literal("")])
    .optional(),
  subject: z.string().trim().max(150).optional(),
  message: z.string().trim().min(10, { message: "يرجى كتابة رسالة لا تقل عن 10 أحرف." }).max(1500),
});

export type ContactInput = z.infer<typeof contactSchema>;
