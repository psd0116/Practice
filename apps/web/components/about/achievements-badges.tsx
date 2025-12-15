"use client";

import { motion } from "framer-motion";
import { Trophy, Award, Star, Flame, MessageCircle, Crown, Clock, Map, Zap } from "lucide-react";

// 뱃지 데이터
const badges = [
  { id: 1, name: "First Post", icon: Star, description: "첫 번째 게시글 작성", earned: true },
  { id: 2, name: "Top Writer", icon: Award, description: "좋아요 100개 달성", earned: true },
  { id: 3, name: "Active", icon: Flame, description: "30일 연속 활동", earned: true },
  { id: 4, name: "Talker", icon: MessageCircle, description: "댓글 50개 작성", earned: true },
  { id: 5, name: "Legend", icon: Crown, description: "좋아요 1000개 달성", earned: false },
  { id: 6, name: "1 Year", icon: Clock, description: "가입 1주년 달성", earned: false },
  { id: 7, name: "Explorer", icon: Map, description: "모든 카테고리 방문", earned: false },
  { id: 8, name: "Master", icon: Trophy, description: "전체 업적 달성", earned: false },
];

export function AchievementsBadges() {
  const earnedCount = badges.filter((b) => b.earned).length;
  const progress = Math.round((earnedCount / badges.length) * 100);

  return (
    <div className="h-full flex flex-col justify-center">
      <div className="mb-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-2 text-primary"
        >
          <Zap className="w-6 h-6" />
          <span className="text-sm font-medium tracking-wider uppercase">Achievements</span>
        </motion.div>
        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
          업적 및 뱃지
        </h2>
        <p className="text-muted-foreground text-lg">
          커뮤니티에서의 성과를 증명하는 특별한 징표들입니다.
        </p>
      </div>

      {/* 진행 바 */}
      <div className="mb-8 p-6 border border-border bg-background">
        <div className="flex justify-between text-sm mb-4 uppercase tracking-wider">
          <span>Total Progress</span>
          <span className="font-bold">{progress}%</span>
        </div>
        <div className="h-1 bg-muted w-full">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "circOut" }}
            className="h-full bg-primary"
          />
        </div>
      </div>

      {/* 뱃지 그리드 */}
      <div className="grid grid-cols-4 gap-4">
        {badges.map((badge, index) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            viewport={{ once: true }}
            className={`
              group relative aspect-square flex flex-col items-center justify-center p-2
              border transition-all duration-300
              ${
                badge.earned
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border/50 text-muted-foreground bg-muted/10 opacity-50"
              }
            `}
          >
            <badge.icon className={`w-8 h-8 mb-2 ${badge.earned ? "stroke-[1.5]" : "stroke-[1]"}`} />
            
            <span className="text-[10px] uppercase tracking-wider text-center font-medium">
              {badge.name}
            </span>

            {/* 툴팁 */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-foreground text-background text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
              {badge.description}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
