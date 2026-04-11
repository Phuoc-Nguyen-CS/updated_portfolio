/**
 * @file executables.tsx
 * @description Defines the behavior for simulated binary executions (./file).
 */
import type { CommandResponse } from "./types";
import leetcodeData from "./leetcode_stats.json";

/* =========================================================
    EXECUTABLES (For './')
    What happens when the user EXECUTES the files.
   ========================================================= */
export const EXECUTABLES: Record<string, () => CommandResponse> = {
    "/leetcode.exe": () => {
        const stats = [
            { label: "EASY", count: parseInt(leetcodeData.easy), total: 28, color: "bg-green-500" },
            { label: "MEDIUM", count: parseInt(leetcodeData.medium), total: 101, color: "bg-yellow-500" },
            { label: "HARD", count: parseInt(leetcodeData.hard), total: 21, color: "bg-red-500" },
        ];

        return {
            output: (
                <div className="mt-2 space-y-3 border-l-2 border-[var(--color-hacker-green)] pl-4">
                    <p className="text-white font-bold underline text-sm sm:text-base">// LEETCODE_SYNCED</p>
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
            )
        };
    },

    "/contact.exe": () => ({
        output: (
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
                    <p>Location: Orange County, CA</p>
                </div>
            </div>
        )
    }),

    "/github.exe": () => ({
        output: (
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
                <p className="text-[10px] text-white/40 mt-2 italic">Note: Clicking will initialize in a new tab.</p>
            </div>
        )
    }),

    /* =========================================================
        PROJECT SIMULATIONS
       ========================================================= */
    "/projects/maple_discord_bot.py": () => ({
        output: (
            <div className="mt-2 border-l-2 border-[#5865F2] pl-4 bg-[#5865F2]/5 py-3 animate-in fade-in slide-in-from-left-2 duration-500">
                <p className="text-[#5865F2] font-bold font-mono uppercase">[*] Initializing Discord.py Wrapper...</p>
                <p className="text-white/70 font-mono text-xs mt-1">Authenticating token... [OK]</p>
                <p className="text-white/70 font-mono text-xs">Connecting to Discord Gateway... [OK]</p>
                <p className="text-[var(--color-hacker-green)] font-bold font-mono text-xs mt-1 animate-pulse">Scrapping Data for Tesseract to extract</p>

                <div className="mt-4 text-xs space-y-1 border-t border-[#5865F2]/30 pt-2">
                    <p className="text-white font-bold mb-2">REGISTERED_SLASH_COMMANDS:</p>
                    <p className="text-white/70"><span className="text-yellow-400 font-bold">/track</span> [user] - Fetch daily exp gain.</p>
                    <p className="text-white/70"><span className="text-yellow-400 font-bold">/culvert</span> [user] - Fetch weekly culvert scores.</p>
                </div>

                <a
                    href="https://github.com/Phuoc-Nguyen-CS/DiscordMapleBot"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-block px-3 py-1 bg-[#5865F2] text-white font-bold hover:bg-white hover:text-[#5865F2] transition-colors text-xs"
                >
                    [OPEN_SOURCE_CODE]
                </a>
            </div>
        )
    }),

    "/projects/gesture_detection.py": () => ({
        output: (
            <div className="mt-2 border-l-2 border-orange-500 pl-4 bg-orange-500/5 py-3 animate-in fade-in slide-in-from-left-2 duration-500">
                <p className="text-orange-400 font-bold font-mono uppercase">[*] Loading TensorFlow/Keras Models...</p>
                <p className="text-white/70 font-mono text-xs mt-1">Importing OpenCV2... [OK]</p>
                <p className="text-white/70 font-mono text-xs">Initializing MediaPipe Hand Tracking... [OK]</p>
                <p className="text-[var(--color-hacker-green)] font-bold font-mono text-xs mt-1">Camera Feed: ACTIVE (Simulated)</p>

                <div className="mt-3 bg-black/50 p-2 font-mono text-[10px] text-orange-300/80">
                    <p className="animate-pulse">{">"} TARGET ACQUIRED: Hand_01</p>
                    <p>{">"} CONFIDENCE_SCORE: 0.982</p>
                    <p>{">"} BOUNDING_BOX: [X: 142, Y: 89, W: 210, H: 250]</p>
                    <p className="text-white font-bold mt-1">{">"} DETECTED_GESTURE: "VOLUME_UP"</p>
                    <p className="text-[var(--color-hacker-green)]">{">"} EXECUTING SYSTEM COMMAND... SUCCESS</p>
                </div>

                <a
                    href="https://github.com/Phuoc-Nguyen-CS/Hand-Gesture-Volume-Control-and-Webpage-Launcher"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-block px-3 py-1 bg-orange-500 text-black font-bold hover:bg-white hover:text-orange-600 transition-colors text-xs"
                >
                    [OPEN_SOURCE_CODE]
                </a>
            </div>
        )
    }),

    "/projects/cebu_real_estate.js": () => ({
        output: (
            <div className="mt-2 border-l-2 border-cyan-500 pl-4 bg-cyan-500/5 py-3 animate-in fade-in slide-in-from-left-2 duration-500">
                <p className="text-cyan-400 font-bold font-mono uppercase">[*] Initializing Next.js / Supabase Client...</p>
                <p className="text-white/70 font-mono text-xs mt-1">Fetching property listings from Postgres... [OK]</p>
                <p className="text-[var(--color-hacker-green)] font-bold font-mono text-xs mt-1">Status: 200 OK (38ms)</p>

                <div className="mt-3 bg-black/50 p-2 font-mono text-[10px] text-cyan-300/80 overflow-hidden">
                    <pre className="whitespace-pre-wrap break-words">{`
                    {
                        "properties": [
                            {
                            "id": "CEB-01",
                            "type": "Condominium",
                            "location": "Cebu Park",
                            "status": "Available"
                            },
                            ...
                        ]
                    }`}
                    </pre>
                </div>

                <a
                    href="https://github.com/Jameboyyy/CLS-Properties"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-block px-3 py-1 bg-cyan-500 text-black font-bold hover:bg-white hover:text-cyan-600 transition-colors text-xs"
                >
                    [OPEN_SOURCE_CODE]
                </a>
            </div>
        )
    }),

    "/projects/terminal_portfolio.tsx": () => ({
        output: (
            <div className="mt-2 border-l-2 border-[var(--color-hacker-green)] pl-4 bg-[var(--color-hacker-green)]/5 py-3 animate-in fade-in slide-in-from-left-2 duration-500">
                <p className="text-[var(--color-hacker-green)] font-bold font-mono uppercase">[*] Bootstrapping MIR_OS Environment...</p>
                <p className="text-white/70 font-mono text-xs mt-1">Compiling React components... [OK]</p>
                <p className="text-white/70 font-mono text-xs">Injecting Virtual File System (VFS)... [OK]</p>
                <p className="text-white/70 font-mono text-xs">Mounting Dynamic Blog Data... [OK]</p>
                <p className="text-yellow-400 font-bold font-mono text-xs mt-1 animate-pulse">SYSTEM STATUS: FULLY_OPERATIONAL</p>

                <div className="mt-3 bg-black/50 p-2 font-mono text-[10px] text-[var(--color-hacker-green)]/80 border border-[var(--color-hacker-green)]/20">
                    <p>{">"} VITE v5.0.0 ready in 142ms</p>
                    <p>{">"} Local: http://localhost:5173/</p>
                    <p>{">"} TailwindCSS loading... SUCCESSFUL</p>
                    <p className="text-white mt-2 font-bold">{">"} Vercel Hosting... STABLE</p>
                </div>

                <a
                    href="https://github.com/Phuoc-Nguyen-CS/updated_portfolio"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-block px-3 py-1 bg-[var(--color-hacker-green)] text-black font-bold hover:bg-white transition-colors text-xs"
                >
                    [OPEN_SOURCE_CODE]
                </a>
            </div>
        )
    }),
};