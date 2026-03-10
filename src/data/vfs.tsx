// src/data/vfs.tsx
import logEntries from "./logs.json";
import { FILE_CONTENT } from "./system_files";

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
    LOG_BLOG
    This runs immediately when the file is imported.
   ========================================================= */
logEntries.forEach((entry) => {
    const folderName = entry.folder.toLowerCase();
    const folderPath = `/logs/${folderName}`;
    const fileName = `${entry.id}.md`.toLowerCase();

    // Ensure the parent (/logs) knows about the child (March2026)
    if (VFS["/logs"] && !VFS["/logs"].children.includes(folderName)) {
        VFS["/logs"].children.push(folderName);
    }

    // Create the actual directory entry for the child
    if (!VFS[folderPath]) {
        VFS[folderPath] = {
            type: "dir",
            children: []
        };
    }

    // Add the file to the child's children list
    if (!VFS[folderPath].children.includes(fileName)) {
        VFS[folderPath].children.push(fileName);
    }

    const absoluteFilePath = `${folderPath}/${fileName}`;

    // Map the file content
    FILE_CONTENT[absoluteFilePath] = () => (
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