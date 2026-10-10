import type { Metadata } from "next";
import { SectionHeading, EmptyState } from "@/components/ui";
import DoctorCard from "@/components/DoctorCard";
import { getAllDoctors } from "@/lib/data";

export const metadata: Metadata = {
  title: "أطباؤنا",
  description: "تعرّف على فريق الأطباء في عيادات مولر لطب الأسنان وتخصصاتهم.",
};


export default async function DoctorsPage() {
  const doctors = await getAllDoctors();

  return (
    <div className="container-page py-16 md:py-20">
      <SectionHeading
        eyebrow="فريقنا الطبي"
        title="أطباء عيادات مولر لطب الأسنان"
        description="نعرض هنا الأطباء الذين يمكن التحقق من بياناتهم وتخصصاتهم. يحدَّث هذا القسم كلما توفرت بيانات موثقة لأعضاء جدد."
      />

      {doctors.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            title="لا تتوفر ملفات أطباء منشورة حاليًا"
            description="يرجى التواصل مع العيادة مباشرة لمعرفة الطبيب المناسب لحالتك."
          />
        </div>
      ) : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              slug={doctor.slug}
              fullName={doctor.fullName}
              specialty={doctor.specialty}
            />
          ))}
        </div>
      )}
    </div>
  );
}
