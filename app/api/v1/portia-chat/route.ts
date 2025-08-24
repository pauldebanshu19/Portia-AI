import { NextResponse } from 'next/server'
import { portiaAI } from '@/lib/portia-ai'

export async function POST(request: Request) {
  try {
    const { message, context, model, temperature } = await request.json()

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const response = await portiaAI.chat({
      message,
      context,
      model,
      temperature
    })

    return NextResponse.json(response)
  } catch (error) {
    console.error('Portia AI chat error:', error)
    return NextResponse.json(
      { error: 'Failed to generate response from Portia AI' }, 
      { status: 500 }
    )
  }
}
