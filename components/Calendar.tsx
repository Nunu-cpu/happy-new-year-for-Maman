"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function Calendar() {
    const router = useRouter();
    const currentYear = new Date().getFullYear();
    // ... (rest of the component) 
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Hardcode to December for the Christmas vibe, or use real date? 
    // Let's use December 2025 (or current year) to match the theme.
    const targetDate = new Date();
    const isDecember = targetDate.getMonth() === 11;
    const year = targetDate.getFullYear();
    const month = 11; // December (0-indexed)

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    // Create array for days
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(null); // Empty slots
    }
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }

    const today = targetDate.getDate();

    return (
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 w-full max-w-sm border border-white/20 shadow-xl text-white mt-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-serif font-bold tracking-wider">
                    {monthNames[month]} {year}
                </h2>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium mb-2 opacity-80">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                    <div key={day}>{day}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-2 text-center">
                {days.map((day, index) => {
                    if (!day) return <div key={`empty-${index}`} />;

                    const isChristmas = day === 25;
                    const isToday = isDecember && day === today;

                    // Format date for URL: YYYY-MM-DD
                    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

                    return (
                        <div
                            onClick={() => window.location.href = `/calendar/${dateStr}`}
                            key={day}
                            className={`
                aspect-square flex items-center justify-center rounded-full transition-all relative z-50 cursor-pointer pointer-events-auto
                ${isChristmas ? 'bg-green-700 text-white font-bold shadow-lg scale-110 border-2 border-red-500' : ''}
                ${isToday && !isChristmas ? 'bg-white text-red-900 font-bold' : ''}
                ${!isChristmas && !isToday ? 'hover:bg-white/20' : ''}
              `}
                        >
                            {day}
                            {isChristmas && <span className="absolute -top-1 -right-1 text-xs">🎄</span>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
