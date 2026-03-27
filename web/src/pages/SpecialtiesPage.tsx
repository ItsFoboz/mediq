import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { specialties } from '@/data/specialties'
import * as Icons from 'lucide-react'

export default function SpecialtiesPage() {
  return (
    <div style={{ background: 'var(--bg-base)' }} className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-serif font-bold text-[#0F172A] mb-2">All Medical Specialties</h1>
        <p className="text-[#64748B] mb-8">
          Find English-speaking specialists across Bulgaria. Each specialty name shown in English with the Bulgarian equivalent.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {specialties.map(s => {
            const Icon = (Icons as unknown as Record<string, React.ElementType>)[s.icon_name] ?? Icons.Stethoscope
            return (
              <Link key={s.id} to={`/specialties/${s.slug}`}
                className="bg-white rounded-[12px] border border-[#E2E8F0] p-5 hover:shadow-md transition-all hover:-translate-y-0.5 flex items-start gap-4"
                style={{ boxShadow: 'var(--shadow-card)' }}>
                <div className="w-11 h-11 bg-[#1A6BCC]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon size={22} className="text-[#1A6BCC]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-[#0F172A]">{s.name_en}</h2>
                  <p className="text-sm text-[#94A3B8]">{s.name_bg}</p>
                  <p className="text-xs text-[#64748B] mt-1 line-clamp-2">{s.description_en}</p>
                  <p className="text-xs text-[#1A6BCC] mt-2 font-medium flex items-center gap-1">
                    {s.doctor_count} doctors <ArrowRight size={12} />
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
