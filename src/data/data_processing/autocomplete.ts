// src/data/autocomplete.ts
import { VFS } from "../vfs";
import { EXECUTABLES } from "../executables";
import { COMMAND_LIST } from "../commands";
import { FILE_CONTENT } from "../system_files";

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
    const currentFolder = VFS[cwd as keyof typeof VFS];
    if (!currentFolder || !currentFolder.children) return null;

    if (parts.length === 1) {
        const word = parts[0];

        // Autocomplete ./executables
        if (word.startsWith("./")) {
            const target = word.slice(2);
            const localSessionFiles = Object.keys(sessionFiles).filter(f => sessionFiles[f].path === cwd);
            const allItems = Array.from(new Set([...currentFolder.children, ...localSessionFiles]));

            const matches = allItems
                .filter(item => Object.keys(EXECUTABLES).includes(item))
                .filter(item => item.startsWith(target))
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
    else if (parts.length === 2) {
        const baseCmd = parts[0].toLowerCase();
        const target = parts[1];

        const lastSlashIndex = target.lastIndexOf("/");
        const searchDirRaw = lastSlashIndex !== -1 ? target.substring(0, lastSlashIndex) : "";
        const partialName = lastSlashIndex !== -1 ? target.substring(lastSlashIndex + 1).toLowerCase() : target.toLowerCase();
        const prefixToKeep = lastSlashIndex !== -1 ? target.substring(0, lastSlashIndex + 1) : "";

        let searchPath = cwd;
        if (searchDirRaw !== "") {
            searchPath = searchDirRaw.startsWith("/") ? searchDirRaw : (cwd === "/" ? `/${searchDirRaw}` : `${cwd}/${searchDirRaw}`);
        }

        searchPath = searchPath.replace(/\/+$/, "");
        if (searchPath === "") searchPath = "/";

        const targetFolder = VFS[searchPath as keyof typeof VFS];
        if (!targetFolder) return { newInput: null, suggestions: [] };

        const staticChildren = targetFolder.children || [];
        const targetSessionFiles = Object.keys(sessionFiles).filter(f => sessionFiles[f].path === searchPath);
        const targetItems = Array.from(new Set([...staticChildren, ...targetSessionFiles]));

        let matches: string[] = [];

        if (baseCmd === "cd") {
            matches = targetItems.filter(item => {
                const itemPath = searchPath === "/" ? `/${item}` : `${searchPath}/${item}`;
                return VFS[itemPath as keyof typeof VFS]?.type === "dir" && item.toLowerCase().startsWith(partialName);
            }).sort();
        } else if (baseCmd === "cat" || baseCmd === "vim") {
            matches = targetItems.filter(item => {
                const isFile = Object.keys(FILE_CONTENT).includes(item) || targetSessionFiles.includes(item);
                return isFile && item.toLowerCase().startsWith(partialName);
            }).sort();
        } else if (baseCmd === "rm") {
            matches = targetSessionFiles.filter(item => item.toLowerCase().startsWith(partialName)).sort();
        }

        if (matches.length === 1) {
            const match = matches[0];
            const isDir = !match.includes(".");
            return { newInput: `${baseCmd} ${prefixToKeep}${match}${isDir ? "/" : ""}`, suggestions: [] };
        } else if (matches.length > 1) {
            return { newInput: null, suggestions: matches };
        }

        return { newInput: null, suggestions: [] };
    }

    return null;
};