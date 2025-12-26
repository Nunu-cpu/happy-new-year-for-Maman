"use client";

import Calendar from "@/components/Calendar";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CalendarPage() {
    const [snowflakes, setSnowflakes] = useState<Array<{ id: number; left: string; animationDuration: string; animationDelay: string; size: string }>>([]);
    const [monthlyTodos, setMonthlyTodos] = useState("");

    useEffect(() => {
        const flakes = Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}vw`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            animationDelay: `${Math.random() * 5}s`,
            size: `${Math.random() * 8 + 4}px`,
        }));
        setSnowflakes(flakes);

        // Load monthly todos from localStorage
        const savedTodos = localStorage.getItem('monthly-todos-december');
        if (savedTodos) {
            setMonthlyTodos(savedTodos);
        }
    }, []);

    const handleTodoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setMonthlyTodos(newValue);
        localStorage.setItem('monthly-todos-december', newValue);
    };

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
                        zIndex: 0,
                        filter: 'blur(0.5px)',
                    }}
                />
            ))}

            <main className="flex flex-col items-center text-center gap-8 animate-in fade-in zoom-in duration-1000 z-[60] w-full max-w-6xl relative">
                <h1 className="text-3xl md:text-4xl font-serif font-medium tracking-widest text-[#f0f0f0] drop-shadow-md">
                    12월의 달력
                </h1>

                <div className="flex flex-col lg:flex-row gap-8 w-full items-center lg:items-start justify-center">
                    <div className="flex-shrink-0">
                        <Calendar />
                    </div>

                    {/* Monthly Todo List */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 w-full lg:w-96 border border-white/20 shadow-xl">
                        <h2 className="text-2xl font-serif font-bold text-white mb-4 text-left">
                            📝 이 달의 할 일
                        </h2>
                        <textarea
                            value={monthlyTodos}
                            onChange={handleTodoChange}
                            placeholder="12월에 할 일을 적어보세요...&#10;예)&#10;- 크리스마스 선물 준비&#10;- 연말 정리&#10;- 친구들과 파티&#10;- 새해 계획 세우기"
                            className="w-full h-96 p-4 rounded-xl bg-white/80 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-sans resize-none"
                        />
                        <p className="text-white/60 text-xs mt-2 text-left">
                            💡 자동 저장됩니다
                        </p>
                    </div>
                </div>

                <Link
                    href="/"
                    className="mt-8 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all font-serif"
                >
                    ← 메인으로 돌아가기
                </Link>
            </main>
        </div>
    );
}
