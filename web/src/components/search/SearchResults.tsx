import { useState } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import { useSearch } from '@/hooks/useSearch'
import { useSearchStore } from '@/store/searchStore'
import DoctorCard from '@/components/doctor/DoctorCard'
import { SkeletonCard } from '@/components/ui/Skeleton'
import Modal from '@/components/ui/Modal'
import FilterSidebar from './FilterSidebar'

export default function SearchResults() {
  const { doctors, isLoading, total } = useSearch()
  const { sort_by, setFilter, resetFilters, city, specialty_slug, speaks_english, accepts_nhif } = useSearchStore()
  const [showFilters, setShowFilters] = useState(false)

  const activeFilters = [
    city && { label: city, key: 'city' },
    specialty_slug && { label: specialty_slug.replace(/-/g, ' '), key: 'specialty_slug' },
    speaks_english && { label: 'Speaks English', key: 'speaks_english' },
    accepts_nhif && { label: 'NHIF', key: 'accepts_nhif' },
  ].filter(Boolean) as { label: string; key: string }[]

  return (
    <div>
      {/* Header row */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div>
          <p className="text-sm text-[#64748B]">
            {isLoading ? 'Searching…' : `${total} doctor${total !== 1 ? 's' : ''} found`}
          </p>
          {/* Active filter tags */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {activeFilters.map((f) => (
                <span
                  key={f.key}
                  className="flex items-center gap-1 text-xs bg-[#1A6BCC]/10 text-[#1A6BCC] px-2 py-0.5 rounded-full"
                >
                  {f.label}
                  <button onClick={() => setFilter(f.key, f.key === 'speaks_english' || f.key === 'accepts_nhif' ? false : '')}>
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
          {/* Mobile filter button */}
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

          {/* Sort */}
          <select
            value={sort_by}
            onChange={(e) => setFilter('sort_by', e.target.value)}
            className="text-sm border border-[#E2E8F0] rounded-lg px-3 py-2 bg-white text-[#0F172A] outline-none focus:border-[#1A6BCC] cursor-pointer"
          >
            <option value="rating">Best Rated</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : doctors.length === 0 ? (
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
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      )}

      {/* Mobile filter modal */}
      <Modal isOpen={showFilters} onClose={() => setShowFilters(false)} title="Filters" size="md">
        <FilterSidebar isMobile onClose={() => setShowFilters(false)} />
      </Modal>
    </div>
  )
}
