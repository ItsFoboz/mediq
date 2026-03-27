import { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { Calendar, Clock, MapPin, X } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import Badge from '@/components/ui/Badge'

const MOCK_APPOINTMENTS = [
  {
    id: 'apt-1',
    doctor_name: 'Dr. Georgi Petrov',
    specialty: 'Cardiologist',
    date: '2025-02-15',
    time: '10:00',
    clinic: 'Vita Hospital, Sofia',
    status: 'confirmed' as const,
  },
  {
    id: 'apt-2',
    doctor_name: 'Dr. Milena Vassileva',
    specialty: 'Dermatologist',
    date: '2025-01-28',
    time: '14:30',
    clinic: 'Robert Koch Clinic, Sofia',
    status: 'completed' as const,
  },
  {
    id: 'apt-3',
    doctor_name: 'Dr. Nikolay Dimitrov',
    specialty: 'Orthopedist',
    date: '2025-01-10',
    time: '09:00',
    clinic: 'Vita Hospital, Sofia',
    status: 'cancelled' as const,
  },
]

const STATUS_COLOR: Record<string, 'green' | 'gray' | 'yellow' | 'blue'> = {
  confirmed: 'green',
  completed: 'blue',
  cancelled: 'gray',
  pending: 'yellow',
}

export default function AppointmentsPage() {
  const { user } = useAuthStore()
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming')

  if (!user) return <Navigate to="/" replace />

  const now = new Date().toISOString().slice(0, 10)
  const upcoming = MOCK_APPOINTMENTS.filter(a => a.date >= now && a.status !== 'cancelled')
  const past = MOCK_APPOINTMENTS.filter(a => a.date < now || a.status === 'cancelled' || a.status === 'completed')

  const shown = tab === 'upcoming' ? upcoming : past

  return (
    <div style={{ background: 'var(--bg-base)' }} className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-serif font-bold text-[#0F172A] mb-6">My appointments</h1>

        <div className="flex gap-2 mb-6">
          {(['upcoming', 'past'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all capitalize ${tab === t ? 'bg-[#1A6BCC] text-white' : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:border-[#1A6BCC]'}`}>
              {t}
            </button>
          ))}
        </div>

        {shown.length === 0 ? (
          <div className="text-center py-16">
            <Calendar size={40} className="text-[#CBD5E1] mx-auto mb-4" />
            <p className="text-[#64748B]">No {tab} appointments.</p>
            {tab === 'upcoming' && (
              <Link to="/doctors" className="text-sm text-[#1A6BCC] hover:underline mt-2 block">Find a doctor</Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {shown.map(apt => (
              <div key={apt.id} className="bg-white rounded-[16px] border border-[#E2E8F0] p-5" style={{ boxShadow: 'var(--shadow-card)' }}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="font-semibold text-[#0F172A]">{apt.doctor_name}</p>
                    <p className="text-sm text-[#64748B]">{apt.specialty}</p>
                  </div>
                  <Badge variant={STATUS_COLOR[apt.status] ?? 'gray'} size="sm">
                    {apt.status}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-[#64748B]">
                  <span className="flex items-center gap-1.5"><Calendar size={14} />{apt.date}</span>
                  <span className="flex items-center gap-1.5"><Clock size={14} />{apt.time}</span>
                  <span className="flex items-center gap-1.5"><MapPin size={14} />{apt.clinic}</span>
                </div>
                {apt.status === 'confirmed' && (
                  <button className="mt-3 flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700">
                    <X size={12} /> Cancel appointment
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
