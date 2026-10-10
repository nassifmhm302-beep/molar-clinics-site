// Idempotent seed script for verified Molar Clinics content.
// Run with: npx tsx src/db/seed.ts
import "dotenv/config";
import { eq } from "drizzle-orm";
import { db, pool } from "./index";
import {
  bookingEvents,
  bookings,
  branches,
  blogArticles,
  contactRequests,
  customers,
  doctorServices,
  doctors,
  faqs,
  offers,
  openingHours,
  services,
  testimonials,
} from "./schema";
import { clinic } from "../content/clinic";

async function upsertBranch() {
  const [row] = await db
    .select()
    .from(branches)
    .where(eq(branches.slug, "zahrat-laban"))
    .limit(1);

  if (row) return row;

  const [created] = await db
    .insert(branches)
    .values({
      slug: "zahrat-laban",
      name: "فرع ظهرة لبن - الرياض",
      addressLine: clinic.address,
      city: "الرياض",
      mapsUrl: clinic.googleMapsUrl,
      phone: clinic.phoneHref,
      whatsappLink: clinic.whatsappLink,
      email: clinic.email,
      isPrimary: true,
    })
    .returning();
  return created;
}

async function seedOpeningHours(branchId: string) {
  const existing = await db.select().from(openingHours).where(eq(openingHours.branchId, branchId));
  if (existing.length > 0) return;

  const rows = [0, 1, 2, 3, 4, 5, 6].map((dayOfWeek) => {
    if (dayOfWeek === 5) {
      return { branchId, dayOfWeek, isClosed: true, opensAt: null, closesAt: null, note: "إجازة" };
    }
    return {
      branchId,
      dayOfWeek,
      isClosed: false,
      opensAt: "14:00",
      closesAt: "22:00",
      note: null,
    };
  });

  await db.insert(openingHours).values(rows);
}

type ServiceSeed = {
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  longDescription: string;
  whatToExpect: string[];
  whoNeedsIt: string[];
  preparationNotes?: string;
  photoUrl: string;
  isFeatured: boolean;
  sortOrder: number;
};

const serviceSeeds: ServiceSeed[] = [
  {
    slug: "dental-implants",
    name: "زراعة الأسنان",
    category: "علاجات متقدمة",
    shortDescription: "حل دائم لتعويض الأسنان المفقودة بشكل طبيعي المظهر والوظيفة.",
    longDescription:
      "زراعة الأسنان هي إجراء جراحي يهدف إلى تعويض السن المفقود بجذر صناعي يندمج مع عظم الفك، ليُركَّب عليه تاج صناعي يُحاكي شكل السن الطبيعي. يقوم طبيب الأسنان بتقييم حالة الفك والعظم المحيط قبل تحديد مدى ملاءمة الزراعة لكل حالة.",
    whatToExpect: [
      "فحص وتقييم أولي للأسنان والعظم المحيط، وقد يشمل ذلك أشعة تشخيصية.",
      "مناقشة خطة العلاج المقترحة مع الطبيب المختص بالتفصيل.",
      "تحديد عدد الجلسات اللازمة بحسب الحالة الفردية لكل مريض.",
    ],
    whoNeedsIt: [
      "من يعانون من فقدان سن أو أكثر.",
      "من يرغبون في بديل ثابت للتركيبات المتحركة.",
    ],
    preparationNotes:
      "يُفضل إحضار أي أشعة أو تقارير طبية سابقة متعلقة بالأسنان أو الفك إلى موعد الاستشارة.",
    photoUrl: "https://images.pexels.com/photos/4270093/pexels-photo-4270093.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    isFeatured: true,
    sortOrder: 1,
  },
  {
    slug: "oral-maxillofacial-surgery",
    name: "جراحة الوجه والفكين",
    category: "جراحة",
    shortDescription: "تدخلات جراحية متخصصة لعلاج مشكلات الفك والأنسجة المحيطة بالأسنان.",
    longDescription:
      "تشمل جراحة الوجه والفكين تشخيص وعلاج الحالات الجراحية المتعلقة بالفك والأنسجة الداعمة للأسنان، ويقوم بها طبيب متخصص في هذا المجال بعد تقييم دقيق لحالة المريض.",
    whatToExpect: [
      "تقييم سريري وأشعة تشخيصية عند الحاجة.",
      "شرح خطوات الإجراء الجراحي والتعافي المتوقع.",
    ],
    whoNeedsIt: ["حالات تستدعي تدخلاً جراحيًا متخصصًا بتوصية من طبيب الأسنان."],
    photoUrl: "https://images.pexels.com/photos/6627354/pexels-photo-6627354.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    isFeatured: true,
    sortOrder: 2,
  },
  {
    slug: "laser-teeth-whitening",
    name: "تبييض الأسنان بالليزر",
    category: "تجميل الأسنان",
    shortDescription: "جلسة تجميلية لتفتيح لون الأسنان تحت إشراف طبي مباشر.",
    longDescription:
      "تبييض الأسنان بالليزر إجراء تجميلي يهدف إلى تفتيح درجة لون الأسنان المتصبغة، ويتم تحت إشراف طبيب الأسنان بعد التأكد من خلو الفم من أي مشكلات صحية قد تمنع الإجراء.",
    whatToExpect: [
      "فحص أولي للتأكد من سلامة اللثة والأسنان قبل الجلسة.",
      "جلسة تبييض تحت إشراف الطبيب في العيادة.",
      "إرشادات للعناية بالأسنان بعد الجلسة للحفاظ على النتيجة.",
    ],
    whoNeedsIt: ["من يرغبون في تفتيح لون أسنانهم المتصبغة بإشراف طبي."],
    photoUrl: "https://images.pexels.com/photos/3845759/pexels-photo-3845759.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    isFeatured: true,
    sortOrder: 3,
  },
  {
    slug: "orthodontics",
    name: "تقويم الأسنان",
    category: "تقويم",
    shortDescription: "تقويم معدني أو شفاف لتحسين اصطفاف الأسنان وإطباقها تدريجيًا.",
    longDescription:
      "يساعد تقويم الأسنان على تصحيح ازدحام أو تباعد الأسنان وتحسين إطباق الفكين، ويتوفر بخيارات معدنية أو شفافة بحسب تقييم أخصائي التقويم لحالة كل مريض واحتياجاته.",
    whatToExpect: [
      "تقييم شامل لإطباق الأسنان وأخذ القياسات اللازمة.",
      "اختيار نوع التقويم المناسب بالتشاور مع الأخصائي.",
      "متابعة دورية لضبط التقويم طوال مدة العلاج.",
    ],
    whoNeedsIt: ["من يعانون من ازدحام أو تباعد أو سوء إطباق في الأسنان."],
    preparationNotes: "الالتزام بمواعيد المتابعة الدورية يساهم في انتظام سير خطة العلاج.",
    photoUrl: "https://images.pexels.com/photos/4269687/pexels-photo-4269687.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    isFeatured: true,
    sortOrder: 4,
  },
  {
    slug: "crowns-and-bridges",
    name: "تركيبات الأسنان",
    category: "ترميم الأسنان",
    shortDescription: "تيجان وجسور خزفية أو زيركونية لترميم الأسنان المتضررة.",
    longDescription:
      "تُستخدم التركيبات الثابتة مثل التيجان والجسور لترميم الأسنان المتضررة بشدة أو تعويض الأسنان المفقودة، ويحدد الطبيب نوع المادة المناسبة بحسب موقع السن والحالة الفموية العامة.",
    whatToExpect: [
      "تحضير السن أو الأسنان المعنية وأخذ طبعة أو مسح رقمي.",
      "تركيب تعويض مؤقت في بعض الحالات لحين تجهيز التركيبة النهائية.",
      "تركيب التركيبة النهائية وضبط الإطباق.",
    ],
    whoNeedsIt: ["من يعانون من أسنان مكسورة أو شديدة التضرر أو مفقودة."],
    photoUrl: "https://images.pexels.com/photos/5355705/pexels-photo-5355705.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    isFeatured: false,
    sortOrder: 5,
  },
  {
    slug: "dental-fillings",
    name: "حشوات الأسنان",
    category: "علاج عام",
    shortDescription: "علاج التسوس وترميم الأسنان بحشوات تجميلية متناسقة مع لون السن.",
    longDescription:
      "تُستخدم الحشوات التجميلية لعلاج التسوس وترميم الأجزاء المتضررة من السن، مع محاكاة لون السن الطبيعي للحفاظ على مظهر متناسق للابتسامة.",
    whatToExpect: ["إزالة الجزء المتسوس من السن.", "وضع الحشوة وتشكيلها لتطابق السن المجاور."],
    whoNeedsIt: ["من لديهم تسوس أو ترميم بسيط في الأسنان."],
    photoUrl: "https://images.pexels.com/photos/6528850/pexels-photo-6528850.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    isFeatured: false,
    sortOrder: 6,
  },
  {
    slug: "teeth-cleaning",
    name: "تنظيف الأسنان",
    category: "العناية الوقائية",
    shortDescription: "تنظيف عادي أو عميق لإزالة الجير والترسبات والحفاظ على صحة اللثة.",
    longDescription:
      "تنظيف الأسنان الدوري يساعد على إزالة الجير والترسبات التي لا تتم إزالتها بالتنظيف المنزلي، ويُسهم في الحفاظ على صحة اللثة والوقاية من المشكلات طويلة المدى.",
    whatToExpect: [
      "فحص أولي لحالة اللثة والأسنان.",
      "تنظيف عادي أو عميق بحسب تقييم الطبيب.",
      "نصائح للعناية المنزلية اليومية بالأسنان.",
    ],
    whoNeedsIt: ["يُنصح بالتنظيف الدوري لجميع الأعمار كجزء من العناية الوقائية."],
    photoUrl: "https://images.pexels.com/photos/6627484/pexels-photo-6627484.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    isFeatured: true,
    sortOrder: 7,
  },
  {
    slug: "tooth-extraction",
    name: "خلع الأسنان وضرس العقل",
    category: "جراحة",
    shortDescription: "خلع الأسنان المتضررة أو ضروس العقل عند الحاجة الطبية لذلك.",
    longDescription:
      "في بعض الحالات التي يتعذر فيها علاج السن أو عند وجود ضرس عقل يسبب مشكلات، يوصي الطبيب بخلع السن ضمن إجراء آمن ومدروس بعد تقييم كامل للحالة.",
    whatToExpect: ["تقييم الحالة بالأشعة عند الحاجة.", "إجراء الخلع مع تخدير موضعي مناسب.", "إرشادات العناية بعد الخلع."],
    whoNeedsIt: ["حالات تستدعي خلعًا بتوصية طبية، مثل ضرس العقل المسبب للألم."],
    photoUrl: "https://images.pexels.com/photos/4269694/pexels-photo-4269694.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    isFeatured: false,
    sortOrder: 8,
  },
  {
    slug: "dental-xray",
    name: "أشعة الأسنان",
    category: "تشخيص",
    shortDescription: "أشعة صغيرة أو بانوراما لتشخيص دقيق قبل أي خطة علاجية.",
    longDescription:
      "تُستخدم الأشعة التشخيصية للكشف عن حالة الأسنان والعظم المحيط بها بدقة، وتُعد خطوة أساسية في العديد من خطط العلاج لضمان تشخيص سليم.",
    whatToExpect: ["التقاط الأشعة المطلوبة بحسب توصية الطبيب.", "مراجعة النتائج مع الطبيب لتحديد خطة العلاج."],
    whoNeedsIt: ["جزء من التقييم الأولي للعديد من حالات علاج الأسنان."],
    photoUrl: "https://images.pexels.com/photos/6629415/pexels-photo-6629415.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    isFeatured: false,
    sortOrder: 9,
  },
  {
    slug: "snap-on-smile",
    name: "سناب أون سمايل",
    category: "تجميل الأسنان",
    shortDescription: "حل تجميلي غير دائم وقابل للإزالة لتحسين مظهر الابتسامة.",
    longDescription:
      "سناب أون سمايل تركيبة تجميلية قابلة للإزالة تُلبس فوق الأسنان الطبيعية لتحسين مظهر الابتسامة دون أي تدخل جراحي، ويحدد الطبيب مدى ملاءمتها لحالة كل مريض.",
    whatToExpect: ["أخذ طبعة أو مسح رقمي للأسنان.", "تجربة التركيبة وضبطها لتناسب الفم بشكل مريح."],
    whoNeedsIt: ["من يبحثون عن حل تجميلي غير دائم لتحسين مظهر الابتسامة."],
    photoUrl: "https://images.pexels.com/photos/6627521/pexels-photo-6627521.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    isFeatured: false,
    sortOrder: 10,
  },
  {
    slug: "digital-scanning",
    name: "الطبعة الرقمية ثلاثية الأبعاد",
    category: "تقنيات حديثة",
    shortDescription: "مسح ضوئي رقمي للأسنان يغني عن الطبعات التقليدية بالعجينة.",
    longDescription:
      "تعتمد العيادة على تقنية المسح الضوئي ثلاثي الأبعاد لأخذ طبعات دقيقة وسريعة للأسنان، مما يوفر تجربة أكثر راحة للمريض مقارنة بالطبعات التقليدية.",
    whatToExpect: ["مسح ضوئي سريع وغير مزعج للأسنان.", "نتائج رقمية دقيقة تُستخدم في تخطيط العلاج أو التركيبات."],
    whoNeedsIt: ["تُستخدم ضمن خطط علاج التقويم والتركيبات وغيرها."],
    photoUrl: "https://images.pexels.com/photos/5355857/pexels-photo-5355857.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    isFeatured: false,
    sortOrder: 11,
  },
];

type DoctorSeed = {
  slug: string;
  fullName: string;
  specialty: string;
  bio: string;
  qualifications: string[];
  languages: string[];
  photoUrl: string | null;
  serviceSlugs: string[];
  sortOrder: number;
};

const doctorSeeds: DoctorSeed[] = [
  {
    slug: "abdulrahman-alghamrawi",
    fullName: "د. عبدالرحمن الغمراوي",
    specialty: "أخصائي جراحة الوجه والفكين وزراعة الأسنان",
    bio: "يتابع د. عبدالرحمن حالات زراعة الأسنان وجراحات الوجه والفكين، ويحرص على شرح خطة العلاج للمريض بوضوح قبل البدء بأي إجراء.",
    qualifications: [],
    languages: ["العربية"],
    photoUrl: null,
    serviceSlugs: ["dental-implants", "oral-maxillofacial-surgery", "tooth-extraction"],
    sortOrder: 1,
  },
  {
    slug: "bilal-mira",
    fullName: "د. بلال ميره",
    specialty: "أخصائي تقويم الأسنان",
    bio: "يتابع د. بلال حالات تقويم الأسنان المعدني والشفاف، مع تخطيط دقيق لكل حالة بحسب احتياجات المريض.",
    qualifications: [],
    languages: ["العربية"],
    photoUrl: null,
    serviceSlugs: ["orthodontics"],
    sortOrder: 2,
  },
  {
    slug: "hadeel-alquhait",
    fullName: "د. هديل القحيط",
    specialty: "طبيبة أسنان عامة",
    bio: "تقدم د. هديل خدمات طب الأسنان العام من فحص ووقاية وعلاج للتسوس، مع اهتمام بتجربة مريحة للمريض.",
    qualifications: [],
    languages: ["العربية"],
    photoUrl: null,
    serviceSlugs: ["teeth-cleaning", "dental-fillings", "dental-xray", "digital-scanning"],
    sortOrder: 3,
  },
  {
    slug: "saud-alahmari",
    fullName: "د. سعود الأحمري",
    specialty: "طبيب أسنان عام",
    bio: "يتابع د. سعود حالات التركيبات والعناية التجميلية بالأسنان ضمن فريق العيادة.",
    qualifications: [],
    languages: ["العربية"],
    photoUrl: null,
    serviceSlugs: ["crowns-and-bridges", "laser-teeth-whitening", "snap-on-smile"],
    sortOrder: 4,
  },
  {
    slug: "fahad-dentist",
    fullName: "د. فهد",
    specialty: "أخصائي جراحة الوجه والفكين والزراعة",
    bio: "ضمن فريق جراحة الفم والوجه والفكين في العيادة، ويشارك في متابعة حالات الزراعة والجراحة.",
    qualifications: [],
    languages: ["العربية"],
    photoUrl: null,
    serviceSlugs: ["oral-maxillofacial-surgery", "dental-implants"],
    sortOrder: 5,
  },
];

const faqSeeds: { question: string; answer: string; serviceSlug?: string }[] = [
  {
    question: "هل يحتاج كل مريض إلى زراعة أسنان؟",
    answer:
      "ليست الزراعة مناسبة لكل الحالات، إذ يحدد الطبيب مدى ملاءمتها بعد تقييم العظم المحيط والحالة الصحية العامة للمريض.",
    serviceSlug: "dental-implants",
  },
  {
    question: "كم تستغرق خطة علاج تقويم الأسنان؟",
    answer:
      "تختلف مدة العلاج من حالة إلى أخرى بحسب درجة الازدحام ونوع التقويم المستخدم، ويوضح الأخصائي المدة المتوقعة بعد الفحص.",
    serviceSlug: "orthodontics",
  },
  {
    question: "هل نتيجة تبييض الأسنان دائمة؟",
    answer:
      "تختلف مدة بقاء نتيجة التبييض من شخص لآخر وتتأثر بعادات التغذية والعناية اليومية، ويقدم الطبيب إرشادات للحفاظ على النتيجة لأطول فترة ممكنة.",
    serviceSlug: "laser-teeth-whitening",
  },
  {
    question: "هل يمكنني معرفة تكلفة العلاج مسبقًا؟",
    answer: "للاستفسار عن تكلفة أي علاج، يُرجى التواصل مع العيادة مباشرة عبر الهاتف أو واتساب.",
  },
  {
    question: "هل الحجز عبر الموقع يعني تأكيد الموعد؟",
    answer:
      "إرسال طلب الحجز يعني استلام العيادة لطلبك، وسيتم التواصل معك لتأكيد تفاصيل الموعد النهائية.",
  },
];

const articleSeeds = [
  {
    slug: "importance-of-regular-dental-checkup",
    title: "أهمية الفحص الدوري للأسنان",
    excerpt: "لماذا تُعد زيارة طبيب الأسنان بشكل دوري خطوة أساسية في الحفاظ على صحة فمك؟",
    content:
      "يساعد الفحص الدوري لدى طبيب الأسنان على اكتشاف المشكلات في مراحلها المبكرة قبل أن تتفاقم، مثل التسوس البسيط أو بدايات التهاب اللثة. كما يتيح الفحص الدوري متابعة نظافة الفم العامة وتقديم نصائح مخصصة لكل مريض. يُنصح عمومًا بزيارة طبيب الأسنان بشكل منتظم، ويحدد الطبيب الفترة المناسبة لكل حالة.",
    coverImageUrl: "https://images.pexels.com/photos/3845553/pexels-photo-3845553.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    tags: ["وقاية", "فحص دوري"],
    readingMinutes: 3,
  },
  {
    slug: "daily-oral-hygiene-habits",
    title: "طرق العناية اليومية بصحة الفم",
    excerpt: "عادات بسيطة يمكن أن تحدث فرقًا كبيرًا في صحة أسنانك ولثتك على المدى الطويل.",
    content:
      "تبدأ العناية بصحة الفم من المنزل، من خلال تنظيف الأسنان بالفرشاة مرتين يوميًا على الأقل، واستخدام خيط الأسنان للوصول إلى المناطق التي لا تصلها الفرشاة، إضافة إلى تقليل تناول السكريات. هذه العادات اليومية تدعم ما يقوم به طبيب الأسنان خلال الزيارات الدورية.",
    coverImageUrl: "https://images.pexels.com/photos/6627484/pexels-photo-6627484.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    tags: ["عناية يومية"],
    readingMinutes: 4,
  },
  {
    slug: "when-do-you-need-teeth-cleaning",
    title: "متى تحتاج إلى تنظيف الأسنان؟",
    excerpt: "علامات قد تشير إلى حاجتك لجلسة تنظيف أسنان لدى طبيب مختص.",
    content:
      "قد تلاحظ تراكم الجير على أسنانك أو نزيف بسيط في اللثة عند التنظيف، وهذه من العلامات التي تستدعي استشارة طبيب الأسنان حول موعد تنظيف مناسب. يحدد الطبيب بعد الفحص ما إذا كانت الحالة تحتاج إلى تنظيف عادي أو تنظيف عميق.",
    coverImageUrl: "https://images.pexels.com/photos/6627536/pexels-photo-6627536.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    tags: ["تنظيف الأسنان", "وقاية"],
    readingMinutes: 3,
  },
  {
    slug: "orthodontics-common-questions",
    title: "أسئلة شائعة حول تقويم الأسنان",
    excerpt: "إجابات مبسطة عن أكثر الأسئلة شيوعًا قبل البدء برحلة تقويم الأسنان.",
    content:
      "يتساءل الكثيرون عن العمر المناسب لتقويم الأسنان، والفرق بين التقويم المعدني والشفاف، ومدى الشعور بالألم خلال العلاج. يختلف الجواب من حالة لأخرى، ولهذا يُعد الفحص المبدئي مع أخصائي التقويم الخطوة الأهم للحصول على إجابات دقيقة ومخصصة.",
    coverImageUrl: "https://images.pexels.com/photos/4269687/pexels-photo-4269687.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    tags: ["تقويم الأسنان"],
    readingMinutes: 5,
  },
  {
    slug: "dental-implants-overview",
    title: "معلومات عامة حول زراعة الأسنان",
    excerpt: "نظرة عامة مبسطة حول فكرة زراعة الأسنان وما يجب معرفته قبل اتخاذ القرار.",
    content:
      "زراعة الأسنان خيار شائع لتعويض الأسنان المفقودة، وتعتمد نسبة نجاحها على عوامل عدة منها صحة العظم المحيط والحالة الصحية العامة للمريض. يُفضل دائمًا استشارة طبيب مختص لتقييم الحالة بدقة قبل اتخاذ القرار المناسب.",
    coverImageUrl: "https://images.pexels.com/photos/4270093/pexels-photo-4270093.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    tags: ["زراعة الأسنان"],
    readingMinutes: 4,
  },
  {
    slug: "care-after-dental-treatment",
    title: "كيفية العناية بالأسنان بعد العلاج",
    excerpt: "إرشادات عامة للعناية بأسنانك في الأيام التالية لأي إجراء علاجي.",
    content:
      "بعد أي إجراء علاجي في الأسنان، يقدم الطبيب عادة إرشادات مخصصة للعناية في الفترة اللاحقة، مثل تجنب الأطعمة الصلبة لفترة أو الحرص على نظافة موضع العلاج. الالتزام بهذه الإرشادات يساعد على تعافٍ أفضل وأسرع.",
    coverImageUrl: "https://images.pexels.com/photos/4269369/pexels-photo-4269369.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    tags: ["ما بعد العلاج"],
    readingMinutes: 3,
  },
  {
    slug: "childrens-dental-health",
    title: "صحة أسنان الأطفال",
    excerpt: "نصائح عامة لمساعدة الأطفال على بناء عادات صحية للعناية بأسنانهم.",
    content:
      "تبدأ العناية بأسنان الأطفال منذ ظهور الأسنان اللبنية الأولى، ومن المهم تعويدهم على تنظيف الأسنان بانتظام ومتابعة نموهم لدى طبيب الأسنان بشكل دوري لرصد أي مشكلات مبكرًا.",
    coverImageUrl: "https://images.pexels.com/photos/6627563/pexels-photo-6627563.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    tags: ["أسنان الأطفال"],
    readingMinutes: 3,
  },
  {
    slug: "habits-that-protect-your-teeth",
    title: "العادات التي تساعد على حماية أسنانك",
    excerpt: "سلوكيات يومية بسيطة تسهم في حماية أسنانك على المدى الطويل.",
    content:
      "من أبرز العادات التي تحمي الأسنان: تقليل المشروبات والأطعمة السكرية، شرب كمية كافية من الماء، تجنب استخدام الأسنان لفتح الأشياء الصلبة، والمواظبة على الفحص الدوري لدى طبيب الأسنان.",
    coverImageUrl: "https://images.pexels.com/photos/5355858/pexels-photo-5355858.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    tags: ["عناية يومية", "وقاية"],
    readingMinutes: 3,
  },
];

async function main() {
  const branch = await upsertBranch();
  await seedOpeningHours(branch.id);

  const serviceIdBySlug = new Map<string, string>();
  for (const s of serviceSeeds) {
    const [existing] = await db.select().from(services).where(eq(services.slug, s.slug)).limit(1);
    if (existing) {
      serviceIdBySlug.set(s.slug, existing.id);
      continue;
    }
    const [created] = await db
      .insert(services)
      .values({
        slug: s.slug,
        name: s.name,
        category: s.category,
        shortDescription: s.shortDescription,
        longDescription: s.longDescription,
        whatToExpect: s.whatToExpect,
        whoNeedsIt: s.whoNeedsIt,
        preparationNotes: s.preparationNotes,
        photoUrl: s.photoUrl,
        isFeatured: s.isFeatured,
        sortOrder: s.sortOrder,
        seoTitle: `${s.name} | Molar Clinics`,
        seoDescription: s.shortDescription,
      })
      .returning();
    serviceIdBySlug.set(s.slug, created.id);
  }

  for (const d of doctorSeeds) {
    const [existing] = await db.select().from(doctors).where(eq(doctors.slug, d.slug)).limit(1);
    let doctorId: string;
    if (existing) {
      doctorId = existing.id;
    } else {
      const [created] = await db
        .insert(doctors)
        .values({
          slug: d.slug,
          fullName: d.fullName,
          specialty: d.specialty,
          bio: d.bio,
          qualifications: d.qualifications,
          languages: d.languages,
          photoUrl: d.photoUrl,
          branchId: branch.id,
          sortOrder: d.sortOrder,
        })
        .returning();
      doctorId = created.id;
    }

    const existingLinks = await db
      .select()
      .from(doctorServices)
      .where(eq(doctorServices.doctorId, doctorId));
    if (existingLinks.length === 0) {
      for (const slug of d.serviceSlugs) {
        const serviceId = serviceIdBySlug.get(slug);
        if (serviceId) {
          await db.insert(doctorServices).values({ doctorId, serviceId });
        }
      }
    }
  }

  for (const f of faqSeeds) {
    const [existing] = await db.select().from(faqs).where(eq(faqs.question, f.question)).limit(1);
    if (existing) continue;
    await db.insert(faqs).values({
      question: f.question,
      answer: f.answer,
      serviceId: f.serviceSlug ? serviceIdBySlug.get(f.serviceSlug) : null,
    });
  }

  for (const a of articleSeeds) {
    const [existing] = await db.select().from(blogArticles).where(eq(blogArticles.slug, a.slug)).limit(1);
    if (existing) continue;
    await db.insert(blogArticles).values({
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
      content: a.content,
      coverImageUrl: a.coverImageUrl,
      author: "فريق Molar Clinics",
      reviewedBy: null,
      readingMinutes: a.readingMinutes,
      tags: a.tags,
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
