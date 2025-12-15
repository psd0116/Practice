import { ProfileSidebar } from "@/components/board/profile-sidebar";
import { PostList } from "@/components/board/post-list";

export default function BoardPage() {
  return (
    // 전체 레이아웃 (12칸 그리드)
    <div className="max-w-6xl mx-auto py-8 px-4 grid grid-cols-1 md:grid-cols-12 gap-8">
      
      {/* 3칸 차지 */}
      <ProfileSidebar />

      {/* 9칸 차지 */}
      <PostList />
      
    </div>
  );
}