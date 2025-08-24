import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { portiaAI } from '@/lib/portia-ai'

function requireEnv(key: string) {
  const value = process.env[key]
  if (!value) throw new Error(`${key} not configured`)
  return value
}

export async function POST(request: Request) {
  try {
    const { message, aiProvider = 'portia', context, model, temperature } = await request.json()

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    let response: string
    let usedProvider = aiProvider

    // Initialize Google AI only when needed
    let genAI: any = null

    if (aiProvider === 'portia') {
      try {
        requireEnv('PORTIA_AI_API_KEY')
        const portiaResponse = await portiaAI.chat({ message, context, model, temperature })
        response = typeof portiaResponse === "string" ? portiaResponse : portiaResponse.response
        usedProvider = 'portia'
      } catch (portiaError) {
        console.error('Portia AI failed, falling back to Gemini:', (portiaError as Error).message)

        try {
          genAI = new GoogleGenerativeAI(requireEnv('GOOGLE_API_KEY'))
          const geminiModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
          const result = await geminiModel.generateContent(message)
          response = result.response.text()
          usedProvider = 'gemini'
        } catch (geminiError) {
          console.error('Both Portia AI and Gemini failed:', (geminiError as Error).message)
          return NextResponse.json(
            { error: 'Both AI services are unavailable. Please check your API keys.' },
            { status: 503 }
          )
        }
      }
    } else {
      try {
        genAI = new GoogleGenerativeAI(requireEnv('GOOGLE_API_KEY'))
        const geminiModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
        const result = await geminiModel.generateContent(message)
        response = result.response.text()
        usedProvider = 'gemini'
      } catch (geminiError) {
        console.error('Gemini failed:', (geminiError as Error).message)
        return NextResponse.json(
          { error: 'Google Gemini service is unavailable. Please check your API key.' },
          { status: 503 }
        )
      }
    }

    return NextResponse.json({ response, aiProvider: usedProvider })
  } catch (error) {
    console.error('Hybrid chat error:', (error as Error).message)
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 })
  }
}
