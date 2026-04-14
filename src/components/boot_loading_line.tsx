import React, { useState, useEffect } from 'react';

/**
 * @file boot_loading_line.tsx
 * @description Animates a standard Unix-style progress bar for the boot sequence.
 */
interface BootLoadingLineProps {
    label: string;
    duration: number; 
}

export const BootLoadingLine: React.FC<BootLoadingLineProps> = ({ label, duration }) => {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState("..");

    useEffect(() => {
        const segments = 10;
        const intervalTime = duration / segments;

        let currentSegment = 0;
        const interval = setInterval(() => {
            currentSegment++;
            setProgress(currentSegment);

            if (currentSegment >= segments) {
                clearInterval(interval);
                setStatus("OK");
            }
        }, intervalTime);

        return () => clearInterval(interval);
    }, [duration]);

    // Construct the bar string: [====......]
    const bar = "=".repeat(progress).padEnd(10, ".");

    return (
        <div className="flex gap-1 font-bold">
            <span className="min-w-[120px]">{label.padEnd(10, " ")}</span>
            <span className="opacity-50"> </span>
            <span className="glow-text">[{bar}]</span>
            <span className="ml-2">[ <span className={status === "OK" ? "text-[var(--color-hacker-green)]" : "animate-pulse"}>{status}</span> ]</span>
        </div>
    );
};