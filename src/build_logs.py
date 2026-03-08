import os
import json
from datetime import datetime

def build_automated_logs():
    blog_dir = "./blog"
    logs = []
    
    # Month mapping for folder names
    months = {
        "01": "January", "02": "February", "03": "March", "04": "April",
        "05": "May", "06": "June", "07": "July", "08": "August",
        "09": "September", "10": "October", "11": "November", "12": "December"
    }

    if not os.path.exists(blog_dir):
        os.makedirs(blog_dir)
        return logs

    for filename in os.listdir(blog_dir):
        if filename.endswith(".md"):
            # 1. Parse filename (Expects: YYYY-MM-DD-title.md)
            # parts[0]=YYYY, parts[1]=MM, parts[2]=DD, parts[3+]=title
            parts = filename.replace(".md", "").split("-")
            
            if len(parts) >= 4:
                year, month, day = parts[0], parts[1], parts[2]
                raw_title = " ".join(parts[3:])
                
                # 2. Format Metadata Automatically
                date_str = f"{year}-{month}-{day}"
                folder_name = f"{months[month]}{year}" # e.g., March2026
                display_title = raw_title.replace("_", " ").title() # e.g., "Kernel Update"
                
                # 3. Read Content
                with open(os.path.join(blog_dir, filename), "r") as f:
                    # Filter out empty lines and return as array
                    body = [line.strip() for line in f.readlines() if line.strip()]

                logs.append({
                    "id": filename.replace(".md", ""),
                    "title": display_title,
                    "date": date_str,
                    "folder": folder_name,
                    "content": body
                })

    # Sort logs: Newest first
    logs.sort(key=lambda x: x['date'], reverse=True)
    return logs

if __name__ == "__main__":
    data = build_automated_logs()
    output_path = "./src/data/logs.json" 
    
    with open(output_path, "w") as f:
        json.dump(data, f, indent=2)
    
    print(f"[*] MIR_OS: {len(data)} logs synced to VFS.")