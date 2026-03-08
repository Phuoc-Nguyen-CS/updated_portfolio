import React from "react";
import leetcodeData from "./leetcode_stats.json";

export type CommandResponse = string | React.ReactNode;

export const COMMANDS: Record<string, () => CommandResponse> = {
    ls: () => {
        const modules = Object.keys(COMMANDS)
            .filter((cmd) => cmd !== "help")
            .sort()
            .map((cmd) => `[${cmd}]`)
            .join(" ");

        return (
            <div className="glow-text">
                <p className="text-white/60">Available modules: {modules}</p>
            </div>
        );
    },

    about: () => (
        <div className="space-y-1">
            <p>NAME: PHUOC NGUYEN</p>
            <p>UNDERGRADUATE: CALIFORNIA_STATE_UNIVERSITY_FULLERTON</p>
            <p className="text-white/40 italic text-sm">"Technology is best when bringing people together"</p>
        </div>
    ),

    /* 1. LeetCode / NeetCode Progress */
    leetcode: () => {
        const stats = [
            { label: "EASY", count: parseInt(leetcodeData.easy), total: 28, color: "bg-green-500" },
            { label: "MEDIUM", count: parseInt(leetcodeData.medium), total: 101, color: "bg-yellow-500" },
            { label: "HARD", count: parseInt(leetcodeData.hard), total: 21, color: "bg-red-500" },
        ];

        return (
            <div className="mt-2 space-y-3 border-l-2 border-[var(--color-hacker-green)] pl-4">
                <p className="text-white font-bold underline text-sm sm:text-base">// ALGORITHMIC_PROGRESS_SYNCED</p>
                {stats.map((stat) => {
                    const percentage = Math.round((stat.count / stat.total) * 100);
                    return (
                        <div key={stat.label} className="w-full max-w-[18rem]">
                            <div className="flex justify-between text-xs mb-1">
                                <span>{stat.label}</span>
                                <span>{stat.count}/{stat.total}</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className={`h-full ${stat.color} shadow-[0_0_8px_currentColor]`}
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
                <div className="mt-2 space-y-1">
                    <p className="text-xs text-white/40">Source: GitHub/Phuoc-Nguyen-CS/LeetCode</p>
                    <p className="text-[10px] sm:text-xs text-[var(--color-hacker-green)] opacity-60 uppercase">
                        LAST_SYNC: {leetcodeData.lastUpdated}
                    </p>
                </div>
            </div>
        );
    },

    /* 2. Resume Download */
    resume: () => (
        <div className="mt-2 space-y-6 text-sm sm:text-base max-w-4xl">
            {/* HEADER SECTION */}
            <div className="border-b border-white/20 pb-4">
                <h2 className="text-xl font-bold text-white uppercase tracking-tighter">Phuoc [Peter] Nguyen</h2>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--color-hacker-green)] opacity-80 mt-1">
                </div>
            </div>

            {/* EDUCATION */}
            <section>
                <p className="text-[var(--color-hacker-green)] font-bold underline mb-2">01. EDUCATION_HISTORY</p>
                <div className="pl-4">
                    <p className="text-white font-bold">California State University, Fullerton</p>
                    <p className="text-white/80">Bachelor of Science, Computer Science (GPA: 3.60/4.0)</p>
                    <p className="text-xs opacity-50 italic">Dean’s List 2021, 2022, 2023 | Graduated May 2023</p>
                </div>
            </section>

            {/* WORK EXPERIENCE */}
            <section>
                <p className="text-[var(--color-hacker-green)] font-bold underline mb-2">02. WORK_EXPERIENCE_LOG</p>
                <div className="space-y-4 pl-4">
                    <div>
                        <div className="flex justify-between items-baseline">
                            <p className="text-white font-bold">Full-Stack Freelance Developer</p>
                            <span className="text-xs opacity-50">2025-PRESENT</span>
                        </div>
                        <ul className="list-dash pl-4 text-xs sm:text-sm opacity-80 mt-1 space-y-1">
                            <li>• Modernized real-estate UI/UX using React, Supabase, and Swiper.js.</li>
                            <li>• Implemented SEO best practices to drive traffic and optimized performance for older devices.</li>
                            <li>• Managed project via Agile framework to ensure stakeholder value and deployment via Vercel.</li>
                        </ul>
                    </div>
                    <div>
                        <div className="flex justify-between items-baseline">
                            <p className="text-white font-bold">Audio Visual Solutions (IT Technician)</p>
                            <span className="text-xs opacity-50">2024-2024</span>
                        </div>
                        <ul className="list-dash pl-4 text-xs sm:text-sm opacity-80 mt-1 space-y-1">
                            <li>• Led installation and configuration of mission-critical event hardware.</li>
                            <li>• Managed complex cable infrastructure to prevent hazards and improve workflow.</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* PROJECTS */}
            <section>
                <p className="text-[var(--color-hacker-green)] font-bold underline mb-2">03. REPOSITORY_PROJECTS</p>
                <div className="space-y-4 pl-4">
                    <div>
                        <p className="text-white font-bold">Game Activity Automation Tool (Python)</p>
                        <ul className="list-dash pl-4 text-xs sm:text-sm opacity-80 mt-1 space-y-1">
                            <li>• Leveraged OpenCV/Tesseract for data extraction and BeautifulSoup4 for web scraping.</li>
                            <li>• Optimized execution speed by 92% through asynchronous programming.</li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-white font-bold">Gesture Detection Program (TensorFlow)</p>
                        <ul className="list-dash pl-4 text-xs sm:text-sm opacity-80 mt-1 space-y-1">
                            <li>• Developed real-time hand-tracking software with 95% recognition accuracy.</li>
                            <li>• Trained custom models using Mediapipe and TensorFlow for unique hand gestures.</li>
                        </ul>
                    </div>
                </div>
            </section>
            {/* SKILLS & CERTS - FULLY ALIGNED */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* TECH_STACK */}
                <div>
                    <p className="text-[var(--color-hacker-green)] font-bold underline mb-3">04. TECH_STACK</p>
                    <div className="space-y-1 text-xs sm:text-sm">
                        <div className="flex">
                            <span className="text-white w-20 shrink-0 font-mono">[LANGS]</span>
                            <span className="opacity-80">Python, C/C++, JS, SQL, Java, R</span>
                        </div>
                        <div className="flex">
                            <span className="text-white w-20 shrink-0 font-mono">[SOFT]</span>
                            <span className="opacity-80">VSCode, GitHub, Git, Figma, R Studio</span>
                        </div>
                        <div className="flex">
                            <span className="text-white w-20 shrink-0 font-mono">[FRAME]</span>
                            <span className="opacity-80">React, AWS S3, OpenCV, Django, Pandas</span>
                        </div>
                        <div className="flex">
                            <span className="text-white w-20 shrink-0 font-mono">[STYLE]</span>
                            <span className="opacity-80">Tailwind CSS, Bootstrap, CSS, HTML</span>
                        </div>
                    </div>
                </div>

                {/* CERTIFICATIONS  */}
                <div>
                    <p className="text-[var(--color-hacker-green)] font-bold underline mb-3">05. CERTIFICATIONS</p>
                    <div className="space-y-3 text-xs sm:text-sm">
                        <div className="flex items-start">
                            <span className="text-white w-20 shrink-0 font-mono">[AWS]</span>
                            <div className="flex flex-col">
                                <span className="text-white font-bold leading-none">Cloud Practitioner</span>
                                <span className="text-[var(--color-hacker-green)] text-[10px] tracking-widest mt-1">
                                    CLF-C02 | 01/08/2026
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="pt-4 opacity-75 text-[16px] text-center border-t border-white/10 uppercase tracking-widest">
                [ END OF SECURE TRANSMISSION ]
            </div>
        </div>
    ),

    /* 3. Direct Contact */
    contact: () => (
        <div className="mt-2 space-y-2 border-l-2 border-[var(--color-hacker-green)] pl-4">
            <p className="text-white font-bold underline">// SECURE_COMMUNICATION_LINE</p>
            <p>Initiate direct email transfer?</p>
            <a
                href="mailto:phuoc.codes@gmail.com?subject=Greetings!"
                className="inline-block px-3 py-1 bg-[var(--color-hacker-green)] text-black font-bold hover:bg-white transition-colors"
            >
                EXECUTE: SEND_EMAIL
            </a>
            <div className="pt-2 flex space-y-1 flex-col text-sm opacity-60">
                <p>Email: phuoc.codes@gmail.com</p>
                <p>LinkedIn: linkedin.com/in/phuoc-nguyen-codes/</p>
                <p>Location: Cerritos, CA</p>
            </div>
        </div>
    ),

    projects: () => (
        <div className="mt-2 border-l-2 border-[var(--color-hacker-green)] pl-4">
            <p className="text-white font-bold mb-2 underline">// REPOSITORY_ENTRIES</p>
            <ul className="space-y-2">
                <li>
                    <a
                        href="https://github.com/Jameboyyy/CLS-Properties"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:bg-[var(--color-hacker-green)] hover:text-black p-1 transition-all"
                    >
                        {"[01] Cebu Real-Estate Property Website"}
                    </a>
                </li>
                <li>
                    <a
                        href="https://github.com/Phuoc-Nguyen-CS/DiscordMapleBot"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:bg-[var(--color-hacker-green)] hover:text-black p-1 transition-all"
                    >
                        {"[02] Maplestory Discord Bot"}
                    </a>
                </li>
                <li>
                    <a
                        href="https://github.com/Phuoc-Nguyen-CS/Hand-Gesture-Volume-Control-and-Webpage-Launcher"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:bg-[var(--color-hacker-green)] hover:text-black p-1 transition-all"
                    >
                        {"[03] Hand Gesture Detection Program"}
                    </a>
                </li>
            </ul>
        </div>
    ),
    github: () => (
        <div className="mt-2 border-l-2 border-[var(--color-hacker-green)] pl-4">
            <p className="text-white font-bold mb-2 underline">// EXTERNAL_SOURCE_REDIRECT</p>
            <div className="space-y-1 mb-4">
                <p>TARGET: <span className="text-white">github.com/Phuoc-Nguyen-CS</span></p>
                <p>STATUS: <span className="text-[var(--color-hacker-green)] font-mono animate-pulse">CONNECTION_READY</span></p>
            </div>

            <a
                href="https://github.com/Phuoc-Nguyen-CS"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-3 py-1 border border-[var(--color-hacker-green)] text-[var(--color-hacker-green)] font-bold hover:bg-[var(--color-hacker-green)] hover:text-black transition-all"
            >
                [OPEN_REPOS]
            </a>
            <p className="text-[10px] text-white/40 mt-2 italic">Note: Handshake will initialize in a new tab.</p>
        </div>
    ),

    restart: () => "SYSTEM RESTART INITIATED...",

    clear: () => "Clearing terminal buffer..."
};

export const COMMAND_LIST = Object.keys(COMMANDS);