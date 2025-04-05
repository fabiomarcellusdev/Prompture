#!/bin/bash

CONTEXT_PATH="docs/CONTEXT.md"
TASKS_PATH="docs/TASKS.md"
ACTIVE_CONTEXT_PATH=".ai/active-context.md"

if [[ ! -f "$CONTEXT_PATH" || ! -f "$TASKS_PATH" ]]; then
  echo "Required files not found. Make sure CONTEXT.md and TASKS.md exist."
  exit 1
fi

CONTEXT=$(<"$CONTEXT_PATH")
TASKS=$(<"$TASKS_PATH")

cat <<EOF > "$ACTIVE_CONTEXT_PATH"
# Active AI Session Context

## 🔁 Instructions
Start every new AI session with:
"You're assisting with a full stack app. Here’s the current project context. Track token usage toward a limit of [YOUR LIMIT HERE]. Let me know when we're close."

---

## Summary
$CONTEXT

---

## Current Task
[Paste the specific feature or task here]

---

## Task Snapshot (from TASKS.md)
$TASKS
EOF

echo "[✔] Updated .ai/active-context.md"
