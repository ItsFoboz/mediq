export default function PrivacyPage() {
  return (
    <div style={{ background: 'var(--bg-base)' }} className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-serif font-bold text-[#0F172A] mb-2">Privacy Policy</h1>
        <p className="text-sm text-[#94A3B8] mb-10">Last updated: January 2025</p>

        <div className="bg-white rounded-[20px] border border-[#E2E8F0] p-8 space-y-8" style={{ boxShadow: 'var(--shadow-card)' }}>
          {[
            {
              title: '1. Data controller',
              body: 'MEDIQ Ltd ("we", "us", "our") is the data controller for personal data collected through the MEDIQ platform (mediq.bg). We are registered in Bulgaria and operate in compliance with the EU General Data Protection Regulation (GDPR).',
            },
            {
              title: '2. Data we collect',
              body: 'We collect information you provide directly (name, email, appointment details), information collected automatically (device type, IP address, usage analytics via Plausible — a GDPR-compliant, cookieless analytics provider), and health-related information you voluntarily provide when using the Symptom Guide.',
            },
            {
              title: '3. How we use your data',
              body: 'We use your data to: provide the booking service and send appointment confirmations; send appointment reminders via SMS (opt-in); personalise your experience; improve our platform; comply with legal obligations. We do not sell your data to third parties.',
            },
            {
              title: '4. Symptom checker data',
              body: 'Text entered into the AI Symptom Guide is sent to OpenAI\'s API for processing. This data is subject to OpenAI\'s data processing agreement and is not stored on MEDIQ\'s servers beyond the duration of your session. We recommend you do not include personally identifiable information in your symptom descriptions.',
            },
            {
              title: '5. Data sharing',
              body: 'We share data with: doctors you book with (appointment details only); Stripe (payment processing); Twilio (SMS reminders); Resend (email delivery); Supabase (EU-hosted database infrastructure). All processors are contractually bound to protect your data.',
            },
            {
              title: '6. Data retention',
              body: 'Account data is retained for 3 years after your last active use. Appointment records are kept for 5 years as required by Bulgarian health regulations. You may request deletion at any time (see §8).',
            },
            {
              title: '7. Your rights (GDPR)',
              body: 'You have the right to: access your personal data; rectify inaccurate data; erase your data ("right to be forgotten"); restrict processing; data portability; object to processing; lodge a complaint with the Bulgarian Commission for Personal Data Protection (CPDP).',
            },
            {
              title: '8. Contact',
              body: 'For privacy requests, contact: privacy@mediq.bg. We will respond within 30 days.',
            },
          ].map((s) => (
            <div key={s.title}>
              <h2 className="text-lg font-semibold text-[#0F172A] mb-2">{s.title}</h2>
              <p className="text-sm text-[#64748B] leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
