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
| `docs/glossary.md`     | Define technical and domain terms         |

Use `docs/ai-prompts.md` to generate each file via AI.

---

## 🤖 Step 3: Use AI to Build Features

1. **Update active context**
   - Use the CLI command:
     ```bash
     prompture context -t "Your current task description"
     ```
   - Or use the AI regeneration prompt in `clean-code-ai.md` or `ai-prompts.md`

2. **Start your AI session with:**
   ``` 
   You're assisting with my project. Here's the project context:
   [Paste ai-docs/context/active-task-context.md]

   We're working on:
   [Paste one task block from TASKS.md]

   Track token usage toward 8000 tokens and notify me when close.
   ```

---

## 🧱 Step 4: Build the App

- Build features from `docs/TASKS.md`
- Keep `.ai/active-task-context.md` up to date
- Follow structure defined in:
  - `docs/SYSTEM-ARCHITECTURE.md`
  - `docs/TECHNICAL.md`
  - `docs/CLEAN-AI-CODE.md`

---


## 📤 Finalize & Launch

- Fill in `README.md`
- Clean up `CHANGELOG.md` (if used)
- Test the app
- Deploy or publish to GitHub