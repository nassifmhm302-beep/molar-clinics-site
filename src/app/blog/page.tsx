import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { SectionHeading, EmptyState } from "@/components/ui";
import { getBlogArticles } from "@/lib/data";

export const metadata: Metadata = {
  title: "المدونة",
  description: "مقالات تثقيفية حول صحة الأسنان والعناية اليومية من عيادات مولر لطب الأسنان.",
};


export default async function BlogPage() {
  const articles = await getBlogArticles();

  return (
    <div className="container-page py-16 md:py-20">
      <SectionHeading
        eyebrow="المدونة"
        title="مدونة العناية بصحة الأسنان"
        description="محتوى تثقيفي عام لمساعدتك على فهم صحة أسنانك بشكل أفضل. لا يُغني هذا المحتوى عن استشارة طبيب الأسنان."
      />

      {articles.length === 0 ? (
        <div className="mt-10">
          <EmptyState title="لا توجد مقالات منشورة حاليًا" />
        </div>
      ) : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.slug}`}
              className="group flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white hover:shadow-[0_18px_40px_rgba(23,43,69,0.09)] transition-shadow"
            >
              <div className="relative h-48 w-full overflow-hidden bg-[var(--color-soft-blue)]">
                {article.coverImageUrl && (
                  <Image
                    src={article.coverImageUrl}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <span className="text-[12px] text-[var(--color-muted)]">
                  {article.readingMinutes} دقائق قراءة
                </span>
                <h3 className="text-[16.5px] font-bold text-[var(--color-heading)] leading-snug">
                  {article.title}
                </h3>
                <p className="text-[13.5px] leading-relaxed text-[var(--color-muted)] line-clamp-3">
                  {article.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
