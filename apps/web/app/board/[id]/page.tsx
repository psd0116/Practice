"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Edit, Trash2, Calendar, MessageSquare, Heart } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

// Mock Data (나중에 실제 데이터 패칭으로 교체)
const MOCK_POST = {
  id: 1,
  title: "Void* 커뮤니티 오픈 소식",
  content: `드디어 Void* 커뮤니티가 오픈했습니다. 많은 관심 부탁드립니다.
  
  이 공간은 개발자들을 위한 자유로운 소통 공간입니다. 
  코드 조각, 개발 팁, 일상 이야기 무엇이든 환영합니다.
  
  Void*의 주요 특징:
  - 미니멀한 디자인
  - 개발자 친화적인 기능
  - 자유로운 토론 문화
  
  앞으로 더 많은 기능이 추가될 예정이니 기대해주세요!`,
  date: "2025.06.01",
  author: "VoidMaster",
  likes: 42,
  comments: [
    { id: 1, user: "user1", text: "오픈 축하드립니다! 🎉", date: "2025.06.01" },
    { id: 2, user: "dev_king", text: "디자인이 정말 멋지네요.", date: "2025.06.02" },
    { id: 3, user: "newbie", text: "앞으로 자주 이용하겠습니다.", date: "2025.06.02" }
  ]
};

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState(MOCK_POST);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 실제로는 params.id를 이용해 데이터를 가져와야 함
    // 여기서는 로딩 시뮬레이션만
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-primary" />
      </div>
    );
  }

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
            <span className="font-medium text-foreground">{post.author}</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
          </div>

          <div className="flex gap-2">
            <Link 
              href={`/board/${params.id}/edit`}
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
          댓글 <span className="text-muted-foreground font-normal text-base">{post.comments.length}</span>
        </h3>

        {/* 댓글 작성 폼 */}
        <div className="mb-8 flex gap-4">
          <div className="w-10 h-10 rounded-full bg-muted shrink-0" />
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
          {post.comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold shrink-0">
                {comment.user[0].toUpperCase()}
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
