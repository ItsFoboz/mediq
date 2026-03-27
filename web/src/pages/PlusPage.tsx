import { Check, X, Zap } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useSubscription } from '@/hooks/useSubscription'

const FEATURES = [
  { label: 'Browse doctors & clinics', free: true, plus: true },
  { label: 'Book appointments', free: '4/month', plus: '7/month' },
  { label: 'AI Symptom Guide', free: '3/day', plus: 'Unlimited' },
  { label: 'Save favourite doctors', free: false, plus: true },
  { label: 'Waiting list notifications', free: false, plus: true },
  { label: 'AI review summaries', free: false, plus: true },
  { label: 'Priority booking (2h slots)', free: false, plus: true },
  { label: 'Email appointment reminders', free: false, plus: true },
  { label: 'Export medical history PDF', free: false, plus: true },
]

export default function PlusPage() {
  const { isPro } = useSubscription()

  const handleUpgrade = () => {
    // Stripe checkout redirect — requires backend
    alert('Stripe Checkout integration requires VITE_STRIPE_PUBLIC_KEY to be configured.')
  }

  return (
    <div style={{ background: 'var(--bg-base)' }} className="min-h-screen">
      <div className="bg-gradient-to-b from-[#EEF5FF] to-transparent py-16 px-4 text-center">
        <div className="w-14 h-14 bg-[#1A6BCC] rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Zap size={28} className="text-white" />
        </div>
        <h1 className="text-4xl font-serif font-bold text-[#0F172A] mb-3">MEDIQ Plus</h1>
        <p className="text-lg text-[#64748B] max-w-xl mx-auto">
          Unlimited symptom checks, more appointments, and exclusive features for expats who take their health seriously.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-20">
        {/* Pricing cards */}
        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {/* Free */}
          <div className="bg-white rounded-[20px] border border-[#E2E8F0] p-8" style={{ boxShadow: 'var(--shadow-card)' }}>
            <div className="mb-6">
              <p className="text-sm font-medium text-[#64748B] uppercase tracking-wide mb-1">Free</p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold text-[#0F172A]">€0</span>
                <span className="text-[#94A3B8] mb-1">/month</span>
              </div>
              <p className="text-sm text-[#64748B] mt-2">Get started with basic access</p>
            </div>
            <Button variant="secondary" fullWidth disabled={!isPro}>
              {isPro ? 'Your previous plan' : 'Current plan'}
            </Button>
          </div>

          {/* Plus */}
          <div className="bg-[#1A6BCC] rounded-[20px] p-8 text-white relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Most popular
            </div>
            <div className="mb-6">
              <p className="text-sm font-medium text-white/70 uppercase tracking-wide mb-1">Plus</p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold">€9</span>
                <span className="text-white/70 mb-1">/month</span>
              </div>
              <p className="text-sm text-white/70 mt-2">Everything you need, billed monthly</p>
            </div>
            {isPro ? (
              <Button variant="secondary" fullWidth disabled>Active plan</Button>
            ) : (
              <button
                onClick={handleUpgrade}
                className="w-full bg-white text-[#1A6BCC] font-semibold py-3 rounded-[10px] hover:bg-blue-50 transition-colors"
              >
                Upgrade to Plus
              </button>
            )}
          </div>
        </div>

        {/* Feature comparison */}
        <div className="bg-white rounded-[20px] border border-[#E2E8F0] overflow-hidden" style={{ boxShadow: 'var(--shadow-card)' }}>
          <div className="grid grid-cols-3 border-b border-[#E2E8F0]">
            <div className="p-4 text-sm font-semibold text-[#0F172A]">Feature</div>
            <div className="p-4 text-center text-sm font-semibold text-[#64748B]">Free</div>
            <div className="p-4 text-center text-sm font-semibold text-[#1A6BCC]">Plus</div>
          </div>
          {FEATURES.map((f, i) => (
            <div key={i} className={`grid grid-cols-3 border-b border-[#F1F5F9] last:border-0 ${i % 2 === 0 ? '' : 'bg-[#F7F9FC]'}`}>
              <div className="p-4 text-sm text-[#0F172A]">{f.label}</div>
              <div className="p-4 flex justify-center items-center">
                {f.free === true ? <Check size={16} className="text-[#0D9E6E]" /> :
                 f.free === false ? <X size={16} className="text-[#CBD5E1]" /> :
                 <span className="text-xs text-[#64748B]">{f.free}</span>}
              </div>
              <div className="p-4 flex justify-center items-center">
                {f.plus === true ? <Check size={16} className="text-[#1A6BCC]" /> :
                 f.plus === false ? <X size={16} className="text-[#CBD5E1]" /> :
                 <span className="text-xs font-medium text-[#1A6BCC]">{f.plus}</span>}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-[#94A3B8] mt-6">
          Cancel anytime. No contracts. Prices in EUR, billed monthly via Stripe.
        </p>
      </div>
    </div>
  )
}
