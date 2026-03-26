import type { SymptomCheckResult } from '@mediq/shared'
import { isEmergencySymptom, EMERGENCY_NUMBERS } from '@mediq/shared'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? 'placeholder'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? 'placeholder'

/**
 * Returns true if both Supabase environment variables are real (non-placeholder) values.
 */
export function isSupabaseConfigured(): boolean {
  return (
    typeof supabaseUrl === 'string' &&
    supabaseUrl.length > 0 &&
    !supabaseUrl.includes('placeholder') &&
    typeof supabaseAnonKey === 'string' &&
    supabaseAnonKey.length > 0 &&
    !supabaseAnonKey.includes('placeholder')
  )
}

const MOCK_SYMPTOM_RESULT: SymptomCheckResult = {
  specialist_en: 'General Practitioner',
  specialist_bg: 'Общопрактикуващ лекар',
  specialty_slug: 'general-practice',
  urgency: 'routine',
  advice:
    'Based on your symptoms, we recommend scheduling an appointment with a general practitioner for a thorough evaluation. This is a demo response — connect your Supabase project for AI-powered results.',
  what_to_tell_doctor:
    'Describe the onset, duration, and severity of your symptoms. Mention any relevant medical history, current medications, and allergies.',
  bulgarian_phrases: [
    {
      phrase: 'Имам болка',
      translation: 'I have pain',
      phonetic: 'EE-mam BOL-ka',
    },
    {
      phrase: 'Кога трябва да дойда?',
      translation: 'When should I come?',
      phonetic: 'KO-ga TRYAB-va da DOY-da',
    },
    {
      phrase: 'Говорите ли английски?',
      translation: 'Do you speak English?',
      phonetic: 'go-VO-ri-te li an-GLIYS-ki',
    },
  ],
  disclaimer:
    'This information is for guidance only and does not constitute medical advice. Always consult a qualified healthcare professional.',
}

/**
 * Checks symptoms using either the Supabase Edge Function (when configured)
 * or a mock result for demo purposes.
 *
 * If the text describes emergency symptoms, returns an emergency result immediately
 * without making any API call.
 */
export async function checkSymptoms(text: string): Promise<SymptomCheckResult> {
  // Fast-path: detect emergency symptoms without any network call
  if (isEmergencySymptom(text)) {
    return {
      specialist_en: 'Emergency Services',
      specialist_bg: 'Спешна помощ',
      specialty_slug: 'emergency',
      urgency: 'emergency',
      advice: `This sounds like a medical emergency. Call ${EMERGENCY_NUMBERS.eu_emergency} (EU Emergency) or ${EMERGENCY_NUMBERS.bulgarian_ambulance} (Bulgarian Ambulance) immediately. Do not wait for an online appointment.`,
      what_to_tell_doctor:
        'State your emergency clearly. Give your exact location. Stay on the line and follow dispatcher instructions.',
      bulgarian_phrases: [
        {
          phrase: 'Имам спешност!',
          translation: 'I have an emergency!',
          phonetic: 'EE-mam SPESH-nost',
        },
        {
          phrase: 'Нуждая се от линейка',
          translation: 'I need an ambulance',
          phonetic: 'NUZH-da-ya se ot li-NEYK-a',
        },
        {
          phrase: 'Моят адрес е...',
          translation: 'My address is...',
          phonetic: 'MO-yat AD-res e',
        },
      ],
      disclaimer:
        'In a life-threatening emergency always call emergency services first. This tool is not a substitute for emergency care.',
    }
  }

  if (!isSupabaseConfigured()) {
    // Return a mock result with a small delay to simulate network latency in demo mode
    await new Promise((resolve) => setTimeout(resolve, 600))
    return MOCK_SYMPTOM_RESULT
  }

  const response = await fetch(`${supabaseUrl}/functions/v1/symptom-check`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${supabaseAnonKey}`,
    },
    body: JSON.stringify({ text }),
  })

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error')
    throw new Error(`Symptom check failed (${response.status}): ${errorText}`)
  }

  const data = (await response.json()) as SymptomCheckResult
  return data
}

/**
 * Generates an AI summary of a set of patient reviews using either the
 * Supabase Edge Function (when configured) or a mock result for demo purposes.
 */
export async function generateReviewSummary(reviews: string[]): Promise<string> {
  if (reviews.length === 0) {
    return 'No reviews available to summarise.'
  }

  if (!isSupabaseConfigured()) {
    await new Promise((resolve) => setTimeout(resolve, 400))
    return `Patients consistently highlight the doctor's professionalism, clear communication, and thoroughness. Many appreciate that consultations are conducted in English, making it easier to discuss complex medical concerns. (Demo summary — connect Supabase for AI-generated summaries.)`
  }

  const response = await fetch(`${supabaseUrl}/functions/v1/review-summary`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${supabaseAnonKey}`,
    },
    body: JSON.stringify({ reviews }),
  })

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error')
    throw new Error(`Review summary failed (${response.status}): ${errorText}`)
  }

  const data = (await response.json()) as { summary: string }
  return data.summary
}
