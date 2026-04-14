// src/data/guides.tsx
import React, { useEffect, useRef } from "react";
import { fireCommand, fireSequence } from "../../utils/terminal";

/* =========================================================
    HELP MANUAL
   ========================================================= */

export const HelpManual = () => {
    const coreCommands = [
        { cmd: "ls", desc: "List all files and directories in the current sector." },
        { cmd: "cd [dir]", desc: "Navigate to a specific sub-directory." },
        { cmd: "cat [file]", desc: "Read the contents of a .txt or .md file." },
        { cmd: "rm [file]", desc: "Permanently delete a user-created file from RAM." }
    ];

    const vimCommands = [
        { key: "i", desc: "INSERT_MODE: Start editing text." },
        { key: "ESC", desc: "NORMAL_MODE: Enter command state." },
        { key: ":wq", desc: "SAVE_EXIT: Write changes and quit." },
        { key: ":q", desc: "QUIT: Discard changes and exit." }
    ];

    return (
        <div className="mt-4 space-y-8 max-w-4xl border-l-2 border-[var(--color-hacker-green)]/30 pl-6 animate-in fade-in slide-in-from-left-4 duration-500">
            {/* HEADER */}
            <div>
                <p className="text-[var(--color-hacker-green)] font-bold uppercase tracking-[0.3em] text-lg">
                    // SYSTEM_MANUAL_V.0.1.0
                </p>
            </div>

            {/* CORE NAVIGATION */}
            <section>
                <p className="text-white font-bold mb-3 uppercase tracking-widest text-sm border-b border-[var(--color-hacker-green)]/10 pb-1">
                    [ 01_CORE_NAVIGATION ]
                </p>
                <div className="grid grid-cols-[100px_1fr] gap-x-6 gap-y-2 text-sm md:text-base">
                    {coreCommands.map((c, i) => (
                        <React.Fragment key={i}>
                            <span className="text-[var(--color-hacker-green)] font-bold font-mono">{c.cmd}</span>
                            <span className="text-white/70">{c.desc}</span>
                        </React.Fragment>
                    ))}
                </div>
            </section>
            <section className="bg-[var(--color-hacker-green)]/5 p-5 border border-[var(--color-hacker-green)]/20 shadow-[0_0_15px_rgba(0,255,65,0.05)]">
                <div className="flex justify-between items-start mb-4">
                    <p className="text-[var(--color-hacker-green)] font-bold uppercase tracking-tighter text-sm">
                        [*] VIM_MODE_PROTOCOLS
                    </p>
                    <span className="text-[10px] bg-[var(--color-hacker-green)]/20 px-2 py-0.5 text-[var(--color-hacker-green)] font-bold">DESKTOP_OPERATION</span>
                </div>

                <div className="grid grid-cols-[100px_1fr] gap-x-6 gap-y-2 text-xs md:text-sm">
                    {vimCommands.map((v, i) => (
                        <React.Fragment key={i}>
                            <span className="text-white font-mono font-bold uppercase">{v.key}</span>
                            <span className="text-white/60">{v.desc}</span>
                        </React.Fragment>
                    ))}
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--color-hacker-green)]/10">
                    <p className="text-[var(--color-hacker-green)] text-[10px] md:text-xs font-mono opacity-80 leading-relaxed">
                        <span className="text-white font-bold underline">MOBILE_NOTICE:</span> Virtual keyboards lack the modal keys (ESC, :) required for Vim. Please use a physical interface for editing.
                    </p>
                </div>
            </section>
            <section>
                <p className="text-white font-bold mb-3 uppercase tracking-widest text-sm">
                    [ 02_SYSTEM_EFFICIENCY ]
                </p>
                <ul className="space-y-2 text-xs md:text-sm text-white/60 font-mono">
                    <li className="flex items-center gap-2">
                        <span className="text-[var(--color-hacker-green)]">{">"}</span>
                        Use <span className="text-white font-bold border-b border-white/20">TAB</span> to auto-complete paths and file names.
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="text-[var(--color-hacker-green)]">{">"}</span>
                        Use <span className="text-white font-bold border-b border-white/20">ARROW_UP</span> to cycle through command history.
                    </li>
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
                        <p>Hi, I'm Phuoc Nguyen. I'm a developer that loves to create programs from a wide variety of languages</p>
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
                                Personal dev logs and system update history are stored within the encrypted log directory.
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