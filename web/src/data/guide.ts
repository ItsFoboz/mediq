import type { GuideArticle } from '@mediq/shared'

export const guideArticles: GuideArticle[] = [
  {
    slug: 'healthcare-system',
    title: 'Understanding the Bulgarian Healthcare System',
    excerpt:
      'Bulgaria has a mixed public-private healthcare system. Here\'s what every expat needs to know before their first appointment.',
    category: 'System',
    reading_time_minutes: 8,
    last_updated: '2026-01-15',
    key_phrases: [
      { phrase: 'Имам нужда от лекар', translation: 'I need a doctor', phonetic: 'Imam nuzh-da ot le-kar' },
      { phrase: 'Болен съм', translation: 'I am sick', phonetic: 'Bo-len sam' },
      { phrase: 'Спешно е', translation: 'It is urgent', phonetic: 'Spesh-no e' },
      { phrase: 'Говорите ли английски?', translation: 'Do you speak English?', phonetic: 'Go-vo-ri-te li ang-liy-ski?' },
    ],
    cost_estimates: [
      { item: 'GP consultation (private)', cost_bgn: '40–80 BGN', cost_eur: '€20–41' },
      { item: 'Specialist consultation (private)', cost_bgn: '80–150 BGN', cost_eur: '€41–77' },
      { item: 'GP consultation (NHIF)', cost_bgn: 'Free', cost_eur: 'Free' },
      { item: 'Blood test panel', cost_bgn: '30–60 BGN', cost_eur: '€15–31' },
    ],
    content: `## How the Bulgarian Healthcare System Works

Bulgaria operates a **dual healthcare system** — a state-funded National Health Insurance Fund (NHIF, known as *НЗОК* in Bulgarian) alongside a robust private sector. As an expat, understanding both sides will save you time, money, and confusion.

### The Public System (NHIF / НЗОК)

The National Health Insurance Fund (NHIF) is Bulgaria's state insurer. If you are employed in Bulgaria or self-employed and paying social contributions, you are automatically enrolled. EU citizens can also access the system using their **European Health Insurance Card (EHIC)**.

**How it works:**
1. You register with a General Practitioner (GP / *семеен лекар*) — this is mandatory
2. For most specialist visits, your GP issues a **referral** (*направление*)
3. You present the referral to a specialist who is contracted with NHIF
4. You pay little or nothing for the consultation

**The catch:** Not all specialists work with NHIF, wait times can be long, and English-speaking NHIF doctors are rare.

### The Private System

Bulgaria's private healthcare sector has grown dramatically. Private clinics offer:
- Shorter wait times (often same-day or next-day)
- More English-speaking doctors
- Modern equipment
- Online booking (via platforms like MEDIQ)

Costs are paid out-of-pocket or reimbursed by private insurance. Prices are **significantly lower than Western Europe** — a specialist consultation typically costs €40–80.

### What Expats Typically Do

Most English-speaking expats use a **hybrid approach**:
- Register with a private GP who speaks English (costs €40–80/visit)
- Use that GP for referrals to private specialists
- Keep private health insurance for hospital stays and emergencies
- Use EHIC as backup for genuine emergencies

### Key Vocabulary

| Bulgarian | Pronunciation | Meaning |
|-----------|--------------|---------|
| Болница | Bol-ni-tsa | Hospital |
| Поликлиника | Po-li-kli-ni-ka | Outpatient clinic |
| Спешно отделение | Spesh-no ot-de-le-ni-e | Emergency department |
| Рецепта | Re-tsep-ta | Prescription |
| Направление | Na-prav-le-ni-e | Referral |
`,
  },
  {
    slug: 'nhif',
    title: 'How to Register for NHIF as a Foreign Resident',
    excerpt:
      'If you live and work in Bulgaria, you can access the national health insurance system. This guide walks you through registration step by step.',
    category: 'Insurance',
    reading_time_minutes: 7,
    last_updated: '2026-01-15',
    key_phrases: [
      { phrase: 'Искам да се регистрирам', translation: 'I want to register', phonetic: 'Is-kam da se re-gis-tri-ram' },
      { phrase: 'Здравна осигуровка', translation: 'Health insurance', phonetic: 'Zdrav-na o-si-gu-rov-ka' },
      { phrase: 'Лична карта', translation: 'ID card', phonetic: 'Lich-na kar-ta' },
    ],
    cost_estimates: [
      { item: 'NHIF monthly contribution (employed)', cost_bgn: '~8% of salary', cost_eur: 'Employer covers 4.8%' },
      { item: 'NHIF monthly contribution (self-employed)', cost_bgn: '~56 BGN/month', cost_eur: '~€29' },
      { item: 'Voluntary health insurance', cost_bgn: '100–300 BGN/month', cost_eur: '€51–153' },
    ],
    content: `## Registering for NHIF as a Foreign Resident

If you are a legal resident of Bulgaria and working here, you are entitled to join the National Health Insurance Fund (NHIF). Here's how.

### Who Qualifies?

- **EU/EEA citizens** working in Bulgaria (employed or self-employed)
- **Third-country nationals** with a long-term residence permit working in Bulgaria
- **Registered freelancers** paying Bulgarian social contributions

### Step-by-Step Registration

**Step 1: Get your Bulgarian ID (ЕГН or ЛНЧ)**
Foreign residents receive a Personal Number for Foreigners (*Личен Номер на Чужденец* / ЛНЧ). This is issued when you register your address at the local Migration Directorate.

**Step 2: Register your employment**
Your employer registers you with the National Revenue Agency (НАП). Health insurance contributions are deducted automatically from your salary.

**Step 3: Register with a GP**
Visit any NHIF-contracted GP with:
- Your ЛНЧ or passport
- Proof of health insurance status (your employer can provide this)

The GP registers you in their patient list. You can switch GP once per year.

**Step 4: Get your NHIF card**
Your GP can print a document confirming your registration. An electronic health card system is being rolled out.

### If You're Self-Employed

Register with the NRA and pay monthly contributions yourself. The minimum contribution base for 2026 is approximately 933 BGN/month, meaning you pay about 8% = 75 BGN/month.

### Gaps in Coverage

If you stop paying contributions for more than 3 months, you lose NHIF coverage. You can restore it by paying the missed contributions plus a penalty.
`,
  },
  {
    slug: 'ehic',
    title: 'Using Your EHIC Card in Bulgaria',
    excerpt:
      'Your European Health Insurance Card gives you access to state healthcare in Bulgaria. Here\'s what it covers and what it doesn\'t.',
    category: 'Insurance',
    reading_time_minutes: 6,
    last_updated: '2026-01-15',
    key_phrases: [
      { phrase: 'Имам европейска здравна карта', translation: 'I have a European health card', phonetic: 'I-mam ev-ro-pey-ska zdrav-na kar-ta' },
      { phrase: 'Спешна помощ', translation: 'Emergency help', phonetic: 'Spesh-na po-mosht' },
    ],
    cost_estimates: [
      { item: 'Emergency treatment (EHIC)', cost_bgn: 'Free or minimal co-pay', cost_eur: 'Free or minimal' },
      { item: 'Planned specialist visit (EHIC)', cost_bgn: 'Not covered', cost_eur: 'Not covered' },
    ],
    content: `## Using Your EHIC in Bulgaria

The European Health Insurance Card (EHIC) gives EU citizens access to **medically necessary** state healthcare in Bulgaria at the same cost as Bulgarian residents.

### What EHIC Covers

- Emergency treatment at state hospitals
- Treatment of chronic conditions that requires urgent care
- Maternity care (emergency)
- Treatment that becomes necessary during your stay

### What EHIC Does NOT Cover

- Planned or elective treatment
- Private clinic visits
- Repatriation costs
- Most prescription medications
- Dental treatment (except emergency extractions)

### How to Use It in Bulgaria

1. Go to an NHIF-contracted hospital or clinic
2. Show your EHIC and passport
3. Reception will verify your card and register you as an EU patient
4. Treatment proceeds — you pay nothing or a small co-payment

### Practical Reality

EHIC works best for **genuine emergencies**. For routine care, most expats find it easier to use private clinics. State hospitals accepting EHIC may have limited English-speaking staff.

**Tip:** Always carry your EHIC even if you have private insurance — it's useful as backup and for emergencies.
`,
  },
  {
    slug: 'private-insurance',
    title: 'Private Health Insurance in Bulgaria',
    excerpt:
      'A guide to the major private health insurers operating in Bulgaria, what they cover, and how to choose the right plan.',
    category: 'Insurance',
    reading_time_minutes: 7,
    last_updated: '2026-01-15',
    cost_estimates: [
      { item: 'Basic private insurance plan', cost_bgn: '100–200 BGN/month', cost_eur: '€51–102' },
      { item: 'Comprehensive plan with dental', cost_bgn: '250–450 BGN/month', cost_eur: '€128–230' },
      { item: 'International expat insurance', cost_bgn: '400–900 BGN/month', cost_eur: '€205–460' },
    ],
    content: `## Private Health Insurance in Bulgaria

Bulgaria has a competitive private health insurance market. For expats, private insurance is strongly recommended alongside (or instead of) relying on NHIF.

### Major Bulgarian Insurers

| Insurer | Known For |
|---------|-----------|
| **Generali** | International plans, good expat coverage |
| **Allianz** | Comprehensive plans, wide clinic network |
| **Bulstrad Life** | Competitive pricing |
| **DZI** | Large hospital network |
| **Unika** | Good specialist coverage |
| **Armeec** | Budget-friendly options |
| **Euroins** | Wide geographic coverage |

### What to Look For

**Clinic network:** Check which doctors and clinics accept your insurer. On MEDIQ, you can filter by insurer directly on the doctor search.

**Direct billing:** The best plans offer direct billing so you don't pay out of pocket and claim later.

**English support:** Some insurers have English-speaking claims teams. Ask before signing.

**Annual vs. monthly:** Annual plans are typically 10–15% cheaper.

### International Plans

If you work remotely or travel frequently, consider an international expat health plan (Cigna, AXA, Allianz Global). These cover you across Europe and often have better English support.
`,
  },
  {
    slug: 'gp-registration',
    title: 'How to Register with a GP (Семеен Лекар)',
    excerpt:
      'Registering with a GP is your first step into the Bulgarian healthcare system. Here\'s how to do it, even without speaking Bulgarian.',
    category: 'Finding Care',
    reading_time_minutes: 5,
    last_updated: '2026-01-15',
    key_phrases: [
      { phrase: 'Искам да се запиша при Вас', translation: 'I want to register with you', phonetic: 'Is-kam da se za-pi-sha pri Vas' },
      { phrase: 'Семеен лекар', translation: 'Family doctor / GP', phonetic: 'Se-me-en le-kar' },
      { phrase: 'Нямам личен лекар', translation: 'I don\'t have a GP', phonetic: 'Nya-mam li-chen le-kar' },
    ],
    content: `## Registering with a GP in Bulgaria

In Bulgaria, your GP (*семеен лекар* — family doctor) is the gateway to the healthcare system. NHIF requires you to be registered with one GP to access free specialist referrals.

### Why You Need a GP

- To get referrals (*направления*) to NHIF-contracted specialists
- For sick leave certificates (*болничен лист*)
- For prescription renewals
- As your primary care contact

### Finding an English-Speaking GP

Use MEDIQ's search and filter by "Speaks English" + "Accepts NHIF" + your city. Many private GPs speak English and can also work with NHIF patients.

### The Registration Process

**Step 1:** Find a GP accepting new patients (MEDIQ shows availability)

**Step 2:** Visit the GP's office with:
- Passport or Bulgarian ID
- ЛНЧ (personal number for foreigners)
- Your previous medical records (if any)

**Step 3:** Sign a registration form (*амбулаторен картон*)

**Step 4:** The GP registers you in the NHIF system. This takes 1–2 days to process.

### Important Notes

- You can only be registered with **one GP at a time**
- You can switch GP once per calendar year
- If you're not enrolled in NHIF, you can still see a GP privately (typically €40–80)

### What to Bring to Your First Appointment

Write down your medical history in advance. Mention:
- Chronic conditions
- Current medications (with dosages)
- Allergies
- Recent surgeries or hospitalizations
`,
  },
  {
    slug: 'emergency',
    title: 'Emergency Services in Bulgaria',
    excerpt:
      'Know what to do and who to call in a medical emergency in Bulgaria. The numbers, the hospitals, and what to expect.',
    category: 'Emergency',
    reading_time_minutes: 5,
    last_updated: '2026-01-15',
    key_phrases: [
      { phrase: 'Извикайте линейка!', translation: 'Call an ambulance!', phonetic: 'Iz-vi-kayte li-ney-ka!' },
      { phrase: 'Имам нужда от спешна помощ', translation: 'I need emergency help', phonetic: 'I-mam nuzh-da ot spesh-na pomosht' },
      { phrase: 'Боли ме', translation: 'It hurts / I am in pain', phonetic: 'Bo-li me' },
    ],
    content: `## Emergency Services in Bulgaria

### Emergency Numbers

| Service | Number |
|---------|--------|
| **EU Emergency (all services)** | **112** |
| **Bulgarian Ambulance** | **150** |
| Fire | 160 |
| Police | 166 |

**112 is your primary number.** Operators speak English. Use it for any life-threatening emergency.

### What Happens When You Call 112

1. An operator answers (English available on request)
2. Describe your emergency and location
3. An ambulance is dispatched (typically 8–15 minutes in cities)
4. You are taken to the nearest emergency department (*спешно отделение*)

### Major Emergency Hospitals

**Sofia:**
- Pirogov Emergency Hospital — bul. Gen. Totleben 21 (24/7 emergency)
- MBAL Tokuda — bul. Nikola Vaptsarov 51b

**Plovdiv:**
- UMBAL "Sveti Georgi" — bul. Peshtersko shose 66

**Varna:**
- MBAL "Sveta Marina" — bul. Hristo Smirnenski 1

### Using Your EHIC in an Emergency

Present your EHIC at the emergency department. You will receive treatment at no cost or a minimal co-payment.

### Private Emergency Clinics

Major private hospitals (Tokuda, Vita, Acibadem) have 24/7 emergency departments with better English coverage. Costs are higher but you can claim on private insurance.
`,
  },
  {
    slug: 'pharmacy',
    title: 'How Pharmacies Work in Bulgaria',
    excerpt:
      'Finding medication, understanding prescriptions, and navigating Bulgarian pharmacies as an English speaker.',
    category: 'Medications',
    reading_time_minutes: 5,
    last_updated: '2026-01-15',
    key_phrases: [
      { phrase: 'Имате ли...?', translation: 'Do you have...?', phonetic: 'I-ma-te li...?' },
      { phrase: 'Рецепта', translation: 'Prescription', phonetic: 'Re-tsep-ta' },
      { phrase: 'Без рецепта', translation: 'Without prescription / OTC', phonetic: 'Bez re-tsep-ta' },
      { phrase: 'Болкоуспокояващо', translation: 'Painkiller', phonetic: 'Bol-ko-us-po-ko-ya-vasho' },
    ],
    cost_estimates: [
      { item: 'Generic medication (OTC)', cost_bgn: '3–15 BGN', cost_eur: '€1.50–8' },
      { item: 'Prescription medication', cost_bgn: '10–50 BGN', cost_eur: '€5–26' },
      { item: 'NHIF prescription co-pay', cost_bgn: '1–5 BGN', cost_eur: '€0.50–2.60' },
    ],
    content: `## Pharmacies in Bulgaria

### Finding a Pharmacy

Pharmacies (*аптека* — apteka) are everywhere in Bulgarian cities. Look for the green cross sign. Most are open Mon–Fri 09:00–19:00, Sat 10:00–14:00.

**24-hour pharmacies** exist in all major cities. Use MEDIQ's Pharmacy Finder to locate the nearest one.

### Prescription vs. OTC

Many medications available only by prescription in the UK or Germany are sold over the counter in Bulgaria. Pharmacists are generally helpful and many speak some English.

**Common OTCs in Bulgaria:** Ibuprofen, paracetamol, most antibiotics (note: using antibiotics without medical advice is not recommended), antihistamines, antifungals.

### Using an NHIF Prescription

If your GP writes an NHIF prescription (*зелена рецепта* — green prescription), you pay only a co-payment (typically 1–5 BGN) for covered medications.

### Tips for Expats

1. **Bring medication names in generic form** (not brand names — Bulgarian brands differ)
2. **Show the box or leaflet** if you can't communicate the name
3. **Google Translate** works well for pointing at Bulgarian pharmacy signs
4. **Most major brands** (paracetamol = Panadol or Paramax, ibuprofen = Nurofen or Ibufen) are available

### Medication Storage

Bulgarian pharmacies maintain proper cold chains. Insulin and other refrigerated medications are widely available.
`,
  },
  {
    slug: 'specialists',
    title: 'Seeing a Specialist: How Referrals Work',
    excerpt:
      'When do you need a referral in Bulgaria? How do you get one? And what happens when you see a specialist without one?',
    category: 'Finding Care',
    reading_time_minutes: 6,
    last_updated: '2026-01-15',
    key_phrases: [
      { phrase: 'Нужно ли ми е направление?', translation: 'Do I need a referral?', phonetic: 'Nuzh-no li mi e na-prav-le-ni-e?' },
      { phrase: 'Направление от личния лекар', translation: 'Referral from the GP', phonetic: 'Na-prav-le-ni-e ot lich-ni-ya le-kar' },
      { phrase: 'Частен преглед', translation: 'Private consultation', phonetic: 'Chas-ten preg-led' },
    ],
    content: `## How Specialist Referrals Work in Bulgaria

### The NHIF Route (with referral)

To see a specialist for free (or minimal cost) under NHIF:
1. Visit your registered GP
2. GP evaluates your condition and issues a **referral** (*направление*)
3. The referral is valid for **30 days** and specifies the specialty
4. Find an NHIF-contracted specialist in that specialty
5. Book an appointment and bring the referral + your NHIF card

**Referral limits:** GPs are allocated a certain number of referrals per month. Near month-end, some GPs may be hesitant to issue more.

### The Private Route (no referral needed)

You can see any private specialist directly — no referral required. This is what most expats do because:
- English-speaking specialists are mainly in private practice
- No GP visit needed
- Faster appointments
- Modern facilities

Simply search MEDIQ, pick a specialist, and book.

### When You Need a Referral Even Privately

Some procedures at private hospitals require a referral for insurance reimbursement. Check your insurer's policy.

### Specialty Names in English and Bulgarian

| English | Bulgarian | Pronunciation |
|---------|-----------|--------------|
| Cardiologist | Кардиолог | Kar-di-o-log |
| Dermatologist | Дерматолог | Der-ma-to-log |
| Gynecologist | Гинеколог | Gi-ne-ko-log |
| Neurologist | Невролог | Nev-ro-log |
| Orthopedist | Ортопед | Or-to-ped |
| Gastroenterologist | Гастроентеролог | Gas-tro-en-te-ro-log |
| ENT | УНГ лекар | Oong le-kar |
`,
  },
  {
    slug: 'dental',
    title: 'Dental Care in Bulgaria: Costs and What to Expect',
    excerpt:
      'Bulgaria is a top destination for dental tourism. Costs are 50–70% lower than Western Europe, and quality is high. Here\'s everything you need to know.',
    category: 'Dental',
    reading_time_minutes: 7,
    last_updated: '2026-01-15',
    key_phrases: [
      { phrase: 'Боли ме зъб', translation: 'I have a toothache', phonetic: 'Bo-li me zab' },
      { phrase: 'Зъболекар', translation: 'Dentist', phonetic: 'Za-bo-le-kar' },
      { phrase: 'Имплант', translation: 'Implant', phonetic: 'Im-plant' },
    ],
    cost_estimates: [
      { item: 'Dental consultation', cost_bgn: '30–60 BGN', cost_eur: '€15–31' },
      { item: 'Filling (composite)', cost_bgn: '80–150 BGN', cost_eur: '€41–77' },
      { item: 'Root canal treatment', cost_bgn: '200–400 BGN', cost_eur: '€102–205' },
      { item: 'Dental implant (full)', cost_bgn: '1,200–2,000 BGN', cost_eur: '€614–1,023' },
      { item: 'Teeth whitening', cost_bgn: '300–600 BGN', cost_eur: '€153–307' },
      { item: 'Porcelain crown', cost_bgn: '400–700 BGN', cost_eur: '€205–358' },
    ],
    content: `## Dental Care in Bulgaria

Bulgaria is internationally recognized for high-quality, affordable dental care. Many expats and dental tourists from the UK, Germany, and Scandinavia come specifically for dental work.

### Why Bulgarian Dentistry is So Popular

- **50–70% cheaper** than Western Europe for equivalent procedures
- **Highly trained dentists** — many trained at Western European universities
- **Modern clinics** — most private dental clinics are well-equipped
- **English-speaking dentists** — more common in dental than in general medicine
- **Short wait times** — appointments often available within days

### What NHIF Covers for Dental

NHIF dental coverage is very limited:
- Emergency tooth extractions only
- Children under 18 get more coverage

For all other dental work, you pay privately.

### Finding a Dentist

Use MEDIQ's specialist search, filter for "Dentist" specialty. Read reviews — verified patient reviews are especially useful for dental work where results are visible.

### Dental Tourism Tips

If you're coming specifically for dental work:
1. Get a **treatment plan and quote** via email before arriving
2. Plan for **multiple visits** — crowns and implants require at least 2 visits (sometimes 3–4)
3. **Allow healing time** between procedures
4. Ask about **warranties** — good clinics offer guarantees on implants (typically 5–10 years)

### Common Procedures and Timeline

| Procedure | Sessions | Total Time |
|-----------|----------|-----------|
| Filling | 1 | Same day |
| Root canal | 2–3 | 1–2 weeks |
| Crown | 2 | 1–2 weeks |
| Implant | 3–4 | 3–6 months |
`,
  },
]
