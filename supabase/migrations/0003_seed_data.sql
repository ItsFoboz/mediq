-- Seed: 10 specialties
INSERT INTO specialties (slug, name_en, name_bg, icon_name, description_en, common_conditions_en) VALUES
  ('cardiologist', 'Cardiologist', 'Кардиолог', 'Heart', 'Heart and cardiovascular system specialist', ARRAY['Hypertension', 'Arrhythmia', 'Heart failure', 'Coronary artery disease', 'Chest pain']),
  ('dermatologist', 'Dermatologist', 'Дерматолог', 'Microscope', 'Skin, hair, and nail specialist', ARRAY['Eczema', 'Psoriasis', 'Acne', 'Rosacea', 'Skin cancer screening', 'Hair loss']),
  ('neurologist', 'Neurologist', 'Невролог', 'Brain', 'Brain and nervous system specialist', ARRAY['Migraines', 'Epilepsy', 'Stroke recovery', 'Multiple sclerosis', 'Parkinson''s']),
  ('orthopedist', 'Orthopedist', 'Ортопед', 'Bone', 'Bone and joint specialist', ARRAY['Back pain', 'Sports injuries', 'Arthritis', 'Fractures', 'Joint replacement']),
  ('gynecologist', 'Gynecologist', 'Гинеколог', 'Baby', 'Women''s reproductive health specialist', ARRAY['Annual check-ups', 'Pregnancy care', 'Menstrual disorders', 'Menopause', 'Contraception']),
  ('ophthalmologist', 'Ophthalmologist', 'Офталмолог', 'Eye', 'Eye and vision specialist', ARRAY['Vision correction', 'Cataracts', 'Glaucoma', 'Retinal disorders', 'Dry eye syndrome']),
  ('gastroenterologist', 'Gastroenterologist', 'Гастроентеролог', 'Activity', 'Digestive system specialist', ARRAY['IBS', 'Gastritis', 'GERD', 'Colonoscopy', 'Liver disease', 'Crohn''s disease']),
  ('endocrinologist', 'Endocrinologist', 'Ендокринолог', 'Zap', 'Hormone and metabolic specialist', ARRAY['Diabetes', 'Thyroid disorders', 'Obesity', 'Adrenal disorders', 'Hormonal imbalances']),
  ('psychiatrist', 'Psychiatrist', 'Психиатър', 'Brain', 'Mental health specialist', ARRAY['Depression', 'Anxiety', 'ADHD', 'Bipolar disorder', 'PTSD', 'Burnout']),
  ('dentist', 'Dentist', 'Стоматолог', 'Smile', 'Dental and oral health specialist', ARRAY['Tooth pain', 'Fillings', 'Root canal', 'Teeth whitening', 'Implants', 'Orthodontics'])
ON CONFLICT (slug) DO NOTHING;

-- Seed: 6 clinics
INSERT INTO clinics (slug, name, type, address, city, phone, lat, lng, accepts_nhif, opening_hours) VALUES
  (
    'vita-hospital-sofia',
    'Vita Hospital',
    'hospital',
    '1 Andrey Lyapchev Blvd, Sofia 1799',
    'Sofia',
    '+359 2 807 8500',
    42.6782,
    23.3753,
    TRUE,
    '{"mon_fri": "08:00–20:00", "sat": "09:00–16:00", "sun": "Closed"}'
  ),
  (
    'robert-koch-clinic-sofia',
    'Robert Koch Clinic',
    'polyclinic',
    '49 Robert Koch St, Sofia 1431',
    'Sofia',
    '+359 2 851 1000',
    42.6952,
    23.3143,
    FALSE,
    '{"mon_fri": "08:30–18:00", "sat": "09:00–13:00", "sun": "Closed"}'
  ),
  (
    'plovdiv-clinic',
    'Plovdiv Medical Center',
    'polyclinic',
    '15 Hristo Botev Blvd, Plovdiv 4000',
    'Plovdiv',
    '+359 32 627 400',
    42.1465,
    24.7511,
    TRUE,
    '{"mon_fri": "08:00–18:00", "sat": "09:00–14:00", "sun": "Closed"}'
  ),
  (
    'varna-medical-center',
    'Varna Medical Center',
    'diagnostic_center',
    '7 Republika Blvd, Varna 9000',
    'Varna',
    '+359 52 648 500',
    43.2141,
    27.9147,
    TRUE,
    '{"mon_fri": "07:30–19:00", "sat": "08:00–14:00", "sun": "Closed"}'
  ),
  (
    'burgas-clinic',
    'Burgas Clinic',
    'polyclinic',
    '73 San Stefano St, Burgas 8000',
    'Burgas',
    '+359 56 813 800',
    42.5052,
    27.4613,
    TRUE,
    '{"mon_fri": "08:00–18:00", "sat": "Closed", "sun": "Closed"}'
  ),
  (
    'varna-city-clinic',
    'City Clinic Varna',
    'private_practice',
    '3 Slivnitsa Blvd, Varna 9000',
    'Varna',
    '+359 52 600 100',
    43.2081,
    27.9163,
    FALSE,
    '{"mon_fri": "09:00–17:00", "sat": "Closed", "sun": "Closed"}'
  )
ON CONFLICT (slug) DO NOTHING;
