import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { doctors } from '@/data/doctors'
import DoctorProfile from '@/components/doctor/DoctorProfile'

export default function DoctorProfilePage() {
  const { slug } = useParams<{ slug: string }>()
  const doctor = doctors.find(d => d.slug === slug)

  useEffect(() => {
    if (doctor) {
      document.title = `${doctor.name} — ${doctor.specialty.name_en} in ${doctor.city} | MEDIQ`
    }
    return () => { document.title = 'MEDIQ — Healthcare in Bulgaria, in English' }
  }, [doctor])

  if (!doctor) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <p className="text-5xl mb-4">👨‍⚕️</p>
        <h1 className="text-2xl font-serif font-bold text-[#0F172A] mb-2">Doctor not found</h1>
        <p className="text-[#64748B] mb-6">This doctor profile doesn't exist or may have been removed.</p>
        <Link to="/doctors" className="text-[#1A6BCC] hover:underline">Back to search</Link>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--bg-base)' }}>
      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-4 pt-4 pb-0">
        <nav className="flex items-center gap-1 text-xs text-[#94A3B8]">
          <Link to="/" className="hover:text-[#1A6BCC]">Home</Link>
          <ChevronRight size={12} />
          <Link to="/doctors" className="hover:text-[#1A6BCC]">Doctors</Link>
          <ChevronRight size={12} />
          <span className="text-[#0F172A]">{doctor.name}</span>
        </nav>
      </div>
      <DoctorProfile doctor={doctor} />
    </div>
  )
}
