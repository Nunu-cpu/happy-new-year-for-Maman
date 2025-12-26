"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  // Use state to ensure snowflakes are only rendered on the client to avoid hydration mismatch
  const [snowflakes, setSnowflakes] = useState<Array<{ id: number; left: string; animationDuration: string; animationDelay: string; size: string }>>([]);

  useEffect(() => {
    // Generate snowflakes only on client to match hydration
    const flakes = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      animationDuration: `${Math.random() * 3 + 2}s`,
      animationDelay: `${Math.random() * 5}s`,
      size: `${Math.random() * 8 + 4}px`,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center p-4 overflow-hidden relative"
      style={{ background: 'linear-gradient(135deg, #c73e1d 0%, #d4a373 50%, #e8c4a0 100%)' }}
    >
      <style jsx global>{`
        @keyframes fall {
          0% {
            transform: translateY(-10vh) translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) translateX(20px);
            opacity: 0.3;
          }
        }
      `}</style>

      {/* Snowflakes */}
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute bg-white rounded-full pointer-events-none opacity-90 shadow-sm"
          style={{
            left: flake.left,
            top: '-20px',
            width: flake.size,
            height: flake.size,
            animation: `fall ${flake.animationDuration} linear infinite`,
            animationDelay: flake.animationDelay,
            zIndex: 50,
            filter: 'blur(0.5px)',
          }}
        />
      ))}

      <main className="flex flex-col items-center text-center gap-6 animate-in fade-in zoom-in duration-1000 z-10">
        <div className="relative">
          <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-widest text-[#f0f0f0] drop-shadow-md">
            Happy new year!
          </h1>
        </div>

        <p className="text-lg md:text-xl font-light text-white/90 tracking-wide font-serif">
          선물은 카봇! 🎄
        </p>

        <pre className="text-green-600 font-mono text-sm md:text-base leading-tight select-none">
          {`        ★
       /\\
      /  \\
     /o   \\
    /  o   \\
   /    o   \\
  /o    o  o \\
 /   o    o   \\
/______________\\
      ||||
      ||||`}
        </pre>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link
            href="/calendar"
            className="px-8 py-3 rounded-full bg-green-800 hover:bg-green-700 text-white font-serif border border-white/20 shadow-lg transition-all hover:scale-105 active:scale-95 text-center"
          >
            📅 달력 보기
          </Link>
          <Link
            href="/guestbook"
            className="px-8 py-3 rounded-full bg-[#d4a373] hover:bg-[#c49363] text-white font-serif border border-white/20 shadow-lg transition-all hover:scale-105 active:scale-95 text-center"
          >
            🖋️ 방명록 작성하기
          </Link>
        </div>

        {/* Static decorations */}
        <div className="flex gap-4 text-4xl mt-8">
          <span className="animate-bounce delay-100 drop-shadow-sm">❄️</span>
          <span className="animate-bounce delay-300 drop-shadow-sm">🎅</span>
          <span className="animate-bounce delay-700 drop-shadow-sm">❄️</span>
          <span className="animate-bounce delay-500 drop-shadow-sm">❄️</span>
        </div>
      </main>
    </div>
  );
}
