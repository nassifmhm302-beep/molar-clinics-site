import type { Metadata } from "next";
import { clinic } from "@/content/clinic";

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
  description: "سياسة الخصوصية لموقع عيادات مولر لطب الأسنان.",
};

export default function PrivacyPage() {
  return (
    <div className="container-page py-16 md:py-20 max-w-3xl">
      <h1 className="text-[26px] font-bold text-[var(--color-heading)]">سياسة الخصوصية</h1>
      <p className="mt-4 text-[14px] text-[var(--color-muted)]">
        آخر تحديث: {new Date().toLocaleDateString("ar-SA")}
      </p>

      <div className="mt-8 flex flex-col gap-7 text-[15px] leading-[1.9] text-[var(--color-body)]">
        <section>
          <h2 className="text-[17px] font-bold text-[var(--color-heading)] mb-2">البيانات التي نجمعها</h2>
          <p>
            عند إرسال طلب حجز موعد أو التواصل معنا عبر نموذج الموقع، نقوم بجمع البيانات التي
            تزودنا بها مباشرة فقط، مثل الاسم الكامل، رقم الجوال، البريد الإلكتروني (إن تم إدخاله)،
            والخدمة أو الملاحظات المتعلقة بطلبك.
          </p>
        </section>

        <section>
          <h2 className="text-[17px] font-bold text-[var(--color-heading)] mb-2">الغرض من جمع البيانات</h2>
          <p>
            تُستخدم بياناتك حصرًا لغرض التواصل معك لتأكيد موعدك أو الرد على استفسارك، ولا تتم
            مشاركتها مع أي طرف ثالث لأغراض تسويقية دون موافقتك الصريحة.
          </p>
        </section>

        <section>
          <h2 className="text-[17px] font-bold text-[var(--color-heading)] mb-2">حماية البيانات</h2>
          <p>
            نتبع ممارسات تقنية وتنظيمية مناسبة لحماية بياناتك من الوصول غير المصرح به، بما يتوافق
            مع متطلبات نظام حماية البيانات الشخصية في المملكة العربية السعودية حيثما انطبق ذلك.
          </p>
        </section>

        <section>
          <h2 className="text-[17px] font-bold text-[var(--color-heading)] mb-2">الاحتفاظ بالبيانات</h2>
          <p>
            نحتفظ ببيانات طلبات الحجز والتواصل للمدة اللازمة لمعالجة طلبك ومتابعته فقط، ويمكنك
            طلب حذف بياناتك بالتواصل معنا مباشرة عبر البريد الإلكتروني {clinic.email}.
          </p>
        </section>

        <section>
          <h2 className="text-[17px] font-bold text-[var(--color-heading)] mb-2">التواصل بخصوص الخصوصية</h2>
          <p>
            لأي استفسار يتعلق بخصوصية بياناتك، يُرجى التواصل معنا عبر البريد الإلكتروني{" "}
            {clinic.email} أو عبر الهاتف {clinic.phoneDisplay}.
          </p>
        </section>
      </div>
    </div>
  );
}
