# Portia AI

<!-- ![Portia AI Banner](https://your-image-url.com) -->

## 🚀 Overview
Portia AI is a cutting-edge educational AI platform that combines advanced natural language processing with specialized educational tools. It offers a comprehensive suite of features for students and educators, including intelligent doubt resolution, personalized quiz generation, and smart document analysis. The platform uniquely integrates with Google Gemini AI as a fallback system, ensuring reliable service availability.

## ✨ Features

### Core AI Capabilities
- **Enhanced Conversational AI**: Context-aware responses with high accuracy
- **Hybrid AI System**: Seamless fallback to Google Gemini when needed
- **Confidence Scoring**: Transparent AI confidence levels for all responses
- **Source Attribution**: Referenced sources for validated information

### Educational Tools
- **Intelligent Doubt Resolution**: 
  - Instant, detailed explanations for academic queries
  - Subject-specific knowledge base
  - Step-by-step problem solving
  
- **Advanced Quiz Generation**:
  - Customizable difficulty levels
  - Topic-focused question sets
  - Multiple question formats
  - Real-time performance tracking

- **Smart Document Analysis**:
  - PDF upload and analysis
  - Intelligent summarization
  - Key concept extraction
  - Comprehensive feedback generation

- **Custom Paper Generation**:
  - Personalized question papers
  - Multiple subject support
  - Difficulty-based customization
  - Academic standard alignment

## 💡 How It Works

### AI Integration
- **Dual AI System**:
  - Primary: Portia AI for specialized educational responses
  - Fallback: Google Gemini for continuous availability
- **Smart Context Processing**:
  - Natural Language Understanding
  - Educational context awareness
  - Multi-step reasoning capabilities

### API Architecture
- **RESTful Endpoints**:
  - `/api/v1/portia-chat`: Main chat interface
  - `/api/v1/portia-quiz`: Quiz generation system
  - `/api/v1/portia-doubt`: Doubt resolution service
  - `/api/v1/hybrid-chat`: Smart AI switching system
  - `/api/v1/pdf-feedback`: Document analysis service

### Response System
- Confidence scoring for all AI responses
- Source attribution for verified information
- Structured JSON responses with metadata
- Real-time performance metrics

## 🔗 Live Demo
Experience Portia AI live: [Portia AI]

## 🛠 Tech Stack

### Frontend Architecture
- **Core Framework**: 
  - Next.js 13+ with App Router
  - TypeScript for type safety
  - Tailwind CSS for styling
- **UI Components**:
  - Modern shadcn/ui components
  - Custom animated elements
  - Responsive design system

### Backend Services
- **API Layer**:
  - RESTful architecture
  - Rate limiting & caching
  - Error handling & logging
  - Security middleware

### AI Integration
- **Primary**: Portia AI API
  - Custom educational models
  - Context-aware processing
  - Performance optimization
- **Fallback**: Google Gemini AI
  - Seamless switching
  - Response compatibility
  - Service continuity

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm
- A Portia AI API key
- A Google API key (for fallback system)

### Setup Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/pauldebanshu19/Portia-AI.git
   cd portia-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env.local` file with:
   ```bash
   PORTIA_AI_API_KEY=your_portia_ai_api_key_here
   PORTIA_AI_BASE_URL=https://api.portia.ai/v1
   GOOGLE_API_KEY=your_google_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

## 🌟 Key Components

### User Interface
- **Interactive Dashboard**: 
  - Centralized control center
  - Feature quick access
  - User progress tracking
  - Performance analytics

### AI Services
- **Chat Interface**: 
  - Real-time AI responses
  - Context maintenance
  - History tracking
  - Smart suggestions

- **Document Analysis**:
  - PDF processing engine
  - Smart summarization
  - Key point extraction
  - Feedback generation

### Educational Tools
- **Quiz System**:
  - Dynamic question generation
  - Multiple formats support
  - Progress tracking
  - Performance analytics

- **Doubt Resolution**:
  - Subject-specific responses
  - Step-by-step explanations
  - Visual aids integration
  - Source references

- **Paper Generator**:
  - Custom paper creation
  - Multiple formats
  - Difficulty settings
  - Academic standards alignment

## 🛠️ Development

### API Integration
For integrating with Portia AI in your components:

```typescript
import { usePortiaAI } from '@/hooks/usePortiaAI';

function MyComponent() {
  const { chat, generateQuiz, resolveDoubt } = usePortiaAI();

  // Example: Chat with AI
  const handleChat = async () => {
    const response = await chat("Explain quantum physics", "Physics");
    console.log(response);
  };

  // Example: Generate Quiz
  const handleQuiz = async () => {
    const quiz = await generateQuiz("Physics", "Mechanics", 5);
    console.log(quiz);
  };
}
```

### Performance Optimization
- Implement response caching
- Use streaming for long conversations
- Batch multiple requests when possible
- Optimize connection pooling

### Security Considerations
- Protect API keys
- Implement rate limiting
- Validate all user inputs
- Handle errors gracefully

## 🤝 Contributing

We welcome contributions to Portia AI! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Add your changes:
   - Implement new features
   - Fix bugs
   - Improve documentation
   - Add tests
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain test coverage
- Update documentation
- Follow the existing code style

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📚 Additional Resources
- [Portia AI Documentation](https://docs.portia.ai)
- [API Reference](https://api.portia.ai/docs)
- [Best Practices Guide](https://portia.ai/best-practices)

---

Built with ❤️ using Next.js and Portia AI Technology


