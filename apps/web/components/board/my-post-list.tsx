"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MessageSquare, Heart, MoreHorizontal, Edit, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// 더미 게시글 데이터 (댓글 데이터 + 카테고리 추가)
const MY_POSTS = [
  { 
    id: 1, 
    title: "Void* 커뮤니티 오픈 소식", 
    content: "드디어 Void* 커뮤니티가 오픈했습니다. 많은 관심 부탁드립니다.", 
    date: "2025.06.01", 
    likes: 42, 
    comments: 12,
    category: "Notices",
    recentComments: [
      { user: "user1", text: "오픈 축하드립니다! 🎉" },
      { user: "dev_king", text: "디자인이 정말 멋지네요." },
      { user: "newbie", text: "앞으로 자주 이용하겠습니다." }
    ]
  },
  { 
    id: 2, 
    title: "Next.js 15 마이그레이션 후기", 
    content: "App Router로 전환하면서 겪었던 시행착오들을 공유합니다.", 
    date: "2025.05.28", 
    likes: 35, 
    comments: 8,
    category: "Dev",
    recentComments: [
      { user: "frontend_wiz", text: "좋은 정보 감사합니다." },
      { user: "react_lover", text: "서버 컴포넌트 어렵네요 ㅠㅠ" },
      { user: "nextjs_fan", text: "혹시 문서 링크 공유 가능할까요?" }
    ]
  },
  { 
    id: 3, 
    title: "효율적인 상태 관리를 위한 전략", 
    content: "Context API와 Zustand를 비교해보았습니다.", 
    date: "2025.05.25", 
    likes: 28, 
    comments: 15,
    category: "Dev",
    recentComments: [
      { user: "redux_hater", text: "Zustand가 최고죠" },
      { user: "context_api", text: "간단한건 Context로 충분함" },
      { user: "state_master", text: "Jotai도 한번 써보세요" }
    ]
  },
  { 
    id: 4, 
    title: "모던 웹 디자인 트렌드 분석", 
    content: "2025년 주목해야 할 UI/UX 트렌드는 무엇일까요?", 
    date: "2025.05.20", 
    likes: 55, 
    comments: 20,
    category: "Design",
    recentComments: [
      { user: "designer_kim", text: "글래스모피즘은 이제 끝났나요?" },
      { user: "ui_ux", text: "미니멀리즘이 다시 대세인 듯" },
      { user: "trend_watch", text: "잘 읽었습니다!" }
    ]
  },
  { 
    id: 5, 
    title: "TypeScript 꿀팁 모음", 
    content: "자주 사용하는 유틸리티 타입 5가지를 소개합니다.", 
    date: "2025.05.15", 
    likes: 19, 
    comments: 4,
    category: "Dev",
    recentComments: [
      { user: "ts_beginner", text: "Omit 타입 유용하네요" },
      { user: "any_script", text: "전 그냥 any 씁니다 ㅋㅋ" },
      { user: "senior_dev", text: "제네릭 설명도 부탁드려요" }
    ]
  },
  { 
    id: 6, 
    title: "개발자 점심 메뉴 추천 봇 만들기", 
    content: "Python으로 간단하게 크롤링 봇을 만들어봅시다.", 
    date: "2025.05.10", 
    likes: 62, 
    comments: 30,
    category: "Daily",
    recentComments: [
      { user: "hungry_dev", text: "오늘 점심 뭐 먹지..." },
      { user: "bot_maker", text: "슬랙 연동도 되나요?" },
      { user: "lunch_time", text: "코드 공유 감사합니다" }
    ]
  },
  { 
    id: 7, 
    title: "숨겨진 일상의 발견", 
    content: "가끔은 코딩에서 벗어나 산책을 즐겨보세요.", 
    date: "2025.05.05", 
    likes: 10, 
    comments: 2,
    category: "Daily",
    recentComments: [
      { user: "walker", text: "산책하니 머리가 맑아지네요" },
      { user: "nature", text: "사진 멋집니다" },
      { user: "coding_machine", text: "전 코딩이 쉬는 건데요?" }
    ]
  },
  { 
    id: 8, 
    title: "새벽 코딩의 매력", 
    content: "고요한 밤에 집중력이 높아지는 이유.", 
    date: "2025.05.01", 
    likes: 45, 
    comments: 18,
    category: "Daily",
    recentComments: [
      { user: "night_owl", text: "새벽 3시가 피크죠" },
      { user: "morning_person", text: "전 아침형 인간이라..." },
      { user: "coffee_addict", text: "오늘도 밤샘 각" }
    ]
  },
];

export function MyPostList() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState<string[]>(["All", "Notices", "Dev", "Design", "Daily"]);

  // 로컬 스토리지에서 카테고리 불러오기
  useEffect(() => {
    const savedCategories = localStorage.getItem("void_categories");
    if (savedCategories) {
      const parsed = JSON.parse(savedCategories);
      setCategories(["All", ...parsed]);
    }
  }, []);
  
  // 카테고리 필터링 + 확장 여부에 따른 필터링
  const filteredByCategory = selectedCategory === "All" 
    ? MY_POSTS 
    : MY_POSTS.filter(post => post.category === selectedCategory);
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
      {MY_POSTS.length > 6 && (
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
