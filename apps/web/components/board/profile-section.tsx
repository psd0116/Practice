"use client";

import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { useEffect, useState } from "react";
import { User, Users, Edit2, Heart, Sun, Moon, Bug, Zap, Ghost, Star } from "lucide-react";

export function ProfileSection() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    postsCount: 0,
    receivedLikesCount: 0,
    receivedCommentsCount: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch("http://localhost:4000/users/stats", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, [user]);

  if (!user) return null;

  return (
    <aside className="md:col-span-4 lg:col-span-3 relative z-50">
      <div className="sticky top-24 space-y-6">
        {/* 프로필 카드 */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-gray-200 dark:border-zinc-800 shadow-sm">
          <div className="flex flex-col items-center text-center">
            {/* 아바타 */}
            {/* 아바타 */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-800 mb-4 flex items-center justify-center overflow-hidden border-4 border-white dark:border-zinc-800 shadow-lg">
               <img 
                 src={user.profileImage || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + user.name}
                 alt={user.name}
                 className="w-full h-full object-cover"
               />
            </div>

            <h2 className="text-xl font-bold mb-1">{user.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{user.email}</p>

            {/* 통계 */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                <span className="block text-lg font-bold">{stats.postsCount}</span>
                <span className="text-xs text-gray-500 whitespace-nowrap">게시물</span>
              </div>
              <div className="text-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                <span className="block text-lg font-bold">{stats.receivedLikesCount}</span>
                <span className="text-xs text-gray-500 whitespace-nowrap">받은 하트</span>
              </div>
              <div className="text-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                <span className="block text-lg font-bold">{stats.receivedCommentsCount}</span>
                <span className="text-xs text-gray-500 whitespace-nowrap">받은 댓글</span>
              </div>
            </div>

            {/* 프로필 수정 버튼 */}
            <div className="mt-6 flex justify-center">
              <Link 
                href="/profile/edit"
                className="px-6 py-2 rounded-full border border-gray-200 dark:border-zinc-700 text-sm font-medium hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              >
                프로필 수정
              </Link>
            </div>
          </div>
        </div>

        {/* 활동 뱃지 (10개) */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-gray-200 dark:border-zinc-800 shadow-sm">
          <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
            활동 배지
            <span className="text-xs font-normal text-gray-500 bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
              4/10
            </span>
          </h3>
          
          <div className="grid grid-cols-5 gap-3">
            {[
              { name: "시작하는 여행자", desc: "Void* 세계에 오신 것을 환영합니다.", icon: User, earned: true, color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20" },
              { name: "첫 기록", desc: "첫 번째 글을 작성하며 여정을 시작했습니다.", icon: Edit2, earned: true, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
              { name: "소통의 시작", desc: "다른 여행자들과 소통을 시작했습니다.", icon: Users, earned: true, color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20" },
              { name: "공감 메이커", desc: "많은 사람들의 공감을 이끌어냈습니다.", icon: Heart, earned: true, color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20" },
              { name: "아침형 인간", desc: "이른 아침, 누구보다 먼저 하루를 엽니다.", icon: Sun, earned: false, color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
              { name: "새벽 감성", desc: "모두가 잠든 밤, 당신만의 시간이 흐릅니다.", icon: Moon, earned: false, color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20" },
              { name: "버그 헌터", desc: "시스템의 결함을 찾아내고 개선에 기여했습니다.", icon: Bug, earned: false, color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20" },
              { name: "트렌드 세터", desc: "당신의 글이 많은 사람들의 주목을 받았습니다.", icon: Zap, earned: false, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
              { name: "심연의 탐험가", desc: "Void의 깊은 곳까지 탐험한 진정한 모험가.", icon: Ghost, earned: false, color: "text-zinc-500", bg: "bg-zinc-500/10", border: "border-zinc-500/20" },
              { name: "유명인사", desc: "수많은 팔로워들과 함께하는 인플루언서.", icon: Star, earned: false, color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/20" },
            ].map((badge, idx) => (
              <div 
                key={idx} 
                className={`group relative flex items-center justify-center p-2 rounded-xl border transition-all duration-300 aspect-square hover:z-[100]
                  ${badge.earned 
                    ? `${badge.bg} ${badge.border} shadow-sm hover:scale-110 hover:shadow-md` 
                    : "bg-gray-50 dark:bg-zinc-900/50 border-transparent opacity-40 grayscale hover:opacity-100 hover:grayscale-0 hover:bg-gray-100 dark:hover:bg-zinc-800"
                  }`}
              >
                <badge.icon className={`w-5 h-5 transition-colors duration-300 ${badge.earned ? badge.color : "text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-400"}`} />
                
                {/* 고급 툴팁 */}
                <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-48 bg-gray-900/90 dark:bg-white/90 backdrop-blur-sm text-white dark:text-black text-xs rounded-xl p-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none z-50 shadow-xl">
                  <div className="font-bold mb-1 text-sm">{badge.name}</div>
                  <div className="leading-relaxed opacity-90 font-medium">{badge.desc}</div>
                  
                  {/* 말풍선 꼬리 */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900/90 dark:border-t-white/90" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
