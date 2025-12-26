"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";

export default function JournalPage({ params }: { params: Promise<{ date: string }> }) {
    const { date } = use(params);

    const [content, setContent] = useState("");
    const [image, setImage] = useState<string | null>(null);
    const [snowflakes, setSnowflakes] = useState<Array<{ id: number; left: string; animationDuration: string; animationDelay: string; size: string }>>([]);

    useEffect(() => {
        const savedData = localStorage.getItem(`journal-${date}`);
        if (savedData) {
            const parsed = JSON.parse(savedData);
            setContent(parsed.content || "");
            setImage(parsed.image || null);
        }

        const flakes = Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}vw`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            animationDelay: `${Math.random() * 5}s`,
            size: `${Math.random() * 8 + 4}px`,
        }));
        setSnowflakes(flakes);
    }, [date]);

    const handleSave = () => {
        localStorage.setItem(`journal-${date}`, JSON.stringify({ content, image }));
        alert("저장되었습니다! 🎄");
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4 overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #c73e1d 0%, #d4a373 50%, #e8c4a0 100%)' }}>
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

            <main className="flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-500 z-[60] w-full max-w-lg bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-2xl relative">
                <h1 className="text-3xl font-serif font-bold text-white drop-shadow-md">
                    {date}의 기록 ✍️
                </h1>

                <div className="w-full space-y-4">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="오늘 하루는 어땠나요? 즐거운 크리스마스의 추억을 남겨보세요."
                        className="w-full h-40 p-4 rounded-xl bg-white/80 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-sans"
                    />

                    <div className="flex flex-col gap-2">
                        <label className="text-white/80 text-sm font-medium ml-1">오늘의 사진</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-red-700 hover:file:bg-red-50"
                        />
                    </div>

                    {image && (
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden border-2 border-white/20 shadow-lg mt-2">
                            <img src={image} alt="Uploaded memory" className="object-cover w-full h-full" />
                        </div>
                    )}

                    <div className="flex gap-4 pt-4">
                        <button
                            onClick={handleSave}
                            className="flex-1 bg-green-700 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform active:scale-95"
                        >
                            저장하기 💾
                        </button>
                        <Link
                            href="/calendar"
                            className="flex-1 bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-6 rounded-full text-center transition-colors flex items-center justify-center"
                        >
                            뒤로가기
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
