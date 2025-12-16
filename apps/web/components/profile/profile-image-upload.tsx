"use client";


import { useState, useRef } from "react";

export function ProfileImageUpload({ 
  currentImage, 
  onImageSelected 
}: { 
  currentImage: string | null, 
  onImageSelected: (base64: string) => void 
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

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

    // 미리보기 생성 및 상위 전달
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      onImageSelected(result);
    };
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div 
        className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-gray-100 dark:border-zinc-800 shadow-md cursor-pointer group"
        onClick={handleImageClick}
      >
        <img 
          src={currentImage || "https://api.dicebear.com/9.x/collections/svg?seed=User"} 
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
      
      <p className="text-sm text-gray-400">
        클릭하여 이미지 변경 (2MB 이하)
      </p>
    </div>
  );
}
