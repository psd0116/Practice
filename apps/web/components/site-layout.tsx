"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAboutPage = pathname === "/about";

  // About 페이지일 때는 전역 헤더/푸터를 숨기고, Main 컨테이너의 제약(max-w-6xl 등)을 제거합니다.
  if (isAboutPage) {
    return <main className="flex-1 w-full">{children}</main>;
  }

  return (
    <>
      <header className="border-b border-gray-200 dark:border-gray-800 p-4 flex justify-between items-center bg-background text-foreground transition-colors duration-300">
        <h1 className="text-2xl font-bold tracking-tighter">
          <Link href="/">Void*</Link>
        </h1>
        
        <nav className="flex gap-4 items-center text-sm font-medium">
          <ThemeToggle />
          <Link 
            href="/login" 
            className="bg-primary text-primary-foreground px-4 py-2 rounded-full hover:opacity-80 transition"
          >
            로그인
          </Link>
        </nav>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto p-4">
        {children}
      </main>

      <footer className="p-4 text-center text-muted-foreground text-xs border-t border-border">
        © 2025 Void* Community. All rights reserved.
      </footer>
    </>
  );
}
