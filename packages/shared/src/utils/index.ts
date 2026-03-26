import { BGN_TO_EUR, EMERGENCY_KEYWORDS } from '../constants';

// ─────────────────────────────────────────────────────────────
// Currency
// ─────────────────────────────────────────────────────────────

/** Convert BGN to EUR using the fixed ERM II rate */
export function bgnToEur(bgn: number): number {
  return bgn / BGN_TO_EUR;
}

/** Format a BGN price with EUR equivalent: "80 BGN / €40.90" */
export function formatPrice(bgn: number): string {
  const eur = bgnToEur(bgn).toFixed(2);
  return `${bgn} BGN / €${eur}`;
}

/** Format just the EUR amount: "€40.90" */
export function formatEur(bgn: number): string {
  return `€${bgnToEur(bgn).toFixed(2)}`;
}

// ─────────────────────────────────────────────────────────────
// Strings
// ─────────────────────────────────────────────────────────────

/** Convert a string to a URL-safe slug */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/** Get initials from a full name: "Dr. Ivan Petrov" → "IP" */
export function getInitials(name: string): string {
  return name
    .replace(/^(Dr\.|Prof\.|Assoc\.)\s*/i, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('');
}

// ─────────────────────────────────────────────────────────────
// Dates
// ─────────────────────────────────────────────────────────────

/** Format ISO date to readable: "Wed, 26 Mar 2026" */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/** Format ISO date to time: "14:30" */
export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

/** Format ISO date to relative: "3 months ago", "2 days ago" */
export function formatRelativeDate(iso: string): string {
  const now = new Date();
  const date = new Date(iso);
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

// ─────────────────────────────────────────────────────────────
// Emergency detection
// ─────────────────────────────────────────────────────────────

/** Check if symptom text contains emergency keywords */
export function isEmergencySymptom(text: string): boolean {
  const lower = text.toLowerCase();
  return EMERGENCY_KEYWORDS.some((keyword) => lower.includes(keyword));
}

// ─────────────────────────────────────────────────────────────
// Availability slots
// ─────────────────────────────────────────────────────────────

/**
 * Generate available time slots for a given date.
 * Returns an array of ISO strings for each slot.
 * Simulates a typical Bulgarian doctor schedule: 09:00–17:00 in 30min increments.
 * Randomly marks ~30% of slots as taken for demo purposes.
 */
export function generateAvailableSlots(
  date: Date,
  durationMins = 30,
  startHour = 9,
  endHour = 17,
): Array<{ time: string; available: boolean; type: 'available' | 'nhif' | 'video' }> {
  const slots: Array<{ time: string; available: boolean; type: 'available' | 'nhif' | 'video' }> = [];
  const d = new Date(date);
  d.setHours(startHour, 0, 0, 0);

  const end = new Date(date);
  end.setHours(endHour, 0, 0, 0);

  // Use date as deterministic seed for demo consistency
  const seed = d.getDate() + d.getMonth() * 31;

  let i = 0;
  while (d < end) {
    const taken = ((seed + i * 7) % 10) < 3; // ~30% taken
    const typeIdx = (seed + i * 3) % 10;
    const type = typeIdx < 7 ? 'available' : typeIdx < 9 ? 'nhif' : 'video';

    slots.push({
      time: d.toISOString(),
      available: !taken,
      type: taken ? 'available' : type,
    });

    d.setMinutes(d.getMinutes() + durationMins);
    i++;
  }

  return slots;
}

// ─────────────────────────────────────────────────────────────
// Ratings
// ─────────────────────────────────────────────────────────────

/** Format rating to one decimal: 4.8 */
export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

/** Get star fill percentage for display (0–100) */
export function starFillPercent(rating: number, starIndex: number): number {
  const fill = rating - starIndex;
  if (fill >= 1) return 100;
  if (fill <= 0) return 0;
  return Math.round(fill * 100);
}
