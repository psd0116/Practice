"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAuth } from "@/context/auth-context";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isLoggedIn, logout } = useAuth();
  const isAboutPage = pathname === "/about";
  const isLandingPage = pathname === "/";
  // 마이 페이지 관련 경로인지 확인 (board/*)
  const isMyBoardPage = pathname.startsWith("/board");

  if (isAboutPage) {
    return <main className="flex-1 w-full">{children}</main>;
  }

  return (
    <>
      {/* 1. Header에 relative 추가 (자식 요소의 절대 위치 기준점) */}
      <header className="relative border-b border-gray-200 dark:border-gray-800 p-4 flex justify-between items-center bg-background text-foreground transition-colors duration-300">
        
        {/* [왼쪽] 로고 */}
        <h1 className="text-2xl font-bold tracking-tighter z-10">
          <Link href="/">Void*</Link>
        </h1>
        
        {/* [중앙] 메인 네비게이션 (absolute로 정중앙 고정) */}
        <nav className="absolute left-1/2 -translate-x-1/2 flex gap-6 items-center text-sm font-medium">
          <Link href="/community" className="text-muted-foreground hover:text-foreground transition-colors">
            커뮤니티
          </Link>
        </nav>

        {/* [오른쪽] 유틸리티 버튼 (테마, 로그인/마이페이지/로그아웃) */}
        {/* z-10을 주어 화면이 작아져서 중앙 메뉴와 겹쳐도 클릭 가능하게 함 */}
        <div className="flex gap-4 items-center z-10">
          <ThemeToggle />
          
          {isLoggedIn ? (
            isMyBoardPage ? (
              <button 
                onClick={logout}
                className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-full hover:opacity-80 transition text-sm font-medium"
              >
                로그아웃
              </button>
            ) : (
              <Link 
                href="/board" 
                className="bg-primary text-primary-foreground px-4 py-2 rounded-full hover:opacity-80 transition text-sm font-medium"
              >
                마이페이지
              </Link>
            )
          ) : (
            <Link 
              href="/login" 
              className="bg-primary text-primary-foreground px-4 py-2 rounded-full hover:opacity-80 transition text-sm font-medium"
            >
              로그인
            </Link>
          )}
        </div>

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