import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Globe } from 'lucide-react'
import { useSearchStore } from '@/store/searchStore'
import Button from '@/components/ui/Button'
import CitySelector from './CitySelector'

interface SearchBarProps {
  compact?: boolean
}

export default function SearchBar({ compact = false }: SearchBarProps) {
  const navigate = useNavigate()
  const { filters, setFilter } = useSearchStore()
  const [localQuery, setLocalQuery] = useState(filters.query)
  const [localCity, setLocalCity] = useState(filters.city)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setFilter('query', localQuery)
    setFilter('city', localCity)
    navigate(`/doctors?q=${encodeURIComponent(localQuery)}&city=${encodeURIComponent(localCity)}`)
  }

  if (compact) {
    return (
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2 bg-white border border-[#E2E8F0] rounded-lg px-3 py-2 focus-within:border-[#1A6BCC] transition-colors">
          <Search size={16} className="text-[#94A3B8] flex-shrink-0" />
          <input
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder="Search doctors or specialties..."
            className="flex-1 text-sm outline-none text-[#0F172A] placeholder:text-[#94A3B8] bg-transparent"
          />
        </div>
        <CitySelector value={localCity} onChange={setLocalCity} />
        <Button type="submit" variant="primary" size="md">Search</Button>
      </form>
    )
  }

  return (
    <form onSubmit={handleSearch}>
      <div className="bg-white rounded-[16px] p-2 shadow-xl border border-[#E2E8F0] flex flex-col md:flex-row gap-2">
        <div className="flex items-center gap-3 flex-1 px-4 py-3 bg-[#F7F9FC] rounded-[12px] md:rounded-r-none">
          <Search size={20} className="text-[#94A3B8] flex-shrink-0" />
          <input
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder="Search by specialty or doctor name..."
            className="flex-1 bg-transparent text-[#0F172A] text-base outline-none placeholder:text-[#94A3B8]"
          />
        </div>

        <div className="hidden md:block w-px bg-[#E2E8F0] my-2" />

        <div className="px-2 md:px-3 py-1 md:py-0 flex items-center">
          <CitySelector value={localCity} onChange={setLocalCity} />
        </div>

        <div className="hidden md:block w-px bg-[#E2E8F0] my-2" />

        <div className="flex items-center gap-2 px-4 py-2 md:py-0">
          <Globe size={16} className="text-[#94A3B8]" />
          <span className="text-sm text-[#64748B] whitespace-nowrap">Speaks English</span>
          <button
            type="button"
            onClick={() => setFilter('speaks_english', !filters.speaks_english)}
            className={`relative inline-flex h-5 w-9 rounded-full transition-colors ${
              filters.speaks_english ? 'bg-[#0D9E6E]' : 'bg-[#CBD5E1]'
            }`}
          >
            <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
              filters.speaks_english ? 'translate-x-4' : 'translate-x-0'
            }`} />
          </button>
        </div>

        <Button type="submit" variant="primary" size="lg" className="rounded-[12px]">
          <Search size={18} className="mr-2" />
          Search
        </Button>
      </div>
    </form>
  )
}
