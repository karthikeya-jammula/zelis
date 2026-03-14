import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import BackgroundScene from "./components/BackgroundScene";
import DifficultySelector from "./components/DifficultySelector";
import QuestionPreview from "./components/QuestionPreview";
import StatsStrip from "./components/StatsStrip";
import SyllabusInput from "./components/SyllabusInput";
import ThemeToggle from "./components/ThemeToggle";
import { createTest } from "./lib/api";

const makeRow = () => ({ id: crypto.randomUUID(), category: "", subtopics: "" });

function normalizeTopics(entries) {
  return entries
    .map((entry) => {
      const category = entry.category.trim();
      const subtopics = entry.subtopics
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean)
        .join(", ");
      if (!category && !subtopics) return null;
      if (!category) return subtopics;
      if (!subtopics) return category;
      return `${category}: ${subtopics}`;
    })
    .filter(Boolean);
}

export default function App() {
  const [entries, setEntries] = useState([makeRow()]);
  const [difficulty, setDifficulty] = useState("Intermediate");
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paper, setPaper] = useState(null);

  const topicList = useMemo(() => normalizeTopics(entries), [entries]);

  const handleAddRow = () => setEntries((prev) => [...prev, makeRow()]);
  const handleRemoveRow = (id) =>
    setEntries((prev) => (prev.length > 1 ? prev.filter((r) => r.id !== id) : prev));
  const handleUpdateRow = (id, field, value) =>
    setEntries((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));

  const handleGenerate = async () => {
    setError("");
    if (topicList.length === 0) {
      setError("Add at least one syllabus topic before generating.");
      return;
    }
    setLoading(true);
    try {
      const generated = await createTest({ topics: topicList, difficulty, numberOfQuestions });
      setPaper(generated);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExportJson = () => {
    if (!paper) return;
    const blob = new Blob([JSON.stringify(paper, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `test-paper-${paper._id || Date.now()}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-ink text-slate-100">
      <BackgroundScene />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-teal-200">AI Test Lab</p>
            <h1 className="font-display text-3xl font-bold sm:text-5xl">
              Syllabus to Smart MCQs
            </h1>
          </div>
          <ThemeToggle />
        </header>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="motion-section-controls grid gap-6 rounded-3xl border border-slate-300/20 bg-slate-900/45 p-5 backdrop-blur md:grid-cols-2"
        >
          <div className="space-y-4">
            <h2 className="font-display text-2xl">Interactive Test Generator</h2>
            <p className="text-sm text-slate-200">
              Add your syllabus blocks, choose depth, and let AI generate assessment-ready
              MCQs with explanations.
            </p>
            <SyllabusInput
              entries={entries}
              onAddRow={handleAddRow}
              onRemoveRow={handleRemoveRow}
              onUpdate={handleUpdateRow}
            />
          </div>

          <div className="space-y-4 rounded-2xl border border-slate-200/20 bg-white/5 p-4">
            <h3 className="font-display text-xl">Generation Controls</h3>
            <DifficultySelector value={difficulty} onChange={setDifficulty} />

            <label className="block text-sm">
              <span className="mb-2 block text-slate-200">Number of Questions</span>
              <input
                type="number"
                min={1}
                max={50}
                value={numberOfQuestions}
                onChange={(e) => setNumberOfQuestions(Number(e.target.value || 1))}
                className="w-full rounded-lg border border-slate-300/30 bg-transparent px-3 py-2 text-slate-50 outline-none focus:border-teal-300"
              />
            </label>

            {error ? <p className="text-sm text-rose-300">{error}</p> : null}

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={loading}
                className="rounded-lg bg-gradient-to-r from-teal-400 to-orange-400 px-5 py-2 text-sm font-bold text-slate-900 disabled:opacity-60"
              >
                {loading ? "Generating..." : "Generate Test"}
              </button>
              <button
                type="button"
                onClick={handleExportJson}
                disabled={!paper}
                className="rounded-lg border border-slate-300/30 px-5 py-2 text-sm font-semibold disabled:opacity-40"
              >
                Export JSON
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!paper) return;
                  setTimeout(() => window.print(), 100);
                }}
                disabled={!paper}
                className="rounded-lg border border-slate-300/30 px-5 py-2 text-sm font-semibold disabled:opacity-40"
              >
                Print / PDF
              </button>
            </div>
          </div>
        </motion.section>

        <div id="print-area">
          <StatsStrip test={paper} />

          <section className="grid gap-4 pb-16">
            {paper?.questions?.map((question, index) => (
              <QuestionPreview
                key={`${question._id}-${index}`}
                question={question}
                index={index}
              />
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
