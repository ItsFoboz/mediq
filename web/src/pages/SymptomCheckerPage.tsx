import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, Stethoscope, Clock, ArrowRight, Info } from 'lucide-react'
import { isEmergencySymptom, EMERGENCY_NUMBERS } from '@mediq/shared'
import { checkSymptoms, incrementSymptomCheckerUse } from '@/lib/openai'
import type { SymptomCheckResult } from '@mediq/shared'
import { useSubscription } from '@/hooks/useSubscription'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

const URGENCY_CONFIG = {
  routine: { color: 'green' as const, label: 'Routine', desc: 'No rush — book a regular appointment.' },
  soon: { color: 'yellow' as const, label: 'See a doctor soon', desc: 'Book within the next few days.' },
  urgent: { color: 'red' as const, label: 'Urgent', desc: 'Seek medical attention today.' },
  emergency: { color: 'red' as const, label: 'Emergency', desc: 'Call emergency services immediately.' },
}

export default function SymptomCheckerPage() {
  const [text, setText] = useState('')
  const [result, setResult] = useState<SymptomCheckResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isEmergency, setIsEmergency] = useState(false)
  const { canUseSymptomChecker, symptomCheckerUsesLeft, isPro } = useSubscription()

  const handleCheck = async () => {
    if (!text.trim() || !canUseSymptomChecker) return
    setError('')
    setResult(null)

    // Check for emergency keywords first (no API call needed)
    if (isEmergencySymptom(text)) {
      setIsEmergency(true)
      return
    }
    setIsEmergency(false)
    setIsLoading(true)
    try {
      incrementSymptomCheckerUse()
      const res = await checkSymptoms(text)
      setResult(res)
    } catch {
      setError('Unable to analyse symptoms right now. Please try again or consult a doctor directly.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ background: 'var(--bg-base)' }} className="min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#1A6BCC]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Stethoscope size={28} className="text-[#1A6BCC]" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#0F172A] mb-2">AI Symptom Guide</h1>
          <p className="text-[#64748B]">Describe your symptoms and we'll suggest which specialist to see in Bulgaria.</p>
          <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-[#94A3B8]">
            <Info size={12} />Not a diagnosis. Always consult a qualified doctor.
          </div>
        </div>

        {/* Emergency banner */}
        {isEmergency && (
          <div className="bg-red-50 border-2 border-red-400 rounded-[16px] p-6 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle size={24} className="text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="text-lg font-bold text-red-800 mb-2">This sounds like a medical emergency</h2>
                <p className="text-red-700 mb-4">Do not wait for an appointment. Call emergency services immediately.</p>
                <div className="flex gap-3 flex-wrap">
                  <a href="tel:112" className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-lg hover:bg-red-700">
                    📞 112 — EU Emergency
                  </a>
                  <a href="tel:150" className="flex items-center gap-2 bg-red-100 text-red-800 border border-red-300 px-4 py-2 rounded-lg font-bold text-lg hover:bg-red-200">
                    🚑 150 — Ambulance
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Input area */}
        <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-6 mb-5" style={{ boxShadow: 'var(--shadow-card)' }}>
          <label className="text-sm font-medium text-[#0F172A] block mb-2">Describe your symptoms</label>
          <textarea
            value={text}
            onChange={e => { setText(e.target.value); setIsEmergency(false); setResult(null) }}
            placeholder="e.g. I have a sharp pain in my lower right abdomen, started 2 days ago, getting worse..."
            rows={4}
            className="w-full text-sm border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:border-[#1A6BCC] resize-none mb-4"
          />

          {!canUseSymptomChecker && !isPro ? (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 text-sm text-amber-800">
              You've used all {3} free symptom checks today.{' '}
              <Link to="/plus" className="font-semibold text-[#1A6BCC] hover:underline">Upgrade to MEDIQ Plus</Link> for unlimited access.
            </div>
          ) : !isPro && (
            <p className="text-xs text-[#94A3B8] mb-3">{symptomCheckerUsesLeft} free check{symptomCheckerUsesLeft !== 1 ? 's' : ''} remaining today</p>
          )}

          {error && <p className="text-sm text-red-600 mb-3">{error}</p>}

          <Button
            variant="primary"
            fullWidth
            size="lg"
            onClick={handleCheck}
            isLoading={isLoading}
            disabled={!text.trim() || !canUseSymptomChecker}
          >
            {isLoading ? 'Analysing…' : 'Analyse Symptoms'}
          </Button>
        </div>

        {/* Result */}
        {result && (
          <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <p className="text-xs text-[#94A3B8] uppercase tracking-wide font-medium mb-1">Suggested Specialist</p>
                <h2 className="text-xl font-serif font-bold text-[#0F172A]">{result.specialist_en}</h2>
                <p className="text-sm text-[#94A3B8]">{result.specialist_bg}</p>
              </div>
              <Badge variant={URGENCY_CONFIG[result.urgency]?.color ?? 'gray'}>
                <Clock size={11} className="inline mr-1" />
                {URGENCY_CONFIG[result.urgency]?.label ?? result.urgency}
              </Badge>
            </div>

            <p className="text-sm text-[#64748B] leading-relaxed mb-4">{result.advice}</p>

            {result.what_to_tell_doctor && (
              <div className="bg-[#F7F9FC] rounded-lg p-3 mb-4">
                <p className="text-xs font-medium text-[#0F172A] mb-1">What to tell the doctor</p>
                <p className="text-sm text-[#64748B]">{result.what_to_tell_doctor}</p>
              </div>
            )}

            {result.bulgarian_phrases?.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-medium text-[#0F172A] mb-2">Useful Bulgarian phrases</p>
                <div className="space-y-1.5">
                  {result.bulgarian_phrases.map((p, i) => (
                    <div key={i} className="text-xs flex gap-3">
                      <span className="font-medium text-[#0F172A] flex-1">{p.phrase}</span>
                      <span className="text-[#64748B] flex-1">{p.translation}</span>
                      <span className="text-[#94A3B8] italic flex-1">{p.phonetic}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Link to={`/doctors?specialty=${result.specialty_slug}`}>
              <Button variant="primary" fullWidth>
                Find a {result.specialist_en} near me <ArrowRight size={16} className="ml-1" />
              </Button>
            </Link>

            <p className="text-xs text-[#94A3B8] mt-3 text-center">{result.disclaimer}</p>
          </div>
        )}
      </div>
    </div>
  )
}
