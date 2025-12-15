import { HeroSection } from "../components/home/hero-section";
import { ActionButtons } from "../components/home/action-buttons";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <HeroSection />
      <ActionButtons />
      
      <div className="pt-10 font-mono text-sm text-gray-400">
        <p>printf("Hello, Void world!\\n");</p>
      </div>
    </div>
  );
}