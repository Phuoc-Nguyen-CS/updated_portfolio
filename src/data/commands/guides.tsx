// src/data/guides.tsx
import React, { useEffect, useRef } from "react";
import { fireCommand, fireSequence } from "../../utils/terminal";

/* =========================================================
    HELP MANUAL
   ========================================================= */

export const HelpManual = () => {
    const coreCommands = [
        { cmd: "ls", desc: "List files in the current sector." },
        { cmd: "cd [dir]", desc: "Move to a sub-directory." },
        { cmd: "cat [file]", desc: "Read a file (e.g. cat about.txt)." },
        { cmd: "rm [file]", desc: "Delete a user-created file." }
    ];

    const vimCommands = [
        { key: "i", desc: "INSERT MODE: Start typing text." },
        { key: "ESC", desc: "NORMAL MODE: Enter command mode." },
        { key: ":wq", desc: "SAVE & EXIT: Write changes and quit." },
        { key: ":q", desc: "QUIT: Discard changes and exit." }
    ];

    return (
        <div className="mt-2 space-y-4 max-w-3xl border-l-2 border-yellow-500 pl-4 animate-in fade-in slide-in-from-left-4 duration-500 overflow-hidden">
            <div>
                <p className="text-yellow-400 font-bold uppercase tracking-widest underline decoration-2">
                    // SYSTEM_MANUAL_V0.0.6
                </p>
                <p className="text-white/60 text-xs italic">"I.. might be stuck in VIM.. if you see this send help!"</p>
            </div>

            <div className="bg-red-500/10 border border-red-500/50 p-2 text-xs">
                <p className="text-red-400 font-bold flex items-center gap-2">[!] HARDWARE_LIMITATION_NOTICE</p>
                <p className="text-white/80 mt-1">
                    The <span className="text-white font-bold">Vim Editor</span> is optimized for <span className="text-white font-bold underline">PC/Desktop environments</span>.
                    Mobile virtual keyboards lack the physical <code className="bg-white/10 px-1">Esc</code> and <code className="bg-white/10 px-1">:</code> keys required for modal navigation.
                </p>
            </div>

            <section>
                <p className="text-[var(--color-hacker-green)] font-bold">[ CORE_NAVIGATION ]</p>
                <div className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1 text-sm mt-1">
                    {coreCommands.map((c, i) => (
                        <React.Fragment key={i}>
                            <span className="text-white font-mono">{c.cmd}</span>
                            <span className="text-white/80">{c.desc}</span>
                        </React.Fragment>
                    ))}
                </div>
            </section>

            <section className="bg-white/5 p-3 border border-white/10">
                <p className="text-yellow-500 font-bold flex items-center gap-2 uppercase tracking-tighter">
                    <span>[*]</span> VIM_QUICKSTART (PC ONLY)
                </p>
                <div className="grid grid-cols-[max-content_1fr] gap-x-6 gap-y-1 text-xs mt-3">
                    {vimCommands.map((v, i) => (
                        <React.Fragment key={i}>
                            <span className="text-[var(--color-hacker-green)] font-mono whitespace-nowrap">{v.key}</span>
                            <span className="text-white/80">{v.desc}</span>
                        </React.Fragment>
                    ))}
                </div>
                <div className="mt-4 pt-2 border-t border-white/5">
                    <p className="text-[var(--color-hacker-green)] text-[10px] sm:text-xs font-mono opacity-70">
                        VIM EXIT SEQUENCE {">>"} <span className="text-white underline">[ESC]</span> then <span className="text-white">:wq</span>
                    </p>
                </div>
            </section>

            <section>
                <p className="text-[var(--color-hacker-green)] font-bold">[ PRO_TIPS ]</p>
                <ul className="list-dash pl-4 text-xs space-y-1 text-white/80 mt-1">
                    <li>Use <span className="text-white font-bold">TAB</span> to auto-complete file names.</li>
                    <li>Use <span className="text-white font-bold">ARROW_UP</span> to recall previous commands.</li>
                </ul>
            </section>
        </div>
    );
};

/* =========================================================
    QUICKSTART GUIDE
   ========================================================= */
export const QuickStartGuide = () => {
    const hasFired = useRef(false); 

    useEffect(() => {

        if (!hasFired.current) {
            fireCommand("ls");
            hasFired.current = true; 
        }
    }, []);

    const techData = [
        { label: "LANGUAGES:", value: "TypeScript, JavaScript, Python, C/C++, SQL" },
        { label: "FRONTEND:", value: "React, Next.js, Tailwind CSS" },
        { label: "BACKEND & DB:", value: "Django, Node.js, Supabase, PostgreSQL" },
        { label: "AI & VISION:", value: "TensorFlow, OpenCV, MediaPipe" },
        { label: "DEV_TOOLS:", value: "Git, Figma, Postman, Vercel, Netlify, OCR Tools" }
    ];

    const projectsData = [
        { title: "MIR_OS Terminal", desc: "This highly interactive web-based operating system.", cmd: ["cd /projects", "./terminal_portfolio.tsx"]},
        { title: "Real-Estate Website", desc: "Modern property listing platform using Supabase & Next.js.", cmd: ["cd /projects", "./cebu_real_estate.js"] },
        { title: "Maplestory Discord Bot", desc: "Python automation tool using OCR and BeautifulSoup.", cmd: ["cd /projects", "./maple_discord_bot.py"] },
        { title: "AI Gesture Control", desc: "Hand-tracking via OpenCV/TensorFlow for PC media controls.", cmd: ["cd /projects", "./gesture_detection.py"] },
    ];

    return (
        <div className="mt-2 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="border border-[var(--color-hacker-green)]/30 bg-black/40 p-4 md:p-6 shadow-[0_0_15px_rgba(0,255,0,0.05)]">
                {/* HEADER */}
                <div className="border-b border-[var(--color-hacker-green)]/30 pb-3 mb-5">
                    <h2 className="text-[var(--color-hacker-green)] text-sm md:text-xl font-bold tracking-widest flex items-center gap-2">
                        <span className="animate-pulse">{">>"}</span> AUTOMATED_PORTFOLIO_TOUR
                    </h2>
                    <p className="text-white/60 text-xs font-mono mt-1">Compiled for non-technical personnel. Bypassing manual navigation protocols...</p>
                </div>

                {/* SECTION 1: ABOUT */}
                <div className="mb-6">
                    <h3 className="text-white font-bold text-sm bg-[var(--color-hacker-green)]/20 inline-block px-2 py-1 mb-2">01 // ROOT_OWNER:</h3>
                    <div className="text-white/80 text-sm pl-3 border-l-2 border-white/20 space-y-3">
                        <p>Hi, I'm Phuoc Nguyen. I'm a developer passionate about building robust applications and designing unique interactive experiences.</p>
                        <div className="space-y-1.5 mt-2 text-xs sm:text-sm font-mono">
                            <p className="flex gap-2"><span className="text-[var(--color-hacker-green)] font-bold">»</span><span><strong className="text-white">EDUCATION:</strong> CSU Fullerton (GPA: 3.6)</span></p>
                            <p className="flex gap-2"><span className="text-[var(--color-hacker-green)] font-bold">»</span><span><strong className="text-white">ACADEMIC_FOCUS:</strong> Data Science, AI, & Big Data</span></p>
                            <p className="flex gap-2"><span className="text-[var(--color-hacker-green)] font-bold">»</span><span><strong className="text-white">CURRENT_OBJECTIVE:</strong> Full-Stack Web Development & Automation</span></p>
                        </div>
                    </div>
                </div>

                {/* SECTION 2: TECHNICAL SKILLS */}
                <div className="mb-6">
                    <h3 className="text-white font-bold text-sm bg-blue-500/20 inline-block px-2 py-1 mb-2 text-blue-300">02 // TECHNICAL_SKILLS</h3>
                    <div className="text-white/80 text-sm pl-3 border-l-2 border-blue-500/30 space-y-2 font-mono">
                        {techData.map((item, i) => (
                            <div key={i} className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                                <span className="text-blue-400 font-bold w-28 shrink-0">{item.label}</span>
                                <span className="text-white">{item.value}</span>
                            </div>
                        ))}
                        <p className="text-xs text-white/40 italic mt-4 pt-2 border-t border-blue-500/20">
                            * To view the full document, type: <code className="text-yellow-400 bg-white/5 px-1 rounded">cat resume.txt</code>
                        </p>
                    </div>
                </div>

                {/* SECTION 3: PROJECTS OVERVIEW */}
                <div>
                    <h3 className="text-white font-bold text-sm bg-orange-500/20 inline-block px-2 py-1 mb-2 text-orange-300">03 // PROJECTS</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-3 border-l-2 border-orange-500/30">
                        {projectsData.map((project, i) => (
                            <button
                                key={i}
                                onClick={() => fireSequence(project.cmd)}
                                className="bg-white/5 p-2 border border-white/5 hover:border-orange-500/50 hover:bg-orange-500/10 transition-colors text-left text-orange-300 cursor-pointer group"
                            >
                                <p className="font-bold text-xs group-hover:text-white transition-colors">{project.title}</p>
                                <p className="text-white/60 text-[10px] mt-1">{project.desc}</p>
                            </button>
                        ))}
                    </div>
                    <p className="text-xs text-white/40 italic mt-3 pl-3">
                        * To run project simulations later, type: <code className="text-yellow-400">cd projects</code> -{">"} <code className="text-yellow-400">ls</code> -{">"} <code className="text-yellow-400">./ [file_name]</code>
                    </p>
                </div>

                {/* SECTION 4: Blog */}
                <section className="mt-6">
                    <h3 className="text-white font-bold text-sm bg-[var(--color-hacker-green)]/20 inline-block px-2 py-1 mb-2 text-[var(--color-hacker-green)]">04 // SYSTEM_LOGS</h3>
                    <div className="pl-3 border-l-2 border-[var(--color-hacker-green)]/30">
                        <button
                            onClick={() => fireCommand("cd /logs")}
                            className="bg-white/5 p-3 border border-white/5 hover:border-[var(--color-hacker-green)]/50 hover:bg-[var(--color-hacker-green)]/10 transition-colors group text-left w-full cursor-pointer"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-2 h-2 bg-[var(--color-hacker-green)] rounded-full group-hover:animate-ping"></span>
                                <p className="text-white font-mono text-xs uppercase tracking-widest group-hover:text-[var(--color-hacker-green)] transition-colors">
                                    Read Latest Entry: [2026-03-08_system_init.md]
                                </p>
                            </div>
                            <p className="text-white/60 text-[10px] leading-relaxed">
                                Personal dev logs, technical deep-dives, and system update history are stored within the encrypted log directory.
                            </p>
                        </button>

                    </div>
                </section>

                {/* FOOTER */}
                <div className="mt-8 pt-4 border-t border-[var(--color-hacker-green)]/30 text-center flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-white/50">SYSTEM.TOUR_COMPLETE</p>

                    <div className="flex items-center gap-2 text-[var(--color-hacker-green)] font-mono text-xs uppercase tracking-widest">
                        <span className="w-2 h-2 bg-[var(--color-hacker-green)] rounded-full animate-ping"></span>
                        File System Active
                    </div>
                </div>
            </div>
        </div>
    );
};