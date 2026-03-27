import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone } from 'lucide-react'
import { clinics } from '@/data/clinics'
import Badge from '@/components/ui/Badge'

const TYPE_LABELS: Record<string, string> = {
  hospital: 'Hospital', clinic: 'Clinic', dental: 'Dental', lab: 'Lab', imaging: 'Imaging'
}

export default function ClinicsPage() {
  const [city, setCity] = useState('')
  const [type, setType] = useState('')
  const filtered = clinics.filter(c => (!city || c.city === city) && (!type || c.type === type))

  return (
    <div style={{ background: 'var(--bg-base)' }} className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-serif font-bold text-[#0F172A] mb-2">Hospitals & Clinics</h1>
        <p className="text-[#64748B] mb-6">Find hospitals, private clinics, dental studios, and labs in Bulgaria.</p>

        <div className="flex gap-3 mb-6 flex-wrap">
          <select value={city} onChange={e => setCity(e.target.value)}
            className="text-sm border border-[#E2E8F0] rounded-lg px-3 py-2 bg-white outline-none focus:border-[#1A6BCC]">
            <option value="">All Cities</option>
            {['Sofia','Plovdiv','Varna','Burgas'].map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={type} onChange={e => setType(e.target.value)}
            className="text-sm border border-[#E2E8F0] rounded-lg px-3 py-2 bg-white outline-none focus:border-[#1A6BCC]">
            <option value="">All Types</option>
            {Object.entries(TYPE_LABELS).map(([v,l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map(clinic => (
            <Link key={clinic.id} to={`/clinics/${clinic.slug}`}
              className="bg-white rounded-[12px] border border-[#E2E8F0] p-5 hover:shadow-md transition-shadow block"
              style={{ boxShadow: 'var(--shadow-card)' }}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h2 className="font-semibold text-[#0F172A]">{clinic.name}</h2>
                <div className="flex gap-1.5 flex-shrink-0">
                  <Badge variant="gray" size="sm">{TYPE_LABELS[clinic.type]}</Badge>
                  {clinic.accepts_nhif && <Badge variant="blue" size="sm">NHIF</Badge>}
                </div>
              </div>
              <p className="text-sm text-[#64748B] flex items-center gap-1 mb-1"><MapPin size={13} />{clinic.address}</p>
              <p className="text-sm text-[#64748B] flex items-center gap-1"><Phone size={13} />{clinic.phone}</p>
              {clinic.description_en && <p className="text-xs text-[#94A3B8] mt-2 line-clamp-2">{clinic.description_en}</p>}
              <span className="text-sm text-[#1A6BCC] font-medium mt-3 inline-block">View details →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
