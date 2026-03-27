import { useState } from 'react'
import { guideArticles } from '@/data/guide'
import GuideCard from '@/components/guide/GuideCard'

const CATEGORIES = ['All', 'System', 'Insurance', 'Finding Care', 'Emergency', 'Medications', 'Dental']

export default function GuidePage() {
  const [cat, setCat] = useState('All')
  const filtered = cat === 'All' ? guideArticles : guideArticles.filter(a => a.category === cat)
  const featured = guideArticles.find(a => a.slug === 'healthcare-system')

  return (
    <div style={{ background: 'var(--bg-base)' }} className="min-h-screen">
      <div className="bg-gradient-to-b from-[#EEF5FF] to-transparent py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-serif font-bold text-[#0F172A] mb-3">The MEDIQ Expat Healthcare Guide</h1>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
            Everything you need to know about healthcare in Bulgaria, written in plain English for expats and foreign residents.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-16">
        {/* Featured */}
        {featured && cat === 'All' && (
          <div className="mb-8 -mt-4">
            <GuideCard article={featured} featured />
          </div>
        )}

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap mb-6">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                cat === c ? 'bg-[#1A6BCC] text-white' : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:border-[#1A6BCC] hover:text-[#1A6BCC]'
              }`}>
              {c}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.filter(a => !(cat === 'All' && a.slug === 'healthcare-system')).map(article => (
            <GuideCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </div>
  )
}
