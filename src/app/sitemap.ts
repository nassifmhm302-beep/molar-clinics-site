export const dynamic = "force-static";
import type { MetadataRoute } from "next";
import { clinic } from "@/content/clinic";
import { getAllDoctors, getAllServices, getBlogArticles } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, doctors, articles] = await Promise.all([
    getAllServices(),
    getAllDoctors(),
    getBlogArticles(),
  ]);

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/doctors",
    "/booking",
    "/offers",
    "/location",
    "/blog",
    "/contact",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${clinic.siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${clinic.siteUrl}/services/${s.slug}`,
    lastModified: new Date(),
  }));

  const doctorRoutes = doctors.map((d) => ({
    url: `${clinic.siteUrl}/doctors/${d.slug}`,
    lastModified: new Date(),
  }));

  const articleRoutes = articles.map((a) => ({
    url: `${clinic.siteUrl}/blog/${a.slug}`,
    lastModified: a.publishedAt,
  }));

  return [...staticRoutes, ...serviceRoutes, ...doctorRoutes, ...articleRoutes];
}
