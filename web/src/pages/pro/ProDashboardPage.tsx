import { Calendar, Users, Star, TrendingUp } from 'lucide-react'

const STATS = [
  { label: 'Appointments this month', value: '24', icon: Calendar, change: '+12%' },
  { label: 'Total patients', value: '187', icon: Users, change: '+3%' },
  { label: 'Average rating', value: '4.8', icon: Star, change: '▲ 0.1' },
  { label: 'Profile views', value: '1,240', icon: TrendingUp, change: '+28%' },
]

const UPCOMING = [
  { time: '09:00', name: 'James Mitchell', type: 'New patient', payment: 'Private', date: 'Today' },
  { time: '11:30', name: 'Sarah van den Berg', type: 'Follow-up', payment: 'NHIF', date: 'Today' },
  { time: '14:00', name: 'Thomas Andersson', type: 'New patient', payment: 'Insurance', date: 'Today' },
  { time: '10:00', name: 'Priya Sharma', type: 'Consultation', payment: 'Private', date: 'Tomorrow' },
]

export default function ProDashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-bold text-[#0F172A]">Dashboard</h1>
        <p className="text-[#64748B] text-sm mt-1">Welcome back, Doctor. Here's an overview of your practice.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map(s => (
          <div key={s.label} className="bg-white rounded-[16px] border border-[#E2E8F0] p-5" style={{ boxShadow: 'var(--shadow-card)' }}>
            <div className="flex items-center justify-between mb-3">
              <s.icon size={18} className="text-[#1A6BCC]" />
              <span className="text-xs font-medium text-[#0D9E6E]">{s.change}</span>
            </div>
            <p className="text-2xl font-bold text-[#0F172A]">{s.value}</p>
            <p className="text-xs text-[#94A3B8] mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Upcoming appointments */}
      <div className="bg-white rounded-[16px] border border-[#E2E8F0] overflow-hidden" style={{ boxShadow: 'var(--shadow-card)' }}>
        <div className="p-5 border-b border-[#E2E8F0]">
          <h2 className="font-semibold text-[#0F172A]">Upcoming appointments</h2>
        </div>
        <table className="w-full">
          <thead className="bg-[#F7F9FC]">
            <tr>
              <th className="text-left text-xs font-medium text-[#94A3B8] px-5 py-3">Time</th>
              <th className="text-left text-xs font-medium text-[#94A3B8] px-5 py-3">Patient</th>
              <th className="text-left text-xs font-medium text-[#94A3B8] px-5 py-3 hidden sm:table-cell">Type</th>
              <th className="text-left text-xs font-medium text-[#94A3B8] px-5 py-3 hidden md:table-cell">Payment</th>
              <th className="text-left text-xs font-medium text-[#94A3B8] px-5 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {UPCOMING.map((a, i) => (
              <tr key={i} className="border-t border-[#F1F5F9] hover:bg-[#F7F9FC] transition-colors">
                <td className="px-5 py-4 text-sm font-medium text-[#0F172A]">{a.time}</td>
                <td className="px-5 py-4 text-sm text-[#0F172A]">{a.name}</td>
                <td className="px-5 py-4 text-sm text-[#64748B] hidden sm:table-cell">{a.type}</td>
                <td className="px-5 py-4 hidden md:table-cell">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    a.payment === 'NHIF' ? 'bg-blue-100 text-blue-700' :
                    a.payment === 'Insurance' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>{a.payment}</span>
                </td>
                <td className="px-5 py-4 text-sm text-[#64748B]">{a.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
