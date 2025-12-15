"use client";

import { CommunityPostList } from "@/components/board/community-post-list";

export default function CommunityPage() {
  return (
    <div className="min-h-screen pb-20">
      <div className="mb-8 pt-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight">커뮤니티</h1>
        <p className="text-muted-foreground mt-2">다른 사용자들의 다양한 이야기를 만나보세요.</p>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* 커뮤니티 게시글 리스트 (검색 기능 포함) */}
        <CommunityPostList />
      </div>
    </div>
  );
}
