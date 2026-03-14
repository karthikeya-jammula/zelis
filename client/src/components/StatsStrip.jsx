export default function StatsStrip({ test }) {
  if (!test) {
    return null;
  }

  const topics = new Set(test.questions.map((item) => item.topic));

  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <div className="rounded-2xl border border-slate-200/20 bg-white/10 p-4">
        <p className="text-xs uppercase tracking-widest text-slate-300">Questions</p>
        <p className="text-2xl font-display font-bold text-white">
          {test.numberOfQuestions}
        </p>
      </div>
      <div className="rounded-2xl border border-slate-200/20 bg-white/10 p-4">
        <p className="text-xs uppercase tracking-widest text-slate-300">Difficulty</p>
        <p className="text-2xl font-display font-bold text-white">{test.difficulty}</p>
      </div>
      <div className="rounded-2xl border border-slate-200/20 bg-white/10 p-4">
        <p className="text-xs uppercase tracking-widest text-slate-300">Topics Covered</p>
        <p className="text-2xl font-display font-bold text-white">{topics.size}</p>
      </div>
    </section>
  );
}
