import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Heart, BadgeCheck, Clock } from 'lucide-react'
import type { Doctor } from '@mediq/shared'
import { formatPrice } from '@mediq/shared'
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

export default function DoctorCard({ doctor, isFavorite, onFavorite, skeleton }: DoctorCardProps) {
  const navigate = useNavigate()

  if (skeleton) return <SkeletonCard />

  const availableToday = doctor.clinics.some((c) => {
    const day = new Date().toLocaleDateString('en', { weekday: 'short' }).toLowerCase()
    return c.schedule && c.schedule[day]?.length > 0
  })

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      className="bg-white rounded-[12px] border border-[#E2E8F0] overflow-hidden cursor-pointer relative"
      style={{ boxShadow: 'var(--shadow-card)' }}
    >
      {/* Favorite button */}
      <button
        onClick={(e) => { e.preventDefault(); onFavorite?.(doctor.id) }}
        className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart
          size={16}
          className={isFavorite ? 'fill-[#DC2626] text-[#DC2626]' : 'text-[#94A3B8]'}
        />
      </button>

      <Link to={`/doctors/${doctor.slug}`} className="block p-5">
        {/* Header row */}
        <div className="flex items-start gap-4 mb-3">
          <img
            src={doctor.photo_url}
            alt={doctor.name}
            className="w-16 h-16 rounded-full object-cover flex-shrink-0 bg-[#EEF2F8]"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=1A6BCC&color=fff&size=128`
            }}
          />
          <div className="min-w-0">
            <h3 className="font-semibold text-[#0F172A] text-base leading-tight truncate">{doctor.name}</h3>
            <p className="text-sm text-[#64748B] mt-0.5">
              {doctor.specialty.name_en}{' '}
              <span className="text-[#94A3B8]">({doctor.specialty.name_bg})</span>
            </p>
            <div className="flex items-center gap-1 mt-1.5">
              <StarRating rating={doctor.rating_average} size="sm" />
              <span className="text-xs text-[#94A3B8]">({doctor.rating_count})</span>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {doctor.speaks_english && (
            <Badge variant="green" size="sm">🇬🇧 Speaks English</Badge>
          )}
          {doctor.accepts_nhif && (
            <Badge variant="blue" size="sm">NHIF</Badge>
          )}
          {doctor.verified && (
            <Badge variant="green" size="sm">
              <BadgeCheck size={11} className="inline mr-0.5" />Verified
            </Badge>
          )}
          {availableToday && (
            <Badge variant="green" size="sm">
              <Clock size={11} className="inline mr-0.5" />Available today
            </Badge>
          )}
        </div>

        {/* Location + price */}
        <div className="flex items-center justify-between text-sm mb-4">
          <span className="flex items-center gap-1 text-[#64748B]">
            <MapPin size={13} className="flex-shrink-0" />
            {doctor.city}
          </span>
          <span className="font-semibold text-[#0F172A] tabular-nums">
            {doctor.price_consultation_bgn} BGN
            <span className="font-normal text-[#94A3B8] text-xs ml-1">
              / €{(doctor.price_consultation_bgn / 1.95583).toFixed(0)}
            </span>
          </span>
        </div>

        {/* Insurers */}
        {doctor.accepted_insurers.length > 0 && (
          <p className="text-xs text-[#94A3B8] mb-3 truncate">
            Accepts: {doctor.accepted_insurers.slice(0, 3).join(', ')}
            {doctor.accepted_insurers.length > 3 && ` +${doctor.accepted_insurers.length - 3} more`}
          </p>
        )}
      </Link>

      {/* CTA */}
      <div className="px-5 pb-5">
        <Button
          variant="primary"
          fullWidth
          size="md"
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
