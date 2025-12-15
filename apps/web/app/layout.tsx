import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { SiteLayout } from "@/components/site-layout";

export const metadata: Metadata = {
  title: "Void*",
  description: "Anything can be here.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col">
        {/* 다크모드 기본값(defaultTheme)을 'dark'로 설정하면 Void 컨셉에 더 잘 어울립니다. */}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          
          <SiteLayout>
            {children}
          </SiteLayout>
          
        </ThemeProvider>
      </body>
    </html>
  );
}