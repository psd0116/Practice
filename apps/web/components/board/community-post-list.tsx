"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MessageSquare, Heart, Edit, ChevronDown, ChevronUp, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


export function CommunityPostList() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 데이터 불러오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:4000/posts");
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
  }, []);

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

  return (
    <main className="w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          전체 글
          <span className="text-sm font-normal text-gray-500 bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
            {filteredPosts.length}
          </span>
        </h3>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* 검색 바 */}
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="제목, 내용, 작성자 검색..."
              className="w-full pl-9 pr-8 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:border-primary transition-colors"
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

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {displayedPosts.length > 0 ? (
              displayedPosts.map((post) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="group relative border border-transparent hover:border-gray-200 dark:hover:border-zinc-800 rounded-xl hover:shadow-md transition-all flex flex-col justify-between min-h-55 hover:z-50"
                >
                  <div className="p-5 flex flex-col h-full justify-between z-10 relative bg-white dark:bg-zinc-900 rounded-xl">
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
                            <span className="text-xs font-medium text-foreground opacity-80">{post.author}</span>
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
              ))
            ) : (
               <div className="col-span-full py-20 text-center text-gray-400 flex flex-col items-center">
                 <div className="mb-4 flex justify-center bg-gray-50 dark:bg-zinc-800/50 p-6 rounded-full">
                   <Search className="w-8 h-8 opacity-40" />
                 </div>
                 <p className="text-lg font-medium text-gray-500">검색 결과가 없습니다.</p>
                 <p className="text-sm opacity-60 mt-1">다른 키워드로 검색해보세요.</p>
               </div>
            )}
          </AnimatePresence>
        </div>
      )}

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
