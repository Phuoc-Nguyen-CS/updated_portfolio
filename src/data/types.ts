// src/data/types.ts
import React from "react";

/***
 * Represents a single interactoin cycle within the terminal history.
 * We store the directory state at the time of execution to ensure
 * historical prompts (e.g. `~/projects $`) do not dynamically update
 * if the user changes directores later.
 */
export interface CommandRecord {
    id: string;
    input: string;
    output: React.ReactNode | string;
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
 * Defines the acceptable state mutations a command can request.
 * Commands shouldn't mutate state directly; they return this payload 
 * for the TerminalProvider to safely apply.
 */
export interface CommandResponse {
    output: React.ReactNode | string;
    newCwd?: string; 
    systemAction?: 'CLEAR' | 'BOOT';
}

/**
 * The shape of our Global Plumbing system.
 */
export interface TerminalContextType {
    history: CommandRecord[];
    cwd: string;
    executeCommand: (input: string) => void;
}