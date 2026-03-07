import React, { useState, useRef, useEffect } from "react";
import { COMMANDS } from "./data/commands";

interface HistoryItem {
  cmd: string;
  out: string | React.ReactNode;
}

function App() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [input, setInput] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const cleanInput = input.toLowerCase().trim();

    if (cleanInput === "clear") {
      setHistory([]);
    } else if (cleanInput !== "") {
      const output = COMMANDS[cleanInput]
        ? COMMANDS[cleanInput]()
        : `ERR: COMMAND_NOT_FOUND [${cleanInput}]`;

      setHistory((prev) => [...prev, { cmd: input, out: output }]);
    }
    setInput("");
  };

  return (
    <div
      className="min-h-screen bg-[var(--color-hacker-bg)] text-[var(--color-hacker-green)] p-4 md:p-8 font-mono cursor-text overflow-x-hidden relative"
      onClick={handleContainerClick}
    >
      <div className="scanlines fixed inset-0 pointer-events-none z-50" />

      <div className="max-w-4xl mx-auto pb-20 relative z-10">
        {history.map((entry, i) => (
          <div key={i} className="mb-6 animate-in fade-in slide-in-from-left-2 duration-300">
            <div className="flex text-white/40 mb-1">
              <span className="mr-2">❯</span>
              <span>{entry.cmd}</span>
            </div>
            <div className="glow-text leading-relaxed">
              {entry.out}
            </div>
          </div>
        ))}

        <form onSubmit={handleCommand} className="flex items-center relative">
          <span className="text-[var(--color-hacker-green)] mr-2 font-bold animate-pulse">❯</span>

          <div className="flex items-center glow-text break-all whitespace-pre-wrap">
            <span>{input}</span>
            <span className="bg-[var(--color-hacker-green)] w-2.5 h-5 shadow-[0_0_8px_var(--color-hacker-green)] animate-pulse ml-0.5 pointer-events-none" />
          </div>

          <input
            ref={inputRef}
            className="absolute left-0 opacity-0 w-full cursor-text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete="off"
            spellCheck="false"
            autoFocus
          />
        </form>

        <div ref={bottomRef} className="h-1" />
      </div>
    </div>
  );
}

export default App;