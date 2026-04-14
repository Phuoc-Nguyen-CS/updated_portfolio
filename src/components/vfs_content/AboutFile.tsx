export const AboutFile = () => (
    <div className="space-y-6 max-w-2xl font-mono">
        {/* Header Section */}
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

        {/* Content Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
);