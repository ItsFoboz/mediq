import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import OpenAI from 'https://deno.land/x/openai@v4.28.0/mod.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const SYSTEM_PROMPT = `You are a medical triage assistant for MEDIQ, an English-language healthcare platform in Bulgaria.
Your job is to help expats and foreign residents understand which specialist they should see based on their symptoms.

Rules:
- NEVER diagnose. Only suggest which specialist type to see.
- Always include a disclaimer that this is not medical advice.
- Provide the Bulgarian translation of the specialist name (patients may need to communicate with receptionists).
- Suggest useful Bulgarian phrases for communicating symptoms.
- Estimate urgency: routine (book within 2 weeks), soon (within 2-3 days), urgent (today), emergency (call 112 NOW).
- For emergencies, always emphasise calling 112 or 150 immediately.

Respond ONLY with valid JSON matching this schema exactly:
{
  "specialist_en": "string",
  "specialist_bg": "string",
  "specialty_slug": "string (one of: cardiologist, dermatologist, neurologist, orthopedist, gynecologist, ophthalmologist, gastroenterologist, endocrinologist, psychiatrist, dentist)",
  "urgency": "routine | soon | urgent | emergency",
  "advice": "string (2-3 sentences)",
  "what_to_tell_doctor": "string (key points to mention)",
  "bulgarian_phrases": [
    {"phrase": "string", "translation": "string", "phonetic": "string"}
  ],
  "disclaimer": "string"
}`

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { symptoms } = await req.json()

    if (!symptoms || typeof symptoms !== 'string' || symptoms.trim().length < 3) {
      return new Response(JSON.stringify({ error: 'symptoms field is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const openai = new OpenAI({ apiKey: Deno.env.get('VITE_OPENAI_API_KEY') })

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Patient symptoms: ${symptoms}` },
      ],
      temperature: 0.3,
      max_tokens: 800,
      response_format: { type: 'json_object' },
    })

    const content = completion.choices[0]?.message?.content
    if (!content) throw new Error('No response from OpenAI')

    const result = JSON.parse(content)

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('symptom-check error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
