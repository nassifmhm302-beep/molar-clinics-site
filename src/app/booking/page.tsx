import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllDoctors, getAllServices, getDoctorServiceLinks, getPrimaryBranch } from "@/lib/data";
import BookingWizard from "./BookingWizard";

export const metadata: Metadata = {
  title: "احجز موعدك",
  description: "أرسل طلب حجز موعدك في عيادات مولر لطب الأسنان خطوة بخطوة.",
};


export default async function BookingPage() {
  const [services, doctors, branch, links] = await Promise.all([
    getAllServices(),
    getAllDoctors(),
    getPrimaryBranch(),
    getDoctorServiceLinks(),
  ]);

  return (
    <div className="bg-[var(--color-pale-blue)] py-12 md:py-16">
      <div className="container-page max-w-3xl">
        <Suspense fallback={<div className="rounded-[var(--radius-xl)] bg-white p-9 text-center text-[var(--color-muted)]">جاري تحميل نموذج الحجز...</div>}>
          <BookingWizard
            services={services.map((s) => ({ id: s.id, name: s.name, category: s.category }))}
            doctors={doctors.map((d) => ({ id: d.id, fullName: d.fullName, specialty: d.specialty }))}
            doctorServiceLinks={links.map((l) => ({ doctorId: l.doctorId, serviceId: l.serviceId }))}
            branch={branch ? { id: branch.id, name: branch.name, addressLine: branch.addressLine } : null}
          />
        </Suspense>
      </div>
    </div>
  );
}
