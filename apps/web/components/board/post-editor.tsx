"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";

interface PostEditorProps {
  initialTitle?: string;
  initialContent?: string;
  initialCategory?: string;
  isDiditing?: boolean;
  onSubmit: (title: string, content: string, category: string) => Promise<void>;
}

export function PostEditor({ 
  initialTitle = "", 
  initialContent = "", 
  initialCategory = "",
  isDiditing = false, 
  onSubmit 
}: PostEditorProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [category, setCategory] = useState(initialCategory);
  
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Load categories from localStorage
    const saved = localStorage.getItem("user_categories");
    if (saved) {
      setAvailableCategories(JSON.parse(saved));
    } else {
       // Default fallback
      setAvailableCategories(["Daily", "Dev", "Thoughts"]);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsSubmitting(true);
    await onSubmit(title, content, category);
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          뒤로가기
        </button>
        <h1 className="text-2xl font-bold">
          {isDiditing ? "글 수정" : "새 글 작성"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
           {availableCategories.length === 0 ? (
             <div className="text-sm text-muted-foreground">
               카테고리가 없습니다. 프로필 수정에서 추가해주세요.
             </div>
           ) : (
             availableCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                    category === cat
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-transparent text-muted-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {cat}
                </button>
             ))
           )}
        </div>

        <div className="space-y-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목"
            className="w-full bg-transparent text-4xl font-bold placeholder:text-muted-foreground focus:outline-none border-b border-transparent focus:border-border transition-colors pb-2"
            autoFocus
          />
        </div>

        <div className="space-y-2">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="당신의 이야기를 들려주세요..."
            className="w-full min-h-[50vh] bg-transparent text-lg leading-relaxed placeholder:text-muted-foreground focus:outline-none resize-none"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-muted transition-colors"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !title.trim() || !content.trim() || (!category && availableCategories.length !== 0)}
            className="flex items-center gap-2 px-8 py-2.5 rounded-lg bg-foreground text-background font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isDiditing ? "수정 완료" : "저장"}
          </button>
        </div>
      </form>
    </div>
  );
}
