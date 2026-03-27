import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Phone, Clock, BadgeCheck, Globe, GraduationCap, Award, Heart } from 'lucide-react'
import type { Doctor } from '@mediq/shared'
import { formatPrice } from '@mediq/shared'
import { reviews as allReviews } from '@/data/reviews'
import StarRating from '@/components/ui/StarRating'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import AvailabilityCalendar from './AvailabilityCalendar'
import ReviewCard from './ReviewCard'

interface DoctorProfileProps {
  doctor: Doctor
}

type Tab = 'about' | 'reviews' | 'locations'

export default function DoctorProfile({ doctor }: DoctorProfileProps) {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<Tab>('about')

  const doctorReviews = allReviews.filter((r) => r.doctor_id === doctor.id)

  const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: doctorReviews.filter((r) => r.rating === star).length,
    pct: doctorReviews.length
      ? Math.round((doctorReviews.filter((r) => r.rating === star).length / doctorReviews.length) * 100)
      : 0,
  }))

  const tabs: { key: Tab; label: string }[] = [
    { key: 'about', label: 'About' },
    { key: 'reviews', label: `Reviews (${doctorReviews.length})` },
    { key: 'locations', label: 'Locations' },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-6 md:p-8 mb-6" style={{ boxShadow: 'var(--shadow-card)' }}>
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={doctor.photo_url}
            alt={doctor.name}
            className="w-28 h-28 rounded-full object-cover flex-shrink-0 bg-[#EEF2F8] mx-auto md:mx-0"
            onError={(e) => {
              const t = e.target as HTMLImageElement
              t.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=1A6BCC&color=fff&size=256`
            }}
          />
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-start gap-2 justify-center md:justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#0F172A]">{doctor.name}</h1>
                <p className="text-[#64748B] mt-1">
                  {doctor.specialty.name_en}{' '}
                  <span className="text-[#94A3B8]">({doctor.specialty.name_bg})</span>
                  {' · '}{doctor.years_experience} years experience
                </p>
              </div>
              <Button variant="ghost" size="sm">
                <Heart size={16} className="mr-1" />
                Save
              </Button>
            </div>

            <div className="flex items-center gap-2 mt-3 justify-center md:justify-start">
              <StarRating rating={doctor.rating_average} size="md" showCount count={doctor.rating_count} />
            </div>

            <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
              {doctor.speaks_english && (
                <Badge variant="green">🇬🇧 Speaks English</Badge>
              )}
              {doctor.speaks_other_languages.map((lang) => (
                <Badge key={lang} variant="gray">{lang}</Badge>
              ))}
              {doctor.verified && (
                <Badge variant="green"><BadgeCheck size={13} className="inline mr-1" />Verified</Badge>
              )}
              {doctor.accepts_nhif && (
                <Badge variant="blue">NHIF Accepted</Badge>
              )}
            </div>

            <div className="flex items-center gap-1 mt-3 text-sm text-[#64748B] justify-center md:justify-start">
              <MapPin size={14} />
              {doctor.city}
            </div>
          </div>

          {/* Booking sidebar (desktop) */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-[#F7F9FC] rounded-[12px] p-4 border border-[#E2E8F0]">
              <p className="text-xs text-[#94A3B8] mb-1">Consultation from</p>
              <p className="text-2xl font-bold text-[#0F172A] tabular-nums">
                {doctor.price_consultation_bgn} BGN
              </p>
              <p className="text-sm text-[#94A3B8]">
                ≈ €{(doctor.price_consultation_bgn / 1.95583).toFixed(2)}
              </p>
              <Button
                variant="primary"
                fullWidth
                size="lg"
                className="mt-4"
                onClick={() => navigate(`/book/${doctor.id}`)}
              >
                Book Appointment
              </Button>
              {doctor.accepted_insurers.length > 0 && (
                <div className="mt-3 pt-3 border-t border-[#E2E8F0]">
                  <p className="text-xs text-[#94A3B8] mb-1">Accepts insurance</p>
                  <p className="text-xs text-[#64748B]">{doctor.accepted_insurers.join(', ')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E2E8F0] mb-6 bg-white rounded-t-[12px] overflow-hidden">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-6 py-3 text-sm font-medium transition-all border-b-2 -mb-px ${
              activeTab === tab.key
                ? 'border-[#1A6BCC] text-[#1A6BCC]'
                : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'about' && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-[12px] border border-[#E2E8F0] p-6">
              <h2 className="font-semibold text-[#0F172A] mb-3">About</h2>
              <p className="text-[#64748B] leading-relaxed">{doctor.bio_en}</p>
            </div>

            <div className="bg-white rounded-[12px] border border-[#E2E8F0] p-6">
              <h2 className="font-semibold text-[#0F172A] mb-3 flex items-center gap-2">
                <GraduationCap size={18} className="text-[#1A6BCC]" />
                Education
              </h2>
              <ul className="space-y-2">
                {doctor.education.map((edu) => (
                  <li key={edu} className="text-sm text-[#64748B] flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1A6BCC] mt-1.5 flex-shrink-0" />
                    {edu}
                  </li>
                ))}
              </ul>
            </div>

            {doctor.certifications.length > 0 && (
              <div className="bg-white rounded-[12px] border border-[#E2E8F0] p-6">
                <h2 className="font-semibold text-[#0F172A] mb-3 flex items-center gap-2">
                  <Award size={18} className="text-[#0D9E6E]" />
                  Certifications
                </h2>
                <ul className="space-y-2">
                  {doctor.certifications.map((cert) => (
                    <li key={cert} className="text-sm text-[#64748B] flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0D9E6E] mt-1.5 flex-shrink-0" />
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Availability preview */}
          <div className="bg-white rounded-[12px] border border-[#E2E8F0] p-6">
            <h2 className="font-semibold text-[#0F172A] mb-4">Availability</h2>
            <AvailabilityCalendar doctorId={doctor.id} />
          </div>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="bg-white rounded-[12px] border border-[#E2E8F0] p-6 sticky top-24">
              <div className="text-center mb-4">
                <p className="text-4xl font-bold text-[#0F172A] tabular-nums">{doctor.rating_average.toFixed(1)}</p>
                <StarRating rating={doctor.rating_average} size="lg" />
                <p className="text-sm text-[#94A3B8] mt-1">{doctor.rating_count} reviews</p>
              </div>
              <div className="space-y-2">
                {ratingBreakdown.map(({ star, count, pct }) => (
                  <div key={star} className="flex items-center gap-2 text-sm">
                    <span className="text-[#64748B] w-4">{star}★</span>
                    <div className="flex-1 bg-[#F7F9FC] rounded-full h-2 overflow-hidden">
                      <div className="h-full bg-[#F59E0B] rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-[#94A3B8] w-6 text-right">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="md:col-span-2 space-y-4">
            {doctorReviews.length === 0 ? (
              <div className="text-center py-12 text-[#94A3B8]">No reviews yet</div>
            ) : (
              doctorReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'locations' && (
        <div className="space-y-4">
          {doctor.clinics.map((dc) => (
            <div key={dc.clinic_id} className="bg-white rounded-[12px] border border-[#E2E8F0] p-6">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <h3 className="font-semibold text-[#0F172A]">{dc.clinic.name}</h3>
                  <p className="text-sm text-[#64748B] flex items-center gap-1 mt-1">
                    <MapPin size={13} />{dc.clinic.address}
                  </p>
                  <p className="text-sm text-[#64748B] flex items-center gap-1 mt-0.5">
                    <Phone size={13} />{dc.clinic.phone}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-[#0F172A] tabular-nums">{dc.price_here_bgn} BGN</p>
                  <p className="text-xs text-[#94A3B8]">≈ €{(dc.price_here_bgn / 1.95583).toFixed(2)}</p>
                  {dc.accepts_nhif_here && <Badge variant="blue" size="sm" className="mt-1">NHIF</Badge>}
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-[#E2E8F0]">
                <p className="text-xs font-medium text-[#0F172A] mb-2 flex items-center gap-1">
                  <Clock size={13} />Opening Hours
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-1 text-xs text-[#64748B]">
                  {Object.entries(dc.clinic.opening_hours).map(([day, hours]) => (
                    <span key={day}><span className="font-medium capitalize">{day}:</span> {hours}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mobile sticky book button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#E2E8F0] md:hidden z-30">
        <Button
          variant="primary"
          fullWidth
          size="lg"
          onClick={() => navigate(`/book/${doctor.id}`)}
        >
          Book Appointment — {doctor.price_consultation_bgn} BGN
        </Button>
      </div>
    </div>
  )
}
