/**
 * @file commands.tsx
 * @description The Command Registry for MIR_OS.
 */
import type { CommandFunction, CommandResponse } from "./types";
import { FILE_CONTENT } from "./system_files";
import { EXECUTABLES } from "./executables";
import { VFS } from "./vfs";
// Note: Verify if your path utility is named 'path' or 'path_resolver'. Adjust if needed.
import { resolvePath } from "../utils/path"; 
import { HelpManual, QuickStartGuide } from "./commands/guides";
import { DirectoryExplorer } from "../components/directory_explorer";

export const COMMANDS: Record<string, CommandFunction> = {

    ls: (args, cwd): CommandResponse => {
        const target = args[0] || ".";
        const absolutePath = resolvePath(cwd, target);

        if (VFS[absolutePath]) {
            return {
                output: <DirectoryExplorer currentPath={absolutePath} />
            };
        }
        return { 
            output: <span className="text-red-500">ls: cannot access '{target}': No such file or directory</span> 
        };
    },

    cd: (args, cwd): CommandResponse => {
        const target = args[0] || "/";
        const absolutePath = resolvePath(cwd, target);

        if (VFS[absolutePath] && (VFS[absolutePath].type === "dir" || VFS[absolutePath].type === "directory")) {
            return {
                output: <DirectoryExplorer currentPath={absolutePath} />,
                newCwd: absolutePath
            };
        }
        return { 
            output: <span className="text-red-500">bash: cd: {target}: No such file or directory</span> 
        };
    },

    cat: (args, cwd, sessionFiles): CommandResponse => {
        if (!args.length) return { output: <span className="text-red-500">cat: missing file operand</span> };

        const target = args[0].trim();
        const absolutePath = resolvePath(cwd, target);

        const pathParts = absolutePath.split("/");
        const fileName = pathParts.pop() || "";
        const dirPath = pathParts.length > 0 ? pathParts.join("/") || "/" : "/";

        const sessionFileKey = Object.keys(sessionFiles || {}).find(
            key => key.toLowerCase() === fileName.toLowerCase() && sessionFiles[key].path === dirPath
        );

        if (sessionFileKey) {
            return {
                output: (
                    <div className="whitespace-pre-wrap mt-1">
                        {sessionFiles[sessionFileKey].content.join("\n")}
                    </div>
                )
            };
        }

        if (FILE_CONTENT[absolutePath]) {
            return {
                output: (
                    <div className="flex flex-col space-y-4">
                        <div>{FILE_CONTENT[absolutePath]()}</div>
                        {/* FIX 2: Removed the broken sessionFiles prop. */}
                        <DirectoryExplorer currentPath={dirPath} />
                    </div>
                )
            };
        }

        if (VFS[absolutePath]) return { output: <span className="text-red-500">cat: {target}: Is a directory</span> };
        if (EXECUTABLES[absolutePath]) return { output: <span className="text-red-500">cat: {target}: Permission denied (Binary)</span> };

        return { output: <span className="text-red-500">cat: {target}: No such file or directory</span> };
    },

    rm: (args, cwd, sessionFiles): CommandResponse => {
        if (!args.length) return { output: <span className="text-red-500">rm: missing operand</span> };

        const target = args[0].replace(/\/+$/, "");
        const absolutePath = resolvePath(cwd, target);

        if (FILE_CONTENT[absolutePath] || EXECUTABLES[absolutePath] || VFS[absolutePath]) {
            return { output: <span className="text-red-500">rm: cannot remove '{target}': Permission denied</span> };
        }

        const fileName = absolutePath.split("/").pop() || "";
        const dirPath = absolutePath.split("/").slice(0, -1).join("/") || "/";

        if (sessionFiles[fileName] && sessionFiles[fileName].path === dirPath) {
            return {
                output: "",
                systemAction: 'REMOVE_FILE',
                meta: { fileToDelete: fileName }
            };
        }

        return { output: <span className="text-red-500">rm: cannot remove '{target}': No such file</span> };
    },

    help: (): CommandResponse => ({ output: <HelpManual /> }),
    quickstart: (): CommandResponse => ({ output: <QuickStartGuide /> }),
    restart: (): CommandResponse => ({ output: "SYSTEM RESTART INITIATED...", systemAction: 'RESTART' }),
    clear: (): CommandResponse => ({ output: "", systemAction: 'CLEAR' })
};

export const COMMAND_LIST = Object.keys(COMMANDS);