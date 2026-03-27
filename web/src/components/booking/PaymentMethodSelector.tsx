import { Info } from 'lucide-react'
import type { PaymentMethod } from '@mediq/shared'
import { BULGARIAN_INSURERS } from '@mediq/shared'

interface PaymentMethodSelectorProps {
  value: PaymentMethod | null
  onChange: (method: PaymentMethod) => void
  acceptsNhif: boolean
  acceptedInsurers: string[]
  insurerName: string
  onInsurerChange: (name: string) => void
}

const OPTIONS: { value: PaymentMethod; label: string; desc: string; icon: string }[] = [
  { value: 'nhif', label: 'NHIF (Здравна каса)', desc: 'Free with your health insurance card. Referral required.', icon: '🏥' },
  { value: 'private', label: 'Private (Cash)', desc: 'Pay at the clinic in BGN. No referral needed.', icon: '💵' },
  { value: 'insurance', label: 'Private Insurance', desc: 'Your insurer will be billed directly or you claim back.', icon: '🛡️' },
]

export default function PaymentMethodSelector({
  value, onChange, acceptsNhif, acceptedInsurers, insurerName, onInsurerChange
}: PaymentMethodSelectorProps) {
  const visibleOptions = OPTIONS.filter(o => o.value !== 'nhif' || acceptsNhif)

  return (
    <div className="space-y-3">
      {visibleOptions.map(opt => (
        <div key={opt.value}>
          <button
            type="button"
            onClick={() => onChange(opt.value)}
            className={`w-full flex items-start gap-4 p-4 rounded-[12px] border-2 text-left transition-all ${
              value === opt.value
                ? 'border-[#1A6BCC] bg-[#1A6BCC]/5'
                : 'border-[#E2E8F0] hover:border-[#CBD5E1] bg-white'
            }`}
          >
            <span className="text-2xl flex-shrink-0">{opt.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-[#0F172A] text-sm">{opt.label}</p>
              <p className="text-xs text-[#64748B] mt-0.5">{opt.desc}</p>
            </div>
            <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 transition-colors ${
              value === opt.value ? 'border-[#1A6BCC] bg-[#1A6BCC]' : 'border-[#CBD5E1]'
            }`}>
              {value === opt.value && <div className="w-1.5 h-1.5 bg-white rounded-full m-auto mt-[2px]" />}
            </div>
          </button>

          {/* NHIF info box */}
          {opt.value === 'nhif' && value === 'nhif' && (
            <div className="mt-2 flex gap-2 bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800">
              <Info size={14} className="flex-shrink-0 mt-0.5" />
              <span>
                You'll need a referral (<em>направление</em>) from your GP. If you don't have one, you can still book as a private patient.
              </span>
            </div>
          )}

          {/* Insurance insurer selector */}
          {opt.value === 'insurance' && value === 'insurance' && (
            <div className="mt-2">
              <label className="text-xs font-medium text-[#0F172A] block mb-1">Select your insurer</label>
              <select
                value={insurerName}
                onChange={e => onInsurerChange(e.target.value)}
                className="w-full text-sm border border-[#E2E8F0] rounded-lg px-3 py-2 bg-white text-[#0F172A] outline-none focus:border-[#1A6BCC]"
              >
                <option value="">Choose insurer…</option>
                {(acceptedInsurers.length > 0 ? acceptedInsurers : BULGARIAN_INSURERS).map(ins => (
                  <option key={ins} value={ins}>{ins}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
