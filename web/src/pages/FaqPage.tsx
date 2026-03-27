import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  {
    q: 'Do all doctors on MEDIQ speak English?',
    a: 'Yes. Every doctor listed on MEDIQ has been verified to speak English at a conversational or professional level. We require this before approving any new listing.',
  },
  {
    q: 'How does booking work?',
    a: 'Choose a doctor, pick an available time slot, and complete the booking form. You\'ll receive an email confirmation with the clinic address, doctor contact details, and preparation instructions if applicable.',
  },
  {
    q: 'What is NHIF and can I use it as a foreigner?',
    a: 'NHIF (НЗОК) is Bulgaria\'s National Health Insurance Fund. As a legally registered resident in Bulgaria, you may be entitled to NHIF coverage. EU/EEA citizens with a European Health Insurance Card (EHIC) can also access emergency care. Long-term residents who pay Bulgarian social security contributions can register for full NHIF benefits.',
  },
  {
    q: 'What insurers do doctors accept?',
    a: 'Most private doctors accept major Bulgarian insurers including Generali, Allianz, Bulstrad Life, DZI, Unika, Armeec, Euroins, and Groupama. You can filter by insurer on the search page.',
  },
  {
    q: 'What is the AI Symptom Guide?',
    a: 'The AI Symptom Guide uses GPT-4o to analyse your symptoms and suggest which type of specialist to see. It is not a medical diagnosis — it is a triage tool to help you navigate the Bulgarian healthcare system. Emergency keywords always trigger an immediate alert to call 112 or 150 before any AI analysis.',
  },
  {
    q: 'How many free bookings do I get?',
    a: 'Free accounts can make up to 4 appointments per month. Upgrading to MEDIQ Plus gives you 7 appointments per month, unlimited symptom checks, and additional features.',
  },
  {
    q: 'Can I cancel or reschedule?',
    a: 'Yes. You can cancel or reschedule any appointment up to 24 hours before the scheduled time from your Appointments page. Cancellations within 24 hours may be subject to a cancellation fee at the doctor\'s discretion.',
  },
  {
    q: 'Is my health data secure?',
    a: 'MEDIQ uses Supabase (hosted in the EU) with Row Level Security on all personal data tables. Your symptom checker input is processed by OpenAI but is not stored on MEDIQ\'s servers. We are GDPR-compliant.',
  },
  {
    q: 'Are the prices listed accurate?',
    a: 'Listed prices are the standard private consultation fee provided by each doctor. Actual costs may vary based on the complexity of your visit, additional tests, or follow-up procedures. EUR prices are calculated at the fixed BGN/EUR conversion rate of 1.95583 (Bulgaria pegged rate in ERM II).',
  },
  {
    q: 'How do I add my own doctor to MEDIQ?',
    a: 'Doctors can create a free profile by visiting the For Doctors page. After submitting your details and English proficiency verification, we review and approve listings within 2 business days.',
  },
  {
    q: 'What happens if I need urgent care?',
    a: 'For medical emergencies, call 112 (EU emergency) or 150 (Bulgarian ambulance) immediately. Our Symptom Guide will always show emergency contact information when relevant. For urgent but non-emergency situations, use the Symptom Guide to find the right specialist and book an urgent appointment.',
  },
  {
    q: 'Does MEDIQ work outside Sofia?',
    a: 'Yes. MEDIQ lists doctors in Sofia, Plovdiv, Varna, Burgas, Veliko Tarnovo, and other major Bulgarian cities. Coverage is best in Sofia but we\'re actively expanding to more cities.',
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-[#E2E8F0] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-medium text-[#0F172A] text-sm">{q}</span>
        <ChevronDown size={16} className={`flex-shrink-0 text-[#94A3B8] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <p className="text-sm text-[#64748B] leading-relaxed pb-5">{a}</p>}
    </div>
  )
}

export default function FaqPage() {
  return (
    <div style={{ background: 'var(--bg-base)' }} className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-[#0F172A] mb-3">Frequently asked questions</h1>
          <p className="text-[#64748B]">Everything you need to know about MEDIQ and healthcare in Bulgaria.</p>
        </div>
        <div className="bg-white rounded-[20px] border border-[#E2E8F0] px-8" style={{ boxShadow: 'var(--shadow-card)' }}>
          {FAQS.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
        </div>
        <p className="text-center text-sm text-[#94A3B8] mt-8">
          Still have questions?{' '}
          <a href="/contact" className="text-[#1A6BCC] hover:underline">Contact us</a>
        </p>
      </div>
    </div>
  )
}
