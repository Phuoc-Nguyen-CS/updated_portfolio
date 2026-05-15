/**
 * @file command_processor.tsx
 * @description The Router and Command Parser for MIR_OS.
 * Transforms raw string input into structured CommandResponse objects
 * enforcing security guards and handling the execution of both native
 * commands and binary executables.
 */
import type { CommandResponse } from "../types";
import { COMMANDS } from "../commands";
import { EXECUTABLES } from "../executables";
import { FILE_CONTENT } from "../system_files";
import { resolvePath } from "../../utils/path";
import { VFS } from "../vfs";

/**
 * The entry point for command evaluation.
 * @param {string} input - Raw text entered by the user.
 * @param {string} cwd - Current working directory absolute path.
 * @param {Record} sessionFiles - Any files user may have created.
 * @returns {CommandResponse} Instructions for the TerminalProvider.
 */
export const processCommand = (
  input: string,
  cwd: string,
  sessionFiles: Record<string, { content: string[]; path: string }>,
): CommandResponse => {
  // Trim input whitespace
  const rawInput = input.trim();
  if (rawInput === "") return { output: "" };

  // Tokenize the input:
  // baseCmd is the executable.
  // args is the parameters.
  const inputParts = rawInput.split(/\s+/);
  const baseCmd = inputParts[0].toLowerCase();
  const args = inputParts.slice(1);

  // --- SYSTEM INTERRUPTS ---
  if (baseCmd === "clear") return { output: "", systemAction: "CLEAR" };
  if (baseCmd === "restart") return { output: "", systemAction: "RESTART" };

  // --- VIM HANDLER ---
  if (baseCmd === "vim") {
    const rawTarget = args[0] || "[No Name]";
    const absolutePath = resolvePath(cwd, rawTarget);

    // We ensure that VIM can't open our protected files and destroy it
    const isProtected =
      absolutePath in FILE_CONTENT || absolutePath in EXECUTABLES;
    if (isProtected) {
      return {
        output: (
          <span className="text-hacker-red">
            bash: vim: {rawTarget}: Permission denied
          </span>
        ),
      };
    }

    // Ensures that it also can't open directories.
    if (VFS[absolutePath] && VFS[absolutePath].type === "dir") {
      return {
        output: (
          <span className="text-hacker-red">
            bash: vim {rawTarget} Permission denied trying to edit directory
            files.
          </span>
        ),
      };
    }

    return {
      output: "",
      systemAction: "VIM",
      meta: { vimFile: rawTarget },
    };
  }

  // --- EXECUTABLE ENGINE ---
  /**
   * Supports the './' command to mimic shell behavior for binary files.
   */
  if (baseCmd.startsWith("./")) {
    const rawTarget = baseCmd.slice(2);
    const absolutePath = resolvePath(cwd, rawTarget);

    if (EXECUTABLES[absolutePath]) {
      /**
       * Normalize the Executable Return:
       * Either returns a ReactNode or full CommandResponse.
       */
      const execResult = EXECUTABLES[absolutePath]();
      return typeof execResult === "object" && "output" in execResult
        ? execResult
        : { output: execResult };
    }
    return {
      output: (
        <span className="text-hacker-red">bash: {baseCmd}: Not found</span>
      ),
    };
  }

  // --- STANDARD COMMANDS ---
  /**
   * Supports 'ls', 'cd', 'cat' to COMMANDS registry.
   */
  const commandFn = COMMANDS[baseCmd];
  if (commandFn) {
    return commandFn(args, cwd, sessionFiles);
  }

  // --- COMMAND NOT FOUND ---
  return {
    output: (
      <div className="text-hacker-red">
        <p>ERR: COMMAND_NOT_FOUND [{baseCmd}]</p>
        <p className="text-white/50 text-xs mt-1">
          Type{" "}
          <span className="text-hacker-yellow underline cursor-pointer">
            help
          </span>{" "}
          for a list of available protocols.
        </p>
      </div>
    ),
  };
};
