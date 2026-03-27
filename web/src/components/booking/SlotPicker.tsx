import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Doctor } from '@mediq/shared'
import { generateAvailableSlots, formatTime } from '@mediq/shared'

interface SlotPickerProps {
  doctor: Doctor
  selectedSlot: string | null
  selectedClinicId: string | null
  onSlotSelect: (slot: string) => void
  onClinicSelect: (clinicId: string) => void
}

function getDays(offset = 0, count = 14): Date[] {
  return Array.from({ length: count }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + offset + i)
    d.setHours(0, 0, 0, 0)
    return d
  })
}

export default function SlotPicker({ doctor, selectedSlot, selectedClinicId, onSlotSelect, onClinicSelect }: SlotPickerProps) {
  const [weekOffset, setWeekOffset] = useState(0)
  const [selectedDate, setSelectedDate] = useState<Date>(() => { const d = new Date(); d.setHours(0,0,0,0); return d })

  const days = useMemo(() => getDays(weekOffset * 7), [weekOffset])
  const slots = useMemo(() => generateAvailableSlots(selectedDate), [selectedDate])
  const availableSlots = slots.filter(s => s.available)

  const activeClinic = selectedClinicId
    ? doctor.clinics.find(c => c.clinic_id === selectedClinicId)
    : doctor.clinics[0]

  return (
    <div className="space-y-5">
      {/* Clinic selector (if multiple) */}
      {doctor.clinics.length > 1 && (
        <div>
          <p className="text-sm font-medium text-[#0F172A] mb-2">Select clinic</p>
          <div className="flex gap-2 flex-wrap">
            {doctor.clinics.map(dc => (
              <button
                key={dc.clinic_id}
                onClick={() => onClinicSelect(dc.clinic_id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                  (selectedClinicId ?? doctor.clinics[0].clinic_id) === dc.clinic_id
                    ? 'border-[#1A6BCC] bg-[#1A6BCC]/5 text-[#1A6BCC]'
                    : 'border-[#E2E8F0] text-[#64748B] hover:border-[#CBD5E1]'
                }`}
              >
                {dc.clinic.name}
                <span className="ml-1 text-xs opacity-70">{dc.price_here_bgn} BGN</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Week nav */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => setWeekOffset(w => Math.max(0, w - 1))}
            disabled={weekOffset === 0}
            className="p-1.5 rounded-lg hover:bg-[#F7F9FC] text-[#64748B] disabled:opacity-30 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm font-medium text-[#0F172A]">
            {days[0].toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} –{' '}
            {days[6].toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
          </span>
          <button onClick={() => setWeekOffset(w => w + 1)} className="p-1.5 rounded-lg hover:bg-[#F7F9FC] text-[#64748B] transition-colors">
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Day pills */}
        <div className="grid grid-cols-7 gap-1">
          {days.map(day => {
            const isSelected = day.toDateString() === selectedDate.toDateString()
            const daySlots = generateAvailableSlots(day)
            const hasSlots = daySlots.some(s => s.available)
            return (
              <button
                key={day.toISOString()}
                onClick={() => hasSlots && setSelectedDate(day)}
                className={`flex flex-col items-center py-2.5 rounded-xl text-xs transition-all ${
                  isSelected ? 'bg-[#1A6BCC] text-white shadow-md'
                  : hasSlots ? 'hover:bg-[#F7F9FC] text-[#0F172A]'
                  : 'text-[#CBD5E1] cursor-default'
                }`}
              >
                <span className="uppercase font-medium text-[10px]">{day.toLocaleDateString('en', { weekday: 'short' }).slice(0,2)}</span>
                <span className="font-bold text-sm mt-0.5">{day.getDate()}</span>
                {hasSlots && !isSelected && <span className="w-1 h-1 rounded-full bg-[#0D9E6E] mt-1" />}
              </button>
            )
          })}
        </div>
      </div>

      {/* Time slots */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-[#0F172A]">
            {selectedDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
          <div className="flex gap-3 text-xs text-[#94A3B8]">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#0D9E6E]/30" />Available</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#1A6BCC]/30" />NHIF</span>
          </div>
        </div>

        {availableSlots.length === 0 ? (
          <p className="text-center text-sm text-[#94A3B8] py-6">No available slots on this day</p>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {slots.map(slot => {
              const isChosen = selectedSlot === slot.time
              const colors = slot.type === 'nhif' ? 'bg-[#1A6BCC]/10 text-[#1A6BCC] hover:bg-[#1A6BCC]/20'
                : slot.type === 'video' ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                : 'bg-[#0D9E6E]/10 text-[#0D9E6E] hover:bg-[#0D9E6E]/20'
              return (
                <button
                  key={slot.time}
                  disabled={!slot.available}
                  onClick={() => slot.available && onSlotSelect(slot.time)}
                  className={`py-2 rounded-lg text-sm font-medium transition-all ${
                    !slot.available ? 'bg-[#F7F9FC] text-[#CBD5E1] cursor-not-allowed text-xs line-through'
                    : isChosen ? 'bg-[#1A6BCC] text-white shadow-md ring-2 ring-[#1A6BCC] ring-offset-1'
                    : colors
                  }`}
                >
                  {formatTime(slot.time)}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {selectedSlot && (
        <div className="bg-[#0D9E6E]/5 border border-[#0D9E6E]/20 rounded-xl p-3 text-sm text-[#0D9E6E] font-medium">
          ✓ Selected: {selectedDate.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })} at {formatTime(selectedSlot)}
          {activeClinic && ` — ${activeClinic.clinic.name}`}
        </div>
      )}
    </div>
  )
}
