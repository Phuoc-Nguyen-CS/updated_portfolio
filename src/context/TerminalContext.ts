import { createContext, useContext } from 'react';
import type { TerminalContextType } from '../data/types';

/**
 * Raw React Context Object
 * Initialize it as undefined to ensure that the useTerminal throws a clear error if used outside of the provider
 */
export const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

/**
 * Custom Hook: useTerminal
 * Provides a standardized way for any component to access the engine
 * while ensuring proper context usage.
 */
export const useTerminal = (): TerminalContextType => {
    const context = useContext(TerminalContext);
    if (!context) {
        throw new Error("useTerminal must be used within a TerminalProvider.");
    }
    return context;
};
