// src/data/auto_complete.ts
import { VFS } from "../vfs";
import { EXECUTABLES } from "../executables";
import { COMMAND_LIST } from "../command_list";
import { FILE_CONTENT } from "../system_files";
import { resolvePath } from "../../utils/path";

interface AutocompleteResult {
    newInput: string | null;
    suggestions: string[];
}

export const getAutoComplete = (
    input: string,
    cwd: string,
    sessionFiles: Record<string, { content: string[]; path: string }>
): AutocompleteResult | null => {
    const rawInput = input.toLowerCase();
    if (!rawInput) return null;

    const parts = rawInput.split(" ");

    // --- SINGLE WORD AUTOCOMPLETE (Commands & Executables) ---
    if (parts.length === 1) {
        const word = parts[0];

        // Autocomplete ./executables
        if (word.startsWith("./")) {
            const target = word.slice(2);
            const currentFolder = VFS[cwd];
            if (!currentFolder) return null;

            const localSessionFiles = Object.keys(sessionFiles)
                .filter(f => sessionFiles[f].path === cwd)
                .map(f => f.split("/").pop() || f);
            const allItems = Array.from(new Set([...currentFolder.children, ...localSessionFiles]));

            const matches = allItems
                .filter(item => {
                    // Convert child to absolute path to check EXECUTABLES dictionary!
                    const absPath = resolvePath(cwd, item);
                    return !!EXECUTABLES[absPath];
                })
                .filter(item => item.toLowerCase().startsWith(target))
                .map(item => `./${item}`)
                .sort();

            if (matches.length === 1) return { newInput: matches[0], suggestions: [] };
            return { newInput: null, suggestions: matches };
        }

        // Autocomplete base commands
        const matches = COMMAND_LIST.filter(c => c.startsWith(word));
        if (matches.length === 1) return { newInput: matches[0] + " ", suggestions: [] };
        if (matches.length > 1) return { newInput: null, suggestions: matches.sort((a, b) => a.localeCompare(b)) };

        return null;
    }

    // --- TWO WORD AUTOCOMPLETE (cd, cat, vim, rm) ---
    else if (parts.length === 2) {
        const baseCmd = parts[0].toLowerCase();
        const target = parts[1];

        // Figure out what directory they are currently typing in
        const lastSlashIndex = target.lastIndexOf("/");
        const prefixToKeep = lastSlashIndex !== -1 ? target.substring(0, lastSlashIndex + 1) : "";
        const partialName = lastSlashIndex !== -1 ? target.substring(lastSlashIndex + 1).toLowerCase() : target.toLowerCase();
        const rawSearchDir = lastSlashIndex !== -1 ? target.substring(0, lastSlashIndex) : ".";

        // Resolve the directory they are searching in!
        const searchAbsPath = resolvePath(cwd, rawSearchDir);
        const targetFolder = VFS[searchAbsPath];

        if (!targetFolder) return { newInput: null, suggestions: [] };

        const staticChildren = targetFolder.children || [];
        const targetSessionFiles = Object.keys(sessionFiles)
            .filter(f => sessionFiles[f].path === searchAbsPath)
            .map(f => f.split("/").pop() || f);
        const targetItems = Array.from(new Set([...staticChildren, ...targetSessionFiles]));

        let matches: string[] = [];

        // Check based on the command
        if (baseCmd === "cd") {
            matches = targetItems.filter(item => {
                const itemAbsPath = resolvePath(searchAbsPath, item);
                return !!VFS[itemAbsPath] && item.toLowerCase().startsWith(partialName);
            });
        } else if (baseCmd === "cat" || baseCmd === "vim") {
            matches = targetItems.filter(item => {
                const itemAbsPath = resolvePath(searchAbsPath, item);
                const isSystemFile = !!FILE_CONTENT[itemAbsPath];
                const isSessionFile = targetSessionFiles.includes(item);
                return (isSystemFile || isSessionFile) && item.toLowerCase().startsWith(partialName);
            });
        } else if (baseCmd === "rm") {
            matches = targetSessionFiles.filter(item => item.toLowerCase().startsWith(partialName));
        }

        matches.sort();

        // Return the exact mapped string
        if (matches.length === 1) {
            const match = matches[0];
            const itemAbsPath = resolvePath(searchAbsPath, match);
            const isDir = !!VFS[itemAbsPath];

            return { newInput: `${baseCmd} ${prefixToKeep}${match}${isDir ? "/" : ""}`, suggestions: [] };
        } else if (matches.length > 1) {
            return { newInput: null, suggestions: matches };
        }

        return { newInput: null, suggestions: [] };
    }

    return null;
};
