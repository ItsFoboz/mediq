import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Heart, BadgeCheck, Clock } from 'lucide-react'
import type { Doctor } from '@mediq/shared'
import Badge from '@/components/ui/Badge'
import StarRating from '@/components/ui/StarRating'
import Button from '@/components/ui/Button'
import { SkeletonCard } from '@/components/ui/Skeleton'

interface DoctorCardProps {
  doctor: Doctor
  isFavorite?: boolean
  onFavorite?: (id: string) => void
  skeleton?: boolean
}

function getInitials(name: string): string {
  return name
    .replace(/^(Dr\.|Prof\.|Assoc\.)\s*/i, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('')
}

export default function DoctorCard({ doctor, isFavorite, onFavorite, skeleton }: DoctorCardProps) {
  const navigate = useNavigate()

  if (skeleton) return <SkeletonCard />

  const availableToday = doctor.clinics.some((c) => {
    const day = new Date().toLocaleDateString('en', { weekday: 'short' }).toLowerCase()
    return c.schedule && c.schedule[day]?.length > 0
  })

  const firstClinic = doctor.clinics[0]?.clinic

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden cursor-pointer relative hover:border-[#CBD5E1] transition-all duration-200"
      style={{ boxShadow: 'var(--shadow-card)' }}
    >
      {/* Favorite button */}
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onFavorite?.(doctor.id) }}
        className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart
          size={16}
          className={isFavorite ? 'fill-[#DC2626] text-[#DC2626]' : 'text-[#94A3B8]'}
        />
      </button>

      <Link to={`/doctors/${doctor.slug}`} className="block p-5 pr-10">
        <div className="flex gap-4">
          {/* Left: photo */}
          <div className="flex-shrink-0">
            {doctor.photo_url ? (
              <img
                src={doctor.photo_url}
                alt={doctor.name}
                className="w-[72px] h-[72px] rounded-full object-cover border-2 border-[#E2E8F0] bg-[#EEF2F8]"
                onError={(e) => {
                  const t = e.target as HTMLImageElement
                  t.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=1A6BCC&color=fff&size=144`
                }}
              />
            ) : (
              <div className="w-[72px] h-[72px] rounded-full bg-[#EBF3FF] border-2 border-[#E2E8F0] flex items-center justify-center">
                <span className="text-[22px] font-semibold text-[#1A6BCC] font-sans">
                  {getInitials(doctor.name)}
                </span>
              </div>
            )}
          </div>

          {/* Middle: info */}
          <div className="flex-1 min-w-0">
            <p className="font-sans font-semibold text-base text-[#0F172A] leading-snug mb-0.5 truncate">
              {doctor.name}
            </p>
            <p className="text-sm text-[#64748B] mb-2 truncate">
              {doctor.specialty.name_en}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              {doctor.speaks_english && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#E6F7F2] text-[#0D9E6E] border border-[rgba(13,158,110,0.2)]">
                  <BadgeCheck size={11} />Speaks English
                </span>
              )}
              {doctor.accepts_nhif && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#EBF3FF] text-[#1A6BCC] border border-[rgba(26,107,204,0.2)]">
                  NHIF
                </span>
              )}
              {doctor.verified && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#EEF2F8] text-[#64748B]">
                  <BadgeCheck size={11} />Verified
                </span>
              )}
              {availableToday && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#E6F7F2] text-[#0D9E6E]">
                  <Clock size={11} />Today
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mb-1.5">
              <StarRating rating={doctor.rating_average} size="sm" showCount count={doctor.rating_count} />
            </div>

            {/* Location */}
            {firstClinic && (
              <p className="flex items-center gap-1 text-[13px] text-[#94A3B8] mt-1">
                <MapPin size={13} className="flex-shrink-0" />
                {firstClinic.name} · {doctor.city}
              </p>
            )}
          </div>

          {/* Right: price + action */}
          <div className="flex-shrink-0 flex flex-col items-end justify-between min-w-[80px] hidden sm:flex">
            <div className="text-right">
              <p className="font-bold text-lg text-[#0F172A] leading-none" style={{ fontFamily: 'var(--font-display)' }}>
                {doctor.price_consultation_bgn}
              </p>
              <p className="text-[11px] text-[#94A3B8] mt-0.5">BGN</p>
              <p className="text-[11px] text-[#94A3B8]">per visit</p>
            </div>
          </div>
        </div>
      </Link>

      {/* CTA */}
      <div className="px-5 pb-5 flex items-center justify-between gap-3">
        <span className="text-sm text-[#94A3B8] flex items-center gap-1 sm:hidden">
          {doctor.price_consultation_bgn} BGN
        </span>
        <Button
          variant="primary"
          size="sm"
          className="ml-auto"
          onClick={(e) => {
            e.preventDefault()
            navigate(`/book/${doctor.id}`)
          }}
        >
          Book Appointment
        </Button>
      </div>
    </motion.div>
  )
}
