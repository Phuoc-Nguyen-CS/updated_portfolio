// src/utils/terminal.ts

export const fireCommand = (cmd: string) => {
    window.dispatchEvent(new CustomEvent('run-cmd', { detail: cmd }));
};