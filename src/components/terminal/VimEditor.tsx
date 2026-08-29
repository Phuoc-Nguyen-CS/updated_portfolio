/**
 * @file VimEditor.tsx
 * @description An interactive, simulated Vim environment within MIR_OS.
 * This component acts as an isolated interactive scene. Instead of relying on
 * the global Terminal Context for every keystroke, it manages its own local
 * State Machine (Normal, Insert, Command). It only communicates with the
 * parent OS when the application is launched or closed (via the onClose contract).
 */
import React, { useState, useEffect, useRef } from "react";

/* ---------------------------------------------------------
    FILE CONFIGURATION REGISTRY (Metadata)
    By centralizing file-specific behaviors (easter eggs, read-only guards)
    into a configuration object, we avoid polluting the render logic with
    complex if/else chains. This follows the "Data-Driven Design" pattern.
   --------------------------------------------------------- */
const FILE_SPECIAL_LOGIC: Record<
  string,
  {
    defaultContent: string[];
    exitMessage?: string;
    isReadOnly?: boolean;
  }
> = {
  "text.txt": {
    defaultContent: [
      "Day 400.",
      "I am still trapped in this editor.",
      "If anyone finds this, please just type :q to set me free.",
    ],
    exitMessage: "ACHIEVEMENT UNLOCKED: 'FREE AT LAST'",
  },
  "resume.txt": {
    defaultContent: [],
    isReadOnly: true,
  },
  "leetcode.exe": {
    defaultContent: [],
    isReadOnly: true,
  },
};

/**
 * The Strict Contract between the OS Engine and the Vim Application.
 */
interface VimEditorProps {
  file: string;
  initialContent?: string[]; // Represents data injected from Session RAM
  onClose: (systemMessage?: string, newContent?: string[]) => void;
}

export const VimEditor: React.FC<VimEditorProps> = ({
  file,
  initialContent,
  onClose,
}) => {
  const fileName = file.split("/").pop() || file;
  const meta = FILE_SPECIAL_LOGIC[file] ?? FILE_SPECIAL_LOGIC[fileName];

  // --- LOCAL STATE MACHINE ---
  // Vim operates on strict modes. This state dictates how keystrokes are interpreted.
  const [mode, setMode] = useState<"NORMAL" | "INSERT" | "COMMAND">("NORMAL");
  const [content, setContent] = useState<string[]>(
    () => initialContent ?? meta?.defaultContent ?? [""],
  );
  const [cmdInput, setCmdInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);

  /* ---------------------------------------------------------
        MEMORY SYNC BUFFER
        Why: Handles the initialization priority.
        Priority 1: User's previously saved edits (Session RAM).
        Priority 2: Hardcoded system easter eggs (Meta).
        Priority 3: A blank new file.
       --------------------------------------------------------- */
  useEffect(() => {
    // Immediately lock the browser focus into the editor sandbox
    containerRef.current?.focus();
  }, [file]);

  /**
   * THE EVENT INTERCEPTOR 
   * Overrides default browser behaviors to simulate terminal interaction.
   * Routes keystrokes based on the active state of the FSM (mode).
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.preventDefault(); // Prevents browser scrolling or shortcuts
    setErrorMsg("");

    // STATE: NORMAL MODE (Navigation & Command Initiation)
    if (mode === "NORMAL") {
      if (e.key === "i") {
        if (meta?.isReadOnly) {
          setErrorMsg("W10: Warning: Changing a readonly file");
          // Mimic real Vim behavior: flash warning, then allow insert anyway (if forced)
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

    // STATE: INSERT MODE (Text Mutation)
    else if (mode === "INSERT") {
      if (e.key === "Escape") setMode("NORMAL");
      else if (e.key === "Enter") setContent((prev) => [...prev, ""]);
      else if (e.key === "Backspace") {
        setContent((prev) => {
          const newContent = [...prev];
          const lastLine = newContent[newContent.length - 1];
          if (lastLine.length > 0) {
            newContent[newContent.length - 1] = lastLine.slice(0, -1);
          } else if (newContent.length > 1) {
            newContent.pop();
          }
          return newContent;
        });
      } else if (e.key.length === 1) {
        setContent((prev) => {
          const newContent = [...prev];
          newContent[newContent.length - 1] += e.key;
          return newContent;
        });
      }
    }

    // STATE: COMMAND MODE (System Exits & Writes)
    else if (mode === "COMMAND") {
      if (e.key === "Escape") setMode("NORMAL");
      else if (e.key === "Enter") {
        const cmd = cmdInput.trim();

        // Contract Execution: Passing data back to the OS Engine
        if (cmd === "q" || cmd === "q!") {
          onClose(meta?.exitMessage);
        } else if (cmd === "wq" || cmd === "w") {
          onClose(`"${file}" written to session buffer.`, content);
        } else {
          setErrorMsg(`E492: Not an editor command: ${cmdInput}`);
          setMode("NORMAL");
        }
      } else if (e.key === "Backspace") {
        setCmdInput((prev) => prev.slice(0, -1));
        if (cmdInput.length === 1) setMode("NORMAL");
      } else if (e.key.length === 1) {
        setCmdInput((prev) => prev + e.key);
      }
    }
  };

  /* --- VIEW RENDERING --- */
  // Generates the aesthetic '~' for empty buffer lines at the bottom of the screen
  const emptyLines = Array.from({
    length: Math.max(0, 20 - content.length),
  }).map((_, i) => (
    <div key={`empty-${i}`} className="text-hacker-blue font-bold opacity-40">
      ~
    </div>
  ));

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="h-full w-full bg-hacker-bg text-hacker-green p-0 font-mono outline-none flex flex-col justify-between absolute inset-0 z-50 overflow-hidden"
    >
      <div className="flex-grow flex pt-2 glow-text overflow-hidden">
        {/* 1. LINE NUMBER GUTTER */}
        <div className="w-10 flex flex-col items-end pr-3 border-r border-white/10 select-none text-white/20">
          {content.map((_, i) => (
            <div key={`num-${i}`} className="min-h-[1.5rem] leading-6">
              {i + 1}
            </div>
          ))}
          {emptyLines}
        </div>

        {/* 2. MAIN TEXT AREA */}
        <div className="flex-grow pl-4 whitespace-pre-wrap overflow-hidden">
          {content.map((line, i) => (
            <div key={i} className="min-h-[1.5rem] flex items-center leading-6">
              {line}
              {/* Contextual Cursor: Only shows on the active line during INSERT */}
              {mode === "INSERT" && i === content.length - 1 && (
                <span className="w-2 h-5 bg-hacker-green animate-pulse ml-1" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3. DYNAMIC STATUS BAR */}
      <div className="flex justify-between items-center text-[10px] sm:text-xs bg-hacker-green text-black px-2 py-0.5 font-bold uppercase tracking-tighter">
        <div className="flex gap-4">
          {mode === "COMMAND" ? (
            <span>
              :{cmdInput}
              <span className="inline-block w-2 h-3 bg-black animate-pulse" />
            </span>
          ) : errorMsg ? (
            <span className="bg-hacker-red text-white px-2">{errorMsg}</span>
          ) : mode === "INSERT" ? (
            <span>-- INSERT --</span>
          ) : (
            <span>
              "{file}" {meta?.isReadOnly ? "[readonly]" : ""} {content.length}L
            </span>
          )}
        </div>
        <div>{content.length},1 ALL</div>
      </div>
    </div>
  );
};
