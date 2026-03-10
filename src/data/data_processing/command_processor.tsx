// src/data/command_processor.tsx
import React from "react";
import type { CommandResponse } from "../types";
import { COMMANDS } from "../commands";
import { EXECUTABLES } from "../executables";
import { FILE_CONTENT } from "../system_files";
import { VFS } from "../vfs";
import { resolvePath } from "../../utils/path";

export interface CommandResult {
    action: "clear" | "restart" | "vim" | "output";
    output?: CommandResponse;
    vimFile?: string;
}

export const processCommand = (
    input: string,
    cwd: string,
    setCwd: (path: string) => void,
    sessionFiles: Record<string, { content: string[], path: string }>,
    setSessionFiles: React.Dispatch<React.SetStateAction<Record<string, { content: string[], path: string }>>>
): CommandResult | null => {
    const rawInput = input.trim();
    if (rawInput === "") return null;

    const inputParts = rawInput.toLowerCase().split(/\s+/);
    const baseCmd = inputParts[0];
    const args = inputParts.slice(1);

    if (baseCmd === "clear") return { action: "clear" };
    if (baseCmd === "restart") return { action: "restart" };

    // --- 2. UPGRADED VIM GUARD ---
    if (baseCmd === "vim") {
        const rawTarget = args[0];
        if (!rawTarget) return { action: "vim", vimFile: "[No Name]" };

        // Convert whatever they typed into an absolute path!
        const absolutePath = resolvePath(cwd, rawTarget);

        // Check if the absolutePath exists as a key in either database
        const isProtected = (absolutePath in FILE_CONTENT) || (absolutePath in EXECUTABLES);

        if (isProtected) {
            return { action: "output", output: <span className="text-red-500">bash: vim: {rawTarget}: Permission denied (system file is read-only)</span> };
        }

        // Check if they are trying to VIM a directory
        if (VFS[absolutePath]) {
            return { action: "output", output: <span className="text-red-500">bash: vim: {rawTarget}: Is a directory</span> };
        }

        const fileName = absolutePath.split("/").pop() || "[No Name]";

        return { action: "vim", vimFile: fileName };
    }

    let output: CommandResponse;

    // --- 3. UPGRADED EXECUTABLES GUARD ---
    if (baseCmd.startsWith("./")) {
        // Even if they type ./projects/leetcode.exe, we extract the target and resolve it
        const rawTarget = baseCmd.slice(2);
        const absolutePath = resolvePath(cwd, rawTarget);

        if (EXECUTABLES[absolutePath]) {
            output = EXECUTABLES[absolutePath]();
        } else if (VFS[absolutePath]) {
            output = <span className="text-red-500">bash: {baseCmd}: Is a directory</span>;
        } else {
            output = <span className="text-red-500">bash: {baseCmd}: No such file or directory</span>;
        }
    }
    // 4. Standard Commands
    else {
        output = COMMANDS[baseCmd]
            ? COMMANDS[baseCmd](args, cwd, setCwd, sessionFiles, setSessionFiles)
            : (
                <div className="text-red-500">
                    <p>ERR: COMMAND_NOT_FOUND [{baseCmd}]</p>
                    <p className="text-white/50 text-xs mt-1">Type <span className="text-yellow-400 underline">help</span> for a list of available protocols.</p>
                </div>
            );
    }

    return { action: "output", output };
};