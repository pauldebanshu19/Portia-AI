# Portia AI Integration Setup

This document explains how to set up and use Portia AI integration in the Homiey application.

## 🚀 Features Added

- **Portia AI Chat**: Enhanced conversational AI with better context understanding
- **Portia AI Quiz Generation**: Generate educational quizzes with improved accuracy
- **Portia AI Doubt Resolution**: Get detailed explanations for academic questions
- **Hybrid AI System**: Fallback to Google Gemini if Portia AI is unavailable
- **Confidence Scoring**: See AI confidence levels for responses
- **Source Attribution**: Get sources for AI responses when available

## 🔧 Environment Variables

Add these environment variables to your `.env.local` file:

```bash
# Portia AI Configuration
PORTIA_AI_API_KEY=your_portia_ai_api_key_here
PORTIA_AI_BASE_URL=https://api.portia.ai/v1

# Existing Google Gemini (for fallback)
GOOGLE_API_KEY=your_google_api_key_here
```

## 📋 API Endpoints

### 1. Portia AI Chat
- **Endpoint**: `/api/v1/portia-chat`
- **Method**: POST
- **Body**: 
  ```json
  {
    "message": "Your question here",
    "context": "Optional context",
    "model": "portia-1",
    "temperature": 0.7
  }
  ```

### 2. Portia AI Quiz Generation
- **Endpoint**: `/api/v1/portia-quiz`
- **Method**: POST
- **Body**:
  ```json
  {
    "subject": "Mathematics",
    "topic": "Algebra",
    "numQuestions": 5
  }
  ```

### 3. Portia AI Doubt Resolution
- **Endpoint**: `/api/v1/portia-doubt`
- **Method**: POST
- **Body**:
  ```json
  {
    "question": "What is the quadratic formula?",
    "subject": "Mathematics"
  }
  ```

### 4. Hybrid Chat (Portia AI + Gemini Fallback)
- **Endpoint**: `/api/v1/hybrid-chat`
- **Method**: POST
- **Body**:
  ```json
  {
    "message": "Your question here",
    "aiProvider": "portia",
    "context": "Optional context"
  }
  ```

## 🎯 Usage Examples

### Using the React Hook

```typescript
import { usePortiaAI } from '@/hooks/usePortiaAI';

function MyComponent() {
  const { chat, generateQuiz, resolveDoubt, loading, error, data } = usePortiaAI();

  const handleChat = async () => {
    try {
      const response = await chat("Explain quantum physics", "Physics context");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuiz = async () => {
    try {
      const quiz = await generateQuiz("Physics", "Mechanics", 10);
      console.log(quiz);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handleChat} disabled={loading}>
        {loading ? 'Thinking...' : 'Ask Portia AI'}
      </button>
      {error && <p>Error: {error}</p>}
      {data && <p>Response: {data.response}</p>}
    </div>
  );
}
```

### Using the Demo Component

The `PortiaAIDemo` component is already integrated into the main page and provides:

- Toggle between Portia AI and Google Gemini
- Chat interface with real-time responses
- Quiz generation with subject and topic inputs
- Doubt resolution with subject-specific answers
- Confidence scoring display
- Source attribution when available

## 🔄 Fallback System

The hybrid system automatically falls back to Google Gemini if:

1. Portia AI API key is not configured
2. Portia AI service is unavailable
3. Rate limits are exceeded
4. Any other Portia AI errors occur

## 📊 Response Format

Portia AI responses include additional metadata:

```json
{
  "response": "The AI response text",
  "confidence": 0.95,
  "sources": ["source1.com", "source2.com"],
  "metadata": {
    "model": "portia-1",
    "tokens_used": 150,
    "processing_time": 1.2
  },
  "aiProvider": "portia"
}
```

## 🛠️ Customization

### Adding New Portia AI Models

Edit `lib/portia-ai.ts` to add support for different Portia AI models:

```typescript
async chat(request: PortiaAIRequest): Promise<PortiaAIResponse> {
  // Add model selection logic
  const model = request.model || 'portia-1';
  // ... rest of implementation
}
```

### Custom Prompts

Modify the prompt templates in the service methods:

```typescript
async generateQuiz(subject: string, topic: string, numQuestions: number = 5): Promise<any> {
  const prompt = `Your custom prompt for ${subject} ${topic}`;
  // ... implementation
}
```

## 🔒 Security Considerations

1. **API Key Protection**: Never expose API keys in client-side code
2. **Rate Limiting**: Implement rate limiting for API endpoints
3. **Input Validation**: Validate all user inputs before sending to Portia AI
4. **Error Handling**: Handle API errors gracefully without exposing sensitive information

## 📈 Performance Optimization

1. **Caching**: Cache frequently requested responses
2. **Streaming**: Implement streaming responses for long conversations
3. **Batch Processing**: Batch multiple requests when possible
4. **Connection Pooling**: Reuse HTTP connections for better performance

## 🐛 Troubleshooting

### Common Issues

1. **API Key Not Found**: Ensure `PORTIA_AI_API_KEY` is set in environment variables
2. **Network Errors**: Check internet connection and Portia AI service status
3. **Rate Limiting**: Implement exponential backoff for retries
4. **JSON Parsing Errors**: Validate AI responses before parsing

### Debug Mode

Enable debug logging by setting:

```bash
DEBUG=portia-ai:*
```

## 📚 Additional Resources

- [Portia AI Documentation](https://docs.portia.ai)
- [API Reference](https://api.portia.ai/docs)
- [Best Practices](https://portia.ai/best-practices)

## 🤝 Contributing

To contribute to the Portia AI integration:

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Update documentation
5. Submit a pull request

---

**Note**: This integration requires a valid Portia AI API key. Contact Portia AI support for access and pricing information.
