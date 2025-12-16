"use client";

import { PostEditor } from "@/components/board/post-editor";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  
  const [initialData, setInitialData] = useState<{
    title: string;
    content: string;
    category: string;
  } | null>(null);

  // 초기 데이터 불러오기
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:4000/posts/${params.id}`);
        if (!response.ok) throw new Error("Failed to fetch post");
        const data = await response.json();
        
        setInitialData({
          title: data.title,
          content: data.content,
          category: data.category || "General"
        });
      } catch (error) {
        console.error("Error fetching post:", error);
        alert("게시글 정보를 불러오는데 실패했습니다.");
        router.push("/board");
      }
    };

    if (params.id) {
      fetchPost();
    }
  }, [params.id, router]);

  const handleUpdatePost = async (title: string, content: string, category: string) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }

      const response = await fetch(`http://localhost:4000/posts/${params.id}`, {
        method: "PATCH",
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
        throw new Error("게시글 수정 실패");
      }

      // 수정 후 상세 페이지로 이동
      router.push(`/board/${params.id}`);
    } catch (error) {
      console.error(error);
      alert("게시글 수정 중 오류가 발생했습니다.");
    }
  };

  if (!initialData) {
     return (
       <div className="flex h-[50vh] items-center justify-center">
         <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
       </div>
     );
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <PostEditor 
        initialTitle={initialData.title}
        initialContent={initialData.content}
        initialCategory={initialData.category}
        isEditing={true}
        onSubmit={handleUpdatePost} 
      />
    </div>
  );
}
