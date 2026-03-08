import React, { useState, useRef, useEffect } from "react";
import { COMMANDS, COMMAND_LIST, EXECUTABLES, VFS, type CommandResponse} from "./data/commands";
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
  <div key="crash-course" className="mt-6 border border-white/20 p-4 bg-black/30 max-w-2xl">
    <p className="font-bold text-white mb-3 tracking-widest border-b border-white/20 pb-1">
      [MIR_OS] QUICK_START_GUIDE
    </p>

    <div className="grid grid-cols-[120px_1fr] gap-y-2 text-sm sm:text-base">
      <span className="text-[var(--color-hacker-green)] font-bold">ls</span>
      <span className="text-white/80">List available files and directories.</span>

      <span className="text-[var(--color-hacker-green)] font-bold">cd &lt;dir&gt;</span>
      <span className="text-white/80">
        Open a directory (highlighted in <span className="text-[var(--color-hacker-green)] font-bold">green</span>). Type <code className="bg-white/10 px-1 rounded">cd ..</code> to go back.
      </span>

      <span className="text-[var(--color-hacker-green)] font-bold">cat &lt;file&gt;</span>
      <span className="text-white/80">Read a file's contents (e.g., <code className="bg-white/10 px-1 rounded">cat about.txt</code>).</span>

      <span className="text-[var(--color-hacker-green)] font-bold">[TAB] Key</span>
      <span className="text-white/80">Auto-complete commands and file names while typing.</span>

      <span className="text-[var(--color-hacker-green)] font-bold">restart</span>
      <span className="text-white/80">Reboot the system and return to this screen.</span>
    </div>
  </div>
];

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
    // 1. Tab Autocomplete
    if (e.key === "Tab") {
      e.preventDefault();
      const rawInput = input.toLowerCase();
      if (!rawInput) return;
      
      const parts = rawInput.split(" ");
      // CASE A: Autocomplete a base command (e.g., "l" -> "ls")
      if (parts.length === 1) {
        const matches = COMMAND_LIST.filter((cmd) => cmd.startsWith(parts[0]));
        if (matches.length === 1) {
          setInput(matches[0] + " "); // Adds a space for user to continue typing
          setSuggestions([]);
        } else {
          setSuggestions(matches);
        }
      }

      // CASE B: Autocompleting a file/directory (e.g., "cd l" -> "cd logs")
      else if (parts.length === 2) {
        const baseCmd = parts[0];
        const target = parts[1];

        // Only search if the command uses files
        if (baseCmd === "cd" || baseCmd === "cat" || baseCmd === "vim") {
          const currentFolder = VFS[cwd as keyof typeof VFS];

          if (currentFolder && currentFolder.children) {
            const matches = currentFolder.children.filter((item) => item.startsWith(target));

            if (matches.length === 1) {
              setInput(`${baseCmd} ${matches[0]}`);
              setSuggestions([]);
            } else {
              setSuggestions(matches);
            }
          }
        }
      }

      const currentInput = input.toLowerCase().trim();
      if (!currentInput) return;

      const matches = COMMAND_LIST.filter((cmd) => cmd.startsWith(currentInput));
      if (matches.length === 1) {
        setInput(matches[0]);
        setSuggestions([]);
      } else if (matches.length > 1) {
        setSuggestions(matches);
      }
    }

    // 2. Command History Navigation (Arrow Up)
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyStack.length === 0) return;
      const newIndex = historyIndex + 1;
      if (newIndex < historyStack.length) {
        setHistoryIndex(newIndex);
        setInput(historyStack[historyStack.length - 1 - newIndex]);
      }
    }

    // 3. Command History Navigation (Arrow Down)
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      const newIndex = historyIndex - 1;
      if (newIndex >= 0) {
        setHistoryIndex(newIndex);
        setInput(historyStack[historyStack.length - 1 - newIndex]);
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
      const targetFile = args[0] || "[No Name]";
      setVimMode({ active: true, file: targetFile });
      setHistory((prev) => [...prev, { cmd: input, out: "", cwd: cwd}]);
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
          ? COMMANDS[baseCmd](args, cwd, setCwd)
          : `ERR: COMMAND_NOT_FOUND [${baseCmd}]`;
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
          onClose={(msg) => {
            setVimMode({ active: false, file: "" });
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