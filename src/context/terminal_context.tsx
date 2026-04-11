import { createContext, useContext, useState } from 'react';
import type { ReactNode, FC } from 'react';
import type { CommandRecord, TerminalContextType, CommandResponse, VirtualFileSystem } from '../data/types';
import { processCommand } from '../data/data_processing/command_processor';
import { VFS as STATIC_VFS } from '../data/vfs'; 

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

export const TerminalProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [history, setHistory] = useState<CommandRecord[]>([]);
    const [cwd, setCwd] = useState<string>("/");
    const [sessionFiles, setSessionFiles] = useState<Record<string, { content: string[], path: string }>>({});
    const [vfs, setVfs] = useState<VirtualFileSystem>(STATIC_VFS as VirtualFileSystem);
    
    // FIX: Add the missing state for Vim mode!
    const [activeEditorFile, setActiveEditorFile] = useState<string | null>(null);

    const executeCommand = (input: string) => {
        if (!input.trim() || activeEditorFile) return;

        const response: CommandResponse = processCommand(input, cwd, sessionFiles);

        if (response.systemAction === 'CLEAR') {
            setHistory([]);
            return;
        }

        // FIX: Add the VIM handler so the UI knows when to open the editor
        if (response.systemAction === 'VIM') {
            setActiveEditorFile(response.meta?.vimFile || "[No Name]");
            return;
        }

        if (response.systemAction === 'REMOVE_FILE' && response.meta?.fileToDelete) {
            const fileName = response.meta.fileToDelete;

            setSessionFiles(prev => {
                const next = { ...prev };
                delete next[fileName];
                return next;
            });

            setVfs(prev => {
                const next = { ...prev };
                const absolutePath = Object.keys(next).find(path => path.endsWith(fileName));
                if (absolutePath) delete next[absolutePath];
                return next;
            });
        }

        const newRecord: CommandRecord = {
            id: crypto.randomUUID(),
            input,
            output: response.output,
            cwdAtExecution: cwd,
        };

        setHistory(prev => [...prev, newRecord]);
        if (response.newCwd) setCwd(response.newCwd);
    };

    const saveSessionFile = (fileName: string, content: string[]) => {
        setSessionFiles(prev => ({
            ...prev,
            [fileName]: { content, path: cwd }
        }));
    };

    return (
        <TerminalContext.Provider value={{ 
            history, 
            cwd, 
            executeCommand, 
            vfs,
            activeEditorFile,
            closeEditor: () => setActiveEditorFile(null),
            sessionFiles,     
            saveSessionFile   
        }}>
            {children}
        </TerminalContext.Provider>
    );
};

export const useTerminal = (): TerminalContextType => {
    const context = useContext(TerminalContext);
    if (!context) throw new Error("useTerminal must be used within a TerminalProvider.");
    return context;
};