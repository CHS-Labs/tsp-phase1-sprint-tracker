import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative h-96 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/CHS Credibility Spine background.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-br from-[#E98A24]/90 via-[#E98A24]/60 to-[#1A9CD7]/40 z-10" />

      <div
        className={`relative z-20 h-full flex flex-col justify-center px-12 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-4xl">
          <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
            Architecture Hardening & Validation Sprint
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Phase 1 Extension: 60-Day Sprint
          </p>
          <div className="flex items-center gap-8 text-white">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#E98A24] rounded-full animate-pulse" />
              <span className="text-lg">March 1 – April 30, 2026</span>
            </div>
            <div className="h-8 w-px bg-gray-600" />
            <p className="text-lg">
              Building resilient, secure, and scalable systems
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
