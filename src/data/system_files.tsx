// src/data/system_files.tsx
// import { SystemHints } from "../components/system_hints"; No need for it anymore

/* =========================================================
    FILE_CONTENT
    This object stores the actual JSX for each "file" in your system.
    These are no longer standalone executable commands.
   ========================================================= */


export const FILE_CONTENT: Record<string, () => React.ReactNode> = {
    "/about.txt": () => (
        <div className="space-y-6 max-w-2xl font-mono">
            {/* Header Section: High Contrast but Clean */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 border-l-2 border-blue-500/50 pl-4">
                <div className="flex flex-col">
                    <span className="text-[10px] text-blue-400/60 uppercase tracking-tighter">ROOT_OWNER</span>
                    <p className="text-white font-bold tracking-widest text-lg">PHUOC [PETER] NGUYEN</p>
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] text-blue-400/60 uppercase tracking-tighter">Location</span>
                    <p className="text-white/80 italic">ORANGE_COUNTY, CA</p>
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] text-blue-400/60 uppercase tracking-tighter">Education_Status</span>
                    <p className="text-sm">
                        <span className="text-white">CSU_FULLERTON</span> <span className="text-blue-400 font-bold">[SUCCESS]</span>
                    </p>
                    <p className="text-sm">
                        <span className="text-white">CSU_LONG_BEACH</span> <span className="text-yellow-500 animate-pulse">[IN_PROGRESS]</span>
                    </p>
                </div>
            </section>

            {/* Content Sections: Using Muted Colors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Energy Source: Muted Green Accent */}
                <section className="bg-white/5 p-3 rounded-sm border border-white/10">
                    <p className="text-[var(--color-hacker-green)] font-bold text-xs mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[var(--color-hacker-green)] rounded-full"></span>
                        ENERGY_SOURCE
                    </p>
                    <ul className="space-y-2 text-xs text-white/70">
                        <li className="flex gap-2">
                            <span className="text-white/40">01</span>
                            <span><strong className="text-white/90">FUEL:</strong> 100% Arabica Cold Brew</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="text-white/40">02</span>
                            <code className="text-blue-300">if(coffee.empty()) brain.dump();</code>
                        </li>
                    </ul>
                </section>

                {/* Misc Facts: Amber/Yellow Accent */}
                <section className="bg-white/5 p-3 rounded-sm border border-white/10">
                    <p className="text-yellow-500 font-bold text-xs mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
                        MISC_FACTS
                    </p>
                    <div className="space-y-3">
                        <div className="text-[10px] leading-relaxed">
                            <p className="text-white/80"><span className="text-yellow-500/70">#</span> REACHED RANK 10 EVAN [MAPLESTORY]</p>
                            <p className="text-white/80"><span className="text-yellow-500/70">#</span> VISITED [3] COUNTRIES / [4] STATES</p>
                            <p className="text-white/80"><span className="text-yellow-500/70">#</span> ONCE DROVE [8] HOURS STRAIGHT FOR A ROADTRIP</p>
                        </div>
                    </div>
                </section>
            </div>

            <p className="text-white/20 italic text-[10px] text-right">[MIR_OS]</p>
        </div>
    ),
    "/resume.txt": () => (
        <div className="mt-4 space-y-10 md:space-y-14 text-base md:text-xl max-w-5xl font-mono leading-relaxed antialiased">

            {/* HEADER SECTION */}
            <div className="border-b-4 border-white/10 pb-6 md:pb-10">
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                    Phuoc [Peter] Nguyen
                </h2>
                <div className="flex flex-wrap gap-3 md:gap-6 mt-3 md:mt-4 text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] md:tracking-[0.4em]">
                    <span className="text-blue-400">Full-Stack Engineer</span>
                    <span className="text-white/20">//</span>
                    <span className="text-blue-400/70">VFS_USER_ROOT</span>
                </div>
            </div>

            {/* 01. EDUCATION */}
            <section>
                <p className="text-blue-400 font-black text-xs md:text-base tracking-[0.2em] mb-4 md:mb-8 flex items-center gap-4">
                    <span className="w-8 md:w-16 h-1 bg-blue-500"></span> 01. EDUCATION_HISTORY
                </p>
                <div className="pl-4 md:pl-10 border-l-2 md:border-l-4 border-white/10 ml-1">
                    <p className="text-white font-black text-lg md:text-2xl mb-1">California State University, Fullerton</p>
                    <p className="text-white/80 text-sm md:text-xl font-bold">B.S. Computer Science <span className="hidden md:inline text-blue-500 mx-2">|</span> <br className="md:hidden" /> GPA: 3.60</p>
                    <p className="text-[10px] md:text-sm text-white/40 italic mt-2 md:mt-3 tracking-widest uppercase font-bold">Dean’s List 21-23 // Grad May 2023</p>
                </div>
                <div className="pl-4 md:pl-10 border-l-2 md:border-l-4 border-white/10 ml-1">
                    <p className="text-white font-black text-lg md:text-2xl mb-1">California State University, Long Beach</p>
                    <p className="text-white/80 text-sm md:text-xl font-bold">M.S. Computer Science <span className="hidden md:inline text-blue-500 mx-2">|</span> <br className="md:hidden" /> GPA: N/A</p>
                    <p className="text-[10px] md:text-sm text-white/40 italic mt-2 md:mt-3 tracking-widest uppercase font-bold">Expected Grad May 2028</p>
                </div>
            </section>

            {/* 02. WORK EXPERIENCE */}
            <section>
                <p className="text-blue-400 font-black text-xs md:text-base tracking-[0.2em] mb-4 md:mb-8 flex items-center gap-4">
                    <span className="w-8 md:w-16 h-1 bg-blue-500"></span> 02. WORK_EXPERIENCE_LOG
                </p>
                <div className="space-y-10 md:space-y-16 pl-4 md:pl-10 border-l-2 md:border-l-4 border-white/10 ml-1">
                    {/* Full-Stack Freelance */}
                    <div>
                        <div className="flex flex-col md:flex-row justify-between items-start mb-4 md:mb-6 gap-2">
                            <p className="text-white font-black text-lg md:text-2xl underline decoration-blue-500/30 underline-offset-4">Full-Stack Freelance Developer</p>
                            <span className="text-[10px] md:text-sm font-bold bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full uppercase">2025-PRESENT</span>
                        </div>
                        <ul className="space-y-4 text-white/70 text-sm md:text-lg">
                            <li className="flex gap-3">
                                <span className="text-blue-500 font-bold">›</span>
                                <span>Collaborated with a client to modernize their real-estate website using <span className="text-white font-bold">React, Supabase, Swiper.js, and EmailJS</span> to increase sales and outreach through improved UI/UX.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-blue-500 font-bold">›</span>
                                <span>Designed the website interface using <span className="text-white font-bold">Figma</span>, creating a modern, user-friendly experience aligning with the client’s brand identity.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-blue-500 font-bold">›</span>
                                <span>Optimized web performance for legacy devices<span className="text-white font-bold"> by reducing</span> asset payload and <span className="text-white font-bold">implementing lazy loading.</span></span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-blue-500 font-bold">›</span>
                                <span>Managed the project using an <span className="text-white font-bold">Agile framework</span> to prioritize delivering high-value features to stakeholders.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-blue-500 font-bold">›</span>
                                <span>Deployed via <span className="text-white font-bold">Vercel</span>, leveraging its global infrastructure to suit the client’s requirements for wider geographic reach.</span>
                            </li>
                        </ul>
                    </div>

                    {/* AV Solutions */}
                    <div>
                        <div className="flex flex-col md:flex-row justify-between items-start mb-4 md:mb-6 gap-2">
                            <p className="text-white font-black text-lg md:text-2xl font-bold">Audio Visual Solutions</p>
                            <span className="text-[10px] md:text-sm font-bold bg-white/5 text-white/40 px-3 py-1 rounded-full uppercase">IT Tech // 2024</span>
                        </div>
                        <ul className="space-y-3 text-white/70 text-sm md:text-lg">
                            <li className="flex gap-3">
                                <span className="text-blue-500 font-bold">›</span>
                                <span>Led installation and configuration of mission-critical hardware ensuring <span className="text-white font-bold">100% uptime</span>.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-blue-500 font-bold">›</span>
                                <span>Managed and organized cables, maintaining a clean and professional setup <span className="text-white font-bold">preventing</span> potential hazards ensuring workflow during the event.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-blue-500 font-bold">›</span>
                                <span>Learned procedures <span className="text-white font-bold">quickly</span>  in a <span className="text-white font-bold">fast-paced environment</span> and ensured quality work was done.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* 03. PROJECTS */}
            <section>
                <p className="text-blue-400 font-black text-xs md:text-base tracking-[0.2em] mb-4 md:mb-8 flex items-center gap-4">
                    <span className="w-8 md:w-16 h-1 bg-blue-500"></span> 03. REPOSITORY_PROJECTS
                </p>
                <div className="bg-white/5 p-4 md:p-8 border border-white/10 rounded-sm hover:border-blue-500/50 transition-colors">
                        <p className="text-white font-black mb-1 uppercase text-xs md:text-base tracking-widest">Competitive Gaming Draft Analysis Engine</p>
                        <p className="text-[9px] md:text-xs text-blue-400 font-bold mb-4">Python / XGBoost / Supabase / RIOTAPI</p>
                        <p className="text-xs md:text-sm text-white/70">A <span className="text-white-500 font-bold">predictive model</span> that analyzes data from the RIOT API to find the best champion on a variety of factors for the given draft</p>
                    </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 pl-4 md:pl-10 border-l-2 md:border-l-4 border-white/10 ml-1">
                    <div className="bg-white/5 p-4 md:p-8 border border-white/10 rounded-sm hover:border-blue-500/50 transition-colors">
                        <p className="text-white font-black mb-1 uppercase text-xs md:text-base tracking-widest">Automation Tool</p>
                        <p className="text-[9px] md:text-xs text-blue-400 font-bold mb-4">Python / OpenCV / BS4 / Tesseract</p>
                        <p className="text-xs md:text-sm text-white/70">Boosted speed by <span className="text-white font-bold">92%</span> via async refactoring and automated OCR data extraction.</p>
                    </div>
                    <div className="bg-white/5 p-4 md:p-8 border border-white/10 rounded-sm hover:border-blue-500/50 transition-colors">
                        <p className="text-white font-black mb-1 uppercase text-xs md:text-base tracking-widest">Gesture Detection</p>
                        <p className="text-[9px] md:text-xs text-blue-400 font-bold mb-4">Python / TensorFlow / MediaPipe</p>
                        <p className="text-xs md:text-sm text-white/70">Achieved <span className="text-white font-bold">95% accuracy</span> in real-time hand-tracking and custom model training.</p>
                    </div>
                    <div className="bg-white/5 p-4 md:p-8 border border-white/10 rounded-sm hover:border-blue-500/50 transition-colors">
                        <p className="text-white font-black mb-1 uppercase text-xs md:text-base tracking-widest">MIR_OS Portfolio</p>
                        <p className="text-[9px] md:text-xs text-blue-400 font-bold mb-4">React / TS / Tailwind / GHA</p>
                        <p className="text-xs md:text-sm text-white/70">Engineered a <span className="text-white font-bold">Virtual File System</span> with automated CI/CD pipelines.</p>
                    </div>
                </div>
            </section>

            {/* 04-07. SKILLS, TRAITS & STATS */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 pt-6">
                <div className="space-y-10">
                    <div>
                        <p className="text-blue-400 font-black text-[10px] md:text-sm tracking-widest uppercase underline underline-offset-8 decoration-blue-500/20 mb-4">04. TECH_STACK</p>
                        <div className="space-y-3 text-xs md:text-base">
                            <p><span className="text-white/30 mr-2 font-bold">[LANG]</span> Python, C/C++, JS, TS, SQL, Java, R</p>
                            <p><span className="text-white/30 mr-2 font-bold">[FRAME]</span> React, Next, OpenCV, TF, Django, Supabase</p>
                            <p><span className="text-white/30 mr-2 font-bold">[SOFT]</span> GitHub, Figma, VSCode, Vercel, R Studio</p>
                        </div>
                    </div>

                    <div>
                        <p className="text-blue-400 font-black text-[10px] md:text-sm tracking-widest uppercase underline underline-offset-8 decoration-blue-500/20 mb-4">05. CERTIFICATIONS</p>
                        <div className="flex items-center gap-4 bg-blue-500/5 p-4 border border-blue-500/20">
                            <span className="text-blue-400 font-black text-lg md:text-2xl">[AWS]</span>
                            <div className="flex flex-col">
                                <span className="text-white font-black text-xs md:text-base uppercase">Cloud Practitioner</span>
                                <span className="text-[8px] md:text-[10px] text-blue-400 font-bold tracking-tighter uppercase">ID: CLF-C02 | CERTIFIED: 01.08.2026</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-10">
                    <div>
                        <p className="text-blue-400 font-black text-[10px] md:text-sm tracking-widest uppercase underline underline-offset-8 decoration-blue-500/20 mb-4">06. TRAITS</p>
                        <div className="flex flex-wrap gap-2">
                            {["Adaptability", "Quality Assurance", "Agile Workflow", "Communication", "Growth Mindset"].map(skill => (
                                <span key={skill} className="text-[10px] md:text-xs border border-white/10 px-2 py-1 text-white/50 font-bold uppercase hover:text-blue-400 transition-colors">{skill}</span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="text-blue-400 font-black text-[10px] md:text-sm tracking-widest uppercase underline underline-offset-8 decoration-blue-500/20 mb-4">07. LEETCODE_PROGRESS</p>
                        <div className="bg-black/40 border border-white/5 p-4 space-y-4">
                            <div className="grid grid-cols-3 gap-2">
                                <div className="text-center py-2 bg-white/5">
                                    <p className="text-[8px] md:text-[10px] text-green-500 font-bold uppercase">Easy</p>
                                    <p className="text-base md:text-2xl text-white font-black">17</p>
                                </div>
                                <div className="text-center py-2 bg-white/5">
                                    <p className="text-[8px] md:text-[10px] text-yellow-500 font-bold uppercase">Med</p>
                                    <p className="text-base md:text-2xl text-white font-black">43</p>
                                </div>
                                <div className="text-center py-2 bg-white/5">
                                    <p className="text-[8px] md:text-[10px] text-red-500 font-bold uppercase">Hard</p>
                                    <p className="text-base md:text-2xl text-white font-black">11</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="pt-8 opacity-20 text-center border-t-2 border-white/5 text-[10px] md:text-sm font-black tracking-[1em] uppercase">
                --- END OF TRANSMISSION ---
            </div>
        </div>
    ),
};