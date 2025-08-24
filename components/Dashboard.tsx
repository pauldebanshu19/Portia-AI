"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/clerk-react";
import Doubt from "@/components/doubt/page";
import PaperGen from "@/components/paper-gen/page";
import Quiz from "@/components/quiz/page";
import BlurText from "./ui/BlurText";
import PdfReview from "@/components/pdf/page";
import PortiaAIDemo from "@/components/PortiaAIDemo";
import AIServiceTest from "@/components/AIServiceTest";

interface DashboardProps {
  activeTab: "ask" | "quiz" | "generate" | "pdf" | "ai" | null;
  setActiveTab: (tab: "ask" | "quiz" | "generate" | "pdf" | "ai" | null) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ activeTab, setActiveTab }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useUser();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const goBack = () => setActiveTab(null);

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-white border-neutral-200 dark:bg-neutral-950 overflow-y-auto">
      <div className="p-6 md:p-1 rounded-lg w-full max-w-4xl">
        {loading ? (
          <div className="space-y-4">
            <div className="h-20 rounded-lg bg-gray-100 dark:bg-neutral-700 animate-pulse" />
            <div className="h-20 rounded-lg bg-gray-100 dark:bg-neutral-700 animate-pulse" />
            <div className="h-20 rounded-lg bg-gray-100 dark:bg-neutral-700 animate-pulse" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {!activeTab && !user && (
                <BlurText
                  text="Welcome to Portia AI!"
                  delay={20}
                  animateBy="letters"
                  direction="top"
                  className="text-5xl mb-8"
                />
              )}
              {!activeTab && user && (
                <BlurText
                  text={`Welcome to Portia AI, ${user?.firstName || " "}!`}
                  delay={20}
                  animateBy="letters"
                  direction="top"
                  className="text-5xl mb-8"
                />
              )}
            </motion.div>

            {!activeTab ? (
              <motion.div
                key="dashboard-cards"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
              >
                {[
                  {
                    title: "Ask a Doubt",
                    description: "Get quick answers to your academic questions from Portia AI.",
                    tab: "ask",
                  },
                  {
                    title: "Take a Quiz",
                    description: "Test your knowledge with interactive quizzes from Portia AI.",
                    tab: "quiz",
                  },
                  {
                    title: "Generate Question Paper",
                    description: "Create personalized question papers for practice from Portia AI.",
                    tab: "generate",
                  },
                  {
                    title: "PDF-Review",
                    description: "Get Personalized Reviews on your PDFs from Portia AI.",
                    tab: "pdf",
                  },
                  {
                    title: "AI Features",
                    description: "Enhanced AI capabilities with Portia AI integration.",
                    tab: "ai",
                  },
                ].map(({ title, description, tab }) => (
                  <motion.div
                    key={tab}
                    className="p-10 rounded-lg bg-neutral-100 dark:bg-neutral-700 shadow-md border border-neutral-200 dark:border-neutral-600 flex flex-col justify-between cursor-pointer"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    onClick={() => setActiveTab(tab as "ask" | "quiz" | "generate" | "pdf" | "ai")}
                  >
                    <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">{title}</h3>
                    <p className="text-base text-neutral-600 dark:text-neutral-400">{description}</p>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {activeTab === "ask" && <Doubt/>}
                {activeTab === "quiz" && <Quiz />}
                {activeTab === "generate" && <PaperGen/>}
                {activeTab === "pdf" && <PdfReview/>}
                {activeTab === "ai" && (
                  <div className="space-y-8 pb-8 max-w-6xl mx-auto">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full">
                          <span className="text-2xl">🤖</span>
                        </div>
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                          AI Dashboard
                        </h2>
                      </div>
                      <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Experience the future of education with our enhanced AI capabilities. 
                        Test, chat, generate quizzes, and resolve doubts with cutting-edge AI technology.
                      </p>
                    </div>
                    
                    <div className="grid gap-8">
                      <AIServiceTest />
                      <PortiaAIDemo />
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
      <div className="absolute bottom-4 text-neutral-500 dark:text-neutral-400">
        AI tutor can make mistakes,be careful.
      </div>
    </div>
  );
};
