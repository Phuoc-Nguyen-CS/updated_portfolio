import React from "react";

import type { CommandResponse } from "./types";
import { FILE_CONTENT } from "./system_files";
import { EXECUTABLES } from "./executables";
import { VFS } from "./vfs";
import { resolvePath } from "../utils/path";
import { HelpManual, QuickStartGuide } from "./commands/guides";

/* =========================================================
    COMMAND LOGIC
    Defines the executable behavior for terminal commands
    (ls, cd, cat, etc.). Handles VFS navigation using Absolute Paths.
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

    // 01. LS: Context Aware listing (Now supports 'ls /projects')
    ls: (args, cwd = "/", _setCwd, sessionFiles) => {
        const target = args[0] || ".";
        const absolutePath = resolvePath(cwd, target);

        const targetFolder = VFS[absolutePath];
        if (!targetFolder) return <span className="text-red-500">ls: cannot access '{target}': No such file or directory</span>;

        // 1. Grab static files from VFS
        const staticChildren = targetFolder.children;

        // 2. Filter sessionFiles to only those matching the absolute target path
        const localSessionFiles = Object.keys(sessionFiles || {}).filter(
            (fileName) => sessionFiles[fileName].path === absolutePath
        );

        // Combine both arrays and remove duplicates
        const combinedItems = Array.from(new Set([...staticChildren, ...localSessionFiles])).sort((a, b) => a.localeCompare(b));

        // UI LOGIC: Vertical layout for logs, grid for standard folders
        const isBlogDirectory = absolutePath.startsWith("/logs");
        const containerClass = isBlogDirectory
            ? "flex flex-col space-y-1 mt-2 glow-text"
            : "grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 glow-text";

        return (
            <div className={containerClass}>
                {combinedItems.map((item) => {
                    // Reconstruct child path to check if it's a directory
                    const childAbsPath = absolutePath === "/" ? `/${item}` : `${absolutePath}/${item}`;
                    const isDir = !!VFS[childAbsPath];

                    // Default coloring
                    let colorClass = isDir
                        ? "text-[var(--color-hacker-green)] font-bold"
                        : "text-white";

                    // Specific highlight for root files
                    if (["readme.md", "about.txt", "resume.txt"].includes(item.toLowerCase())) {
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
        const target = args[0] || "~";
        const absolutePath = resolvePath(cwd, target);

        if (VFS[absolutePath] && VFS[absolutePath].type === "dir") {
            if (setCwd) setCwd(absolutePath);
            return "";
        } else {
            return <span className="text-red-500">bash: cd: {target}: No such file or directory</span>;
        }
    },

    // 03. CAT: Readable file-only guard
    cat: (args, cwd = "/", _setCwd, sessionFiles) => {
        if (!args || args.length === 0) return <span className="text-red-500">cat: missing file operand</span>;

        const target = args[0].trim();
        const absolutePath = resolvePath(cwd, target);

        // 1. Check Session RAM first (in case they edited a file)
        // Since sessionFiles keys are just filenames, we need to extract the filename and dir from the absolute path
        const pathParts = absolutePath.split("/");
        const fileName = pathParts.pop() || "";
        const dirPath = pathParts.length > 0 ? pathParts.join("/") || "/" : "/";

        const sessionFileKey = Object.keys(sessionFiles || {}).find(
            key => key.toLowerCase() === fileName.toLowerCase() && sessionFiles[key].path === dirPath
        );

        if (sessionFileKey) {
            return (
                <div className="whitespace-pre-wrap mt-1">
                    {sessionFiles[sessionFileKey].content.join("\n")}
                </div>
            );
        }

        // 2. Check Static Files (O(1) Dictionary Lookup!)
        if (FILE_CONTENT[absolutePath]) {
            return FILE_CONTENT[absolutePath]();
        }

        // 3. Error Guards
        if (VFS[absolutePath]) {
            return <span className="text-red-500">cat: {target}: Is a directory</span>;
        }

        if (EXECUTABLES[absolutePath]) {
            return <span className="text-red-500">cat: {target}: Permission denied (Binary executable)</span>;
        }

        return <span className="text-red-500">cat: {target}: No such file or directory</span>;
    },

    // 04. RM: Remove user created files
    rm: (args, cwd, _setCwd, sessionFiles, setSessionFiles) => {
        if (!args || args.length === 0) return <span className="text-red-500">rm: missing operand</span>;

        const target = args[0].replace(/\/+$/, "");
        const absolutePath = resolvePath(cwd, target);

        // 1. PROTECT SYSTEM FILES (O(1) Lookup)
        if (FILE_CONTENT[absolutePath] || EXECUTABLES[absolutePath]) {
            return <span className="text-red-500">rm: cannot remove '{target}': Permission denied</span>;
        }

        // 2. PROTECT DIRECTORIES
        if (VFS[absolutePath]) {
            return <span className="text-red-500">rm: cannot remove '{target}': Is a directory</span>;
        }

        // 3. DELETE USER FILES
        const pathParts = absolutePath.split("/");
        const fileName = pathParts.pop() || "";
        const dirPath = pathParts.length > 0 ? pathParts.join("/") || "/" : "/";

        if (sessionFiles[fileName] && sessionFiles[fileName].path === dirPath) {
            if (setSessionFiles) {
                setSessionFiles((prev: any) => {
                    const newState = { ...prev };
                    delete newState[fileName];
                    return newState;
                });
                return ``; // Success (Linux rm is silent on success)
            }
        }

        return <span className="text-red-500">rm: cannot remove '{target}': No such file or directory</span>;
    },

    // 05. HELP: For those that will definitely need help
    help: () => <HelpManual />,

    // 06. QUICKSTART: The Non-Tech Guided Tour
    quickstart: () => <QuickStartGuide />,

    // 07. Restart: Replays the animation in the beginning
    restart: () => "SYSTEM RESTART INITIATED...",

    // 08. Clear: frees up the screen
    clear: () => "Clearing terminal buffer..."
};

export const COMMAND_LIST = Object.keys(COMMANDS);