import React, { useState, useEffect, useRef } from "react";

/* ---------------------------------------------------------
    VIM_FILE_METADATA
    Centralizes special behaviors for specific files.
   --------------------------------------------------------- */
const FILE_SPECIAL_LOGIC: Record<string, {
    defaultContent: string[];
    exitMessage?: string;
    isReadOnly?: boolean;
}> = {
    "sos.txt": {
        defaultContent: [
            "Day 400.",
            "I am still trapped in this editor.",
            "If anyone finds this, please just type :q to set me free."
        ],
        exitMessage: "ACHIEVEMENT UNLOCKED: 'FREE AT LAST'"
    },
    "resume.txt": {
        defaultContent: [], 
        isReadOnly: true
    },
    "leetcode.exe": {
        defaultContent: [],
        isReadOnly: true
    }
};

interface VimEditorProps {
    file: string;
    initialContent?: string[];
    onClose: (systemMessage?: string, newContent?: string[]) => void;
}

export const VimEditor: React.FC<VimEditorProps> = ({ file, initialContent, onClose }) => {
    const [mode, setMode] = useState<"NORMAL" | "INSERT" | "COMMAND">("NORMAL");
    const [content, setContent] = useState<string[]>([""]);
    const [cmdInput, setCmdInput] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const containerRef = useRef<HTMLDivElement>(null);
    const meta = FILE_SPECIAL_LOGIC[file];

    /* ---------------------------------------------------------
        SYNC_BUFFER
        Priority: 1. Session RAM | 2. Special Logic | 3. Blank
       --------------------------------------------------------- */
    useEffect(() => {
        if (initialContent) {
            setContent(initialContent);
        } else if (meta?.defaultContent) {
            setContent(meta.defaultContent);
        } else {
            setContent([""]);
        }
        containerRef.current?.focus();
    }, [file, initialContent, meta]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        e.preventDefault();
        setErrorMsg("");

        if (mode === "NORMAL") {
            if (e.key === "i") {
                if (meta?.isReadOnly) {
                    setErrorMsg("W10: Warning: Changing a readonly file");
                    setTimeout(() => setMode("INSERT"), 800);
                } else {
                    setMode("INSERT");
                }
            }
            if (e.key === ":") {
                setMode("COMMAND");
                setCmdInput("");
            }
        }

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

        else if (mode === "COMMAND") {
            if (e.key === "Escape") setMode("NORMAL");
            else if (e.key === "Enter") {
                const cmd = cmdInput.trim();

                // Logic for exit commands
                if (cmd === "q" || cmd === "q!") {
                    onClose(meta?.exitMessage); // Uses config message if exists
                }
                else if (cmd === "wq" || cmd === "w") {
                    onClose(`"${file}" written to session buffer.`, content);
                }
                else {
                    setErrorMsg(`E492: Not an editor command: ${cmdInput}`);
                    setMode("NORMAL");
                }
            }
            else if (e.key === "Backspace") {
                setCmdInput(prev => prev.slice(0, -1));
                if (cmdInput.length === 1) setMode("NORMAL");
            }
            else if (e.key.length === 1) {
                setCmdInput(prev => prev + e.key);
            }
        }
    };

    /* Rendering logic remains the same (emptyLines, glow-text, status bar) */
    const emptyLines = Array.from({ length: Math.max(0, 20 - content.length) }).map((_, i) => (
        <div key={`empty-${i}`} className="text-blue-500 font-bold opacity-40">~</div>
    ));

    return (
        <div
            ref={containerRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className="h-full w-full bg-[var(--color-hacker-bg)] text-[var(--color-hacker-green)] p-0 font-mono outline-none flex flex-col justify-between absolute inset-0 z-50 overflow-hidden"
        >
            <div className="flex-grow flex pt-2 glow-text overflow-hidden">

                {/* LINE NUMBER GUTTER */}
                <div className="w-10 flex flex-col items-end pr-3 border-r border-white/10 select-none text-white/20">
                    {content.map((_, i) => (
                        <div key={`num-${i}`} className="min-h-[1.5rem] leading-6">
                            {i + 1}
                        </div>
                    ))}
                    {emptyLines}
                </div>

                {/* TEXT AREA */}
                <div className="flex-grow pl-4 whitespace-pre-wrap overflow-hidden">
                    {content.map((line, i) => (
                        <div key={i} className="min-h-[1.5rem] flex items-center leading-6">
                            {line}
                            {mode === "INSERT" && i === content.length - 1 && (
                                <span className="w-2 h-5 bg-[var(--color-hacker-green)] animate-pulse ml-1" />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* STATUS BAR */}
            <div className="flex justify-between items-center text-[10px] sm:text-xs bg-[var(--color-hacker-green)] text-black px-2 py-0.5 font-bold uppercase tracking-tighter">
                <div className="flex gap-4">
                    {mode === "COMMAND" ? (
                        <span>:{cmdInput}<span className="inline-block w-2 h-3 bg-black animate-pulse" /></span>
                    ) : errorMsg ? (
                        <span className="bg-red-600 text-white px-2">{errorMsg}</span>
                    ) : mode === "INSERT" ? (
                        <span>-- INSERT --</span>
                    ) : (
                        <span>"{file}" {meta?.isReadOnly ? "[readonly]" : ""} {content.length}L</span>
                    )}
                </div>
                <div>{content.length},1 ALL</div>
            </div>
        </div>
    );
};