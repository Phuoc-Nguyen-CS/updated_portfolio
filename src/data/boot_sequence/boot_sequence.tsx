// src/data/boot_sequence.tsx
import React from "react";

export const BOOT_SEQUENCE = [
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

                    <span className="text-[var(--color-hacker-green)] font-bold font-mono">cd ..</span>
                    <span className="text-white/80">Go to the previous directory</span>

                    <span className="text-[var(--color-hacker-green)] font-bold font-mono">cd</span>
                    <span className="text-white/80">Go to home directory</span>
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

            {/* NON-TECH FAST TRACK */}
            <div className="bg-[var(--color-hacker-green)]/10 border border-[var(--color-hacker-green)]/40 p-3 mb-4 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                    <p className="text-[var(--color-hacker-green)] font-bold text-sm">Not familiar with Terminals?</p>
                    <p className="text-white/70 text-xs">Run the automated portfolio tour.</p>
                </div>
                <div className="bg-black border border-[var(--color-hacker-green)] px-3 py-1 shrink-0">
                    <span className="text-white text-xs font-mono">Type: </span>
                    <span className="text-[var(--color-hacker-green)] font-bold font-mono animate-pulse">quickstart</span>
                </div>
            </div>

            {/* SUGGESTED EXECUTION SEQUENCE */}
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