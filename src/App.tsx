/**
 * @file App.tsx
 * @description The "View Layer" (UI/UX) of MIR_OS.
 * This component is strictly decoupled from system logic. It acts as a 
 * reactive shell that consumes data from the TerminalProvider and renders it 
 * to the DOM. It handles visual concerns: animations, auto-scrolling, 
 * the custom blinking cursor, and the boot sequence.
 */
import React, { useState, useRef, useEffect } from "react";
import { VimEditor } from "./components/terminal/VimEditor";
import { BOOT_SEQUENCE } from "./data/boot_sequence/boot_sequence";
import { getAutoComplete } from "./data/data_processing/auto_complete";
import { useTerminal } from "./context/terminal_context";

export default function App() {
  // --- GLOBAL Engine (Context Hook) ---
  // We extract the OS state. App.tsx doesn't know "how" to execute a command;
  // it just knows to call executeCommand() when the user hits Enter.
  const { 
    history, 
    cwd, 
    executeCommand, 
    activeEditorFile, 
    closeEditor, 
    sessionFiles, 
    saveSessionFile 
  } = useTerminal();

  // --- LOCAL UI STATE (Visual Only)) ---
  const hasBooted = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const [input, setInput] = useState("");
  const [historyStack, setHistoryStack] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isBooting, setIsBooting] = useState(true);
  const [bootLogs, setBootLogs] = useState<React.ReactNode[]>([]);

  // Mobile viewport fix
  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    window.visualViewport?.addEventListener("resize", setViewportHeight);
    window.visualViewport?.addEventListener("scroll", setViewportHeight);
    setViewportHeight();

    return () => {
      window.visualViewport?.removeEventListener("resize", setViewportHeight);
      window.visualViewport?.removeEventListener("scroll", setViewportHeight);
    };
  }, []);
  
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history, bootLogs, suggestions]);

  /**
   * INITIAL SYSTEM BOOT
   * Simulated loading sequence. We use a controlled interval to push strings into local state.
   */
  useEffect(() => {
    if (!isBooting || hasBooted.current) return;
    hasBooted.current = true;

    let currentLine = 0;

    const printNextLine = () => {
      if (currentLine < BOOT_SEQUENCE.length) {
        const log = BOOT_SEQUENCE[currentLine];
        const logOutput = typeof log.text === "string"
            ? <span className={log.color || "text-white/80 italic"}>{log.text}</span>
            : log.text;

        setBootLogs((prev) => [...prev, logOutput]);
        currentLine++;
        setTimeout(printNextLine, log.delay);
      } else {
        setIsBooting(false);
      }
    };

    printNextLine();
  }, [isBooting]);

  useEffect(() => {
    if (!isBooting) inputRef.current?.focus();
  }, [isBooting]);

  const handleContainerClick = () => {
    if (!isBooting) inputRef.current?.focus();
  };

  /**
     * KEYBOARD & INPUT HANDLERS
     * Logic: Intercepts 'Enter' for execution and 'Tab' for autocomplete.
     */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Autocomplete logic
    if (e.key === "Tab") {
      e.preventDefault();
      const result = getAutoComplete(input, cwd, sessionFiles);
      if (result) {
        if (result.newInput) setInput(result.newInput);
        setSuggestions(result.suggestions);
      }
      return;
    }

    // History
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyStack.length === 0) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex < historyStack.length) {
        setHistoryIndex(nextIndex);
        setInput(historyStack[historyStack.length - 1 - nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = historyIndex - 1;
      if (nextIndex >= 0) {
        setHistoryIndex(nextIndex);
        setInput(historyStack[historyStack.length - 1 - nextIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  // Input Form Submit
  const handleCommand = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    executeCommand(input);
    
    // UI cleanups
    setHistoryStack((prev) => [...prev, input]);
    setHistoryIndex(-1);
    setInput("");
    setSuggestions([]);
  };

  // Ghost Typer (For clickable UI elements)
  const triggerCommand = (cmd: string) => {
    if (isBooting) return; 

    let currentText = "";
    inputRef.current?.blur(); 

    cmd.split("").forEach((char, i) => {
      setTimeout(() => {
        currentText += char;
        setInput(currentText);

        if (i === cmd.length - 1) {
          setTimeout(() => {
            executeCommand(cmd); 
            setHistoryStack((prev) => [...prev, cmd]);
            setInput("");
            inputRef.current?.focus();
          }, 300);
        }
      }, i * 40);
    });
  };

  const triggerCommandRef = useRef(triggerCommand);
  useEffect(() => {
    triggerCommandRef.current = triggerCommand;
  }, [triggerCommand]);

  useEffect(() => {
    const handleGlobalCommand = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        triggerCommandRef.current(customEvent.detail);
      }
    };
    window.addEventListener('run-cmd', handleGlobalCommand);
    return () => window.removeEventListener('run-cmd', handleGlobalCommand);
  }, []);

  return (
    <div
      style={{ backgroundColor: 'var(--color-hacker-bg)', color: 'var(--color-hacker-green)' }}
      className="h-full w-full font-mono cursor-text overflow-y-auto no-scrollbar selection:bg-[var(--color-hacker-green)] selection:text-[var(--color-hacker-bg)] overflow-x-hidden"
      onClick={activeEditorFile ? undefined : handleContainerClick}
    >
      <div className="scanlines fixed inset-0 pointer-events-none z-50" />

      {/* --- VIM EDITOR --- */}
      {activeEditorFile && (
        <VimEditor
          file={activeEditorFile}
          initialContent={sessionFiles[activeEditorFile]?.content}
          onClose={(_msg, newContent) => {
            if (newContent) {
              // Hit the global context to save the file
              saveSessionFile(activeEditorFile, newContent);
            }
            // Signal the context to unlock the terminal
            if (closeEditor) closeEditor();
            setTimeout(() => inputRef.current?.focus(), 100);
          }}
        />
      )}

      {/* --- MAIN TERMINAL --- */}
      <div className={`max-w-5xl mx-auto p-4 md:p-10 text-sm md:text-base mb-20 relative z-10 ${activeEditorFile ? 'hidden' : 'block'}`}>

        <div className="space-y-4">
          {/* 1. Render Boot Sequence First */}
          <div className="flex flex-col items-start justify-center">
            {bootLogs.map((log, i) => (
              <div key={`boot-${i}`} className="animate-in fade-in duration-300 max-w-full overflow-x-hidden glow-text whitespace-pre-wrap">
                {log}
              </div>
            ))}
          </div>

          {/* 2. Render Command History */}
          {history.map((entry) => (
            <div key={entry.id} className="break-words animate-in fade-in duration-300 max-w-full overflow-x-hidden">
              {entry.input && (
                <div className="flex items-center opacity-50 text-xs md:text-sm">
                  <span className="mr-2 text-white/100 font-bold">
                    guest@portfolio:~{entry.cwdAtExecution === "/" ? "" : entry.cwdAtExecution}$
                  </span>
                  <span className="text-white font-bold italic">{entry.input}</span>
                </div>
              )}
              <div className="glow-text mt-1 whitespace-pre-wrap">
                {React.isValidElement(entry.output) && typeof entry.output.type === 'function'
                  ? React.cloneElement(
                    entry.output as React.ReactElement<{ onAction?: (cmd: string) => void }>,
                    { onAction: triggerCommand }
                  )
                  : entry.output
                }
              </div>
            </div>
          ))}
        </div>

        {!isBooting && suggestions.length > 0 && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 opacity-70">
            {suggestions.map((s) => (
              <span key={s} className="text-xs md:text-sm">{s}</span>
            ))}
          </div>
        )}

        {!isBooting && (
          <form onSubmit={handleCommand} className="flex items-start mt-4 pb-12 animate-in fade-in duration-700">
            <span className="mr-2 font-bold shrink-0 animate-pulse text-[var(--color-hacker-green)]">❯</span>
            <div className="relative flex-grow">
              {!input && (
                <span className="absolute inset-0 z-0 text-white/30 italic pointer-events-none whitespace-nowrap">
                  type 'quickstart' or 'help' and press enter to begin...
                </span>
              )}
              <input
                ref={inputRef}
                onKeyDown={handleKeyDown}
                onFocus={() => setTimeout(scrollToBottom, 300)}
                type="text"
                style={{ color: 'var(--color-hacker-green)' }}
                className="bg-transparent border-none outline-none w-full glow-text caret-transparent absolute inset-0 z-10"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoComplete="off"
                autoCapitalize="none"
                spellCheck="false"
                autoFocus
              />
              <div className="flex min-h-[1.5rem] pointer-events-none relative z-20">
                <span className="invisible whitespace-pre-wrap break-all">{input}</span>
                <span
                  style={{
                    backgroundColor: 'var(--color-hacker-green)',
                    boxShadow: '0 0 8px var(--color-hacker-green)'
                  }}
                  className="w-2 h-5 animate-pulse shrink-0"
                />
              </div>
            </div>
          </form>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}