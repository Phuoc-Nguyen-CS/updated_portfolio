/**
 * @file command_processor.tsx
 * Why: We updated the signature to include 'sessionFiles'. This allows 
 * navigation and file-read commands to consider user-created data 
 * without violating the "Pure Function" rule.
 */
import type { CommandResponse } from "../types";
import { COMMANDS } from "../commands";
import { EXECUTABLES } from "../executables";
import { FILE_CONTENT } from "../system_files";
import { resolvePath } from "../../utils/path";

export const processCommand = (
    input: string, 
    cwd: string,
    sessionFiles: Record<string, { content: string[], path: string }>
): CommandResponse => {
    const rawInput = input.trim();
    if (rawInput === "") return { output: "" };

    const inputParts = rawInput.split(/\s+/);
    const baseCmd = inputParts[0].toLowerCase();
    const args = inputParts.slice(1);

    if (baseCmd === "clear") return { output: "", systemAction: "CLEAR" };
    if (baseCmd === "restart") return { output: "", systemAction: "RESTART" };

    // --- VIM HANDLER ---
    if (baseCmd === "vim") {
        const rawTarget = args[0] || "[No Name]";
        const absolutePath = resolvePath(cwd, rawTarget);
        const isProtected = (absolutePath in FILE_CONTENT) || (absolutePath in EXECUTABLES);
        
        if (isProtected) {
            return { output: <span className="text-red-500">bash: vim: {rawTarget}: Permission denied</span> };
        }

        return { output: "", systemAction: "VIM", meta: { vimFile: rawTarget } };
    }

    // --- EXECUTABLE ENGINE ---
    if (baseCmd.startsWith("./")) {
        const rawTarget = baseCmd.slice(2);
        const absolutePath = resolvePath(cwd, rawTarget);

        if (EXECUTABLES[absolutePath]) {
            /**
             * Why: Executables might return a full CommandResponse (with actions) 
             * or just a ReactNode. We normalize the output here to satisfy 
             * the return type of the processor.
             */
            const execResult = EXECUTABLES[absolutePath]();
            return typeof execResult === 'object' && 'output' in execResult 
                ? execResult 
                : { output: execResult };
        }
        return { output: <span className="text-red-500">bash: {baseCmd}: Not found</span> };
    }

    // --- STANDARD COMMANDS ---
    const commandFn = COMMANDS[baseCmd];
    if (commandFn) {
        // Why: We now pass all 3 required arguments to satisfy the CommandFunction contract.
        return commandFn(args, cwd, sessionFiles);
    }

    return {
        output: <div className="text-red-500">ERR: COMMAND_NOT_FOUND [{baseCmd}]</div>
    };
};