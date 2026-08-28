import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { password } = await request.json()

    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Неверный пароль' },
        { status: 401 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка авторизации' },
      { status: 500 }
    )
  }
}