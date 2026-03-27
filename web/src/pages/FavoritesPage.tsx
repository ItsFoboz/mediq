import { Navigate, Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useSubscription } from '@/hooks/useSubscription'
import { doctors } from '@/data/doctors'
import DoctorCard from '@/components/doctor/DoctorCard'
import Button from '@/components/ui/Button'

// In production: saved favorites from Supabase
const MOCK_FAVORITE_IDS = ['doc-1', 'doc-5', 'doc-12']

export default function FavoritesPage() {
  const { user } = useAuthStore()
  const { isPro } = useSubscription()

  if (!user) return <Navigate to="/" replace />

  if (!isPro) return (
    <div style={{ background: 'var(--bg-base)' }} className="min-h-screen">
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <Heart size={40} className="text-[#CBD5E1] mx-auto mb-4" />
        <h1 className="text-2xl font-serif font-bold text-[#0F172A] mb-2">Favourite doctors</h1>
        <p className="text-[#64748B] mb-6">Save your favourite doctors for quick access. Available on MEDIQ Plus.</p>
        <Link to="/plus"><Button variant="primary">Upgrade to Plus</Button></Link>
      </div>
    </div>
  )

  const favorites = doctors.filter(d => MOCK_FAVORITE_IDS.includes(d.id))

  return (
    <div style={{ background: 'var(--bg-base)' }} className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-serif font-bold text-[#0F172A] mb-2">Favourite doctors</h1>
        <p className="text-sm text-[#64748B] mb-8">{favorites.length} saved doctor{favorites.length !== 1 ? 's' : ''}</p>

        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <Heart size={40} className="text-[#CBD5E1] mx-auto mb-4" />
            <p className="text-[#64748B]">No favourites yet. Tap the heart icon on any doctor card to save them.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favorites.map(d => <DoctorCard key={d.id} doctor={d} />)}
          </div>
        )}
      </div>
    </div>
  )
}
