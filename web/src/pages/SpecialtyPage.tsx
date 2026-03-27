import { useParams, Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { specialties } from '@/data/specialties'
import { doctors } from '@/data/doctors'
import DoctorCard from '@/components/doctor/DoctorCard'
import * as Icons from 'lucide-react'

export default function SpecialtyPage() {
  const { slug } = useParams<{ slug: string }>()
  const specialty = specialties.find(s => s.slug === slug)
  if (!specialty) return <div className="text-center py-24 text-[#94A3B8]">Specialty not found. <Link to="/specialties" className="text-[#1A6BCC] hover:underline">All specialties</Link></div>
  const Icon = (Icons as unknown as Record<string, React.ElementType>)[specialty.icon_name] ?? Icons.Stethoscope
  const specialtyDoctors = doctors.filter(d => d.specialty.slug === slug)

  return (
    <div style={{ background: 'var(--bg-base)' }} className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <nav className="flex items-center gap-1 text-xs text-[#94A3B8] mb-6">
          <Link to="/specialties" className="hover:text-[#1A6BCC]">Specialties</Link>
          <ChevronRight size={12} /><span className="text-[#0F172A]">{specialty.name_en}</span>
        </nav>

        <div className="flex items-start gap-4 mb-8">
          <div className="w-14 h-14 bg-[#1A6BCC]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Icon size={28} className="text-[#1A6BCC]" />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-[#0F172A]">{specialty.name_en}</h1>
            <p className="text-[#94A3B8]">{specialty.name_bg}</p>
            <p className="text-[#64748B] mt-2 max-w-xl">{specialty.description_en}</p>
            <p className="text-sm text-[#1A6BCC] font-medium mt-2">{specialtyDoctors.length} English-speaking doctors available</p>
          </div>
        </div>

        {specialty.common_conditions_en.length > 0 && (
          <div className="bg-white rounded-[12px] border border-[#E2E8F0] p-5 mb-8">
            <h2 className="font-semibold text-[#0F172A] mb-3">Commonly treated conditions</h2>
            <div className="flex flex-wrap gap-2">
              {specialty.common_conditions_en.map(c => (
                <span key={c} className="text-sm bg-[#F7F9FC] border border-[#E2E8F0] text-[#64748B] px-3 py-1 rounded-full">{c}</span>
              ))}
            </div>
          </div>
        )}

        <h2 className="font-semibold text-[#0F172A] mb-4">{specialty.name_en}s in Bulgaria</h2>
        {specialtyDoctors.length === 0 ? (
          <p className="text-[#94A3B8] text-center py-12">No doctors found for this specialty yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {specialtyDoctors.map(d => <DoctorCard key={d.id} doctor={d} />)}
          </div>
        )}
      </div>
    </div>
  )
}
