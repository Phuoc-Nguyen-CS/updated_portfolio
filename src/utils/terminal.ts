// src/utils/terminal.ts
import { useEffect } from 'react'; // Make sure to import this at the top

export const fireCommand = (cmd: string) => {
    window.dispatchEvent(new CustomEvent('run-cmd', { detail: cmd }));
};