import React, { useState, useEffect, useRef } from "react";

interface AsciiAnimatorProps {
    art: string;
    charsPerTick?: number; // Characters drawn per frame
    speedMs?: number; // Update speed
}

export const AsciiAnimator: React.FC<AsciiAnimatorProps> = ({
    art,
    charsPerTick = 15,
    speedMs = 10
}) => {
    const [displayedText, setDisplayedText] = useState("");
    const [isFinished, setIsFinished] = useState(false);

    const cursorRef = useRef<HTMLSpanElement>(null);
    // Strip leading/trailing empty lines
    const cleanArt = art.replace(/^\n+|\n+$/g, '');

    useEffect(() => {
        let currentIndex = 0;

        const interval = setInterval(() => {
            currentIndex += charsPerTick;

            // Get the current index from 0
            setDisplayedText(cleanArt.slice(0, currentIndex));

            // Scroll to the cursor
            if (cursorRef.current) {
                cursorRef.current.scrollIntoView({ behavior: "auto", block: "center" })
            }
            if (currentIndex >= cleanArt.length) {
                setIsFinished(true);
                clearInterval(interval);
            }
        }, speedMs);

        return () => clearInterval(interval); // Cleaning the unmount
    }, [cleanArt, charsPerTick, speedMs]);

    return (
        <div className="relative hidden md:block">
            {/* invisible place holder to center the art */}
            <pre className="py-4 text-[10px] leading-none opacity-0 pointer-events-none select-none" aria-hidden="true">
                {cleanArt}
            </pre>

            {/* drawing layer */}
            <pre className="absolute top-0 left-0 w-full h-full py-4 text-[10px] leading-none text-white/40 drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]">
                {displayedText}
                {!isFinished && (
                    <span
                        ref={cursorRef} /* 3. Added the missing ref here! */
                        className="inline-block w-2 h-3 ml-1 bg-white/60 animate-pulse"
                    />
                )}
            </pre>
        </div>
    );
};