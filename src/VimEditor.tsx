/* =========================================================
    VIM_EDITOR_COMPONENT
    A functional React component that mimics the behavior of 
    the Vi/Vim text editor within the terminal environment.
    Includes read-only file protections and easter eggs.
   ========================================================= */

import React, { useState, useEffect, useRef } from "react";

/* ---------------------------------------------------------
    SYSTEM_CONSTANTS
    Defines which files are protected from modifications by 
    the guest user. Matches the Virtual File System (VFS).
   --------------------------------------------------------- */
const READ_ONLY_FILES = ["about.txt", "resume.pdf", "leetcode.exe", "contact.sh", "github.link"];

interface VimEditorProps {
    file: string;
    onClose: (systemMessage?: string) => void;
}

export const VimEditor: React.FC<VimEditorProps> = ({ file, onClose }) => {
    /* ---------------------------------------------------------
        STATE_MANAGEMENT
        Tracks editor modes (NORMAL, INSERT, COMMAND), 
        line-by-line buffer content, and system errors.
       --------------------------------------------------------- */
    const [mode, setMode] = useState<"NORMAL" | "INSERT" | "COMMAND">("NORMAL");
    const [content, setContent] = useState<string[]>([]);
    const [cmdInput, setCmdInput] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const containerRef = useRef<HTMLDivElement>(null);
    const isReadOnly = READ_ONLY_FILES.includes(file);

    /* ---------------------------------------------------------
        FILESYSTEM_SYNC
        Initializes buffer based on file path. 
        Includes 'sos.txt' easter egg implementation and 
        read-only file placeholders.
       --------------------------------------------------------- */
    useEffect(() => {
        if (file === "sos.txt") {
            setContent([
                "Day 400.",
                "I am still trapped in this editor.",
                "I've tried Ctrl+C. I've tried turning off my computer.",
                "If anyone finds this, please just type :q to set me free."
            ]);
        } else if (isReadOnly) {
            setContent([
                `# CONTENTS OF ${file.toUpperCase()}`,
                "This file is locked by root.",
                "You may view it, but you cannot alter its destiny."
            ]);
        } else {
            setContent([""]);
        }
        containerRef.current?.focus();
    }, [file, isReadOnly]);

    /* ---------------------------------------------------------
        INPUT_HANDLER_ENGINE
        Main logic for processing VIM keybindings and mode 
        switching. Enforces read-only permissions and handles
        character insertion/deletion.
       --------------------------------------------------------- */
    const handleKeyDown = (e: React.KeyboardEvent) => {
        e.preventDefault(); // Prevent scrolling or browser shortcuts
        setErrorMsg("");    // Clear any previous errors on new keypress

        // 01. NORMAL MODE: Navigation and entry
        if (mode === "NORMAL") {
            if (e.key === "i") {
                if (isReadOnly) {
                    setErrorMsg("W10: Warning: Changing a readonly file");
                } else {
                    setMode("INSERT");
                }
            }
            if (e.key === ":") {
                setMode("COMMAND");
                setCmdInput("");
            }
        }

        // 02. INSERT MODE: Text Manipulation
        else if (mode === "INSERT") {
            if (e.key === "Escape") setMode("NORMAL");
            else if (e.key === "Enter") setContent(prev => [...prev, ""]);
            else if (e.key === "Backspace") {
                setContent(prev => {
                    const newContent = [...prev];
                    const lastLine = newContent[newContent.length - 1];
                    if (lastLine.length > 0) {
                        newContent[newContent.length - 1] = lastLine.slice(0, -1);
                    } else if (newContent.length > 1) {
                        newContent.pop();
                    }
                    return newContent;
                });
            }
            else if (e.key.length === 1) {
                setContent(prev => {
                    const newContent = [...prev];
                    newContent[newContent.length - 1] += e.key;
                    return newContent;
                });
            }
        }

        // 03. COMMAND MODE: Execution (e.g., :q, :wq)
        else if (mode === "COMMAND") {
            if (e.key === "Escape") setMode("NORMAL");
            else if (e.key === "Enter") {

                // EXIT LOGIC
                if (cmdInput === "q" || cmdInput === "q!") {
                    // Easter egg trigger
                    if (file === "sos.txt") {
                        onClose("ACHIEVEMENT UNLOCKED: 'FREE AT LAST'");
                    } else {
                        onClose();
                    }
                }

                // WRITE LOGIC
                else if (cmdInput === "w" || cmdInput === "wq") {
                    if (isReadOnly) {
                        setErrorMsg("E45: 'readonly' option is set (add ! to override)");
                        setMode("NORMAL");
                    } else {
                        onClose(`"${file}" written. (Changes discarded by VFS)`);
                    }
                }

                // INVALID COMMAND
                else {
                    setErrorMsg(`E492: Not an editor command: ${cmdInput}`);
                    setMode("NORMAL");
                }
            }
            else if (e.key === "Backspace") {
                setCmdInput(prev => prev.slice(0, -1));
                if (cmdInput.length === 1) setMode("NORMAL"); // Exit command mode if empty
            }
            else if (e.key.length === 1) {
                setCmdInput(prev => prev + e.key);
            }
        }
    };

    /* ---------------------------------------------------------
        UI_GENERATION
        Renders the editor buffer, the iconic blue "~" lines, 
        and the context-aware status bar.
       --------------------------------------------------------- */
    const emptyLines = Array.from({ length: Math.max(0, 20 - content.length) }).map((_, i) => (
        <div key={`empty-${i}`} className="text-blue-500 font-bold">~</div>
    ));

    return (
        <div
            ref={containerRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className="h-full w-full bg-[#1e1e1e] text-gray-200 p-2 font-mono outline-none flex flex-col justify-between absolute inset-0 z-50"
        >
            <div className="flex-grow whitespace-pre-wrap pt-2">
                {content.map((line, i) => (
                    <div key={i} className="min-h-[1.5rem]">
                        {line}
                        {mode === "INSERT" && i === content.length - 1 && (
                            <span className="inline-block w-2 h-4 bg-gray-400 animate-pulse ml-1 align-middle" />
                        )}
                    </div>
                ))}
                {emptyLines}
            </div>

            {/* VIM STATUS BAR */}
            <div className="flex justify-between items-center text-sm bg-black text-white px-2 py-1 border-t border-gray-700">
                <div className="flex gap-4">
                    {mode === "COMMAND" ? (
                        <span>:{cmdInput}<span className="inline-block w-2 h-4 bg-white animate-pulse align-middle" /></span>
                    ) : errorMsg ? (
                        <span className="bg-red-600 text-white px-2 font-bold">{errorMsg}</span>
                    ) : mode === "INSERT" ? (
                        <span className="font-bold">-- INSERT --</span>
                    ) : (
                        <span>"{file}" {isReadOnly ? "[readonly]" : ""} {content.length}L</span>
                    )}
                </div>
                <div className="text-gray-400">
                    {content.length},1  All
                </div>
            </div>
        </div>
    );
};