"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MessageSquare, Heart, Edit, ChevronDown, ChevronUp, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/auth-context";


export function CommunityPostList() {
  const { user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest');

  // 데이터 불러오기
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const query = sortBy === 'popular' ? '?sort=popular' : '';
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/posts${query}`);
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        
        // 데이터 매핑 (백엔드 -> 프론트엔드 포맷)
        const mappedPosts = data.map((post: any) => ({
          id: post.id,
          title: post.title,
          content: post.content,
          author: post.author.username || "Unknown",
          authorImage: post.author.profileImage, // 프로필 이미지 추가
          date: new Date(post.createdAt).toLocaleDateString(),
          likes: post._count?.likes || 0,
          comments: post._count?.comments || 0,
          category: post.category
        }));

        setPosts(mappedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [sortBy]);

  const filteredPosts = posts.filter(post => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) || 
      post.content.toLowerCase().includes(query) ||
      post.author.toLowerCase().includes(query)
    );
  });

  const displayedPosts = isExpanded ? filteredPosts : filteredPosts.slice(0, 9);

  // 인기 게시글 "불타는" 효과 (순위별 스타일)
  const getRankStyle = (index: number) => {
    if (sortBy !== 'popular') return "border-transparent hover:border-gray-200 dark:hover:border-zinc-800";
    
    switch(index) {
      case 0: // 1위
        return "border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.3)] dark:shadow-[0_0_30px_rgba(234,179,8,0.2)]";
      case 1: // 2위
        return "border-gray-400/50 shadow-[0_0_15px_rgba(156,163,175,0.3)] dark:shadow-[0_0_25px_rgba(156,163,175,0.2)]";
      case 2: // 3위
        return "border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.3)] dark:shadow-[0_0_25px_rgba(249,115,22,0.2)]";
      default:
        return "border-transparent hover:border-gray-200 dark:hover:border-zinc-800";
    }
  };

  const getRankBadge = (index: number) => {
    if (sortBy !== 'popular' || index > 2) return null;
    
    const badges = [
      { text: "🥇 1st", color: "bg-yellow-500" },
      { text: "🥈 2nd", color: "bg-gray-400" },
      { text: "🥉 3rd", color: "bg-orange-500" }
    ];

    return (
      <div className={`absolute -top-3 -left-3 ${badges[index].color} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-20`}>
        {badges[index].text}
      </div>
    );
  };

  return (
    <main className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* 헤더 섹션 */}
      <div className="flex flex-col items-center text-center mb-8">
        {/* 탭 버튼 (검색 상단) */}
        <div className="flex bg-muted p-1 rounded-xl mb-6">
          <button
            onClick={() => setSortBy('latest')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              sortBy === 'latest' 
                ? 'bg-background text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            최신순
          </button>
          <button
            onClick={() => setSortBy('popular')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              sortBy === 'popular' 
                ? 'bg-background text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            인기순 🔥
          </button>
        </div>

        {/* 검색 및 글쓰기 버튼 */}
        <div className="w-full flex items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="제목, 내용, 작성자 검색..."
              className="w-187.5 pl-9 pr-8 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:border-primary transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <Link 
            href="/board/write"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shrink-0"
          >
            <Edit className="w-4 h-4" />
            글쓰기
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {isLoading ? (
            // 로딩 스켈레톤
            [...Array(6)].map((_, i) => (
              <div key={i} className="h-50 bg-muted/50 rounded-xl animate-pulse" />
            ))
          ) : (
            displayedPosts.length > 0 ? (
            displayedPosts.map((post, index) => {
              const isMyPost = user?.name === post.author;
              const cardStyle = sortBy === 'popular' 
                ? getRankStyle(index)
                : isMyPost 
                  ? "border-primary/40 dark:border-primary/40 hover:border-primary dark:hover:border-primary bg-primary/ivory dark:bg-primary/5" // 내 글일 때 은은한 강조
                  : "border-transparent hover:border-gray-200 dark:hover:border-zinc-800";

              return (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className={`group relative border rounded-xl hover:shadow-md transition-all flex flex-col justify-between min-h-55 hover:z-50 ${cardStyle}`}
              >
                {getRankBadge(index)}
                
                <div className="p-5 flex flex-col h-full justify-between z-10 relative bg-white dark:bg-zinc-900 rounded-xl overflow-hidden">
                  {/* 불타는 효과를 위한 내부 글로우 (1위만) */}
                  {sortBy === 'popular' && index === 0 && (
                     <div className="absolute inset-0 bg-yellow-500/5 mix-blend-overlay pointer-events-none" />
                  )}

                  <div>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                           {post.authorImage ? (
                             <img 
                               src={post.authorImage} 
                               alt={post.author} 
                               className="w-6 h-6 rounded-full object-cover border border-gray-200 dark:border-zinc-700 shadow-sm"
                             />
                           ) : (
                            <div className="w-6 h-6 rounded-full bg-linear-to-tr from-blue-400 to-purple-400 flex items-center justify-center text-[10px] text-white font-bold shadow-sm">
                                {post.author.charAt(0).toUpperCase()}
                            </div>
                           )}
                            <span className="text-xs font-medium text-foreground opacity-80 flex items-center gap-1">
                              {post.author}
                              {isMyPost && (
                                <span className="text-[9px] bg-sky-500 text-white px-1.5 py-0.5 rounded-full font-bold leading-none">
                                  ME
                                </span>
                              )}
                            </span>
                        </div>
                        <span className="text-xs text-gray-400">{post.date}</span>
                      </div>
                    <Link href={`/board/${post.id}`} className="block mt-2">
                      <h4 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors cursor-pointer relative z-10">
                        {post.title}
                      </h4>
                    </Link>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                      {post.content}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-400 mt-auto pt-2">
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" /> {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" /> {post.comments}
                    </span>
                  </div>
                  </div>

                </motion.div>
              )})
            ) : (
               <div className="col-span-full py-20 text-center text-gray-400 flex flex-col items-center">
                 <div className="mb-4 flex justify-center bg-gray-50 dark:bg-zinc-800/50 p-6 rounded-full">
                   <Search className="w-8 h-8 opacity-40" />
                 </div>
                 <p className="text-lg font-medium text-gray-500">검색 결과가 없습니다.</p>
                 <p className="text-sm opacity-60 mt-1">다른 키워드로 검색해보세요.</p>
               </div>
            )
          )}
        </AnimatePresence>
      </div>

      {posts.length > 9 && filteredPosts.length > 9 && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-100 dark:bg-zinc-800 font-medium hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
          >
            {isExpanded ? (
              <>
                접기 <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                전체 글 보기 <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}
    </main>
  );
}
