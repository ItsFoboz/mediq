import { useAuthStore } from '@/store/authStore'
import { FREE_PLAN_MAX_APPOINTMENTS, FREE_PLAN_SYMPTOM_CHECKS_PER_DAY, PLUS_PLAN_MAX_APPOINTMENTS } from '@mediq/shared'

const SYMPTOM_CHECKER_STORAGE_KEY = 'mediq_symptom_checks'

function getSymptomCheckerUsesToday(): number {
  try {
    const stored = localStorage.getItem(SYMPTOM_CHECKER_STORAGE_KEY)
    if (!stored) return 0
    const { date, count } = JSON.parse(stored)
    const today = new Date().toDateString()
    if (date !== today) return 0
    return count as number
  } catch {
    return 0
  }
}

export function incrementSymptomCheckerUse() {
  try {
    const today = new Date().toDateString()
    const current = getSymptomCheckerUsesToday()
    localStorage.setItem(SYMPTOM_CHECKER_STORAGE_KEY, JSON.stringify({ date: today, count: current + 1 }))
  } catch {
    // ignore
  }
}

export function useSubscription() {
  const { user } = useAuthStore()

  const tier = user?.subscription_tier ?? 'free'
  const isPro = tier === 'plus'

  const symptomCheckerUsesToday = getSymptomCheckerUsesToday()
  const symptomCheckerUsesLeft = isPro
    ? Infinity
    : Math.max(0, FREE_PLAN_SYMPTOM_CHECKS_PER_DAY - symptomCheckerUsesToday)

  return {
    tier,
    isPro,
    maxAppointments: isPro ? PLUS_PLAN_MAX_APPOINTMENTS : FREE_PLAN_MAX_APPOINTMENTS,
    canFavorite: isPro,
    canUseSymptomChecker: isPro || symptomCheckerUsesLeft > 0,
    symptomCheckerUsesLeft,
    canAccessWaitingList: isPro,
    canViewAiSummary: isPro,
  }
}
