import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الشروط والأحكام",
  description: "الشروط والأحكام الخاصة باستخدام موقع عيادات مولر لطب الأسنان.",
};

export default function TermsPage() {
  return (
    <div className="container-page py-16 md:py-20 max-w-3xl">
      <h1 className="text-[26px] font-bold text-[var(--color-heading)]">الشروط والأحكام</h1>
      <p className="mt-4 text-[14px] text-[var(--color-muted)]">
        آخر تحديث: {new Date().toLocaleDateString("ar-SA")}
      </p>

      <div className="mt-8 flex flex-col gap-7 text-[15px] leading-[1.9] text-[var(--color-body)]">
        <section>
          <h2 className="text-[17px] font-bold text-[var(--color-heading)] mb-2">طبيعة طلبات الحجز</h2>
          <p>
            يُعد إرسال نموذج حجز الموعد عبر الموقع بمثابة &quot;طلب&quot; موعد وليس تأكيدًا نهائيًا. يتم
            تأكيد تفاصيل الموعد النهائية بعد تواصل فريق العيادة مع مقدّم الطلب.
          </p>
        </section>

        <section>
          <h2 className="text-[17px] font-bold text-[var(--color-heading)] mb-2">المحتوى الطبي</h2>
          <p>
            المحتوى التثقيفي المنشور على الموقع، بما في ذلك المدونة وصفحات الخدمات، هو محتوى عام
            لأغراض التوعية فقط، ولا يُغني عن الفحص والتشخيص المباشر من قبل طبيب مختص، ولا يجب
            اعتباره توصية علاجية فردية.
          </p>
        </section>

        <section>
          <h2 className="text-[17px] font-bold text-[var(--color-heading)] mb-2">الأسعار والعروض</h2>
          <p>
            لا يعرض الموقع أسعارًا إلا إذا كانت منشورة رسميًا من قبل العيادة مع تحديد فترة
            سريانها. للاستفسار عن تكلفة أي علاج، يرجى التواصل مع العيادة مباشرة.
          </p>
        </section>

        <section>
          <h2 className="text-[17px] font-bold text-[var(--color-heading)] mb-2">التعديلات</h2>
          <p>
            تحتفظ عيادات مولر لطب الأسنان بحق تحديث هذه الشروط والأحكام في أي وقت، وسيتم نشر أي
            تحديثات على هذه الصفحة.
          </p>
        </section>
      </div>
    </div>
  );
}
