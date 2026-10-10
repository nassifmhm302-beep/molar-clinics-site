import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PrimaryButton } from "@/components/ui";
import { getBlogArticleBySlug, getBlogArticles, getRelatedArticles } from "@/lib/data";


export async function generateStaticParams() {
  const items = await getBlogArticles();
  return items.map((item) => ({ slug: item.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getBlogArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getBlogArticleBySlug(slug);
  if (!article) notFound();

  const related = await getRelatedArticles(slug);
  const tags = (article.tags as unknown as unknown as string[] | null) || [];

  return (
    <article className="container-page py-16 md:py-20 max-w-3xl">
      <p className="text-[13px] font-semibold text-[var(--color-primary)]">
        {new Date(article.publishedAt).toLocaleDateString("ar-SA", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}{" "}
        · {article.readingMinutes} دقائق قراءة
      </p>
      <h1 className="mt-4 text-[clamp(1.7rem,3.6vw,2.4rem)] font-bold leading-tight text-[var(--color-heading)]">
        {article.title}
      </h1>
      {article.author && (
        <p className="mt-3 text-[13.5px] text-[var(--color-muted)]">بقلم {article.author}</p>
      )}

      {article.coverImageUrl && (
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[var(--radius-xl)]">
          <Image
            src={article.coverImageUrl}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      )}

      <div className="mt-8 text-[16px] leading-[2] text-[var(--color-body)] whitespace-pre-line">
        {article.content}
      </div>

      {tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[var(--color-soft-blue)] px-3 py-1.5 text-[12.5px] font-medium text-[var(--color-primary-dark)]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-10 rounded-2xl bg-[var(--color-pale-blue)] p-5 text-[13px] text-[var(--color-muted)]">
        هذا المقال لأغراض تثقيفية عامة ولا يُغني عن استشارة طبيب الأسنان لتقييم حالتك الفردية.
      </div>

      <div className="mt-8">
        <PrimaryButton href="/booking">احجز استشارة</PrimaryButton>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-[17px] font-bold text-[var(--color-heading)] mb-5">مقالات ذات صلة</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((a) => (
              <Link
                key={a.id}
                href={`/blog/${a.slug}`}
                className="rounded-2xl border border-[var(--color-border)] p-4 hover:border-[var(--color-primary)]"
              >
                <p className="text-[14px] font-semibold text-[var(--color-heading)] leading-snug">
                  {a.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
