"use client";

import { useState, useEffect } from "react";
import LinkNext from "next/link";
import { supabase } from "@/lib/supabase";

interface Message {
    id: string;
    name: string;
    content: string;
    created_at: string;
}

export default function Guestbook() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [snowflakes, setSnowflakes] = useState<Array<{ id: number; left: string; animationDuration: string; animationDelay: string; size: string }>>([]);
    const [clouds, setClouds] = useState<Array<{ id: number; left: string; top: string; scale: number; duration: string; delay: string }>>([]);

    useEffect(() => {
        fetchMessages();

        const flakes = Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}vw`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            animationDelay: `${Math.random() * 5}s`,
            size: `${Math.random() * 6 + 3}px`,
        }));
        setSnowflakes(flakes);

        const cloudElements = Array.from({ length: 5 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * 60}vh`,
            scale: Math.random() * 1.5 + 0.5,
            duration: `${Math.random() * 40 + 40}s`,
            delay: `${Math.random() * -30}s`,
        }));
        setClouds(cloudElements);
    }, []);

    const fetchMessages = async () => {
        const { data, error } = await supabase
            .from('guestbook')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching messages:', error);
        else setMessages(data || []);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !content.trim()) return;

        const { error } = await supabase
            .from('guestbook')
            .insert([{ name, content }]);

        if (error) {
            alert('메시지 게시에 실패했습니다.');
        } else {
            setName("");
            setContent("");
            fetchMessages();
        }
    };

    return (
        <div
            className="min-h-screen p-6 md:p-12 relative overflow-hidden flex flex-col items-center"
            style={{ background: 'linear-gradient(to bottom, #bae6fd 0%, #e0f2fe 50%, #f0f9ff 100%)' }}
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
                    top: -150%; left: -150%; width: 300%; height: 300%;
                    background-image: url("https://www.transparenttextures.com/patterns/stardust.png");
                    opacity: 0.05; pointer-events: none; z-index: 100;
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

            {/* Grain & Clouds */}
            <div className="absolute inset-0 grain pointer-events-none z-[60]" />
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {clouds.map((cloud) => (
                    <div
                        key={cloud.id}
                        className="absolute bg-white/40 blur-3xl rounded-full"
                        style={{
                            left: cloud.left, top: cloud.top,
                            width: `${250 * cloud.scale}px`, height: `${120 * cloud.scale}px`,
                            animation: `float ${cloud.duration} linear infinite`,
                            animationDelay: cloud.delay,
                        }}
                    />
                ))}
            </div>

            {/* Snowflakes */}
            {snowflakes.map((flake) => (
                <div key={flake.id} className="absolute bg-white rounded-full pointer-events-none opacity-60 shadow-sm"
                    style={{
                        left: flake.left, top: '-20px', width: flake.size, height: flake.size,
                        animation: `fall ${flake.animationDuration} linear infinite`,
                        animationDelay: flake.animationDelay, zIndex: 50,
                    }}
                />
            ))}

            <div className="z-10 w-full max-w-2xl flex flex-col gap-12">
                <header className="text-center space-y-4">
                    <LinkNext href="/" className="text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center gap-2 mb-4 group font-serif text-sm">
                        <span className="group-hover:-translate-x-1 transition-transform">←</span> BACK TO MAIN
                    </LinkNext>
                    <h1 className="text-4xl md:text-5xl font-dancing-script font-bold text-slate-800 drop-shadow-sm tracking-tight text-center w-full">
                        New Year Wishes 🖋️
                    </h1>
                    <p className="text-slate-500 font-serif italic text-sm">함께 나누고 싶은 새해 인사를 남겨주세요!</p>
                </header>

                {/* Message Form */}
                <form onSubmit={handleSubmit} className="bg-white/40 backdrop-blur-md p-8 rounded-xl border border-white/50 shadow-sm space-y-5">
                    <div className="space-y-2">
                        <label className="text-slate-700 text-xs font-serif uppercase tracking-widest px-1">Name</label>
                        <input
                            type="text" value={name} onChange={(e) => setName(e.target.value)}
                            placeholder="Your Name"
                            className="w-full bg-white/50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300 transition-all text-sm"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-slate-700 text-xs font-serif uppercase tracking-widest px-1">Message</label>
                        <textarea
                            value={content} onChange={(e) => setContent(e.target.value)}
                            placeholder="따뜻한 한마디..."
                            rows={3}
                            className="w-full bg-white/50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300 transition-all text-sm resize-none"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-serif tracking-widest text-sm rounded-lg shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99]"
                    >
                        SEND WISH ✨
                    </button>
                </form>

                {/* Message List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
                    {messages.length === 0 ? (
                        <div className="col-span-full text-center py-12 text-slate-400 font-serif italic">
                            아직 남겨진 메시지가 없습니다. 첫 번째 인사를 남겨보세요!
                        </div>
                    ) : (
                        messages.map((m) => (
                            <div
                                key={m.id}
                                className="bg-white p-6 rounded-sm shadow-md border-b-4 border-slate-200 transform hover:rotate-1 transition-transform animate-in fade-in slide-in-from-bottom-4 duration-500"
                            >
                                <div className="flex justify-between items-start mb-3 border-b border-slate-100 pb-2">
                                    <span className="font-dancing-script font-bold text-slate-700 text-xl">{m.name}</span>
                                    <span className="text-[9px] text-slate-400 font-mono">
                                        {new Date(m.created_at).toLocaleDateString("ko-KR")}
                                    </span>
                                </div>
                                <p className="text-slate-600 leading-relaxed font-serif text-sm italic">"{m.content}"</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
