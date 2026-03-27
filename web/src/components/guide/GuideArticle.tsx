import { Link } from 'react-router-dom'
import { Clock, Calendar, ArrowLeft } from 'lucide-react'
import type { GuideArticle } from '@mediq/shared'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

const CATEGORY_COLORS: Record<string, 'blue' | 'green' | 'yellow' | 'gray' | 'red' | 'purple'> = {
  System: 'blue', Insurance: 'purple', 'Finding Care': 'green',
  Emergency: 'red', Medications: 'yellow', Dental: 'gray',
}

interface GuideArticleProps {
  article: GuideArticle
}

// Very simple markdown renderer — handles headings, bold, lists, tables, hr
function renderMarkdown(md: string) {
  const lines = md.split('\n')
  const result: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    if (line.startsWith('## ')) {
      result.push(<h2 key={i} className="text-xl font-serif font-bold text-[#0F172A] mt-8 mb-3">{line.slice(3)}</h2>)
    } else if (line.startsWith('### ')) {
      result.push(<h3 key={i} className="text-base font-semibold text-[#0F172A] mt-5 mb-2">{line.slice(4)}</h3>)
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      const items = []
      while (i < lines.length && (lines[i].startsWith('- ') || lines[i].startsWith('* '))) {
        items.push(<li key={i} className="text-[#64748B]" dangerouslySetInnerHTML={{ __html: lines[i].slice(2).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/_(.+?)_/g, '<em>$1</em>') }} />)
        i++
      }
      result.push(<ul key={`ul-${i}`} className="list-disc list-inside space-y-1 mb-3 text-sm">{items}</ul>)
      continue
    } else if (line.startsWith('| ')) {
      const rows = []
      while (i < lines.length && lines[i].startsWith('| ')) {
        if (!lines[i].includes('---')) {
          const cells = lines[i].split('|').filter(c => c.trim())
          rows.push(cells)
        }
        i++
      }
      result.push(
        <div key={`table-${i}`} className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#F7F9FC]">
                {rows[0]?.map((cell, ci) => <th key={ci} className="text-left px-3 py-2 border border-[#E2E8F0] font-semibold text-[#0F172A]">{cell.trim()}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.slice(1).map((row, ri) => (
                <tr key={ri} className="hover:bg-[#F7F9FC]">
                  {row.map((cell, ci) => <td key={ci} className="px-3 py-2 border border-[#E2E8F0] text-[#64748B]">{cell.trim()}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
      continue
    } else if (line.startsWith('---')) {
      result.push(<hr key={i} className="border-[#E2E8F0] my-6" />)
    } else if (line.trim() === '') {
      result.push(<div key={i} className="h-2" />)
    } else {
      result.push(
        <p key={i} className="text-sm text-[#64748B] leading-relaxed mb-2"
          dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.+?)\*\*/g, '<strong class="text-[#0F172A]">$1</strong>').replace(/_(.+?)_/g, '<em>$1</em>').replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-[#1A6BCC] hover:underline">$1</a>') }}
        />
      )
    }
    i++
  }
  return result
}

export default function GuideArticle({ article }: GuideArticleProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/guide" className="inline-flex items-center gap-1.5 text-sm text-[#64748B] hover:text-[#1A6BCC] mb-6 transition-colors">
        <ArrowLeft size={14} />Back to Guide
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant={CATEGORY_COLORS[article.category] ?? 'gray'}>{article.category}</Badge>
          <span className="text-sm text-[#94A3B8] flex items-center gap-1"><Clock size={13} />{article.reading_time_minutes} min read</span>
          <span className="text-sm text-[#94A3B8] flex items-center gap-1"><Calendar size={13} />Updated {article.last_updated}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#0F172A] leading-tight mb-3">{article.title}</h1>
        <p className="text-lg text-[#64748B]">{article.excerpt}</p>
      </div>

      {/* Key phrases */}
      {article.key_phrases && article.key_phrases.length > 0 && (
        <div className="bg-[#EEF2F8] rounded-[12px] p-5 mb-8">
          <h2 className="text-sm font-semibold text-[#0F172A] mb-3">🇧🇬 Key Bulgarian Phrases</h2>
          <div className="space-y-2">
            {article.key_phrases.map((kp, i) => (
              <div key={i} className="flex items-start gap-4 text-sm">
                <span className="font-medium text-[#0F172A] min-w-0 flex-1">{kp.phrase}</span>
                <span className="text-[#64748B] flex-1">{kp.translation}</span>
                <span className="text-[#94A3B8] italic flex-1 text-xs">{kp.phonetic}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="prose-mediq">{renderMarkdown(article.content)}</div>

      {/* Cost estimates */}
      {article.cost_estimates && article.cost_estimates.length > 0 && (
        <div className="mt-8 bg-white border border-[#E2E8F0] rounded-[12px] p-5">
          <h2 className="text-base font-semibold text-[#0F172A] mb-3">💰 Typical Costs</h2>
          <div className="space-y-2">
            {article.cost_estimates.map((ce, i) => (
              <div key={i} className="flex items-center justify-between text-sm py-1.5 border-b border-[#F7F9FC] last:border-0">
                <span className="text-[#64748B]">{ce.item}</span>
                <div className="text-right">
                  <span className="font-semibold text-[#0F172A]">{ce.cost_bgn}</span>
                  <span className="text-[#94A3B8] text-xs ml-2">{ce.cost_eur}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#94A3B8] mt-3">Prices are approximate and may vary by clinic and city.</p>
        </div>
      )}

      {/* CTA */}
      <div className="mt-10 bg-[#1A6BCC]/5 border border-[#1A6BCC]/20 rounded-[16px] p-6 text-center">
        <h3 className="font-semibold text-[#0F172A] mb-1">Ready to find a doctor?</h3>
        <p className="text-sm text-[#64748B] mb-4">Search English-speaking doctors across Bulgaria and book online in minutes.</p>
        <Button variant="primary" onClick={() => window.location.href = '/doctors'}>Find a Doctor</Button>
      </div>
    </div>
  )
}
