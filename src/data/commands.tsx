import React from "react";
import leetcodeData from "./leetcode_stats.json";
import logEntries from "./logs.json";

export type CommandResponse = string | React.ReactNode;

/* =========================================================
    VFS (VIRTUAL FILE SYSTEM)
    We use 'any' or a Record type here so we can add 
    dynamic log folders later.
   ========================================================= */
export const VFS: Record<string, { type: string; children: string[] }> = {
    "/": {
        type: "dir",
        children: ["about.txt", "resume.txt", "leetcode.exe", "contact.exe", "github.exe", "projects", "logs"]
    },
    "/projects": {
        type: "dir",
        children: ["README.md", "cebu_real_estate.js", "terminal_portfolio.tsx", "maple_discord_bot.py", "gesture_detection.py"]
    },
    "/logs": {
        type: "dir",
        children: []
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
    LOG_BLOG
    This runs immediately when the file is imported.
   ========================================================= */
logEntries.forEach((entry) => {
    const folderName = entry.folder.toLowerCase();
    const folderPath = `/logs/${folderName}`;
    const fileName = `${entry.id}.md`.toLowerCase();

    // 1. Ensure the parent (/logs) knows about the child (March2026)
    if (VFS["/logs"] && !VFS["/logs"].children.includes(folderName)) {
        VFS["/logs"].children.push(folderName);
    }

    // 2. Create the actual directory entry for the child
    if (!VFS[folderPath]) {
        VFS[folderPath] = {
            type: "dir",
            children: []
        };
    }

    // 3. Add the file to the child's children list
    if (!VFS[folderPath].children.includes(fileName)) {
        VFS[folderPath].children.push(fileName);
    }

    // 4. Map the file content
    FILE_CONTENT[fileName] = () => (
        <div className="mt-2 max-w-3xl animate-in fade-in slide-in-from-left-2 duration-500">
            <div className="border-l-4 border-[var(--color-hacker-green)] pl-4 py-1 mb-6 bg-[var(--color-hacker-green)]/5">
                <h1 className="text-white font-bold text-lg md:text-xl uppercase tracking-wide">
                    {entry.title}
                </h1>
                <div className="flex justify-between items-baseline mt-1">
                    <p className="text-[var(--color-hacker-green)] text-xs md:text-sm font-mono opacity-90">
                        [ LOG_DATE: {entry.date} ]
                    </p>
                    <p className="text-white/20 text-[10px] font-mono select-none hidden sm:block">
                        ID:{entry.id}
                    </p>
                </div>
            </div>

            <div className="text-white/80 text-sm md:text-base space-y-3 font-mono leading-relaxed pl-1 md:pl-5">
                {entry.content.map((line, i) => {
                    // Sub-headers (#) get a slight highlight
                    if (line.startsWith('#')) {
                        return (
                            <p key={i} className="text-[var(--color-hacker-green)] font-bold text-base border-b border-white/10 pb-1 mt-6 mb-2">
                                {line.replace('#', '').trim()}
                            </p>
                        );
                    }
                    if (line.startsWith('*') || line.startsWith('-')) {
                        return (
                            <p key={i} className="flex gap-3 pl-2">
                                <span className="text-[var(--color-hacker-green)] opacity-80 mt-[2px]">{">>"}</span>
                                <span>{line.substring(1).trim()}</span>
                            </p>
                        );
                    }
                    // Standard text
                    return <p key={i}>{line}</p>;
                })}
            </div>

            {/* SUBTLE FOOTER */}
            <div className="mt-8 pt-2 border-t border-white/10 flex justify-between items-center opacity-40">
                <p className="text-[10px] font-mono text-[var(--color-hacker-green)] uppercase">
                    EOF_REACHED //
                </p>
            </div>
        </div>
    );
});

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

    /* =========================================================
        PROJECT SIMULATIONS
       ========================================================= */
    "maple_discord_bot.py": () => (
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
    ),

    "gesture_detection.py": () => (
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
    ),

    "cebu_real_estate.js": () => (
        <div className="mt-2 border-l-2 border-cyan-500 pl-4 bg-cyan-500/5 py-3 animate-in fade-in slide-in-from-left-2 duration-500">
            <p className="text-cyan-400 font-bold font-mono uppercase">[*] Initializing Next.js / Supabase Client...</p>
            <p className="text-white/70 font-mono text-xs mt-1">Fetching property listings from Postgres... [OK]</p>
            <p className="text-[var(--color-hacker-green)] font-bold font-mono text-xs mt-1">Status: 200 OK (38ms)</p>

            <div className="mt-3 bg-black/50 p-2 font-mono text-[10px] text-cyan-300/80 overflow-hidden">
                <pre>{`
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
    ),
    "terminal_portfolio.tsx": () => (
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
        setSessionFiles?: React.Dispatch<React.SetStateAction<Record<string, { content: string[], path: string }>>>
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

        // Combine both arrays and remove duplicates
        const combinedItems = Array.from(new Set([...staticChildren, ...localSessionFiles])).sort((a, b) => a.localeCompare(b));

        // UI LOGIC: If we are inside a specific log folder.
        // use a vertical flex-col layout. Otherwise, use the standard grid.
        const isBlogDirectory = cwd.startsWith("/logs/");
        const containerClass = isBlogDirectory
            ? "flex flex-col space-y-1 mt-2 glow-text"
            : "grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 glow-text";

        return (
            <div className={containerClass}>
                {combinedItems.map((item) => {
                    const isDir = !item.includes('.');

                    // Default coloring
                    let colorClass = isDir
                        ? "text-[var(--color-hacker-green)] font-bold"
                        : "text-white";

                    // Specific highlight for root files
                    if (item.toLowerCase() === "readme.md" || item.toLowerCase() === "about.txt" || item.toLowerCase() === "resume.txt") {
                        colorClass = "text-yellow-400 font-bold animate-pulse brightness-125";
                    }

                    if (isBlogDirectory && !isDir) {
                        colorClass = "text-green-300";
                    }

                    return (
                        <span key={item} className={`${colorClass} truncate`}>
                            {isBlogDirectory && !isDir && <span className="text-green-500/90 mr-2">[-]</span>}
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
    
    const target = args[0].trim();

    // 1. Handle "cd .."
    if (target === "..") {
        if (cwd === "/") return "";
        const parts = cwd.split("/").filter(Boolean);
        parts.pop();
        const newPath = "/" + parts.join("/");
        if (setCwd) setCwd(newPath === "" ? "/" : newPath);
        return "";
    }

    // 2. Build the Absolute Path
    // We ensure there is exactly one slash between the current dir and the target
    let newPath = "";
    if (target.startsWith("/")) {
        newPath = target; // Absolute path
    } else {
        newPath = cwd === "/" ? `/${target}` : `${cwd}/${target}`;
    }

    // Remove any trailing slashes for the lookup
    newPath = newPath.replace(/\/+$/, "");
    if (newPath === "") newPath = "/";

    // 3. THE LOOKUP
    const targetObj = VFS[newPath as keyof typeof VFS];

    if (targetObj && targetObj.type === "dir") {
        if (setCwd) setCwd(newPath);
        return "";
    } else {
        return <span className="text-red-500">bash: cd: {target}: No such file or directory</span>;
    }
},

    // 03. CAT: Readable file-only guard
    cat: (args, cwd = "/", _setCwd, sessionFiles) => {
        if (!args || args.length === 0) return "cat: missing file operand";

        const inputTarget = args[0].trim();

        // 1. Separate the path from the filename
        const parts = inputTarget.split("/");
        const targetFileName = parts.pop() || ""; // The last part is always the file
        const targetDirRaw = parts.length > 0 ? parts.join("/") : "";

        // 2. Resolve the target directory path
        let targetDirPath = cwd;
        if (targetDirRaw !== "") {
            if (targetDirRaw.startsWith("/")) {
                targetDirPath = targetDirRaw; // Absolute path (e.g., /logs/march2026)
            } else {
                targetDirPath = cwd === "/" ? `/${targetDirRaw}` : `${cwd}/${targetDirRaw}`; // Relative path
            }
        }

        // Clean up trailing slashes for the VFS lookup
        targetDirPath = targetDirPath.replace(/\/+$/, "");
        if (targetDirPath === "") targetDirPath = "/";

        // 3. Find the target folder in the VFS
        const targetFolder = VFS[targetDirPath as keyof typeof VFS];

        if (!targetFolder) {
            return <span className="text-red-500">cat: {inputTarget}: No such file or directory</span>;
        }

        // 4. Check Session RAM (User-created files in that specific target path)
        const actualSessionKey = Object.keys(sessionFiles || {}).find(
            key => key.toLowerCase() === targetFileName.toLowerCase() && sessionFiles[key].path === targetDirPath
        );

        if (actualSessionKey) {
            return (
                <div className="whitespace-pre-wrap mt-1">
                    {sessionFiles[actualSessionKey].content.join("\n")}
                </div>
            );
        }

        // 5. Match against the VFS target directory (Case-Insensitive)
        const actualKey = targetFileName.toLowerCase();
        const vfsMatch = targetFolder.children.find(c => c.toLowerCase() === actualKey);

        // Check if they tried to cat a directory instead of a file
        if (vfsMatch && !vfsMatch.includes('.')) {
            return <span className="text-red-500">cat: {inputTarget}: Is a directory</span>;
        }

        if (!vfsMatch) {
            return <span className="text-red-500">cat: {inputTarget}: No such file or directory</span>;
        }

        // Return static content from FILE_CONTENT
        const fileContentKey = Object.keys(FILE_CONTENT).find(k => k.toLowerCase() === vfsMatch.toLowerCase()) || vfsMatch;

        if (FILE_CONTENT[fileContentKey]) {
            return FILE_CONTENT[fileContentKey]();
        }

        return <span className="text-red-500">cat: {inputTarget}: Permission denied</span>;
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

    // 04. QUICKSTART: The Non-Tech Guided Tour
    quickstart: () => {
        const techArsenalData = [
            { label: "LANGUAGES:", value: "TypeScript, JavaScript, Python, C/C++, SQL" },
            { label: "FRONTEND:", value: "React, Next.js, Tailwind CSS" },
            { label: "BACKEND & DB:", value: "Django, Node.js, Supabase, PostgreSQL" },
            { label: "AI & VISION:", value: "TensorFlow, OpenCV, MediaPipe" },
            { label: "DEV_TOOLS:", value: "Git, Postman, Vercel, Netlify, OCR Tools" }
        ];

        const activeProjectsData = [
            { title: "Cebu Real-Estate Architecture", desc: "Modern property listing platform using Supabase & Next.js." },
            { title: "Maplestory Discord Bot", desc: "Python automation tool using OCR and BeautifulSoup." },
            { title: "AI Gesture Control", desc: "Hand-tracking via OpenCV/TensorFlow for PC media controls." },
            { title: "MIR_OS Terminal", desc: "This highly interactive web-based operating system." }
        ];

        return (
            <div className="mt-2 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <div className="border border-[var(--color-hacker-green)]/30 bg-black/40 p-4 md:p-6 shadow-[0_0_15px_rgba(0,255,0,0.05)]">

                    {/* HEADER */}
                    <div className="border-b border-[var(--color-hacker-green)]/30 pb-3 mb-5">
                        <h2 className="text-[var(--color-hacker-green)] text-xl font-bold tracking-widest flex items-center gap-2">
                            <span className="animate-pulse">{">>"}</span> AUTOMATED_PORTFOLIO_TOUR
                        </h2>
                        <p className="text-white/60 text-xs font-mono mt-1">
                            Compiled for non-technical personnel. Bypassing manual navigation protocols...
                        </p>
                    </div>

                    {/* SECTION 1: ABOUT */}
                    <div className="mb-6">
                        <h3 className="text-white font-bold text-sm bg-[var(--color-hacker-green)]/20 inline-block px-2 py-1 mb-2">
                            01 // ROOT_OWNER:
                        </h3>
                        <div className="text-white/80 text-sm pl-3 border-l-2 border-white/20 space-y-3">
                            <p>
                                Hi, I'm Phuoc Nguyen. I'm a developer passionate about building robust applications and designing unique interactive experiences.
                            </p>

                            <div className="space-y-1.5 mt-2 text-xs sm:text-sm font-mono">
                                <p className="flex gap-2">
                                    <span className="text-[var(--color-hacker-green)] font-bold">»</span>
                                    <span><strong className="text-white">EDUCATION:</strong> CSU Fullerton (GPA: 3.6)</span>
                                </p>
                                <p className="flex gap-2">
                                    <span className="text-[var(--color-hacker-green)] font-bold">»</span>
                                    <span><strong className="text-white">ACADEMIC_FOCUS:</strong> Data Science, AI, & Big Data</span>
                                </p>
                                <p className="flex gap-2">
                                    <span className="text-[var(--color-hacker-green)] font-bold">»</span>
                                    <span><strong className="text-white">CURRENT_OBJECTIVE:</strong> Full-Stack Web Development & Automation</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: RESUME SUMMARY */}
                    <div className="mb-6">
                        <h3 className="text-white font-bold text-sm bg-blue-500/20 inline-block px-2 py-1 mb-2 text-blue-300">
                            02 // TECHNICAL_SKILLS
                        </h3>
                        <div className="text-white/80 text-sm pl-3 border-l-2 border-blue-500/30 space-y-2 font-mono">

                            {techArsenalData.map((item, i) => (
                                <div key={i} className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                                    <span className="text-blue-400 font-bold w-28 shrink-0">{item.label}</span>
                                    <span className="text-white">{item.value}</span>
                                </div>
                            ))}

                            <p className="text-xs text-white/40 italic mt-4 pt-2 border-t border-blue-500/20">
                                * To view the full document later, type: <code className="text-yellow-400 bg-white/5 px-1 rounded">cat resume.txt</code>
                            </p>
                        </div>
                    </div>

                    {/* SECTION 3: PROJECTS OVERVIEW */}
                    <div>
                        <h3 className="text-white font-bold text-sm bg-orange-500/20 inline-block px-2 py-1 mb-2 text-orange-300">
                            03 // ACTIVE_PROJECTS
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-3 border-l-2 border-orange-500/30">
                            {activeProjectsData.map((project, i) => (
                                <div key={i} className="bg-white/5 p-2 border border-white/5 hover:border-orange-500/50 transition-colors">
                                    <p className="text-orange-400 font-bold text-xs">{project.title}</p>
                                    <p className="text-white/60 text-[10px] mt-1">{project.desc}</p>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-white/40 italic mt-3 pl-3">
                            * To run project simulations later, type: <code className="text-yellow-400">cd projects</code> then <code className="text-yellow-400">ls</code> followed by <code className="text-yellow-400">./ [file_name]</code>
                        </p>
                    </div>

                    {/* FOOTER */}
                    <div className="mt-6 pt-3 border-t border-[var(--color-hacker-green)]/30 text-center flex justify-between items-center">
                        <p className="text-xs text-white/50">SYSTEM.TOUR_COMPLETE</p>
                        <p className="text-xs text-[var(--color-hacker-green)] animate-pulse font-bold">ENJOY_YOUR_STAY //</p>
                    </div>
                </div>
            </div>
        );
    },

    /* ---------------------------------------------------------
        RESTART & CLEAR: System utilities
       --------------------------------------------------------- */
    restart: () => "SYSTEM RESTART INITIATED...",
    clear: () => "Clearing terminal buffer..."
};

export const COMMAND_LIST = Object.keys(COMMANDS);