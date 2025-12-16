"use client";

import { ProfileImageUpload } from "@/components/profile/profile-image-upload";
import Link from "next/link";
import { ChevronLeft, Plus, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";


export default function ProfileEditPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/login"); // 로그인 안했으면 쫓아내기
    }
  }, [router]);
  const { user, updateUser } = useAuth();
  
  // 폼 상태
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  // 카테고리 상태 (로컬 스토리지 사용 예시)
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);

  // 초기 데이터 로드
  useEffect(() => {
    if (user) {
      setUsername(user.name);
      setEmail(user.email);
      setProfileImage(user.profileImage || null);
    }
    
    // 카테고리 로드 (예: localStorage 'user_categories')
    const storedCats = localStorage.getItem("user_categories");
    if (storedCats) {
      setCategories(JSON.parse(storedCats));
    } else {
      setCategories(["자유", "질문", "후기"]);
    }
  }, [user]);

  // 프로필 정보 저장
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      // 변경된 내용 전송 (이미지 포함)
      const response = await fetch("http://localhost:4000/users/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          username,
          email,
          profileImage // 이미지 데이터도 함께 전송
        })
      });

      if (!response.ok) {
        throw new Error("프로필 업데이트 실패");
      }

      // Context 업데이트
      updateUser({ name: username, email, profileImage });
      alert("회원 정보가 수정되었습니다.");
    } catch (error) {
      console.error(error);
      alert("저장 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 카테고리 추가/삭제 handler
  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    if (categories.includes(newCategory.trim())) {
      alert("이미 존재하는 카테고리입니다.");
      return;
    }
    
    const nextCats = [...categories, newCategory.trim()];
    setCategories(nextCats);
    localStorage.setItem("user_categories", JSON.stringify(nextCats));
    setNewCategory("");
  };

  const handleDeleteCategory = (cat: string) => {
    const nextCats = categories.filter(c => c !== cat);
    setCategories(nextCats);
    localStorage.setItem("user_categories", JSON.stringify(nextCats));
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="mb-6">
        <Link href="/board" className="flex items-center text-sm text-gray-500 hover:text-black dark:hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          마이페이지로 돌아가기
        </Link>
      </div>

      <div className="space-y-8">
        {/* 1. 프로필 이미지 섹션 (카드 분리) */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-bold mb-6">프로필 사진</h2>
          <div className="flex flex-col items-center">
            <ProfileImageUpload 
              currentImage={profileImage}
              onImageSelected={setProfileImage}
            />
          </div>
        </div>

        {/* 2. 회원 정보 수정 섹션 */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-bold mb-6">회원 정보 수정</h2>
          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                닉네임 (Username)
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                이메일
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition"
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:opacity-80 transition disabled:opacity-50"
              >
                {isLoading ? "저장 중..." : "정보 수정 저장"}
              </button>
            </div>
          </form>
        </div>

        {/* 3. 카테고리 관리 섹션 */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-bold mb-6">카테고리 관리</h2>
          <p className="text-sm text-gray-500 mb-6">
            내 블로그/게시판에서 사용할 카테고리를 설정합니다.
          </p>

          <div className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="새 카테고리 이름"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition"
            />
            <button
              onClick={handleAddCategory}
              className="px-4 py-2 bg-gray-100 dark:bg-zinc-800 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-700 transition"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <div 
                key={cat}
                className="group flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-zinc-700 text-sm hover:border-black dark:hover:border-white transition-colors"
              >
                <span>{cat}</span>
                <button 
                  onClick={() => handleDeleteCategory(cat)}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            
            {categories.length === 0 && (
              <p className="text-sm text-gray-400 py-4">
                등록된 카테고리가 없습니다.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
