import json
import re
import logging
from pathlib import Path
from typing import List, Dict, Any, Optional

# =========================================================
# SYSTEM CONFIGURATION
# =========================================================
logging.basicConfig(level=logging.INFO, format='%(message)s')
logger = logging.getLogger("MIR_OS_BUILDER")

SCRIPT_DIR = Path(__file__).parent.resolve()
ROOT_DIR = SCRIPT_DIR.parent
BLOG_DIR = ROOT_DIR / "blog"
OUTPUT_FILE = SCRIPT_DIR / "data" / "logs.json"

# Matches: YYYY-MM-DD-title.md or YYYY-MM-DD_title.txt
FILE_PATTERN = re.compile(r"^(\d{4})-(\d{2})-(\d{2})[-_]?(.*)\.(md|txt)$", re.IGNORECASE)

def process_file(file_path: Path, project_name: str) -> Optional[Dict[str, Any]]:
    """Reads a log file, parses its metadata, and extracts its content."""
    match = FILE_PATTERN.match(file_path.name)
    
    if not match:
        logger.warning(f"[?] SKIPPING: {project_name}/{file_path.name} (Invalid YYYY-MM-DD format)")
        return None

    year, month, day, raw_title, ext = match.groups()
    date_str = f"{year}-{month}-{day}"
    
    # Format Title: "added_vfs" -> "Added Vfs"
    display_title = raw_title.replace("_", " ").replace("-", " ").strip().title() if raw_title else "Untitled System Log"
    name_no_ext = file_path.stem

    # Attempt to read content with failovers for different encodings
    content: List[str] = []
    for enc in ['utf-8', 'utf-8-sig', 'latin-1']:
        try:
            raw_lines = file_path.read_text(encoding=enc).splitlines()
            content = [line.strip() for line in raw_lines if line.strip()]
            break # Success, exit loop
        except UnicodeDecodeError:
            continue

    if not content:
        logger.error(f"[!] FAILED: Could not decode {file_path.name} with supported encodings.")
        return None

    return {
        "id": name_no_ext,
        "title": display_title,
        "date": date_str,
        "folder": project_name,
        "content": content
    }

def build_automated_logs() -> None:
    """Scans the blog directory by project and compiles the JSON database."""
    logs: List[Dict[str, Any]] = []

    logger.info(f"[*] MIR_OS: Scanning project directories in: {BLOG_DIR}")

    if not BLOG_DIR.exists():
        logger.warning(f"[!] ERROR: '{BLOG_DIR}' not found. Initializing empty.")
        BLOG_DIR.mkdir(parents=True, exist_ok=True)
        return

    # Iterate through all project folders inside /blog
    for project_dir in BLOG_DIR.iterdir():
        if project_dir.is_dir():
            project_name = project_dir.name
            
            # Iterate through all text/markdown files in the project folder
            for file_path in project_dir.iterdir():
                if file_path.is_file() and file_path.suffix.lower() in ['.md', '.txt']:
                    entry = process_file(file_path, project_name)
                    if entry:
                        logs.append(entry)
                        logger.info(f"[+] Synced: [{project_name}] -> {file_path.name}")

    # Sort globally: Newest logs at the top
    logs.sort(key=lambda x: x['date'], reverse=True)

    # Final Write
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_FILE.write_text(json.dumps(logs, indent=2, ensure_ascii=False), encoding="utf-8")
    
    logger.info(f"\n[*] FINAL_REPORT: {len(logs)} entries compiled into {OUTPUT_FILE.name}")

if __name__ == "__main__":
    build_automated_logs()