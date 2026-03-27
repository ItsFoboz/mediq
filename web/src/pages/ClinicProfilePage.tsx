import { useParams, Link } from 'react-router-dom'
import { Phone, Globe, Clock, ChevronRight } from 'lucide-react'
import { clinics } from '@/data/clinics'
import { doctors } from '@/data/doctors'
import ClinicMap from '@/components/maps/ClinicMap'
import Badge from '@/components/ui/Badge'
import DoctorCard from '@/components/doctor/DoctorCard'

export default function ClinicProfilePage() {
  const { slug } = useParams<{ slug: string }>()
  const clinic = clinics.find(c => c.slug === slug)
  if (!clinic) return (
    <div className="text-center py-24"><p className="text-[#94A3B8]">Clinic not found.</p><Link to="/clinics" className="text-[#1A6BCC] mt-2 inline-block hover:underline">All clinics</Link></div>
  )
  const clinicDoctors = doctors.filter(d => d.clinics.some(dc => dc.clinic_id === clinic.id))

  return (
    <div style={{ background: 'var(--bg-base)' }} className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <nav className="flex items-center gap-1 text-xs text-[#94A3B8] mb-6">
          <Link to="/clinics" className="hover:text-[#1A6BCC]">Clinics</Link>
          <ChevronRight size={12} />
          <span className="text-[#0F172A]">{clinic.name}</span>
        </nav>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-5">
            <div className="bg-white rounded-[12px] border border-[#E2E8F0] p-6">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h1 className="text-2xl font-serif font-bold text-[#0F172A]">{clinic.name}</h1>
                <div className="flex gap-1.5">{clinic.accepts_nhif && <Badge variant="blue">NHIF</Badge>}</div>
              </div>
              {clinic.description_en && <p className="text-[#64748B] text-sm mb-4">{clinic.description_en}</p>}
              <div className="space-y-2 text-sm text-[#64748B]">
                <p className="flex items-center gap-2"><Phone size={14} className="text-[#94A3B8]" />{clinic.phone}</p>
                {clinic.website && <p className="flex items-center gap-2"><Globe size={14} className="text-[#94A3B8]" /><a href={clinic.website} target="_blank" rel="noopener noreferrer" className="text-[#1A6BCC] hover:underline">{clinic.website}</a></p>}
              </div>
            </div>

            <div className="bg-white rounded-[12px] border border-[#E2E8F0] p-6">
              <h2 className="font-semibold text-[#0F172A] mb-3 flex items-center gap-2"><Clock size={16} className="text-[#1A6BCC]" />Opening Hours</h2>
              <div className="grid grid-cols-2 gap-1 text-sm text-[#64748B]">
                {Object.entries(clinic.opening_hours).map(([day, hrs]) => (
                  <div key={day} className="flex gap-2"><span className="capitalize font-medium text-[#0F172A] w-10">{day}</span><span>{hrs}</span></div>
                ))}
              </div>
            </div>

            {clinicDoctors.length > 0 && (
              <div>
                <h2 className="font-semibold text-[#0F172A] mb-3">Doctors at this clinic</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {clinicDoctors.map(d => <DoctorCard key={d.id} doctor={d} />)}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <ClinicMap clinic={clinic} height="240px" />
            <div className="bg-white rounded-[12px] border border-[#E2E8F0] p-4 text-sm text-[#64748B]">
              <p className="font-medium text-[#0F172A] mb-1">{clinic.address}</p>
              <p>{clinic.city}, Bulgaria</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
