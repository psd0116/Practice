"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, X, Camera, Save } from "lucide-react";
import { useAuth } from "@/context/auth-context";

export default function ProfileEditPage() {
  const router = useRouter();
  const { user } = useAuth();
  
  // Mock Stats
  const [nickname, setNickname] = useState(user?.name || "User");
  const [email] = useState(user?.email || "user@example.com");
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");

  // Load categories from localStorage
  useEffect(() => {
    const savedCategories = localStorage.getItem("void_categories");
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    } else {
      // Default initial categories
      setCategories(["Daily", "Dev", "Thoughts"]);
    }
  }, []);

  // Save categories to localStorage
  const saveCategories = (cats: string[]) => {
    setCategories(cats);
    localStorage.setItem("void_categories", JSON.stringify(cats));
  };

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    if (categories.includes(newCategory.trim())) return;
    
    const updated = [...categories, newCategory.trim()];
    saveCategories(updated);
    setNewCategory("");
  };

  const handleDeleteCategory = (catToDelete: string) => {
    const updated = categories.filter(c => c !== catToDelete);
    saveCategories(updated);
  };

  const handleSaveProfile = async () => {
    // Mock save
    await new Promise(resolve => setTimeout(resolve, 500));
    router.push("/board");
  };

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          게시판으로
        </button>
        <h1 className="text-2xl font-bold">프로필 수정</h1>
      </div>

      <div className="space-y-8">
        {/* Profile Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold border-b border-border pb-2">계정 설정</h2>
          
          <div className="flex items-center gap-6">
            <div className="relative group cursor-pointer">
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-transparent group-hover:border-primary transition-colors">
                <span className="text-4xl">🐱</span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-muted-foreground">닉네임</label>
                <input 
                  type="text" 
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full bg-muted/30 border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-muted-foreground">이메일</label>
                <input 
                  type="email" 
                  value={email}
                  disabled
                  className="w-full bg-muted/10 border border-border rounded-lg px-4 py-2 text-muted-foreground cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold border-b border-border pb-2">나의 카테고리</h2>
          <p className="text-sm text-muted-foreground">
            게시글 분류를 위한 나만의 카테고리를 만들어보세요. 게시판의 탭으로 생성됩니다.
          </p>

          <div className="flex gap-2">
            <input 
              type="text" 
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
              placeholder="새 카테고리 이름..."
              className="flex-1 bg-muted/30 border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary transition-colors"
            />
            <button 
              onClick={handleAddCategory}
              disabled={!newCategory.trim()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {categories.map((cat) => (
              <div key={cat} className="group flex items-center gap-2 pl-3 pr-2 py-1.5 bg-muted/50 rounded-full border border-border">
                <span className="text-sm font-medium">{cat}</span>
                <button 
                  onClick={() => handleDeleteCategory(cat)}
                  className="p-0.5 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 text-muted-foreground hover:text-red-500 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            {categories.length === 0 && (
              <span className="text-sm text-muted-foreground italic py-2">아직 카테고리가 없습니다. 추가해보세요!</span>
            )}
          </div>
        </section>

        <div className="pt-8 flex justify-end">
          <button 
            onClick={handleSaveProfile}
            className="flex items-center gap-2 px-8 py-3 rounded-full bg-foreground text-background font-bold hover:opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Save className="w-4 h-4" />
            변경사항 저장
          </button>
        </div>
      </div>
    </div>
  );
}
