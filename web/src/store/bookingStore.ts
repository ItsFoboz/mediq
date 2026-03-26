import { create } from 'zustand'
import type { PaymentMethod } from '@mediq/shared'

export type BookingStep = 1 | 2 | 3 | 'success'

interface BookingState {
  step: BookingStep
  doctorId: string | null
  clinicId: string | null
  selectedSlot: string | null
  reasonForVisit: string
  paymentMethod: PaymentMethod | null
  insurerName: string
  isFirstVisit: boolean
  specialNotes: string
  gdprConsent: boolean
  patientName: string
  patientEmail: string
  patientPhone: string

  setStep: (step: BookingStep) => void
  setDoctorId: (id: string) => void
  setClinicId: (id: string) => void
  setSelectedSlot: (slot: string) => void
  setReasonForVisit: (reason: string) => void
  setPaymentMethod: (method: PaymentMethod) => void
  setInsurerName: (name: string) => void
  setIsFirstVisit: (val: boolean) => void
  setSpecialNotes: (notes: string) => void
  setGdprConsent: (val: boolean) => void
  setPatientName: (name: string) => void
  setPatientEmail: (email: string) => void
  setPatientPhone: (phone: string) => void
  reset: () => void
}

const defaultState = {
  step: 1 as BookingStep,
  doctorId: null,
  clinicId: null,
  selectedSlot: null,
  reasonForVisit: '',
  paymentMethod: null,
  insurerName: '',
  isFirstVisit: true,
  specialNotes: '',
  gdprConsent: false,
  patientName: '',
  patientEmail: '',
  patientPhone: '',
}

export const useBookingStore = create<BookingState>((set) => ({
  ...defaultState,

  setStep: (step) => set({ step }),
  setDoctorId: (doctorId) => set({ doctorId }),
  setClinicId: (clinicId) => set({ clinicId }),
  setSelectedSlot: (selectedSlot) => set({ selectedSlot }),
  setReasonForVisit: (reasonForVisit) => set({ reasonForVisit }),
  setPaymentMethod: (paymentMethod) => set({ paymentMethod }),
  setInsurerName: (insurerName) => set({ insurerName }),
  setIsFirstVisit: (isFirstVisit) => set({ isFirstVisit }),
  setSpecialNotes: (specialNotes) => set({ specialNotes }),
  setGdprConsent: (gdprConsent) => set({ gdprConsent }),
  setPatientName: (patientName) => set({ patientName }),
  setPatientEmail: (patientEmail) => set({ patientEmail }),
  setPatientPhone: (patientPhone) => set({ patientPhone }),
  reset: () => set({ ...defaultState }),
}))
