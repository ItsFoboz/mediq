import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { generateAvailableSlots, formatTime } from '@mediq/shared'

interface AvailabilityCalendarProps {
  doctorId: string
  clinicId?: string
  onSlotSelect?: (slotIso: string) => void
  selectedSlot?: string | null
}

function getDays(startOffset = 0, count = 14): Date[] {
  return Array.from({ length: count }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + startOffset + i)
    d.setHours(0, 0, 0, 0)
    return d
  })
}

const SLOT_COLORS = {
  available: { bg: 'bg-[#0D9E6E]/10 text-[#0D9E6E] hover:bg-[#0D9E6E]/20', label: 'Available' },
  nhif: { bg: 'bg-[#1A6BCC]/10 text-[#1A6BCC] hover:bg-[#1A6BCC]/20', label: 'NHIF' },
  video: { bg: 'bg-purple-100 text-purple-700 hover:bg-purple-200', label: 'Video' },
}

export default function AvailabilityCalendar({ doctorId, clinicId, onSlotSelect, selectedSlot }: AvailabilityCalendarProps) {
  const [weekOffset, setWeekOffset] = useState(0)
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date())

  const days = useMemo(() => getDays(weekOffset * 7, 7), [weekOffset])

  const slots = useMemo(() =>
    generateAvailableSlots(selectedDate),
    [selectedDate, doctorId, clinicId]
  )

  const available = slots.filter((s) => s.available)

  return (
    <div>
      {/* Week navigation */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => setWeekOffset((w) => Math.max(0, w - 1))}
          disabled={weekOffset === 0}
          className="p-1.5 rounded-lg hover:bg-[#F7F9FC] text-[#64748B] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <span className="text-sm font-medium text-[#0F172A]">
          {days[0].toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} –{' '}
          {days[6].toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
        </span>
        <button
          onClick={() => setWeekOffset((w) => w + 1)}
          className="p-1.5 rounded-lg hover:bg-[#F7F9FC] text-[#64748B] transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Day pills */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {days.map((day) => {
          const isSelected = day.toDateString() === selectedDate.toDateString()
          const daySlots = generateAvailableSlots(day)
          const hasAvailable = daySlots.some((s) => s.available)
          return (
            <button
              key={day.toISOString()}
              onClick={() => setSelectedDate(day)}
              className={`flex flex-col items-center py-2 px-1 rounded-lg text-xs transition-all ${
                isSelected
                  ? 'bg-[#1A6BCC] text-white'
                  : hasAvailable
                  ? 'bg-[#F7F9FC] text-[#0F172A] hover:bg-[#EEF2F8]'
                  : 'text-[#94A3B8] cursor-default'
              }`}
            >
              <span className="uppercase font-medium">
                {day.toLocaleDateString('en', { weekday: 'short' }).slice(0, 2)}
              </span>
              <span className="font-semibold text-sm">{day.getDate()}</span>
              {hasAvailable && !isSelected && (
                <span className="w-1 h-1 rounded-full bg-[#0D9E6E] mt-0.5" />
              )}
            </button>
          )
        })}
      </div>

      {/* Slots */}
      {available.length === 0 ? (
        <div className="text-center py-8 text-[#94A3B8] text-sm">
          No available slots on this day
        </div>
      ) : (
        <>
          {/* Legend */}
          <div className="flex gap-3 mb-3 text-xs text-[#64748B]">
            {Object.entries(SLOT_COLORS).map(([key, { label }]) => (
              <span key={key} className="flex items-center gap-1">
                <span className={`w-2.5 h-2.5 rounded-sm ${key === 'available' ? 'bg-[#0D9E6E]/30' : key === 'nhif' ? 'bg-[#1A6BCC]/30' : 'bg-purple-200'}`} />
                {label}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2">
            {slots.map((slot) => {
              const isSelected = selectedSlot === slot.time
              const colorClass = SLOT_COLORS[slot.type as keyof typeof SLOT_COLORS]?.bg ?? SLOT_COLORS.available.bg
              return (
                <button
                  key={slot.time}
                  disabled={!slot.available}
                  onClick={() => slot.available && onSlotSelect?.(slot.time)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                    !slot.available
                      ? 'bg-[#F7F9FC] text-[#CBD5E1] cursor-not-allowed line-through'
                      : isSelected
                      ? 'bg-[#1A6BCC] text-white ring-2 ring-[#1A6BCC] ring-offset-1'
                      : colorClass
                  }`}
                >
                  {formatTime(slot.time)}
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
