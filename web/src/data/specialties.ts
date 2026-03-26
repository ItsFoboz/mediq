import type { Specialty } from '@mediq/shared';

export const specialties: Specialty[] = [
  {
    id: 'specialty-1',
    slug: 'general-practitioner',
    name_en: 'General Practitioner',
    name_bg: 'Общопрактикуващ лекар',
    icon_name: 'Stethoscope',
    description_en:
      'In Bulgaria, GPs (семейни лекари) act as the gateway to the entire healthcare system — every insured resident must register with one to access specialist referrals and NHIF coverage. Expats who register with a GP gain access to the full range of state-funded services and benefit from a trusted first point of contact who can coordinate their care.',
    common_conditions_en: [
      'Flu & respiratory infections',
      'Hypertension management',
      'Diabetes type 2 monitoring',
      'Preventive health screenings',
      'Chronic disease referrals',
    ],
    doctor_count: 4,
  },
  {
    id: 'specialty-2',
    slug: 'cardiologist',
    name_en: 'Cardiologist',
    name_bg: 'Кардиолог',
    icon_name: 'Heart',
    description_en:
      'Cardiology is one of the strongest medical disciplines in Bulgaria, with well-equipped centers in Sofia, Plovdiv, and Varna offering ECGs, echocardiograms, and Holter monitoring at a fraction of Western European prices. Bulgarian cardiologists are often trained at leading European institutions and many participate in international clinical trials.',
    common_conditions_en: [
      'Hypertension',
      'Coronary artery disease',
      'Arrhythmia',
      'Heart failure',
      'Cholesterol management',
    ],
    doctor_count: 3,
  },
  {
    id: 'specialty-3',
    slug: 'dermatologist',
    name_en: 'Dermatologist',
    name_bg: 'Дерматолог',
    icon_name: 'Scan',
    description_en:
      'Dermatology in Bulgaria covers both medical and cosmetic conditions, with private clinics offering modern dermoscopy and laser treatments at competitive prices. Many Bulgarian dermatologists have subspecialty training in venereology, and appointments are often available within a few days at private clinics without a GP referral.',
    common_conditions_en: [
      'Acne & rosacea',
      'Eczema & psoriasis',
      'Skin cancer screening',
      'Fungal infections',
      'Allergic dermatitis',
    ],
    doctor_count: 2,
  },
  {
    id: 'specialty-4',
    slug: 'gynecologist',
    name_en: 'Gynecologist',
    name_bg: 'Гинеколог',
    icon_name: 'Baby',
    description_en:
      'Gynecological care in Bulgaria is widely available and affordable, with NHIF covering routine smears, antenatal checks, and contraceptive consultations when referred by a GP. Private gynecology clinics in major cities offer comprehensive women\'s health services including colposcopy, ultrasound, and fertility consultations in English.',
    common_conditions_en: [
      'Routine pap smear & cervical screening',
      'Pregnancy & antenatal care',
      'Menstrual disorders',
      'Contraception management',
      'Menopausal symptoms',
    ],
    doctor_count: 2,
  },
  {
    id: 'specialty-5',
    slug: 'pediatrician',
    name_en: 'Pediatrician',
    name_bg: 'Педиатър',
    icon_name: 'Baby2',
    description_en:
      'Bulgaria has a well-developed pediatric healthcare network, with dedicated children\'s departments in most district hospitals and numerous private pediatric practices in cities. Vaccinations are provided free of charge through the national immunization program, which largely follows the European recommended schedule.',
    common_conditions_en: [
      'Childhood vaccinations',
      'Respiratory infections & bronchitis',
      'Ear infections',
      'Growth & developmental monitoring',
      'Allergies & asthma',
    ],
    doctor_count: 2,
  },
  {
    id: 'specialty-6',
    slug: 'neurologist',
    name_en: 'Neurologist',
    name_bg: 'Невролог',
    icon_name: 'Brain',
    description_en:
      'Neurology in Bulgaria has seen significant investment in recent years, with MRI and CT neuroimaging widely available in both state and private facilities. Neurologists in the major cities are experienced in managing both common conditions such as migraines and complex disorders including epilepsy and multiple sclerosis.',
    common_conditions_en: [
      'Migraines & chronic headaches',
      'Epilepsy',
      'Multiple sclerosis',
      'Stroke recovery & rehabilitation',
      'Neuropathy',
    ],
    doctor_count: 2,
  },
  {
    id: 'specialty-7',
    slug: 'dentist',
    name_en: 'Dentist',
    name_bg: 'Стоматолог / Зъболекар',
    icon_name: 'Smile',
    description_en:
      'Dental care is one of the most popular reasons expats seek healthcare in Bulgaria, with prices typically 50–70% lower than in Western Europe for equivalent quality work. Most private dental clinics operate outside the NHIF system but offer transparent pricing, modern equipment, and English-speaking staff, making them a top destination for dental tourism.',
    common_conditions_en: [
      'Routine check-up & cleaning',
      'Fillings & crowns',
      'Teeth whitening',
      'Implants & prosthetics',
      'Orthodontic treatment',
    ],
    doctor_count: 2,
  },
  {
    id: 'specialty-8',
    slug: 'orthopedist',
    name_en: 'Orthopedist',
    name_bg: 'Ортопед',
    icon_name: 'Bone',
    description_en:
      'Orthopedic surgery and sports medicine are growing specialties in Bulgaria, supported by a strong tradition of physical therapy and rehabilitation. Private orthopedic centers in Sofia and Varna offer arthroscopic surgery, joint replacement consultations, and comprehensive physiotherapy programs at highly competitive prices compared to EU averages.',
    common_conditions_en: [
      'Back & spine pain',
      'Knee & joint injuries',
      'Sports injuries',
      'Fracture management',
      'Osteoarthritis',
    ],
    doctor_count: 1,
  },
  {
    id: 'specialty-9',
    slug: 'gastroenterologist',
    name_en: 'Gastroenterologist',
    name_bg: 'Гастроентеролог',
    icon_name: 'Activity',
    description_en:
      'Gastroenterology services in Bulgaria include endoscopy, colonoscopy, and advanced liver diagnostics at prices significantly below Western European rates. Bulgarian gastroenterologists routinely manage the full spectrum of digestive conditions and several Sofia clinics have earned international accreditation for their endoscopy units.',
    common_conditions_en: [
      'Irritable bowel syndrome',
      'Acid reflux & GERD',
      'Gastric ulcers',
      'Inflammatory bowel disease',
      'Liver & gallbladder disorders',
    ],
    doctor_count: 1,
  },
  {
    id: 'specialty-10',
    slug: 'ent-specialist',
    name_en: 'ENT Specialist',
    name_bg: 'УНГ Специалист',
    icon_name: 'Ear',
    description_en:
      'Ear, nose, and throat specialists in Bulgaria are readily accessible, both through NHIF referral and privately, with short waiting times compared to many EU countries. Bulgarian ENT clinics offer audiometry, endoscopic examinations, and minor surgical procedures such as tonsillectomy and septoplasty in modern outpatient settings.',
    common_conditions_en: [
      'Sinusitis & rhinitis',
      'Tonsillitis',
      'Hearing loss & tinnitus',
      'Vertigo',
      'Nasal polyps',
    ],
    doctor_count: 1,
  },
];
