"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MessageSquare, Heart, MoreHorizontal, Edit, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";



export function MyPostList() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState<string[]>(["All", "Notices", "Dev", "Design", "Daily"]);
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 로컬 스토리지에서 카테고리 불러오기
  useEffect(() => {
    const savedCategories = localStorage.getItem("user_categories");
    if (savedCategories) {
      const parsed = JSON.parse(savedCategories);
      setCategories(["All", ...parsed]);
    }
  }, []);

  // 내 글 불러오기
  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) return;

        const response = await fetch("http://localhost:4000/posts/my", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error("Failed to fetch my posts");
        const data = await response.json();

        // 매핑
        const mappedPosts = data.map((post: any) => ({
          id: post.id,
          title: post.title,
          content: post.content,
          date: new Date(post.createdAt).toLocaleDateString(),
          likes: 0,
          comments: 0,
          category: post.category,
          recentComments: [] // 댓글 기능 미구현
        }));

        setPosts(mappedPosts);
      } catch (error) {
        console.error("Error fetching my posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyPosts();
  }, []);
  
  // 카테고리 필터링 + 확장 여부에 따른 필터링
  const filteredByCategory = selectedCategory === "All" 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);
    
  // 보여줄 게시글 필터링
  const displayedPosts = isExpanded ? filteredByCategory : filteredByCategory.slice(0, 6);
  
    return (
      <main className="md:col-span-8 lg:col-span-9">
        {/* 카테고리 탭 */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors
                ${selectedCategory === cat 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-700"
                }`}
            >
              {cat === "All" ? "전체" : cat}
            </button>
          ))}
        </div>
  
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            {selectedCategory === "All" ? "전체 글" : selectedCategory}
            <span className="text-sm font-normal text-gray-500 bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
              {filteredByCategory.length}
            </span>
          </h3>
  
          
          <div className="flex items-center gap-3">
            <Link 
              href="/board/write"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Edit className="w-4 h-4" />
              글쓰기
            </Link>
          </div>
        </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence>
          {displayedPosts.map((post) => (
            <motion.div
              key={post.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="group relative border border-transparent hover:border-gray-200 dark:hover:border-zinc-800 rounded-xl hover:shadow-md transition-all flex flex-col justify-between min-h-[180px] hover:z-50"
            >
              <div className="p-5 flex flex-col h-full justify-between z-10 relative bg-white dark:bg-zinc-900 rounded-xl">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs text-gray-400">{post.date}</span>
                    {/* 관리 모드일 때 수정/삭제 버튼 노출 */}
                    {isExpanded && (
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity relative z-30">
                        <button className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded">
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 rounded">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                <Link href={`/board/${post.id}`} className="block">
                  <h4 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors cursor-pointer relative z-10">
                    {post.title}
                  </h4>
                </Link>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                  {post.content}
                </p>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4" /> {post.likes}
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" /> {post.comments}
                </span>
                
                {!isExpanded && (
                   <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                     <MoreHorizontal className="w-5 h-5" />
                   </div>
                )}
              </div>
              </div>

              {/* 댓글 사이드 팝업 (왼쪽에 표시) */}
              <div className="absolute top-0 right-full mr-3 w-72 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-xl p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 pointer-events-none group-hover:pointer-events-auto z-50 hidden md:block">
                <div className="absolute top-6 -right-1.5 w-3 h-3 bg-white dark:bg-zinc-900 border-t border-r border-gray-200 dark:border-zinc-800 rotate-45" />
                
                <div className="flex items-center gap-2 mb-3 text-primary text-xs font-bold uppercase tracking-wider border-b border-gray-100 dark:border-zinc-800 pb-2">
                  <MessageSquare className="w-3 h-3" />
                  최신 댓글
                </div>
                <div className="space-y-3 max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-zinc-700 pr-1">
                  {post.recentComments.map((comment, idx) => (
                    <div key={idx} className="text-sm border-b border-gray-50 dark:border-zinc-800/50 pb-2 last:border-0 pl-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                        <span className="font-bold text-xs text-gray-900 dark:text-gray-200">
                          {comment.user}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed pl-3.5">
                        {comment.text}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-2 text-center border-t border-gray-100 dark:border-zinc-800">
                  <Link href={`/board/${post.id}`} className="text-[10px] text-gray-400 font-medium hover:text-primary transition-colors block py-1">
                    전체 내용 보기 ({post.comments}개)
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 확장 버튼 */}
      {filteredByCategory.length > 6 && (
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
