-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================================
-- USERS
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  subscription_tier TEXT NOT NULL DEFAULT 'free' CHECK (subscription_tier IN ('free', 'plus')),
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- SPECIALTIES
-- ============================================================
CREATE TABLE IF NOT EXISTS specialties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name_en TEXT NOT NULL,
  name_bg TEXT NOT NULL,
  icon_name TEXT NOT NULL DEFAULT 'Stethoscope',
  description_en TEXT,
  common_conditions_en TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS specialties_slug_idx ON specialties(slug);

-- ============================================================
-- CLINICS
-- ============================================================
CREATE TABLE IF NOT EXISTS clinics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('hospital', 'polyclinic', 'private_practice', 'dental_clinic', 'diagnostic_center')),
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  website TEXT,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  opening_hours JSONB,
  accepts_nhif BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS clinics_city_idx ON clinics(city);
CREATE INDEX IF NOT EXISTS clinics_slug_idx ON clinics(slug);

-- ============================================================
-- DOCTORS
-- ============================================================
CREATE TABLE IF NOT EXISTS doctors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  photo_url TEXT,
  specialty_id UUID NOT NULL REFERENCES specialties(id) ON DELETE RESTRICT,
  bio_en TEXT,
  speaks_english BOOLEAN NOT NULL DEFAULT TRUE,
  speaks_other_languages TEXT[] NOT NULL DEFAULT '{}',
  years_experience INTEGER NOT NULL DEFAULT 0,
  education TEXT[] NOT NULL DEFAULT '{}',
  certifications TEXT[] NOT NULL DEFAULT '{}',
  rating_average NUMERIC(3,2) NOT NULL DEFAULT 0.00,
  rating_count INTEGER NOT NULL DEFAULT 0,
  verified BOOLEAN NOT NULL DEFAULT FALSE,
  accepts_nhif BOOLEAN NOT NULL DEFAULT FALSE,
  private_only BOOLEAN NOT NULL DEFAULT FALSE,
  accepted_insurers TEXT[] NOT NULL DEFAULT '{}',
  price_consultation_bgn INTEGER NOT NULL DEFAULT 80,
  city TEXT NOT NULL,
  ai_review_summary TEXT,
  owner_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS doctors_slug_idx ON doctors(slug);
CREATE INDEX IF NOT EXISTS doctors_city_idx ON doctors(city);
CREATE INDEX IF NOT EXISTS doctors_specialty_id_idx ON doctors(specialty_id);
CREATE INDEX IF NOT EXISTS doctors_speaks_english_idx ON doctors(speaks_english);
CREATE INDEX IF NOT EXISTS doctors_rating_average_idx ON doctors(rating_average DESC);
CREATE INDEX IF NOT EXISTS doctors_name_trgm_idx ON doctors USING GIN (name gin_trgm_ops);

-- ============================================================
-- DOCTOR <-> CLINIC SCHEDULES
-- ============================================================
CREATE TABLE IF NOT EXISTS doctor_clinics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  doctor_id UUID NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  clinic_id UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
  schedule JSONB,
  is_primary BOOLEAN NOT NULL DEFAULT FALSE,
  UNIQUE(doctor_id, clinic_id)
);

CREATE INDEX IF NOT EXISTS doctor_clinics_doctor_id_idx ON doctor_clinics(doctor_id);
CREATE INDEX IF NOT EXISTS doctor_clinics_clinic_id_idx ON doctor_clinics(clinic_id);

-- ============================================================
-- APPOINTMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES doctors(id) ON DELETE RESTRICT,
  clinic_id UUID REFERENCES clinics(id) ON DELETE SET NULL,
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 30,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed', 'no_show')),
  payment_method TEXT NOT NULL DEFAULT 'private' CHECK (payment_method IN ('nhif', 'private', 'insurance', 'cash')),
  insurer_name TEXT,
  price_bgn INTEGER,
  reason TEXT,
  notes TEXT,
  reminder_sent BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS appointments_user_id_idx ON appointments(user_id);
CREATE INDEX IF NOT EXISTS appointments_doctor_id_idx ON appointments(doctor_id);
CREATE INDEX IF NOT EXISTS appointments_scheduled_at_idx ON appointments(scheduled_at);
CREATE INDEX IF NOT EXISTS appointments_status_idx ON appointments(status);
CREATE INDEX IF NOT EXISTS appointments_reminder_sent_idx ON appointments(reminder_sent) WHERE reminder_sent = FALSE;

-- ============================================================
-- REVIEWS
-- ============================================================
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  doctor_id UUID NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text TEXT,
  verified_patient BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, doctor_id)
);

CREATE INDEX IF NOT EXISTS reviews_doctor_id_idx ON reviews(doctor_id);
CREATE INDEX IF NOT EXISTS reviews_user_id_idx ON reviews(user_id);

-- ============================================================
-- WAITING LIST
-- ============================================================
CREATE TABLE IF NOT EXISTS waiting_list (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  preferred_dates JSONB,
  notified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, doctor_id)
);

CREATE INDEX IF NOT EXISTS waiting_list_doctor_id_idx ON waiting_list(doctor_id);
CREATE INDEX IF NOT EXISTS waiting_list_user_id_idx ON waiting_list(user_id);

-- ============================================================
-- TRIGGERS: updated_at
-- ============================================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER doctors_updated_at BEFORE UPDATE ON doctors
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER appointments_updated_at BEFORE UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ============================================================
-- TRIGGER: update doctor rating on review insert/update
-- ============================================================
CREATE OR REPLACE FUNCTION update_doctor_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE doctors SET
    rating_average = (SELECT ROUND(AVG(rating)::NUMERIC, 2) FROM reviews WHERE doctor_id = NEW.doctor_id),
    rating_count = (SELECT COUNT(*) FROM reviews WHERE doctor_id = NEW.doctor_id)
  WHERE id = NEW.doctor_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER reviews_update_doctor_rating
AFTER INSERT OR UPDATE ON reviews
FOR EACH ROW EXECUTE FUNCTION update_doctor_rating();
