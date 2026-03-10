// src/components/System_Hints.tsx
import React from "react";
import { fireCommand } from "../utils/terminal"; 

interface HintProps {
    text: string;
    cmd: string;
}

export const SystemHints: React.FC<HintProps> = ({ text, cmd }) => {
    return (
        <div className="mt-8 p-3 border border-[var(--color-hacker-green)]/30 bg-[var(--color-hacker-green)]/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in">
            <div className="flex items-center gap-2">
                <span className="text-[var(--color-hacker-green)] font-bold animate-pulse">{">>"} SYSTEM_HINT:</span>
                <span className="text-white/80 text-sm">{text}</span>
            </div>

            <button
                onClick={() => fireCommand(cmd)} 
                className="shrink-0 bg-[var(--color-hacker-green)]/10 hover:bg-[var(--color-hacker-green)]/30 text-[var(--color-hacker-green)] px-3 py-1 font-mono text-xs transition-colors border border-[var(--color-hacker-green)]/50 cursor-pointer"
            >
                Run: {cmd}
            </button>
        </div>
    );
};