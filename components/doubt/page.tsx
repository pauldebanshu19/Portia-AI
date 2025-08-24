// 'use client'

// import { useState, useEffect } from 'react'
// import { motion } from 'framer-motion'
// import { ChevronRight, Send } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Card,CardContent } from "@/components/ui/card"
// // import { Inter} from 'next/font/google'

// // const inter = Inter({ subsets: ['latin'] })
// interface DoubtProps {
//   goBack: () => void;
// }

// export default function LearningInterfaceComponent({ goBack }: DoubtProps) {
//   const [mounted, setMounted] = useState(false)
//   const [classNumber, setClassNumber] = useState('')
//   const [subject, setSubject] = useState('')
//   const [customTopic, setCustomTopic] = useState('')
//   const [doubt, setDoubt] = useState('')
//   const [showChat, setShowChat] = useState(false)
//   const [messages, setMessages] = useState<{ content: string; isUser: boolean }[]>([])
//   const [inputMessage, setInputMessage] = useState('')
//   const [isLoading, setIsLoading] = useState(false)

//   useEffect(() => {
//     setMounted(true)
//   }, [])

//   const handleFormSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     const welcomeMessage = `Class: ${classNumber}\nSubject: ${subject}\nTopic: ${customTopic}\nDoubt: ${doubt}`
//     setMessages([{ content: welcomeMessage, isUser: false }])
//     setShowChat(true)
//   }

//   const sendMessage = async () => {
//     if (!inputMessage.trim()) return

//     const userMessage = { content: inputMessage, isUser: true }
//     setMessages(prev => [...prev, userMessage])
//     setInputMessage('')
//     setIsLoading(true)

//     try {
//       const response = await fetch('/api/v1/doubt', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           message: inputMessage,
//           classNumber,
//           subject,
//           customTopic,
//           doubt
//         }),
//       })

//       if (!response.ok) {
//         throw new Error('Failed to get response')
//       }

//       const data = await response.json()
//       const aiMessage = { content: data.reply, isUser: false }
//       console.log(aiMessage)
//       setMessages(prev => [...prev, aiMessage])
//     } catch (error) {
//       console.error('Error:', error)
//       const errorMessage = { content: 'Sorry, an error occurred. Please try again.', isUser: false }
//       setMessages(prev => [...prev, errorMessage])
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   if (!mounted) return null

//   return (
//     <div className={`flex  text-foreground`}>
//       <Button
//         onClick={goBack}
//         className="fixed top-4 right-4 mb-4 rounded-3xl text-gray-100 hover:text-gray-300 dark:text-black"
//       >
//         ← Back
//       </Button>
//       <main className="container mx-auto px-6 py-1 mb-2">
//         <div className="flex flex-col  gap-6 mt-2">
//           {/* Main content area */}
//           <Card className="flex-1 ">
//             <CardContent className="p-6">
//               {!showChat && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <motion.h2
//                     className="text-2xl mb-4"
//                     initial={{ opacity: 0, x: -30 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.5, delay: 0.3 }}
//                   >
//                     Start Your Learning
//                   </motion.h2>
//                   <motion.p
//                     className="mb-6"
//                     initial={{ opacity: 0, x: 30 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.5, delay: 0.4 }}
//                   >
//                     Fill in the details below to start your learning session.
//                   </motion.p>
//                   <motion.form
//                     onSubmit={handleFormSubmit}
//                     className="flex gap-2 flex-col"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5, delay: 0.5 }}
//                   >
//                     <Input
//                       type="text"
//                       placeholder="Class Number"
//                       value={classNumber}
//                       onChange={(e) => setClassNumber(e.target.value)}
//                       required
//                     />
//                     <Input
//                       type="text"
//                       placeholder="Subject"
//                       value={subject}
//                       onChange={(e) => setSubject(e.target.value)}
//                       required
//                     />
//                     <Input
//                       type="text"
//                       placeholder="Topic"
//                       value={customTopic}
//                       onChange={(e) => setCustomTopic(e.target.value)}
//                       required
//                     />
//                     <Input
//                       type="text"
//                       placeholder="Doubt"
//                       value={doubt}
//                       onChange={(e) => setDoubt(e.target.value)}
//                       required
//                     />
//                     <Button type="submit">
//                       Start Learning
//                       <motion.div
//                         initial={{ rotate: 90 }}
//                         animate={{ rotate: 0 }}
//                         transition={{ duration: 0.3 }}
//                         className="ml-2"
//                       >
//                         <ChevronRight className="h-4 w-4" />
//                       </motion.div>
//                     </Button>
//                   </motion.form>
//                 </motion.div>
//               )}
//               {showChat && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5 }}
//                   className="h-[calc(100vh-11rem)] flex flex-col"
//                 >
//                   <ScrollArea className="flex-grow mb-4">
//                     {messages.map((message, index) => (
//                       <motion.div
//                         key={index}
//                         className={`mb-4 p-3 rounded-lg ${message.isUser ? 'bg-primary text-primary-foreground ml-auto' : 'bg-muted'
//                           } max-w-[80%]`}
//                         initial={{ opacity: 0, scale: 0.95 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ duration: 0.3, delay: index * 0.1 }}
//                       >
//                         <div className="font-sans whitespace-pre-wrap break-words">
//                           {message.content}
//                         </div>
//                       </motion.div>
//                     ))}
//                   </ScrollArea>
//                   <div className="flex gap-2 ">
//                     <Input
//                       type="text"
//                       value={inputMessage}
//                       onChange={(e) => setInputMessage(e.target.value)}
//                       onKeyPress={(e) => e.key === 'Enter' && !isLoading && sendMessage()}
//                       placeholder="Ask a question..."
//                       className="flex-grow"
//                       disabled={isLoading}
//                     />
//                     <Button onClick={sendMessage} disabled={isLoading}>
//                       <Send className="h-4 w-4" />
//                       <span className="sr-only">Send message</span>
//                     </Button>
//                   </div>
//                 </motion.div>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </main>
//     </div>
//   )
// }
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
// import { Inter} from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })
interface DoubtProps {
  goBack?: () => void;
}

export default function LearningInterfaceComponent() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [classNumber, setClassNumber] = useState('')
  const [subject, setSubject] = useState('')
  const [customTopic, setCustomTopic] = useState('')
  const [doubt, setDoubt] = useState('')
  const [showChat, setShowChat] = useState(false)
  const [messages, setMessages] = useState<{ content: string; isUser: boolean }[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // const welcomeMessage = `Class: ${classNumber}\nSubject: ${subject}\nTopic: ${customTopic}\nDoubt: ${doubt}`
    const welcomeMessage = `Class: ${classNumber}\nSubject: ${subject}\nTopic: ${customTopic}`
    setMessages([{ content: welcomeMessage, isUser: false }])
    setShowChat(true)
  }

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = { content: inputMessage, isUser: true }
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/v1/doubt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          classNumber,
          subject,
          customTopic,
          doubt
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      const aiMessage = { content: data.reply, isUser: false }
      console.log(aiMessage)
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage = { 
        content: error instanceof Error ? error.message : 'Sorry, an error occurred. Please try again.', 
        isUser: false 
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <div className="text-gray-900 dark:text-white">
      <Button
        onClick={() => router.back()}
        className="fixed top-4 right-4 mb-4 rounded-3xl text-gray-100 dark:text-black hover:text-gray-500 dark:hover:text-gray-400"
      >
        ← Back
      </Button>
      <main className="container mx-auto px-6 py-1 mb-2">
        <div className="flex flex-col  gap-6 mt-2">
          {/* Main content area */}
          <Card className="flex-1 ">
            <CardContent className="p-6">
              {!showChat && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.h2
                    className="text-2xl mb-4"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    Start Your Learning
                  </motion.h2>
                  <motion.p
                    className="mb-6"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    Fill in the details below to start your learning session.
                  </motion.p>
                  <motion.form
                    onSubmit={handleFormSubmit}
                    className="flex gap-2 flex-col"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <Input
                      type="text"
                      placeholder="Class Number"
                      value={classNumber}
                      onChange={(e) => setClassNumber(e.target.value)}
                      required
                    />
                    <Input
                      type="text"
                      placeholder="Subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                    />
                    <Input
                      type="text"
                      placeholder="Topic"
                      value={customTopic}
                      onChange={(e) => setCustomTopic(e.target.value)}
                      required
                    />
                    {/* <Input
                      type="text"
                      placeholder="Doubt"
                      value={doubt}
                      onChange={(e) => setDoubt(e.target.value)}
                      required
                    /> */}
                    <Button type="submit">
                      Start Learning
                      <motion.div
                        initial={{ rotate: 90 }}
                        animate={{ rotate: 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-2"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </motion.div>
                    </Button>
                  </motion.form>
                </motion.div>
              )}
              {showChat && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="h-[calc(100vh-11rem)] flex flex-col"
                >
                  <ScrollArea className="flex-grow mb-4">
                    {messages.map((message, index) => (
                      <motion.div
                        key={index}
                        className={`mb-4 p-3 rounded-lg ${message.isUser ? 'bg-primary text-primary-foreground ml-auto' : 'bg-muted'
                          } max-w-[80%]`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className="font-sans whitespace-pre-wrap break-words">
                          {message.content}
                        </div>
                      </motion.div>
                    ))}
                  </ScrollArea>
                  <div className="flex gap-2 ">
                    <Input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !isLoading && sendMessage()}
                      placeholder="Ask a question..."
                      className="flex-grow"
                      disabled={isLoading}
                    />
                    <Button onClick={sendMessage} disabled={isLoading}>
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Send message</span>
                    </Button>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
