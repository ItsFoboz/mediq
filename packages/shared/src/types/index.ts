// ============================================================
// MEDIQ — Shared TypeScript Types
// Mirrors the Supabase database schema exactly
// ============================================================

export type AppointmentStatus =
  | 'pending'
  | 'confirmed'
  | 'cancelled'
  | 'completed'
  | 'no_show';

export type PaymentMethod = 'nhif' | 'private' | 'insurance' | 'cash';

export type SubscriptionTier = 'free' | 'plus';

export type ClinicType = 'hospital' | 'clinic' | 'dental' | 'lab' | 'imaging';

export type UrgencyLevel = 'routine' | 'soon' | 'urgent' | 'emergency';

export type SortOption = 'rating' | 'price_asc' | 'price_desc' | 'availability';

// ─────────────────────────────────────────────────────────────
// Specialty
// ─────────────────────────────────────────────────────────────
export interface Specialty {
  id: string;
  slug: string;
  name_en: string;
  name_bg: string;
  icon_name: string;            // Lucide icon name (e.g. "Heart")
  description_en: string;
  common_conditions_en: string[];
  doctor_count?: number;
}

// ─────────────────────────────────────────────────────────────
// Clinic
// ─────────────────────────────────────────────────────────────
export interface OpeningHours {
  mon?: string;
  tue?: string;
  wed?: string;
  thu?: string;
  fri?: string;
  sat?: string;
  sun?: string;
}

export interface Clinic {
  id: string;
  name: string;
  slug: string;
  type: ClinicType;
  address: string;
  city: string;
  lat: number;
  lng: number;
  phone: string;
  website?: string;
  photos: string[];
  opening_hours: OpeningHours;
  accepts_nhif: boolean;
  languages_spoken: string[];
  description_en: string;
}

// ─────────────────────────────────────────────────────────────
// Doctor
// ─────────────────────────────────────────────────────────────
export interface DoctorClinicSchedule {
  clinic_id: string;
  clinic: Clinic;
  schedule: Record<string, string[]>; // { "mon": ["09:00","09:30",...], ... }
  accepts_nhif_here: boolean;
  price_here_bgn: number;
}

export interface Doctor {
  id: string;
  name: string;
  slug: string;
  photo_url: string;
  specialty_id: string;
  specialty: Specialty;
  bio_en: string;
  bio_bg?: string;
  speaks_english: boolean;
  speaks_other_languages: string[];   // e.g. ["German", "Russian"]
  years_experience: number;
  education: string[];
  certifications: string[];
  rating_average: number;             // 0.0 – 5.0
  rating_count: number;
  verified: boolean;
  accepts_nhif: boolean;
  private_only: boolean;
  accepted_insurers: string[];
  price_consultation_bgn: number;
  city: string;
  clinics: DoctorClinicSchedule[];
  ai_review_summary?: string;
  created_at: string;
  updated_at: string;
}

// ─────────────────────────────────────────────────────────────
// Appointment
// ─────────────────────────────────────────────────────────────
export interface Appointment {
  id: string;
  user_id: string;
  doctor_id: string;
  doctor?: Pick<Doctor, 'id' | 'name' | 'slug' | 'photo_url' | 'specialty'>;
  clinic_id: string;
  clinic?: Pick<Clinic, 'id' | 'name' | 'address' | 'city' | 'phone'>;
  datetime: string;                   // ISO 8601
  status: AppointmentStatus;
  reason?: string;
  payment_method: PaymentMethod;
  insurer_name?: string;
  notes?: string;
  reminder_sent: boolean;
  earlier_slot_subscribed: boolean;
  created_at: string;
}

// ─────────────────────────────────────────────────────────────
// Review
// ─────────────────────────────────────────────────────────────
export interface Review {
  id: string;
  appointment_id?: string;
  user_id: string;
  user_name?: string;              // denormalized display name
  doctor_id: string;
  rating: number;                  // 1 – 5
  text: string;
  helpful_count: number;
  ai_summary?: string;
  verified_patient: boolean;
  created_at: string;
}

// ─────────────────────────────────────────────────────────────
// User
// ─────────────────────────────────────────────────────────────
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  phone_verified: boolean;
  nationality?: string;
  language_preference: string;      // "en" default
  nhif_registered: boolean;
  insurer_name?: string;
  subscription_tier: SubscriptionTier;
  subscription_expires_at?: string;
  favorite_doctors: string[];       // doctor UUIDs
  created_at: string;
}

// ─────────────────────────────────────────────────────────────
// Waiting List
// ─────────────────────────────────────────────────────────────
export interface WaitingListEntry {
  id: string;
  user_id: string;
  doctor_id: string;
  doctor?: Pick<Doctor, 'id' | 'name' | 'slug' | 'photo_url' | 'specialty'>;
  clinic_id: string;
  preferred_date_from: string;
  preferred_date_to: string;
  notifications_sent: number;
  max_notifications: number;        // 5
  confirmed: boolean;
  created_at: string;
}

// ─────────────────────────────────────────────────────────────
// Search / Filter
// ─────────────────────────────────────────────────────────────
export interface SearchFilters {
  query: string;
  city: string;
  specialty_slug: string;
  speaks_english: boolean;
  accepts_nhif: boolean;
  private_only: boolean;
  insurer: string;
  gender: 'any' | 'male' | 'female';
  price_min: number;
  price_max: number;
  sort_by: SortOption;
}

// ─────────────────────────────────────────────────────────────
// Symptom Checker
// ─────────────────────────────────────────────────────────────
export interface SymptomCheckResult {
  specialist_en: string;
  specialist_bg: string;
  specialty_slug: string;
  urgency: UrgencyLevel;
  advice: string;
  what_to_tell_doctor: string;
  bulgarian_phrases: Array<{
    phrase: string;
    translation: string;
    phonetic: string;
  }>;
  disclaimer: string;
}

// ─────────────────────────────────────────────────────────────
// Guide Article
// ─────────────────────────────────────────────────────────────
export interface GuideArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  reading_time_minutes: number;
  content: string;               // Markdown
  key_phrases?: Array<{
    phrase: string;
    translation: string;
    phonetic: string;
  }>;
  cost_estimates?: Array<{
    item: string;
    cost_bgn: string;
    cost_eur: string;
  }>;
  last_updated: string;
}
