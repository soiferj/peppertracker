import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { createClient } from '@supabase/supabase-js'
import { format } from 'date-fns'
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Use Pacific Time as the consistent timezone
const TIMEZONE = 'America/Los_Angeles'

function getTodayInPacific(): string {
  const now = new Date()
  const pacificTime = utcToZonedTime(now, TIMEZONE)
  return format(pacificTime, 'yyyy-MM-dd')
}

export async function POST(request: NextRequest) {
  const session = await getServerSession()
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { medType } = await request.json()
    const today = getTodayInPacific()
    
    if (medType !== 'morning' && medType !== 'evening') {
      return NextResponse.json({ error: 'Invalid medication type' }, { status: 400 })
    }

    // Check if record exists for today
    const { data: existingRecord } = await supabase
      .from('meds')
      .select('*')
      .eq('date', today)
      .single()

    if (!existingRecord) {
      return NextResponse.json({ error: 'No medication record found for today' }, { status: 404 })
    }

    // Update the appropriate field to false (reset)
    const updateData: any = {}
    if (medType === 'morning') {
      updateData.had_morning_meds = false
    } else {
      updateData.had_evening_meds = false
    }

    const { data, error } = await supabase
      .from('meds')
      .update(updateData)
      .eq('date', today)
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error resetting meds:', error)
    return NextResponse.json({ error: 'Failed to reset medication data' }, { status: 500 })
  }
}
