import { useBookingStore } from '@/store/bookingStore'
import { useAuthStore } from '@/store/authStore'
import { doctors } from '@/data/doctors'
import { clinics } from '@/data/clinics'
import { formatDate, formatTime } from '@mediq/shared'

export function useBooking(doctorId?: string) {
  const store = useBookingStore()
  const { user } = useAuthStore()

  const doctor = doctorId ? doctors.find((d) => d.id === doctorId) : null
  const clinic = store.clinicId ? clinics.find((c) => c.id === store.clinicId) : null

  const canProceedToStep2 = !!store.selectedSlot && !!store.clinicId
  const canProceedToStep3 = canProceedToStep2 && !!store.paymentMethod

  const appointmentSummary = store.selectedSlot
    ? `${doctor?.name ?? 'Doctor'} at ${clinic?.name ?? 'clinic'} on ${formatDate(store.selectedSlot)} at ${formatTime(store.selectedSlot)}`
    : null

  const confirmBooking = async (): Promise<{ success: boolean; error?: string }> => {
    if (!store.selectedSlot || !store.clinicId || !store.paymentMethod) {
      return { success: false, error: 'Please complete all required fields.' }
    }
    if (!user) {
      return { success: false, error: 'You must be signed in to book.' }
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200))
      console.log('Booking confirmed:', {
        doctorId,
        clinicId: store.clinicId,
        slot: store.selectedSlot,
        paymentMethod: store.paymentMethod,
        reason: store.reasonForVisit,
        notes: store.specialNotes,
        userId: user.id,
      })
      return { success: true }
    } catch {
      return { success: false, error: 'Failed to confirm booking. Please try again.' }
    }
  }

  return {
    ...store,
    doctor,
    clinic,
    canProceedToStep2,
    canProceedToStep3,
    appointmentSummary,
    confirmBooking,
  }
}
