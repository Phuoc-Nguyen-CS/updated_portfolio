// src/components/QuickStartHUD.tsx
import React, { useEffect, useRef } from "react";
import { fireCommand, fireSequence } from "../utils/terminal";

export const QuickStartHUD: React.FC = () => {
    const hudRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (hudRef.current) {
                hudRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }, 100);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <>
            <style>{`
                @keyframes materialize {
                    0% { opacity: 0; filter: blur(8px) brightness(2); transform: scaleY(0.95) scaleX(1.02); }
                    15% { opacity: 1; filter: blur(2px) brightness(1.5); transform: scaleY(1) scaleX(1); }
                    20% { opacity: 0.2; filter: blur(0); }
                    25% { opacity: 1; }
                    30% { opacity: 0.5; }
                    35% { opacity: 1; filter: blur(1px) brightness(1.2); }
                    100% { opacity: 1; filter: blur(0) brightness(1); transform: scale(1); }
                }
                .animate-materialize {
                    animation: materialize 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
                }
            `}</style>
                <div 
                    ref={hudRef} 
                    className="mt-2 mx-auto w-full max-w-2xl border border-white/20 p-4 bg-black/30 opacity-0 animate-materialize"
                >
                   <p className="text-sm md:text-lg font-bold text-white mb-3 tracking-widest border-b border-white/20 pb-1 flex justify-between items-end">
                    <span>[MIR_OS] QUICK_START_GUIDE</span>
                    <span className="text-[var(--color-hacker-green)] opacity-50 text-xs font-mono">V.0.0.6</span>
                </p>

                <div className="space-y-4">
                    {/* NAVIGATION */}
                    <div>
                        <p className="text-md text-white/90 mb-1 uppercase tracking-tighter">// SYSTEM_NAVIGATION</p>
                        <div className="grid grid-cols-[max-content_1fr] gap-x-6 gap-y-1 text-sm sm:text-base">
                            <span className="text-[var(--color-hacker-green)] font-bold font-mono">ls</span>
                            <span className="text-white/80">List directory contents. (Directories are <span className="text-[var(--color-hacker-green)]">Green</span>)</span>

                            <span className="text-[var(--color-hacker-green)] font-bold font-mono">cd [dir]</span>
                            <span className="text-white/80">Traverse directories (e.g. <code className="bg-white/10 px-1 rounded">cd projects</code>).</span>

                            <span className="text-[var(--color-hacker-green)] font-bold font-mono">cd ..</span>
                            <span className="text-white/80">Go to the previous directory</span>

                            <span className="text-[var(--color-hacker-green)] font-bold font-mono">cd</span>
                            <span className="text-white/80">Go to home directory</span>
                        </div>
                    </div>

                    {/* OPERATIONS */}
                    <div>
                        <p className="text-md text-white/90 mb-1 uppercase tracking-tighter">// FILE_OPERATIONS</p>
                        <div className="grid grid-cols-[max-content_1fr] gap-x-6 gap-y-1 text-sm sm:text-base">
                            <span className="text-[var(--color-hacker-green)] font-bold font-mono">cat [file]</span>
                            <span className="text-white/80">Display [.txt, .md] files</span>

                            <span className="text-[var(--color-hacker-green)] font-bold font-mono">./ [file]</span>
                            <span className="text-white/80">Runs .exe files</span>

                            <span className="text-[var(--color-hacker-green)] font-bold font-mono">vim [file]</span>
                            <span className="text-white/80">Initialize editor (Desktop only).</span>

                            <span className="text-[var(--color-hacker-green)] font-bold font-mono">rm [file]</span>
                            <span className="text-white/80">Purge user files from session RAM.</span>
                        </div>
                    </div>

                    {/* INPUT TIPS */}
                    <div className="pt-2 border-t border-white/10">
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/60">
                            <span>[*] Use <b className="text-white">TAB</b> for Autocomplete</span>
                            <span>[*] Use <b className="text-white">UP_ARROW</b> for History</span>
                            <span>[*] Type <b className="text-yellow-500">help</b> for Full Manual</span>
                        </div>
                    </div>

                    {/* NON-TECH FAST TRACK */}
                    <div className="bg-[var(--color-hacker-green)]/10 border border-[var(--color-hacker-green)]/40 p-3 mb-4 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div>
                            <p className="text-[var(--color-hacker-green)] font-bold text-sm">Not familiar with Terminals?</p>
                            <p className="text-white/70 text-xs">Run the automated portfolio tour.</p>
                        </div>
                        <button
                            onClick={() => fireCommand("quickstart")}
                            className="bg-black border border-[var(--color-hacker-green)] px-3 py-1 shrink-0 cursor-pointer hover:bg-[var(--color-hacker-green)]/20 transition-colors text-left group"
                        >
                            <span className="text-white text-xs font-mono group-hover:text-[var(--color-hacker-green)] transition-colors">Click here: </span>
                            <span className="text-[var(--color-hacker-green)] font-bold font-mono animate-pulse">quickstart</span>
                        </button>
                    </div>
                    {/* 5. Featured Standalone: Blog */}
                    <div
                        onClick={() => fireCommand("ls logs/")}
                        className="mt-3 bg-purple-500/5 p-2 border-l-2 border-purple-500/50 hover:bg-purple-500/20 cursor-pointer transition-all group relative overflow-hidden"
                    >
                        <p className="text-white font-mono font-bold flex items-center justify-between mb-1 group-hover:text-purple-400 transition-colors relative z-10">
                            <span className="text-sm">ls logs/</span>
                            <span className="text-[9px] bg-purple-500/20 px-2 py-0.5 rounded-sm tracking-widest border border-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity">[FEATURED_DEV_LOGS]</span>
                        </p>
                        <span className="text-white/60 text-[10px] relative z-10 block">
                            Read the challenges I encounter when making new projects, and how I overcome them!
                        </span>
                    </div>
                    {/* SUGGESTED EXECUTION SEQUENCE */}
                    <div className="pt-4 mt-2 border-t border-[var(--color-hacker-green)]/30">
                        <p className="text-sm text-yellow-400 font-bold mb-3 flex items-center gap-2 tracking-widest uppercase">
                            <span className="animate-pulse">{">>"}</span> GET_TO_KNOW_ME:
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                            {/* 1. Resume  */}
                            <div
                                onClick={() => fireCommand("cat resume.txt")}
                                className="bg-[var(--color-hacker-green)]/5 p-2 border-l-2 border-blue-500/50 hover:bg-[var(--color-hacker-green)]/20 cursor-pointer transition-all group"
                            >
                                <p className="text-white font-mono font-bold flex items-center justify-between mb-1 group-hover:text-blue-400 transition-colors">
                                    <span>cat resume.txt</span>
                                    <span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity tracking-widest">[RUN]</span>
                                </p>
                                <span className="text-white/60 text-[10px]">Review my tech stack & work history.</span>
                            </div>

                            {/* 2. Projects */}
                            <div
                                onClick={() => fireCommand("ls projects/")}
                                className="bg-[var(--color-hacker-green)]/5 p-2 border-l-2 border-[var(--color-hacker-green)]/50 hover:bg-[var(--color-hacker-green)]/20 cursor-pointer transition-all group"
                            >
                                <p className="text-white font-mono font-bold flex items-center justify-between mb-1 group-hover:text-[var(--color-hacker-green)] transition-colors">
                                    <span>ls projects/</span>
                                    <span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity tracking-widest">[RUN]</span>
                                </p>
                                <span className="text-white/60 text-[10px]">Explore my shipped applications.</span>
                            </div>

                            {/* 3. Leetcode */}
                            <div
                                onClick={() => fireSequence(["cd /", "./leetcode.exe"])}
                                className="bg-[var(--color-hacker-green)]/5 p-2 border-l-2 border-yellow-500/50 hover:bg-[var(--color-hacker-green)]/20 cursor-pointer transition-all group"
                            >
                                <p className="text-white font-mono font-bold flex items-center justify-between mb-1 group-hover:text-yellow-400 transition-colors">
                                    <span>./leetcode.exe</span>
                                    <span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity tracking-widest">[RUN]</span>
                                </p>
                                <span className="text-white/60 text-[10px]">Check my live algorithm statistics.</span>
                            </div>

                            {/* 4. Contact */}
                            <div
                                onClick={() => fireSequence(["cd /", "./contact.exe"])}
                                className="bg-[var(--color-hacker-green)]/5 p-2 border-l-2 border-red-500/50 hover:bg-[var(--color-hacker-green)]/20 cursor-pointer transition-all group"
                            >
                                <p className="text-white font-mono font-bold flex items-center justify-between mb-1 group-hover:text-red-400 transition-colors">
                                    <span>./contact.exe</span>
                                    <span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity tracking-widest">[RUN]</span>
                                </p>
                                <span className="text-white/60 text-[10px]">Get my email and social links.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
