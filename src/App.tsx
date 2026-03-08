import React, { useState, useRef, useEffect } from "react";
import { COMMANDS, COMMAND_LIST } from "./data/commands";

/**
 * Represents a single entry in the terminal history.
 */
interface HistoryItem {
  cmd: string; // The command entered by the user
  out: string | React.ReactNode; // The output (string or JSX component)
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
  "WELCOME GUEST. TYPE 'LS' FOR LIST OF AVAILABLE COMMANDS.",
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

  // --- Effects ---

  /** Auto-scroll to bottom on every history update */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  /** Runs the simulated boot sequence on component mount */
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
              : BOOT_SEQUENCE[currentLine]
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

  /** Focuses the terminal input once booting is finished */
  useEffect(() => {
    if (!isBooting) inputRef.current?.focus();
  }, [isBooting]);

  // --- Handlers ---

  const handleContainerClick = () => {
    if (!isBooting) inputRef.current?.focus();
  };

  /** Handles special keys: Tab (Autocomplete), Up/Down (History) */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // 1. Tab Autocomplete
    if (e.key === "Tab") {
      e.preventDefault();
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

  /** Processes the entered command and updates history */
  const handleCommand = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const cleanInput = input.toLowerCase().trim();

    if (cleanInput === "clear") {
      setHistory([]);
    }
    else if (cleanInput === "restart") {
      setHistory([]);
      setHistoryStack([]);
      setIsBooting(true);
      hasBooted.current = false;
    }
    else if (cleanInput !== "") {
      const output = COMMANDS[cleanInput]
        ? COMMANDS[cleanInput]()
        : `ERR: COMMAND_NOT_FOUND [${cleanInput}]`;

      setHistory((prev) => [...prev, { cmd: input, out: output }]);
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
      className="h-full w-full font-mono cursor-text overflow-y-auto no-scrollbar selection:bg-[var(--color-hacker-green)] selection:text-[var(--color-hacker-bg)]"
      onClick={handleContainerClick}
    >
      <div className="scanlines fixed inset-0 pointer-events-none z-50" />

      <div className="max-w-5xl mx-auto p-4 md:p-10 text-sm md:text-base mb-20 relative z-10">

        {/* Terminal History Output */}
        <div className="space-y-4">
          {history.map((entry, i) => (
            <div key={i} className="break-words animate-in fade-in duration-300">
              {entry.cmd && (
                <div className="flex items-center opacity-50 text-xs md:text-sm">
                  <span className="mr-2 text-white/100 font-bold">guest@portfolio:~$</span>
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
              <div className="flex break-all min-h-[1.5rem]">
                <span className="invisible">{input}</span>
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
    </div>
  );
}