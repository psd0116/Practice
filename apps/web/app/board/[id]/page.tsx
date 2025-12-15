"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Edit, Trash2, Calendar, MessageSquare, Heart } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { MOCK_COMMUNITY_POSTS } from "@/lib/mock-data";
import { useAuth } from "@/context/auth-context";

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth(); // 현재 로그인한 사용자 정보 가져오기
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // URL의 id 파라미터로 게시글 찾기
    const postId = Number(params.id);
    const foundPost = MOCK_COMMUNITY_POSTS.find(p => p.id === postId);

    if (foundPost) {
      setPost(foundPost);
    } else {
      // 게시글을 찾지 못한 경우 (또는 기본 Mock 데이터 사용)
      // 실제로는 404 페이지로 이동하거나 에러 메시지를 보여줘야 함
      // 여기서는 데모를 위해 첫 번째 글을 보여주거나 null 처리
    }
    
    // 로딩 시뮬레이션
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">게시글을 찾을 수 없습니다.</h2>
        <button 
          onClick={() => router.back()}
          className="text-primary hover:underline"
        >
          돌아가기
        </button>
      </div>
    );
  }

  // 작성자 본인 확인 (Mock 데이터에서는 간단히 이름 비교 또는 데모용으로 항상 true/false 설정 가능)
  // 여기서는 로그인한 유저의 이름(또는 이메일)과 게시글 작성자가 같으면 수정/삭제 버튼 노출
  const isAuthor = user?.name === post.author || post.author === "Void User"; // "Void User"는 현재 로그인 데모 유저 이름

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8 pb-20">
      {/* 헤더 */}
      <div className="mb-8">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          목록으로
        </button>

        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center justify-between py-4 border-b border-border">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-400 to-purple-400 flex items-center justify-center text-[10px] text-white font-bold">
                    {post.author.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium text-foreground">{post.author}</span>
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
          </div>

          {/* 작성자 본인일 경우에만 수정/삭제 버튼 표시 */}
          {isAuthor && (
            <div className="flex gap-2">
              <Link 
                href={`/board/${post.id}/edit`}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
                title="글 수정"
              >
                <Edit className="w-5 h-5" />
              </Link>
              <button 
                className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-full transition-colors"
                title="삭제"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 본문 */}
      <div className="prose dark:prose-invert max-w-none mb-12 min-h-[200px] whitespace-pre-wrap leading-relaxed text-lg">
        {post.content}
      </div>

      {/* 하단 액션 (좋아요 등) */}
      <div className="flex justify-center mb-16">
        <button className="flex flex-col items-center gap-2 group">
          <div className="p-4 rounded-full bg-muted group-hover:bg-red-50 dark:group-hover:bg-red-900/20 transition-colors">
            <Heart className="w-8 h-8 text-muted-foreground group-hover:text-red-500 transition-colors" />
          </div>
          <span className="font-bold text-lg text-muted-foreground group-hover:text-red-500 transition-colors">
            {post.likes}
          </span>
        </button>
      </div>

      {/* 댓글 섹션 */}
      <div className="border-t border-border pt-8">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          댓글 <span className="text-muted-foreground font-normal text-base">{typeof post.comments === 'number' ? post.comments : post.recentComments?.length || 0}</span>
        </h3>

        {/* 댓글 작성 폼 */}
        <div className="mb-8 flex gap-4">
          <div className="w-10 h-10 rounded-full bg-muted shrink-0 flex items-center justify-center text-xs font-bold text-muted-foreground">
             {user ? user.name.charAt(0).toUpperCase() : "?"}
          </div>
          <div className="flex-1">
            <textarea 
              placeholder="댓글을 남겨보세요..."
              className="w-full bg-muted/30 border border-border rounded-xl p-4 min-h-[100px] focus:outline-none focus:border-primary transition-colors resize-none mb-2"
            />
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-foreground text-background rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                댓글 작성
              </button>
            </div>
          </div>
        </div>

        {/* 댓글 목록 */}
        <div className="space-y-6">
          {(post.recentComments || []).map((comment: any) => (
            <div key={comment.id || Math.random()} className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold shrink-0">
                {(comment.user || "?").charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold">{comment.user}</span>
                  <span className="text-xs text-muted-foreground">{comment.date}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {comment.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
