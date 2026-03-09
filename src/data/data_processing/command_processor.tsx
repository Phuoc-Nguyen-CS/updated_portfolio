// src/data/command_processor.tsx
import React from "react";
import type { CommandResponse } from "../types";
import { COMMANDS } from "../commands";
import { EXECUTABLES } from "../executables";
import { FILE_CONTENT } from "../system_files";
import { VFS } from "../vfs";

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

    // 1. System Utilities
    if (baseCmd === "clear") return { action: "clear" };
    if (baseCmd === "restart") return { action: "restart" };

    // 2. Vim Editor Guard
    if (baseCmd === "vim") {
        const rawTarget = args[0];
        const currentFolder = VFS[cwd as keyof typeof VFS];

        if (!rawTarget) return { action: "vim", vimFile: "[No Name]" };

        const parts = rawTarget.split("/");
        const targetFile = parts.pop() || "";

        const isProtected =
            Object.keys(FILE_CONTENT).some(k => k.toLowerCase() === targetFile.toLowerCase()) ||
            Object.keys(EXECUTABLES).some(k => k.toLowerCase() === targetFile.toLowerCase());

        if (isProtected) {
            return { action: "output", output: <span className="text-red-500">bash: vim: {targetFile}: Permission denied (system file is read-only)</span> };
        }

        if (currentFolder?.children.includes(targetFile) && !targetFile.includes('.')) {
            return { action: "output", output: <span className="text-red-500">bash: vim: {targetFile}: Is a directory</span> };
        }

        return { action: "vim", vimFile: targetFile };
    }

    let output: CommandResponse;

    // 3. Executables Guard (./)
    if (baseCmd.startsWith("./")) {
        const file = baseCmd.slice(2);
        const currentFolder = VFS[cwd as keyof typeof VFS];

        if (!currentFolder || !currentFolder.children.includes(file)) {
            output = <span className="text-red-500">bash: {baseCmd}: No such file or directory</span>;
        } else if (EXECUTABLES[file]) {
            output = EXECUTABLES[file]();
        } else {
            output = <span className="text-red-500">bash: {baseCmd}: Permission denied (not executable)</span>;
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