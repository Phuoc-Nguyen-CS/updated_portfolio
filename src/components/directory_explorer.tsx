import React from "react";
import { useTerminal } from "../context/terminal_context"; 
import { EXECUTABLES } from "../data/executables";
import { resolvePath } from "../utils/path"; 
import { fireCommand } from "../utils/terminal"; 

interface ExplorerProps {
    currentPath: string;
}

export const DirectoryExplorer: React.FC<ExplorerProps> = ({ currentPath }) => {
    // We still use vfs and sessionFiles from context for dynamic rendering
    const { vfs, sessionFiles } = useTerminal();

    const folder = vfs[currentPath];
    if (!folder) return null;

    const staticChildren = folder.children;
    const localSessionFiles = Object.keys(sessionFiles).filter(
        (fileName) => sessionFiles[fileName].path === currentPath
    );
    const combinedItems = Array.from(new Set([...staticChildren, ...localSessionFiles])).sort((a, b) => a.localeCompare(b));

    const isRoot = currentPath === "/";

    return (
        <div className="mt-4 pt-3 border-t border-[var(--color-hacker-green)]/30 animate-in fade-in slide-in-from-bottom-2">
            <p className="text-xs text-[var(--color-hacker-green)] mb-3 opacity-80 flex items-center gap-2 font-bold tracking-widest uppercase">
                <span>[ DIR: {currentPath} ]</span>
                <span className="text-white/50 animate-pulse font-normal lowercase">Select an item...</span>
            </p>

            <div className="flex flex-wrap gap-2 text-sm font-mono">
                {!isRoot && (
                    <button
                        onClick={() => fireCommand(`cd ..`)}
                        className="bg-white/5 hover:bg-white/20 text-white/80 px-3 py-1.5 border border-white/10 transition-colors flex items-center gap-2"
                        title="Go up one directory"
                    >
                        <span>↵</span> [..] Go Back
                    </button>
                )}

                {combinedItems.map((item) => {
                    const childAbsPath = resolvePath(currentPath, item);

                    const isDir = vfs[childAbsPath]?.type === 'dir';
                    const isExe = !!EXECUTABLES[childAbsPath];

                    let cmd = `cat ${childAbsPath}`;
                    if (isDir) cmd = `cd ${childAbsPath}`;
                    if (isExe) cmd = `./${item}`;

                    let colorClass = "text-white bg-white/5 hover:bg-white/20 border-white/20";
                    let prefix = "[TXT]";

                    if (isDir) {
                        colorClass = "text-[var(--color-hacker-green)] bg-[var(--color-hacker-green)]/10 hover:bg-[var(--color-hacker-green)]/30 border-[var(--color-hacker-green)]/30";
                        prefix = "[DIR]";
                    } else if (isExe) {
                        colorClass = "text-yellow-400 bg-yellow-400/10 hover:bg-yellow-400/30 border-yellow-400/30";
                        prefix = "[EXE]";
                    } else if (["about.txt", "resume.txt"].includes(item.toLowerCase())) {
                        colorClass = "text-blue-300 bg-blue-500/10 hover:bg-blue-500/30 border-blue-500/30";
                        prefix = "[SYS]";
                    }

                    return (
                        <button
                            key={item}
                            onClick={() => fireCommand(cmd)}
                            className={`${colorClass} px-3 py-1.5 border transition-all flex items-center gap-2`}
                            title={`Run: ${cmd}`}
                        >
                            <span className="opacity-50 font-bold tracking-widest text-[10px] uppercase">
                                {prefix}
                            </span>
                            <span>{item}{isDir && "/"}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};