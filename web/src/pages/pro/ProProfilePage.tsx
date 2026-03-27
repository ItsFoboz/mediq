import { useState } from 'react'
import { Camera, Plus, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import { specialties } from '@/data/specialties'

export default function ProProfilePage() {
  const [saved, setSaved] = useState(false)
  const [insurers, setInsurers] = useState(['Generali', 'Allianz'])
  const INSURER_OPTIONS = ['Generali', 'Allianz', 'Bulstrad Life', 'DZI', 'Unika', 'Armeec', 'Euroins', 'Groupama']

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-serif font-bold text-[#0F172A]">My profile</h1>
        <p className="text-sm text-[#64748B] mt-1">This is what patients see when searching for doctors.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Photo */}
        <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
          <h2 className="font-semibold text-[#0F172A] mb-4">Profile photo</h2>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-[#1A6BCC]/10 rounded-full flex items-center justify-center relative">
              <Camera size={24} className="text-[#1A6BCC]" />
              <button type="button" className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#1A6BCC] rounded-full flex items-center justify-center">
                <Plus size={14} className="text-white" />
              </button>
            </div>
            <div>
              <p className="text-sm font-medium text-[#0F172A]">Upload photo</p>
              <p className="text-xs text-[#94A3B8]">JPG or PNG, max 2MB. Square photos work best.</p>
            </div>
          </div>
        </div>

        {/* Basic info */}
        <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-6 space-y-5" style={{ boxShadow: 'var(--shadow-card)' }}>
          <h2 className="font-semibold text-[#0F172A]">Basic information</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium text-[#0F172A] block mb-1.5">First name</label>
              <input className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1A6BCC]" defaultValue="Georgi" />
            </div>
            <div>
              <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Last name</label>
              <input className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1A6BCC]" defaultValue="Petrov" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Specialty</label>
            <select className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1A6BCC]">
              {specialties.map(s => <option key={s.slug} value={s.slug}>{s.name_en}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Bio (English)</label>
            <textarea rows={4} className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1A6BCC] resize-none"
              defaultValue="Board-certified cardiologist with 15 years of experience treating patients in Sofia."
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Consultation fee (BGN)</label>
              <input type="number" min="0" className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1A6BCC]" defaultValue="100" />
            </div>
            <div>
              <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Years of experience</label>
              <input type="number" min="0" className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1A6BCC]" defaultValue="15" />
            </div>
          </div>
        </div>

        {/* Insurance */}
        <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-[#0F172A]">Accepted insurers</h2>
            <label className="flex items-center gap-2 text-sm text-[#64748B] cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded" /> Accepts NHIF
            </label>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {insurers.map(ins => (
              <span key={ins} className="flex items-center gap-1.5 text-sm bg-[#F7F9FC] border border-[#E2E8F0] px-3 py-1 rounded-full">
                {ins}
                <button type="button" onClick={() => setInsurers(i => i.filter(x => x !== ins))}><X size={12} className="text-[#94A3B8] hover:text-red-500" /></button>
              </span>
            ))}
          </div>
          <select
            onChange={e => { if (e.target.value && !insurers.includes(e.target.value)) setInsurers(i => [...i, e.target.value]); e.target.value = '' }}
            className="text-sm border border-[#E2E8F0] rounded-lg px-3 py-2 outline-none focus:border-[#1A6BCC]"
          >
            <option value="">+ Add insurer</option>
            {INSURER_OPTIONS.filter(o => !insurers.includes(o)).map(o => <option key={o}>{o}</option>)}
          </select>
        </div>

        <Button variant="primary" type="submit">
          {saved ? 'Saved!' : 'Save profile'}
        </Button>
      </form>
    </div>
  )
}
