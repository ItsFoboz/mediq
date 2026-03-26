import { useMemo } from 'react'
import { useSearchStore } from '@/store/searchStore'
import { doctors } from '@/data/doctors'
import type { Doctor } from '@mediq/shared'

export interface UseSearchResult {
  results: Doctor[]
  totalCount: number
  isLoading: boolean
}

export function useSearch(): UseSearchResult {
  const { filters } = useSearchStore()

  const results = useMemo(() => {
    let filtered = [...doctors]

    // Text query
    if (filters.query.trim()) {
      const q = filters.query.toLowerCase()
      filtered = filtered.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.specialty.name_en.toLowerCase().includes(q) ||
          d.specialty.name_bg.toLowerCase().includes(q) ||
          d.bio_en.toLowerCase().includes(q) ||
          d.city.toLowerCase().includes(q),
      )
    }

    // City
    if (filters.city) {
      filtered = filtered.filter(
        (d) => d.city.toLowerCase() === filters.city.toLowerCase(),
      )
    }

    // Specialty
    if (filters.specialty_slug) {
      filtered = filtered.filter(
        (d) => d.specialty.slug === filters.specialty_slug,
      )
    }

    // English
    if (filters.speaks_english) {
      filtered = filtered.filter((d) => d.speaks_english)
    }

    // NHIF
    if (filters.accepts_nhif) {
      filtered = filtered.filter((d) => d.accepts_nhif)
    }

    // Private only
    if (filters.private_only) {
      filtered = filtered.filter((d) => d.private_only)
    }

    // Insurer
    if (filters.insurer) {
      filtered = filtered.filter((d) =>
        d.accepted_insurers.includes(filters.insurer),
      )
    }

    // Price range
    filtered = filtered.filter(
      (d) =>
        d.price_consultation_bgn >= filters.price_min &&
        d.price_consultation_bgn <= filters.price_max,
    )

    // Sort
    switch (filters.sort_by) {
      case 'rating':
        filtered.sort((a, b) => b.rating_average - a.rating_average)
        break
      case 'price_asc':
        filtered.sort((a, b) => a.price_consultation_bgn - b.price_consultation_bgn)
        break
      case 'price_desc':
        filtered.sort((a, b) => b.price_consultation_bgn - a.price_consultation_bgn)
        break
      case 'availability':
        filtered.sort((a, b) => b.rating_count - a.rating_count)
        break
    }

    return filtered
  }, [filters])

  return {
    results,
    totalCount: results.length,
    isLoading: false,
  }
}
