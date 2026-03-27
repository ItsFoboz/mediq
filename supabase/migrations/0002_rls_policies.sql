-- Enable Row Level Security on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE specialties ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinics ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_clinics ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE waiting_list ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- USERS table
-- ============================================================
-- Users can read and update their own record
CREATE POLICY "users_select_own" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "users_update_own" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "users_insert_own" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- ============================================================
-- SPECIALTIES — public read, no write
-- ============================================================
CREATE POLICY "specialties_public_read" ON specialties
  FOR SELECT USING (TRUE);

-- ============================================================
-- CLINICS — public read, no write (admin only)
-- ============================================================
CREATE POLICY "clinics_public_read" ON clinics
  FOR SELECT USING (TRUE);

-- ============================================================
-- DOCTORS — public read; doctor can update own profile
-- ============================================================
CREATE POLICY "doctors_public_read" ON doctors
  FOR SELECT USING (TRUE);

CREATE POLICY "doctors_owner_update" ON doctors
  FOR UPDATE USING (auth.uid() = owner_user_id);

-- ============================================================
-- DOCTOR_CLINICS — public read (needed for doctor profiles)
-- ============================================================
CREATE POLICY "doctor_clinics_public_read" ON doctor_clinics
  FOR SELECT USING (TRUE);

-- ============================================================
-- APPOINTMENTS — users manage their own; doctors see their appointments
-- ============================================================
CREATE POLICY "appointments_user_select" ON appointments
  FOR SELECT USING (
    auth.uid() = user_id
    OR auth.uid() IN (
      SELECT owner_user_id FROM doctors WHERE id = appointments.doctor_id
    )
  );

CREATE POLICY "appointments_user_insert" ON appointments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "appointments_user_update" ON appointments
  FOR UPDATE USING (
    auth.uid() = user_id
    OR auth.uid() IN (
      SELECT owner_user_id FROM doctors WHERE id = appointments.doctor_id
    )
  );

CREATE POLICY "appointments_user_delete" ON appointments
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================================
-- REVIEWS — public read; user can manage own
-- ============================================================
CREATE POLICY "reviews_public_read" ON reviews
  FOR SELECT USING (TRUE);

CREATE POLICY "reviews_user_insert" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "reviews_user_update" ON reviews
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "reviews_user_delete" ON reviews
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================================
-- WAITING LIST — users manage their own entries
-- ============================================================
CREATE POLICY "waiting_list_user_select" ON waiting_list
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "waiting_list_user_insert" ON waiting_list
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "waiting_list_user_delete" ON waiting_list
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================================
-- SERVICE ROLE bypass (for edge functions)
-- Supabase service role automatically bypasses RLS
-- No extra policies needed; use service role key in functions
-- ============================================================
