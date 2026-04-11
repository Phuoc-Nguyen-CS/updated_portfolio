/**
 * @file types.ts
 * @description Centralized type definitions for the MIR_OS environment.
 * Why: We use 'import type' to satisfy 'verbatimModuleSyntax', ensuring 
 * that type-only dependencies are erased during the Vite build process,
 * preventing runtime reference errors.
 */
import type { ReactNode } from 'react';

export interface VFSNode {
    type: 'dir' | 'file';
    children: string[];
}

export type VirtualFileSystem = Record<string, VFSNode>;

/***                                         
 * Represents a single interactoin cycle within the terminal history.
 * We store the directory state at the time of execution to ensure
 * historical prompts (e.g. `~/projects $`) do not dynamically update
 * if the user changes directores later.
 */
export interface CommandRecord {
    id: string;
    input: string;
    output: ReactNode | string;
    cwdAtExecution: string;
}

/***
 * The unified contract for all commmand modules.
 * Instead of monolithic parsing, individual commands (ls, cd) will
 * accept this context and return a standardized response.
 */
export interface CommandContext {
    rawInput: string;
    args: string[];
    currentCwd: string;
    //vfs: VirtualFileSystem; // Added later
}

/**
 * The standard interface for all command logic functions.
 * Why: By restricting the arguments to only 'args' and 'cwd', we ensure 
 * that commands cannot side-effect the application state directly.
 */
export type CommandFunction = (
    args: string[], 
    cwd: string, 
    sessionFiles: Record<string, { content: string[], path: string }>
) => CommandResponse;

/**
 * Defines the acceptable state mutations a command can request.
 * Commands shouldn't mutate state directly; they return this payload 
 * for the TerminalProvider to safely apply.
 */
export interface CommandResponse {
    output: ReactNode | string;
    newCwd?: string; 
    systemAction?: 'CLEAR' | 'RESTART' | 'VIM' | 'REMOVE_FILE';
    meta?: {
        vimFile?: string;
        fileToDelete?: string;
    };
}

/**
 * The shape of our Global Plumbing system.
 */
export interface TerminalContextType {
    history: CommandRecord[];
    cwd: string;
    executeCommand: (input: string) => void;
    vfs: VirtualFileSystem;
    activeEditorFile?: string | null;
    closeEditor?: () => void;
    sessionFiles: Record<string, { content: string[], path: string }>;
    saveSessionFile: (fileName: string, content: string[]) => void;
}