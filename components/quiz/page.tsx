"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"

interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: string
}

type QuizProps = {
  goBack?: () => void
}

export default function QuizApp() {
  const router = useRouter()
  const [classname, setClassname] = useState("")
  const [subj, setSubj] = useState("")
  const [topic, setTopic] = useState("")
  const [numQuestions, setNumQuestions] = useState("5")
  const [quiz, setQuiz] = useState<QuizQuestion[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [score, setScore] = useState(0)
  // New state to record the answer selected for each question.
  const [userAnswers, setUserAnswers] = useState<string[]>([])
  const [quizStarted, setQuizStarted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [quizFinished, setQuizFinished] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const generateQuiz = async () => {
    if (!classname.trim() || !subj.trim() || !topic.trim()) {
      setError("Please fill in all fields")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/v1/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          classname,
          subj,
          topic,
          numQuestions: Number.parseInt(numQuestions),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate quiz")
      }

      const data = await response.json()
      if (!data.quiz || !Array.isArray(data.quiz) || data.quiz.length === 0) {
        throw new Error("Invalid quiz data received")
      }
      setQuiz(data.quiz)
      setQuizStarted(true)
      setCurrentQuestion(0)
      setScore(0)
      setSelectedAnswer("")
      setUserAnswers([])
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to generate quiz")
      setQuizStarted(false)
    } finally {
      setLoading(false)
    }
  }

  const handleAnswer = () => {
    if (!quiz.length) return

    // Record the user's answer
    setUserAnswers((prev) => [...prev, selectedAnswer])

    if (selectedAnswer === quiz[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 1)
    }

    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer("")
    } else {
      // Final question has been answered; finish the quiz.
      setQuizFinished(true)
    }
  }

  const startNewQuiz = () => {
    setQuiz([])
    setQuizStarted(false)
    setQuizFinished(false)
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer("")
    setUserAnswers([])
    setError(null)
    setShowModal(false)
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.5 } },
  }

  if (!quizStarted || !quiz.length) {
    return (
      <div className="container mx-auto max-w-md mt-10 p-4">
        <Button
          onClick={() => router.back()}
          className="fixed top-4 right-4 mb-4 rounded-3xl text-gray-100 hover:text-gray-300 dark:text-black"
        >
          ← Back
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>AI-Generated Quiz</CardTitle>
            <CardDescription>
              Generate a quiz on any topic using Google Gemini
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="classname">Class</Label>
                <Input
                  id="classname"
                  placeholder="Enter class name"
                  value={classname}
                  onChange={(e) => setClassname(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subj">Subject</Label>
                <Input
                  id="subj"
                  placeholder="Enter subject"
                  value={subj}
                  onChange={(e) => setSubj(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="topic">Topic</Label>
                <Input
                  id="topic"
                  placeholder="Enter topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="numQuestions">Number of Questions</Label>
                <Input
                  id="numQuestions"
                  type="number"
                  min="1"
                  max="10"
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(e.target.value)}
                />
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={generateQuiz} disabled={loading} className="w-full">
              {loading ? "Generating Quiz..." : "Generate Quiz"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <>
      <motion.div
        className="container mx-auto max-w-md mt-10 p-4"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={containerVariants}
      >
        <Card>
          <CardHeader>
            <CardTitle>
              {classname} - {subj}
            </CardTitle>
            <CardDescription>Topic: {topic}</CardDescription>
            <CardDescription>
              Question {currentQuestion + 1} of {quiz.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <p className="mb-4 font-medium">
                  {quiz[currentQuestion]?.question}
                </p>
                <RadioGroup
                  value={selectedAnswer}
                  onValueChange={setSelectedAnswer}
                >
                  {quiz[currentQuestion]?.options.map((option, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-2 p-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <RadioGroupItem
                        value={String.fromCharCode(65 + index)}
                        id={`option-${index}`}
                      />
                      <Label htmlFor={`option-${index}`}>{option}</Label>
                    </motion.div>
                  ))}
                </RadioGroup>
              </motion.div>
            </AnimatePresence>
          </CardContent>
          {/* Only render buttons if the quiz is not finished */}
          {!quizFinished && (
            <CardFooter className="flex justify-between gap-2">
              <Button variant="outline" onClick={startNewQuiz}>
                Cancel Quiz
              </Button>
              <Button onClick={handleAnswer} disabled={!selectedAnswer}>
                {currentQuestion < quiz.length - 1
                  ? "Next Question"
                  : "Finish Quiz"}
              </Button>
            </CardFooter>
          )}
        </Card>

        {/* Render the Quiz Results card when finished */}
        <AnimatePresence>
          {quizFinished && quiz.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Quiz Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg">
                    Your score: {score} out of {quiz.length}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {score === quiz.length
                      ? "Perfect score! Excellent work!"
                      : score > quiz.length / 2
                      ? "Good job! Keep practicing!"
                      : "Keep learning and try again!"}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowModal(true)}
                    className="w-1/2"
                  >
                    View Answers
                  </Button>
                  <Button onClick={startNewQuiz} className="w-1/2">
                    Start New Quiz
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Modal displaying both the correct and the user-selected (wrong) answers */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Quiz Answers & Score</DialogTitle>
            <DialogDescription>
              Your score: {score} out of {quiz.length}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-4 max-h-96 overflow-y-auto">
            {quiz.map((q, idx) => {
              // Convert the correct answer letter to an index (e.g., "A" -> 0)
              const correctOptionIndex = q.correctAnswer.charCodeAt(0) - 65
              const userAnswerLetter = userAnswers[idx]
              const userOptionIndex =
                userAnswerLetter?.charCodeAt(0) - 65
              const isCorrect = userAnswerLetter === q.correctAnswer
              return (
                <div key={idx} className="border-b pb-2">
                  <p className="font-medium">
                    Q{idx + 1}: {q.question}
                  </p>
                  <p className="text-sm">
                    Correct Answer:{" "}
                    <span className="text-green-600">
                      {q.correctAnswer} - {q.options[correctOptionIndex]}
                    </span>
                  </p>
                  <p className="text-sm">
                    Your Answer:{" "}
                    {userAnswerLetter ? (
                      <span className={isCorrect ? "text-green-600" : "text-red-600"}>
                        {userAnswerLetter} - {q.options[userOptionIndex]}
                      </span>
                    ) : (
                      <span className="text-gray-600">No answer provided</span>
                    )}
                  </p>
                </div>
              )
            })}
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                setShowModal(false)
              }}
              className="w-full"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
