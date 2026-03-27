import { useParams, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { doctors } from '@/data/doctors'
import BookingFlow from '@/components/booking/BookingFlow'

export default function BookingPage() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuthStore()
  const doctor = doctors.find(d => d.id === id)

  if (!user) return <Navigate to="/" replace />
  if (!doctor) return (
    <div className="text-center py-24 text-[#94A3B8]">Doctor not found.</div>
  )

  return (
    <div style={{ background: 'var(--bg-base)' }} className="min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <BookingFlow doctorId={doctor.id} />
      </div>
    </div>
  )
}
