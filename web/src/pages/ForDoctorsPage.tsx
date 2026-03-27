import { Link } from 'react-router-dom'
import { Check, Users, Calendar, BarChart2, Globe } from 'lucide-react'
import Button from '@/components/ui/Button'

const TIERS = [
  {
    name: 'Starter',
    price: 'Free',
    sub: 'forever',
    features: ['Profile listing', 'Up to 5 bookings/month', 'Basic analytics', 'MEDIQ badge'],
    cta: 'Get started free',
    highlight: false,
  },
  {
    name: 'Professional',
    price: '€29',
    sub: '/month',
    features: ['Everything in Starter', 'Unlimited bookings', 'Online payment processing', 'Patient messaging', 'Priority search placement', 'Verified badge', 'SMS reminders'],
    cta: 'Start free trial',
    highlight: true,
  },
  {
    name: 'Clinic',
    price: '€79',
    sub: '/month',
    features: ['Everything in Professional', 'Up to 10 doctor profiles', 'Clinic landing page', 'Receptionist access', 'Advanced analytics', 'API access', 'Dedicated onboarding'],
    cta: 'Contact sales',
    highlight: false,
  },
]

const WHY = [
  { icon: Globe, title: 'Reach English-speaking patients', body: 'Connect with the 200,000+ expats and foreign residents in Bulgaria who struggle to navigate the local healthcare system.' },
  { icon: Calendar, title: 'Fill your schedule automatically', body: 'Our smart calendar syncs with your existing schedule and automatically fills empty slots with qualified patients.' },
  { icon: Users, title: 'Reduce no-shows by 60%', body: 'Automated SMS and email reminders significantly reduce no-shows and last-minute cancellations.' },
  { icon: BarChart2, title: 'Grow your practice', body: 'Track booking trends, patient demographics, and revenue — all in one dashboard.' },
]

export default function ForDoctorsPage() {
  return (
    <div style={{ background: 'var(--bg-base)' }} className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0F172A] to-[#1A3A6B] py-20 px-4 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-4">
            Grow your practice with MEDIQ
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
            Join 500+ doctors across Bulgaria who use MEDIQ to reach English-speaking patients and manage their bookings online.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/pro/login">
              <Button variant="primary" size="lg">Get started free</Button>
            </Link>
            <Link to="/contact">
              <button className="px-6 py-3 border border-white/30 text-white rounded-[10px] hover:bg-white/10 transition-colors font-medium">
                Talk to us
              </button>
            </Link>
          </div>
          <p className="text-white/40 text-sm mt-4">No credit card required. Set up in 10 minutes.</p>
        </div>
      </div>

      {/* Why section */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-serif font-bold text-[#0F172A] text-center mb-12">Why doctors choose MEDIQ</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {WHY.map((w, i) => (
            <div key={i} className="bg-white rounded-[16px] border border-[#E2E8F0] p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
              <div className="w-12 h-12 bg-[#1A6BCC]/10 rounded-xl flex items-center justify-center mb-4">
                <w.icon size={24} className="text-[#1A6BCC]" />
              </div>
              <h3 className="font-semibold text-[#0F172A] mb-2">{w.title}</h3>
              <p className="text-sm text-[#64748B] leading-relaxed">{w.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-white py-16 px-4 border-y border-[#E2E8F0]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-[#0F172A] text-center mb-3">Simple, transparent pricing</h2>
          <p className="text-center text-[#64748B] mb-12">Start free. Upgrade as you grow.</p>
          <div className="grid sm:grid-cols-3 gap-6">
            {TIERS.map((tier) => (
              <div key={tier.name} className={`rounded-[20px] p-8 ${tier.highlight ? 'bg-[#1A6BCC] text-white' : 'bg-white border border-[#E2E8F0]'}`} style={tier.highlight ? {} : { boxShadow: 'var(--shadow-card)' }}>
                <p className={`text-sm font-medium uppercase tracking-wide mb-1 ${tier.highlight ? 'text-white/70' : 'text-[#64748B]'}`}>{tier.name}</p>
                <div className="flex items-end gap-1 mb-1">
                  <span className={`text-3xl font-bold ${tier.highlight ? 'text-white' : 'text-[#0F172A]'}`}>{tier.price}</span>
                  <span className={`mb-1 text-sm ${tier.highlight ? 'text-white/60' : 'text-[#94A3B8]'}`}>{tier.sub}</span>
                </div>
                <ul className="space-y-2 my-6">
                  {tier.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2 text-sm ${tier.highlight ? 'text-white/90' : 'text-[#64748B]'}`}>
                      <Check size={14} className={`mt-0.5 flex-shrink-0 ${tier.highlight ? 'text-white' : 'text-[#0D9E6E]'}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to={tier.name === 'Clinic' ? '/contact' : '/pro/login'}>
                  <button className={`w-full py-2.5 rounded-[10px] text-sm font-semibold transition-colors ${
                    tier.highlight ? 'bg-white text-[#1A6BCC] hover:bg-blue-50' : 'bg-[#1A6BCC] text-white hover:bg-[#155BB0]'
                  }`}>{tier.cta}</button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-serif font-bold text-[#0F172A] mb-3">Ready to get started?</h2>
        <p className="text-[#64748B] mb-6">Join hundreds of doctors already using MEDIQ to grow their English-speaking patient base.</p>
        <Link to="/pro/login">
          <Button variant="primary" size="lg">Create your free profile</Button>
        </Link>
      </div>
    </div>
  )
}
