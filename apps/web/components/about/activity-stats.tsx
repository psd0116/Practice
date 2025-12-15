"use client";

import { motion } from "framer-motion";
import { FileText, Heart, MessageCircle, Calendar, Activity } from "lucide-react";

// 활동 통계 데이터
const stats = [
  { label: "Post", value: "24", icon: FileText },
  { label: "Like", value: "156", icon: Heart },
  { label: "Comment", value: "89", icon: MessageCircle },
  { label: "Days", value: "45", icon: Calendar },
];

export function ActivityStats() {
  const getContributionColor = (level: number) => {
    // 흑백 모노톤 + 포인트 컬러
    const colors = [
      "bg-muted",
      "bg-zinc-300 dark:bg-zinc-700",
      "bg-zinc-400 dark:bg-zinc-600",
      "bg-zinc-500 dark:bg-zinc-500",
      "bg-zinc-600 dark:bg-zinc-400",
    ];
    return colors[level];
  };

  return (
    <div className="h-full flex flex-col justify-center">
      <div className="mb-8">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-end gap-2 mb-2 text-primary"
        >
          <Activity className="w-6 h-6" />
          <span className="text-sm font-medium tracking-wider uppercase">Activity</span>
        </motion.div>
        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-right">
          활동 통계
        </h2>
        <p className="text-muted-foreground text-lg text-right">
            꾸준한 활동으로 커뮤니티와 함께 성장하고 있습니다.
        </p>
      </div>

      {/* 통계 그리드 */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="p-6 rounded-none border border-border bg-background hover:bg-muted/30 transition-colors flex flex-col items-center justify-center gap-2 aspect-[4/3]"
          >
            <stat.icon className="w-8 h-8 text-muted-foreground stroke-[1.5]" />
            <div className="text-4xl font-bold tracking-tighter">{stat.value}</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
