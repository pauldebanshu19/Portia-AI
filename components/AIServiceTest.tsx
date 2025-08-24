"use client";

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

export default function AIServiceTest() {
  const [testResults, setTestResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testAIServices = async () => {
    setLoading(true);
    setTestResults(null);

    try {
      // Test basic chat functionality
      const response = await fetch('/api/v1/hybrid-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Hello, this is a test message.',
          aiProvider: 'portia'
        }),
      });

      const data = await response.json();
      
      setTestResults({
        status: response.status,
        success: response.ok,
        data: data,
        error: response.ok ? null : data.error
      });
    } catch (error) {
      setTestResults({
        status: 'ERROR',
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setLoading(false);
    }
  };

  const testGeminiOnly = async () => {
    setLoading(true);
    setTestResults(null);

    try {
      const response = await fetch('/api/v1/hybrid-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Hello, this is a test message.',
          aiProvider: 'gemini'
        }),
      });

      const data = await response.json();
      
      setTestResults({
        status: response.status,
        success: response.ok,
        data: data,
        error: response.ok ? null : data.error
      });
    } catch (error) {
      setTestResults({
        status: 'ERROR',
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-0 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-2xl font-bold text-slate-800 dark:text-slate-100">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            🔧
          </div>
          AI Service Test
        </CardTitle>
        <CardDescription className="text-slate-600 dark:text-slate-400 text-base">
          Test your AI service configuration and debug issues with our comprehensive testing tools
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={testAIServices} 
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Testing...
              </div>
            ) : (
              'Test Portia AI (with fallback)'
            )}
          </Button>
          <Button 
            onClick={testGeminiOnly} 
            disabled={loading} 
            variant="outline"
            className="flex-1 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold py-3 px-6 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                Testing...
              </div>
            ) : (
              'Test Gemini Only'
            )}
          </Button>
        </div>

          {testResults && (
            <div className={`p-6 border-2 rounded-xl ${
              testResults.success 
                ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 dark:from-green-900/20 dark:to-emerald-900/20 dark:border-green-600' 
                : 'bg-gradient-to-r from-red-50 to-pink-50 border-red-300 dark:from-red-900/20 dark:to-pink-900/20 dark:border-red-600'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <Badge 
                  variant={testResults.success ? 'default' : 'destructive'}
                  className="px-3 py-1 text-sm font-semibold"
                >
                  {testResults.success ? '✅ SUCCESS' : '❌ FAILED'}
                </Badge>
                <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                  Status: {testResults.status}
                </span>
              </div>
              
              {testResults.success ? (
                <div className="space-y-3">
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200">Response Details:</h4>
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">AI Provider:</span>
                        <span className="ml-2 text-slate-600 dark:text-slate-400">{testResults.data.aiProvider}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Response:</span>
                        <span className="ml-2 text-slate-600 dark:text-slate-400">{testResults.data.response}</span>
                      </div>
                      {testResults.data.confidence && (
                        <div>
                          <span className="font-semibold text-slate-700 dark:text-slate-300">Confidence:</span>
                          <span className="ml-2 text-slate-600 dark:text-slate-400">{Math.round(testResults.data.confidence * 100)}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200">Error Details:</h4>
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-red-200 dark:border-red-700">
                    <p className="text-red-600 dark:text-red-400 font-medium">{testResults.error}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-600 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                💡
              </div>
              <h4 className="font-bold text-slate-800 dark:text-slate-200 text-lg">Troubleshooting Tips</h4>
            </div>
            <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>If Portia AI fails, it should automatically fallback to Google Gemini</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Make sure you have at least one API key configured (GOOGLE_API_KEY or PORTIA_AI_API_KEY)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Check your environment variables in .env.local</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Ensure your API keys are valid and have sufficient credits</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
  );
}
