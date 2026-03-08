import os
import json
import re
from datetime import datetime

# =========================================================
# PATH CONFIGURATION
# =========================================================
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.dirname(SCRIPT_DIR)
BLOG_DIR = os.path.join(ROOT_DIR, "blog")
OUTPUT_FILE = os.path.join(SCRIPT_DIR, "data", "logs.json")

def build_automated_logs():
    logs = []
    
    months = {
        "01": "January", "02": "February", "03": "March", "04": "April",
        "05": "May", "06": "June", "07": "July", "08": "August",
        "09": "September", "10": "October", "11": "November", "12": "December"
    }

    print(f"[*] MIR_OS: Scanning: {BLOG_DIR}")

    if not os.path.exists(BLOG_DIR):
        print(f"[!] ERROR: '{BLOG_DIR}' not found. Initializing empty.")
        os.makedirs(BLOG_DIR, exist_ok=True)
        return logs

    for filename in os.listdir(BLOG_DIR):
        if filename.endswith(".md"):
            name_no_ext = filename.replace(".md", "")
            match = re.match(r"(\d{4})-(\d{2})-(\d{2})[- ]?(.*)", name_no_ext)
            
            if match:
                year, month, day, raw_title = match.groups()
                
                # Metadata Formatting
                date_str = f"{year}-{month}-{day}"
                month_name = months.get(month, "Unknown")
                folder_name = f"{month_name}{year}"
                
                # Title Formatting (e.g., "Terminal_Updates" -> "Terminal Updates")
                if not raw_title:
                    display_title = "Untitled System Log"
                else:
                    display_title = raw_title.replace("_", " ").replace("-", " ").strip().title()
                
                # Read Content
                file_path = os.path.join(BLOG_DIR, filename)
                try:
                    with open(file_path, "r", encoding="utf-8") as f:
                        # Clean lines and remove empty ones
                        lines = [line.strip() for line in f.readlines() if line.strip()]
                    
                    logs.append({
                        "id": name_no_ext,
                        "title": display_title,
                        "date": date_str,
                        "folder": folder_name,
                        "content": lines
                    })
                    print(f"[+] Synced: {filename}")
                except Exception as e:
                    print(f"[!] FAILED reading {filename}: {e}")
            else:
                print(f"[?] SKIPPING: {filename} (Does not match YYYY-MM-DD pattern)")

    # Sort: Newest logs at the top
    logs.sort(key=lambda x: x['date'], reverse=True)

    # Final Write
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(logs, f, indent=2)
    
    print(f"\n[*] FINAL_REPORT: {len(logs)} entries compiled into {OUTPUT_FILE}")

if __name__ == "__main__":
    build_automated_logs()