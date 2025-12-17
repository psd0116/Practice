import Link from "next/link";
import { AboutFeatureSection } from "../../components/about/about-feature-section";
import { PopularPostsCard } from "../../components/about/popular-posts-card";
import { ActivityStats } from "../../components/about/activity-stats"
import { StarryBackground } from "../../components/home/starry-background";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground relative">
      <StarryBackground />

      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-6 mix-blend-difference text-white">
        <div className="max-w-480 mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="text-sm font-medium tracking-widest uppercase hover:opacity-50 transition-opacity"
          >
            ← Back to Void*
          </Link>
        </div>
      </header>

      {/* 히어로 섹션 */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-4">
        <div className="max-w-4xl mx-auto text-center z-10">
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-none">
            Void<span className="text-primary">*</span>
            <br />
            ARCHIVE
          </h1>
          <p className="text-xl md:text-2xl font-light text-muted-foreground tracking-wide max-w-2xl mx-auto">
            당신만의 이야기를 기록해보세요!
          </p>
        </div>
        
        {/* 스크롤 유도 아이콘 */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 13l5 5 5-5" />
            <path d="M7 6l5 5 5-5" />
          </svg>
        </div>
      </section>

      {/* 메인 콘텐츠 */}
      <main className="px-4 pb-32">
        <div className="max-w-350 mx-auto">

          {/* 섹션 1: [이미지] - [인기 게시글] */}
          <AboutFeatureSection
            direction="left"
            imageUrl="/about/popular-posts.png"
            imageAlt="Deep Space Network"
          >
            <PopularPostsCard />
          </AboutFeatureSection>

          {/* 섹션 2: [활동 통계] - [이미지] */}
          <AboutFeatureSection
            direction="right"
            imageUrl="/about/activity-stats.png"
            imageAlt="Void Activity Stats"
          >
            <ActivityStats />
          </AboutFeatureSection>



        </div>
      </main>
      
      {/* 푸터 */}
      <footer className="py-12 border-t border-border mt-12 mb-0 text-center text-muted-foreground text-sm">
        <p>© 2025 VOID* COMMUNITY. BEYOND THE HORIZON.</p>
      </footer>
    </div>
  );
}
