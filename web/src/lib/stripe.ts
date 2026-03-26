import { loadStripe } from '@stripe/stripe-js'

export const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLIC_KEY ?? 'pk_test_placeholder'
)

export async function redirectToCheckout(priceId: string, userId: string) {
  const stripe = await stripePromise
  if (!stripe) throw new Error('Stripe failed to load')

  // In production, create checkout session via Supabase Edge Function
  // For demo, show a toast message
  console.log('Would redirect to Stripe checkout for price:', priceId, 'user:', userId)
}
