/**
 * @file commands.tsx
 * @description The Command Registry for MIR_OS.
 * Returns a standardized Command Response
 */
import type { CommandFunction, CommandResponse } from "./types";
import { FILE_CONTENT } from "./system_files";
import { EXECUTABLES } from "./executables";
import { VFS } from "./vfs";
import { resolvePath } from "../utils/path";
import { HelpManual, QuickStartGuide } from "./commands/guides";
import { DirectoryExplorer } from "../components/directory_explorer";

export const COMMANDS: Record<string, CommandFunction> = {
  /**
   * LS: List Directory Contents.
   * Logic:
   * 1. If the target is a directory in the VFS, render the DirectoryExplorer.
   * 2. If the target is a file (in system files or session RAM), list that file.
   * 3. Otherwise, return a "No such file" error.
   * @param {string} args - Raw user input.
   * @param {string} cwd - The absolute path of the current working directory.
   * @param {Record} sessionFiles - Any potential files the user may have created this session.
   */
  ls: (args, cwd, sessionFiles): CommandResponse => {
    const target = args[0] || ".";
    const absolutePath = resolvePath(cwd, target);

    // Check if it's a directory
    if (VFS[absolutePath]) {
      return {
        output: <DirectoryExplorer currentPath={absolutePath} />,
      };
    }

    // Check if it's a file
    const fileName = absolutePath.split("/").pop() || "";
    const dirPath = absolutePath.split("/").slice(0, -1).join("/") || "/";
    const isFile =
      !!FILE_CONTENT[absolutePath] ||
      Object.values(sessionFiles).some(
        (f) => f.path === dirPath && absolutePath.endsWith(fileName),
      );

    if (isFile) {
      return { output: <span>{target}</span> };
    }

    return {
      output: (
        <span className="text-hacker-red">
          ls: cannot access '{target}': No such file or directory
        </span>
      ),
    };
  },

  /**
   * CD: Change Directory.
   * Logic:
   * 1. Resolves the target path.
   * 2. Validates that the path exists in the VFS and is marked as a directory.
   * 3. Returns a 'newCwd' instruction for the TerminalProvider.
   */
  cd: (args, cwd): CommandResponse => {
    const target = args[0] || "/";
    const absolutePath = resolvePath(cwd, target);

    //  Standardized check for directory type to prevent entering files as dirs
    const node = VFS[absolutePath];
    if (node && (node.type === "dir" || node.type === "directory")) {
      return {
        output: <DirectoryExplorer currentPath={absolutePath} />,
        newCwd: absolutePath,
      };
    }

    return {
      output: (
        <span className="text-hacker-red">
          bash: cd: {target}: No such file or directory
        </span>
      ),
    };
  },

  /**
   * CAT: Concatenate and print files.
   * Logic:
   * 1. Check Session RAM (user-edited files) first.
   * 2. Check Static System Files second.
   * 3. Error if the target is a directory or binary.
   */
  cat: (args, cwd, sessionFiles): CommandResponse => {
    if (!args.length)
      return {
        output: (
          <span className="text-hacker-red">cat: missing file operand</span>
        ),
      };

    const target = args[0].trim();
    const absolutePath = resolvePath(cwd, target);

    // Path parsing for session lookup
    const pathParts = absolutePath.split("/");
    pathParts.pop();
    const dirPath = pathParts.length > 0 ? pathParts.join("/") || "/" : "/";

    // Session File Lookup
    const sessionFileKey = Object.keys(sessionFiles || {}).find(
      (key) => key.toLowerCase() === absolutePath.toLowerCase(),
    );

    if (sessionFileKey) {
      return {
        output: (
          <div className="whitespace-pre-wrap mt-1 border-l-2 border-hacker-blue/30 pl-4 py-1">
            {sessionFiles[sessionFileKey].content.join("\n")}
          </div>
        ),
      };
    }

    // Static System File Lookup
    if (FILE_CONTENT[absolutePath]) {
      return {
        output: (
          <div className="flex flex-col space-y-6">
            <div className="animate-in fade-in slide-in-from-left-2 duration-500">
              {FILE_CONTENT[absolutePath]()}
            </div>
            {/* Contextual navigation helper */}
            <DirectoryExplorer currentPath={dirPath} />
          </div>
        ),
      };
    }

    // Guards
    if (VFS[absolutePath])
      return {
        output: (
          <span className="text-hacker-red">cat: {target}: Is a directory</span>
        ),
      };
    if (EXECUTABLES[absolutePath])
      return {
        output: (
          <span className="text-hacker-red">
            cat: {target}: Permission denied (Binary)
          </span>
        ),
      };

    return {
      output: (
        <span className="text-hacker-red">
          cat: {target}: No such file or directory
        </span>
      ),
    };
  },

  /**
   * RM: Remove File.
   * Logic:
   * 1. Guards against deleting system-critical files (Read-only).
   * 2. Returns a 'REMOVE_FILE' action if the file exists in Session RAM.
   */
  rm: (args, cwd, sessionFiles): CommandResponse => {
    if (!args.length)
      return {
        output: <span className="text-hacker-red">rm: missing operand</span>,
      };

    const target = args[0].replace(/\/+$/, "");
    const absolutePath = resolvePath(cwd, target);

    // Prevent deletion of system core
    if (
      FILE_CONTENT[absolutePath] ||
      EXECUTABLES[absolutePath] ||
      VFS[absolutePath]
    ) {
      return {
        output: (
          <span className="text-hacker-red">
            rm: cannot remove '{target}': Permission denied (Read-only)
          </span>
        ),
      };
    }

    if (sessionFiles[absolutePath]) {
      return {
        output: "",
        systemAction: "REMOVE_FILE",
        meta: { fileToDelete: absolutePath },
      };
    }

    return {
      output: (
        <span className="text-hacker-red">
          rm: cannot remove '{target}': No such file
        </span>
      ),
    };
  },

  help: (): CommandResponse => ({ output: <HelpManual /> }),

  quickstart: (): CommandResponse => ({ output: <QuickStartGuide /> }),

  restart: (): CommandResponse => ({
    output: "SYSTEM RESTART INITIATED...",
    systemAction: "RESTART",
  }),

  clear: (): CommandResponse => ({
    output: "",
    systemAction: "CLEAR",
  }),
};
