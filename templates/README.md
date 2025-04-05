# 🧩 Project Name

## 🔁 Context Reminder
If working with an AI assistant, always start with:
> "Track token usage toward [YOUR TOKEN LIMIT] and notify me when we're close."

---

## 1. 📘 Project Overview

- **Project Name**: [Your app name]
- **Tagline**: [A short, clear slogan]
- **Summary**:  
  [What your app does in 2–3 sentences. The problem it solves, and who it's for.]

---

## 2. 🎯 Target Audience

Who will use this? What are their needs, roles, or behaviors?

---

## 3. 🧱 Tech Stack

| Layer       | Tech/Tool            |
|-------------|----------------------|
| Frontend    | [e.g., Next.js + TailwindCSS] |
| Backend     | [e.g., Express + TypeScript] |
| Auth        | [e.g., Lucia / Auth.js] |
| DB          | [e.g., SQLite / PostgreSQL] |
| Cache       | [e.g., Redis] |
| File Storage| [e.g., MinIO] |
| DevOps      | [e.g., Docker, GitHub Actions] |

---

## 4. 🗂 Folder Structure

``` 
├── src/               # Application code
├── services/          # External integrations
├── types/             # Global types
├── utils/             # Helpers
├── docs/              # Planning & architecture docs
├── .ai/               # AI memory/context helpers
└── scripts/           # Utility scripts
```

---

## 5. 🛠️ Local Development

1. Clone the repo:
   ```bash
   git clone [your-repo-url]
   cd [repo-folder]
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development:
   ```bash
   npm run dev
   ```

---

## 6. 📄 Documentation Index

| File                     | Purpose                                |
|--------------------------|----------------------------------------|
| `PRD.md`                 | Product Requirements                   |
| `SRS.md`                 | Software Specification                 |
| `SYSTEM-ARCHITECTURE.md` | Architecture and component breakdown   |
| `TASKS.md`               | Task hierarchy                         |
| `TECHNICAL.md`           | Code standards, structure, testing     |
| `CLEAN-AI-CODE.md`       | AI Collaboration Philosophy            |
| `.ai/active-context.md`  | Live AI chat memory snapshot           |

---

## 7. ✅ AI Context Strategy

This project is built to be AI-compatible in token-limited environments (8k tokens):

- Use `active-context.md` to summarize sessions
- Archive old sessions to `.ai/archived-summaries/`
- Use CLI or scripts to update AI memory (`scripts/update_active_context.sh`)

---

## 8. 📜 License

MIT – feel free to use, improve, and contribute. 