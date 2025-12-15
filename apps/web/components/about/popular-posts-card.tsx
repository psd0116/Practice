"use client";

import { motion } from "framer-motion";
import { Heart, MessageSquare, ArrowRight, TrendingUp } from "lucide-react";

const popularPosts = [
  { id: 1, title: "첫 번째 인기 게시글입니다", likes: 42, comments: 15 },
  { id: 2, title: "많은 분들이 좋아해주신 글", likes: 38, comments: 12 },
  { id: 3, title: "개발 팁을 공유합니다", likes: 35, comments: 8 },
  { id: 4, title: "Void* 커뮤니티 활용법", likes: 28, comments: 6 },
];

export function PopularPostsCard() {
  return (
    <div className="h-full flex flex-col justify-center">
      <div className="mb-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-2 text-primary"
        >
          <TrendingUp className="w-6 h-6" />
          <span className="text-sm font-medium tracking-wider uppercase">Trending</span>
        </motion.div>
        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
          인기 게시글
        </h2>
        <p className="text-muted-foreground text-lg">
          지금 커뮤니티에서 가장 뜨거운 반응을 얻고 있는 이야기들입니다.
        </p>
      </div>

      <div className="space-y-4">
        {popularPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group flex items-center gap-6 p-4 border-b border-border hover:border-foreground/50 transition-colors duration-300 cursor-pointer"
          >
            <span className="text-4xl font-light text-muted-foreground/30 group-hover:text-foreground/80 transition-colors">
              0{index + 1}
            </span>

            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-medium truncate group-hover:translate-x-1 transition-transform duration-300">
                {post.title}
              </h3>
              <div className="flex gap-4 text-sm text-muted-foreground mt-2">
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4" /> {post.likes}
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" /> {post.comments}
                </span>
              </div>
            </div>

            <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
