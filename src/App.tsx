import React, { useState, useRef, useEffect } from "react";
import { COMMANDS, COMMAND_LIST } from "./data/commands";

interface HistoryItem {
  cmd: string;
  out: string | React.ReactNode;
}

const BOOT_SEQUENCE = [
  "INITIALIZING PORTFOLIO KERNEL V0.0.5...",
  "CPU: OCTA-CORE NEURAL PROCESSOR DETECTED",
  "MEM: 64GB VIRTUAL RAM ALLOCATED... OK",
  "CHECKING SYSTEM INTEGRITY... SUCCESS",
  "------------------------------------------------",
  "MOUNTING FILE SYSTEM... /dev/sda1 ON /root",
  "LOADING CORE MODULES: [MIR_OS] [REACT] [TAILWIND]",
  "ESTABLISHING SECURE CONNECTION TO SERVER... SUCCESS",
  "ENCRYPTING CHANNEL VIA AES-256-GCM... DONE",
  "PARSING BIOMETRIC DATA... IDENTITY VERIFIED",
  <pre className="text-[10px] leading-none py-4 text-white/40">
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
  "WELCOME OPERATOR. TYPE 'HELP' FOR AVAILABLE COMMANDS.",
];



function App() {
  const hasBooted = useRef(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [input, setInput] = useState("");
  const [historyStack, setHistoryStack] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isBooting, setIsBooting] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

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

        setTimeout(printNextLine, 250);
      } else {
        setIsBooting(false);
      }
    };

    printNextLine();
  }, [isBooting]); 

  useEffect(() => {
    if (!isBooting) {
      inputRef.current?.focus();
    }
  }, [isBooting]);

  const handleContainerClick = () => {
    if (!isBooting) inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
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

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyStack.length === 0) return;
      const newIndex = historyIndex + 1;
      if (newIndex < historyStack.length) {
        setHistoryIndex(newIndex);
        setInput(historyStack[historyStack.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
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

  return (
    <div
      className="min-h-screen bg-[var(--color-hacker-bg)] text-[var(--color-hacker-green)] p-4 md:p-8 font-mono cursor-text overflow-x-hidden relative"
      onClick={handleContainerClick}
    >
      <div className="scanlines fixed inset-0 pointer-events-none z-50" />

      <div className="max-w-4xl mx-auto pb-20 relative z-10">
        {/* Render Command History */}
        {history.map((entry, i) => (
          <div key={i} className="mb-6 animate-in fade-in slide-in-from-left-2 duration-300">
            {entry.cmd && (
              <div className="flex text-white/40 mb-1">
                <span className="mr-2">❯</span>
                <span>{entry.cmd}</span>
              </div>
            )}
            <div className="glow-text leading-relaxed">
              {entry.out}
            </div>
          </div>
        ))}

        {/* Active Input Line & Suggestion Container */}
        {!isBooting && (
          <div className="relative">
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
                onChange={(e) => {
                  setInput(e.target.value);
                  if (suggestions.length > 0) setSuggestions([]);
                }}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                spellCheck="false"
                autoFocus
              />
            </form>

            {suggestions.length > 1 && (
              <div className="flex flex-wrap gap-4 mt-2 text-white/30 animate-in fade-in slide-in-from-top-1">
                {suggestions.map((s) => (
                  <span key={s} className="hover:text-[var(--color-hacker-green)] transition-colors cursor-pointer" onClick={() => setInput(s)}>
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        <div ref={bottomRef} className="h-1" />
      </div>
    </div>
  );
}

export default App;