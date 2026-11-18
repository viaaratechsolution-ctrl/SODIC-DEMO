export interface CompanyTeamMember {
  id: string;
  name: string;
  nameEn: string;
  role: string;
  roleEn: string;
  bio: string;
  bioEn: string;
  image: string;
}

export const COMPANY_TEAM: CompanyTeamMember[] = [
  {
    id: 'team-1',
    name: 'ياسر الفاسي',
    nameEn: 'Yasser El-Fassi',
    role: 'المؤسس والرئيس التنفيذي',
    roleEn: 'Founder & Chief Executive Officer',
    bio: 'يقود استراتيجية النمو والشراكات المؤسسية والتحول الرقمي للمشروعات العقارية الكبرى.',
    bioEn:
      'Leads enterprise growth strategy, developer partnerships, and digital transformation across large-scale real estate projects.',
    image: '/team/yasser-elfassi.webp',
  },
  {
    id: 'team-2',
    name: 'عبدالله عصام',
    nameEn: 'Abdullah Essam',
    role: 'المؤسس والمدير التقني',
    roleEn: 'Co-Founder & Chief Technology Officer',
    bio: 'يشرف على البنية الهندسية للمنصات السحابية وقابلية التوسع والأمان المؤسسي.',
    bioEn:
      'Oversees cloud platform architecture, enterprise security standards, and high-availability scalability.',
    image: '/team/abdaulluh-essam.webp',
  },
  {
    id: 'team-3',
    name: 'عبدالرحمن طارق',
    nameEn: 'Abdelrahman Tarek',
    role: 'مصمم تجربة وواجهة المستخدم',
    roleEn: 'Lead Product & UX Designer',
    bio: 'يصمم واجهات عربية واضحة وسريعة التعلّم تناسب الفرق الميدانية والإدارة التنفيذية.',
    bioEn:
      'Crafts intuitive bilingual experiences tailored for fast-moving field teams and executive visibility.',
    image: '/team/abdelrahman-tarek.webp',
  },
  {
    id: 'team-4',
    name: 'أحمد علي',
    nameEn: 'Ahmed Ali',
    role: 'مهندس الأنظمة الخلفية',
    roleEn: 'Senior Backend Engineer',
    bio: 'يبني خدمات الواجهة البرمجية وقواعد البيانات والتكامل الآمن مع أنظمة CRM وERP.',
    bioEn:
      'Engineers resilient APIs, data pipelines, and secure bi-directional integrations with CRM and ERP systems.',
    image: '/team/ahmed-ali.webp',
  },
  {
    id: 'team-5',
    name: 'عمرو حسام',
    nameEn: 'Amr Hossam',
    role: 'مهندس تطبيقات الموبايل',
    roleEn: 'Mobile Applications Engineer',
    bio: 'يطور تطبيقات iOS وAndroid عالية الأداء لضمان استقرار العمل داخل المواقع والمشاريع.',
    bioEn:
      'Builds high-performance iOS and Android experiences built for reliable daily usage across project sites.',
    image: '/team/amr-hossam.webp',
  },
  {
    id: 'team-6',
    name: 'محمد رضا',
    nameEn: 'Mohamed Reda',
    role: 'مطور الواجهات الأمامية',
    roleEn: 'Frontend Engineer',
    bio: 'يحول التصاميم التفاعلية إلى لوحات متابعة سريعة الاستجابة ودقيقة التفاصيل.',
    bioEn:
      'Translates product design into responsive, high-precision web interfaces and real-time executive dashboards.',
    image: '/team/mohamed-reda.webp',
  },
];
