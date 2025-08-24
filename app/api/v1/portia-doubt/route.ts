import { NextResponse } from 'next/server'
import { portiaAI } from '@/lib/portia-ai'

export async function POST(request: Request) {
  try {
    const { question, subject } = await request.json()

    if (!question || !subject) {
      return NextResponse.json(
        { error: 'Question and subject are required' }, 
        { status: 400 }
      )
    }

    const response = await portiaAI.resolveDoubt(question, subject)

    return NextResponse.json(response)
  } catch (error) {
    console.error('Portia AI doubt resolution error:', error)
    return NextResponse.json(
      { error: 'Failed to resolve doubt with Portia AI' }, 
      { status: 500 }
    )
  }
}
