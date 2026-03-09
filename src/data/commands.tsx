import React from "react";

import type { CommandResponse } from "./types";
import { FILE_CONTENT } from "./system_files";
import { EXECUTABLES } from "./executables";
import { VFS } from "./vfs";

import { HelpManual, QuickStartGuide } from "./commands/guides";

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
    help: () => <HelpManual />,

    // 04. QUICKSTART: The Non-Tech Guided Tour
    quickstart: () => <QuickStartGuide />,

    // 05. Restart: Replays the animation in the beginning
    restart: () => "SYSTEM RESTART INITIATED...",

    // 0.6 Clear: frees up the screen
    clear: () => "Clearing terminal buffer..."
};

export const COMMAND_LIST = Object.keys(COMMANDS);