import { motion } from "framer-motion";

export default function SyllabusInput({ entries, onAddRow, onRemoveRow, onUpdate }) {
  return (
    <div className="space-y-3">
      {entries.map((entry, index) => (
        <motion.div
          key={entry.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-2 rounded-2xl border border-slate-300/20 bg-white/5 p-3 md:grid-cols-[1fr,2fr,auto]"
        >
          <input
            value={entry.category}
            onChange={(event) => onUpdate(entry.id, "category", event.target.value)}
            placeholder="Main topic (e.g., Data Structures)"
            className="rounded-lg border border-slate-300/30 bg-transparent px-3 py-2 text-sm text-slate-100 outline-none focus:border-teal-300"
          />
          <input
            value={entry.subtopics}
            onChange={(event) => onUpdate(entry.id, "subtopics", event.target.value)}
            placeholder="Subtopics separated by comma"
            className="rounded-lg border border-slate-300/30 bg-transparent px-3 py-2 text-sm text-slate-100 outline-none focus:border-teal-300"
          />
          <button
            type="button"
            onClick={() => onRemoveRow(entry.id)}
            disabled={entries.length === 1}
            className="rounded-lg border border-rose-400/40 px-3 py-2 text-xs font-semibold text-rose-200 disabled:opacity-40"
          >
            Remove #{index + 1}
          </button>
        </motion.div>
      ))}

      <button
        type="button"
        onClick={onAddRow}
        className="rounded-lg border border-teal-300/60 bg-teal-500/20 px-4 py-2 text-sm font-semibold text-teal-100"
      >
        + Add Topic Group
      </button>
    </div>
  );
}
