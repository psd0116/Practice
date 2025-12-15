import Link from "next/link";

const MOCK_MY_POSTS = [
  {
    id: 1,
    title: "void-board-project",
    summary: "Next.js 15와 NestJS로 구축하는 개발자 커뮤니티 Void*의 소스코드입니다.",
    category: "TypeScript",
    categoryColor: "bg-blue-500",
    author: "psd0116",
    createdAt: "2025-05-20",
    viewCount: 120,
    commentCount: 5,
    isPublic: true,
  },
  {
    id: 2,
    title: "c-lang-pointer-study",
    summary: "어려운 C언어 포인터 개념을 그림으로 정리한 학습 노트 레포지토리.",
    category: "C",
    categoryColor: "bg-gray-500",
    author: "psd0116",
    createdAt: "2025-05-19",
    viewCount: 45,
    commentCount: 2,
    isPublic: true,
  },
  {
    id: 3,
    title: "lunch-recommendation-bot",
    summary: "판교 직장인을 위한 점심 메뉴 추천 랜덤 룰렛 봇 (Python)",
    category: "Python",
    categoryColor: "bg-yellow-500",
    author: "psd0116",
    createdAt: "2025-05-18",
    viewCount: 12,
    commentCount: 0,
    isPublic: true,
  },
  {
    id: 4,
    title: "malloc-lab-implementation",
    summary: "시스템 프로그래밍 malloc lab 과제 구현물 (Best Fit 알고리즘 적용)",
    category: "C",
    categoryColor: "bg-gray-500",
    author: "psd0116",
    createdAt: "2025-05-15",
    viewCount: 88,
    commentCount: 10,
    isPublic: false,
  },
  {
    id: 5,
    title: "my-vimrc-settings",
    summary: "생산성을 200% 올려주는 저만의 vim 설정 파일 모음입니다.",
    category: "Vim Script",
    categoryColor: "bg-green-500",
    author: "psd0116",
    createdAt: "2025-05-10",
    viewCount: 230,
    commentCount: 15,
    isPublic: true,
  },
  {
    id: 6,
    title: "algorithm-study-2025",
    summary: "매일 한 문제씩 푸는 알고리즘 문제 풀이 (백준, 프로그래머스)",
    category: "C++",
    categoryColor: "bg-red-500",
    author: "psd0116",
    createdAt: "2025-05-01",
    viewCount: 5,
    commentCount: 1,
    isPublic: true,
  },
];

export function PostList() {
  return (
    // 부모 그리드(12칸) 중 9칸 차지 (md:col-span-9)
    <main className="md:col-span-9">
      
      {/* 헤더 */}
      <div className="flex justify-between items-end mb-4">
        <h3 className="text-base font-medium text-gray-900 dark:text-gray-200">
          Popular posts
        </h3>
        <span className="text-xs text-gray-500 hover:text-blue-500 cursor-pointer">
          Customize your pins
        </span>
      </div>

      {/* 리스트 (2열 그리드) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {MOCK_MY_POSTS.slice(0, 6).map((post) => (
          <div 
            key={post.id} 
            className="border border-gray-200 dark:border-[#30363d] rounded-md p-4 bg-white dark:bg-[#0d1117] flex flex-col justify-between h-[140px]"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <Link href={`/board/${post.id}`} className="text-blue-500 hover:underline font-bold text-sm truncate pr-2">
                  {post.title}
                </Link>
                <span className="text-[10px] text-gray-500 border border-gray-200 dark:border-[#30363d] rounded-full px-2 py-0.5 shrink-0">
                  {post.isPublic ? "Public" : "Private"}
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                {post.summary}
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mt-auto">
              <span className="flex items-center gap-1.5">
                <span className={`w-3 h-3 rounded-full ${post.categoryColor}`}></span>
                {post.category}
              </span>
               {post.viewCount > 0 && (
                 <span className="flex items-center gap-1 hover:text-blue-500 cursor-pointer">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M8 1.5c-3.22 0-6.07 1.83-7.58 4.86a.857.857 0 0 0 0 .68c1.51 3.03 4.36 4.86 7.58 4.86s6.07-1.83 7.58-4.86a.857.857 0 0 0 0-.68c-1.51-3.03-4.36-4.86-7.58-4.86ZM1 6.5C2.33 3.57 4.95 2 8 2s5.67 1.57 7 4.5C13.67 9.43 11.05 11 8 11S2.33 9.43 1 6.5Zm7 3.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8 4a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"></path></svg>
                    {post.viewCount}
                </span>
               )}
              {post.commentCount > 0 && (
                <span className="flex items-center gap-1 hover:text-blue-500 cursor-pointer">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0 1 13.25 12H9.06l-2.573 2.573A1.458 1.458 0 0 1 4 13.543V12H2.75A1.75 1.75 0 0 1 1 10.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.75.75 0 0 1 .53-.22h4.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg>
                    {post.commentCount}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}