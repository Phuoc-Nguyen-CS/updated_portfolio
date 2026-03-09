// src/data/system_files.tsx
import type { CommandResponse } from "./types";

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