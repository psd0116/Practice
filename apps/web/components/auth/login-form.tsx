"use client"; // 중요: 기능(알맹이)이니까 브라우저에서 동작해야 함

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";

export function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // 1. 백엔드에 로그인 요청 보내기
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // 2. 응답 확인
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "로그인에 실패했습니다.");
      }

      // 3. 성공 시 토큰 저장 및 로그인 처리
      const data = await response.json();
      localStorage.setItem("access_token", data.access_token);
      // login 함수에 이메일, 이름, 프로필 이미지 전달
      login(data.user.id, data.user.email, data.user.username, data.user.profileImage);
    } catch (err: any) {
      setError(err.message || "로그인 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 rounded-2xl glass space-y-8 relative overflow-hidden">
        {/* Subtle inner glow */}
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-white/20 to-transparent" />
        
        <div className="text-center relative z-10">
        <h2 className="text-3xl font-bold tracking-tight">로그인</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Void* 계정으로 계속하기
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4 rounded-md shadow-sm">
          <div>
            <label htmlFor="email" className="sr-only">이메일</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="relative block w-full rounded-xl border-0 py-3 px-4 text-gray-900 bg-white/40 dark:bg-black/20 backdrop-blur-sm ring-1 ring-inset ring-gray-300/50 placeholder:text-gray-500 focus:z-10 focus:ring-2 focus:ring-black dark:text-white dark:ring-white/10 dark:focus:ring-white sm:text-sm sm:leading-6 transition-all"
              placeholder="이메일 주소"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">비밀번호</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="relative block w-full rounded-xl border-0 py-3 px-4 text-gray-900 bg-white/40 dark:bg-black/20 backdrop-blur-sm ring-1 ring-inset ring-gray-300/50 placeholder:text-gray-500 focus:z-10 focus:ring-2 focus:ring-black dark:text-white dark:ring-white/10 dark:focus:ring-white sm:text-sm sm:leading-6 transition-all"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {/* 에러 메시지 표시 */}
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <div className="relative z-10">
          <button
            type="submit"
            disabled={isLoading}
            className="group relative flex w-full justify-center rounded-xl bg-black px-3 py-3 text-sm font-semibold text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 disabled:opacity-50 transition-all shadow-lg hover:shadow-black/20 dark:hover:shadow-white/20"
          >
            {isLoading ? "로그인 중..." : "로그인"}
          </button>
        </div>
      </form>

      <div className="text-center text-sm relative z-10">
        <Link href="/signup" className="font-medium text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
          계정이 없으신가요? 회원가입
        </Link>
      </div>
    </div>
  </div>
  );
}