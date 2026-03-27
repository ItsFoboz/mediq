import { useState } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import { useSearch } from '@/hooks/useSearch'
import { useSearchStore } from '@/store/searchStore'
import DoctorCard from '@/components/doctor/DoctorCard'
import { SkeletonCard } from '@/components/ui/Skeleton'
import Modal from '@/components/ui/Modal'
import FilterSidebar from './FilterSidebar'

export default function SearchResults() {
  const { results, isLoading, totalCount } = useSearch()
  const { filters, setFilter, resetFilters } = useSearchStore()
  const [showFilters, setShowFilters] = useState(false)

  const activeFilters = [
    filters.city && { label: filters.city, key: 'city' as const },
    filters.specialty_slug && { label: filters.specialty_slug.replace(/-/g, ' '), key: 'specialty_slug' as const },
    filters.speaks_english && { label: 'Speaks English', key: 'speaks_english' as const },
    filters.accepts_nhif && { label: 'NHIF', key: 'accepts_nhif' as const },
  ].filter(Boolean) as { label: string; key: string }[]

  return (
    <div>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div>
          <p className="text-sm text-[#64748B]">
            {isLoading ? 'Searching…' : `${totalCount} doctor${totalCount !== 1 ? 's' : ''} found`}
          </p>
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {activeFilters.map((f) => (
                <span key={f.key} className="flex items-center gap-1 text-xs bg-[#1A6BCC]/10 text-[#1A6BCC] px-2 py-0.5 rounded-full">
                  {f.label}
                  <button onClick={() => setFilter(f.key as keyof typeof filters, f.key === 'speaks_english' || f.key === 'accepts_nhif' ? false : '')}>
                    <X size={11} />
                  </button>
                </span>
              ))}
              <button onClick={resetFilters} className="text-xs text-[#94A3B8] hover:text-[#64748B] px-1">
                Clear all
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(true)}
            className="md:hidden flex items-center gap-1.5 text-sm font-medium text-[#0F172A] border border-[#E2E8F0] rounded-lg px-3 py-2 bg-white hover:bg-[#F7F9FC] transition-colors"
          >
            <SlidersHorizontal size={16} />
            Filters
            {activeFilters.length > 0 && (
              <span className="bg-[#1A6BCC] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {activeFilters.length}
              </span>
            )}
          </button>

          <select
            value={filters.sort_by}
            onChange={(e) => setFilter('sort_by', e.target.value as typeof filters.sort_by)}
            className="text-sm border border-[#E2E8F0] rounded-lg px-3 py-2 bg-white text-[#0F172A] outline-none focus:border-[#1A6BCC] cursor-pointer"
          >
            <option value="rating">Best Rated</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-[#0F172A] mb-2">No doctors found</h3>
          <p className="text-[#64748B] mb-4">Try adjusting your filters or searching in a different city.</p>
          <button onClick={resetFilters} className="text-[#1A6BCC] text-sm font-medium hover:underline">
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {results.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      )}

      <Modal isOpen={showFilters} onClose={() => setShowFilters(false)} title="Filters" size="md">
        <FilterSidebar isMobile onClose={() => setShowFilters(false)} />
      </Modal>
    </div>
  )
}
