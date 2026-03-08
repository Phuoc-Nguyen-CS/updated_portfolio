import os
import json
from datetime import datetime

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BLOG_DIR = os.path.join(BASE_DIR, "blog")
OUTPUT_FILE = os.path.join(BASE_DIR, "src", "data", "logs.json")

def build_automated_logs():
    logs = []
    
    # Check if the blog folder exists at the root
    if not os.path.exists(BLOG_DIR):
        print(f"[!] Error: {BLOG_DIR} not found.")
        return logs

    # ... (Rest of your month mapping logic)

    for filename in os.listdir(BLOG_DIR):
        if filename.endswith(".md"):
            # ... (Your filename parsing logic)
            
            # Use the full path to read the file
            with open(os.path.join(BLOG_DIR, filename), "r", encoding="utf-8") as f:
                body = [line.strip() for line in f.readlines() if line.strip()]

            # ... (Append to logs)

    # Save to the calculated output path
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(logs, f, indent=2)
    
    print(f"[*] MIR_OS: {len(logs)} logs synced to {OUTPUT_FILE}")