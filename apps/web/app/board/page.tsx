"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { ProfileSection } from "@/components/board/profile-section";
import { MyPostList } from "@/components/board/my-post-list";

export default function BoardPage() {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, isLoading, router]);

  // 로딩 중이거나 로그인이 안 된 상태(리다이렉트 전)이면 로딩 UI 표시
  if (isLoading || !isLoggedIn) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-primary" />
          <p className="text-muted-foreground animate-pulse">Authenticating...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      {/* 상단 여백 및 인사말 (선택 사항) */}
      <div className="mb-8 pt-4">
        <h1 className="text-3xl font-bold tracking-tight">마이페이지</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* 왼쪽: 프로필 섹션 (3~4칸) */}
        <ProfileSection />

        {/* 오른쪽: 내 게시글 리스트 (8~9칸) */}
        <MyPostList />
      </div>
    </div>
  );
}