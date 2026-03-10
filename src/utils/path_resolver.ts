// src/utils/path_resolver.ts

export const resolvePath = (cwd: string, targetPath: string): string => {
    // 1. Defaults & Home Directory
    if (!targetPath || targetPath === "~") return "/";

    // 2. Start from Root (if absolute) OR Current Directory (if relative)
    let pathStack = targetPath.startsWith("/")
        ? []
        : cwd.split("/").filter(Boolean);

    // 3. Process the target path step-by-step
    const targetParts = targetPath.split("/").filter(Boolean);

    for (const part of targetParts) {
        if (part === ".") continue; // "." means current directory, ignore
        if (part === "..") {
            if (pathStack.length > 0) pathStack.pop(); // Go up one level
        } else {
            pathStack.push(part); // Go down one level
        }
    }

    // 4. Rebuild the final absolute path (e.g., "/projects" or "/")
    return "/" + pathStack.join("/");
};