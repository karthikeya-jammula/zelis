import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      type="button"
      onClick={() => setDark((prev) => !prev)}
      className="rounded-full border border-slate-400/40 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-900 backdrop-blur dark:text-slate-100"
    >
      {dark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
