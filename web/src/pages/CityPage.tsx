import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { MapPin } from 'lucide-react'
import { cities } from '@/data/cities'
import { useSearchStore } from '@/store/searchStore'
import SearchResults from '@/components/search/SearchResults'

export default function CityPage() {
  const { slug } = useParams<{ slug: string }>()
  const city = cities.find(c => c.slug === slug)
  const { setFilter } = useSearchStore()

  useEffect(() => {
    if (city) setFilter('city', city.name)
    return () => setFilter('city', '')
  }, [city?.name])

  if (!city) return <div className="text-center py-24 text-[#94A3B8]">City not found. <Link to="/doctors" className="text-[#1A6BCC] hover:underline">All doctors</Link></div>

  return (
    <div style={{ background: 'var(--bg-base)' }} className="min-h-screen">
      <div className="bg-white border-b border-[#E2E8F0] py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-[#94A3B8] text-sm mb-2">
            <MapPin size={14} />Bulgaria
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#0F172A]">Doctors in {city.name}</h1>
          <p className="text-[#64748B] mt-1">{city.description}</p>
          <p className="text-sm text-[#1A6BCC] font-medium mt-2">{city.doctor_count} English-speaking doctors</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-6">
        <SearchResults />
      </div>
    </div>
  )
}
