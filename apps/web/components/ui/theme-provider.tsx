"use client"; // 클라이언트 기능 필수

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// C++ 템플릿처럼 타입을 그대로 통과시켜주는 래퍼(Wrapper) 함수입니다.
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}