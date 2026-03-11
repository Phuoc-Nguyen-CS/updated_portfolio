// src/utils/terminal.ts

export const fireCommand = (cmd: string) => {
    window.dispatchEvent(new CustomEvent('run-cmd', { detail: cmd }));
};

export const fireSequence = (cmds: string[]) => {
    cmds.forEach((cmd, index) => {
        setTimeout(() => {
            window.dispatchEvent(new CustomEvent('run-cmd', { detail: cmd }));
        }, index * 1000);
    });
};