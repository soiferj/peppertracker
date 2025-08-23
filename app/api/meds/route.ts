import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { createClient } from '@supabase/supabase-js'
import { format } from 'date-fns'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  const session = await getServerSession()
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const today = format(new Date(), 'yyyy-MM-dd')
  
  try {
    // Get today's medication record
    const { data, error } = await supabase
      .from('meds')
      .select('*')
      .eq('date', today)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
      throw error
    }

    // If no record exists for today, return default values
    if (!data) {
      return NextResponse.json({
        date: today,
        had_morning_meds: false,
        had_evening_meds: false
      })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching meds:', error)
    return NextResponse.json({ error: 'Failed to fetch medication data' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession()
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { medType } = await request.json()
    const today = format(new Date(), 'yyyy-MM-dd')
    
    if (medType !== 'morning' && medType !== 'evening') {
      return NextResponse.json({ error: 'Invalid medication type' }, { status: 400 })
    }

    // Check if record exists for today
    const { data: existingRecord } = await supabase
      .from('meds')
      .select('*')
      .eq('date', today)
      .single()

    const updateData = {
      date: today,
      had_morning_meds: existingRecord?.had_morning_meds || false,
      had_evening_meds: existingRecord?.had_evening_meds || false,
    }

    // Update the appropriate field
    if (medType === 'morning') {
      updateData.had_morning_meds = true
    } else {
      updateData.had_evening_meds = true
    }

    // Upsert the record (insert or update)
    const { data, error } = await supabase
      .from('meds')
      .upsert(updateData, { onConflict: 'date' })
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error updating meds:', error)
    return NextResponse.json({ error: 'Failed to update medication data' }, { status: 500 })
  }
}
