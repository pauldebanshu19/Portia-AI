"use client";

import React, { useState } from 'react';
import { usePortiaAI } from '@/hooks/usePortiaAI';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

export default function PortiaAIDemo() {
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [aiProvider, setAiProvider] = useState<'portia' | 'gemini'>('portia');
  
  const { 
    loading, 
    error, 
    data, 
    chat, 
    generateQuiz, 
    resolveDoubt, 
    hybridChat,
    reset 
  } = usePortiaAI({
    onError: (error) => console.error('Portia AI Error:', error),
    onSuccess: (data) => console.log('Portia AI Success:', data)
  });

  const handleChat = async () => {
    if (!message.trim()) return;
    try {
      await hybridChat(message, aiProvider);
    } catch (error) {
      console.error('Chat error:', error);
    }
  };

  const handleQuizGeneration = async () => {
    if (!subject.trim() || !topic.trim()) return;
    try {
      await generateQuiz(subject, topic, 5);
    } catch (error) {
      console.error('Quiz generation error:', error);
    }
  };

  const handleDoubtResolution = async () => {
    if (!message.trim() || !subject.trim()) return;
    try {
      await resolveDoubt(message, subject);
    } catch (error) {
      console.error('Doubt resolution error:', error);
    }
  };

  return (
    <Card className="w-full bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-0 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-2xl font-bold text-slate-800 dark:text-slate-100">
          <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
            🤖
          </div>
          Portia AI Integration
          <Badge 
            variant={aiProvider === 'portia' ? 'default' : 'secondary'}
            className="ml-2 px-3 py-1 text-sm font-semibold"
          >
            {aiProvider === 'portia' ? 'Portia AI' : 'Google Gemini'}
          </Badge>
        </CardTitle>
        <CardDescription className="text-slate-600 dark:text-slate-400 text-base">
          Experience enhanced AI capabilities with Portia AI integration for chat, quiz generation, and doubt resolution
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* AI Provider Toggle */}
        <div className="flex gap-3">
          <Button
            variant={aiProvider === 'portia' ? 'default' : 'outline'}
            onClick={() => setAiProvider('portia')}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
              aiProvider === 'portia' 
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-md hover:shadow-lg' 
                : 'border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            Portia AI
          </Button>
          <Button
            variant={aiProvider === 'gemini' ? 'default' : 'outline'}
            onClick={() => setAiProvider('gemini')}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
              aiProvider === 'gemini' 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg' 
                : 'border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            Google Gemini
          </Button>
        </div>

          {/* Chat Interface */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                💬
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">AI Chat</h3>
            </div>
            <div className="flex gap-3">
              <Input
                placeholder="Ask me anything..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleChat()}
                className="flex-1 border-2 border-slate-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg px-4 py-3 text-slate-700 dark:text-slate-300"
              />
              <Button 
                onClick={handleChat} 
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Thinking...
                  </div>
                ) : (
                  'Send'
                )}
              </Button>
            </div>
          </div>

          {/* Quiz Generation */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                📝
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Quiz Generation</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input
                placeholder="Subject (e.g., Mathematics)"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="border-2 border-slate-300 dark:border-slate-600 focus:border-green-500 dark:focus:border-green-400 rounded-lg px-4 py-3 text-slate-700 dark:text-slate-300"
              />
              <Input
                placeholder="Topic (e.g., Algebra)"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="border-2 border-slate-300 dark:border-slate-600 focus:border-green-500 dark:focus:border-green-400 rounded-lg px-4 py-3 text-slate-700 dark:text-slate-300"
              />
            </div>
            <Button 
              onClick={handleQuizGeneration} 
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Generating Quiz...
                </div>
              ) : (
                'Generate Quiz'
              )}
            </Button>
          </div>

          {/* Doubt Resolution */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                ❓
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Doubt Resolution</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input
                placeholder="Your question..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border-2 border-slate-300 dark:border-slate-600 focus:border-orange-500 dark:focus:border-orange-400 rounded-lg px-4 py-3 text-slate-700 dark:text-slate-300"
              />
              <Input
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="border-2 border-slate-300 dark:border-slate-600 focus:border-orange-500 dark:focus:border-orange-400 rounded-lg px-4 py-3 text-slate-700 dark:text-slate-300"
              />
            </div>
            <Button 
              onClick={handleDoubtResolution} 
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Resolving Doubt...
                </div>
              ) : (
                'Resolve Doubt'
              )}
            </Button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-2 border-red-300 dark:border-red-600 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                  ⚠️
                </div>
                <h4 className="font-bold text-red-800 dark:text-red-200">Error</h4>
              </div>
              <p className="text-red-700 dark:text-red-300 font-medium">{error}</p>
            </div>
          )}

          {/* Response Display */}
          {data && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-300 dark:border-green-600 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  ✅
                </div>
                <h4 className="font-bold text-green-800 dark:text-green-200">Response</h4>
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline" className="px-3 py-1">
                  {data.aiProvider || 'Portia AI'}
                </Badge>
                {data.confidence && (
                  <Badge variant="secondary" className="px-3 py-1">
                    Confidence: {Math.round(data.confidence * 100)}%
                  </Badge>
                )}
              </div>
              
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                {data.quiz ? (
                  <div>
                    <h5 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Generated Quiz:</h5>
                    <pre className="text-sm bg-slate-100 dark:bg-slate-700 p-3 rounded-lg overflow-x-auto">
                      {JSON.stringify(data.quiz, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap text-slate-700 dark:text-slate-300 leading-relaxed">{data.response}</p>
                )}
              </div>
              
              {data.sources && data.sources.length > 0 && (
                <div className="mt-4">
                  <h5 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Sources:</h5>
                  <ul className="space-y-1">
                    {data.sources.map((source: string, index: number) => (
                      <li key={index} className="text-sm text-slate-600 dark:text-slate-400">• {source}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Reset Button */}
          <div className="flex justify-center">
            <Button 
              variant="outline" 
              onClick={reset}
              className="border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold py-3 px-8 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200"
            >
              Reset All
            </Button>
          </div>
        </CardContent>
      </Card>
  );
}
