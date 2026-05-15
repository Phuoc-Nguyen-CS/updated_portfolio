/**
 * @file executables.tsx
 * @description Defines the behavior for simulated binary executions (./file).
 * Maps absolute path to logic functions, we mimic the behavior for binary executions.
 */
import type { CommandResponse } from "./types";
import leetcodeData from "./leetcode_stats.json";
import { ProjectSimulation } from "../components/project_simulation";

/* =========================================================
    EXECUTABLES (Triggered via './[file]')
    These are essentially standalone "micro-apps" within the OS.
   ========================================================= */
export const EXECUTABLES: Record<string, () => CommandResponse> = {
  /**
   * LEETCODE.EXE
   * Provides a live-simulated dashboard of algorithm progress.
   * Parses local JSON data to generate dynamic progress bars.
   */
  "/leetcode.exe": () => {
    const stats = [
      {
        label: "EASY",
        count: parseInt(leetcodeData.easy),
        total: 28,
        color: "bg-hacker-green",
      },
      {
        label: "MEDIUM",
        count: parseInt(leetcodeData.medium),
        total: 101,
        color: "bg-hacker-yellow",
      },
      {
        label: "HARD",
        count: parseInt(leetcodeData.hard),
        total: 21,
        color: "bg-hacker-red",
      },
    ];

    return {
      output: (
        <div className="mt-2 space-y-3 border-l-2 border-hacker-green pl-4">
          <p className="text-white font-bold underline text-sm sm:text-base">
            // LEETCODE_SYNCED
          </p>
          {stats.map((stat) => {
            const percentage = Math.round((stat.count / stat.total) * 100);
            return (
              <div key={stat.label} className="w-full max-w-[18rem]">
                <div className="flex justify-between text-xs mb-1">
                  <span>{stat.label}</span>
                  <span>
                    {stat.count}/{stat.total}
                  </span>
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
            <p className="text-xs text-white/40">
              Source: GitHub/Phuoc-Nguyen-CS/LeetCode
            </p>
            <p className="text-[10px] sm:text-xs text-hacker-green opacity-60 uppercase">
              LAST_SYNC: {leetcodeData.lastUpdated}
            </p>
          </div>
        </div>
      ),
    };
  },

  /**
   * CONTACT.EXE
   * Handles external communication protocols.
   * Provides a direct mailto link styled as a system execution.
   */
  "/contact.exe": () => ({
    output: (
      <div className="mt-2 space-y-2 border-l-2 border-hacker-green pl-4">
        <p className="text-white font-bold underline">
          // SECURE_COMMUNICATION_LINE
        </p>
        <p>Initiate direct email transfer?</p>
        <a
          href="mailto:phuoc.codes@gmail.com?subject=Greetings!"
          className="inline-block px-3 py-1 bg-hacker-green text-black font-bold hover:bg-white transition-colors"
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
  }),

  /**
   * GITHUB.EXE
   * Links to our github for users to get a quick access to it!
   */
  "/github.exe": () => ({
    output: (
      <div className="mt-2 border-l-2 border-hacker-green pl-4">
        <p className="text-white font-bold mb-2 underline">
          // EXTERNAL_SOURCE_REDIRECT
        </p>
        <div className="space-y-1 mb-4">
          <p>
            TARGET:{" "}
            <span className="text-white">github.com/Phuoc-Nguyen-CS</span>
          </p>
          <p>
            STATUS:{" "}
            <span className="text-hacker-green font-mono animate-pulse">
              CONNECTION_READY
            </span>
          </p>
        </div>

        <a
          href="https://github.com/Phuoc-Nguyen-CS"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-3 py-1 border border-hacker-green text-hacker-green font-bold hover:bg-hacker-green hover:text-black transition-all"
        >
          [OPEN_REPOS]
        </a>
        <p className="text-[10px] text-white/40 mt-2 italic">
          Note: Clicking will initialize in a new tab.
        </p>
      </div>
    ),
  }),

  /* =========================================================
        PROJECT SIMULATIONS
        Each of these provides a unique "boot log" for specific repos.
       ========================================================= */

  "/projects/maple_discord_bot.py": () => ({
    output: (
      <ProjectSimulation
        title="Initializing Discord.py Wrapper..."
        themeColor="#5865F2"
        githubUrl="https://github.com/Phuoc-Nguyen-CS/DiscordMapleBot"
        bootLogs={[
          "Authenticating token... [OK]",
          "Connecting to Discord Gateway... [OK]",
        ]}
      >
        <div className="text-xs space-y-1 border-t border-white/10 pt-2">
          <p className="text-white font-bold mb-2 uppercase">
            Registered Commands:
          </p>
          <p className="text-white/70">
            <span className="text-hacker-yellow">/track</span> - Daily EXP gain
          </p>
          <p className="text-white/70">
            <span className="text-hacker-yellow">/culvert</span> - Weekly scores
          </p>
        </div>
      </ProjectSimulation>
    ),
  }),

  "/projects/gesture_detection.py": () => ({
    output: (
      <ProjectSimulation
        title="Loading TensorFlow/Keras Models..."
        themeColor="var(--color-hacker-orange)"
        githubUrl="https://github.com/Phuoc-Nguyen-CS/Hand-Gesture-Volume"
        bootLogs={[
          "Importing OpenCV2... [OK]",
          "Initializing MediaPipe... [OK]",
        ]}
      >
        <div className="bg-black/50 p-2 font-mono text-[10px] text-hacker-orange/80">
          <p className="animate-pulse">{">"} TARGET ACQUIRED: Hand_01</p>
          <p className="text-white font-bold mt-1">
            {">"} DETECTED: "VOLUME_UP"
          </p>
        </div>
      </ProjectSimulation>
    ),
  }),

  "/projects/cebu_real_estate.js": () => ({
    output: (
      <ProjectSimulation
        title="[*] Initializing Next.js / Supabase Client..."
        themeColor="var(--color-hacker-green)"
        githubUrl="https://github.com/Jameboyyy/CLS-Properties"
        bootLogs={[
          "Fetching property listings from Supabase... [OK]",
          "Status: 200 [OK]",
        ]}
      >
        <div className="mt-3 bg-black/50 p-2 font-mono text-[10px] text-hacker-blue/80 overflow-hidden">
          <pre className="whitespace-pre-wrap break-words">
            {`
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
      </ProjectSimulation>
    ),
  }),

  "/projects/terminal_portfolio.tsx": () => ({
    output: (
      <ProjectSimulation
        title="Bootstrapping MIR_OS Environment..."
        themeColor="var(--color-hacker-green)"
        githubUrl="https://github.com/Phuoc-Nguyen-CS/updated_portfolio"
        bootLogs={[
          "Compiling React components... [OK]",
          "Injecting Virtual File System (VFS)... [OK]",
          "Mounting Dynamic Blog Data... [OK]",
          "SYSTEM STATUS: FULLY_OPERATIONAL",
        ]}
      >
        <div className="bg-black/50 p-3 font-mono text-[10px] text-hacker-green/80 border border-hacker-green/20 shadow-inner">
          <p className="flex justify-between">
            <span>{">"} VITE v5.0.0</span>{" "}
            <span className="text-white/40">142ms</span>
          </p>
          <p>{">"} Local: http://localhost:5173/</p>
          <p>{">"} TailwindCSS loading... SUCCESSFUL</p>
          <p className="text-white mt-2 font-bold tracking-widest">
            {">"} VERCEL_HOSTING: STABLE
          </p>
        </div>
      </ProjectSimulation>
    ),
  }),

  "/projects/league_of_legends_drafting_tool.py": () => ({
    output: (
      <ProjectSimulation
        title="Initializing Competitive Draft Engine..."
        themeColor="#C89B3C"
        githubUrl="https://github.com/Phuoc-Nguyen-CS/LOLChampionSuggestor"
        bootLogs={[
          "Loading XGBoost Model v1.2.4... [OK]",
          "Connecting to Supabase Match-Data... [OK]",
          "Fetching Riot API Metadata... [OK]",
        ]}
      >
        <div className="space-y-3">
          <div className="text-[11px] text-white/70 italic border-l border-white/20 pl-3">
            Machine Learning engine designed to interpret match data and
            recommend champion picks based on team synergy and counter-matchups.
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
            <div className="bg-black/40 p-2 border border-[#C89B3C]/20">
              <p className="text-[#C89B3C] font-bold mb-1 underline">
                CORE_STACK
              </p>
              <p>Python / XGBoost</p>
              <p>Supabase</p>
            </div>
            <div className="bg-black/40 p-2 border border-[#C89B3C]/20">
              <p className="text-[#C89B3C] font-bold mb-1 underline">
                ANALYSIS_MODE
              </p>
              <p>Win-Rate Prediction</p>
              <p>Synergy Scoring</p>
            </div>
          </div>
        </div>
      </ProjectSimulation>
    ),
  }),
};
