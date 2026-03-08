/* =========================================================
    VIM_EDITOR_COMPONENT
    A functional React component that mimics the behavior of 
    the Vi/Vim text editor within the terminal environment.
   ========================================================= */

import React, { useState, useEffect, useRef } from "react";

interface VimEditorProps {
    file: string;
    onClose: () => void;
}

export const VimEditor: React.FC<VimEditorProps> = ({ file, onClose }) => {
    /* ---------------------------------------------------------
        STATE_MANAGEMENT
        Tracks editor modes (NORMAL, INSERT, COMMAND) and 
        line-by-line buffer content.
       --------------------------------------------------------- */

    const [mode, setMode] = useState<"NORMAL" | "INSERT" | "COMMAND">("NORMAL");
    const [content, setContent] = useState<string[]>([]);
    const [cmdInput, setCmdInput] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);

    /* ---------------------------------------------------------
        FILESYSTEM_SYNC
        Initializes buffer based on file path. 
        Includes 'sos.txt' easter egg implementation.
       --------------------------------------------------------- */
    useEffect(() => {
        if (file === "sos.txt") {
            setContent([
                "Day 400.",
                "I am still trapped in this editor.",
                "I've tried Ctrl+C. I've tried turning off my computer.",
                "If anyone finds this, please just type :q to set me free."
            ]);
        } else {
            setContent([""]);
        }
        containerRef.current?.focus();
    }, [file]);

    /* ---------------------------------------------------------
        INPUT_HANDLER_ENGINE
        Main logic for processing VIM keybindings and mode 
        switching. Handles character insertion and deletions.
       --------------------------------------------------------- */
    const handleKeyDown = (e: React.KeyboardEvent) => {
        e.preventDefault(); // Prevent scrolling or browser shortcuts

        // 01. NORMAL MODE: Navigation and entry
        if (mode === "NORMAL") {
            if (e.key === "i") setMode("INSERT");
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

        // 03. COMMAND MODE: (e.g., :q, :wq)
        else if (mode === "COMMAND") {
            if (e.key === "Escape") setMode("NORMAL");
            else if (e.key === "Enter") {
                // THE EXIT LOGIC
                if (cmdInput === "q" || cmdInput === "q!" || cmdInput === "wq") {
                    onClose();
                } else {
                    setMode("NORMAL"); // Ignore unknown commands
                }
            }
            else if (e.key === "Backspace") {
                setCmdInput(prev => prev.slice(0, -1));
                if (cmdInput.length === 0) setMode("NORMAL");
            }
            else if (e.key.length === 1) {
                setCmdInput(prev => prev + e.key);
            }
        }
    };

    /* ---------------------------------------------------------
        UI_GENERATION
        Renders the editor buffer and the iconic blue "~" lines.
       --------------------------------------------------------- */
    const emptyLines = Array.from({ length: Math.max(0, 20 - content.length) }).map((_, i) => (
        <div key={`empty-${i}`} className="text-blue-500 font-bold">~</div>
    ));

    return (
        <div
            ref={containerRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className="h-full w-full bg-[var(--color-hacker-bg)] text-white/90 p-2 font-mono outline-none flex flex-col justify-between absolute inset-0 z-50"
        >
            <div className="flex-grow whitespace-pre-wrap">
                {content.map((line, i) => (
                    <div key={i} className="min-h-[1.5rem]">
                        {line}
                        {mode === "INSERT" && i === content.length - 1 && (
                            <span className="inline-block w-2 h-4 bg-white/80 animate-pulse ml-1 align-middle" />
                        )}
                    </div>
                ))}
                {emptyLines}
            </div>

            {/* VIM STATUS BAR */}
            <div className="h-6 flex items-center text-sm font-bold bg-[var(--color-hacker-green)] text-black px-2 mt-2">
                {mode === "NORMAL" && <span>"{file}" {content.length}L</span>}
                {mode === "INSERT" && <span>-- INSERT --</span>}
                {mode === "COMMAND" && <span>:{cmdInput}<span className="inline-block w-2 h-4 bg-black animate-pulse align-middle" /></span>}
            </div>
        </div>
    );
};