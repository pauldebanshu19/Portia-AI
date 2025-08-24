import { useState, useCallback } from 'react'

interface UsePortiaAIProps {
  onError?: (error: string) => void
  onSuccess?: (data: any) => void
}

interface PortiaAIState {
  loading: boolean
  error: string | null
  data: any | null
}

export const usePortiaAI = ({ onError, onSuccess }: UsePortiaAIProps = {}) => {
  const [state, setState] = useState<PortiaAIState>({
    loading: false,
    error: null,
    data: null
  })

  const reset = useCallback(() => {
    setState({
      loading: false,
      error: null,
      data: null
    })
  }, [])

  const chat = useCallback(async (message: string, context?: string, model?: string, temperature?: number) => {
    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const response = await fetch('/api/v1/portia-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          context,
          model,
          temperature
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response from Portia AI')
      }

      setState(prev => ({ ...prev, loading: false, data }))
      onSuccess?.(data)
      return data
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      setState(prev => ({ ...prev, loading: false, error: errorMessage }))
      onError?.(errorMessage)
      throw error
    }
  }, [onError, onSuccess])

  const generateQuiz = useCallback(async (subject: string, topic: string, numQuestions: number = 5) => {
    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const response = await fetch('/api/v1/portia-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject,
          topic,
          numQuestions
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate quiz from Portia AI')
      }

      setState(prev => ({ ...prev, loading: false, data }))
      onSuccess?.(data)
      return data
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      setState(prev => ({ ...prev, loading: false, error: errorMessage }))
      onError?.(errorMessage)
      throw error
    }
  }, [onError, onSuccess])

  const resolveDoubt = useCallback(async (question: string, subject: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const response = await fetch('/api/v1/portia-doubt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          subject
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to resolve doubt with Portia AI')
      }

      setState(prev => ({ ...prev, loading: false, data }))
      onSuccess?.(data)
      return data
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      setState(prev => ({ ...prev, loading: false, error: errorMessage }))
      onError?.(errorMessage)
      throw error
    }
  }, [onError, onSuccess])

  const hybridChat = useCallback(async (message: string, aiProvider: 'portia' | 'gemini' = 'portia', context?: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const response = await fetch('/api/v1/hybrid-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          aiProvider,
          context
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Provide more specific error messages
        let errorMessage = data.error || 'Failed to get response'
        
        if (response.status === 503) {
          errorMessage = 'AI services are temporarily unavailable. Please try again later.'
        } else if (response.status === 400) {
          errorMessage = 'Invalid request. Please check your input.'
        } else if (response.status === 500) {
          errorMessage = 'Server error. Please try again later.'
        }
        
        throw new Error(errorMessage)
      }

      setState(prev => ({ ...prev, loading: false, data }))
      onSuccess?.(data)
      return data
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      setState(prev => ({ ...prev, loading: false, error: errorMessage }))
      onError?.(errorMessage)
      throw error
    }
  }, [onError, onSuccess])

  return {
    ...state,
    chat,
    generateQuiz,
    resolveDoubt,
    hybridChat,
    reset
  }
}
