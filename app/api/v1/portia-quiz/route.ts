import { NextResponse } from 'next/server'
import { portiaAI } from '@/lib/portia-ai'

export async function POST(request: Request) {
  try {
    const { subject, topic, numQuestions } = await request.json()

    if (!subject || !topic) {
      return NextResponse.json(
        { error: 'Subject and topic are required' }, 
        { status: 400 }
      )
    }

    const response = await portiaAI.generateQuiz(
      subject, 
      topic, 
      numQuestions || 5
    )

    return NextResponse.json(response)
  } catch (error) {
    console.error('Portia AI quiz generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate quiz from Portia AI' }, 
      { status: 500 }
    )
  }
}
