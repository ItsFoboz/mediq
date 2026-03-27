export default function TermsPage() {
  return (
    <div style={{ background: 'var(--bg-base)' }} className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-serif font-bold text-[#0F172A] mb-2">Terms of Service</h1>
        <p className="text-sm text-[#94A3B8] mb-10">Last updated: January 2025</p>

        <div className="bg-white rounded-[20px] border border-[#E2E8F0] p-8 space-y-8" style={{ boxShadow: 'var(--shadow-card)' }}>
          {[
            {
              title: '1. Service description',
              body: 'MEDIQ is an online platform that connects patients with English-speaking healthcare providers in Bulgaria. We facilitate appointment bookings but are not a healthcare provider. We do not provide medical advice, diagnosis, or treatment.',
            },
            {
              title: '2. Eligibility',
              body: 'You must be at least 18 years old to create an account. By using MEDIQ, you confirm that you are legally permitted to enter into binding contracts.',
            },
            {
              title: '3. Medical disclaimer',
              body: 'The AI Symptom Guide is a triage assistance tool only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider. In case of emergency, call 112 (EU) or 150 (Bulgaria) immediately.',
            },
            {
              title: '4. Appointments and cancellations',
              body: 'When you book an appointment, you enter into a direct agreement with the healthcare provider. MEDIQ facilitates but is not party to this agreement. Cancellation policies are set by individual doctors. We recommend cancelling at least 24 hours in advance.',
            },
            {
              title: '5. Payments',
              body: 'Payment processing is handled by Stripe. By making a payment, you agree to Stripe\'s Terms of Service. MEDIQ Plus subscriptions are billed monthly. Refunds for appointments are handled between you and the doctor directly.',
            },
            {
              title: '6. User conduct',
              body: 'You agree not to: misuse the platform; provide false information; spam doctors with fake bookings; attempt to circumvent appointment limits; use automated bots or scrapers; post fraudulent reviews.',
            },
            {
              title: '7. Intellectual property',
              body: 'All content on MEDIQ (design, copy, guide articles) is the property of MEDIQ Ltd. Doctor profiles, photos, and information are used with the consent of the respective practitioners.',
            },
            {
              title: '8. Limitation of liability',
              body: 'To the maximum extent permitted by law, MEDIQ shall not be liable for: the quality of medical services provided by listed doctors; medical outcomes; errors in the AI Symptom Guide; service interruptions. Our total liability is limited to the subscription fees paid in the 3 months preceding any claim.',
            },
            {
              title: '9. Governing law',
              body: 'These Terms are governed by the laws of the Republic of Bulgaria. Any disputes shall be subject to the jurisdiction of the Sofia City Court.',
            },
            {
              title: '10. Contact',
              body: 'Questions about these Terms: legal@mediq.bg',
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
