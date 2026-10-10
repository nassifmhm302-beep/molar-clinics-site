import {
  boolean,
  date,
  integer,
  jsonb,
  pgTable,
  smallint,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

// ---------------------------------------------------------------------------
// Molar Clinics — database schema
// ---------------------------------------------------------------------------

export const branches = pgTable("branches", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  addressLine: text("address_line").notNull(),
  city: text("city").notNull().default("الرياض"),
  mapsUrl: text("maps_url"),
  phone: text("phone"),
  whatsappLink: text("whatsapp_link"),
  email: text("email"),
  isPrimary: boolean("is_primary").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const openingHours = pgTable("opening_hours", {
  id: uuid("id").primaryKey().defaultRandom(),
  branchId: uuid("branch_id")
    .notNull()
    .references(() => branches.id, { onDelete: "cascade" }),
  // 0 = Sunday ... 6 = Saturday
  dayOfWeek: smallint("day_of_week").notNull(),
  isClosed: boolean("is_closed").notNull().default(false),
  opensAt: text("opens_at"),
  closesAt: text("closes_at"),
  note: text("note"),
});

export const doctors = pgTable("doctors", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  fullName: text("full_name").notNull(),
  specialty: text("specialty").notNull(),
  bio: text("bio"),
  qualifications: jsonb("qualifications").$type<string[]>().default([]),
  languages: jsonb("languages").$type<string[]>().default([]),
  photoUrl: text("photo_url"),
  branchId: uuid("branch_id").references(() => branches.id, { onDelete: "set null" }),
  isActive: boolean("is_active").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const services = pgTable("services", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  shortDescription: text("short_description").notNull(),
  longDescription: text("long_description").notNull(),
  whatToExpect: jsonb("what_to_expect").$type<string[]>().default([]),
  whoNeedsIt: jsonb("who_needs_it").$type<string[]>().default([]),
  preparationNotes: text("preparation_notes"),
  photoUrl: text("photo_url"),
  isFeatured: boolean("is_featured").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const doctorServices = pgTable("doctor_services", {
  id: uuid("id").primaryKey().defaultRandom(),
  doctorId: uuid("doctor_id")
    .notNull()
    .references(() => doctors.id, { onDelete: "cascade" }),
  serviceId: uuid("service_id")
    .notNull()
    .references(() => services.id, { onDelete: "cascade" }),
});

export const faqs = pgTable("faqs", {
  id: uuid("id").primaryKey().defaultRandom(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  serviceId: uuid("service_id").references(() => services.id, { onDelete: "cascade" }),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const offers = pgTable("offers", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  serviceId: uuid("service_id").references(() => services.id, { onDelete: "set null" }),
  validFrom: date("valid_from"),
  validUntil: date("valid_until"),
  termsText: text("terms_text"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const testimonials = pgTable("testimonials", {
  id: uuid("id").primaryKey().defaultRandom(),
  patientName: text("patient_name").notNull(),
  content: text("content").notNull(),
  serviceId: uuid("service_id").references(() => services.id, { onDelete: "set null" }),
  isVerified: boolean("is_verified").notNull().default(false),
  isPublished: boolean("is_published").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const blogArticles = pgTable("blog_articles", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  coverImageUrl: text("cover_image_url"),
  author: text("author"),
  reviewedBy: text("reviewed_by"),
  readingMinutes: integer("reading_minutes").notNull().default(4),
  tags: jsonb("tags").$type<string[]>().default([]),
  publishedAt: timestamp("published_at", { withTimezone: true }).notNull().defaultNow(),
});

export const customers = pgTable("customers", {
  id: uuid("id").primaryKey().defaultRandom(),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const bookings = pgTable("bookings", {
  id: uuid("id").primaryKey().defaultRandom(),
  publicReference: text("public_reference").notNull().unique(),
  status: text("status").notNull().default("pending"), // pending | contacted | confirmed | completed | cancelled | failed
  serviceId: uuid("service_id").references(() => services.id, { onDelete: "set null" }),
  serviceNameSnapshot: text("service_name_snapshot").notNull(),
  doctorId: uuid("doctor_id").references(() => doctors.id, { onDelete: "set null" }),
  doctorNameSnapshot: text("doctor_name_snapshot"),
  branchId: uuid("branch_id").references(() => branches.id, { onDelete: "set null" }),
  requestedDate: date("requested_date"),
  requestedTimePeriod: text("requested_time_period"),
  customerId: uuid("customer_id").references(() => customers.id, { onDelete: "set null" }),
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  customerEmail: text("customer_email"),
  customerNotes: text("customer_notes"),
  privacyConsent: boolean("privacy_consent").notNull().default(false),
  emailStatus: text("email_status").notNull().default("pending"), // pending | sent | failed | skipped
  emailSentAt: timestamp("email_sent_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const bookingEvents = pgTable("booking_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  bookingId: uuid("booking_id")
    .notNull()
    .references(() => bookings.id, { onDelete: "cascade" }),
  eventType: text("event_type").notNull(),
  note: text("note"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const contactRequests = pgTable("contact_requests", {
  id: uuid("id").primaryKey().defaultRandom(),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  subject: text("subject"),
  message: text("message").notNull(),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
