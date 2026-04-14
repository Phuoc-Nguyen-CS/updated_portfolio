import { AboutFile } from '../components/vfs_content/AboutFile'
import { ResumeFile } from '../components/vfs_content/ResumeFile';

/* =========================================================
    FILE_CONTENT
    This object stores the actual JSX for each "file" in your system.
    These are no longer standalone executable commands.
   ========================================================= */

export const FILE_CONTENT: Record<string, () => React.ReactNode> = {
    "/about.txt": () => <AboutFile/ >,
    "/resume.txt": () => <ResumeFile/ >,
};