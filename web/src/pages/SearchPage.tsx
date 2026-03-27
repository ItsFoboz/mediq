import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSearchStore } from '@/store/searchStore'
import SearchBar from '@/components/search/SearchBar'
import FilterSidebar from '@/components/search/FilterSidebar'
import SearchResults from '@/components/search/SearchResults'

export default function SearchPage() {
  const [params] = useSearchParams()
  const { setQuery, setCity, setFilter } = useSearchStore()

  useEffect(() => {
    const q = params.get('q') ?? ''
    const city = params.get('city') ?? ''
    const specialty = params.get('specialty') ?? ''
    if (q) setQuery(q)
    if (city) setCity(city)
    if (specialty) setFilter('specialty_slug', specialty)
  }, [])

  return (
    <div style={{ background: 'var(--bg-base)' }} className="min-h-screen">
      {/* Top search bar */}
      <div className="bg-white border-b border-[#E2E8F0] px-4 py-4">
        <div className="max-w-5xl mx-auto">
          <SearchBar compact />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 flex gap-6">
        {/* Sidebar (desktop) */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="bg-white rounded-[12px] border border-[#E2E8F0] p-4 sticky top-20">
            <FilterSidebar />
          </div>
        </aside>

        {/* Results */}
        <main className="flex-1 min-w-0">
          <SearchResults />
        </main>
      </div>
    </div>
  )
}
