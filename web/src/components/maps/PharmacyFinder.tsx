import { useState } from 'react'
import { MapPin, Phone, Clock, Moon } from 'lucide-react'
import Badge from '@/components/ui/Badge'

const MOCK_PHARMACIES = [
  { id: '1', name: 'Pharmacy Remedium', address: 'bul. Vitosha 56, Sofia', city: 'Sofia', phone: '+359 2 987 6543', hours: 'Mon–Fri 08:00–20:00, Sat 09:00–15:00', is24h: false },
  { id: '2', name: 'Pharmacy Vita 24', address: 'ul. Rakovski 120, Sofia', city: 'Sofia', phone: '+359 2 876 5432', hours: '24 hours / 7 days', is24h: true },
  { id: '3', name: 'Pharmacy Sopharm', address: 'bul. Hristo Botev 34, Sofia', city: 'Sofia', phone: '+359 2 765 4321', hours: 'Mon–Sat 08:30–19:30', is24h: false },
  { id: '4', name: 'Pharmacy Biopharma 24', address: 'ul. Graf Ignatiev 22, Sofia', city: 'Sofia', phone: '+359 2 654 3210', hours: '24 hours / 7 days', is24h: true },
  { id: '5', name: 'Pharmacy Central Plovdiv', address: 'pl. Tsentralen 5, Plovdiv', city: 'Plovdiv', phone: '+359 32 543 210', hours: 'Mon–Fri 08:00–20:00', is24h: false },
  { id: '6', name: 'Pharmacy Varna Night', address: 'bul. Vladislav Varnenchik 15, Varna', city: 'Varna', phone: '+359 52 432 109', hours: '24 hours / 7 days', is24h: true },
]

export default function PharmacyFinder() {
  const [only24h, setOnly24h] = useState(false)
  const [city, setCity] = useState('')

  const filtered = MOCK_PHARMACIES.filter(p => {
    if (only24h && !p.is24h) return false
    if (city && p.city !== city) return false
    return true
  })

  return (
    <div>
      {/* Info box */}
      <div className="bg-blue-50 border border-blue-200 rounded-[12px] p-4 mb-6 text-sm text-blue-800">
        <p className="font-semibold mb-1">How to read a Bulgarian prescription</p>
        <ul className="space-y-0.5 text-blue-700 list-disc list-inside">
          <li>Green prescription (<em>зелена рецепта</em>) — NHIF-subsidised medication</li>
          <li>White prescription — private prescription, full price</li>
          <li>Show your ID when collecting prescription medication</li>
          <li>Most pharmacists will recognise international generic drug names</li>
        </ul>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5 items-center">
        <label className="flex items-center gap-2 cursor-pointer text-sm">
          <button
            type="button"
            onClick={() => setOnly24h(!only24h)}
            className={`relative inline-flex h-5 w-9 rounded-full transition-colors ${only24h ? 'bg-[#0D9E6E]' : 'bg-[#CBD5E1]'}`}
          >
            <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${only24h ? 'translate-x-4' : ''}`} />
          </button>
          <Moon size={14} className="text-[#64748B]" />
          24-hour pharmacies only
        </label>
        <select
          value={city}
          onChange={e => setCity(e.target.value)}
          className="text-sm border border-[#E2E8F0] rounded-lg px-3 py-1.5 bg-white text-[#0F172A] outline-none"
        >
          <option value="">All cities</option>
          {['Sofia', 'Plovdiv', 'Varna'].map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Map placeholder */}
      <div className="w-full h-48 bg-[#EEF2F8] rounded-[12px] border border-[#E2E8F0] flex items-center justify-center mb-6 text-[#94A3B8] text-sm">
        <div className="text-center">
          <MapPin size={28} className="mx-auto mb-2 text-[#CBD5E1]" />
          Map view requires Google Maps API key
        </div>
      </div>

      {/* List */}
      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map(p => (
          <div key={p.id} className="bg-white border border-[#E2E8F0] rounded-[12px] p-4" style={{ boxShadow: 'var(--shadow-card)' }}>
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-[#0F172A] text-sm">{p.name}</h3>
              {p.is24h && <Badge variant="green" size="sm"><Moon size={10} className="inline mr-0.5" />24H</Badge>}
            </div>
            <p className="text-xs text-[#64748B] flex items-center gap-1 mb-1"><MapPin size={11} />{p.address}</p>
            <p className="text-xs text-[#64748B] flex items-center gap-1 mb-1"><Phone size={11} />{p.phone}</p>
            <p className="text-xs text-[#64748B] flex items-center gap-1"><Clock size={11} />{p.hours}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
