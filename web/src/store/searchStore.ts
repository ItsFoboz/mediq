import { create } from 'zustand'
import type { SearchFilters, SortOption } from '@mediq/shared'

interface SearchStore {
  filters: SearchFilters
  setFilter: <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => void
  setFilters: (partial: Partial<SearchFilters>) => void
  resetFilters: () => void
}

const defaultFilters: SearchFilters = {
  query: '',
  city: '',
  specialty_slug: '',
  speaks_english: true,
  accepts_nhif: false,
  private_only: false,
  insurer: '',
  gender: 'any',
  price_min: 0,
  price_max: 300,
  sort_by: 'rating' as SortOption,
}

export const useSearchStore = create<SearchStore>((set) => ({
  filters: { ...defaultFilters },

  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),

  setFilters: (partial) =>
    set((state) => ({
      filters: { ...state.filters, ...partial },
    })),

  resetFilters: () =>
    set({ filters: { ...defaultFilters } }),
}))
