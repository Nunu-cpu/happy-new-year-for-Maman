"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Calendar from "@/components/Calendar";

export default function Home() {
  const [snowflakes, setSnowflakes] = useState<Array<{ id: number; left: string; animationDuration: string; animationDelay: string; size: string }>>([]);
  const [clouds, setClouds] = useState<Array<{ id: number; left: string; top: string; scale: number; duration: string; delay: string }>>([]);

  useEffect(() => {
    const flakes = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      animationDuration: `${Math.random() * 3 + 2}s`,
      animationDelay: `${Math.random() * 5}s`,
      size: `${Math.random() * 8 + 4}px`,
    }));
    setSnowflakes(flakes);

    const cloudElements = Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      top: `${Math.random() * 70}vh`,
      scale: Math.random() * 1.5 + 0.5,
      duration: `${Math.random() * 30 + 30}s`,
      delay: `${Math.random() * -20}s`,
    }));
    setClouds(cloudElements);
  }, []);

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center p-4 overflow-hidden relative"
      style={{
        background: 'linear-gradient(to bottom, #bae6fd 0%, #e0f2fe 50%, #f0f9ff 100%)',
      }}
    >
      <style jsx global>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) translateX(0); opacity: 1; }
          100% { transform: translateY(110vh) translateX(20px); opacity: 0.3; }
        }
        @keyframes float {
          0% { transform: translateX(-100vw); }
          100% { transform: translateX(100vw); }
        }
        .grain::after {
          content: "";
          position: fixed;
          top: -150%;
          left: -150%;
          width: 300%;
          height: 300%;
          background-image: url("https://www.transparenttextures.com/patterns/stardust.png");
          opacity: 0.08;
          pointer-events: none;
          z-index: 100;
          animation: noise 0.2s infinite;
        }
        @keyframes noise {
          0% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -5%); }
          20% { transform: translate(-10%, 5%); }
          30% { transform: translate(5%, -10%); }
          40% { transform: translate(-5%, 15%); }
          50% { transform: translate(-10%, 5%); }
          60% { transform: translate(15%, 0); }
          70% { transform: translate(0, 10%); }
          80% { transform: translate(-15%, 0); }
          90% { transform: translate(10%, 5%); }
          100% { transform: translate(5%, 0); }
        }
      `}</style>

      {/* Noise Overlay */}
      <div className="absolute inset-0 grain pointer-events-none z-[60]" />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none z-[61] shadow-[inset_0_0_150px_rgba(0,0,0,0.05)]" />

      {/* Floating Clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {clouds.map((cloud) => (
          <div
            key={cloud.id}
            className="absolute bg-white/40 blur-3xl rounded-full"
            style={{
              left: cloud.left,
              top: cloud.top,
              width: `${200 * cloud.scale}px`,
              height: `${100 * cloud.scale}px`,
              animation: `float ${cloud.duration} linear infinite`,
              animationDelay: cloud.delay,
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      {/* Snowflakes */}
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute bg-white rounded-full pointer-events-none opacity-70 shadow-sm"
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

      <main className="flex flex-col items-center text-center gap-12 animate-in fade-in zoom-in duration-1000 z-10 w-full max-w-6xl px-4">
        <div className="relative">
          <h1 className="text-3xl md:text-4xl font-playfair font-light tracking-[0.2em] text-slate-700 opacity-90 uppercase">
            Happy new year!
          </h1>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 w-full">
          {/* 1. Tree (Left) */}
          <div className="relative group flex flex-col items-center">
            <pre className="text-green-600 font-mono text-xs md:text-sm leading-tight select-none relative">
              {\`      .   +   .  ★  .   +   .
              .    /\\    .
              +      /  \\      +
              .   /o   \\   .
              +    /  o   \\    +
              . /    o   \\ .
              +  /o    o  o \\  +
              /   o    o   \\
              /______________\\
              ||||
            ||||\`}
            </pre>
            {/* Sparkles around tree */}
            <div className="absolute inset-0 pointer-events-none text-green-400 opacity-60">
              <span className="absolute top-0 left-0 animate-pulse text-[10px]">+</span>
              <span className="absolute top-10 right-0 animate-bounce text-[10px]">*</span>
              <span className="absolute bottom-10 left-4 animate-pulse text-[10px]">.</span>
              <span className="absolute top-1/2 -right-4 animate-bounce text-[10px]">+</span>
            </div>
          </div>

          {/* 2. Calendar (Center) */}
          <div className="flex-shrink-0">
            <Calendar />
          </div>

          {/* 3. Invitation (Right) */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2 max-w-[200px]">
            <h2 className="text-xl md:text-2xl font-playfair font-light tracking-wide text-slate-800 drop-shadow-sm leading-relaxed">
              새해 파티에<br />초대합니다! ✨
            </h2>
            <p className="text-slate-400 font-serif text-[11px] tracking-tight uppercase">
              Join us in celebration
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link
            href="/guestbook"
            className="px-8 py-3 rounded-full bg-slate-800/10 hover:bg-slate-800/20 text-slate-700 font-serif border border-slate-900/10 shadow-sm transition-all hover:scale-105 active:scale-95 text-center backdrop-blur-sm"
          >
            🖋️ 방명록 작성하기
          </Link>
        </div>

        {/* Static decorations */}
        <div className="flex gap-4 text-4xl mt-8">
          <span className="animate-bounce delay-100 drop-shadow-sm opacity-60">❄️</span>
          <span className="animate-bounce delay-300 drop-shadow-sm opacity-60">☁️</span>
          <span className="animate-bounce delay-700 drop-shadow-sm opacity-60">❄️</span>
          <span className="animate-bounce delay-500 drop-shadow-sm opacity-60">☁️</span>
        </div>
      </main>
    </div>
  );
}
