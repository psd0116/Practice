"use client";

import { PostEditor } from "@/components/board/post-editor";
import { useRouter } from "next/navigation";

export default function WritePage() {
  const router = useRouter();

  const handleCreatePost = async (title: string, content: string, category: string) => {
    // 실제 API 연동 대신 로컬 처리를 가정하거나 추후 연동
    console.log("Creating post:", { title, content, category });
    
    // 모의 지연 (API 요청 흉내)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // 작성 후 목록으로 이동
    router.push("/board");
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <PostEditor onSubmit={handleCreatePost} />
    </div>
  );
}
