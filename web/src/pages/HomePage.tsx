import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Users, MapPin, CheckCircle, Shield,
  Stethoscope, Heart, Scan, Baby, Baby2, Brain,
  Smile, Bone, Activity, Ear,
  Search, Star, Calendar, ArrowRight,
  Building2, Quote
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { StarRating } from '@/components/ui/StarRating'
import { doctors } from '@/data/doctors'
import { specialties } from '@/data/specialties'
import { cities } from '@/data/cities'

// ─── Inline SearchBar for hero ─────────────────────────────────────────────

const HeroSearch: React.FC = () => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate(`/doctors${query ? `?q=${encodeURIComponent(query)}` : ''}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-2xl mx-auto">
      <div className="flex flex-1 items-center bg-white rounded-l-xl border-2 border-r-0 border-[#E2E8F0] px-4 gap-3 focus-within:border-[#1A6BCC] transition-colors">
        <Search className="text-[#94A3B8] flex-shrink-0" size={20} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Doctor name, specialty, or symptom..."
          className="flex-1 py-4 text-base text-[#0F172A] placeholder-[#94A3B8] outline-none bg-transparent"
        />
      </div>
      <Button type="submit" size="lg" className="rounded-l-none rounded-r-xl px-8">
        Search
      </Button>
    </form>
  )
}

// ─── Specialty pill map ─────────────────────────────────────────────────────

const specialtyPills = [
  { label: 'GP', value: 'general-practitioner' },
  { label: 'Dentist', value: 'dentist' },
  { label: 'Gynecologist', value: 'gynecologist' },
  { label: 'Cardiologist', value: 'cardiologist' },
  { label: 'Dermatologist', value: 'dermatologist' },
  { label: 'Pediatrician', value: 'pediatrician' },
  { label: 'Neurologist', value: 'neurologist' },
  { label: 'Orthopedist', value: 'orthopedist' },
]

const iconMap: Record<string, React.FC<{ size?: number; className?: string }>> = {
  Stethoscope, Heart, Scan, Baby, Baby2, Brain, Smile, Bone, Activity, Ear,
}

// ─── Testimonials ───────────────────────────────────────────────────────────

const testimonials = [
  {
    text: 'Finding a doctor who speaks English in Sofia used to be a nightmare. MEDIQ changed that completely.',
    author: 'James',
    origin: 'British expat in Sofia',
    rating: 5,
  },
  {
    text: 'I was nervous about using my EHIC card. The guide on MEDIQ explained everything perfectly.',
    author: 'Anna',
    origin: 'German expat in Plovdiv',
    rating: 5,
  },
  {
    text: 'Booked my first GP appointment in Bulgaria in 5 minutes. The doctor was wonderful.',
    author: 'Marie',
    origin: 'French expat in Varna',
    rating: 5,
  },
]

// ─── Guide preview articles ─────────────────────────────────────────────────

const guidePreview = [
  {
    slug: 'healthcare-system',
    title: 'How the Bulgarian Healthcare System Works',
    excerpt: 'A clear overview of how public and private healthcare is structured in Bulgaria, and where expats fit in.',
    category: 'System',
    reading_time_minutes: 8,
  },
  {
    slug: 'nhif',
    title: 'Understanding NHIF: Bulgaria\'s National Health Insurance',
    excerpt: 'Everything you need to know about registering with NHIF, what it covers, and how to use it as an expat.',
    category: 'Insurance',
    reading_time_minutes: 10,
  },
  {
    slug: 'ehic',
    title: 'Using Your EHIC Card in Bulgaria',
    excerpt: 'How to use your European Health Insurance Card in Bulgaria and what it actually covers for EU citizens.',
    category: 'Insurance',
    reading_time_minutes: 5,
  },
]

// ─── City data ──────────────────────────────────────────────────────────────

const featuredCities = [
  { name: 'Sofia', slug: 'sofia', doctors: 10, emoji: '🏙️', description: 'Capital city, largest selection' },
  { name: 'Plovdiv', slug: 'plovdiv', doctors: 4, emoji: '🏛️', description: 'Bulgaria\'s second city' },
  { name: 'Varna', slug: 'varna', doctors: 3, emoji: '🌊', description: 'Black Sea coast capital' },
  { name: 'Burgas', slug: 'burgas', doctors: 2, emoji: '⛵', description: 'Southern Black Sea port' },
  { name: 'Veliko Tarnovo', slug: 'veliko-tarnovo', doctors: 1, emoji: '🏰', description: 'Historic medieval capital' },
]

// ─── Inline DoctorCard (compact) ────────────────────────────────────────────

const CompactDoctorCard: React.FC<{ doctor: (typeof doctors)[0] }> = ({ doctor }) => (
  <Link
    to={`/doctors/${doctor.slug}`}
    className="flex items-start gap-4 p-4 bg-white rounded-xl border border-[#E2E8F0] hover:border-[#1A6BCC]/40 hover:shadow-md transition-all"
  >
    <img
      src={doctor.photo_url}
      alt={doctor.name}
      className="w-14 h-14 rounded-full object-cover flex-shrink-0"
    />
    <div className="flex-1 min-w-0">
      <p className="font-semibold text-[#0F172A] truncate">{doctor.name}</p>
      <p className="text-sm text-[#64748B] truncate">{doctor.specialty.name_en}</p>
      <div className="flex items-center gap-2 mt-1">
        <StarRating rating={doctor.rating_average} size="sm" showCount count={doctor.rating_count} />
      </div>
      <div className="flex items-center gap-2 mt-1">
        <MapPin size={12} className="text-[#94A3B8]" />
        <span className="text-xs text-[#64748B]">{doctor.city}</span>
        {doctor.accepts_nhif && <Badge variant="green" size="sm">NHIF</Badge>}
      </div>
    </div>
  </Link>
)

// ─── Main Component ──────────────────────────────────────────────────────────

const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const topDoctors = [...doctors].sort((a, b) => b.rating_average - a.rating_average).slice(0, 6)

  return (
    <div className="min-h-screen bg-[#F7F9FC]">

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #EEF5FF 0%, #F7F9FC 100%)' }}
      >
        <div className="max-w-6xl mx-auto px-4 pt-20 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="blue" className="mb-6">
              Healthcare in Bulgaria, in English
            </Badge>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-[#0F172A] leading-tight mb-6 max-w-4xl mx-auto">
              Find a doctor in Bulgaria who speaks your language
            </h1>
            <p className="text-lg md:text-xl text-[#64748B] mb-10 max-w-2xl mx-auto leading-relaxed">
              Book appointments online with English-speaking specialists across Bulgaria.
              No Bulgarian required.
            </p>

            <HeroSearch />

            {/* Specialty pills */}
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {specialtyPills.map((pill) => (
                <button
                  key={pill.value}
                  onClick={() => navigate(`/doctors?specialty=${pill.value}`)}
                  className="px-4 py-2 bg-white border border-[#E2E8F0] rounded-full text-sm font-medium text-[#0F172A] hover:border-[#1A6BCC] hover:text-[#1A6BCC] hover:bg-[#EEF5FF] transition-all"
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <section className="bg-white border-y border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Users, label: '1,500+ English-speaking doctors' },
              { icon: MapPin, label: 'All major Bulgarian cities' },
              { icon: CheckCircle, label: 'Free to use' },
              { icon: Shield, label: 'GDPR compliant' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#EEF5FF] flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-[#1A6BCC]" />
                </div>
                <span className="text-sm font-medium text-[#0F172A]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular Specialties Grid ── */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl md:text-4xl text-[#0F172A] mb-3">Browse by Specialty</h2>
          <p className="text-[#64748B]">Find the right specialist for your needs</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {specialties.map((specialty) => {
            const IconComp = iconMap[specialty.icon_name] || Stethoscope
            return (
              <Link
                key={specialty.slug}
                to={`/specialties/${specialty.slug}`}
                className="group p-5 bg-white rounded-xl border border-[#E2E8F0] hover:border-[#1A6BCC]/40 hover:shadow-md transition-all text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-[#EEF5FF] flex items-center justify-center mb-3 group-hover:bg-[#1A6BCC] transition-colors">
                  <IconComp size={18} className="text-[#1A6BCC] group-hover:text-white transition-colors" />
                </div>
                <p className="font-semibold text-[#0F172A] text-sm">{specialty.name_en}</p>
                <p className="text-xs text-[#94A3B8] mb-1">{specialty.name_bg}</p>
                <p className="text-xs text-[#64748B] line-clamp-2 mb-2">
                  {specialty.description_en.split('.')[0]}.
                </p>
                <span className="text-xs font-medium text-[#1A6BCC]">
                  {specialty.doctor_count} doctor{specialty.doctor_count !== 1 ? 's' : ''}
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ── Top-Rated Doctors ── */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-[#0F172A] mb-2">Top-Rated English-Speaking Doctors</h2>
              <p className="text-[#64748B]">Verified specialists with the highest patient ratings</p>
            </div>
            <Link to="/doctors" className="hidden md:flex items-center gap-1 text-[#1A6BCC] font-medium hover:underline">
              View all <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topDoctors.map((doctor) => (
              <CompactDoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
          <div className="mt-6 text-center md:hidden">
            <Link to="/doctors">
              <Button variant="secondary" size="md" rightIcon={<ArrowRight size={16} />}>
                View all doctors
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-[#0F172A] mb-3">Book an appointment in 3 simple steps</h2>
          <p className="text-[#64748B]">Getting healthcare in Bulgaria has never been easier</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: '1',
              icon: Search,
              title: 'Search',
              description: 'Find doctors by specialty, city, or by name. Filter by NHIF, insurer, and more.',
            },
            {
              step: '2',
              icon: Star,
              title: 'Read Reviews',
              description: 'Check ratings and reviews from verified patients to find the right fit for you.',
            },
            {
              step: '3',
              icon: Calendar,
              title: 'Book Online',
              description: 'Pick a time slot and confirm your appointment in seconds. Get reminders by SMS.',
            },
          ].map(({ step, icon: Icon, title, description }) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: parseInt(step) * 0.15 }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative mb-5">
                <div className="w-16 h-16 rounded-full bg-[#1A6BCC] flex items-center justify-center">
                  <Icon size={24} className="text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#0D9E6E] flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{step}</span>
                </div>
              </div>
              <h3 className="font-semibold text-xl text-[#0F172A] mb-2">{title}</h3>
              <p className="text-[#64748B] leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Top Cities ── */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl text-[#0F172A] mb-3">Find Doctors Near You</h2>
            <p className="text-[#64748B]">English-speaking healthcare across Bulgaria</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {featuredCities.map((city) => (
              <Link
                key={city.slug}
                to={`/cities/${city.slug}`}
                className="group p-5 bg-[#F7F9FC] rounded-xl border border-[#E2E8F0] hover:border-[#1A6BCC]/40 hover:bg-[#EEF5FF] transition-all text-center"
              >
                <div className="text-3xl mb-3">{city.emoji}</div>
                <p className="font-semibold text-[#0F172A] mb-1">{city.name}</p>
                <p className="text-xs text-[#64748B] mb-2">{city.description}</p>
                <Badge variant="blue" size="sm">{city.doctors} doctors</Badge>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Guide Preview ── */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl md:text-4xl text-[#0F172A] mb-3">The MEDIQ Expat Healthcare Guide</h2>
          <p className="text-[#64748B] max-w-xl mx-auto">
            Everything you need to know about healthcare in Bulgaria, in plain English.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guidePreview.map((article) => (
            <Link
              key={article.slug}
              to={`/guide/${article.slug}`}
              className="group p-6 bg-white rounded-xl border border-[#E2E8F0] hover:border-[#1A6BCC]/40 hover:shadow-md transition-all"
            >
              <Badge variant="blue" size="sm" className="mb-3">{article.category}</Badge>
              <h3 className="font-semibold text-[#0F172A] mb-2 group-hover:text-[#1A6BCC] transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-[#64748B] line-clamp-3 mb-3">{article.excerpt}</p>
              <span className="text-xs text-[#94A3B8]">{article.reading_time_minutes} min read</span>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/guide" className="inline-flex items-center gap-1 text-[#1A6BCC] font-medium hover:underline">
            View All Guides <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl text-[#0F172A] mb-3">Trusted by expats across Bulgaria</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <motion.div
                key={t.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 bg-[#F7F9FC] rounded-xl border border-[#E2E8F0]"
              >
                <Quote size={24} className="text-[#1A6BCC]/30 mb-4" />
                <p className="text-[#0F172A] leading-relaxed mb-4 italic">"{t.text}"</p>
                <StarRating rating={t.rating} size="sm" className="mb-3" />
                <div>
                  <p className="font-semibold text-[#0F172A] text-sm">{t.author}</p>
                  <p className="text-xs text-[#64748B]">{t.origin}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── For Doctors CTA ── */}
      <section className="py-16" style={{ background: '#0F172A' }}>
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Building2 size={20} className="text-[#1A6BCC]" />
              <p className="text-[#94A3B8] text-sm font-medium uppercase tracking-wide">For Healthcare Providers</p>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl text-white mb-2">Are you a healthcare provider?</h2>
            <p className="text-[#94A3B8]">Join MEDIQ to connect with English-speaking patients across Bulgaria.</p>
          </div>
          <Link to="/for-doctors">
            <Button variant="outline" size="lg" className="whitespace-nowrap border-white text-white hover:bg-white hover:text-[#0F172A]">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

    </div>
  )
}

export default HomePage
