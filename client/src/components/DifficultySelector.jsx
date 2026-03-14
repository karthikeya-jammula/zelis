const difficulties = ["Beginner", "Intermediate", "Advanced"];

export default function DifficultySelector({ value, onChange }) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
      {difficulties.map((level) => {
        const selected = level === value;
        return (
          <button
            key={level}
            type="button"
            onClick={() => onChange(level)}
            className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
              selected
                ? "border-teal-400 bg-teal-500/30 text-teal-50 shadow-glow"
                : "border-slate-300/30 bg-white/10 text-slate-100 hover:border-teal-300"
            }`}
          >
            {level}
          </button>
        );
      })}
    </div>
  );
}
