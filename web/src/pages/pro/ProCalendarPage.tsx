import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const HOURS = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']

const MOCK_BOOKINGS: Record<string, Array<{ name: string; type: string; color: string }>> = {
  'Mon-09:00': [{ name: 'James Mitchell', type: 'New patient', color: 'bg-[#1A6BCC]/10 border-[#1A6BCC]/30 text-[#1A6BCC]' }],
  'Mon-11:00': [{ name: 'Sarah van den Berg', type: 'Follow-up', color: 'bg-blue-50 border-blue-200 text-blue-700' }],
  'Tue-10:00': [{ name: 'Thomas Andersson', type: 'Consultation', color: 'bg-[#0D9E6E]/10 border-[#0D9E6E]/30 text-[#0D9E6E]' }],
  'Wed-09:00': [{ name: 'Priya Sharma', type: 'New patient', color: 'bg-[#1A6BCC]/10 border-[#1A6BCC]/30 text-[#1A6BCC]' }],
  'Wed-14:00': [{ name: 'Marco Rossi', type: 'Follow-up', color: 'bg-purple-50 border-purple-200 text-purple-700' }],
  'Thu-11:00': [{ name: 'Anna Kowalski', type: 'Consultation', color: 'bg-[#0D9E6E]/10 border-[#0D9E6E]/30 text-[#0D9E6E]' }],
}

export default function ProCalendarPage() {
  const [weekOffset, setWeekOffset] = useState(0)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold text-[#0F172A]">Calendar</h1>
        <div className="flex items-center gap-2">
          <button onClick={() => setWeekOffset(w => w - 1)} className="p-2 hover:bg-[#F7F9FC] rounded-lg border border-[#E2E8F0]">
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm font-medium text-[#0F172A] px-2">
            {weekOffset === 0 ? 'This week' : weekOffset === 1 ? 'Next week' : `${weekOffset > 0 ? '+' : ''}${weekOffset} weeks`}
          </span>
          <button onClick={() => setWeekOffset(w => w + 1)} className="p-2 hover:bg-[#F7F9FC] rounded-lg border border-[#E2E8F0]">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[16px] border border-[#E2E8F0] overflow-hidden" style={{ boxShadow: 'var(--shadow-card)' }}>
        {/* Header */}
        <div className="grid grid-cols-7 border-b border-[#E2E8F0]">
          <div className="p-3 border-r border-[#E2E8F0]" />
          {DAYS.map(d => (
            <div key={d} className="p-3 text-center text-xs font-semibold text-[#64748B] border-r border-[#E2E8F0] last:border-0">{d}</div>
          ))}
        </div>

        {/* Time grid */}
        {HOURS.map(hour => (
          <div key={hour} className="grid grid-cols-7 border-b border-[#F1F5F9] last:border-0 min-h-[60px]">
            <div className="p-2 text-xs text-[#94A3B8] border-r border-[#E2E8F0] flex items-start pt-2">{hour}</div>
            {DAYS.map(day => {
              const key = `${day}-${hour}`
              const booking = MOCK_BOOKINGS[key]
              return (
                <div key={day} className="p-1 border-r border-[#F1F5F9] last:border-0 hover:bg-[#F7F9FC] transition-colors cursor-pointer">
                  {booking?.map((b, i) => (
                    <div key={i} className={`text-xs p-1.5 rounded border ${b.color}`}>
                      <p className="font-medium leading-tight truncate">{b.name}</p>
                      <p className="opacity-70 truncate">{b.type}</p>
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
