import { useState } from 'react'
import { ChevronDown, X } from 'lucide-react'
import { useSearchStore } from '@/store/searchStore'
import { specialties } from '@/data/specialties'
import { cities } from '@/data/cities'
import { BULGARIAN_INSURERS } from '@mediq/shared'
import Button from '@/components/ui/Button'

interface FilterSidebarProps {
  isMobile?: boolean
  onClose?: () => void
}

function Section({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-[#E2E8F0] py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full mb-0" style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}
      >
        {title}
        <ChevronDown size={16} className={`text-[#94A3B8] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="mt-3 space-y-2">{children}</div>}
    </div>
  )
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="text-sm text-[#0F172A]">{label}</span>
      <button
        type="button"
        onClick={onChange}
        className={`relative inline-flex h-5 w-9 rounded-full transition-colors ${checked ? 'bg-[#0D9E6E]' : 'bg-[#CBD5E1]'}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-4' : 'translate-x-0'}`} />
      </button>
    </label>
  )
}

export default function FilterSidebar({ isMobile, onClose }: FilterSidebarProps) {
  const store = useSearchStore()

  const content = (
    <div className={isMobile ? 'p-4' : ''}>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-base font-semibold text-[#0F172A]">Filters</h2>
        <div className="flex gap-2">
          <button onClick={() => store.resetFilters()} className="text-xs text-[#1A6BCC] hover:underline">
            Clear all
          </button>
          {isMobile && (
            <button onClick={onClose} className="p-1 text-[#64748B] hover:text-[#0F172A]">
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Speaks English — prominent toggle */}
      <div
        className="flex items-center justify-between rounded-xl p-3 mb-4 cursor-pointer"
        style={{
          background: 'var(--accent-secondary-light)',
          border: '1px solid rgba(13, 158, 110, 0.25)',
        }}
      >
        <span className="text-sm font-semibold text-[#0D9E6E]">Speaks English</span>
        <button
          type="button"
          onClick={() => store.setFilter('speaks_english', !store.filters.speaks_english)}
          className={`relative inline-flex h-5 w-9 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D9E6E]/50 ${store.filters.speaks_english ? 'bg-[#0D9E6E]' : 'bg-[#CBD5E1]'}`}
          aria-pressed={store.filters.speaks_english}
          aria-label="Filter English-speaking doctors"
        >
          <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${store.filters.speaks_english ? 'translate-x-4' : 'translate-x-0'}`} />
        </button>
      </div>

      <Section title="Specialty">
        {specialties.map((s) => (
          <label key={s.id} className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={store.filters.specialty_slug === s.slug}
              onChange={() => store.setFilter('specialty_slug', store.filters.specialty_slug === s.slug ? '' : s.slug)}
              className="w-4 h-4 rounded border-[#CBD5E1] accent-[#1A6BCC]"
            />
            <span className="text-sm text-[#0F172A] flex-1">{s.name_en}</span>
            <span className="text-xs text-[#94A3B8]">{s.doctor_count}</span>
          </label>
        ))}
      </Section>

      <Section title="City">
        {cities.map((c) => (
          <label key={c.name} className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={store.filters.city === c.name}
              onChange={() => store.setFilter('city', store.filters.city === c.name ? '' : c.name)}
              className="w-4 h-4 rounded border-[#CBD5E1] accent-[#1A6BCC]"
            />
            <span className="text-sm text-[#0F172A] flex-1">{c.name}</span>
            <span className="text-xs text-[#94A3B8]">{c.doctor_count}</span>
          </label>
        ))}
      </Section>

      <Section title="Insurance & Pricing">
        <Toggle label="Accepts NHIF" checked={store.filters.accepts_nhif} onChange={() => store.setFilter('accepts_nhif', !store.filters.accepts_nhif)} />
        <Toggle label="Private only" checked={store.filters.private_only} onChange={() => store.setFilter('private_only', !store.filters.private_only)} />
        <div className="mt-2">
          <label className="text-sm text-[#0F172A] block mb-1">Specific Insurer</label>
          <select
            value={store.filters.insurer}
            onChange={(e) => store.setFilter('insurer', e.target.value)}
            className="w-full border border-[#E2E8F0] rounded-lg px-3 outline-none focus:border-[#1A6BCC] focus:shadow-[0_0_0_3px_rgba(26,107,204,0.12)] transition-all"
            style={{ height: '40px', fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-primary)', background: 'white' }}
          >
            <option value="">Any insurer</option>
            {BULGARIAN_INSURERS.map((ins) => (
              <option key={ins} value={ins}>{ins}</option>
            ))}
          </select>
        </div>
      </Section>

      <Section title="Price Range">
        <div className="flex items-center justify-between text-xs text-[#64748B] mb-2">
          <span>{store.filters.price_min} BGN</span>
          <span>{store.filters.price_max} BGN</span>
        </div>
        <input
          type="range"
          min={0}
          max={150}
          step={10}
          value={store.filters.price_max}
          onChange={(e) => store.setFilter('price_max', Number(e.target.value))}
          className="w-full accent-[#1A6BCC]"
        />
      </Section>

      <Section title="Sort By" defaultOpen={false}>
        {([
          ['rating', 'Best Rated'],
          ['price_asc', 'Price: Low to High'],
          ['price_desc', 'Price: High to Low'],
        ] as const).map(([val, label]) => (
          <label key={val} className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="radio"
              name="sort"
              checked={store.filters.sort_by === val}
              onChange={() => store.setFilter('sort_by', val)}
              className="accent-[#1A6BCC]"
            />
            <span className="text-sm text-[#0F172A]">{label}</span>
          </label>
        ))}
      </Section>

      {isMobile && (
        <div className="pt-4">
          <Button variant="primary" fullWidth onClick={onClose}>
            Show Results
          </Button>
        </div>
      )}
    </div>
  )

  return content
}
