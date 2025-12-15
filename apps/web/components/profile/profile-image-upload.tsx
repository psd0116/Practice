"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useAuth } from "@/context/auth-context";

export function ProfileImageUpload() {
  const { user, updateUser } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 현재 보여줄 이미지 (미리보기 우선, 없으면 유저 이미지, 없으면 기본값)
  // 여우(Fox) 스타일로 정확히 변경 (사용자 언급 반영)
  const defaultImage = "https://api.dicebear.com/9.x/collections/svg?seed=" + (user?.name || "User");
  const currentImage = preview || user?.profileImage || defaultImage;

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("이미지 크기는 2MB 이하여야 합니다.");
      return;
    }

    // 미리보기 생성
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result as string);
    };
  };

  const handleSave = async () => {
    if (!preview) {
      alert("변경할 이미지를 선택해주세요.");
      return;
    }

    setIsUploading(true);

    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      const response = await fetch("http://localhost:4000/users/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          profileImage: preview
        })
      });

      if (!response.ok) {
        throw new Error("프로필 이미지 업데이트 실패");
      }

      updateUser({ profileImage: preview });
      setPreview(null); // 저장 후 미리보기 초기화 (이제 currentImage가 user.profileImage를 바라봄)
      alert("프로필 사진이 저장되었습니다!");
      
    } catch (error) {
      console.error(error);
      alert("저장 중 오류가 발생했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setPreview(null); // 미리보기 취소
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div 
        className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-gray-100 dark:border-zinc-800 shadow-md cursor-pointer group"
        onClick={handleImageClick}
      >
        <img 
          src={currentImage} 
          alt="Profile" 
          className="w-full h-full object-cover transition-opacity group-hover:opacity-75"
        />
        
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-white font-medium">사진 변경</span>
        </div>
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*"
        onChange={handleFileChange}
      />
      
      <div className="flex gap-2">
        {preview ? (
          <>
            <button
              onClick={handleSave}
              disabled={isUploading}
              className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-full font-medium hover:opacity-80 transition disabled:opacity-50"
            >
              {isUploading ? "저장 중..." : "변경사항 저장"}
            </button>
            <button
              onClick={handleCancel}
              disabled={isUploading}
              className="px-6 py-2 rounded-full font-medium border border-gray-200 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
            >
              취소
            </button>
          </>
        ) : (
          <p className="text-sm text-gray-500 animate-pulse">
            사진을 눌러 이미지를 선택하세요
          </p>
        )}
      </div>
    </div>
  );
}
