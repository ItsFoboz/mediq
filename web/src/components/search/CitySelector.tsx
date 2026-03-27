import { useState, useRef, useEffect } from 'react'
import { MapPin, ChevronDown, Search } from 'lucide-react'
import { cities, ALL_BULGARIAN_CITIES } from '@/data/cities'

interface CitySelectorProps {
  value: string
  onChange: (city: string) => void
  placeholder?: string
}

export default function CitySelector({ value, onChange, placeholder = 'All Cities' }: CitySelectorProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const featured = cities.map((c) => c.name)
  const others = ALL_BULGARIAN_CITIES.filter((c) => !featured.includes(c))
  const filtered = search
    ? ALL_BULGARIAN_CITIES.filter((c) => c.toLowerCase().includes(search.toLowerCase()))
    : null

  const select = (city: string) => {
    onChange(city)
    setOpen(false)
    setSearch('')
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 border border-[#E2E8F0] rounded-lg bg-white text-sm text-[#0F172A] hover:border-[#1A6BCC] transition-colors w-full min-w-[160px]"
      >
        <MapPin size={15} className="text-[#94A3B8] flex-shrink-0" />
        <span className={`flex-1 text-left truncate ${!value ? 'text-[#94A3B8]' : ''}`}>
          {value || placeholder}
        </span>
        <ChevronDown size={15} className={`text-[#94A3B8] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full mt-1 left-0 w-64 bg-white border border-[#E2E8F0] rounded-[12px] shadow-lg z-50 overflow-hidden">
          {/* Search */}
          <div className="p-2 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-2 px-2 py-1.5 bg-[#F7F9FC] rounded-lg">
              <Search size={13} className="text-[#94A3B8]" />
              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search cities..."
                className="bg-transparent text-sm outline-none flex-1 text-[#0F172A] placeholder:text-[#94A3B8]"
              />
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto py-1">
            {/* All cities option */}
            <button
              onClick={() => select('')}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                !value ? 'bg-[#1A6BCC]/5 text-[#1A6BCC] font-medium' : 'text-[#0F172A] hover:bg-[#F7F9FC]'
              }`}
            >
              All Cities
            </button>

            {filtered ? (
              filtered.map((city) => (
                <button
                  key={city}
                  onClick={() => select(city)}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    value === city ? 'bg-[#1A6BCC]/5 text-[#1A6BCC] font-medium' : 'text-[#0F172A] hover:bg-[#F7F9FC]'
                  }`}
                >
                  {city}
                </button>
              ))
            ) : (
              <>
                <div className="px-4 py-1.5 text-xs font-semibold text-[#94A3B8] uppercase tracking-wide">
                  Major Cities
                </div>
                {featured.map((city) => {
                  const cityData = cities.find((c) => c.name === city)
                  return (
                    <button
                      key={city}
                      onClick={() => select(city)}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center justify-between ${
                        value === city ? 'bg-[#1A6BCC]/5 text-[#1A6BCC] font-medium' : 'text-[#0F172A] hover:bg-[#F7F9FC]'
                      }`}
                    >
                      <span>{city}</span>
                      {cityData && <span className="text-xs text-[#94A3B8]">{cityData.doctor_count} doctors</span>}
                    </button>
                  )
                })}
                <div className="px-4 py-1.5 text-xs font-semibold text-[#94A3B8] uppercase tracking-wide border-t border-[#E2E8F0] mt-1">
                  All Provinces
                </div>
                {others.map((city) => (
                  <button
                    key={city}
                    onClick={() => select(city)}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                      value === city ? 'bg-[#1A6BCC]/5 text-[#1A6BCC] font-medium' : 'text-[#0F172A] hover:bg-[#F7F9FC]'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
