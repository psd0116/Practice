import Link from "next/link";

export function ActionButtons() {
  return (
    <div className="flex gap-4">
      <Link
        href="/community"
        className="flex items-center justify-center px-8 py-3 rounded-lg font-bold hover:scale-105 transition-transform bg-black text-white dark:bg-white dark:text-black"
      >
        입장하기
      </Link>
      
      <Link
        href="/about"
        // 통일감을 위해 아래 버튼에도 동일하게 flex 속성을 적용하는 것을 권장합니다.
        className="flex items-center justify-center px-8 py-3 rounded-lg transition border-2 border-black dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        소개
      </Link>
    </div>
  );
}