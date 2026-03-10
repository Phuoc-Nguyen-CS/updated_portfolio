import React from "react";

import type { CommandResponse } from "./types";
import { FILE_CONTENT } from "./system_files";
import { EXECUTABLES } from "./executables";
import { VFS } from "./vfs";
import { resolvePath } from "../utils/path";
import { HelpManual, QuickStartGuide } from "./commands/guides";
import { DirectoryExplorer } from "../components/directory_explorer";

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

        if (VFS[absolutePath]) {
            return <DirectoryExplorer currentPath={absolutePath} sessionFiles={sessionFiles} />;
        }
        return <span className="text-red-500">ls: cannot access '{target}': No such file or directory</span>;
    },

    // 02. CD: Directory-only navigation guard
    cd: (args, cwd = "/", setCwd, sessionFiles) => {
        const target = args[0] || "~";
        const absolutePath = resolvePath(cwd, target);

        if (VFS[absolutePath] && VFS[absolutePath].type === "dir") {
            if (setCwd) setCwd(absolutePath);
            return <DirectoryExplorer currentPath={absolutePath} sessionFiles={sessionFiles} />;
        } else {
            return <span className="text-red-500">bash: cd: {target}: No such file or directory</span>;
        }
    },

    // 03. CAT: Readable file-only guard
    cat: (args, cwd = "/", _setCwd, sessionFiles) => {
        if (!args || args.length === 0) return <span className="text-red-500">cat: missing file operand</span>;

        const target = args[0].trim();
        const absolutePath = resolvePath(cwd, target);

        // Check Session RAM first (in case they edited a file)
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

        // Check Static Files (O(1) Dictionary Lookup!)
        if (FILE_CONTENT[absolutePath]) {
            return (
                <div className="flex flex-col space-y-4">
                    {/* 1. Print the actual file content */}
                    <div>{FILE_CONTENT[absolutePath]()}</div>

                    {/* 2. Print the directory buttons below it! */}
                    <DirectoryExplorer currentPath={dirPath} sessionFiles={sessionFiles} />
                </div>
            );
        }

        // Error Guards
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

        // PROTECT SYSTEM FILES 
        if (FILE_CONTENT[absolutePath] || EXECUTABLES[absolutePath]) {
            return <span className="text-red-500">rm: cannot remove '{target}': Permission denied</span>;
        }

        // PROTECT DIRECTORIES
        if (VFS[absolutePath]) {
            return <span className="text-red-500">rm: cannot remove '{target}': Is a directory</span>;
        }

        // DELETE USER FILES
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