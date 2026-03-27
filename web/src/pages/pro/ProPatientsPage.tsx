import { useState } from 'react'
import { Search, User } from 'lucide-react'

const MOCK_PATIENTS = [
  { id: 'p-1', name: 'James Mitchell', country: 'UK', visits: 3, last_visit: '2025-01-20', next: '2025-02-15', payment: 'Private' },
  { id: 'p-2', name: 'Sarah van den Berg', country: 'Netherlands', visits: 7, last_visit: '2025-01-15', next: null, payment: 'NHIF' },
  { id: 'p-3', name: 'Thomas Andersson', country: 'Sweden', visits: 1, last_visit: '2025-01-10', next: null, payment: 'Insurance' },
  { id: 'p-4', name: 'Priya Sharma', country: 'India', visits: 2, last_visit: '2024-12-18', next: '2025-02-20', payment: 'Private' },
  { id: 'p-5', name: 'Marco Rossi', country: 'Italy', visits: 4, last_visit: '2024-12-05', next: null, payment: 'Insurance' },
  { id: 'p-6', name: 'Anna Kowalski', country: 'Poland', visits: 5, last_visit: '2024-11-30', next: null, payment: 'Private' },
]

export default function ProPatientsPage() {
  const [search, setSearch] = useState('')
  const filtered = MOCK_PATIENTS.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold text-[#0F172A]">Patients</h1>
        <span className="text-sm text-[#94A3B8]">{filtered.length} patients</span>
      </div>

      <div className="relative mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search patients..."
          className="w-full pl-9 pr-4 py-2.5 border border-[#E2E8F0] rounded-lg text-sm outline-none focus:border-[#1A6BCC]"
        />
      </div>

      <div className="bg-white rounded-[16px] border border-[#E2E8F0] overflow-hidden" style={{ boxShadow: 'var(--shadow-card)' }}>
        <table className="w-full">
          <thead className="bg-[#F7F9FC]">
            <tr>
              <th className="text-left text-xs font-medium text-[#94A3B8] px-5 py-3">Patient</th>
              <th className="text-left text-xs font-medium text-[#94A3B8] px-5 py-3 hidden sm:table-cell">Visits</th>
              <th className="text-left text-xs font-medium text-[#94A3B8] px-5 py-3 hidden md:table-cell">Last visit</th>
              <th className="text-left text-xs font-medium text-[#94A3B8] px-5 py-3 hidden md:table-cell">Next</th>
              <th className="text-left text-xs font-medium text-[#94A3B8] px-5 py-3">Payment</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} className="border-t border-[#F1F5F9] hover:bg-[#F7F9FC] transition-colors cursor-pointer">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#1A6BCC]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <User size={14} className="text-[#1A6BCC]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#0F172A]">{p.name}</p>
                      <p className="text-xs text-[#94A3B8]">{p.country}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-[#64748B] hidden sm:table-cell">{p.visits}</td>
                <td className="px-5 py-4 text-sm text-[#64748B] hidden md:table-cell">{p.last_visit}</td>
                <td className="px-5 py-4 text-sm text-[#64748B] hidden md:table-cell">{p.next || '—'}</td>
                <td className="px-5 py-4">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    p.payment === 'NHIF' ? 'bg-blue-100 text-blue-700' :
                    p.payment === 'Insurance' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>{p.payment}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
