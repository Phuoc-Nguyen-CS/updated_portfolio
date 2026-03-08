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
            { label: "EASY", count: parseInt(leetcodeData.easy), total: 100, color: "bg-green-500" },
            { label: "MEDIUM", count: parseInt(leetcodeData.medium), total: 100, color: "bg-yellow-500" },
            { label: "HARD", count: parseInt(leetcodeData.hard), total: 100, color: "bg-red-500" },
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
        <div className="mt-2 space-y-4">
            <div className="border-b border-white/20 pb-2">
                <h2 className="text-lg font-bold text-white uppercase tracking-tighter">Phuoc Nguyen</h2>
                <p className="text-xs opacity-60">Full Stack Developer | Fullerton, CA</p>
            </div>

            <section>
                <p className="text-[var(--color-hacker-green)] font-bold underline">EXPERIENCE_LOG</p>
                <div className="mt-2">
                    <p className="text-white font-bold text-sm">Junior Developer @ Tech Corp (2025-Present)</p>
                    <ul className="list-dash pl-4 text-xs opacity-80">
                        <li>- Architected React-based micro-frontends.</li>
                        <li>- Reduced API latency by 40% via Redis caching.</li>
                    </ul>
                </div>
            </section>

            <div className="pt-4 opacity-50 text-[10px]">
                [ END OF PREVIEW ] - Type 'contact' to request full PDF version.
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
                        href="https://github.com/user/repo1"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:bg-[var(--color-hacker-green)] hover:text-black p-1 transition-all"
                    >
                        {"[01] PROJECT_ALPHA ➜ DEPLOYED_V1.0"}
                    </a>
                </li>
                <li>
                    <a
                        href="https://github.com/user/repo2"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:bg-[var(--color-hacker-green)] hover:text-black p-1 transition-all"
                    >
                        {"[02] NEURAL_INTERFACE ➜ IN_PROGRESS"}
                    </a>
                </li>
            </ul>
        </div>
    ),

    github: () => {
        window.open("https://github.com/Phuoc-Nguyen-CS", "_blank");
        return "REDIRECTING TO GITHUB...";
    },

    restart: () => "SYSTEM RESTART INITIATED...",

    clear: () => "Clearing terminal buffer..."
};

export const COMMAND_LIST = Object.keys(COMMANDS);