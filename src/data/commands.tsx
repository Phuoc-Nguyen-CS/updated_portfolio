import React from "react";

export type CommandResponse = string | React.ReactNode;

export const COMMANDS: Record<string, () => CommandResponse> = {
    help: () => (
        <div className="glow-text">
            <p className="text-white/90">SYS_ACCESS: GRANTED</p>
            <p className="text-white/60">Available modules: [about] [projects] [clear] [github]</p>
        </div>
    ),

    about: () => "I am a developer specializing in React and modern terminal-based UI architecture.",

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

    helloworld: () => "NAME: PHUOC NGUYEN SCHOOL: CALIFORNIA_STATE_UNIVERSITY_FULLERTON",

    github: () => {
        window.open("https://github.com/Phuoc-Nguyen-CS", "_blank");
        return "REDIRECTING TO GITHUB...";
    }
};

export const COMMAND_LIST = Object.keys(COMMANDS);