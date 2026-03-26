// ============================================================
// MEDIQ — Shared Constants
// ============================================================

// BGN to EUR fixed rate — Bulgaria is in ERM II, rate is permanently fixed
export const BGN_TO_EUR = 1.95583;

// Convert BGN to EUR
export const BULGARIAN_CITIES = [
  'Sofia',
  'Plovdiv',
  'Varna',
  'Burgas',
  'Ruse',
  'Stara Zagora',
  'Pleven',
  'Sliven',
  'Dobrich',
  'Shumen',
  'Pernik',
  'Haskovo',
  'Yambol',
  'Pazardzhik',
  'Blagoevgrad',
  'Veliko Tarnovo',
  'Vratsa',
  'Gabrovo',
  'Vidin',
  'Montana',
  'Kardzhali',
  'Lovech',
  'Silistra',
  'Razgrad',
  'Targovishte',
  'Kyustendil',
  'Smolyan',
  'Popovo',
] as const;

export type BulgarianCity = (typeof BULGARIAN_CITIES)[number];

// Major Bulgarian private health insurers
export const BULGARIAN_INSURERS = [
  'Generali',
  'Allianz',
  'Bulstrad Life',
  'DZI',
  'Unika',
  'Armeec',
  'Euroins',
  'Groupama',
] as const;

export type BulgarianInsurer = (typeof BULGARIAN_INSURERS)[number];

// Medical specialty slugs
export const SPECIALTY_SLUGS = [
  'general-practitioner',
  'cardiologist',
  'dermatologist',
  'gynecologist',
  'pediatrician',
  'neurologist',
  'dentist',
  'orthopedist',
  'gastroenterologist',
  'ent-specialist',
] as const;

export type SpecialtySlug = (typeof SPECIALTY_SLUGS)[number];

// Free plan limits
export const FREE_PLAN_MAX_APPOINTMENTS = 4;
export const FREE_PLAN_SYMPTOM_CHECKS_PER_DAY = 3;

// Plus plan limits
export const PLUS_PLAN_MAX_APPOINTMENTS = 7;
export const PLUS_PLAN_MAX_WAITING_LIST = 7;
export const PLUS_PLAN_MAX_NOTIFICATIONS_PER_ENTRY = 5;

// Subscription pricing (BGN)
export const PLUS_MONTHLY_BGN = 9.99;
export const PLUS_ANNUAL_BGN = 99.98;

// Notification windows (hours)
export const NOTIFICATION_WINDOW_NEAR = 2;   // within 1 week
export const NOTIFICATION_WINDOW_FAR = 6;    // beyond 1 week
export const NOTIFICATION_START_HOUR = 8;    // 08:00
export const NOTIFICATION_END_HOUR = 21;     // 21:00

// Emergency keywords for symptom checker
export const EMERGENCY_KEYWORDS = [
  'chest pain',
  'heart attack',
  'stroke',
  'unconscious',
  'not breathing',
  'can\'t breathe',
  'cannot breathe',
  'severe bleeding',
  'heavy bleeding',
  'overdose',
  'poisoning',
  'anaphylaxis',
  'allergic reaction',
  'seizure',
  'convulsion',
  'loss of consciousness',
  'severe head injury',
  'suicidal',
  'suicide',
  'emergency',
  '112',
  'ambulance',
];

// Emergency contact numbers in Bulgaria
export const EMERGENCY_NUMBERS = {
  eu_emergency: '112',
  bulgarian_ambulance: '150',
  fire: '160',
  police: '166',
};
