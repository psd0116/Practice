import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
// 새로 만든 부품들 import
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export const metadata: Metadata = {
  title: "Void*",
  description: "Anything can be here.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning> 
      {/* suppressHydrationWarning: 테마 적용 시 깜빡임 에러 무시 (필수) */}
      <body className="antialiased min-h-screen flex flex-col">
        {/* Provider로 전체를 감쌉니다. 속성: class 기반으로 동작 */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          
          <header className="border-b border-gray-200 dark:border-gray-800 p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold tracking-tighter">
              <Link href="/">Void*</Link>
            </h1>
            
            <nav className="flex gap-4 items-center text-sm font-medium">
              {/* 여기에 토글 버튼 추가! */}
              <ThemeToggle />

              <Link 
                href="/login" 
                className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-full hover:opacity-80 transition"
              >
                로그인
              </Link>
            </nav>
          </header>

          <main className="flex-1 max-w-4xl w-full mx-auto p-4">
            {children}
          </main>

          <footer className="p-4 text-center text-gray-500 text-xs border-t border-gray-200 dark:border-gray-800">
            © 2025 Void* Community. All rights reserved.
          </footer>
          
        </ThemeProvider>
      </body>
    </html>
  );
}