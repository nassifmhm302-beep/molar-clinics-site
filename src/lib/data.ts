import { staticData, type StaticArticle, type StaticDoctor, type StaticFaq, type StaticService } from "@/lib/static-data.generated";

export async function getPrimaryBranch() { return staticData.branch; }
export async function getOpeningHours(branchId: string) { return staticData.hours.filter((row) => row.branchId === branchId); }
export async function getAllServices(): Promise<StaticService[]> { return [...staticData.services].sort((a, b) => a.sortOrder - b.sortOrder); }
export async function getFeaturedServices(): Promise<StaticService[]> { return staticData.services.filter((service) => service.isFeatured).sort((a, b) => a.sortOrder - b.sortOrder); }
export async function getServiceBySlug(slug: string) { return (staticData.services as unknown as StaticService[]).find((service) => service.slug === slug) ?? null; }
export async function getAllDoctors(): Promise<StaticDoctor[]> { return staticData.doctors.filter((doctor) => doctor.isActive).sort((a, b) => a.sortOrder - b.sortOrder); }
export async function getDoctorBySlug(slug: string) { return (staticData.doctors as unknown as StaticDoctor[]).find((doctor) => doctor.slug === slug) ?? null; }
export async function getDoctorsForService(serviceId: string) { const ids = new Set(staticData.links.filter((link) => link.serviceId === serviceId).map((link) => link.doctorId)); return staticData.doctors.filter((doctor) => ids.has(doctor.id) && doctor.isActive); }
export async function getServicesForDoctor(doctorId: string) { const ids = new Set(staticData.links.filter((link) => link.doctorId === doctorId).map((link) => link.serviceId)); return staticData.services.filter((service) => ids.has(service.id)); }
export async function getDoctorServiceLinks() { return staticData.links; }
export async function getFaqsForService(serviceId: string): Promise<StaticFaq[]> { return staticData.faqs.filter((faq) => faq.serviceId === serviceId).sort((a, b) => a.sortOrder - b.sortOrder); }
export async function getGeneralFaqs(): Promise<StaticFaq[]> { return staticData.faqs.filter((faq) => faq.serviceId === null).sort((a, b) => a.sortOrder - b.sortOrder); }
export async function getAllFaqs(): Promise<StaticFaq[]> { return [...staticData.faqs].sort((a, b) => a.sortOrder - b.sortOrder); }
export async function getActiveOffers() { return [] as Array<{ id: string; title: string; description: string; serviceId: string | null; termsText: string | null }>; }
export async function getBlogArticles(): Promise<StaticArticle[]> { return [...staticData.articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)); }
export async function getBlogArticleBySlug(slug: string) { return (staticData.articles as unknown as StaticArticle[]).find((article) => article.slug === slug) ?? null; }
export async function getRelatedArticles(excludeSlug: string, take = 3) { return (await getBlogArticles()).filter((article) => article.slug !== excludeSlug).slice(0, take); }
