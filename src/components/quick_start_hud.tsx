import React, { useEffect, useRef } from "react";
import { fireCommand, fireSequence } from "../utils/terminal";

export const QuickStartHUD: React.FC = () => {
  const hudRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (hudRef.current) {
        hudRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <style>{`
                @keyframes materialize {
                    0% { opacity: 0; filter: blur(8px) brightness(2); transform: scaleY(0.95) scaleX(1.02); }
                    15% { opacity: 1; filter: blur(2px) brightness(1.5); transform: scaleY(1) scaleX(1); }
                    20% { opacity: 0.2; filter: blur(0); }
                    25% { opacity: 1; }
                    30% { opacity: 0.5; }
                    35% { opacity: 1; filter: blur(1px) brightness(1.2); }
                    100% { opacity: 1; filter: blur(0) brightness(1); transform: scale(1); }
                }
                .animate-materialize {
                    animation: materialize 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
                }
            `}</style>

      <div
        ref={hudRef}
        className="mt-6 mx-auto w-full max-w-4xl border border-hacker-green/40 p-6 bg-black/50 backdrop-blur-lg opacity-0 animate-materialize shadow-[0_0_30px_rgba(0,255,65,0.1)]"
      >
        {/* HEADER */}
        <p className="text-lg md:text-xl font-bold text-white mb-6 tracking-[0.3em] border-b border-hacker-green/30 pb-3 flex justify-between items-end">
          <span>[MIR_OS] QUICK_START_PROTOCOL</span>
          <span className="text-hacker-green opacity-50 text-xs font-mono">
            SYSTEM_VERSION.1.0.0
          </span>
        </p>

        <div className="space-y-8">
          {/* CORE COMMANDS REFERENCE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <p className="text-sm text-hacker-green mb-3 font-bold uppercase tracking-[0.2em]">
                // NAVIGATION
              </p>
              <div className="grid grid-cols-[70px_1fr] gap-y-2 text-sm">
                <span className="text-white font-bold font-mono">ls</span>
                <span className="text-white/60">List directory contents</span>
                <span className="text-white font-bold font-mono">cd ..</span>
                <span className="text-white/60">Move to parent directory</span>
                <span className="text-white font-bold font-mono">cd ~</span>
                <span className="text-white/60">Return to root directory</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-hacker-green mb-3 font-bold uppercase tracking-[0.2em]">
                // SYSTEM_OPERATIONS
              </p>
              <div className="grid grid-cols-[70px_1fr] gap-y-2 text-sm">
                <span className="text-white font-bold font-mono">cat</span>
                <span className="text-white/60">Concatenate / Read files</span>
                <span className="text-white font-bold font-mono">./</span>
                <span className="text-white/60">Execute binary protocol</span>
                <span className="text-white font-bold font-mono">vim</span>
                <span className="text-white/60">Initialize text editor</span>
              </div>
            </div>
          </div>

          {/* NON-TECH FAST TRACK - Larger text and more prominent button */}
          <div className="bg-hacker-green/10 border border-hacker-green/30 p-5 flex flex-col sm:flex-row items-center justify-between gap-6 transition-all hover:bg-hacker-green/15">
            <div className="text-center sm:text-left">
              <p className="text-hacker-green font-bold text-sm md:text-base uppercase tracking-wider">
                New to Terminal Environments?
              </p>
              <p className="text-white/60 text-xs md:text-sm mt-1">
                A quick get to know me of who I am!
              </p>
            </div>
            <button
              onClick={() => fireCommand("quickstart")}
              className="w-full sm:w-auto bg-hacker-green text-black px-6 py-2 font-black text-sm hover:bg-white hover:scale-105 active:scale-95 transition-all cursor-pointer uppercase tracking-[0.15em] shadow-[0_0_15px_rgba(0,255,65,0.3)]"
            >
              Run: quickstart
            </button>
          </div>

          {/* EXECUTION DIRECTORY - Larger grid items */}
          <div className="pt-4 border-t border-hacker-green/20">
            <p className="text-xs text-white/40 font-bold mb-4 uppercase tracking-[0.4em] flex items-center gap-2">
              <span className="animate-pulse">▶</span> SELECT_BOOT_PROTOCOL:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => fireSequence(["cd /", "ls logs/"])}
                className="bg-hacker-green/5 p-4 border-l-4 border-hacker-green/20 hover:border-hacker-green hover:bg-hacker-green/10 cursor-pointer transition-all group"
              >
                <span className="text-white font-mono font-bold text-sm block mb-2 group-hover:text-hacker-green">
                  ls logs/
                </span>
                <span className="text-white/50 text-xs block leading-relaxed">
                  System logs documenting my hurdles and resolutions for my
                  projects.
                </span>
              </div>

              {/* ITEM: RESUME */}
              <div
                onClick={() => fireSequence(["cd /", "cat resume.txt"])}
                className="bg-hacker-green/5 p-4 border-l-4 border-hacker-green/20 hover:border-hacker-green hover:bg-hacker-green/10 cursor-pointer transition-all group"
              >
                <span className="text-white font-mono font-bold text-sm block mb-2 group-hover:text-hacker-green">
                  cat resume.txt
                </span>
                <span className="text-white/50 text-xs block leading-relaxed">
                  Review my background and what I create.
                </span>
              </div>

              {/* ITEM: PROJECTS */}
              <div
                onClick={() => fireSequence(["cd /", "cd projects"])}
                className="bg-hacker-green/5 p-4 border-l-4 border-hacker-green/20 hover:border-hacker-green hover:bg-hacker-green/10 cursor-pointer transition-all group"
              >
                <span className="text-white font-mono font-bold text-sm block mb-2 group-hover:text-hacker-green">
                  cd projects/
                </span>
                <span className="text-white/50 text-xs block leading-relaxed">
                  Take a look at the projects I created.
                </span>
              </div>

              {/* ITEM: LEETCODE */}
              <div
                onClick={() => fireSequence(["cd /", "./leetcode.exe"])}
                className="bg-hacker-green/5 p-4 border-l-4 border-hacker-green/20 hover:border-hacker-green hover:bg-hacker-green/10 cursor-pointer transition-all group"
              >
                <span className="text-white font-mono font-bold text-sm block mb-2 group-hover:text-hacker-green">
                  ./leetcode.exe
                </span>
                <span className="text-white/50 text-xs block leading-relaxed">
                  A way to track my leetcode progress that updates whenever I
                  solve a new problem automatically.
                </span>
              </div>
            </div>
          </div>

          {/* FOOTER TIPS  */}
          <div className="pt-4 border-t border-hacker-green/10 flex justify-between items-center text-[10px] md:text-xs text-white/30 uppercase font-mono tracking-widest">
            <div className="flex gap-6">
              <span>TAB: [AUTOCOMPLETE]</span>
              <span>UP_ARROW: [HISTORY]</span>
            </div>
            <span className="text-hacker-green animate-pulse">
              System_Status: RUNNING
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
