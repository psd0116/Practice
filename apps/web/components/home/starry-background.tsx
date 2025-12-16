"use client";

import { useEffect, useState } from "react";

// 랜덤 숫자 생성 헬퍼
const random = (min: number, max: number) => Math.random() * (max - min) + min;

export function StarryBackground() {
  const [stars, setStars] = useState<{ id: number; top: string; left: string; size: number; duration: number; delay: number; opacity: number }[]>([]);

  useEffect(() => {
    const starCount = 70; // 별 개수 증가
    const newStars = Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      top: `${random(0, 100)}%`,
      left: `${random(0, 100)}%`,
      size: random(1, 3), // 크기 다양화
      duration: random(10, 30), // 이동 속도 다양화 (s)
      delay: random(0, 5),
      opacity: random(0.3, 1),
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none bg-black/5 dark:bg-black/20">
      {/* 배경 그라데이션 */}
      <div className="absolute inset-0 bg-linear-to-tr from-indigo-900/20 via-black/0 to-purple-900/20 opacity-50" />

      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-black dark:bg-white shadow-[0_0_2px_rgba(255,255,255,0.8)]"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `moveUp ${star.duration}s linear infinite, pulse ${star.duration / 2}s ease-in-out infinite alternate`,
            animationDelay: `-${star.delay}s`, // 음수 delay로 미리 시작된 것처럼
          }}
        />
      ))}
    </div>
  );
}
