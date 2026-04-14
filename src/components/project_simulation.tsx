import React from "react";

interface ProjectSimulationProps {
    title: string;
    themeColor: string; //
    githubUrl: string;
    bootLogs?: string[];
    children?: React.ReactNode; 
}

export const ProjectSimulation: React.FC<ProjectSimulationProps> = ({
    title,
    themeColor,
    githubUrl,
    bootLogs = [],
    children,
}) => {
    return (
        <div
            className="mt-2 border-l-2 pl-4 py-3 animate-in fade-in slide-in-from-left-2 duration-500"
            style={{
                borderColor: themeColor,
                backgroundColor: `${themeColor}10` 
            }}
        >
            {/* Header Log */}
            <p className="font-bold font-mono uppercase" style={{ color: themeColor }}>
                [*] {title}
            </p>

            {/* Standard Boot Sequence */}
            {bootLogs.length > 0 && (
                <div className="text-white/70 font-mono text-xs mt-1 space-y-0.5">
                    {bootLogs.map((log, i) => (
                        <p key={i}>{log}</p>
                    ))}
                </div>
            )}

            {/* Unique Project Content */}
            <div className="mt-4">
                {children}
            </div>

            {/* Standard GitHub Link */}
            <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block px-3 py-1 font-bold transition-colors text-xs"
                style={{
                    backgroundColor: themeColor,
                    color: themeColor.includes("green") || themeColor.includes("cyan") ? "black" : "white"
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.color = themeColor;
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = themeColor;
                    e.currentTarget.style.color = themeColor.includes("green") || themeColor.includes("cyan") ? "black" : "white";
                }}
            >
                [OPEN_SOURCE_CODE]
            </a>
        </div>
    );
};