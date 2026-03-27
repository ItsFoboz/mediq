import { useState } from 'react'
import { ThumbsUp, BadgeCheck } from 'lucide-react'
import type { Review } from '@mediq/shared'
import { formatRelativeDate, getInitials } from '@mediq/shared'
import StarRating from '@/components/ui/StarRating'

interface ReviewCardProps {
  review: Review
}

function avatarColor(name: string): string {
  const colors = ['#1A6BCC', '#0D9E6E', '#7C3AED', '#DB2777', '#D97706', '#059669']
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return colors[Math.abs(hash) % colors.length]
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [helpfulCount, setHelpfulCount] = useState(review.helpful_count)
  const [markedHelpful, setMarkedHelpful] = useState(false)

  const displayName = review.user_name ?? 'Anonymous'
  const isLong = review.text.length > 200

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0"
            style={{ backgroundColor: avatarColor(displayName) }}
          >
            {getInitials(displayName)}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-[#0F172A] text-sm">{displayName}</span>
              {review.verified_patient && (
                <span className="flex items-center gap-0.5 text-xs text-[#0D9E6E] font-medium">
                  <BadgeCheck size={13} />
                  Verified
                </span>
              )}
            </div>
            <p className="text-xs text-[#94A3B8]">{formatRelativeDate(review.created_at)}</p>
          </div>
        </div>
        <StarRating rating={review.rating} size="sm" />
      </div>

      {/* Text */}
      <p className="text-sm text-[#0F172A] leading-relaxed">
        {isLong && !expanded ? review.text.slice(0, 200) + '…' : review.text}
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-[#1A6BCC] mt-1 hover:underline"
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}

      {/* Helpful */}
      <div className="flex items-center gap-1 mt-3 pt-3 border-t border-[#E2E8F0]">
        <button
          onClick={() => {
            if (!markedHelpful) {
              setHelpfulCount((c) => c + 1)
              setMarkedHelpful(true)
            }
          }}
          className={`flex items-center gap-1.5 text-xs transition-colors ${
            markedHelpful ? 'text-[#1A6BCC]' : 'text-[#94A3B8] hover:text-[#64748B]'
          }`}
        >
          <ThumbsUp size={13} />
          Helpful ({helpfulCount})
        </button>
      </div>
    </div>
  )
}
