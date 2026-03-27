import { MapPin, ExternalLink } from 'lucide-react'
import type { Clinic } from '@mediq/shared'

interface ClinicMapProps {
  clinic: Clinic
  height?: string
}

export default function ClinicMap({ clinic, height = '280px' }: ClinicMapProps) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.address + ', ' + clinic.city)}`
  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${clinic.lat},${clinic.lng}&zoom=15&size=600x300&markers=color:0x1A6BCC%7C${clinic.lat},${clinic.lng}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`

  const hasApiKey = !!import.meta.env.VITE_GOOGLE_MAPS_API_KEY && import.meta.env.VITE_GOOGLE_MAPS_API_KEY !== ''

  return (
    <div className="rounded-[12px] overflow-hidden border border-[#E2E8F0]" style={{ height }}>
      {hasApiKey ? (
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative group">
          <img
            src={staticMapUrl}
            alt={`Map showing ${clinic.name}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-lg px-3 py-1.5 text-sm font-medium text-[#0F172A] shadow-lg flex items-center gap-1.5">
              <ExternalLink size={14} />Open in Google Maps
            </span>
          </div>
        </a>
      ) : (
        <div className="w-full h-full bg-[#EEF2F8] flex flex-col items-center justify-center gap-3 p-6">
          <div className="w-12 h-12 bg-[#1A6BCC]/10 rounded-full flex items-center justify-center">
            <MapPin size={24} className="text-[#1A6BCC]" />
          </div>
          <div className="text-center">
            <p className="font-medium text-[#0F172A] text-sm">{clinic.name}</p>
            <p className="text-xs text-[#64748B] mt-0.5">{clinic.address}</p>
            <p className="text-xs text-[#64748B]">{clinic.city}</p>
          </div>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#1A6BCC] hover:underline flex items-center gap-1 mt-1"
          >
            <ExternalLink size={13} />Open in Google Maps
          </a>
        </div>
      )}
    </div>
  )
}
