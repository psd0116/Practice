"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Edit, Trash2, Calendar, MessageSquare, Heart } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

import { useAuth } from "@/context/auth-context";

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth(); // 현재 로그인한 사용자 정보 가져오기
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]); // 댓글 목록
  const [newComment, setNewComment] = useState(""); // 새 댓글 입력
  const [isLiked, setIsLiked] = useState(false); // 좋아요 여부 (가정)
  const [likesCount, setLikesCount] = useState(0); // 좋아요 수
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:4000/posts/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const data = await response.json();
        
        // 데이터 포맷팅
        const formattedPost = {
          ...data,
          date: new Date(data.createdAt).toLocaleDateString(),
          likes: data._count.likes, 
          commentsCount: data._count.comments,
          authorId: data.authorId
        };
        
        setPost(formattedPost);
        setLikesCount(data._count.likes);
        // 좋아요 여부 확인 (백엔드에서 likes 배열[0]이 있으면 true)
        if (data.likes && data.likes.length > 0) {
           // 로그인한 유저의 좋아요인지 확인 필요하지만
           // Controller에서 req.user.id로 필터링했다면 바로 true
           // 현재 service findOne에서 likes: true로 가져오는데, 이는 모든 좋아요를 가져옴.
           // user-specific like verification이 필요함. 
           // 백엔드 findOne likes logic 수정 전이라 일단 넘어가고,
           // fetchMyLikeStatus 별도로 하거나, Post 로드 시 내 좋아요 여부 포함해야 함.
           // 지금은 간단히직접 구현.
           const myLike = data.likes.find((l: any) => l.userId === user?.id); // user가 없으면 undefined
           setIsLiked(!!myLike);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:4000/comments/post/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          // 댓글 매핑
          const mappedComments = data.map((c: any) => ({
             id: c.id,
             text: c.content,
             user: c.author.username,
             date: new Date(c.createdAt).toLocaleDateString(),
             userProfile: c.author.profileImage
          }));
          setComments(mappedComments);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    if (params.id) {
      fetchPost();
      fetchComments();
    }
  }, [params.id, user]); // user 추가됨

  // 좋아요 토글 (낙관적 업데이트)
  const handleToggleLike = async () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    // 1. 낙관적 업데이트 (즉시 반영)
    const prevIsLiked = isLiked;
    const prevLikesCount = likesCount;

    setIsLiked(!prevIsLiked);
    setLikesCount(prevIsLiked ? prevLikesCount - 1 : prevLikesCount + 1);

    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`http://localhost:4000/posts/${params.id}/like`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("좋아요 실패");
      }
      // 성공 시 아무것도 안 함 (이미 UI 업데이트됨)
    } catch (error) {
      console.error(error);
      // 실패 시 롤백
      setIsLiked(prevIsLiked);
      setLikesCount(prevLikesCount);
      alert("좋아요 처리에 실패했습니다.");
    }
  };

  // 댓글 작성
  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    if (!user) {
       alert("로그인이 필요합니다.");
       return;
    }

    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("http://localhost:4000/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          content: newComment,
          postId: Number(params.id)
        })
      });

      if (!response.ok) throw new Error("댓글 작성 실패");
      
      const newCommentData = await response.json();
      
      // 목록에 추가
      const mappedComment = {
        id: newCommentData.id,
        text: newCommentData.content,
        user: newCommentData.author.username,
        date: new Date(newCommentData.createdAt).toLocaleDateString(),
        userProfile: newCommentData.author.profileImage // 있으면
      };

      setComments((prev) => [mappedComment, ...prev]);
      setNewComment("");
    } catch (error) {
      console.error(error);
      alert("댓글 작성 중 오류가 발생했습니다.");
    }
  };

  const handleDelete = async () => {
    if (!confirm("정말 이 게시글을 삭제하시겠습니까?")) return;

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }

      const response = await fetch(`http://localhost:4000/posts/${params.id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("삭제 실패");
      }

      alert("게시글이 삭제되었습니다.");
      router.push("/board");
    } catch (error) {
      console.error(error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

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

  // 작성자 본인 확인 (이름으로 비교하도록 수정, 백엔드에서 user 객체를 줌)
  const isAuthor = user?.name === post.author.username;

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
                <div className="w-8 h-8 rounded-full bg-linear-to-tr from-blue-400 to-purple-400 flex items-center justify-center text-xs text-white font-bold overflow-hidden shadow-sm border border-black/5 dark:border-white/10">
                    {post.author.profileImage ? (
                      <img src={post.author.profileImage} alt={post.author.username} className="w-full h-full object-cover" />
                    ) : (
                      post.author.username.charAt(0).toUpperCase()
                    )}
                </div>
                <span className="font-medium text-foreground">{post.author.username}</span>
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
                onClick={handleDelete}
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
      <div className="prose dark:prose-invert max-w-none mb-12 min-h-50 whitespace-pre-wrap leading-relaxed text-lg">
        {post.content}
      </div>

      {/* 하단 액션 (좋아요 등) */}
      <div className="flex justify-center mb-16">
        <button 
          onClick={handleToggleLike}
          className="flex flex-col items-center gap-2 group"
        >
          <div className={`p-4 rounded-full transition-colors ${
            isLiked 
              ? "bg-red-50 dark:bg-red-900/20" 
              : "bg-muted group-hover:bg-red-50 dark:group-hover:bg-red-900/20"
          }`}>
            <Heart className={`w-8 h-8 transition-colors ${
              isLiked 
                ? "fill-red-500 text-red-500" 
                : "text-muted-foreground group-hover:text-red-500"
            }`} />
          </div>
          <span className={`font-bold text-lg transition-colors ${
            isLiked ? "text-red-500" : "text-muted-foreground group-hover:text-red-500"
          }`}>
            {likesCount}
          </span>
        </button>
      </div>

      {/* 댓글 섹션 */}
      <div className="border-t border-border pt-8">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          댓글 <span className="text-muted-foreground font-normal text-base">{comments.length}</span>
        </h3>

        {/* 댓글 작성 폼 */}
        <div className="mb-8 flex gap-4">
          <div className="w-10 h-10 rounded-full bg-muted shrink-0 flex items-center justify-center text-xs font-bold text-muted-foreground overflow-hidden">
             {user?.profileImage ? (
               <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
             ) : (
               user ? user.name.charAt(0).toUpperCase() : "?"
             )}
          </div>
          <div className="flex-1">
            <textarea 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 남겨보세요..."
              className="w-full bg-muted/30 border border-border rounded-xl p-4 min-h-25 focus:outline-none focus:border-primary transition-colors resize-none mb-2"
            />
            <div className="flex justify-end">
              <button 
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="px-4 py-2 bg-foreground text-background rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                댓글 작성
              </button>
            </div>
          </div>
        </div>

        {/* 댓글 목록 */}
        <div className="space-y-6">
          {comments.length > 0 ? (
            comments.map((comment: any) => (
              <div key={comment.id} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold shrink-0 overflow-hidden">
                  {comment.userProfile ? (
                    <img src={comment.userProfile} alt={comment.user} className="w-full h-full object-cover" />
                  ) : (
                    (comment.user || "?").charAt(0).toUpperCase()
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{comment.user}</span>
                    <span className="text-xs text-muted-foreground">{comment.date}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {comment.text}
                  </p>
                </div>
              </div>
            ))
          ) : (
             <p className="text-center text-gray-500 py-10">아직 댓글이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
