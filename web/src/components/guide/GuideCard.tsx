import { Link } from 'react-router-dom'
import { Clock, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import type { GuideArticle } from '@mediq/shared'
import Badge from '@/components/ui/Badge'

const CATEGORY_COLORS: Record<string, 'blue' | 'green' | 'yellow' | 'gray' | 'red' | 'purple'> = {
  System: 'blue', Insurance: 'purple', 'Finding Care': 'green',
  Emergency: 'red', Medications: 'yellow', Dental: 'gray',
}

interface GuideCardProps {
  article: GuideArticle
  featured?: boolean
}

export default function GuideCard({ article, featured }: GuideCardProps) {
  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.15 }}>
      <Link
        to={`/guide/${article.slug}`}
        className={`block bg-white rounded-[12px] border border-[#E2E8F0] overflow-hidden hover:shadow-md transition-shadow ${featured ? 'p-6' : 'p-5'}`}
        style={{ boxShadow: 'var(--shadow-card)' }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Badge variant={CATEGORY_COLORS[article.category] ?? 'gray'} size="sm">
            {article.category}
          </Badge>
          <span className="text-xs text-[#94A3B8] flex items-center gap-1">
            <Clock size={11} />{article.reading_time_minutes} min read
          </span>
        </div>
        <h3 className={`font-serif font-semibold text-[#0F172A] leading-snug mb-2 ${featured ? 'text-xl' : 'text-base'}`}>
          {article.title}
        </h3>
        <p className="text-sm text-[#64748B] line-clamp-2 mb-3">{article.excerpt}</p>
        <span className="text-sm text-[#1A6BCC] font-medium flex items-center gap-1 group">
          Read guide <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </span>
      </Link>
    </motion.div>
  )
}
