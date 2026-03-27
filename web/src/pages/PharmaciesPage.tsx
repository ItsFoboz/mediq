import PharmacyFinder from '@/components/maps/PharmacyFinder'

export default function PharmaciesPage() {
  return (
    <div style={{ background: 'var(--bg-base)' }} className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-serif font-bold text-[#0F172A] mb-2">Find a Pharmacy</h1>
        <p className="text-[#64748B] mb-6">Locate pharmacies (<em>аптека</em>) near you across Bulgaria. Filter by 24-hour availability.</p>
        <PharmacyFinder />
      </div>
    </div>
  )
}
