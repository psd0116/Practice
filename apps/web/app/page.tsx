import { HeroSection } from "../components/home/hero-section";
import { ActionButtons } from "../components/home/action-buttons";
import { StarryBackground } from "../components/home/starry-background";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] text-center space-y-6 relative">
      <StarryBackground />
      <div className="z-10 flex flex-col items-center justify-center space-y-6">
          <HeroSection />
      <ActionButtons />
      
      <div className="pt-10 font-mono text-sm text-gray-400">
        <p>printf("Hello, Void world!\\n");</p>
      </div>
      </div>
    </div>
  );
}