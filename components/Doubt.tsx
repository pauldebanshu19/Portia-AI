import React from "react";
import { motion } from "framer-motion";

type AskDoubtContentProps = {
  goBack: () => void;
};

const AskDoubtContent: React.FC<AskDoubtContentProps> = ({ goBack }) => {
  return (
    <motion.div
      className="p-6 rounded-lg bg-neutral-100 dark:bg-neutral-700 shadow-md border border-neutral-200 dark:border-neutral-600 flex-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-2xl font-bold mb-4">Ask a Doubt</h2>
      <button onClick={goBack} className="mb-4 text-blue-500">
        ← Back to Dashboard
      </button>
      {/* Add your ask doubt content here */}
    </motion.div>
  );
};

export default AskDoubtContent;