"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [clouds, setClouds] = useState<Array<{ id: number; left: string; top: string; scale: number; duration: string; delay: string }>>([]);

  useEffect(() => {
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
        }
      `}</style>

      <div className="grain" />

      {/* Clouds */}
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className="absolute text-white/40 pointer-events-none select-none"
          style={{
            left: cloud.left,
            top: cloud.top,
            transform: `scale(${cloud.scale})`,
            animation: `float ${cloud.duration} linear infinite`,
            animationDelay: cloud.delay,
            zIndex: 1,
            fontSize: '40px'
          }}
        >
          ☁️
        </div>
      ))}

      <main className="flex flex-col items-center text-center gap-16 animate-in fade-in zoom-in duration-1000 z-10 w-full max-w-4xl px-4">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-playfair font-light tracking-tight text-white drop-shadow-md">
            Portfolio
          </h1>
          <p className="text-slate-600 font-serif italic text-lg md:text-xl opacity-80">
            Creative Developer & Designer
          </p>
        </div>

        <nav className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
          {[
            { label: 'About', sub: 'The Story', icon: '👤', color: 'bg-white/10' },
            { label: 'Projects', sub: 'The Work', icon: '🚀', color: 'bg-white/15' },
            { label: 'Experience', sub: 'The Journey', icon: '💼', color: 'bg-white/10' },
            { label: 'Contact', sub: 'The Link', icon: '✉️', color: 'bg-white/5' }
          ].map((item) => (
            <button
              key={item.label}
              className={`group relative flex flex-col items-center justify-center p-10 ${item.color} backdrop-blur-lg rounded-[2.5rem] border border-white/30 shadow-2xl transition-all hover:bg-white/30 hover:scale-105 active:scale-95 text-slate-800`}
            >
              <span className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">{item.icon}</span>
              <span className="text-2xl font-playfair font-bold tracking-wide group-hover:text-slate-900">{item.label}</span>
              <span className="text-[10px] font-serif uppercase tracking-[0.2em] text-slate-500 mt-2 opacity-60 group-hover:opacity-100 transition-opacity">{item.sub}</span>
            </button>
          ))}
        </nav>

        <div className="pt-8">
          <p className="text-slate-400 font-serif text-[10px] tracking-[0.3em] uppercase opacity-50">
            © 2026 Crafted with Excellence
          </p>
        </div>
      </main>
    </div>
  );
}
