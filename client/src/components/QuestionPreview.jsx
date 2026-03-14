import { motion } from "framer-motion";

export default function QuestionPreview({ question, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.5) }}
      className="rounded-2xl border border-slate-200/20 bg-white/10 p-5 backdrop-blur"
    >
      <p className="mb-2 text-xs uppercase tracking-widest text-teal-200">
        {question.topic} • {question.difficulty}
      </p>
      <h3 className="text-lg font-semibold text-white">Q{index + 1}. {question.question}</h3>
      <ul className="mt-3 grid gap-2">
        {question.options.map((option) => {
          const isCorrect = option === question.correctAnswer;
          return (
            <li
              key={option}
              className={`rounded-lg border px-3 py-2 text-sm ${
                isCorrect
                  ? "border-emerald-400/70 bg-emerald-500/20 text-emerald-100"
                  : "border-slate-200/20 bg-white/5 text-slate-200"
              }`}
            >
              {option}
            </li>
          );
        })}
      </ul>
      <p className="mt-3 rounded-lg border border-slate-300/20 bg-slate-950/30 p-3 text-sm text-slate-200">
        {question.explanation}
      </p>
    </motion.article>
  );
}
