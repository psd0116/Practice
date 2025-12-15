"use client"; // 중요: 기능(알맹이)이니까 브라우저에서 동작해야 함

import { useState } from "react";
import Link from "next/link";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("로그인 시도:", email, password);
    alert(`로그인 시도!\nID: ${email}\nPW: ${password}`);
  };

  return (
    <div className="w-full max-w-sm space-y-8">
      <div className="text-center">
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
              className="relative block w-full rounded-md border-0 py-3 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-black dark:bg-gray-900 dark:text-white dark:ring-gray-700 sm:text-sm sm:leading-6"
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
              className="relative block w-full rounded-md border-0 py-3 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-black dark:bg-gray-900 dark:text-white dark:ring-gray-700 sm:text-sm sm:leading-6"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md bg-black px-3 py-3 text-sm font-semibold text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            로그인
          </button>
        </div>
      </form>

      <div className="text-center text-sm">
        <Link href="/signup" className="font-medium text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
          계정이 없으신가요? 회원가입
        </Link>
      </div>
    </div>
  );
}