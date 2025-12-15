"use client";

import { PostEditor } from "@/components/board/post-editor";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  
  // Mock Data (실제로는 params.id로 fetch 해야 함)
  const initialData = {
    title: "Void* 커뮤니티 오픈 소식",
    content: `드디어 Void* 커뮤니티가 오픈했습니다. 많은 관심 부탁드립니다.
  
  이 공간은 개발자들을 위한 자유로운 소통 공간입니다. 
  코드 조각, 개발 팁, 일상 이야기 무엇이든 환영합니다.
  
  Void*의 주요 특징:
  - 미니멀한 디자인
  - 개발자 친화적인 기능
  - 자유로운 토론 문화
  
  앞으로 더 많은 기능이 추가될 예정이니 기대해주세요!`,
    category: "Notices"
  };

  const handleUpdatePost = async (title: string, content: string, category: string) => {
    console.log("Updating post:", { id: params.id, title, content, category });
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // 수정 후 상세 페이지로 이동
    router.push(`/board/${params.id}`);
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <PostEditor 
        initialTitle={initialData.title}
        initialContent={initialData.content}
        initialCategory={initialData.category}
        isDiditing={true}
        onSubmit={handleUpdatePost} 
      />
    </div>
  );
}
