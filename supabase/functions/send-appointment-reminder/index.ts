import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// This function is invoked by a pg_cron job at 08:00 EET daily
// or via an HTTP request from Supabase's cron scheduler

serve(async (_req) => {
  const supabase = createClient(
    Deno.env.get('VITE_SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  const in48h = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString()
  const now = new Date().toISOString()

  // Find appointments in the next 48 hours that haven't had a reminder sent
  const { data: appointments, error } = await supabase
    .from('appointments')
    .select(`
      id,
      scheduled_at,
      users (full_name, email, phone),
      doctors (name),
      clinics (name, address)
    `)
    .eq('status', 'confirmed')
    .eq('reminder_sent', false)
    .gte('scheduled_at', now)
    .lte('scheduled_at', in48h)

  if (error) {
    console.error('Failed to fetch appointments:', error)
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }

  const results = { sent: 0, failed: 0 }

  for (const apt of appointments ?? []) {
    const user = apt.users as { full_name: string; email: string; phone?: string }
    const doctor = apt.doctors as { name: string }
    const clinic = apt.clinics as { name: string; address: string } | null

    const scheduledDate = new Date(apt.scheduled_at).toLocaleString('en-GB', {
      timeZone: 'Europe/Sofia',
      dateStyle: 'full',
      timeStyle: 'short',
    })

    const message = `MEDIQ Reminder: You have an appointment with ${doctor.name} on ${scheduledDate}${clinic ? ` at ${clinic.name}, ${clinic.address}` : ''}. Reply STOP to unsubscribe.`

    // Send SMS via Twilio if phone number is present
    if (user.phone) {
      try {
        const twilioSid = Deno.env.get('TWILIO_ACCOUNT_SID')
        const twilioToken = Deno.env.get('TWILIO_AUTH_TOKEN')
        const twilioFrom = Deno.env.get('TWILIO_PHONE_NUMBER') ?? '+15005550006'

        const response = await fetch(
          `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Basic ${btoa(`${twilioSid}:${twilioToken}`)}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ To: user.phone, From: twilioFrom, Body: message }),
          }
        )

        if (!response.ok) {
          throw new Error(`Twilio error: ${response.status}`)
        }

        results.sent++
      } catch (err) {
        console.error(`Failed to send SMS to ${apt.id}:`, err)
        results.failed++
        continue
      }
    }

    // Mark reminder as sent
    await supabase
      .from('appointments')
      .update({ reminder_sent: true })
      .eq('id', apt.id)
  }

  console.log(`Reminders: ${results.sent} sent, ${results.failed} failed`)
  return new Response(JSON.stringify(results), {
    headers: { 'Content-Type': 'application/json' },
  })
})
