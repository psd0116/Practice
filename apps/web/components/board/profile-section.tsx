"use client";

import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { useEffect, useState } from "react";

export function ProfileSection() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    postsCount: 0,
    receivedLikesCount: 0,
    receivedCommentsCount: 0,
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
            <div className="w-24 h-24 rounded-full bg-linear-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-800 mb-4 flex items-center justify-center overflow-hidden border-4 border-white dark:border-zinc-800 shadow-lg">
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
      </div>
    </aside>
  );
}
