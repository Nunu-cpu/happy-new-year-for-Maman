"use client";

import { useState, useEffect } from "react";
import Link from "react-router-dom"; // Note: Using standard Link for internal navigation or next/link if available
import LinkNext from "next/link";

interface Message {
    id: string;
    name: string;
    content: string;
    timestamp: string;
}

export default function Guestbook() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [snowflakes, setSnowflakes] = useState<Array<{ id: number; left: string; animationDuration: string; animationDelay: string; size: string }>>([]);

    useEffect(() => {
        // Load messages
        const saved = localStorage.getItem("guestbook_messages");
        if (saved) {
            setMessages(JSON.parse(saved));
        }

        // Snowflakes for consistency
        const flakes = Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}vw`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            animationDelay: `${Math.random() * 5}s`,
            size: `${Math.random() * 6 + 3}px`,
        }));
        setSnowflakes(flakes);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !content.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            name,
            content,
            timestamp: new Date().toLocaleString("ko-KR"),
        };

        const updated = [newMessage, ...messages];
        setMessages(updated);
        localStorage.setItem("guestbook_messages", JSON.stringify(updated));
        setName("");
        setContent("");
    };

    return (
        <div
            className="min-h-screen p-6 md:p-12 relative overflow-hidden flex flex-col items-center"
            style={{ background: 'linear-gradient(135deg, #1a472a 0%, #2d5a27 50%, #1a472a 100%)' }}
        >
            <style jsx global>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) translateX(0); opacity: 1; }
          100% { transform: translateY(110vh) translateX(20px); opacity: 0.3; }
        }
      `}</style>

            {/* Snowflakes */}
            {snowflakes.map((flake) => (
                <div
                    key={flake.id}
                    className="absolute bg-white rounded-full pointer-events-none opacity-80"
                    style={{
                        left: flake.left,
                        top: '-20px',
                        width: flake.size,
                        height: flake.size,
                        animation: `fall ${flake.animationDuration} linear infinite`,
                        animationDelay: flake.animationDelay,
                        zIndex: 1,
                        filter: 'blur(0.5px)',
                    }}
                />
            ))}

            <div className="z-10 w-full max-w-2xl flex flex-col gap-8">
                <header className="text-center space-y-4">
                    <LinkNext href="/" className="text-white/70 hover:text-white transition-colors flex items-center justify-center gap-2 mb-4 group">
                        <span className="group-hover:-translate-x-1 transition-transform">←</span> 메인으로 돌아가기
                    </LinkNext>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white drop-shadow-lg tracking-tight">
                        New Year 방명록 🖋️
                    </h1>
                    <p className="text-white/80 font-serif">함께 나누고 싶은 새해 인사를 남겨주세요!</p>
                </header>

                {/* Message Form */}
                <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl space-y-4">
                    <div className="space-y-2">
                        <label className="text-white/90 text-sm font-serif px-1">기록자</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="이름을 입력하세요"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-white/90 text-sm font-serif px-1">메시지</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="따뜻한 새해 인사를 남겨주세요..."
                            rows={4}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all resize-none"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] font-serif"
                    >
                        기록하기 ✨
                    </button>
                </form>

                {/* Message List */}
                <div className="space-y-4 pb-12">
                    {messages.length === 0 ? (
                        <div className="text-center py-12 text-white/50 font-serif italic">
                            아직 남겨진 메시지가 없습니다. 첫 번째 인사를 남겨보세요!
                        </div>
                    ) : (
                        messages.map((m) => (
                            <div
                                key={m.id}
                                className="bg-white/5 backdrop-blur-sm p-5 rounded-2xl border border-white/5 shadow-inner animate-in fade-in slide-in-from-bottom-4 duration-500"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className="font-serif font-bold text-green-300 text-lg">{m.name}</span>
                                    <span className="text-[10px] text-white/40">{m.timestamp}</span>
                                </div>
                                <p className="text-white/90 leading-relaxed font-light">{m.content}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
