import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Calendar, User, CreditCard, Check } from 'lucide-react'
import { formatDate, formatTime } from '@mediq/shared'
import { doctors } from '@/data/doctors'
import { useBookingStore } from '@/store/bookingStore'
import Button from '@/components/ui/Button'
import SlotPicker from './SlotPicker'
import PaymentMethodSelector from './PaymentMethodSelector'

interface BookingFlowProps {
  doctorId: string
}

const STEPS = [
  { label: 'Select Time', icon: Calendar },
  { label: 'Your Details', icon: User },
  { label: 'Confirm', icon: CreditCard },
]

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? 40 : -40, opacity: 0 }),
}

export default function BookingFlow({ doctorId }: BookingFlowProps) {
  const navigate = useNavigate()
  const store = useBookingStore()
  const doctor = doctors.find(d => d.id === doctorId)
  const [dir, setDir] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [gdprConsent, setGdprConsent] = useState(false)

  if (!doctor) return (
    <div className="text-center py-20 text-[#94A3B8]">Doctor not found</div>
  )

  const currentStep = typeof store.step === 'number' ? store.step : 1

  const goTo = (next: number) => {
    setDir(next > currentStep ? 1 : -1)
    store.setStep(next as 1 | 2 | 3)
  }

  const handleConfirm = async () => {
    setIsSubmitting(true)
    await new Promise(r => setTimeout(r, 1400))
    setIsSubmitting(false)
    setConfirmed(true)
  }

  if (confirmed) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16 px-4">
        <div className="w-16 h-16 bg-[#0D9E6E]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={36} className="text-[#0D9E6E]" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-[#0F172A] mb-2">Booking Confirmed!</h2>
        <p className="text-[#64748B] mb-1">Your appointment with <strong>{doctor.name}</strong></p>
        {store.selectedSlot && (
          <p className="text-[#64748B] mb-6">
            {formatDate(store.selectedSlot)} at {formatTime(store.selectedSlot)}
          </p>
        )}
        <p className="text-sm text-[#94A3B8] mb-8">
          A confirmation email has been sent. You'll receive an SMS reminder 2 days before your appointment.
        </p>
        <div className="flex gap-3 justify-center">
          <Button variant="primary" onClick={() => navigate('/appointments')}>View Appointments</Button>
          <Button variant="secondary" onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-6 p-4 bg-white rounded-[12px] border border-[#E2E8F0]">
        <img src={doctor.photo_url} alt={doctor.name}
          className="w-12 h-12 rounded-full object-cover"
          onError={e => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=1A6BCC&color=fff&size=96` }} />
        <div>
          <p className="font-semibold text-[#0F172A]">{doctor.name}</p>
          <p className="text-sm text-[#64748B]">{doctor.specialty.name_en} · {doctor.city}</p>
        </div>
      </div>

      <div className="flex items-center mb-8">
        {STEPS.map((step, i) => {
          const stepNum = i + 1
          const done = currentStep > stepNum
          const active = currentStep === stepNum
          return (
            <div key={step.label} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  done ? 'bg-[#0D9E6E] text-white' : active ? 'bg-[#1A6BCC] text-white' : 'bg-[#F7F9FC] text-[#94A3B8] border border-[#E2E8F0]'
                }`}>
                  {done ? <Check size={14} /> : stepNum}
                </div>
                <span className={`text-xs mt-1 whitespace-nowrap ${active ? 'text-[#1A6BCC] font-medium' : 'text-[#94A3B8]'}`}>
                  {step.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 mb-4 transition-colors ${done ? 'bg-[#0D9E6E]' : 'bg-[#E2E8F0]'}`} />
              )}
            </div>
          )
        })}
      </div>

      <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div key={store.step} custom={dir} variants={slideVariants}
            initial="enter" animate="center" exit="exit" transition={{ duration: 0.18 }}>

            {currentStep === 1 && (
              <div>
                <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Select a time slot</h2>
                <SlotPicker
                  doctor={doctor}
                  selectedSlot={store.selectedSlot}
                  selectedClinicId={store.clinicId ?? doctor.clinics[0]?.clinic_id}
                  onSlotSelect={slot => store.setSelectedSlot(slot)}
                  onClinicSelect={id => store.setClinicId(id)}
                />
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-5">
                <h2 className="text-lg font-semibold text-[#0F172A]">Your Details</h2>
                <div>
                  <label className="text-sm font-medium text-[#0F172A] block mb-1.5">
                    Reason for visit <span className="text-[#94A3B8] font-normal">(optional)</span>
                  </label>
                  <textarea
                    value={store.reasonForVisit}
                    onChange={e => store.setReasonForVisit(e.target.value)}
                    placeholder="Brief description of your symptoms or concerns…"
                    maxLength={200}
                    rows={3}
                    className="w-full text-sm border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:border-[#1A6BCC] resize-none"
                  />
                  <p className="text-xs text-[#94A3B8] text-right mt-1">{store.reasonForVisit.length}/200</p>
                </div>
                <div>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 accent-[#1A6BCC]" />
                    <span className="text-sm text-[#0F172A]">This is my first visit to this doctor</span>
                  </label>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#0F172A] mb-3">Payment method</p>
                  <PaymentMethodSelector
                    value={store.paymentMethod}
                    onChange={m => store.setPaymentMethod(m)}
                    acceptsNhif={doctor.accepts_nhif}
                    acceptedInsurers={doctor.accepted_insurers}
                    insurerName={store.insurerName}
                    onInsurerChange={n => store.setInsurerName(n)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#0F172A] block mb-1.5">
                    Notes for doctor <span className="text-[#94A3B8] font-normal">(optional)</span>
                  </label>
                  <textarea
                    value={store.specialNotes}
                    onChange={e => store.setSpecialNotes(e.target.value)}
                    placeholder="Anything else you'd like the doctor to know…"
                    rows={2}
                    className="w-full text-sm border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:border-[#1A6BCC] resize-none"
                  />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-5">
                <h2 className="text-lg font-semibold text-[#0F172A]">Confirm your booking</h2>
                <div className="bg-[#F7F9FC] rounded-[12px] p-4 space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-[#64748B]">Doctor</span><span className="font-medium text-[#0F172A]">{doctor.name}</span></div>
                  {store.selectedSlot && (
                    <div className="flex justify-between">
                      <span className="text-[#64748B]">Date & Time</span>
                      <span className="font-medium text-[#0F172A]">{formatDate(store.selectedSlot)} · {formatTime(store.selectedSlot)}</span>
                    </div>
                  )}
                  <div className="flex justify-between"><span className="text-[#64748B]">Payment</span><span className="font-medium text-[#0F172A] capitalize">{store.paymentMethod ?? '—'}</span></div>
                  <div className="flex justify-between border-t border-[#E2E8F0] pt-3 mt-3">
                    <span className="font-semibold text-[#0F172A]">Consultation fee</span>
                    <span className="font-bold text-[#0F172A]">{doctor.price_consultation_bgn} BGN</span>
                  </div>
                </div>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input type="checkbox" checked={gdprConsent} onChange={e => setGdprConsent(e.target.checked)} className="w-4 h-4 mt-0.5 accent-[#1A6BCC]" />
                  <span className="text-xs text-[#64748B]">
                    I consent to MEDIQ storing my appointment data and sharing it with the doctor. I have read the{' '}
                    <a href="/privacy" className="text-[#1A6BCC] hover:underline">Privacy Policy</a>.
                  </span>
                </label>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between mt-6">
        {currentStep > 1 ? (
          <Button variant="secondary" onClick={() => goTo(currentStep - 1)}>Back</Button>
        ) : <div />}

        {currentStep < 3 ? (
          <Button
            variant="primary"
            disabled={currentStep === 1 ? !store.selectedSlot : !store.paymentMethod}
            onClick={() => goTo(currentStep + 1)}
          >
            Continue
          </Button>
        ) : (
          <Button variant="primary" disabled={!gdprConsent} isLoading={isSubmitting} onClick={handleConfirm}>
            Confirm Booking
          </Button>
        )}
      </div>
    </div>
  )
}
