
import os
from datetime import datetime

# File paths (assumes script is run from root of project)
CONTEXT_PATH = "docs/CONTEXT.md"
TASKS_PATH = "docs/TASKS.md"
ACTIVE_CONTEXT_PATH = ".ai/active-context.md"

def read_file(path):
    with open(path, "r") as file:
        return file.read()

def write_file(path, content):
    with open(path, "w") as file:
        file.write(content)

def update_active_context():
    context = read_file(CONTEXT_PATH)
    tasks = read_file(TASKS_PATH)

    new_context = f"""# Active AI Session Context

## 🔁 Instructions
Start every new AI session with:
"You're assisting with a full stack app. Here’s the current project context. Track token usage toward a limit of [YOUR LIMIT HERE]. Let me know when we're close."

---

## Summary
{context.strip()}

---

## Current Task
[Paste the specific feature or task here]

---

## Task Snapshot (from TASKS.md)
{tasks.strip()}
"""

    write_file(ACTIVE_CONTEXT_PATH, new_context)
    print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Updated active-context.md")

if __name__ == "__main__":
    update_active_context()
