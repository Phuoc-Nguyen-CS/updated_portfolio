/**
 * @file types.ts
 * @description The Architectural Blueprint for MIR_OS.
 * This file centralizes the "contracts" between the system's logic and its UI.
 * Ensures that the Engine (Provider) and the Logic (Processor/Commands) 
 * can grow independently without creating breaking changes.
 */
import type { ReactNode } from 'react';

/**
 * Represents a single node in a Virtual File System (VFS)
 * @property {'dir' | 'file'} type - Distinguishes between a container and its leaf nodes
 * @property {string[]} children - For containers (directores), a list of child node names
*/
export interface VFSNode {
    type: 'dir' | 'file';
    children: string[];
}

/**
 * The full map of MIR_OS file systems.
 * Keyed by absolute paths (e.g., "projects/portfolio") for quick O(1) lookups
 */
export type VirtualFileSystem = Record<string, VFSNode>;

/***                                         
 * Represents a single entry in the terminal's historical record.
 * @property {string} cwdAtExecution - We are able to snapshot the directory at the time
 * of execution to ensure historical command prompts
 */
export interface CommandRecord {
    id: string;
    input: string;
    output: ReactNode | string;
    cwdAtExecution: string;
}

/***
 * Standardized input context for terminal command logic
 */
export interface CommandContext {
    rawInput: string;
    args: string[];
    currentCwd: string;
}

/**
 * The Pure Function for all MIR_OS commands
 * @param {string[]} args - Argument passed after the base cmd (e.g. cd, ./, cat, etc.)
 * @param {string} cwd - The current working directory
 * @param {Record} sessionFiles - The user's session potentially containing user-created files
 * @returns {CommandResponse} A declarative instruction for the system engine
 */
export type CommandFunction = (
    args: string[], 
    cwd: string, 
    sessionFiles: Record<string, { content: string[], path: string }>
) => CommandResponse;

/**
 * Packet of Intent returned by the command
 * Instead of a command directly changing the state, it returns these instructions
 * The TerminalProvider then applies these changes safely in the React lifecycle
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
 * The unified interface
 * Defines our data and methods that are available to any component in the tree.
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

export interface Project {
    title: string;
    tech: string;
    description: string;
    featured?: boolean;
}