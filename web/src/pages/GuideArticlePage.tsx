import { useParams, Link } from 'react-router-dom'
import { ChevronRight, Clock, ArrowLeft } from 'lucide-react'
import { guideArticles } from '@/data/guide'

export default function GuideArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const article = guideArticles.find(a => a.slug === slug)

  if (!article) return (
    <div className="text-center py-24 text-[#94A3B8]">
      Article not found. <Link to="/guide" className="text-[#1A6BCC] hover:underline">Back to Guide</Link>
    </div>
  )

  return (
    <div style={{ background: 'var(--bg-base)' }} className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <nav className="flex items-center gap-1 text-xs text-[#94A3B8] mb-6">
          <Link to="/guide" className="hover:text-[#1A6BCC]">Guide</Link>
          <ChevronRight size={12} />
          <span className="text-[#64748B]">{article.category}</span>
          <ChevronRight size={12} />
          <span className="text-[#0F172A]">{article.title}</span>
        </nav>

        <div className="mb-8">
          <span className="text-xs font-medium text-[#1A6BCC] bg-[#1A6BCC]/10 px-3 py-1 rounded-full uppercase tracking-wide">
            {article.category}
          </span>
          <h1 className="text-4xl font-serif font-bold text-[#0F172A] mt-4 mb-3">{article.title}</h1>
          <p className="text-lg text-[#64748B] mb-4">{article.excerpt}</p>
          <div className="flex items-center gap-4 text-sm text-[#94A3B8]">
            <span className="flex items-center gap-1"><Clock size={14} />{article.reading_time_minutes} min read</span>
            <span>Last updated: January 2025</span>
          </div>
        </div>

        <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-8 mb-8" style={{ boxShadow: 'var(--shadow-card)' }}>
          <p className="text-[#64748B] leading-relaxed whitespace-pre-wrap">{article.content}</p>
        </div>

        {article.key_phrases && article.key_phrases.length > 0 && (
          <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-6 mb-8" style={{ boxShadow: 'var(--shadow-card)' }}>
            <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Useful Bulgarian phrases</h2>
            <div className="space-y-3">
              {article.key_phrases.map((p, i) => (
                <div key={i} className="grid grid-cols-3 gap-3 text-sm py-2 border-b border-[#F1F5F9] last:border-0">
                  <span className="font-medium text-[#0F172A]">{p.phrase}</span>
                  <span className="text-[#1A6BCC]">{p.translation}</span>
                  <span className="text-[#94A3B8] italic">{p.phonetic}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {article.cost_estimates && article.cost_estimates.length > 0 && (
          <div className="bg-[#EEF5FF] rounded-[16px] p-6 mb-8">
            <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Typical costs in Bulgaria</h2>
            <div className="space-y-2">
              {article.cost_estimates.map((c, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-[#64748B]">{c.item}</span>
                  <span className="font-medium text-[#0F172A]">{c.cost_bgn}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <Link to="/guide" className="inline-flex items-center gap-2 text-sm text-[#1A6BCC] hover:underline">
          <ArrowLeft size={14} /> Back to all guides
        </Link>
      </div>
    </div>
  )
}
