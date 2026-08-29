// src/utils/path.ts

/**
 * Resolves a target path against the current working directory, 
 * mimicking Linux pathing (handling '..', '.', absolute, and relative paths).
 */
export const resolvePath = (cwd: string, target: string): string => {
    if (!target) return cwd;

    // 1. Is it an absolute path or relative path?
    const basePath = target.startsWith("/") ? target : `${cwd}/${target}`;

    // 2. Split into parts and resolve '..' and '.'
    const parts = basePath.split("/").filter(Boolean);
    const stack: string[] = [];

    for (const part of parts) {
        if (part === "..") {
            stack.pop(); // Go up a directory
        } else if (part !== ".") {
            stack.push(part); // Go down into a directory
        }
    }

    // 3. Reconstruct the absolute path
    return "/" + stack.join("/");
};

export const getParentPath = (absolutePath: string): string => {
    const index = absolutePath.lastIndexOf("/");
    return index <= 0 ? "/" : absolutePath.slice(0, index);
};
