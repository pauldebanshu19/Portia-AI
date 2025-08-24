import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(request: Request) {
  try {
    // Check if Google API key is configured
    if (!process.env.GOOGLE_API_KEY) {
      return NextResponse.json(
        { error: 'Google Gemini API key not configured. Please add GOOGLE_API_KEY to your environment variables.' },
        { status: 500 }
      )
    }

    const { message, classNumber, subject, customTopic, doubt } = await request.json()

    const prompt = `The user has asked: "${message}".  

As a knowledgeable tutor specializing in class ${classNumber}, subject ${subject}, and topic '${customTopic}', please provide a clear and concise explanation that is appropriate for a student at this level.  

Use simple language, relevant examples, and step-by-step explanations to enhance understanding.`

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
    
    const result = await model.generateContent(prompt)
    const response = await result.response
    const aitext = response.text()

    return NextResponse.json({ reply: aitext })
  } catch (error) {
    console.error('Error generating content:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate response' },
      { status: 500 }
    )
  }
}

