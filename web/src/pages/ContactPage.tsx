import { useState } from 'react'
import { Mail, MessageSquare, Clock } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production: send via Resend API / Edge Function
    setSent(true)
  }

  return (
    <div style={{ background: 'var(--bg-base)' }} className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-[#0F172A] mb-3">Get in touch</h1>
          <p className="text-[#64748B]">We're here to help. Reach out and we'll respond within one business day.</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-8">
          <div className="sm:col-span-2">
            {sent ? (
              <div className="bg-white rounded-[20px] border border-[#E2E8F0] p-10 text-center" style={{ boxShadow: 'var(--shadow-card)' }}>
                <div className="w-14 h-14 bg-[#0D9E6E]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare size={28} className="text-[#0D9E6E]" />
                </div>
                <h2 className="text-xl font-semibold text-[#0F172A] mb-2">Message sent!</h2>
                <p className="text-[#64748B]">We'll get back to you at <strong>{form.email}</strong> within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-[20px] border border-[#E2E8F0] p-8 space-y-5" style={{ boxShadow: 'var(--shadow-card)' }}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Name</label>
                    <input
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-sm text-[#0F172A] outline-none focus:border-[#1A6BCC]"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Email</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-sm text-[#0F172A] outline-none focus:border-[#1A6BCC]"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Subject</label>
                  <select
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-sm text-[#0F172A] outline-none focus:border-[#1A6BCC]"
                  >
                    <option value="">Select a topic</option>
                    <option>Booking issue</option>
                    <option>Doctor listing</option>
                    <option>Billing / subscription</option>
                    <option>Technical problem</option>
                    <option>Partnership enquiry</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-sm text-[#0F172A] outline-none focus:border-[#1A6BCC] resize-none"
                    placeholder="Describe your issue or question..."
                  />
                </div>
                <Button variant="primary" fullWidth type="submit">Send message</Button>
              </form>
            )}
          </div>

          <div className="space-y-5">
            <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-5" style={{ boxShadow: 'var(--shadow-card)' }}>
              <Mail size={20} className="text-[#1A6BCC] mb-3" />
              <h3 className="font-semibold text-[#0F172A] mb-1">Email us</h3>
              <a href="mailto:hello@mediq.bg" className="text-sm text-[#1A6BCC] hover:underline">hello@mediq.bg</a>
            </div>
            <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-5" style={{ boxShadow: 'var(--shadow-card)' }}>
              <Clock size={20} className="text-[#1A6BCC] mb-3" />
              <h3 className="font-semibold text-[#0F172A] mb-1">Response time</h3>
              <p className="text-sm text-[#64748B]">We reply within 1 business day, Mon–Fri 9am–6pm EET.</p>
            </div>
            <div className="bg-[#EEF5FF] rounded-[16px] p-5">
              <h3 className="font-semibold text-[#0F172A] mb-1 text-sm">For doctors</h3>
              <p className="text-sm text-[#64748B]">Want to list your practice?{' '}
                <a href="/for-doctors" className="text-[#1A6BCC] hover:underline">See our doctor plans</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
