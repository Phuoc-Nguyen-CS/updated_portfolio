import React, { useState, useRef, useEffect } from "react";
// import type { CommandResponse } from "./data/types";
// import { COMMANDS, COMMAND_LIST} from "./data/commands";
// import { FILE_CONTENT } from "./data/system_files";
// import { EXECUTABLES } from "./data/executables";
// import { VFS } from "./data/vfs";
import { VimEditor } from "./VimEditor";
import { BOOT_SEQUENCE } from "./data/boot_sequence/boot_sequence";
import { getAutoComplete} from "./data/data_processing/autocomplete";
import { processCommand } from "./data/data_processing/command_processor";

/**
 * Represents a single entry in the terminal history.
 */
interface HistoryItem {
  cmd: string; // The command entered by the user
  out: string | React.ReactNode; // The output (string or JSX component)
  cwd: string; // Snapshot of the directory
}

export default function App() {
  // --- Refs & State ---
  const hasBooted = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [input, setInput] = useState("");
  const [historyStack, setHistoryStack] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isBooting, setIsBooting] = useState(true);
  const [cwd, setCwd] = useState("/");
  const [vimMode, setVimMode] = useState<{ active: boolean; file: string }>({ active: false, file: ""});
  const [sessionFiles, setSessionFiles] = useState<Record<string, { content: string[], path: string }>>({}); // Stores user created data in session

  // Mobile fix
  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      // Force scroll to bottom when viewport changes (keyboard toggle)
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
  
  // AUTO-SCROLL LOGIC
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // --- Effects ---

  // Auto-scroll to bottom on every history update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    scrollToBottom();
  }, [history, suggestions]);

  // Runs the simulated boot sequence on component mount
  useEffect(() => {
    if (!isBooting || hasBooted.current) return;
    hasBooted.current = true;

    let currentLine = 0;

    const printNextLine = () => {
      if (currentLine < BOOT_SEQUENCE.length) {
        const log = BOOT_SEQUENCE[currentLine];

        setHistory((prev) => [
          ...prev,
          {
            cmd: "",
            cwd: "/",
            out: typeof log.text === "string"
              ? <span className={log.color || "text-white/80 italic"}>{log.text}</span>
              : log.text,
          }
        ]);

        currentLine++;
        // Use the custom delay for this specific line!
        setTimeout(printNextLine, log.delay);
      } else {
        setIsBooting(false);
      }
    };

    printNextLine();
  }, [isBooting]);

  // Focuses the terminal input once booting is finished 
  useEffect(() => {
    if (!isBooting) inputRef.current?.focus();
  }, [isBooting]);

  // --- Handlers ---
  const handleContainerClick = () => {
    if (!isBooting) inputRef.current?.focus();
  };

  // Handles special keys: Tab (Autocomplete), Up/Down (History)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    /* ---------------------------------------------------------
    Enforces strict Linux-style filtering:
    - cd: Only suggests directories
    - cat/vim: Only suggests readable files (from FILE_CONTENT)
    - ./: Only suggests executable files (from EXECUTABLES)
   --------------------------------------------------------- */
    // 01. Tab Autocomplete
    if (e.key === "Tab") {
      e.preventDefault();
      const result = getAutoComplete(input, cwd, sessionFiles);

      if (result) {
        if (result.newInput) setInput(result.newInput);
        setSuggestions(result.suggestions);
      }
      return;
    }

    // 02. COMMAND HISTORY NAVIGATION
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

  // Processes the entered command and updates history 
  const executeCommand = (cmdToRun: string) => {
    const result = processCommand(cmdToRun, cwd, setCwd, sessionFiles, setSessionFiles);

    if (result) {
      if (result.action === "clear") {
        setHistory([]);
      } else if (result.action === "restart") {
        setHistory([]);
        setHistoryStack([]);
        setIsBooting(true);
        hasBooted.current = false;
        setCwd("/");
      } else if (result.action === "vim") {
        setVimMode({ active: true, file: result.vimFile! });
      } else if (result.action === "output") {
        setHistory((prev) => [...prev, { cmd: cmdToRun, out: result.output!, cwd }]);
        setHistoryStack((prev) => [...prev, cmdToRun]);
        setHistoryIndex(-1);
      }
    }

    setInput("");
    setSuggestions([]);
  };
  // Ghost Typer
  const triggerCommand = (cmd: string) => {
    if (isBooting) return; // Don't allow clicking while the system is booting

    let currentText = "";
    inputRef.current?.blur(); // Hide mobile keyboard while auto-typing

    // Loop through the string and type it character by character
    cmd.split("").forEach((char, i) => {
      setTimeout(() => {
        currentText += char;
        setInput(currentText);

        // Once the last character is typed, wait a split second and execute
        if (i === cmd.length - 1) {
          setTimeout(() => {
            executeCommand(cmd);
            inputRef.current?.focus(); // Give control back to the user
          }, 300);
        }
      }, i * 40);
    });
  };
  
  // =========================================================
  // GLOBAL COMMAND LISTENER (Handles button executions)
  // =========================================================

  // 1. Create a mutable ref to always hold the freshest version of the function
  const triggerCommandRef = useRef(triggerCommand);

  // 2. Keep the ref updated on every single render
  useEffect(() => {
    triggerCommandRef.current = triggerCommand;
  }, [triggerCommand]);

  // 3. The actual event listener (Replaces your old block)
  useEffect(() => {
    const handleGlobalCommand = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        // 4. Call the .current property of the ref!
        triggerCommandRef.current(customEvent.detail);
      }
    };

    window.addEventListener('run-cmd', handleGlobalCommand);
    return () => window.removeEventListener('run-cmd', handleGlobalCommand);
  }, []);

  // Input Handler (Fires when you press Enter)
  const handleCommand = (e: React.SyntheticEvent) => {
    e.preventDefault();
    executeCommand(input);
  };

  // --- Render ---
  return (
    <div
      style={{ backgroundColor: 'var(--color-hacker-bg)', color: 'var(--color-hacker-green)' }}
      className="h-full w-full font-mono cursor-text overflow-y-auto no-scrollbar selection:bg-[var(--color-hacker-green)] selection:text-[var(--color-hacker-bg)] overflow-x-hidden"
      // FIX: Only trigger the focus click if Vim is closed!
      onClick={vimMode.active ? undefined : handleContainerClick}
    >
      <div className="scanlines fixed inset-0 pointer-events-none z-50" />

      {/* 1. VIM EDITOR */}
      {/* We keep this conditionally rendered so it mounts fresh every time it opens */}
      {vimMode.active && (
        <VimEditor
          file={vimMode.file}
          initialContent={sessionFiles[vimMode.file]?.content}
          onClose={(msg, newContent) => {
            setVimMode({ active: false, file: "" });
            if (newContent) {
              setSessionFiles(prev => ({
                ...prev,
                [vimMode.file]: {
                  content: newContent,
                  path: cwd
                }
              }));
            }
            if (msg) {
              setHistory(prev => [...prev, { cmd: "", out: <span className="text-yellow-400">{msg}</span>, cwd }]);
            }
            setTimeout(() => inputRef.current?.focus(), 100);
          }}
        />
      )}

      {/* 2. MAIN TERMINAL */}
      {/* We dynamically add 'hidden' if Vim is active, otherwise 'block'. 
          This keeps it in the DOM, preventing animations from re-firing! */}
      <div className={`max-w-5xl mx-auto p-4 md:p-10 text-sm md:text-base mb-20 relative z-10 ${vimMode.active ? 'hidden' : 'block'}`}>

        {/* Terminal History Output */}
        <div className="space-y-4">
          {history.map((entry, i) => (
            <div key={i} className="break-words animate-in fade-in duration-300 max-w-full overflow-x-hidden">
              {entry.cmd && (
                <div className="flex items-center opacity-50 text-xs md:text-sm">
                  <span className="mr-2 text-white/100 font-bold">
                    guest@portfolio:~{entry.cwd === "/" ? "" : entry.cwd}$
                  </span>
                  <span className="text-white font-bold italic">{entry.cmd}</span>
                </div>
              )}
              <div className="glow-text mt-1 whitespace-pre-wrap">
                {React.isValidElement(entry.out) && typeof entry.out.type === 'function'
                  ? React.cloneElement(
                    entry.out as React.ReactElement<{ onAction?: (cmd: string) => void }>,
                    { onAction: triggerCommand }
                  )
                  : entry.out
                }
              </div>
            </div>
          ))}
        </div>

        {/* Tab-Completion Suggestions UI */}
        {!isBooting && suggestions.length > 0 && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 opacity-70">
            {suggestions.map((s) => (
              <span key={s} className="text-xs md:text-sm">{s}</span>
            ))}
          </div>
        )}

        {/* Command Input Area */}
        {!isBooting && (
          <form onSubmit={handleCommand} className="flex items-start mt-4 pb-12 animate-in fade-in duration-700">
            <span className="mr-2 font-bold shrink-0 animate-pulse text-[var(--color-hacker-green)]">❯</span>
            <div className="relative flex-grow">

              {/* GHOST TEXT LAYER */}
              {!input && (
                <span className="absolute inset-0 z-0 text-white/30 italic pointer-events-none whitespace-nowrap">
                  type 'quickstart' or 'help' and press enter to begin...
                </span>
              )}

              {/* Hidden Input */}
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

              {/* Custom Blinking Cursor */}
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
      {/* End of Main Terminal */}

    </div>
  );
}