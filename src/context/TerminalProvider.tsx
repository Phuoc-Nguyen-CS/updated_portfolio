/**
 * @file TerminalProvider.tsx
 * @description The Central Component for MIR_OS
 * The file implements the Global State Management for MIR_OS.
 * By using React Context API, we provide a while for the system to communicate directly.
 * It allows for any component to execute commands or read system state without complex prop-drilling.
 */

import { useState } from "react";
import type { ReactNode, FC } from "react";
import type {
  CommandRecord,
  CommandResponse,
  VirtualFileSystem,
} from "../data/types";
import { processCommand } from "../data/data_processing/command_processor";
import { VFS as STATIC_VFS } from "../data/vfs";
import { TerminalContext } from "./TerminalContext";
import { getParentPath, resolvePath } from "../utils/path";

/**
 * The Terminal Provider Component
 * Initialize as undefined to ensure that the useTerminal throws a clear error if used outside of the provider.
 */
export const TerminalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // --- SYSTEM STATE ---
  // History: Stores all past interactions for the console output.
  const [history, setHistory] = useState<CommandRecord[]>([]);

  // CWD: The "Current Working Directory" absolute path.
  const [cwd, setCwd] = useState<string>("/");

  // SessionFiles are any files that the user may have created or edited
  const [sessionFiles, setSessionFiles] = useState<
    Record<string, { content: string[]; path: string }>
  >({});

  // VFS State is a mutable version of the static file system
  // Allows for UI components to react when files are created or deleted
  const [vfs, setVfs] = useState<VirtualFileSystem>(
    STATIC_VFS as VirtualFileSystem,
  );

  // activeEditorFile: Tracks which file is currently open in the Vim Editor.
  const [activeEditorFile, setActiveEditorFile] = useState<string | null>(null);

  const executeCommand = (input: string) => {
    if (!input.trim() || activeEditorFile) return;

    // Pass the sessionFiles snapshot so the processor can "see" current RAM.
    const response: CommandResponse = processCommand(input, cwd, sessionFiles);

    // Handle "Intents" returned by the processor to update the global state.
    switch (response.systemAction) {
      case "CLEAR":
        setHistory([]);
        return;
      case "RESTART":
        window.location.reload();
        return;
      case "VIM":
        // Locks the terminal and switches to the editor view.
        setActiveEditorFile(response.meta?.vimFile || "[NO_FILENAME");
        return;
      case "REMOVE_FILE":
        if (response.meta?.fileToDelete) {
          const filePath = response.meta.fileToDelete;

          // Update our session
          setSessionFiles((prev) => {
            const next = { ...prev };
            delete next[filePath];
            return next;
          });

          // Update our VFS structure so 'ls' and UI reflects the change
          setVfs((prev) => {
            const next = { ...prev };
            const absolutePath = Object.keys(next).find((path) => path === filePath);
            if (absolutePath) delete next[absolutePath];
            return next;
          });
        }
        break;
    }

    // Snapshots the CWD to ensure historical command lines stay accurate.
    const newRecord: CommandRecord = {
      id: crypto.randomUUID(),
      input,
      output: response.output,
      cwdAtExecution: cwd,
    };

    setHistory((prev) => [...prev, newRecord]);

    // Navigation update
    if (response.newCwd) setCwd(response.newCwd);
  };

  // Persists content from the Vim Editor into the system's memory
  const saveSessionFile = (fileName: string, content: string[]) => {
    const filePath = resolvePath(cwd, fileName);
    setSessionFiles((prev) => ({
      ...prev,
      [filePath]: { content, path: getParentPath(filePath) },
    }));
  };

  return (
    <TerminalContext.Provider
      value={{
        history,
        cwd,
        executeCommand,
        vfs,
        activeEditorFile,
        closeEditor: () => setActiveEditorFile(null),
        sessionFiles,
        saveSessionFile,
      }}
    >
      {children}
    </TerminalContext.Provider>
  );
};
