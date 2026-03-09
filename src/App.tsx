import React, { useState, useRef, useEffect } from "react";
import { COMMANDS, COMMAND_LIST, EXECUTABLES, FILE_CONTENT, VFS, type CommandResponse} from "./data/commands";
import { VimEditor } from "./VimEditor";
/**
 * Represents a single entry in the terminal history.
 */
interface HistoryItem {
  cmd: string; // The command entered by the user
  out: string | React.ReactNode; // The output (string or JSX component)
  cwd: string; // Snapshot of the directory
}

/**
 * Mock system boot sequence logs and ASCII art.
 */
const BOOT_SEQUENCE = [
  "INITIALIZING PORTFOLIO KERNEL V0.0.5...",
  "CPU: OCTA-CORE NEURAL PROCESSOR DETECTED",
  "MEM: 64GB VIRTUAL RAM ALLOCATED... OK",
  "CHECKING SYSTEM INTEGRITY... SUCCESS",
  "------------------------------------------------",
  "MOUNTING FILE SYSTEM... /dev/sda1 ON /root",
  "LOADING CORE MODULES: [MIR_OS] [TYPESCRIPT] [REACT] [TAILWIND] [VITE]",
  "ESTABLISHING SECURE CONNECTION TO SERVER... SUCCESS",
  "ENCRYPTING CHANNEL VIA AES-256-GCM... DONE",
  "PARSING BIOMETRIC DATA... IDENTITY VERIFIED",
  <pre key="ascii-art" className="text-[10px] leading-none py-4 text-white/40">
    {`
                                                                                                           
                                                                                                    
                                                         ..-+:                                      
                                                        =@%-%%.                                     
                :#=.        .=#%@@#+======++#%@@%#=..=%#-:-=#@.                                     
                %**%#:..-*%*=:..............::::-=#@@=.::=+*%@.                                     
               .@-=+*@@%-..............::::---====#-.--:--=*#@.                                     
               .@::*@-..............::::---=*====+#::::-+*##%@.                                     
               .%+%-.   ..........::::---=*=======+%=:--=++##%.                                     
              .:@+..............::::-----#-=++===++++#****#%@@%.                                    
             .-@..............::::------=#*+=====+++++**#%%%%%@%.                                   
            .*%....:.........::::-----=*#========++*++***##%%%#@*.                                  
            +%....+........:::::----+%%##+=====+#%%%%+***####%##@:                                  
          .=@:...:+...:+..::::---=*%#*+++%+=+#%%#**+*%***###*###%* 
          :%*..=%%=.:###*:::::-=#%*+++====%%%#**+====+%#*#%#%*###%                                  
          -@:*#===##+===+*::-+##+++==-=====**+========+#%%#+#%###@.                                 
          +@@@=.::--=----=#*#*====---==========*#%%#*+++##+++#@##@.                                 
          :-:%..:::::--------===---==========#@@@%%%@@*++++++++%@@..                                
            =#.:::::--------------=========+@@@%%%%%%@@*+++++++++*@#..                              
          .*@=.:::::------------==========+@#%@%%%@@%%@#+++========+*##%%*...:-+*##%%%%##*+-:.      
        .-@+%:.:::::---------============+%#-@%#%@@@@%%@++**=----------+@@@%*+=-==+++*****++*#@=    
      .-@+-%=:::::--------==============+*@-:@#*+-=%%##@*++*##*******@@%+-==++*##*+==--:::##:..     
    .=%=-=%=:::::-------=============++++%%.:*=---+%%**@*=++**@*#%@@%--=+*##*+==--:::...#+..        
    +@###@=:::::-----=============+++++++%*..*+--*###++@==++++##:%%:-=+#%#+==---:::...:%=.          
     .-+@%:::::----==========++++++++++++#*. =#+++++++##==++++*@:%+=++******##+-:.....++            
       .@#.::::--===*@#+++++++++++++++++++%:  +@+===+%%==+++++*@-%++**#*===+*%#+*#-...#:            
       :@%.#@+---=+*++=++++++++++++++++++++***##@@%%*+=++++++**@=@+*##*#+--:::.:=*#+*++:            
       .@@-------===++++++++++++++++++++++++++++++++++++++++**@+%#+#*=***-::....-+*#%#*#-           
        =@#------===+++++++++++++++++++++++++++++++++++*****#@=%%+*#=--*++...=%+.     ..            
        .*@+-----===++++++++++++++++++++++++++++++++#######@=*@*+*#=--:+**:*#..                     
         .=@#-----===+++++++++++++++++++++++++++++*#####%@@@%***#*=--:::#+%-                        
           .%@+----===+++++++++++++++++++++++++*#####%@%###***##+++++***#*=                         
            .-@@=---===++++++++++++++******###*+=+#@#******%%#***.      =%.   ....-=+*+=-:..        
              .-%%+--===++++**#%%%%%%%%@@@%=..:=%%#*+++*+*#***%#:           .-%@*========+*%-.      
                .:*@%*===+#@@%@@#*++++*%%-..:=%%***#+**===+#****#@+::::-=*#%*--===++++++++++#=      
                   .:*@@@@%-@%*@*==+##+...-*@%*****##++#=-=+******%@%%##*=--===+++*#%%#=--+#%%.     
                            :@#=%%+....:=@@#*****#%*==*+==++***+****%=-=====++**##@=                
                             .#@=::-*%@@#******#+:::---=+*#*+====++**%+=+++**###%#.                 
                              .-##*+-..%#*****#=:-----=++#++----===++*%***#####@+.                  
                                ..::-%%@#*****#---+--==+%*+--:----==++*@######%:                    
                              .-%=----+@*++**+*--=+=-==+*#*++-:----==+*%%##*%*.                     
                              -@::=---=%=.::::-*===**++*###*+=::---==++#@#@#:.                      
                              =#--+:--=%=..:::::=***=====*##*-::---===+#@#:.                        
                              :@==+--=+%%:::::--==---=====+*#=:::--===+#@-                          
                              ..*@@@%@@@%#.::::----======+*+*##---===+*##@.                         
                                       =%=%-::----======+++**###%#*####**@%.                        
                                        **:+%*=========++**#%%@%=%%==+++++@+.                       
                                        .+@=--+%@@%#**##%@@@+.    *%:--===*@-                       
                                          .#@#+-==+%@%****#@+.    .-@=:++=#@:                       
                                            .-+###+-##=--==*@=      .=#%@%*:                        
                                                    .=%---==+@+.                                    
                                                      .*@+#**@+.                                    
                                                        ..::..                                      
                                                                                                    
                                                                                                    
    `}
  </pre>,
  <div key="crash-course" className="mt-6 border border-white/20 p-4 bg-black/30 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
    <p className="text-l font-bold text-white mb-3 tracking-widest border-b border-white/20 pb-1 flex justify-between">
      <span>[MIR_OS] QUICK_START_GUIDE</span>
      <span className="text-[var(--color-hacker-green)] opacity-50 text-xs font-mono">V.0.0.5</span>
    </p>

    <div className="space-y-4">
      {/* NAVIGATION */}
      <div>
        <p className="text-md text-white/90 mb-1 uppercase tracking-tighter">// SYSTEM_NAVIGATION</p>
        <div className="grid grid-cols-[max-content_1fr] gap-x-6 gap-y-1 text-sm sm:text-base">
          <span className="text-[var(--color-hacker-green)] font-bold font-mono">ls</span>
          <span className="text-white/80">List directory contents. (Directories are <span className="text-[var(--color-hacker-green)]">Green</span>)</span>

          <span className="text-[var(--color-hacker-green)] font-bold font-mono">cd [dir]</span>
          <span className="text-white/80">Traverse directories (e.g. <code className="bg-white/10 px-1 rounded">cd projects</code>).</span>
        </div>
      </div>

      {/* OPERATIONS */}
      <div>
        <p className="text-md text-white/90 mb-1 uppercase tracking-tighter">// FILE_OPERATIONS</p>
        <div className="grid grid-cols-[max-content_1fr] gap-x-6 gap-y-1 text-sm sm:text-base">
          <span className="text-[var(--color-hacker-green)] font-bold font-mono">cat [file]</span>
          <span className="text-white/80">Display [.txt, .md] files</span>

          <span className="text-[var(--color-hacker-green)] font-bold font-mono">./ [file]</span>
          <span className="text-white/80">Runs .exe files</span>

          <span className="text-[var(--color-hacker-green)] font-bold font-mono">vim [file]</span>
          <span className="text-white/80">Initialize editor (Desktop only).</span>

          <span className="text-[var(--color-hacker-green)] font-bold font-mono">rm [file]</span>
          <span className="text-white/80">Purge user files from session RAM.</span>
        </div>
      </div>

      {/* INPUT TIPS */}
      <div className="pt-2 border-t border-white/10">
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/60">
          <span>[*] Use <b className="text-white">TAB</b> for Autocomplete</span>
          <span>[*] Use <b className="text-white">UP_ARROW</b> for History</span>
          <span>[*] Type <b className="text-yellow-500">help</b> for Full Manual</span>
        </div>
      </div>

      {/* NEW: SUGGESTED EXECUTION SEQUENCE */}
      <div className="pt-4 mt-2 border-t border-[var(--color-hacker-green)]/30">
        <p className="text-sm text-yellow-400 font-bold mb-3 flex items-center gap-2 tracking-widest uppercase">
          <span className="animate-pulse">{">>"}</span> RECOMMENDED_EXECUTION_SEQUENCE:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
          <div className="bg-[var(--color-hacker-green)]/5 p-2 border-l-2 border-yellow-500/50 hover:bg-white/10 transition-colors">
            <span className="text-white font-mono font-bold block mb-1">cat resume.txt</span>
            <span className="text-white/60">Lets explore some of the things I've created.</span>
          </div>

          <div className="bg-[var(--color-hacker-green)]/5 p-2 border-l-2 border-blue-500/50 hover:bg-white/10 transition-colors">
            <span className="text-white font-mono font-bold block mb-1">cd logs</span>
            <span className="text-white/60">Keep up to date with what I'm doing.</span>
          </div>

          <div className="bg-[var(--color-hacker-green)]/5 p-2 border-l-2 border-[var(--color-hacker-green)]/50 hover:bg-white/10 transition-colors">
            <span className="text-white font-mono font-bold block mb-1">./leetcode.exe</span>
            <span className="text-white/60">Check my live Leetcode Progression.</span>
          </div>

          <div className="bg-[var(--color-hacker-green)]/5 p-2 border-l-2 border-red-500/50 hover:bg-white/10 transition-colors">
            <span className="text-white font-mono font-bold block mb-1">vim test.txt</span>
            <span className="text-white/60">Test the built-in text editor capabilities.</span>
          </div>
        </div>
      </div>
    </div>
  </div>
];

export default function App() {
  // --- Refs & State ---
  const hasBooted = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [input, setInput] = useState("cat about.txt");
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
        setHistory((prev) => [
          ...prev,
          {
            cmd: "",
            out: typeof BOOT_SEQUENCE[currentLine] === "string"
              ? <span className="text-white/80 italic">{BOOT_SEQUENCE[currentLine]}</span>
              : BOOT_SEQUENCE[currentLine],
            cwd: "/",
          }
        ]);
        currentLine++;
        setTimeout(printNextLine, 200); // Speed of boot logs
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
    // 01. Tab Autocomplete
    /* ---------------------------------------------------------
        TAB_AUTOCOMPLETE_ENGINE
        Enforces strict Linux-style filtering:
        - cd: Only suggests directories
        - cat/vim: Only suggests readable files (from FILE_CONTENT)
        - ./: Only suggests executable files (from EXECUTABLES)
       --------------------------------------------------------- */
    if (e.key === "Tab") {
      e.preventDefault();
      const rawInput = input.toLowerCase();
      if (!rawInput) return;

      const parts = rawInput.split(" ");
      const currentFolder = VFS[cwd as keyof typeof VFS];
      if (!currentFolder || !currentFolder.children) return;

      const localSessionFiles = Object.keys(sessionFiles).filter(f => sessionFiles[f].path === cwd);
      const allAvailableItems = Array.from(new Set([...currentFolder.children, ...localSessionFiles]));

      if (parts.length === 1) {
        const word = parts[0];

        // Autocomplete ./executables
        if (word.startsWith("./")) {
          const target = word.slice(2);
          const localSessionFiles = Object.keys(sessionFiles).filter(f => sessionFiles[f].path === cwd);
          const allItems = Array.from(new Set([...currentFolder.children, ...localSessionFiles]));

          // Only suggest items that are in the EXECUTABLES object
          const matches = allItems
            .filter(item => Object.keys(EXECUTABLES).includes(item))
            .filter(item => item.startsWith(target))
            .map(item => `./${item}`)
            .sort(); 

          if (matches.length === 1) {
            setInput(matches[0]);
            setSuggestions([]);
          } else {
            setSuggestions(matches);
          }
          return;
        }

        // Autocomplete base commands
        const matches = COMMAND_LIST.filter(c => c.startsWith(word));
        if (matches.length === 1) {
          setInput(matches[0] + " ");
          setSuggestions([]);
        } else if (matches.length > 1) {
          const sortedMatches = matches.sort(((a, b) => a.localeCompare(b)));
          setSuggestions(sortedMatches);
        }
      }
      else if (parts.length === 2) {
        const baseCmd = parts[0];
        const target = parts[1];
        let matches: string[] = [];

        if (baseCmd === "cd") {
          matches = allAvailableItems.filter(item => {
            const path = cwd === "/" ? `/${item}` : `${cwd}/${item}`;
            return VFS[path as keyof typeof VFS]?.type === "dir" && item.startsWith(target);
          });
        } else if (baseCmd === "rm") {
          matches = Object.keys(sessionFiles)
            .filter(fileName =>
              sessionFiles[fileName].path === cwd &&
              fileName.startsWith(target)
            ).sort();
        } else if (baseCmd === "cat" || baseCmd === "vim") {
          matches = allAvailableItems.filter(item => {
            const isFile = Object.keys(FILE_CONTENT).includes(item) || localSessionFiles.includes(item);

            const prefixMatch = item.toLowerCase().startsWith(target.toLowerCase());

            return isFile && prefixMatch;
          }).sort();
        }

        if (matches.length === 1) {
          const isDir = !matches[0].includes(".");
          setInput(`${baseCmd} ${matches[0]}${isDir ? "/" : ""}`);
          setSuggestions([]);
        } else if (matches.length > 1) {
          setSuggestions(matches);
        }
      }
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
  const handleCommand = (e: React.SyntheticEvent) => {
    e.preventDefault();

    // Get raw input and trim the white space
    const rawInput = input.trim();
    if (rawInput === "") return;

    // Split the input by spaces to separate the command from the arguments
    // e.g., "cd logs" -> baseCmd: "cd", args: ["logs"]
    const inputParts = rawInput.toLowerCase().split(/\s+/);
    const baseCmd = inputParts[0];
    const args = inputParts.slice(1);

    if (baseCmd === "clear") {
      setHistory([]);
    } else if (baseCmd === "restart") {
      setHistory([]);
      setHistoryStack([]);
      setIsBooting(true);
      hasBooted.current = false;
      setCwd("/");
    } else if (baseCmd === "vim") {
      const targetFile = args[0];
      const currentFolder = VFS[cwd as keyof typeof VFS];

      if (!targetFile) {
        setVimMode({ active: true, file: "[No Name]" });
      }
      /* ---------------------------------------------------------
          LINUX_GUARD: Permission Denied for System Files
          This prevents users from "going through" your core 
          portfolio data and breaking the experience.
          --------------------------------------------------------- */
      else if (Object.keys(FILE_CONTENT).includes(targetFile)) {
        const out = (
          <span className="text-red-500">
            bash: vim: {targetFile}: Permission denied (system file)
          </span>
        );
        setHistory(prev => [...prev, { cmd: input, out, cwd }]);
      }
      // Standard directory check remains
      else if (currentFolder?.children.includes(targetFile) && !targetFile.includes('.')) {
        const out = <span className="text-red-500">bash: vim: {targetFile}: Is a directory</span>;
        setHistory(prev => [...prev, { cmd: input, out, cwd }]);
      }
      else {
        setVimMode({ active: true, file: targetFile });
      }
    } else {
      let output: CommandResponse;

      // 1. HANDLE EXECUTABLES (./filename)
      if (baseCmd.startsWith("./")) {
        const file = baseCmd.slice(2); // Strip the './'
        const currentFolder = VFS[cwd as keyof typeof VFS];

        if (!currentFolder || !currentFolder.children.includes(file)) {
          output = <span className="text-red-500">bash: {baseCmd}: No such file or directory</span>;
        } else if (EXECUTABLES[file]) {
          output = EXECUTABLES[file](); // Runs .exe
        } else {
          // If they try to execute a text file like ./about.txt
          output = <span className="text-red-500">bash: {baseCmd}: Permission denied (not executable)</span>;
        }
      }
      // 2. HANDLE STANDARD COMMANDS (ls, cd, cat)
      else {
        output = COMMANDS[baseCmd]
          ? COMMANDS[baseCmd](args, cwd, setCwd, sessionFiles, setSessionFiles)
          : (
            <div className="text-red-500">
              <p>ERR: COMMAND_NOT_FOUND [{baseCmd}]</p>
              <p className="text-white/50 text-xs mt-1">Type <span className="text-yellow-400 underline">help</span> for a list of available protocols.</p>
            </div>
          );
      }

      // Save the exact string the user typed into history
      setHistory((prev) => [...prev, { cmd: input, out: output, cwd: cwd}]);
      setHistoryStack((prev) => [...prev, input]);
      setHistoryIndex(-1);
    }
    setInput("");
    setSuggestions([]);
  };

  // --- Render ---
  return (
    <div
      style={{ backgroundColor: 'var(--color-hacker-bg)', color: 'var(--color-hacker-green)' }}
      className="h-full w-full font-mono cursor-text overflow-y-auto no-scrollbar selection:bg-[var(--color-hacker-green)] selection:text-[var(--color-hacker-bg)] overflow-x-hidden"
      onClick={handleContainerClick}
    >
      <div className="scanlines fixed inset-0 pointer-events-none z-50" />

      {/* Vim Editor */}
      {vimMode.active ? (
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
                  path: cwd // This is the "Anchor" that ls uses to find the file
                }
              }));
            }
            if (msg) {
              setHistory(prev => [...prev, { cmd: "", out: <span className="text-yellow-400">{msg}</span>, cwd }]);
            }
            setTimeout(() => inputRef.current?.focus(), 100);
          }}
        />
      ) : (
          <div className="max-w-5xl mx-auto p-4 md:p-10 text-sm md:text-base mb-20 relative z-10">

            {/* Terminal History Output */}
            <div className="space-y-4">
              {history.map((entry, i) => (
                <div key={i} className="break-words animate-in fade-in duration-300">
                  {entry.cmd && (
                    <div className="flex items-center opacity-50 text-xs md:text-sm">
                      <span className="mr-2 text-white/100 font-bold">
                        guest@portfolio:~{entry.cwd === "/" ? "" : entry.cwd}$
                      </span>
                      <span className="text-white font-bold italic">{entry.cmd}</span>
                    </div>
                  )}
                  <div className="glow-text mt-1 whitespace-pre-wrap">
                    {entry.out}
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
                <span className="mr-2 font-bold shrink-0 animate-pulse">❯</span>
                <div className="relative flex-grow">
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

                  {/* Custom Blinking Block Cursor */}
                  {/* <div className="flex break-all min-h-[1.5rem]">
                <span className="invisible">{input}</span>
                <span
                  style={{
                    backgroundColor: 'var(--color-hacker-green)',
                    boxShadow: '0 0 8px var(--color-hacker-green)'
                  }}
                  className="w-2 h-5 animate-pulse shrink-0"
                />
              </div> */}
                  <div className="flex min-h-[1.5rem] pointer-events-none">
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

            {/* Scroll Anchor */}
            <div ref={bottomRef} />
          </div>
      )}
    </div>
  );
}