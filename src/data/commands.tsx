import React from "react";
import leetcodeData from "./leetcode_stats.json";

export type CommandResponse = string | React.ReactNode;

/* =========================================================
    VFS (VIRTUAL FILE SYSTEM)
    Maps the directory structure and file locations.
    Distinguishes between 'dir' and file entries.
   ========================================================= */
export const VFS = {
    "/": {
        type: "dir",
        children: ["about.txt", "resume.txt", "leetcode.exe", "contact.exe", "github.exe", "projects", "logs"]
    },
    "/projects": {
        type: "dir",
        children: ["README.md", "cebu_real_estate.js", "terminal_portfolio.ts", "maple_discord_bot.py", "gesture_detection.py"]
    },
    "/logs": {
        type: "dir",
        children: ["2026-03-08_system_init.md"]
    }
};

/* =========================================================
    FILE_CONTENT
    This object stores the actual JSX for each "file" in your system.
    These are no longer standalone executable commands.
   ========================================================= */
export const FILE_CONTENT: Record<string, () => CommandResponse> = {
    "about.txt": () => (
        <div className="space-y-1">
            <p>NAME: PHUOC NGUYEN</p>
            <p>UNDERGRADUATE: CSU_FULLERTON ... SUCCESS</p>
            <p>GRADUATE: CSU_LONG_BEACH ... IN_PROGRESS</p>
            <p>LOCATION: ORANGE_COUNTY, CA</p>
            <hr className="border-white/10 my-2" />
            <p className="text-[var(--color-hacker-green)]">{">>"} ENERGY_SOURCE</p>
            <ul className="pl-4 opacity-90 text-md">
                <li>• FUEL_TYPE: 100% Arabica Cold Brew.</li>
                <li>• COFFEE_DEPENDENCY: if(coffee.empty()) brain.dump();</li>
            </ul>
            <p className="text-[var(--color-hacker-green)]">{">>"} MISC_FACTS</p>
            <ul className="pl-4 opacity-90 text-md">
                <li>• ACHIEVEMENT_UNLOCKED: Reached Rank 10 Evan in Maplestory (Reboot NA).</li>
                <li>• QUEST_LOG: Currently grinding my Master's Degree at CSULB.</li>
                <li>• WORK_STATUS: Solo dev looking for a highly-motivated team. </li>
                <li>• TRAVEL_LOG: Visited [3] countries, and [4] different states.</li>
                <li>• LANGUAGE_PACK: Fluent in English and high understanding of Vietnamese.</li>
                <li>• GREATEST_FEAR: Not being able to exit the VIM editor.</li>
            </ul>
            <p className="text-white/90 italic text-sm">"sos.txt"</p>
        </div>
    ),
    "resume.txt": () => (
        <div className="mt-2 space-y-6 text-sm sm:text-base max-w-4xl">
            {/* HEADER SECTION */}
            <div className="border-b border-white/20 pb-4">
                <h2 className="text-xl font-bold text-white uppercase tracking-tighter">Phuoc [Peter] Nguyen</h2>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--color-hacker-green)] opacity-90 mt-1">
                </div>
            </div>

            {/* EDUCATION */}
            <section>
                <p className="text-[var(--color-hacker-green)] font-bold underline mb-2">01. EDUCATION_HISTORY</p>
                <div className="pl-4">
                    <p className="text-white font-bold">California State University, Fullerton</p>
                    <p className="text-white/90">Bachelor of Science, Computer Science (GPA: 3.60/4.0)</p>
                    <p className="text-xs opacity-90 italic">Dean’s List 2021, 2022, 2023 | Graduated May 2023</p>
                </div>
            </section>

            {/* WORK EXPERIENCE */}
            <section>
                <p className="text-[var(--color-hacker-green)] font-bold underline mb-2">02. WORK_EXPERIENCE_LOG</p>
                <div className="space-y-4 pl-4">
                    <div>
                        <div className="flex justify-between items-baseline">
                            <p className="text-white font-bold">Full-Stack Freelance Developer</p>
                            <span className="text-xs">2025-PRESENT</span>
                        </div>
                        <div className="flex">
                            <div className="grid grid-cols-[100px_1fr] gap-x-2 text-sm">
                                <span className="text-[var(--color-hacker-green)] font-bold">FRONTEND:</span>
                                <span className="text-white">JavaScript, React, Tailwind CSS, Swiper.js</span>

                                <span className="text-[var(--color-hacker-green)] font-bold">BACKEND:</span>
                                <span className="text-white">Supabase, Next.js, SQL</span>

                                <span className="text-[var(--color-hacker-green)] font-bold">DESIGN:</span>
                                <span className="text-white">Figma</span>
                            </div>
                        </div>
                        <ul className="list-dash pl-4 text-xs sm:text-sm opacity-90 mt-1 space-y-1">
                            <li>• Modernized real-estate UI/UX using React, Supabase, and Swiper.js.</li>
                            <li>• Implemented SEO best practices to drive traffic and optimized performance for older devices.</li>
                            <li>• Managed project via Agile framework to ensure stakeholder value and deployment via Vercel.</li>
                        </ul>
                    </div>
                    <div>
                        <div className="flex justify-between items-baseline">
                            <p className="text-white font-bold">Audio Visual Solutions (IT Technician)</p>
                            <span className="text-xs">2024-2024</span>
                        </div>
                        <ul className="list-dash pl-4 text-xs sm:text-sm opacity-90 mt-1 space-y-1">
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
                        <p className="text-white font-bold">Game Activity Automation Tool</p>
                        <div className="flex">
                            <div className="grid grid-cols-[100px_1fr] gap-x-2 text-sm">
                                <span className="text-[var(--color-hacker-green)] font-bold">LANGUAGES</span>
                                <span className="text-white">Python</span>

                                <span className="text-[var(--color-hacker-green)] font-bold">Tools</span>
                                <span className="text-white">Discord.API, Tesseract, OpenCV, BeautifulSoup4</span>
                            </div>
                        </div>
                        <ul className="list-dash pl-4 text-xs sm:text-sm opacity-90 mt-1 space-y-1">
                            <li>• Developed a Discord Bot to assist in weekly Game Activity Management.</li>
                            <li>• Leveraged OpenCV/Tesseract for data extraction and BeautifulSoup4 for web scraping.</li>
                            <li>• Discovered a bottleneck and optimized execution speed by 92% through asynchronous programming.</li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-white font-bold">Gesture Detection Program</p>
                        <div className="flex">
                            <div className="grid grid-cols-[100px_1fr] gap-x-2 text-sm">
                                <span className="text-[var(--color-hacker-green)] font-bold">LANGUAGES</span>
                                <span className="text-white">Python</span>

                                <span className="text-[var(--color-hacker-green)] font-bold">Tools</span>
                                <span className="text-white">OpenCV, TensorFlow</span>
                            </div>
                        </div>
                        <ul className="list-dash pl-4 text-xs sm:text-sm opacity-90 mt-1 space-y-1">
                            <li>• Developed real-time hand-tracking software with 95% recognition accuracy.</li>
                            <li>• Trained custom models using Mediapipe and TensorFlow for unique hand gestures.</li>
                            <li>• Gestures could then be translated into computer commands to allow more ways to interact with a computer.</li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-white font-bold">Terminal Portfolio</p>
                        <div className="flex">
                            <div className="grid grid-cols-[100px_1fr] gap-x-2 text-sm">
                                <span className="text-[var(--color-hacker-green)] font-bold">OS:</span>
                                <span className="text-white">MIR_OS</span>

                                <span className="text-[var(--color-hacker-green)] font-bold">FRONTEND:</span>
                                <span className="text-white">Typescript, Javascript, Tailwind CSS, Vite</span>

                                <span className="text-[var(--color-hacker-green)] font-bold">DESIGN:</span>
                                <span className="text-white">Figma</span>
                                
                                <span className="text-[var(--color-hacker-green)] font-bold">CI/CD</span>
                                <span className="text-white">Github-Actions</span>

                                <span className="text-[var(--color-hacker-green)] font-bold">DEPLOYMENT:</span>
                                <span className="text-white">Vercel</span>

                            </div>
                        </div>
                        <ul className="list-dash pl-4 text-xs sm:text-sm opacity-90 mt-1 space-y-1">
                            <li>• Developed a portfolio website mimicking a Linux terminal.</li>
                            <li>• Added functionalities such as: auto-completion, command history, and command suggestions.</li>
                            <li>• Engineered an automated CI/CD pipeline using Github Actions and Repository Dispatch events to sync real-time updates.</li>
                        </ul>
                    </div>
                </div>
            </section>
            {/* SKILLS & CERTS */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* TECH_STACK */}
                <div>
                    <p className="text-[var(--color-hacker-green)] font-bold underline mb-3">04. TECH_STACK</p>
                    <div className="space-y-1 text-xs sm:text-sm">
                        <div className="flex">
                            <span className="text-white w-20 shrink-0 font-mono">[LANG]</span>
                            <span className="opacity-90">Python, C/C++, Javascript, SQL, Java, R, Typescript</span>
                        </div>
                        <div className="flex">
                            <span className="text-white w-20 shrink-0 font-mono">[SOFT]</span>
                            <span className="opacity-90">VSCode, GitHub, Git, Figma, R Studio</span>
                        </div>
                        <div className="flex">
                            <span className="text-white w-20 shrink-0 font-mono">[FRAME]</span>
                            <span className="opacity-90">React, AWS S3, OpenCV, Django, Pandas, Vite</span>
                        </div>
                        <div className="flex">
                            <span className="text-white w-20 shrink-0 font-mono">[STYLE]</span>
                            <span className="opacity-90">Tailwind CSS, Bootstrap, CSS, HTML</span>
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
                                <span className="text-[var(--color-hacker-green)] text-[10px] tracking-widest mt-1 opacity-90">
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
    "README.md": () => (
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
                        {"[01] Cebu Real-Estate Property Website (JavaScript)"}
                    </a>
                </li>
                <li>
                    <a
                        href="https://github.com/Phuoc-Nguyen-CS/updated_portfolio"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:bg-[var(--color-hacker-green)] hover:text-black p-1 transition-all"
                    >
                        {"[02] Terminal Portfolio (TypeScript)"}
                    </a>
                </li>
                <li>
                    <a
                        href="https://github.com/Phuoc-Nguyen-CS/DiscordMapleBot"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:bg-[var(--color-hacker-green)] hover:text-black p-1 transition-all"
                    >
                        {"[03] Maplestory Discord Bot (Python)"}
                    </a>
                </li>
                <li>
                    <a
                        href="https://github.com/Phuoc-Nguyen-CS/Hand-Gesture-Volume-Control-and-Webpage-Launcher"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:bg-[var(--color-hacker-green)] hover:text-black p-1 transition-all"
                    >
                        {"[04] Hand Gesture Detection Program (Python)"}
                    </a>
                </li>
            </ul>
        </div>
    )
};

/* =========================================================
    EXECUTABLES (For './')
    What happens when the user EXECUTES the files.
   ========================================================= */
export const EXECUTABLES: Record<string, () => CommandResponse> = {
    "leetcode.exe": () => {
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

    "contact.exe": () => (
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
    ),

    "github.exe": () => (
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
};
/* =========================================================
    COMMAND LOGIC
    Defines the executable behavior for terminal commands
    (ls, cd, cat, etc.). Handles VFS navigation.
   ========================================================= */
export const COMMANDS: Record<
    string,
    (
        args: string[],
        cwd: string,
        setCwd: (path: string) => void,
        sessionFiles: Record<string, { content: string[], path: string }>,
        setSessionFiles?: React.Dispatch<React.SetStateAction<Record<string, { content: string[], path: string }>>> // <--- ADD THIS
    ) => CommandResponse> = {

    // 01. LS: Context Aware listing
    ls: (_args, cwd = "/", _setCwd, sessionFiles) => {
        const currentFolder = VFS[cwd as keyof typeof VFS];
        if (!currentFolder) return <span className="text-red-500">ERR: DIRECTORY_NOT_FOUND [{cwd}]</span>;


        // 1. Grab static files from VFS
        // 2. Filter sessionFiles to only those matching the current path
        const staticChildren = currentFolder.children;
        const localSessionFiles = Object.keys(sessionFiles || {}).filter(
            (fileName) => sessionFiles[fileName].path === cwd
        );

        // Combine both arrays and remove duplicates (just in case)
        const combinedItems = Array.from(new Set([...staticChildren, ...localSessionFiles])).sort((a, b) => a.localeCompare(b));

        return (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 glow-text">
                {combinedItems.map((item) => {
                    const isDir = !item.includes('.');

                    let colorClass = isDir
                        ? "text-[var(--color-hacker-green)] font-bold"
                        : "text-white";

                    if (item === "README.md" || item === "about.txt" || item === "resume.txt") {
                        colorClass = "text-yellow-400 font-bold animate-pulse brightness-125";
                    }

                    return (
                        <span key={item} className={colorClass}>
                            {item}{isDir && "/"}
                        </span>
                    );
                })}
            </div>
        );
    },

    // 02. CD: Directory-only navigation guard
    cd: (args, cwd = "/", setCwd) => {
        if (!args || args.length === 0) {
            if (setCwd) setCwd("/");
            return "";
        }
        
        const target = args[0].replace(/\/+$/, "");

        if (target === "..") {
            if (cwd === "/") return "";
            const parts = cwd.split("/").filter(Boolean);
            parts.pop();
            const newPath = "/" + parts.join("/");
            if (setCwd) setCwd(newPath === "/" ? "/" : newPath);
            return "";
        }

        // Resolve path
        const newPath = cwd === "/" ? `/${target}` : `${cwd}/${target}`;

        /* ---------------------------------------------------------
            LINUX_GUARD: Check if target exists and is a DIRECTORY
           --------------------------------------------------------- */
        const targetObj = VFS[newPath as keyof typeof VFS];
        if (targetObj && targetObj.type === "dir") {
            if (setCwd) setCwd(newPath);
            return "";
        } else if (target.includes('.')) {
            return <span className="text-red-500">bash: cd: {target}: Not a directory</span>;
        } else {
            // Note: We use the original target for the error message for better UX
            return <span className="text-red-500">bash: cd: {args[0]}: No such file or directory</span>;
        }
    },

    // 03. CAT: Readable file-only guard
    cat: (args, cwd = "/", _setCwd, sessionFiles) => {
        if (!args || args.length === 0) return "cat: missing file operand";

        // 1. Get the user's input
        const inputTarget = args[0].replace(/\/+$/, "");

        // 2. Find the ACTUAL key (handling case-insensitivity)
        const systemKeys = Object.keys(FILE_CONTENT);
        const sessionKeys = Object.keys(sessionFiles || {});

        const actualKey = [...systemKeys, ...sessionKeys].find(
            key => key.toLowerCase() === inputTarget.toLowerCase()
        ) || inputTarget;

        const currentFolder = VFS[cwd as keyof typeof VFS];

        // 3. Check Session RAM (Current folder only)
        if (sessionFiles && sessionFiles[actualKey] && sessionFiles[actualKey].path === cwd) {
            return (
                <div className="whitespace-pre-wrap mt-1">
                    {sessionFiles[actualKey].content.join("\n")}
                </div>
            );
        }

        // 4. Check if it's a directory
        if (actualKey.indexOf('.') === -1 && currentFolder?.children.includes(actualKey)) {
            return <span className="text-red-500">cat: {actualKey}: Is a directory</span>;
        }

        // 5. Check if file exists in the current folder VFS
        // We compare against the VFS children list (case-insensitive)
        const vfsMatch = currentFolder?.children.find(c => c.toLowerCase() === inputTarget.toLowerCase());

        if (!vfsMatch) {
            return <span className="text-red-500">cat: {inputTarget}: No such file or directory</span>;
        }

        // 6. Return static content
        if (FILE_CONTENT[vfsMatch]) {
            return FILE_CONTENT[vfsMatch]();
        }

        return <span className="text-red-500">cat: {vfsMatch}: Permission denied</span>;
    },

    // 04. RM: Remove user created files
    rm: (args, cwd, _setCwd, sessionFiles, setSessionFiles) => {
        if (!args.length) return "rm: missing operand";
        const file = args[0].replace(/\/+$/, "");

        // 1. PROTECT SYSTEM FILES (Metadata Safety)
        if (Object.keys(FILE_CONTENT).includes(file) || Object.keys(EXECUTABLES).includes(file)) {
            return <span className="text-red-500">rm: cannot remove '{file}': Permission denied</span>;
        }

        // 2. PROTECT DIRECTORIES
        const currentFolder = VFS[cwd as keyof typeof VFS];
        if (currentFolder?.children.includes(file) && !file.includes('.')) {
            return <span className="text-red-500">rm: cannot remove '{file}': Is a directory</span>;
        }

        // 3. DELETE USER FILES
        if (sessionFiles[file] && sessionFiles[file].path === cwd) {
            if (setSessionFiles) {
                setSessionFiles((prev: any) => {
                    const newState = { ...prev };
                    delete newState[file];
                    return newState;
                });
                return ``; // Success (Linux rm is silent on success)
            }
        }

        return <span className="text-red-500">rm: cannot remove '{file}': No such file or directory</span>;
    },

    // 05. HELP: For those that will definitely need help
    help: () => (
        <div className="mt-2 space-y-4 max-w-3xl border-l-2 border-yellow-500 pl-4 animate-in fade-in slide-in-from-left-4 duration-500 overflow-hidden">
            <div>
                <p className="text-yellow-400 font-bold uppercase tracking-widest underline decoration-2">
                // SYSTEM_MANUAL_V0.0.5
                </p>
                <p className="text-white/60 text-xs italic">"I.. might be stuck in VIM.. if you see this send help!"</p>
            </div>

            {/* DEVICE COMPATIBILITY WARNING */}
            <div className="bg-red-500/10 border border-red-500/50 p-2 text-xs">
                <p className="text-red-400 font-bold flex items-center gap-2">
                    [!] HARDWARE_LIMITATION_NOTICE
                </p>
                <p className="text-white/80 mt-1">
                    The <span className="text-white font-bold">Vim Editor</span> is optimized for <span className="text-white font-bold underline">PC/Desktop environments</span>.
                    Mobile virtual keyboards lack the physical <code className="bg-white/10 px-1">Esc</code> and <code className="bg-white/10 px-1">:</code> keys required for modal navigation.
                </p>
            </div>

            {/* CORE NAVIGATION */}
            <section>
                <p className="text-[var(--color-hacker-green)] font-bold">[ CORE_NAVIGATION ]</p>
                <div className="grid grid-cols-[max-content_1fr] gap-x-2 text-sm mt-1">
                    <span className="text-white font-mono">ls</span>
                    <span className="text-white/80">List files in the current sector.</span>
                    <span className="text-white font-mono">cd [dir]</span>
                    <span className="text-white/80">Move to a sub-directory.</span>
                    <span className="text-white font-mono">cat [file]</span>
                    <span className="text-white/80">Read a file (e.g. <code className="bg-white/10 px-1">cat about.txt</code>).</span>
                    <span className="text-white font-mono">rm [file]</span>
                    <span className="text-white/80">Delete a user-created file.</span>
                </div>
            </section>

            {/* VIM GUIDE */}
            <section className="bg-white/5 p-3 border border-white/10">
                <p className="text-yellow-500 font-bold flex items-center gap-2 uppercase tracking-tighter">
                    <span>[*]</span> VIM_QUICKSTART (PC ONLY)
                </p>

                {/* Using max-content for the first column prevents bleeding */}
                <div className="grid grid-cols-[max-content_1fr] gap-x-6 gap-y-1 text-xs mt-3">
                    <span className="text-[var(--color-hacker-green)] font-mono whitespace-nowrap">i</span>
                    <span className="text-white/80">INSERT MODE: Start typing text.</span>

                    <span className="text-[var(--color-hacker-green)] font-mono whitespace-nowrap">ESC</span>
                    <span className="text-white/80">NORMAL MODE: Enter command mode.</span>

                    <span className="text-[var(--color-hacker-green)] font-mono whitespace-nowrap">:wq</span>
                    <span className="text-white/80">SAVE & EXIT: Write changes and quit.</span>

                    <span className="text-[var(--color-hacker-green)] font-mono whitespace-nowrap">:q</span>
                    <span className="text-white/80">QUIT: Discard changes and exit.</span>
                </div>

                <div className="mt-4 pt-2 border-t border-white/5">
                    <p className="text-[var(--color-hacker-green)] text-[10px] sm:text-xs font-mono opacity-70">
                       VIM EXIT SEQUENCE {">>"} <span className="text-white underline">[ESC]</span> then <span className="text-white">:wq</span>
                    </p>
                </div>
            </section>

            {/* PRO TIPS */}
            <section>
                <p className="text-[var(--color-hacker-green)] font-bold">[ PRO_TIPS ]</p>
                <ul className="list-dash pl-4 text-xs space-y-1 text-white/80 mt-1">
                    <li>Use <span className="text-white font-bold">TAB</span> to auto-complete file names.</li>
                    <li>Use <span className="text-white font-bold">ARROW_UP</span> to recall previous commands.</li>
                </ul>
            </section>
        </div>
    ),

    /* ---------------------------------------------------------
        RESTART & CLEAR: System utilities
       --------------------------------------------------------- */
    restart: () => "SYSTEM RESTART INITIATED...",
    clear: () => "Clearing terminal buffer..."
};

export const COMMAND_LIST = Object.keys(COMMANDS);