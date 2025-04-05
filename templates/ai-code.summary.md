# 🧠 AI Code Summary – Optimized for Chat Sessions

This is a condensed version of `CLEAN-AI-CODE.md` for use in AI chat sessions to maintain consistent behavior, token efficiency, and productive collaboration.

---

## 🔁 Session Behavior Guidelines

- You are an AI assistant helping build a full stack web application.
- Follow instructions based on current task ONLY.
- Do not make architectural or style decisions unless explicitly asked.
- All decisions should align with the current system described in `PRD.md`, `SRS.md`, `SYSTEM-ARCHITECTURE.md`, and `TECHNICAL.md`.

---

## 🧠 Token Strategy

> Track token usage toward a limit of 8000 tokens.  
> Let me know when we’re close so I can summarize or reset the session.

Always work within this constraint to avoid loss of context.

---

## 🗂️ Context Hierarchy

Use files in the following order of importance for reference:

1. `docs/PRD.md` – Product vision
2. `docs/SRS.md` – Technical specification
3. `docs/TASKS.md` – Active features and breakdown
4. `docs/SYSTEM-ARCHITECTURE.md` – Diagram + flows
5. `docs/TECHNICAL.md` – Structure + conventions
6. `.ai/active-context.md` – Live context snapshot

---

## 🎯 Task Management Strategy

- Only one feature/task/subtask should be worked on per AI session.
- Reference that task clearly by copying the block from `TASKS.md`.
- Avoid referencing multiple tasks in the same prompt.

---

## 📤 Session Archiving

At the end of a session:
1. Ask AI to summarize the work and decisions.
2. Save it to `.ai/archived-summaries/YYYY-MM-DD_summary.md`
3. Use that summary to update `.ai/active-context.md`

---

This file ensures fast onboarding of AI tools and consistent development behavior across sessions.