# 🧠 AI-PROMPTS.md – High-Efficiency Prompts for Project Development

These prompts are optimized to reduce revisions and maximize output clarity when working with an AI assistant.

---

## 1. 📄 Generate PRD (docs/PRD.md)

```
I'm starting a new project. Help me generate a detailed PRD (Product Requirements Document).

Here's what I know:
- My idea in 2-3 sentences: [Your idea here]
- Target audience: [Your users]
- Core features I want: [List them]
- Tech preferences: [Stack ideas, if any]

Structure it like: Product Overview, Problem Statement, Target Users, Goals & Metrics, Feature List, Non-goals, Timeline, Competitive Analysis.
Fill any gaps and optimize for clarity.
```

---

## 2. 🛠 Generate SRS (docs/SRS.md)

```
Using the PRD below, generate a detailed SRS (Software Requirements Specification).

Include:
- System architecture and components
- User roles and permissions
- Functional & non-functional requirements
- Data model suggestions
- API/Interface specifications
- Error handling strategy
- Monitoring/logging plan

[Paste PRD.md]
```

---

## 3. 📋 Break Down Tasks (docs/TASKS.md)

```
From this SRS, generate a complete task breakdown using:

- Epics
  - Features
    - Tasks
      - Subtasks

Ensure logical development order and clarity for assignment.

[Paste SRS.md]
```

---

## 4. 🧠 Create Project Summary (docs/CONTEXT.md)

```
Summarize this project into a reusable context for `ai-docs/context/active-context.md`.

Include:
- Project summary
- Tech stack
- Key features
- Major design decisions
- Link references to PRD/SRS/TASKS

[Paste PRD.md and SRS.md]
```

---

## 5. 📚 Fill the Glossary (docs/GLOSSARY.md)

``` 
Extract domain-specific and technical terms from the PRD and SRS. Define them clearly and concisely.

Format:
**[Term]** – Plain language explanation.

[Paste PRD.md and SRS.md]
```

---

## 6. 📝 Generate Developer README (README.md)

``` 
Write a clean root-level README.md for the project.

Include:
- Project overview and goals
- Tech stack table
- Folder structure
- Dev setup instructions
- Documentation index
```

---

## 7. 🧱 Generate SYSTEM-ARCHITECTURE.md

``` 
Use the following SRS (and PRD if needed) to generate a system architecture document.

Include:
- Overview
- Mermaid diagram
- Component table
- Communication flow (signup, fetch, etc.)
- Deployment strategy
- Scaling and observability

[Paste SRS.md] [Optional: Paste PRD.md]
```

---

## 8. 🤖 Start a New AI Session (.ai/active-context.md)

``` 
You're assisting with my full stack app. Here's the project context from `.ai/active-context.md`:

[Paste .ai/active-context.md content]

We're currently working on:
[Paste ONE task or subtask block from TASKS.md]

Track token usage toward 8000 tokens and notify me when we're close.
```

---

## 9. 🔄 Archive a Completed AI Session

``` 
Summarize this AI session for archival in `.ai/archived-summaries/YYYY-MM-DD_summary.md`.

Include:
- Major decisions
- Code/features created
- Open items or next steps

Limit to ~600 words. Format for clarity.
```

---

## 10. ⚡️ Regenerate `active-context.md` Using AI

``` 
Generate a new .ai/active-context.md using the latest CONTEXT.md and TASKS.md.

Include:
- Project summary from CONTEXT.md
- Token usage tracking instructions
- A blank section for 'Current Task'
- A task snapshot (from TASKS.md)

Here's the source content:
[Paste CONTEXT.md]
[Paste TASKS.md]
```
---

## 11. 🔁 Load AI Summary When Starting Fresh

``` 
Paste this at the start of a new session if context is lost or you're starting from scratch:

[Paste contents of docs/ai-code.summary.md]

Then follow with:
- .ai/active-context.md
- The current task block from docs/TASKS.md
```