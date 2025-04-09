# 🚀 Starting Your AI Development Session

This guide helps you start a new AI development session effectively.

## 1. 📋 Before Starting

1. Make sure you have:
   - `ai-docs/requirements/PRD.md` - Your product requirements
   - `ai-docs/requirements/SRS.md` - Your technical specifications
   - `ai-docs/requirements/TASKS.md` - Your current tasks
   - `ai-docs/context/active-task-context.md` - Your current context
   ```

## 2. 🎯 Starting Your Session

Copy and paste this template at the start of every new AI chat:

```
You're assisting with my project. Here's the project context:

[Paste contents of ai-docs/context/active-task-context.md]

Development Rules:
- ai-docs/technical/CLEAN-AI-CODE.md for detailed development rules

Please:
1. Review the context and current task
2. Follow the selected development rules
3. Track token usage and notify me when close to the limit specified in active-task-context.md
4. Ask for clarification if anything is unclear
```

## 3. 🔄 During Development

- Use `prompture context --task "Your current task"` to update context
- Reference `ai-prompts.md` for specific prompt templates
- Use `ai-docs/technical/ai-code.summary.md` to summarize code changes

## 4. 📝 Ending Your Session

When ending a session:
1. Ask the AI to summarize the session
2. Create a summary using `prompture summary --create "Description of the session"`
3. Update `ai-docs/requirements/TASKS.md` with completed items
4. Run `prompture context --task "Next task"` to prepare for next session

## 5. 🧠 Best Practices

- Start each session with fresh context
- Keep tasks focused and specific
- Create summaries after each session
- Update context when switching tasks
- Track token usage to avoid context loss

## 6. 🆘 Need Help?

- Check `ai-prompts.md` for specific prompt templates
- Review `ai-docs/technical/CLEAN-AI-CODE.md` or `ai-docs/technical/ai-code.summary.md` for development rules