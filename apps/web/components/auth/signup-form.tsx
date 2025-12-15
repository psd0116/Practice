"use client"; // 브라우저에서 동작하는 코드 필수

import { useState } from "react";
import Link from "next/link";

export function SignupForm() {
  // 1. 상태 변수 (C언어의 변수 선언)
  const [name, setName] = useState("");       // 이름
  const [email, setEmail] = useState("");     // 이메일
  const [password, setPassword] = useState(""); // 비밀번호

  // 2. 가입 버튼 클릭 시 실행될 함수
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 새로고침 방지
    
    // 나중에 백엔드 API로 보낼 데이터 확인용
    console.log("회원가입 데이터:", { name, email, password });
    alert(`환영합니다, ${name}님! 회원가입 요청을 보냈습니다.`);
  };

  return (
    <div className="w-full max-w-sm space-y-8">
      <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">회원가입</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Void* 커뮤니티의 일원이 되어보세요
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            
            {/* 이름 입력 (추가된 부분) */}
            <div>
              <label htmlFor="name" className="sr-only">이름</label>
              <input
                id="name"
                name="name"
                type="text"
                required
              className="relative block w-full rounded-md border-0 py-3 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-black dark:bg-gray-900 dark:text-white dark:ring-gray-700 sm:text-sm sm:leading-6"
                placeholder="사용자 이름 (닉네임)"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* 이메일 입력 */}
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

            {/* 비밀번호 입력 */}
            <div>
              <label htmlFor="password" className="sr-only">비밀번호</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="relative block w-full rounded-md border-0 py-3 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-black dark:bg-gray-900 dark:text-white dark:ring-gray-700 sm:text-sm sm:leading-6"
                placeholder="비밀번호 (8자 이상)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-black px-3 py-3 text-sm font-semibold text-white hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              가입하기
            </button>
          </div>
        </form>

        <div className="text-center text-sm">
          <Link href="/login" className="font-medium text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
            이미 계정이 있으신가요? 로그인
          </Link>
        </div>

    </div>
  );
}