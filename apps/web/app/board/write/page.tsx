"use client";

import { PostEditor } from "@/components/board/post-editor";
import { useRouter } from "next/navigation";

export default function WritePage() {
  const router = useRouter();

  const handleCreatePost = async (title: string, content: string, category: string) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        alert("로그인이 필요합니다.");
        router.push("/login");
        return;
      }

      const response = await fetch("http://localhost:4000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          content,
          category
        })
      });

      if (!response.ok) {
        throw new Error("게시글 작성에 실패했습니다.");
      }
      
      // 작성 후 목록으로 이동
      router.push("/board");
    } catch (error) {
      console.error(error);
      alert("게시글 작성 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <PostEditor onSubmit={handleCreatePost} />
    </div>
  );
}
