import Link from "next/link";

export function ActionButtons() {
  return (
    <div className="flex gap-4">
      <Link
        href="/board"
        className="px-8 py-3 bg-black text-white dark:bg-white dark:text-black font-bold rounded-lg hover:scale-105 transition-transform"
      >
        입장하기 →
      </Link>
      <Link
        href="/about"
        className="px-8 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      >
        소개
      </Link>
    </div>
  );
}