# 🚀 Getting Started – Project Starter Kit Guide

Welcome! This guide helps you set up and use this AI-optimized starter kit from scratch.

---

## 📦 Step 1: Set Up Your Project

1. **Unpack and enter the project:**
   ```bash
   unzip fullstack-app-starter.zip -d my-app
   cd my-app
   ```

2. **Install dependencies (optional):**
   ```bash
   pnpm install
   ```

3. **Initialize Git (optional):**
   ```bash
   git init
   git add .
   git commit -m "Initial commit from starter kit"
   ```

---

## 📘 Step 2: Define the App

Edit these files using your idea and AI prompts:

| File                   | Purpose                                   |
|------------------------|-------------------------------------------|
| `docs/PRD.md`          | Define idea, problem, users, goals        |
| `docs/SRS.md`          | Turn vision into technical spec           |
| `docs/TASKS.md`        | Break down features into tasks            |
| `docs/CONTEXT.md`      | Summarized project context                |
| `docs/GLOSSARY.md`     | Define technical and domain terms         |

Use `docs/AI-PROMPTS.md` to generate each file via AI.

---

## 🤖 Step 3: Use AI to Build Features

1. **Generate `.ai/active-context.md`**
   - Use this command:
     ```bash
     ./scripts/update_active_context.sh
     ```
   - Or use the AI regeneration prompt in `CLEAN-AI-CODE.md` or `AI-PROMPTS.md`

2. **Start your AI session with:**
   ``` 
   You're assisting with my project. Here's the project context:
   [Paste .ai/active-context.md]

   We're working on:
   [Paste one task block from TASKS.md]

   Track token usage toward 8000 tokens and notify me when close.
   ```

---

## 🔁 Step 4: Archive & Reset Context

When ending a session or hitting token limits:

1. Ask AI to summarize the session:
   ``` 
   Summarize what we accomplished. Include decisions, code outputs, and next steps.
   ```
2. Save it to:
   ```
   .ai/archived-summaries/YYYY-MM-DD_summary.md
   ```
3. Update `.ai/active-context.md` using the archive or regenerate using AI.

---

## 🧱 Step 5: Build the App

- Build features from `docs/TASKS.md`
- Keep `.ai/active-context.md` up to date
- Follow structure defined in:
  - `docs/SYSTEM-ARCHITECTURE.md`
  - `docs/TECHNICAL.md`
  - `docs/CLEAN-AI-CODE.md`

---

## 🛠 Step 6: Log Fixes When Needed

- For any bug, issue, or refactor, use:
  - `docs/fixes/TEMPLATE-fix-doc.md`
  - Log it as `docs/fixes/fix-[short-slug].md`
- Track affected areas and outcomes

---

## 📄 Optional: Add AI Summary for Fresh Sessions

If you're starting fresh, paste this at the top:
- Contents of `docs/ai-code.summary.md`
- Followed by `.ai/active-context.md`
- Then the current task

This keeps AI behavior consistent and efficient.

---

## 📤 Finalize & Launch

- Fill in `README.md`
- Clean up `CHANGELOG.md` (if used)
- Test the app
- Deploy or publish to GitHub