import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

function checkPassword(password) {
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'
  return password === ADMIN_PASSWORD
}

// Добавление (POST)
export async function POST(request) {
  try {
    const body = await request.json()
    const { password, day_title, time, subject, type, teacher, room } = body

    if (!checkPassword(password)) {
      return NextResponse.json({ error: 'Неверный пароль' }, { status: 401 })
    }

    const { data, error } = await getSupabaseAdmin()
      .from('schedule')
      .insert([{ day_title, time, subject, type, teacher, room }])
      .select()

    if (error) throw error
    return NextResponse.json({ success: true, data })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// Редактирование (PUT)
export async function PUT(request) {
  try {
    const body = await request.json()
    const { password, id, day_title, time, subject, type, teacher, room } = body

    if (!checkPassword(password)) {
      return NextResponse.json({ error: 'Неверный пароль' }, { status: 401 })
    }

    const { data, error } = await getSupabaseAdmin()
      .from('schedule')
      .update({ day_title, time, subject, type, teacher, room })
      .eq('id', id)
      .select()

    if (error) throw error
    return NextResponse.json({ success: true, data })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// Удаление (DELETE)
export async function DELETE(request) {
  try {
    const body = await request.json()
    const { password, id } = body

    if (!checkPassword(password)) {
      return NextResponse.json({ error: 'Неверный пароль' }, { status: 401 })
    }

    const { error } = await getSupabaseAdmin()
      .from('schedule')
      .delete()
      .eq('id', id)

    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}