import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import OpenAI from 'https://deno.land/x/openai@v4.28.0/mod.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Triggered via Supabase webhook when review count >= 5 for a doctor
// Can also be called manually: POST /functions/v1/generate-ai-review-summary
// Body: { "doctor_id": "uuid" }

serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  }

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const { doctor_id } = await req.json()
  if (!doctor_id) {
    return new Response(JSON.stringify({ error: 'doctor_id is required' }), { status: 400, headers: corsHeaders })
  }

  const supabase = createClient(
    Deno.env.get('VITE_SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  // Fetch doctor info and reviews
  const [{ data: doctor }, { data: reviews }] = await Promise.all([
    supabase.from('doctors').select('name, specialty_id').eq('id', doctor_id).single(),
    supabase.from('reviews').select('rating, text').eq('doctor_id', doctor_id).order('created_at', { ascending: false }).limit(20),
  ])

  if (!doctor) {
    return new Response(JSON.stringify({ error: 'Doctor not found' }), { status: 404, headers: corsHeaders })
  }

  if (!reviews || reviews.length < 5) {
    return new Response(JSON.stringify({ message: 'Not enough reviews (need 5+)' }), { headers: corsHeaders })
  }

  const reviewTexts = reviews
    .filter(r => r.text)
    .map((r, i) => `Review ${i + 1} (${r.rating}/5): ${r.text}`)
    .join('\n')

  const openai = new OpenAI({ apiKey: Deno.env.get('VITE_OPENAI_API_KEY') })

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: 'You summarise patient reviews for a healthcare directory. Write a concise, neutral 2-3 sentence summary of what patients consistently say about this doctor. Focus on communication style, expertise, and waiting times if mentioned. Do not use patient names.',
      },
      {
        role: 'user',
        content: `Summarise these reviews for Dr. ${doctor.name}:\n\n${reviewTexts}`,
      },
    ],
    temperature: 0.4,
    max_tokens: 200,
  })

  const summary = completion.choices[0]?.message?.content?.trim()
  if (!summary) {
    return new Response(JSON.stringify({ error: 'No summary generated' }), { status: 500, headers: corsHeaders })
  }

  // Store summary on doctor record
  const { error } = await supabase
    .from('doctors')
    .update({ ai_review_summary: summary })
    .eq('id', doctor_id)

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders })
  }

  return new Response(JSON.stringify({ summary }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})
