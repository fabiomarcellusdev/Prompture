
# TECHNICAL.md – Patterns, Practices, and Project Structure

## 🔁 Context Reminder
This file defines how code should be written, structured, and maintained.  
AI assistants should refer to this file to ensure that contributions align with the project's architecture and patterns.

Always remind your AI assistant to:
> "Track token usage toward [YOUR TOKEN LIMIT] and notify me when we're close."

---

## 1. 🧱 Project Structure

``` 
├── src/
│   ├── components/
│   ├── pages/
│   ├── lib/
│   ├── api/
│   └── styles/
├── services/
├── utils/
├── types/
├── docs/
└── .ai/
```

- `src/`: Main application code (frontend/backend/pages)
- `services/`: External service integrations (e.g., auth, db)
- `utils/`: Shared helpers
- `types/`: TypeScript types/interfaces
- `docs/`: Architecture, PRD, SRS, etc.
- `.ai/`: Token-aware memory management tools

---

## 2. 🎨 Code Style & Conventions

- Use ESLint and Prettier
- Tabs or 2 spaces (choose one)
- Consistent import paths (e.g., with `@/` alias)
- Keep functions pure when possible

---

## 3. 🧪 Testing

- Use [Vitest / Jest / etc.]
- Organize tests alongside modules: `module.spec.ts`
- Use descriptive test names and prefer functional test cases over snapshots

---

## 4. 📦 Patterns

- Prefer **Service + Repository pattern** for backend modules
- Use **Composition API** if using Vue
- Use **Hooks** and **Atomic Design** for React components
- Keep API logic abstracted from UI logic

---

## 5. 🔐 Security Guidelines

- Sanitize inputs on both client and server
- Use HTTPS and secure headers (define in `nginx.conf`)
- Avoid hardcoded secrets — use `.env` or CLI secrets tool
- Ensure role-based access control (RBAC) is respected in middleware

---

## 6. 🌐 API Guidelines

- REST or GraphQL (define preference)
- Use Swagger/OpenAPI for documentation
- Error responses should follow a consistent format:
```json
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "Username is required."
  }
}
```

---

## 7. ⏱ Performance Guidelines

- Use Redis for caching expensive reads
- Optimize DB queries (avoid N+1)
- Debounce frontend interactions that hit API
- Use loading skeletons and suspense boundaries in UI

---

Update this file as your stack evolves!
