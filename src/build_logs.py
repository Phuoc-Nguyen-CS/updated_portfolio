import os
import json
import re
from datetime import datetime

# SCRIPT_DIR is .../portfolio/src/
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
# ROOT_DIR is .../portfolio/
ROOT_DIR = os.path.dirname(SCRIPT_DIR)

# The blog folder should be at the project root
BLOG_DIR = os.path.join(ROOT_DIR, "blog")
# The output file is src/data/logs.json
OUTPUT_FILE = os.path.join(SCRIPT_DIR, "data", "logs.json")

def build_automated_logs():
    logs = []
    
    # Month mapping for folder names
    months = {
        "01": "January", "02": "February", "03": "March", "04": "April",
        "05": "May", "06": "June", "07": "July", "08": "August",
        "09": "September", "10": "October", "11": "November", "12": "December"
    }

    print(f"[*] MIR_OS: Scanning directory: {BLOG_DIR}")

    # Safety check: Ensure blog directory exists
    if not os.path.exists(BLOG_DIR):
        print(f"[!] ERROR: Directory '{BLOG_DIR}' not found. Creating empty folder.")
        os.makedirs(BLOG_DIR, exist_ok=True)
        return logs

    for filename in os.listdir(BLOG_DIR):
        if filename.endswith(".md"):
            # 1. Parse filename (Format: YYYY-MM-DD-Title_With_Underscores.md)
            parts = filename.replace(".md", "").split("-")
            
            # We expect at least YYYY, MM, DD, and a Title
            if len(parts) >= 4:
                year, month, day = parts[0], parts[1], parts[2]
                raw_title = " ".join(parts[3:])
                
                # 2. Format Metadata
                date_str = f"{year}-{month}-{day}"
                
                # Convert "03" to "March" + "2026" = "March2026"
                month_name = months.get(month, "Unknown")
                folder_name = f"{month_name}{year}"
                
                # Format Title (e.g., "terminal_updates" -> "Terminal Updates")
                display_title = raw_title.replace("_", " ").title()
                
                # 3. Read Content
                file_path = os.path.join(BLOG_DIR, filename)
                try:
                    with open(file_path, "r", encoding="utf-8") as f:
                        # Skip empty lines and strip whitespace
                        body = [line.strip() for line in f.readlines() if line.strip()]
                    
                    logs.append({
                        "id": filename.replace(".md", ""),
                        "title": display_title,
                        "date": date_str,
                        "folder": folder_name,
                        "content": body
                    })
                    print(f"[+] Processed: {filename}")
                except Exception as e:
                    print(f"[!] FAILED to read {filename}: {e}")

    # 4. Sort logs by date (Newest First)
    logs.sort(key=lambda x: x['date'], reverse=True)

    # 5. Ensure output directory exists before writing
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)

    # 6. Write to JSON
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(logs, f, indent=2)
    
    print(f"\n[*] SUCCESS: {len(logs)} entries written to {OUTPUT_FILE}")
    return logs

if __name__ == "__main__":
    build_automated_logs()